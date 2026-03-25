"use client"

import { useQuery } from "@tanstack/react-query"
import { parseAsInteger, useQueryState } from "nuqs"

import { Work } from "@/features/work/query/use-works"

export type MyWorksPage = {
  items: Work[]
  total: number
  totalPages: number
}

async function fetchMyWorks(page: number): Promise<MyWorksPage> {
  const res = await fetch(`/api/my/works?page=${page}`)
  if (!res.ok) throw new Error("Failed to fetch my works")
  return res.json()
}

export function useMyWorks() {
  const [page, setPage] = useQueryState("page", parseAsInteger.withDefault(1))

  const { data, isLoading } = useQuery({
    queryKey: ["my-works", page],
    queryFn: () => fetchMyWorks(page),
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
