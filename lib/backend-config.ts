/**
 * Central backend capability detection.
 * ---------------------------------------------------------------------------
 * Forge Web Studio is built "backend-ready": every feature that needs a
 * server (email, database, file storage, authentication) checks here first.
 *
 * Nothing is faked. When a capability's environment variables are absent, the
 * app reports it as NOT configured and the UI shows an honest state instead of
 * pretending the action succeeded.
 *
 * To go live later, add the relevant environment variables (see each getter)
 * and implement the matching integration — no UI changes required.
 *
 * This module reads `process.env` and must only be imported from server code
 * (server actions, server components, route handlers).
 */

export type Capability = 'email' | 'database' | 'storage' | 'auth'

export interface BackendStatus {
  email: boolean
  database: boolean
  storage: boolean
  auth: boolean
}

/** True if an email/delivery provider is connected (Resend, Formspree, etc.). */
export function isEmailConfigured(): boolean {
  return Boolean(
    process.env.RESEND_API_KEY ||
      process.env.FORMSPREE_FORM_ID ||
      process.env.SMTP_URL,
  )
}

/** True if a database is connected (Supabase, Neon/Postgres, Firebase, etc.). */
export function isDatabaseConfigured(): boolean {
  return Boolean(
    process.env.DATABASE_URL ||
      process.env.POSTGRES_URL ||
      process.env.NEXT_PUBLIC_SUPABASE_URL ||
      process.env.SUPABASE_URL ||
      process.env.FIREBASE_PROJECT_ID,
  )
}

/** True if a file-storage provider is connected (Vercel Blob, Supabase, S3). */
export function isStorageConfigured(): boolean {
  return Boolean(
    process.env.BLOB_READ_WRITE_TOKEN ||
      process.env.S3_BUCKET ||
      process.env.SUPABASE_URL,
  )
}

/** True if an authentication provider is connected (Better Auth, Supabase). */
export function isAuthConfigured(): boolean {
  return Boolean(
    process.env.BETTER_AUTH_SECRET ||
      process.env.AUTH_SECRET ||
      process.env.NEXTAUTH_SECRET ||
      process.env.SUPABASE_URL,
  )
}

export function getBackendStatus(): BackendStatus {
  return {
    email: isEmailConfigured(),
    database: isDatabaseConfigured(),
    storage: isStorageConfigured(),
    auth: isAuthConfigured(),
  }
}
