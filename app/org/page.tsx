import { auth } from "@/auth"

const page = async () => {
  const session = await auth()

  console.log("SESSION")
  console.log(session)

  return (
    <>
      <p>Hello</p>
    </>
  )
}

export default page
