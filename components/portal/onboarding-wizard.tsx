'use client'

import { useEffect, useRef, useState } from 'react'
import Link from 'next/link'
import {
  AlertCircle,
  ArrowLeft,
  ArrowRight,
  Check,
  ClipboardCheck,
  CloudUpload,
  Home,
  Loader2,
  Mail,
  PartyPopper,
  Pencil,
  X,
} from 'lucide-react'

import {
  onboardingSteps,
  ONBOARDING_STORAGE_KEY,
  fieldLabels,
  type Field,
} from '@/lib/onboarding'
import { submitProject } from '@/app/actions/submit-project'
import type { UploadedFileMeta } from '@/lib/submissions'
import { siteConfig } from '@/lib/site'
import { Input, Label, Select, Textarea } from '@/components/ui/form-field'
import { cn } from '@/lib/utils'

type Values = Record<string, string | string[]>
type FileMap = Record<string, UploadedFileMeta[]>

function isEmpty(v: string | string[] | undefined) {
  if (Array.isArray(v)) return v.length === 0
  return !v || v.trim() === ''
}

const REVIEW_STEP = onboardingSteps.length
const totalSteps = onboardingSteps.length + 1

export function OnboardingWizard() {
  const [step, setStep] = useState(0)
  const [values, setValues] = useState<Values>({})
  const [files, setFiles] = useState<FileMap>({})
  const [errors, setErrors] = useState<Record<string, string>>({})
  const [status, setStatus] = useState<'idle' | 'submitting' | 'done' | 'error'>('idle')
  const [savedAt, setSavedAt] = useState<string | null>(null)
  const [reference, setReference] = useState<string | null>(null)
  const [resultMessage, setResultMessage] = useState<string>('')
  const [errorMessage, setErrorMessage] = useState<string>('')
  const loaded = useRef(false)

  // Load any saved draft once on mount (autosave keeps visitors from losing work).
  useEffect(() => {
    try {
      const raw = localStorage.getItem(ONBOARDING_STORAGE_KEY)
      if (raw) setValues(JSON.parse(raw))
    } catch {
      /* ignore malformed drafts */
    }
    loaded.current = true
  }, [])

  // Persist text values to localStorage whenever they change.
  useEffect(() => {
    if (!loaded.current) return
    try {
      localStorage.setItem(ONBOARDING_STORAGE_KEY, JSON.stringify(values))
      setSavedAt(new Date().toLocaleTimeString([], { hour: 'numeric', minute: '2-digit' }))
    } catch {
      /* storage may be unavailable */
    }
  }, [values])

  const isReview = step === REVIEW_STEP
  const current = onboardingSteps[step]
  const progress = Math.round(((step + 1) / totalSteps) * 100)

  function setValue(name: string, value: string | string[]) {
    setValues((v) => ({ ...v, [name]: value }))
    setErrors((e) => {
      if (!e[name]) return e
      const next = { ...e }
      delete next[name]
      return next
    })
  }

  function toggleChoice(name: string, option: string) {
    const cur = (values[name] as string[]) || []
    setValue(name, cur.includes(option) ? cur.filter((o) => o !== option) : [...cur, option])
  }

  function validateStep() {
    if (isReview) return true
    const next: Record<string, string> = {}
    for (const f of current.fields) {
      if (f.required && isEmpty(values[f.name])) {
        next[f.name] = 'This field is required.'
      }
      if (f.type === 'email' && !isEmpty(values[f.name])) {
        const val = values[f.name] as string
        if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(val)) next[f.name] = 'Enter a valid email address.'
      }
    }
    setErrors(next)
    return Object.keys(next).length === 0
  }

  function goNext() {
    if (!validateStep()) {
      const el = document.querySelector('[data-invalid="true"]') as HTMLElement | null
      el?.scrollIntoView({ behavior: 'smooth', block: 'center' })
      return
    }
    setStep((s) => s + 1)
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  function goBack() {
    setStep((s) => Math.max(0, s - 1))
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  async function handleSubmit() {
    setStatus('submitting')
    setErrorMessage('')

    const fileList: UploadedFileMeta[] = Object.values(files).flat()

    try {
      const result = await submitProject({ values, files: fileList })
      if (!result.ok) {
        setErrorMessage(result.message)
        setStatus('error')
        return
      }
      setReference(result.reference)
      setResultMessage(result.message)
      setStatus('done')
      try {
        localStorage.removeItem(ONBOARDING_STORAGE_KEY)
      } catch {
        /* ignore */
      }
    } catch {
      setErrorMessage(
        'We could not reach the server. Please check your connection and try again.',
      )
      setStatus('error')
    }
  }

  if (status === 'done') {
    return (
      <div className="mx-auto max-w-xl rounded-3xl border border-border bg-card p-8 text-center sm:p-10">
        <span className="mx-auto flex size-16 items-center justify-center rounded-full bg-primary/15 text-primary">
          <PartyPopper className="size-8" />
        </span>
        <h2 className="mt-6 font-display text-2xl font-semibold text-foreground">
          Project request submitted
        </h2>
        <p className="mt-3 leading-relaxed text-muted-foreground">{resultMessage}</p>

        {reference ? (
          <p className="mt-4 inline-flex items-center gap-2 rounded-full border border-border bg-background px-4 py-2 text-sm text-foreground">
            <span className="text-muted-foreground">Reference</span>
            <span className="font-mono font-semibold tracking-wide">{reference}</span>
          </p>
        ) : null}

        <div className="mt-8 rounded-2xl border border-border bg-background/50 p-5 text-left">
          <h3 className="text-sm font-semibold text-foreground">What happens next</h3>
          <ol className="mt-3 flex flex-col gap-3 text-sm text-muted-foreground">
            <li className="flex gap-3">
              <span className="mt-0.5 flex size-5 shrink-0 items-center justify-center rounded-full bg-primary/15 text-xs font-semibold text-primary">1</span>
              We personally review your submission and everything you shared.
            </li>
            <li className="flex gap-3">
              <span className="mt-0.5 flex size-5 shrink-0 items-center justify-center rounded-full bg-primary/15 text-xs font-semibold text-primary">2</span>
              If it&apos;s a great fit, we reach out to confirm scope and pricing.
            </li>
            <li className="flex gap-3">
              <span className="mt-0.5 flex size-5 shrink-0 items-center justify-center rounded-full bg-primary/15 text-xs font-semibold text-primary">3</span>
              Once approved, we create your private client portal and send your login.
            </li>
          </ol>
        </div>

        <div className="mt-8 flex flex-col justify-center gap-3 sm:flex-row">
          <Link
            href="/"
            className="inline-flex items-center justify-center gap-2 rounded-full bg-primary px-6 py-3 text-sm font-medium text-primary-foreground transition-opacity hover:opacity-90"
          >
            <Home className="size-4" />
            Back to home
          </Link>
          <a
            href={`mailto:${siteConfig.email}`}
            className="inline-flex items-center justify-center gap-2 rounded-full border border-border px-6 py-3 text-sm font-medium text-foreground transition-colors hover:bg-muted"
          >
            <Mail className="size-4" />
            Email us
          </a>
        </div>
      </div>
    )
  }

  return (
    <div className="grid gap-6 lg:grid-cols-[260px_1fr]">
      {/* Stepper */}
      <aside className="lg:sticky lg:top-24 lg:self-start">
        <div className="rounded-2xl border border-border bg-card p-4">
          <div className="mb-4 flex items-center justify-between">
            <span className="text-xs font-medium uppercase tracking-wide text-muted-foreground">
              Step {step + 1} of {totalSteps}
            </span>
            <span className="text-xs font-semibold text-primary">{progress}%</span>
          </div>
          <div className="mb-5 h-1.5 overflow-hidden rounded-full bg-muted">
            <div
              className="h-full rounded-full bg-primary transition-all duration-500"
              style={{ width: `${progress}%` }}
            />
          </div>
          <ol className="flex flex-col gap-1">
            {onboardingSteps.map((s, i) => {
              const Icon = s.icon
              const done = i < step
              const active = i === step
              return (
                <li key={s.id}>
                  <button
                    type="button"
                    onClick={() => i <= step && setStep(i)}
                    disabled={i > step}
                    className={cn(
                      'flex w-full items-center gap-3 rounded-xl px-3 py-2.5 text-left text-sm transition-colors',
                      active && 'bg-primary/10 text-primary',
                      !active && done && 'text-foreground hover:bg-muted',
                      i > step && 'cursor-not-allowed text-muted-foreground/60',
                    )}
                  >
                    <span
                      className={cn(
                        'flex size-7 shrink-0 items-center justify-center rounded-full border text-xs font-semibold',
                        active && 'border-primary bg-primary text-primary-foreground',
                        done && 'border-primary/40 bg-primary/15 text-primary',
                        i > step && 'border-border',
                      )}
                    >
                      {done ? <Check className="size-4" /> : <Icon className="size-4" />}
                    </span>
                    <span className="flex-1 font-medium">{s.title}</span>
                  </button>
                </li>
              )
            })}
            {/* Review step */}
            <li>
              <button
                type="button"
                onClick={() => step >= REVIEW_STEP && setStep(REVIEW_STEP)}
                disabled={step < REVIEW_STEP}
                className={cn(
                  'flex w-full items-center gap-3 rounded-xl px-3 py-2.5 text-left text-sm transition-colors',
                  isReview && 'bg-primary/10 text-primary',
                  step < REVIEW_STEP && 'cursor-not-allowed text-muted-foreground/60',
                )}
              >
                <span
                  className={cn(
                    'flex size-7 shrink-0 items-center justify-center rounded-full border text-xs font-semibold',
                    isReview ? 'border-primary bg-primary text-primary-foreground' : 'border-border',
                  )}
                >
                  <ClipboardCheck className="size-4" />
                </span>
                <span className="flex-1 font-medium">Review &amp; Submit</span>
              </button>
            </li>
          </ol>
        </div>
        {savedAt ? (
          <p className="mt-3 px-1 text-xs text-muted-foreground">Draft autosaved at {savedAt}</p>
        ) : null}
      </aside>

      {/* Fields */}
      <div className="rounded-2xl border border-border bg-card p-6 sm:p-8">
        {isReview ? (
          <ReviewStep
            values={values}
            files={files}
            onEdit={(i) => {
              setStep(i)
              window.scrollTo({ top: 0, behavior: 'smooth' })
            }}
          />
        ) : (
          <>
            <div className="mb-6">
              <h2 className="font-display text-2xl font-semibold text-foreground">
                {current.title}
              </h2>
              <p className="mt-1 text-sm text-muted-foreground">{current.description}</p>
            </div>

            <div className="grid gap-5 sm:grid-cols-2">
              {current.fields.map((field) => (
                <FieldRenderer
                  key={field.name}
                  field={field}
                  value={values[field.name]}
                  files={files[field.name]}
                  error={errors[field.name]}
                  onChange={(v) => setValue(field.name, v)}
                  onToggle={(opt) => toggleChoice(field.name, opt)}
                  onFiles={(metas) => setFiles((f) => ({ ...f, [field.name]: metas }))}
                />
              ))}
            </div>
          </>
        )}

        {status === 'error' ? (
          <div
            role="alert"
            className="mt-6 flex items-start gap-3 rounded-xl border border-destructive/30 bg-destructive/10 px-4 py-3 text-sm text-destructive"
          >
            <AlertCircle className="mt-0.5 size-4 shrink-0" />
            <span>{errorMessage}</span>
          </div>
        ) : null}

        {/* Controls */}
        <div className="mt-8 flex items-center justify-between gap-4 border-t border-border pt-6">
          <button
            type="button"
            onClick={goBack}
            disabled={step === 0}
            className={cn(
              'inline-flex items-center gap-2 rounded-full border border-border px-5 py-2.5 text-sm font-medium text-foreground transition-colors hover:bg-muted',
              step === 0 && 'invisible',
            )}
          >
            <ArrowLeft className="size-4" />
            Back
          </button>

          {isReview ? (
            <button
              type="button"
              onClick={handleSubmit}
              disabled={status === 'submitting'}
              className="inline-flex items-center gap-2 rounded-full bg-primary px-6 py-2.5 text-sm font-medium text-primary-foreground transition-opacity hover:opacity-90 disabled:opacity-60"
            >
              {status === 'submitting' ? (
                <>
                  <Loader2 className="size-4 animate-spin" />
                  Submitting
                </>
              ) : (
                <>
                  Submit questionnaire
                  <Check className="size-4" />
                </>
              )}
            </button>
          ) : (
            <button
              type="button"
              onClick={goNext}
              className="inline-flex items-center gap-2 rounded-full bg-primary px-6 py-2.5 text-sm font-medium text-primary-foreground transition-opacity hover:opacity-90"
            >
              {step === REVIEW_STEP - 1 ? 'Review' : 'Continue'}
              <ArrowRight className="size-4" />
            </button>
          )}
        </div>
      </div>
    </div>
  )
}

function ReviewStep({
  values,
  files,
  onEdit,
}: {
  values: Values
  files: FileMap
  onEdit: (stepIndex: number) => void
}) {
  return (
    <div>
      <div className="mb-6">
        <h2 className="font-display text-2xl font-semibold text-foreground">Review &amp; Submit</h2>
        <p className="mt-1 text-sm text-muted-foreground">
          Please review your answers below. You can edit any section before submitting.
        </p>
      </div>

      <div className="space-y-4">
        {onboardingSteps.map((s, i) => {
          const entries = s.fields
            .map((f) => ({
              field: f,
              value: values[f.name],
              files: files[f.name]?.map((m) => m.name),
            }))
            .filter((e) => !isEmpty(e.value) || (e.files && e.files.length > 0))

          return (
            <section key={s.id} className="rounded-2xl border border-border bg-background/40 p-5">
              <header className="mb-3 flex items-center justify-between gap-3">
                <h3 className="font-medium text-foreground">{s.title}</h3>
                <button
                  type="button"
                  onClick={() => onEdit(i)}
                  className="inline-flex items-center gap-1.5 rounded-full border border-border px-3 py-1.5 text-xs font-medium text-muted-foreground transition-colors hover:border-primary/40 hover:text-primary"
                >
                  <Pencil className="size-3" />
                  Edit
                </button>
              </header>
              {entries.length > 0 ? (
                <dl className="grid gap-3 sm:grid-cols-2">
                  {entries.map((e) => (
                    <div key={e.field.name}>
                      <dt className="text-xs text-muted-foreground">{fieldLabels[e.field.name]}</dt>
                      <dd className="mt-0.5 text-sm text-foreground">
                        {e.files && e.files.length > 0
                          ? e.files.join(', ')
                          : Array.isArray(e.value)
                            ? e.value.join(', ')
                            : e.value}
                      </dd>
                    </div>
                  ))}
                </dl>
              ) : (
                <p className="text-sm text-muted-foreground">Not provided.</p>
              )}
            </section>
          )
        })}
      </div>
    </div>
  )
}

function FieldRenderer({
  field,
  value,
  files,
  error,
  onChange,
  onToggle,
  onFiles,
}: {
  field: Field
  value: string | string[] | undefined
  files?: UploadedFileMeta[]
  error?: string
  onChange: (v: string) => void
  onToggle: (option: string) => void
  onFiles: (metas: UploadedFileMeta[]) => void
}) {
  const id = `ob-${field.name}`
  const errId = `${id}-error`
  const wrap = field.full || field.type === 'checkbox-group' || field.type === 'file'

  return (
    <div className={cn(wrap && 'sm:col-span-2')} data-invalid={error ? 'true' : undefined}>
      <Label htmlFor={id} required={field.required}>
        {field.label}
      </Label>

      {field.type === 'textarea' && (
        <Textarea
          id={id}
          rows={4}
          placeholder={field.placeholder}
          value={(value as string) || ''}
          error={!!error}
          aria-describedby={error ? errId : undefined}
          onChange={(e) => onChange(e.target.value)}
        />
      )}

      {field.type === 'select' && (
        <Select
          id={id}
          value={(value as string) || ''}
          error={!!error}
          aria-describedby={error ? errId : undefined}
          onChange={(e) => onChange(e.target.value)}
        >
          <option value="" disabled>
            Select an option
          </option>
          {field.options?.map((o) => (
            <option key={o} value={o}>
              {o}
            </option>
          ))}
        </Select>
      )}

      {field.type === 'checkbox-group' && (
        <div className="flex flex-wrap gap-2">
          {field.options?.map((o) => {
            const selected = ((value as string[]) || []).includes(o)
            return (
              <button
                key={o}
                type="button"
                onClick={() => onToggle(o)}
                aria-pressed={selected}
                className={cn(
                  'inline-flex items-center gap-1.5 rounded-full border px-3.5 py-2 text-sm font-medium transition-colors',
                  selected
                    ? 'border-primary/60 bg-primary/10 text-primary'
                    : 'border-border text-muted-foreground hover:border-primary/30 hover:text-foreground',
                )}
              >
                {selected ? <Check className="size-3.5" /> : null}
                {o}
              </button>
            )
          })}
        </div>
      )}

      {field.type === 'file' && (
        <FileField id={id} field={field} files={files} onFiles={onFiles} />
      )}

      {['text', 'email', 'tel', 'url', 'date'].includes(field.type) && (
        <Input
          id={id}
          type={field.type === 'text' ? 'text' : field.type}
          placeholder={field.placeholder}
          value={(value as string) || ''}
          error={!!error}
          aria-describedby={error ? errId : undefined}
          onChange={(e) => onChange(e.target.value)}
        />
      )}

      {field.help && !error ? (
        <p className="mt-1.5 text-xs text-muted-foreground">{field.help}</p>
      ) : null}
      {error ? (
        <p id={errId} role="alert" className="mt-1.5 text-sm text-destructive">
          {error}
        </p>
      ) : null}
    </div>
  )
}

function FileField({
  id,
  field,
  files,
  onFiles,
}: {
  id: string
  field: Field
  files?: UploadedFileMeta[]
  onFiles: (metas: UploadedFileMeta[]) => void
}) {
  return (
    <div>
      <label
        htmlFor={id}
        className="flex cursor-pointer flex-col items-center justify-center gap-2 rounded-xl border border-dashed border-border bg-background px-4 py-6 text-center transition-colors hover:border-primary/40 hover:bg-primary/5"
      >
        <CloudUpload className="size-6 text-muted-foreground" />
        <span className="text-sm font-medium text-foreground">
          Click to upload{field.multiple ? ' files' : ''}
        </span>
        <span className="text-xs text-muted-foreground">
          {field.accept ? field.accept.replace(/\*/g, '').replace(/,/g, ', ') : 'Any file type'}
        </span>
        <input
          id={id}
          type="file"
          multiple={field.multiple}
          accept={field.accept}
          className="sr-only"
          onChange={(e) => {
            const metas: UploadedFileMeta[] = Array.from(e.target.files || []).map((f) => ({
              field: field.name,
              name: f.name,
              size: f.size,
              type: f.type,
            }))
            onFiles(metas)
          }}
        />
      </label>
      {files && files.length > 0 ? (
        <ul className="mt-2 flex flex-col gap-1.5">
          {files.map((m) => (
            <li
              key={m.name}
              className="flex items-center justify-between gap-2 rounded-lg border border-border bg-background px-3 py-2 text-sm text-foreground"
            >
              <span className="truncate">{m.name}</span>
              <button
                type="button"
                onClick={() => onFiles(files.filter((f) => f.name !== m.name))}
                className="text-muted-foreground hover:text-destructive"
                aria-label={`Remove ${m.name}`}
              >
                <X className="size-4" />
              </button>
            </li>
          ))}
        </ul>
      ) : null}
    </div>
  )
}
