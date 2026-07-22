import type { ReactNode } from 'react'
import { cn } from '@/lib/utils'
import type { Status } from '@/lib/portal'

const statusStyles: Record<Status, string> = {
  completed: 'bg-[oklch(0.72_0.15_155/0.15)] text-[oklch(0.8_0.15_155)] border-[oklch(0.72_0.15_155/0.3)]',
  paid: 'bg-[oklch(0.72_0.15_155/0.15)] text-[oklch(0.8_0.15_155)] border-[oklch(0.72_0.15_155/0.3)]',
  'in-progress': 'bg-[oklch(0.78_0.13_85/0.15)] text-[oklch(0.85_0.13_85)] border-[oklch(0.78_0.13_85/0.3)]',
  review: 'bg-[oklch(0.78_0.13_85/0.15)] text-[oklch(0.85_0.13_85)] border-[oklch(0.78_0.13_85/0.3)]',
  pending: 'bg-muted text-muted-foreground border-border',
  overdue: 'bg-[oklch(0.6_0.2_25/0.15)] text-[oklch(0.72_0.2_25)] border-[oklch(0.6_0.2_25/0.35)]',
}

const statusLabels: Record<Status, string> = {
  completed: 'Completed',
  paid: 'Paid',
  'in-progress': 'In Progress',
  review: 'In Review',
  pending: 'Pending',
  overdue: 'Overdue',
}

export function StatusBadge({ status, className }: { status: Status; className?: string }) {
  return (
    <span
      className={cn(
        'inline-flex items-center gap-1.5 rounded-full border px-2.5 py-1 text-xs font-medium capitalize',
        statusStyles[status],
        className,
      )}
    >
      <span className="size-1.5 rounded-full bg-current" aria-hidden />
      {statusLabels[status]}
    </span>
  )
}

export function ProgressBar({
  value,
  label,
  showValue = true,
}: {
  value: number
  label?: string
  showValue?: boolean
}) {
  return (
    <div className="w-full">
      {(label || showValue) && (
        <div className="mb-2 flex items-center justify-between text-sm">
          {label ? <span className="text-muted-foreground">{label}</span> : <span />}
          {showValue && <span className="font-semibold text-foreground">{value}%</span>}
        </div>
      )}
      <div
        className="h-2 w-full overflow-hidden rounded-full bg-muted"
        role="progressbar"
        aria-valuenow={value}
        aria-valuemin={0}
        aria-valuemax={100}
        aria-label={label ?? 'Progress'}
      >
        <div
          className="h-full rounded-full bg-gradient-to-r from-[oklch(0.7_0.13_85)] to-primary transition-all duration-700"
          style={{ width: `${value}%` }}
        />
      </div>
    </div>
  )
}

export function PortalCard({
  children,
  className,
  title,
  action,
}: {
  children: ReactNode
  className?: string
  title?: string
  action?: ReactNode
}) {
  return (
    <section
      className={cn(
        'rounded-2xl border border-border bg-card p-5 shadow-[0_1px_0_oklch(1_0_0/0.03)_inset] sm:p-6',
        className,
      )}
    >
      {(title || action) && (
        <header className="mb-5 flex items-center justify-between gap-4">
          {title && <h2 className="text-base font-semibold text-foreground">{title}</h2>}
          {action}
        </header>
      )}
      {children}
    </section>
  )
}

export function StatTile({
  label,
  value,
  hint,
  icon: Icon,
}: {
  label: string
  value: string
  hint?: string
  icon: React.ComponentType<{ className?: string }>
}) {
  return (
    <div className="rounded-2xl border border-border bg-card p-5">
      <div className="flex items-center justify-between">
        <span className="text-sm text-muted-foreground">{label}</span>
        <span className="flex size-9 items-center justify-center rounded-lg bg-primary/10 text-primary">
          <Icon className="size-4" />
        </span>
      </div>
      <p className="mt-3 font-serif text-2xl font-semibold text-foreground">{value}</p>
      {hint && <p className="mt-1 text-xs text-muted-foreground">{hint}</p>}
    </div>
  )
}

export function EmptyState({
  icon: Icon,
  title,
  description,
  action,
}: {
  icon: React.ComponentType<{ className?: string }>
  title: string
  description: string
  action?: ReactNode
}) {
  return (
    <div className="flex flex-col items-center justify-center rounded-2xl border border-dashed border-border bg-card/50 px-6 py-14 text-center">
      <span className="mb-4 flex size-12 items-center justify-center rounded-full bg-muted text-muted-foreground">
        <Icon className="size-6" />
      </span>
      <h3 className="text-base font-semibold text-foreground">{title}</h3>
      <p className="mt-1 max-w-sm text-sm text-muted-foreground">{description}</p>
      {action && <div className="mt-5">{action}</div>}
    </div>
  )
}
