'use client'

import Link from 'next/link'
import { ArrowRight, CalendarDays, FolderKanban } from 'lucide-react'
import { usePortal } from '@/lib/portal-store'
import { PortalPageHeader } from '@/components/portal/page-header'
import { EmptyState, ProgressBar, StatusBadge } from '@/components/portal/portal-ui'

function formatDate(iso: string) {
  return new Date(iso).toLocaleDateString('en-US', {
    month: 'short',
    day: 'numeric',
    year: 'numeric',
  })
}

export default function ProjectsPage() {
  const { state, hydrated } = usePortal()
  const { projects } = state

  return (
    <>
      <PortalPageHeader
        title="Projects"
        description="Every engagement you have with Forge Web Studio, in one place."
        action={
          <Link
            href="/start"
            className="inline-flex items-center gap-2 rounded-full bg-primary px-5 py-2.5 text-sm font-medium text-primary-foreground transition-opacity hover:opacity-90"
          >
            New project
          </Link>
        }
      />

      {hydrated && projects.length === 0 ? (
        <EmptyState
          icon={FolderKanban}
          title="No projects yet"
          description="Start your first website project by completing our project questionnaire. It only takes a few minutes."
          action={
            <Link
              href="/start"
              className="inline-flex items-center gap-2 rounded-full bg-primary px-5 py-2.5 text-sm font-medium text-primary-foreground transition-opacity hover:opacity-90"
            >
              Start New Website Project
            </Link>
          }
        />
      ) : (
        <div className="grid gap-5 md:grid-cols-2">
          {projects.map((project) => (
            <Link
              key={project.id}
              href={`/portal/projects/${project.id}`}
              className="group flex flex-col rounded-2xl border border-border bg-card p-6 transition-all hover:-translate-y-1 hover:border-primary/40 hover:shadow-xl hover:shadow-black/20"
            >
              <div className="mb-4 flex items-start justify-between gap-3">
                <h2 className="font-display text-lg font-semibold text-foreground">{project.name}</h2>
                <StatusBadge status={project.status} />
              </div>
              <p className="mb-6 flex-1 text-sm text-muted-foreground">{project.description}</p>
              <ProgressBar value={project.progress} label="Progress" />
              <div className="mt-5 flex items-center justify-between border-t border-border pt-4">
                <span className="inline-flex items-center gap-1.5 text-xs text-muted-foreground">
                  <CalendarDays className="size-3.5" />
                  {project.phase} · Started {formatDate(project.createdAt)}
                </span>
                <span className="inline-flex items-center gap-1 text-sm font-medium text-primary">
                  Open <ArrowRight className="size-4 transition-transform group-hover:translate-x-0.5" />
                </span>
              </div>
            </Link>
          ))}
        </div>
      )}
    </>
  )
}
