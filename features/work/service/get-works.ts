import { and, desc, eq, ilike, inArray, lt, or } from "drizzle-orm"

import { db } from "@/lib/db"
import { user } from "@/lib/db/schema/auth"
import { work, workTag } from "@/lib/db/schema/work"

const DEFAULT_LIMIT = 20

type GetWorksParams = {
  limit?: number
  cursor?: string
  search?: string
}

export async function getWorks({
  limit = DEFAULT_LIMIT,
  cursor,
  search,
}: GetWorksParams = {}) {
  let cursorCreatedAt: Date | undefined
  if (cursor) {
    const [cursorItem] = await db
      .select({ createdAt: work.createdAt })
      .from(work)
      .where(eq(work.id, cursor))
      .limit(1)
    cursorCreatedAt = cursorItem?.createdAt
  }

  const searchCondition = search
    ? or(
        ilike(work.prompt, `%${search}%`),
        inArray(
          work.id,
          db
            .select({ workId: workTag.workId })
            .from(workTag)
            .where(ilike(workTag.tag, `%${search}%`))
        )
      )
    : undefined

  const whereCondition =
    cursorCreatedAt && searchCondition
      ? and(lt(work.createdAt, cursorCreatedAt), searchCondition)
      : cursorCreatedAt
        ? lt(work.createdAt, cursorCreatedAt)
        : searchCondition

  const items = await db
    .select({ work, authorName: user.name })
    .from(work)
    .leftJoin(user, eq(work.userId, user.id))
    .where(whereCondition)
    .orderBy(desc(work.createdAt))
    .limit(limit + 1)

  const hasMore = items.length > limit
  const works = hasMore ? items.slice(0, limit) : items

  if (works.length === 0) {
    return { items: [], nextCursor: null }
  }

  const workIds = works.map((w) => w.work.id)
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
    items: works.map(({ work: w, authorName }) => ({
      ...w,
      authorName,
      tags: tagsByWorkId[w.id] ?? [],
    })),
    nextCursor: hasMore ? works[works.length - 1].work.id : null,
  }
}
