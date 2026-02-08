import { notFound } from 'next/navigation'
import Link from 'next/link'
import { MDXRemote } from 'next-mdx-remote/rsc'
import { getAllArticles, getArticle } from '@/lib/content'
import { generatePageMetadata } from '@/lib/metadata'
import { breadcrumbSchema, articleSchema, faqSchema } from '@/lib/schema'
import { getArticleData, hasStructuredArticle } from '@/lib/article-data'
import ArticlePageLayout from '@/components/ArticlePageLayout'
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
      ? faqSchema(structuredArticle.faqs.map(f => ({ question: f.question, answer: typeof f.answer === 'string' ? f.answer : 'See article for full answer.' })))
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
        <ArticlePageLayout article={structuredArticle} relatedArticleTitles={relatedArticleTitles} />
      </>
    )
  }

  // Fall back to MDX-based article
  const article = getArticle(params.slug)
  if (!article) notFound()

  const allArticles = getAllArticles()
  const readingTime = estimateReadingTime(article.content)

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
