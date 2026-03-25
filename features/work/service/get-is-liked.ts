import { and, eq } from "drizzle-orm"

import { db } from "@/lib/db"
import { workLike } from "@/lib/db/schema/work"

export async function getIsLiked(
  userId: string,
  workId: string
): Promise<boolean> {
  const [row] = await db
    .select({ userId: workLike.userId })
    .from(workLike)
    .where(and(eq(workLike.userId, userId), eq(workLike.workId, workId)))
    .limit(1)
  return !!row
}
