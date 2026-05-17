import NextAuth from "next-auth"
import Credentials from "next-auth/providers/credentials"
import { hashAndSaltPassword } from "@/lib/auth"
import GitHub from "next-auth/providers/github"

export const { handlers, signIn, signOut, auth } = NextAuth({
  providers: [
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
