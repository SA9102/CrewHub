import { auth } from "@/auth"
import { prisma } from "@/prisma"

export const GET = async (
  req: Request,
  { params }: { params: Promise<{ userId: string }> }
) => {
  try {
    const session = await auth()
    const userId = (await params).userId
    const user = await prisma.user.findUniqueOrThrow({
      where: {
        id: userId,
        organisationId: session?.user.organisationId,
      },
      omit: {
        password: true,
      },
    })
    return Response.json(user, { status: 200 })
  } catch (err) {
    return Response.json({ error: err }, { status: 500 })
  }
}

// Delete user by ID
export const DELETE = async (req: Request) => {
  try {
    const session = await auth()

    await prisma.user.delete({
      where: {
        id: session?.user.id,
        organisationId: session?.user.organisationId,
      },
    })
    return Response.json({ status: 204 })
  } catch (err) {
    return Response.json({ error: err }, { status: 500 })
  }
}
