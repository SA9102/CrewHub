"use client"

import { Role } from "@/generated/prisma/enums"
import axios from "axios"
import { Session } from "next-auth"
import {
  redirect,
  RedirectType,
  useParams,
  usePathname,
  useSearchParams,
} from "next/navigation"
import { useEffect, useState } from "react"
import { H2 } from "@/components/ui/typography"
import { Button } from "@/components/ui/button"

interface props {
  session: Session
}

interface team {
  id: string
  name: string
}

const Team = ({ session }: props) => {
  // Make sure the user is authorised to view this team
  const [team, setTeam] = useState<team>({ id: "", name: "" })
  const params = useParams()
  const teamId = params.teamId

  const pathname = usePathname().split("/")
  const pathnameLast = pathname[pathname.length - 1]

  // if (session.user.role !== Role.OWNER && )

  useEffect(() => {
    const getTeamData = async () => {
      try {
        const res = await axios.get(`/api/team/${teamId}`)
        if (res.status === 200) {
          setTeam({ id: res.data.id, name: res.data.name })
        }
      } catch (err) {
        console.error(err)
      }
    }

    getTeamData()
  }, [])

  return (
    <>
      <H2>{team.name}</H2>
      <div className="flex gap-3">
        <Button
          className={pathnameLast === "chat" ? "bg-neutral-800" : ""}
          variant="ghost"
          size="xs"
          onClick={() =>
            redirect(`/org/team/${team.id}/chat`, RedirectType.replace)
          }
        >
          Chat
        </Button>
        <Button
          className={pathnameLast === "events" ? "bg-neutral-800" : ""}
          variant="ghost"
          size="xs"
          onClick={() =>
            redirect(`/org/team/${team.id}/events`, RedirectType.replace)
          }
        >
          Events
        </Button>
        <Button
          className={pathnameLast === "members" ? "bg-neutral-800" : ""}
          variant="ghost"
          size="xs"
          onClick={() =>
            redirect(`/org/team/${team.id}/members`, RedirectType.replace)
          }
        >
          Members
        </Button>
      </div>
    </>
  )
}

export default Team
