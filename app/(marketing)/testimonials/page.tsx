import type { Metadata } from 'next'
import { Star } from 'lucide-react'

import { siteConfig, stats, testimonials } from '@/lib/site'
import { Reveal, StaggerGroup, StaggerItem } from '@/components/motion/reveal'
import { PageHero } from '@/components/site/page-hero'
import { CtaBand } from '@/components/site/cta-band'
import { TestimonialCard } from '@/components/testimonials/testimonial-card'

export const metadata: Metadata = {
  title: 'Testimonials',
  description: `See what clients say about working with ${siteConfig.name} — premium websites, a seamless process, and real business results.`,
}

export default function TestimonialsPage() {
  return (
    <>
      <PageHero
        eyebrow="Client Love"
        title="Trusted by ambitious businesses"
        description="Do not just take our word for it. Here is what business owners say about partnering with Forge Web Studio."
      />

      {/* Rating banner */}
      <section className="border-b border-border px-4 sm:px-6 lg:px-8">
        <Reveal className="mx-auto flex max-w-6xl flex-col items-center gap-3 py-10 text-center sm:flex-row sm:justify-center sm:gap-6">
          <div className="flex items-center gap-1 text-gold">
            {Array.from({ length: 5 }).map((_, i) => (
              <Star key={i} className="size-6 fill-current" />
            ))}
          </div>
          <p className="text-lg font-medium text-foreground">
            5.0 average rating
            <span className="text-muted-foreground">
              {' '}
              across every completed project
            </span>
          </p>
        </Reveal>
      </section>

      {/* Testimonials grid */}
      <section className="px-4 py-20 sm:px-6 md:py-24 lg:px-8">
        <div className="mx-auto max-w-6xl">
          <StaggerGroup className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {testimonials.map((t) => (
              <StaggerItem key={t.name} className="h-full">
                <TestimonialCard testimonial={t} />
              </StaggerItem>
            ))}
          </StaggerGroup>
        </div>
      </section>

      {/* Stats */}
      <section className="border-t border-border px-4 py-16 sm:px-6 lg:px-8">
        <div className="mx-auto grid max-w-5xl grid-cols-2 gap-8 md:grid-cols-4">
          {stats.map((stat) => (
            <Reveal key={stat.label} className="text-center">
              <p className="font-display text-4xl font-bold text-gold md:text-5xl">
                {stat.value}
              </p>
              <p className="mt-2 text-sm text-muted-foreground">{stat.label}</p>
            </Reveal>
          ))}
        </div>
      </section>

      <CtaBand
        title="Become our next success story"
        description="Join the businesses that chose to look and perform like the leaders in their industry."
      />
    </>
  )
}
