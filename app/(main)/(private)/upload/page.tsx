import { headers } from "next/headers"

import NotApproved from "@/features/auth/components/not-approved"
import { auth } from "@/features/auth/lib/auth"
import { UploadForm } from "@/features/work/components/upload-form"
import { WorkFormLayout } from "@/features/work/components/work-form-layout"

export default async function Page() {
  const session = await auth.api.getSession({ headers: await headers() })

  if (!session?.user || !session.user.approved) {
    return <NotApproved />
  }

  return (
    <WorkFormLayout title="업로드">
      <UploadForm />
    </WorkFormLayout>
  )
}
