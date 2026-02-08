import { generatePageMetadata } from '@/lib/metadata'
import { breadcrumbSchema } from '@/lib/schema'
import Link from 'next/link'

export const metadata = generatePageMetadata({
  title: 'California Privacy Policy',
  description:
    'California Consumer Privacy Act (CCPA) privacy notice for Quick Lenders. Learn about your rights as a California resident.',
  path: '/california-privacy-policy',
})

export default function CaliforniaPrivacyPolicyPage() {
  const breadcrumbs = breadcrumbSchema([
    { name: 'Home', url: '/' },
    { name: 'California Privacy Policy', url: '/california-privacy-policy' },
  ])

  return (
    <main className="flex flex-grow flex-wrap w-full justify-center">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbs) }}
      />

      {/* Hero */}
      <section className="overflow-hidden bg-gradient-to-r from-theme-gradient-1-from to-theme-gradient-1-to w-full pt-24 md:pt-28 pb-16 lg:pb-24">
        <div className="container">
          <nav aria-label="Breadcrumb" className="mb-4 text-sm text-white/60">
            <ol className="flex items-center gap-2">
              <li><Link href="/" className="hover:text-white/80">Home</Link></li>
              <li>/</li>
              <li className="text-white">California Privacy Policy</li>
            </ol>
          </nav>
          <div className="max-w-3xl mx-auto text-center">
            <h1 className="text-white text-4xl font-bold leading-tight lg:text-5xl mb-6">
              California Privacy Policy
            </h1>
            <p className="text-white/90 text-lg">
              Effective Date: April 14, 2024
            </p>
          </div>
        </div>
      </section>

      {/* Content */}
      <section className="w-full py-16 lg:py-20">
        <div className="container">
          <div className="max-w-3xl mx-auto prose prose-gray prose-lg">
            <p className="text-gray-600 leading-relaxed mb-8">
              This California Privacy Policy supplements the{' '}
              <Link href="/privacy-policy" className="text-theme-primary hover:underline">
                Quick Lenders Privacy Policy
              </Link>{' '}
              and applies specifically to residents of California, in accordance
              with the California Consumer Privacy Act (CCPA). It describes how
              we collect, use, and disclose personal information of California
              consumers.
            </p>

            <h2 className="text-theme-primary-dark text-2xl font-bold mt-10 mb-4">
              Categories of Personal Information We Collect
            </h2>
            <p className="text-gray-600 leading-relaxed mb-4">
              In the preceding twelve months, we may have collected the
              following categories of personal information:
            </p>
            <ul className="list-disc pl-6 text-gray-600 space-y-2 mb-6">
              <li>
                <strong>Identifiers</strong> — such as your name, email address,
                phone number, and IP address
              </li>
              <li>
                <strong>Financial Information</strong> — such as business
                revenue, loan amount requested, and time in business
              </li>
              <li>
                <strong>Commercial Information</strong> — records of services
                considered or requested through our website
              </li>
              <li>
                <strong>Internet or Network Activity</strong> — browsing
                history, search history, and interactions with our website
              </li>
              <li>
                <strong>Geolocation Data</strong> — approximate location derived
                from your IP address
              </li>
              <li>
                <strong>Professional or Employment Information</strong> — such
                as job title, industry, and business type
              </li>
            </ul>

            <h2 className="text-theme-primary-dark text-2xl font-bold mt-10 mb-4">
              How We Use Personal Information
            </h2>
            <p className="text-gray-600 leading-relaxed mb-4">
              We may use the personal information we collect for the following
              business purposes:
            </p>
            <ul className="list-disc pl-6 text-gray-600 space-y-2 mb-6">
              <li>To fulfill and process your financing inquiry</li>
              <li>To match you with lending partners in our network</li>
              <li>To communicate with you about your request</li>
              <li>To improve and optimize our website and services</li>
              <li>To detect and prevent fraud or security incidents</li>
              <li>To comply with legal and regulatory obligations</li>
              <li>To provide customer support and respond to inquiries</li>
            </ul>

            <h2 className="text-theme-primary-dark text-2xl font-bold mt-10 mb-4">
              Sharing of Personal Information
            </h2>
            <p className="text-gray-600 leading-relaxed mb-4">
              We may share your personal information with third-party lending
              partners for the purpose of matching you with financing options.
              When we share information with service providers or partners, we
              require them to maintain the confidentiality and security of your
              data through contractual obligations.
            </p>

            <h2 className="text-theme-primary-dark text-2xl font-bold mt-10 mb-4">
              Your Rights Under the CCPA
            </h2>
            <p className="text-gray-600 leading-relaxed mb-4">
              As a California resident, you have the following rights:
            </p>
            <ul className="list-disc pl-6 text-gray-600 space-y-2 mb-6">
              <li>
                <strong>Right to Know</strong> — You may request information
                about the categories and specific pieces of personal information
                we have collected, the sources, the business purposes, and the
                third parties with whom we share it.
              </li>
              <li>
                <strong>Right to Delete</strong> — You may request that we
                delete the personal information we have collected about you,
                subject to certain exceptions.
              </li>
              <li>
                <strong>Right to Non-Discrimination</strong> — We will not
                discriminate against you for exercising your CCPA rights. You
                will not receive different pricing or quality of service for
                making a request.
              </li>
            </ul>

            <h2 className="text-theme-primary-dark text-2xl font-bold mt-10 mb-4">
              How to Exercise Your Rights
            </h2>
            <p className="text-gray-600 leading-relaxed mb-4">
              To submit a request to know or a request to delete your personal
              information, please contact us at{' '}
              <a
                href="mailto:info@quicklenders.com"
                className="text-theme-primary hover:underline"
              >
                info@quicklenders.com
              </a>
              . We will verify your identity before processing your request and
              respond within the timeframes required by law.
            </p>

            <h2 className="text-theme-primary-dark text-2xl font-bold mt-10 mb-4">
              Changes to This Policy
            </h2>
            <p className="text-gray-600 leading-relaxed mb-4">
              We reserve the right to amend this California Privacy Policy at
              any time. Changes will be posted on this page with an updated
              effective date.
            </p>

            <h2 className="text-theme-primary-dark text-2xl font-bold mt-10 mb-4">
              Contact Us
            </h2>
            <p className="text-gray-600 leading-relaxed">
              If you have any questions about this California Privacy Policy or
              wish to exercise your rights, please contact us at{' '}
              <a
                href="mailto:info@quicklenders.com"
                className="text-theme-primary hover:underline"
              >
                info@quicklenders.com
              </a>{' '}
              or call{' '}
              <a
                href="tel:3039218529"
                className="text-theme-primary hover:underline"
              >
                (303) 921-8529
              </a>{' '}
              during business hours, Monday through Friday, 9:00 AM to 5:00 PM
              MST.
            </p>
          </div>
        </div>
      </section>
    </main>
  )
}
