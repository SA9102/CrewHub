import { auth } from "@/auth"
import Users from "@/components/custom/Users"
import axios from "axios"

const page = async () => {
  const session = await auth()

  return <Users session={session} />
}

export default page
