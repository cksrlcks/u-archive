"use client"

import { usePathname, useRouter } from "next/navigation"

import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs"

const tabs = [
  { label: "내 작업", value: "/my/works" },
  { label: "좋아요한 작업", value: "/my/likes" },
]

export default function MyTabs() {
  const pathname = usePathname()
  const router = useRouter()

  return (
    <Tabs value={pathname} onValueChange={(value) => router.push(value)}>
      <TabsList>
        {tabs.map((tab) => (
          <TabsTrigger key={tab.value} value={tab.value}>
            {tab.label}
          </TabsTrigger>
        ))}
      </TabsList>
    </Tabs>
  )
}
