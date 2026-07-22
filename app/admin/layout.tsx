import type { Metadata } from 'next'
import Link from 'next/link'
import { ShieldAlert } from 'lucide-react'

import { getSession } from '@/lib/auth'
import { isAuthConfigured } from '@/lib/backend-config'
import { Logo } from '@/components/site/logo'

export const metadata: Metadata = {
  title: 'Admin',
  robots: { index: false, follow: false },
}

export default async function AdminLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const session = await getSession()

  // Admin area is for the studio team only. With no connected auth provider,
  // there is no admin session, so we show an honest locked state instead of
  // exposing (or faking) an internal dashboard.
  if (!session?.isAdmin) {
    return (
      <main className="flex min-h-screen items-center justify-center bg-background p-6">
        <div className="w-full max-w-md rounded-3xl border border-border bg-card p-8 text-center">
          <span className="mx-auto flex size-14 items-center justify-center rounded-full bg-primary/10 text-primary">
            <ShieldAlert className="size-7" />
          </span>
          <h1 className="mt-6 font-display text-2xl font-semibold text-foreground">
            Admin access required
          </h1>
          <p className="mt-3 text-sm leading-relaxed text-muted-foreground">
            This is the Forge Web Studio team dashboard for reviewing project
            submissions. It unlocks for authenticated team members once an
            authentication provider is connected.
          </p>
          {!isAuthConfigured() ? (
            <p className="mt-4 rounded-xl border border-border bg-background/50 px-4 py-3 text-xs leading-relaxed text-muted-foreground">
              Authentication is not configured yet. Connect Better Auth (Neon)
              or Supabase Auth and mark your account as an admin to access this
              area.
            </p>
          ) : null}
          <Link
            href="/"
            className="mt-8 inline-flex items-center justify-center rounded-full border border-border px-6 py-2.5 text-sm font-medium text-foreground transition-colors hover:bg-muted"
          >
            Back to site
          </Link>
        </div>
      </main>
    )
  }

  return (
    <div className="min-h-screen bg-background">
      <header className="flex h-16 items-center justify-between border-b border-border px-4 sm:px-6">
        <div className="flex items-center gap-3">
          <Logo />
          <span className="rounded-full border border-primary/30 bg-primary/10 px-2.5 py-0.5 text-xs font-medium text-primary">
            Admin
          </span>
        </div>
        <Link
          href="/portal/login"
          className="text-sm font-medium text-muted-foreground hover:text-foreground"
        >
          Sign out
        </Link>
      </header>
      <main className="mx-auto max-w-6xl p-4 sm:p-6 lg:p-8">{children}</main>
    </div>
  )
}
