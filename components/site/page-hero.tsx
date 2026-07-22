import { Reveal } from '@/components/motion/reveal'

interface PageHeroProps {
  eyebrow: string
  title: string
  description?: string
}

export function PageHero({ eyebrow, title, description }: PageHeroProps) {
  return (
    <section className="relative overflow-hidden border-b border-border">
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 -z-10"
      >
        <div className="absolute -top-32 left-1/2 size-[38rem] -translate-x-1/2 rounded-full bg-gold/10 blur-[120px]" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,transparent_0%,var(--background)_78%)]" />
      </div>
      <div className="mx-auto max-w-4xl px-4 py-20 text-center sm:px-6 md:py-28 lg:px-8">
        <Reveal>
          <span className="inline-flex items-center gap-2 rounded-full border border-gold/25 bg-gold/5 px-3 py-1 text-xs font-medium tracking-wide text-gold uppercase">
            <span className="size-1.5 rounded-full bg-gold" aria-hidden="true" />
            {eyebrow}
          </span>
        </Reveal>
        <Reveal delay={0.06}>
          <h1 className="font-display mt-6 text-balance text-4xl font-bold tracking-tight sm:text-5xl md:text-6xl">
            {title}
          </h1>
        </Reveal>
        {description ? (
          <Reveal delay={0.12}>
            <p className="mx-auto mt-6 max-w-2xl text-pretty text-lg leading-relaxed text-muted-foreground">
              {description}
            </p>
          </Reveal>
        ) : null}
      </div>
    </section>
  )
}
