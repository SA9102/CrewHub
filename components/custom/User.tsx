"use client"

import axios from "axios"
import { useParams } from "next/navigation"
import { useEffect, useState } from "react"
import { H2 } from "../ui/typography"

interface User {
  id: string
  firstName: string
  lastName: string
  email: string
}

const User = () => {
  const [user, setUser] = useState<User | null>(null)
  const params = useParams()
  const userId = params.userId

  useEffect(() => {
    const getUserData = async () => {
      try {
        const res = await axios.get(`/api/user/${userId}`)
        if (res.status === 200) {
          setUser(res.data)
        }
      } catch (err) {
        console.error(err)
      }
    }

    getUserData()
  }, [])
  return (
    <>
      {user && (
        <>
          <H2>
            {user.firstName} {user.lastName}
          </H2>
          <p>{user.email}</p>
        </>
      )}
    </>
  )
}

export default User
