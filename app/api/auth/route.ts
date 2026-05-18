import { signIn } from "@/auth"

export const POST = async (req: Request) => {
  try {
    let body = await req.json()
    await signIn("credentials", body)
  } catch (err) {
    console.error(err)
  }
}
