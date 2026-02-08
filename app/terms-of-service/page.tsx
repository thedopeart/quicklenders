import { generatePageMetadata } from '@/lib/metadata'
import { breadcrumbSchema } from '@/lib/schema'

export const metadata = generatePageMetadata({
  title: 'Terms of Service | Quick Lenders Agreement',
  description:
    'Review the Terms of Service for Quick Lenders. Understand the terms, conditions, and usage policies that apply when using our website and lending services.',
  path: '/terms-of-service',
})

export default function TermsOfServicePage() {
  const breadcrumbs = breadcrumbSchema([
    { name: 'Home', url: '/' },
    { name: 'Terms of Service', url: '/terms-of-service' },
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
              Terms of Service
            </h1>
            <p className="text-white/90 text-lg">
              Last updated: February 2, 2026
            </p>
          </div>
        </div>
      </section>

      {/* Content */}
      <section className="w-full py-16 lg:py-20">
        <div className="container">
          <div className="max-w-3xl mx-auto prose prose-gray prose-lg">
            <p className="text-gray-600 leading-relaxed mb-8">
              These Terms of Service (&quot;Terms&quot;) govern your use of the
              Quick Lenders website at quicklenders.com (&quot;Website&quot;) and
              the services we provide. By using our Website, you agree to these
              Terms. If you do not agree, please do not use our Website.
            </p>

            <h2 className="text-theme-primary-dark text-2xl font-bold mt-10 mb-4">
              Our Services
            </h2>
            <p className="text-gray-600 leading-relaxed mb-4">
              Quick Lenders is a lead generation and referral service. We connect
              business owners with third-party lending partners who may offer
              financing. We are not a lender, bank, or financial institution. We
              do not make loans, credit decisions, or guarantees of any kind.
            </p>
            <p className="text-gray-600 leading-relaxed mb-4">
              Any financing you receive is provided by a third-party lender, not
              by Quick Lenders. The terms, rates, and conditions of any loan or
              financing product are determined solely by the lender. We encourage
              you to review all loan documents carefully before accepting any
              offer.
            </p>

            <h2 className="text-theme-primary-dark text-2xl font-bold mt-10 mb-4">
              Not Financial Advice
            </h2>
            <p className="text-gray-600 leading-relaxed mb-4">
              Nothing on this Website constitutes financial, legal, or tax
              advice. The information provided is for general informational
              purposes only. We recommend consulting with a qualified financial
              advisor, accountant, or attorney before making any financial
              decisions.
            </p>

            <h2 className="text-theme-primary-dark text-2xl font-bold mt-10 mb-4">
              Information Accuracy
            </h2>
            <p className="text-gray-600 leading-relaxed mb-4">
              We make reasonable efforts to keep the information on our Website
              current and accurate. However, we do not guarantee that all
              information is complete, up to date, or free of errors. Loan
              amounts, interest rates, terms, and other figures displayed on our
              Website are approximate and may vary based on your qualifications,
              the lender, and market conditions.
            </p>
            <p className="text-gray-600 leading-relaxed mb-4">
              Rate and term ranges shown on our Website are estimates provided
              for informational purposes. Actual rates and terms will be
              determined by the lender based on your application and
              creditworthiness.
            </p>

            <h2 className="text-theme-primary-dark text-2xl font-bold mt-10 mb-4">
              Referral Fees
            </h2>
            <p className="text-gray-600 leading-relaxed mb-4">
              Quick Lenders earns referral fees or commissions from lending
              partners when a referred borrower closes on a financing product.
              This compensation does not increase the cost of financing to the
              borrower.
            </p>

            <h2 className="text-theme-primary-dark text-2xl font-bold mt-10 mb-4">
              User Responsibilities
            </h2>
            <p className="text-gray-600 leading-relaxed mb-4">
              When using our Website and submitting information through our
              forms, you agree to:
            </p>
            <ul className="list-disc pl-6 text-gray-600 space-y-2 mb-6">
              <li>Provide accurate and truthful information</li>
              <li>Use the Website only for lawful purposes</li>
              <li>Not submit false, misleading, or fraudulent information</li>
              <li>Not interfere with the operation of the Website</li>
            </ul>

            <h2 className="text-theme-primary-dark text-2xl font-bold mt-10 mb-4">
              Third-Party Lenders and Websites
            </h2>
            <p className="text-gray-600 leading-relaxed mb-4">
              Our Website may contain links to third-party websites, including
              those of our lending partners. We do not control and are not
              responsible for the content, policies, or practices of any
              third-party websites. Your interactions with third-party lenders
              are governed by their own terms and privacy policies.
            </p>

            <h2 className="text-theme-primary-dark text-2xl font-bold mt-10 mb-4">
              Limitation of Liability
            </h2>
            <p className="text-gray-600 leading-relaxed mb-4">
              To the fullest extent permitted by law, Quick Lenders shall not be
              liable for any indirect, incidental, special, or consequential
              damages arising out of your use of the Website or reliance on any
              information provided. We are not liable for any decisions you make
              based on information found on our Website or for the actions of any
              third-party lender.
            </p>

            <h2 className="text-theme-primary-dark text-2xl font-bold mt-10 mb-4">
              Intellectual Property
            </h2>
            <p className="text-gray-600 leading-relaxed mb-4">
              All content on this Website, including text, graphics, logos, and
              design, is the property of Quick Lenders or its licensors. You may
              not reproduce, distribute, or use any content from this Website
              without our written permission.
            </p>

            <h2 className="text-theme-primary-dark text-2xl font-bold mt-10 mb-4">
              Changes to These Terms
            </h2>
            <p className="text-gray-600 leading-relaxed mb-4">
              We may update these Terms at any time. Changes will be posted on
              this page with a revised effective date. Your continued use of the
              Website after any changes constitutes your acceptance of the
              updated Terms.
            </p>

            <h2 className="text-theme-primary-dark text-2xl font-bold mt-10 mb-4">
              Governing Law
            </h2>
            <p className="text-gray-600 leading-relaxed mb-4">
              These Terms are governed by and construed in accordance with the
              laws of the State of Colorado, without regard to conflict of law
              principles.
            </p>

            <h2 className="text-theme-primary-dark text-2xl font-bold mt-10 mb-4">
              Contact Us
            </h2>
            <p className="text-gray-600 leading-relaxed">
              If you have questions about these Terms, please contact us at{' '}
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
