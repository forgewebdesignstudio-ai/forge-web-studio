import type { Metadata } from 'next'
import Link from 'next/link'
import { AuthShell } from '@/components/portal/auth-shell'
import { ResetForm } from '@/components/portal/reset-form'

export const metadata: Metadata = {
  title: 'Reset Password',
  robots: { index: false, follow: false },
}

export default function ForgotPasswordPage() {
  return (
    <AuthShell
      title="Reset your password"
      subtitle="Enter your email and we'll help you regain access."
      footer={
        <>
          Remembered it?{' '}
          <Link href="/portal/login" className="font-medium text-primary hover:underline">
            Back to sign in
          </Link>
        </>
      }
    >
      <ResetForm />
    </AuthShell>
  )
}
