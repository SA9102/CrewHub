"use client"
import {
  Field,
  FieldDescription,
  FieldError,
  FieldGroup,
  FieldLabel,
  FieldLegend,
  FieldSet,
} from "@/components/ui/field"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { useState } from "react"
import axios from "axios"

import { InfoIcon } from "lucide-react"
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip"

import { signupInput } from "@/lib/types/inputs"

const page = () => {
  const [formInput, setFormInput] = useState<signupInput>({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    confirmPassword: "",
  })
  const [errorMessage, setErrorMessage] = useState("")

  const handleSubmit = async () => {
    try {
      const res = await axios.post("/api/user", formInput, {})
    } catch (err: any) {
      console.error(err)
      setErrorMessage(err.response.data.error)
    }
  }

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
            <FieldLabel htmlFor="password">
              Password
              <Tooltip>
                <TooltipTrigger>
                  <InfoIcon size="16px" />
                </TooltipTrigger>
                <TooltipContent>
                  • Password must be at least 8 characters long
                  <br />
                  • Password must contain at least 1 number
                  <br />
                  • Password must contain 1 symbol from: !@#$%^&*_-+=?
                  <br />
                  • Password must at least one uppercase letter
                  <br />
                  • Password must at least one lowercase letter
                  <br />
                </TooltipContent>
              </Tooltip>
            </FieldLabel>
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
          {errorMessage !== "" && (
            <p className="text-red-700">{errorMessage}</p>
          )}
          <Button onClick={handleSubmit}>Sign Up</Button>
        </FieldGroup>
      </FieldSet>
    </div>
  )
}

export default page
