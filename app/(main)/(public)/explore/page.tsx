import { Suspense } from "react"

import { WorkGrid } from "@/features/work/components/work-grid"

export default function Page() {
  return (
    <Suspense>
      <WorkGrid />
    </Suspense>
  )
}
