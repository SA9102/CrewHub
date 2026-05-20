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

import { useSearchParams } from "next/navigation"
import { Toaster } from "@/components/ui/sonner"
import { toast } from "sonner"
import { useEffect, useState } from "react"
import { H2 } from "@/components/ui/typography"
import Link from "next/link"
import axios from "axios"
import { signinInput } from "@/lib/types/inputs"

const SignIn = () => {
  const searchParams = useSearchParams()
  const createdParam = searchParams.get("created")
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

  if (createdParam) {
    console.log("CREATED")
    toast.info("Account successfully created. You may now log in.", {
      position: "bottom-center",
    })
  } else {
    console.log("NOT CREATED")
  }

  useEffect(() => {
    if (searchParams.get("created")) {
      toast.info("Account successfully created. You may now log in.", {
        position: "bottom-center",
      })
    }
  }, [])

  const handleSubmit = async () => {
    try {
      const res = await axios.post("/api/auth/signin", formInput, {})
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
          <Link href="/auth/signup">Need an account?</Link>
        </p>
      </FieldSet>
      <Toaster />
    </div>
  )
}

export default SignIn
