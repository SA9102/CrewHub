"use client"

import { Button } from "@/components/ui/button"
import axios from "axios"
import { Session } from "next-auth"
import { redirect, RedirectType } from "next/navigation"
import { useEffect, useState } from "react"

interface props {
  session: Session
}

const Teams = ({ session }: props) => {
  const [isLoadingTeams, setIsLoadingTeams] = useState(false)
  const [teams, setTeams] = useState([])

  useEffect(() => {
    setIsLoadingTeams(true)
    const getTeams = async () => {
      try {
        const res = await axios.get(`/api/${session.user.organisationId}/team`)
        if (res.status === 200) {
          console.log(res.data)
          setTeams(res.data)
        }
      } catch (err) {
        console.error(err)
      } finally {
        setIsLoadingTeams(false)
      }
    }
    getTeams()
  }, [])

  return (
    <>
      <p>Teams page</p>
      <Button
        onClick={() =>
          redirect(
            `/org/${session.user.organisationId}/teams/new`,
            RedirectType.push
          )
        }
      >
        Create Team
      </Button>
    </>
  )
}

export default Teams
