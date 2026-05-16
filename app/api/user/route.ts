import { prisma } from "@/lib/prisma"
import { signupInput } from "@/lib/types/inputs"

export const POST = async (req: Request) => {
  try {
    const body: signupInput = await req.json()
    const passwordRegex =
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*_\-+=?]).{8,}$/

    const emailExists = await prisma.user.findUnique({
      where: { email: body.email },
    })

    if (emailExists) {
      return Response.json({ error: "Email already taken" }, { status: 400 })
    }

    if (!passwordRegex.test(body.password)) {
      return Response.json(
        { error: "Password does not meet all criteria" },
        { status: 400 }
      )
    }

    if (body.password !== body.confirmPassword) {
      return Response.json({ error: "Passwords do not match" }, { status: 400 })
    }

    const user = await prisma.user.create({
      data: {
        firstName: body.firstName,
        lastName: body.lastName,
        email: body.email,
      },
    })
    return Response.json(user, { status: 201 })
  } catch (err) {
    return Response.json({ error: "Something went wrong" }, { status: 500 })
  }
}
