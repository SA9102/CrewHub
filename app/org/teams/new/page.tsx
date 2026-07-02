import { auth } from "@/auth"
import CreateTeam from "@/components/custom/pages/CreateTeam"
import axios from "axios"
import { redirect, RedirectType } from "next/navigation"

const page = async () => {
  const session = await auth()
  if (!session) redirect("/auth/signin", RedirectType.replace)

  return <CreateTeam session={session} />
}

export default page
