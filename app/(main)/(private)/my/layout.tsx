"use client"

import React from "react"
import { usePathname, useRouter } from "next/navigation"

import PageHeader from "@/components/common/page-header"
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs"

const tabs = [
  { label: "내 작업", value: "/my/works" },
  { label: "좋아요한 작업", value: "/my/likes" },
]

export default function Layout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname()
  const router = useRouter()

  return (
    <div className="space-y-6">
      <PageHeader title="마이페이지" />
      <Tabs value={pathname} onValueChange={(value) => router.push(value)}>
        <TabsList>
          {tabs.map((tab) => (
            <TabsTrigger key={tab.value} value={tab.value}>
              {tab.label}
            </TabsTrigger>
          ))}
        </TabsList>
      </Tabs>
      {children}
    </div>
  )
}
