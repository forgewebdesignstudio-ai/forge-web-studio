import type { Metadata } from 'next'
import Link from 'next/link'
import { AuthShell } from '@/components/portal/auth-shell'
import { SignInForm } from '@/components/portal/sign-in-form'

export const metadata: Metadata = {
  title: 'Client Login',
  robots: { index: false, follow: false },
}

export default function LoginPage() {
  return (
    <AuthShell
      title="Client portal"
      subtitle="Sign in to manage your active project."
      footer={
        <>
          Not a client yet?{' '}
          <Link href="/start" className="font-medium text-primary hover:underline">
            Start your project
          </Link>
        </>
      }
    >
      <SignInForm />
    </AuthShell>
  )
}
