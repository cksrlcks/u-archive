import { WorkDetail } from "@/features/work/components/work-detail"

type Props = {
  params: Promise<{ id: string }>
}

export default async function Page({ params }: Props) {
  const { id } = await params
  return <WorkDetail id={id} />
}
