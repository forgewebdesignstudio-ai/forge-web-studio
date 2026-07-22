import { ArrowRight } from 'lucide-react'

import { services } from '@/lib/site'
import { SectionHeading } from '@/components/ui/section-heading'
import { CtaButton } from '@/components/ui/cta-button'
import { StaggerGroup, StaggerItem } from '@/components/motion/reveal'
import { ServiceCard } from '@/components/services/service-card'

export function ServicesPreview() {
  const featured = services.filter((s) => !s.comingSoon).slice(0, 6)

  return (
    <section className="border-y border-border bg-card/30">
      <div className="mx-auto max-w-7xl px-4 py-20 sm:px-6 md:py-28 lg:px-8">
        <SectionHeading
          eyebrow="Services"
          title="Crafted solutions for every ambition"
          description="From a single high-converting landing page to a full custom website, every project is built to a flagship standard."
        />

        <StaggerGroup className="mt-14 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {featured.map((service) => (
            <StaggerItem key={service.slug}>
              <ServiceCard service={service} />
            </StaggerItem>
          ))}
        </StaggerGroup>

        <div className="mt-12 flex justify-center">
          <CtaButton href="/services" variant="outline" size="lg">
            View All Services
            <ArrowRight className="transition-transform group-hover:translate-x-1" />
          </CtaButton>
        </div>
      </div>
    </section>
  )
}
