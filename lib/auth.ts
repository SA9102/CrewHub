import "server-only"
import bcrypt from "bcryptjs"

export const hashAndSaltPassword = async (password: string) => {
  const hashed = await bcrypt.hash(password, 10)
  return hashed
}

export const verifyPassword = async (password: string, hash: string) => {
  const isValid = await bcrypt.compare(password, hash)
  return isValid
}
