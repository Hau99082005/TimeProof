import { NextRequest, NextResponse } from "next/server";
import jwt from "jsonwebtoken";
import { dbConnect } from "@/lib/dbConnect";
import {
  getTechnologyById,
  updateTechnology,
  deleteTechnology,
} from "@/model/technology";

interface JwtPayload {
  id: number;
  email: string;
  role: "admin" | "seller" | "customer";
}

const JWT_SECRET = process.env.JWT_SECRET || "your-secret-key-change-this";

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
    const formData = await req.formData();
    const name = formData.get("name") as string;
    const imageFile = formData.get("image") as File;

    const updates: any = {};

    if (name !== undefined && name !== null) {
      updates.name = name;
    }

    if (imageFile && imageFile.size > 0) {
      const bytes = await imageFile.arrayBuffer();
      const buffer = Buffer.from(bytes);
      updates.imageFile = buffer;
      updates.imageFileName = imageFile.name;
    }

    const technology = await updateTechnology(parseInt(id), updates);
    return NextResponse.json({ success: true, data: technology });
  } catch (error) {
    console.error("Error updating technology:", error);
    return NextResponse.json(
      {
        success: false,
        error: "Đã xảy ra lỗi khi cập nhật công nghệ",
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
      return NextResponse.json({ success: false, error: "Chưa đăng nhập!" }, { status: 401 });
    }

    const decoded = jwt.verify(token, JWT_SECRET) as JwtPayload;

    const pool = await dbConnect();
    const currentResult = await pool.query(
      "SELECT * FROM users WHERE id = $1",
      [decoded.id],
    );
    const currentUsers = currentResult.rows;
    if (currentUsers.length === 0) {
      return NextResponse.json({ success: false, error: "User not found" }, { status: 404 });
    }
    const currentUser = currentUsers[0];
    if (currentUser.role !== "admin") {
      return NextResponse.json({ success: false, error: "Access denied" }, { status: 403 });
    }

    const { id } = await params;
    await deleteTechnology(parseInt(id));

    return NextResponse.json({ success: true, message: "Xóa công nghệ thành công!" });
  } catch (error) {
    console.error("Error deleting technology:", error);
    return NextResponse.json(
      {
        success: false,
        error: "Đã xảy ra lỗi khi xóa công nghệ",
        details: error instanceof Error ? error.message : String(error),
      },
      { status: 500 },
    );
  }
}
