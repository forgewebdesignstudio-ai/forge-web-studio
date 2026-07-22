import Link from 'next/link'
import { Hexagon } from 'lucide-react'

import { cn } from '@/lib/utils'

export function Logo({
  className,
  href = '/',
}: {
  className?: string
  href?: string
}) {
  return (
    <Link
      href={href}
      className={cn(
        'group inline-flex items-center gap-2.5 font-display text-lg font-bold tracking-tight',
        className,
      )}
      aria-label="Forge Web Studio — home"
    >
      <span className="relative grid size-9 place-items-center rounded-xl border border-gold/30 bg-gold/10 transition-colors group-hover:bg-gold/20">
        <Hexagon className="size-4.5 text-gold" strokeWidth={2.25} />
      </span>
      <span className="leading-none">
        Forge<span className="text-gold">.</span>
        <span className="ml-1 text-xs font-medium tracking-[0.2em] text-muted-foreground uppercase">
          Studio
        </span>
      </span>
    </Link>
  )
}
