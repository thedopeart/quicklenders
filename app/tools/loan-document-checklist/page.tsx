import Link from 'next/link'
import { generatePageMetadata } from '@/lib/metadata'
import { breadcrumbSchema, faqSchema, softwareApplicationSchema } from '@/lib/schema'
import { getToolBySlug } from '@/lib/tools-data'
import ToolPageLayout from '@/components/ToolPageLayout'
import LoanDocumentChecklistTool from './LoanDocumentChecklistTool'

const tool = getToolBySlug('loan-document-checklist')!

export const metadata = generatePageMetadata({
  title: tool.seo.title,
  description: tool.seo.description,
  path: `/tools/${tool.slug}`,
})

const howItWorks = [
  {
    title: 'Select Your Loan Type',
    text: 'Choose the type of financing you are applying for. The checklist adjusts based on what lenders require for that product.',
  },
  {
    title: 'Check Off Documents',
    text: 'Work through the list and check off items as you gather them. Required items are flagged so you know what to prioritize.',
  },
  {
    title: 'Track Your Progress',
    text: 'The progress bar shows how prepared you are. Once everything is checked off, you are ready to submit your application.',
  },
]

const whatYouGet = [
  {
    title: 'Loan-Specific Checklist',
    text: 'Documents filtered by loan type. SBA loans need the most, MCAs need the least.',
  },
  {
    title: 'Required vs Recommended',
    text: 'Each item is labeled as required or recommended so you can prioritize what matters most.',
  },
  {
    title: 'Progress Tracking',
    text: 'Check items off as you go and see your completion percentage update in real time.',
  },
  {
    title: 'Organized by Category',
    text: 'Documents grouped into financial statements, bank records, business documents, personal items, and more.',
  },
  {
    title: 'Document Descriptions',
    text: 'Each item includes a short explanation of what it is and why lenders need it.',
  },
  {
    title: 'Preparation Tips',
    text: 'Practical advice on how to gather and format documents for the fastest approval.',
  },
]

export default function LoanDocumentChecklistPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(
            breadcrumbSchema([
              { name: 'Home', url: '/' },
              { name: 'Tools', url: '/tools' },
              { name: 'Loan Document Checklist', url: '/tools/loan-document-checklist' },
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
              Why Document Preparation Matters
            </h2>
            <p className="text-gray-700 leading-relaxed mb-4">
              The most common reason business loan applications stall is missing or incomplete documentation. Lenders review your financial history to assess risk. The faster you provide what they need, the faster you get a decision. Having everything organized before you start the application also helps you understand your own financial picture, which makes conversations with lenders more productive.
            </p>

            <h3 className="text-xl font-bold text-quicklend-900 mb-3 mt-6">What Every Lender Needs</h3>
            <p className="text-gray-700 leading-relaxed mb-4">
              Regardless of loan type, almost every lender will ask for <strong>business bank statements</strong> (at least 3 months), a <strong>government-issued ID</strong>, and <strong>proof of business registration</strong>. Most also need tax returns and a profit and loss statement. The baseline is relatively standard. Beyond that, requirements vary. <Link href="/business-loans/term-loans" className="text-theme-primary-light font-medium hover:underline">Term loans</Link> and <Link href="/business-loans/lines-of-credit" className="text-theme-primary-light font-medium hover:underline">lines of credit</Link> from banks typically need the most documentation, while online lenders and MCAs need the least.
            </p>

            <h3 className="text-xl font-bold text-quicklend-900 mb-3 mt-6">SBA Loans: The Most Thorough Process</h3>
            <p className="text-gray-700 leading-relaxed mb-4">
              SBA loans offer the lowest rates for qualified borrowers, but the application process is the most detailed. Expect to provide personal and business tax returns, financial statements, a business plan (for newer businesses), personal financial statements for all owners, and collateral documentation. The process takes <strong>2 to 8 weeks</strong> from application to funding. Use our <Link href="/tools/sba-loan-payment-calculator" className="text-theme-primary-light font-medium hover:underline">SBA loan calculator</Link> to see estimated payments before you start.
            </p>

            <h3 className="text-xl font-bold text-quicklend-900 mb-3 mt-6">Organizing for Speed</h3>
            <p className="text-gray-700 leading-relaxed">
              Create a dedicated folder (digital or physical) for your loan application. Name files clearly: "2024_Business_Tax_Return.pdf" is better than "scan_001.pdf." Download bank statements directly from your bank portal as PDFs. If your financials are managed by an accountant or bookkeeper, ask them to prepare a current P&L and balance sheet. When everything is in one place, you can respond to lender requests within hours instead of days. <Link href="/get-started" className="text-theme-primary-light font-medium hover:underline">Talk to a funding specialist</Link> who can walk you through exactly what you will need, with no impact to your credit score.
            </p>
          </div>
        }
      >
        <LoanDocumentChecklistTool />
      </ToolPageLayout>
    </>
  )
}
