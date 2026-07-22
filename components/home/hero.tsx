'use client'

import { motion } from 'motion/react'
import { ArrowRight, Star } from 'lucide-react'

import { CtaButton } from '@/components/ui/cta-button'

export function Hero() {
  return (
    <section className="relative overflow-hidden">
      {/* Animated background */}
      <div aria-hidden="true" className="pointer-events-none absolute inset-0 -z-10">
        <div className="absolute inset-0 bg-[linear-gradient(to_right,color-mix(in_oklch,var(--foreground)_4%,transparent)_1px,transparent_1px),linear-gradient(to_bottom,color-mix(in_oklch,var(--foreground)_4%,transparent)_1px,transparent_1px)] bg-[size:64px_64px] [mask-image:radial-gradient(ellipse_at_center,black_20%,transparent_72%)]" />
        <motion.div
          className="absolute -top-24 left-1/2 size-[42rem] -translate-x-1/2 rounded-full bg-gold/12 blur-[130px]"
          animate={{ opacity: [0.5, 0.8, 0.5], scale: [1, 1.08, 1] }}
          transition={{ duration: 8, repeat: Number.POSITIVE_INFINITY, ease: 'easeInOut' }}
        />
        <motion.div
          className="absolute top-1/3 -left-20 size-[26rem] rounded-full bg-gold/8 blur-[120px]"
          animate={{ opacity: [0.3, 0.6, 0.3], y: [0, 30, 0] }}
          transition={{ duration: 10, repeat: Number.POSITIVE_INFINITY, ease: 'easeInOut' }}
        />
      </div>

      <div className="mx-auto flex max-w-5xl flex-col items-center px-4 pt-24 pb-20 text-center sm:px-6 md:pt-32 md:pb-28 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
          className="inline-flex items-center gap-2 rounded-full border border-gold/25 bg-gold/5 px-4 py-1.5 text-sm font-medium text-gold"
        >
          <span className="flex" aria-hidden="true">
            {Array.from({ length: 5 }).map((_, i) => (
              <Star key={i} className="size-3.5 fill-gold text-gold" />
            ))}
          </span>
          Trusted by ambitious businesses
        </motion.div>

        <motion.h1
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.08, ease: [0.22, 1, 0.36, 1] }}
          className="font-display mt-7 text-balance text-4xl font-bold tracking-tight sm:text-6xl md:text-7xl"
        >
          Premium websites{' '}
          <span className="text-gold-gradient">forged</span> for ambitious
          businesses
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.16, ease: [0.22, 1, 0.36, 1] }}
          className="mt-6 max-w-2xl text-pretty text-lg leading-relaxed text-muted-foreground md:text-xl"
        >
          We design and build high-converting, luxury websites that make your
          business look and perform like the industry leader it deserves to be.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.24, ease: [0.22, 1, 0.36, 1] }}
          className="mt-10 flex flex-col items-center gap-3 sm:flex-row"
        >
          <CtaButton href="/start" size="lg">
            Start Your Project
            <ArrowRight className="transition-transform group-hover:translate-x-1" />
          </CtaButton>
          <CtaButton href="/portfolio" variant="outline" size="lg">
            Explore Our Work
          </CtaButton>
        </motion.div>

        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.7, delay: 0.35 }}
          className="mt-6 text-sm text-muted-foreground"
        >
          Free discovery call · Fixed transparent pricing · No obligation
        </motion.p>
      </div>
    </section>
  )
}
