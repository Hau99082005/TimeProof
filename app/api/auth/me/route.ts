import { NextRequest, NextResponse } from "next/server";
import { dbConnect } from "@/lib/dbConnect";
import jwt from "jsonwebtoken";

interface JwtPayload {
  id: number;
  email: string;
  role: "admin" | "seller" | "customer";
}

export async function GET(req: NextRequest) {
  try {
    const token = req.cookies.get("token")?.value;

    if (!token) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const secret = process.env.JWT_SECRET || "your-secret-key-change-this";
    const decoded = jwt.verify(token, secret) as JwtPayload;

    const pool = await dbConnect();
    const usersResult = await pool.query(
      "SELECT * FROM users WHERE id = $1",
      [decoded.id],
    );
    const users = usersResult.rows;

    if (users.length === 0) {
      return NextResponse.json({ error: "User not found" }, { status: 404 });
    }

    const user = users[0];
    return NextResponse.json({ user: { ...user, password_hash: undefined } });
  } catch (err) {
    console.error("Get current user error:", err);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 },
    );
  }
}
