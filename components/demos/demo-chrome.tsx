'use client'

import Link from 'next/link'
import { useState } from 'react'
import { ArrowLeft, Menu, Phone, X } from 'lucide-react'

import type { DemoConfig } from '@/lib/demos'

/** Thin banner reminding visitors this is a Forge-built demo. */
export function DemoRibbon({ name }: { name: string }) {
  return (
    <div className="flex items-center justify-between gap-x-3 gap-y-1 bg-black px-4 py-2 text-xs text-white/70 sm:px-6">
      <Link
        href="/"
        className="group inline-flex items-center gap-1.5 rounded-full border border-[#c9a24b]/40 bg-[#c9a24b]/10 px-3 py-1 font-medium text-[#c9a24b] transition-colors hover:border-[#c9a24b]/70 hover:bg-[#c9a24b]/20"
      >
        <ArrowLeft className="size-3 transition-transform group-hover:-translate-x-0.5" />
        <span className="hidden sm:inline">Back to Forge Web Studio</span>
        <span className="sm:hidden">Forge Web Studio</span>
      </Link>
      <span className="flex items-center gap-2">
        <span className="hidden sm:inline">
          Demo site by{' '}
          <span className="font-semibold text-white">Forge Web Studio</span>
        </span>
        <Link
          href="/portfolio"
          className="font-medium text-[#c9a24b] hover:underline"
        >
          View portfolio
        </Link>
      </span>
    </div>
  )
}

export function DemoNav({ config }: { config: DemoConfig }) {
  const [open, setOpen] = useState(false)

  return (
    <header
      className="demo-border sticky top-0 z-40 border-b backdrop-blur-md"
      style={{ backgroundColor: 'color-mix(in oklab, var(--demo-bg) 82%, transparent)' }}
    >
      <nav className="mx-auto flex max-w-7xl items-center justify-between px-4 py-4 sm:px-6 lg:px-8">
        <a href="#home" className="flex flex-col leading-none">
          <span className="text-lg font-bold tracking-tight" style={{ color: 'var(--demo-text)' }}>
            {config.name}
          </span>
          <span className="demo-accent text-[10px] font-medium uppercase tracking-[0.2em]">
            {config.tagline}
          </span>
        </a>

        <div className="hidden items-center gap-7 lg:flex">
          {config.nav.map((link) => (
            <a
              key={link.hash}
              href={link.hash}
              className="text-sm font-medium demo-muted transition-colors hover:text-[color:var(--demo-accent-strong)]"
            >
              {link.label}
            </a>
          ))}
          <a
            href="#contact"
            className="demo-bg-accent rounded-full px-5 py-2 text-sm font-semibold transition-transform hover:-translate-y-0.5"
          >
            {config.primaryCta}
          </a>
        </div>

        <button
          type="button"
          onClick={() => setOpen((v) => !v)}
          className="lg:hidden"
          style={{ color: 'var(--demo-text)' }}
          aria-label="Toggle menu"
          aria-expanded={open}
        >
          {open ? <X className="size-6" /> : <Menu className="size-6" />}
        </button>
      </nav>

      {open ? (
        <div className="demo-border border-t px-4 pb-5 lg:hidden">
          <div className="flex flex-col gap-1 pt-3">
            {config.nav.map((link) => (
              <a
                key={link.hash}
                href={link.hash}
                onClick={() => setOpen(false)}
                className="rounded-lg px-3 py-2.5 text-sm font-medium demo-muted hover:bg-white/5"
              >
                {link.label}
              </a>
            ))}
            <a
              href="#contact"
              onClick={() => setOpen(false)}
              className="demo-bg-accent mt-2 rounded-full px-5 py-2.5 text-center text-sm font-semibold"
            >
              {config.primaryCta}
            </a>
          </div>
        </div>
      ) : null}
    </header>
  )
}

export function DemoFooter({ config }: { config: DemoConfig }) {
  return (
    <footer className="demo-border border-t px-4 py-12 sm:px-6 lg:px-8">
      <div className="mx-auto flex max-w-7xl flex-col items-center gap-4 text-center">
        <span className="text-lg font-bold" style={{ color: 'var(--demo-text)' }}>
          {config.name}
        </span>
        <a
          href={`tel:${config.phone.replace(/[^\d+]/g, '')}`}
          className="inline-flex items-center gap-2 text-sm demo-muted hover:text-[color:var(--demo-accent-strong)]"
        >
          <Phone className="size-4" />
          {config.phone}
        </a>
        <p className="text-xs demo-muted">
          {config.address} · {config.email}
        </p>
        <p className="mt-4 text-xs demo-muted">
          Demonstration website designed &amp; built by{' '}
          <Link href="/" className="demo-accent hover:underline">
            Forge Web Studio
          </Link>
          . Not a real business.
        </p>
      </div>
    </footer>
  )
}
