'use client'

import { Receipt } from 'lucide-react'
import { usePortal } from '@/lib/portal-store'
import { PortalPageHeader } from '@/components/portal/page-header'
import { EmptyState, StatTile } from '@/components/portal/portal-ui'

export default function InvoicesPage() {
  const { state } = usePortal()
  const hasProject = state.projects.length > 0

  return (
    <>
      <PortalPageHeader
        title="Invoices"
        description="Review and pay invoices for your Forge Web Studio projects."
      />

      <div className="mb-6 grid grid-cols-1 gap-4 sm:grid-cols-3">
        <StatTile label="Outstanding balance" value="$0" hint="Nothing due" icon={Receipt} />
        <StatTile label="Paid to date" value="$0" hint="No payments yet" icon={Receipt} />
        <StatTile label="Next due" value="—" hint="No upcoming invoices" icon={Receipt} />
      </div>

      <EmptyState
        icon={Receipt}
        title="No invoices yet"
        description={
          hasProject
            ? 'Invoices for your project will appear here as milestones are reached. You will be notified when a new invoice is ready.'
            : 'Once your project is scoped, invoices will appear here for secure online payment.'
        }
      />

      <p className="mt-6 text-center text-xs text-muted-foreground">
        Secure payments are coming soon — invoicing is ready to connect to Stripe.
      </p>
    </>
  )
}
