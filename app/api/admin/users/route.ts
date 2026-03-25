import { NextResponse } from "next/server"

import { getUsers } from "@/features/admin/service"

export async function GET() {
  const users = await getUsers()
  return NextResponse.json(users)
}
