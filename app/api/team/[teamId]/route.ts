import { auth } from "@/auth"
import { prisma } from "@/prisma"

// Get a single team
export const GET = async (
  req: Request,
  { params }: { params: Promise<{ teamId: string }> }
) => {
  try {
    const session = await auth()
    const teamId = (await params).teamId

    const data = await prisma.usersOnTeams.findFirst({
      where: {
        userId: session?.user.id,
        teamId,
      },
    })

    // If null, then either the team doesn't exist, or the user is unauthorized.
    // Either way, return a 404 Not Found error, for security
    if (!data) {
      return Response.json({ msg: "Team not found" }, { status: 404 })
    }
    console.log(data)
    const teamData = await prisma.team.findUnique({
      where: {
        id: data.teamId,
      },
    })
    return Response.json(teamData, { status: 200 })
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
