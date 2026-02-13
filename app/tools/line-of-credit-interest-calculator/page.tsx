import Link from 'next/link'
import { generatePageMetadata } from '@/lib/metadata'
import { breadcrumbSchema, faqSchema, softwareApplicationSchema } from '@/lib/schema'
import { getToolBySlug } from '@/lib/tools-data'
import ToolPageLayout from '@/components/ToolPageLayout'
import LineOfCreditInterestTool from './LineOfCreditInterestTool'

const tool = getToolBySlug('line-of-credit-interest-calculator')!

export const metadata = generatePageMetadata({
  title: tool.seo.title,
  description: tool.seo.description,
  path: `/tools/${tool.slug}`,
})

const howItWorks = [
  {
    title: 'Enter Your Credit Line',
    text: 'Set your approved credit limit and the amount you plan to draw. Adjust the interest rate to match your terms.',
  },
  {
    title: 'Choose Repayment Terms',
    text: 'Pick your draw duration and toggle between interest-only and principal-plus-interest. Add any draw fees your lender charges.',
  },
  {
    title: 'Review Your Cost Breakdown',
    text: 'See monthly payments, total interest, effective APR, and how this draw compares to an equivalent term loan.',
  },
]

const whatYouGet = [
  {
    title: 'Monthly Payment Amount',
    text: 'Your exact monthly cost for either interest-only or principal-plus-interest repayment on the drawn amount.',
  },
  {
    title: 'Total Cost with Fees',
    text: 'Total interest plus any draw fees, so you know the full price of accessing your credit line.',
  },
  {
    title: 'Effective APR',
    text: 'When draw fees are included, the true annualized cost is higher than the stated rate. This shows the real number.',
  },
  {
    title: 'Credit Utilization Tracker',
    text: 'See how much of your credit line you are using and how much remains available for future draws.',
  },
  {
    title: 'Term Loan Comparison',
    text: 'Side-by-side comparison of your LOC draw versus borrowing the same amount as a term loan at the same rate.',
  },
  {
    title: 'Month-by-Month Schedule',
    text: 'A detailed payment schedule showing how interest, principal, and balance change each month of the draw.',
  },
]

export default function LineOfCreditInterestCalculatorPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(
            breadcrumbSchema([
              { name: 'Home', url: '/' },
              { name: 'Tools', url: '/tools' },
              { name: 'Line of Credit Interest Calculator', url: '/tools/line-of-credit-interest-calculator' },
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
              How Much Does a Business Line of Credit Really Cost?
            </h2>
            <p className="text-gray-700 leading-relaxed mb-4">
              A business line of credit works differently from a term loan. You get access to a set credit limit and only pay interest on what you actually draw. This makes it ideal for managing cash flow gaps, covering seasonal expenses, or having funds available for unexpected opportunities. The cost depends on how much you draw, how long you keep it outstanding, and whether you make interest-only or amortizing payments.
            </p>
            <p className="text-gray-700 leading-relaxed mb-4">
              This calculator shows the true cost of a specific draw from your <Link href="/business-loans/lines-of-credit" className="text-theme-primary-light font-medium hover:underline">business line of credit</Link>. Enter your credit limit and draw amount to see monthly payments, total interest, and how fees affect your effective APR. The comparison feature shows how the same amount would cost as a <Link href="/business-loans/term-loans" className="text-theme-primary-light font-medium hover:underline">term loan</Link>.
            </p>

            <h3 className="text-xl font-bold text-quicklend-900 mb-3 mt-6">Interest-Only vs. Principal-Plus-Interest</h3>
            <p className="text-gray-700 leading-relaxed mb-4">
              Many lines of credit offer interest-only payments during the draw period. You pay just the interest each month and repay the principal when you are ready (or at the end of the term). This keeps monthly costs low but means you owe the full amount at maturity. Principal-plus-interest payments are higher each month but reduce your balance over time, and you pay less total interest. Use the toggle in this calculator to compare both options for your situation.
            </p>

            <h3 className="text-xl font-bold text-quicklend-900 mb-3 mt-6">Watch for Hidden Fees</h3>
            <p className="text-gray-700 leading-relaxed mb-4">
              The stated interest rate is not always the full cost. Some lenders charge draw fees (0.5% to 2% per draw), annual maintenance fees, or inactivity fees if you do not use the line. Draw fees can significantly increase your effective APR, especially on short-term draws. A 1% draw fee on a 3-month draw adds roughly 4% to your annualized cost. Always ask about all fees before signing and use the draw fee slider in this calculator to see the impact.
            </p>

            <h3 className="text-xl font-bold text-quicklend-900 mb-3 mt-6">When a LOC Beats a Term Loan</h3>
            <p className="text-gray-700 leading-relaxed">
              Lines of credit are more cost-effective when you need flexible, short-term access to funds. If you draw $50,000 for three months then repay, you pay interest only for those three months. A term loan would lock you into 12 or more months of payments on the full amount. However, for large one-time purchases (like <Link href="/business-loans/equipment-financing" className="text-theme-primary-light font-medium hover:underline">equipment</Link>), a term loan often offers a lower rate and more predictable payments. Use our <Link href="/tools/loan-payment-calculator" className="text-theme-primary-light font-medium hover:underline">loan payment calculator</Link> to run the term loan numbers, or try the <Link href="/tools/loan-affordability-calculator" className="text-theme-primary-light font-medium hover:underline">affordability calculator</Link> to see how much you could borrow based on your monthly budget.
            </p>
          </div>
        }
      >
        <LineOfCreditInterestTool />
      </ToolPageLayout>
    </>
  )
}
