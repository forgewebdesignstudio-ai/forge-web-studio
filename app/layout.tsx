import type React from 'react'
import { Analytics } from '@vercel/analytics/next'
import type { Metadata, Viewport } from 'next'
import { Inter, Space_Grotesk } from 'next/font/google'
import './globals.css'

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-inter',
  display: 'swap',
})

const spaceGrotesk = Space_Grotesk({
  subsets: ['latin'],
  variable: '--font-space-grotesk',
  display: 'swap',
})

const siteUrl = 'https://forge-web-studio-website.vercel.app'

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: 'Forge Web Studio — Premium Websites for Ambitious Businesses',
    template: '%s | Forge Web Studio',
  },
  description:
    'Forge Web Studio designs and builds premium, high-converting websites for ambitious businesses. Luxury design, modern engineering, forged for growth.',
  keywords: [
    'web design agency',
    'premium website design',
    'custom websites',
    'small business websites',
    'landing pages',
    'website redesign',
    'Forge Web Studio',
  ],
  authors: [{ name: 'Forge Web Studio' }],
  creator: 'Forge Web Studio',
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: siteUrl,
    siteName: 'Forge Web Studio',
    title: 'Forge Web Studio — Premium Websites for Ambitious Businesses',
    description:
      'Luxury websites forged for ambitious businesses. Strategy, design, and engineering under one roof.',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Forge Web Studio — Premium Websites for Ambitious Businesses',
    description:
      'Luxury websites forged for ambitious businesses. Strategy, design, and engineering under one roof.',
  },
  generator: 'v0.app',
}

export const viewport: Viewport = {
  themeColor: '#0a0a0a',
  width: 'device-width',
  initialScale: 1,
  maximumScale: 1,
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html
      lang="en"
      data-scroll-behavior="smooth"
      className={`dark ${inter.variable} ${spaceGrotesk.variable} bg-background`}
    >
      <body className="min-h-screen bg-background text-foreground antialiased">
        {children}
        {process.env.NODE_ENV === 'production' && <Analytics />}
      </body>
    </html>
  )
}
