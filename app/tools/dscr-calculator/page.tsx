import Link from 'next/link'
import { generatePageMetadata } from '@/lib/metadata'
import { breadcrumbSchema, faqSchema, softwareApplicationSchema } from '@/lib/schema'
import { getToolBySlug } from '@/lib/tools-data'
import ToolPageLayout from '@/components/ToolPageLayout'
import DSCRCalculatorTool from './DSCRCalculatorTool'

const tool = getToolBySlug('dscr-calculator')!

export const metadata = generatePageMetadata({
  title: tool.seo.title,
  description: tool.seo.description,
  path: `/tools/${tool.slug}`,
})

const howItWorks = [
  {
    title: 'Enter Your Numbers',
    text: 'Input your Net Operating Income and total debt payments in Simple mode, or break them down in Detailed mode if you need to calculate NOI.',
  },
  {
    title: 'See Your DSCR',
    text: 'Your ratio appears instantly with a visual gauge showing where you land relative to lender thresholds.',
  },
  {
    title: 'Understand Your Position',
    text: 'Review how lenders interpret your ratio, see which loan types you qualify for, and explore what-if scenarios to improve it.',
  },
]

const whatYouGet = [
  {
    title: 'DSCR Ratio',
    text: 'Your Debt Service Coverage Ratio calculated instantly with a color-coded gauge showing your position.',
  },
  {
    title: 'Lender Requirement Comparison',
    text: 'See whether your DSCR meets the thresholds for SBA loans, bank term loans, commercial real estate, and online lenders.',
  },
  {
    title: 'Simple & Detailed Modes',
    text: 'Enter NOI and debt directly, or use Detailed mode to calculate NOI from revenue, COGS, and operating expenses.',
  },
  {
    title: 'Max Affordable Payment',
    text: 'The largest monthly payment your business can take on while maintaining a healthy 1.25x DSCR.',
  },
  {
    title: 'What-If Scenarios',
    text: 'See how changes to your income or debt load would shift your DSCR, including adding new debt or growing revenue.',
  },
  {
    title: 'Plain-Language Interpretation',
    text: 'A clear explanation of what your DSCR means for loan approval, with specific next steps based on your result.',
  },
]

export default function DSCRCalculatorPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(
            breadcrumbSchema([
              { name: 'Home', url: '/' },
              { name: 'Tools', url: '/tools' },
              { name: 'DSCR Calculator', url: '/tools/dscr-calculator' },
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
              Understanding Your Debt Service Coverage Ratio
            </h2>
            <p className="text-gray-700 leading-relaxed mb-4">
              <strong>Debt Service Coverage Ratio</strong> tells lenders one thing: can your business comfortably make loan payments? It is calculated by dividing your annual Net Operating Income by your total annual debt payments. A ratio of <strong>1.0</strong> means you break even. Anything above 1.0 means you have income left over after paying your debts.
            </p>
            <p className="text-gray-700 leading-relaxed mb-4">
              Most lenders want to see a DSCR of at least <strong>1.15 to 1.25</strong>, depending on the loan type. <strong>SBA 7(a) loans typically require 1.15</strong> or higher. Bank <Link href="/business-loans/term-loans" className="text-theme-primary-light font-medium hover:underline">term loans</Link> generally look for <strong>1.20 to 1.35</strong>. Online lenders and <Link href="/business-loans/lines-of-credit" className="text-theme-primary-light font-medium hover:underline">lines of credit</Link> may accept ratios as low as 1.0 if your other financials are strong. <Link href="/business-loans/equipment-financing" className="text-theme-primary-light font-medium hover:underline">Equipment financing</Link> often focuses more on the asset value than on DSCR.
            </p>

            <h3 className="text-xl font-bold text-quicklend-900 mb-3 mt-6">DSCR Benchmarks by Loan Type</h3>
            <div className="overflow-x-auto mb-6">
              <table className="w-full text-sm border border-gray-200 rounded-lg overflow-hidden">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="text-left px-4 py-2 font-semibold text-gray-700">Loan Type</th>
                    <th className="text-left px-4 py-2 font-semibold text-gray-700">Typical DSCR Requirement</th>
                  </tr>
                </thead>
                <tbody>
                  <tr className="border-t border-gray-100"><td className="px-4 py-2">SBA 7(a) Loans</td><td className="px-4 py-2">1.15 minimum</td></tr>
                  <tr className="border-t border-gray-100"><td className="px-4 py-2">Bank Term Loans</td><td className="px-4 py-2">1.20 - 1.35</td></tr>
                  <tr className="border-t border-gray-100"><td className="px-4 py-2">Commercial Real Estate</td><td className="px-4 py-2">1.25 - 1.35</td></tr>
                  <tr className="border-t border-gray-100"><td className="px-4 py-2">Online Lenders</td><td className="px-4 py-2">1.0 - 1.15 (more flexible)</td></tr>
                  <tr className="border-t border-gray-100"><td className="px-4 py-2">Equipment Financing</td><td className="px-4 py-2">Often no DSCR requirement</td></tr>
                </tbody>
              </table>
            </div>

            <h3 className="text-xl font-bold text-quicklend-900 mb-3">How to Improve Your DSCR</h3>
            <p className="text-gray-700 leading-relaxed mb-4">
              If your ratio falls below lender thresholds, you have three levers. First, increase your Net Operating Income by growing revenue or cutting operating costs. Second, reduce existing debt payments by refinancing to longer terms or lower rates. Third, adjust your proposed loan: borrow less, extend the term, or phase the financing over time. Use our <Link href="/tools/loan-payment-calculator" className="text-theme-primary-light font-medium hover:underline">loan payment calculator</Link> to model different scenarios and see how each one affects your monthly payment.
            </p>
            <p className="text-gray-700 leading-relaxed mb-4">
              A strong DSCR can sometimes offset weaknesses in other areas of your application. If your credit is fair but your business generates twice the income needed to cover payments, many lenders will look past the credit score. Similarly, businesses with shorter operating histories but strong cash flow can qualify for products that would otherwise require more time in business.
            </p>
            <p className="text-gray-700 leading-relaxed">
              If your DSCR is below 1.0, traditional term loans may not be available, but you still have options. <Link href="/business-loans/asset-backed-loans" className="text-theme-primary-light font-medium hover:underline">Asset-based lending</Link> evaluates your collateral rather than income ratios. Invoice factoring and revenue-based financing look at different metrics entirely. Take our <Link href="/tools/loan-finder-quiz" className="text-theme-primary-light font-medium hover:underline">Loan Finder Quiz</Link> to see which product fits your current situation.
            </p>
          </div>
        }
      >
        <DSCRCalculatorTool />
      </ToolPageLayout>
    </>
  )
}
