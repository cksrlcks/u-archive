import { headers } from "next/headers"

import PageHeader from "@/components/common/page-header"
import NotApproved from "@/features/auth/components/not-approved"
import { auth } from "@/features/auth/lib/auth"
import { UploadForm } from "@/features/work/components/upload-form"
import NarrowInner from "@/components/layout/narrow-inner"

export default async function Page() {
  const session = await auth.api.getSession({ headers: await headers() })

  if (!session?.user || !session.user.approved) {
    return <NotApproved />
  }

  return (
    <NarrowInner>
      <PageHeader title="업로드" />
      <UploadForm />
    </NarrowInner>
  )
}
