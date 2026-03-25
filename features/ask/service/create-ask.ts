import { nanoid } from "nanoid"

import { db } from "@/lib/db"
import { ask } from "@/lib/db/schema/ask"

export async function createAsk(userId: string, content: string) {
  const [created] = await db
    .insert(ask)
    .values({ id: nanoid(), userId, content })
    .returning()
  return created
}
