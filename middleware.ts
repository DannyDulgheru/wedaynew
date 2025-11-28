import { withAuth } from "next-auth/middleware"
import { NextResponse } from "next/server"

export default withAuth(
  function middleware(req) {
    const token = req.nextauth.token
    const path = req.nextUrl.pathname

    // Admin routes - only ADMIN role
    if (path.startsWith("/admin")) {
      if (token?.role !== "ADMIN") {
        return NextResponse.redirect(new URL("/auth/login?error=unauthorized", req.url))
      }
    }

    // Client routes - only CLIENT role
    if (path.startsWith("/client")) {
      if (token?.role !== "CLIENT") {
        return NextResponse.redirect(new URL("/auth/login?error=unauthorized", req.url))
      }
    }

    return NextResponse.next()
  },
  {
    callbacks: {
      authorized: ({ token }) => !!token
    },
  }
)

export const config = {
  matcher: ["/admin/:path*", "/client/:path*"]
}
