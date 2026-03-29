"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { Compass, MessageCircle, Upload } from "lucide-react"

import { cn } from "@/lib/utils"

export type NavItem = {
  href: string
  label: string
  icon: React.ComponentType<{ className?: string }>
  additionalMatchPaths?: string[]
}

export const navItems: NavItem[] = [
  {
    href: "/explore",
    label: "Explore",
    icon: Compass,
    additionalMatchPaths: ["/works"],
  },
  { href: "/upload", label: "Upload", icon: Upload },
  { href: "/ask", label: "Ask", icon: MessageCircle },
]

export default function Gnb() {
  const pathname = usePathname()

  return (
    <nav className="mt-6 hidden flex-col gap-1 md:flex md:w-full">
      {navItems.map(({ href, label, icon: Icon }) => {
        const isActive =
          pathname === href ||
          pathname.startsWith(href + "/") ||
          (navItems
            .find((item) => item.href === href)
            ?.additionalMatchPaths?.some((path) => pathname.startsWith(path)) ??
            false)

        return (
          <Link
            key={href}
            href={href}
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
      })}
    </nav>
  )
}
