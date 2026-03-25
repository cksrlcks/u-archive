import NarrowInner from "@/components/layout/narrow-inner"

export default function Loading() {
  return (
    <NarrowInner>
      <div className="mb-8 h-7 w-20 animate-pulse rounded bg-muted" />
      <div className="flex flex-col gap-6">
        {/* 이미지 */}
        <div className="flex flex-col gap-2">
          <div className="h-4 w-12 animate-pulse rounded bg-muted" />
          <div className="aspect-2/1 w-full animate-pulse rounded-lg bg-muted" />
        </div>
        {/* 플랫폼 */}
        <div className="flex flex-col gap-2">
          <div className="h-4 w-24 animate-pulse rounded bg-muted" />
          <div className="h-10 w-full animate-pulse rounded bg-muted" />
        </div>
        {/* 프롬프트 */}
        <div className="flex flex-col gap-2">
          <div className="h-4 w-16 animate-pulse rounded bg-muted" />
          <div className="h-32 w-full animate-pulse rounded bg-muted" />
        </div>
        {/* 태그 */}
        <div className="flex flex-col gap-2">
          <div className="h-4 w-8 animate-pulse rounded bg-muted" />
          <div className="h-10 w-full animate-pulse rounded bg-muted" />
        </div>
        {/* 버튼 */}
        <div className="h-10 w-full animate-pulse rounded bg-muted" />
      </div>
    </NarrowInner>
  )
}
