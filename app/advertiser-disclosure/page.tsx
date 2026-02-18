import { generatePageMetadata } from '@/lib/metadata'
import { breadcrumbSchema } from '@/lib/schema'

export const metadata = generatePageMetadata({
  title: 'Advertiser Disclosure | Quick Lenders',
  description:
    'How Quick Lenders earns revenue, how lending partners are selected, and how our editorial content remains independent. Full transparency about our business model.',
  path: '/advertiser-disclosure',
})

export default function AdvertiserDisclosurePage() {
  const breadcrumbs = breadcrumbSchema([
    { name: 'Home', url: '/' },
    { name: 'Advertiser Disclosure', url: '/advertiser-disclosure' },
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
          <div className="max-w-3xl mx-auto text-center">
            <h1 className="text-white text-4xl font-bold leading-tight lg:text-5xl mb-6">
              Advertiser Disclosure
            </h1>
            <p className="text-white/90 text-lg">
              Last updated: February 11, 2026
            </p>
          </div>
        </div>
      </section>

      {/* Content */}
      <section className="w-full py-16 lg:py-20">
        <div className="container">
          <div className="max-w-3xl mx-auto prose prose-gray prose-lg">
            <p className="text-gray-600 leading-relaxed mb-8">
              Quick Lenders believes in full transparency about how we operate
              and earn revenue. This disclosure explains our business model, how
              we select lending partners, and how we maintain the independence
              of our editorial content.
            </p>

            <h2 className="text-theme-primary-dark text-2xl font-bold mt-10 mb-4">
              How Quick Lenders Makes Money
            </h2>
            <p className="text-gray-600 leading-relaxed mb-4">
              Quick Lenders is a lead generation and referral service for
              business financing. We earn revenue when we connect business
              owners with lending partners in our network. When you submit a
              financing request through our website, we may share your
              information with one or more lenders who may offer you a loan or
              financing product. If a lender funds your loan, we may receive a
              referral fee from that lender.
            </p>
            <p className="text-gray-600 leading-relaxed mb-4">
              This service is free to you. You are never charged a fee by Quick
              Lenders for using our website, tools, educational content, or
              referral service. Any fees associated with a loan are determined
              by the lender and disclosed in your loan agreement.
            </p>

            <h2 className="text-theme-primary-dark text-2xl font-bold mt-10 mb-4">
              How We Select Lending Partners
            </h2>
            <p className="text-gray-600 leading-relaxed mb-4">
              We work with a network of lenders that offer a range of business
              financing products, including term loans, SBA loans, lines of
              credit, equipment financing, invoice factoring, and merchant cash
              advances. Our lending partners are selected based on:
            </p>
            <ul className="list-disc pl-6 text-gray-600 space-y-2 mb-6">
              <li>
                The range of products they offer and the business profiles they
                serve
              </li>
              <li>
                Their reputation and track record in the business lending
                industry
              </li>
              <li>
                Competitive rates and terms relative to the market
              </li>
              <li>
                Their responsiveness and service quality for referred borrowers
              </li>
            </ul>

            <h2 className="text-theme-primary-dark text-2xl font-bold mt-10 mb-4">
              What This Means for You
            </h2>
            <p className="text-gray-600 leading-relaxed mb-4">
              When you use our site to explore financing options or submit a
              request, you should know:
            </p>
            <ul className="list-disc pl-6 text-gray-600 space-y-2 mb-6">
              <li>
                We may earn a fee if you are funded through one of our lending
                partners.
              </li>
              <li>
                The order in which lenders or products appear on our site may
                be influenced by our business relationships, though we strive
                to present options that match your stated needs.
              </li>
              <li>
                We do not guarantee approval, specific rates, or loan terms.
                All lending decisions are made by individual lenders based on
                their own underwriting criteria.
              </li>
              <li>
                You are not obligated to accept any offer presented through our
                service. We encourage you to compare multiple options before
                making a decision.
              </li>
            </ul>

            <h2 className="text-theme-primary-dark text-2xl font-bold mt-10 mb-4">
              Editorial Independence
            </h2>
            <p className="text-gray-600 leading-relaxed mb-4">
              Our editorial content, including articles, guides, calculators,
              and tools, is created independently of our advertising and
              referral relationships. Our writers and editors are not
              compensated based on whether readers apply for or receive
              financing. The information we publish is intended to educate and
              inform, not to steer readers toward any particular lender or
              product.
            </p>
            <p className="text-gray-600 leading-relaxed mb-4">
              When our content mentions specific loan types, rate ranges, or
              qualification requirements, those references are based on general
              market data, SBA guidelines, and publicly available lender
              information. They are not endorsements of specific lending
              partners.
            </p>
            <p className="text-gray-600 leading-relaxed mb-4">
              For more details about how we create and maintain our content, see
              our{' '}
              <a
                href="/editorial-policy"
                className="text-theme-primary hover:underline"
              >
                Editorial Policy
              </a>
              .
            </p>

            <h2 className="text-theme-primary-dark text-2xl font-bold mt-10 mb-4">
              Not Financial Advice
            </h2>
            <p className="text-gray-600 leading-relaxed mb-4">
              The content on Quick Lenders is for informational and educational
              purposes only. It is not financial, legal, or tax advice. Loan
              products, rates, terms, and availability vary by lender and may
              change without notice. We recommend that business owners consult
              with qualified financial professionals before making borrowing
              decisions.
            </p>

            <h2 className="text-theme-primary-dark text-2xl font-bold mt-10 mb-4">
              Contact Us
            </h2>
            <p className="text-gray-600 leading-relaxed">
              If you have questions about this disclosure or our business
              practices, please contact us at{' '}
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
