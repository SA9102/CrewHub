// This is essentially the 'signup page', where a user creates an organisation.

// When creating an organisation, the user also creates an account.
// They automatically become the owner of that organisation,
// which can be changed later.

"use client"

import { useState } from "react"

import { Button } from "@/components/ui/button"
import {
  Field,
  FieldDescription,
  FieldError,
  FieldGroup,
  FieldLabel,
  FieldLegend,
  FieldSet,
} from "@/components/ui/field"
import { H1, H2 } from "@/components/ui/typography"
import { Input } from "@/components/ui/input"
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip"
import { InfoIcon } from "lucide-react"

import axios from "axios"

import { signupInput } from "@/lib/types/inputs"

import { useRouter } from "next/navigation"
import Link from "next/link"
import { Spinner } from "../../ui/spinner"
import { API_POST_ORGANISATION } from "@/lib/routes"
import FormWrapper from "../FormWrapper"
import TextInput from "../TextInput"

const CreateOrganisation = () => {
  const [formInput, setFormInput] = useState<signupInput>({
    organisationName: "",
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    confirmPassword: "",
  })
  const [errorMessage, setErrorMessage] = useState("")
  const [isLoading, setIsLoading] = useState(false)
  const router = useRouter()

  const handleSubmit = async () => {
    setIsLoading(true)
    try {
      const res = await axios.post(API_POST_ORGANISATION, formInput, {})
      if (res.status === 201) {
        router.replace("/auth/signin?created=true")
      }
    } catch (err: any) {
      if (err.response.data) {
        setErrorMessage(err.response.data.error)
      } else {
        setErrorMessage("An error occurred")
      }
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <FormWrapper>
      <H2>CREATE ORGANISATION</H2>
      {/* <FieldLegend>Sign In</FieldLegend> */}
      <FieldGroup>
        <TextInput
          label="Organisation Name"
          type="text"
          field="organisationName"
          form={formInput}
          setForm={setFormInput}
        />

        <p className="text-xs">
          You will automatically become the owner of your organisation. This can
          be changed later.
        </p>
        <TextInput
          label="First Name"
          type="text"
          field="firstName"
          form={formInput}
          setForm={setFormInput}
        />
        <TextInput
          label="Last Name"
          type="text"
          field="lastName"
          form={formInput}
          setForm={setFormInput}
        />
        <TextInput
          label="Email"
          type="email"
          field="email"
          form={formInput}
          setForm={setFormInput}
          tooltip={
            <Tooltip>
              <TooltipTrigger>
                <InfoIcon size="16px" />
              </TooltipTrigger>
              <TooltipContent>Must be unique</TooltipContent>
            </Tooltip>
          }
        />

        <TextInput
          label="Password"
          type="password"
          field="password"
          form={formInput}
          setForm={setFormInput}
          tooltip={
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
          }
        />

        <TextInput
          label="Confirm Password"
          type="password"
          field="confirmPassword"
          form={formInput}
          setForm={setFormInput}
        />
        {errorMessage !== "" && <p className="text-red-700">{errorMessage}</p>}
        <Button onClick={handleSubmit} disabled={isLoading}>
          {isLoading ? <Spinner /> : "Sign Up"}
        </Button>
      </FieldGroup>
      <p className="self-center text-sm">
        <Link href="/auth/signin">Already have an account?</Link>
      </p>
    </FormWrapper>
  )
}

export default CreateOrganisation
