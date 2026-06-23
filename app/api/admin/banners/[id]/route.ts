import { NextRequest, NextResponse } from "next/server";
import jwt from "jsonwebtoken";
import { dbConnect } from "@/lib/dbConnect";
import {
  getBannerById,
  updateBanner,
  deleteBanner,
} from "@/model/banner";

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
    const banner = await getBannerById(parseInt(id));

    if (!banner) {
      return NextResponse.json({ success: false, error: "Không tìm thấy banner!" }, { status: 404 });
    }

    return NextResponse.json({ success: true, data: banner });
  } catch (error) {
    console.error("Error getting banner:", error);
    return NextResponse.json(
      {
        success: false,
        error: "Đã xảy ra lỗi khi lấy banner",
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
      return NextResponse.json({ success: false, error: "Chưa đăng nhập!" }, { status: 401 });
    }

    const decoded = jwt.verify(token, JWT_SECRET) as JwtPayload;

    const pool = await dbConnect();
    const [currentUsers] = (await pool.execute(
      "SELECT * FROM users WHERE id = ?",
      [decoded.id],
    )) as any;
    if (currentUsers.length === 0) {
      return NextResponse.json({ success: false, error: "User not found" }, { status: 404 });
    }
    const currentUser = currentUsers[0];
    if (currentUser.role !== "admin") {
      return NextResponse.json({ success: false, error: "Access denied" }, { status: 403 });
    }

    const { id } = await params;
    const formData = await req.formData();
    const title = formData.get("title") as string;
    const imageFile = formData.get("image") as File;

    const updates: any = {};

    if (title !== undefined && title !== null) {
      updates.title = title;
    }

    if (imageFile && imageFile.size > 0) {
      const bytes = await imageFile.arrayBuffer();
      const buffer = Buffer.from(bytes);
      updates.imageFile = buffer;
      updates.imageFileName = `banner-${Date.now()}`;
    }

    const banner = await updateBanner(parseInt(id), updates);
    return NextResponse.json({ success: true, data: banner });
  } catch (error) {
    console.error("Error updating banner:", error);
    return NextResponse.json(
      {
        success: false,
        error: "Đã xảy ra lỗi khi cập nhật banner",
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
    const [currentUsers] = (await pool.execute(
      "SELECT * FROM users WHERE id = ?",
      [decoded.id],
    )) as any;
    if (currentUsers.length === 0) {
      return NextResponse.json({ success: false, error: "User not found" }, { status: 404 });
    }
    const currentUser = currentUsers[0];
    if (currentUser.role !== "admin") {
      return NextResponse.json({ success: false, error: "Access denied" }, { status: 403 });
    }

    const { id } = await params;
    await deleteBanner(parseInt(id));

    return NextResponse.json({ success: true, message: "Xóa banner thành công!" });
  } catch (error) {
    console.error("Error deleting banner:", error);
    return NextResponse.json(
      {
        success: false,
        error: "Đã xảy ra lỗi khi xóa banner",
        details: error instanceof Error ? error.message : String(error),
      },
      { status: 500 },
    );
  }
}
