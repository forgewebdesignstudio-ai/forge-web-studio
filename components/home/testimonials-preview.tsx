import { ArrowRight } from 'lucide-react'

import { testimonials } from '@/lib/site'
import { SectionHeading } from '@/components/ui/section-heading'
import { CtaButton } from '@/components/ui/cta-button'
import { StaggerGroup, StaggerItem } from '@/components/motion/reveal'
import { TestimonialCard } from '@/components/testimonials/testimonial-card'

export function TestimonialsPreview() {
  return (
    <section className="border-y border-border bg-card/30">
      <div className="mx-auto max-w-7xl px-4 py-20 sm:px-6 md:py-28 lg:px-8">
        <SectionHeading
          eyebrow="Testimonials"
          title="Loved by the businesses we build for"
          description="We measure success by the results and relationships we create. Here's what our clients have to say."
        />

        <StaggerGroup className="mt-14 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {testimonials.slice(0, 3).map((testimonial) => (
            <StaggerItem key={testimonial.name}>
              <TestimonialCard testimonial={testimonial} />
            </StaggerItem>
          ))}
        </StaggerGroup>

        <div className="mt-12 flex justify-center">
          <CtaButton href="/testimonials" variant="outline" size="lg">
            Read More Testimonials
            <ArrowRight className="transition-transform group-hover:translate-x-1" />
          </CtaButton>
        </div>
      </div>
    </section>
  )
}
