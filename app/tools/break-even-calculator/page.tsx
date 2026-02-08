import Link from 'next/link'
import { generatePageMetadata } from '@/lib/metadata'
import { breadcrumbSchema, faqSchema, softwareApplicationSchema } from '@/lib/schema'
import { getToolBySlug } from '@/lib/tools-data'
import ToolPageLayout from '@/components/ToolPageLayout'
import BreakEvenCalculatorTool from './BreakEvenCalculatorTool'

const tool = getToolBySlug('break-even-calculator')!

export const metadata = generatePageMetadata({
  title: tool.seo.title,
  description: tool.seo.description,
  path: `/tools/${tool.slug}`,
})

const howItWorks = [
  {
    title: 'Enter Your Numbers',
    text: 'Input your monthly fixed costs, price per unit, and variable cost per unit using the sliders or text fields.',
  },
  {
    title: 'See Your Break-Even Point',
    text: 'Instantly see how many units you need to sell and how much revenue you need to generate to cover all costs.',
  },
  {
    title: 'Visualize Your Profit Zone',
    text: 'The interactive chart shows exactly where your revenue line crosses your cost line. Everything beyond that crossing point is profit.',
  },
]

const whatYouGet = [
  {
    title: 'Break-Even Units',
    text: 'The exact number of units you need to sell to cover all fixed and variable costs with zero profit and zero loss.',
  },
  {
    title: 'Break-Even Revenue',
    text: 'The total revenue dollar amount your business needs to generate to reach the break-even point.',
  },
  {
    title: 'Contribution Margin per Unit',
    text: 'How much each unit sold contributes toward covering your fixed costs and generating profit.',
  },
  {
    title: 'Contribution Margin Ratio',
    text: 'The percentage of each revenue dollar that goes toward covering fixed costs. A key profitability metric for any business.',
  },
  {
    title: 'Interactive Profit Chart',
    text: 'A visual chart showing revenue and total cost lines with shaded loss and profit zones for instant clarity.',
  },
  {
    title: 'Actionable Context',
    text: 'Educational callouts explain your results and show how to factor loan payments into your break-even analysis.',
  },
]

export default function BreakEvenCalculatorPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(
            breadcrumbSchema([
              { name: 'Home', url: '/' },
              { name: 'Tools', url: '/tools' },
              { name: 'Break-Even Calculator', url: '/tools/break-even-calculator' },
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
              Understanding Break-Even Analysis for Your Business
            </h2>
            <p className="text-gray-700 leading-relaxed mb-4">
              Break-even analysis answers a straightforward question: how many units do you need to sell before your business starts making money? Whether you are launching a new product, opening a second location, or evaluating a <Link href="/business-loans/term-loans" className="text-theme-primary-light font-medium hover:underline">business term loan</Link> for expansion, knowing your break-even point helps you plan with real numbers instead of guesses.
            </p>
            <p className="text-gray-700 leading-relaxed mb-4">
              The formula: Break-Even Units = Fixed Costs / (Price Per Unit - Variable Cost Per Unit). The bottom half of that equation (price minus variable cost) is called the contribution margin. A higher contribution margin means you need fewer sales to cover your overhead. The contribution margin ratio, expressed as a percentage of selling price, tells you how much of each revenue dollar goes toward covering fixed costs.
            </p>
            <p className="text-gray-700 leading-relaxed mb-4">
              Fixed costs are expenses that remain constant regardless of your sales volume: rent, salaries, insurance, loan payments, and subscriptions. Variable costs fluctuate with production or sales: raw materials, packaging, shipping, and sales commissions. Correctly categorizing your costs is the key to an accurate break-even analysis.
            </p>
            <p className="text-gray-700 leading-relaxed mb-4">
              One of the most powerful applications of break-even analysis is evaluating financing decisions. If you are considering <Link href="/business-loans/equipment-financing" className="text-theme-primary-light font-medium hover:underline">equipment financing</Link> to increase production capacity, add the monthly loan payment to your fixed costs and recalculate. This tells you exactly how many additional units you need to sell to justify the investment. Use our <Link href="/tools/loan-payment-calculator" className="text-theme-primary-light font-medium hover:underline">loan payment calculator</Link> to determine the exact monthly payment for any loan scenario.
            </p>
            <p className="text-gray-700 leading-relaxed">
              For businesses evaluating different financing structures, our <Link href="/tools/factor-rate-to-apr-calculator" className="text-theme-primary-light font-medium hover:underline">Factor Rate to APR Converter</Link> can help you understand the true cost of short-term financing, while a <Link href="/business-loans/lines-of-credit" className="text-theme-primary-light font-medium hover:underline">business line of credit</Link> may offer more flexible capital to cover costs as you grow past your break-even point.
            </p>
          </div>
        }
      >
        <BreakEvenCalculatorTool />
      </ToolPageLayout>
    </>
  )
}
