'use client'

import Link from 'next/link'
import { CalendarClock, CheckCircle2, Circle, Clock } from 'lucide-react'
import { usePortal, deriveMilestones } from '@/lib/portal-store'
import { PortalPageHeader } from '@/components/portal/page-header'
import { EmptyState, PortalCard, StatusBadge } from '@/components/portal/portal-ui'

export default function TimelinePage() {
  const { state, hydrated } = usePortal()
  const activeProject =
    state.projects.find((p) => p.status === 'in-progress') ?? state.projects[0]
  const milestones = activeProject ? deriveMilestones(activeProject) : []

  const summary = [
    { label: 'Completed', value: milestones.filter((m) => m.status === 'completed').length },
    { label: 'In progress', value: milestones.filter((m) => m.status === 'in-progress').length },
    { label: 'Pending', value: milestones.filter((m) => m.status === 'pending').length },
  ]

  return (
    <>
      <PortalPageHeader
        title="Timeline"
        description="Track every milestone from discovery through launch."
      />

      {hydrated && !activeProject ? (
        <EmptyState
          icon={CalendarClock}
          title="No timeline yet"
          description="Your project timeline appears here once you start a website project with us."
          action={
            <Link
              href="/start"
              className="inline-flex items-center gap-2 rounded-full bg-primary px-5 py-2.5 text-sm font-medium text-primary-foreground transition-opacity hover:opacity-90"
            >
              Start a project
            </Link>
          }
        />
      ) : activeProject ? (
        <>
          <div className="mb-6 grid grid-cols-3 gap-4">
            {summary.map((s) => (
              <div key={s.label} className="rounded-2xl border border-border bg-card p-5 text-center">
                <p className="font-display text-2xl font-semibold text-foreground">{s.value}</p>
                <p className="mt-1 text-xs text-muted-foreground sm:text-sm">{s.label}</p>
              </div>
            ))}
          </div>

          <PortalCard title={activeProject.name}>
            <ol className="relative space-y-8 before:absolute before:left-[15px] before:top-2 before:h-[calc(100%-1rem)] before:w-px before:bg-border">
              {milestones.map((m) => (
                <li key={m.title} className="relative flex gap-5">
                  <span className="relative z-10 mt-0.5 flex size-8 shrink-0 items-center justify-center rounded-full border border-border bg-card">
                    {m.status === 'completed' ? (
                      <CheckCircle2 className="size-5 text-[oklch(0.8_0.15_155)]" />
                    ) : m.status === 'in-progress' ? (
                      <Clock className="size-5 text-primary" />
                    ) : (
                      <Circle className="size-5 text-muted-foreground" />
                    )}
                  </span>
                  <div className="flex-1">
                    <div className="flex flex-wrap items-center justify-between gap-2">
                      <h3 className="font-medium text-foreground">{m.title}</h3>
                      <StatusBadge status={m.status} />
                    </div>
                    <p className="mt-1.5 text-sm text-muted-foreground">{m.description}</p>
                  </div>
                </li>
              ))}
            </ol>
          </PortalCard>
        </>
      ) : (
        <div className="h-40" aria-hidden />
      )}
    </>
  )
}
