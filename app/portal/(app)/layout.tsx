import type { Metadata } from 'next'
import { redirect } from 'next/navigation'

import { getSession } from '@/lib/auth'
import { PortalProvider } from '@/lib/portal-store'
import { PortalShell } from '@/components/portal/portal-shell'

export const metadata: Metadata = {
  title: 'Client Portal',
  robots: { index: false, follow: false },
}

export default async function PortalAppLayout({
  children,
}: {
  children: React.ReactNode
}) {
  // Approved clients only. With no authenticated session, there is no bypass —
  // every portal route sends the visitor to the invitation-only sign-in page.
  const session = await getSession()
  if (!session) {
    redirect('/portal/login')
  }

  return (
    <PortalProvider>
      <PortalShell session={session}>{children}</PortalShell>
    </PortalProvider>
  )
}
