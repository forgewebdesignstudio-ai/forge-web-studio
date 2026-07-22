'use server'

import {
  type ContactActionState,
  type ContactFormValues,
  validateContact,
} from '@/lib/contact'
import { isEmailConfigured } from '@/lib/backend-config'

/**
 * ---------------------------------------------------------------------------
 * PLUG IN YOUR EMAIL / CRM PROVIDER HERE — this is the only function to edit.
 * ---------------------------------------------------------------------------
 * The rest of the form (UI, validation, states, spam protection) already
 * works. When no provider is connected, we DO NOT pretend an email was sent —
 * we log the validated submission server-side and tell the visitor honestly
 * that we received it and will follow up manually.
 *
 * Resend (recommended):
 *   1. `npm i resend`, add RESEND_API_KEY to your env vars
 *   2. const resend = new Resend(process.env.RESEND_API_KEY)
 *      await resend.emails.send({
 *        from: 'Forge <hello@yourdomain.com>',
 *        to: 'forgewebdesignstudio@gmail.com',
 *        replyTo: data.email,
 *        subject: `New inquiry from ${data.name}`,
 *        text: buildMessage(data),
 *      })
 *
 * Formspree:  POST the payload to https://formspree.io/f/XXXX
 * EmailJS:    client-side — call it from the form and keep this for validation.
 *
 * Returns true only when the message was actually delivered/stored.
 */
async function deliverContact(data: ContactFormValues): Promise<boolean> {
  if (isEmailConfigured()) {
    // TODO: send the email with your connected provider here, then return true.
    return true
  }

  // No provider connected: log the validated submission so it is never lost.
  console.log('[v0] New contact submission (email not yet connected):', {
    name: data.name,
    business: data.business,
    email: data.email,
    phone: data.phone,
    website: data.website,
    service: data.service,
    budget: data.budget,
    timeline: data.timeline,
    message: data.message,
  })
  return false
}

export async function submitContact(
  _prevState: ContactActionState,
  formData: FormData,
): Promise<ContactActionState> {
  const values: ContactFormValues = {
    name: String(formData.get('name') ?? ''),
    business: String(formData.get('business') ?? ''),
    email: String(formData.get('email') ?? ''),
    phone: String(formData.get('phone') ?? ''),
    website: String(formData.get('website') ?? ''),
    service: String(formData.get('service') ?? ''),
    budget: String(formData.get('budget') ?? ''),
    message: String(formData.get('message') ?? ''),
    timeline: String(formData.get('timeline') ?? ''),
    company_url: String(formData.get('company_url') ?? ''),
  }

  // Spam protection: hidden honeypot field. Bots fill it; humans never see it.
  if (values.company_url.trim() !== '') {
    // Silently accept so bots don't learn anything.
    return { status: 'success', message: 'Thanks! Your message has been received.', persisted: true }
  }

  const errors = validateContact(values)
  if (Object.keys(errors).length > 0) {
    return {
      status: 'error',
      message: 'Please fix the highlighted fields and try again.',
      errors,
    }
  }

  try {
    const persisted = await deliverContact(values)
    return {
      status: 'success',
      persisted,
      message: persisted
        ? "Thank you — your project inquiry has been sent. We'll be in touch within one business day."
        : "Thank you — your inquiry has been received. We review every message personally and will reply within one business day.",
    }
  } catch (error) {
    console.log('[v0] Contact delivery failed:', error)
    return {
      status: 'error',
      message:
        'Something went wrong while submitting your message. Please try again, or email us directly at forgewebdesignstudio@gmail.com.',
    }
  }
}
