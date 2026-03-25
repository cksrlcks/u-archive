import { PutBucketCorsCommand } from "@aws-sdk/client-s3"

import { r2, R2_BUCKET } from "@/lib/r2"

async function setR2Cors() {
  await r2.send(
    new PutBucketCorsCommand({
      Bucket: R2_BUCKET,
      CORSConfiguration: {
        CORSRules: [
          {
            AllowedOrigins: [
              "http://localhost:3000",
              process.env.NEXT_PUBLIC_APP_URL ?? "",
            ].filter(Boolean),
            AllowedMethods: ["PUT", "GET"],
            AllowedHeaders: ["Content-Type"],
            MaxAgeSeconds: 3600,
          },
        ],
      },
    })
  )
  console.log("R2 CORS 설정 완료")
}

setR2Cors().catch(console.error)
