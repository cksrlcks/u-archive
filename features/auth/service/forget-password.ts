"use client"

import { requestPasswordReset as authRequestPasswordReset } from "@/features/auth/lib/auth-client"

export async function requestPasswordReset(email: string) {
  return authRequestPasswordReset({
    email,
    redirectTo: "/reset-password",
  })
}
