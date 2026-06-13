import NextAuth, { type DefaultSession } from "next-auth"
import Credentials from "next-auth/providers/credentials"
import { hashAndSaltPassword, verifyPassword } from "@/lib/auth"
import GitHub from "next-auth/providers/github"
import { prisma } from "./prisma"
import Resend from "next-auth/providers/resend"
import { signinInput } from "./lib/types/inputs"
import { JWT } from "next-auth/jwt"

console.log("AUTH CONFIG LOADED")

declare module "next-auth" {
  interface User {
    id: string
    organisationId: string
    role: string
  }

  interface Session {
    user: {
      organisationId: string
      role: string
    } & DefaultSession["user"]
  }
}

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
  pages: {
    signIn: "/auth/signin",
  },
  callbacks: {
    // authorized: async ({ auth }) => {
    //   return !!auth
    // },
    jwt({ token, user }) {
      if (user) {
        token.id = user.id
        token.organisationId = user.organisationId
        token.role = user.role
      }
      return token
    },
    session({ session, token }) {
      session.user.id = token.id as string
      session.user.organisationId = token.organisationId as string
      session.user.role = token.role as string
      return session
    },
  },
})
