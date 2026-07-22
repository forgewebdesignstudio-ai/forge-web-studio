'use server'

import type { StoredSubmission } from '@/lib/submissions'
import { getBackendStatus, isDatabaseConfigured } from '@/lib/backend-config'
import { getSession } from '@/lib/auth'

export interface AdminSubmissionsResult {
  /** Submissions to review. Empty until a database is connected. */
  submissions: StoredSubmission[]
  /** Whether a data source is connected (drives the honest empty state). */
  sourceConnected: boolean
  backend: ReturnType<typeof getBackendStatus>
}

/**
 * Loads project questionnaire submissions for the admin review dashboard.
 *
 * There is no seeded/demo data. Until a database is connected this returns an
 * empty list and `sourceConnected: false`, so the admin UI honestly shows a
 * "connect a data source" state instead of fabricated submissions.
 */
export async function listSubmissions(): Promise<AdminSubmissionsResult> {
  const backend = getBackendStatus()

  let submissions: StoredSubmission[] = []
  if (isDatabaseConfigured()) {
    // TODO: When a database is connected, query stored submissions here, e.g.
    //   const rows = await sql`SELECT payload FROM submissions ORDER BY submitted_at DESC`
    //   submissions = rows.map((r) => r.payload as StoredSubmission)
    submissions = []
  }

  return {
    submissions,
    sourceConnected: isDatabaseConfigured(),
    backend,
  }
}

/**
 * Updates a submission's review status (new -> reviewing -> accepted/rejected).
 * When a client is accepted, this is where you would create their portal
 * account and send an invitation email.
 */
export async function updateSubmissionStatus(
  reference: string,
  status: StoredSubmission['status'],
): Promise<{ ok: boolean; message: string }> {
  const session = await getSession()
  if (!session?.isAdmin) {
    return { ok: false, message: 'Not authorized.' }
  }

  if (!isDatabaseConfigured()) {
    return {
      ok: false,
      message: 'Connect a database to manage submissions.',
    }
  }

  // TODO: persist the status change, and on "accepted" provision the client's
  // portal account + send their invitation email.
  console.log(`[v0] Submission ${reference} -> ${status}`)
  return { ok: true, message: `Submission marked as ${status}.` }
}
