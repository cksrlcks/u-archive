import { headers } from "next/headers"
import { redirect } from "next/navigation"

import PageHeader from "@/components/common/page-header"
import UserTable from "@/features/admin/components/user-table"
import { auth } from "@/features/auth/lib/auth"

export default async function Page() {
  const session = await auth.api.getSession({ headers: await headers() })

  if (!session?.user.role || session.user.role !== "admin") {
    redirect("/explore")
  }

  return (
    <>
      <PageHeader title="회원 관리" description="가입 회원 목록 및 승인 관리" />
      <UserTable />
    </>
  )
}
