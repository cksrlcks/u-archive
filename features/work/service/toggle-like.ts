import { and, eq } from "drizzle-orm"

import { db } from "@/lib/db"
import { workLike } from "@/lib/db/schema/work"
import { getIsLiked } from "./get-is-liked"
import { getLikeCount } from "./get-like-count"

export async function toggleLike(
  userId: string,
  workId: string
): Promise<{ liked: boolean; count: number }> {
  const isLiked = await getIsLiked(userId, workId)

  if (isLiked) {
    await db
      .delete(workLike)
      .where(and(eq(workLike.userId, userId), eq(workLike.workId, workId)))
  } else {
    await db.insert(workLike).values({ userId, workId })
  }

  const newCount = await getLikeCount(workId)
  return { liked: !isLiked, count: newCount }
}
