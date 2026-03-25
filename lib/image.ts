export function cdnUrl(
  imageUrl: string,
  { width = 400, quality = 80, format }: { width?: number; quality?: number; format?: 'auto' | 'webp' | 'png' | 'jpg' } = {}
) {
  const src = imageUrl.startsWith("https://") ? imageUrl : `https://${imageUrl}`
  const params = [width && `width=${width}`, quality && `quality=${quality}`, format && `format=${format}`]
    .filter(Boolean)
    .join(",")
  return `https://u-archive.com/cdn-cgi/image/${params}/${src}`
}

export function getImageDimensions(
  file: File
): Promise<{ width: number; height: number }> {
  return new Promise((resolve, reject) => {
    const url = URL.createObjectURL(file)
    const img = new window.Image()
    img.onload = () => {
      resolve({ width: img.naturalWidth, height: img.naturalHeight })
      URL.revokeObjectURL(url)
    }
    img.onerror = reject
    img.src = url
  })
}
