"use client"

import { signOut } from "next-auth/react"
import { Button } from "../ui/button"
import { redirect, RedirectType } from "next/navigation"
import { URL_SIGNIN } from "@/lib/routes"

const Dashboard = () => {
  const handleSignOut = async () => {
    await signOut()
    redirect(URL_SIGNIN, RedirectType.replace)
  }
  return (
    <>
      <p>Hello world</p>
      <Button onClick={handleSignOut}>Logout</Button>
    </>
  )
}

export default Dashboard
