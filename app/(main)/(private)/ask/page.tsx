import { headers } from "next/headers"

import PageHeader from "@/components/common/page-header"
import NarrowInner from "@/components/layout/narrow-inner"
import { AskForm } from "@/features/ask/components/ask-form"
import { AskList } from "@/features/ask/components/ask-list"
import { auth } from "@/features/auth/lib/auth"

export default async function Page() {
  const session = await auth.api.getSession({ headers: await headers() })
  const isApproved = session?.user?.approved ?? false

  return (
    <NarrowInner>
      <PageHeader
        title="작업 요청"
        description="원하시는 작업을 자유롭게 요청해주세요."
      />

      <div className="space-y-6">
        <AskForm isApproved={isApproved}/>
        <AskList isApproved={isApproved} />
      </div>
    </NarrowInner>
  )
}
