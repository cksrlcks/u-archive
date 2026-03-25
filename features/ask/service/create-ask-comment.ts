import { nanoid } from "nanoid"

import { db } from "@/lib/db"
import { askComment } from "@/lib/db/schema/ask"

export async function createAskComment(
  askId: string,
  userId: string,
  content: string
) {
  const [created] = await db
    .insert(askComment)
    .values({ id: nanoid(), askId, userId, content })
    .returning()
  return created
}
