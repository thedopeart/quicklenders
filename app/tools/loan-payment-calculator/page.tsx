import Link from 'next/link'
import { generatePageMetadata } from '@/lib/metadata'
import { breadcrumbSchema, faqSchema, softwareApplicationSchema } from '@/lib/schema'
import { getToolBySlug } from '@/lib/tools-data'
import ToolPageLayout from '@/components/ToolPageLayout'
import LoanPaymentCalculatorTool from './LoanPaymentCalculatorTool'

const tool = getToolBySlug('loan-payment-calculator')!

export const metadata = generatePageMetadata({
  title: tool.seo.title,
  description: tool.seo.description,
  path: `/tools/${tool.slug}`,
})

const howItWorks = [
  {
    title: 'Enter Your Loan Details',
    text: 'Input your loan amount, interest rate, term length, and preferred payment frequency using the sliders or input fields.',
  },
  {
    title: 'See Instant Results',
    text: 'Your monthly payment, total interest, and total cost update in real time as you adjust any input — no submit button needed.',
  },
  {
    title: 'Analyze the Breakdown',
    text: 'Review the amortization chart and full payment schedule to see exactly how each payment splits between principal and interest.',
  },
]

const whatYouGet = [
  {
    title: 'Exact Payment Amount',
    text: 'Know precisely what your monthly, biweekly, or weekly payment will be for any combination of loan amount, rate, and term.',
  },
  {
    title: 'Total Interest Cost',
    text: 'See the full cost of borrowing over the entire loan term so you can compare different financing structures.',
  },
  {
    title: 'Amortization Chart',
    text: 'A visual breakdown showing how the ratio of principal to interest changes over the life of your loan.',
  },
  {
    title: 'Full Payment Schedule',
    text: 'An expandable table showing every single payment with principal, interest, and remaining balance columns.',
  },
  {
    title: 'Estimated Payoff Date',
    text: 'Know exactly when your loan will be fully paid off based on your start date and selected term.',
  },
  {
    title: 'Payment Frequency Comparison',
    text: 'Toggle between monthly, biweekly, and weekly payments to see how each option affects your total cost.',
  },
]

export default function LoanPaymentCalculatorPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(
            breadcrumbSchema([
              { name: 'Home', url: '/' },
              { name: 'Tools', url: '/tools' },
              { name: 'Loan Payment Calculator', url: '/tools/loan-payment-calculator' },
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
              Understanding Business Loan Payments and Amortization
            </h2>
            <p className="text-gray-700 leading-relaxed mb-4">
              When you take out a <Link href="/business-loans/term-loans" className="text-theme-primary-light font-medium hover:underline">business term loan</Link>, understanding your payment structure is essential for effective cash flow management. Our loan payment calculator uses the standard amortization formula that lenders rely on to determine your fixed monthly payment amount, total interest charges, and complete repayment schedule.
            </p>
            <p className="text-gray-700 leading-relaxed mb-4">
              The amortization formula — M = P[r(1+r)^n] / [(1+r)^n - 1] — calculates a fixed payment that covers both principal and interest in every installment. In the early months, a larger portion of each payment goes toward interest. As you pay down the balance, the principal component grows while interest shrinks. This shift is clearly visible in the amortization chart above.
            </p>
            <p className="text-gray-700 leading-relaxed mb-4">
              Payment frequency is an often-overlooked factor that can meaningfully impact total borrowing costs. Switching from monthly to biweekly payments effectively adds one extra full payment per year, accelerating principal paydown and reducing total interest. For a $250,000 loan at 8% over 5 years, biweekly payments can save several thousand dollars in interest compared to the standard monthly schedule.
            </p>
            <p className="text-gray-700 leading-relaxed mb-4">
              Whether you are evaluating a <Link href="/business-loans/term-loans" className="text-theme-primary-light font-medium hover:underline">term loan</Link> for expansion, comparing rates on <Link href="/business-loans/lines-of-credit" className="text-theme-primary-light font-medium hover:underline">business lines of credit</Link>, or assessing <Link href="/business-loans/equipment-financing" className="text-theme-primary-light font-medium hover:underline">equipment financing</Link> options, this calculator helps you make informed decisions before committing to any financing agreement.
            </p>
            <p className="text-gray-700 leading-relaxed">
              For financing products that use factor rates instead of traditional interest rates — such as merchant cash advances — use our <Link href="/tools/factor-rate-to-apr-calculator" className="text-theme-primary-light font-medium hover:underline">Factor Rate to APR Converter</Link> to understand the true annual cost of borrowing before you sign.
            </p>
          </div>
        }
      >
        <LoanPaymentCalculatorTool />
      </ToolPageLayout>
    </>
  )
}
