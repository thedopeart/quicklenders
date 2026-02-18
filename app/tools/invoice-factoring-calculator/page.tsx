import Link from 'next/link'
import { generatePageMetadata } from '@/lib/metadata'
import { breadcrumbSchema, faqSchema, softwareApplicationSchema } from '@/lib/schema'
import { getToolBySlug } from '@/lib/tools-data'
import ToolPageLayout from '@/components/ToolPageLayout'
import InvoiceFactoringTool from './InvoiceFactoringTool'

const tool = getToolBySlug('invoice-factoring-calculator')!

export const metadata = generatePageMetadata({
  title: tool.seo.title,
  description: tool.seo.description,
  path: `/tools/${tool.slug}`,
})

const howItWorks = [
  {
    title: 'Enter Your Invoice Details',
    text: 'Input the total value of invoices you want to factor. Use presets for common amounts or type your own.',
  },
  {
    title: 'Set Your Terms',
    text: 'Adjust the advance rate, factoring fee, and average days to payment to match your offer or expected terms.',
  },
  {
    title: 'Review the Full Breakdown',
    text: 'See your Day 1 advance, reserve release, total cost, effective APR, and a worth-it analysis to decide if factoring fits.',
  },
]

const whatYouGet = [
  {
    title: 'Day 1 Advance Amount',
    text: 'The cash you receive immediately when you submit your invoices to the factoring company.',
  },
  {
    title: 'Reserve Release Calculation',
    text: 'How much you get back when your customer pays, after the factoring fee and any additional fees are deducted.',
  },
  {
    title: 'Total Cost & Effective APR',
    text: 'The full cost of factoring including fees, plus the annualized equivalent rate for comparison with other financing.',
  },
  {
    title: 'Monthly & Annual Projection',
    text: 'If you factor regularly, see the total monthly volume and annual cost based on your invoice count.',
  },
  {
    title: 'Worth-It Analysis',
    text: 'A clear breakdown of when factoring makes sense and when you might save money with alternatives like a line of credit.',
  },
  {
    title: 'Dynamic Next Steps',
    text: 'Personalized guidance based on your cost level, with a direct path to explore factoring or lower-cost alternatives.',
  },
]

export default function InvoiceFactoringCalculatorPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(
            breadcrumbSchema([
              { name: 'Home', url: '/' },
              { name: 'Tools', url: '/tools' },
              { name: 'Invoice Factoring Calculator', url: '/tools/invoice-factoring-calculator' },
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
              How Much Will Invoice Factoring Cost Your Business?
            </h2>
            <p className="text-gray-700 leading-relaxed mb-4">
              Invoice factoring turns your unpaid invoices into immediate working capital. Instead of waiting 30, 60, or 90 days for customers to pay, a factoring company advances you <strong>80% to 90%</strong> of the invoice value upfront. When the customer pays, you receive the remaining balance minus the factoring fee. This calculator shows you exactly what that process costs with your numbers.
            </p>
            <p className="text-gray-700 leading-relaxed mb-4">
              The true cost of factoring depends on three main variables: the <strong>fee rate (typically 1% to 5% per 30 days)</strong>, how quickly your customers pay, and whether there are additional processing fees. A 3% fee on a Net 30 invoice is straightforward. But if your customers take 60 days, that same rate effectively doubles because the fee accrues per 30-day period. This calculator handles that math automatically.
            </p>

            <h3 className="text-xl font-bold text-quicklend-900 mb-3 mt-6">Understanding the Effective APR</h3>
            <p className="text-gray-700 leading-relaxed mb-4">
              Factoring is not a loan, so comparing it to loan APR is not a perfect match. Still, the annualized rate helps put the cost in context. A 3% factoring fee on a 30-day invoice translates to roughly <strong>36% to 43% APR equivalent</strong>. That sounds high, but the comparison is misleading if you only need funds for 30 days. A <Link href="/business-loans/lines-of-credit" className="text-theme-primary-light font-medium hover:underline">business line of credit</Link> at 12% APR would cost less in interest, but may require stronger credit and take weeks to set up. Factoring can fund within 24 hours.
            </p>

            <h3 className="text-xl font-bold text-quicklend-900 mb-3 mt-6">Factoring vs. Other Financing</h3>
            <p className="text-gray-700 leading-relaxed mb-4">
              For one-time cash flow gaps, factoring is fast and accessible. For ongoing working capital needs, the annual cost adds up. If you factor <strong>$50,000 per month</strong> at 3%, that is <strong>$18,000 per year</strong> in fees. A <Link href="/business-loans/lines-of-credit" className="text-theme-primary-light font-medium hover:underline">line of credit</Link> or <Link href="/business-loans/term-loans" className="text-theme-primary-light font-medium hover:underline">term loan</Link> would likely cost less for the same access to capital. Use our <Link href="/tools/line-of-credit-interest-calculator" className="text-theme-primary-light font-medium hover:underline">line of credit interest calculator</Link> to compare costs directly.
            </p>

            <h3 className="text-xl font-bold text-quicklend-900 mb-3 mt-6">Who Uses Invoice Factoring?</h3>
            <p className="text-gray-700 leading-relaxed">
              B2B businesses with creditworthy customers and long payment cycles are the primary users. Trucking companies, staffing agencies, manufacturers, construction firms, and wholesale distributors all rely on factoring to bridge the gap between completing work and receiving payment. If your customers are established businesses or government agencies paying on Net 30 to Net 90 terms, factoring could be a fit. Approval is based primarily on your customers&apos; creditworthiness, not yours. Check your <Link href="/tools/dscr-calculator" className="text-theme-primary-light font-medium hover:underline">debt service coverage ratio</Link> to see how lenders view your overall capacity, or <Link href="/get-started" className="text-theme-primary-light font-medium hover:underline">talk to a funding specialist</Link> to explore all your options.
            </p>
          </div>
        }
      >
        <InvoiceFactoringTool />
      </ToolPageLayout>
    </>
  )
}
