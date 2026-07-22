import { Check } from 'lucide-react'

import type { ServiceItem } from '@/lib/site'
import { cn } from '@/lib/utils'
import { Badge } from '@/components/ui/badge'
import { CtaButton } from '@/components/ui/cta-button'

export function ServiceCard({
  service,
  detailed = false,
}: {
  service: ServiceItem
  detailed?: boolean
}) {
  const Icon = service.icon

  return (
    <div
      className={cn(
        'group relative flex h-full flex-col rounded-2xl border border-border bg-card p-7 transition-all duration-300 hover:-translate-y-1 hover:border-gold/30 hover:shadow-xl hover:shadow-black/20',
        service.comingSoon && 'opacity-90',
      )}
    >
      <div className="flex items-start justify-between">
        <div className="grid size-12 place-items-center rounded-xl border border-gold/25 bg-gold/10 text-gold transition-colors group-hover:bg-gold/20">
          <Icon className="size-6" />
        </div>
        {service.comingSoon ? <Badge variant="gold">Coming Soon</Badge> : null}
      </div>

      <h3 className="font-display mt-5 text-xl font-semibold">
        {service.title}
      </h3>
      <p className="mt-2.5 leading-relaxed text-muted-foreground">
        {service.description}
      </p>

      {detailed ? (
        <>
          <ul className="mt-5 space-y-2.5">
            {service.benefits.map((benefit) => (
              <li key={benefit} className="flex items-start gap-2.5 text-sm">
                <span className="mt-0.5 grid size-5 shrink-0 place-items-center rounded-full bg-gold/15 text-gold">
                  <Check className="size-3" strokeWidth={3} />
                </span>
                <span className="text-foreground/90">{benefit}</span>
              </li>
            ))}
          </ul>
          <div className="mt-7 pt-2">
            <CtaButton
              href="/contact"
              variant="outline"
              size="sm"
              className="w-full"
            >
              {service.comingSoon ? 'Join the Waitlist' : 'Request This Service'}
            </CtaButton>
          </div>
        </>
      ) : null}
    </div>
  )
}
