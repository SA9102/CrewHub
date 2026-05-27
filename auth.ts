import NextAuth from "next-auth"
import Credentials from "next-auth/providers/credentials"
import { hashAndSaltPassword } from "@/lib/auth"
import GitHub from "next-auth/providers/github"
import { PrismaAdapter } from "@auth/prisma-adapter"
import { prisma } from "./prisma"
import Resend from "next-auth/providers/resend"

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
      authorize: async (credentials) => {
        let user = null

        if (!credentials || typeof credentials.password !== "string") {
          throw new Error("Missing or invalid password")
        }

        // logic to salt and hash password
        const pwHash = await hashAndSaltPassword(credentials.password)

        // logic to verify if the user exists
        // user = await getUserFromDb(credentials.email, pwHash)
        user = null

        if (!user) {
          // No user found, so this is their first attempt to login
          // Optionally, this is also the place you could do a user registration
          throw new Error("Invalid credentials.")
        }

        // return user object with their profile data
        return user
      },
    }),
    // GitHub,
  ],
})

// import { Resend } from 'resend';

// const resend = new Resend('re_Xw6gxvfQ_MxGiBSZZK6Kf5XkKfCqZKCQD');

// resend.emails.send({
//   from: 'onboarding@resend.dev',
//   to: 'shayan677@gmail.com',
//   subject: 'Hello World',
//   html: '<p>Congrats on sending your <strong>first email</strong>!</p>'
// });
