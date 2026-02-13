import Link from 'next/link'
import { generatePageMetadata } from '@/lib/metadata'
import { breadcrumbSchema, faqSchema, softwareApplicationSchema } from '@/lib/schema'
import { getToolBySlug } from '@/lib/tools-data'
import ToolPageLayout from '@/components/ToolPageLayout'
import LoanRejectionDecoderTool from './LoanRejectionDecoderTool'

const tool = getToolBySlug('loan-rejection-decoder')!

export const metadata = generatePageMetadata({
  title: tool.seo.title,
  description: tool.seo.description,
  path: `/tools/${tool.slug}`,
})

const howItWorks = [
  {
    title: 'Tell Us What Happened',
    text: 'Select the type of financing you were denied for, or choose "haven\'t applied yet" if you want to avoid rejection.',
  },
  {
    title: 'Select Your Rejection Reasons',
    text: 'Check all the reasons the lender gave (or your best guess). Credit score, time in business, revenue, cash flow, and more.',
  },
  {
    title: 'Get Your Personalized Plan',
    text: 'See an improvement roadmap for each issue, alternative financing matched to your profile, and a timeline to requalification.',
  },
]

const whatYouGet = [
  {
    title: 'Rejection Analysis',
    text: 'A clear explanation of what each rejection reason means and how lenders evaluate it.',
  },
  {
    title: 'Improvement Roadmap',
    text: 'Step-by-step action plan for each issue with specific tasks, expected timelines, and improvement targets.',
  },
  {
    title: 'Alternative Financing Match',
    text: 'A list of financing types matched to your current profile, showing which you likely qualify for right now.',
  },
  {
    title: 'Requalification Timeline',
    text: 'See when different financing types become available as you improve your credit, revenue, and business history.',
  },
  {
    title: 'Lender Requirement Benchmarks',
    text: 'Know exactly what SBA, bank, online, and alternative lenders require so you can target the right ones.',
  },
  {
    title: 'Actionable Next Steps',
    text: 'Concrete tasks you can start today, organized by week and month, with checkboxes to track progress.',
  },
]

export default function LoanRejectionDecoderPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(
            breadcrumbSchema([
              { name: 'Home', url: '/' },
              { name: 'Tools', url: '/tools' },
              { name: 'Loan Rejection Decoder', url: '/tools/loan-rejection-decoder' },
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
              Understanding Business Loan Rejections
            </h2>
            <p className="text-gray-700 leading-relaxed mb-4">
              Getting denied for a business loan is frustrating, but it is not the end. Most rejections come down to a handful of fixable issues: credit score below the lender&apos;s minimum, not enough time in business, revenue that does not meet their threshold, or a debt service coverage ratio that is too tight. The problem is that many lenders do not explain their reasoning clearly. You get a form letter saying your application was denied, and you are left guessing what went wrong. This tool takes the guesswork out by analyzing common rejection reasons and matching them to your profile.
            </p>

            <h3 className="text-xl font-bold text-quicklend-900 mb-3 mt-6">The Most Common Rejection Reasons</h3>
            <p className="text-gray-700 leading-relaxed mb-4">
              Credit score is the most frequent barrier. SBA loans typically require 650 to 680+, banks want 680+, and even online lenders usually need 550 to 600+. The good news: credit scores can improve 30 to 50 points in 3 to 6 months by paying down credit card balances, disputing errors, and maintaining on-time payments. Time in business is the second most common issue. Banks and SBA lenders prefer 2+ years of operating history. If your business is newer, online lenders with 6-month minimums or microloans may be better starting points. Use our <Link href="/tools/dscr-calculator" className="text-theme-primary-light font-medium hover:underline">DSCR calculator</Link> to check if cash flow is the issue.
            </p>

            <h3 className="text-xl font-bold text-quicklend-900 mb-3 mt-6">Finding the Right Lender for Your Profile</h3>
            <p className="text-gray-700 leading-relaxed mb-4">
              A rejection from one lender does not mean every lender will decline. SBA loans, bank <Link href="/business-loans/term-loans" className="text-theme-primary-light font-medium hover:underline">term loans</Link>, online lenders, <Link href="/business-loans/equipment-financing" className="text-theme-primary-light font-medium hover:underline">equipment financing</Link>, <Link href="/business-loans/lines-of-credit" className="text-theme-primary-light font-medium hover:underline">lines of credit</Link>, invoice factoring, and revenue-based financing all have different qualification criteria. A business owner denied by a bank for credit score might qualify easily with an online lender. Someone denied for lack of collateral might be approved for equipment financing where the equipment itself is the collateral. This tool matches your current profile to financing types that fit, so you can focus your applications where approval is most likely.
            </p>

            <h3 className="text-xl font-bold text-quicklend-900 mb-3 mt-6">Turning a Rejection Into Approval</h3>
            <p className="text-gray-700 leading-relaxed">
              The strongest applications come from business owners who understand what lenders look for and prepare accordingly. Before reapplying, gather complete documentation: 2 years of tax returns, 6 months of bank statements, a profit and loss statement, and a clear explanation of how you will use the funds. Address the specific reason you were rejected. If it was credit score, spend 3 to 6 months improving it. If it was cash flow, work on increasing revenue or reducing expenses before trying again. Use our <Link href="/tools/loan-finder-quiz" className="text-theme-primary-light font-medium hover:underline">loan finder quiz</Link> to see which products match your improved profile, or <Link href="/get-started" className="text-theme-primary-light font-medium hover:underline">talk to a funding specialist</Link> who can guide you to lenders most likely to approve, with no impact to your credit score.
            </p>
          </div>
        }
      >
        <LoanRejectionDecoderTool />
      </ToolPageLayout>
    </>
  )
}
