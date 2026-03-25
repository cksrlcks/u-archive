"use client"

import Link from "next/link"
import { useRouter } from "next/navigation"

import { Button } from "@/components/ui/button"
import { useSession } from "@/features/auth/lib/auth-client"
import { useDeleteWork } from "@/features/work/query/use-work-mutations"

type Props = {
  workId: string
  workOwnerId: string
}

export function WorkActions({ workId, workOwnerId }: Props) {
  const { data: session } = useSession()
  const router = useRouter()
  const deleteWork = useDeleteWork(workId)

  if (session?.user?.id !== workOwnerId) return null

  async function handleDelete() {
    if (!confirm("정말 삭제하시겠습니까?")) return

    try {
      await deleteWork.mutateAsync()
      router.push("/")
    } catch {
      alert("삭제에 실패했습니다")
    }
  }

  return (
    <>
      <Button asChild variant="secondary">
        <Link
          href={`/works/${workId}/edit`}
          className="rounded-md bg-secondary px-3 py-1.5 text-xs font-medium transition-colors hover:bg-secondary/80"
        >
          수정
        </Link>
      </Button>
      <Button
        variant="destructive"
        onClick={handleDelete}
        disabled={deleteWork.isPending}
      >
        {deleteWork.isPending ? "삭제 중..." : "삭제"}
      </Button>
    </>
  )
}
