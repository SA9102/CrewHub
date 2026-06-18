import { auth } from "@/auth"
import SignIn from "@/components/custom/pages/SignIn"

const page = async () => {
  // const session = await auth()

  return <SignIn />
}

export default page
