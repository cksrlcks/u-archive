import React, { PropsWithChildren } from "react"

import Logo from "@/components/layout/logo"

export default function Layout({ children }: PropsWithChildren) {
  return (
    <div className="mx-auto w-full max-w-sm space-y-6">
      <Logo />
      <div>{children}</div>
    </div>
  )
}
