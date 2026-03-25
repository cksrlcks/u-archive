import { useState } from "react"

export function useTags(initial: string[] = []) {
  const [tags, setTags] = useState<string[]>(initial)
  const [tagInput, setTagInput] = useState("")

  function addTag() {
    const trimmed = tagInput.trim().replace(/,$/, "")
    if (trimmed && !tags.includes(trimmed)) {
      setTags((prev) => [...prev, trimmed])
    }
    setTagInput("")
  }

  function removeTag(tag: string) {
    setTags((prev) => prev.filter((t) => t !== tag))
  }

  function handleTagKeyDown(e: React.KeyboardEvent<HTMLInputElement>) {
    if (e.key === "Enter" || e.key === ",") {
      e.preventDefault()
      addTag()
    }
  }

  return { tags, tagInput, setTagInput, addTag, removeTag, handleTagKeyDown }
}
