import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import jwt from "jsonwebtoken";

interface JwtPayload {
  id: number;
  email: string;
  role: "admin" | "seller" | "customer";
}

export async function middleware(req: NextRequest) {
  const { pathname } = req.nextUrl;
  
  const publicRoutes = [
    "/",
    "/login",
    "/register",
    "/api/auth/session",
    "/api/auth/me",
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
    const secret = process.env.JWT_SECRET || "7949c63004e75ce00b32af249d57276ad16b63a3c435aaf82ebd2d270a82e74d890858d4efe60ab390e0b13123e2d218429daca769d458202c23b51621f5de31";
    const decoded = jwt.verify(token, secret) as JwtPayload;
    
    const adminRoutes = ["/admin"];
    const sellerRoutes = ["/seller"];
    const customerRoutes = ["/customer"];

    if (adminRoutes.some((route) => pathname.startsWith(route)) && decoded.role !== "admin") {
      return NextResponse.redirect(new URL("/", req.url));
    }
    if (sellerRoutes.some((route) => pathname.startsWith(route)) && decoded.role !== "seller") {
      return NextResponse.redirect(new URL("/", req.url));
    }
    if (customerRoutes.some((route) => pathname.startsWith(route)) && decoded.role !== "customer") {
      return NextResponse.redirect(new URL("/", req.url));
    }

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
