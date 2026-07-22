/**
 * Submission data model shared by the questionnaire, the server action, and
 * the (future) admin dashboard.
 *
 * This file is intentionally free of server-only imports so it can be used from
 * both client and server. The actual persistence/delivery lives in the server
 * action (`app/actions/submit-project.ts`).
 */

export type FieldValue = string | string[]

export interface UploadedFileMeta {
  field: string
  name: string
  size: number
  type: string
}

/** Raw payload produced by the questionnaire and sent to the server. */
export interface QuestionnaireInput {
  values: Record<string, FieldValue>
  files: UploadedFileMeta[]
}

/** A submission after the server has accepted and referenced it. */
export interface StoredSubmission extends QuestionnaireInput {
  id: string
  reference: string
  submittedAt: string
  status: 'new' | 'reviewing' | 'accepted' | 'rejected'
}

/** Result returned to the client after attempting a submission. */
export interface SubmissionResult {
  ok: boolean
  reference: string | null
  /** Whether the data was durably stored/emailed vs. only logged server-side. */
  persisted: boolean
  message: string
}

/** Human-friendly reference like FWS-7Q3K-2Z. */
export function generateReference(): string {
  const block = () =>
    Math.random().toString(36).slice(2, 6).toUpperCase()
  return `FWS-${block()}-${block().slice(0, 2)}`
}

/** Pull a single string value out of the (possibly array) field map. */
export function firstValue(value: FieldValue | undefined): string {
  if (Array.isArray(value)) return value[0] ?? ''
  return value ?? ''
}
