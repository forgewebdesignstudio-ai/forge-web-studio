'use client'

import { useState } from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { Bell, LogOut, Menu, Search, User, X } from 'lucide-react'
import { cn } from '@/lib/utils'
import { portalNav } from '@/lib/portal'
import { usePortal, initialsFromName } from '@/lib/portal-store'
import type { ClientSession } from '@/lib/auth'
import { Logo } from '@/components/site/logo'

function NavLinks({ onNavigate }: { onNavigate?: () => void }) {
  const pathname = usePathname()
  return (
    <nav className="flex flex-1 flex-col gap-1 px-3" aria-label="Portal">
      {portalNav.map((item) => {
        const active = pathname === item.href || pathname.startsWith(item.href + '/')
        const Icon = item.icon
        return (
          <Link
            key={item.href}
            href={item.href}
            onClick={onNavigate}
            aria-current={active ? 'page' : undefined}
            className={cn(
              'group flex items-center gap-3 rounded-xl px-3 py-2.5 text-sm font-medium transition-colors',
              active
                ? 'bg-primary/10 text-primary'
                : 'text-muted-foreground hover:bg-muted hover:text-foreground',
            )}
          >
            <Icon className={cn('size-[18px]', active && 'text-primary')} />
            <span className="flex-1">{item.label}</span>
          </Link>
        )
      })}
    </nav>
  )
}

function SidebarContent({ onNavigate }: { onNavigate?: () => void }) {
  return (
    <div className="flex h-full flex-col">
      <div className="flex h-16 items-center px-6">
        <Logo />
      </div>
      <div className="mt-2 flex-1 overflow-y-auto">
        <NavLinks onNavigate={onNavigate} />
      </div>
      <div className="border-t border-border p-3">
        <Link
          href="/portal/login"
          onClick={onNavigate}
          className="flex items-center gap-3 rounded-xl px-3 py-2.5 text-sm font-medium text-muted-foreground transition-colors hover:bg-muted hover:text-foreground"
        >
          <LogOut className="size-[18px]" />
          Sign out
        </Link>
      </div>
    </div>
  )
}

export function PortalShell({
  children,
  session,
}: {
  children: React.ReactNode
  session?: ClientSession | null
}) {
  const [mobileOpen, setMobileOpen] = useState(false)
  const { state, unreadCount, hydrated } = usePortal()
  const { profile } = state
  // Prefer the real authenticated session; fall back to the local profile.
  const displayName = session?.name || profile.name || 'Your account'
  const displayBusiness =
    session?.business || profile.business || 'Complete your profile'
  const initials = initialsFromName(session?.name || profile.name)

  return (
    <div className="min-h-screen bg-background">
      {/* Desktop sidebar */}
      <aside className="fixed inset-y-0 left-0 z-30 hidden w-64 border-r border-border bg-card lg:block">
        <SidebarContent />
      </aside>

      {/* Mobile drawer */}
      {mobileOpen && (
        <div className="fixed inset-0 z-50 lg:hidden">
          <div
            className="absolute inset-0 bg-background/80 backdrop-blur-sm"
            onClick={() => setMobileOpen(false)}
            aria-hidden
          />
          <aside className="absolute inset-y-0 left-0 w-72 border-r border-border bg-card">
            <button
              onClick={() => setMobileOpen(false)}
              className="absolute right-3 top-4 flex size-9 items-center justify-center rounded-lg text-muted-foreground hover:bg-muted"
              aria-label="Close menu"
            >
              <X className="size-5" />
            </button>
            <SidebarContent onNavigate={() => setMobileOpen(false)} />
          </aside>
        </div>
      )}

      <div className="lg:pl-64">
        {/* Topbar */}
        <header className="sticky top-0 z-20 flex h-16 items-center gap-4 border-b border-border bg-background/80 px-4 backdrop-blur-md sm:px-6">
          <button
            onClick={() => setMobileOpen(true)}
            className="flex size-9 items-center justify-center rounded-lg text-muted-foreground hover:bg-muted lg:hidden"
            aria-label="Open menu"
          >
            <Menu className="size-5" />
          </button>

          <div className="relative hidden max-w-sm flex-1 sm:block">
            <Search className="pointer-events-none absolute left-3 top-1/2 size-4 -translate-y-1/2 text-muted-foreground" />
            <input
              type="search"
              placeholder="Search projects, files, invoices..."
              className="h-10 w-full rounded-xl border border-border bg-card pl-9 pr-3 text-sm text-foreground outline-none placeholder:text-muted-foreground focus:border-primary/50 focus:ring-2 focus:ring-primary/20"
            />
          </div>

          <div className="ml-auto flex items-center gap-2">
            <Link
              href="/portal/notifications"
              className="relative flex size-9 items-center justify-center rounded-lg text-muted-foreground hover:bg-muted hover:text-foreground"
              aria-label="Notifications"
            >
              <Bell className="size-5" />
              {hydrated && unreadCount > 0 && (
                <span className="absolute right-2 top-2 size-2 rounded-full bg-primary ring-2 ring-background" />
              )}
            </Link>
            <Link href="/portal/settings" className="flex items-center gap-3 rounded-full py-1 pl-1 pr-3 hover:bg-muted">
              <span className="flex size-8 items-center justify-center rounded-full bg-primary text-sm font-semibold text-primary-foreground">
                {initials || <User className="size-4" />}
              </span>
              <span className="hidden text-left sm:block">
                <span className="block text-sm font-medium leading-tight text-foreground">
                  {displayName}
                </span>
                <span className="block text-xs leading-tight text-muted-foreground">
                  {displayBusiness}
                </span>
              </span>
            </Link>
          </div>
        </header>

        <main className="mx-auto max-w-7xl p-4 sm:p-6 lg:p-8">{children}</main>
      </div>
    </div>
  )
}
