import { headers } from "next/headers"

import { auth } from "@/features/auth/lib/auth"

export async function verifyAdmin() {
  const session = await auth.api.getSession({ headers: await headers() })

  if (!session || session.user.role !== "admin") {
    throw new Error("Unauthorized")
  }

  return session
}
