import { BASE_URL_DEV } from "@/lib/routes"
import { describe, expect, it } from "vitest"

describe("email invite", () => {
  it("should return 200", async () => {
    const res = await fetch(`${BASE_URL_DEV}/api/user/send-email`, {
      method: "POST",
    })
    console.log(res)
    expect(res.status).toEqual(200)
  })
})
