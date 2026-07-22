'use client'

import Link from 'next/link'
import {
  ArrowRight,
  ClipboardList,
  Clock,
  FileText,
  FolderKanban,
  MessageSquare,
  Receipt,
  Sparkles,
} from 'lucide-react'
import { quickActions } from '@/lib/portal'
import { usePortal, deriveMilestones } from '@/lib/portal-store'
import { PortalPageHeader } from '@/components/portal/page-header'
import {
  EmptyState,
  PortalCard,
  ProgressBar,
  StatTile,
  StatusBadge,
} from '@/components/portal/portal-ui'

export default function DashboardPage() {
  const { state, hydrated } = usePortal()
  const { profile, projects, notifications } = state

  const firstName = profile.name ? profile.name.split(' ')[0] : null
  const activeProject = projects.find((p) => p.status === 'in-progress') ?? projects[0]
  const hasProjects = projects.length > 0
  const milestones = activeProject ? deriveMilestones(activeProject) : []
  const upcoming = milestones.filter((m) => m.status !== 'completed').slice(0, 3)

  return (
    <>
      <PortalPageHeader
        title={firstName ? `Welcome back, ${firstName}` : 'Welcome to your portal'}
        description="Manage your website projects with Forge Web Studio, all in one place."
      />

      {/* Primary CTA */}
      <section className="mb-8 overflow-hidden rounded-2xl border border-primary/25 bg-gradient-to-br from-primary/[0.12] to-card p-6 sm:p-8">
        <div className="flex flex-col gap-5 sm:flex-row sm:items-center sm:justify-between">
          <div className="max-w-xl">
            <span className="inline-flex items-center gap-1.5 rounded-full border border-primary/30 bg-primary/10 px-3 py-1 text-xs font-medium text-primary">
              <Sparkles className="size-3.5" />
              {hasProjects ? 'Start another project' : 'Get started'}
            </span>
            <h2 className="mt-3 font-display text-xl font-semibold text-foreground sm:text-2xl text-balance">
              Start a new website project
            </h2>
            <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
              Complete our project questionnaire and we&apos;ll have everything
              we need to design and build your premium website.
            </p>
          </div>
          <Link
            href="/start"
            className="inline-flex shrink-0 items-center justify-center gap-2 rounded-full bg-primary px-6 py-3 text-sm font-semibold text-primary-foreground shadow-lg shadow-primary/20 transition-all hover:-translate-y-0.5 hover:opacity-95"
          >
            <ClipboardList className="size-4" />
            Start New Website Project
          </Link>
        </div>
      </section>

      {/* Stat tiles */}
      <div className="grid grid-cols-2 gap-4 lg:grid-cols-4">
        <StatTile
          label="Active projects"
          value={hydrated ? String(projects.filter((p) => p.status !== 'completed').length) : '0'}
          hint={`${projects.length} total`}
          icon={FolderKanban}
        />
        <StatTile
          label="Overall progress"
          value={activeProject ? `${activeProject.progress}%` : '—'}
          hint={activeProject ? activeProject.phase : 'No active project'}
          icon={Clock}
        />
        <StatTile label="Outstanding" value="$0" hint="No invoices yet" icon={Receipt} />
        <StatTile
          label="Unread alerts"
          value={hydrated ? String(notifications.filter((n) => !n.read).length) : '0'}
          hint="Notifications"
          icon={MessageSquare}
        />
      </div>

      <div className="mt-6 grid gap-6 lg:grid-cols-3">
        {/* Project progress */}
        <PortalCard
          className="lg:col-span-2"
          title="Project progress"
          action={
            activeProject ? (
              <Link
                href={`/portal/projects/${activeProject.id}`}
                className="inline-flex items-center gap-1 text-sm font-medium text-primary hover:underline"
              >
                View details <ArrowRight className="size-4" />
              </Link>
            ) : undefined
          }
        >
          {activeProject ? (
            <>
              <div className="mb-5 flex items-start justify-between gap-4">
                <div>
                  <h3 className="font-medium text-foreground">{activeProject.name}</h3>
                  <p className="mt-1 text-sm text-muted-foreground">{activeProject.description}</p>
                </div>
                <StatusBadge status={activeProject.status} />
              </div>
              <ProgressBar value={activeProject.progress} label="Completion" />
              <div className="mt-6 grid grid-cols-2 gap-4 sm:grid-cols-4">
                {milestones.slice(0, 4).map((m) => (
                  <div key={m.title} className="rounded-xl border border-border bg-background/50 p-3">
                    <span
                      className={
                        m.status === 'completed'
                          ? 'text-[oklch(0.8_0.15_155)]'
                          : m.status === 'in-progress'
                            ? 'text-primary'
                            : 'text-muted-foreground'
                      }
                    >
                      {m.status === 'completed' ? (
                        <Sparkles className="size-4" />
                      ) : (
                        <Clock className="size-4" />
                      )}
                    </span>
                    <p className="mt-2 text-xs font-medium text-foreground">{m.title}</p>
                    <p className="text-[11px] capitalize text-muted-foreground">
                      {m.status.replace('-', ' ')}
                    </p>
                  </div>
                ))}
              </div>
            </>
          ) : (
            <EmptyState
              icon={FolderKanban}
              title="No active projects yet"
              description="Once you submit the project questionnaire, your project progress will appear here."
              action={
                <Link
                  href="/start"
                  className="inline-flex items-center gap-2 rounded-full bg-primary px-5 py-2.5 text-sm font-medium text-primary-foreground transition-opacity hover:opacity-90"
                >
                  Start a project
                </Link>
              }
            />
          )}
        </PortalCard>

        {/* Quick actions */}
        <PortalCard title="Quick actions">
          <div className="grid grid-cols-2 gap-3">
            {quickActions.map((action) => {
              const Icon = action.icon
              return (
                <Link
                  key={action.label}
                  href={action.href}
                  className="flex flex-col items-start gap-3 rounded-xl border border-border bg-background/50 p-4 transition-colors hover:border-primary/40 hover:bg-primary/5"
                >
                  <span className="flex size-9 items-center justify-center rounded-lg bg-primary/10 text-primary">
                    <Icon className="size-4" />
                  </span>
                  <span className="text-sm font-medium text-foreground">{action.label}</span>
                </Link>
              )
            })}
          </div>
        </PortalCard>

        {/* Recent activity */}
        <PortalCard
          title="Recent activity"
          action={
            <Link href="/portal/notifications" className="text-sm font-medium text-primary hover:underline">
              View all
            </Link>
          }
        >
          {hydrated && notifications.length > 0 ? (
            <ul className="space-y-4">
              {notifications.slice(0, 3).map((n) => (
                <li key={n.id} className="flex gap-3">
                  <span className="mt-0.5 flex size-8 shrink-0 items-center justify-center rounded-full bg-primary/10 text-primary">
                    <Sparkles className="size-4" />
                  </span>
                  <div>
                    <p className="text-sm font-medium text-foreground">{n.title}</p>
                    <p className="mt-0.5 line-clamp-2 text-sm text-muted-foreground">{n.body}</p>
                  </div>
                </li>
              ))}
            </ul>
          ) : (
            <div className="py-6 text-center text-sm text-muted-foreground">
              No activity yet. Your updates will show up here.
            </div>
          )}
        </PortalCard>

        {/* Upcoming milestones */}
        <PortalCard
          title="Upcoming milestones"
          action={
            <Link href="/portal/timeline" className="text-sm font-medium text-primary hover:underline">
              Timeline
            </Link>
          }
        >
          {upcoming.length > 0 ? (
            <ul className="space-y-4">
              {upcoming.map((m) => (
                <li key={m.title} className="flex items-center justify-between gap-4">
                  <div>
                    <p className="text-sm font-medium text-foreground">{m.title}</p>
                    <p className="text-xs capitalize text-muted-foreground">
                      {m.status.replace('-', ' ')}
                    </p>
                  </div>
                  <StatusBadge status={m.status} />
                </li>
              ))}
            </ul>
          ) : (
            <div className="py-6 text-center text-sm text-muted-foreground">
              Milestones appear once your project kicks off.
            </div>
          )}
        </PortalCard>

        {/* Files */}
        <PortalCard
          title="Files"
          action={
            <Link href="/portal/files" className="text-sm font-medium text-primary hover:underline">
              Open
            </Link>
          }
        >
          <div className="flex items-center gap-3 py-2">
            <span className="flex size-10 shrink-0 items-center justify-center rounded-lg bg-primary/10 text-primary">
              <FileText className="size-5" />
            </span>
            <p className="text-sm text-muted-foreground">
              Shared files and deliverables will appear here.
            </p>
          </div>
        </PortalCard>
      </div>
    </>
  )
}
