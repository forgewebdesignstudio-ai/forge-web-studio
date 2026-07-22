import { stats } from '@/lib/site'
import { StaggerGroup, StaggerItem } from '@/components/motion/reveal'

export function Stats() {
  return (
    <section className="border-y border-border bg-card/40">
      <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
        <StaggerGroup className="grid grid-cols-2 gap-8 md:grid-cols-4">
          {stats.map((stat) => (
            <StaggerItem
              key={stat.label}
              className="flex flex-col items-center gap-1 text-center"
            >
              <span className="font-display text-4xl font-bold text-gold md:text-5xl">
                {stat.value}
              </span>
              <span className="text-sm text-muted-foreground md:text-base">
                {stat.label}
              </span>
            </StaggerItem>
          ))}
        </StaggerGroup>
      </div>
    </section>
  )
}
