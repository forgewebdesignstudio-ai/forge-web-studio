'use client'

import { useActionState } from 'react'
import { Info, Loader2 } from 'lucide-react'

import { requestPasswordReset } from '@/app/actions/auth'
import { initialAuthState } from '@/lib/auth-state'
import { Input, Label } from '@/components/ui/form-field'

export function ResetForm() {
  const [state, formAction, isPending] = useActionState(
    requestPasswordReset,
    initialAuthState,
  )

  return (
    <form action={formAction} className="space-y-5">
      {state.status !== 'idle' && state.message ? (
        <div
          role="alert"
          className="flex items-start gap-3 rounded-xl border border-primary/30 bg-primary/10 px-4 py-3 text-sm text-foreground"
        >
          <Info className="mt-0.5 size-4 shrink-0 text-primary" />
          <span>{state.message}</span>
        </div>
      ) : null}

      <div>
        <Label htmlFor="email" required>
          Email address
        </Label>
        <Input id="email" name="email" type="email" placeholder="you@company.com" autoComplete="email" />
      </div>

      <button
        type="submit"
        disabled={isPending}
        className="inline-flex h-12 w-full items-center justify-center gap-2 rounded-full bg-primary px-6 text-sm font-medium text-primary-foreground transition-opacity hover:opacity-90 disabled:cursor-not-allowed disabled:opacity-70"
      >
        {isPending ? (
          <>
            <Loader2 className="size-4 animate-spin" />
            Sending
          </>
        ) : (
          'Send reset link'
        )}
      </button>
    </form>
  )
}
