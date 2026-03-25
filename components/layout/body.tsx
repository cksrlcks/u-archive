import { PropsWithChildren } from "react"

export default function Body({ children }: PropsWithChildren) {
  return <div className="w-full flex-1 p-8 pl-60">{children}</div>
}
