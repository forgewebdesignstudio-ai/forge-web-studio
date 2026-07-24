'use server'

import type { StoredSubmission } from '@/lib/submissions'
import { getBackendStatus, isDatabaseConfigured } from '@/lib/backend-config'
import { getSession } from '@/lib/auth'
import { selectSubmissions, updateSubmissionStatusRow } from '@/lib/supabase-server'

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
    try {
      submissions = await selectSubmissions()
    } catch (error) {
      console.log('[v0] Failed to load submissions:', error)
      submissions = []
    }
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

  try {
    await updateSubmissionStatusRow(reference, status)
  } catch (error) {
    console.log('[v0] Failed to update submission status:', error)
    return { ok: false, message: 'Could not update the submission. Please try again.' }
  }

  return { ok: true, message: `Submission marked as ${status}.` }
}
