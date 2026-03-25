"use client"

import { useRef } from "react"

import { Button } from "@/components/ui/button"
import { Textarea } from "@/components/ui/textarea"
import { useCreateAskComment } from "@/features/ask/query/use-ask-comment-mutations"

export function AskCommentForm({
  askId,
  onSuccess,
}: {
  askId: string
  onSuccess?: () => void
}) {
  const ref = useRef<HTMLTextAreaElement>(null)
  const { mutate, isPending } = useCreateAskComment(askId)

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    const content = ref.current?.value.trim()
    if (!content) return

    mutate(content, {
      onSuccess: () => {
        if (ref.current) ref.current.value = ""
        onSuccess?.()
      },
    })
  }

  return (
    <form onSubmit={handleSubmit} className="align-end flex flex-col gap-2">
      <Textarea
        ref={ref}
        placeholder="댓글을 입력해주세요"
        className=""
        disabled={isPending}
      />
      <Button
        type="submit"
        size="lg"
        disabled={isPending}
        className="shrink-0 self-end"
      >
        {isPending ? "..." : "등록"}
      </Button>
    </form>
  )
}
