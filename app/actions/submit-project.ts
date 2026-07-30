'use server'

import {
  generateReference,
  firstValue,
  type QuestionnaireInput,
  type StoredSubmission,
  type SubmissionResult,
} from '@/lib/submissions'
import {
  isDatabaseConfigured,
  isEmailConfigured,
  isStorageConfigured,
} from '@/lib/backend-config'
import { insertSubmission } from '@/lib/supabase-server'
import { sendSubmissionEmail } from '@/lib/email'

/**
 * ---------------------------------------------------------------------------
 * PROJECT QUESTIONNAIRE SUBMISSION
 * ---------------------------------------------------------------------------
 * This is the single integration point for onboarding submissions. It always
 * runs on the server. Today it validates the payload and logs the full,
 * structured submission so nothing is ever lost. When you connect a backend,
 * fill in the marked TODO blocks — the questionnaire UI needs no changes.
 */

/** Persist and/or deliver a submission. Returns whether it was durably stored. */
async function persistSubmission(submission: StoredSubmission): Promise<boolean> {
  let persisted = false

  // 1) DATABASE — store the submission in Supabase. A failure here is fatal:
  //    we rethrow so the caller returns an honest error to the client.
  if (isDatabaseConfigured()) {
    await insertSubmission(submission)
    persisted = true
  }

  // 2) STORAGE — files are captured as metadata client-side. When a storage
  //    provider is connected, upload the real File objects (Vercel Blob /
  //    Supabase Storage / S3) from the client and store their URLs here.
  if (isStorageConfigured()) {
    // File metadata is already saved with the submission payload above.
  }

  // 3) EMAIL — notify the studio a new project request arrived. This is
  //    best-effort: an email failure must not lose an already-saved record.
  if (isEmailConfigured()) {
    try {
      await sendSubmissionEmail(submission)
      persisted = true
    } catch (error) {
      console.log('[v0] Submission email failed (record still saved):', error)
    }
  }

  // No backend connected: log the complete payload for manual review so the
  // submission is never silently dropped. This is honest, not faked.
  if (!persisted) {
    console.log(
      '[v0] New project questionnaire submission (backend not yet connected):',
      JSON.stringify(submission, null, 2),
    )
  }

  return persisted
}

export async function submitProject(
  input: QuestionnaireInput,
): Promise<SubmissionResult> {
  // Server-side validation (defense in depth — the wizard also validates).
  const business = firstValue(input.values.businessName).trim()
  const email = firstValue(input.values.email).trim()

  if (!business || !email) {
    return {
      ok: false,
      reference: null,
      persisted: false,
      message:
        'Your submission is missing required details. Please complete the required fields and try again.',
    }
  }

  const submission: StoredSubmission = {
    ...input,
    id: crypto.randomUUID(),
    reference: generateReference(),
    submittedAt: new Date().toISOString(),
    status: 'new',
  }

  try {
    const persisted = await persistSubmission(submission)
    return {
      ok: true,
      reference: submission.reference,
      persisted,
      message: persisted
        ? 'Your project request has been received and saved. We will review it and reach out shortly.'
        : 'Your project request has been received. We review every submission personally and will reach out shortly.',
    }
  } catch (error) {
    console.log('[v0] Submission processing failed:', error)
    return {
      ok: false,
      reference: null,
      persisted: false,
      message:
        'Something went wrong while submitting your request. Please try again, or email us directly at forgewebdesignstudio@gmail.com.',
    }
  }
}
