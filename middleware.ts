import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import jwt from "jsonwebtoken";

export async function middleware(req: NextRequest) {
  const { pathname } = req.nextUrl;
  
  const publicRoutes = [
    "/",
    "/login",
    "/register",
    "/api/auth/session",
    "/_next",
    "/static",
    "/favicon.ico",
  ];
  const isPublicRoute = publicRoutes.some((route) => 
    pathname === route || pathname.startsWith(route) || /\.(?:svg|png|jpg|jpeg|gif|webp)$/.test(pathname)
  );

  if (isPublicRoute) {
    return NextResponse.next();
  }

  const token = req.cookies.get("token")?.value;

  if (!token) {
    const loginUrl = new URL("/login", req.url);
    return NextResponse.redirect(loginUrl);
  }

  try {
    const secret = process.env.JWT_SECRET || "your-secret-key-change-this";
    jwt.verify(token, secret);
    return NextResponse.next();
  } catch (error) {
    const loginUrl = new URL("/login", req.url);
    const response = NextResponse.redirect(loginUrl);
    response.cookies.delete("token");
    return response;
  }
}

export const config = {
  matcher: [
    "/((?!_next|static|favicon.ico|.*\\.(?:svg|png|jpg|jpeg|gif|webp)$).*)",
    "/(api|trpc)(.*)"
  ],
};
