import Link from 'next/link'
import { generatePageMetadata } from '@/lib/metadata'
import { breadcrumbSchema, faqSchema, softwareApplicationSchema } from '@/lib/schema'
import { getToolBySlug } from '@/lib/tools-data'
import ToolPageLayout from '@/components/ToolPageLayout'
import SBALoanTool from './SBALoanTool'

const tool = getToolBySlug('sba-loan-payment-calculator')!

export const metadata = generatePageMetadata({
  title: tool.seo.title,
  description: tool.seo.description,
  path: `/tools/${tool.slug}`,
})

const howItWorks = [
  {
    title: 'Choose Your SBA Program',
    text: 'Select 7(a) or 504, then enter your total project cost, interest rate, loan term, and down payment percentage.',
  },
  {
    title: 'Review Your Estimate',
    text: 'See your monthly payment, total interest, SBA guarantee fees, and net proceeds. For 504 loans, the bank and CDC portions are broken out separately.',
  },
  {
    title: 'Compare to Conventional',
    text: 'View a side-by-side comparison showing how much you could save with SBA financing versus a conventional business loan at market rates.',
  },
]

const whatYouGet = [
  {
    title: 'Program-Specific Calculations',
    text: 'Toggle between SBA 7(a) and 504 to see how each program structures your loan, fees, and payments differently.',
  },
  {
    title: 'Guarantee Fee Breakdown',
    text: 'For 7(a): the upfront guarantee fee (2.0% to 3.75%) and annual servicing fee (0.55%), both calculated on the guaranteed portion.',
  },
  {
    title: '504 Structure Detail',
    text: 'See the three-party split: your down payment, the bank portion (50%), and the CDC/SBA portion (40%) with its lower fixed rate.',
  },
  {
    title: 'Total Cost Summary',
    text: 'Monthly payment, total interest, all fees, and down payment combined into one total cost figure.',
  },
  {
    title: 'SBA vs Conventional Comparison',
    text: 'Side-by-side table comparing rate, monthly payment, total interest, total cost, and estimated savings.',
  },
  {
    title: 'Qualification Overview',
    text: 'Quick reference for typical SBA requirements: credit score, time in business, revenue, DSCR, down payment, and collateral.',
  },
]

export default function SBALoanCalculatorPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(
            breadcrumbSchema([
              { name: 'Home', url: '/' },
              { name: 'Tools', url: '/tools' },
              { name: 'SBA Loan Calculator', url: '/tools/sba-loan-payment-calculator' },
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
              How SBA Loans Work
            </h2>
            <p className="text-gray-700 leading-relaxed mb-4">
              SBA loans are partially guaranteed by the U.S. Small Business Administration, which reduces risk for lenders and results in lower rates and longer terms for borrowers. The SBA does not lend directly. Instead, it guarantees a portion of the loan made by an approved bank or lender. That guarantee costs the borrower fees, but those fees are small compared to the interest savings over the life of the loan. This calculator factors in all SBA-specific fees so you see the true cost, not just the payment.
            </p>

            <h3 className="text-xl font-bold text-quicklend-900 mb-3 mt-6">SBA 7(a) vs 504: Which Program Fits?</h3>
            <p className="text-gray-700 leading-relaxed mb-4">
              The 7(a) program is the SBA's most flexible option. Use it for working capital, equipment, real estate, acquisitions, or refinancing existing debt. Loans go up to $5 million with terms up to 25 years for real estate and 10 years for most other purposes. The 504 program is specifically for fixed assets: commercial real estate or major equipment purchases. It uses a three-party structure where you put 10% down, a bank covers 50%, and an SBA-backed CDC covers 40% at a below-market fixed rate. The 504 often delivers lower total cost for qualifying projects but cannot be used for working capital. Compare both programs side by side with this calculator, then use our <Link href="/tools/loan-payment-calculator" className="text-theme-primary-light font-medium hover:underline">standard loan calculator</Link> to model conventional alternatives.
            </p>

            <h3 className="text-xl font-bold text-quicklend-900 mb-3 mt-6">Understanding SBA Guarantee Fees</h3>
            <p className="text-gray-700 leading-relaxed mb-4">
              The SBA charges two types of fees on 7(a) loans. The upfront guarantee fee is a percentage of the guaranteed portion of the loan, ranging from 2.0% for loans up to $150,000 to 3.75% for loans over $1 million. This fee is typically financed into the loan so you do not pay it out of pocket. The annual servicing fee is 0.55% of the outstanding guaranteed balance, included in your monthly payment by the lender. On a $500,000 loan, the upfront fee might be around $11,250 and the servicing fee adds roughly $100 per month in the early years. Even with these fees, total cost is usually significantly lower than a conventional <Link href="/business-loans/term-loans" className="text-theme-primary-light font-medium hover:underline">business term loan</Link> because the interest rate itself is lower.
            </p>

            <h3 className="text-xl font-bold text-quicklend-900 mb-3 mt-6">Getting Approved for an SBA Loan</h3>
            <p className="text-gray-700 leading-relaxed">
              SBA lenders typically look for a personal credit score of 680 or higher, at least 2 years in business, and a debt service coverage ratio (DSCR) of 1.15 or better. Check your <Link href="/tools/dscr-calculator" className="text-theme-primary-light font-medium hover:underline">DSCR</Link> before applying to see where you stand. Collateral helps but is not always required for 7(a) loans. The process takes 30 to 90 days, longer for 504 loans because of the CDC approval layer. If you need funds faster, conventional <Link href="/business-loans/lines-of-credit" className="text-theme-primary-light font-medium hover:underline">lines of credit</Link> and <Link href="/business-loans/term-loans" className="text-theme-primary-light font-medium hover:underline">term loans</Link> can fund in days. Use our <Link href="/tools/business-loan-comparison-tool" className="text-theme-primary-light font-medium hover:underline">loan comparison tool</Link> to weigh the rate savings against the timeline. <Link href="/get-started" className="text-theme-primary-light font-medium hover:underline">Talk to a funding specialist</Link> to find out which SBA program fits your situation, with no impact to your credit score.
            </p>
          </div>
        }
      >
        <SBALoanTool />
      </ToolPageLayout>
    </>
  )
}
