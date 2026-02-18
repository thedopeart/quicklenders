import Link from 'next/link'
import { generatePageMetadata } from '@/lib/metadata'
import { breadcrumbSchema, faqSchema, softwareApplicationSchema } from '@/lib/schema'
import { getToolBySlug } from '@/lib/tools-data'
import ToolPageLayout from '@/components/ToolPageLayout'
import CashFlowForecastTool from './CashFlowForecastTool'

const tool = getToolBySlug('cash-flow-forecast-tool')!

export const metadata = generatePageMetadata({
  title: tool.seo.title,
  description: tool.seo.description,
  path: `/tools/${tool.slug}`,
})

const howItWorks = [
  {
    title: 'Enter Your Baseline Numbers',
    text: 'Input your starting cash balance, monthly revenue, cost of goods sold, operating expenses, and any existing loan payments.',
  },
  {
    title: 'Adjust Growth and Seasonality',
    text: 'Set a monthly revenue growth rate and, if your business has busy or slow seasons, adjust individual months up or down from your baseline.',
  },
  {
    title: 'See Your 12-Month Projection',
    text: 'View monthly cash flow bars, your running cash balance, funding gap alerts, and the impact of adding a new loan payment to your forecast.',
  },
]

const whatYouGet = [
  {
    title: '12-Month Cash Projection',
    text: 'Month-by-month view of revenue, expenses, net cash flow, and running balance for the next year.',
  },
  {
    title: 'Revenue Growth Modeling',
    text: 'Apply a monthly growth rate from -5% to 10% so your forecast reflects where your business is heading, not just where it is now.',
  },
  {
    title: 'Seasonal Adjustments',
    text: 'Adjust individual months from 0% to 200% of baseline revenue to account for busy seasons, slow periods, and holiday spikes.',
  },
  {
    title: 'New Loan Impact Analysis',
    text: 'Toggle on a proposed loan payment to see how it changes your cash position before you commit to borrowing.',
  },
  {
    title: 'Funding Gap Alerts',
    text: 'Automatic warnings when your running balance drops below zero, so you know exactly which months need a cash bridge.',
  },
  {
    title: 'Visual Cash Flow Charts',
    text: 'Bar charts showing monthly surplus or deficit and your running cash balance, with negative months highlighted in red.',
  },
]

export default function CashFlowForecastToolPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(
            breadcrumbSchema([
              { name: 'Home', url: '/' },
              { name: 'Tools', url: '/tools' },
              { name: 'Cash Flow Forecast Tool', url: '/tools/cash-flow-forecast-tool' },
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
              Why Cash Flow Forecasting Matters
            </h2>
            <p className="text-gray-700 leading-relaxed mb-4">
              <strong>Cash flow is the number one reason small businesses fail.</strong> Not profit, not revenue: cash. A profitable business can still run out of cash if expenses are front-loaded and revenue lags behind. A <strong>12-month cash flow forecast</strong> gives you a forward-looking view of your cash position so you can spot gaps before they become emergencies. Lenders also ask for cash flow projections when evaluating loan applications because they want to see that you can cover the payments from operating cash flow, not just from borrowing more.
            </p>

            <h3 className="text-xl font-bold text-quicklend-900 mb-3 mt-6">Building a Realistic Forecast</h3>
            <p className="text-gray-700 leading-relaxed mb-4">
              The biggest mistake business owners make with cash flow projections is being too optimistic about revenue and too conservative about expenses. Start with your actual numbers from the past 3 to 6 months. If your monthly revenue has been <strong>$80,000</strong>, use that as your baseline, not the $120,000 you hope to hit next quarter. For growth rate, look at your recent trend. If you have been growing 2% per month, use that. If growth has been flat, use 0%. You can always run the forecast twice with different assumptions to see best and worst case scenarios. Use our <Link href="/tools/dscr-calculator" className="text-theme-primary-light font-medium hover:underline">DSCR calculator</Link> to check whether lenders will view your debt-to-income ratio favorably.
            </p>

            <h3 className="text-xl font-bold text-quicklend-900 mb-3 mt-6">Seasonal Patterns and Cash Gaps</h3>
            <p className="text-gray-700 leading-relaxed mb-4">
              Seasonal businesses face a particular challenge: revenue drops in slow months while many fixed costs stay the same. A landscaping company might do <strong>60% of its annual revenue</strong> between April and September. A retailer might depend on Q4 for <strong>40% of sales</strong>. This tool lets you adjust individual months to reflect your real seasonal pattern. If January is typically 70% of your average month and July is 130%, set those adjustments and see how your cash balance responds. Many seasonal businesses use a <Link href="/business-loans/lines-of-credit" className="text-theme-primary-light font-medium hover:underline">business line of credit</Link> to bridge slow periods, drawing funds when cash is tight and repaying when revenue picks up. Our <Link href="/tools/working-capital-calculator" className="text-theme-primary-light font-medium hover:underline">working capital calculator</Link> can help you figure out how much cushion you need.
            </p>

            <h3 className="text-xl font-bold text-quicklend-900 mb-3 mt-6">Using Your Forecast to Plan Financing</h3>
            <p className="text-gray-700 leading-relaxed">
              Once you see your 12-month projection, use it to make better financing decisions. If the forecast shows you can comfortably handle a new loan payment every month, that is a strong sign the debt makes sense. If adding a loan payment pushes two or three months into negative territory, you might need a longer term to reduce the payment, a smaller loan amount, or a <Link href="/business-loans/lines-of-credit" className="text-theme-primary-light font-medium hover:underline">line of credit</Link> instead of a <Link href="/business-loans/term-loans" className="text-theme-primary-light font-medium hover:underline">term loan</Link>. Use our <Link href="/tools/loan-payment-calculator" className="text-theme-primary-light font-medium hover:underline">loan payment calculator</Link> to model different amounts and terms, then plug the payment back into this forecast to see the full impact. <Link href="/get-started" className="text-theme-primary-light font-medium hover:underline">Talk to a funding specialist</Link> to find the right financing structure for your cash flow pattern, with no impact to your credit score.
            </p>
          </div>
        }
      >
        <CashFlowForecastTool />
      </ToolPageLayout>
    </>
  )
}
