"use client"

import { useEffect } from "react"
import { notFound, useRouter } from "next/navigation"

import { useSession } from "@/features/auth/lib/auth-client"
import { EditForm } from "@/features/work/components/edit-form"
import { useWork } from "@/features/work/query/use-work"

type Props = {
  id: string
}

export function WorkEdit({ id }: Props) {
  const router = useRouter()
  const { data: work, isLoading: workLoading, isError } = useWork(id)
  const { data: session, isPending: sessionPending } = useSession()

  useEffect(() => {
    if (workLoading || sessionPending) return
    if (!work) return
    if (!session?.user || session.user.id !== work.userId) {
      router.replace(`/works/${id}`)
    }
  }, [work, session, workLoading, sessionPending, id, router])

  if (workLoading || sessionPending) {
    return (
      <div className="flex flex-col gap-6">
        <div className="aspect-2/1 animate-pulse rounded-lg bg-muted" />
        <div className="h-32 animate-pulse rounded bg-muted" />
        <div className="h-10 animate-pulse rounded bg-muted" />
      </div>
    )
  }

  if (isError || !work) notFound()

  if (!session?.user || session.user.id !== work.userId) {
    return null
  }

  return (
    <EditForm
      workId={id}
      defaultValues={{
        prompt: work.prompt,
        tags: work.tags,
        platform: work.platform,
        imageUrl: `https://${work.imageUrl}`,
        imageWidth: work.imageWidth,
        imageHeight: work.imageHeight,
      }}
    />
  )
}
