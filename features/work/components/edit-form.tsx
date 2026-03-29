"use client"

import { useRef } from "react"
import Image from "next/image"
import { useRouter } from "next/navigation"
import { zodResolver } from "@hookform/resolvers/zod"
import { X } from "lucide-react"
import { Controller, useForm } from "react-hook-form"
import { z } from "zod"

import { Button } from "@/components/ui/button"
import {
  Field,
  FieldError,
  FieldGroup,
  FieldLabel,
} from "@/components/ui/field"
import { Input } from "@/components/ui/input"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { Textarea } from "@/components/ui/textarea"
import { PLATFORMS } from "@/features/work/lib/platforms"
import { useUpdateWork } from "@/features/work/query/use-work-mutations"
import { useImageUpload } from "@/hooks/use-image-upload"
import { useTags } from "@/hooks/use-tags"

const schema = z.object({
  prompt: z.string().min(1, "프롬프트를 입력하세요"),
  platform: z.string().nullable(),
})

type FormValues = z.infer<typeof schema>

type Props = {
  workId: string
  defaultValues: {
    prompt: string
    tags: string[]
    platform: string | null
    imageUrl: string
    imageWidth: number
    imageHeight: number
  }
}

export function EditForm({ workId, defaultValues }: Props) {
  const router = useRouter()
  const fileInputRef = useRef<HTMLInputElement>(null)

  const { file, preview, fileError, handleFileChange, uploadFile } =
    useImageUpload()
  const { tags, tagInput, setTagInput, addTag, removeTag, handleTagKeyDown } =
    useTags(defaultValues.tags)
  const updateWork = useUpdateWork(workId)

  const {
    register,
    control,
    handleSubmit,
    setError,
    formState: { errors, isSubmitting },
  } = useForm<FormValues>({
    resolver: zodResolver(schema),
    defaultValues: {
      prompt: defaultValues.prompt,
      platform: defaultValues.platform,
    },
  })

  async function onSubmit(data: FormValues) {
    try {
      const imageFields = file ? await uploadFile() : {}
      await updateWork.mutateAsync({
        prompt: data.prompt,
        platform: data.platform || null,
        tags,
        ...imageFields,
      })
    } catch (e) {
      setError("root", { message: (e as Error).message })
      return
    }

    router.push(`/works/${workId}`)
    router.refresh()
  }

  const displayImage = preview ?? defaultValues.imageUrl
  const displayWidth = file ? undefined : defaultValues.imageWidth
  const displayHeight = file ? undefined : defaultValues.imageHeight

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-6">
      {/* 이미지 */}
      <div className="flex flex-col gap-2">
        <span className="text-sm font-medium">이미지</span>
        <button
          type="button"
          onClick={() => fileInputRef.current?.click()}
          className="relative flex aspect-2/1 w-full cursor-pointer items-center justify-center overflow-hidden rounded-lg border border-dashed border-muted-foreground/40 bg-muted/30 transition hover:bg-muted/50"
        >
          <Image
            src={displayImage}
            alt="preview"
            width={displayWidth}
            height={displayHeight}
            className="absolute h-full w-full object-contain"
          />
          <div className="absolute inset-0 flex items-end justify-center bg-black/0 pb-3 opacity-0 transition hover:bg-black/20 hover:opacity-100">
            <span className="rounded-md bg-black/60 px-2.5 py-1 text-xs text-white">
              클릭하여 변경
            </span>
          </div>
        </button>
        <input
          ref={fileInputRef}
          type="file"
          accept="image/*"
          className="hidden"
          onChange={handleFileChange}
        />
        {fileError && <p className="text-xs text-destructive">{fileError}</p>}
      </div>

      <FieldGroup>
        <Field>
          <FieldLabel>플랫폼 / 모델</FieldLabel>
          <Controller
            name="platform"
            control={control}
            render={({ field }) => (
              <Select
                value={field.value ?? ""}
                onValueChange={(v) => field.onChange(v || null)}
              >
                <SelectTrigger>
                  <SelectValue placeholder="선택 안 함" />
                </SelectTrigger>
                <SelectContent>
                  {PLATFORMS.map((p) => (
                    <SelectItem key={p.value} value={p.value}>
                      {p.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            )}
          />
        </Field>

        <Field>
          <FieldLabel htmlFor="prompt">프롬프트</FieldLabel>
          <Textarea
            id="prompt"
            rows={5}
            aria-invalid={!!errors.prompt}
            {...register("prompt")}
          />
          <FieldError errors={errors.prompt ? [errors.prompt] : []} />
        </Field>

        <Field>
          <FieldLabel htmlFor="tag-input">태그</FieldLabel>
          {tags.length > 0 && (
            <div className="flex flex-wrap gap-1.5">
              {tags.map((tag) => (
                <span
                  key={tag}
                  className="flex items-center gap-1 rounded-full bg-secondary px-2.5 py-0.5 text-xs font-medium"
                >
                  {tag}
                  <button
                    type="button"
                    onClick={() => removeTag(tag)}
                    className="text-muted-foreground hover:text-foreground"
                  >
                    <X className="h-3 w-3" />
                  </button>
                </span>
              ))}
            </div>
          )}
          <Input
            id="tag-input"
            placeholder="태그 입력 후 Enter 또는 쉼표"
            value={tagInput}
            onChange={(e) => setTagInput(e.target.value)}
            onKeyDown={handleTagKeyDown}
            onBlur={addTag}
          />
        </Field>

        {errors.root && <FieldError>{errors.root.message}</FieldError>}
      </FieldGroup>

      <div className="flex gap-2">
        <Button type="button" variant="outline" onClick={() => router.back()}>
          취소
        </Button>
        <Button type="submit" disabled={isSubmitting}>
          {isSubmitting ? "저장 중..." : "저장"}
        </Button>
      </div>
    </form>
  )
}
