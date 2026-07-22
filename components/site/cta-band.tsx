import { ArrowRight } from 'lucide-react'

import { Reveal } from '@/components/motion/reveal'
import { CtaButton } from '@/components/ui/cta-button'

interface CtaBandProps {
  title?: string
  description?: string
}

export function CtaBand({
  title = 'Ready to forge something exceptional?',
  description = "Let's turn your vision into a premium website that wins clients and earns trust. Tell us about your project and we'll send a tailored proposal.",
}: CtaBandProps) {
  return (
    <section className="px-4 py-20 sm:px-6 md:py-28 lg:px-8">
      <Reveal>
        <div className="relative mx-auto max-w-5xl overflow-hidden rounded-3xl border border-gold/20 bg-card px-6 py-16 text-center md:px-16">
          <div
            aria-hidden="true"
            className="pointer-events-none absolute inset-0 -z-10"
          >
            <div className="absolute -top-24 left-1/2 size-[30rem] -translate-x-1/2 rounded-full bg-gold/12 blur-[100px]" />
          </div>
          <h2 className="font-display mx-auto max-w-2xl text-balance text-3xl font-bold tracking-tight sm:text-4xl md:text-5xl">
            {title}
          </h2>
          <p className="mx-auto mt-5 max-w-xl text-pretty leading-relaxed text-muted-foreground md:text-lg">
            {description}
          </p>
          <div className="mt-9 flex flex-col items-center justify-center gap-3 sm:flex-row">
            <CtaButton href="/start" size="lg">
              Start Your Project
              <ArrowRight className="transition-transform group-hover:translate-x-1" />
            </CtaButton>
            <CtaButton href="/portfolio" variant="outline" size="lg">
              View Our Work
            </CtaButton>
          </div>
        </div>
      </Reveal>
    </section>
  )
}
