import { nanoid } from "nanoid"

import { db } from "@/lib/db"
import { work, workTag } from "@/lib/db/schema/work"

type CreateWorkParams = {
  userId?: string
  imageUrl: string
  imageWidth: number
  imageHeight: number
  prompt: string
  platform?: string | null
  tags?: string[]
}

export async function createWork({
  userId,
  imageUrl,
  imageWidth,
  imageHeight,
  prompt,
  platform,
  tags = [],
}: CreateWorkParams) {
  const id = nanoid()

  await db.transaction(async (tx) => {
    await tx.insert(work).values({
      id,
      userId,
      imageUrl,
      imageWidth,
      imageHeight,
      prompt,
      platform: platform ?? null,
    })

    if (tags.length > 0) {
      await tx
        .insert(workTag)
        .values(tags.map((tag) => ({ id: nanoid(), workId: id, tag })))
    }
  })

  return id
}
