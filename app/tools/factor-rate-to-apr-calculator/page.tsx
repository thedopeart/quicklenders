import Link from 'next/link'
import { generatePageMetadata } from '@/lib/metadata'
import { breadcrumbSchema, faqSchema, softwareApplicationSchema } from '@/lib/schema'
import { getToolBySlug } from '@/lib/tools-data'
import ToolPageLayout from '@/components/ToolPageLayout'
import FactorRateCalculatorTool from './FactorRateCalculatorTool'

const tool = getToolBySlug('factor-rate-to-apr-calculator')!

export const metadata = generatePageMetadata({
  title: tool.seo.title,
  description: tool.seo.description,
  path: `/tools/${tool.slug}`,
})

const howItWorks = [
  {
    title: 'Enter Your Terms',
    text: 'Input your loan or advance amount, the factor rate quoted by your lender, the repayment term, and your payment frequency.',
  },
  {
    title: 'See the True APR',
    text: 'The calculator instantly converts your factor rate to an annualized percentage rate so you can understand the real cost of borrowing.',
  },
  {
    title: 'Compare Your Options',
    text: 'Use the APR result to compare this financing against traditional business loans, lines of credit, and other products.',
  },
]

const whatYouGet = [
  {
    title: 'Instant APR Conversion',
    text: 'Convert any factor rate to an annualized percentage rate in seconds to understand the true annual cost.',
  },
  {
    title: 'Total Repayment Amount',
    text: 'See exactly how much you will repay in total: the original amount plus all interest and fees.',
  },
  {
    title: 'Cost per Dollar Borrowed',
    text: 'Know the exact cost of every dollar you borrow, making it easy to compare financing options.',
  },
  {
    title: 'Payment Schedule Breakdown',
    text: 'View your daily, weekly, or monthly payment amount and total number of payments.',
  },
  {
    title: 'Context and Comparison',
    text: 'Educational callouts help you understand whether your APR is high, average, or competitive relative to traditional financing.',
  },
  {
    title: 'Actionable Next Steps',
    text: 'If your APR is too high, connect directly with our funding specialists to explore lower-cost alternatives.',
  },
]

export default function FactorRateCalculatorPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(
            breadcrumbSchema([
              { name: 'Home', url: '/' },
              { name: 'Tools', url: '/tools' },
              { name: 'Factor Rate to APR Calculator', url: '/tools/factor-rate-to-apr-calculator' },
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
              Understanding Factor Rates and Why APR Matters
            </h2>
            <p className="text-gray-700 leading-relaxed mb-4">
              Factor rates are commonly used in merchant cash advances and short-term business financing. Unlike traditional interest rates quoted as an annual percentage, a <strong>factor rate</strong> is a simple decimal multiplier applied to your total advance amount. While this makes the calculation straightforward (multiply your advance by the factor rate to get your total repayment), it can mask the true cost of borrowing, especially on shorter terms.
            </p>
            <p className="text-gray-700 leading-relaxed mb-4">
              For example, a <strong>factor rate of 1.35 on a $50,000 advance</strong> means you repay <strong>$67,500 total</strong>, which is $17,500 in fees. If the repayment term is 6 months, the annualized cost is roughly <strong>70% APR</strong>. That same factor rate over 12 months drops to about <strong>35% APR</strong>. This is why converting to APR is critical: the same factor rate represents dramatically different costs depending on how quickly you repay.
            </p>
            <p className="text-gray-700 leading-relaxed mb-4">
              Traditional <Link href="/business-loans/term-loans" className="text-theme-primary-light font-medium hover:underline">business term loans</Link> use standard interest rates expressed as APR, making comparisons between products straightforward. If you are considering a merchant cash advance or factor-rate-based product, always calculate the equivalent APR first. Our calculator does this instantly, while also showing your total repayment, payment amount, and cost per dollar borrowed.
            </p>
            <p className="text-gray-700 leading-relaxed mb-4">
              For many businesses, switching from a high-factor-rate product to a traditional loan or <Link href="/business-loans/lines-of-credit" className="text-theme-primary-light font-medium hover:underline">business line of credit</Link> can save thousands of dollars in financing costs. If your converted APR exceeds <strong>30-40%</strong>, it may be worth exploring conventional alternatives.
            </p>
            <p className="text-gray-700 leading-relaxed">
              For more insights on evaluating business financing options, visit our <Link href="/financial-insights/cash-loans-direct" className="text-theme-primary-light font-medium hover:underline">guide to direct cash loans</Link>. To calculate payments on traditional interest-rate loans, try our <Link href="/tools/loan-payment-calculator" className="text-theme-primary-light font-medium hover:underline">Loan Payment Calculator</Link>.
            </p>
          </div>
        }
      >
        <FactorRateCalculatorTool />
      </ToolPageLayout>
    </>
  )
}
