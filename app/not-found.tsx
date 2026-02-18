import Link from 'next/link'

export default function NotFound() {
  return (
    <main className="flex flex-grow flex-wrap w-full justify-center">
      <section className="overflow-hidden bg-gradient-to-r from-theme-gradient-1-from to-theme-gradient-1-to w-full pt-24 md:pt-28 pb-16 lg:pb-24">
        <div className="container">
          <div className="max-w-3xl mx-auto text-center">
            <p className="text-amber-400 text-6xl font-bold mb-4">404</p>
            <h1 className="text-white text-3xl md:text-4xl font-bold leading-tight mb-4">
              Page Not Found
            </h1>
            <p className="text-white/80 text-lg mb-8">
              The page you are looking for may have been moved, removed, or
              does not exist. Use the links below to find what you need.
            </p>
            <Link
              href="/get-started"
              className="inline-flex items-center gap-2 bg-amber-500 text-quicklend-900 font-semibold px-8 py-4 rounded-lg hover:bg-amber-400 transition-colors"
            >
              Get Pre-Qualified
            </Link>
          </div>
        </div>
      </section>

      <section className="w-full py-16 lg:py-20">
        <div className="container">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-2xl font-bold text-quicklend-900 mb-8 text-center">
              Explore Quick Lenders
            </h2>
            <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
              <Link
                href="/"
                className="bg-white border border-gray-200 rounded-xl p-6 hover:shadow-lg hover:border-quicklend-600/30 transition-all group text-center"
              >
                <p className="text-3xl mb-3">🏠</p>
                <h3 className="font-bold text-quicklend-900 group-hover:text-quicklend-600 transition-colors mb-1">
                  Home
                </h3>
                <p className="text-gray-500 text-sm">Back to the homepage</p>
              </Link>
              <Link
                href="/business-loans"
                className="bg-white border border-gray-200 rounded-xl p-6 hover:shadow-lg hover:border-quicklend-600/30 transition-all group text-center"
              >
                <p className="text-3xl mb-3">💼</p>
                <h3 className="font-bold text-quicklend-900 group-hover:text-quicklend-600 transition-colors mb-1">
                  Business Loans
                </h3>
                <p className="text-gray-500 text-sm">Browse loan products</p>
              </Link>
              <Link
                href="/tools"
                className="bg-white border border-gray-200 rounded-xl p-6 hover:shadow-lg hover:border-quicklend-600/30 transition-all group text-center"
              >
                <p className="text-3xl mb-3">🧮</p>
                <h3 className="font-bold text-quicklend-900 group-hover:text-quicklend-600 transition-colors mb-1">
                  Calculators & Tools
                </h3>
                <p className="text-gray-500 text-sm">26 free tools</p>
              </Link>
              <Link
                href="/financial-insights"
                className="bg-white border border-gray-200 rounded-xl p-6 hover:shadow-lg hover:border-quicklend-600/30 transition-all group text-center"
              >
                <p className="text-3xl mb-3">📚</p>
                <h3 className="font-bold text-quicklend-900 group-hover:text-quicklend-600 transition-colors mb-1">
                  Financial Insights
                </h3>
                <p className="text-gray-500 text-sm">Guides and articles</p>
              </Link>
            </div>

            <div className="mt-12 text-center">
              <p className="text-gray-600 mb-2">Need help finding something?</p>
              <a
                href="tel:3039218529"
                className="text-quicklend-600 font-semibold hover:underline"
              >
                Call (303) 921-8529
              </a>
              <span className="text-gray-400 mx-2">|</span>
              <span className="text-gray-500 text-sm">Mon-Fri, 9AM-5PM MST</span>
            </div>
          </div>
        </div>
      </section>
    </main>
  )
}
