"use client"

import { signIn } from "@/auth"
import {
  Field,
  FieldDescription,
  FieldError,
  FieldGroup,
  FieldLabel,
  FieldLegend,
  FieldSet,
} from "../ui/field"
import { Input } from "../ui/input"
import { Button } from "../ui/button"
import { useState } from "react"

import { postUser } from "@/app/api/users/route"

interface formInput {
  firstName: string
  lastName: string
  email: string
  password: string
  confirmPassword: string
}

const SignUp = () => {
  const [formInput, setFormInput] = useState<formInput>({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    confirmPassword: "",
  })

  return (
    <div className="flex min-h-screen items-center justify-center">
      <FieldSet className="mx-auto flex w-full max-w-sm flex-col">
        {/* <FieldLegend>Sign In</FieldLegend> */}
        <FieldGroup>
          <Field>
            <FieldLabel htmlFor="first-name">First Name</FieldLabel>
            <Input
              id="first-name"
              name="first-name"
              autoComplete="off"
              aria-invalid
              value={formInput.firstName}
              onChange={(e) =>
                setFormInput({ ...formInput, firstName: e.target.value })
              }
            />
          </Field>
          <Field>
            <FieldLabel htmlFor="last-name">Last Name</FieldLabel>
            <Input
              id="last-name"
              name="last-name"
              autoComplete="off"
              aria-invalid
              value={formInput.lastName}
              onChange={(e) =>
                setFormInput({ ...formInput, lastName: e.target.value })
              }
            />
          </Field>
          <Field>
            <FieldLabel htmlFor="email">Email</FieldLabel>
            <Input
              id="email"
              name="email"
              type="email"
              autoComplete="off"
              aria-invalid
              value={formInput.email}
              onChange={(e) =>
                setFormInput({ ...formInput, email: e.target.value })
              }
            />
          </Field>
          <Field>
            <FieldLabel htmlFor="password">Password</FieldLabel>
            <Input
              id="password"
              name="password"
              type="password"
              autoComplete="off"
              aria-invalid
            />
          </Field>
          <Field>
            <FieldLabel htmlFor="confirm-password">Confirm Password</FieldLabel>
            <Input
              id="confirm-password"
              name="confirm-password"
              type="password"
              autoComplete="off"
              aria-invalid
            />
          </Field>
          <Button
            onClick={() =>
              postUser({
                firstName: formInput.firstName,
                lastName: formInput.lastName,
                email: formInput.email,
              })
            }
          >
            Sign Up
          </Button>
        </FieldGroup>
      </FieldSet>
    </div>
  )
}

export default SignUp
