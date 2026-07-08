import { auth } from "@/auth"
import { prisma } from "@/prisma"

// Get a single team
export const GET = async (
  req: Request,
  { params }: { params: Promise<{ teamId: string }> }
) => {
  try {
    const session = await auth()

    if (!session?.user.id) {
      return Response.json({ error: "Unauthorized" }, { status: 401 })
    }

    const teamId = (await params).teamId

    // Get the team data, but only on the condition that the user is authorized - that is, the user
    // actually belongs in the team. If not then throw an error.
    const data = await prisma.usersOnTeams.findFirstOrThrow({
      where: {
        userId: session?.user.id,
        teamId,
      },
      include: {
        team: true,
      },
    })
    return Response.json(data.team, { status: 200 })
  } catch (err) {
    console.error(err)
    return Response.json({ error: err }, { status: 500 })
  }
}

// Delete a team by team ID
export const DELETE = async (
  req: Request,
  { params }: { params: Promise<{ teamId: string }> }
) => {
  try {
    const session = await auth()
    const teamId = (await params).teamId

    await prisma.usersOnTeams.deleteMany({
      where: {
        teamId: teamId,
      },
    })
    await prisma.team.delete({
      where: {
        id: teamId,
        organisationId: session?.user.organisationId,
      },
    })
    console.log("SUCCEEDED")
    return Response.json({ status: 204 })
  } catch (err) {
    console.log(err)
    return Response.json({ error: err }, { status: 500 })
  }
}
