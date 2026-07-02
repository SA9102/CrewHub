import { authenticate } from "@/lib/auth"
import { describe, expect, it } from "vitest"

describe("signing in", () => {
  it("should reject if invalid credentials", async () => {
    const data = { email: "a@a.com", password: "a" }

    await expect(authenticate({ ...data })).rejects.toThrow(
      "Invalid credentials"
    )
  })
  it("should accept if valid credentials", async () => {
    const data = { email: "a@a.com", password: "Abcd123@" }

    await expect(authenticate({ ...data })).resolves.toBeDefined()
  })
  // it("should create a session if a user enters ")
})
