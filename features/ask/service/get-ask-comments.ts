import { asc, eq } from "drizzle-orm"

import { db } from "@/lib/db"
import { askComment } from "@/lib/db/schema/ask"
import { user } from "@/lib/db/schema/auth"

export async function getAskComments(askId: string) {
  const items = await db
    .select({
      comment: askComment,
      authorName: user.name,
      authorImage: user.image,
    })
    .from(askComment)
    .leftJoin(user, eq(askComment.userId, user.id))
    .where(eq(askComment.askId, askId))
    .orderBy(asc(askComment.createdAt))

  return items.map(({ comment, authorName, authorImage }) => ({
    ...comment,
    authorName,
    authorImage,
  }))
}
