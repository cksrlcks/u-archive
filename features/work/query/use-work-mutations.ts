"use client"

import { useMutation, useQueryClient } from "@tanstack/react-query"

import { WorkDetail } from "./use-work"

type CreateWorkInput = {
  imageUrl: string
  imageWidth: number
  imageHeight: number
  prompt: string
  platform?: string | null
  tags: string[]
}

type UpdateWorkInput = {
  imageUrl?: string
  imageWidth?: number
  imageHeight?: number
  prompt?: string
  platform?: string | null
  tags?: string[]
}

export function useCreateWork() {
  const queryClient = useQueryClient()
  return useMutation({
    mutationFn: async (data: CreateWorkInput) => {
      const res = await fetch("/api/works", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      })
      if (!res.ok) throw new Error("저장에 실패했습니다")
      return res.json() as Promise<{ id: string }>
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["works"] })
    },
  })
}

export function useUpdateWork(id: string) {
  const queryClient = useQueryClient()
  return useMutation({
    mutationFn: async (data: UpdateWorkInput) => {
      const res = await fetch(`/api/works/${id}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      })
      if (!res.ok) throw new Error("수정에 실패했습니다")
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["works"] })
      queryClient.invalidateQueries({ queryKey: ["works", id] })
    },
  })
}

export function useDeleteWork(id: string) {
  const queryClient = useQueryClient()
  return useMutation({
    mutationFn: async () => {
      const res = await fetch(`/api/works/${id}`, { method: "DELETE" })
      if (!res.ok) throw new Error("삭제에 실패했습니다")
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["works"] })
      queryClient.removeQueries({ queryKey: ["works", id] })
    },
  })
}

export function useToggleLike(id: string) {
  const queryClient = useQueryClient()
  return useMutation({
    mutationFn: async () => {
      const res = await fetch(`/api/works/${id}/like`, { method: "POST" })
      if (!res.ok) throw new Error("Failed to toggle like")
      return res.json() as Promise<{ liked: boolean; count: number }>
    },
    onMutate: async () => {
      await queryClient.cancelQueries({ queryKey: ["works", id] })
      const prev = queryClient.getQueryData<WorkDetail>(["works", id])
      if (prev) {
        queryClient.setQueryData<WorkDetail>(["works", id], {
          ...prev,
          isLiked: !prev.isLiked,
          likeCount: prev.isLiked ? prev.likeCount - 1 : prev.likeCount + 1,
        })
      }
      return { prev }
    },
    onError: (_err, _vars, ctx) => {
      if (ctx?.prev) {
        queryClient.setQueryData(["works", id], ctx.prev)
      }
    },
    onSettled: () => {
      queryClient.invalidateQueries({ queryKey: ["works", id] })
    },
  })
}
