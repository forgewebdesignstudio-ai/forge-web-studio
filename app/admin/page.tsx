import { Database, Inbox, Mail, ShieldCheck, HardDrive } from 'lucide-react'

import { listSubmissions } from '@/app/actions/admin'

function formatDate(iso: string) {
  return new Date(iso).toLocaleString('en-US', {
    month: 'short',
    day: 'numeric',
    year: 'numeric',
    hour: 'numeric',
    minute: '2-digit',
  })
}

const statusStyles: Record<string, string> = {
  new: 'border-primary/40 bg-primary/10 text-primary',
  reviewing: 'border-amber-500/40 bg-amber-500/10 text-amber-500',
  accepted: 'border-emerald-500/40 bg-emerald-500/10 text-emerald-500',
  rejected: 'border-destructive/40 bg-destructive/10 text-destructive',
}

export default async function AdminDashboardPage() {
  const { submissions, sourceConnected, backend } = await listSubmissions()

  const capabilities = [
    { label: 'Database', ok: backend.database, icon: Database },
    { label: 'Email', ok: backend.email, icon: Mail },
    { label: 'Storage', ok: backend.storage, icon: HardDrive },
    { label: 'Auth', ok: backend.auth, icon: ShieldCheck },
  ]

  return (
    <>
      <div className="mb-8">
        <h1 className="font-display text-3xl font-semibold text-foreground text-balance">
          Project submissions
        </h1>
        <p className="mt-2 text-muted-foreground">
          Review incoming project questionnaires, then approve clients to
          provision their portal access.
        </p>
      </div>

      {/* Backend capability strip */}
      <div className="mb-8 grid grid-cols-2 gap-3 sm:grid-cols-4">
        {capabilities.map((c) => {
          const Icon = c.icon
          return (
            <div
              key={c.label}
              className="flex items-center gap-3 rounded-2xl border border-border bg-card p-4"
            >
              <span
                className={`flex size-9 items-center justify-center rounded-lg ${
                  c.ok ? 'bg-emerald-500/10 text-emerald-500' : 'bg-muted text-muted-foreground'
                }`}
              >
                <Icon className="size-4" />
              </span>
              <div>
                <p className="text-sm font-medium text-foreground">{c.label}</p>
                <p className="text-xs text-muted-foreground">
                  {c.ok ? 'Connected' : 'Not configured'}
                </p>
              </div>
            </div>
          )
        })}
      </div>

      {submissions.length === 0 ? (
        <div className="rounded-3xl border border-border bg-card p-10 text-center">
          <span className="mx-auto flex size-14 items-center justify-center rounded-full bg-primary/10 text-primary">
            <Inbox className="size-7" />
          </span>
          <h2 className="mt-6 font-display text-xl font-semibold text-foreground">
            {sourceConnected ? 'No submissions yet' : 'Connect a data source'}
          </h2>
          <p className="mx-auto mt-3 max-w-md text-sm leading-relaxed text-muted-foreground">
            {sourceConnected
              ? 'New project questionnaires submitted from the website will appear here for review.'
              : 'Submissions are currently logged securely on the server. Connect a database to store and manage them here, then approve clients to grant portal access.'}
          </p>
        </div>
      ) : (
        <div className="overflow-hidden rounded-2xl border border-border">
          <table className="w-full text-left text-sm">
            <thead className="bg-card text-xs uppercase tracking-wide text-muted-foreground">
              <tr>
                <th className="px-5 py-3 font-medium">Reference</th>
                <th className="px-5 py-3 font-medium">Business</th>
                <th className="px-5 py-3 font-medium">Submitted</th>
                <th className="px-5 py-3 font-medium">Status</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-border">
              {submissions.map((s) => (
                <tr key={s.id} className="bg-background/40">
                  <td className="px-5 py-4 font-mono text-xs text-foreground">{s.reference}</td>
                  <td className="px-5 py-4 font-medium text-foreground">
                    {Array.isArray(s.values.businessName)
                      ? s.values.businessName[0]
                      : s.values.businessName}
                  </td>
                  <td className="px-5 py-4 text-muted-foreground">{formatDate(s.submittedAt)}</td>
                  <td className="px-5 py-4">
                    <span
                      className={`inline-flex rounded-full border px-2.5 py-0.5 text-xs font-medium capitalize ${statusStyles[s.status]}`}
                    >
                      {s.status}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </>
  )
}
