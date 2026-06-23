
import { NextRequest, NextResponse } from "next/server";
import { dbConnect } from "@/lib/dbConnect";
import bcrypt from "bcryptjs";

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

    const userWithoutPassword = { ...user, password_hash: undefined };
    return NextResponse.json({ success: true, user: userWithoutPassword });
  } catch (err) {
    console.error("Login error:", err);
    return NextResponse.json(
      { error: "Lỗi server" },
      { status: 500 }
    );
  }
}
