import { Suspense } from "react"

import PageHeader from "@/components/common/page-header"
import NarrowInner from "@/components/layout/narrow-inner"
import { AskForm } from "@/features/ask/components/ask-form"
import { AskList } from "@/features/ask/components/ask-list"

export default async function Page() {
  return (
    <NarrowInner>
      <PageHeader
        title="작업 요청"
        description="원하시는 작업을 자유롭게 요청해주세요."
      />
      <Suspense>
        <div className="space-y-6">
          <AskForm />
          <AskList />
        </div>
      </Suspense>
    </NarrowInner>
  )
}
