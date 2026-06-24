export const POST = async (req: Request) => {
  try {
    const body = (await req.json()).data
    console.log(body)
  } catch (err) {
    return Response.json({ error: err }, { status: 500 })
  }
}
