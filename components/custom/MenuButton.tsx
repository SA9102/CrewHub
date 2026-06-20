"use client"

import { Session } from "next-auth"
import { SidebarMenuButton } from "../ui/sidebar"
import { redirect, RedirectType } from "next/navigation"

interface props {
  session: Session
}

const MenuButton = ({ session }: props) => {
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
