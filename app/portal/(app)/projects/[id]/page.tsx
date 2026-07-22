'use client'

import Link from 'next/link'
import { useParams } from 'next/navigation'
import { ArrowLeft, CheckCircle2, Circle, Clock, FileText, FolderKanban } from 'lucide-react'
import { usePortal, deriveMilestones } from '@/lib/portal-store'
import { PortalPageHeader } from '@/components/portal/page-header'
import {
  EmptyState,
  PortalCard,
  ProgressBar,
  StatusBadge,
} from '@/components/portal/portal-ui'

function formatDate(iso: string) {
  return new Date(iso).toLocaleDateString('en-US', {
    month: 'short',
    day: 'numeric',
    year: 'numeric',
  })
}

export default function ProjectDetailsPage() {
  const params = useParams<{ id: string }>()
  const { state, hydrated } = usePortal()
  const project = state.projects.find((p) => p.id === params.id)
  const submission = state.submissions.find((s) => s.projectId === params.id)

  if (hydrated && !project) {
    return (
      <>
        <Link
          href="/portal/projects"
          className="mb-4 inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-primary"
        >
          <ArrowLeft className="size-4" />
          Back to projects
        </Link>
        <EmptyState
          icon={FolderKanban}
          title="Project not found"
          description="This project no longer exists or hasn't been created yet."
          action={
            <Link
              href="/start"
              className="inline-flex items-center gap-2 rounded-full bg-primary px-5 py-2.5 text-sm font-medium text-primary-foreground transition-opacity hover:opacity-90"
            >
              Start a project
            </Link>
          }
        />
      </>
    )
  }

  if (!project) {
    return <div className="h-40" aria-hidden />
  }

  const milestones = deriveMilestones(project)
  const submittedFiles = submission
    ? Object.values(submission.fileNames).flat()
    : []

  return (
    <>
      <Link
        href="/portal/projects"
        className="mb-4 inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-primary"
      >
        <ArrowLeft className="size-4" />
        Back to projects
      </Link>

      <PortalPageHeader
        title={project.name}
        description={project.description}
        action={<StatusBadge status={project.status} />}
      />

      <div className="grid gap-6 lg:grid-cols-3">
        <div className="space-y-6 lg:col-span-2">
          <PortalCard title="Progress overview">
            <ProgressBar value={project.progress} label="Overall completion" />
            <div className="mt-6 grid grid-cols-3 gap-4 text-center">
              <div className="rounded-xl border border-border bg-background/50 p-4">
                <p className="font-display text-xl font-semibold text-foreground">
                  {milestones.filter((m) => m.status === 'completed').length}
                </p>
                <p className="text-xs text-muted-foreground">Completed</p>
              </div>
              <div className="rounded-xl border border-border bg-background/50 p-4">
                <p className="font-display text-xl font-semibold text-foreground">
                  {milestones.filter((m) => m.status === 'in-progress').length}
                </p>
                <p className="text-xs text-muted-foreground">In progress</p>
              </div>
              <div className="rounded-xl border border-border bg-background/50 p-4">
                <p className="font-display text-xl font-semibold text-foreground">
                  {milestones.filter((m) => m.status === 'pending').length}
                </p>
                <p className="text-xs text-muted-foreground">Pending</p>
              </div>
            </div>
          </PortalCard>

          <PortalCard title="Milestones">
            <ol className="relative space-y-6 before:absolute before:left-[11px] before:top-2 before:h-[calc(100%-1rem)] before:w-px before:bg-border">
              {milestones.map((m) => (
                <li key={m.title} className="relative flex gap-4 pl-0">
                  <span className="relative z-10 mt-0.5 flex size-6 shrink-0 items-center justify-center rounded-full bg-card">
                    {m.status === 'completed' ? (
                      <CheckCircle2 className="size-5 text-[oklch(0.8_0.15_155)]" />
                    ) : m.status === 'in-progress' ? (
                      <Clock className="size-5 text-primary" />
                    ) : (
                      <Circle className="size-5 text-muted-foreground" />
                    )}
                  </span>
                  <div className="flex-1 pb-1">
                    <div className="flex flex-wrap items-center justify-between gap-2">
                      <h3 className="text-sm font-medium text-foreground">{m.title}</h3>
                      <StatusBadge status={m.status} />
                    </div>
                    <p className="mt-1 text-sm text-muted-foreground">{m.description}</p>
                  </div>
                </li>
              ))}
            </ol>
          </PortalCard>
        </div>

        <div className="space-y-6">
          <PortalCard title="Details">
            <dl className="space-y-4 text-sm">
              <div className="flex justify-between">
                <dt className="text-muted-foreground">Current phase</dt>
                <dd className="font-medium text-foreground">{project.phase}</dd>
              </div>
              <div className="flex justify-between">
                <dt className="text-muted-foreground">Started</dt>
                <dd className="font-medium text-foreground">{formatDate(project.createdAt)}</dd>
              </div>
              <div className="flex justify-between">
                <dt className="text-muted-foreground">Status</dt>
                <dd><StatusBadge status={project.status} /></dd>
              </div>
            </dl>
          </PortalCard>

          <PortalCard title="Submitted files">
            {submittedFiles.length > 0 ? (
              <ul className="space-y-3">
                {submittedFiles.map((name) => (
                  <li key={name} className="flex items-center gap-3">
                    <span className="flex size-9 shrink-0 items-center justify-center rounded-lg bg-primary/10 text-primary">
                      <FileText className="size-4" />
                    </span>
                    <p className="min-w-0 truncate text-sm font-medium text-foreground">{name}</p>
                  </li>
                ))}
              </ul>
            ) : (
              <p className="py-2 text-sm text-muted-foreground">
                No files were attached to this questionnaire.
              </p>
            )}
          </PortalCard>
        </div>
      </div>
    </>
  )
}
