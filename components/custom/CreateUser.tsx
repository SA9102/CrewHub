"use client"

import { API_GET_VALIDATE_INVITE_TOKEN } from "@/lib/routes"
import axios from "axios"
import { useParams } from "next/navigation"
import { useEffect } from "react"

const CreateUser = () => {
  const params = useParams<{ orgId: string }>()

  console.log(params)

  useEffect(() => {
    const validateToken = async () => {
      try {
        const res = axios.post(API_GET_VALIDATE_INVITE_TOKEN, params)
      } catch (err) {
        console.error(err)
      }
    }

    validateToken()
  })

  return (
    <>
      <p>Hey</p>
    </>
  )
}

export default CreateUser
