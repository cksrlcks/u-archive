"use client"

import { useQuery } from "@tanstack/react-query"

import { Work } from "./use-works"

export type WorkDetail = Work & {
  author: {
    id: string | null
    name: string | null
    image: string | null
  } | null
  likeCount: number
  isLiked: boolean
}

async function fetchWork(id: string): Promise<WorkDetail> {
  const res = await fetch(`/api/works/${id}`)
  if (!res.ok) throw new Error("Failed to fetch work")
  return res.json()
}

export function useWork(id: string) {
  return useQuery({
    queryKey: ["works", id],
    queryFn: () => fetchWork(id),
    staleTime: 0,
  })
}
