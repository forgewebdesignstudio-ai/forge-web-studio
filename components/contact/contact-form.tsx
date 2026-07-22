'use client'

import { useActionState, useEffect, useRef, useState } from 'react'
import { CheckCircle2, Loader2, Send, AlertCircle } from 'lucide-react'

import {
  budgetOptions,
  type ContactErrors,
  defaultContactValues,
  initialContactState,
  serviceOptions,
  timelineOptions,
  validateContact,
} from '@/lib/contact'
import { submitContact } from '@/app/actions/contact'
import { cn } from '@/lib/utils'
import {
  FieldError,
  Input,
  Label,
  Select,
  Textarea,
} from '@/components/ui/form-field'

export function ContactForm() {
  const [state, formAction, isPending] = useActionState(
    submitContact,
    initialContactState,
  )
  const [values, setValues] = useState(defaultContactValues)
  const [clientErrors, setClientErrors] = useState<ContactErrors>({})
  const formRef = useRef<HTMLFormElement>(null)
  const successRef = useRef<HTMLDivElement>(null)

  // Merge server-returned errors with live client-side errors.
  const errors: ContactErrors = { ...clientErrors, ...(state.errors ?? {}) }

  useEffect(() => {
    if (state.status === 'success') {
      formRef.current?.reset()
      setValues(defaultContactValues)
      setClientErrors({})
      successRef.current?.focus()
    }
  }, [state.status])

  function update<K extends keyof typeof values>(key: K, value: string) {
    setValues((prev) => ({ ...prev, [key]: value }))
    // Clear a field's error as the user corrects it.
    setClientErrors((prev) => {
      if (!prev[key]) return prev
      const next = { ...prev }
      delete next[key]
      return next
    })
  }

  function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    const found = validateContact(values)
    if (Object.keys(found).length > 0) {
      e.preventDefault()
      setClientErrors(found)
      // Focus first invalid field.
      const first = Object.keys(found)[0]
      formRef.current?.querySelector<HTMLElement>(`[name="${first}"]`)?.focus()
    }
  }

  if (state.status === 'success') {
    return (
      <div
        ref={successRef}
        tabIndex={-1}
        className="flex flex-col items-center rounded-3xl border border-gold/25 bg-card p-10 text-center outline-none md:p-14"
      >
        <span className="grid size-16 place-items-center rounded-full bg-gold/10 text-gold">
          <CheckCircle2 className="size-8" />
        </span>
        <h3 className="font-display mt-6 text-2xl font-semibold">
          Inquiry received
        </h3>
        <p className="mt-3 max-w-md leading-relaxed text-muted-foreground">
          {state.message}
        </p>
        {state.persisted === false ? (
          <p className="mt-4 max-w-md rounded-xl border border-border bg-muted/40 px-4 py-3 text-xs leading-relaxed text-muted-foreground">
            Automated email delivery isn&apos;t connected yet, so your details
            were securely logged for our team. You can also reach us directly at{' '}
            <a
              href="mailto:forgewebdesignstudio@gmail.com"
              className="font-medium text-foreground underline underline-offset-2"
            >
              forgewebdesignstudio@gmail.com
            </a>
            .
          </p>
        ) : null}
        <button
          type="button"
          onClick={() => window.location.reload()}
          className="mt-8 rounded-full border border-border px-6 py-2.5 text-sm font-medium text-foreground transition-colors hover:border-gold/50 hover:bg-gold/5"
        >
          Send another message
        </button>
      </div>
    )
  }

  return (
    <form
      ref={formRef}
      action={formAction}
      onSubmit={handleSubmit}
      noValidate
      className="rounded-3xl border border-border bg-card p-6 sm:p-8 md:p-10"
    >
      {/* Global error banner */}
      {state.status === 'error' && !state.errors ? (
        <div
          role="alert"
          className="mb-6 flex items-start gap-3 rounded-xl border border-destructive/30 bg-destructive/10 px-4 py-3 text-sm text-destructive"
        >
          <AlertCircle className="mt-0.5 size-4 shrink-0" />
          <span>{state.message}</span>
        </div>
      ) : null}

      <div className="grid gap-5 sm:grid-cols-2">
        <div>
          <Label htmlFor="name" required>
            Name
          </Label>
          <Input
            id="name"
            name="name"
            autoComplete="name"
            placeholder="Jane Doe"
            value={values.name}
            onChange={(e) => update('name', e.target.value)}
            error={!!errors.name}
            aria-invalid={!!errors.name}
            aria-describedby={errors.name ? 'name-error' : undefined}
          />
          <FieldError id="name-error" message={errors.name} />
        </div>

        <div>
          <Label htmlFor="business">Business Name</Label>
          <Input
            id="business"
            name="business"
            autoComplete="organization"
            placeholder="Acme Co."
            value={values.business}
            onChange={(e) => update('business', e.target.value)}
          />
        </div>

        <div>
          <Label htmlFor="email" required>
            Email
          </Label>
          <Input
            id="email"
            name="email"
            type="email"
            inputMode="email"
            autoComplete="email"
            placeholder="jane@acme.com"
            value={values.email}
            onChange={(e) => update('email', e.target.value)}
            error={!!errors.email}
            aria-invalid={!!errors.email}
            aria-describedby={errors.email ? 'email-error' : undefined}
          />
          <FieldError id="email-error" message={errors.email} />
        </div>

        <div>
          <Label htmlFor="phone">Phone Number</Label>
          <Input
            id="phone"
            name="phone"
            type="tel"
            inputMode="tel"
            autoComplete="tel"
            placeholder="(555) 000-0000"
            value={values.phone}
            onChange={(e) => update('phone', e.target.value)}
            error={!!errors.phone}
            aria-invalid={!!errors.phone}
            aria-describedby={errors.phone ? 'phone-error' : undefined}
          />
          <FieldError id="phone-error" message={errors.phone} />
        </div>

        <div className="sm:col-span-2">
          <Label htmlFor="website">Current Website (optional)</Label>
          <Input
            id="website"
            name="website"
            type="url"
            inputMode="url"
            autoComplete="url"
            placeholder="https://yourwebsite.com"
            value={values.website}
            onChange={(e) => update('website', e.target.value)}
            error={!!errors.website}
            aria-invalid={!!errors.website}
            aria-describedby={errors.website ? 'website-error' : undefined}
          />
          <FieldError id="website-error" message={errors.website} />
        </div>

        <div>
          <Label htmlFor="service" required>
            Service Needed
          </Label>
          <Select
            id="service"
            name="service"
            value={values.service}
            onChange={(e) => update('service', e.target.value)}
            error={!!errors.service}
            aria-invalid={!!errors.service}
            aria-describedby={errors.service ? 'service-error' : undefined}
          >
            <option value="" disabled>
              Select a service
            </option>
            {serviceOptions.map((o) => (
              <option key={o} value={o}>
                {o}
              </option>
            ))}
          </Select>
          <FieldError id="service-error" message={errors.service} />
        </div>

        <div>
          <Label htmlFor="budget">Budget</Label>
          <Select
            id="budget"
            name="budget"
            value={values.budget}
            onChange={(e) => update('budget', e.target.value)}
          >
            <option value="" disabled>
              Select a range
            </option>
            {budgetOptions.map((o) => (
              <option key={o} value={o}>
                {o}
              </option>
            ))}
          </Select>
        </div>

        <div className="sm:col-span-2">
          <Label htmlFor="timeline">Timeline</Label>
          <Select
            id="timeline"
            name="timeline"
            value={values.timeline}
            onChange={(e) => update('timeline', e.target.value)}
          >
            <option value="" disabled>
              When do you want to launch?
            </option>
            {timelineOptions.map((o) => (
              <option key={o} value={o}>
                {o}
              </option>
            ))}
          </Select>
        </div>

        <div className="sm:col-span-2">
          <Label htmlFor="message" required>
            Project Description
          </Label>
          <Textarea
            id="message"
            name="message"
            rows={5}
            placeholder="Tell us about your business, your goals, and what you're looking for..."
            value={values.message}
            onChange={(e) => update('message', e.target.value)}
            error={!!errors.message}
            aria-invalid={!!errors.message}
            aria-describedby={errors.message ? 'message-error' : undefined}
          />
          <FieldError id="message-error" message={errors.message} />
        </div>
      </div>

      {/* Honeypot: hidden from users, catches bots. */}
      <div className="absolute left-[-9999px]" aria-hidden="true">
        <label htmlFor="company_url">Leave this field empty</label>
        <input
          id="company_url"
          name="company_url"
          type="text"
          tabIndex={-1}
          autoComplete="off"
          value={values.company_url}
          onChange={(e) => update('company_url', e.target.value)}
        />
      </div>

      <button
        type="submit"
        disabled={isPending}
        className={cn(
          'group mt-8 inline-flex h-13 w-full items-center justify-center gap-2 rounded-full bg-gold px-8 text-base font-medium text-gold-foreground shadow-lg shadow-gold/20 transition-all duration-300 hover:-translate-y-0.5 hover:shadow-xl hover:shadow-gold/30 focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background disabled:translate-y-0 disabled:cursor-not-allowed disabled:opacity-70',
        )}
      >
        {isPending ? (
          <>
            <Loader2 className="size-5 animate-spin" />
            Sending...
          </>
        ) : (
          <>
            Send Project Inquiry
            <Send className="size-4 transition-transform group-hover:translate-x-0.5" />
          </>
        )}
      </button>
      <p className="mt-4 text-center text-xs text-muted-foreground">
        We respect your privacy. Your details are only used to respond to your
        inquiry.
      </p>
    </form>
  )
}
