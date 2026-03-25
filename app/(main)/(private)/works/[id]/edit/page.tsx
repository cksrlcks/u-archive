import { headers } from "next/headers"
import { redirect } from "next/navigation"

import { auth } from "@/features/auth/lib/auth"
import { WorkEdit } from "@/features/work/components/work-edit"

type Props = {
  params: Promise<{ id: string }>
}

export default async function Page({ params }: Props) {
  const { id } = await params

  const session = await auth.api.getSession({ headers: await headers() })

  if (!session?.user || !session.user.approved) {
    redirect("/explore")
  }

  return <WorkEdit id={id} />
}
