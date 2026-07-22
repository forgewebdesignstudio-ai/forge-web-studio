import { Hero } from '@/components/home/hero'
import { Stats } from '@/components/home/stats'
import { WhyChoose } from '@/components/home/why-choose'
import { ServicesPreview } from '@/components/home/services-preview'
import { PortfolioPreview } from '@/components/home/portfolio-preview'
import { TestimonialsPreview } from '@/components/home/testimonials-preview'
import { CtaBand } from '@/components/site/cta-band'

export default function HomePage() {
  return (
    <>
      <Hero />
      <Stats />
      <WhyChoose />
      <ServicesPreview />
      <PortfolioPreview />
      <TestimonialsPreview />
      <CtaBand />
    </>
  )
}
