import { auth } from "@/auth"
import { Role } from "./generated/prisma/enums"

export const proxy = auth((req) => {
  if (!req.auth && req.nextUrl.pathname !== "/auth/signin") {
    const newUrl = new URL("/auth/signin", req.nextUrl.origin)
    return Response.redirect(newUrl)
  }
  if (
    req.nextUrl.pathname.includes("users") &&
    req.auth?.user.role !== Role.ADMIN
  ) {
    const newUrl = new URL("/auth/signin", req.nextUrl.origin)
    return Response.redirect(newUrl)
  }
})

export const config = {
  matcher: ["/((?!api|_next/static|_next/image|favicon.ico).*)"],
}
