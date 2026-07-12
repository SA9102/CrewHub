"use client"

import { Role } from "@/generated/prisma/enums"
import axios from "axios"
import { redirect, RedirectType, useParams } from "next/navigation"
import { useEffect, useState } from "react"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "../ui/table"

interface members {
  id: string
  firstName: string
  lastName: string
  email: string
  role: Role
}

const MembersList = () => {
  const params = useParams()
  const teamId = params.teamId
  const [members, setMembers] = useState<members[]>([])

  useEffect(() => {
    const getUsers = async () => {
      console.log("FROM MEMBERS")
      try {
        const res = await axios.get(`/api/teams/${teamId}/users`)
        if (res.status === 200) {
          setMembers(res.data)
        }
      } catch (err) {
        console.log(err)
      }
    }

    getUsers()
  }, [])

  return (
    <>
      <p>Members list</p>
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>First</TableHead>
            <TableHead>Name</TableHead>
            <TableHead></TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {/* {isLoadingUsers && <Spinner />} */}
          {members &&
            members.map((member) => (
              <TableRow
                className="cursor-pointer"
                onClick={() =>
                  redirect(`/org/users/${member.id}`, RedirectType.push)
                }
              >
                <TableCell>{member.firstName}</TableCell>
                <TableCell>{member.lastName}</TableCell>
                {/* <TableCell>
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
                </TableCell> */}
              </TableRow>
            ))}
        </TableBody>
      </Table>
    </>
  )
}

export default MembersList
