import { NextRequest, NextResponse } from "next/server";
import jwt from "jsonwebtoken";
import { dbConnect } from "@/lib/dbConnect";
import {
  getAllBanners,
  createBanner
} from "@/model/banner";

interface JwtPayload {
  id: number;
  email: string;
  role: "admin" | "seller" | "customer";
}

const JWT_SECRET = process.env.JWT_SECRET || "your-secret-key-change-this";

export async function GET() {
  try {
    const banners = await getAllBanners();
    return NextResponse.json({ success: true, data: banners });
  } catch (error) {
    console.error("Error getting banners:", error);
    return NextResponse.json(
      {
        success: false,
        error: "Đã xảy ra lỗi khi lấy danh sách banner",
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

    const formData = await req.formData();
    const title = formData.get("title") as string;
    const imageFile = formData.get("image") as File;

    if (!title) {
      return NextResponse.json(
        { success: false, error: "Tiêu đề là bắt buộc!" },
        { status: 400 },
      );
    }

    let bannerData: any = {
      title,
      image: "",
      image_url: "",
    };

    if (imageFile && imageFile.size > 0) {
      const bytes = await imageFile.arrayBuffer();
      const buffer = Buffer.from(bytes);
      bannerData.imageFile = buffer;
      bannerData.imageFileName = `banner-${Date.now()}`;
    }

    const banner = await createBanner(bannerData);
    return NextResponse.json({ success: true, data: banner }, { status: 201 });
  } catch (error) {
    console.error("Error creating banner:", error);
    return NextResponse.json(
      {
        success: false,
        error: "Đã xảy ra lỗi khi tạo banner",
        details: error instanceof Error ? error.message : String(error),
      },
      { status: 500 },
    );
  }
}
