import { headers } from "next/headers"
import { redirect } from "next/navigation"

import { auth } from "@/features/auth/lib/auth"
import { MyWorksGrid } from "@/features/work/components/my-work-grid"

export default async function Page() {
  const session = await auth.api.getSession({ headers: await headers() })

  if (!session?.user) {
    redirect("/explore")
  }

  return <MyWorksGrid />
}
