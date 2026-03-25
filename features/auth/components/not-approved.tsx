type NotApprovedProps = {
  title?: string
  message?: string
}

export default function NotApproved({
  title = "접근 권한이 없습니다",
  message = "이 기능을 사용하려면 관리자의 승인이 필요합니다.\n승인 후 다시 시도해주세요.",
}: NotApprovedProps) {
  return (
    <div className="flex h-full flex-col items-center justify-center gap-3 text-center">
      <div className="text-4xl">🔒</div>
      <h1 className="text-lg font-semibold">{title}</h1>
      <p className="max-w-sm text-sm leading-tight tracking-tight whitespace-pre-wrap text-muted-foreground">
        {message}
      </p>
    </div>
  )
}
