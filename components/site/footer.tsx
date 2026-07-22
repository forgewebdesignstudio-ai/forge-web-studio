import Link from 'next/link'
import {
  AtSign,
  Briefcase,
  Camera,
  Mail,
  MapPin,
  Phone,
  Rss,
  Send,
} from 'lucide-react'

import { mainNav, services, siteConfig } from '@/lib/site'
import { Logo } from '@/components/site/logo'

const socials = [
  { icon: AtSign, label: 'X / Twitter', href: '#' },
  { icon: Camera, label: 'Instagram', href: '#' },
  { icon: Briefcase, label: 'LinkedIn', href: '#' },
  { icon: Send, label: 'Telegram', href: '#' },
  { icon: Rss, label: 'Blog', href: '#' },
]

export function Footer() {
  return (
    <footer className="border-t border-border bg-card/40">
      <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
        <div className="grid gap-12 lg:grid-cols-[1.4fr_1fr_1fr_1fr]">
          <div className="flex flex-col gap-5">
            <Logo />
            <p className="max-w-sm text-pretty leading-relaxed text-muted-foreground">
              {siteConfig.tagline} Strategy, design, and engineering under one
              roof — built for businesses that refuse to look ordinary.
            </p>
            <div className="flex gap-2">
              {socials.map((s) => (
                <a
                  key={s.label}
                  href={s.href}
                  aria-label={s.label}
                  className="grid size-10 place-items-center rounded-xl border border-border text-muted-foreground transition-all hover:-translate-y-0.5 hover:border-gold/40 hover:text-gold"
                >
                  <s.icon className="size-4.5" />
                </a>
              ))}
            </div>
          </div>

          <div>
            <h3 className="font-display text-sm font-semibold tracking-wide uppercase">
              Company
            </h3>
            <ul className="mt-4 space-y-3 text-sm">
              {mainNav.map((item) => (
                <li key={item.href}>
                  <Link
                    href={item.href}
                    className="text-muted-foreground transition-colors hover:text-gold"
                  >
                    {item.label}
                  </Link>
                </li>
              ))}
              <li>
                <Link
                  href="/contact"
                  className="text-muted-foreground transition-colors hover:text-gold"
                >
                  Contact
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="font-display text-sm font-semibold tracking-wide uppercase">
              Services
            </h3>
            <ul className="mt-4 space-y-3 text-sm">
              {services.slice(0, 7).map((s) => (
                <li key={s.slug}>
                  <Link
                    href="/services"
                    className="text-muted-foreground transition-colors hover:text-gold"
                  >
                    {s.title}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="font-display text-sm font-semibold tracking-wide uppercase">
              Get in touch
            </h3>
            <ul className="mt-4 space-y-3 text-sm">
              <li>
                <a
                  href={`mailto:${siteConfig.email}`}
                  className="flex items-center gap-2.5 text-muted-foreground transition-colors hover:text-gold"
                >
                  <Mail className="size-4 shrink-0 text-gold" />
                  {siteConfig.email}
                </a>
              </li>
              <li>
                <a
                  href={`tel:${siteConfig.phone.replace(/[^\d]/g, '')}`}
                  className="flex items-center gap-2.5 text-muted-foreground transition-colors hover:text-gold"
                >
                  <Phone className="size-4 shrink-0 text-gold" />
                  {siteConfig.phone}
                </a>
              </li>
              <li className="flex items-center gap-2.5 text-muted-foreground">
                <MapPin className="size-4 shrink-0 text-gold" />
                {siteConfig.location}
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-14 flex flex-col items-center justify-between gap-4 border-t border-border pt-8 text-sm text-muted-foreground sm:flex-row">
          <p>
            &copy; {new Date().getFullYear()} {siteConfig.name}. All rights
            reserved.
          </p>
          <div className="flex gap-6">
            <Link href="#" className="transition-colors hover:text-foreground">
              Privacy Policy
            </Link>
            <Link href="#" className="transition-colors hover:text-foreground">
              Terms of Service
            </Link>
          </div>
        </div>
      </div>
    </footer>
  )
}
