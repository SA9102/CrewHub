import { auth } from "@/auth"
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarHeader,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar"
import { Role } from "@/generated/prisma/enums"
import { redirect, RedirectType } from "next/navigation"
import MenuButton from "./MenuButton"

const AppSidebar = async () => {
  const session = await auth()

  return (
    <Sidebar>
      <SidebarHeader />
      <SidebarContent>
        <SidebarMenuItem>
          <SidebarMenuButton>Chats</SidebarMenuButton>
          {session?.user.role === Role.OWNER && (
            <>
              <MenuButton text="Users" finalPath="users" session={session} />
              <MenuButton text="Teams" finalPath="teams" session={session} />
            </>
          )}
        </SidebarMenuItem>
      </SidebarContent>
      <SidebarFooter />
    </Sidebar>
  )
}

export default AppSidebar
