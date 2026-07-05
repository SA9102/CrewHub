import { auth } from "@/auth"
import Team from "@/components/custom/layouts/Team"
import { H2 } from "@/components/ui/typography"
import { Button } from "@base-ui/react"

const layout = async ({
  children,
}: Readonly<{
  children: React.ReactNode
}>) => {
  const session = await auth()

  return (
    <>
      <Team session={session!} />
      {children}
    </>
  )
}

export default layout
