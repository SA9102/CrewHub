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

import { Toaster } from "@/components/ui/sonner"
import { toast } from "sonner"
import { useEffect, useState } from "react"
import { H2 } from "@/components/ui/typography"
import Link from "next/link"
import axios from "axios"
import { signinInput } from "@/lib/types/inputs"
import { signIn } from "next-auth/react"
import { API_POST_SIGNIN, URL_CREATE_ORGANISATION } from "@/lib/routes"

axios.defaults.withXSRFToken = true

const SignIn = () => {
  const [formInput, setFormInput] = useState<signinInput>({
    email: "",
    password: "",
  })

  // {
  //   createdParam &&
  //     toast.info("Account successfully created. You may now log in.", {
  //       position: "bottom-center",
  //     })
  // }

  const handleSubmit = async () => {
    // try {
    //   const res = await axios.post(API_POST_SIGNIN, formInput, {})
    // } catch (err) {
    //   console.error(err)
    // }

    try {
      console.log("Before")
      await signIn("credentials", { ...formInput })
      console.log("After")
    } catch (err) {
      console.error(err)
    }
  }

  return (
    <div className="flex min-h-screen items-center justify-center">
      <FieldSet className="mx-auto flex w-full max-w-sm flex-col">
        <H2>SIGN IN</H2>
        {/* <FieldLegend>Sign In</FieldLegend> */}
        <FieldGroup>
          <Field>
            <FieldLabel htmlFor="username">Username</FieldLabel>
            <Input
              id="username"
              name="username"
              autoComplete="off"
              aria-invalid
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
          <Button onClick={handleSubmit}>Sign In</Button>
        </FieldGroup>
        <p className="self-center text-sm">Forgot password?</p>
        <p className="self-center text-sm">
          <Link href={URL_CREATE_ORGANISATION}>Need an account?</Link>
        </p>
      </FieldSet>
      <Toaster />
    </div>
  )
}

export default SignIn
