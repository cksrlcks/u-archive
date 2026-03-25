"use client"

import Link from "next/link"
import { useRouter } from "next/navigation"
import { LogInIcon } from "lucide-react"

import { Badge } from "@/components/ui/badge"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { signOut, useSession } from "@/features/auth/service"

export default function User() {
  const { data: session } = useSession()
  const router = useRouter()

  if (session) {
    return (
      <div className="flex items-center gap-2">
        <DropdownMenu>
          <DropdownMenuTrigger className="flex w-full cursor-pointer items-center gap-3 rounded-md px-4 py-3 outline-none hover:bg-gray-100 data-[state=open]:bg-gray-100">
            <div className="flex flex-col items-start">
              <span className="text-sm font-semibold">{session.user.name}</span>
              <span className="text-[11px] text-muted-foreground">
                {session.user.email}
              </span>
              {/* {!session.user.approved && (
                <Badge variant="secondary" className="ml-auto">
                  미승인
                </Badge>
              )} */}
            </div>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuItem asChild>
              <Link href="/my">마이페이지</Link>
            </DropdownMenuItem>
            <DropdownMenuItem
              onClick={() => signOut().then(() => router.push("/"))}
            >
              로그아웃
            </DropdownMenuItem>

            {session.user.role === "admin" && (
              <>
                <DropdownMenuItem asChild>
                  <Link href="/admin">관리자 페이지</Link>
                </DropdownMenuItem>
              </>
            )}
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    )
  }

  return (
    <Link
      href="/sign-in"
      className="flex items-center gap-3 rounded-md px-4 py-3 outline-none hover:bg-gray-100"
    >
      <LogInIcon className="size-4 text-muted-foreground" />
      <span className="text-sm font-medium">로그인</span>
    </Link>
  )
}
