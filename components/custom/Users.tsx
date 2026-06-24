"use client"

import { Field, FieldGroup, FieldLabel } from "@/components/ui/field"
import { Input } from "../ui/input"
import { Button } from "../ui/button"
import { auth, signIn } from "@/auth"
import { useEffect, useState } from "react"
import axios from "axios"
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import { Session } from "next-auth"
import { API_GET_USERS } from "@/lib/routes"
import { Spinner } from "../ui/spinner"
import { EllipsisIcon } from "lucide-react"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "../ui/dropdown-menu"
import { Role } from "@/generated/prisma/enums"
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
} from "../ui/alert-dialog"

interface props {
  session: Session | null
}

interface users {
  id: string
  firstName: string
  lastName: string
  email: string
  role: string
}

const Users = ({ session }: props) => {
  // const session = await auth()

  const [email, setEmail] = useState("")
  const [users, setUsers] = useState<users[]>([])
  const [isLoadingUsers, setIsLoadingUsers] = useState(false)

  const handleSubmit = async () => {
    try {
      const res = await axios.post(
        "/api/user/send-email",
        { email, session },
        {}
      )
    } catch (err) {
      console.error(err)
    }
  }

  const handleDeleteUser = async (userId: string) => {
    if (session) {
      try {
        const res = await axios.delete(
          `/api/${session.user.organisationId}/user/${userId}`
        )
        if (res.status === 204) {
          console.log("HAS BEEN DELETED")
          let newUsers = [...users]
          newUsers = newUsers.filter((user) => user.id !== userId)
          setUsers([...users].filter((user) => user.id !== userId))
        }
      } catch (err) {
        console.error(err)
      }
    }
  }

  useEffect(() => {
    if (session) {
      setIsLoadingUsers(true)
      const getUsers = async () => {
        try {
          const res = await axios.get(
            `/api/${session.user.organisationId}/users`
          )
          if (res.status === 200) {
            console.log(res.data)
            setUsers(res.data)
          }
        } catch (err) {
          console.error(err)
        } finally {
          setIsLoadingUsers(false)
        }
      }
      getUsers()
    }
  }, [])

  return (
    <div>
      <FieldGroup>
        <Field>
          <FieldLabel htmlFor="user-email">User Email</FieldLabel>
          <Input
            id="user-email"
            name="user-email"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </Field>
        <Button onClick={handleSubmit}>Invite User</Button>
      </FieldGroup>
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Email</TableHead>
            <TableHead>First Name</TableHead>
            <TableHead>Last Name</TableHead>
            <TableHead>Role</TableHead>
            <TableHead></TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {isLoadingUsers && <Spinner />}
          {users &&
            users.map((user) => (
              <TableRow className="cursor-pointer">
                <TableCell>{user.email}</TableCell>
                <TableCell>{user.firstName}</TableCell>
                <TableCell>{user.lastName}</TableCell>
                <TableCell>{user.role}</TableCell>
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
                      {user.role !== Role.OWNER && (
                        <>
                          <DropdownMenuSeparator />
                          <DropdownMenuGroup>
                            {/* <DropdownMenuItem> */}
                            <AlertDialog>
                              <AlertDialogTrigger asChild>
                                <Button variant="outline">Delete</Button>
                              </AlertDialogTrigger>
                              <AlertDialogContent>
                                <AlertDialogHeader>
                                  <AlertDialogTitle>
                                    Are you absolutely sure?
                                  </AlertDialogTitle>
                                  <AlertDialogDescription>
                                    This action cannot be undone. This will
                                    permanently delete your account from our
                                    servers.
                                  </AlertDialogDescription>
                                </AlertDialogHeader>
                                <AlertDialogFooter>
                                  <AlertDialogCancel>No</AlertDialogCancel>
                                  <AlertDialogAction
                                    onClick={() => handleDeleteUser(user.id)}
                                  >
                                    Yes
                                  </AlertDialogAction>
                                </AlertDialogFooter>
                              </AlertDialogContent>
                            </AlertDialog>
                            {/* </DropdownMenuItem> */}
                          </DropdownMenuGroup>
                        </>
                      )}
                    </DropdownMenuContent>
                  </DropdownMenu>
                </TableCell>
              </TableRow>
            ))}
        </TableBody>
      </Table>
    </div>
  )
}

export default Users
