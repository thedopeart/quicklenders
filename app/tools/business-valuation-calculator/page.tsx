import Link from 'next/link'
import { generatePageMetadata } from '@/lib/metadata'
import { breadcrumbSchema, faqSchema, softwareApplicationSchema } from '@/lib/schema'
import { getToolBySlug } from '@/lib/tools-data'
import ToolPageLayout from '@/components/ToolPageLayout'
import BusinessValuationTool from './BusinessValuationTool'

const tool = getToolBySlug('business-valuation-calculator')!

export const metadata = generatePageMetadata({
  title: tool.seo.title,
  description: tool.seo.description,
  path: `/tools/${tool.slug}`,
})

const howItWorks = [
  {
    title: 'Enter Your Business Details',
    text: 'Select your industry, years in business, annual revenue, and revenue trend. These determine your baseline valuation multiples.',
  },
  {
    title: 'Add Profitability and Assets',
    text: 'Input your net profit, owner compensation, and EBITDA components. Optionally add business assets and liabilities for the asset-based method.',
  },
  {
    title: 'Review Your Valuation Range',
    text: 'See your estimated value across four methods, with the most relevant one highlighted. Expand any method to see the full calculation breakdown.',
  },
]

const whatYouGet = [
  {
    title: '4 Valuation Methods',
    text: 'Revenue multiple, SDE multiple, EBITDA multiple, and asset-based valuation calculated from your actual numbers.',
  },
  {
    title: 'Industry-Specific Multiples',
    text: 'Benchmarks for 12 industries from restaurants to technology, based on current market data.',
  },
  {
    title: 'Adjusted Multiples',
    text: 'Your multiples are adjusted for business age, revenue trend, customer concentration, owner dependency, and recurring revenue.',
  },
  {
    title: 'Calculation Breakdowns',
    text: 'Expandable detail for each method showing exactly how your SDE, EBITDA, and valuations are calculated.',
  },
  {
    title: 'Value Factor Analysis',
    text: 'Positive factors and risk factors affecting your valuation, with estimated impact percentages.',
  },
  {
    title: 'Actionable Tips',
    text: 'Specific steps to increase your business value before selling, from reducing owner dependency to securing recurring revenue.',
  },
]

export default function BusinessValuationCalculatorPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(
            breadcrumbSchema([
              { name: 'Home', url: '/' },
              { name: 'Tools', url: '/tools' },
              { name: 'Business Valuation Calculator', url: '/tools/business-valuation-calculator' },
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
              Understanding Business Valuation
            </h2>
            <p className="text-gray-700 leading-relaxed mb-4">
              Every business valuation starts with a fundamental question: how do buyers measure what a business is worth? The answer depends on the size, type, and profitability of the business. Most small businesses under $5 million in value are priced using an <strong>SDE (Seller&apos;s Discretionary Earnings)</strong> multiple. SDE represents the total financial benefit to a working owner: net profit plus the owner&apos;s salary, benefits, and personal expenses run through the business. Larger businesses with professional management typically use <strong>EBITDA multiples</strong>, which measure operational profitability independent of the owner. This calculator shows both methods, plus revenue multiples and asset-based valuation, so you can see your value from every angle.
            </p>

            <h3 className="text-xl font-bold text-quicklend-900 mb-3 mt-6">What Affects Your Multiple</h3>
            <p className="text-gray-700 leading-relaxed mb-4">
              Two businesses in the same industry with identical profits can have very different valuations. The difference comes down to risk and growth. A business where one customer accounts for 50% of revenue is riskier than one with a diversified base. A business that depends entirely on the owner is worth less than one with trained managers who can run operations. Revenue growth matters too: a company growing 20% per year commands a premium over one that has been flat for three years. Recurring revenue from contracts or subscriptions adds predictability that buyers pay more for. These factors adjust your multiple up or down from the industry baseline. Use our <Link href="/tools/dscr-calculator" className="text-theme-primary-light font-medium hover:underline">DSCR calculator</Link> to evaluate whether a target business generates enough cash flow to service acquisition debt.
            </p>

            <h3 className="text-xl font-bold text-quicklend-900 mb-3 mt-6">Financing a Business Acquisition</h3>
            <p className="text-gray-700 leading-relaxed mb-4">
              If you are buying a business, you will likely need financing to cover most of the purchase price. The most common structure combines an SBA 7(a) loan (up to $5 million with 10-year terms), <strong>seller financing</strong> (where the seller carries <strong>10% to 30%</strong> of the price as a note), and a buyer down payment of <strong>10% to 20%</strong>. For larger acquisitions, conventional <Link href="/business-loans/term-loans" className="text-theme-primary-light font-medium hover:underline">term loans</Link> or <Link href="/business-loans/investment-banking" className="text-theme-primary-light font-medium hover:underline">investment banking</Link> solutions may be appropriate. If the goal is employee ownership, <Link href="/business-loans/esop" className="text-theme-primary-light font-medium hover:underline">ESOP financing</Link> provides a tax-advantaged structure. Use our <Link href="/tools/sba-loan-payment-calculator" className="text-theme-primary-light font-medium hover:underline">SBA loan calculator</Link> to estimate monthly payments on acquisition financing.
            </p>

            <h3 className="text-xl font-bold text-quicklend-900 mb-3 mt-6">When to Get a Professional Valuation</h3>
            <p className="text-gray-700 leading-relaxed">
              This calculator provides estimates based on industry benchmarks and your inputs. For major transactions, a formal valuation from a Certified Business Appraiser (CBA) or Accredited Senior Appraiser (ASA) is recommended. You should get a professional valuation when selling to outside buyers, bringing in investors, setting up an ESOP, handling divorce or estate planning, or resolving legal disputes. A formal valuation typically costs <strong>$3,000 to $10,000</strong> depending on business size and complexity, but it provides defensible numbers that hold up in negotiations and legal proceedings. <Link href="/get-started" className="text-theme-primary-light font-medium hover:underline">Talk to a funding specialist</Link> about acquisition financing options, with no impact to your credit score.
            </p>
          </div>
        }
      >
        <BusinessValuationTool />
      </ToolPageLayout>
    </>
  )
}
