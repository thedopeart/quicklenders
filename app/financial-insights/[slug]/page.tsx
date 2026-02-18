import { notFound } from 'next/navigation'
import Link from 'next/link'
import { MDXRemote } from 'next-mdx-remote/rsc'
import { getAllArticles, getArticle } from '@/lib/content'
import { generatePageMetadata } from '@/lib/metadata'
import { breadcrumbSchema, articleSchema, faqSchema } from '@/lib/schema'
import { getArticleData, hasStructuredArticle } from '@/lib/article-data'
import { getArticleFaqs } from '@/lib/faq-data'
import ArticlePageLayout from '@/components/ArticlePageLayout'
import FAQSection from '@/components/FAQSection'
import { defaultAuthor } from '@/lib/authors'
import { MdPhone, MdAccessTime, MdTrendingUp, MdCheckCircle, MdArrowForward, MdBookmark } from 'react-icons/md'

export function generateStaticParams() {
  const articles = getAllArticles()
  return articles.map((article) => ({ slug: article.slug }))
}

export function generateMetadata({ params }: { params: { slug: string } }) {
  // Try structured article first
  const structuredArticle = getArticleData(params.slug)
  if (structuredArticle) {
    return generatePageMetadata({
      title: structuredArticle.title,
      description: structuredArticle.description,
      path: `/financial-insights/${params.slug}`,
      type: 'article',
    })
  }

  // Fall back to MDX article
  const article = getArticle(params.slug)
  if (!article) return {}

  return generatePageMetadata({
    title: article.meta.title,
    description: article.meta.description,
    path: `/financial-insights/${params.slug}`,
    type: 'article',
  })
}

// Map articles to related topics for better interlinking
const relatedArticlesByTopic: Record<string, string[]> = {
  'first-time-business-loans': ['how-to-improve-credit-fast', 'no-collateral-business-loan', 'short-term-business-financing'],
  'how-to-improve-credit-fast': ['first-time-business-loans', 'online-loans-for-poor-credit-score', 'secured-vs-unsecured-loans-which-is-better'],
  'short-term-business-financing': ['first-time-business-loans', 'invoice-financing', 'cash-loans-direct'],
  'small-business-equipment-financing': ['first-time-business-loans', 'secured-vs-unsecured-loans-which-is-better', 'long-term-business-loans'],
  'pre-seed-funding': ['how-to-get-vc-financing', 'venture-capital-funding-from-investors', 'bootstrapping-finance'],
  'how-to-get-vc-financing': ['pre-seed-funding', 'venture-capital-funding-from-investors', 'large-business-loans'],
  'venture-capital-funding-from-investors': ['pre-seed-funding', 'how-to-get-vc-financing', 'bootstrapping-finance'],
  'bootstrapping-finance': ['pre-seed-funding', 'first-time-business-loans', 'short-term-business-financing'],
  'invoice-financing': ['invoice-factoring-loans', 'short-term-business-financing', 'cash-loans-direct'],
  'invoice-factoring-loans': ['invoice-financing', 'short-term-business-financing', 'no-collateral-business-loan'],
  'large-business-loans': ['long-term-business-loans', 'secured-vs-unsecured-loans-which-is-better', 'small-business-equipment-financing'],
  'long-term-business-loans': ['large-business-loans', 'first-time-business-loans', 'secured-vs-unsecured-loans-which-is-better'],
  'no-collateral-business-loan': ['secured-vs-unsecured-loans-which-is-better', 'first-time-business-loans', 'online-loans-for-poor-credit-score'],
  'online-loans-for-poor-credit-score': ['how-to-improve-credit-fast', 'no-collateral-business-loan', 'direct-lender-loans-online'],
  'secured-vs-unsecured-loans-which-is-better': ['no-collateral-business-loan', 'small-business-equipment-financing', 'first-time-business-loans'],
  'cash-loans-direct': ['direct-lender-loans-online', 'short-term-business-financing', 'invoice-financing'],
  'direct-lender-loans-online': ['cash-loans-direct', 'online-loans-for-poor-credit-score', 'first-time-business-loans'],
  'first-time-personal-loans-with-no-credit-history': ['how-to-improve-credit-fast', 'first-time-business-loans', 'online-loans-for-poor-credit-score'],
  'how-to-get-a-startup-business-loan-with-bad-credit': ['how-to-improve-credit-fast', 'online-loans-for-poor-credit-score', 'pre-seed-funding'],
  'true-cost-of-merchant-cash-advance': ['what-is-a-factor-rate', 'how-to-spot-predatory-business-loan', 'how-much-business-loan-can-you-afford'],
  'documents-needed-for-business-loan': ['is-your-business-ready-for-a-loan', 'first-time-business-loans', 'business-loan-denied-what-to-do-next'],
  'how-much-business-loan-can-you-afford': ['is-your-business-ready-for-a-loan', 'first-time-business-loans', 'long-term-business-loans'],
  'how-to-spot-predatory-business-loan': ['true-cost-of-merchant-cash-advance', 'what-is-a-factor-rate', 'online-loans-for-poor-credit-score'],
  'business-loan-denied-what-to-do-next': ['how-to-improve-credit-fast', 'is-your-business-ready-for-a-loan', 'documents-needed-for-business-loan'],
  'what-is-a-factor-rate': ['true-cost-of-merchant-cash-advance', 'how-to-spot-predatory-business-loan', 'how-much-business-loan-can-you-afford'],
  'is-your-business-ready-for-a-loan': ['documents-needed-for-business-loan', 'how-much-business-loan-can-you-afford', 'first-time-business-loans'],
  'prepayment-penalties-business-loans': ['how-to-spot-predatory-business-loan', 'how-much-business-loan-can-you-afford', 'long-term-business-loans'],
  'what-is-dscr-debt-service-coverage-ratio': ['how-much-business-loan-can-you-afford', 'is-your-business-ready-for-a-loan', 'how-to-compare-business-loan-offers'],
  'how-to-compare-business-loan-offers': ['how-to-spot-predatory-business-loan', 'what-is-a-factor-rate', 'prepayment-penalties-business-loans'],
  'how-much-working-capital-do-you-need': ['short-term-business-financing', 'invoice-financing', 'how-much-business-loan-can-you-afford'],
  'equipment-financing-vs-leasing': ['small-business-equipment-financing', 'long-term-business-loans', 'how-much-business-loan-can-you-afford'],
  'business-loan-interest-rates-by-type': ['how-to-compare-business-loan-offers', 'sba-loans-7a-vs-504-how-to-qualify', 'true-cost-of-merchant-cash-advance'],
  'sba-loans-7a-vs-504-how-to-qualify': ['business-loan-interest-rates-by-type', 'documents-needed-for-business-loan', 'is-your-business-ready-for-a-loan'],
  'should-you-refinance-your-business-loan': ['prepayment-penalties-business-loans', 'how-to-compare-business-loan-offers', 'business-loan-interest-rates-by-type'],
  'work-life-balance-tips-for-business-owners': ['is-your-business-ready-for-a-loan', 'how-much-business-loan-can-you-afford', 'documents-needed-for-business-loan'],
}

// Key takeaways for each article
const keyTakeaways: Record<string, string[]> = {
  'first-time-business-loans': [
    'Personal credit score matters most for first-time borrowers',
    'SBA loans offer best rates but require more documentation',
    'Equipment financing is often easier to qualify for',
    'Compare at least 3 offers before committing',
  ],
  'how-to-improve-credit-fast': [
    'Check credit reports for errors before applying',
    'Pay down credit utilization below 30%',
    'Avoid opening new accounts before loan applications',
    'Consider authorized user status for quick boosts',
  ],
  'short-term-business-financing': [
    'Short-term loans typically have higher APRs',
    'Best for seasonal businesses or bridging cash gaps',
    'Approval is often faster than traditional loans',
    'Watch out for daily or weekly payment schedules',
  ],
  'small-business-equipment-financing': [
    'Equipment acts as collateral, improving approval odds',
    'Up to 100% financing is often available',
    'Section 179 may provide tax benefits',
    'Lease vs. buy decision depends on equipment lifespan',
  ],
  'pre-seed-funding': [
    'Pre-seed typically ranges from $50K to $500K',
    'Focus on building MVP and initial traction',
    'Angel investors and friends/family are common sources',
    'Equity dilution is a key consideration',
  ],
  'invoice-financing': [
    'Advance rates typically 80-90% of invoice value',
    'Customer creditworthiness matters more than yours',
    'Factoring vs. financing: different collection responsibilities',
    'Great for B2B companies with long payment cycles',
  ],
  'secured-vs-unsecured-loans-which-is-better': [
    'Secured loans offer lower rates but require collateral',
    'Unsecured loans are faster but more expensive',
    'Match loan type to your risk tolerance and assets',
    'Consider what assets you can pledge as collateral',
  ],
  'online-loans-for-poor-credit-score': [
    'Many online lenders work with scores as low as 500',
    'Expect higher interest rates with lower credit scores',
    'Focus on improving credit while borrowing',
    'Watch for predatory lending practices',
  ],
  'how-to-get-vc-financing': [
    'VCs invest for 10x+ returns in 5-10 years',
    'Warm introductions dramatically improve your odds',
    'Be prepared for extensive due diligence',
    'Understand standard term sheet provisions',
  ],
  'long-term-business-loans': [
    'Terms typically range from 3-25 years',
    'Lower monthly payments than short-term options',
    'Best for major investments like real estate or equipment',
    'SBA loans offer the most favorable long-term rates',
  ],
  'no-collateral-business-loan': [
    'Unsecured loans are available but cost more',
    'Strong revenue and credit improve your options',
    'Personal guarantees are still common',
    'Consider building assets to unlock better terms',
  ],
  'true-cost-of-merchant-cash-advance': [
    'A 1.3 factor rate can equal 60% to 150% APR',
    'MCAs charge the same total regardless of early payoff',
    'Daily holdbacks create constant cash flow pressure',
    'Always convert factor rates to APR before comparing',
  ],
  'documents-needed-for-business-loan': [
    'Tax returns and bank statements are required by most lenders',
    'Online lenders need far fewer documents than banks',
    'Keep financial records current and organized year-round',
    'Missing documents are a top reason for application delays',
  ],
  'how-much-business-loan-can-you-afford': [
    'DSCR of 1.25 or higher is what most lenders require',
    'Total loan payments should stay below 25% of gross revenue',
    'Lower interest rates dramatically increase borrowing power',
    'Borrow for a specific purpose with measurable ROI',
  ],
  'how-to-spot-predatory-business-loan': [
    'Confession of judgment clauses are a major red flag',
    'Factor rates often hide the true annual cost',
    'Legitimate lenders give you time to review terms',
    'Always calculate total repayment before signing',
  ],
  'business-loan-denied-what-to-do-next': [
    'Most denial reasons can be fixed in 30 to 90 days',
    'Different lenders evaluate different criteria',
    'Disputing credit errors is the fastest improvement',
    'Apply strategically to 2 or 3 targeted lenders',
  ],
  'what-is-a-factor-rate': [
    'Factor rates fix total cost regardless of payoff speed',
    'A 1.3 factor rate is not the same as 30% APR',
    'Faster repayment means a higher effective annual rate',
    'Always convert to APR before comparing to traditional loans',
  ],
  'is-your-business-ready-for-a-loan': [
    'Credit score, time in business, and cash flow matter most',
    '680+ credit opens SBA and bank loan options',
    'Organized documents signal credibility to lenders',
    'Spending 60 to 90 days improving weak areas pays off',
  ],
  'prepayment-penalties-business-loans': [
    'Not all business loans have prepayment penalties',
    'Remaining interest guarantees eliminate early payoff savings',
    'SBA 7(a) penalties only apply to 15+ year loans in first 3 years',
    'Ask about penalties before signing, not after',
  ],
  'what-is-dscr-debt-service-coverage-ratio': [
    'DSCR = Net Operating Income / Total Debt Payments',
    'Most lenders require a DSCR of 1.25 or higher',
    'Below 1.0 means your business cannot cover current debt',
    'Improving DSCR: raise revenue, cut expenses, or reduce existing debt',
  ],
  'how-to-compare-business-loan-offers': [
    'Total cost of borrowing is the most important comparison metric',
    'Monthly payment alone does not tell the full story',
    'Always compare effective APR, not stated rate',
    'Get at least 3 offers before committing',
  ],
  'how-much-working-capital-do-you-need': [
    'Working capital = current assets minus current liabilities',
    'Aim for 3 to 6 months of operating expenses as a buffer',
    'A line of credit is the most efficient working capital product',
    'Shorter cash conversion cycles reduce working capital needs',
  ],
  'equipment-financing-vs-leasing': [
    'Financing builds equity; leasing preserves cash flow',
    'Section 179 can save 25-37% on purchased equipment',
    'Lease technology that becomes obsolete in 3 to 5 years',
    'Finance equipment you will use for 5+ years',
  ],
  'business-loan-interest-rates-by-type': [
    'SBA loans offer the lowest rates (5-11% APR)',
    'Online lenders trade higher rates for faster funding',
    'Credit score is the biggest factor in your rate',
    'A lower rate does not always mean lower total cost',
  ],
  'sba-loans-7a-vs-504-how-to-qualify': [
    'SBA 7(a) is the most flexible program for any business purpose',
    'SBA 504 offers the lowest fixed rates for real estate and equipment',
    'Most SBA lenders require 680+ credit and 2+ years in business',
    'SBA loans take 4 to 13 weeks from application to funding',
  ],
  'should-you-refinance-your-business-loan': [
    'Refinancing works best when your credit or market rates have improved',
    'Prepayment penalties can erase refinancing savings',
    'Compare total cost of new loan plus penalties vs remaining cost of current loan',
    'Do not extend the term without a specific reason',
  ],
  'work-life-balance-tips-for-business-owners': [
    'Burnout leads to financial mistakes, bad hires, and poor decisions',
    'A 3 to 6 month cash reserve reduces stress more than any productivity hack',
    'Automate recurring financial tasks to reclaim personal time',
    'Strategic financing can reduce workload pressure, not just add to it',
  ],
}

// Related tools for each article
const relatedToolsByArticle: Record<string, { slug: string; name: string }[]> = {
  'first-time-business-loans': [
    { slug: 'loan-finder-quiz', name: 'Loan Finder Quiz' },
    { slug: 'loan-affordability-calculator', name: 'Loan Affordability Calculator' },
    { slug: 'funding-readiness-assessment', name: 'Funding Readiness Assessment' },
  ],
  'how-to-improve-credit-fast': [
    { slug: 'loan-rejection-decoder', name: 'Loan Rejection Decoder' },
    { slug: 'funding-readiness-assessment', name: 'Funding Readiness Assessment' },
  ],
  'short-term-business-financing': [
    { slug: 'working-capital-calculator', name: 'Working Capital Calculator' },
    { slug: 'loan-payment-calculator', name: 'Loan Payment Calculator' },
    { slug: 'cash-flow-forecast-tool', name: 'Cash Flow Forecast Tool' },
  ],
  'small-business-equipment-financing': [
    { slug: 'equipment-financing-calculator', name: 'Equipment Financing Calculator' },
    { slug: 'loan-payment-calculator', name: 'Loan Payment Calculator' },
    { slug: 'roi-calculator', name: 'ROI Calculator' },
  ],
  'pre-seed-funding': [
    { slug: 'startup-cost-calculator', name: 'Startup Cost Calculator' },
    { slug: 'break-even-calculator', name: 'Break-Even Calculator' },
    { slug: 'business-valuation-calculator', name: 'Business Valuation Calculator' },
  ],
  'how-to-get-vc-financing': [
    { slug: 'business-valuation-calculator', name: 'Business Valuation Calculator' },
    { slug: 'roi-calculator', name: 'ROI Calculator' },
  ],
  'venture-capital-funding-from-investors': [
    { slug: 'business-valuation-calculator', name: 'Business Valuation Calculator' },
    { slug: 'startup-cost-calculator', name: 'Startup Cost Calculator' },
  ],
  'bootstrapping-finance': [
    { slug: 'cash-flow-forecast-tool', name: 'Cash Flow Forecast Tool' },
    { slug: 'break-even-calculator', name: 'Break-Even Calculator' },
    { slug: 'startup-cost-calculator', name: 'Startup Cost Calculator' },
  ],
  'invoice-financing': [
    { slug: 'invoice-factoring-calculator', name: 'Invoice Factoring Calculator' },
    { slug: 'cash-flow-forecast-tool', name: 'Cash Flow Forecast Tool' },
    { slug: 'working-capital-calculator', name: 'Working Capital Calculator' },
  ],
  'invoice-factoring-loans': [
    { slug: 'invoice-factoring-calculator', name: 'Invoice Factoring Calculator' },
    { slug: 'factor-rate-to-apr-calculator', name: 'Factor Rate to APR Converter' },
  ],
  'large-business-loans': [
    { slug: 'loan-affordability-calculator', name: 'Loan Affordability Calculator' },
    { slug: 'dscr-calculator', name: 'DSCR Calculator' },
    { slug: 'loan-payment-calculator', name: 'Loan Payment Calculator' },
  ],
  'long-term-business-loans': [
    { slug: 'loan-payment-calculator', name: 'Loan Payment Calculator' },
    { slug: 'total-cost-of-capital-calculator', name: 'Total Cost of Capital Calculator' },
    { slug: 'prepayment-penalty-calculator', name: 'Prepayment Penalty Calculator' },
  ],
  'no-collateral-business-loan': [
    { slug: 'loan-finder-quiz', name: 'Loan Finder Quiz' },
    { slug: 'funding-readiness-assessment', name: 'Funding Readiness Assessment' },
  ],
  'online-loans-for-poor-credit-score': [
    { slug: 'loan-finder-quiz', name: 'Loan Finder Quiz' },
    { slug: 'loan-rejection-decoder', name: 'Loan Rejection Decoder' },
    { slug: 'interest-rate-comparison-chart', name: 'Interest Rate Comparison Chart' },
  ],
  'secured-vs-unsecured-loans-which-is-better': [
    { slug: 'business-loan-comparison-tool', name: 'Loan Comparison Tool' },
    { slug: 'loan-finder-quiz', name: 'Loan Finder Quiz' },
    { slug: 'interest-rate-comparison-chart', name: 'Interest Rate Comparison Chart' },
  ],
  'cash-loans-direct': [
    { slug: 'loan-finder-quiz', name: 'Loan Finder Quiz' },
    { slug: 'loan-payment-calculator', name: 'Loan Payment Calculator' },
  ],
  'direct-lender-loans-online': [
    { slug: 'loan-finder-quiz', name: 'Loan Finder Quiz' },
    { slug: 'loan-offer-analyzer', name: 'Loan Offer Analyzer' },
  ],
  'first-time-personal-loans-with-no-credit-history': [
    { slug: 'loan-finder-quiz', name: 'Loan Finder Quiz' },
    { slug: 'loan-rejection-decoder', name: 'Loan Rejection Decoder' },
  ],
  'how-to-get-a-startup-business-loan-with-bad-credit': [
    { slug: 'loan-rejection-decoder', name: 'Loan Rejection Decoder' },
    { slug: 'funding-readiness-assessment', name: 'Funding Readiness Assessment' },
    { slug: 'startup-cost-calculator', name: 'Startup Cost Calculator' },
  ],
  'true-cost-of-merchant-cash-advance': [
    { slug: 'mca-payback-calculator', name: 'MCA Payback Calculator' },
    { slug: 'factor-rate-to-apr-calculator', name: 'Factor Rate to APR Converter' },
    { slug: 'total-cost-of-capital-calculator', name: 'Total Cost of Capital Calculator' },
  ],
  'documents-needed-for-business-loan': [
    { slug: 'loan-document-checklist', name: 'Loan Document Checklist' },
    { slug: 'funding-readiness-assessment', name: 'Funding Readiness Assessment' },
  ],
  'how-much-business-loan-can-you-afford': [
    { slug: 'loan-affordability-calculator', name: 'Loan Affordability Calculator' },
    { slug: 'dscr-calculator', name: 'DSCR Calculator' },
    { slug: 'loan-payment-calculator', name: 'Loan Payment Calculator' },
  ],
  'how-to-spot-predatory-business-loan': [
    { slug: 'factor-rate-to-apr-calculator', name: 'Factor Rate to APR Converter' },
    { slug: 'loan-offer-analyzer', name: 'Loan Offer Analyzer' },
    { slug: 'total-cost-of-capital-calculator', name: 'Total Cost of Capital Calculator' },
  ],
  'business-loan-denied-what-to-do-next': [
    { slug: 'loan-rejection-decoder', name: 'Loan Rejection Decoder' },
    { slug: 'loan-finder-quiz', name: 'Loan Finder Quiz' },
    { slug: 'funding-readiness-assessment', name: 'Funding Readiness Assessment' },
  ],
  'what-is-a-factor-rate': [
    { slug: 'factor-rate-to-apr-calculator', name: 'Factor Rate to APR Converter' },
    { slug: 'mca-payback-calculator', name: 'MCA Payback Calculator' },
    { slug: 'loan-offer-analyzer', name: 'Loan Offer Analyzer' },
  ],
  'is-your-business-ready-for-a-loan': [
    { slug: 'funding-readiness-assessment', name: 'Funding Readiness Assessment' },
    { slug: 'loan-document-checklist', name: 'Loan Document Checklist' },
    { slug: 'dscr-calculator', name: 'DSCR Calculator' },
  ],
  'prepayment-penalties-business-loans': [
    { slug: 'prepayment-penalty-calculator', name: 'Prepayment Penalty Calculator' },
    { slug: 'refinance-savings-calculator', name: 'Refinance Savings Calculator' },
    { slug: 'loan-payment-calculator', name: 'Loan Payment Calculator' },
  ],
  'what-is-dscr-debt-service-coverage-ratio': [
    { slug: 'dscr-calculator', name: 'DSCR Calculator' },
    { slug: 'loan-affordability-calculator', name: 'Loan Affordability Calculator' },
    { slug: 'cash-flow-forecast-tool', name: 'Cash Flow Forecast Tool' },
  ],
  'how-to-compare-business-loan-offers': [
    { slug: 'business-loan-comparison-tool', name: 'Loan Comparison Tool' },
    { slug: 'loan-offer-analyzer', name: 'Loan Offer Analyzer' },
    { slug: 'total-cost-of-capital-calculator', name: 'Total Cost of Capital Calculator' },
  ],
  'how-much-working-capital-do-you-need': [
    { slug: 'working-capital-calculator', name: 'Working Capital Calculator' },
    { slug: 'cash-flow-forecast-tool', name: 'Cash Flow Forecast Tool' },
    { slug: 'line-of-credit-interest-calculator', name: 'Line of Credit Interest Calculator' },
  ],
  'equipment-financing-vs-leasing': [
    { slug: 'equipment-financing-calculator', name: 'Equipment Financing Calculator' },
    { slug: 'roi-calculator', name: 'ROI Calculator' },
    { slug: 'loan-payment-calculator', name: 'Loan Payment Calculator' },
  ],
  'business-loan-interest-rates-by-type': [
    { slug: 'interest-rate-comparison-chart', name: 'Interest Rate Comparison Chart' },
    { slug: 'loan-payment-calculator', name: 'Loan Payment Calculator' },
    { slug: 'business-loan-comparison-tool', name: 'Loan Comparison Tool' },
  ],
  'sba-loans-7a-vs-504-how-to-qualify': [
    { slug: 'sba-loan-payment-calculator', name: 'SBA Loan Payment Calculator' },
    { slug: 'loan-document-checklist', name: 'Loan Document Checklist' },
    { slug: 'dscr-calculator', name: 'DSCR Calculator' },
  ],
  'should-you-refinance-your-business-loan': [
    { slug: 'refinance-savings-calculator', name: 'Refinance Savings Calculator' },
    { slug: 'prepayment-penalty-calculator', name: 'Prepayment Penalty Calculator' },
    { slug: 'business-loan-comparison-tool', name: 'Loan Comparison Tool' },
  ],
  'work-life-balance-tips-for-business-owners': [
    { slug: 'cash-flow-forecast-tool', name: 'Cash Flow Forecast Tool' },
    { slug: 'loan-affordability-calculator', name: 'Loan Affordability Calculator' },
    { slug: 'dscr-calculator', name: 'DSCR Calculator' },
  ],
}

// Reading time estimate
function estimateReadingTime(content: string): number {
  const wordsPerMinute = 200
  const wordCount = content.split(/\s+/).length
  return Math.ceil(wordCount / wordsPerMinute)
}

export default function ArticlePage({ params }: { params: { slug: string } }) {
  // Check if this article has structured data
  if (hasStructuredArticle(params.slug)) {
    const structuredArticle = getArticleData(params.slug)!
    const allArticles = getAllArticles()

    // Get related article titles
    const relatedArticleTitles = structuredArticle.relatedArticles
      .map(slug => {
        const article = allArticles.find(a => a.slug === slug)
        return article ? { slug, title: article.title } : null
      })
      .filter((a): a is { slug: string; title: string } => a !== null)

    const breadcrumbs = breadcrumbSchema([
      { name: 'Home', url: '/' },
      { name: 'Financial Insights', url: '/financial-insights' },
      { name: structuredArticle.title, url: `/financial-insights/${params.slug}` },
    ])

    const articleStructuredData = articleSchema({
      title: structuredArticle.title,
      description: structuredArticle.description,
      datePublished: structuredArticle.date,
      url: `/financial-insights/${params.slug}`,
    })

    const faqData = structuredArticle.faqs.length > 0
      ? faqSchema(structuredArticle.faqs.map(f => ({ question: f.question, answer: f.schemaAnswer })))
      : null

    return (
      <>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbs) }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(articleStructuredData) }}
        />
        {faqData && (
          <script
            type="application/ld+json"
            dangerouslySetInnerHTML={{ __html: JSON.stringify(faqData) }}
          />
        )}
        <ArticlePageLayout article={structuredArticle} relatedArticleTitles={relatedArticleTitles} relatedTools={relatedToolsByArticle[params.slug] || []} />
      </>
    )
  }

  // Fall back to MDX-based article
  const article = getArticle(params.slug)
  if (!article) notFound()

  const allArticles = getAllArticles()
  const readingTime = estimateReadingTime(article.content)
  const articleFaqs = getArticleFaqs(params.slug)

  // Get related articles
  const relatedSlugs = relatedArticlesByTopic[params.slug] || []
  const relatedArticles = relatedSlugs
    .map(slug => allArticles.find(a => a.slug === slug))
    .filter(Boolean)
    .slice(0, 3)

  // If no specific mapping, get random related articles
  const fallbackRelated = relatedArticles.length === 0
    ? allArticles.filter(a => a.slug !== params.slug).slice(0, 3)
    : relatedArticles

  const takeaways = keyTakeaways[params.slug] || []

  const breadcrumbs = breadcrumbSchema([
    { name: 'Home', url: '/' },
    { name: 'Financial Insights', url: '/financial-insights' },
    { name: article.meta.title, url: `/financial-insights/${params.slug}` },
  ])

  const articleStructuredData = articleSchema({
    title: article.meta.title,
    description: article.meta.description,
    datePublished: article.meta.date,
    url: `/financial-insights/${params.slug}`,
  })

  return (
    <main className="flex flex-grow flex-col w-full">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbs) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(articleStructuredData) }}
      />
      {articleFaqs && (
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema(articleFaqs.map(f => ({ question: f.question, answer: f.schemaAnswer })))) }}
        />
      )}

      {/* Hero Section */}
      <section className="bg-gradient-to-br from-quicklend-800 to-quicklend-900 text-white pt-24 md:pt-28 pb-16">
        <div className="container mx-auto px-4">
          <nav aria-label="Breadcrumb" className="mb-6">
            <ol className="flex items-center gap-2 text-sm text-white/60">
              <li><Link href="/" className="hover:text-white/80">Home</Link></li>
              <li>/</li>
              <li><Link href="/financial-insights" className="hover:text-white/80">Financial Insights</Link></li>
              <li>/</li>
              <li className="text-white/90 truncate max-w-[200px]">{article.meta.title}</li>
            </ol>
          </nav>

          <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold leading-tight mb-6 max-w-4xl">
            {article.meta.title}
          </h1>

          <p className="text-lg text-white/80 leading-relaxed mb-6 max-w-3xl">
            {article.meta.description}
          </p>

          <div className="flex flex-wrap items-center gap-6 text-sm text-white/70">
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 rounded-full bg-white/20 flex items-center justify-center text-white font-bold text-xs">
                QL
              </div>
              <div>
                <span className="text-white/90 font-medium">{defaultAuthor.name}</span>
                <span className="mx-1">|</span>
                <span>{defaultAuthor.role}</span>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <MdAccessTime className="text-lg" />
              <span>{readingTime} min read</span>
            </div>
            <time className="flex items-center gap-2">
              <MdBookmark className="text-lg" />
              {new Date(article.meta.date).toLocaleDateString('en-US', {
                year: 'numeric',
                month: 'long',
                day: 'numeric',
              })}
            </time>
          </div>
        </div>
      </section>

      {/* Main Content Grid */}
      <section className="py-12 lg:py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="max-w-7xl mx-auto">
            <div className="grid lg:grid-cols-12 gap-8 lg:gap-12">
              {/* Article Content */}
              <div className="lg:col-span-8">
                {/* Key Takeaways */}
                {takeaways.length > 0 && (
                  <div className="bg-quicklend-50 border-l-4 border-quicklend-600 rounded-r-xl p-6 mb-10">
                    <h2 className="flex items-center gap-2 text-lg font-bold text-quicklend-900 mb-4">
                      <MdTrendingUp className="text-quicklend-600 text-xl" />
                      Key Takeaways
                    </h2>
                    <ul className="space-y-3">
                      {takeaways.map((takeaway, index) => (
                        <li key={index} className="flex items-start gap-3">
                          <MdCheckCircle className="text-quicklend-600 flex-shrink-0 mt-0.5 text-lg" />
                          <span className="text-gray-700">{takeaway}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                )}

                {/* Article Body */}
                <article className="article-content">
                  <MDXRemote source={article.content} />
                </article>

                {/* CTA Banner */}
                <div className="mt-12 bg-gradient-to-r from-quicklend-800 to-quicklend-900 rounded-2xl p-8 text-white">
                  <h2 className="text-2xl font-bold mb-3">
                    Ready to Explore Your Financing Options?
                  </h2>
                  <p className="text-quicklend-200 mb-6 max-w-xl">
                    Get pre-qualified in minutes with no impact to your credit score. Our lending specialists will match you with the best options for your business.
                  </p>
                  <div className="flex flex-wrap gap-4">
                    <Link
                      href={`/get-started?source=article&ref=${params.slug}`}
                      className="inline-flex items-center gap-2 bg-amber-500 text-quicklend-900 font-semibold px-6 py-3 rounded-lg hover:bg-amber-400 transition-colors"
                    >
                      Get Pre-Qualified
                      <MdArrowForward />
                    </Link>
                    <a
                      href="tel:3039218529"
                      className="inline-flex items-center gap-2 border-2 border-white/30 text-white font-semibold px-6 py-3 rounded-lg hover:bg-white/10 transition-colors"
                    >
                      <MdPhone />
                      Call (303) 921-8529
                    </a>
                  </div>
                </div>
              </div>

              {/* Sidebar */}
              <aside className="lg:col-span-4">
                <div className="sticky top-28 space-y-6">
                  {/* Quick Contact */}
                  <div className="bg-quicklend-50 rounded-xl p-6">
                    <h3 className="font-bold text-quicklend-900 mb-4">Need Help?</h3>
                    <p className="text-gray-600 text-sm mb-4">
                      Speak with a lending specialist who can answer your questions.
                    </p>
                    <a
                      href="tel:3039218529"
                      className="flex items-center justify-center gap-2 bg-quicklend-600 text-white font-semibold py-3 rounded-lg hover:bg-quicklend-700 transition-colors w-full"
                    >
                      <MdPhone />
                      (303) 921-8529
                    </a>
                    <p className="text-center text-xs text-gray-500 mt-3">
                      Mon-Fri, 9AM-5PM MST
                    </p>
                  </div>

                  {/* Related Articles */}
                  <div className="bg-white border border-gray-200 rounded-xl p-6">
                    <h3 className="font-bold text-quicklend-900 mb-4">Related Articles</h3>
                    <div className="space-y-4">
                      {fallbackRelated.map((related) => (
                        <Link
                          key={related!.slug}
                          href={`/financial-insights/${related!.slug}`}
                          className="block group"
                        >
                          <h4 className="font-medium text-gray-900 group-hover:text-quicklend-600 transition-colors text-sm leading-snug mb-1">
                            {related!.title}
                          </h4>
                          <p className="text-xs text-gray-500 line-clamp-2">
                            {related!.description}
                          </p>
                        </Link>
                      ))}
                    </div>
                    <Link
                      href="/financial-insights"
                      className="inline-flex items-center gap-1 text-quicklend-600 text-sm font-medium mt-4 hover:underline"
                    >
                      View All Articles
                      <MdArrowForward className="text-sm" />
                    </Link>
                  </div>

                  {/* Related Tools */}
                  {(relatedToolsByArticle[params.slug] || []).length > 0 && (
                    <div className="bg-white border border-gray-200 rounded-xl p-6">
                      <h3 className="font-bold text-quicklend-900 mb-4">Related Tools</h3>
                      <div className="space-y-3">
                        {(relatedToolsByArticle[params.slug] || []).map((tool) => (
                          <Link
                            key={tool.slug}
                            href={`/tools/${tool.slug}`}
                            className="block group"
                          >
                            <h4 className="font-medium text-gray-900 group-hover:text-quicklend-600 transition-colors text-sm leading-snug flex items-center gap-2">
                              <MdArrowForward className="text-quicklend-600 flex-shrink-0" />
                              {tool.name}
                            </h4>
                          </Link>
                        ))}
                      </div>
                      <Link
                        href="/tools"
                        className="inline-flex items-center gap-1 text-quicklend-600 text-sm font-medium mt-4 hover:underline"
                      >
                        View All Tools
                        <MdArrowForward className="text-sm" />
                      </Link>
                    </div>
                  )}

                  {/* Quick Links */}
                  <div className="bg-white border border-gray-200 rounded-xl p-6">
                    <h3 className="font-bold text-quicklend-900 mb-4">Explore Solutions</h3>
                    <ul className="space-y-3">
                      <li>
                        <Link href="/business-loans/term-loans" className="text-sm text-gray-600 hover:text-quicklend-600 flex items-center gap-2">
                          <MdArrowForward className="text-quicklend-600" />
                          Business Term Loans
                        </Link>
                      </li>
                      <li>
                        <Link href="/business-loans/lines-of-credit" className="text-sm text-gray-600 hover:text-quicklend-600 flex items-center gap-2">
                          <MdArrowForward className="text-quicklend-600" />
                          Lines of Credit
                        </Link>
                      </li>
                      <li>
                        <Link href="/business-loans/equipment-financing" className="text-sm text-gray-600 hover:text-quicklend-600 flex items-center gap-2">
                          <MdArrowForward className="text-quicklend-600" />
                          Equipment Financing
                        </Link>
                      </li>
                      <li>
                        <Link href="/business-loans/asset-backed-loans" className="text-sm text-gray-600 hover:text-quicklend-600 flex items-center gap-2">
                          <MdArrowForward className="text-quicklend-600" />
                          Asset-Based Lending
                        </Link>
                      </li>
                    </ul>
                  </div>
                </div>
              </aside>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      {articleFaqs && articleFaqs.length > 0 && (
        <FAQSection faqs={articleFaqs} />
      )}

      {/* More Articles Section */}
      <section className="py-12 lg:py-16 bg-quicklend-50">
        <div className="container mx-auto px-4">
          <div className="max-w-7xl mx-auto">
            <div className="flex items-center justify-between mb-8">
              <h2 className="text-2xl font-bold text-quicklend-900">More Financial Insights</h2>
              <Link
                href="/financial-insights"
                className="text-quicklend-600 font-medium hover:underline hidden sm:inline-flex items-center gap-1"
              >
                View All
                <MdArrowForward />
              </Link>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {allArticles
                .filter(a => a.slug !== params.slug)
                .slice(0, 6)
                .map((item) => (
                  <Link
                    key={item.slug}
                    href={`/financial-insights/${item.slug}`}
                    className="bg-white rounded-xl p-6 border border-gray-200 hover:shadow-lg transition-shadow group"
                  >
                    <h3 className="font-bold text-quicklend-900 group-hover:text-quicklend-600 transition-colors mb-2 line-clamp-2">
                      {item.title}
                    </h3>
                    <p className="text-gray-600 text-sm mb-4 line-clamp-2">
                      {item.description}
                    </p>
                    <span className="text-quicklend-600 text-sm font-medium inline-flex items-center gap-1">
                      Read Article
                      <MdArrowForward />
                    </span>
                  </Link>
                ))}
            </div>

            <div className="text-center mt-8 sm:hidden">
              <Link
                href="/financial-insights"
                className="inline-flex items-center gap-2 text-quicklend-600 font-medium"
              >
                View All Articles
                <MdArrowForward />
              </Link>
            </div>
          </div>
        </div>
      </section>
    </main>
  )
}
