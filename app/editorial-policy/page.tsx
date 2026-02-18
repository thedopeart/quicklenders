import { generatePageMetadata } from '@/lib/metadata'
import { breadcrumbSchema } from '@/lib/schema'

export const metadata = generatePageMetadata({
  title: 'Editorial Policy | Quick Lenders Content Standards',
  description:
    'How Quick Lenders creates, reviews, and maintains accurate financial content. Our standards for business lending education, fact-checking, and editorial independence.',
  path: '/editorial-policy',
})

export default function EditorialPolicyPage() {
  const breadcrumbs = breadcrumbSchema([
    { name: 'Home', url: '/' },
    { name: 'Editorial Policy', url: '/editorial-policy' },
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
              Editorial Policy
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
              Quick Lenders is committed to providing accurate, helpful, and
              trustworthy information about business financing. Our content is
              designed to help small business owners understand their funding
              options, compare loan products, and make financial decisions with
              confidence. This editorial policy explains how we create, review,
              and maintain our content.
            </p>

            <h2 className="text-theme-primary-dark text-2xl font-bold mt-10 mb-4">
              Our Mission
            </h2>
            <p className="text-gray-600 leading-relaxed mb-4">
              We believe that every business owner deserves access to clear,
              straightforward information about business lending. The financing
              industry can be complex, and many business owners struggle to find
              unbiased guidance. Our goal is to bridge that gap by publishing
              content that explains loan products, qualification requirements,
              costs, and alternatives in plain language.
            </p>

            <h2 className="text-theme-primary-dark text-2xl font-bold mt-10 mb-4">
              Content Standards
            </h2>
            <p className="text-gray-600 leading-relaxed mb-4">
              All content published on Quick Lenders must meet the following
              standards:
            </p>
            <ul className="list-disc pl-6 text-gray-600 space-y-2 mb-6">
              <li>
                <strong>Accuracy:</strong> Financial figures, interest rates,
                qualification requirements, and loan terms must be sourced from
                official lender documentation, SBA guidelines, or established
                industry benchmarks. We do not publish unverified claims.
              </li>
              <li>
                <strong>Clarity:</strong> Content is written for business owners,
                not financial professionals. We avoid unnecessary jargon and
                explain technical terms when they are used.
              </li>
              <li>
                <strong>Completeness:</strong> Articles and tools cover the full
                picture, including costs, risks, and alternatives. We do not
                present only the positive aspects of any financial product.
              </li>
              <li>
                <strong>Objectivity:</strong> Our editorial content is
                independent of our business relationships. Advertising and
                partner relationships do not influence the information we
                publish. See our{' '}
                <a
                  href="/advertiser-disclosure"
                  className="text-theme-primary hover:underline"
                >
                  Advertiser Disclosure
                </a>{' '}
                for details.
              </li>
            </ul>

            <h2 className="text-theme-primary-dark text-2xl font-bold mt-10 mb-4">
              How We Create Content
            </h2>
            <p className="text-gray-600 leading-relaxed mb-4">
              Our content creation process follows these steps:
            </p>
            <ul className="list-disc pl-6 text-gray-600 space-y-2 mb-6">
              <li>
                <strong>Research:</strong> Writers research topics using primary
                sources including SBA.gov, Federal Reserve data, lender program
                guidelines, and industry reports from organizations like the
                National Small Business Association.
              </li>
              <li>
                <strong>Writing:</strong> Content is drafted with a focus on
                practical, actionable information that business owners can apply
                to their own situations.
              </li>
              <li>
                <strong>Review:</strong> All content is reviewed for factual
                accuracy, completeness, and clarity before publication. Financial
                claims are cross-referenced against source material.
              </li>
              <li>
                <strong>Publication:</strong> Approved content is published with
                clear attribution and relevant dates.
              </li>
            </ul>

            <h2 className="text-theme-primary-dark text-2xl font-bold mt-10 mb-4">
              Author Qualifications
            </h2>
            <p className="text-gray-600 leading-relaxed mb-4">
              Content on Quick Lenders is written and reviewed by professionals
              with direct experience in business lending, small business
              finance, and financial services. Our contributors have hands-on
              experience helping businesses secure financing and understand
              the lending process from both sides of the table.
            </p>

            <h2 className="text-theme-primary-dark text-2xl font-bold mt-10 mb-4">
              Calculator and Tool Methodology
            </h2>
            <p className="text-gray-600 leading-relaxed mb-4">
              Our financial calculators and interactive tools use standard
              financial formulas that are widely accepted in the lending
              industry. These include amortization schedules, debt service
              coverage ratio calculations, APR conversions, and break-even
              analyses. Each tool clearly states the formula and assumptions
              used. Calculator results are estimates intended for educational
              purposes and should not be considered binding quotes or guarantees.
            </p>

            <h2 className="text-theme-primary-dark text-2xl font-bold mt-10 mb-4">
              How We Keep Content Current
            </h2>
            <p className="text-gray-600 leading-relaxed mb-4">
              Business lending products, interest rates, and qualification
              requirements change frequently. We maintain our content through:
            </p>
            <ul className="list-disc pl-6 text-gray-600 space-y-2 mb-6">
              <li>
                Regular reviews of published articles to verify that rates,
                terms, and requirements remain accurate
              </li>
              <li>
                Updates when SBA guidelines, lending regulations, or market
                conditions change significantly
              </li>
              <li>
                Clear &ldquo;last updated&rdquo; dates on articles and policy
                pages so readers know when content was most recently verified
              </li>
            </ul>

            <h2 className="text-theme-primary-dark text-2xl font-bold mt-10 mb-4">
              Corrections Policy
            </h2>
            <p className="text-gray-600 leading-relaxed mb-4">
              If we discover an error in published content, we correct it
              promptly. Significant corrections are noted within the article.
              Minor corrections such as typos or formatting issues are made
              without notation. If you believe any information on our site is
              inaccurate, please contact us so we can review and address it.
            </p>

            <h2 className="text-theme-primary-dark text-2xl font-bold mt-10 mb-4">
              Editorial Independence
            </h2>
            <p className="text-gray-600 leading-relaxed mb-4">
              Quick Lenders earns revenue by connecting business owners with
              lending partners. This business model does not influence our
              editorial content. Our articles, guides, calculators, and tools
              are created to serve the reader, not to promote specific lenders
              or products. When we reference specific loan types or lender
              categories, we do so based on what is relevant and helpful to the
              topic, not based on business relationships.
            </p>

            <h2 className="text-theme-primary-dark text-2xl font-bold mt-10 mb-4">
              What We Are Not
            </h2>
            <p className="text-gray-600 leading-relaxed mb-4">
              Quick Lenders provides educational content about business
              financing. We are not a lender, bank, or financial advisor. The
              information on our site should not be considered financial, legal,
              or tax advice. Business owners should consult with qualified
              professionals before making financing decisions. Loan terms,
              rates, and approval are determined by individual lenders based on
              their own underwriting criteria.
            </p>

            <h2 className="text-theme-primary-dark text-2xl font-bold mt-10 mb-4">
              Contact Us
            </h2>
            <p className="text-gray-600 leading-relaxed">
              If you have questions about our editorial standards, want to
              report an error, or have feedback about our content, please
              contact us at{' '}
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
