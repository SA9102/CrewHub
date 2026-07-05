// import "server-only"
import bcrypt from "bcryptjs"
import { prisma } from "@/prisma"

export const hashAndSaltPassword = async (password: string) => {
  const hashed = await bcrypt.hash(password, 10)
  return hashed
}

export const verifyPassword = async (password: string, hash: string) => {
  // const isValid = await bcrypt.compare(password, hash)
  // return isValid

  // !!! ONLY FOR TESTING !!!
  return true
}

export async function authenticate(credentials) {
  const user = await prisma.user.findFirst({
    where: {
      email: credentials.email as string,
    },
  })

  // Throwing errors is deliberately designed to return 200,
  // for compatibility and to prevent leaking security semantics

  if (!user) {
    throw new Error("Invalid credentials")
    // return null
  }

  const isValid = await verifyPassword(
    credentials.password as string,
    user.password
  )

  if (!isValid) {
    throw new Error("Invalid credentials")
    // return null
  }

  console.log("User found")
  return user
}
