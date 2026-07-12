"use client"

import { FieldGroup } from "@/components/ui/field"
import { H2 } from "@/components/ui/typography"
import TextInput from "../TextInput"
import { useState } from "react"
import FormWrapper from "../FormWrapper"
import { Spinner } from "@/components/ui/spinner"
import { Button } from "@/components/ui/button"
import axios from "axios"
import { useParams } from "next/navigation"

import { format } from "date-fns"
import { ChevronDownIcon } from "lucide-react"
import { Calendar } from "@/components/ui/calendar"
import { Field, FieldLabel } from "@/components/ui/field"
import { Input } from "@/components/ui/input"
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover"

interface formInput {
  name: string
  description: string
  start: Date | undefined
  end: Date | undefined
  // end: Date | null
}

const CreateEvent = () => {
  const [formInput, setFormInput] = useState<formInput>({
    name: "",
    description: "",
    start: undefined,
    end: undefined,
  })
  const [isLoading, setIsLoading] = useState(false)

  const params = useParams()
  const teamId = params.teamId

  const handleSubmit = async () => {
    try {
      const res = axios.post(`/api/teams/${teamId}/events`, formInput)
    } catch (err) {
      console.error(err)
    }
  }

  const [startDateOpen, setStartDateOpen] = useState(false)
  const [endDateOpen, setEndDateOpen] = useState(false)

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
        <div className="flex gap-15">
          <Field>
            <FieldLabel htmlFor="date-picker-optional">Date</FieldLabel>
            <Popover open={startDateOpen} onOpenChange={setStartDateOpen}>
              <PopoverTrigger asChild>
                <Button
                  variant="outline"
                  id="date-picker-optional"
                  className="w-32 justify-between font-normal"
                >
                  {formInput.start
                    ? format(formInput.start, "PPP")
                    : "Select date"}
                  <ChevronDownIcon data-icon="inline-end" />
                </Button>
              </PopoverTrigger>

              <PopoverContent
                className="w-auto overflow-hidden p-0"
                align="start"
              >
                <Calendar
                  mode="single"
                  selected={formInput.start}
                  captionLayout="dropdown"
                  defaultMonth={formInput.start}
                  // ChatGPT generated the code to separate the date and time.
                  // Makes only the date controlled here.
                  onSelect={(date) => {
                    // if (!date) {
                    //   setFormInput({ ...formInput, start: undefined })
                    //   return
                    // }

                    // const current = formInput.start ?? new Date()

                    // date.setHours(
                    //   current.getHours(),
                    //   current.getMinutes(),
                    //   current.getSeconds(),
                    //   0
                    // )

                    setFormInput({ ...formInput, start: date })
                    setStartDateOpen(false)
                  }}
                />
              </PopoverContent>
            </Popover>
          </Field>
          <Field className="w-32">
            <FieldLabel htmlFor="time-picker-optional">Time</FieldLabel>
            {
              // ChatGPT generated the code to separate the date and time.
              // Makes only the time controlled here.
            }
            <Input
              type="time"
              value={formInput.start ? format(formInput.start, "HH:mm") : ""}
              onChange={(e) => {
                const [hours, minutes] = e.target.value.split(":").map(Number)

                const date = formInput.start
                  ? new Date(formInput.start)
                  : new Date()

                date.setHours(hours, minutes, 0, 0)

                setFormInput({
                  ...formInput,
                  start: date,
                })
              }}
            />
          </Field>
        </div>
        <div className="flex gap-15">
          <Field>
            <FieldLabel htmlFor="date-picker-optional">Date</FieldLabel>
            <Popover open={endDateOpen} onOpenChange={setEndDateOpen}>
              <PopoverTrigger asChild>
                <Button
                  variant="outline"
                  id="date-picker-optional"
                  className="w-32 justify-between font-normal"
                >
                  {formInput.end ? format(formInput.end, "PPP") : "Select date"}
                  <ChevronDownIcon data-icon="inline-end" />
                </Button>
              </PopoverTrigger>

              <PopoverContent
                className="w-auto overflow-hidden p-0"
                align="start"
              >
                <Calendar
                  mode="single"
                  selected={formInput.end}
                  captionLayout="dropdown"
                  defaultMonth={formInput.end}
                  // ChatGPT generated the code to separate the date and time.
                  // Makes only the date controlled here.
                  onSelect={(date) => {
                    if (!date) {
                      setFormInput({ ...formInput, end: undefined })
                      return
                    }

                    const current = formInput.end ?? new Date()

                    date.setHours(
                      current.getHours(),
                      current.getMinutes(),
                      current.getSeconds(),
                      0
                    )

                    setFormInput({ ...formInput, end: date })
                    setEndDateOpen(false)
                  }}
                />
              </PopoverContent>
            </Popover>
          </Field>
          <Field className="w-32">
            <FieldLabel htmlFor="time-picker-optional">Time</FieldLabel>
            {
              // ChatGPT generated the code to separate the date and time.
              // Makes only the time controlled here.
            }
            <Input
              type="time"
              value={formInput.end ? format(formInput.end, "HH:mm") : ""}
              onChange={(e) => {
                const [hours, minutes] = e.target.value.split(":").map(Number)

                const date = formInput.end
                  ? new Date(formInput.end)
                  : new Date()

                date.setHours(hours, minutes, 0, 0)

                setFormInput({
                  ...formInput,
                  end: date,
                })
              }}
            />
          </Field>
        </div>
        <Button onClick={handleSubmit} disabled={isLoading}>
          {isLoading ? <Spinner /> : "Create Event"}
        </Button>
      </FieldGroup>
      {/* </FormWrapper> */}
    </>
  )
}

export default CreateEvent
