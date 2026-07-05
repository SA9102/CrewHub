import { auth } from "@/auth"
import { prisma } from "@/prisma"

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

    if (!data) {
      return Response.json({ msg: "Team not found" }, { status: 404 })
    }

    let teamData = await prisma.usersOnTeams.findMany({
      where: {
        teamId: data.teamId,
      },
      include: {
        user: {
          omit: {
            password: true,
            organisationId: true,
          },
        },
      },
    })
    console.log("GETTING USERS")
    teamData = teamData.map((data) => data.user)
    console.log(teamData)
    return Response.json(teamData, { status: 200 })
  } catch (err) {
    console.error(err)
    return Response.json({ error: err }, { status: 500 })
  }
}
