"use client"

import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query"

type User = {
  id: string
  name: string
  email: string
  role: string
  approved: boolean
  createdAt: string
}

async function fetchUsers(): Promise<User[]> {
  const res = await fetch("/api/admin/users")
  return res.json()
}

async function patchApproved(id: string, approved: boolean) {
  await fetch(`/api/admin/users/${id}`, {
    method: "PATCH",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ approved }),
  })
}

const QUERY_KEY = ["admin", "users"] as const

export function useUsers() {
  return useQuery({
    queryKey: QUERY_KEY,
    queryFn: fetchUsers,
  })
}

export function useUpdateUserApproved() {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: ({ id, approved }: { id: string; approved: boolean }) =>
      patchApproved(id, approved),
    onMutate: async ({ id, approved }) => {
      await queryClient.cancelQueries({ queryKey: QUERY_KEY })
      const prev = queryClient.getQueryData<User[]>(QUERY_KEY)
      queryClient.setQueryData<User[]>(QUERY_KEY, (old = []) =>
        old.map((u) => (u.id === id ? { ...u, approved } : u))
      )
      return { prev }
    },
    onError: (_err, _vars, ctx) => {
      queryClient.setQueryData(QUERY_KEY, ctx?.prev)
    },
  })
}
