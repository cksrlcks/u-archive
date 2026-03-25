import { revalidateTag } from "next/cache"
import { headers } from "next/headers"
import { DeleteObjectCommand } from "@aws-sdk/client-s3"

import { auth } from "@/features/auth/lib/auth"
import {
  deleteWork,
  getIsLiked,
  getLikeCount,
  getWork,
  updateWork,
} from "@/features/work/service"
import { r2, R2_BUCKET, R2_PUBLIC_URL } from "@/lib/r2"

async function deleteR2Image(imageUrl: string) {
  const key = imageUrl.replace(`${R2_PUBLIC_URL}/`, "")
  await r2.send(new DeleteObjectCommand({ Bucket: R2_BUCKET, Key: key }))
}

export async function GET(
  req: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params
  const [work, session] = await Promise.all([
    getWork(id),
    auth.api.getSession({ headers: await headers() }),
  ])
  if (!work) return Response.json({ error: "Not found" }, { status: 404 })

  const [likeCount, isLiked] = await Promise.all([
    getLikeCount(id),
    session?.user ? getIsLiked(session.user.id, id) : Promise.resolve(false),
  ])

  return Response.json({ ...work, likeCount, isLiked })
}

export async function PATCH(
  req: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  const session = await auth.api.getSession({ headers: await headers() })
  if (!session?.user || !session.user.approved) {
    return Response.json({ error: "Unauthorized" }, { status: 401 })
  }

  const { id } = await params
  const work = await getWork(id)
  if (!work) return Response.json({ error: "Not found" }, { status: 404 })
  if (work.userId !== session.user.id) {
    return Response.json({ error: "Forbidden" }, { status: 403 })
  }

  const body = (await req.json()) as {
    prompt?: string
    tags?: string[]
    platform?: string | null
    imageUrl?: string
    imageWidth?: number
    imageHeight?: number
  }

  if (body.imageUrl && body.imageUrl !== work.imageUrl) {
    await deleteR2Image(work.imageUrl)
  }

  await updateWork(id, body)
  revalidateTag(`work-${id}`, "default")
  return Response.json({ success: true })
}

export async function DELETE(
  _req: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  const session = await auth.api.getSession({ headers: await headers() })
  if (!session?.user || !session.user.approved) {
    return Response.json({ error: "Unauthorized" }, { status: 401 })
  }

  const { id } = await params
  const work = await getWork(id)
  if (!work) return Response.json({ error: "Not found" }, { status: 404 })
  if (work.userId !== session.user.id) {
    return Response.json({ error: "Forbidden" }, { status: 403 })
  }

  await Promise.all([deleteWork(id), deleteR2Image(work.imageUrl)])
  revalidateTag(`work-${id}`, "default")
  return Response.json({ success: true })
}
