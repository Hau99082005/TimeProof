import { NextRequest, NextResponse } from "next/server";
import jwt from "jsonwebtoken";
import { dbConnect } from "@/lib/dbConnect";
import { writeFile, mkdir, unlink } from "fs/promises";
import { join } from "path";
import { existsSync } from "fs";

interface JwtPayload {
  id: number;
  email: string;
  role: "admin" | "seller" | "customer";
}

const CORS_HEADERS = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Methods": "POST,OPTIONS",
  "Access-Control-Allow-Headers": "Content-Type, Authorization",
};

export async function OPTIONS() {
  return new Response(null, {
    status: 204,
    headers: CORS_HEADERS,
  });
}

export async function POST(request: NextRequest) {
  try {
    const token = request.cookies.get("token")?.value;
    if (!token) {
      return NextResponse.json(
        { success: false, error: "Chưa đăng nhập!" },
        { status: 401, headers: CORS_HEADERS },
      );
    }

    const secret = process.env.JWT_SECRET || "your-secret-key-change-this";
    const decoded = jwt.verify(token, secret) as JwtPayload;

    const pool = await dbConnect();

    const [currentUsers] = (await pool.execute(
      "SELECT * FROM users WHERE id = ?",
      [decoded.id],
    )) as any;
    if (currentUsers.length === 0) {
      return NextResponse.json(
        { success: false, error: "Không tìm thấy người dùng!" },
        { status: 404, headers: CORS_HEADERS },
      );
    }

    const contentType = request.headers.get("content-type") || "";
    let updates: string[] = [];
    let values: any[] = [];
    let avatarPath: string | undefined;

    if (contentType.includes("multipart/form-data")) {
      const formData = await request.formData();
      const file = formData.get("avatar") as File;
      const fullName = formData.get("full_name") as string;

      if (fullName) {
        updates.push("full_name = ?");
        values.push(fullName);
      }

      if (file) {
        const uploadDir = join(process.cwd(), "public", "images", "avatars");
        if (!existsSync(uploadDir)) {
          await mkdir(uploadDir, { recursive: true });
        }

        const uniqueSuffix = Date.now() + "-" + Math.round(Math.random() * 1e9);
        const ext = file.type.split("/")[1];
        const filename = `avatar-${decoded.id}-${uniqueSuffix}.${ext}`;
        const filepath = join(uploadDir, filename);

        const buffer = Buffer.from(await file.arrayBuffer());
        await writeFile(filepath, buffer);

        avatarPath = `/images/avatars/${filename}`;
        updates.push("avatar = ?");
        values.push(avatarPath);

        const oldAvatar = currentUsers[0].avatar;
        if (oldAvatar && oldAvatar.startsWith("/images/avatars/")) {
          const oldFilePath = join(process.cwd(), "public", oldAvatar);
          try {
            await unlink(oldFilePath);
          } catch {}
        }
      }
    } else {
      const body = await request.json();
      const { full_name } = body;

      if (full_name) {
        updates.push("full_name = ?");
        values.push(full_name);
      }
    }

    if (updates.length === 0) {
      return NextResponse.json(
        { success: false, error: "Không có trường nào để cập nhật!" },
        { status: 400, headers: CORS_HEADERS },
      );
    }

    values.push(decoded.id);

    await pool.execute(
      `UPDATE users SET ${updates.join(", ")}, updated_at = NOW() WHERE id = ?`,
      values,
    );

    const [updatedUsers] = (await pool.execute(
      "SELECT * FROM users WHERE id = ?",
      [decoded.id],
    )) as any;
    const updatedUser = updatedUsers[0];
    const { password_hash, ...userWithoutPassword } = updatedUser;

    return NextResponse.json(
      { success: true, data: userWithoutPassword },
      { headers: CORS_HEADERS },
    );
  } catch (error: any) {
    console.error("Update user error:", error);
    return NextResponse.json(
      {
        success: false,
        error: "Đã xảy ra lỗi khi cập nhật thông tin!",
        message: error.message,
      },
      {
        status: 500,
        headers: CORS_HEADERS,
      },
    );
  }
}
