import type { Metadata } from 'next'
import { Clock, Mail, MapPin, Phone } from 'lucide-react'

import { siteConfig } from '@/lib/site'
import { Reveal } from '@/components/motion/reveal'
import { PageHero } from '@/components/site/page-hero'
import { ContactForm } from '@/components/contact/contact-form'

export const metadata: Metadata = {
  title: 'Contact',
  description: `Start your project with ${siteConfig.name}. Tell us about your business and we'll send a tailored, transparent proposal.`,
}

const details = [
  { icon: Mail, label: 'Email', value: siteConfig.email, href: `mailto:${siteConfig.email}` },
  { icon: Phone, label: 'Phone', value: siteConfig.phone, href: `tel:${siteConfig.phone.replace(/[^\d+]/g, '')}` },
  { icon: MapPin, label: 'Location', value: siteConfig.location },
  { icon: Clock, label: 'Response time', value: 'Within one business day' },
]

export default function ContactPage() {
  return (
    <>
      <PageHero
        eyebrow="Contact"
        title="Let's build something premium"
        description="Tell us about your project below. The more detail you share, the more tailored our proposal will be."
      />

      <section className="px-4 py-16 sm:px-6 md:py-24 lg:px-8">
        <div className="mx-auto grid max-w-6xl gap-10 lg:grid-cols-[1fr_1.6fr]">
          {/* Details */}
          <Reveal direction="right" className="flex flex-col gap-6">
            <div>
              <h2 className="font-display text-2xl font-semibold">
                Start the conversation
              </h2>
              <p className="mt-3 leading-relaxed text-muted-foreground">
                Whether you know exactly what you need or you're just exploring,
                we're happy to help. Every project starts with a free, no-pressure
                discovery call.
              </p>
            </div>

            <ul className="flex flex-col gap-4">
              {details.map((d) => (
                <li key={d.label}>
                  <div className="flex items-start gap-4 rounded-2xl border border-border bg-card p-4 transition-colors hover:border-gold/30">
                    <span className="grid size-11 shrink-0 place-items-center rounded-xl border border-gold/25 bg-gold/5 text-gold">
                      <d.icon className="size-5" />
                    </span>
                    <div>
                      <p className="text-xs font-medium uppercase tracking-wide text-muted-foreground">
                        {d.label}
                      </p>
                      {d.href ? (
                        <a
                          href={d.href}
                          className="mt-0.5 block font-medium text-foreground transition-colors hover:text-gold"
                        >
                          {d.value}
                        </a>
                      ) : (
                        <p className="mt-0.5 font-medium text-foreground">
                          {d.value}
                        </p>
                      )}
                    </div>
                  </div>
                </li>
              ))}
            </ul>

            <div className="rounded-2xl border border-gold/20 bg-gold/5 p-5">
              <p className="text-sm leading-relaxed text-foreground/90">
                <span className="font-semibold text-gold">Fixed pricing.</span>{' '}
                No hourly surprises. After our call, you'll receive a clear,
                itemized proposal so you know exactly what to expect.
              </p>
            </div>
          </Reveal>

          {/* Form */}
          <Reveal>
            <ContactForm />
          </Reveal>
        </div>
      </section>
    </>
  )
}
