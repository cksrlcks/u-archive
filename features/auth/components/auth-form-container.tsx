import { cn } from "@/lib/utils"

interface AuthFormContainerProps {
  className?: string
  children: React.ReactNode
}

export function AuthFormContainer({
  className,
  children,
}: AuthFormContainerProps) {
  return (
    <div className={cn("w-full max-w-sm mx-auto", className)}>{children}</div>
  )
}
