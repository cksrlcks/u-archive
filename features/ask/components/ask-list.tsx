"use client"

import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination"
import { AskItem } from "@/features/ask/components/ask-item"
import { useAsks } from "@/features/ask/query/use-asks"
import { getPageRange } from "@/features/work/lib/pagination"

export function AskList({ isApproved }: { isApproved: boolean }) {
  const { asks, isLoading, page, setPage, totalPages } = useAsks()

  const pageRange = getPageRange(page, totalPages)

  if (isLoading) {
    return (
      <div className="space-y-3">
        {Array.from({ length: 5 }).map((_, i) => (
          <div key={i} className="h-24 animate-pulse rounded-lg bg-muted" />
        ))}
      </div>
    )
  }

  if (asks.length === 0) {
    return (
      <p className="py-12 text-center text-sm text-muted-foreground">
        아직 작업 요청이 없습니다.
      </p>
    )
  }

  return (
    <div className="space-y-6">
      <div className="space-y-3">
        {asks.map((ask) => (
          <AskItem key={ask.id} ask={ask} isApproved={isApproved} />
        ))}
      </div>

      {totalPages > 1 && (
        <Pagination>
          <PaginationContent>
            <PaginationItem>
              <PaginationPrevious
                onClick={() => setPage(Math.max(1, page - 1))}
                disabled={page <= 1}
              />
            </PaginationItem>
            {pageRange.map((p, i) =>
              p === "ellipsis" ? (
                <PaginationItem key={`ellipsis-${i}`}>
                  <PaginationEllipsis />
                </PaginationItem>
              ) : (
                <PaginationItem key={p}>
                  <PaginationLink
                    isActive={p === page}
                    onClick={() => setPage(p)}
                  >
                    {p}
                  </PaginationLink>
                </PaginationItem>
              )
            )}
            <PaginationItem>
              <PaginationNext
                onClick={() => setPage(Math.min(totalPages, page + 1))}
                disabled={page >= totalPages}
              />
            </PaginationItem>
          </PaginationContent>
        </Pagination>
      )}
    </div>
  )
}
