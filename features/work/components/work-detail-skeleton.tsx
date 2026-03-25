export function WorkDetailSkeleton() {
  return (
    <div className="grid h-[90vh] grid-cols-2">
      <div className="h-full animate-pulse rounded-xl bg-muted" />
      <div className="space-y-4 px-10 py-4">
        <div className="flex items-center justify-between">
          <div className="h-5 w-20 animate-pulse rounded-full bg-muted" />
          <div className="flex items-center gap-3">
            <div className="h-4 w-28 animate-pulse rounded bg-muted" />
            <div className="h-4 w-16 animate-pulse rounded bg-muted" />
          </div>
        </div>
        <div className="rounded-lg bg-muted/50 p-4">
          <div className="mb-2 h-3 w-12 animate-pulse rounded bg-muted" />
          <div className="space-y-2">
            <div className="h-4 w-full animate-pulse rounded bg-muted" />
            <div className="h-4 w-5/6 animate-pulse rounded bg-muted" />
            <div className="h-4 w-4/6 animate-pulse rounded bg-muted" />
          </div>
        </div>
        <div className="flex items-center justify-between gap-4">
          <div className="h-8 w-16 animate-pulse rounded-full bg-muted" />
          <div className="flex items-center gap-1">
            <div className="h-8 w-8 animate-pulse rounded bg-muted" />
            <div className="h-8 w-8 animate-pulse rounded bg-muted" />
          </div>
        </div>
        <div className="flex flex-wrap gap-1.5">
          {[60, 80, 50].map((w) => (
            <div
              key={w}
              className={`h-5 w-${w === 60 ? "14" : w === 80 ? "20" : "12"} animate-pulse rounded-full bg-muted`}
            />
          ))}
        </div>
      </div>
    </div>
  )
}
