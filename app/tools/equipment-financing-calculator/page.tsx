import Link from 'next/link'
import { generatePageMetadata } from '@/lib/metadata'
import { breadcrumbSchema, faqSchema, softwareApplicationSchema } from '@/lib/schema'
import { getToolBySlug } from '@/lib/tools-data'
import ToolPageLayout from '@/components/ToolPageLayout'
import EquipmentFinancingTool from './EquipmentFinancingTool'

const tool = getToolBySlug('equipment-financing-calculator')!

export const metadata = generatePageMetadata({
  title: tool.seo.title,
  description: tool.seo.description,
  path: `/tools/${tool.slug}`,
})

const howItWorks = [
  {
    title: 'Enter Equipment Details',
    text: 'Select your equipment category, enter the purchase price, and set the useful life and residual value.',
  },
  {
    title: 'Set Financing & Lease Terms',
    text: 'Adjust the down payment, loan rate, and term on the financing side. Enter or estimate a lease payment on the leasing side.',
  },
  {
    title: 'Compare the Full Picture',
    text: 'See a side-by-side breakdown of net cost including tax savings, residual value, and a clear recommendation.',
  },
]

const whatYouGet = [
  {
    title: 'Side-by-Side Comparison',
    text: 'Monthly payments, total cost, tax savings, residual value, and net cost for both financing and leasing in one table.',
  },
  {
    title: 'Section 179 Tax Savings',
    text: 'See how much you could save in Year 1 by deducting the full equipment cost under Section 179 (up to $1,160,000).',
  },
  {
    title: 'Net Cost After Tax Benefits',
    text: 'The true cost of each option after factoring in all tax deductions, interest savings, and equipment value at end of term.',
  },
  {
    title: 'Ownership Analysis',
    text: 'Compare building equity through financing versus returning equipment at lease end. See the residual value impact.',
  },
  {
    title: 'Tax Benefit Breakdown',
    text: 'Detailed view of tax savings for each option: Section 179, interest deductions for financing, deductible payments for leasing.',
  },
  {
    title: 'Decision Guidance',
    text: 'Beyond the numbers: qualitative factors that help you choose between financing and leasing based on your business situation.',
  },
]

export default function EquipmentFinancingCalculatorPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(
            breadcrumbSchema([
              { name: 'Home', url: '/' },
              { name: 'Tools', url: '/tools' },
              { name: 'Equipment Financing Calculator', url: '/tools/equipment-financing-calculator' },
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
              Should You Finance or Lease Your Business Equipment?
            </h2>
            <p className="text-gray-700 leading-relaxed mb-4">
              Every business owner faces this decision: buy equipment with a loan or lease it? Both have real advantages depending on your situation, and the right answer depends on factors most people overlook. Tax implications, opportunity cost, residual value, and total cost of ownership all affect the outcome. This calculator runs the full comparison so you can make an informed decision with your actual numbers.
            </p>
            <p className="text-gray-700 leading-relaxed mb-4">
              <Link href="/business-loans/equipment-financing" className="text-theme-primary-light font-medium hover:underline">Equipment financing</Link> lets you own the asset outright after payoff. You build equity, benefit from Section 179 tax deductions, and keep the residual value when you sell or trade in. Leasing keeps monthly costs lower (often with no down payment), but you return the equipment at end of term with no equity. The cost difference can be significant over the useful life of the equipment.
            </p>

            <h3 className="text-xl font-bold text-quicklend-900 mb-3 mt-6">Understanding Section 179</h3>
            <p className="text-gray-700 leading-relaxed mb-4">
              Section 179 of the IRS tax code allows businesses to deduct the full purchase price of qualifying equipment in the year it is placed in service, up to $1,160,000. Instead of depreciating the cost over 5 to 7 years, you take the entire deduction in Year 1. For a $150,000 equipment purchase at a 25% tax rate, that is $37,500 in immediate tax savings. This front-loaded benefit often makes financing significantly cheaper than leasing on a net-cost basis. Section 179 applies to purchased (financed) equipment and some capital leases, but not operating leases.
            </p>

            <h3 className="text-xl font-bold text-quicklend-900 mb-3 mt-6">When Leasing Makes Sense</h3>
            <p className="text-gray-700 leading-relaxed mb-4">
              Leasing is not always the more expensive option. For technology that becomes obsolete quickly (IT equipment, medical imaging), leasing lets you upgrade every few years without being stuck with outdated gear. Startups with limited cash benefit from zero down payment requirements. Seasonal businesses may prefer the predictability of fixed lease payments. And some businesses prefer keeping assets off the balance sheet. Use the calculator above to compare both options with your specific terms.
            </p>

            <h3 className="text-xl font-bold text-quicklend-900 mb-3 mt-6">Getting the Best Equipment Financing Rate</h3>
            <p className="text-gray-700 leading-relaxed">
              Equipment financing rates typically range from 7% to 14%, with the best rates going to businesses with strong credit and stable revenue. Because the equipment itself serves as collateral, qualification requirements are often more flexible than unsecured <Link href="/business-loans/term-loans" className="text-theme-primary-light font-medium hover:underline">term loans</Link>. A larger down payment (10% to 20%) can lower your rate and monthly payment. Use our <Link href="/tools/loan-payment-calculator" className="text-theme-primary-light font-medium hover:underline">loan payment calculator</Link> to model different scenarios, or check your <Link href="/tools/dscr-calculator" className="text-theme-primary-light font-medium hover:underline">DSCR</Link> to see how lenders will view your capacity. <Link href="/get-started" className="text-theme-primary-light font-medium hover:underline">Talk to a funding specialist</Link> to compare equipment financing offers with no credit impact.
            </p>
          </div>
        }
      >
        <EquipmentFinancingTool />
      </ToolPageLayout>
    </>
  )
}
