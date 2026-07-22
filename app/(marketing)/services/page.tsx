import type { Metadata } from 'next'

import { services, siteConfig } from '@/lib/site'
import { StaggerGroup, StaggerItem } from '@/components/motion/reveal'
import { PageHero } from '@/components/site/page-hero'
import { SectionHeading } from '@/components/ui/section-heading'
import { CtaBand } from '@/components/site/cta-band'
import { ServiceCard } from '@/components/services/service-card'

export const metadata: Metadata = {
  title: 'Services',
  description: `Explore the premium web design and development services offered by ${siteConfig.name}, from custom websites to landing pages and ongoing care.`,
}

export default function ServicesPage() {
  const active = services.filter((s) => !s.comingSoon)
  const upcoming = services.filter((s) => s.comingSoon)

  return (
    <>
      <PageHero
        eyebrow="Services"
        title="Everything you need to win online"
        description="From a single high-converting landing page to a complete custom website, every engagement is crafted to the standard of a flagship brand."
      />

      <section className="px-4 py-20 sm:px-6 md:py-24 lg:px-8">
        <div className="mx-auto max-w-6xl">
          <StaggerGroup className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {active.map((service) => (
              <StaggerItem key={service.slug} className="h-full">
                <ServiceCard service={service} detailed />
              </StaggerItem>
            ))}
          </StaggerGroup>
        </div>
      </section>

      <section className="border-t border-border px-4 py-20 sm:px-6 md:py-24 lg:px-8">
        <div className="mx-auto max-w-6xl">
          <SectionHeading
            eyebrow="On the Horizon"
            title="Coming soon to Forge"
            description="We are expanding into full-service partnerships. Join the waitlist and be the first to know when these launch."
          />
          <StaggerGroup className="mt-14 grid gap-6 md:grid-cols-2">
            {upcoming.map((service) => (
              <StaggerItem key={service.slug} className="h-full">
                <ServiceCard service={service} detailed />
              </StaggerItem>
            ))}
          </StaggerGroup>
        </div>
      </section>

      <CtaBand
        title="Not sure which service fits?"
        description="Tell us about your business and goals. We'll recommend the right approach and send a transparent, fixed-price proposal."
      />
    </>
  )
}
