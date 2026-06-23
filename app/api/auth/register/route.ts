
import { NextRequest, NextResponse } from "next/server";
import { dbConnect } from "@/lib/dbConnect";
import bcrypt from "bcryptjs";

export async function POST(req: NextRequest) {
  try {
    const { name, email, password } = await req.json();
    if (!name || name.trim().length < 2) {
      return NextResponse.json(
        { error: "Tên phải có ít nhất 2 ký tự" },
        { status: 400 }
      );
    }

    if (!email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      return NextResponse.json(
        { error: "Email không hợp lệ" },
        { status: 400 }
      );
    }

    if (!password || password.length < 6) {
      return NextResponse.json(
        { error: "Mật khẩu phải có ít nhất 6 ký tự" },
        { status: 400 }
      );
    }

    const pool = await dbConnect();
    const [existingUsers] = (await pool.execute(
      "SELECT * FROM users WHERE email = ?",
      [email.trim()]
    )) as any;

    if (existingUsers.length > 0) {
      return NextResponse.json(
        { error: "Email đã được sử dụng" },
        { status: 409 }
      );
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    const [result] = (await pool.execute(
      "INSERT INTO users (firebase_id, full_name, email, avatar, password_hash, role, wallet_balance, created_at, updated_at) VALUES (?, ?, ?, ?, ?, ?, ?, NOW(), NOW())",
      ["", name.trim(), email.trim(), "", hashedPassword, "customer", 0]
    )) as any;

    const [newUsers] = (await pool.execute(
      "SELECT * FROM users WHERE id = ?",
      [result.insertId]
    )) as any;

    const user = newUsers[0];
    const userWithoutPassword = { ...user, password_hash: undefined };

    return NextResponse.json({ success: true, user: userWithoutPassword });
  } catch (err) {
    console.error("Register error:", err);
    return NextResponse.json(
      { error: "Lỗi server" },
      { status: 500 }
    );
  }
}
