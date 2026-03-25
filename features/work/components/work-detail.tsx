"use client"

import { useState } from "react"
import Image from "next/image"
import { notFound } from "next/navigation"
import { Check, Copy, RulerDimensionLine } from "lucide-react"

import { Badge } from "@/components/ui/badge"
import { Separator } from "@/components/ui/separator"
import { DownloadButton } from "@/features/work/components/download-button"
import { LikeButton } from "@/features/work/components/like-button"
import { WorkActions } from "@/features/work/components/work-actions"
import { WorkDetailSkeleton } from "@/features/work/components/work-detail-skeleton"
import { getPlatformLabel } from "@/features/work/lib/platforms"
import { useWork } from "@/features/work/query/use-work"
import { cdnUrl } from "@/lib/image"

type WorkDetailProps = {
  id: string
}

export function WorkDetail({ id }: WorkDetailProps) {
  const { data: work, isLoading, isError } = useWork(id)
  const [copied, setCopied] = useState(false)

  const handleCopy = () => {
    if (!work?.prompt) return
    navigator.clipboard.writeText(work.prompt)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  if (isLoading && !work) {
    return <WorkDetailSkeleton />
  }

  if (isError) notFound()
  if (!work) notFound()

  return (
    <div className="grid h-[90vh] grid-cols-2">
      <div className="relative h-full overflow-hidden rounded-xl bg-muted">
        <Image
          src={cdnUrl(work.imageUrl, { width: 700, quality: 100, format: "webp" })}
          alt=""
          className="h-full w-full object-contain"
          fill
          unoptimized
        />
      </div>
      <div className="space-y-4 px-10 py-4">
        <div className="flex items-center justify-between">
          <Badge className="bg-black">
            {work.platform ? getPlatformLabel(work.platform) : "-"}
          </Badge>

          <div className="flex items-center gap-3">
            <span className="flex items-center gap-2 text-xs text-muted-foreground">
              <RulerDimensionLine size={16} />
              {work.imageWidth} × {work.imageHeight}
            </span>
            <Separator orientation="vertical" />
            <span className="flex items-center gap-2 text-xs font-semibold">
              {work.author?.name ?? "알 수 없음"}
            </span>
          </div>
        </div>
        <div className="rounded-lg bg-muted/50 p-5">
          <div className="mb-1.5 flex items-center justify-between">
            <p className="text-xs font-medium text-muted-foreground">
              프롬프트
            </p>
            <button
              onClick={handleCopy}
              className="flex cursor-pointer items-center gap-1 rounded px-1.5 py-0.5 text-xs text-muted-foreground transition-colors hover:bg-muted hover:text-foreground"
            >
              {copied ? <Check size={13} /> : <Copy size={13} />}
              {copied ? "복사됨" : "복사"}
            </button>
          </div>
          <p className="text-sm leading-relaxed whitespace-pre-wrap">
            {work.prompt}
          </p>
        </div>
        <div className="flex items-center justify-between gap-4">
          <LikeButton
            workId={id}
            isLiked={work.isLiked}
            likeCount={work.likeCount}
          />
          <div className="flex items-center gap-1">
            <WorkActions workId={id} workOwnerId={work.userId ?? ""} />
            <DownloadButton imageUrl={`https://${work.imageUrl}`} imageWidth={work.imageWidth} />
          </div>
        </div>
        <div className="mt-6 flex flex-col gap-4">
          {work.tags.length > 0 && (
            <div className="flex flex-wrap gap-1.5">
              {work.tags.map((tag) => (
                <span
                  key={tag}
                  className="rounded-full bg-secondary px-2.5 py-0.5 text-xs font-medium"
                >
                  {tag}
                </span>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
