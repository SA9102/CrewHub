import { prisma } from "@/prisma"
import { NextRequest } from "next/server"

export const GET = async (
  req: Request,
  { params }: { params: Promise<{ orgId: string }> }
) => {
  try {
    const orgId = (await params).orgId
    console.log(orgId)

    const users = await prisma.user.findMany({
      where: {
        organisationId: orgId,
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
