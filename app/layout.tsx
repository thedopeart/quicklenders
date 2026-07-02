// ** Styling Imports
import './globals.css'

// ** Component Imports
import Header from '@/components/Header'
import Footer from '@/components/Footer'

// ** Font Imports
import { DM_Sans } from 'next/font/google'
const dmSans = DM_Sans({ subsets: ['latin'] })

// ** Typescript Imports
import type { Metadata } from 'next'

// ** Schema
import { organizationSchema } from '@/lib/schema'

// ** MetaData
export const metadata: Metadata = {
  metadataBase: new URL('https://quicklenders.com'),
  title: {
    default: 'Quick Lenders | Business Loans & Financing',
    template: '%s | Quick Lenders',
  },
  description: 'Fast, reliable business funding. Term loans, lines of credit, equipment financing, and more. Amounts from $30,000 to $100M.',
  openGraph: {
    siteName: 'Quick Lenders',
    type: 'website',
    locale: 'en_US',
    // Default branded card (homepage + any page that doesn't set its own).
    images: [{ url: '/api/og?v=2', width: 1200, height: 630 }],
  },
  twitter: {
    card: 'summary_large_image',
    images: ['/api/og?v=2'],
  },
  robots: {
    index: true,
    follow: true,
  },
  verification: {
    google: '1T9b_FgKkdI44QE7BXEFAZtFLyrrpdGL5r3thxg3Q_M',
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationSchema()) }}
        />
      </head>
      <body className={dmSans.className}>
        <div className="min-h-screen flex flex-col items-center justify-between">
          <Header />
          <div className="w-full flex flex-col flex-grow">
            {children}
          </div>
          <Footer />
        </div>
      </body>
    </html>
  )
}
