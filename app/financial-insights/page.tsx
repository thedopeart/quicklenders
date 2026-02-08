import Link from 'next/link'
import { getAllArticles } from '@/lib/content'
import { generatePageMetadata } from '@/lib/metadata'
import { breadcrumbSchema } from '@/lib/schema'
import { loanProductData } from '@/lib/loan-data'
import { MdTrendingUp, MdAccountBalance, MdLightbulb, MdSchool, MdAutoGraph, MdSavings } from 'react-icons/md'

export const metadata = generatePageMetadata({
  title: 'Financial Insights | Business Financing Guides & Tips',
  description: 'Expert articles on business loans, funding strategies, credit improvement, and financial planning. Free guides to help your growing business secure capital.',
  path: '/financial-insights',
})

const glossaryItems = Object.values(loanProductData).map(p => ({
  name: p.name,
  href: `/business-loans/${p.slug}`,
}))

const topics = [
  {
    icon: MdAccountBalance,
    title: 'Business Loans',
    description: 'Understanding different loan types, requirements, and how to qualify.',
    articleSlugs: ['first-time-business-loans', 'large-business-loans', 'long-term-business-loans', 'short-term-business-financing']
  },
  {
    icon: MdTrendingUp,
    title: 'Startup Funding',
    description: 'Financing options for new businesses and early-stage ventures.',
    articleSlugs: ['how-to-get-a-startup-business-loan-with-bad-credit', 'pre-seed-funding', 'how-to-get-vc-financing', 'bootstrapping-finance']
  },
  {
    icon: MdAutoGraph,
    title: 'Credit & Qualification',
    description: 'Improving your credit and understanding lender requirements.',
    articleSlugs: ['how-to-improve-credit-fast', 'online-loans-for-poor-credit-score', 'first-time-personal-loans-with-no-credit-history']
  },
  {
    icon: MdSavings,
    title: 'Alternative Financing',
    description: 'Invoice financing, factoring, and non-traditional funding sources.',
    articleSlugs: ['invoice-financing', 'invoice-factoring-loans', 'venture-capital-funding-from-investors']
  },
  {
    icon: MdLightbulb,
    title: 'Loan Comparison',
    description: 'Comparing loan options to find the best fit for your needs.',
    articleSlugs: ['secured-vs-unsecured-loans-which-is-better', 'no-collateral-business-loan', 'direct-lender-loans-online']
  },
  {
    icon: MdSchool,
    title: 'Equipment & Assets',
    description: 'Financing equipment, machinery, and business assets.',
    articleSlugs: ['small-business-equipment-financing', 'cash-loans-direct']
  },
]

export default function FinancialInsightsPage() {
  const articles = getAllArticles()
  const breadcrumbs = breadcrumbSchema([
    { name: 'Home', url: '/' },
    { name: 'Financial Insights', url: '/financial-insights' },
  ])

  return (
    <main className="flex flex-grow flex-col w-full">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbs) }}
      />

      {/* Hero */}
      <section className="bg-gradient-to-r from-quicklend-800 to-quicklend-900 text-white pt-24 md:pt-28 pb-20 lg:pb-28">
        <div className="container mx-auto px-4">
          <nav aria-label="Breadcrumb" className="mb-4 text-sm text-white/60">
            <ol className="flex items-center gap-2">
              <li><Link href="/" className="hover:text-white/80">Home</Link></li>
              <li>/</li>
              <li className="text-white">Financial Insights</li>
            </ol>
          </nav>
          <div className="max-w-3xl">
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold leading-tight mb-6">
              Business Financing Resources &amp; Guides
            </h1>
            <p className="text-lg text-white/80 leading-relaxed mb-6">
              Expert insights on business loans, startup funding, credit improvement, and financial strategies. Whether you&apos;re a first-time borrower or an experienced business owner, our guides help you make informed financing decisions.
            </p>
            <div className="flex flex-wrap gap-4">
              <Link href="/business-loans" className="bg-amber-500 text-quicklend-900 font-semibold px-6 py-3 rounded-lg hover:bg-amber-400 transition-colors">
                Explore Loan Products
              </Link>
              <Link href="/get-started" className="border-2 border-white/30 text-white font-semibold px-6 py-3 rounded-lg hover:bg-white/10 transition-colors">
                Get Pre-Qualified
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Key Topics */}
      <section className="py-16 lg:py-20">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto text-center mb-12">
            <h2 className="text-3xl font-bold text-quicklend-900 mb-6">Browse by Topic</h2>
            <p className="text-gray-600 leading-relaxed">
              Find articles and guides organized by the topics that matter most to your business financing needs.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {topics.map((topic) => (
              <div key={topic.title} className="bg-white rounded-xl p-6 border border-gray-100 shadow-sm hover:shadow-md transition-shadow">
                <topic.icon className="text-3xl text-quicklend-600 mb-4" />
                <h3 className="font-bold text-quicklend-900 text-lg mb-2">{topic.title}</h3>
                <p className="text-gray-600 text-sm mb-4">{topic.description}</p>
                <div className="space-y-2">
                  {topic.articleSlugs.slice(0, 3).map((slug) => {
                    const article = articles.find(a => a.slug === slug)
                    return article ? (
                      <Link
                        key={slug}
                        href={`/financial-insights/${slug}`}
                        className="block text-sm text-quicklend-600 hover:underline"
                      >
                        → {article.title}
                      </Link>
                    ) : null
                  })}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Articles */}
      <section className="py-16 lg:py-20 bg-gray-50">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-quicklend-900 mb-10">Featured Articles</h2>
          {articles.length === 0 ? (
            <p className="text-gray-500">Articles coming soon. Check back for in-depth guides on business financing.</p>
          ) : (
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {articles.map((article) => (
                <Link
                  key={article.slug}
                  href={`/financial-insights/${article.slug}`}
                  className="group bg-white rounded-xl border border-gray-100 overflow-hidden shadow-sm hover:shadow-lg transition-all"
                >
                  <div className="h-48 bg-gradient-to-br from-quicklend-700 to-quicklend-900" />
                  <div className="p-6">
                    <h3 className="font-bold text-quicklend-900 text-lg mb-2 group-hover:text-quicklend-600 transition-colors">
                      {article.title}
                    </h3>
                    <p className="text-gray-600 text-sm mb-3 leading-relaxed">{article.description}</p>
                    <div className="flex items-center justify-between">
                      <time className="text-xs text-gray-400">
                        {new Date(article.date).toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}
                      </time>
                      <span className="text-quicklend-600 text-sm font-medium">Get Info →</span>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          )}
        </div>
      </section>

      {/* Glossary / Loan Types */}
      <section className="py-16 lg:py-20">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto text-center mb-10">
            <h2 className="text-3xl font-bold text-quicklend-900 mb-6">Loan Products Glossary</h2>
            <p className="text-gray-600 leading-relaxed">
              Quick reference to all our business financing products. Click any product to learn about rates, terms, requirements, and how to apply.
            </p>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4 mb-10">
            {glossaryItems.map((item) => (
              <Link
                key={item.name}
                href={item.href}
                className="flex items-center justify-between bg-white border border-gray-100 rounded-xl px-6 py-4 shadow-sm hover:shadow-md hover:border-quicklend-600/30 transition-all"
              >
                <span className="font-medium text-quicklend-900">{item.name}</span>
                <span className="text-quicklend-600">→</span>
              </Link>
            ))}
          </div>

          <div className="text-center">
            <Link href="/business-loans" className="text-quicklend-600 font-semibold hover:underline">
              Compare all loan products →
            </Link>
          </div>
        </div>
      </section>

      {/* Quick Tips Section */}
      <section className="py-16 lg:py-20 bg-white">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-3xl font-bold text-quicklend-900 mb-10 text-center">Quick Financing Tips</h2>

            <div className="grid md:grid-cols-2 gap-6">
              <div className="bg-quicklend-50 rounded-xl p-6">
                <h3 className="font-bold text-quicklend-900 mb-3">Before You Apply</h3>
                <ul className="space-y-2 text-sm text-gray-600">
                  <li className="flex items-start gap-2">
                    <span className="text-quicklend-600">✓</span>
                    Review your business credit score and personal credit
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-quicklend-600">✓</span>
                    Gather 3+ months of bank statements and tax returns
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-quicklend-600">✓</span>
                    Calculate how much you actually need to borrow
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-quicklend-600">✓</span>
                    Understand your monthly cash flow for repayment
                  </li>
                </ul>
              </div>

              <div className="bg-quicklend-50 rounded-xl p-6">
                <h3 className="font-bold text-quicklend-900 mb-3">Improve Your Odds</h3>
                <ul className="space-y-2 text-sm text-gray-600">
                  <li className="flex items-start gap-2">
                    <span className="text-quicklend-600">✓</span>
                    <Link href="/financial-insights/how-to-improve-credit-fast" className="hover:text-quicklend-600 hover:underline">Build or improve your credit score before applying</Link>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-quicklend-600">✓</span>
                    Have collateral ready for better rates and terms
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-quicklend-600">✓</span>
                    Prepare a clear business plan showing use of funds
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-quicklend-600">✓</span>
                    Demonstrate consistent revenue over 6+ months
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-16 lg:py-20 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="bg-gradient-to-r from-quicklend-800 to-quicklend-900 rounded-2xl p-10 lg:p-16 text-center text-white">
            <h2 className="text-3xl lg:text-4xl font-bold mb-4">
              Ready to Get Started?
            </h2>
            <p className="text-quicklend-200 mb-8 text-lg max-w-xl mx-auto">
              Apply in minutes and get a decision within 24 hours. Our team is here to help you find the right financing for your business.
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              <Link
                href="/get-started"
                className="inline-block rounded-lg bg-amber-500 text-quicklend-900 font-semibold px-10 py-4 hover:bg-amber-400 transition-colors"
              >
                Apply Now
              </Link>
              <Link
                href="/about-us"
                className="inline-block rounded-lg border-2 border-white/30 text-white font-semibold px-10 py-4 hover:bg-white/10 transition-colors"
              >
                Learn About Us
              </Link>
            </div>
          </div>
        </div>
      </section>
    </main>
  )
}
