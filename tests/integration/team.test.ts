import { BASE_URL_DEV } from "@/lib/routes"
import { describe, expect, it } from "vitest"

describe("creating a team", () => {
  //   it("should reject if no name is specified", async () => {
  //     const orgId = "4e2affd0-95b8-4d24-9028-7dfccd3a28fe"
  //     const res = await fetch(`${BASE_URL_DEV}/api/${orgId}/team/`, {
  //       method: "POST",
  //       body: JSON.stringify({
  //         name: "",
  //         members: [],
  //       }),
  //     })

  //     expect(res.status).toEqual(500)
  //   })
  it("should create a team if at least a name is specified", async () => {
    const orgId = "4e2affd0-95b8-4d24-9028-7dfccd3a28fe"
    const res = await fetch(`${BASE_URL_DEV}/api/${orgId}/team/`, {
      method: "POST",
      body: JSON.stringify({
        name: "a",
        members: [],
      }),
    })
    console.log(res)
    expect(res.status).toEqual(204)
  })
  it("should reject if a user that does not exist is included")
  it("should reject if the organisation does not exist")
  it("should reject the user is unauthorized")
  //   it("should create team if a name is specified")
  // it("should create a team if sufficient detail is provided", async () => {
  //     const res = await fetch(`/api/4e2affd0-95b8-4d24-9028-7dfccd3a28fe/team/`, {
  //         method: "POST",
  //         body: JSON.stringify({
  //           name: "", members: ["1", "2", "3"]
  //         })})
  //     expect(res.status).toEqual(200)
  // })
  //   it("should reject is an authorized user is trying to create a team")
})
