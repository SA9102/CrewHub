"use client"

import { Field, FieldGroup, FieldLabel } from "@/components/ui/field"
import { Input } from "../ui/input"
import { Button } from "../ui/button"
import { auth, signIn } from "@/auth"
import { useState } from "react"
import axios from "axios"

const Users = ({ session }) => {
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
    <>
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
    </>
  )
}

export default Users
