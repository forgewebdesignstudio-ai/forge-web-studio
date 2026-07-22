import type { Metadata } from 'next'

import { faqs, siteConfig } from '@/lib/site'
import { PageHero } from '@/components/site/page-hero'
import { CtaBand } from '@/components/site/cta-band'
import { FaqAccordion } from '@/components/faq/faq-accordion'

export const metadata: Metadata = {
  title: 'FAQ',
  description: `Answers to common questions about pricing, timelines, hosting, ownership, SEO, and support at ${siteConfig.name}.`,
}

// Structured data for SEO (FAQ rich results)
const faqJsonLd = {
  '@context': 'https://schema.org',
  '@type': 'FAQPage',
  mainEntity: faqs.map((f) => ({
    '@type': 'Question',
    name: f.question,
    acceptedAnswer: { '@type': 'Answer', text: f.answer },
  })),
}

export default function FaqPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }}
      />
      <PageHero
        eyebrow="FAQ"
        title="Questions, answered"
        description="Everything you need to know about working with Forge Web Studio. Can't find your answer? Reach out and we'll help."
      />

      <section className="px-4 py-20 sm:px-6 md:py-24 lg:px-8">
        <FaqAccordion items={faqs} />
      </section>

      <CtaBand
        title="Still have questions?"
        description="We're happy to talk through your project, timeline, and budget with no pressure and no obligation."
      />
    </>
  )
}
