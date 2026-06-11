import { auth } from "@/auth"
import { redirect, RedirectType } from "next/navigation"

const page = async () => {
  const session = await auth()

  if (session) {
    redirect(
      `/org/${session.user.organisationId}/dashboard`,
      RedirectType.replace
    )
  }

  return <></>
}

export default page
