import { unstable_cache } from "next/cache"
import { eq } from "drizzle-orm"

import { db } from "@/lib/db"
import { user } from "@/lib/db/schema/auth"
import { work, workTag } from "@/lib/db/schema/work"

export function getWork(id: string) {
  return unstable_cache(
    async () => {
      const [row] = await db
        .select({
          work,
          author: { id: user.id, name: user.name, image: user.image },
        })
        .from(work)
        .leftJoin(user, eq(work.userId, user.id))
        .where(eq(work.id, id))
        .limit(1)

      if (!row) return null

      const tags = await db
        .select({ tag: workTag.tag })
        .from(workTag)
        .where(eq(workTag.workId, id))

      return { ...row.work, author: row.author, tags: tags.map((t) => t.tag) }
    },
    [id],
    { tags: [`work-${id}`] }
  )()
}
