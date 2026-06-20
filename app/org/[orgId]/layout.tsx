import AppSidebar from "@/components/custom/AppSidebar"
import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar"
import React from "react"

interface props {
  children: React.ReactNode
}

const layout = ({ children }: props) => {
  return (
    <SidebarProvider>
      <AppSidebar />
      <SidebarTrigger />
      {children}
    </SidebarProvider>
  )
}

export default layout
