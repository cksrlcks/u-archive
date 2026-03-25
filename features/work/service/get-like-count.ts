import { count, eq } from "drizzle-orm"

import { db } from "@/lib/db"
import { workLike } from "@/lib/db/schema/work"

export async function getLikeCount(workId: string): Promise<number> {
  const [row] = await db
    .select({ count: count() })
    .from(workLike)
    .where(eq(workLike.workId, workId))
  return row?.count ?? 0
}
