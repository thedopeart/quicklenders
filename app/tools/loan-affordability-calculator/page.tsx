import Link from 'next/link'
import { generatePageMetadata } from '@/lib/metadata'
import { breadcrumbSchema, faqSchema, softwareApplicationSchema } from '@/lib/schema'
import { getToolBySlug } from '@/lib/tools-data'
import ToolPageLayout from '@/components/ToolPageLayout'
import LoanAffordabilityTool from './LoanAffordabilityTool'

const tool = getToolBySlug('loan-affordability-calculator')!

export const metadata = generatePageMetadata({
  title: tool.seo.title,
  description: tool.seo.description,
  path: `/tools/${tool.slug}`,
})

const howItWorks = [
  {
    title: 'Set Your Budget',
    text: 'Enter the monthly payment your business can comfortably handle. Use presets or type any amount.',
  },
  {
    title: 'Choose Rate & Term',
    text: 'Select your expected interest rate and desired repayment term. The calculator shows your max loan in real time.',
  },
  {
    title: 'Compare Scenarios',
    text: 'Explore how different terms and rates change your borrowing power. Add your revenue for a cash flow check.',
  },
]

const whatYouGet = [
  {
    title: 'Maximum Loan Amount',
    text: 'The largest loan your business can take on based on what you can afford to pay each month.',
  },
  {
    title: 'Total Cost Breakdown',
    text: 'Total repayment, total interest paid, and interest as a percentage of the loan amount.',
  },
  {
    title: 'Term Comparison Table',
    text: 'See how choosing a shorter or longer term changes your max loan, total interest, and total cost side by side.',
  },
  {
    title: 'Rate Impact Analysis',
    text: 'Compare borrowing power at different interest rates to understand what better credit could unlock.',
  },
  {
    title: 'Cash Flow Check',
    text: 'Add your monthly revenue to see your payment as a percentage of income, with a clear assessment of whether it fits.',
  },
  {
    title: 'Personalized CTA',
    text: 'A direct link to see if you qualify for the calculated amount, with no impact to your credit score.',
  },
]

export default function LoanAffordabilityCalculatorPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(
            breadcrumbSchema([
              { name: 'Home', url: '/' },
              { name: 'Tools', url: '/tools' },
              { name: 'Loan Affordability Calculator', url: '/tools/loan-affordability-calculator' },
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
              How Much Business Loan Can You Afford?
            </h2>
            <p className="text-gray-700 leading-relaxed mb-4">
              Most loan calculators answer the question "what will my payment be?" This one flips it: given what you can comfortably pay each month, how much can you borrow? The answer depends on three factors: your monthly payment budget, the interest rate you qualify for, and how long you want to repay.
            </p>
            <p className="text-gray-700 leading-relaxed mb-4">
              The math behind this calculator is reverse amortization. A standard <Link href="/tools/loan-payment-calculator" className="text-theme-primary-light font-medium hover:underline">loan payment calculator</Link> takes a loan amount and computes the payment. This tool takes your payment and computes the maximum principal. The formula accounts for how each payment splits between interest and principal over the full term.
            </p>

            <h3 className="text-xl font-bold text-quicklend-900 mb-3 mt-6">The Payment-to-Revenue Rule</h3>
            <p className="text-gray-700 leading-relaxed mb-4">
              A common guideline: keep loan payments under <strong>10% to 15% of monthly revenue</strong>. This leaves room for operating expenses, unexpected costs, and profit. A business earning <strong>$30,000 per month</strong> might comfortably afford <strong>$3,000 to $4,500</strong> in monthly loan payments. This is not a hard rule. Businesses with high margins can handle more, while seasonal businesses may need a lower ratio.
            </p>

            <h3 className="text-xl font-bold text-quicklend-900 mb-3 mt-6">How Interest Rate Affects Borrowing Power</h3>
            <p className="text-gray-700 leading-relaxed mb-4">
              Lower rates dramatically increase how much you can borrow at the same payment. At <strong>$5,000 per month</strong> over 3 years, a 10% rate supports roughly <strong>$156,000</strong> in borrowing, while 20% limits you to about <strong>$136,500</strong>. That is a <strong>$19,500 difference</strong> from rate alone. This is why improving your credit before applying can meaningfully expand your options on <Link href="/business-loans/term-loans" className="text-theme-primary-light font-medium hover:underline">term loans</Link> and <Link href="/business-loans/lines-of-credit" className="text-theme-primary-light font-medium hover:underline">lines of credit</Link>.
            </p>

            <h3 className="text-xl font-bold text-quicklend-900 mb-3 mt-6">What If You Need More Than You Can Afford?</h3>
            <p className="text-gray-700 leading-relaxed">
              If the calculator shows a smaller number than you need, you have options. Extend the term to increase capacity (more interest, but higher borrowing power). Improve your credit to qualify for lower rates. Phase your financing by borrowing now and adding later. Or explore <Link href="/business-loans/equipment-financing" className="text-theme-primary-light font-medium hover:underline">equipment financing</Link> where the asset serves as collateral, or <Link href="/business-loans/asset-backed-loans" className="text-theme-primary-light font-medium hover:underline">asset-based lending</Link> for larger amounts secured by business assets. Check your <Link href="/tools/dscr-calculator" className="text-theme-primary-light font-medium hover:underline">Debt Service Coverage Ratio</Link> to see how lenders will view your overall debt capacity.
            </p>
          </div>
        }
      >
        <LoanAffordabilityTool />
      </ToolPageLayout>
    </>
  )
}
