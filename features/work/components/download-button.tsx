"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover"
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { ChevronDown } from "lucide-react"

type Props = {
  imageUrl: string
  imageWidth: number
}

type Format = "original" | "webp" | "jpg" | "png"
type Scale = "1" | "0.8" | "0.5"

async function downloadImage(
  imageUrl: string,
  imageWidth: number,
  format: Format,
  scale: Scale
) {
  const width = Math.round(imageWidth * Number(scale))
  const cdnFormat = format === "original" ? undefined : format

  const params = new URLSearchParams({ imageUrl, width: String(width) })
  if (cdnFormat) params.set("format", cdnFormat)

  const res = await fetch(`https://download.u-archive.com?${params}`)
  if (!res.ok) throw new Error("다운로드 실패")
  const blob = await res.blob()
  const objectUrl = URL.createObjectURL(blob)

  const baseName = (imageUrl.split("/").pop() ?? "image").replace(
    /\.[^.]+$/,
    ""
  )
  const ext =
    format === "original" ? (imageUrl.split(".").pop() ?? "png") : format

  const a = document.createElement("a")
  a.href = objectUrl
  a.download = `${baseName}.${ext}`
  a.click()
  URL.revokeObjectURL(objectUrl)
}

export function DownloadButton({ imageUrl, imageWidth }: Props) {
  const [format, setFormat] = useState<Format>("original")
  const [scale, setScale] = useState<Scale>("1")

  return (
    <div className="flex items-center">
      <Button
        size="lg"
        className="w-30 rounded-r-none"
        onClick={() => downloadImage(imageUrl, imageWidth, "original", "1")}
      >
        원본 다운로드
      </Button>
      <Popover>
        <PopoverTrigger asChild>
          <Button size="lg" className="rounded-l-none border-l-0 px-2">
            <ChevronDown className="h-4 w-4" />
          </Button>
        </PopoverTrigger>
        <PopoverContent align="end" className="w-60">
          <div className="space-y-4 px-1 py-2">
            <div className="space-y-1.5">
              <p className="text-xs text-muted-foreground">사이즈</p>
              <Tabs value={scale} onValueChange={(v) => setScale(v as Scale)}>
                <TabsList className="w-full">
                  <TabsTrigger value="1">원본</TabsTrigger>
                  <TabsTrigger value="0.8">80%</TabsTrigger>
                  <TabsTrigger value="0.5">50%</TabsTrigger>
                </TabsList>
              </Tabs>
            </div>
            <div className="space-y-1.5">
              <p className="text-xs text-muted-foreground">포맷</p>
              <Tabs
                value={format}
                onValueChange={(v) => setFormat(v as Format)}
              >
                <TabsList className="w-full">
                  <TabsTrigger value="original">원본</TabsTrigger>
                  <TabsTrigger value="webp">WebP</TabsTrigger>
                  <TabsTrigger value="jpg">JPG</TabsTrigger>
                  <TabsTrigger value="png">PNG</TabsTrigger>
                </TabsList>
              </Tabs>
            </div>
          </div>
          <Button
            className="w-full"
            onClick={() => downloadImage(imageUrl, imageWidth, format, scale)}
          >
            다운로드
          </Button>
        </PopoverContent>
      </Popover>
    </div>
  )
}
