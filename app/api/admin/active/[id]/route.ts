import { NextRequest, NextResponse } from "next/server";
import jwt from "jsonwebtoken";
import { dbConnect } from "@/lib/dbConnect";
import { getUserById, getUserByEmail, toggleUserStatus } from "@/model/user";

interface JwtPayload {
  id: number;
  email: string;
  role: "admin" | "seller" | "customer";
}

export async function POST(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> },
) {
  try {
    const token = request.cookies.get("token")?.value;
    if (!token) {
      return NextResponse.json(
        { success: false, error: "Chưa đăng nhập!" },
        { status: 401 },
      );
    }

    const secret = process.env.JWT_SECRET || "your-secret-key-change-this";
    const decoded = jwt.verify(token, secret) as JwtPayload;

    const pool = await dbConnect();
    const currentResult = await pool.query(
      "SELECT * FROM users WHERE id = $1",
      [decoded.id],
    );
    const currentUsers = currentResult.rows;
    if (currentUsers.length === 0) {
      return NextResponse.json(
        { success: false, error: "Không tìm thấy người dùng trong database!" },
        { status: 404 },
      );
    }
    const currentUser = currentUsers[0];
    if (currentUser.role !== "admin") {
      return NextResponse.json(
        {
          success: false,
          error: "Không có quyền truy cập!",
          userRole: currentUser.role,
          userEmail: currentUser.email,
        },
        { status: 403 },
      );
    }

    const { id: userIdParam } = await params;
    const userId = parseInt(userIdParam, 10);

    let targetUser = !isNaN(userId)
      ? await getUserById(userId)
      : await getUserByEmail(userIdParam);

    if (!targetUser) {
      return NextResponse.json(
        { success: false, error: "Không tìm thấy người dùng!" },
        { status: 404 },
      );
    }

    const updatedUser = await toggleUserStatus(targetUser.id);
    if (!updatedUser) {
      return NextResponse.json(
        { success: false, error: "Không tìm thấy người dùng!" },
        { status: 404 },
      );
    }

    return NextResponse.json({
      success: true,
      data: {
        id: updatedUser.id,
        status: updatedUser.status,
        isActive: updatedUser.status,
      },
    });
  } catch (error) {
    console.error("Toggle user status error:", error);
    const errorResponse = {
      success: false,
      error: "Đã xảy ra lỗi khi xử lý yêu cầu!",
      ...(process.env.NODE_ENV === "development" && {
        details: error instanceof Error ? error.message : String(error),
      }),
    };
    return NextResponse.json(errorResponse, { status: 500 });
  }
}
