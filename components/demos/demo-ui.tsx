'use client'

import type { ReactNode } from 'react'
import { motion } from 'motion/react'
import { Star } from 'lucide-react'

import type { DemoReview } from '@/lib/demos'

export function DemoReveal({
  children,
  className,
  delay = 0,
}: {
  children: ReactNode
  className?: string
  delay?: number
}) {
  return (
    <motion.div
      className={className}
      initial={{ opacity: 0, y: 26 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-70px' }}
      transition={{ duration: 0.55, delay, ease: [0.22, 1, 0.36, 1] }}
    >
      {children}
    </motion.div>
  )
}

export function DemoEyebrow({ children }: { children: ReactNode }) {
  return (
    <span className="demo-accent text-xs font-semibold uppercase tracking-[0.22em]">
      {children}
    </span>
  )
}

export function DemoHeading({ children }: { children: ReactNode }) {
  return (
    <h2
      className="mt-3 text-balance text-3xl font-bold tracking-tight sm:text-4xl md:text-5xl"
      style={{ color: 'var(--demo-text)' }}
    >
      {children}
    </h2>
  )
}

export function DemoReviewCard({ review }: { review: DemoReview }) {
  return (
    <div className="demo-surface demo-border flex h-full flex-col rounded-2xl border p-6">
      <div className="flex gap-1" aria-label={`${review.rating} out of 5 stars`}>
        {Array.from({ length: review.rating }).map((_, i) => (
          <Star
            key={i}
            className="size-4 fill-current"
            style={{ color: 'var(--demo-accent-strong)' }}
          />
        ))}
      </div>
      <p className="mt-4 flex-1 leading-relaxed" style={{ color: 'var(--demo-text)' }}>
        &ldquo;{review.quote}&rdquo;
      </p>
      <div className="mt-5">
        <p className="font-semibold" style={{ color: 'var(--demo-text)' }}>
          {review.name}
        </p>
        <p className="text-sm demo-muted">{review.location}</p>
      </div>
    </div>
  )
}
