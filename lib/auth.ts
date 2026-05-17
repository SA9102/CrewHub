import "server-only"
import bcrypt from "bcrypt"

export async function hashAndSaltPassword(password: string) {
  const hashed = await bcrypt.hash(password, 10)
  return hashed
}
