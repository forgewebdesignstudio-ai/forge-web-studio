/**
 * Server-only Supabase access for project questionnaire submissions.
 * ---------------------------------------------------------------------------
 * Uses the Supabase REST (PostgREST) API directly via `fetch` with the
 * service-role key, so no client library needs to be installed. This module
 * MUST only be imported from server code (server actions / route handlers)
 * because it uses the service-role key, which bypasses RLS.
 *
 * Expected table `submissions`:
 *   id           uuid  primary key
 *   reference    text  unique
 *   status       text
 *   submitted_at timestamptz
 *   payload      jsonb
 */

import type { StoredSubmission } from '@/lib/submissions'

const SUPABASE_URL = process.env.SUPABASE_URL
const SERVICE_ROLE_KEY = process.env.SUPABASE_SERVICE_ROLE_KEY

const TABLE = 'submissions'

interface SubmissionRow {
  id: string
  reference: string
  status: StoredSubmission['status']
  submitted_at: string
  payload: StoredSubmission
}

function getConfig(): { url: string; key: string } {
  if (!SUPABASE_URL || !SERVICE_ROLE_KEY) {
    throw new Error(
      'Supabase is not configured: SUPABASE_URL and SUPABASE_SERVICE_ROLE_KEY are required.',
    )
  }
  return { url: SUPABASE_URL.replace(/\/$/, ''), key: SERVICE_ROLE_KEY }
}

function restHeaders(key: string): Record<string, string> {
  return {
    apikey: key,
    Authorization: `Bearer ${key}`,
    'Content-Type': 'application/json',
  }
}

/** Insert a submission. Throws on failure so callers can surface an honest error. */
export async function insertSubmission(submission: StoredSubmission): Promise<void> {
  const { url, key } = getConfig()

  const row: SubmissionRow = {
    id: submission.id,
    reference: submission.reference,
    status: submission.status,
    submitted_at: submission.submittedAt,
    payload: submission,
  }

  const res = await fetch(`${url}/rest/v1/${TABLE}`, {
    method: 'POST',
    headers: { ...restHeaders(key), Prefer: 'return=minimal' },
    body: JSON.stringify(row),
    cache: 'no-store',
  })

  if (!res.ok) {
    const detail = await res.text()
    throw new Error(`Supabase insert failed (${res.status}): ${detail}`)
  }
}

/** Fetch all submissions, newest first. Throws on failure. */
export async function selectSubmissions(): Promise<StoredSubmission[]> {
  const { url, key } = getConfig()

  const res = await fetch(
    `${url}/rest/v1/${TABLE}?select=payload,submitted_at,status,reference&order=submitted_at.desc`,
    {
      method: 'GET',
      headers: restHeaders(key),
      cache: 'no-store',
    },
  )

  if (!res.ok) {
    const detail = await res.text()
    throw new Error(`Supabase select failed (${res.status}): ${detail}`)
  }

  const rows = (await res.json()) as SubmissionRow[]
  // Prefer the full stored payload; fall back to top-level columns if needed.
  return rows.map((r) => ({
    ...(r.payload as StoredSubmission),
    reference: r.payload?.reference ?? r.reference,
    status: r.payload?.status ?? r.status,
    submittedAt: r.payload?.submittedAt ?? r.submitted_at,
  }))
}

/** Update a submission's status by reference. Throws on failure. */
export async function updateSubmissionStatusRow(
  reference: string,
  status: StoredSubmission['status'],
): Promise<void> {
  const { url, key } = getConfig()

  const res = await fetch(
    `${url}/rest/v1/${TABLE}?reference=eq.${encodeURIComponent(reference)}`,
    {
      method: 'PATCH',
      headers: { ...restHeaders(key), Prefer: 'return=minimal' },
      // Keep the top-level status column in sync; the payload keeps the record.
      body: JSON.stringify({ status }),
      cache: 'no-store',
    },
  )

  if (!res.ok) {
    const detail = await res.text()
    throw new Error(`Supabase update failed (${res.status}): ${detail}`)
  }
}
