import Image from 'next/image'
import { ArrowRight, Check, Mail, MapPin, Phone } from 'lucide-react'

import type { DemoConfig } from '@/lib/demos'
import { DemoFooter, DemoNav, DemoRibbon } from '@/components/demos/demo-chrome'
import {
  DemoEyebrow,
  DemoHeading,
  DemoReveal,
  DemoReviewCard,
} from '@/components/demos/demo-ui'

/**
 * Shared template for service-business demos (GreenScape, Precision Auto).
 * The restaurant demo has its own layout.
 */
export function ServiceDemo({ config }: { config: DemoConfig }) {
  return (
    <div data-demo={config.slug} className="min-h-screen">
      <DemoRibbon name={config.name} />
      <DemoNav config={config} />

      {/* Hero */}
      <section id="home" className="relative overflow-hidden">
        <div className="absolute inset-0">
          <Image
            src={config.heroImage}
            alt={`${config.name} showcase`}
            fill
            priority
            className="object-cover"
          />
          <div
            className="absolute inset-0"
            style={{
              background:
                'linear-gradient(180deg, color-mix(in oklab, var(--demo-bg) 55%, transparent) 0%, color-mix(in oklab, var(--demo-bg) 78%, transparent) 55%, var(--demo-bg) 100%)',
            }}
          />
        </div>
        <div className="relative mx-auto flex min-h-[86vh] max-w-7xl flex-col justify-center px-4 py-24 sm:px-6 lg:px-8">
          <DemoReveal className="max-w-2xl">
            <DemoEyebrow>{config.tagline}</DemoEyebrow>
            <h1
              className="mt-4 text-balance text-4xl font-bold leading-tight tracking-tight sm:text-5xl md:text-6xl"
              style={{ color: 'var(--demo-text)' }}
            >
              {config.heroHeadline}
            </h1>
            <p className="mt-6 max-w-xl text-lg leading-relaxed demo-muted">
              {config.heroSub}
            </p>
            <div className="mt-9 flex flex-col gap-3 sm:flex-row">
              <a
                href="#contact"
                className="demo-bg-accent inline-flex items-center justify-center gap-2 rounded-full px-7 py-3.5 text-base font-semibold transition-transform hover:-translate-y-0.5"
              >
                {config.primaryCta}
                <ArrowRight className="size-4" />
              </a>
              <a
                href="#services"
                className="demo-border inline-flex items-center justify-center rounded-full border px-7 py-3.5 text-base font-medium transition-colors hover:bg-white/5"
                style={{ color: 'var(--demo-text)' }}
              >
                View Services
              </a>
            </div>
          </DemoReveal>
        </div>
      </section>

      {/* About */}
      <section id="about" className="px-4 py-20 sm:px-6 md:py-28 lg:px-8">
        <div className="mx-auto grid max-w-7xl items-center gap-12 lg:grid-cols-2">
          <DemoReveal>
            <div className="demo-border overflow-hidden rounded-3xl border">
              <Image
                src={config.galleryImage}
                alt={`${config.name} work sample`}
                width={720}
                height={540}
                className="h-full w-full object-cover"
              />
            </div>
          </DemoReveal>
          <DemoReveal delay={0.1}>
            <DemoEyebrow>About Us</DemoEyebrow>
            <DemoHeading>Crafted with care, built to last</DemoHeading>
            <div className="mt-6 flex flex-col gap-4">
              {config.about.map((p) => (
                <p key={p.slice(0, 20)} className="leading-relaxed demo-muted">
                  {p}
                </p>
              ))}
            </div>
          </DemoReveal>
        </div>
      </section>

      {/* Services / Packages */}
      <section
        id="services"
        className="demo-surface demo-border border-y px-4 py-20 sm:px-6 md:py-28 lg:px-8"
      >
        <div className="mx-auto max-w-7xl">
          <DemoReveal className="text-center">
            <DemoEyebrow>What We Offer</DemoEyebrow>
            <DemoHeading>Our services</DemoHeading>
          </DemoReveal>
          <div className="mt-14 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {config.services.map((service, i) => (
              <DemoReveal key={service.title} delay={i * 0.05}>
                <div
                  className="group h-full rounded-2xl border p-7 transition-transform hover:-translate-y-1"
                  style={{
                    backgroundColor: 'var(--demo-bg)',
                    borderColor: 'var(--demo-border)',
                  }}
                >
                  <span
                    className="grid size-11 place-items-center rounded-xl text-sm font-bold"
                    style={{
                      backgroundColor:
                        'color-mix(in oklab, var(--demo-accent) 18%, transparent)',
                      color: 'var(--demo-accent-strong)',
                    }}
                  >
                    {String(i + 1).padStart(2, '0')}
                  </span>
                  <h3
                    className="mt-5 text-xl font-semibold"
                    style={{ color: 'var(--demo-text)' }}
                  >
                    {service.title}
                  </h3>
                  <p className="mt-2 text-sm leading-relaxed demo-muted">
                    {service.description}
                  </p>
                </div>
              </DemoReveal>
            ))}
          </div>
        </div>
      </section>

      {/* Anchor targets referenced by nav (Precision Auto) */}
      <span id="packages" className="sr-only" />
      <span id="ceramic" className="sr-only" />
      <span id="paint" className="sr-only" />

      {/* Gallery */}
      <section id="gallery" className="px-4 py-20 sm:px-6 md:py-28 lg:px-8">
        <div className="mx-auto max-w-7xl">
          <DemoReveal className="text-center">
            <DemoEyebrow>Our Work</DemoEyebrow>
            <DemoHeading>Recent projects</DemoHeading>
          </DemoReveal>
          <div className="mt-14 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {[config.heroImage, config.galleryImage, config.heroImage, config.galleryImage, config.heroImage, config.galleryImage].map(
              (src, i) => (
                <DemoReveal key={i} delay={(i % 3) * 0.06}>
                  <div className="demo-border group relative aspect-4/3 overflow-hidden rounded-2xl border">
                    <Image
                      src={src}
                      alt={`${config.name} gallery image ${i + 1}`}
                      fill
                      sizes="(min-width: 1024px) 33vw, 50vw"
                      className="object-cover transition-transform duration-500 group-hover:scale-105"
                    />
                  </div>
                </DemoReveal>
              ),
            )}
          </div>
        </div>
      </section>

      {/* Reviews */}
      <section
        id="reviews"
        className="demo-surface demo-border border-y px-4 py-20 sm:px-6 md:py-28 lg:px-8"
      >
        <div className="mx-auto max-w-7xl">
          <DemoReveal className="text-center">
            <DemoEyebrow>Testimonials</DemoEyebrow>
            <DemoHeading>What clients say</DemoHeading>
          </DemoReveal>
          <div className="mt-14 grid gap-6 md:grid-cols-3">
            {config.reviews.map((review, i) => (
              <DemoReveal key={review.name} delay={i * 0.06}>
                <DemoReviewCard review={review} />
              </DemoReveal>
            ))}
          </div>
        </div>
      </section>

      {/* Contact */}
      <section id="contact" className="px-4 py-20 sm:px-6 md:py-28 lg:px-8">
        <div className="mx-auto max-w-3xl text-center">
          <DemoReveal>
            <DemoEyebrow>Get in Touch</DemoEyebrow>
            <DemoHeading>{config.primaryCta}</DemoHeading>
            <p className="mx-auto mt-5 max-w-xl leading-relaxed demo-muted">
              Reach out today and our team will get back to you within one
              business day. We can&apos;t wait to work with you.
            </p>
          </DemoReveal>

          <DemoReveal delay={0.1}>
            <div className="mt-10 grid gap-4 sm:grid-cols-3">
              {[
                { icon: Phone, label: config.phone },
                { icon: Mail, label: config.email },
                { icon: MapPin, label: config.address },
              ].map((item) => (
                <div
                  key={item.label}
                  className="demo-surface demo-border flex flex-col items-center gap-2 rounded-2xl border p-6"
                >
                  <item.icon
                    className="size-5"
                    style={{ color: 'var(--demo-accent-strong)' }}
                  />
                  <span className="text-sm demo-muted">{item.label}</span>
                </div>
              ))}
            </div>
          </DemoReveal>

          <DemoReveal delay={0.15}>
            <a
              href={`tel:${config.phone.replace(/[^\d+]/g, '')}`}
              className="demo-bg-accent mt-9 inline-flex items-center justify-center gap-2 rounded-full px-8 py-4 text-base font-semibold transition-transform hover:-translate-y-0.5"
            >
              <Phone className="size-4" />
              Call {config.phone}
            </a>
          </DemoReveal>
        </div>
      </section>

      <DemoFooter config={config} />
    </div>
  )
}
