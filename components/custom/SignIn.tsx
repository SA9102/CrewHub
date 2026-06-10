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
import { useState, useEffect } from "react"
import { H2 } from "@/components/ui/typography"
import Link from "next/link"
import axios from "axios"
import { signinInput } from "@/lib/types/inputs"
import { signIn } from "next-auth/react"
import { API_POST_SIGNIN, URL_CREATE_ORGANISATION } from "@/lib/routes"
import { redirect, RedirectType } from "next/navigation"
import { Spinner } from "../ui/spinner"
import { useSession } from "next-auth/react"

const SignIn = () => {
  const [formInput, setFormInput] = useState<signinInput>({
    email: "",
    password: "",
  })
  const [isLoading, setIsLoading] = useState(false)

  // await
  // useEffect(() => {
  //   const getSession = async () => {
  //     const session = await auth()
  //     setSession(session)
  //   }

  //   getSession()
  // }, [])

  // {
  //   createdParam &&
  //     toast.info("Account successfully created. You may now log in.", {
  //       position: "bottom-center",
  //     })
  // }

  const handleSubmit = async () => {
    setIsLoading(true)
    const res = await signIn("credentials", {
      ...formInput,
      redirect: false,
    })
    setIsLoading(false)
    if (!res.error) {
      redirect("/org", RedirectType.replace)
    }
  }

  return (
    <div className="flex min-h-screen items-center justify-center">
      <FieldSet className="mx-auto flex w-full max-w-sm flex-col">
        <H2>SIGN IN</H2>
        {/* <FieldLegend>Sign In</FieldLegend> */}
        <FieldGroup>
          <Field>
            <FieldLabel htmlFor="email">Email</FieldLabel>
            <Input
              id="email"
              name="email"
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
              value={formInput.password}
              onChange={(e) =>
                setFormInput({ ...formInput, password: e.target.value })
              }
            />
          </Field>
          <Button onClick={handleSubmit} disabled={isLoading}>
            {isLoading ? <Spinner /> : "Sign In"}
          </Button>
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
