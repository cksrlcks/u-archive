import { eq } from "drizzle-orm"

import { db } from "@/lib/db"
import { work } from "@/lib/db/schema/work"

export async function deleteWork(id: string) {
  await db.delete(work).where(eq(work.id, id))
}
