import { and, eq } from "drizzle-orm"

import { db } from "@/lib/db"
import { askComment } from "@/lib/db/schema/ask"

export async function deleteAskComment(id: string, userId: string) {
  const [deleted] = await db
    .delete(askComment)
    .where(and(eq(askComment.id, id), eq(askComment.userId, userId)))
    .returning()
  return deleted ?? null
}
