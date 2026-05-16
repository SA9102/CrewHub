import { prisma } from "@/lib/prisma"

export const POST = async (req: Request) => {
  const body = await req.json()
  console.log(body)
  await prisma.user.create({ data: body })
}
