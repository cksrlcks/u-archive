import { and, eq } from "drizzle-orm"

import { db } from "@/lib/db"
import { ask } from "@/lib/db/schema/ask"

export async function updateAsk(id: string, userId: string, content: string) {
  const [updated] = await db
    .update(ask)
    .set({ content, updatedAt: new Date() })
    .where(and(eq(ask.id, id), eq(ask.userId, userId)))
    .returning()
  return updated ?? null
}
