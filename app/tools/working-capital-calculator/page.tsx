import Link from 'next/link'
import { generatePageMetadata } from '@/lib/metadata'
import { breadcrumbSchema, faqSchema, softwareApplicationSchema } from '@/lib/schema'
import { getToolBySlug } from '@/lib/tools-data'
import ToolPageLayout from '@/components/ToolPageLayout'
import WorkingCapitalTool from './WorkingCapitalTool'

const tool = getToolBySlug('working-capital-calculator')!

export const metadata = generatePageMetadata({
  title: tool.seo.title,
  description: tool.seo.description,
  path: `/tools/${tool.slug}`,
})

const howItWorks = [
  {
    title: 'Enter Your Assets & Liabilities',
    text: 'Input your current cash, receivables, inventory, payables, and short-term debt. Add monthly expenses for a deeper analysis.',
  },
  {
    title: 'See Your Position',
    text: 'Get your net working capital, ratio health indicator, cash runway, and cash conversion cycle in real time.',
  },
  {
    title: 'Get a Recommendation',
    text: 'See how much working capital financing you may need at three tiers: minimum, comfortable, and growth mode.',
  },
]

const whatYouGet = [
  {
    title: 'Working Capital Ratio',
    text: 'Your ratio with a color-coded health indicator: critical, tight, adequate, healthy, or strong.',
  },
  {
    title: 'Assets vs Liabilities Visual',
    text: 'Side-by-side bar comparison showing the breakdown of your current assets and liabilities.',
  },
  {
    title: 'Cash Conversion Cycle',
    text: 'Days Inventory Outstanding, Days Sales Outstanding, Days Payable Outstanding, and total cycle in days.',
  },
  {
    title: 'Cash Runway Analysis',
    text: 'How many months your current cash covers, plus the gap to reach 3-month and 6-month targets.',
  },
  {
    title: 'Financing Recommendation',
    text: 'Three tiers of recommended financing: minimum, comfortable (with buffer), and growth mode.',
  },
  {
    title: 'Dynamic CTA',
    text: 'A specific next step based on your ratio and recommended financing amount.',
  },
]

export default function WorkingCapitalCalculatorPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(
            breadcrumbSchema([
              { name: 'Home', url: '/' },
              { name: 'Tools', url: '/tools' },
              { name: 'Working Capital Calculator', url: '/tools/working-capital-calculator' },
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
              Understanding Working Capital
            </h2>
            <p className="text-gray-700 leading-relaxed mb-4">
              Working capital is the money available for day-to-day operations: the difference between what you own (current assets) and what you owe (current liabilities) in the short term. Positive working capital means you can pay suppliers, cover payroll, and handle unexpected costs. Negative or tight working capital means you are constantly juggling, potentially missing payments, and vulnerable to any disruption.
            </p>

            <h3 className="text-xl font-bold text-quicklend-900 mb-3 mt-6">The Working Capital Cycle</h3>
            <p className="text-gray-700 leading-relaxed mb-4">
              Cash flows through your business in a cycle: you pay suppliers for inventory, sell to customers, then wait for customers to pay you. The longer this cycle takes, the more working capital you need. If customers take 60 days to pay but you owe suppliers in 30 days, you need cash to bridge that 30-day gap. The cash conversion cycle analysis in this calculator measures exactly how long your money is tied up. Shortening the cycle by speeding up collections or negotiating longer supplier terms reduces your working capital needs. Our <Link href="/tools/invoice-factoring-calculator" className="text-theme-primary-light font-medium hover:underline">invoice factoring calculator</Link> shows what it costs to convert receivables to cash immediately.
            </p>

            <h3 className="text-xl font-bold text-quicklend-900 mb-3 mt-6">Financing Options for Working Capital</h3>
            <p className="text-gray-700 leading-relaxed mb-4">
              A <Link href="/business-loans/lines-of-credit" className="text-theme-primary-light font-medium hover:underline">business line of credit</Link> is the most common choice for working capital because you draw only what you need and pay interest only on what you use. For one-time needs with a clear payback plan, a short-term <Link href="/business-loans/term-loans" className="text-theme-primary-light font-medium hover:underline">term loan</Link> works well. If slow-paying customers are the root cause, invoice factoring converts receivables into immediate cash. For larger businesses, <Link href="/business-loans/asset-backed-loans" className="text-theme-primary-light font-medium hover:underline">asset-based lending</Link> can secure a facility against your receivables and inventory.
            </p>

            <h3 className="text-xl font-bold text-quicklend-900 mb-3 mt-6">Signs You Need Working Capital Financing</h3>
            <p className="text-gray-700 leading-relaxed">
              Common warning signs: regularly delaying supplier payments, struggling to make payroll on time, turning down opportunities because of cash constraints, seasonal slow periods that drain reserves, or growing fast and cash cannot keep up with expenses. If any of these sound familiar, use this calculator to quantify the gap. Check your <Link href="/tools/dscr-calculator" className="text-theme-primary-light font-medium hover:underline">DSCR</Link> to see how lenders will evaluate your capacity, or use our <Link href="/tools/line-of-credit-interest-calculator" className="text-theme-primary-light font-medium hover:underline">line of credit calculator</Link> to estimate costs. <Link href="/get-started" className="text-theme-primary-light font-medium hover:underline">Talk to a funding specialist</Link> to compare your options with no credit impact.
            </p>
          </div>
        }
      >
        <WorkingCapitalTool />
      </ToolPageLayout>
    </>
  )
}
