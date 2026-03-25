import React, { PropsWithChildren } from "react"

import Body from "@/components/layout/body"
import Gnb from "@/components/layout/gnb"
import Logo from "@/components/layout/logo"
import { Nav, NavFooter, NavHeader } from "@/components/layout/nav"
import RootLayout from "@/components/layout/root-layout"
import User from "@/components/layout/user"

export default function Layout({ children }: PropsWithChildren) {
  return (
    <RootLayout>
      <Nav>
        <NavHeader>
          <Logo />
          <Gnb />
        </NavHeader>
        <NavFooter>
          <User />
        </NavFooter>
      </Nav>
      <Body>{children}</Body>
    </RootLayout>
  )
}
