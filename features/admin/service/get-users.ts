import { verifyAdmin } from "@/features/admin/lib/dal"
import { db } from "@/lib/db"
import { user } from "@/lib/db/schema/auth"

export async function getUsers() {
  await verifyAdmin()
  return db
    .select({
      id: user.id,
      name: user.name,
      email: user.email,
      role: user.role,
      approved: user.approved,
      createdAt: user.createdAt,
    })
    .from(user)
    .orderBy(user.createdAt)
}
