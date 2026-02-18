import Link from 'next/link'
import { generatePageMetadata } from '@/lib/metadata'
import { breadcrumbSchema, faqSchema, softwareApplicationSchema } from '@/lib/schema'
import { getToolBySlug } from '@/lib/tools-data'
import ToolPageLayout from '@/components/ToolPageLayout'
import PrepaymentPenaltyTool from './PrepaymentPenaltyTool'

const tool = getToolBySlug('prepayment-penalty-calculator')!

export const metadata = generatePageMetadata({
  title: tool.seo.title,
  description: tool.seo.description,
  path: `/tools/${tool.slug}`,
})

const howItWorks = [
  {
    title: 'Enter Your Current Loan Details',
    text: 'Input your original loan amount, current balance, interest rate, monthly payment, and remaining term.',
  },
  {
    title: 'Set Your Penalty Terms',
    text: 'Choose your penalty type (percentage of balance, SBA declining, minimum interest, flat fee, or none) and enter the rate or amount.',
  },
  {
    title: 'Choose Payoff or Refinance',
    text: 'See the net savings from paying off early, or enter new loan terms to compare the total cost of refinancing with a break-even timeline.',
  },
]

const whatYouGet = [
  {
    title: 'Penalty Amount',
    text: 'Your exact prepayment penalty in dollars, calculated from 5 supported penalty types.',
  },
  {
    title: 'Net Savings (Early Payoff)',
    text: 'Interest saved minus the penalty. Positive means paying early saves you money despite the fee.',
  },
  {
    title: 'Refinance Comparison',
    text: 'Side-by-side table showing current vs refinanced total payments, including penalty and new loan fees.',
  },
  {
    title: 'Break-Even Timeline',
    text: 'How many months until your lower payment covers the upfront costs of refinancing, with a visual bar.',
  },
  {
    title: 'Clear Recommendation',
    text: 'A verdict banner telling you whether to pay early, refinance, or keep your current loan.',
  },
  {
    title: 'Penalty Reference Table',
    text: 'Quick lookup of typical prepayment penalty structures by loan type.',
  },
]

export default function PrepaymentPenaltyCalculatorPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(
            breadcrumbSchema([
              { name: 'Home', url: '/' },
              { name: 'Tools', url: '/tools' },
              { name: 'Prepayment Penalty Calculator', url: '/tools/prepayment-penalty-calculator' },
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
              Understanding Prepayment Penalties
            </h2>
            <p className="text-gray-700 leading-relaxed mb-4">
              Prepayment penalties compensate lenders for the interest income they lose when you pay off early. Not all business loans have them, but many do. The penalty can range from <strong>1% to 5%</strong> of the remaining balance, a minimum number of months of interest, or a flat fee. Some penalties decline over time (like SBA loans), making early payoff more attractive as the loan ages. Before paying off or refinancing any business loan, calculate the penalty and compare it against the interest you would save. That is what this calculator does.
            </p>

            <h3 className="text-xl font-bold text-quicklend-900 mb-3 mt-6">Common Penalty Structures</h3>
            <p className="text-gray-700 leading-relaxed mb-4">
              Bank <Link href="/business-loans/term-loans" className="text-theme-primary-light font-medium hover:underline">term loans</Link> typically charge 1% to 5% of the remaining balance. SBA 7(a) loans have a specific declining structure: <strong>5% in year 1, 3% in year 2, 1% in year 3</strong>, and nothing after that. The SBA penalty only applies when you refinance with another loan, not when you pay off from business cash flow. Online lenders often use "minimum interest" clauses: you owe a set number of months of interest regardless of when you pay off. <Link href="/business-loans/lines-of-credit" className="text-theme-primary-light font-medium hover:underline">Lines of credit</Link> typically have no prepayment penalty, which is one reason they are a flexible financing option. Use our <Link href="/tools/sba-loan-payment-calculator" className="text-theme-primary-light font-medium hover:underline">SBA loan calculator</Link> to model the full cost of SBA financing including fees.
            </p>

            <h3 className="text-xl font-bold text-quicklend-900 mb-3 mt-6">When to Pay the Penalty</h3>
            <p className="text-gray-700 leading-relaxed mb-4">
              The math is straightforward: if the interest you save exceeds the penalty, paying off early makes sense. On a <strong>$100,000 loan at 15% with 36 months left</strong>, remaining interest is roughly <strong>$25,000</strong>. A 3% penalty costs $3,000. <strong>Net savings: $22,000</strong>. For refinancing, you also need to factor in the new loan fees and the break-even timeline. If your break-even is 24 months on a 36-month remaining term, you have 12 months of true savings. If the break-even exceeds your remaining term, refinancing loses money. A good rule: the break-even should be less than half your remaining term. Use our <Link href="/tools/loan-payment-calculator" className="text-theme-primary-light font-medium hover:underline">loan payment calculator</Link> to model different payment scenarios.
            </p>

            <h3 className="text-xl font-bold text-quicklend-900 mb-3 mt-6">Finding Loans Without Penalties</h3>
            <p className="text-gray-700 leading-relaxed">
              When comparing loan offers, always ask about prepayment terms. A slightly higher rate with no penalty can be cheaper long-term than a lower rate with a 5% penalty, especially if you plan to pay off early or refinance down the road. Most business lines of credit, some online term loans, and SBA Express loans do not have prepayment penalties. Use our <Link href="/tools/business-loan-comparison-tool" className="text-theme-primary-light font-medium hover:underline">loan comparison tool</Link> to evaluate offers side by side, including fee impact. <Link href="/get-started" className="text-theme-primary-light font-medium hover:underline">Talk to a funding specialist</Link> to find options with the terms that fit your plans, with no impact to your credit score.
            </p>
          </div>
        }
      >
        <PrepaymentPenaltyTool />
      </ToolPageLayout>
    </>
  )
}
