import { auth } from "@/auth"
import { Role } from "./generated/prisma/enums"

export const proxy = auth((req) => {
  // Redirect user to signin page if not authenticated
  if (!req.auth && req.nextUrl.pathname !== "/auth/signin") {
    const newUrl = new URL("/auth/signin", req.nextUrl.origin)
    return Response.redirect(newUrl)
  }
  // If authenticated but not owner
  // -- FIXME --
  // if (
  //   req.nextUrl.pathname.includes("users") &&
  //   req.auth?.user.role !== Role.OWNER
  // ) {
  //   const newUrl = new URL("/auth/signin", req.nextUrl.origin)
  //   return Response.redirect(newUrl)
  // }
})

export const config = {
  matcher: ["/((?!api|_next/static|_next/image|favicon.ico).*)"],
}
