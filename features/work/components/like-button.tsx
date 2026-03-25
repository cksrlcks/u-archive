"use client"

import { Heart } from "lucide-react"

import { Button } from "@/components/ui/button"
import { useSession } from "@/features/auth/lib/auth-client"
import { useToggleLike } from "@/features/work/query/use-work-mutations"

type Props = {
  workId: string
  isLiked: boolean
  likeCount: number
}

export function LikeButton({ workId, isLiked, likeCount }: Props) {
  const { data: session } = useSession()
  const toggle = useToggleLike(workId)

  return (
    <Button
      onClick={() => toggle.mutate()}
      disabled={!session?.user || toggle.isPending}
      variant="ghost"
    >
      <Heart
        className={`h-3.5 w-3.5 transition-colors ${isLiked ? "fill-red-500 text-red-500" : "text-muted-foreground"}`}
      />
      <span className={isLiked ? "text-red-500" : "text-muted-foreground"}>
        {likeCount}
      </span>
    </Button>
  )
}
