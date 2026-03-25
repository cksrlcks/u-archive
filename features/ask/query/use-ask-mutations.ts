"use client"

import { useMutation, useQueryClient } from "@tanstack/react-query"

export function useCreateAsk() {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: async (content: string) => {
      const res = await fetch("/api/asks", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ content }),
      })
      if (!res.ok) {
        const { error } = await res.json()
        throw new Error(error ?? "Failed to create ask")
      }
      return res.json()
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["asks"] })
    },
  })
}

export function useUpdateAsk() {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: async ({ id, content }: { id: string; content: string }) => {
      const res = await fetch(`/api/asks/${id}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ content }),
      })
      if (!res.ok) {
        const { error } = await res.json()
        throw new Error(error ?? "Failed to update ask")
      }
      return res.json()
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["asks"] })
    },
  })
}

export function useDeleteAsk() {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: async (id: string) => {
      const res = await fetch(`/api/asks/${id}`, { method: "DELETE" })
      if (!res.ok) throw new Error("Failed to delete ask")
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["asks"] })
    },
  })
}
