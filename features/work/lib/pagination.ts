export function getPageRange(
  current: number,
  total: number
): (number | "ellipsis")[] {
  if (total <= 7) return Array.from({ length: total }, (_, i) => i + 1)

  const pages: (number | "ellipsis")[] = []

  if (current <= 4) {
    pages.push(1, 2, 3, 4, 5, "ellipsis", total)
  } else if (current >= total - 3) {
    pages.push(1, "ellipsis", total - 4, total - 3, total - 2, total - 1, total)
  } else {
    pages.push(
      1,
      "ellipsis",
      current - 1,
      current,
      current + 1,
      "ellipsis",
      total
    )
  }

  return pages
}
