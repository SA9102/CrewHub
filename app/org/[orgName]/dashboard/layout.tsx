import AppSidebar from "@/components/custom/AppSidebar"
import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar"

const Layout = ({ children }) => {
  return (
    <SidebarProvider>
      <AppSidebar />
      <SidebarTrigger />
      {children}
    </SidebarProvider>
  )
}

export default Layout
