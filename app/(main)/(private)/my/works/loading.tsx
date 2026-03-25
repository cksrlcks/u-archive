import { SkeletonGrid } from "@/features/work/components/work-grid-skeleton"

export default function Loading() {
  return (
    <div className="grid grid-cols-2 gap-1 sm:grid-cols-3 lg:grid-cols-4">
      <SkeletonGrid count={16} />
    </div>
  )
}
