import Image from 'next/image'
import Link from 'next/link'
import { ArrowUpRight } from 'lucide-react'

import type { PortfolioProject } from '@/lib/portfolio'
import { Badge } from '@/components/ui/badge'

export function PortfolioCard({ project }: { project: PortfolioProject }) {
  return (
    <Link
      href={project.href}
      className="group flex h-full flex-col overflow-hidden rounded-2xl border border-border bg-card transition-all duration-300 hover:-translate-y-1.5 hover:border-gold/30 hover:shadow-2xl hover:shadow-black/30"
    >
      <div className="relative aspect-16/10 overflow-hidden">
        <Image
          src={project.image}
          alt={`${project.name} website design preview`}
          fill
          sizes="(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw"
          className="object-cover transition-transform duration-500 group-hover:scale-105"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-background/80 via-transparent to-transparent" />
        <div className="absolute right-4 top-4 grid size-10 place-items-center rounded-full border border-gold/30 bg-background/70 text-gold opacity-0 backdrop-blur-md transition-all duration-300 group-hover:opacity-100">
          <ArrowUpRight className="size-5" />
        </div>
      </div>

      <div className="flex flex-1 flex-col p-6">
        <Badge variant="outline" className="w-fit">
          {project.industry}
        </Badge>
        <h3 className="font-display mt-3 text-xl font-semibold transition-colors group-hover:text-gold">
          {project.name}
        </h3>
        <p className="mt-2 flex-1 text-sm leading-relaxed text-muted-foreground">
          {project.description}
        </p>
        <div className="mt-5 flex flex-wrap gap-2">
          {project.technologies.map((tech) => (
            <span
              key={tech}
              className="rounded-md bg-secondary px-2 py-1 text-xs text-secondary-foreground"
            >
              {tech}
            </span>
          ))}
        </div>
      </div>
    </Link>
  )
}
