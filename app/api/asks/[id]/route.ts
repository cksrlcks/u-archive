import { headers } from "next/headers"

import { deleteAsk, updateAsk } from "@/features/ask/service"
import { auth } from "@/features/auth/lib/auth"

export async function PATCH(
  req: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  const session = await auth.api.getSession({ headers: await headers() })
  if (!session?.user) {
    return Response.json({ error: "Unauthorized" }, { status: 401 })
  }

  const { id } = await params
  const { content } = await req.json()
  if (!content?.trim()) {
    return Response.json({ error: "Content is required" }, { status: 400 })
  }

  const updated = await updateAsk(id, session.user.id, content.trim())
  if (!updated) {
    return Response.json({ error: "Not found" }, { status: 404 })
  }

  return Response.json(updated)
}

export async function DELETE(
  _req: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  const session = await auth.api.getSession({ headers: await headers() })
  if (!session?.user) {
    return Response.json({ error: "Unauthorized" }, { status: 401 })
  }

  const { id } = await params
  const deleted = await deleteAsk(id, session.user.id)
  if (!deleted) {
    return Response.json({ error: "Not found" }, { status: 404 })
  }

  return new Response(null, { status: 204 })
}
