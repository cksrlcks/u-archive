import { headers } from "next/headers"

import { auth } from "@/features/auth/lib/auth"
import { createWork, getWorks } from "@/features/work/service"

export async function GET(req: Request) {
  const { searchParams } = new URL(req.url)
  const cursor = searchParams.get("cursor") ?? undefined
  const limit = Number(searchParams.get("limit") ?? 20)
  const search = searchParams.get("search") ?? undefined

  const data = await getWorks({ cursor, limit, search })
  return Response.json(data)
}

export async function POST(req: Request) {
  const session = await auth.api.getSession({ headers: await headers() })
  if (!session?.user || !session.user.approved) {
    return Response.json({ error: "Unauthorized" }, { status: 401 })
  }

  const body = (await req.json()) as {
    imageUrl: string
    imageWidth: number
    imageHeight: number
    prompt: string
    platform?: string | null
    tags: string[]
  }

  const id = await createWork({ ...body, userId: session.user.id })
  return Response.json({ id }, { status: 201 })
}
