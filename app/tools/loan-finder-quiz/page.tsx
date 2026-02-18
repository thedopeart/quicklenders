import Link from 'next/link'
import { generatePageMetadata } from '@/lib/metadata'
import { breadcrumbSchema, faqSchema, softwareApplicationSchema } from '@/lib/schema'
import { getToolBySlug } from '@/lib/tools-data'
import ToolPageLayout from '@/components/ToolPageLayout'
import LoanFinderQuiz from './LoanFinderQuiz'

const tool = getToolBySlug('loan-finder-quiz')!

export const metadata = generatePageMetadata({
  title: tool.seo.title,
  description: tool.seo.description,
  path: `/tools/${tool.slug}`,
})

const howItWorks = [
  {
    title: 'Answer 5 Questions',
    text: 'Tell us what you need funding for, how quickly you need it, and a few details about your business. Takes about 60 seconds.',
  },
  {
    title: 'Get Your Match',
    text: 'Our scoring algorithm evaluates your answers against seven loan products and recommends the best fit, plus an alternative.',
  },
  {
    title: 'Take the Next Step',
    text: 'Review your recommendation with rates, terms, and funding details. Then estimate payments or connect with a specialist.',
  },
]

const whatYouGet = [
  {
    title: 'Personalized Recommendation',
    text: 'A primary loan product matched to your stated needs, timeline, funding amount, business stage, and credit profile.',
  },
  {
    title: 'Alternative Option',
    text: 'A runner-up recommendation in case your primary match has requirements you cannot meet or you want to compare.',
  },
  {
    title: 'Rates, Terms & Amounts',
    text: 'Typical rate ranges, term lengths, funding amounts, and funding speed for your recommended product.',
  },
  {
    title: 'Why It Fits',
    text: 'A plain-language explanation of why the recommended product matches the specific details you provided.',
  },
  {
    title: 'Clear Next Steps',
    text: 'Direct links to learn more about the product, estimate your payments, or start the process with a funding specialist.',
  },
  {
    title: 'No Credit Pull',
    text: 'The quiz never asks for personal information or pulls your credit. Your score stays untouched.',
  },
]

export default function LoanFinderQuizPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(
            breadcrumbSchema([
              { name: 'Home', url: '/' },
              { name: 'Tools', url: '/tools' },
              { name: 'Loan Finder Quiz', url: '/tools/loan-finder-quiz' },
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
              Finding the Right Business Loan for Your Situation
            </h2>
            <p className="text-gray-700 leading-relaxed mb-4">
              Business financing is not one-size-fits-all. A restaurant owner buying a commercial oven has different needs than a construction company bidding on a government contract or a 20-year business planning ownership transition. The loan product that works for one scenario could be a poor fit for another, costing you money in higher rates or leaving funding on the table.
            </p>
            <p className="text-gray-700 leading-relaxed mb-4">
              The <strong>seven major categories</strong> of business financing each serve distinct purposes. <Link href="/business-loans/term-loans" className="text-theme-primary-light font-medium hover:underline">Term loans</Link> provide a lump sum with fixed payments, ideal for one-time investments. <Link href="/business-loans/lines-of-credit" className="text-theme-primary-light font-medium hover:underline">Lines of credit</Link> offer revolving access to capital for ongoing expenses like payroll or inventory. <Link href="/business-loans/equipment-financing" className="text-theme-primary-light font-medium hover:underline">Equipment financing</Link> uses the purchased asset as collateral, typically resulting in lower rates and longer terms.
            </p>
            <p className="text-gray-700 leading-relaxed mb-4">
              For larger or more complex needs, <Link href="/business-loans/asset-backed-loans" className="text-theme-primary-light font-medium hover:underline">asset-based lending</Link> unlocks capital against your existing business assets. <Link href="/business-loans/esop" className="text-theme-primary-light font-medium hover:underline">ESOP financing</Link> funds employee ownership transitions with significant tax benefits. <Link href="/business-loans/investment-banking" className="text-theme-primary-light font-medium hover:underline">Investment banking</Link> handles acquisitions and major capital raises. And <Link href="/business-loans/bonds" className="text-theme-primary-light font-medium hover:underline">bonds</Link> provide surety and performance guarantees for contractors and real estate projects.
            </p>
            <p className="text-gray-700 leading-relaxed">
              This quiz maps your specific situation, including your funding purpose, timeline, amount needed, business maturity, and credit profile, to the product most likely to fit. After getting your result, you can estimate payments with our <Link href="/tools/loan-payment-calculator" className="text-theme-primary-light font-medium hover:underline">loan payment calculator</Link> or analyze the investment with our <Link href="/tools/break-even-calculator" className="text-theme-primary-light font-medium hover:underline">break-even calculator</Link> before speaking with a funding specialist.
            </p>
          </div>
        }
      >
        <LoanFinderQuiz />
      </ToolPageLayout>
      <div className="bg-gray-50 border-t border-gray-100 py-4">
        <div className="container mx-auto px-4">
          <p className="text-center text-xs text-gray-400">
            Tool built by <a href="https://digitaljesse.com" target="_blank" rel="noopener noreferrer" className="text-gray-500 hover:text-gray-600 underline decoration-gray-300">Digital Jesse</a>
          </p>
        </div>
      </div>
    </>
  )
}
