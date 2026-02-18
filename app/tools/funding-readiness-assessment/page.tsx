import Link from 'next/link'
import { generatePageMetadata } from '@/lib/metadata'
import { breadcrumbSchema, faqSchema, softwareApplicationSchema } from '@/lib/schema'
import { getToolBySlug } from '@/lib/tools-data'
import ToolPageLayout from '@/components/ToolPageLayout'
import FundingReadinessTool from './FundingReadinessTool'

const tool = getToolBySlug('funding-readiness-assessment')!

export const metadata = generatePageMetadata({
  title: tool.seo.title,
  description: tool.seo.description,
  path: `/tools/${tool.slug}`,
})

const howItWorks = [
  {
    title: 'Answer 8 Questions',
    text: 'Quick questions about your credit, revenue, time in business, debt, collateral, documentation, and funding purpose.',
  },
  {
    title: 'Get Your Readiness Score',
    text: 'See an overall score out of 100 plus a breakdown across four categories showing your strengths and gaps.',
  },
  {
    title: 'See Your Best Options',
    text: 'Get matched loan recommendations based on your profile, with tips to improve your approval odds.',
  },
]

const whatYouGet = [
  {
    title: 'Readiness Score (0-100)',
    text: 'A single number showing how prepared you are for financing approval, based on common lender criteria.',
  },
  {
    title: 'Category Breakdown',
    text: 'Scores for credit and history, revenue and profitability, debt and collateral, and documentation.',
  },
  {
    title: 'Loan Type Recommendations',
    text: 'See which financing products match your profile: SBA loans, term loans, lines of credit, and more.',
  },
  {
    title: 'Match Likelihood',
    text: 'Each recommendation shows whether it is a likely match, possible, or unlikely given your answers.',
  },
  {
    title: 'Improvement Tips',
    text: 'Specific actions to boost your score and qualify for better rates and terms.',
  },
  {
    title: 'No Personal Info Required',
    text: 'Your answers are not saved or shared. Retake the assessment as your situation changes.',
  },
]

export default function FundingReadinessAssessmentPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(
            breadcrumbSchema([
              { name: 'Home', url: '/' },
              { name: 'Tools', url: '/tools' },
              { name: 'Funding Readiness Assessment', url: '/tools/funding-readiness-assessment' },
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
              What Lenders Look For When You Apply
            </h2>
            <p className="text-gray-700 leading-relaxed mb-4">
              Every lender evaluates borrowers differently, but most weigh the same core factors: credit score, time in business, revenue, profitability, existing debt, collateral, and documentation. A strong profile in all categories means more options, better rates, and faster approval. Weakness in one area does not disqualify you, but it narrows the field. This assessment scores you across these factors so you know where you stand before submitting an application.
            </p>

            <h3 className="text-xl font-bold text-quicklend-900 mb-3 mt-6">Credit Score: The First Filter</h3>
            <p className="text-gray-700 leading-relaxed mb-4">
              Most traditional lenders require a personal credit score of <strong>680+</strong> for business loan approval. Online lenders are more flexible, often accepting <strong>600 or even 580</strong>. Below 580, options are limited to MCAs, invoice factoring, or secured products. Improving your score before applying can save thousands in interest. Pay down credit card balances, dispute errors on your report, and avoid opening new accounts right before applying. Check our <Link href="/tools/dscr-calculator" className="text-theme-primary-light font-medium hover:underline">DSCR calculator</Link> to see if your cash flow supports the loan payment regardless of credit.
            </p>

            <h3 className="text-xl font-bold text-quicklend-900 mb-3 mt-6">Revenue and Time in Business</h3>
            <p className="text-gray-700 leading-relaxed mb-4">
              Lenders want to see that your business generates enough revenue to cover the loan payment and still operate. Most require at least <strong>$100,000 in annual revenue</strong> and <strong>2 years in business</strong>. Startups under 1 year face the biggest challenge, but <Link href="/business-loans/equipment-financing" className="text-theme-primary-light font-medium hover:underline">equipment financing</Link> and SBA microloans are available for newer businesses with strong plans. Use our <Link href="/tools/loan-affordability-calculator" className="text-theme-primary-light font-medium hover:underline">loan affordability calculator</Link> to determine how much you can borrow based on your revenue.
            </p>

            <h3 className="text-xl font-bold text-quicklend-900 mb-3 mt-6">Getting Application-Ready</h3>
            <p className="text-gray-700 leading-relaxed">
              Before applying, gather <strong>3 months of bank statements</strong>, <strong>2 years of tax returns</strong> (personal and business), a current <strong>profit and loss statement</strong>, and a <strong>balance sheet</strong>. Know exactly how much you need and what you will use it for. Vague answers slow down approvals. If your score shows gaps, address them before applying. Even a few months of improvement can make the difference between approval and denial. When you are ready, <Link href="/get-started" className="text-theme-primary-light font-medium hover:underline">talk to a funding specialist</Link> who can match you with lenders that fit your profile, with no impact to your credit score.
            </p>
          </div>
        }
      >
        <FundingReadinessTool />
      </ToolPageLayout>
    </>
  )
}
