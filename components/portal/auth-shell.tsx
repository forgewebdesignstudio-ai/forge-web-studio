import Link from 'next/link'
import { ArrowLeft } from 'lucide-react'
import { Logo } from '@/components/site/logo'

export function AuthShell({
  title,
  subtitle,
  children,
  footer,
}: {
  title: string
  subtitle: string
  children: React.ReactNode
  footer?: React.ReactNode
}) {
  return (
    <main className="relative flex min-h-screen items-center justify-center overflow-hidden bg-background px-4 py-12">
      {/* Ambient glow */}
      <div
        className="pointer-events-none absolute left-1/2 top-0 h-[420px] w-[720px] -translate-x-1/2 rounded-full bg-primary/10 blur-[120px]"
        aria-hidden
      />
      <div className="relative w-full max-w-md">
        <div className="mb-8 flex flex-col items-center text-center">
          <Logo />
          <h1 className="mt-8 font-serif text-2xl font-semibold text-foreground text-balance">
            {title}
          </h1>
          <p className="mt-2 text-sm text-muted-foreground text-pretty">{subtitle}</p>
        </div>

        <div className="rounded-2xl border border-border bg-card p-6 shadow-xl sm:p-8">
          {children}
        </div>

        {footer && <div className="mt-6 text-center text-sm text-muted-foreground">{footer}</div>}

        <div className="mt-8 text-center">
          <Link
            href="/"
            className="inline-flex items-center gap-2 text-sm text-muted-foreground transition-colors hover:text-primary"
          >
            <ArrowLeft className="size-4" />
            Back to website
          </Link>
        </div>
      </div>
    </main>
  )
}
