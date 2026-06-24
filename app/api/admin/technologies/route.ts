import { NextRequest, NextResponse } from "next/server";
import jwt from "jsonwebtoken";
import { dbConnect } from "@/lib/dbConnect";
import {
  getAllTechnologies,
  createTechnology
} from "@/model/technology";

interface JwtPayload {
  id: number;
  email: string;
  role: "admin" | "seller" | "customer";
}

const JWT_SECRET = process.env.JWT_SECRET || "your-secret-key-change-this";

export async function GET() {
  try {
    const technologies = await getAllTechnologies();
    return NextResponse.json({ success: true, data: technologies });
  } catch (error) {
    console.error("Error getting technologies:", error);
    return NextResponse.json(
      {
        success: false,
        error: "Đã xảy ra lỗi khi lấy danh sách công nghệ",
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
    const name = formData.get("name") as string;
    const imageFile = formData.get("image") as File;

    if (!name) {
      return NextResponse.json(
        { success: false, error: "Tên công nghệ là bắt buộc!" },
        { status: 400 },
      );
    }

    let techData: any = {
      name,
      images: "",
    };

    if (imageFile && imageFile.size > 0) {
      const bytes = await imageFile.arrayBuffer();
      const buffer = Buffer.from(bytes);
      techData.imageFile = buffer;
      techData.imageFileName = imageFile.name;
    }

    const technology = await createTechnology(techData);
    return NextResponse.json({ success: true, data: technology }, { status: 201 });
  } catch (error) {
    console.error("Error creating technology:", error);
    return NextResponse.json(
      {
        success: false,
        error: "Đã xảy ra lỗi khi tạo công nghệ",
        details: error instanceof Error ? error.message : String(error),
      },
      { status: 500 },
    );
  }
}
