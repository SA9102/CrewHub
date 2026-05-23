import { BASE_URL_DEV, POST_USER } from "@/lib/routes"
import axios from "axios"
import { describe, test, it, expect } from "vitest"

describe("account registration", () => {
  test("first name and last name cannot contains numbers or symbols (apart from ' and -), and must be between 2 and 50 characters", async () => {
    // Using 'fetch' instead of 'axios', for simpler testing

    let res = await fetch(BASE_URL_DEV + POST_USER, {
      method: "POST",
      body: JSON.stringify({
        firstName: "a",
        lastName: "john",
        email: "a@a.com",
        password: "a",
        confirmPassword: "a",
      }),
    })

    expect(res.status).toBe(400)

    res = await fetch(BASE_URL_DEV + POST_USER, {
      method: "POST",
      body: JSON.stringify({
        firstName: "jack",
        lastName: "john3",
        email: "a@a.com",
        password: "a",
        confirmPassword: "a",
      }),
    })

    expect(res.status).toBe(400)

    res = await fetch(BASE_URL_DEV + POST_USER, {
      method: "POST",
      body: JSON.stringify({
        firstName: "jackkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkk",
        lastName: "john",
        email: "a@a.com",
        password: "a",
        confirmPassword: "a",
      }),
    })

    expect(res.status).toBe(400)

    res = await fetch(BASE_URL_DEV + POST_USER, {
      method: "POST",
      body: JSON.stringify({
        firstName: "j@ck",
        lastName: "john",
        email: "a@a.com",
        password: "a",
        confirmPassword: "a",
      }),
    })

    expect(res.status).toBe(400)
  })
})
