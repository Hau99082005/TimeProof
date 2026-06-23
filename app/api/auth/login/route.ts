import { NextRequest, NextResponse } from "next/server";
import { dbConnect } from "@/lib/dbConnect";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

export async function POST(req: NextRequest) {
  try {
    const { email, password } = await req.json();

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
    const [users] = (await pool.execute(
      "SELECT * FROM users WHERE email = ?",
      [email.trim()]
    )) as any;

    if (users.length === 0) {
      return NextResponse.json(
        { error: "Email hoặc mật khẩu không đúng" },
        { status: 401 }
      );
    }

    const user = users[0];
    
    if (!user.password_hash) {
      return NextResponse.json(
        { error: "Vui lòng đăng nhập bằng Google" },
        { status: 401 }
      );
    }

    const passwordMatch = await bcrypt.compare(password, user.password_hash);
    
    if (!passwordMatch) {
      return NextResponse.json(
        { error: "Email hoặc mật khẩu không đúng" },
        { status: 401 }
      );
    }

    const secret = process.env.JWT_SECRET || "your-secret-key-change-this";
    const token = jwt.sign(
      { id: user.id, email: user.email, role: user.role },
      secret,
      { expiresIn: "7d" }
    );

    const userWithoutPassword = { ...user, password_hash: undefined };
    const response = NextResponse.json({ success: true, user: userWithoutPassword });
    response.cookies.set("token", token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "lax",
      path: "/",
      maxAge: 60 * 60 * 24 * 7
    });
    return response;
  } catch (err) {
    console.error("Login error:", err);
    return NextResponse.json(
      { error: "Lỗi server" },
      { status: 500 }
    );
  }
}
