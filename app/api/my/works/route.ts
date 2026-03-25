import { headers } from "next/headers"

import { auth } from "@/features/auth/lib/auth"
import { getMyWorks } from "@/features/work/service"

export async function GET(req: Request) {
  const session = await auth.api.getSession({ headers: await headers() })
  if (!session?.user) {
    return Response.json({ error: "Unauthorized" }, { status: 401 })
  }

  const { searchParams } = new URL(req.url)
  const page = Math.max(1, Number(searchParams.get("page") ?? "1"))

  const result = await getMyWorks(session.user.id, page)
  return Response.json(result)
}
