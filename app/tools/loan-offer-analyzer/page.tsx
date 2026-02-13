import Link from 'next/link'
import { generatePageMetadata } from '@/lib/metadata'
import { breadcrumbSchema, faqSchema, softwareApplicationSchema } from '@/lib/schema'
import { getToolBySlug } from '@/lib/tools-data'
import ToolPageLayout from '@/components/ToolPageLayout'
import LoanOfferAnalyzerTool from './LoanOfferAnalyzerTool'

const tool = getToolBySlug('loan-offer-analyzer')!

export const metadata = generatePageMetadata({
  title: tool.seo.title,
  description: tool.seo.description,
  path: `/tools/${tool.slug}`,
})

const howItWorks = [
  {
    title: 'Enter the Offer Terms',
    text: 'Input the loan amount, cost structure (APR, factor rate, or fee), repayment term, and payment frequency from the offer you received.',
  },
  {
    title: 'Answer the Red Flag Checklist',
    text: 'Tell us about specific clauses: confession of judgment, personal guarantee, prepayment penalties, liens, and more. "Not Sure" is fine for any question.',
  },
  {
    title: 'Get Your Risk Assessment',
    text: 'See a color-coded report card with severity counts, detailed findings for each issue, true cost calculations, and a market rate comparison.',
  },
]

const whatYouGet = [
  {
    title: 'Red Flag Detection',
    text: 'Checks for confession of judgment, high factor rates, daily payment traps, blanket liens, stacking restrictions, and other predatory terms.',
  },
  {
    title: 'Effective APR Calculation',
    text: 'Converts factor rates and fee structures into an estimated APR so you can see the true annual cost of the offer.',
  },
  {
    title: 'True Cost Breakdown',
    text: 'See exactly how much you receive, how much you repay, the total financing cost, and your per-payment amount.',
  },
  {
    title: 'Market Rate Comparison',
    text: 'Visual comparison of your offer against typical SBA, bank, and online lender rates so you can see where it falls.',
  },
  {
    title: 'Detailed Findings',
    text: 'Each issue gets a card explaining what was found, why it matters, and what you should do about it.',
  },
  {
    title: 'Risk-Based Recommendation',
    text: 'A clear verdict based on the severity and number of issues found, with next steps.',
  },
]

export default function LoanOfferAnalyzerPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(
            breadcrumbSchema([
              { name: 'Home', url: '/' },
              { name: 'Tools', url: '/tools' },
              { name: 'Loan Offer Analyzer', url: '/tools/loan-offer-analyzer' },
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
              Understanding Predatory Business Lending
            </h2>
            <p className="text-gray-700 leading-relaxed mb-4">
              Unlike consumer loans, business loans have fewer regulations. This creates opportunities for predatory lenders to use confusing terms and dangerous contract clauses. Merchant cash advances, short-term online loans, and other alternative financing products can carry effective APRs of 50% to 200% while disguising the cost behind factor rates and daily payment structures. This tool helps you see through the marketing and understand what you are actually signing.
            </p>

            <h3 className="text-xl font-bold text-quicklend-900 mb-3 mt-6">The Most Dangerous Loan Terms</h3>
            <p className="text-gray-700 leading-relaxed mb-4">
              A confession of judgment (or &quot;cognovit note&quot;) means you agree in advance to let the lender win any lawsuit against you without going to court. If you miss a payment, they can seize your bank account and business assets without notice. These clauses are banned in many states including California, New York, and New Jersey, but still appear in loans issued from other states. Factor rates are another common trap: a 1.35 factor rate sounds low, but on a 6-month advance it equals roughly 70% to 85% APR. Use our <Link href="/tools/factor-rate-to-apr-calculator" className="text-theme-primary-light font-medium hover:underline">factor rate to APR converter</Link> to check any factor-rate offer.
            </p>

            <h3 className="text-xl font-bold text-quicklend-900 mb-3 mt-6">Red Flags When Shopping for Business Loans</h3>
            <p className="text-gray-700 leading-relaxed mb-4">
              Watch out for lenders who will not disclose APR (only factor rate or total payback), pressure you to sign immediately, do not ask about your ability to repay, found you through cold calls or spam, require upfront fees before approval, or guarantee approval regardless of credit. Legitimate lenders evaluate your financials, explain terms clearly, and give you time to review. When comparing offers, use our <Link href="/tools/business-loan-comparison-tool" className="text-theme-primary-light font-medium hover:underline">loan comparison tool</Link> to see total cost differences side by side. SBA loans typically run 6% to 10% APR, bank <Link href="/business-loans/term-loans" className="text-theme-primary-light font-medium hover:underline">term loans</Link> 7% to 15%, and competitive online lenders 15% to 35%.
            </p>

            <h3 className="text-xl font-bold text-quicklend-900 mb-3 mt-6">What to Do If You Already Signed</h3>
            <p className="text-gray-700 leading-relaxed">
              If you have already signed a predatory loan, start by reviewing the agreement for illegal clauses. Confession of judgment may be unenforceable in your state. Calculate the true APR, because misrepresented costs may give you grounds for a regulatory complaint. Look into refinancing to a lower-rate <Link href="/business-loans/term-loans" className="text-theme-primary-light font-medium hover:underline">term loan</Link> or <Link href="/business-loans/lines-of-credit" className="text-theme-primary-light font-medium hover:underline">line of credit</Link> with monthly payments. If you find illegal terms, consult a business attorney. You can also report predatory lenders to your state attorney general. <Link href="/get-started" className="text-theme-primary-light font-medium hover:underline">Talk to a funding specialist</Link> about refinancing options that could lower your cost, with no impact to your credit score.
            </p>
          </div>
        }
      >
        <LoanOfferAnalyzerTool />
      </ToolPageLayout>
    </>
  )
}
