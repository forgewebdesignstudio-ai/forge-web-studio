import type { LucideIcon } from 'lucide-react'
import {
  Award,
  Building2,
  Compass,
  Gauge,
  Globe,
  HeartHandshake,
  LayoutTemplate,
  LifeBuoy,
  MonitorSmartphone,
  PenTool,
  RefreshCw,
  Rocket,
  Search,
  Server,
  ShieldCheck,
  Sparkles,
  Store,
  Users,
  Utensils,
  Wrench,
} from 'lucide-react'

export const siteConfig = {
  name: 'Forge Web Studio',
  shortName: 'Forge',
  tagline: 'Premium websites forged for ambitious businesses.',
  email: 'forgewebdesignstudio@gmail.com',
  phone: '770-925-5249',
  location: 'Remote — Serving clients nationwide',
}

export const mainNav: { label: string; href: string }[] = [
  { label: 'Home', href: '/' },
  { label: 'About', href: '/about' },
  { label: 'Services', href: '/services' },
  { label: 'Portfolio', href: '/portfolio' },
  { label: 'Process', href: '/process' },
  { label: 'Testimonials', href: '/testimonials' },
  { label: 'FAQ', href: '/faq' },
]

export interface ServiceItem {
  slug: string
  title: string
  icon: LucideIcon
  description: string
  benefits: string[]
  comingSoon?: boolean
}

export const services: ServiceItem[] = [
  {
    slug: 'website-design',
    title: 'Website Design',
    icon: PenTool,
    description:
      'Bespoke, conversion-focused websites designed around your brand and built to make an unforgettable first impression.',
    benefits: [
      'Custom design tailored to your brand',
      'Conversion-first layouts',
      'Mobile-first & responsive',
    ],
  },
  {
    slug: 'website-redesign',
    title: 'Website Redesign',
    icon: RefreshCw,
    description:
      'Transform an outdated site into a modern, high-performing asset without losing the equity you have already built.',
    benefits: [
      'Modernized visual identity',
      'Improved performance & SEO',
      'Zero-downtime migration',
    ],
  },
  {
    slug: 'landing-pages',
    title: 'Landing Pages',
    icon: LayoutTemplate,
    description:
      'Focused, high-converting landing pages engineered for campaigns, launches, and paid traffic.',
    benefits: [
      'Built to convert visitors',
      'A/B-test ready structure',
      'Fast load times',
    ],
  },
  {
    slug: 'small-business-websites',
    title: 'Small Business Websites',
    icon: Store,
    description:
      'Affordable, professional websites that help local and small businesses compete and win online.',
    benefits: [
      'Professional presence',
      'Easy to update',
      'Local SEO foundations',
    ],
  },
  {
    slug: 'restaurant-websites',
    title: 'Restaurant Websites',
    icon: Utensils,
    description:
      'Appetizing, elegant websites with menus, reservations, and ordering built right in.',
    benefits: [
      'Digital menus & galleries',
      'Reservation-ready',
      'Delivery & ordering links',
    ],
  },
  {
    slug: 'contractor-websites',
    title: 'Contractor Websites',
    icon: Building2,
    description:
      'Trust-building websites for contractors and trades that turn visitors into booked jobs.',
    benefits: [
      'Lead-generating design',
      'Service area & project galleries',
      'Quote request forms',
    ],
  },
  {
    slug: 'portfolio-websites',
    title: 'Portfolio Websites',
    icon: MonitorSmartphone,
    description:
      'Striking portfolio sites that showcase your work and elevate your personal or studio brand.',
    benefits: [
      'Gallery-first layouts',
      'Case study templates',
      'Personal branding focus',
    ],
  },
  {
    slug: 'hosting-assistance',
    title: 'Hosting Assistance',
    icon: Server,
    description:
      'Guidance and hands-on help getting your site live on fast, reliable, secure hosting.',
    benefits: [
      'Provider recommendations',
      'Domain & DNS setup',
      'SSL & deployment',
    ],
  },
  {
    slug: 'maintenance-plans',
    title: 'Maintenance Plans',
    icon: Wrench,
    description:
      'Ongoing updates, backups, monitoring, and peace of mind so your site always performs.',
    benefits: ['Regular updates', 'Backups & monitoring', 'Priority support'],
    comingSoon: true,
  },
  {
    slug: 'seo',
    title: 'SEO',
    icon: Search,
    description:
      'Technical and content SEO to help ambitious businesses rank higher and grow organic traffic.',
    benefits: ['Keyword strategy', 'On-page optimization', 'Performance SEO'],
    comingSoon: true,
  },
]

export interface ProcessStep {
  step: number
  title: string
  icon: LucideIcon
  description: string
}

export const processSteps: ProcessStep[] = [
  {
    step: 1,
    title: 'Discovery',
    icon: Compass,
    description:
      'We learn your business, goals, and audience to define what success looks like before we design a thing.',
  },
  {
    step: 2,
    title: 'Planning',
    icon: LayoutTemplate,
    description:
      'We map sitemap, content, and strategy — creating a clear blueprint for your entire project.',
  },
  {
    step: 3,
    title: 'Design',
    icon: PenTool,
    description:
      'We craft a premium, on-brand visual design and refine every detail until it feels unmistakably you.',
  },
  {
    step: 4,
    title: 'Development',
    icon: Rocket,
    description:
      'We engineer your site with modern, fast, accessible technology built to scale with your business.',
  },
  {
    step: 5,
    title: 'Revision',
    icon: RefreshCw,
    description:
      'We iterate together, polishing content and interactions until everything is exactly right.',
  },
  {
    step: 6,
    title: 'Launch',
    icon: Globe,
    description:
      'We handle deployment, domains, and testing for a smooth, confident go-live moment.',
  },
  {
    step: 7,
    title: 'Support',
    icon: LifeBuoy,
    description:
      'We stay in your corner with ongoing support and maintenance so your site keeps performing.',
  },
]

export interface Testimonial {
  name: string
  role: string
  company: string
  quote: string
  rating: number
}

export const testimonials: Testimonial[] = [
  {
    name: 'Marcus Whitfield',
    role: 'Founder',
    company: 'Whitfield & Co. Advisory',
    rating: 5,
    quote:
      'Forge delivered a website that finally matches the caliber of our firm. The design is elegant, and inquiries from qualified clients have noticeably increased.',
  },
  {
    name: 'Elena Vasquez',
    role: 'Owner',
    company: 'Vasquez Landscape Design',
    rating: 5,
    quote:
      'From the first call, the process felt effortless. They understood our vision immediately and translated it into something genuinely premium.',
  },
  {
    name: 'David Chen',
    role: 'Managing Partner',
    company: 'Meridian Construction Group',
    rating: 5,
    quote:
      'Our old site embarrassed us. The new one wins bids. Fast, professional, and the attention to detail is unmatched.',
  },
  {
    name: 'Priya Nair',
    role: 'Marketing Director',
    company: 'Aster Wellness Studio',
    rating: 5,
    quote:
      'The team is responsive, thoughtful, and clearly cares about quality. Our booking rate climbed within the first month of launch.',
  },
  {
    name: 'James Holloway',
    role: 'Executive Chef & Owner',
    company: 'Oak & Ember',
    rating: 5,
    quote:
      'They captured the warmth of our restaurant perfectly. Reservations through the site have become a real part of our business.',
  },
  {
    name: 'Sarah Bennett',
    role: 'Principal',
    company: 'Bennett Creative',
    rating: 5,
    quote:
      'A rare studio that combines taste with technical excellence. Working with Forge felt like having a true partner, not a vendor.',
  },
]

export interface FaqItem {
  question: string
  answer: string
}

export const faqs: FaqItem[] = [
  {
    question: 'How much does a website cost?',
    answer:
      'Every project is scoped individually, but most custom small business websites start in the low thousands, while landing pages start lower and multi-page premium builds scale from there. After a short discovery call, we provide a fixed, transparent quote — no surprises.',
  },
  {
    question: 'How long does a project take?',
    answer:
      'A typical landing page takes 1–2 weeks, while a full custom website usually takes 3–6 weeks depending on scope, content readiness, and revision rounds. We share a clear timeline before we begin.',
  },
  {
    question: 'Do you provide hosting?',
    answer:
      'We do not lock you into proprietary hosting. Instead, we help you set up fast, reliable, industry-standard hosting that you own and control, and we can manage deployment for you.',
  },
  {
    question: 'Do I own my domain and website?',
    answer:
      'Absolutely. You retain full ownership of your domain, content, and website files. We build on transparent, standard technology so you are never held hostage by your agency.',
  },
  {
    question: 'Can you help with SEO?',
    answer:
      'Yes. Every site we build includes strong technical SEO foundations. Dedicated ongoing SEO services are coming soon for clients who want to actively grow organic traffic.',
  },
  {
    question: 'Do you offer ongoing maintenance?',
    answer:
      'Maintenance plans are launching soon and will include updates, backups, monitoring, and priority support. In the meantime, we offer support on request and never leave you stranded after launch.',
  },
  {
    question: 'What is your revision policy?',
    answer:
      'Revisions are built into our process. Each project includes multiple structured revision rounds so we can refine the design and content together until you are genuinely thrilled.',
  },
  {
    question: 'How do payments work?',
    answer:
      'We typically split projects into a deposit to begin and a final payment before launch, with milestones for larger builds. We will soon support secure online payments and automatic invoicing.',
  },
  {
    question: 'Will my website work on mobile?',
    answer:
      'Every website we build is designed mobile-first and rigorously tested across phones, tablets, and desktops so it looks flawless on any screen.',
  },
  {
    question: 'Do you write the content for my site?',
    answer:
      'We can guide your content strategy, refine your existing copy, and structure everything for clarity and conversion. Full copywriting can be added to any project.',
  },
  {
    question: 'What if I already have a website?',
    answer:
      'We love redesigns. We preserve what works, modernize the rest, and migrate everything carefully so you keep your SEO equity and launch with zero downtime.',
  },
  {
    question: 'What technology do you build with?',
    answer:
      'We build on modern, fast, secure, and widely supported technology. That means excellent performance, strong security, easy scalability, and no obscure lock-in.',
  },
  {
    question: 'Can you integrate booking, payments, or other tools?',
    answer:
      'Yes. We regularly integrate reservations, booking, forms, analytics, and payment tools, and we architect every site so new features can be added easily as you grow.',
  },
  {
    question: 'Do you work with businesses outside my area?',
    answer:
      'We work with ambitious businesses nationwide. Our process is fully remote-friendly, with clear communication and a client portal to keep everything organized.',
  },
  {
    question: 'How do we get started?',
    answer:
      'Simply reach out through our contact page. We will schedule a short discovery call, learn about your goals, and send a tailored proposal so you know exactly what to expect.',
  },
]

export interface StatItem {
  value: string
  label: string
}

export const stats: StatItem[] = [
  { value: '50+', label: 'Websites launched' },
  { value: '100%', label: 'Client satisfaction' },
  { value: '2.4x', label: 'Avg. conversion lift' },
  { value: '7-Step', label: 'Proven process' },
]

export interface ValueItem {
  title: string
  description: string
  icon: LucideIcon
}

export const missionStatement =
  'To give ambitious businesses a digital presence that feels as premium as the work they do — websites that earn trust, drive growth, and stand the test of time.'

export const companyStory: string[] = [
  'Forge Web Studio was born from a simple frustration: too many hard-working businesses were being handed cheap, forgettable websites that undersold everything they had built.',
  'We started Forge to change that — to bring the craftsmanship, taste, and technical rigor of a high-end agency to businesses that are serious about growth, without the bloated overhead or the endless runaround.',
  'Today, we partner with founders, owners, and operators across industries to design and build websites that look and perform like the industry leaders they are. Every project is treated like a flagship.',
]

export const coreValues: ValueItem[] = [
  {
    title: 'Craftsmanship',
    description:
      'We sweat the details others ignore. Typography, spacing, motion, and performance are all deliberate.',
    icon: Award,
  },
  {
    title: 'Integrity',
    description:
      'Transparent pricing, honest timelines, and clear communication. You always know where things stand.',
    icon: ShieldCheck,
  },
  {
    title: 'Partnership',
    description:
      'We win when you win. We invest in understanding your business as if it were our own.',
    icon: HeartHandshake,
  },
  {
    title: 'Ambition',
    description:
      'We build for where you are going, not just where you are — architecture that scales with you.',
    icon: Rocket,
  },
]

export interface TimelineItem {
  year: string
  title: string
  description: string
}

export const companyTimeline: TimelineItem[] = [
  {
    year: '2021',
    title: 'The Forge is lit',
    description:
      'Forge Web Studio is founded with a mission to bring agency-grade design to ambitious businesses.',
  },
  {
    year: '2022',
    title: 'Refining the craft',
    description:
      'We develop our signature 7-step process, delivering premium sites with predictable, repeatable quality.',
  },
  {
    year: '2023',
    title: 'Trusted by more industries',
    description:
      'From restaurants to contractors to advisory firms, our portfolio grows across dozens of sectors.',
  },
  {
    year: '2024',
    title: 'Building the platform',
    description:
      'We launch our client portal and begin expanding into maintenance, SEO, and full-service partnerships.',
  },
]

export interface WhyChooseItem {
  title: string
  description: string
  icon: LucideIcon
}

export const whyChoose: WhyChooseItem[] = [
  {
    title: 'Premium by Default',
    description:
      'Every pixel is crafted to the standard of a flagship brand. No templates, no shortcuts, no compromise.',
    icon: Sparkles,
  },
  {
    title: 'Built to Convert',
    description:
      'Beautiful is only the beginning. We engineer layouts and messaging that turn visitors into customers.',
    icon: Gauge,
  },
  {
    title: 'Fast & Reliable',
    description:
      'Modern architecture means blazing performance, rock-solid security, and sites that scale effortlessly.',
    icon: ShieldCheck,
  },
  {
    title: 'True Partnership',
    description:
      'We are in your corner before, during, and long after launch — an extension of your team, not a vendor.',
    icon: HeartHandshake,
  },
  {
    title: 'Craftsmanship',
    description:
      'Obsessive attention to detail on typography, spacing, and interaction that separates good from unforgettable.',
    icon: Award,
  },
  {
    title: 'Client-First Process',
    description:
      'A transparent, structured process with a dedicated portal so you always know exactly where things stand.',
    icon: Users,
  },
]
