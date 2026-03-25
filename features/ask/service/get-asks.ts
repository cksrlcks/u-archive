import { count, desc, eq, inArray } from "drizzle-orm"

import { db } from "@/lib/db"
import { ask, askComment } from "@/lib/db/schema/ask"
import { user } from "@/lib/db/schema/auth"

const PAGE_LIMIT = 10

export async function getAsks(page: number = 1) {
  const limit = PAGE_LIMIT
  const offset = (page - 1) * limit

  const [totalResult] = await db.select({ count: count() }).from(ask)
  const total = totalResult?.count ?? 0
  const totalPages = Math.max(1, Math.ceil(total / limit))

  const items = await db
    .select({
      ask,
      authorName: user.name,
      authorImage: user.image,
    })
    .from(ask)
    .leftJoin(user, eq(ask.userId, user.id))
    .orderBy(desc(ask.createdAt))
    .limit(limit)
    .offset(offset)

  if (items.length === 0) return { items: [], total, totalPages }

  const askIds = items.map((a) => a.ask.id)
  const commentCounts = await db
    .select({ askId: askComment.askId, count: count() })
    .from(askComment)
    .where(inArray(askComment.askId, askIds))
    .groupBy(askComment.askId)

  const countByAskId = commentCounts.reduce<Record<string, number>>(
    (acc, { askId, count }) => {
      acc[askId] = count
      return acc
    },
    {}
  )

  return {
    items: items.map(({ ask: a, authorName, authorImage }) => ({
      ...a,
      authorName,
      authorImage,
      commentCount: countByAskId[a.id] ?? 0,
    })),
    total,
    totalPages,
  }
}
