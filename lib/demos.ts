/** Content models for the three demo client websites. */

export interface DemoService {
  title: string
  description: string
}

export interface DemoReview {
  name: string
  location: string
  rating: number
  quote: string
}

export interface DemoNavLink {
  label: string
  hash: string
}

export interface DemoConfig {
  slug: string
  name: string
  tagline: string
  heroHeadline: string
  heroSub: string
  heroImage: string
  galleryImage: string
  phone: string
  email: string
  address: string
  primaryCta: string
  nav: DemoNavLink[]
  about: string[]
  services: DemoService[]
  reviews: DemoReview[]
}

const greenscape: DemoConfig = {
  slug: 'greenscape',
  name: 'GreenScape',
  tagline: 'Luxury Landscaping',
  heroHeadline: 'Outdoor spaces, expertly forged.',
  heroSub:
    'Award-winning landscape design, installation, and care for discerning homeowners who expect nothing less than exceptional.',
  heroImage: '/demos/greenscape/hero.png',
  galleryImage: '/demos/greenscape/gallery-1.png',
  phone: '(555) 240-1180',
  email: 'hello@greenscape.example',
  address: '128 Meadow Lane, Willow Creek',
  primaryCta: 'Request a Free Estimate',
  nav: [
    { label: 'Home', hash: '#home' },
    { label: 'About', hash: '#about' },
    { label: 'Services', hash: '#services' },
    { label: 'Gallery', hash: '#gallery' },
    { label: 'Reviews', hash: '#reviews' },
    { label: 'Contact', hash: '#contact' },
  ],
  about: [
    'For over fifteen years, GreenScape has transformed ordinary yards into extraordinary outdoor living spaces. Our team blends horticultural expertise with refined design sensibility.',
    'From concept to maintenance, we treat every property as a signature project — crafting landscapes that mature beautifully and elevate your home for years to come.',
  ],
  services: [
    { title: 'Lawn Care', description: 'Meticulous mowing, fertilization, and seasonal treatments for a flawless, healthy lawn.' },
    { title: 'Mulching', description: 'Premium mulch installation that protects beds, retains moisture, and looks pristine.' },
    { title: 'Tree Removal', description: 'Safe, professional tree and stump removal by certified, fully insured crews.' },
    { title: 'Hardscaping', description: 'Patios, walkways, and retaining walls built with craftsmanship and durability.' },
    { title: 'Landscape Design', description: 'Bespoke design plans tailored to your property, style, and long-term vision.' },
    { title: 'Outdoor Lighting', description: 'Elegant landscape lighting that extends the beauty of your grounds into the evening.' },
  ],
  reviews: [
    { name: 'Katherine M.', location: 'Willow Creek', rating: 5, quote: 'GreenScape completely reimagined our backyard. It feels like a private resort now.' },
    { name: 'Robert D.', location: 'Fairview', rating: 5, quote: 'Professional, punctual, and genuinely talented. The hardscaping is flawless.' },
    { name: 'Anita P.', location: 'Highland Park', rating: 5, quote: 'Our lawn has never looked better. The lighting design is the finishing touch.' },
  ],
}

const precisionAuto: DemoConfig = {
  slug: 'precision-auto',
  name: 'Precision Auto Detailing',
  tagline: 'Luxury Auto Detailing',
  heroHeadline: 'Showroom shine, every single time.',
  heroSub:
    'Ceramic coatings, paint correction, and meticulous detailing for owners who treat their vehicles like the investments they are.',
  heroImage: '/demos/precision-auto/hero.png',
  galleryImage: '/demos/precision-auto/gallery-1.png',
  phone: '(555) 704-2255',
  email: 'book@precisionauto.example',
  address: '44 Chrome Ave, Downtown',
  primaryCta: 'Book Your Detail',
  nav: [
    { label: 'Home', hash: '#home' },
    { label: 'Packages', hash: '#packages' },
    { label: 'Ceramic Coating', hash: '#ceramic' },
    { label: 'Paint Correction', hash: '#paint' },
    { label: 'Gallery', hash: '#gallery' },
    { label: 'Reviews', hash: '#reviews' },
    { label: 'Contact', hash: '#contact' },
  ],
  about: [
    'Precision Auto Detailing is where obsession meets craftsmanship. Every vehicle receives a bespoke process tailored to its paint, finish, and condition.',
    'Our certified technicians use only premium products and controlled studio conditions to deliver results that turn heads and preserve value.',
  ],
  services: [
    { title: 'Signature Detail', description: 'A complete interior and exterior transformation, restoring that just-bought feeling.' },
    { title: 'Ceramic Coating', description: 'Long-lasting hydrophobic protection with a deep, glossy, showroom finish.' },
    { title: 'Paint Correction', description: 'Multi-stage polishing that removes swirls, scratches, and oxidation.' },
    { title: 'Interior Revival', description: 'Deep cleaning and conditioning of leather, fabric, and every surface.' },
    { title: 'Express Detail', description: 'A refined maintenance wash and refresh to keep your vehicle immaculate.' },
    { title: 'Fleet & Exotic', description: 'Specialized care for exotic vehicles and premium business fleets.' },
  ],
  reviews: [
    { name: 'Marcus T.', location: 'Verified Client', rating: 5, quote: 'My car looks better than the day I bought it. The ceramic coating is unreal.' },
    { name: 'Diana R.', location: 'Verified Client', rating: 5, quote: 'Meticulous attention to detail. Worth every penny for the paint correction.' },
    { name: 'Chris L.', location: 'Verified Client', rating: 5, quote: 'The only shop I trust with my exotic. Flawless results, every time.' },
  ],
}

const oakEmber: DemoConfig = {
  slug: 'oak-ember',
  name: 'Oak & Ember',
  tagline: 'Fine Dining Steakhouse',
  heroHeadline: 'Fire-forged flavor, elegantly served.',
  heroSub:
    'An intimate steakhouse experience where premium cuts, warm ambiance, and impeccable service come together over an open flame.',
  heroImage: '/demos/oak-ember/hero.png',
  galleryImage: '/demos/oak-ember/gallery-1.png',
  phone: '(555) 918-3400',
  email: 'reserve@oakandember.example',
  address: '9 Hearth Street, The Grove',
  primaryCta: 'Reserve a Table',
  nav: [
    { label: 'Home', hash: '#home' },
    { label: 'Menu', hash: '#menu' },
    { label: 'Reservations', hash: '#reservations' },
    { label: 'Gallery', hash: '#gallery' },
    { label: 'About', hash: '#about' },
    { label: 'Contact', hash: '#contact' },
  ],
  about: [
    'Oak & Ember was born from a love of fire and flavor. Our kitchen centers on a custom wood-fired grill, coaxing depth and character from every cut.',
    'With a curated wine list, warm candlelit dining room, and service that anticipates your every need, we craft evenings worth remembering.',
  ],
  services: [],
  reviews: [
    { name: 'Jonathan H.', location: 'Local Guide', rating: 5, quote: 'The finest steak in the city, served in a room that feels effortlessly elegant.' },
    { name: 'Sofia G.', location: 'Diner', rating: 5, quote: 'From the first course to the last pour, an absolutely impeccable evening.' },
    { name: 'Marcus W.', location: 'Diner', rating: 5, quote: 'Warm, intimate, and unforgettable. Our new anniversary tradition.' },
  ],
}

export interface DemoMenuItem {
  name: string
  description: string
  price: string
}
export interface DemoMenuSection {
  category: string
  items: DemoMenuItem[]
}

export const oakEmberMenu: DemoMenuSection[] = [
  {
    category: 'To Begin',
    items: [
      { name: 'Charred Octopus', description: 'Smoked paprika, fingerling potato, lemon aioli', price: '19' },
      { name: 'Ember Bone Marrow', description: 'Roasted marrow, herb gremolata, grilled sourdough', price: '17' },
      { name: 'Heirloom Wedge', description: 'Blue cheese, candied bacon, buttermilk dressing', price: '14' },
    ],
  },
  {
    category: 'From the Fire',
    items: [
      { name: 'Dry-Aged Ribeye', description: '16oz, 40-day aged, bordelaise, smoked salt', price: '64' },
      { name: 'Filet Mignon', description: '8oz center cut, red wine reduction', price: '52' },
      { name: 'Tomahawk for Two', description: '36oz, tableside carving, chimichurri', price: '120' },
      { name: 'Cedar Salmon', description: 'Wild-caught, charred lemon, dill butter', price: '38' },
    ],
  },
  {
    category: 'To Finish',
    items: [
      { name: 'Smoked Chocolate Torte', description: 'Burnt honey ice cream, cocoa nib', price: '14' },
      { name: 'Ember Crème Brûlée', description: 'Vanilla bean, caramelized sugar', price: '12' },
    ],
  },
]

export const demoConfigs: Record<string, DemoConfig> = {
  greenscape,
  'precision-auto': precisionAuto,
  'oak-ember': oakEmber,
}

export const demoSlugs = Object.keys(demoConfigs)
