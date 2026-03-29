import { Compass, MessageCircle, Upload } from "lucide-react"

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

export function isNavItemActive(item: NavItem, pathname: string): boolean {
  return (
    pathname === item.href ||
    pathname.startsWith(item.href + "/") ||
    (item.additionalMatchPaths?.some((path) => pathname.startsWith(path)) ??
      false)
  )
}
