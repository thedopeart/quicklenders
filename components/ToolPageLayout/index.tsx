import Link from 'next/link'
import { ReactNode } from 'react'
import { ToolData, getToolBySlug } from '@/lib/tools-data'
import FAQSection from '@/components/FAQSection'
import { ArrowRight, CheckCircle, Sparkles, UserX, Zap } from 'lucide-react'

interface ToolPageLayoutProps {
  tool: ToolData
  children: ReactNode
  seoContent: ReactNode
  howItWorks: { title: string; text: string }[]
  whatYouGet: { title: string; text: string }[]
}

export default function ToolPageLayout({
  tool,
  children,
  seoContent,
  howItWorks,
  whatYouGet,
}: ToolPageLayoutProps) {
  const relatedTools = tool.relatedTools
    .map((slug) => getToolBySlug(slug))
    .filter((t): t is ToolData => t !== undefined)

  return (
    <main className="flex flex-grow flex-col w-full">
      {/* Hero */}
      <section className="bg-gradient-to-r from-theme-gradient-1-from to-theme-gradient-1-to text-white pt-24 md:pt-28 pb-20 lg:pb-28">
        <div className="container mx-auto px-4">
          <nav aria-label="Breadcrumb" className="mb-4 text-sm text-white/60">
            <ol className="flex items-center gap-2">
              <li><Link href="/" className="hover:text-white/80">Home</Link></li>
              <li>/</li>
              <li><Link href="/tools" className="hover:text-white/80">Tools</Link></li>
              <li>/</li>
              <li className="text-white">{tool.name}</li>
            </ol>
          </nav>
          <div className="max-w-3xl">
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold leading-tight mb-6">
              {tool.name}
            </h1>
            <p className="text-lg text-white/80 leading-relaxed mb-8 max-w-2xl">
              {tool.longDescription}
            </p>
            <div className="flex flex-wrap gap-3">
              {[
                { icon: Sparkles, label: '100% Free' },
                { icon: UserX, label: 'No Signup' },
                { icon: Zap, label: 'Instant Results' },
              ].map((badge) => (
                <span
                  key={badge.label}
                  className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-sm border border-white/20 rounded-full px-4 py-2 text-sm font-medium"
                >
                  <badge.icon className="h-4 w-4" />
                  {badge.label}
                </span>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Tool Interface */}
      <section className="py-16 lg:py-20 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="max-w-5xl mx-auto">
            {children}
          </div>
        </div>
      </section>

      {/* SEO Content */}
      <section className="py-16 lg:py-20">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto prose prose-lg prose-gray">
            {seoContent}
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section className="py-16 lg:py-20 bg-gradient-to-r from-theme-gradient-1-from to-theme-gradient-1-to text-white">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold mb-12 text-center">How It Works</h2>
          <div className="grid md:grid-cols-3 gap-8 max-w-4xl mx-auto">
            {howItWorks.map((step, index) => (
              <div key={step.title} className="text-center">
                <div className="w-14 h-14 rounded-full bg-white text-theme-primary-light flex items-center justify-center text-2xl font-bold mx-auto mb-4">
                  {index + 1}
                </div>
                <h3 className="font-bold text-lg mb-2">{step.title}</h3>
                <p className="text-white/70 leading-relaxed">{step.text}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* What You Get */}
      <section className="py-16 lg:py-20">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-quicklend-900 mb-10 text-center">
            What You Get
          </h2>
          <div className="grid md:grid-cols-2 gap-6 max-w-4xl mx-auto">
            {whatYouGet.map((item) => (
              <div
                key={item.title}
                className="flex gap-4 bg-white rounded-xl p-6 border border-gray-100 shadow-sm"
              >
                <div className="flex-shrink-0 mt-1">
                  <CheckCircle className="h-6 w-6 text-quicklend-600" />
                </div>
                <div>
                  <h3 className="font-bold text-quicklend-900 mb-1">{item.title}</h3>
                  <p className="text-gray-600 text-sm leading-relaxed">{item.text}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ */}
      {tool.faqs.length > 0 && (
        <FAQSection
          faqs={tool.faqs.map((f) => ({ question: f.question, answer: f.answer }))}
          title={`${tool.name} — Frequently Asked Questions`}
        />
      )}

      {/* CTA Banner */}
      <section className="py-16 lg:py-20">
        <div className="container mx-auto px-4">
          <div className="bg-gradient-to-r from-theme-gradient-1-from to-theme-gradient-1-to rounded-2xl p-10 lg:p-16 text-center text-white">
            <h2 className="text-3xl lg:text-4xl font-bold mb-4">
              Ready for a personalized quote?
            </h2>
            <p className="text-white/70 mb-8 text-lg max-w-xl mx-auto">
              Our calculators give you estimates. Our funding specialists give you real offers tailored to your business.
            </p>
            <Link
              href={`/get-started?source=tools&tool=${tool.slug}`}
              className="inline-block rounded-full bg-white text-theme-primary font-semibold px-10 py-4 hover:bg-white/90 transition-colors"
            >
              Get Your Options
            </Link>
          </div>
        </div>
      </section>

      {/* Related Tools */}
      {relatedTools.length > 0 && (
        <section className="py-16 lg:py-20 bg-gray-50">
          <div className="container mx-auto px-4">
            <h2 className="text-3xl font-bold text-quicklend-900 mb-10">
              Related Tools
            </h2>
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {relatedTools.map((related) => {
                const Icon = related.icon
                const isLive = related.status === 'live'
                return (
                  <div
                    key={related.slug}
                    className="bg-white rounded-xl p-6 border border-gray-100 shadow-sm hover:shadow-md transition-shadow"
                  >
                    <div className="flex items-start justify-between mb-3">
                      <div className="w-10 h-10 rounded-lg bg-quicklend-50 flex items-center justify-center">
                        <Icon className="h-5 w-5 text-quicklend-600" />
                      </div>
                      <span
                        className={`text-xs font-semibold px-2 py-1 rounded-full ${
                          isLive ? 'bg-green-100 text-green-700' : 'bg-gray-100 text-gray-500'
                        }`}
                      >
                        {isLive ? 'Live' : 'Coming Soon'}
                      </span>
                    </div>
                    <h3 className="font-bold text-quicklend-900 mb-2">{related.name}</h3>
                    <p className="text-gray-600 text-sm mb-3 leading-relaxed">{related.shortDescription}</p>
                    {isLive ? (
                      <Link
                        href={`/tools/${related.slug}`}
                        className="inline-flex items-center text-quicklend-600 font-semibold text-sm hover:text-quicklend-700"
                      >
                        Use Tool <ArrowRight className="ml-1 h-4 w-4" />
                      </Link>
                    ) : (
                      <span className="text-gray-400 text-sm font-medium">Coming Soon</span>
                    )}
                  </div>
                )
              })}
            </div>
          </div>
        </section>
      )}
    </main>
  )
}
