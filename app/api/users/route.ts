import { prisma } from "@/lib/prisma"

export const postUser = async (data) => {
  await prisma.user.create({ data })
}
