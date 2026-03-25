import React from "react"

import PageHeader from "@/components/common/page-header"
import MyTabs from "@/components/my-tabs"

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <div className="space-y-6">
      <PageHeader title="마이페이지" />
      <MyTabs />
      {children}
    </div>
  )
}
