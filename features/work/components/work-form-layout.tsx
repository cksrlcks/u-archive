import NarrowInner from "@/components/layout/narrow-inner"

type Props = {
  title: string
  children: React.ReactNode
}

export function WorkFormLayout({ title, children }: Props) {
  return (
    <NarrowInner>
      <h1 className="mb-8 text-xl font-semibold">{title}</h1>
      {children}
    </NarrowInner>
  )
}
