import { S3Client } from "@aws-sdk/client-s3"

export const r2 = new S3Client({
  region: "auto",
  endpoint: `https://${process.env.R2_ACCOUNT_ID!}.r2.cloudflarestorage.com`,
  credentials: {
    accessKeyId: process.env.R2_ACCESS_KEY_ID!,
    secretAccessKey: process.env.R2_SECRET_ACCESS_KEY!,
  },
})

export const R2_BUCKET = process.env.R2_BUCKET_NAME!
export const R2_PUBLIC_URL = process.env.R2_PUBLIC_URL!

export function getImageUrl(key: string, options?: string) {
  const origin = process.env.NEXT_PUBLIC_SITE_URL
  const rawUrl = `${R2_PUBLIC_URL}/${key}`
  if (!options) return rawUrl
  return `${origin}/cdn-cgi/image/${options}/${rawUrl}`
}
