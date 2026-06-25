import { NextRequest, NextResponse } from "next/server";
import jwt from "jsonwebtoken";
import { dbConnect } from "@/lib/dbConnect";
import {
  getCategoryById,
  updateCategory,
  deleteCategory
} from "@/model/technology";

interface JwtPayload {
  id: number;
  email: string;
  role: "admin" | "seller" | "customer";
}

const JWT_SECRET = process.env.JWT_SECRET || "your-secret-key-change-this";

export async function GET(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> },
) {
  try {
    const { id } = await params;
    const category = await getCategoryById(parseInt(id));
    if (!category) {
      return NextResponse.json(
        { success: false, error: "Không tìm thấy danh mục" },
        { status: 404 },
      );
    }
    return NextResponse.json({ success: true, data: category });
  } catch (error) {
    console.error("Error getting category:", error);
    return NextResponse.json(
      {
        success: false,
        error: "Đã xảy ra lỗi khi lấy danh mục",
        details: error instanceof Error ? error.message : String(error),
      },
      { status: 500 },
    );
  }
}

export async function PUT(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> },
) {
  try {
    const token = req.cookies.get("token")?.value;
    if (!token) {
      return NextResponse.json(
        { success: false, error: "Chưa đăng nhập!" },
        { status: 401 },
      );
    }

    const decoded = jwt.verify(token, JWT_SECRET) as JwtPayload;

    const pool = await dbConnect();
    const currentResult = await pool.query(
      "SELECT * FROM users WHERE id = $1",
      [decoded.id],
    );
    const currentUsers = currentResult.rows;
    if (currentUsers.length === 0) {
      return NextResponse.json(
        { success: false, error: "User not found" },
        { status: 404 },
      );
    }
    const currentUser = currentUsers[0];
    if (currentUser.role !== "admin") {
      return NextResponse.json(
        { success: false, error: "Access denied" },
        { status: 403 },
      );
    }

    const { id } = await params;
    const body = await req.json();
    const { name, description } = body;

    const category = await updateCategory(parseInt(id), { name, description });
    if (!category) {
      return NextResponse.json(
        { success: false, error: "Không tìm thấy danh mục" },
        { status: 404 },
      );
    }
    return NextResponse.json({ success: true, data: category });
  } catch (error) {
    console.error("Error updating category:", error);
    return NextResponse.json(
      {
        success: false,
        error: "Đã xảy ra lỗi khi cập nhật danh mục",
        details: error instanceof Error ? error.message : String(error),
      },
      { status: 500 },
    );
  }
}

export async function DELETE(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> },
) {
  try {
    const token = req.cookies.get("token")?.value;
    if (!token) {
      return NextResponse.json(
        { success: false, error: "Chưa đăng nhập!" },
        { status: 401 },
      );
    }

    const decoded = jwt.verify(token, JWT_SECRET) as JwtPayload;

    const pool = await dbConnect();
    const currentResult = await pool.query(
      "SELECT * FROM users WHERE id = $1",
      [decoded.id],
    );
    const currentUsers = currentResult.rows;
    if (currentUsers.length === 0) {
      return NextResponse.json(
        { success: false, error: "User not found" },
        { status: 404 },
      );
    }
    const currentUser = currentUsers[0];
    if (currentUser.role !== "admin") {
      return NextResponse.json(
        { success: false, error: "Access denied" },
        { status: 403 },
      );
    }

    const { id } = await params;
    await deleteCategory(parseInt(id));
    return NextResponse.json({ success: true, message: "Xóa danh mục thành công!" });
  } catch (error) {
    console.error("Error deleting category:", error);
    return NextResponse.json(
      {
        success: false,
        error: "Đã xảy ra lỗi khi xóa danh mục",
        details: error instanceof Error ? error.message : String(error),
      },
      { status: 500 },
    );
  }
}
