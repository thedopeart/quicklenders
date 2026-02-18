import Link from 'next/link'
import { generatePageMetadata } from '@/lib/metadata'
import { breadcrumbSchema, faqSchema, softwareApplicationSchema } from '@/lib/schema'
import { getToolBySlug } from '@/lib/tools-data'
import ToolPageLayout from '@/components/ToolPageLayout'
import InterestRateComparisonTool from './InterestRateComparisonTool'

const tool = getToolBySlug('interest-rate-comparison-chart')!

export const metadata = generatePageMetadata({
  title: tool.seo.title,
  description: tool.seo.description,
  path: `/tools/${tool.slug}`,
})

const howItWorks = [
  {
    title: 'Browse the Chart',
    text: 'See rate ranges for 9 business financing products displayed as a visual comparison chart.',
  },
  {
    title: 'Sort and Compare',
    text: 'Sort by lowest rate, fastest approval, credit requirement, or alphabetically to find what matters most to you.',
  },
  {
    title: 'Read the Details',
    text: 'Each product row shows typical rates, terms, amounts, approval speed, credit minimums, and key notes.',
  },
]

const whatYouGet = [
  {
    title: 'Visual Rate Comparison',
    text: 'A bar chart showing rate ranges side by side so you can spot the cheapest and most expensive options at a glance.',
  },
  {
    title: '9 Product Types Compared',
    text: 'SBA loans, bank term loans, online lenders, lines of credit, equipment financing, factoring, MCAs, and more.',
  },
  {
    title: 'Sortable Table',
    text: 'Sort by rate, approval speed, or credit score to quickly find the products that fit your priorities.',
  },
  {
    title: 'Approval Speed Estimates',
    text: 'See how long each product typically takes from application to funding.',
  },
  {
    title: 'Credit Score Minimums',
    text: 'Color-coded credit requirements so you can filter to products you are likely to qualify for.',
  },
  {
    title: 'Amount and Term Ranges',
    text: 'Loan amounts and term lengths for each product type, from $5,000 microloans to $50M asset-based facilities.',
  },
]

export default function InterestRateComparisonChartPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(
            breadcrumbSchema([
              { name: 'Home', url: '/' },
              { name: 'Tools', url: '/tools' },
              { name: 'Interest Rate Comparison Chart', url: '/tools/interest-rate-comparison-chart' },
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
              Business Loan Rates: What to Expect
            </h2>
            <p className="text-gray-700 leading-relaxed mb-4">
              Interest rates vary widely depending on the type of financing, the lender, and your business profile. SBA loans start as low as <strong>6%</strong>, while merchant cash advances can exceed <strong>100% APR equivalent</strong>. The chart above shows typical ranges, but your actual rate depends on factors like credit score, time in business, revenue, industry, and the loan amount. Stronger profiles get lower rates. Weaker profiles pay more, but still have options.
            </p>

            <h3 className="text-xl font-bold text-quicklend-900 mb-3 mt-6">Why Rates Vary So Much</h3>
            <p className="text-gray-700 leading-relaxed mb-4">
              Lenders price risk. The safer the loan (lower chance of default), the lower the rate. SBA loans are guaranteed by the government, so banks can offer low rates. Equipment loans use the equipment as collateral. Unsecured online loans carry more risk for the lender, so they charge more. MCAs are the riskiest product for the provider, which is why they are the most expensive. Your credit score, cash flow history, and collateral all affect where you land within each range.
            </p>

            <h3 className="text-xl font-bold text-quicklend-900 mb-3 mt-6">Rate vs Total Cost</h3>
            <p className="text-gray-700 leading-relaxed mb-4">
              A lower rate does not always mean a lower total cost. A <strong>10% rate over 5 years</strong> costs more in total interest than a <strong>15% rate over 2 years</strong>, even though the monthly payment is lower. Factor in origination fees, closing costs, and other charges. Use our <Link href="/tools/total-cost-of-capital-calculator" className="text-theme-primary-light font-medium hover:underline">total cost of capital calculator</Link> to compare the all-in cost of different options, or the <Link href="/tools/loan-payment-calculator" className="text-theme-primary-light font-medium hover:underline">loan payment calculator</Link> to see how rates affect monthly payments.
            </p>

            <h3 className="text-xl font-bold text-quicklend-900 mb-3 mt-6">Getting the Best Rate for Your Business</h3>
            <p className="text-gray-700 leading-relaxed">
              The best way to get a competitive rate is to improve your credit score, show consistent revenue, reduce existing debt, and have organized financial documentation. Then compare offers from multiple lenders. Rates for the same loan can vary by <strong>5 to 10 percentage points</strong> between lenders. Our <Link href="/tools/business-loan-comparison-tool" className="text-theme-primary-light font-medium hover:underline">loan comparison tool</Link> lets you put offers side by side. Or <Link href="/get-started" className="text-theme-primary-light font-medium hover:underline">talk to a funding specialist</Link> who can match you with lenders offering the best rates for your profile, with no impact to your credit score.
            </p>
          </div>
        }
      >
        <InterestRateComparisonTool />
      </ToolPageLayout>
    </>
  )
}
