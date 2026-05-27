import { signIn } from "@/auth"

export const POST = async (req: Request) => {
  try {
    let body = await req.json()
    console.log(body)
    await signIn("resend", body.email)
  } catch (err) {
    return Response.json({ error: "Something went wrong" }, { status: 500 })
  }
}
