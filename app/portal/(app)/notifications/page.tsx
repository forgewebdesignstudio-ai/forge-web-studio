'use client'

import { Bell, Sparkles } from 'lucide-react'
import { usePortal } from '@/lib/portal-store'
import { PortalPageHeader } from '@/components/portal/page-header'
import { EmptyState } from '@/components/portal/portal-ui'
import { cn } from '@/lib/utils'

function timeAgo(iso: string) {
  const diff = Date.now() - new Date(iso).getTime()
  const mins = Math.floor(diff / 60000)
  if (mins < 1) return 'Just now'
  if (mins < 60) return `${mins}m ago`
  const hrs = Math.floor(mins / 60)
  if (hrs < 24) return `${hrs}h ago`
  const days = Math.floor(hrs / 24)
  return `${days}d ago`
}

export default function NotificationsPage() {
  const { state, hydrated, unreadCount, markAllNotificationsRead } = usePortal()
  const { notifications } = state

  return (
    <>
      <PortalPageHeader
        title="Notifications"
        description="Stay on top of project activity, messages, and invoices."
        action={
          notifications.length > 0 ? (
            <button
              onClick={markAllNotificationsRead}
              disabled={unreadCount === 0}
              className="rounded-full border border-border px-4 py-2 text-sm font-medium text-foreground transition-colors hover:border-primary/40 hover:bg-primary/5 disabled:opacity-50"
            >
              Mark all as read
            </button>
          ) : undefined
        }
      />

      {hydrated && notifications.length === 0 ? (
        <EmptyState
          icon={Bell}
          title="You're all caught up"
          description="Notifications about your projects, messages, and invoices will appear here."
        />
      ) : (
        <div className="overflow-hidden rounded-2xl border border-border bg-card">
          <ul className="divide-y divide-border">
            {notifications.map((n) => (
              <li
                key={n.id}
                className={cn(
                  'flex items-start gap-4 p-5 transition-colors hover:bg-muted/40',
                  !n.read && 'bg-primary/[0.03]',
                )}
              >
                <span className="flex size-10 shrink-0 items-center justify-center rounded-xl bg-primary/10 text-primary">
                  <Sparkles className="size-5" />
                </span>
                <div className="flex-1">
                  <div className="flex items-center gap-2">
                    <p className="text-sm font-medium text-foreground">{n.title}</p>
                    {!n.read && <span className="size-2 rounded-full bg-primary" aria-label="Unread" />}
                  </div>
                  <p className="mt-0.5 text-sm text-muted-foreground">{n.body}</p>
                </div>
                <span className="shrink-0 text-xs text-muted-foreground">{timeAgo(n.createdAt)}</span>
              </li>
            ))}
          </ul>
        </div>
      )}
    </>
  )
}
