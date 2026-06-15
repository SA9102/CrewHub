"use client"

import { useParams } from "next/navigation"
import { useEffect } from "react"

const CreateUser = () => {
  const params = useParams<{ orgId: string }>()

  console.log(params)

  useEffect(() => {
    const validateToken = async () => {
      try {
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
