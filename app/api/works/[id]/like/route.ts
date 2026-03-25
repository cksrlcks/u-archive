import { headers } from "next/headers"

import { auth } from "@/features/auth/lib/auth"
import { toggleLike } from "@/features/work/service"

export async function POST(
  _req: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  const session = await auth.api.getSession({ headers: await headers() })
  if (!session?.user) {
    return Response.json({ error: "Unauthorized" }, { status: 401 })
  }

  const { id } = await params
  const result = await toggleLike(session.user.id, id)
  return Response.json(result)
}
