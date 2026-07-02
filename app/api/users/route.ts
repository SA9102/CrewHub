import { auth } from "@/auth"
import { prisma } from "@/prisma"
import { NextRequest } from "next/server"

// Get many users
export const GET = async (req: Request) => {
  try {
    const session = await auth()

    const users = await prisma.user.findMany({
      where: {
        organisationId: session?.user.organisationId,
      },
      omit: {
        password: true,
        organisationId: true,
      },
    })

    return Response.json(users, { status: 200 })
  } catch (err) {
    return Response.json({ error: err }, { status: 500 })
  }
}
