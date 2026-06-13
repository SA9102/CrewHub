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

const AppSidebar = async () => {
  const session = await auth()

  return (
    <Sidebar>
      <SidebarHeader />
      <SidebarContent>
        <SidebarMenuItem>
          <SidebarMenuButton>Chats</SidebarMenuButton>
          {session?.user.role === Role.OWNER && (
            <SidebarMenuButton>Users</SidebarMenuButton>
          )}
        </SidebarMenuItem>
      </SidebarContent>
      <SidebarFooter />
    </Sidebar>
  )
}

export default AppSidebar
