import 'server-only'

import { createClient, type SupabaseClient } from '@supabase/supabase-js'

/**
 * Server-only Supabase client using the SERVICE ROLE key.
 * ---------------------------------------------------------------------------
 * This bypasses Row Level Security and must NEVER be imported into client
 * code. It is used by server actions (e.g. saving questionnaire submissions
 * and reading them in the admin dashboard).
 *
 * Reads the project's existing environment variables:
 *   - SUPABASE_URL (falls back to NEXT_PUBLIC_SUPABASE_URL)
 *   - SUPABASE_SERVICE_ROLE_KEY
 */

let cached: SupabaseClient | null = null

/**
 * Returns a singleton service-role Supabase client, or `null` if the required
 * environment variables are not present (keeps the app honest instead of
 * throwing at build/runtime when the backend isn't configured).
 */
export function getSupabaseAdmin(): SupabaseClient | null {
  if (cached) return cached

  const url = process.env.SUPABASE_URL || process.env.NEXT_PUBLIC_SUPABASE_URL
  const serviceRoleKey = process.env.SUPABASE_SERVICE_ROLE_KEY

  if (!url || !serviceRoleKey) return null

  cached = createClient(url, serviceRoleKey, {
    auth: {
      persistSession: false,
      autoRefreshToken: false,
    },
  })

  return cached
}
