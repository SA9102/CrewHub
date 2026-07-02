"use client"

import { Session } from "next-auth"
import { SidebarMenuButton } from "../ui/sidebar"
import { redirect, RedirectType } from "next/navigation"

interface props {
  session: Session
  text: string
  finalPath: string
}

const MenuButton = ({ session, text, finalPath }: props) => {
  return (
    <SidebarMenuButton
      onClick={() => {
        redirect(`/org/${finalPath}`, RedirectType.push)
      }}
    >
      {text}
    </SidebarMenuButton>
  )
}

export default MenuButton
