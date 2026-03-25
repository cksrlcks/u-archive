import { headers } from "next/headers"

import { deleteAskComment } from "@/features/ask/service"
import { auth } from "@/features/auth/lib/auth"

export async function DELETE(
  _req: Request,
  { params }: { params: Promise<{ id: string; commentId: string }> }
) {
  const session = await auth.api.getSession({ headers: await headers() })
  if (!session?.user) {
    return Response.json({ error: "Unauthorized" }, { status: 401 })
  }

  const { commentId } = await params
  const deleted = await deleteAskComment(commentId, session.user.id)
  if (!deleted) {
    return Response.json({ error: "Not found" }, { status: 404 })
  }

  return new Response(null, { status: 204 })
}
