"use client"

import { authClient } from "@/features/auth/lib/auth-client"

export async function signIn(email: string, password: string) {
  return authClient.signIn.email({ email, password })
}
