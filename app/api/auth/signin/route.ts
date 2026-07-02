// import { handlers } from "@/auth"

import { signIn } from "next-auth/react"

// export const { GET, POST } = handlers
export const POST = async (req: Request) => {
  try {
    const body = await req.json()
    const res = await signIn("credentials", {
      ...body,
      redirect: false,
    })
    return Response.json({ status: 200 })
  } catch (err) {
    return Response.json({ error: "Something went wrong" }, { status: 500 })
  }
}
