"use client"

import {
  API_GET_VALIDATE_INVITE_TOKEN,
  API_POST_CREATE_USER,
} from "@/lib/routes"
import axios from "axios"
import { redirect, useParams } from "next/navigation"
import { useEffect, useState } from "react"
import FormWrapper from "../FormWrapper"
import { Field, FieldGroup, FieldLabel } from "@/components/ui/field"
import TextInput from "../TextInput"
import { H2 } from "@/components/ui/typography"
import { Button } from "@/components/ui/button"
import { Spinner } from "@/components/ui/spinner"
import { Input } from "@/components/ui/input"
import { Router } from "next/router"

interface createUserInput {
  firstName: string
  lastName: string
  email: string
  password: string
  confirmPassword: string
}

const CreateUser = () => {
  const [formInput, setFormInput] = useState<createUserInput>({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    confirmPassword: "",
  })
  const [isLoadingPage, setIsLoadingPage] = useState(true)
  const [isLoading, setIsLoading] = useState(false)
  const [errorMessage, setErrorMessage] = useState("")
  const [tokenData, setTokenData] = useState(null)
  const params = useParams<{ orgId: string }>()

  console.log(params)

  const handleSubmit = async () => {
    setIsLoading(true)
    try {
      const res = await axios.post(
        API_POST_CREATE_USER,
        { ...formInput, organisationId: tokenData.organisationId },
        {}
      )
      if (res.status === 201) {
        // router.replace("/auth/signin?created=true")

        console.log("Success")
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

  useEffect(() => {
    const validateToken = async () => {
      try {
        const res = await axios.post(API_GET_VALIDATE_INVITE_TOKEN, params)
        if (res.status === 200) {
          console.log(res.data)
          setFormInput({ ...formInput, email: res.data.email })
          setTokenData(res.data)
          setIsLoadingPage(false)
        }
      } catch (err) {
        console.error(err)
        redirect("/auth/invite-token-error")
      }
    }

    validateToken()
  }, [])

  return (
    <>
      {isLoadingPage ? (
        <Spinner />
      ) : (
        <FormWrapper>
          <H2>CREATE ACCOUNT</H2>
          <FieldGroup>
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
            <Field>
              <FieldLabel htmlFor="email">Email</FieldLabel>
              <Input
                disabled
                id="email"
                name="email"
                type="email"
                autoComplete="off"
                aria-invalid
                value={formInput.email}
              />
            </Field>
            <TextInput
              label="Password"
              type="password"
              field="password"
              form={formInput}
              setForm={setFormInput}
            />
            <TextInput
              label="Confirm Password"
              type="password"
              field="confirmPassword"
              form={formInput}
              setForm={setFormInput}
            />
            <Button onClick={handleSubmit} disabled={isLoading}>
              {isLoading ? <Spinner /> : "Create Account"}
            </Button>
          </FieldGroup>
        </FormWrapper>
      )}
    </>
  )
}

export default CreateUser
