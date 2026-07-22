import type { Metadata } from 'next'

import { siteConfig } from '@/lib/site'
import { PageHero } from '@/components/site/page-hero'
import { OnboardingWizard } from '@/components/portal/onboarding-wizard'

export const metadata: Metadata = {
  title: 'Start Your Project',
  description: `Begin your project with ${siteConfig.name}. Complete our onboarding questionnaire and we'll review your submission and reach out with next steps.`,
}

export default function StartProjectPage() {
  return (
    <>
      <PageHero
        eyebrow="Start Your Project"
        title="Tell us about your project"
        description="Complete this onboarding questionnaire so we have everything we need to craft a tailored proposal. Your progress saves automatically, and there's no account required."
      />

      <section className="px-4 py-12 sm:px-6 md:py-16 lg:px-8">
        <div className="mx-auto max-w-6xl">
          <OnboardingWizard />
        </div>
      </section>
    </>
  )
}
