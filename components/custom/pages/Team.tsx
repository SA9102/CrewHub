"use client"

import { Role } from "@/generated/prisma/enums"
import axios from "axios"
import { Session } from "next-auth"
import { useParams, useSearchParams } from "next/navigation"
import { useEffect, useState } from "react"
import { H2 } from "@/components/ui/typography"
import { Button } from "@/components/ui/button"

interface props {
  session: Session
}

const Team = ({ session }: props) => {
  // Make sure the user is authorised to view this team
  const [teamName, setTeamName] = useState("")
  const params = useParams()
  const teamId = params.teamId

  // if (session.user.role !== Role.OWNER && )

  useEffect(() => {
    const getTeamData = async () => {
      console.log("FROM TEAM")
      try {
        const res = await axios.get(`/api/teams/${teamId}`)
        if (res.status === 200) {
          setTeamName(res.data.name)
        }
      } catch (err) {
        console.error(err)
      }
    }

    getTeamData()
  }, [])

  return (
    <>
      {/* <H2>{teamName}</H2>
      <div className="flex gap-3">
        <Button className="bg-neutral-800" variant="ghost" size="xs">
          Chat
        </Button>
        <Button variant="ghost" size="xs">
          Events
        </Button>
        <Button variant="ghost" size="xs">
          Members
        </Button>
      </div> */}
    </>
  )
}

export default Team
