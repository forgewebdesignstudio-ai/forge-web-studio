import type { Metadata } from 'next'
import Image from 'next/image'
import { Target } from 'lucide-react'

import {
  companyStory,
  coreValues,
  missionStatement,
  siteConfig,
  whyChoose,
} from '@/lib/site'
import { Reveal, StaggerGroup, StaggerItem } from '@/components/motion/reveal'
import { PageHero } from '@/components/site/page-hero'
import { SectionHeading } from '@/components/ui/section-heading'
import { CtaBand } from '@/components/site/cta-band'
import { Timeline } from '@/components/about/timeline'

export const metadata: Metadata = {
  title: 'About',
  description: `Learn the story, mission, and values behind ${siteConfig.name} — a studio crafting premium websites for ambitious businesses.`,
}

export default function AboutPage() {
  return (
    <>
      <PageHero
        eyebrow="Our Story"
        title="A studio built on craft, not compromise"
        description="We are a small, senior team obsessed with building websites that make ambitious businesses look and perform like the leaders they are."
      />

      {/* Story + image */}
      <section className="px-4 py-20 sm:px-6 md:py-28 lg:px-8">
        <div className="mx-auto grid max-w-6xl items-center gap-12 lg:grid-cols-2">
          <Reveal direction="right">
            <div className="relative overflow-hidden rounded-3xl border border-border">
              <Image
                src="/about/studio.png"
                alt="The Forge Web Studio workspace at dusk"
                width={720}
                height={560}
                className="h-full w-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-background/60 to-transparent" />
            </div>
          </Reveal>
          <div className="flex flex-col gap-6">
            <SectionHeading
              align="left"
              eyebrow="Who We Are"
              title="Premium websites, forged with intent"
            />
            {companyStory.map((paragraph) => (
              <Reveal key={paragraph.slice(0, 24)} delay={0.1}>
                <p className="leading-relaxed text-muted-foreground">
                  {paragraph}
                </p>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* Mission */}
      <section className="border-y border-border bg-card px-4 py-20 sm:px-6 md:py-24 lg:px-8">
        <Reveal className="mx-auto max-w-4xl text-center">
          <span className="inline-flex size-12 items-center justify-center rounded-2xl border border-gold/25 bg-gold/5 text-gold">
            <Target className="size-6" />
          </span>
          <h2 className="font-display mt-6 text-sm font-semibold tracking-widest text-gold uppercase">
            Our Mission
          </h2>
          <p className="font-display mx-auto mt-4 max-w-3xl text-balance text-2xl font-medium leading-snug text-foreground sm:text-3xl md:text-4xl">
            {missionStatement}
          </p>
        </Reveal>
      </section>

      {/* Values */}
      <section className="px-4 py-20 sm:px-6 md:py-28 lg:px-8">
        <div className="mx-auto max-w-6xl">
          <SectionHeading
            eyebrow="What We Stand For"
            title="Values that shape every project"
            description="These principles guide how we design, build, and partner with the businesses we serve."
          />
          <StaggerGroup className="mt-14 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {coreValues.map((value) => (
              <StaggerItem key={value.title}>
                <div className="group h-full rounded-2xl border border-border bg-card p-6 transition-all duration-300 hover:-translate-y-1 hover:border-gold/30">
                  <span className="inline-flex size-11 items-center justify-center rounded-xl border border-gold/25 bg-gold/5 text-gold transition-colors group-hover:bg-gold/10">
                    <value.icon className="size-5" />
                  </span>
                  <h3 className="mt-5 text-lg font-semibold text-foreground">
                    {value.title}
                  </h3>
                  <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
                    {value.description}
                  </p>
                </div>
              </StaggerItem>
            ))}
          </StaggerGroup>
        </div>
      </section>

      {/* Why businesses choose Forge */}
      <section className="border-t border-border px-4 py-20 sm:px-6 md:py-28 lg:px-8">
        <div className="mx-auto max-w-6xl">
          <SectionHeading
            eyebrow="Why Forge"
            title="Why ambitious businesses choose us"
          />
          <StaggerGroup className="mt-14 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {whyChoose.map((item) => (
              <StaggerItem key={item.title}>
                <div className="group flex h-full gap-4 rounded-2xl border border-border bg-card p-6 transition-all duration-300 hover:-translate-y-1 hover:border-gold/30">
                  <span className="inline-flex size-11 shrink-0 items-center justify-center rounded-xl border border-gold/25 bg-gold/5 text-gold">
                    <item.icon className="size-5" />
                  </span>
                  <div>
                    <h3 className="text-lg font-semibold text-foreground">
                      {item.title}
                    </h3>
                    <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
                      {item.description}
                    </p>
                  </div>
                </div>
              </StaggerItem>
            ))}
          </StaggerGroup>
        </div>
      </section>

      {/* Timeline */}
      <section className="border-t border-border px-4 py-20 sm:px-6 md:py-28 lg:px-8">
        <div className="mx-auto max-w-6xl">
          <SectionHeading
            eyebrow="Our Journey"
            title="How the Forge took shape"
          />
          <div className="mt-16">
            <Timeline />
          </div>
        </div>
      </section>

      <CtaBand />
    </>
  )
}
