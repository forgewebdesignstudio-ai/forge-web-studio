'use client'

import { useActionState } from 'react'
import Link from 'next/link'
import { Info, Loader2, Lock } from 'lucide-react'

import { signIn } from '@/app/actions/auth'
import { initialAuthState } from '@/lib/auth-state'
import { Input, Label } from '@/components/ui/form-field'

export function SignInForm() {
  const [state, formAction, isPending] = useActionState(signIn, initialAuthState)

  return (
    <form action={formAction} className="space-y-5">
      {/* Always-visible, honest explanation of portal access. */}
      <div className="flex items-start gap-3 rounded-xl border border-border bg-muted/40 px-4 py-3 text-sm text-muted-foreground">
        <Lock className="mt-0.5 size-4 shrink-0 text-primary" />
        <span>
          The client portal is for approved clients only. Access is granted by
          invitation after your project is accepted.
        </span>
      </div>

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
      <div>
        <div className="mb-2 flex items-center justify-between">
          <Label htmlFor="password" required>
            Password
          </Label>
          <Link
            href="/portal/forgot-password"
            className="text-xs font-medium text-muted-foreground hover:text-primary"
          >
            Forgot password?
          </Link>
        </div>
        <Input id="password" name="password" type="password" placeholder="••••••••" autoComplete="current-password" />
      </div>

      <button
        type="submit"
        disabled={isPending}
        className="inline-flex h-12 w-full items-center justify-center gap-2 rounded-full bg-primary px-6 text-sm font-medium text-primary-foreground transition-opacity hover:opacity-90 disabled:cursor-not-allowed disabled:opacity-70"
      >
        {isPending ? (
          <>
            <Loader2 className="size-4 animate-spin" />
            Signing in
          </>
        ) : (
          'Sign in to portal'
        )}
      </button>
    </form>
  )
}
