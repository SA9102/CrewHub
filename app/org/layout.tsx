// The root layout of all routes starting with /org

import AppSidebar from "@/components/custom/AppSidebar"
import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar"

// All this layout does is redirect the user to the signin page
// if they don't have a valid session. This occurs if they click
// 'sign out' if logged in, or manually go to a valid/invalid org
// via the URL if they don't have a session.

// import { auth } from "@/auth"
// import { redirect, RedirectType } from "next/navigation"

const OrgLayout = async ({
  children,
}: Readonly<{
  children: React.ReactNode
}>) => {
  // const session = await auth()

  // if (!session) {
  //   redirect(`/auth/signin`, RedirectType.replace)
  // }

  return (
    <SidebarProvider>
      <AppSidebar />
      <SidebarTrigger />
      <div className="flex flex-col gap-5 p-5">{children}</div>
    </SidebarProvider>
  )
}

export default OrgLayout
