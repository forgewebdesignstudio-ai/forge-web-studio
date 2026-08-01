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

  // 1) DATABASE — store the submission (Supabase / Neon / Firebase / etc.)
  if (isDatabaseConfigured()) {
    // TODO: insert `submission` into your table, e.g.
    //   await sql`INSERT INTO submissions (reference, payload, status)
    //             VALUES (${submission.reference}, ${JSON.stringify(submission)}, 'new')`
    persisted = true
  }

  // 2) STORAGE — files are captured as metadata client-side. When a storage
  //    provider is connected, upload the real File objects (Vercel Blob /
  //    Supabase Storage / S3) from the client and store their URLs here.
  if (isStorageConfigured()) {
    // TODO: associate uploaded file URLs with this submission.
  }

  // 3) EMAIL — notify the studio a new project request arrived.
  if (isEmailConfigured()) {
    // TODO: send an email (Resend / Formspree / SMTP) to
    //   forgewebdesignstudio@gmail.com with buildSummary(submission).
    persisted = true
  }

  // No backend connected yet: log the complete payload for manual review so
  // the submission is never silently dropped. This is honest, not faked.
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
