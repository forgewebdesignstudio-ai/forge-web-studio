export function PortalPageHeader({
  title,
  description,
  action,
}: {
  title: string
  description?: string
  action?: React.ReactNode
}) {
  return (
    <div className="mb-6 flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
      <div>
        <h1 className="font-serif text-2xl font-semibold text-foreground sm:text-3xl">
          {title}
        </h1>
        {description && (
          <p className="mt-1.5 text-sm text-muted-foreground text-pretty">{description}</p>
        )}
      </div>
      {action && <div className="flex shrink-0 items-center gap-3">{action}</div>}
    </div>
  )
}
