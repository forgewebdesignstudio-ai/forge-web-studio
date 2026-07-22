'use client'

import { useState } from 'react'
import { AnimatePresence, motion } from 'motion/react'
import { Plus } from 'lucide-react'

import type { FaqItem } from '@/lib/site'

export function FaqAccordion({ items }: { items: FaqItem[] }) {
  const [open, setOpen] = useState<number | null>(0)

  return (
    <ul className="mx-auto max-w-3xl divide-y divide-border overflow-hidden rounded-2xl border border-border bg-card">
      {items.map((item, i) => {
        const isOpen = open === i
        return (
          <li key={item.question}>
            <h3>
              <button
                type="button"
                onClick={() => setOpen(isOpen ? null : i)}
                aria-expanded={isOpen}
                className="flex w-full items-center justify-between gap-4 px-6 py-5 text-left transition-colors hover:bg-muted/40"
              >
                <span className="text-base font-medium text-foreground sm:text-lg">
                  {item.question}
                </span>
                <span
                  className={`grid size-8 shrink-0 place-items-center rounded-full border border-border text-gold transition-all duration-300 ${
                    isOpen ? 'rotate-45 border-gold/40 bg-gold/10' : ''
                  }`}
                  aria-hidden="true"
                >
                  <Plus className="size-4" />
                </span>
              </button>
            </h3>
            <AnimatePresence initial={false}>
              {isOpen ? (
                <motion.div
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: 'auto', opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                  transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
                  className="overflow-hidden"
                >
                  <p className="px-6 pb-6 leading-relaxed text-muted-foreground">
                    {item.answer}
                  </p>
                </motion.div>
              ) : null}
            </AnimatePresence>
          </li>
        )
      })}
    </ul>
  )
}
