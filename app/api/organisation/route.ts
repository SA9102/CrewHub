import { hashAndSaltPassword } from "@/lib/auth"
import { prisma } from "@/lib/prisma"
import { signupInput } from "@/lib/types/inputs"
import { hasFailedRegex } from "@/lib/utils"
import { v4 as uuidv4 } from "uuid"

/**
 * Creates a new organisation and its top-level admin
 * @param req
 * @returns void
 */
export const POST = async (req: Request) => {
  try {
    let body: signupInput = await req.json()
    body = {
      ...body,
      organisationName: body.organisationName.trim(),
      firstName: body.firstName.trim(),
      lastName: body.lastName.trim(),
      email: body.email.toLowerCase().trim(),
    }

    // ChatGPT-generated regex for checking organisation name criteria
    const organisationRegex = /^[a-zA-Z0-9][a-zA-Z0-9 '&-]{1,48}[a-zA-Z0-9]$/

    // ChatGPT-generated regex for checking name criteria
    const nameRegex = /^[a-zA-Z\s'-]{2,50}$/

    // ChatGPT-generated regex for checking email criteria
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/

    // ChatGPT-generated regex for checking password criteria
    const passwordRegex =
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*_\-+=?]).{8,}$/

    let error = hasFailedRegex(
      "Organisation name",
      body.organisationName,
      organisationRegex
    )
    if (error) return error

    error = hasFailedRegex("First name", body.firstName, nameRegex)
    if (error) return error

    error = hasFailedRegex("Last name", body.lastName, nameRegex)
    if (error) return error

    error = hasFailedRegex("Email", body.email, emailRegex)
    if (error) return error

    // Check if email already exists
    const emailExists = await prisma.user.findUnique({
      where: { email: body.email },
    })

    if (emailExists) {
      return Response.json({ error: "Email already taken" }, { status: 409 })
    }

    // Check if password meets criteria

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

    const organisationId = uuidv4()

    const newOrganisation = await prisma.organisation.create({
      data: {
        id: organisationId,
        name: body.organisationName,
      },
    })

    const hashedPassword = await hashAndSaltPassword(body.password)
    const newAdminUser = await prisma.user.create({
      data: {
        firstName: body.firstName,
        lastName: body.lastName,
        email: body.email,
        password: hashedPassword,
        organisationId,
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
    console.log(err)
    return Response.json({ error: "Something went wrong" }, { status: 500 })
  }
}
