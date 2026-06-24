import { prisma } from "@/prisma"
import { NextRequest } from "next/server"

export const GET = async (
  req: Request,
  { params }: { params: Promise<{ orgId: string }> }
) => {
  try {
    const orgId = (await params).orgId

    const teams = await prisma.organisationsOnTeams.findMany({
      where: {
        organisationId: orgId,
      },
    })

    console.log(teams)

    return Response.json(teams, { status: 200 })
  } catch (err) {
    return Response.json({ error: err }, { status: 500 })
  }
}
