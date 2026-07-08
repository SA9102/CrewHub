"use client"

import { FieldGroup } from "@/components/ui/field"
import { H2 } from "@/components/ui/typography"
import TextInput from "../TextInput"
import { useState } from "react"
import FormWrapper from "../FormWrapper"
import { Spinner } from "@/components/ui/spinner"
import { Button } from "@/components/ui/button"
interface form {
  name: string
  description: string
  start: string
  end: string
}

const CreateEvent = () => {
  const [formInput, setFormInput] = useState<form>({
    name: "",
    description: "",
    start: "",
    end: "",
  })
  const [isLoading, setIsLoading] = useState(false)

  const handleSubmit = async () => {}

  return (
    <>
      <H2>New Event</H2>
      {/* <FormWrapper> */}
      <FieldGroup>
        <TextInput
          label="Name"
          type="text"
          field="name"
          form={formInput}
          setForm={setFormInput}
        />
        <TextInput
          label="Description"
          type="text"
          field="description"
          form={formInput}
          setForm={setFormInput}
        />
        <Button onClick={handleSubmit} disabled={isLoading}>
          {isLoading ? <Spinner /> : "Create Event"}
        </Button>
      </FieldGroup>
      {/* </FormWrapper> */}
    </>
  )
}

export default CreateEvent
