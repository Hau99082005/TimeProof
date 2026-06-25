import { NextRequest, NextResponse } from "next/server";
import jwt from "jsonwebtoken";
import { dbConnect } from "@/lib/dbConnect";
import {
  getAllCategories,
  getCategoryById,
  createCategory,
  updateCategory,
  deleteCategory
} from "@/model/technology";

interface JwtPayload {
  id: number;
  email: string;
  role: "admin" | "seller" | "customer";
}

const JWT_SECRET = process.env.JWT_SECRET || "your-secret-key-change-this";

export async function GET() {
  try {
    const categories = await getAllCategories();
    return NextResponse.json({ success: true, data: categories });
  } catch (error) {
    console.error("Error getting categories:", error);
    return NextResponse.json(
      {
        success: false,
        error: "Đã xảy ra lỗi khi lấy danh sách danh mục",
        details: error instanceof Error ? error.message : String(error),
      },
      { status: 500 },
    );
  }
}

export async function POST(req: NextRequest) {
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

    const body = await req.json();
    const { name, description } = body;

    if (!name) {
      return NextResponse.json(
        { success: false, error: "Tên danh mục là bắt buộc!" },
        { status: 400 },
      );
    }

    const category = await createCategory({ name, description });
    return NextResponse.json({ success: true, data: category }, { status: 201 });
  } catch (error) {
    console.error("Error creating category:", error);
    return NextResponse.json(
      {
        success: false,
        error: "Đã xảy ra lỗi khi tạo danh mục",
        details: error instanceof Error ? error.message : String(error),
      },
      { status: 500 },
    );
  }
}
