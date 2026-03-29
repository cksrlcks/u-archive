type PageHeaderProps = {
  title: string
  description?: string
  actions?: React.ReactNode
}

export default function PageHeader({
  title,
  description,
  actions,
}: PageHeaderProps) {
  return (
    <div className="my-3 flex items-start justify-between md:mt-0 md:mb-6">
      <div>
        <h1 className="text-lg font-bold md:text-xl">{title}</h1>
        {description && (
          <p className="mt-1 text-sm text-muted-foreground">{description}</p>
        )}
      </div>
      {actions && <div>{actions}</div>}
    </div>
  )
}
