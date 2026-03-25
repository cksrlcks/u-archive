import { headers } from "next/headers"

import { createAskComment, getAskComments } from "@/features/ask/service"
import { auth } from "@/features/auth/lib/auth"

export async function GET(
  _req: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params
  const comments = await getAskComments(id)
  return Response.json(comments)
}

export async function POST(
  req: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  const session = await auth.api.getSession({ headers: await headers() })
  if (!session?.user) {
    return Response.json({ error: "Unauthorized" }, { status: 401 })
  }
  if (!session.user.approved) {
    return Response.json({ error: "Forbidden" }, { status: 403 })
  }

  const { id } = await params
  const { content } = await req.json()
  if (!content?.trim()) {
    return Response.json({ error: "내용을 입력해주세요" }, { status: 400 })
  }

  const created = await createAskComment(id, session.user.id, content.trim())
  return Response.json(created, { status: 201 })
}
