import type { LucideIcon } from 'lucide-react'
import {
  Building2,
  LayoutList,
  Search,
  Sparkles,
  Target,
  Wallet,
} from 'lucide-react'

export type FieldType =
  | 'text'
  | 'email'
  | 'tel'
  | 'url'
  | 'date'
  | 'textarea'
  | 'select'
  | 'checkbox-group'
  | 'file'

export interface Field {
  name: string
  label: string
  type: FieldType
  placeholder?: string
  help?: string
  required?: boolean
  options?: string[]
  multiple?: boolean
  accept?: string
  full?: boolean
}

export interface Step {
  id: string
  title: string
  description: string
  icon: LucideIcon
  fields: Field[]
}

export const onboardingSteps: Step[] = [
  {
    id: 'business',
    title: 'Business Information',
    description: 'Tell us the essentials about your business.',
    icon: Building2,
    fields: [
      { name: 'businessName', label: 'Business name', type: 'text', required: true, placeholder: 'Your business name' },
      { name: 'ownerName', label: 'Owner / contact name', type: 'text', required: true, placeholder: 'Your full name' },
      { name: 'email', label: 'Email', type: 'email', required: true, placeholder: 'you@business.com' },
      { name: 'phone', label: 'Phone number', type: 'tel', required: true, placeholder: '(555) 000-0000' },
      { name: 'address', label: 'Business address', type: 'text', full: true, placeholder: 'Street, City, State ZIP' },
      { name: 'hours', label: 'Business hours', type: 'text', placeholder: 'Mon–Fri, 9am–6pm' },
      {
        name: 'industry',
        label: 'Industry',
        type: 'select',
        options: [
          'Professional Services',
          'Restaurant / Food',
          'Home Services / Contractor',
          'Retail / E-commerce',
          'Health & Wellness',
          'Real Estate',
          'Automotive',
          'Creative / Portfolio',
          'Other',
        ],
      },
      { name: 'existingWebsite', label: 'Existing website (if any)', type: 'url', placeholder: 'https://' },
    ],
  },
  {
    id: 'goals',
    title: 'Project Goals',
    description: 'Help us understand what success looks like.',
    icon: Target,
    fields: [
      {
        name: 'primaryGoal',
        label: 'What is the primary goal of the website?',
        type: 'textarea',
        required: true,
        full: true,
        placeholder: 'e.g. Generate more qualified leads and look premium next to competitors.',
      },
      { name: 'targetAudience', label: 'Target audience', type: 'textarea', full: true, placeholder: 'Who are your ideal customers?' },
      {
        name: 'desiredStyle',
        label: 'Desired style',
        type: 'checkbox-group',
        full: true,
        options: ['Modern', 'Minimal', 'Luxury', 'Bold', 'Classic', 'Playful', 'Corporate', 'Warm'],
      },
      {
        name: 'brandPersonality',
        label: 'Brand personality',
        type: 'checkbox-group',
        full: true,
        options: ['Professional', 'Trustworthy', 'Friendly', 'Innovative', 'Elegant', 'Approachable', 'Premium', 'Energetic'],
      },
      { name: 'competitors', label: 'Competitors', type: 'textarea', placeholder: 'List a few competitor websites.' },
      { name: 'inspiration', label: 'Inspiration websites', type: 'textarea', placeholder: 'Sites whose look you admire.' },
    ],
  },
  {
    id: 'branding',
    title: 'Branding',
    description: 'Share any existing brand assets you have.',
    icon: Sparkles,
    fields: [
      { name: 'logo', label: 'Logo upload', type: 'file', accept: 'image/*,.svg,.ai,.pdf', help: 'PNG, SVG, or vector preferred.' },
      { name: 'brandColors', label: 'Brand colors', type: 'text', placeholder: 'e.g. #0A0A0A, #C9A24B' },
      { name: 'fonts', label: 'Preferred fonts', type: 'text', placeholder: 'e.g. Inter, Playfair Display' },
      { name: 'images', label: 'Images', type: 'file', multiple: true, accept: 'image/*', help: 'Photos we can use on the site.' },
      { name: 'videos', label: 'Videos', type: 'file', multiple: true, accept: 'video/*', help: 'Optional brand or promo videos.' },
      { name: 'brandFiles', label: 'Existing branding files', type: 'file', multiple: true, help: 'Brand guidelines, assets, etc.' },
    ],
  },
  {
    id: 'content',
    title: 'Website Content',
    description: 'What pages and content should we include?',
    icon: LayoutList,
    fields: [
      {
        name: 'pagesNeeded',
        label: 'Pages needed',
        type: 'checkbox-group',
        full: true,
        options: ['Home', 'About', 'Services', 'Products', 'Gallery', 'Testimonials', 'FAQ', 'Blog', 'Team', 'Contact'],
      },
      { name: 'services', label: 'Services', type: 'textarea', placeholder: 'List the services you offer.' },
      { name: 'products', label: 'Products', type: 'textarea', placeholder: 'List key products, if any.' },
      { name: 'aboutUs', label: 'About us', type: 'textarea', full: true, placeholder: 'Your story, mission, and what makes you different.' },
      { name: 'team', label: 'Team members', type: 'textarea', placeholder: 'Names, roles, and short bios.' },
      { name: 'testimonials', label: 'Testimonials', type: 'textarea', placeholder: 'Reviews or quotes we can feature.' },
      { name: 'faq', label: 'FAQ', type: 'textarea', full: true, placeholder: 'Common questions and answers.' },
    ],
  },
  {
    id: 'features',
    title: 'Features',
    description: 'Select the functionality your website needs.',
    icon: LayoutList,
    fields: [
      {
        name: 'features',
        label: 'Desired features',
        type: 'checkbox-group',
        full: true,
        options: [
          'Contact form',
          'Booking / scheduling',
          'Online payments',
          'E-commerce store',
          'Customer accounts',
          'Newsletter signup',
          'Live chat',
          'Maps / directions',
          'Reviews',
          'Social media integration',
        ],
      },
      { name: 'featureNotes', label: 'Anything specific about these features?', type: 'textarea', full: true, placeholder: 'Optional details about how features should work.' },
    ],
  },
  {
    id: 'seo',
    title: 'SEO',
    description: 'Help us plan for search visibility.',
    icon: Search,
    fields: [
      { name: 'targetCities', label: 'Target cities / areas', type: 'textarea', placeholder: 'Where do your customers come from?' },
      { name: 'targetKeywords', label: 'Target keywords', type: 'textarea', placeholder: 'Phrases people search to find you.' },
      {
        name: 'googleBusiness',
        label: 'Google Business Profile',
        type: 'select',
        options: ['Yes, I have one', 'No, I need one', 'Not sure'],
      },
      { name: 'existingDomain', label: 'Existing domain', type: 'text', placeholder: 'yourbusiness.com' },
      {
        name: 'hosting',
        label: 'Hosting',
        type: 'select',
        options: ['I have hosting', 'I need hosting help', 'Not sure yet'],
      },
    ],
  },
  {
    id: 'preferences',
    title: 'Project Preferences',
    description: 'Final details to help us scope your project.',
    icon: Wallet,
    fields: [
      {
        name: 'budget',
        label: 'Budget',
        type: 'select',
        required: true,
        options: ['Under $2,500', '$2,500 – $5,000', '$5,000 – $10,000', '$10,000 – $20,000', '$20,000+', 'Not sure yet'],
      },
      { name: 'launchDate', label: 'Desired launch date', type: 'date' },
      { name: 'specialRequests', label: 'Special requests', type: 'textarea', full: true, placeholder: 'Anything specific you want us to know?' },
      { name: 'additionalNotes', label: 'Additional notes', type: 'textarea', full: true, placeholder: 'Anything else to share.' },
    ],
  },
]

export const ONBOARDING_STORAGE_KEY = 'forge-onboarding-draft'

/** Flatten every field so the review step can look up labels by field name. */
export const fieldLabels: Record<string, string> = onboardingSteps.reduce(
  (acc, step) => {
    for (const f of step.fields) acc[f.name] = f.label
    return acc
  },
  {} as Record<string, string>,
)
