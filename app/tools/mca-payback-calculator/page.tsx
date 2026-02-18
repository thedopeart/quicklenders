import Link from 'next/link'
import { generatePageMetadata } from '@/lib/metadata'
import { breadcrumbSchema, faqSchema, softwareApplicationSchema } from '@/lib/schema'
import { getToolBySlug } from '@/lib/tools-data'
import ToolPageLayout from '@/components/ToolPageLayout'
import MCAPaybackTool from './MCAPaybackTool'

const tool = getToolBySlug('mca-payback-calculator')!

export const metadata = generatePageMetadata({
  title: tool.seo.title,
  description: tool.seo.description,
  path: `/tools/${tool.slug}`,
})

const howItWorks = [
  {
    title: 'Enter Advance Details',
    text: 'Input your advance amount, factor rate, holdback percentage, and whether payments are daily or weekly.',
  },
  {
    title: 'Add Your Revenue',
    text: 'Enter your average daily revenue so the calculator can determine your actual holdback payment amount.',
  },
  {
    title: 'See the Full Picture',
    text: 'Get your payment amount, payback timeline, estimated APR, cash flow impact, and a comparison to term loan pricing.',
  },
]

const whatYouGet = [
  {
    title: 'Daily or Weekly Payment',
    text: 'The exact amount withheld from your revenue each day or week based on your holdback percentage.',
  },
  {
    title: 'Payback Timeline',
    text: 'How many weeks or months until the advance is fully repaid at your current revenue level.',
  },
  {
    title: 'Estimated APR Equivalent',
    text: 'The factor rate converted to an approximate annual percentage rate, so you can compare to traditional loans.',
  },
  {
    title: 'Cash Flow Impact',
    text: 'A visual breakdown of how much revenue goes to the holdback versus what stays in your account.',
  },
  {
    title: 'Term Loan Comparison',
    text: 'Side-by-side view of what the same financing would cost as a traditional term loan at a typical rate.',
  },
  {
    title: 'Payback Progress Chart',
    text: 'A week-by-week visual showing how quickly you pay down the advance balance.',
  },
]

export default function MCAPaybackCalculatorPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(
            breadcrumbSchema([
              { name: 'Home', url: '/' },
              { name: 'Tools', url: '/tools' },
              { name: 'MCA Payback Calculator', url: '/tools/mca-payback-calculator' },
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
              How Merchant Cash Advance Repayment Works
            </h2>
            <p className="text-gray-700 leading-relaxed mb-4">
              A <strong>merchant cash advance</strong> is not a loan. It is a purchase of your future receivables. The provider gives you a lump sum, and you repay by having a percentage of your daily revenue (the holdback) automatically debited from your bank account. The total you repay is the advance amount multiplied by the factor rate. A <strong>$100,000</strong> advance at a <strong>1.30 factor rate</strong> means you repay <strong>$130,000</strong>, regardless of how long it takes. This calculator shows you the daily payment, timeline, and true cost.
            </p>

            <h3 className="text-xl font-bold text-quicklend-900 mb-3 mt-6">Understanding Factor Rates vs APR</h3>
            <p className="text-gray-700 leading-relaxed mb-4">
              Factor rates look simple: 1.20 means you repay $1.20 for every $1 advanced. But this number hides the true annual cost. A 1.20 factor rate on a 6-month payback works out to roughly <strong>40% APR</strong>. The same factor rate on a 12-month payback is closer to <strong>20% APR</strong>. The shorter the payback period, the higher the effective APR. Use our <Link href="/tools/factor-rate-to-apr-calculator" className="text-theme-primary-light font-medium hover:underline">factor rate to APR converter</Link> for a more precise conversion, or this calculator to see both the factor rate cost and the estimated APR side by side.
            </p>

            <h3 className="text-xl font-bold text-quicklend-900 mb-3 mt-6">The Holdback and Your Cash Flow</h3>
            <p className="text-gray-700 leading-relaxed mb-4">
              The holdback percentage determines how much of your daily revenue goes toward repayment. A <strong>15% holdback</strong> on $5,000 daily revenue means <strong>$750 per day</strong> is withheld. That adds up to roughly <strong>$16,250 per month</strong>. If your operating expenses are tight, that holdback can create cash flow pressure. Before taking an MCA, make sure your remaining revenue covers rent, payroll, inventory, and other obligations. If not, a <Link href="/business-loans/lines-of-credit" className="text-theme-primary-light font-medium hover:underline">line of credit</Link> with lower payments might be a better fit.
            </p>

            <h3 className="text-xl font-bold text-quicklend-900 mb-3 mt-6">When an MCA Makes Sense (and When It Does Not)</h3>
            <p className="text-gray-700 leading-relaxed">
              MCAs work best for businesses that need fast capital, have strong daily sales, and plan to repay quickly. They are commonly used for inventory purchases, emergency repairs, or bridging a short cash gap. They do not make sense for long-term financing, large investments, or businesses with tight margins. If you qualify for a <Link href="/business-loans/term-loans" className="text-theme-primary-light font-medium hover:underline">term loan</Link>, you will almost always pay less. SBA loans, in particular, offer rates between <strong>6% and 13%</strong> for qualified borrowers. <Link href="/get-started" className="text-theme-primary-light font-medium hover:underline">Talk to a funding specialist</Link> to find out what financing options are available beyond MCAs, with no impact to your credit score.
            </p>
          </div>
        }
      >
        <MCAPaybackTool />
      </ToolPageLayout>
    </>
  )
}
