'use server'

import { isAuthConfigured } from '@/lib/backend-config'
import type { AuthActionState } from '@/lib/auth-state'

/**
 * Sign-in attempt. There is intentionally NO demo bypass. Until a real auth
 * provider is connected, this returns an honest message explaining that portal
 * access is by invitation only. When auth is connected, verify credentials here
 * and create a session (then redirect to /portal/dashboard).
 */
export async function signIn(
  _prev: AuthActionState,
  _formData: FormData,
): Promise<AuthActionState> {
  if (!isAuthConfigured()) {
    return {
      status: 'info',
      message:
        'The client portal is available to approved clients by invitation only. Authentication is not connected yet, so sign-in is disabled. If you are an active client and have not received your login, please contact us.',
    }
  }

  // TODO: With auth connected, verify credentials and start a session, e.g.:
  //   const res = await auth.api.signInEmail({ body: { email, password } })
  //   if (!res) return { status: 'error', message: 'Invalid email or password.' }
  //   redirect('/portal/dashboard')
  return {
    status: 'error',
    message: 'Sign-in is not available yet. Please try again later.',
  }
}

/** Password-reset request. Honest no-op until an auth/email provider exists. */
export async function requestPasswordReset(
  _prev: AuthActionState,
  _formData: FormData,
): Promise<AuthActionState> {
  return {
    status: 'info',
    message:
      'Password resets require a connected authentication provider, which is not set up yet. If you are an active client, please contact us and we will help you regain access.',
  }
}
