"use client"

import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog"
import { Button } from "@/components/ui/button"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import {
  TableHead,
  TableHeader,
  TableRow,
  Table,
  TableBody,
  TableCell,
} from "@/components/ui/table"
import { Role } from "@/generated/prisma/enums"
import axios from "axios"
import { EllipsisIcon } from "lucide-react"
import { Session } from "next-auth"
import { redirect, RedirectType } from "next/navigation"
import { useEffect, useState } from "react"

interface props {
  session: Session
}

const Teams = ({ session }: props) => {
  const [isLoadingTeams, setIsLoadingTeams] = useState(false)
  const [teams, setTeams] = useState([])

  const handleDeleteTeam = async (teamId: string) => {
    try {
      const res = await axios.delete(`/api/team/${teamId}`)
      console.log(res)
      if (res.status === 200) {
        console.log("HAS BEEN DELETED")
        let newTeams = [...teams]
        newTeams = newTeams.filter((team) => team.id !== teamId)
        setTeams([...teams].filter((team) => team.id !== teamId))
      }
    } catch (err) {
      console.error(err)
    }
  }

  useEffect(() => {
    setIsLoadingTeams(true)
    const getTeams = async () => {
      try {
        const res = await axios.get(`/api/teams`)
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
      {session.user.role === Role.OWNER && (
        <Button onClick={() => redirect(`/org/teams/new`, RedirectType.push)}>
          Create Team
        </Button>
      )}

      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Name</TableHead>
            {/* <TableHead>First Name</TableHead>
            <TableHead>Last Name</TableHead>
            <TableHead>Role</TableHead> */}
            <TableHead></TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {/* {isLoadingUsers && <Spinner />} */}
          {teams &&
            teams.map((team) => (
              <TableRow
                className="cursor-pointer"
                onClick={() =>
                  redirect(`/org/team/${team.id}`, RedirectType.push)
                }
              >
                <TableCell>{team.name}</TableCell>
                {/* <TableCell>{user.firstName}</TableCell>
                <TableCell>{user.lastName}</TableCell>
                <TableCell>{user.role}</TableCell> */}
                <TableCell>
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button variant="ghost">
                        <EllipsisIcon />
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent>
                      <DropdownMenuGroup>
                        <DropdownMenuLabel>My Account</DropdownMenuLabel>
                        <DropdownMenuItem>Profile</DropdownMenuItem>
                        <DropdownMenuItem>Billing</DropdownMenuItem>
                      </DropdownMenuGroup>
                      <>
                        <DropdownMenuSeparator />
                        <DropdownMenuGroup>
                          <AlertDialog>
                            <AlertDialogTrigger asChild>
                              <Button variant="outline">Delete</Button>
                            </AlertDialogTrigger>
                            <AlertDialogContent>
                              <AlertDialogHeader>
                                <AlertDialogTitle>
                                  Delete team: {team.name}?
                                </AlertDialogTitle>
                                <AlertDialogDescription>
                                  This action cannot be undone.
                                </AlertDialogDescription>
                              </AlertDialogHeader>
                              <AlertDialogFooter>
                                <AlertDialogCancel>No</AlertDialogCancel>
                                <AlertDialogAction
                                  onClick={() => handleDeleteTeam(team.id)}
                                >
                                  Yes
                                </AlertDialogAction>
                              </AlertDialogFooter>
                            </AlertDialogContent>
                          </AlertDialog>
                        </DropdownMenuGroup>
                      </>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </TableCell>
              </TableRow>
            ))}
        </TableBody>
      </Table>
    </>
  )
}

export default Teams
