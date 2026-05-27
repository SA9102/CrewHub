import { BASE_URL_DEV, POST_USER } from "@/lib/routes"
import { signupInput } from "@/lib/types/inputs"
import axios from "axios"
import { describe, test, it, expect } from "vitest"

describe("account registration", () => {
  it("should reject if invalid organisation name", async () => {
    const api = async (organisationName: string) => {
      // Using 'fetch' instead of 'axios', for simpler testing
      const res = await fetch(BASE_URL_DEV + POST_USER, {
        method: "POST",
        body: JSON.stringify({
          organisationName,
          firstName: "john",
          lastName: "smith",
          email: "a@a.com",
          password: "Abcd123@",
          confirmPassword: "Abcd123@",
        }),
      })

      return res
    }

    let res = await api("")
    expect(res.status).toBe(400)

    res = await api("1@a")
    expect(res.status).toBe(400)

    res = await api("aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa")
    expect(res.status).toBe(400)
  })

  it("should reject if invalid first name or last name", async () => {
    interface input {
      firstName: string
      lastName: string
    }

    const api = async (input: input) => {
      // Using 'fetch' instead of 'axios', for simpler testing
      const res = await fetch(BASE_URL_DEV + POST_USER, {
        method: "POST",
        body: JSON.stringify({
          ...input,
          organisationName: "Acme LTD",
          email: "a@a.com",
          password: "a",
          confirmPassword: "a",
        }),
      })

      return res
    }

    let res = await api({
      firstName: "a",
      lastName: "john",
    })
    expect(res.status).toBe(400)

    res = await api({
      firstName: "jack",
      lastName: "john3",
    })
    expect(res.status).toBe(400)

    res = await api({
      firstName: "jackkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkk",
      lastName: "john",
    })
    expect(res.status).toBe(400)

    res = await api({
      firstName: "j@ck",
      lastName: "john",
    })
    expect(res.status).toBe(400)
  })

  it("should reject if invalid email", async () => {
    interface input {
      email: string
    }

    const api = async (input: input) => {
      const res = await fetch(BASE_URL_DEV + POST_USER, {
        method: "POST",
        body: JSON.stringify({
          ...input,
          organisationName: "Acme LTD",
          firstName: "john",
          lastName: "smith",
          password: "a",
          confirmPassword: "a",
        }),
      })

      return res
    }

    let res = await api({ email: "a@.c" })
    expect(res.status).toBe(400)

    res = await api({ email: "@a.c" })
    expect(res.status).toBe(400)

    res = await api({ email: "a@a" })
    expect(res.status).toBe(400)

    res = await api({ email: "a.@a.c" })
    expect(res.status).toBe(400)

    res = await api({ email: "a.com" })
    expect(res.status).toBe(400)
  })

  it("should reject if email is not unique", async () => {
    interface input {
      email: string
    }

    const api = async (input: input) => {
      const res = await fetch(BASE_URL_DEV + POST_USER, {
        method: "POST",
        body: JSON.stringify({
          ...input,
          organisationName: "Acme LTD",
          firstName: "john",
          lastName: "smith",
          password: "ABcd123@*",
          confirmPassword: "ABcd123@*",
        }),
      })

      return res
    }

    // A test user with the email a@a.com already exists
    let res = await api({ email: "a@a.com" })
    expect(res.status).toBe(409)
  })

  it("should reject if invalid password", async () => {
    const api = async (password: string) => {
      const res = await fetch(BASE_URL_DEV + POST_USER, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          organisationName: "Acme LTD",
          firstName: "john",
          lastName: "smith",
          // Generate a unique mock email, so that there is no risk of the test being
          // shorted-circuited due to conflicting emails
          email: `test-${Date.now()}@a.com`,
          password: password,
          confirmPassword: password,
        }),
      })

      return res
    }

    // Invalid length
    let res = await api("Abc123@")
    expect(res.status).toBe(400)

    // No numbers
    res = await api("Abcdefg@*")
    expect(res.status).toBe(400)

    // No symbols from !@#$%^&*_\-+=?
    res = await api("Abcdefg123]")
    expect(res.status).toBe(400)

    // No uppercase letters
    res = await api("abcd123@")
    expect(res.status).toBe(400)

    // No lowercase letters
    res = await api("ABCD123@")
    expect(res.status).toBe(400)
  })

  it("should reject if passwords do not match", async () => {
    interface input {
      password: string
      confirmPassword: string
    }

    const api = async (input: input) => {
      const res = await fetch(BASE_URL_DEV + POST_USER, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          ...input,
          organisationName: "Acme LTD",
          firstName: "john",
          lastName: "smith",
          // Generate a unique mock email, so that there is no risk of the test being
          // shorted-circuited due to conflicting emails
          email: `test-${Date.now()}@a.com`,
        }),
      })

      return res
    }

    // Valid password, but confirm password does not match
    let res = await api({ password: "ABcd123@*", confirmPassword: "a" })
    expect(res.status).toBe(400)
  })
})
