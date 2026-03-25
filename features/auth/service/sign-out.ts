"use client"

import { authClient } from "@/features/auth/lib/auth-client"

export async function signOut() {
  return authClient.signOut()
}
