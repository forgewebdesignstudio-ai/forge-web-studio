import type { Metadata } from 'next'

import { portfolioProjects } from '@/lib/portfolio'
import { siteConfig } from '@/lib/site'
import { StaggerGroup, StaggerItem } from '@/components/motion/reveal'
import { PageHero } from '@/components/site/page-hero'
import { CtaBand } from '@/components/site/cta-band'
import { PortfolioCard } from '@/components/portfolio/portfolio-card'

export const metadata: Metadata = {
  title: 'Portfolio',
  description: `Explore live demo websites built by ${siteConfig.name} across landscaping, automotive, and fine dining — each crafted to feel like a real premium brand.`,
}

export default function PortfolioPage() {
  return (
    <>
      <PageHero
        eyebrow="Portfolio"
        title="Work that looks like the real thing"
        description="Each project below is a fully explorable demo website. Click any card to experience the kind of premium, industry-specific site we build for clients."
      />

      <section className="px-4 py-20 sm:px-6 md:py-24 lg:px-8">
        <div className="mx-auto max-w-6xl">
          <StaggerGroup className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
            {portfolioProjects.map((project) => (
              <StaggerItem key={project.slug} className="h-full">
                <PortfolioCard project={project} />
              </StaggerItem>
            ))}
          </StaggerGroup>

          <p className="mt-10 text-center text-sm text-muted-foreground">
            These are demonstration brands created by Forge Web Studio to
            showcase our design range.
          </p>
        </div>
      </section>

      <CtaBand
        title="Imagine your business here"
        description="We'll craft a website this polished — tailored to your brand, your industry, and your goals."
      />
    </>
  )
}
