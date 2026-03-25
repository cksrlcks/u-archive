"use client"

import { useMutation, useQueryClient } from "@tanstack/react-query"

export function useCreateAskComment(askId: string) {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: async (content: string) => {
      const res = await fetch(`/api/asks/${askId}/comments`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ content }),
      })
      if (!res.ok) {
        const { error } = await res.json()
        throw new Error(error ?? "Failed to create comment")
      }
      return res.json()
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["ask-comments", askId] })
      queryClient.invalidateQueries({ queryKey: ["asks"] })
    },
  })
}

export function useDeleteAskComment(askId: string) {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: async (commentId: string) => {
      const res = await fetch(`/api/asks/${askId}/comments/${commentId}`, {
        method: "DELETE",
      })
      if (!res.ok) throw new Error("Failed to delete comment")
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["ask-comments", askId] })
      queryClient.invalidateQueries({ queryKey: ["asks"] })
    },
  })
}
