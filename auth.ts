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
      },
    }),
    // GitHub,
  ],
  callbacks: {
    jwt({ token, user }) {
      if (user) {
        token.id = user.id
      }
      return token
    },
    session({ session, token }) {
      session.user.id = token.id as string
      return session
    },
  },
})
