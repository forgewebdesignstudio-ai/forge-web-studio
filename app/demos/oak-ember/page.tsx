import type { Metadata } from 'next'
import Image from 'next/image'
import { CalendarClock, Clock, Mail, MapPin, Phone, Utensils } from 'lucide-react'

import { demoConfigs, oakEmberMenu } from '@/lib/demos'
import { DemoFooter, DemoNav, DemoRibbon } from '@/components/demos/demo-chrome'
import {
  DemoEyebrow,
  DemoHeading,
  DemoReveal,
  DemoReviewCard,
} from '@/components/demos/demo-ui'

const config = demoConfigs['oak-ember']

export const metadata: Metadata = {
  title: 'Oak & Ember Steakhouse — Demo by Forge Web Studio',
  description:
    'A demo fine-dining steakhouse website built by Forge Web Studio, featuring a menu, reservations, and gallery.',
}

export default function OakEmberDemo() {
  return (
    <div data-demo={config.slug} className="min-h-screen">
      <DemoRibbon name={config.name} />
      <DemoNav config={config} />

      {/* Hero */}
      <section id="home" className="relative overflow-hidden">
        <div className="absolute inset-0">
          <Image
            src={config.heroImage}
            alt="Oak & Ember dining room"
            fill
            priority
            className="object-cover"
          />
          <div
            className="absolute inset-0"
            style={{
              background:
                'linear-gradient(180deg, color-mix(in oklab, var(--demo-bg) 50%, transparent) 0%, color-mix(in oklab, var(--demo-bg) 80%, transparent) 60%, var(--demo-bg) 100%)',
            }}
          />
        </div>
        <div className="relative mx-auto flex min-h-[88vh] max-w-7xl flex-col items-center justify-center px-4 py-24 text-center sm:px-6 lg:px-8">
          <DemoReveal className="max-w-3xl">
            <DemoEyebrow>{config.tagline}</DemoEyebrow>
            <h1
              className="mt-4 text-balance text-4xl font-bold leading-tight tracking-tight sm:text-6xl md:text-7xl"
              style={{ color: 'var(--demo-text)' }}
            >
              {config.heroHeadline}
            </h1>
            <p className="mx-auto mt-6 max-w-xl text-lg leading-relaxed demo-muted">
              {config.heroSub}
            </p>
            <div className="mt-9 flex flex-col items-center justify-center gap-3 sm:flex-row">
              <a
                href="#reservations"
                className="demo-bg-accent inline-flex items-center justify-center gap-2 rounded-full px-7 py-3.5 text-base font-semibold transition-transform hover:-translate-y-0.5"
              >
                <CalendarClock className="size-4" />
                {config.primaryCta}
              </a>
              <a
                href="#menu"
                className="demo-border inline-flex items-center justify-center gap-2 rounded-full border px-7 py-3.5 text-base font-medium transition-colors hover:bg-white/5"
                style={{ color: 'var(--demo-text)' }}
              >
                <Utensils className="size-4" />
                View Menu
              </a>
            </div>
          </DemoReveal>
        </div>
      </section>

      {/* Menu */}
      <section id="menu" className="px-4 py-20 sm:px-6 md:py-28 lg:px-8">
        <div className="mx-auto max-w-4xl">
          <DemoReveal className="text-center">
            <DemoEyebrow>The Menu</DemoEyebrow>
            <DemoHeading>From the fire</DemoHeading>
          </DemoReveal>

          <div className="mt-14 flex flex-col gap-12">
            {oakEmberMenu.map((section, s) => (
              <DemoReveal key={section.category} delay={s * 0.05}>
                <h3
                  className="demo-border flex items-center gap-4 border-b pb-3 text-sm font-semibold uppercase tracking-[0.22em]"
                  style={{ color: 'var(--demo-accent-strong)' }}
                >
                  {section.category}
                </h3>
                <ul className="mt-6 flex flex-col gap-6">
                  {section.items.map((item) => (
                    <li key={item.name} className="flex items-baseline gap-4">
                      <div className="flex-1">
                        <p
                          className="text-lg font-semibold"
                          style={{ color: 'var(--demo-text)' }}
                        >
                          {item.name}
                        </p>
                        <p className="mt-1 text-sm demo-muted">
                          {item.description}
                        </p>
                      </div>
                      <span
                        className="text-lg font-semibold"
                        style={{ color: 'var(--demo-accent-strong)' }}
                      >
                        ${item.price}
                      </span>
                    </li>
                  ))}
                </ul>
              </DemoReveal>
            ))}
          </div>
        </div>
      </section>

      {/* Reservations */}
      <section
        id="reservations"
        className="demo-surface demo-border border-y px-4 py-20 sm:px-6 md:py-28 lg:px-8"
      >
        <div className="mx-auto grid max-w-6xl items-center gap-12 lg:grid-cols-2">
          <DemoReveal>
            <DemoEyebrow>Reservations</DemoEyebrow>
            <DemoHeading>Reserve your table</DemoHeading>
            <p className="mt-5 leading-relaxed demo-muted">
              We recommend booking in advance, especially for weekend evenings
              and private celebrations. Our team will confirm your reservation
              within the hour.
            </p>
            <ul className="mt-8 flex flex-col gap-4">
              <li className="flex items-center gap-3 demo-muted">
                <Clock className="size-5" style={{ color: 'var(--demo-accent-strong)' }} />
                Tue–Sun · 5:00 PM – 11:00 PM
              </li>
              <li className="flex items-center gap-3 demo-muted">
                <Phone className="size-5" style={{ color: 'var(--demo-accent-strong)' }} />
                {config.phone}
              </li>
              <li className="flex items-center gap-3 demo-muted">
                <MapPin className="size-5" style={{ color: 'var(--demo-accent-strong)' }} />
                {config.address}
              </li>
            </ul>
          </DemoReveal>

          <DemoReveal delay={0.1}>
            <form
              className="rounded-3xl border p-6 sm:p-8"
              style={{ backgroundColor: 'var(--demo-bg)', borderColor: 'var(--demo-border)' }}
            >
              <div className="grid gap-4 sm:grid-cols-2">
                <Field label="Name" placeholder="Your name" />
                <Field label="Phone" placeholder="(555) 000-0000" type="tel" />
                <Field label="Date" type="date" />
                <Field label="Time" type="time" />
                <Field label="Party Size" placeholder="2" type="number" />
                <Field label="Occasion" placeholder="Anniversary" />
              </div>
              <a
                href={`tel:${config.phone.replace(/[^\d+]/g, '')}`}
                className="demo-bg-accent mt-6 flex w-full items-center justify-center gap-2 rounded-full px-6 py-3.5 text-base font-semibold transition-transform hover:-translate-y-0.5"
              >
                <CalendarClock className="size-4" />
                Request Reservation
              </a>
              <p className="mt-3 text-center text-xs demo-muted">
                Demo form — connects to a booking system on a live build.
              </p>
            </form>
          </DemoReveal>
        </div>
      </section>

      {/* Gallery */}
      <section id="gallery" className="px-4 py-20 sm:px-6 md:py-28 lg:px-8">
        <div className="mx-auto max-w-7xl">
          <DemoReveal className="text-center">
            <DemoEyebrow>Gallery</DemoEyebrow>
            <DemoHeading>A taste of the experience</DemoHeading>
          </DemoReveal>
          <div className="mt-14 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {[config.galleryImage, config.heroImage, config.galleryImage, config.heroImage, config.galleryImage, config.heroImage].map(
              (src, i) => (
                <DemoReveal key={i} delay={(i % 3) * 0.06}>
                  <div className="demo-border group relative aspect-4/3 overflow-hidden rounded-2xl border">
                    <Image
                      src={src}
                      alt={`Oak & Ember gallery image ${i + 1}`}
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

      {/* About */}
      <section
        id="about"
        className="demo-surface demo-border border-y px-4 py-20 sm:px-6 md:py-28 lg:px-8"
      >
        <div className="mx-auto max-w-3xl text-center">
          <DemoReveal>
            <DemoEyebrow>Our Story</DemoEyebrow>
            <DemoHeading>Born from fire and flavor</DemoHeading>
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

      {/* Reviews */}
      <section className="px-4 py-20 sm:px-6 md:py-28 lg:px-8">
        <div className="mx-auto max-w-7xl">
          <DemoReveal className="text-center">
            <DemoEyebrow>Guest Reviews</DemoEyebrow>
            <DemoHeading>Loved by our guests</DemoHeading>
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
      <section
        id="contact"
        className="demo-surface demo-border border-t px-4 py-16 text-center sm:px-6 lg:px-8"
      >
        <div className="mx-auto max-w-2xl">
          <DemoReveal>
            <div className="flex flex-col items-center gap-2">
              <Mail className="size-5" style={{ color: 'var(--demo-accent-strong)' }} />
              <p className="demo-muted">{config.email}</p>
              <p className="demo-muted">{config.phone}</p>
              <p className="demo-muted">{config.address}</p>
            </div>
          </DemoReveal>
        </div>
      </section>

      <DemoFooter config={config} />
    </div>
  )
}

function Field({
  label,
  placeholder,
  type = 'text',
}: {
  label: string
  placeholder?: string
  type?: string
}) {
  const id = label.toLowerCase().replace(/\s+/g, '-')
  return (
    <div className={type === 'number' || label === 'Occasion' ? '' : ''}>
      <label
        htmlFor={id}
        className="mb-1.5 block text-xs font-medium uppercase tracking-wide demo-muted"
      >
        {label}
      </label>
      <input
        id={id}
        type={type}
        placeholder={placeholder}
        className="demo-border w-full rounded-xl border bg-transparent px-4 py-3 text-sm outline-none transition-colors focus:border-[color:var(--demo-accent)]"
        style={{ color: 'var(--demo-text)' }}
      />
    </div>
  )
}
