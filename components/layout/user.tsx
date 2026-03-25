"use client"

import Link from "next/link"
import { useRouter } from "next/navigation"
import { LogInIcon } from "lucide-react"

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { signOut, useSession } from "@/features/auth/service"
import UserAvatar from "../common/user-avatar"

export default function User() {
  const { data: session } = useSession()
  const router = useRouter()

  if (session) {
    return (
      <div className="flex items-center gap-2">
        <DropdownMenu>
          <DropdownMenuTrigger className="flex w-full cursor-pointer items-center gap-3 rounded-md px-3 py-3 outline-none hover:bg-gray-100 data-[state=open]:bg-gray-100">
            <div className="space-y-1 text-left min-w-0">
              <div className="flex items-center gap-3">
                <UserAvatar
                  name={session.user.name}
                  email={session.user.email}
                />
                <div className="-space-y-0.5 min-w-0">
                  <div className="flex items-center gap-1 text-sm font-semibold">
                    {session.user.name}
                  </div>
                  <div className="text-[11px] text-muted-foreground truncate">
                    {session.user.email}
                  </div>
                </div>
              </div>
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
