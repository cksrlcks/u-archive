import { PropsWithChildren } from "react"

import { cn } from "@/lib/utils"

export default function NarrowInner({
  children,
  className,
}: PropsWithChildren<{ className?: string }>) {
  return (
    <div className={cn('py-10" mx-auto w-full max-w-2xl', className)}>
      {children}
    </div>
  )
}
