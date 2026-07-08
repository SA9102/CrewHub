import { auth } from "@/auth"
import { Role } from "@/generated/prisma/enums"
import { prisma } from "@/prisma"
import { NextRequest } from "next/server"

// Get multiple teams belonging to a specific organisation ID
export const GET = async (req: Request) => {
  try {
    const session = await auth()
    // console.log("SESSION")
    // console.log(session)

    // Fetch all teams in the organisation if user is an OWNER.
    // Otherwise, fetch only the teams that they are in.

    let teams

    if (session?.user.role === Role.OWNER) {
      teams = await prisma.team.findMany({
        where: {
          organisationId: session?.user.organisationId,
        },
      })
    } else {
      teams = await prisma.usersOnTeams.findMany({
        where: {
          userId: session?.user.id,
        },
        include: {
          team: true,
        },
      })

      // If this block has executed, then the data is not in the format we need it
      // in to be. So make sure it is in the right format before returning it.
      teams = teams.map((team) => team.team)
    }

    console.log(teams)

    return Response.json(teams, { status: 200 })
  } catch (err) {
    return Response.json({ error: err }, { status: 500 })
  }
}

// Create a team
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
