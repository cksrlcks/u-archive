import { PropsWithChildren } from "react"

export default function RootLayout({ children }: PropsWithChildren) {
  return <div className="flex min-h-screen w-full">{children}</div>
}
