import { auth } from "@/auth"
import CreateEvent from "@/components/custom/pages/CreateEvent"
import { redirect, RedirectType } from "next/navigation"

const page = async () => {
  const session = await auth()
  if (!session) redirect("/auth/signin", RedirectType.replace)
  return <CreateEvent session={session} />
}

export default page
