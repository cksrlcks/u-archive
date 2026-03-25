import { headers } from "next/headers"
import { PutObjectCommand } from "@aws-sdk/client-s3"
import { getSignedUrl } from "@aws-sdk/s3-request-presigner"
import { nanoid } from "nanoid"

import { auth } from "@/features/auth/lib/auth"
import { r2, R2_BUCKET } from "@/lib/r2"

export async function POST(req: Request) {
  const session = await auth.api.getSession({ headers: await headers() })
  if (!session?.user || !session.user.approved) {
    return Response.json({ error: "Unauthorized" }, { status: 401 })
  }

  const { contentType } = (await req.json()) as { contentType: string }
  if (!contentType.startsWith("image/")) {
    return Response.json(
      { error: "이미지 파일만 업로드 가능합니다" },
      { status: 400 }
    )
  }

  const ext = contentType.split("/")[1]
  const key = `works/${nanoid()}.${ext}`

  const command = new PutObjectCommand({
    Bucket: R2_BUCKET,
    Key: key,
    ContentType: contentType,
  })

  const presignedUrl = await getSignedUrl(r2, command, { expiresIn: 60 * 5 })

  return Response.json({ presignedUrl, key })
}
