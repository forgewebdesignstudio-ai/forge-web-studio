/**
 * Server-only email delivery via the Resend REST API.
 * ---------------------------------------------------------------------------
 * Uses `fetch` against https://api.resend.com/emails with RESEND_API_KEY, so
 * no client library needs to be installed. Import only from server code.
 */

import { firstValue, type StoredSubmission } from '@/lib/submissions'

const RESEND_API_KEY = process.env.RESEND_API_KEY

const STUDIO_INBOX = 'forgewebdesignstudio@gmail.com'
// Resend requires a verified sender; onboarding@resend.dev works out of the box.
const FROM_ADDRESS = 'Forge Web Studio <onboarding@resend.dev>'

/** Format submission field values into readable lines for the notification. */
function buildSummary(submission: StoredSubmission): { text: string; html: string } {
  const entries = Object.entries(submission.values)

  const lines = entries.map(([field, value]) => {
    const display = Array.isArray(value) ? value.join(', ') : value
    return { field, display: display || '—' }
  })

  const fileLines = submission.files.map((f) => `${f.name} (${f.field})`)

  const textParts = [
    `New project questionnaire submission`,
    `Reference: ${submission.reference}`,
    `Submitted: ${submission.submittedAt}`,
    ``,
    ...lines.map((l) => `${l.field}: ${l.display}`),
  ]
  if (fileLines.length) {
    textParts.push(``, `Attached files:`, ...fileLines.map((f) => `- ${f}`))
  }

  const htmlRows = lines
    .map(
      (l) =>
        `<tr><td style="padding:4px 12px 4px 0;font-weight:600;vertical-align:top;">${escapeHtml(
          l.field,
        )}</td><td style="padding:4px 0;">${escapeHtml(l.display)}</td></tr>`,
    )
    .join('')

  const html = `
    <div style="font-family:system-ui,-apple-system,Segoe UI,Roboto,sans-serif;color:#111;">
      <h2 style="margin:0 0 4px;">New project questionnaire submission</h2>
      <p style="margin:0 0 2px;color:#555;">Reference: <strong>${escapeHtml(
        submission.reference,
      )}</strong></p>
      <p style="margin:0 0 16px;color:#555;">Submitted: ${escapeHtml(
        submission.submittedAt,
      )}</p>
      <table style="border-collapse:collapse;font-size:14px;">${htmlRows}</table>
      ${
        fileLines.length
          ? `<p style="margin:16px 0 4px;font-weight:600;">Attached files</p><ul>${fileLines
              .map((f) => `<li>${escapeHtml(f)}</li>`)
              .join('')}</ul>`
          : ''
      }
    </div>
  `

  return { text: textParts.join('\n'), html }
}

function escapeHtml(input: string): string {
  return input
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#39;')
}

/** Send the studio a notification email for a new submission. Throws on failure. */
export async function sendSubmissionEmail(submission: StoredSubmission): Promise<void> {
  if (!RESEND_API_KEY) {
    throw new Error('Email is not configured: RESEND_API_KEY is required.')
  }

  const business = firstValue(submission.values.businessName).trim() || 'New client'
  const { text, html } = buildSummary(submission)

  const res = await fetch('https://api.resend.com/emails', {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${RESEND_API_KEY}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      from: FROM_ADDRESS,
      to: [STUDIO_INBOX],
      reply_to: firstValue(submission.values.email).trim() || undefined,
      subject: `New project request: ${business} (${submission.reference})`,
      text,
      html,
    }),
    cache: 'no-store',
  })

  if (!res.ok) {
    const detail = await res.text()
    throw new Error(`Resend send failed (${res.status}): ${detail}`)
  }
}
