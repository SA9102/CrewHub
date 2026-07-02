import { auth } from "@/auth"
import Team from "@/components/custom/pages/Team"

const page = async () => {
  const session = await auth()

  return <Team session={session} />
}

export default page
