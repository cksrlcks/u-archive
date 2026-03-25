import React from "react"
import Image from "next/image"
import Link from "next/link"

export default function Logo() {
  return (
    <Link href="/" className="flex w-30">
      <Image
        src="/logo.svg"
        alt="u-archive"
        width={176}
        height={50}
        className="h-auto w-full"
      />
    </Link>
  )
}
