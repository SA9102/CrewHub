"use client"

import { Session } from "next-auth"
import FormWrapper from "../FormWrapper"
import { H2 } from "@/components/ui/typography"
import { FieldGroup } from "@/components/ui/field"
import TextInput from "../TextInput"
import Link from "next/link"
import { useEffect, useState } from "react"
import {
  Combobox,
  ComboboxChip,
  ComboboxChips,
  ComboboxChipsInput,
  ComboboxContent,
  ComboboxEmpty,
  ComboboxItem,
  ComboboxList,
  ComboboxValue,
} from "@/components/ui/combobox"
import axios from "axios"
import { Button } from "@/components/ui/button"
import { redirect, RedirectType } from "next/navigation"

interface props {
  session: Session
}

interface user {
  id: string
  firstName: string
  lastName: string
}

interface formInput {
  name: string
  members: string[]
}

// Provides a form for the owner to create a team
const CreateTeam = ({ session }: props) => {
  const [formInput, setFormInput] = useState<formInput>({
    name: "",
    members: [],
  })
  const [users, setUsers] = useState<user[]>([])

  useEffect(() => {
    const getUsers = async () => {
      try {
        const res = await axios.get(`/api/users`)
        if (res.status === 200) {
          console.log(res.data)
          const data = res.data.map((data) => {
            return {
              id: data.id,
              firstName: data.firstName,
              lastName: data.lastName,
            }
          })
          console.log(data)

          setUsers(data)
        }
      } catch (err) {
        console.error(err)
      } finally {
      }
    }
    getUsers()
  }, [])

  const handleCreateTeam = async () => {
    try {
      const res = await axios.post(`/api/teams`, {
        data: formInput,
      })
      if (res.status === 200) {
        console.log("OK")
        redirect(`/org/teams`, RedirectType.push)
      }
    } catch (err) {
      console.error(err)
    }
  }

  return (
    <>
      <FormWrapper>
        <H2>Create Team</H2>
        {/* <FieldLegend>Sign In</FieldLegend> */}
        <FieldGroup>
          <TextInput
            label="Name"
            type="text"
            field="name"
            form={formInput}
            setForm={setFormInput}
          />
          <Combobox
            items={users}
            multiple
            value={formInput.members}
            onValueChange={(members) =>
              setFormInput((prev) => ({ ...prev, members }))
            }
          >
            <ComboboxChips>
              <ComboboxValue>
                {formInput.members.map((memberId) => {
                  const user = users.find((user) => user.id === memberId)
                  return (
                    <ComboboxChip key={memberId}>
                      {user!.firstName} {user!.lastName}
                    </ComboboxChip>
                  )
                })}
              </ComboboxValue>
              <ComboboxChipsInput placeholder="Add framework" />
            </ComboboxChips>
            <ComboboxContent>
              <ComboboxEmpty>No items found.</ComboboxEmpty>
              <ComboboxList>
                {(member) => (
                  <ComboboxItem key={member.id} value={member.id}>
                    {member.firstName} {member.lastName}
                  </ComboboxItem>
                )}
              </ComboboxList>
            </ComboboxContent>
          </Combobox>
          <Button onClick={handleCreateTeam}>Create</Button>
        </FieldGroup>
      </FormWrapper>
    </>
  )
}

export default CreateTeam
