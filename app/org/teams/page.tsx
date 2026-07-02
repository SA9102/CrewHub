import { auth } from "@/auth"
import Teams from "@/components/custom/pages/Teams"
import axios from "axios"
import { redirect, RedirectType } from "next/navigation"

const page = async () => {
  const session = await auth()
  if (!session) redirect("/auth/signin", RedirectType.replace)

  return <Teams session={session} />
}

export default page
