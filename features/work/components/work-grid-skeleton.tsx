export function SkeletonGrid({ count }: { count: number }) {
  return (
    <>
      {Array.from({ length: count }).map((_, i) => (
        <div key={i} className="aspect-square animate-pulse bg-muted" />
      ))}
    </>
  )
}
