import { prisma } from "@/prisma"

export const POST = async (req: Request) => {
  try {
    console.log("IN VALIDATING TOKEN")
    const body = await req.json()
    console.log("BODY")
    console.log(body)
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

    console.log(inviteToken)
    console.log("SUCCESS")
    return Response.json(
      { email: inviteToken.email, organisationId: inviteToken.organisationId },
      { status: 200 }
    )
  } catch (err) {
    console.log(err)
    return Response.json(
      "Organisation not valid, or invite token has expired.",
      { status: 404 }
    )
  }
}
