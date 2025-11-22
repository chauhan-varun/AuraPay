import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export async function proxy(request: NextRequest) {
  const { pathname } = request.nextUrl;
  const response = NextResponse.next();

  // Add CORS headers for better-auth
  response.headers.set("Access-Control-Allow-Credentials", "true");
  response.headers.set("Access-Control-Allow-Origin", request.headers.get("origin") || "*");
  response.headers.set("Access-Control-Allow-Methods", "GET,POST,PUT,DELETE,OPTIONS");
  response.headers.set("Access-Control-Allow-Headers", "Content-Type, Authorization");

  // Protect admin routes - check for session cookie with updated prefix
  if (pathname.startsWith("/admin") && !pathname.startsWith("/admin/login")) {
    // Check for session cookie with the new "aurapay" prefix
    const sessionCookie = request.cookies.get("aurapay.session_token") || 
                         request.cookies.get("better-auth.session_token");
    
    if (!sessionCookie) {
      // No session cookie, redirect to admin login
      return NextResponse.redirect(new URL("/admin/login", request.url));
    }
  }

  return response;
}

export const config = {
  matcher: [
    "/admin/:path*",
    "/api/auth/:path*",
    "/api/admin/:path*",
  ],
};
