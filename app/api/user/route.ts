import { hashAndSaltPassword } from "@/lib/auth"
import { prisma } from "@/lib/prisma"
import { signupInput } from "@/lib/types/inputs"

/**
 * Creates a new user
 * @param req
 * @returns void
 */
export const POST = async (req: Request) => {
  try {
    let body: signupInput = await req.json()
    body = {
      ...body,
      firstName: body.firstName.trim(),
      lastName: body.lastName.trim(),
      email: body.email.toLowerCase().trim(),
    }

    // ChatGPT-generated regex for checking name criteria
    const nameRegex = /^[a-zA-Z\s'-]{2,50}$/

    // ChatGPT-generated regex for checking email criteria
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/

    // ChatGPT-generated regex for checking password criteria
    const passwordRegex =
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*_\-+=?]).{8,}$/

    // Check if first name meets criteria
    if (!nameRegex.test(body.firstName)) {
      return Response.json(
        { error: "First name has invalid characters/length" },
        { status: 400 }
      )
    }

    // Check if last name meets criteria
    if (!nameRegex.test(body.lastName)) {
      return Response.json(
        { error: "Last name has invalid characters/length" },
        { status: 400 }
      )
    }

    // Check if email meets criteria
    if (!emailRegex.test(body.email)) {
      return Response.json({ error: "Invalid email" }, { status: 400 })
    }

    // Check if email already exists
    const emailExists = await prisma.user.findUnique({
      where: { email: body.email },
    })

    if (emailExists) {
      return Response.json({ error: "Email already taken" }, { status: 409 })
    }

    // Check if password meets criteria
    console.log("BODY PASSWORD")
    console.log(body.password)

    if (!passwordRegex.test(body.password)) {
      return Response.json(
        { error: "Password does not meet all criteria" },
        { status: 400 }
      )
    }

    // Check if confirm password matches password
    if (body.password !== body.confirmPassword) {
      return Response.json({ error: "Passwords do not match" }, { status: 400 })
    }

    const hashedPassword = await hashAndSaltPassword(body.password)

    const user = await prisma.user.create({
      data: {
        firstName: body.firstName,
        lastName: body.lastName,
        email: body.email,
        password: hashedPassword,
      },
    })

    return Response.json(
      {
        user: {
          firstName: body.firstName,
          lastName: body.lastName,
          email: body.email,
        },
      },
      { status: 201 }
    )
  } catch (err) {
    return Response.json({ error: "Something went wrong" }, { status: 500 })
  }
}
