"use client"

import Image from "next/image"
import { useRouter } from "next/navigation"
import { useQueryClient } from "@tanstack/react-query"
import { ImageOff } from "lucide-react"

import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination"
import { SkeletonGrid } from "@/features/work/components/work-grid-skeleton"
import { getPageRange } from "@/features/work/lib/pagination"
import { useMyLikes } from "@/features/work/query/use-my-likes"
import { useMyWorks } from "@/features/work/query/use-my-works"
import { WorkDetail } from "@/features/work/query/use-work"
import { Work } from "@/features/work/query/use-works"
import { cdnUrl } from "@/lib/image"

type WorkPageGridProps = {
  works: Work[]
  isLoading: boolean
  page: number
  totalPages: number
  onPageChange: (page: number) => void
}

function WorkPageGrid({
  works,
  isLoading,
  page,
  totalPages,
  onPageChange,
}: WorkPageGridProps) {
  const router = useRouter()
  const queryClient = useQueryClient()

  function handleWorkClick(work: Work) {
    queryClient.setQueryData<WorkDetail>(["works", work.id], (old) => {
      if (old) return old
      return { ...work, author: null, likeCount: 0, isLiked: false }
    })
    router.push(`/works/${work.id}`)
  }

  if (isLoading) {
    return (
      <div className="grid grid-cols-2 gap-1 sm:grid-cols-3 lg:grid-cols-4">
        <SkeletonGrid count={16} />
      </div>
    )
  }

  if (!isLoading && works.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center gap-3 py-24 text-muted-foreground">
        <ImageOff className="size-10 opacity-40" />
        <p className="text-sm">조회된 항목이 없습니다.</p>
      </div>
    )
  }

  const pageRange = getPageRange(page, totalPages)

  return (
    <div className="space-y-8">
      <div className="grid grid-cols-2 gap-1 sm:grid-cols-3 lg:grid-cols-4">
        {works.map((work) => (
          <button
            key={work.id}
            onClick={() => handleWorkClick(work)}
            className="group block cursor-pointer text-left"
          >
            <div className="relative aspect-square overflow-hidden bg-muted">
              <Image
                src={cdnUrl(work.imageUrl)}
                alt=""
                className="h-full w-full object-cover transition-opacity group-hover:opacity-90"
                fill
                unoptimized
              />
              {work.authorName && (
                <div className="absolute inset-x-0 bottom-0 bg-linear-to-t from-black/70 to-transparent p-4 pt-10 opacity-0 transition-opacity duration-200 group-hover:opacity-100">
                  <span className="truncate text-xs text-white">
                    {work.authorName}
                  </span>
                </div>
              )}
            </div>
          </button>
        ))}
      </div>

      {totalPages > 1 && (
        <Pagination>
          <PaginationContent>
            <PaginationItem>
              <PaginationPrevious
                onClick={() => onPageChange(page - 1)}
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
                    onClick={() => onPageChange(p)}
                  >
                    {p}
                  </PaginationLink>
                </PaginationItem>
              )
            )}
            <PaginationItem>
              <PaginationNext
                onClick={() => onPageChange(page + 1)}
                disabled={page >= totalPages}
              />
            </PaginationItem>
          </PaginationContent>
        </Pagination>
      )}
    </div>
  )
}

export function MyWorksGrid() {
  const { works, isLoading, page, setPage, totalPages } = useMyWorks()
  return (
    <WorkPageGrid
      works={works}
      isLoading={isLoading}
      page={page}
      totalPages={totalPages}
      onPageChange={(p) => setPage(p)}
    />
  )
}

export function MyLikesGrid() {
  const { works, isLoading, page, setPage, totalPages } = useMyLikes()
  return (
    <WorkPageGrid
      works={works}
      isLoading={isLoading}
      page={page}
      totalPages={totalPages}
      onPageChange={(p) => setPage(p)}
    />
  )
}
