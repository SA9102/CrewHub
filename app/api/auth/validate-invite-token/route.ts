import { prisma } from "@/prisma"

export const POST = async (req: Request) => {
  try {
    const body = await req.json()
    const a = await prisma.organisation.findUniqueOrThrow({
      where: {
        id: body.orgId,
      },
    })
    console.log("still in try")
    console.log(a)
  } catch (err) {
    console.log(err)
    return Response.json(
      "Organisation not valid, or invite token has expired.",
      { status: 404 }
    )
  }
}
