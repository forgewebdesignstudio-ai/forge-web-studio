import type { Metadata } from 'next'

import { siteConfig } from '@/lib/site'
import { PageHero } from '@/components/site/page-hero'
import { CtaBand } from '@/components/site/cta-band'
import { ProcessFlow } from '@/components/process/process-flow'

export const metadata: Metadata = {
  title: 'Process',
  description: `Discover the proven 7-step process ${siteConfig.name} uses to design and build premium websites, from discovery to launch and support.`,
}

export default function ProcessPage() {
  return (
    <>
      <PageHero
        eyebrow="Our Process"
        title="A proven path from idea to launch"
        description="Our structured 7-step process removes the guesswork and keeps your project moving with clarity, quality, and confidence at every stage."
      />

      <section className="px-4 py-20 sm:px-6 md:py-28 lg:px-8">
        <ProcessFlow />
      </section>

      <CtaBand
        title="Ready to start with discovery?"
        description="Every great website begins with a conversation. Book a free discovery call and let's map out your project together."
      />
    </>
  )
}
