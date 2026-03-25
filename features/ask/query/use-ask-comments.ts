"use client"

import { useQuery } from "@tanstack/react-query"

export type AskComment = {
  id: string
  askId: string
  userId: string | null
  content: string
  authorName: string | null
  authorImage: string | null
  createdAt: string
  updatedAt: string
}

async function fetchAskComments(askId: string): Promise<AskComment[]> {
  const res = await fetch(`/api/asks/${askId}/comments`)
  if (!res.ok) throw new Error("Failed to fetch comments")
  return res.json()
}

export function useAskComments(askId: string) {
  const { data, isLoading } = useQuery({
    queryKey: ["ask-comments", askId],
    queryFn: () => fetchAskComments(askId),
  })

  return { comments: data ?? [], isLoading }
}
