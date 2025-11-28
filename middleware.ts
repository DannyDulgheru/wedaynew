import { auth } from "@/lib/auth"
import { NextResponse } from "next/server"

export default auth((req) => {
  const token = req.auth
  const path = req.nextUrl.pathname

  // Check if user is authenticated
  if (!token) {
    return NextResponse.redirect(new URL("/auth/login", req.url))
  }

  // Admin routes - only ADMIN role
  if (path.startsWith("/admin")) {
    if (token?.user?.role !== "ADMIN") {
      return NextResponse.redirect(new URL("/auth/login?error=unauthorized", req.url))
    }
  }

  // Client routes - only CLIENT role
  if (path.startsWith("/client")) {
    if (token?.user?.role !== "CLIENT") {
      return NextResponse.redirect(new URL("/auth/login?error=unauthorized", req.url))
    }
  }

  return NextResponse.next()
})

export const config = {
  matcher: ["/admin/:path*", "/client/:path*"]
}
