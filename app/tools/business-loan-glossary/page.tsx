import Link from 'next/link'
import { generatePageMetadata } from '@/lib/metadata'
import { breadcrumbSchema, faqSchema, softwareApplicationSchema } from '@/lib/schema'
import { getToolBySlug } from '@/lib/tools-data'
import ToolPageLayout from '@/components/ToolPageLayout'
import BusinessLoanGlossaryTool from './BusinessLoanGlossaryTool'

const tool = getToolBySlug('business-loan-glossary')!

export const metadata = generatePageMetadata({
  title: tool.seo.title,
  description: tool.seo.description,
  path: `/tools/${tool.slug}`,
})

const howItWorks = [
  {
    title: 'Search or Browse',
    text: 'Type a keyword to search, or tap a category to filter terms by topic.',
  },
  {
    title: 'Read the Definition',
    text: 'Each term has a plain-language explanation of what it means and why it matters for borrowers.',
  },
  {
    title: 'Explore Related Terms',
    text: 'Click related terms to jump between connected concepts and build your understanding.',
  },
]

const whatYouGet = [
  {
    title: 'Plain-Language Definitions',
    text: 'Every term explained in simple, clear language without jargon or legalese.',
  },
  {
    title: 'Category Filtering',
    text: 'Browse by loan types, financial metrics, costs and fees, application terms, collateral, or repayment.',
  },
  {
    title: 'Keyword Search',
    text: 'Find any term instantly by typing a keyword. Searches term names, definitions, and categories.',
  },
  {
    title: 'Related Terms',
    text: 'Each definition links to related concepts so you can build a complete picture.',
  },
  {
    title: 'Alphabetical Organization',
    text: 'Terms grouped by letter for quick browsing when you want to scan the full list.',
  },
  {
    title: '40+ Terms Covered',
    text: 'From APR to Working Capital, covering the most important concepts for business borrowers.',
  },
]

export default function BusinessLoanGlossaryPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(
            breadcrumbSchema([
              { name: 'Home', url: '/' },
              { name: 'Tools', url: '/tools' },
              { name: 'Business Loan Glossary', url: '/tools/business-loan-glossary' },
            ])
          ),
        }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(
            softwareApplicationSchema({
              name: tool.name,
              description: tool.longDescription,
              url: `/tools/${tool.slug}`,
            })
          ),
        }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(
            faqSchema(tool.faqs.map((f) => ({ question: f.question, answer: f.schemaAnswer })))
          ),
        }}
      />

      <ToolPageLayout
        tool={tool}
        howItWorks={howItWorks}
        whatYouGet={whatYouGet}
        seoContent={
          <div>
            <h2 className="text-2xl font-bold text-quicklend-900 mb-4">
              Speaking the Language of Business Lending
            </h2>
            <p className="text-gray-700 leading-relaxed mb-4">
              Business financing comes with its own vocabulary. <strong>APR</strong>, <strong>DSCR</strong>, <strong>factor rate</strong>, <strong>UCC filing</strong>, <strong>holdback</strong>, <strong>amortization</strong>. When a lender uses these terms in a conversation or term sheet, understanding them means you can ask better questions and spot unfavorable terms. This glossary covers the most important concepts in plain language, so you can walk into any lending conversation informed.
            </p>

            <h3 className="text-xl font-bold text-quicklend-900 mb-3 mt-6">Rates and Costs: Know What You Are Paying</h3>
            <p className="text-gray-700 leading-relaxed mb-4">
              The difference between APR, interest rate, factor rate, and effective APR trips up many borrowers. An <strong>interest rate</strong> is just the cost of borrowing the principal. <strong>APR</strong> includes fees. A <strong>factor rate</strong> multiplies the advance amount to determine total repayment. <strong>Effective APR</strong> shows the true cost after all fees reduce your net proceeds. Our <Link href="/tools/total-cost-of-capital-calculator" className="text-theme-primary-light font-medium hover:underline">total cost of capital calculator</Link> and <Link href="/tools/factor-rate-to-apr-calculator" className="text-theme-primary-light font-medium hover:underline">factor rate converter</Link> translate between these numbers so you can compare offers on a level playing field.
            </p>

            <h3 className="text-xl font-bold text-quicklend-900 mb-3 mt-6">Financial Metrics Lenders Care About</h3>
            <p className="text-gray-700 leading-relaxed mb-4">
              <strong>DSCR (debt service coverage ratio)</strong> tells a lender whether your cash flow can cover the loan payment. <strong>Working capital</strong> shows if you can handle short-term obligations. <strong>DTI (debt-to-income ratio)</strong> indicates how much of your income already goes to debt. Each metric tells the lender something different about your financial health. Use our <Link href="/tools/dscr-calculator" className="text-theme-primary-light font-medium hover:underline">DSCR calculator</Link> and <Link href="/tools/working-capital-calculator" className="text-theme-primary-light font-medium hover:underline">working capital calculator</Link> to check where you stand before applying.
            </p>

            <h3 className="text-xl font-bold text-quicklend-900 mb-3 mt-6">Understanding Loan Types</h3>
            <p className="text-gray-700 leading-relaxed">
              Not all financing works the same way. <Link href="/business-loans/term-loans" className="text-theme-primary-light font-medium hover:underline">Term loans</Link> give you a lump sum with fixed payments. <Link href="/business-loans/lines-of-credit" className="text-theme-primary-light font-medium hover:underline">Lines of credit</Link> let you draw and repay as needed. <Link href="/business-loans/equipment-financing" className="text-theme-primary-light font-medium hover:underline">Equipment financing</Link> uses the equipment as collateral. MCAs advance cash against future revenue. Each has different costs, requirements, and tradeoffs. Take our <Link href="/tools/loan-finder-quiz" className="text-theme-primary-light font-medium hover:underline">loan finder quiz</Link> to see which type fits your situation, or <Link href="/get-started" className="text-theme-primary-light font-medium hover:underline">talk to a funding specialist</Link> for personalized guidance, with no impact to your credit score.
            </p>
          </div>
        }
      >
        <BusinessLoanGlossaryTool />
      </ToolPageLayout>
    </>
  )
}
