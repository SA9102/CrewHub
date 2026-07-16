"use client"

import { Event, Role } from "@/generated/prisma/client"
import axios from "axios"
import { redirect, RedirectType, useParams } from "next/navigation"
import { useEffect, useState } from "react"
import { Button } from "../ui/button"
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "../ui/card"
import { Session } from "next-auth"
import { sessionProp } from "@/lib/types/sessionProp"

// Lists all the upcoming events in a particular team
const EventsList = ({ session }: sessionProp) => {
  const [events, setEvents] = useState<Event[]>([])

  const params = useParams()
  const teamId = params.teamId

  useEffect(() => {
    const getEventsForTeam = async () => {
      try {
        console.log(
          "--------------------------------------------------------------------------------------------"
        )
        const res = await axios.get(`/api/teams/${teamId}/events`)
        if (res.status === 200) {
          setEvents(res.data)
        }
      } catch (err) {
        console.error(err)
      }
    }

    getEventsForTeam()
  }, [])

  return (
    <>
      {session.user.role === Role.ADMIN && (
        <Button
          variant="secondary"
          onClick={() =>
            redirect(`/org/teams/${teamId}/events/new`, RedirectType.push)
          }
        >
          New Event
        </Button>
      )}

      <p>Events List</p>
      <div className="flex flex-row">
        {events.map((event) => (
          <Card className="cursor-pointer">
            <CardHeader>
              <CardTitle>{event.name}</CardTitle>
              <CardDescription>{event.description}</CardDescription>
            </CardHeader>
            <CardContent>
              <p>
                {new Date(event.start).toLocaleString()} -{" "}
                {new Date(event.end).toLocaleString()}
              </p>
            </CardContent>
          </Card>
        ))}
      </div>
    </>
  )
}

export default EventsList
