import { auth } from "@/auth"
import { prisma } from "@/prisma"

// Delete user by
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
