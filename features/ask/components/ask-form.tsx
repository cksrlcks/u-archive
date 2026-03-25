"use client"

import { useRef } from "react"
import { AlertTriangleIcon, InfoIcon } from "lucide-react"
import { toast } from "sonner"

import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import { Button } from "@/components/ui/button"
import { Textarea } from "@/components/ui/textarea"
import { useCreateAsk } from "@/features/ask/query/use-ask-mutations"
import { useSession } from "@/features/auth/service"

export function AskForm() {
  const ref = useRef<HTMLTextAreaElement>(null)
  const { mutate, isPending } = useCreateAsk()
  const { data: session } = useSession()
  const isApproved = !!session?.user

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault()

    if (!isApproved) {
      toast.error("작업 요청은 승인된 사용자만 등록할 수 있습니다.")
      return
    }

    const content = ref.current?.value.trim()
    if (!content) return

    mutate(content, {
      onSuccess: () => {
        if (ref.current) ref.current.value = ""
      },
    })
  }

  return (
    <div className="space-y-2">
      {!isApproved ? (
        <Alert className="border-amber-200 bg-amber-50 text-amber-900 dark:border-amber-900 dark:bg-amber-950 dark:text-amber-50">
          <AlertTriangleIcon />
          <AlertTitle>작업 요청은 회원가입후 작성해주세요.</AlertTitle>
          <AlertDescription></AlertDescription>
        </Alert>
      ) : (
        <Alert className="border-blue-200 bg-blue-50 text-blue-900 dark:border-blue-900 dark:bg-blue-950 dark:text-blue-50">
          <InfoIcon />
          <AlertTitle>
            원하시는 스타일의 이미지의 링크도 같이 남겨주시면 작업에 도움이
            됩니다. (스타일 레퍼런스로 이용가능)
          </AlertTitle>
          <AlertDescription></AlertDescription>
        </Alert>
      )}

      <form onSubmit={handleSubmit} className="space-y-2">
        <Textarea
          ref={ref}
          placeholder="작업 요청 내용을 입력해주세요"
          className="min-h-24 p-3 md:text-sm"
          disabled={isPending || !isApproved}
        />
        <div className="flex justify-end">
          <Button type="submit" size="lg" disabled={isPending || !isApproved}>
            {isPending ? "등록 중..." : "등록"}
          </Button>
        </div>
      </form>
    </div>
  )
}
