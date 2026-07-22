import { Quote, Star } from 'lucide-react'

import type { Testimonial } from '@/lib/site'
import { cn } from '@/lib/utils'

export function TestimonialCard({
  testimonial,
  className,
}: {
  testimonial: Testimonial
  className?: string
}) {
  const initials = testimonial.name
    .split(' ')
    .map((n) => n[0])
    .join('')
    .slice(0, 2)

  return (
    <figure
      className={cn(
        'flex h-full flex-col rounded-2xl border border-border bg-card p-7 transition-all duration-300 hover:-translate-y-1 hover:border-gold/30 hover:shadow-xl hover:shadow-black/20',
        className,
      )}
    >
      <div className="flex items-center justify-between">
        <div className="flex" aria-label={`${testimonial.rating} out of 5 stars`}>
          {Array.from({ length: 5 }).map((_, i) => (
            <Star
              key={i}
              className={cn(
                'size-4',
                i < testimonial.rating
                  ? 'fill-gold text-gold'
                  : 'text-muted-foreground/40',
              )}
            />
          ))}
        </div>
        <Quote className="size-7 text-gold/25" aria-hidden="true" />
      </div>

      <blockquote className="mt-5 flex-1 text-pretty leading-relaxed text-foreground/90">
        &ldquo;{testimonial.quote}&rdquo;
      </blockquote>

      <figcaption className="mt-6 flex items-center gap-3 border-t border-border pt-5">
        <span className="grid size-11 shrink-0 place-items-center rounded-full border border-gold/25 bg-gold/10 font-display text-sm font-semibold text-gold">
          {initials}
        </span>
        <span className="flex flex-col">
          <span className="font-semibold">{testimonial.name}</span>
          <span className="text-sm text-muted-foreground">
            {testimonial.role}, {testimonial.company}
          </span>
        </span>
      </figcaption>
    </figure>
  )
}
