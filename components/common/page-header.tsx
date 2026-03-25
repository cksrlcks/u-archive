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
    <div className="mb-6 flex items-start justify-between">
      <div>
        <h1 className="text-xl font-bold">{title}</h1>
        {description && (
          <p className="mt-1 text-sm text-muted-foreground">{description}</p>
        )}
      </div>
      {actions && <div>{actions}</div>}
    </div>
  )
}
