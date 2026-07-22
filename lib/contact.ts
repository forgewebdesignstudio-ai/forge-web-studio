/**
 * Shared contact-form types, options, and validation.
 *
 * This is intentionally provider-agnostic. The server action in
 * `app/actions/contact.ts` validates with `validateContact` and then hands the
 * clean payload to a single `deliverContact` function, which is the ONLY place
 * you need to touch to plug in EmailJS, Resend, Formspree, or a DB later.
 */

export interface ContactFormValues {
  name: string
  business: string
  email: string
  phone: string
  website: string
  service: string
  budget: string
  message: string
  timeline: string
  /** Honeypot — must remain empty for real humans. */
  company_url: string
}

export const defaultContactValues: ContactFormValues = {
  name: '',
  business: '',
  email: '',
  phone: '',
  website: '',
  service: '',
  budget: '',
  message: '',
  timeline: '',
  company_url: '',
}

export const serviceOptions = [
  'Website Design',
  'Website Redesign',
  'Landing Page',
  'Small Business Website',
  'Restaurant Website',
  'Contractor Website',
  'Portfolio Website',
  'Hosting Assistance',
  'Not sure yet',
] as const

export const budgetOptions = [
  'Under $1,000',
  '$1,000 – $2,500',
  '$2,500 – $5,000',
  '$5,000 – $10,000',
  '$10,000+',
  'Not sure yet',
] as const

export const timelineOptions = [
  'As soon as possible',
  '1 – 2 months',
  '3 – 6 months',
  'Just exploring',
] as const

export type ContactErrors = Partial<Record<keyof ContactFormValues, string>>

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
const PHONE_RE = /^[+()\-\s\d]{7,}$/

/**
 * Pure validation used by BOTH the client (for instant feedback) and the
 * server action (as the source of truth). Returns a map of field -> message.
 */
export function validateContact(values: ContactFormValues): ContactErrors {
  const errors: ContactErrors = {}

  if (!values.name.trim()) {
    errors.name = 'Please enter your name.'
  } else if (values.name.trim().length < 2) {
    errors.name = 'Name looks a little short.'
  }

  if (!values.email.trim()) {
    errors.email = 'Please enter your email.'
  } else if (!EMAIL_RE.test(values.email.trim())) {
    errors.email = 'Please enter a valid email address.'
  }

  if (values.phone.trim() && !PHONE_RE.test(values.phone.trim())) {
    errors.phone = 'Please enter a valid phone number.'
  }

  if (
    values.website.trim() &&
    !/^(https?:\/\/)?[\w-]+(\.[\w-]+)+.*$/.test(values.website.trim())
  ) {
    errors.website = 'Please enter a valid website URL.'
  }

  if (!values.service) errors.service = 'Please select a service.'

  if (!values.message.trim()) {
    errors.message = 'Please tell us about your project.'
  } else if (values.message.trim().length < 20) {
    errors.message = 'A little more detail helps us help you (20+ characters).'
  }

  return errors
}

export interface ContactActionState {
  status: 'idle' | 'success' | 'error'
  message: string
  errors?: ContactErrors
  /**
   * Whether the message was durably delivered (email/DB) vs. only logged
   * server-side because no provider is connected yet. Lets the UI stay honest.
   */
  persisted?: boolean
}

export const initialContactState: ContactActionState = {
  status: 'idle',
  message: '',
}
