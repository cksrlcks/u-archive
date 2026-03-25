import { NextRequest, NextResponse } from "next/server"

import { updateUserApproved } from "@/features/admin/service"

export async function PATCH(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params
  const body = await request.json()

  await updateUserApproved(id, body.approved)

  return NextResponse.json({ ok: true })
}
