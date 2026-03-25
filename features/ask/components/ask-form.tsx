"use client"

import { useRef } from "react"

import { Button } from "@/components/ui/button"
import { Textarea } from "@/components/ui/textarea"
import { useCreateAsk } from "@/features/ask/query/use-ask-mutations"

export function AskForm() {
  const ref = useRef<HTMLTextAreaElement>(null)
  const { mutate, isPending } = useCreateAsk()

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    const content = ref.current?.value.trim()
    if (!content) return

    mutate(content, {
      onSuccess: () => {
        if (ref.current) ref.current.value = ""
      },
    })
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-2">
      <Textarea
        ref={ref}
        placeholder="작업 요청 내용을 입력해주세요"
        className="min-h-24"
        disabled={isPending}
      />
      <div className="flex justify-end">
        <Button type="submit" disabled={isPending}>
          {isPending ? "등록 중..." : "등록"}
        </Button>
      </div>
    </form>
  )
}
