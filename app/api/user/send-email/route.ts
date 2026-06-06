import { signIn } from "@/auth"

/*

TODO

- Link needs expiry data
- Link cannot be used more than once
- Should not be able to send more than one invite to a user unless link expired

*/

import { Resend } from "resend"

const resend = new Resend(process.env.RESEND_API_KEY)

export const POST = async (req: Request) => {
  try {
    let body = await req.json()
    console.log(body)
    const response = await resend.emails.send({
      from: "Admin <aaa@resend.dev>",
      to: ["shayan677@gmail.com"],
      subject: "Invitation",
      html: "<p>The admin of your organisation has invited you to create an account. <a href='http://localhost:3000/auth/signin'>Click here to create your account.</a><br />If you believe this was done in error, please ignore this email.</p>",
    })

    return Response.json({ message: "Ok" }, { status: 200 })
  } catch (error) {
    return Response.json(error, { status: 500 })
  }
}
