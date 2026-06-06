import NextAuth from "next-auth"
import Credentials from "next-auth/providers/credentials"
import { hashAndSaltPassword } from "@/lib/auth"
import GitHub from "next-auth/providers/github"
import { PrismaAdapter } from "@auth/prisma-adapter"
import { prisma } from "./prisma"
import Resend from "next-auth/providers/resend"
import { signinInput } from "./lib/types/inputs"

export const { handlers, signIn, signOut, auth } = NextAuth({
  adapter: PrismaAdapter(prisma),
  providers: [
    Resend,
    Credentials({
      credentials: {
        email: {
          type: "email",
          label: "Email",
          placeholder: "johndoe@gmail.com",
        },
        password: {
          type: "password",
          label: "Password",
          placeholder: "*****",
        },
      },
      authorize: async (credentials: signinInput) => {
        try {
          console.log("IN AUTHORIZE")
          let user = null

          if (
            !credentials ||
            typeof credentials.email !== "string" ||
            typeof credentials.password !== "string"
          ) {
            throw new Error("Missing or invalid credentials")
          }

          // logic to salt and hash password
          const pwHash = await hashAndSaltPassword(credentials.password)

          // logic to verify if the user exists
          // user = await getUserFromDb(credentials.email, pwHash)
          user = await prisma.user.findUnique({
            where: {
              email: credentials.email,
              password: pwHash,
            },
          })

          if (!user) {
            // No user found, so this is their first attempt to login
            // Optionally, this is also the place you could do a user registration
            throw new Error("Invalid credentials.")
          }

          // return user object with their profile data
          return user
        } catch (err) {
          console.error(err)
        }
      },
    }),
    // GitHub,
  ],
})
