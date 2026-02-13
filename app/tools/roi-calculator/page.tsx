import Link from 'next/link'
import { generatePageMetadata } from '@/lib/metadata'
import { breadcrumbSchema, faqSchema, softwareApplicationSchema } from '@/lib/schema'
import { getToolBySlug } from '@/lib/tools-data'
import ToolPageLayout from '@/components/ToolPageLayout'
import ROICalculatorTool from './ROICalculatorTool'

const tool = getToolBySlug('roi-calculator')!

export const metadata = generatePageMetadata({
  title: tool.seo.title,
  description: tool.seo.description,
  path: `/tools/${tool.slug}`,
})

const howItWorks = [
  {
    title: 'Enter Loan & Investment Details',
    text: 'Input your loan amount, interest rate, and term. Then add the expected monthly revenue increase and cost savings from the investment.',
  },
  {
    title: 'Set a Realistic Ramp-Up',
    text: 'Choose how many months before the investment reaches full productivity. The calculator accounts for loan payments during this period with no returns.',
  },
  {
    title: 'See Your ROI & Payback',
    text: 'Get your ROI percentage, net profit, payback period, and a cumulative profit chart showing when the investment breaks even.',
  },
]

const whatYouGet = [
  {
    title: 'ROI Percentage & Verdict',
    text: 'A clear ROI number with a color-coded verdict: strong, solid, marginal, or consider alternatives.',
  },
  {
    title: 'Net Profit Calculation',
    text: 'Total expected returns minus total loan cost (principal + interest) over the full term.',
  },
  {
    title: 'Payback Period',
    text: 'The exact month when cumulative returns exceed cumulative loan payments.',
  },
  {
    title: 'Monthly Cash Flow Impact',
    text: 'How the loan payment and expected returns affect your monthly cash flow, including during ramp-up.',
  },
  {
    title: 'Cumulative Profit Chart',
    text: 'A visual timeline showing your net position each month, with the break-even crossover point highlighted.',
  },
  {
    title: 'Cost vs Return Summary',
    text: 'Total loan cost compared to total expected returns in a side-by-side layout.',
  },
]

export default function ROICalculatorPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(
            breadcrumbSchema([
              { name: 'Home', url: '/' },
              { name: 'Tools', url: '/tools' },
              { name: 'ROI Calculator', url: '/tools/roi-calculator' },
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
              Is a Business Loan Worth It?
            </h2>
            <p className="text-gray-700 leading-relaxed mb-4">
              Every business loan is an investment. The question is whether the return justifies the cost. A $200,000 equipment loan at 10% over 3 years costs roughly $232,000 in total payments. If that equipment generates $350,000 in new revenue over the same period, the net profit is $118,000 and your ROI is 59%. That is a strong return. But if the equipment only generates $220,000, the net profit is just $12,000 for a 6% ROI, which is marginal after factoring in risk and opportunity cost. This calculator runs these numbers so you can make the decision with real data, not guesswork.
            </p>

            <h3 className="text-xl font-bold text-quicklend-900 mb-3 mt-6">Accounting for Ramp-Up Time</h3>
            <p className="text-gray-700 leading-relaxed mb-4">
              Most business investments do not produce results on day one. New equipment takes time to install and integrate. A new location needs months to attract customers. A marketing push takes time to compound. During the ramp-up period, you are making loan payments without receiving the full expected return. A 3-month ramp-up on a 36-month loan means you only get 33 productive months of returns, but pay for all 36. This calculator models the ramp-up so your ROI reflects reality, not best-case assumptions. Use our <Link href="/tools/break-even-calculator" className="text-theme-primary-light font-medium hover:underline">break-even calculator</Link> for a deeper analysis of when a new product or service line becomes profitable.
            </p>

            <h3 className="text-xl font-bold text-quicklend-900 mb-3 mt-6">ROI vs Payback Period</h3>
            <p className="text-gray-700 leading-relaxed mb-4">
              ROI tells you the total percentage return over the life of the investment. Payback period tells you when you get your money back. Both matter. A 60% ROI with a 30-month payback on a 36-month loan means you only have 6 months of pure profit after recovering costs. A 30% ROI with a 12-month payback gives you 24 months of profit, which might be preferable if cash flow flexibility matters. Use the <Link href="/tools/loan-payment-calculator" className="text-theme-primary-light font-medium hover:underline">loan payment calculator</Link> to see exact payment amounts, or the <Link href="/tools/business-loan-comparison-tool" className="text-theme-primary-light font-medium hover:underline">loan comparison tool</Link> to weigh multiple financing options side by side.
            </p>

            <h3 className="text-xl font-bold text-quicklend-900 mb-3 mt-6">Choosing the Right Loan for Your Investment</h3>
            <p className="text-gray-700 leading-relaxed">
              The type of financing you choose directly affects your ROI. Lower rates mean lower total cost, which improves returns. Longer terms reduce monthly payments but increase total interest. A <Link href="/business-loans/term-loans" className="text-theme-primary-light font-medium hover:underline">term loan</Link> works well for one-time investments with clear payback timelines. <Link href="/business-loans/equipment-financing" className="text-theme-primary-light font-medium hover:underline">Equipment financing</Link> often offers lower rates because the equipment serves as collateral. For larger real estate purchases, <Link href="/tools/sba-loan-payment-calculator" className="text-theme-primary-light font-medium hover:underline">SBA loans</Link> offer the lowest rates for qualified borrowers. <Link href="/get-started" className="text-theme-primary-light font-medium hover:underline">Talk to a funding specialist</Link> to match the right loan structure to your investment plan, with no impact to your credit score.
            </p>
          </div>
        }
      >
        <ROICalculatorTool />
      </ToolPageLayout>
    </>
  )
}
