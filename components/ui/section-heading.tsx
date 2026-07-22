import { cn } from '@/lib/utils'
import { Reveal } from '@/components/motion/reveal'

interface SectionHeadingProps {
  eyebrow?: string
  title: string
  description?: string
  align?: 'left' | 'center'
  className?: string
}

export function SectionHeading({
  eyebrow,
  title,
  description,
  align = 'center',
  className,
}: SectionHeadingProps) {
  return (
    <div
      className={cn(
        'flex flex-col gap-4',
        align === 'center' ? 'items-center text-center' : 'items-start',
        className,
      )}
    >
      {eyebrow ? (
        <Reveal>
          <span className="inline-flex items-center gap-2 rounded-full border border-gold/25 bg-gold/5 px-3 py-1 text-xs font-medium tracking-wide text-gold uppercase">
            <span className="size-1.5 rounded-full bg-gold" aria-hidden="true" />
            {eyebrow}
          </span>
        </Reveal>
      ) : null}
      <Reveal delay={0.05}>
        <h2 className="font-display max-w-2xl text-balance text-3xl font-bold tracking-tight sm:text-4xl md:text-5xl">
          {title}
        </h2>
      </Reveal>
      {description ? (
        <Reveal delay={0.1}>
          <p
            className={cn(
              'max-w-2xl text-pretty leading-relaxed text-muted-foreground md:text-lg',
              align === 'center' && 'mx-auto',
            )}
          >
            {description}
          </p>
        </Reveal>
      ) : null}
    </div>
  )
}
