import { signIn } from "@/auth"

export const POST = async (req: Request) => {
  try {
    let body = await req.json()
    console.log("Before")
    await signIn("credentials", body)
    console.log("After")
  } catch (err) {
    console.error(err)
  }
}
