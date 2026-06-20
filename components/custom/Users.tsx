"use client"

import { Field, FieldGroup, FieldLabel } from "@/components/ui/field"
import { Input } from "../ui/input"
import { Button } from "../ui/button"
import { auth, signIn } from "@/auth"
import { useState } from "react"
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

interface props {
  session: Session | null
}

const Users = ({ session }: props) => {
  // const session = await auth()

  const [email, setEmail] = useState("")

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
        <TableCaption>A list of your recent invoices.</TableCaption>
        <TableHeader>
          <TableRow>
            <TableHead className="w-[100px]">Invoice</TableHead>
            <TableHead>Status</TableHead>
            <TableHead>Method</TableHead>
            <TableHead className="text-right">Amount</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          <TableRow>
            <TableCell className="font-medium">INV001</TableCell>
            <TableCell>Paid</TableCell>
            <TableCell>Credit Card</TableCell>
            <TableCell className="text-right">$250.00</TableCell>
          </TableRow>
        </TableBody>
      </Table>
    </div>
  )
}

export default Users
