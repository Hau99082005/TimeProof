import { NextRequest, NextResponse } from "next/server";
import jwt from "jsonwebtoken";
import { dbConnect } from "@/lib/dbConnect";
import { getAllUsers, getUserByEmail, createUserWithEmail } from "@/model/user";

interface JwtPayload {
  id: number;
  email: string;
  role: "admin" | "seller" | "customer";
}

const CORS_HEADERS = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Methods": "GET,POST,PUT,DELETE,OPTIONS",
  "Access-Control-Allow-Headers": "Content-Type, Authorization",
};

export async function OPTIONS() {
  return new Response(null, {
    status: 204,
    headers: CORS_HEADERS,
  });
}

export async function GET(request: NextRequest) {
  try {
    const token = request.cookies.get("token")?.value;
    if (!token) {
      return NextResponse.json(
        { error: "Unauthorized" },
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
        { error: "User not found" },
        { status: 404, headers: CORS_HEADERS },
      );
    }
    const currentUser = currentUsers[0];
    if (currentUser.role !== "admin") {
      return NextResponse.json(
        { error: "Access denied" },
        { status: 403, headers: CORS_HEADERS },
      );
    }

    const users = await getAllUsers();
    const sanitizedUsers = users.map((user) => {
      const { password_hash, ...rest } = user;
      return rest;
    });
    return NextResponse.json(sanitizedUsers, {
      status: 200,
      headers: {
        ...CORS_HEADERS,
        "Content-Type": "application/json",
      },
    });
  } catch (error: any) {
    console.error("Get users error:", error);
    return NextResponse.json(
      {
        error: "Internal Server Error",
        message: error.message,
        details:
          process.env.NODE_ENV === "development" ? error.stack : undefined,
      },
      {
        status: 500,
        headers: {
          ...CORS_HEADERS,
          "Content-Type": "application/json",
        },
      },
    );
  }
}

export async function POST(request: NextRequest) {
  try {
    const token = request.cookies.get("token")?.value;
    if (!token) {
      return NextResponse.json(
        { error: "Unauthorized" },
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
        { error: "User not found" },
        { status: 404, headers: CORS_HEADERS },
      );
    }
    const currentUser = currentUsers[0];
    if (currentUser.role !== "admin") {
      return NextResponse.json(
        { error: "Access denied" },
        { status: 403, headers: CORS_HEADERS },
      );
    }

    const body = await request.json();
    const { full_name, email, phone, role = "customer", status = true } = body;

    if (!full_name || !email) {
      return NextResponse.json(
        { success: false, message: "Tên và email là bắt buộc" },
        { status: 400, headers: CORS_HEADERS },
      );
    }

    const existingUser = await getUserByEmail(email.trim());
    if (existingUser) {
      return NextResponse.json(
        { success: false, message: "Email đã tồn tại" },
        { status: 409, headers: CORS_HEADERS },
      );
    }

    const newUser = await createUserWithEmail(
      {
        full_name: full_name.trim(),
        email: email.trim().toLowerCase(),
        avatar: "",
        role: role || "customer",
        wallet_balance: 0,
        status: status,
      },
      "temp123456",
    );

    const { password_hash, ...userWithoutPassword } = newUser;

    return NextResponse.json(userWithoutPassword, {
      status: 201,
      headers: {
        ...CORS_HEADERS,
        "Content-Type": "application/json",
      },
    });
  } catch (error: any) {
    console.error("Create user error:", error);
    return NextResponse.json(
      {
        error: "Internal Server Error",
        message: error.message,
        details:
          process.env.NODE_ENV === "development" ? error.stack : undefined,
      },
      {
        status: 500,
        headers: {
          ...CORS_HEADERS,
          "Content-Type": "application/json",
        },
      },
    );
  }
}
