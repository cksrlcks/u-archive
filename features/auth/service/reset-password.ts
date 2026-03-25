"use client"

import { resetPassword as authResetPassword } from "@/features/auth/lib/auth-client"

export async function resetPassword(newPassword: string, token: string) {
  return authResetPassword({ newPassword, token })
}
