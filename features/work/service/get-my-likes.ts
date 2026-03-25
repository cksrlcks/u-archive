import { count, desc, eq, inArray } from "drizzle-orm"

import { db } from "@/lib/db"
import { user } from "@/lib/db/schema/auth"
import { work, workLike, workTag } from "@/lib/db/schema/work"

const MY_PAGE_LIMIT = 16

export async function getMyLikes(userId: string, page: number = 1) {
  const limit = MY_PAGE_LIMIT
  const offset = (page - 1) * limit

  const [totalResult] = await db
    .select({ count: count() })
    .from(workLike)
    .where(eq(workLike.userId, userId))

  const total = totalResult?.count ?? 0
  const totalPages = Math.max(1, Math.ceil(total / limit))

  const items = await db
    .select({ work, authorName: user.name })
    .from(workLike)
    .innerJoin(work, eq(workLike.workId, work.id))
    .leftJoin(user, eq(work.userId, user.id))
    .where(eq(workLike.userId, userId))
    .orderBy(desc(workLike.createdAt))
    .limit(limit)
    .offset(offset)

  if (items.length === 0) return { items: [], total, totalPages }

  const workIds = items.map((w) => w.work.id)
  const tags = await db
    .select({ workId: workTag.workId, tag: workTag.tag })
    .from(workTag)
    .where(inArray(workTag.workId, workIds))

  const tagsByWorkId = tags.reduce<Record<string, string[]>>(
    (acc, { workId, tag }) => {
      acc[workId] = acc[workId] ? [...acc[workId], tag] : [tag]
      return acc
    },
    {}
  )

  return {
    items: items.map(({ work: w, authorName }) => ({
      ...w,
      authorName,
      tags: tagsByWorkId[w.id] ?? [],
    })),
    total,
    totalPages,
  }
}
