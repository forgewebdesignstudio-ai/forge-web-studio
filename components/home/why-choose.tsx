import { whyChoose } from '@/lib/site'
import { SectionHeading } from '@/components/ui/section-heading'
import { StaggerGroup, StaggerItem } from '@/components/motion/reveal'

export function WhyChoose() {
  return (
    <section className="mx-auto max-w-7xl px-4 py-20 sm:px-6 md:py-28 lg:px-8">
      <SectionHeading
        eyebrow="Why Forge"
        title="Everything a premium brand demands"
        description="We combine taste, strategy, and engineering to deliver websites that look extraordinary and drive real business results."
      />

      <StaggerGroup className="mt-14 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
        {whyChoose.map((item) => (
          <StaggerItem key={item.title}>
            <div className="group h-full rounded-2xl border border-border bg-card p-7 transition-all duration-300 hover:-translate-y-1 hover:border-gold/30 hover:shadow-xl hover:shadow-black/20">
              <div className="grid size-12 place-items-center rounded-xl border border-gold/25 bg-gold/10 text-gold transition-colors group-hover:bg-gold/20">
                <item.icon className="size-6" />
              </div>
              <h3 className="font-display mt-5 text-xl font-semibold">
                {item.title}
              </h3>
              <p className="mt-2.5 leading-relaxed text-muted-foreground">
                {item.description}
              </p>
            </div>
          </StaggerItem>
        ))}
      </StaggerGroup>
    </section>
  )
}
