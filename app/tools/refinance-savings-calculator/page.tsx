import Link from 'next/link'
import { generatePageMetadata } from '@/lib/metadata'
import { breadcrumbSchema, faqSchema, softwareApplicationSchema } from '@/lib/schema'
import { getToolBySlug } from '@/lib/tools-data'
import ToolPageLayout from '@/components/ToolPageLayout'
import RefinanceSavingsTool from './RefinanceSavingsTool'

const tool = getToolBySlug('refinance-savings-calculator')!

export const metadata = generatePageMetadata({
  title: tool.seo.title,
  description: tool.seo.description,
  path: `/tools/${tool.slug}`,
})

const howItWorks = [
  {
    title: 'Enter Current Loan Details',
    text: 'Input your remaining balance, interest rate, months left, and current monthly payment.',
  },
  {
    title: 'Add the New Offer',
    text: 'Enter the new rate, term, origination fee, closing costs, and any prepayment penalty on your existing loan.',
  },
  {
    title: 'See Your Savings',
    text: 'Get monthly savings, total interest saved, net savings after fees, and a break-even timeline.',
  },
]

const whatYouGet = [
  {
    title: 'Monthly Payment Comparison',
    text: 'Current payment versus new payment, so you can see how much cash flow improves each month.',
  },
  {
    title: 'Total Interest Savings',
    text: 'How much less you pay in interest over the life of the new loan compared to the old one.',
  },
  {
    title: 'Net Savings After Fees',
    text: 'Interest savings minus all refinance costs, including origination fees, closing costs, and prepayment penalties.',
  },
  {
    title: 'Break-Even Timeline',
    text: 'The exact number of months it takes for monthly savings to cover the cost of refinancing.',
  },
  {
    title: 'Balance Payoff Chart',
    text: 'Visual comparison of how quickly each loan pays down the balance over time.',
  },
  {
    title: 'Side-by-Side Comparison',
    text: 'A detailed table showing every metric for both loans, so you can compare at a glance.',
  },
]

export default function RefinanceSavingsCalculatorPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(
            breadcrumbSchema([
              { name: 'Home', url: '/' },
              { name: 'Tools', url: '/tools' },
              { name: 'Refinance Savings Calculator', url: '/tools/refinance-savings-calculator' },
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
              When Does Refinancing a Business Loan Make Sense?
            </h2>
            <p className="text-gray-700 leading-relaxed mb-4">
              Refinancing replaces your existing loan with a new one, ideally at a lower rate, better terms, or both. The goal is to reduce your total cost of borrowing or free up cash flow. But refinancing is not free. Origination fees, closing costs, and prepayment penalties on the old loan can eat into your savings. The question is whether the savings exceed the costs. This calculator answers that question with concrete numbers.
            </p>

            <h3 className="text-xl font-bold text-quicklend-900 mb-3 mt-6">Understanding the Break-Even Point</h3>
            <p className="text-gray-700 leading-relaxed mb-4">
              The break-even point is the number of months it takes for your monthly payment savings to cover the upfront cost of refinancing. If your monthly payment drops by $500 and refinancing costs $3,000, the break-even is 6 months. After that, every month of savings is pure gain. If you plan to pay off the loan before the break-even point, refinancing costs you more than it saves. Use our <Link href="/tools/prepayment-penalty-calculator" className="text-theme-primary-light font-medium hover:underline">prepayment penalty calculator</Link> to estimate the cost of exiting your current loan early.
            </p>

            <h3 className="text-xl font-bold text-quicklend-900 mb-3 mt-6">Rate Drop vs Term Extension</h3>
            <p className="text-gray-700 leading-relaxed mb-4">
              A lower rate is the most common reason to refinance. If you originally borrowed at 18% and can refinance at 10%, the interest savings are significant. But watch the term. Extending from 24 months remaining to 60 months drops the monthly payment dramatically, but you may pay more total interest over the longer term. This calculator shows both the monthly savings and the total cost so you can weigh the tradeoff. For a deeper look at monthly payments under different terms, try the <Link href="/tools/loan-payment-calculator" className="text-theme-primary-light font-medium hover:underline">loan payment calculator</Link>.
            </p>

            <h3 className="text-xl font-bold text-quicklend-900 mb-3 mt-6">Getting the Best Refinance Offer</h3>
            <p className="text-gray-700 leading-relaxed">
              Just like your original loan, the best refinance deal comes from comparing multiple offers. Rates, fees, and terms vary widely between lenders. <Link href="/business-loans/term-loans" className="text-theme-primary-light font-medium hover:underline">Term loans</Link> from traditional lenders often have the lowest rates for borrowers with strong credit and revenue history. <Link href="/business-loans/lines-of-credit" className="text-theme-primary-light font-medium hover:underline">Lines of credit</Link> can replace a fixed loan with flexible access to capital. <Link href="/get-started" className="text-theme-primary-light font-medium hover:underline">Talk to a funding specialist</Link> to see what refinance options are available for your business, with no impact to your credit score.
            </p>
          </div>
        }
      >
        <RefinanceSavingsTool />
      </ToolPageLayout>
    </>
  )
}
