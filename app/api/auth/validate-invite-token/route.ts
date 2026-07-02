import { prisma } from "@/prisma"

export const POST = async (req: Request) => {
  try {
    const body = await req.json()
    const inviteToken = await prisma.inviteToken.findUniqueOrThrow({
      where: {
        token: body.token,
      },
    })

    if (Date.now() > inviteToken.expires) {
      return Response.json(
        "Organisation not valid, or invite token has expired.",
        { status: 404 }
      )
    }

    return Response.json(
      { email: inviteToken.email, organisationId: inviteToken.organisationId },
      { status: 200 }
    )
  } catch (err) {
    return Response.json(
      "Organisation not valid, or invite token has expired.",
      { status: 404 }
    )
  }
}
