import Link from 'next/link'
import { generatePageMetadata } from '@/lib/metadata'
import { breadcrumbSchema, faqSchema, softwareApplicationSchema } from '@/lib/schema'
import { getToolBySlug } from '@/lib/tools-data'
import ToolPageLayout from '@/components/ToolPageLayout'
import TotalCostOfCapitalTool from './TotalCostOfCapitalTool'

const tool = getToolBySlug('total-cost-of-capital-calculator')!

export const metadata = generatePageMetadata({
  title: tool.seo.title,
  description: tool.seo.description,
  path: `/tools/${tool.slug}`,
})

const howItWorks = [
  {
    title: 'Enter Loan Details',
    text: 'Input your loan amount, interest rate or factor rate, term length, and payment frequency.',
  },
  {
    title: 'Add All Fees',
    text: 'Include origination fees, closing costs, documentation fees, and any other charges the lender quotes.',
  },
  {
    title: 'See the True Cost',
    text: 'Get your effective APR, total cost of capital, cost per dollar borrowed, and a full breakdown of every charge.',
  },
]

const whatYouGet = [
  {
    title: 'Effective APR',
    text: 'The true annual rate once all fees are factored in, not just the quoted interest rate.',
  },
  {
    title: 'Total Cost of Capital',
    text: 'Interest plus every fee combined into one number so you can see the full price of borrowing.',
  },
  {
    title: 'Cost Per Dollar Borrowed',
    text: 'How much you pay in total costs for every dollar you receive. A quick way to compare offers.',
  },
  {
    title: 'Stated vs Effective Rate',
    text: 'A visual comparison showing how much fees inflate the rate beyond what the lender quotes.',
  },
  {
    title: 'Fee Breakdown Chart',
    text: 'See exactly where your money goes with a proportional breakdown of interest versus each fee.',
  },
  {
    title: 'Net Proceeds Calculation',
    text: 'The actual amount you receive after upfront fees are deducted from the loan amount.',
  },
]

export default function TotalCostOfCapitalCalculatorPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(
            breadcrumbSchema([
              { name: 'Home', url: '/' },
              { name: 'Tools', url: '/tools' },
              { name: 'Total Cost of Capital Calculator', url: '/tools/total-cost-of-capital-calculator' },
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
              Why the Quoted Rate Is Not the Full Story
            </h2>
            <p className="text-gray-700 leading-relaxed mb-4">
              A lender quotes you 10% on a $200,000 loan. Sounds straightforward. But then there is a <strong>2% origination fee ($4,000)</strong>, a <strong>$1,500 closing cost</strong>, and a $500 documentation fee. Those <strong>$6,000 in fees</strong> come off the top. You receive <strong>$194,000</strong>, but you pay interest on the full $200,000. The <strong>effective APR is closer to 11.5%</strong>, and your total cost of capital is $6,000 higher than the interest alone would suggest. This calculator runs that math for you so you can compare offers on a level playing field.
            </p>

            <h3 className="text-xl font-bold text-quicklend-900 mb-3 mt-6">What Is Effective APR?</h3>
            <p className="text-gray-700 leading-relaxed mb-4">
              <strong>Effective APR</strong> is the annual rate that accounts for all costs of borrowing, not just the interest rate. It factors in origination fees, closing costs, and any other charges that reduce the amount you actually receive. Two loans with the same quoted rate can have very different effective APRs depending on their fee structures. The <strong>Truth in Lending Act (TILA)</strong> requires lenders to disclose APR for consumer loans, but business loans are not always held to the same standard. Use our <Link href="/tools/factor-rate-to-apr-calculator" className="text-theme-primary-light font-medium hover:underline">factor rate to APR converter</Link> if you need to convert a factor rate to an annual percentage rate.
            </p>

            <h3 className="text-xl font-bold text-quicklend-900 mb-3 mt-6">Common Fees That Increase Your Cost</h3>
            <p className="text-gray-700 leading-relaxed mb-4">
              <strong>Origination fees</strong> are the most common, typically ranging from <strong>1% to 5%</strong> of the loan amount. Closing costs cover appraisals, title searches, and legal work, and can run $500 to $5,000 or more on larger loans. Documentation and packaging fees are charged by some lenders for processing your application. UCC filing fees, wire transfer fees, and technology fees are smaller line items that add up. When comparing <Link href="/business-loans/term-loans" className="text-theme-primary-light font-medium hover:underline">term loans</Link> or <Link href="/business-loans/lines-of-credit" className="text-theme-primary-light font-medium hover:underline">lines of credit</Link>, always ask for the full fee schedule before committing.
            </p>

            <h3 className="text-xl font-bold text-quicklend-900 mb-3 mt-6">Comparing Offers the Right Way</h3>
            <p className="text-gray-700 leading-relaxed">
              The best way to compare financing options is to look at the total cost of capital and the effective APR for each offer. A loan with a lower stated rate but higher fees can cost more overall than one with a slightly higher rate and no fees. Cost per dollar borrowed is another useful metric: if Offer A costs <strong>$0.18 per dollar</strong> and Offer B costs <strong>$0.22 per dollar</strong>, Offer A is cheaper regardless of how the rates and fees are structured. Use our <Link href="/tools/business-loan-comparison-tool" className="text-theme-primary-light font-medium hover:underline">loan comparison tool</Link> to put two or three offers side by side, or <Link href="/get-started" className="text-theme-primary-light font-medium hover:underline">talk to a funding specialist</Link> who can help you find the lowest all-in cost for your situation, with no impact to your credit score.
            </p>
          </div>
        }
      >
        <TotalCostOfCapitalTool />
      </ToolPageLayout>
    </>
  )
}
