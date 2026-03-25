import "./globals.css"

import { NuqsAdapter } from "nuqs/adapters/next/app"

import QueryProvider from "@/components/providers/query-provider"

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="ko" suppressHydrationWarning className="font-sans antialiased">
      <body>
        <NuqsAdapter>
          <QueryProvider>{children}</QueryProvider>
        </NuqsAdapter>
      </body>
    </html>
  )
}
