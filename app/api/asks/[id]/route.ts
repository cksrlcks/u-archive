import { headers } from "next/headers"

import { deleteAsk } from "@/features/ask/service"
import { auth } from "@/features/auth/lib/auth"

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
