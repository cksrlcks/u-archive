import { and, eq } from "drizzle-orm"

import { db } from "@/lib/db"
import { ask } from "@/lib/db/schema/ask"

export async function deleteAsk(id: string, userId: string) {
  const [deleted] = await db
    .delete(ask)
    .where(and(eq(ask.id, id), eq(ask.userId, userId)))
    .returning()
  return deleted ?? null
}
