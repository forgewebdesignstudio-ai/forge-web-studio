'use client'

import { motion } from 'motion/react'
import { ChevronDown } from 'lucide-react'

import { processSteps } from '@/lib/site'

export function ProcessFlow() {
  return (
    <div className="mx-auto max-w-3xl">
      {processSteps.map((step, i) => (
        <div key={step.step}>
          <motion.article
            initial={{ opacity: 0, y: 28 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-80px' }}
            transition={{ duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
            className="group flex items-start gap-5 rounded-2xl border border-border bg-card p-6 transition-all duration-300 hover:-translate-y-1 hover:border-gold/30 hover:shadow-xl hover:shadow-black/20 sm:gap-6 sm:p-8"
          >
            <div className="flex flex-col items-center gap-3">
              <span className="grid size-14 place-items-center rounded-2xl border border-gold/25 bg-gold/10 text-gold transition-colors group-hover:bg-gold/20">
                <step.icon className="size-6" />
              </span>
              <span className="font-mono text-xs font-medium tracking-widest text-muted-foreground">
                {String(step.step).padStart(2, '0')}
              </span>
            </div>
            <div className="pt-1">
              <h3 className="font-display text-xl font-semibold sm:text-2xl">
                {step.title}
              </h3>
              <p className="mt-2 leading-relaxed text-muted-foreground">
                {step.description}
              </p>
            </div>
          </motion.article>

          {i < processSteps.length - 1 ? (
            <div className="flex justify-center py-3" aria-hidden="true">
              <motion.span
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: 0.15 }}
                className="text-gold/50"
              >
                <ChevronDown className="size-6" />
              </motion.span>
            </div>
          ) : null}
        </div>
      ))}
    </div>
  )
}
