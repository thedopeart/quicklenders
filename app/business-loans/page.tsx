import Link from 'next/link'
import { generatePageMetadata } from '@/lib/metadata'
import { breadcrumbSchema } from '@/lib/schema'
import { loanProductData } from '@/lib/loan-data'
import { MdCheckCircle, MdSpeed, MdAccountBalance, MdTrendingUp } from 'react-icons/md'

export const metadata = generatePageMetadata({
  title: 'Business Loans & Financing Solutions | $50K to $100M',
  description:
    'Explore business loans from Quick Lenders: term loans, lines of credit, equipment financing, asset-based lending, and more. Fast approvals, competitive rates.',
  path: '/business-loans',
})

const loanCategories = [
  {
    title: 'Working Capital',
    description: 'Short-term financing to cover operational expenses, payroll, and day-to-day costs.',
    products: ['term-loans', 'line-of-credit'],
  },
  {
    title: 'Growth & Expansion',
    description: 'Capital for hiring, new locations, acquisitions, and scaling operations.',
    products: ['term-loans', 'asset-based-lending', 'investment-banking'],
  },
  {
    title: 'Equipment & Assets',
    description: 'Finance machinery, vehicles, technology, and other business assets.',
    products: ['equipment-financing', 'asset-based-lending'],
  },
  {
    title: 'Specialized Financing',
    description: 'ESOP funding, bonds, and investment banking for complex capital needs.',
    products: ['esop-financing', 'bonds', 'investment-banking'],
  },
]

const comparisonFeatures = [
  { feature: 'Loan Amount', description: 'How much you can borrow' },
  { feature: 'Funding Speed', description: 'Time from approval to funds' },
  { feature: 'Term Length', description: 'Repayment period' },
  { feature: 'Collateral', description: 'Security requirements' },
]

export default function BusinessLoansPage() {
  const breadcrumbs = breadcrumbSchema([
    { name: 'Home', url: '/' },
    { name: 'Business Loans', url: '/business-loans' },
  ])

  const products = Object.values(loanProductData)

  return (
    <main className="flex flex-grow flex-col w-full">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbs) }}
      />

      {/* Hero */}
      <section className="bg-gradient-to-r from-theme-gradient-1-from to-theme-gradient-1-to text-white pt-24 md:pt-28 pb-20 lg:pb-28">
        <div className="container">
          <nav aria-label="Breadcrumb" className="mb-4 text-sm text-white/60">
            <ol className="flex items-center gap-2">
              <li><Link href="/" className="hover:text-white/80">Home</Link></li>
              <li>/</li>
              <li className="text-white">Business Loans</li>
            </ol>
          </nav>
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold leading-tight mb-6">
                Business Loans &amp; Financing Solutions
              </h1>
              <p className="text-lg text-white/80 leading-relaxed mb-6">
                From $50,000 to $100 million, Quick Lenders offers a comprehensive range of business financing products. Whether you need working capital, equipment financing, or growth capital, we connect you with the right solution.
              </p>
              <div className="flex flex-wrap gap-4">
                <Link href="/get-started" className="bg-white text-theme-primary font-semibold px-6 py-3 rounded-full hover:bg-white/90 transition-colors">
                  Get Pre-Qualified
                </Link>
                <Link href="/contact" className="border-2 border-white text-white font-semibold px-6 py-3 rounded-full hover:bg-white/10 transition-colors">
                  Speak to an Expert
                </Link>
              </div>
            </div>
            <div className="hidden lg:grid grid-cols-2 gap-4">
              <div className="bg-white/10 backdrop-blur-sm rounded-xl p-6">
                <MdSpeed className="text-3xl mb-2" />
                <p className="font-bold text-xl">24hr</p>
                <p className="text-white/70 text-sm">Average Approval</p>
              </div>
              <div className="bg-white/10 backdrop-blur-sm rounded-xl p-6">
                <MdAccountBalance className="text-3xl mb-2" />
                <p className="font-bold text-xl">$50K-$100M</p>
                <p className="text-white/70 text-sm">Loan Amounts</p>
              </div>
              <div className="bg-white/10 backdrop-blur-sm rounded-xl p-6">
                <MdTrendingUp className="text-3xl mb-2" />
                <p className="font-bold text-xl">1,000+</p>
                <p className="text-white/70 text-sm">Businesses Funded</p>
              </div>
              <div className="bg-white/10 backdrop-blur-sm rounded-xl p-6">
                <MdCheckCircle className="text-3xl mb-2" />
                <p className="font-bold text-xl">No Impact</p>
                <p className="text-white/70 text-sm">To Credit Score</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Loan Categories */}
      <section className="py-16 lg:py-20 bg-gray-50">
        <div className="container">
          <div className="max-w-3xl mx-auto text-center mb-12">
            <h2 className="text-3xl font-bold text-theme-primary-dark mb-6">Find the Right Financing for Your Needs</h2>
            <p className="text-gray-600 leading-relaxed">
              Not sure which loan type fits your business? Browse by category to find products that match your specific financing goals.
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-6">
            {loanCategories.map((category) => (
              <div key={category.title} className="bg-white rounded-xl p-8 border border-gray-100 shadow-sm">
                <h3 className="text-xl font-bold text-theme-primary-dark mb-3">{category.title}</h3>
                <p className="text-gray-600 text-sm mb-4">{category.description}</p>
                <div className="flex flex-wrap gap-2">
                  {category.products.map((productSlug) => {
                    const product = loanProductData[productSlug]
                    return product ? (
                      <Link
                        key={productSlug}
                        href={`/business-loans/${productSlug}`}
                        className="text-sm bg-theme-primary-light/10 text-theme-primary-dark px-3 py-1 rounded-full hover:bg-theme-primary-light/20 transition-colors"
                      >
                        {product.name}
                      </Link>
                    ) : null
                  })}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Product Grid */}
      <section className="py-16 lg:py-20">
        <div className="container">
          <div className="max-w-3xl mx-auto text-center mb-12">
            <h2 className="text-3xl font-bold text-theme-primary-dark mb-6">All Financing Products</h2>
            <p className="text-gray-600 leading-relaxed">
              Explore our complete lineup of business financing solutions. Click any product to learn about rates, terms, requirements, and how to apply.
            </p>
          </div>

          <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
            {products.map((product) => (
              <Link
                key={product.slug}
                href={`/business-loans/${product.slug}`}
                className="group bg-white rounded-xl border border-gray-100 p-8 shadow-sm hover:shadow-lg transition-all"
              >
                <h3 className="text-xl font-bold text-theme-primary-dark mb-3 group-hover:text-theme-primary-light transition-colors">
                  {product.name}
                </h3>
                <p className="text-theme-primary-light font-semibold text-sm mb-2">{product.features[0]?.value}</p>
                <p className="text-gray-600 text-sm leading-relaxed mb-4">
                  {product.description.substring(0, 150)}...
                </p>
                <div className="flex flex-wrap gap-2 mb-4">
                  {product.features.slice(1, 3).map((feature) => (
                    <span key={feature.label} className="text-xs bg-gray-100 text-gray-600 px-2 py-1 rounded">
                      {feature.label}: {feature.value}
                    </span>
                  ))}
                </div>
                <span className="text-theme-primary-light text-sm font-medium">
                  Learn More →
                </span>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* How to Choose Section */}
      <section className="py-16 lg:py-20 bg-gray-50">
        <div className="container">
          <div className="max-w-3xl mx-auto">
            <h2 className="text-3xl font-bold text-theme-primary-dark mb-6 text-center">How to Choose the Right Business Loan</h2>
            <p className="text-gray-600 leading-relaxed text-center mb-10">
              Selecting the right financing depends on your specific needs, timeline, and business situation. Consider these factors when comparing options.
            </p>

            <div className="space-y-6">
              <div className="bg-white rounded-xl p-6 border border-gray-100">
                <h3 className="font-bold text-theme-primary-dark mb-2">1. Purpose of Funds</h3>
                <p className="text-gray-600 text-sm">
                  What do you need the capital for? <Link href="/business-loans/equipment-financing" className="text-theme-primary-light hover:underline">Equipment financing</Link> works best for asset purchases, while <Link href="/business-loans/line-of-credit" className="text-theme-primary-light hover:underline">lines of credit</Link> are ideal for ongoing working capital needs.
                </p>
              </div>

              <div className="bg-white rounded-xl p-6 border border-gray-100">
                <h3 className="font-bold text-theme-primary-dark mb-2">2. Timing Requirements</h3>
                <p className="text-gray-600 text-sm">
                  How quickly do you need funds? <Link href="/business-loans/term-loans" className="text-theme-primary-light hover:underline">Term loans</Link> can fund same-day, while <Link href="/business-loans/asset-based-lending" className="text-theme-primary-light hover:underline">asset-based lending</Link> typically takes 1-4 weeks due to collateral evaluation.
                </p>
              </div>

              <div className="bg-white rounded-xl p-6 border border-gray-100">
                <h3 className="font-bold text-theme-primary-dark mb-2">3. Available Collateral</h3>
                <p className="text-gray-600 text-sm">
                  Do you have assets to secure the loan? Asset-based and equipment financing offer better rates with collateral. <Link href="/financial-insights/no-collateral-business-loan" className="text-theme-primary-light hover:underline">Learn about unsecured options</Link> if you prefer not to pledge assets.
                </p>
              </div>

              <div className="bg-white rounded-xl p-6 border border-gray-100">
                <h3 className="font-bold text-theme-primary-dark mb-2">4. Repayment Capacity</h3>
                <p className="text-gray-600 text-sm">
                  Review your cash flow to determine comfortable payment amounts. Longer terms mean lower payments but more interest over time. Our team can help you find the right balance.
                </p>
              </div>
            </div>

            <div className="mt-10 text-center">
              <Link href="/financial-insights" className="text-theme-primary-light font-semibold hover:underline">
                Read more financing guides →
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-16 lg:py-20">
        <div className="container">
          <div className="bg-gradient-to-r from-theme-gradient-1-from to-theme-gradient-1-to rounded-2xl p-10 lg:p-16 text-center text-white">
            <h2 className="text-3xl lg:text-4xl font-bold mb-4">Not Sure Which Loan Is Right for You?</h2>
            <p className="text-white/70 mb-8 text-lg max-w-xl mx-auto">
              Our lending specialists can help you navigate your options and find the best financing solution for your specific business needs. Get pre-qualified in minutes with no impact to your credit.
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              <Link
                href="/get-started"
                className="inline-block rounded-full bg-white text-theme-primary font-semibold px-10 py-4 hover:bg-white/90 transition-colors"
              >
                Get Pre-Qualified
              </Link>
              <Link
                href="/contact"
                className="inline-block rounded-full border-2 border-white text-white font-semibold px-10 py-4 hover:bg-white/10 transition-colors"
              >
                Talk to an Expert
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Related Resources */}
      <section className="py-16 lg:py-20 bg-gray-50">
        <div className="container">
          <div className="max-w-3xl mx-auto text-center mb-10">
            <h2 className="text-2xl font-bold text-theme-primary-dark mb-4">Related Resources</h2>
            <p className="text-gray-600">
              Learn more about business financing with our educational guides and articles.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-6 max-w-4xl mx-auto">
            <Link href="/financial-insights/first-time-business-loans" className="bg-white rounded-xl p-6 border border-gray-100 hover:shadow-md transition-shadow">
              <h3 className="font-bold text-theme-primary-dark mb-2">First-Time Business Loans</h3>
              <p className="text-gray-600 text-sm">Everything you need to know about getting your first business loan.</p>
            </Link>

            <Link href="/financial-insights/secured-vs-unsecured-loans-which-is-better" className="bg-white rounded-xl p-6 border border-gray-100 hover:shadow-md transition-shadow">
              <h3 className="font-bold text-theme-primary-dark mb-2">Secured vs. Unsecured Loans</h3>
              <p className="text-gray-600 text-sm">Understanding the key differences and which option suits your needs.</p>
            </Link>

            <Link href="/financial-insights/short-term-business-financing" className="bg-white rounded-xl p-6 border border-gray-100 hover:shadow-md transition-shadow">
              <h3 className="font-bold text-theme-primary-dark mb-2">Short-Term Financing</h3>
              <p className="text-gray-600 text-sm">When and how to use short-term loans for your business.</p>
            </Link>
          </div>

          <div className="text-center mt-8">
            <Link href="/financial-insights" className="text-theme-primary-light font-semibold hover:underline">
              Explore all articles →
            </Link>
          </div>
        </div>
      </section>
    </main>
  )
}
