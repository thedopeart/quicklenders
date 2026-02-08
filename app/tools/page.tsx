import Link from 'next/link'
import { generatePageMetadata } from '@/lib/metadata'
import { breadcrumbSchema, faqSchema } from '@/lib/schema'
import { toolsData, getToolsByCategory, categoryLabels, type ToolCategory } from '@/lib/tools-data'
import FAQSection from '@/components/FAQSection'
import { ArrowRight, DollarSign, ShieldCheck, Users, Zap, BarChart3, Lock } from 'lucide-react'

export const metadata = generatePageMetadata({
  title: 'Free Business Loan Calculators & Tools | Quick Lenders',
  description: 'Free business loan calculators and financial tools. Calculate payments, convert factor rates, compare loans, and more — no signup required.',
  path: '/tools',
})

const hubFaqs = [
  {
    question: 'Are these business loan tools really free?',
    answer: 'Yes, every tool on this page is 100% free to use with no signup, email, or account required. We built these calculators to help business owners make informed financing decisions. There are no hidden charges, paywalls, or data harvesting — just useful tools.',
    schemaAnswer: 'Yes, every tool is 100% free to use with no signup, email, or account required. They are built to help business owners make informed financing decisions with no hidden charges, paywalls, or data harvesting.',
  },
  {
    question: 'How accurate are these business loan calculators?',
    answer: 'Our calculators use the same standard formulas that lenders use to determine payment schedules and costs. While the results are highly accurate for estimation purposes, actual loan terms may vary based on your credit profile, origination fees, and other lender-specific factors. For a precise quote, we recommend speaking with a funding specialist.',
    schemaAnswer: 'The calculators use the same standard formulas that lenders use to determine payment schedules and costs. While the results are highly accurate for estimation purposes, actual loan terms may vary based on credit profile, origination fees, and other lender-specific factors.',
  },
  {
    question: 'Do I need to create an account to use these tools?',
    answer: 'No. All tools work instantly in your browser with no account creation, email submission, or login required. Your calculation data stays in your browser and is never stored on our servers.',
    schemaAnswer: 'No. All tools work instantly in the browser with no account creation, email submission, or login required. Calculation data stays in the browser and is never stored on servers.',
  },
  {
    question: 'Which calculator should I use for a merchant cash advance?',
    answer: 'If your financing uses a factor rate (a decimal like 1.30), use our Factor Rate to APR Converter to understand the true annual cost. If your financing quotes a traditional interest rate, use the Loan Payment Calculator to see monthly payments and amortization.',
    schemaAnswer: 'If your financing uses a factor rate (a decimal like 1.30), use the Factor Rate to APR Converter to understand the true annual cost. If your financing quotes a traditional interest rate, use the Loan Payment Calculator to see monthly payments and amortization.',
  },
  {
    question: 'Will you be adding more tools in the future?',
    answer: 'Yes! We have over 20 tools planned across calculators, interactive assessments, and educational resources. New tools are released regularly — check back often or explore our Financial Insights for the latest business financing resources.',
    schemaAnswer: 'Yes, over 20 tools are planned across calculators, interactive assessments, and educational resources. New tools are released regularly.',
  },
]

const featureCards = [
  { number: 1, title: 'Instant Calculations', description: 'Get real-time results as you adjust inputs — no waiting, no submit buttons, no page reloads.' },
  { number: 2, title: 'Visual Breakdowns', description: 'Interactive charts and tables help you understand exactly where your money goes over the life of a loan.' },
  { number: 3, title: 'Compare Options', description: 'Evaluate different loan amounts, terms, and rates side by side to find the structure that fits your budget.' },
  { number: 4, title: 'Mobile-Friendly', description: 'Every tool works seamlessly on phones, tablets, and desktops so you can calculate anywhere.' },
  { number: 5, title: 'Educational Context', description: 'Each tool includes explanations, formulas, and FAQs so you understand the numbers, not just see them.' },
  { number: 6, title: 'Actionable Next Steps', description: 'Ready to move forward? Every tool connects you directly to personalized financing options.' },
]

const categories: ToolCategory[] = ['calculators', 'interactive-tools', 'content-assets']

export default function ToolsPage() {
  return (
    <main className="flex flex-grow flex-col w-full">
      {/* Schema */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(
            breadcrumbSchema([
              { name: 'Home', url: '/' },
              { name: 'Tools', url: '/tools' },
            ])
          ),
        }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(
            faqSchema(hubFaqs.map((f) => ({ question: f.question, answer: f.schemaAnswer })))
          ),
        }}
      />

      {/* Hero */}
      <section className="bg-gradient-to-r from-theme-gradient-1-from to-theme-gradient-1-to text-white pt-24 md:pt-28 pb-20 lg:pb-28">
        <div className="container mx-auto px-4">
          <nav aria-label="Breadcrumb" className="mb-4 text-sm text-white/60">
            <ol className="flex items-center gap-2">
              <li><Link href="/" className="hover:text-white/80">Home</Link></li>
              <li>/</li>
              <li className="text-white">Tools</li>
            </ol>
          </nav>
          <div className="max-w-3xl">
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold leading-tight mb-6">
              Business Financing <span className="text-quicklend-200">Tools</span>
            </h1>
            <p className="text-lg text-white/80 leading-relaxed mb-8 max-w-2xl">
              Free calculators and interactive tools to help you understand loan costs, compare options, and make confident financing decisions — no signup required.
            </p>
            <div className="flex flex-wrap items-center gap-4">
              <Link
                href="#tools"
                className="inline-block rounded-full bg-white text-theme-primary font-semibold px-8 py-3 hover:bg-white/90 transition-colors"
              >
                Explore Tools
              </Link>
              <Link
                href="/get-started?source=tools-hub"
                className="inline-block rounded-full border border-white/40 text-white font-semibold px-8 py-3 hover:bg-white/10 transition-colors"
              >
                Get Your Options
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Tool Categories Grid */}
      <section id="tools" className="py-16 lg:py-20 bg-quicklend-900">
        <div className="container mx-auto px-4">
          {categories.map((category) => {
            const tools = getToolsByCategory(category)
            if (tools.length === 0) return null
            return (
              <div key={category} className="mb-16 last:mb-0">
                <div className="mb-8">
                  <span className="text-amber-500 font-semibold text-sm uppercase tracking-wider">{categoryLabels[category]}</span>
                  <div className="w-12 h-0.5 bg-amber-500 mt-2"></div>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {tools.map((tool) => {
                    const Icon = tool.icon
                    const isLive = tool.status === 'live'
                    const CardWrapper = isLive ? Link : 'div'
                    const cardProps = isLive
                      ? { href: `/tools/${tool.slug}` }
                      : {}
                    return (
                      <CardWrapper
                        key={tool.slug}
                        {...(cardProps as any)}
                        className={`bg-white rounded-xl overflow-hidden shadow-lg flex flex-col group transition-all duration-300 ${
                          isLive
                            ? 'hover:shadow-2xl hover:-translate-y-1 cursor-pointer'
                            : 'opacity-75'
                        }`}
                      >
                        <div className="p-6 flex flex-col flex-grow">
                          <div className="flex items-start justify-between mb-4">
                            <div className="bg-quicklend-100 rounded-full p-3">
                              <div className="bg-amber-500 p-2.5 rounded-full">
                                <Icon className="h-5 w-5 text-white" />
                              </div>
                            </div>
                            <span
                              className={`text-xs font-bold px-3 py-1 rounded-full ${
                                isLive
                                  ? 'bg-amber-500 text-white'
                                  : 'bg-gray-100 text-gray-500'
                              }`}
                            >
                              {isLive ? 'LIVE' : 'COMING SOON'}
                            </span>
                          </div>
                          <h3 className="text-lg font-bold text-quicklend-900 mb-1">
                            {tool.name}
                          </h3>
                          <div className="w-10 h-0.5 bg-amber-500 mb-3"></div>
                          <p className="text-gray-600 text-sm leading-relaxed mb-4 flex-grow">
                            {tool.shortDescription}
                          </p>
                          {isLive ? (
                            <span className="inline-flex items-center justify-center w-full py-3 bg-amber-500 group-hover:bg-amber-600 transition-colors text-white font-semibold rounded-lg text-sm">
                              Use Tool <ArrowRight className="ml-2 h-4 w-4" />
                            </span>
                          ) : (
                            <span className="inline-flex items-center justify-center w-full py-3 bg-gray-100 text-gray-400 font-medium rounded-lg text-sm cursor-not-allowed">
                              Coming Soon
                            </span>
                          )}
                        </div>
                      </CardWrapper>
                    )
                  })}
                </div>
              </div>
            )
          })}
        </div>
      </section>

      {/* What These Tools Do */}
      <section className="py-16 lg:py-20 bg-gray-50">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-quicklend-900 mb-4 text-center">
            What These Tools Do
          </h2>
          <p className="text-gray-600 text-center mb-12 max-w-2xl mx-auto">
            Every tool is designed to help you make smarter financing decisions with clear, accurate data.
          </p>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-5xl mx-auto">
            {featureCards.map((card) => (
              <div key={card.number} className="flex gap-4">
                <div className="flex-shrink-0 w-10 h-10 rounded-full bg-quicklend-600 text-white flex items-center justify-center font-bold text-sm">
                  {card.number}
                </div>
                <div>
                  <h3 className="font-bold text-quicklend-900 mb-1">{card.title}</h3>
                  <p className="text-gray-600 text-sm leading-relaxed">{card.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Why These Tools Are Different */}
      <section className="py-16 lg:py-20">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-quicklend-900 mb-4 text-center">
            Why These Tools Are Different
          </h2>
          <p className="text-gray-600 text-center mb-12 max-w-2xl mx-auto">
            Built by lending professionals, not just developers.
          </p>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-4xl mx-auto">
            {[
              {
                icon: DollarSign,
                title: 'Transparent Pricing',
                description: 'See the real cost of financing with no hidden variables. Our tools show you total interest, effective rates, and complete payment breakdowns.',
              },
              {
                icon: Users,
                title: 'Built by Lending Experts',
                description: 'Every calculator is designed by professionals who understand business lending — not generic templates from a finance textbook.',
              },
              {
                icon: Lock,
                title: 'No Signup Required',
                description: 'Use any tool instantly without creating an account, providing an email, or sharing personal information. Your data stays in your browser.',
              },
            ].map((item) => (
              <div
                key={item.title}
                className="bg-white rounded-xl p-8 border border-gray-100 shadow-sm text-center"
              >
                <div className="w-14 h-14 rounded-full bg-quicklend-50 flex items-center justify-center mx-auto mb-4">
                  <item.icon className="h-7 w-7 text-quicklend-600" />
                </div>
                <h3 className="font-bold text-quicklend-900 text-lg mb-2">{item.title}</h3>
                <p className="text-gray-600 text-sm leading-relaxed">{item.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ */}
      <FAQSection
        faqs={hubFaqs.map((f) => ({ question: f.question, answer: f.answer }))}
        title="Tools — Frequently Asked Questions"
      />

      {/* CTA Banner */}
      <section className="py-16 lg:py-20">
        <div className="container mx-auto px-4">
          <div className="bg-gradient-to-r from-theme-gradient-1-from to-theme-gradient-1-to rounded-2xl p-10 lg:p-16 text-center text-white">
            <h2 className="text-3xl lg:text-4xl font-bold mb-4">
              Ready to explore your financing options?
            </h2>
            <p className="text-white/70 mb-8 text-lg max-w-xl mx-auto">
              Our tools give you the numbers. Our team gives you the plan. Connect with a funding specialist today.
            </p>
            <Link
              href="/get-started?source=tools-hub"
              className="inline-block rounded-full bg-white text-theme-primary font-semibold px-10 py-4 hover:bg-white/90 transition-colors"
            >
              Get Your Options
            </Link>
          </div>
        </div>
      </section>
    </main>
  )
}
