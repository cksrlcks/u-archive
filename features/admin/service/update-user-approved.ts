import { eq } from "drizzle-orm"

import { verifyAdmin } from "@/features/admin/lib/dal"
import { db } from "@/lib/db"
import { user } from "@/lib/db/schema/auth"

export async function updateUserApproved(id: string, approved: boolean) {
  await verifyAdmin()
  await db.update(user).set({ approved }).where(eq(user.id, id))
}
