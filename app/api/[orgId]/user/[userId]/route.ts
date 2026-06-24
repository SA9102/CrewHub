import { prisma } from "@/prisma"

export const DELETE = async (
  req: Request,
  { params }: { params: Promise<{ orgId: string; userId: string }> }
) => {
  try {
    const orgId = (await params).orgId
    const userId = (await params).userId

    await prisma.user.delete({
      where: {
        id: userId,
        organisationId: orgId,
      },
    })
    return Response.json({ status: 204 })
  } catch (err) {
    return Response.json({ error: err }, { status: 500 })
  }
}
