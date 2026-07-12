import { auth } from "@/auth"
import { prisma } from "@/prisma"

// Get all events for a particular team, by team ID
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

    // Get the all events for a team, but only on the condition that the user is authorized - that is, the user
    // actually belongs in the team. If not then throw an error.
    const data = await prisma.usersOnTeams.findFirstOrThrow({
      where: {
        userId: session?.user.id,
        teamId,
      },
      include: {
        team: {
          include: {
            events: true,
          },
        },
      },
    })

    return Response.json(data.team.events, { status: 200 })
  } catch (err) {
    return Response.json({ error: err }, { status: 500 })
  }
}

export const POST = async (
  req: Request,
  { params }: { params: Promise<{ teamId: string }> }
) => {
  try {
    const body = await req.json()
    const session = await auth()
    const teamId = (await params).teamId

    if (!session?.user.id) {
      return Response.json({ error: "Unauthorized" }, { status: 401 })
    }

    // TODO - implement check for authorization
    console.log(body)
    await prisma.event.create({
      data: {
        name: body.name,
        description: body.description,
        start: body.start,
        end: body.end,
        organiserId: session?.user.id,
        teamId,
      },
    })
  } catch (err) {
    console.error(err)
  }
}
