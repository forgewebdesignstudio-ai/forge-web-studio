import { ArrowRight } from 'lucide-react'

import { portfolioProjects } from '@/lib/portfolio'
import { SectionHeading } from '@/components/ui/section-heading'
import { CtaButton } from '@/components/ui/cta-button'
import { StaggerGroup, StaggerItem } from '@/components/motion/reveal'
import { PortfolioCard } from '@/components/portfolio/portfolio-card'

export function PortfolioPreview() {
  return (
    <section className="mx-auto max-w-7xl px-4 py-20 sm:px-6 md:py-28 lg:px-8">
      <SectionHeading
        eyebrow="Portfolio"
        title="Work that speaks for itself"
        description="Explore fully interactive demo websites we've crafted across industries. Each one is a live example of our premium standard."
      />

      <StaggerGroup className="mt-14 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {portfolioProjects.map((project) => (
          <StaggerItem key={project.slug}>
            <PortfolioCard project={project} />
          </StaggerItem>
        ))}
      </StaggerGroup>

      <div className="mt-12 flex justify-center">
        <CtaButton href="/portfolio" variant="outline" size="lg">
          View Full Portfolio
          <ArrowRight className="transition-transform group-hover:translate-x-1" />
        </CtaButton>
      </div>
    </section>
  )
}
