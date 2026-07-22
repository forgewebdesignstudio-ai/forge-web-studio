import type {
  InputHTMLAttributes,
  SelectHTMLAttributes,
  TextareaHTMLAttributes,
} from 'react'

import { cn } from '@/lib/utils'

const baseField =
  'w-full rounded-xl border bg-background px-4 py-3 text-sm text-foreground placeholder:text-muted-foreground/70 outline-none transition-colors focus:border-gold/50 focus:ring-2 focus:ring-gold/20 disabled:cursor-not-allowed disabled:opacity-50'

export function Label({
  htmlFor,
  children,
  required,
}: {
  htmlFor: string
  children: React.ReactNode
  required?: boolean
}) {
  return (
    <label
      htmlFor={htmlFor}
      className="mb-2 block text-sm font-medium text-foreground"
    >
      {children}
      {required ? (
        <span className="ml-0.5 text-gold" aria-hidden="true">
          *
        </span>
      ) : null}
    </label>
  )
}

export function FieldError({ id, message }: { id: string; message?: string }) {
  if (!message) return null
  return (
    <p id={id} role="alert" className="mt-1.5 text-sm text-destructive">
      {message}
    </p>
  )
}

export function Input({
  className,
  error,
  ...props
}: InputHTMLAttributes<HTMLInputElement> & { error?: boolean }) {
  return (
    <input
      className={cn(baseField, error && 'border-destructive', className)}
      {...props}
    />
  )
}

export function Textarea({
  className,
  error,
  ...props
}: TextareaHTMLAttributes<HTMLTextAreaElement> & { error?: boolean }) {
  return (
    <textarea
      className={cn(baseField, 'resize-y', error && 'border-destructive', className)}
      {...props}
    />
  )
}

export function Select({
  className,
  error,
  children,
  ...props
}: SelectHTMLAttributes<HTMLSelectElement> & { error?: boolean }) {
  return (
    <select
      className={cn(
        baseField,
        'appearance-none bg-[length:1rem] bg-[right_1rem_center] bg-no-repeat pr-10',
        error && 'border-destructive',
        className,
      )}
      style={{
        backgroundImage:
          "url(\"data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='16' height='16' fill='none' stroke='%23c9a24b' stroke-width='2' stroke-linecap='round' stroke-linejoin='round' viewBox='0 0 24 24'%3E%3Cpath d='m6 9 6 6 6-6'/%3E%3C/svg%3E\")",
      }}
      {...props}
    >
      {children}
    </select>
  )
}

export { baseField }
