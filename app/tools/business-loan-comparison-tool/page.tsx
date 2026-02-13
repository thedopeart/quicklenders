import Link from 'next/link'
import { generatePageMetadata } from '@/lib/metadata'
import { breadcrumbSchema, faqSchema, softwareApplicationSchema } from '@/lib/schema'
import { getToolBySlug } from '@/lib/tools-data'
import ToolPageLayout from '@/components/ToolPageLayout'
import LoanComparisonTool from './LoanComparisonTool'

const tool = getToolBySlug('business-loan-comparison-tool')!

export const metadata = generatePageMetadata({
  title: tool.seo.title,
  description: tool.seo.description,
  path: `/tools/${tool.slug}`,
})

const howItWorks = [
  {
    title: 'Enter Your Loan Offers',
    text: 'Add up to 3 loans with the amount, interest rate, term, and any fees. Name each one to keep track.',
  },
  {
    title: 'Compare Side by Side',
    text: 'See monthly payments, total interest, total cost, and cost per $1,000 borrowed for each option.',
  },
  {
    title: 'Pick the Right Fit',
    text: 'Use the winner badges and cost breakdown to decide which loan matches your priorities, whether that is lowest cost, lowest payment, or fastest payoff.',
  },
]

const whatYouGet = [
  {
    title: 'Side-by-Side Comparison Table',
    text: 'Monthly payment, total interest, fees, total cost, and cost per $1,000 for every loan in one table.',
  },
  {
    title: 'Winner Badges',
    text: 'Instant badges showing which loan wins by total cost, monthly payment, and fastest payoff.',
  },
  {
    title: 'Savings Callout',
    text: 'See exactly how much you save by choosing the cheapest option over the next closest offer.',
  },
  {
    title: 'Visual Cost Breakdown',
    text: 'Stacked bar chart showing principal, interest, and fees for each loan at a glance.',
  },
  {
    title: 'Cumulative Payment Timeline',
    text: 'See how much you will have paid at each milestone and when each loan is fully paid off.',
  },
  {
    title: 'Decision Guidance',
    text: 'Practical advice on choosing between lowest cost and lowest payment based on your business situation.',
  },
]

export default function LoanComparisonPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(
            breadcrumbSchema([
              { name: 'Home', url: '/' },
              { name: 'Tools', url: '/tools' },
              { name: 'Loan Comparison Tool', url: '/tools/business-loan-comparison-tool' },
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
              How to Compare Business Loan Offers
            </h2>
            <p className="text-gray-700 leading-relaxed mb-4">
              A lower interest rate does not always mean a cheaper loan. Term length, fees, and payment structure all affect what you actually pay. Two offers with the same rate can have dramatically different total costs if one has a 3% origination fee and the other has none. This tool runs the math on up to three offers so you can compare them on equal footing.
            </p>

            <h3 className="text-xl font-bold text-quicklend-900 mb-3 mt-6">Total Cost vs. Monthly Payment</h3>
            <p className="text-gray-700 leading-relaxed mb-4">
              The loan with the lowest monthly payment often costs the most in total. Longer terms mean more months of interest, which adds up. A 5-year <Link href="/business-loans/term-loans" className="text-theme-primary-light font-medium hover:underline">term loan</Link> at 10% costs significantly more in total interest than the same loan over 3 years, even though the monthly payment is lower. The right choice depends on whether you need to optimize for cash flow or total savings. If monthly payment matters most, our <Link href="/tools/loan-affordability-calculator" className="text-theme-primary-light font-medium hover:underline">loan affordability calculator</Link> can help you find your budget ceiling.
            </p>

            <h3 className="text-xl font-bold text-quicklend-900 mb-3 mt-6">Fees Change the Equation</h3>
            <p className="text-gray-700 leading-relaxed mb-4">
              Origination fees typically range from 1% to 5% of the loan amount and are either deducted from your proceeds or added to your balance. A $100,000 loan with a 3% origination fee means you either receive $97,000 or owe $103,000. Either way, it raises your effective borrowing cost. Always include fees when comparing offers. The effective APR shown in this calculator accounts for fees so you can see the true annual cost. Use our <Link href="/tools/factor-rate-to-apr-calculator" className="text-theme-primary-light font-medium hover:underline">factor rate to APR converter</Link> if any of your offers use factor rates instead of interest rates.
            </p>

            <h3 className="text-xl font-bold text-quicklend-900 mb-3 mt-6">When the Cheapest Loan Is Not the Best Choice</h3>
            <p className="text-gray-700 leading-relaxed">
              Cost is important, but it is not everything. A slightly more expensive loan with lower monthly payments may be worth it if it preserves working capital your business needs. Speed matters too: an online lender charging more might fund in days while a bank takes weeks. And flexibility counts. A <Link href="/business-loans/lines-of-credit" className="text-theme-primary-light font-medium hover:underline">line of credit</Link> may cost more in interest but gives you revolving access a term loan does not. Not sure which loan type fits? Try our <Link href="/tools/loan-finder-quiz" className="text-theme-primary-light font-medium hover:underline">loan finder quiz</Link> to get a recommendation based on your situation, or <Link href="/get-started" className="text-theme-primary-light font-medium hover:underline">talk to a funding specialist</Link> to compare real offers.
            </p>
          </div>
        }
      >
        <LoanComparisonTool />
      </ToolPageLayout>
    </>
  )
}
