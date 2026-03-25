"use client"

import { useQuery } from "@tanstack/react-query"
import { parseAsInteger, useQueryState } from "nuqs"

export type Ask = {
  id: string
  userId: string | null
  content: string
  authorName: string | null
  authorImage: string | null
  commentCount: number
  createdAt: string
  updatedAt: string
}

export type AsksPage = {
  items: Ask[]
  total: number
  totalPages: number
}

async function fetchAsks(page: number): Promise<AsksPage> {
  const res = await fetch(`/api/asks?page=${page}`)
  if (!res.ok) throw new Error("Failed to fetch asks")
  return res.json()
}

export function useAsks() {
  const [page, setPage] = useQueryState("page", parseAsInteger.withDefault(1))

  const { data, isLoading } = useQuery({
    queryKey: ["asks", page],
    queryFn: () => fetchAsks(page),
  })

  return {
    asks: data?.items ?? [],
    isLoading,
    page,
    setPage,
    totalPages: data?.totalPages ?? 1,
    total: data?.total ?? 0,
  }
}
