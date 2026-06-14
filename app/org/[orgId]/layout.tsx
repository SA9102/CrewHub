import AppSidebar from "@/components/custom/AppSidebar"
import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar"

const layout = ({ children }) => {
  return (
    <SidebarProvider>
      <AppSidebar />
      <SidebarTrigger />
      {children}
    </SidebarProvider>
  )
}

export default layout
