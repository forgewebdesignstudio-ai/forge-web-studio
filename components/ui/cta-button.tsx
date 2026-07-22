import Link from 'next/link'
import { cva, type VariantProps } from 'class-variance-authority'
import type { AnchorHTMLAttributes } from 'react'

import { cn } from '@/lib/utils'

const ctaVariants = cva(
  'group relative inline-flex items-center justify-center gap-2 rounded-full font-medium tracking-tight whitespace-nowrap transition-all duration-300 outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background disabled:pointer-events-none disabled:opacity-50 [&_svg]:size-4 [&_svg]:shrink-0 [&_svg]:transition-transform',
  {
    variants: {
      variant: {
        gold: 'bg-gold text-gold-foreground shadow-lg shadow-gold/20 hover:-translate-y-0.5 hover:shadow-xl hover:shadow-gold/30',
        outline:
          'border border-border bg-transparent text-foreground hover:border-gold/50 hover:bg-gold/5 hover:-translate-y-0.5',
        ghost: 'text-foreground hover:bg-muted',
        dark: 'bg-foreground text-background hover:-translate-y-0.5 hover:opacity-90',
      },
      size: {
        default: 'h-11 px-6 text-sm',
        lg: 'h-13 px-8 text-base',
        sm: 'h-9 px-4 text-sm',
      },
    },
    defaultVariants: {
      variant: 'gold',
      size: 'default',
    },
  },
)

interface CtaButtonProps
  extends Omit<AnchorHTMLAttributes<HTMLAnchorElement>, 'href'>,
    VariantProps<typeof ctaVariants> {
  href: string
}

export function CtaButton({
  href,
  variant,
  size,
  className,
  children,
  ...props
}: CtaButtonProps) {
  const isExternal = href.startsWith('http') || href.startsWith('mailto:')

  if (isExternal) {
    return (
      <a
        href={href}
        className={cn(ctaVariants({ variant, size }), className)}
        {...props}
      >
        {children}
      </a>
    )
  }

  return (
    <Link
      href={href}
      className={cn(ctaVariants({ variant, size }), className)}
      {...props}
    >
      {children}
    </Link>
  )
}

export { ctaVariants }
