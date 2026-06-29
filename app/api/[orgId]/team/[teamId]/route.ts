import { prisma } from "@/prisma"

export const DELETE = async (
  req: Request,
  { params }: { params: Promise<{ orgId: string; teamId: string }> }
) => {
  try {
    const orgId = (await params).orgId
    const teamId = (await params).teamId
    console.log("IN DELETE")
    console.log(orgId)
    console.log(teamId)
    await prisma.usersOnTeams.deleteMany({
      where: {
        teamId: teamId,
      },
    })
    await prisma.team.delete({
      where: {
        id: teamId,
        organisationId: orgId,
      },
    })
    console.log("SUCCEEDED")
    return Response.json({ status: 204 })
  } catch (err) {
    console.log(err)
    return Response.json({ error: err }, { status: 500 })
  }
}
