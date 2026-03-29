"use client"

import { useEffect, useState } from "react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { Menu } from "lucide-react"

import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet"
import { cn } from "@/lib/utils"
import { navItems } from "./gnb"

export default function MobileNav() {
  const pathname = usePathname()
  const [open, setOpen] = useState(false)

  useEffect(() => {
    const mq = window.matchMedia("(min-width: 768px)")
    const handler = (e: MediaQueryListEvent) => {
      if (e.matches) setOpen(false)
    }
    mq.addEventListener("change", handler)
    return () => mq.removeEventListener("change", handler)
  }, [])

  return (
    <div className="md:hidden">
      <Sheet open={open} onOpenChange={setOpen}>
        <SheetTrigger asChild>
          <button className="flex items-center justify-center rounded-md p-1.5 text-muted-foreground hover:bg-muted hover:text-foreground">
            <Menu className="size-4" />
          </button>
        </SheetTrigger>
        <SheetContent
          side="top"
          showCloseButton={false}
          className="top-12! z-101 px-4 py-3"
        >
          <SheetHeader hidden>
            <SheetTitle>메뉴</SheetTitle>
          </SheetHeader>
          <nav className="flex flex-col gap-1">
            {navItems.map(
              ({ href, label, icon: Icon, additionalMatchPaths }) => {
                const isActive =
                  pathname === href ||
                  pathname.startsWith(href + "/") ||
                  (additionalMatchPaths?.some((path) =>
                    pathname.startsWith(path)
                  ) ??
                    false)

                return (
                  <Link
                    key={href}
                    href={href}
                    onClick={() => setOpen(false)}
                    className={cn(
                      "flex items-center gap-3 rounded-full px-4 py-2.5 text-sm transition-colors",
                      isActive
                        ? "bg-primary/10 font-semibold text-primary"
                        : "text-muted-foreground hover:bg-muted hover:text-foreground"
                    )}
                  >
                    <Icon className="size-4 shrink-0" />
                    {label}
                  </Link>
                )
              }
            )}
          </nav>
        </SheetContent>
      </Sheet>
    </div>
  )
}
