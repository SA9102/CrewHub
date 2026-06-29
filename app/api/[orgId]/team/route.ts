import { prisma } from "@/prisma"
import { NextRequest } from "next/server"

export const GET = async (
  req: Request,
  { params }: { params: Promise<{ orgId: string }> }
) => {
  try {
    const orgId = (await params).orgId

    const teams = await prisma.team.findMany({
      where: {
        organisationId: orgId,
      },
    })
    return Response.json(teams, { status: 200 })
  } catch (err) {
    return Response.json({ error: err }, { status: 500 })
  }
}

export const POST = async (
  req: Request,
  { params }: { params: Promise<{ orgId: string }> }
) => {
  try {
    const orgId = (await params).orgId
    const body = (await req.json()).data
    // console.log(body)
    await prisma.team.create({
      data: {
        name: body.name,
        organisationId: orgId,
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
