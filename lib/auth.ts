/**
 * Authentication architecture (server-only).
 * ---------------------------------------------------------------------------
 * The client portal is for approved, paying clients only. There is no demo or
 * bypass login. Until a real auth provider is connected, `getSession()` always
 * returns null, so every portal route resolves to the "invitation only" state.
 *
 * To connect real auth later (recommended: Better Auth on Neon, or Supabase
 * Auth), implement `getSession()` to read the provider's session and return the
 * signed-in client. No portal UI changes are required — the pages already
 * render real data from the portal store when a session exists.
 */

import { isAuthConfigured } from '@/lib/backend-config'

export interface ClientSession {
  clientId: string
  name: string
  business: string
  email: string
  /** Studio team members who can access the admin review dashboard. */
  isAdmin?: boolean
}

/**
 * Returns the current client session, or null when not authenticated.
 * Currently always null because no auth provider is connected yet.
 */
export async function getSession(): Promise<ClientSession | null> {
  if (!isAuthConfigured()) return null

  // TODO: When auth is connected, read and verify the session here, e.g.:
  //   const session = await auth.api.getSession({ headers: await headers() })
  //   if (!session) return null
  //   return { clientId: session.user.id, name: session.user.name, ... }
  return null
}

/** Convenience flag for UI that needs to explain why the portal is locked. */
export { isAuthConfigured }
