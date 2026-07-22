'use client'

import { useEffect, useState } from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { AnimatePresence, motion } from 'motion/react'
import { Menu, X } from 'lucide-react'

import { cn } from '@/lib/utils'
import { mainNav } from '@/lib/site'
import { Logo } from '@/components/site/logo'
import { CtaButton } from '@/components/ui/cta-button'

export function Navbar() {
  const pathname = usePathname()
  const [scrolled, setScrolled] = useState(false)
  const [open, setOpen] = useState(false)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 12)
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  useEffect(() => {
    setOpen(false)
  }, [pathname])

  useEffect(() => {
    document.body.style.overflow = open ? 'hidden' : ''
    return () => {
      document.body.style.overflow = ''
    }
  }, [open])

  const isActive = (href: string) =>
    href === '/' ? pathname === '/' : pathname.startsWith(href)

  return (
    <header
      className={cn(
        'fixed inset-x-0 top-0 z-50 transition-all duration-300',
        scrolled
          ? 'border-b border-border/60 bg-background/80 backdrop-blur-xl'
          : 'border-b border-transparent bg-transparent',
      )}
    >
      <nav
        className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8"
        aria-label="Primary"
      >
        <Logo />

        <div className="hidden items-center gap-1 lg:flex">
          {mainNav.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className={cn(
                'relative rounded-full px-3.5 py-2 text-sm font-medium transition-colors',
                isActive(item.href)
                  ? 'text-gold'
                  : 'text-muted-foreground hover:text-foreground',
              )}
            >
              {item.label}
              {isActive(item.href) ? (
                <motion.span
                  layoutId="nav-active"
                  className="absolute inset-0 -z-10 rounded-full bg-gold/10"
                  transition={{ type: 'spring', stiffness: 380, damping: 30 }}
                />
              ) : null}
            </Link>
          ))}
        </div>

        <div className="hidden items-center gap-3 lg:flex">
          <Link
            href="/portal/login"
            className="text-sm font-medium text-muted-foreground transition-colors hover:text-foreground"
          >
            Client Login
          </Link>
          <CtaButton href="/start" size="sm">
            Start Your Project
          </CtaButton>
        </div>

        <button
          type="button"
          onClick={() => setOpen((v) => !v)}
          className="grid size-11 place-items-center rounded-xl border border-border text-foreground lg:hidden"
          aria-label={open ? 'Close menu' : 'Open menu'}
          aria-expanded={open}
        >
          {open ? <X className="size-5" /> : <Menu className="size-5" />}
        </button>
      </nav>

      <AnimatePresence>
        {open ? (
          <motion.div
            initial={{ opacity: 0, y: -8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.2 }}
            className="border-t border-border bg-background/95 backdrop-blur-xl lg:hidden"
          >
            <div className="flex flex-col gap-1 px-4 py-4 sm:px-6">
              {mainNav.map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  className={cn(
                    'rounded-xl px-4 py-3 text-base font-medium transition-colors',
                    isActive(item.href)
                      ? 'bg-gold/10 text-gold'
                      : 'text-muted-foreground hover:bg-muted hover:text-foreground',
                  )}
                >
                  {item.label}
                </Link>
              ))}
              <div className="mt-3 flex flex-col gap-2 border-t border-border pt-4">
                <CtaButton href="/portal/login" variant="outline">
                  Client Login
                </CtaButton>
                <CtaButton href="/start">Start Your Project</CtaButton>
              </div>
            </div>
          </motion.div>
        ) : null}
      </AnimatePresence>
    </header>
  )
}
