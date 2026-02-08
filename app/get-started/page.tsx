import { Suspense } from 'react'
import Link from 'next/link'
import { generatePageMetadata } from '@/lib/metadata'
import { breadcrumbSchema } from '@/lib/schema'
import GetStartedForm from './GetStartedForm'
import { MdShield, MdSpeed, MdSupportAgent, MdCheckCircle } from 'react-icons/md'

export const metadata = generatePageMetadata({
  title: 'Get Pre-Qualified | Apply for Business Financing',
  description:
    'Apply for business financing in minutes. Get pre-qualified with no hard credit pull. A Quick Lenders specialist will review your details and reach out within 1 business day.',
  path: '/get-started',
})

const benefits = [
  { icon: MdShield, text: 'No hard credit pull for pre-qualification' },
  { icon: MdSpeed, text: 'Decisions in as little as 24 hours' },
  { icon: MdSupportAgent, text: 'Personal account manager assigned' },
  { icon: MdCheckCircle, text: 'No obligation to proceed' },
]

export default function GetStartedPage() {
  const breadcrumbs = breadcrumbSchema([
    { name: 'Home', url: '/' },
    { name: 'Get Started', url: '/get-started' },
  ])

  return (
    <main className="flex flex-grow flex-col w-full">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbs) }}
      />

      {/* Hero Section */}
      <section className="bg-gradient-to-r from-theme-gradient-1-from to-theme-gradient-1-to text-white pt-24 md:pt-28 pb-16">
        <div className="container">
          <nav aria-label="Breadcrumb" className="mb-4 text-sm text-white/60">
            <ol className="flex items-center gap-2">
              <li><Link href="/" className="hover:text-white/80">Home</Link></li>
              <li>/</li>
              <li className="text-white">Get Started</li>
            </ol>
          </nav>
          <div className="max-w-2xl">
            <h1 className="text-4xl md:text-5xl font-bold leading-tight mb-6">
              Get Pre-Qualified in Minutes
            </h1>
            <p className="text-lg text-white/80 leading-relaxed mb-8">
              Tell us about your business and funding needs. A dedicated specialist will review your information and reach out within 1 business day with personalized financing options.
            </p>

            {/* Benefits */}
            <div className="grid grid-cols-2 gap-4">
              {benefits.map((benefit) => (
                <div key={benefit.text} className="flex items-center gap-2 text-white/90">
                  <benefit.icon className="text-xl flex-shrink-0" />
                  <span className="text-sm">{benefit.text}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Form Section */}
      <section className="py-16 bg-gray-50">
        <div className="container">
          <div className="grid lg:grid-cols-3 gap-12">
            {/* Form */}
            <div className="lg:col-span-2">
              <Suspense
                fallback={
                  <div className="rounded-2xl bg-white p-8 sm:p-10 shadow-sm border border-gray-100 animate-pulse space-y-6">
                    {[...Array(6)].map((_, i) => (
                      <div key={i} className="space-y-2">
                        <div className="h-4 bg-gray-200 rounded w-1/4" />
                        <div className="h-12 bg-gray-200 rounded" />
                      </div>
                    ))}
                  </div>
                }
              >
                <GetStartedForm />
              </Suspense>
            </div>

            {/* Sidebar */}
            <div className="space-y-6">
              {/* What to Expect */}
              <div className="bg-white rounded-xl p-6 border border-gray-100 shadow-sm">
                <h3 className="font-bold text-theme-primary-dark mb-4">What to Expect</h3>
                <ol className="space-y-4">
                  <li className="flex items-start gap-3">
                    <span className="w-6 h-6 rounded-full bg-theme-primary-light text-white text-xs flex items-center justify-center flex-shrink-0 mt-0.5">1</span>
                    <div>
                      <p className="font-medium text-gray-900">Submit Your Information</p>
                      <p className="text-sm text-gray-600">Takes about 5 minutes</p>
                    </div>
                  </li>
                  <li className="flex items-start gap-3">
                    <span className="w-6 h-6 rounded-full bg-theme-primary-light text-white text-xs flex items-center justify-center flex-shrink-0 mt-0.5">2</span>
                    <div>
                      <p className="font-medium text-gray-900">Specialist Reviews</p>
                      <p className="text-sm text-gray-600">We analyze your needs</p>
                    </div>
                  </li>
                  <li className="flex items-start gap-3">
                    <span className="w-6 h-6 rounded-full bg-theme-primary-light text-white text-xs flex items-center justify-center flex-shrink-0 mt-0.5">3</span>
                    <div>
                      <p className="font-medium text-gray-900">Receive Your Options</p>
                      <p className="text-sm text-gray-600">Within 24 hours</p>
                    </div>
                  </li>
                </ol>
              </div>

              {/* Need Help */}
              <div className="bg-gradient-to-br from-theme-gradient-1-from to-theme-gradient-1-to rounded-xl p-6 text-white">
                <h3 className="font-bold mb-2">Prefer to Talk?</h3>
                <p className="text-white/80 text-sm mb-4">
                  Speak directly with a lending specialist who can answer your questions.
                </p>
                <a
                  href="tel:3039218529"
                  className="inline-block bg-white text-theme-primary font-semibold px-4 py-2 rounded-lg text-sm hover:bg-white/90 transition-colors"
                >
                  Call (303) 921-8529
                </a>
              </div>

              {/* Resources */}
              <div className="bg-white rounded-xl p-6 border border-gray-100 shadow-sm">
                <h3 className="font-bold text-theme-primary-dark mb-4">Helpful Resources</h3>
                <ul className="space-y-2">
                  <li>
                    <Link href="/business-loans" className="text-sm text-theme-primary-light hover:underline">
                      → Compare loan products
                    </Link>
                  </li>
                  <li>
                    <Link href="/financial-insights/first-time-business-loans" className="text-sm text-theme-primary-light hover:underline">
                      → First-time borrower guide
                    </Link>
                  </li>
                  <li>
                    <Link href="/financial-insights/how-to-improve-credit-fast" className="text-sm text-theme-primary-light hover:underline">
                      → Improve your credit score
                    </Link>
                  </li>
                  <li>
                    <Link href="/contact" className="text-sm text-theme-primary-light hover:underline">
                      → Contact our team
                    </Link>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </section>
    </main>
  )
}
