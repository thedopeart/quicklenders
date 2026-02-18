import Link from 'next/link'
import { generatePageMetadata } from '@/lib/metadata'
import { breadcrumbSchema, faqSchema, softwareApplicationSchema } from '@/lib/schema'
import { getToolBySlug } from '@/lib/tools-data'
import ToolPageLayout from '@/components/ToolPageLayout'
import StartupCostTool from './StartupCostTool'

const tool = getToolBySlug('startup-cost-calculator')!

export const metadata = generatePageMetadata({
  title: tool.seo.title,
  description: tool.seo.description,
  path: `/tools/${tool.slug}`,
})

const howItWorks = [
  {
    title: 'Choose a Template or Start Custom',
    text: 'Pick an industry template (restaurant, retail, e-commerce, etc.) for realistic starting values, or start from scratch with the custom option.',
  },
  {
    title: 'Walk Through 8 Expense Categories',
    text: 'Fill in costs for legal, location, equipment, inventory, marketing, staffing, insurance, and working capital. Each category shows a subtotal as you go.',
  },
  {
    title: 'See Your Total & Funding Plan',
    text: 'Get a category breakdown, three launch scenarios (lean, your estimate, comfortable), and calculate how much financing you need after personal savings.',
  },
]

const whatYouGet = [
  {
    title: '8 Expense Categories',
    text: 'Organized line items covering every common startup cost so you do not miss anything in your planning.',
  },
  {
    title: 'Industry Templates',
    text: 'Pre-filled defaults for restaurant, retail, professional services, e-commerce, contractor, and home-based businesses.',
  },
  {
    title: 'Category Breakdown Chart',
    text: 'See where your money goes with a visual breakdown showing each category as a percentage of total cost.',
  },
  {
    title: 'Funding Plan Calculator',
    text: 'Enter personal savings and other sources to see exactly how much financing you need to cover the gap.',
  },
  {
    title: 'Launch Scenarios',
    text: 'Compare lean, current, and comfortable launch budgets to understand your range of options.',
  },
  {
    title: '20% Buffer Recommendation',
    text: 'A recommended total that adds a contingency buffer for the unexpected costs that always come up.',
  },
]

export default function StartupCostCalculatorPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(
            breadcrumbSchema([
              { name: 'Home', url: '/' },
              { name: 'Tools', url: '/tools' },
              { name: 'Startup Cost Calculator', url: '/tools/startup-cost-calculator' },
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
              Planning Your Startup Budget
            </h2>
            <p className="text-gray-700 leading-relaxed mb-4">
              Startup costs fall into two groups: <strong>one-time expenses</strong> you pay before opening (registration, equipment, initial inventory) and <strong>ongoing expenses</strong> you need to cover until revenue kicks in (rent, payroll, marketing). The most common budgeting mistake is underestimating the second group. Most new businesses do not turn a profit for months, and running out of cash is the top reason startups fail. This calculator helps you account for both by including a working capital reserve category alongside your launch costs.
            </p>

            <h3 className="text-xl font-bold text-quicklend-900 mb-3 mt-6">Common Startup Cost Mistakes</h3>
            <p className="text-gray-700 leading-relaxed mb-4">
              Three mistakes that catch first-time business owners off guard. First, underestimating working capital: plan for <strong>3 to 6 months of operating expenses</strong> as a cushion, not just enough to open the doors. Second, forgetting hidden costs like utility deposits, professional liability insurance, permit renewals, and payroll taxes (typically <strong>15% to 30%</strong> on top of wages). Third, skipping the contingency buffer. Something always costs more than quoted or takes longer than planned. Add <strong>10% to 20%</strong> to your estimate. This calculator includes a 20% buffer recommendation and shows a "comfortable launch" scenario that builds in extra room. Use our <Link href="/tools/working-capital-calculator" className="text-theme-primary-light font-medium hover:underline">working capital calculator</Link> to go deeper on your ongoing cash needs.
            </p>

            <h3 className="text-xl font-bold text-quicklend-900 mb-3 mt-6">How to Fund Your Startup</h3>
            <p className="text-gray-700 leading-relaxed mb-4">
              Most startups use a mix of personal savings and financing. Lenders want to see you invest at least <strong>10% to 20%</strong> of the total cost from your own funds, which shows commitment and reduces their risk. For the remainder, common options include SBA loans (lowest rates but longer process, typically 680+ credit required), <Link href="/business-loans/term-loans" className="text-theme-primary-light font-medium hover:underline">business term loans</Link> (faster funding, good for specific purchases), <Link href="/business-loans/lines-of-credit" className="text-theme-primary-light font-medium hover:underline">lines of credit</Link> (flexible draw-and-repay for ongoing expenses), and <Link href="/business-loans/equipment-financing" className="text-theme-primary-light font-medium hover:underline">equipment financing</Link> (uses the equipment as collateral for lower rates). Use our <Link href="/tools/sba-loan-payment-calculator" className="text-theme-primary-light font-medium hover:underline">SBA loan calculator</Link> to estimate payments on the financing portion.
            </p>

            <h3 className="text-xl font-bold text-quicklend-900 mb-3 mt-6">Is Your Investment Worth It?</h3>
            <p className="text-gray-700 leading-relaxed">
              Once you know your startup costs, the next question is whether the business will generate enough revenue to pay back the investment and produce a profit. Our <Link href="/tools/roi-calculator" className="text-theme-primary-light font-medium hover:underline">ROI calculator</Link> helps you model that scenario: enter the financing amount, expected revenue increase, and ramp-up timeline to see your projected return. If you already know how much you want to borrow, the <Link href="/tools/loan-payment-calculator" className="text-theme-primary-light font-medium hover:underline">loan payment calculator</Link> shows your exact monthly obligation. <Link href="/get-started" className="text-theme-primary-light font-medium hover:underline">Talk to a funding specialist</Link> to explore your startup financing options with no impact to your credit score.
            </p>
          </div>
        }
      >
        <StartupCostTool />
      </ToolPageLayout>
    </>
  )
}
