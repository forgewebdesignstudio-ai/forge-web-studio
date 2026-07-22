'use client'

import { MessageSquare } from 'lucide-react'
import { usePortal } from '@/lib/portal-store'
import { PortalPageHeader } from '@/components/portal/page-header'
import { EmptyState } from '@/components/portal/portal-ui'

export default function MessagesPage() {
  const { state } = usePortal()
  const hasProject = state.projects.length > 0

  return (
    <>
      <PortalPageHeader
        title="Messages"
        description="Chat directly with your Forge Web Studio project team."
      />

      <EmptyState
        icon={MessageSquare}
        title="No conversations yet"
        description={
          hasProject
            ? 'Your project team will reach out here as soon as your kickoff begins. You will be notified of new messages.'
            : 'Once you start a project, your dedicated team will appear here so you can message them directly.'
        }
      />
    </>
  )
}
