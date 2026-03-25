"use client"

import { useRef } from "react"
import { X } from "lucide-react"

import { Button } from "@/components/ui/button"

type WorkSearchInputProps = {
  defaultValue?: string
  onSearch: (value: string | null) => void
}

export function WorkSearchInput({
  defaultValue,
  onSearch,
}: WorkSearchInputProps) {
  const inputRef = useRef<HTMLInputElement>(null)

  return (
    <div className="border-light-100 bg-light-input relative flex h-12 shrink-0 items-center rounded-xl border bg-white shadow-[0px_7px_21px_0px_rgba(51,51,51,0.05)]">
      <input
        ref={inputRef}
        type="text"
        defaultValue={defaultValue}
        onKeyDown={(e) => {
          if (e.key === "Enter")
            onSearch(inputRef.current?.value.trim() || null)
        }}
        placeholder="검색어를 입력해주세요"
        className="h-full w-full rounded-xl px-4 text-sm"
      />
      {defaultValue && (
        <Button
          variant="ghost"
          size="icon"
          onClick={() => {
            if (inputRef.current) inputRef.current.value = ""
            onSearch(null)
          }}
          className="absolute right-2"
        >
          <X size={16} />
        </Button>
      )}
    </div>
  )
}
