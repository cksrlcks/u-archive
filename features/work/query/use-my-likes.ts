"use client"

import { useQuery } from "@tanstack/react-query"
import { parseAsInteger, useQueryState } from "nuqs"

import { Work } from "@/features/work/query/use-works"

export type MyLikesPage = {
  items: Work[]
  total: number
  totalPages: number
}

async function fetchMyLikes(page: number): Promise<MyLikesPage> {
  const res = await fetch(`/api/my/likes?page=${page}`)
  if (!res.ok) throw new Error("Failed to fetch my likes")
  return res.json()
}

export function useMyLikes() {
  const [page, setPage] = useQueryState("page", parseAsInteger.withDefault(1))

  const { data, isLoading } = useQuery({
    queryKey: ["my-likes", page],
    queryFn: () => fetchMyLikes(page),
  })

  return {
    works: data?.items ?? [],
    isLoading,
    page,
    setPage,
    totalPages: data?.totalPages ?? 1,
    total: data?.total ?? 0,
  }
}
