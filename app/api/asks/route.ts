import { headers } from "next/headers"

import { createAsk, getAsks } from "@/features/ask/service"
import { auth } from "@/features/auth/lib/auth"

export async function GET(req: Request) {
  const { searchParams } = new URL(req.url)
  const page = Math.max(1, Number(searchParams.get("page") ?? "1"))

  const result = await getAsks(page)
  return Response.json(result)
}

export async function POST(req: Request) {
  const session = await auth.api.getSession({ headers: await headers() })

  if (!session?.user) {
    return Response.json({ error: "Unauthorized" }, { status: 401 })
  }

  const { content } = await req.json()
  if (!content?.trim()) {
    return Response.json({ error: "내용을 입력해주세요" }, { status: 400 })
  }

  const created = await createAsk(session.user.id, content.trim())
  return Response.json(created, { status: 201 })
}
