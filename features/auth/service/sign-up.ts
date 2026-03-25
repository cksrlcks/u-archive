"use client"

import { authClient } from "@/features/auth/lib/auth-client"

export async function signUp(name: string, email: string, password: string) {
  return authClient.signUp.email({ name, email, password })
}
