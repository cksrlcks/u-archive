"use client"

import Image from "next/image"
import { useRouter } from "next/navigation"
import { useQueryClient } from "@tanstack/react-query"

import { SkeletonGrid } from "@/features/work/components/work-grid-skeleton"
import { WorkSearchInput } from "@/features/work/components/work-search-input"
import { WorkDetail } from "@/features/work/query/use-work"
import { useWorks } from "@/features/work/query/use-works"
import { cdnUrl } from "@/lib/image"

export function WorkGrid() {
  const router = useRouter()
  const queryClient = useQueryClient()
  const {
    works,
    search,
    setSearch,
    sentinelRef,
    isLoading,
    isFetchingNextPage,
  } = useWorks()

  function handleWorkClick(work: (typeof works)[number]) {
    queryClient.setQueryData<WorkDetail>(["works", work.id], (old) => {
      if (old) return old
      return {
        ...work,
        author: {
          id: work.userId,
          name: work.authorName,
          image: null,
        },
        likeCount: 0,
        isLiked: false,
      }
    })
    router.push(`/works/${work.id}`)
  }

  return (
    <div className="-mx-4 md:mx-0 md:-my-8">
      <div className="pt-2pb-4 sticky top-12 z-10 bg-white px-4 pb-3 md:top-0 md:px-0 md:pt-8 md:pb-6">
        <WorkSearchInput defaultValue={search} onSearch={setSearch} />
      </div>
      <div className="grid grid-cols-2 gap-px sm:grid-cols-3 md:gap-1 lg:grid-cols-4">
        {isLoading ? (
          <SkeletonGrid count={8} />
        ) : (
          works.map((work) => (
            <button
              key={work.id}
              onClick={() => handleWorkClick(work)}
              className="group block cursor-pointer text-left"
            >
              <div className="relative aspect-square overflow-hidden bg-muted">
                <Image
                  src={cdnUrl(work.imageUrl, {
                    width: 500,
                    quality: 100,
                    format: "webp",
                  })}
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
          ))
        )}
        {isFetchingNextPage && <SkeletonGrid count={4} />}
      </div>
      <div ref={sentinelRef} className="h-10" />
    </div>
  )
}
