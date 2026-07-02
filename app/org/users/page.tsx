import { auth } from "@/auth"
import Users from "@/components/custom/Users"
import axios from "axios"
import { redirect, RedirectType } from "next/navigation"

const page = async () => {
  const session = await auth()

  if (!session) redirect("/auth/signin", RedirectType.replace)

  return <Users session={session} />
}

export default page
