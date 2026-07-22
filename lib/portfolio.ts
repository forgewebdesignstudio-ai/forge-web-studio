export interface PortfolioProject {
  slug: string
  name: string
  industry: string
  tagline: string
  description: string
  technologies: string[]
  href: string
  image: string
  accent: string
}

export const portfolioProjects: PortfolioProject[] = [
  {
    slug: 'greenscape',
    name: 'GreenScape Landscaping',
    industry: 'Landscaping & Outdoor Design',
    tagline: 'Luxury landscapes, expertly crafted.',
    description:
      'A refined, nature-forward website for a premium landscaping company — showcasing services, project galleries, and easy quote requests.',
    technologies: ['Next.js', 'Responsive Design', 'Gallery', 'Lead Forms'],
    href: '/demos/greenscape',
    image: '/portfolio/greenscape-cover.png',
    accent: 'green',
  },
  {
    slug: 'precision-auto',
    name: 'Precision Auto Detailing',
    industry: 'Automotive Detailing',
    tagline: 'Showroom shine, every time.',
    description:
      'A sleek, high-performance site for a luxury auto detailing studio featuring service packages, ceramic coating, and instant booking.',
    technologies: ['Next.js', 'Booking CTA', 'Packages', 'Gallery'],
    href: '/demos/precision-auto',
    image: '/portfolio/precision-auto-cover.png',
    accent: 'blue',
  },
  {
    slug: 'oak-ember',
    name: 'Oak & Ember',
    industry: 'Fine Dining Steakhouse',
    tagline: 'Fire-forged flavor in an elegant setting.',
    description:
      'A warm, atmospheric website for an upscale steakhouse with an elegant menu, reservations, and a rich visual gallery.',
    technologies: ['Next.js', 'Menu', 'Reservations', 'Gallery'],
    href: '/demos/oak-ember',
    image: '/portfolio/oak-ember-cover.png',
    accent: 'amber',
  },
]
