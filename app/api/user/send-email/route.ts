import { signIn } from "@/auth"

/*

TODO

- Link needs expiry data
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
      subject: "Verify your account",
      html: "<p>The admin of your organisation has invited you to create an account. Click the link below to do so.<br />If you believe this was done in error, please ignore this email.</p>",
    })
    return Response.json({ message: "Ok" }, { status: 200 })
  } catch (error) {
    return Response.json(error, { status: 500 })
  }
}
