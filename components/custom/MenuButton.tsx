"use client"

import { SidebarMenuButton } from "../ui/sidebar"
import { redirect, RedirectType } from "next/navigation"

const MenuButton = ({ session }) => {
  return (
    <SidebarMenuButton
      onClick={() => {
        redirect(
          `/org/${session!.user.organisationId}/users`,
          RedirectType.push
        )
      }}
    >
      Users
    </SidebarMenuButton>
  )
}

export default MenuButton
