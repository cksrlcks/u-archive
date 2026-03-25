"use client"

import { useState } from "react"
import { Check, Loader2, Pencil, Trash2, X } from "lucide-react"

import UserAvatar from "@/components/common/user-avatar"
import { Button } from "@/components/ui/button"
import { Textarea } from "@/components/ui/textarea"
import { AskCommentForm } from "@/features/ask/components/ask-comment-form"
import { useDeleteAskComment } from "@/features/ask/query/use-ask-comment-mutations"
import { useAskComments } from "@/features/ask/query/use-ask-comments"
import {
  useDeleteAsk,
  useUpdateAsk,
} from "@/features/ask/query/use-ask-mutations"
import type { Ask } from "@/features/ask/query/use-asks"
import { useSession } from "@/features/auth/service/use-session"

function formatDate(dateStr: string) {
  return new Date(dateStr).toLocaleDateString("ko-KR", {
    year: "numeric",
    month: "long",
    day: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  })
}

export function AskItem({
  ask,
  isApproved,
}: {
  ask: Ask
  isApproved: boolean
}) {
  const { data: session } = useSession()
  const [showCommentForm, setShowCommentForm] = useState(false)
  const { comments } = useAskComments(ask.id)
  const { mutate: deleteAsk } = useDeleteAsk()
  const { mutate: deleteComment } = useDeleteAskComment(ask.id)

  const isOwner = session?.user?.id === ask.userId
  const [isEditing, setIsEditing] = useState(false)
  const [editContent, setEditContent] = useState(ask.content)
  const { mutate: updateAsk, isPending: isUpdating } = useUpdateAsk()

  function handleEditSave() {
    if (!editContent.trim() || editContent === ask.content) {
      setIsEditing(false)
      return
    }
    updateAsk(
      { id: ask.id, content: editContent },
      { onSuccess: () => setIsEditing(false) }
    )
  }

  function handleEditCancel() {
    setEditContent(ask.content)
    setIsEditing(false)
  }

  return (
    <div className="space-y-3 rounded-lg border p-4">
      {/* 본문 */}
      <div className="flex items-start gap-3">
        <UserAvatar name={ask.authorName} />
        <div className="min-w-0 flex-1 space-y-1">
          <div className="flex items-center justify-between gap-2">
            <span className="text-sm font-medium">
              {ask.authorName ?? "알 수 없음"}
            </span>
            <div className="flex items-center gap-2">
              <span className="text-xs text-muted-foreground">
                {formatDate(ask.createdAt)}
              </span>
              {isOwner && !isEditing && (
                <div className="flex items-center">
                  <Button
                    variant="ghost"
                    size="icon-sm"
                    onClick={() => setIsEditing(true)}
                  >
                    <Pencil />
                  </Button>
                  <Button
                    variant="ghost"
                    size="icon-sm"
                    onClick={() => deleteAsk(ask.id)}
                  >
                    <Trash2 />
                  </Button>
                </div>
              )}
              {isEditing && (
                <div className="flex items-center">
                  <Button
                    variant="ghost"
                    size="icon-sm"
                    onClick={handleEditSave}
                    disabled={isUpdating}
                  >
                    {isUpdating ? (
                      <Loader2 className="animate-spin" />
                    ) : (
                      <Check />
                    )}
                  </Button>
                  <Button
                    variant="ghost"
                    size="icon-sm"
                    onClick={handleEditCancel}
                    disabled={isUpdating}
                  >
                    <X />
                  </Button>
                </div>
              )}
            </div>
          </div>
          {isEditing ? (
            <Textarea
              value={editContent}
              onChange={(e) => setEditContent(e.target.value)}
              className="min-h-20 md:text-sm"
              autoFocus
            />
          ) : (
            <p className="text-sm whitespace-pre-wrap">{ask.content}</p>
          )}
        </div>
      </div>

      {/* 댓글 */}
      <div className="space-y-3 pl-10">
        {comments.map((comment) => {
          const isCommentOwner = session?.user?.id === comment.userId
          return (
            <div key={comment.id} className="flex items-start gap-2">
              <UserAvatar name={comment.authorName} />
              <div className="min-w-0 flex-1 space-y-0.5">
                <div className="flex items-center justify-between gap-2">
                  <span className="text-xs font-medium">
                    {comment.authorName ?? "알 수 없음"}
                  </span>
                  <div className="flex items-center gap-1">
                    <span className="text-xs text-muted-foreground">
                      {formatDate(comment.createdAt)}
                    </span>
                    {isCommentOwner && (
                      <Button
                        variant="ghost"
                        size="icon-sm"
                        onClick={() => deleteComment(comment.id)}
                      >
                        <Trash2 />
                      </Button>
                    )}
                  </div>
                </div>
                <p className="text-xs whitespace-pre-wrap">{comment.content}</p>
              </div>
            </div>
          )
        })}

        {isApproved && (
          <>
            {showCommentForm ? (
              <AskCommentForm
                askId={ask.id}
                onSuccess={() => setShowCommentForm(false)}
              />
            ) : (
              <button
                onClick={() => setShowCommentForm(true)}
                className="text-xs text-muted-foreground hover:text-foreground"
              >
                댓글달기
              </button>
            )}
          </>
        )}
      </div>
    </div>
  )
}
