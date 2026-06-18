import { Role } from "@/generated/prisma/enums"
import { hashAndSaltPassword } from "@/lib/auth"
import { isValidName, isValidPassword } from "@/lib/utils"
import { prisma } from "@/prisma"

export const POST = async (req: Request) => {
  try {
    const body = await req.json()

    let error = isValidName(body.firstName)
    if (error) return error

    error = isValidName(body.lastName)
    if (error) return error

    error = isValidPassword(body.password)
    if (error) return error

    // Check if confirm password matches password
    if (body.password !== body.confirmPassword) {
      return Response.json({ error: "Passwords do not match" }, { status: 400 })
    }

    const hashedPassword = await hashAndSaltPassword(body.password)
    const newUser = await prisma.user.create({
      data: {
        firstName: body.firstName,
        lastName: body.lastName,
        email: body.email,
        password: hashedPassword,
        organisationId: body.organisationId,
        role: Role.USER,
      },
    })

    // return Response.json(
    //   {
    //     user: {
    //       firstName: body.firstName,
    //       lastName: body.lastName,
    //       email: body.email,
    //     },
    //   },
    //   { status: 201 }
    // )
  } catch (err) {
    console.error(err)
  }
}
