import { PropsWithChildren } from "react"

import { cn } from "@/lib/utils"

export default function Nav({
  children,
  className,
}: PropsWithChildren<{ className?: string }>) {
  return (
    <nav
      className={cn(
        "fixed top-0 left-0 z-100 flex h-12 w-full items-center justify-between gap-2 bg-white px-4 md:h-full md:w-60 md:flex-col md:items-start md:justify-start md:gap-0 md:p-6",
        className
      )}
    >
      {children}
    </nav>
  )
}
