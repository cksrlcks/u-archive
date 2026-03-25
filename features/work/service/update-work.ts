import { eq } from "drizzle-orm"
import { nanoid } from "nanoid"

import { db } from "@/lib/db"
import { work, workTag } from "@/lib/db/schema/work"

type UpdateWorkParams = {
  imageUrl?: string
  imageWidth?: number
  imageHeight?: number
  prompt?: string
  platform?: string | null
  tags?: string[]
}

export async function updateWork(
  id: string,
  {
    imageUrl,
    imageWidth,
    imageHeight,
    prompt,
    platform,
    tags,
  }: UpdateWorkParams
) {
  await db.transaction(async (tx) => {
    const fieldsToUpdate: Partial<typeof work.$inferInsert> = {}
    if (imageUrl !== undefined) fieldsToUpdate.imageUrl = imageUrl
    if (imageWidth !== undefined) fieldsToUpdate.imageWidth = imageWidth
    if (imageHeight !== undefined) fieldsToUpdate.imageHeight = imageHeight
    if (prompt !== undefined) fieldsToUpdate.prompt = prompt
    if (platform !== undefined) fieldsToUpdate.platform = platform

    if (Object.keys(fieldsToUpdate).length > 0) {
      fieldsToUpdate.updatedAt = new Date()
      await tx.update(work).set(fieldsToUpdate).where(eq(work.id, id))
    }

    if (tags !== undefined) {
      await tx.delete(workTag).where(eq(workTag.workId, id))
      if (tags.length > 0) {
        await tx
          .insert(workTag)
          .values(tags.map((tag) => ({ id: nanoid(), workId: id, tag })))
      }
    }
  })
}
