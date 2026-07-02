"use client"

import { Role } from "@/generated/prisma/enums"
import axios from "axios"
import { Session } from "next-auth"
import { useParams, useSearchParams } from "next/navigation"
import { useEffect } from "react"

interface props {
  session: Session
}

const Team = ({ session }: props) => {
  // Make sure the user is authorised to view this team
  const params = useParams()
  const teamId = params.teamId

  // if (session.user.role !== Role.OWNER && )

  useEffect(() => {
    const getTeamData = async () => {
      try {
        const res = await axios.get(`/api/team/${teamId}`)
        if (res.status === 200) {
          console.log(res.data)
        }
      } catch (err) {
        console.error(err)
      }
    }

    getTeamData()
  }, [])

  return (
    <>
      <p>Team page</p>
    </>
  )
}

export default Team
