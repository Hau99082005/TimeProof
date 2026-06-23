import { NextRequest, NextResponse } from "next/server";
import { dbConnect } from "@/lib/dbConnect";
import { getFirebaseAuth } from "@/firebase/server";
import jwt from "jsonwebtoken";

export async function POST(req: NextRequest) {
  try {
    const { idToken } = await req.json();
    if (!idToken) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }
    const auth = getFirebaseAuth();
    const decodedToken = await auth.verifyIdToken(idToken);
    const { uid, email, name, picture } = decodedToken;

    const pool = await dbConnect();
    const [existingUsers] = (await pool.execute(
      "SELECT * FROM users WHERE firebase_id = ? OR email = ?",
      [uid, email || ""],
    )) as any;
    let dbUser;

    if (existingUsers.length === 0) {
      const [result] = (await pool.execute(
        "INSERT INTO users (firebase_id, full_name, email, avatar, role, wallet_balance, password_hash, status, created_at, updated_at) VALUES (?, ?, ?, ?, ?, ?, ?, TRUE, NOW(), NOW())",
        [
          uid,
          name || email?.split("@")[0],
          email,
          (picture || "").trim(),
          "customer",
          0,
          "",
        ],
      )) as any;
      const [newUsers] = (await pool.execute(
        "SELECT * FROM users WHERE id = ?",
        [result.insertId],
      )) as any;
      dbUser = newUsers[0];
    } else {
      dbUser = existingUsers[0];
      await pool.execute(
        "UPDATE users SET full_name = ?, avatar = ?, firebase_id = ?, updated_at = NOW() WHERE id = ?",
        [
          name || dbUser.full_name,
          (picture || dbUser.avatar || "").trim(),
          uid,
          dbUser.id,
        ],
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
    console.error("Session error:", err);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 },
    );
  }
}

export async function DELETE(req: NextRequest) {
  const response = NextResponse.json({ success: true });
  response.cookies.delete("token");
  return response;
}
