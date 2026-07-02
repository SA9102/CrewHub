import { auth } from "@/auth"
import { prisma } from "@/prisma"
import { NextRequest } from "next/server"

export const GET = async (req: Request) => {
  try {
    const session = await auth()
    const teams = await prisma.team.findMany({
      where: {
        organisationId: session?.user.organisationId,
      },
    })
    return Response.json(teams, { status: 200 })
  } catch (err) {
    return Response.json({ error: err }, { status: 500 })
  }
}

// Create an organisation
export const POST = async (req: Request) => {
  try {
    const session = await auth()
    const body = (await req.json()).data
    // console.log(body)
    await prisma.team.create({
      data: {
        name: body.name,
        organisationId: session?.user.organisationId,
        users: {
          create: body.members.map((userId: string) => ({
            user: {
              connect: { id: userId },
            },
          })),
        },
      },
    })
    console.log("RETURNING")
    return Response.json({ status: 200 })
  } catch (err) {
    return Response.json({ error: err }, { status: 500 })
  }
}
