import { useState } from "react"

import { getImageDimensions } from "@/lib/image"

export function useImageUpload() {
  const [file, setFile] = useState<File | null>(null)
  const [preview, setPreview] = useState<string | null>(null)
  const [fileError, setFileError] = useState<string | null>(null)

  function handleFileChange(e: React.ChangeEvent<HTMLInputElement>) {
    const selected = e.target.files?.[0]
    if (!selected) return

    if (!selected.type.startsWith("image/")) {
      setFileError("이미지 파일만 업로드 가능합니다")
      return
    }

    setFileError(null)
    setFile(selected)
    setPreview(URL.createObjectURL(selected))
  }

  async function uploadFile(): Promise<{
    imageUrl: string
    imageWidth: number
    imageHeight: number
  } | null> {
    if (!file) return null

    const presignRes = await fetch("/api/upload/presigned-url", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ contentType: file.type }),
    })
    if (!presignRes.ok) throw new Error("업로드 URL 발급에 실패했습니다")

    const { presignedUrl, key } = (await presignRes.json()) as {
      presignedUrl: string
      key: string
    }

    const uploadRes = await fetch(presignedUrl, {
      method: "PUT",
      headers: { "Content-Type": file.type },
      body: file,
    })
    if (!uploadRes.ok) throw new Error("이미지 업로드에 실패했습니다")

    const imageUrl = `${process.env.NEXT_PUBLIC_R2_PUBLIC_URL}/${key}`
    const { width: imageWidth, height: imageHeight } =
      await getImageDimensions(file)
    return { imageUrl, imageWidth, imageHeight }
  }

  return {
    file,
    preview,
    fileError,
    setFileError,
    handleFileChange,
    uploadFile,
  }
}
