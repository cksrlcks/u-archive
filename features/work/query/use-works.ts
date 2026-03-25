"use client"

import { useEffect, useRef } from "react"
import { useInfiniteQuery } from "@tanstack/react-query"
import { useQueryState } from "nuqs"

export type Work = {
  id: string
  userId: string | null
  imageUrl: string
  imageWidth: number
  imageHeight: number
  prompt: string
  platform: string | null
  tags: string[]
  authorName: string | null
  createdAt: string
  updatedAt: string
}

export type WorksPage = {
  items: Work[]
  nextCursor: string | null
}

async function fetchWorks({
  pageParam,
  search,
}: {
  pageParam: string | undefined
  search?: string
}): Promise<WorksPage> {
  const params = new URLSearchParams()
  if (pageParam) params.set("cursor", pageParam)
  if (search) params.set("search", search)
  const res = await fetch(`/api/works?${params}`)
  if (!res.ok) throw new Error("Failed to fetch works")
  return res.json()
}

export function useWorks() {
  const [search, setSearch] = useQueryState("q", { defaultValue: "" })
  const { data, fetchNextPage, hasNextPage, isFetchingNextPage, isLoading } =
    useInfiniteQuery({
      queryKey: ["works", { search }],
      queryFn: ({ pageParam }) =>
        fetchWorks({ pageParam, search: search || undefined }),
      initialPageParam: undefined as string | undefined,
      getNextPageParam: (lastPage) => lastPage.nextCursor ?? undefined,
    })

  const sentinelRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const el = sentinelRef.current
    if (!el) return

    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting && hasNextPage && !isFetchingNextPage) {
          fetchNextPage()
        }
      },
      { threshold: 0.1 }
    )

    observer.observe(el)
    return () => observer.disconnect()
  }, [hasNextPage, isFetchingNextPage, fetchNextPage])

  const works = data?.pages.flatMap((page) => page.items) ?? []

  return {
    works,
    search,
    setSearch,
    sentinelRef,
    isLoading,
    isFetchingNextPage,
  }
}
