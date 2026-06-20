import { signIn } from "@/auth"
import { prisma } from "@/prisma"

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

    // Before sending an invite email, first check if there already exists
    // an invite link in the database for that email.
    console.log("GETTING")
    // const inviteLinks = await prisma.inviteLink.findMany({
    //   where: {
    //     email: body.email,
    //   },
    //   orderBy: {
    //     expires: "desc",
    //   },
    // })

    // const inviteLink = inviteLinks[0]

    // console.log("INVITE LINK")
    // console.log(inviteLink)

    const inviteLink = null

    // If a link already exists for that email, check if it has not expired
    // If it has not expired (i.e. if the current datetime has not passed the expiry time),
    // then do not send a link.

    // -- Link object in DB should be automatically deleted if expired --
    // if (inviteLink) {
    //   console.log("Invite link has been found")
    //   if (Date.now() <= inviteLink.expires) {
    //     console.log("Not expired")
    //     return
    //   } else {
    //     console.log("Expired")
    //   }
    // } else {
    //   console.log("No invite link yet")
    // }

    const inviteToken = await prisma.inviteToken.create({
      data: {
        email: body.email,
        token: crypto.randomUUID(),
        organisationId: body.session.user.organisationId,
        expires: Date.now() + 20000,
      },
    })

    const response = await resend.emails.send({
      from: `Invite Link <admin@resend.dev>`,
      to: [body.email],
      subject: "Invitation",
      html:
        "<p>The admin of your organisation has invited you to create an account. <a href='http://localhost:3000/auth/" +
        inviteToken.token +
        "/create-user'>Click here to create your account.</a><br />The link will expire after 48 hours. If it has expired, please request a new invite token from your organisation admin.</a><br />If you believe this was sent in error, please ignore this email.</p>",
    })

    return Response.json({ message: "Ok" }, { status: 200 })
  } catch (error) {
    console.log(error)
    return Response.json(error, { status: 500 })
  }
}
