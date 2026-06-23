import { NextRequest, NextResponse } from "next/server";
import { dbConnect } from "@/lib/dbConnect";
import jwt from "jsonwebtoken";
import { currentUser } from "@clerk/nextjs/server";

export async function POST(req: NextRequest) {
  try {
    const user = await currentUser();
    if (!user) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const pool = await dbConnect();
    const email =
      user.emailAddresses.find((e) => e.id === user.primaryEmailAddressId)
        ?.emailAddress || user.emailAddresses[0]?.emailAddress;
    const fullName =
      `${user.firstName || ""} ${user.lastName || ""}`.trim() ||
      user.username ||
      email?.split("@")[0];
    const avatar = user.imageUrl || "";

    const [existingUsers] = (await pool.execute(
      "SELECT * FROM users WHERE clerk_id = ? OR email = ?",
      [user.id, email],
    )) as any;
    let dbUser;

    if (existingUsers.length === 0) {
      const [result] = (await pool.execute(
        "INSERT INTO users (clerk_id, full_name, email, avatar, role, wallet_balance, password_hash, created_at, updated_at) VALUES (?, ?, ?, ?, ?, ?, '', NOW(), NOW())",
        [user.id, fullName, email, avatar, "customer", 0],
      )) as any;
      const [newUsers] = (await pool.execute(
        "SELECT * FROM users WHERE id = ?",
        [result.insertId],
      )) as any;
      dbUser = newUsers[0];
    } else {
      dbUser = existingUsers[0];
      await pool.execute(
        "UPDATE users SET full_name = ?, avatar = ?, clerk_id = ?, updated_at = NOW() WHERE id = ?",
        [fullName, avatar, user.id, dbUser.id],
      );
    }

    const secret = process.env.JWT_SECRET || "your-secret-key-change-this";
    const token = jwt.sign(
      { id: dbUser.id, email: dbUser.email, role: dbUser.role },
      secret,
      { expiresIn: "7d" },
    );

    const response = NextResponse.json({ success: true, user: dbUser });
    response.cookies.set("token", token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "lax",
      path: "/",
      maxAge: 60 * 60 * 24 * 7,
    });

    return response;
  } catch (err) {
    console.error("Sync user error:", err);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 },
    );
  }
}
