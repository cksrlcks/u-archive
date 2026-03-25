export const PLATFORMS = [
  { value: "midjourney", label: "Midjourney" },
  { value: "nanobanana", label: "Nanobanana" },
  { value: "stable-diffusion", label: "Stable Diffusion" },
  { value: "comfyui", label: "ComfyUI" },
  { value: "other", label: "Other" },
] as const

export type Platform = (typeof PLATFORMS)[number]["value"]

export function getPlatformLabel(value: string | null | undefined) {
  return PLATFORMS.find((p) => p.value === value)?.label ?? null
}
