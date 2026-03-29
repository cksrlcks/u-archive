import { PropsWithChildren } from "react"

export default function Body({ children }: PropsWithChildren) {
  return (
    <div className="w-full flex-1 p-4 pt-12 md:p-8 md:pl-60">{children}</div>
  )
}
