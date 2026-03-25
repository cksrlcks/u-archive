import { PropsWithChildren } from "react"

import { cn } from "@/lib/utils"

export function Nav({
  children,
  className,
}: PropsWithChildren<{ className?: string }>) {
  return (
    <nav
      className={cn(
        "fixed top-0 left-0 flex h-full w-60 flex-col p-6",
        className
      )}
    >
      {children}
    </nav>
  )
}

export function NavHeader({
  children,
  className,
}: PropsWithChildren<{ className?: string }>) {
  return <div className={cn("mb-auto", className)}>{children}</div>
}

export function NavFooter({
  children,
  className,
}: PropsWithChildren<{ className?: string }>) {
  return <div className={cn("mt-auto", className)}>{children}</div>
}
