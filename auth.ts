import NextAuth from "next-auth"
import Credentials from "next-auth/providers/credentials"
import { hashAndSaltPassword, verifyPassword } from "@/lib/auth"
import GitHub from "next-auth/providers/github"
import { prisma } from "./prisma"
import Resend from "next-auth/providers/resend"
import { signinInput } from "./lib/types/inputs"

console.log("AUTH CONFIG LOADED")

export const { handlers, signIn, signOut, auth } = NextAuth({
  providers: [
    // Resend,
    Credentials({
      credentials: {
        email: {},
        password: {},
      },
      authorize: async (credentials) => {
        let user = null

        user = await prisma.user.findUnique({
          where: {
            email: credentials.email as string,
          },
        })

        if (!user) {
          console.log("user not found")
          throw new Error("Invalid credentials")
        }

        const isValid = await verifyPassword(
          credentials.password as string,
          user.password
        )

        if (!isValid) {
          console.log("invalid")
          throw new Error("Invalid credentials")
        }

        console.log("User found")
        return user
      },
    }),
    // GitHub,
  ],
})
