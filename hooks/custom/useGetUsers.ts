import axios from "axios"
import { Session } from "next-auth"
import { useEffect, useState } from "react"

const useGetUsers = (session: Session) => {
  const [users, setUsers] = useState([])

  useEffect(() => {
    const getUsers = async () => {
      try {
        const res = await axios.get(`/api/users`)
        if (res.status === 200) {
          console.log(res.data)
          setUsers(res.data)
        }
      } catch (err) {
        setUsers([])
        console.error(err)
      }
    }

    getUsers()
  }, [])

  return users
}

export default useGetUsers
