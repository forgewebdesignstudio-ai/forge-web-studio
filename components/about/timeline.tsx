'use client'

import { motion } from 'motion/react'

import { companyTimeline } from '@/lib/site'

export function Timeline() {
  return (
    <div className="relative mx-auto max-w-3xl">
      {/* vertical line */}
      <div
        className="absolute left-4 top-2 bottom-2 w-px bg-gradient-to-b from-primary/60 via-border to-transparent md:left-1/2 md:-translate-x-1/2"
        aria-hidden="true"
      />

      <ul className="space-y-10">
        {companyTimeline.map((item, i) => (
          <motion.li
            key={item.year}
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-80px' }}
            transition={{ duration: 0.5, delay: i * 0.08 }}
            className={`relative flex flex-col gap-3 pl-12 md:w-1/2 md:pl-0 ${
              i % 2 === 0
                ? 'md:ml-auto md:pl-12 md:text-left'
                : 'md:mr-auto md:pr-12 md:text-right'
            }`}
          >
            <span
              className={`absolute left-[9px] top-1.5 size-3.5 rounded-full border-2 border-primary bg-background md:left-auto ${
                i % 2 === 0 ? 'md:-left-[7px]' : 'md:-right-[7px]'
              }`}
              aria-hidden="true"
            />
            <span className="font-mono text-sm font-medium text-primary">
              {item.year}
            </span>
            <h3 className="text-xl font-semibold text-foreground">
              {item.title}
            </h3>
            <p className="leading-relaxed text-muted-foreground">
              {item.description}
            </p>
          </motion.li>
        ))}
      </ul>
    </div>
  )
}
