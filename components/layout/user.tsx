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
      <div className="ml-auto flex items-center gap-2 md:mt-auto md:ml-0">
        <DropdownMenu>
          <DropdownMenuTrigger className="flex w-full cursor-pointer items-center gap-3 rounded-md outline-none md:px-3 md:py-3 md:hover:bg-gray-100 md:data-[state=open]:bg-gray-100">
            <div className="min-w-0 space-y-1 text-left">
              <div className="flex items-center gap-3">
                <UserAvatar
                  name={session.user.name}
                  email={session.user.email}
                />
                <div className="hidden min-w-0 -space-y-0.5 md:block">
                  <div className="flex items-center gap-1 text-sm font-semibold">
                    {session.user.name}
                  </div>
                  <div className="truncate text-[11px] text-muted-foreground">
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
