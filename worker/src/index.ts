// eslint-disable-next-line import/no-anonymous-default-export
export default {
  async fetch(request: Request): Promise<Response> {
    const { searchParams } = new URL(request.url)

    const imageUrl = searchParams.get("imageUrl")
    const width = searchParams.get("width")
    const format = searchParams.get("format") as "webp" | "png" | "jpg" | null

    if (!imageUrl) {
      return new Response("imageUrl is required", { status: 400 })
    }

    const src = imageUrl.startsWith("https://")
      ? imageUrl
      : `https://${imageUrl}`

    const res = await fetch(src, {
      cf: {
        image: {
          ...(width ? { width: Number(width) } : {}),
          quality: 100,
          ...(format ? { format } : {}),
        },
      },
    } as RequestInit)

    if (!res.ok) {
      return new Response("Failed to fetch image", { status: res.status })
    }

    const contentType =
      res.headers.get("content-type") ?? "application/octet-stream"

    return new Response(res.body, {
      headers: {
        "Content-Type": contentType,
        "Access-Control-Allow-Origin": "*",
        "Content-Disposition": "attachment",
        "Cache-Control": "public, max-age=31536000",
      },
    })
  },
}