'use client'

import Link from 'next/link'
import Image from 'next/image'
import { ArticleData, ArticleSection } from '@/lib/article-data'
import { defaultAuthor } from '@/lib/authors'
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/UI/Accordion'
import {
  MdCheckCircle,
  MdTrendingUp,
  MdPhone,
  MdArrowForward,
  MdLightbulb,
  MdWarning,
  MdInfo,
  MdDescription,
  MdCreditCard,
  MdShowChart,
  MdBusiness,
  MdAttachMoney,
  MdDevices,
  MdTrendingDown,
  MdPeople,
  MdAccountBalance,
  MdTimer,
  MdSecurity,
} from 'react-icons/md'

interface ArticlePageLayoutProps {
  article: ArticleData
  relatedArticleTitles: { slug: string; title: string }[]
}

const iconMap: Record<string, React.ComponentType<{ className?: string }>> = {
  document: MdDescription,
  credit: MdCreditCard,
  chart: MdShowChart,
  building: MdBusiness,
  money: MdAttachMoney,
  technology: MdDevices,
  growth: MdTrendingUp,
  decline: MdTrendingDown,
  people: MdPeople,
  bank: MdAccountBalance,
  timer: MdTimer,
  security: MdSecurity,
}

function getIcon(iconName?: string) {
  if (!iconName) return MdCheckCircle
  return iconMap[iconName] || MdCheckCircle
}

export default function ArticlePageLayout({ article, relatedArticleTitles }: ArticlePageLayoutProps) {
  return (
    <main className="flex flex-grow flex-col w-full">
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-quicklend-800 to-quicklend-900 text-white pt-24 md:pt-28 pb-16 lg:pb-20">
        <div className="container mx-auto px-4">
          <nav aria-label="Breadcrumb" className="mb-6">
            <ol className="flex items-center gap-2 text-sm text-white/60">
              <li><Link href="/" className="hover:text-white/80">Home</Link></li>
              <li>/</li>
              <li><Link href="/financial-insights" className="hover:text-white/80">Financial Insights</Link></li>
              <li>/</li>
              <li className="text-white/90 truncate max-w-[200px]">{article.title}</li>
            </ol>
          </nav>

          <div className="grid lg:grid-cols-2 gap-10 items-center">
            <div>
              <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold leading-tight mb-4">
                {article.title}
              </h1>
              {article.heroSubtitle && (
                <p className="text-xl text-quicklend-200 font-medium mb-4">
                  {article.heroSubtitle}
                </p>
              )}
              <p className="text-lg text-white/80 leading-relaxed mb-8">
                {article.description}
              </p>
              <div className="flex flex-wrap gap-4">
                <Link
                  href="/get-started"
                  className="inline-flex items-center gap-2 bg-amber-500 text-quicklend-900 font-semibold px-6 py-3 rounded-lg hover:bg-amber-400 transition-colors"
                >
                  Apply Now
                </Link>
                <a
                  href="tel:3039218529"
                  className="inline-flex items-center gap-2 border-2 border-white/30 text-white font-semibold px-6 py-3 rounded-lg hover:bg-white/10 transition-colors"
                >
                  <MdPhone />
                  (303) 921-8529
                </a>
              </div>

              <div className="mt-6 flex items-center gap-3 text-sm text-white/70">
                <div className="w-8 h-8 rounded-full bg-white/20 flex items-center justify-center text-white font-bold text-xs">
                  QL
                </div>
                <div>
                  <span className="text-white/90 font-medium">{defaultAuthor.name}</span>
                  <span className="mx-2">|</span>
                  <span>{defaultAuthor.role}</span>
                  <span className="mx-2">|</span>
                  <time>
                    {new Date(article.date).toLocaleDateString('en-US', {
                      year: 'numeric',
                      month: 'long',
                      day: 'numeric',
                    })}
                  </time>
                </div>
              </div>
            </div>
            {article.image && (
              <div className="hidden lg:block">
                <Image
                  src={article.image}
                  alt={article.title}
                  width={600}
                  height={400}
                  className="rounded-2xl shadow-2xl object-cover"
                  priority
                />
              </div>
            )}
          </div>
        </div>
      </section>

      {/* Key Takeaways */}
      {article.keyTakeaways.length > 0 && (
        <section className="py-10 bg-gradient-to-b from-quicklend-50 to-white">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto">
              <div className="bg-white rounded-2xl p-6 md:p-8 shadow-xl border border-quicklend-100 relative overflow-hidden">
                <div className="absolute top-0 left-0 w-2 h-full bg-gradient-to-b from-quicklend-600 to-amber-500"></div>
                <div className="flex items-center gap-3 mb-6">
                  <div className="w-10 h-10 rounded-xl bg-quicklend-600 flex items-center justify-center">
                    <MdTrendingUp className="text-white text-xl" />
                  </div>
                  <h2 className="text-xl font-bold text-quicklend-900">
                    Key Takeaways
                  </h2>
                </div>
                <ul className="grid md:grid-cols-2 gap-4">
                  {article.keyTakeaways.map((takeaway, index) => (
                    <li key={index} className="flex items-start gap-3 p-3 rounded-xl bg-quicklend-50/50 hover:bg-quicklend-50 transition-colors">
                      <div className="w-6 h-6 rounded-full bg-quicklend-600 flex items-center justify-center flex-shrink-0 mt-0.5">
                        <MdCheckCircle className="text-white text-sm" />
                      </div>
                      <span className="text-gray-700 font-medium">{takeaway}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </section>
      )}

      {/* Intro Section */}
      <section className="py-12 lg:py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <div className="prose prose-lg prose-quicklend max-w-none text-gray-700 leading-relaxed">
              {article.intro}
            </div>
          </div>
        </div>
      </section>

      {/* Dynamic Sections */}
      {article.sections.map((section, index) => (
        <SectionRenderer key={index} section={section} index={index} />
      ))}

      {/* FAQ Section */}
      {article.faqs.length > 0 && (
        <section className="py-16 lg:py-20 bg-white">
          <div className="container mx-auto px-4">
            <div className="max-w-3xl mx-auto">
              <h2 className="text-3xl font-bold text-quicklend-900 mb-10 text-center">
                Frequently Asked Questions
              </h2>
              <Accordion type="single" collapsible>
                {article.faqs.map((faq, index) => (
                  <AccordionItem key={`faq-${index}`} value={`faq-${index}`}>
                    <AccordionTrigger className="text-quicklend-900 text-lg font-medium text-left">
                      {faq.question}
                    </AccordionTrigger>
                    <AccordionContent className="text-gray-600 leading-relaxed">
                      {faq.answer}
                    </AccordionContent>
                  </AccordionItem>
                ))}
              </Accordion>
            </div>
          </div>
        </section>
      )}

      {/* CTA Banner */}
      <section className="py-16 lg:py-20 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="bg-gradient-to-r from-quicklend-800 to-quicklend-900 rounded-2xl p-10 lg:p-16 text-center text-white">
            <h2 className="text-3xl lg:text-4xl font-bold mb-4">
              Increase your Financial IQ with Quick Lenders helpful guides.
            </h2>
            <p className="text-quicklend-200 mb-8 text-lg max-w-xl mx-auto">
              Get pre-qualified in minutes with no impact to your credit score. Our lending specialists will match you with the best options for your business.
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              <Link
                href="/get-started"
                className="inline-flex items-center gap-2 bg-amber-500 text-quicklend-900 font-semibold px-8 py-4 rounded-lg hover:bg-amber-400 transition-colors"
              >
                Get Pre-Qualified
                <MdArrowForward />
              </Link>
              <a
                href="tel:3039218529"
                className="inline-flex items-center gap-2 border-2 border-white/30 text-white font-semibold px-8 py-4 rounded-lg hover:bg-white/10 transition-colors"
              >
                <MdPhone />
                Call (303) 921-8529
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* Related Articles */}
      {relatedArticleTitles.length > 0 && (
        <section className="py-16 lg:py-20 bg-white">
          <div className="container mx-auto px-4">
            <div className="max-w-6xl mx-auto">
              <h2 className="text-2xl font-bold text-quicklend-900 mb-8">More Financial Insights</h2>
              <div className="grid md:grid-cols-3 gap-6">
                {relatedArticleTitles.map((related) => (
                  <Link
                    key={related.slug}
                    href={`/financial-insights/${related.slug}`}
                    className="bg-white border border-gray-200 rounded-xl p-6 hover:shadow-lg transition-shadow group"
                  >
                    <h3 className="font-bold text-quicklend-900 group-hover:text-quicklend-600 transition-colors mb-3">
                      {related.title}
                    </h3>
                    <span className="text-quicklend-600 text-sm font-medium inline-flex items-center gap-1">
                      Read More
                      <MdArrowForward />
                    </span>
                  </Link>
                ))}
              </div>
            </div>
          </div>
        </section>
      )}

      {/* Related Products */}
      {article.relatedProducts.length > 0 && (
        <section className="py-16 lg:py-20 bg-gray-50">
          <div className="container mx-auto px-4">
            <div className="max-w-6xl mx-auto">
              <h2 className="text-2xl font-bold text-quicklend-900 mb-8">Explore Loan Options</h2>
              <div className="grid md:grid-cols-3 gap-6">
                {article.relatedProducts.map((product) => (
                  <Link
                    key={product.slug}
                    href={`/business-loans/${product.slug}`}
                    className="bg-white border border-gray-200 rounded-xl p-6 hover:shadow-lg hover:border-quicklend-600/30 transition-all group"
                  >
                    <h3 className="font-bold text-quicklend-900 group-hover:text-quicklend-600 transition-colors mb-2">
                      {product.name}
                    </h3>
                    <span className="text-quicklend-600 text-sm font-medium inline-flex items-center gap-1">
                      Learn More
                      <MdArrowForward />
                    </span>
                  </Link>
                ))}
              </div>
            </div>
          </div>
        </section>
      )}
    </main>
  )
}

// Section Renderer Component
function SectionRenderer({ section, index }: { section: ArticleSection; index: number }) {
  const bgClass = index % 2 === 0 ? 'bg-white' : 'bg-gray-50'

  switch (section.type) {
    case 'text':
      return (
        <section className={`py-12 lg:py-16 ${bgClass}`}>
          <div className="container mx-auto px-4">
            <div className="max-w-6xl mx-auto">
              <div className={`grid ${section.image ? 'lg:grid-cols-2 gap-12 items-center' : ''}`}>
                {section.image && section.imagePosition === 'left' && (
                  <div className="hidden lg:block">
                    <div className="relative">
                      <div className="absolute -inset-4 bg-quicklend-100 rounded-2xl -z-10 transform -rotate-2"></div>
                      <Image
                        src={section.image}
                        alt={section.title}
                        width={500}
                        height={350}
                        className="rounded-xl shadow-xl relative z-10"
                      />
                    </div>
                  </div>
                )}
                <div>
                  <h2 className="text-2xl md:text-3xl font-bold text-quicklend-900 mb-6 relative">
                    <span className="relative z-10">{section.title}</span>
                    <span className="absolute left-0 bottom-0 w-20 h-1 bg-amber-500 rounded-full"></span>
                  </h2>
                  <div className="prose prose-lg prose-quicklend max-w-none text-gray-700 leading-relaxed [&>p]:mb-4 [&>p:last-child]:mb-0">
                    {section.content}
                  </div>
                </div>
                {section.image && section.imagePosition === 'right' && (
                  <div className="hidden lg:block">
                    <div className="relative">
                      <div className="absolute -inset-4 bg-quicklend-100 rounded-2xl -z-10 transform rotate-2"></div>
                      <Image
                        src={section.image}
                        alt={section.title}
                        width={500}
                        height={350}
                        className="rounded-xl shadow-xl relative z-10"
                      />
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        </section>
      )

    case 'two-column':
      return (
        <section className={`py-12 lg:py-16 ${bgClass}`}>
          <div className="container mx-auto px-4">
            <div className="max-w-6xl mx-auto">
              <h2 className="text-2xl md:text-3xl font-bold text-quicklend-900 mb-3 text-center">
                {section.title}
              </h2>
              {section.subtitle && (
                <p className="text-gray-600 text-center mb-10 max-w-2xl mx-auto">{section.subtitle}</p>
              )}
              <div className="grid md:grid-cols-2 gap-8">
                {section.columns.map((col, i) => (
                  <div key={i} className="bg-white rounded-2xl overflow-hidden border border-gray-200 shadow-lg hover:shadow-xl transition-shadow">
                    <div className={`${i === 0 ? 'bg-quicklend-700' : 'bg-quicklend-600'} text-white px-6 py-4`}>
                      <h3 className="text-xl font-bold">
                        {col.title}
                      </h3>
                    </div>
                    <div className="p-6">
                      <ul className="space-y-5">
                        {col.items.map((item, j) => (
                          <li key={j} className="flex items-start gap-3">
                            <MdCheckCircle className={`${i === 0 ? 'text-quicklend-700' : 'text-quicklend-600'} flex-shrink-0 mt-0.5 text-xl`} />
                            <div>
                              <span className="font-semibold text-quicklend-900 block mb-1">{item.label}</span>
                              <span className="text-gray-600 text-sm leading-relaxed">{item.description}</span>
                            </div>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>
      )

    case 'info-cards':
      return (
        <section className={`py-12 lg:py-16 ${bgClass}`}>
          <div className="container mx-auto px-4">
            <div className="max-w-6xl mx-auto">
              <h2 className="text-2xl md:text-3xl font-bold text-quicklend-900 mb-3 text-center">
                {section.title}
              </h2>
              {section.subtitle && (
                <p className="text-gray-600 text-center mb-10 max-w-2xl mx-auto">{section.subtitle}</p>
              )}
              <div className="grid md:grid-cols-2 gap-6">
                {section.cards.map((card, i) => {
                  const IconComponent = getIcon(card.icon)
                  return (
                    <div key={i} className="bg-white rounded-2xl p-6 border border-gray-100 shadow-lg hover:shadow-xl hover:-translate-y-1 transition-all duration-300 group">
                      <div className="w-14 h-14 rounded-xl bg-quicklend-100 flex items-center justify-center mb-4 group-hover:bg-quicklend-600 transition-colors">
                        <IconComponent className="text-3xl text-quicklend-600 group-hover:text-white transition-colors" />
                      </div>
                      <h3 className="font-bold text-quicklend-900 text-lg mb-2">{card.title}</h3>
                      <p className="text-gray-600 leading-relaxed">{card.text}</p>
                      {card.link && (
                        <Link href={card.link.href} className="text-quicklend-600 font-semibold hover:text-quicklend-700 mt-4 inline-flex items-center gap-1 group-hover:gap-2 transition-all">
                          {card.link.text}
                          <MdArrowForward className="text-sm" />
                        </Link>
                      )}
                    </div>
                  )
                })}
              </div>
            </div>
          </div>
        </section>
      )

    case 'process-steps':
      return (
        <section className="py-16 lg:py-20 bg-gradient-to-br from-quicklend-800 via-quicklend-900 to-quicklend-800 text-white relative overflow-hidden">
          {/* Decorative background elements */}
          <div className="absolute top-0 right-0 w-96 h-96 bg-quicklend-700/20 rounded-full blur-3xl"></div>
          <div className="absolute bottom-0 left-0 w-64 h-64 bg-amber-500/10 rounded-full blur-3xl"></div>

          <div className="container mx-auto px-4 relative z-10">
            <div className="max-w-4xl mx-auto">
              <h2 className="text-2xl md:text-3xl font-bold mb-3 text-center">
                {section.title}
              </h2>
              {section.subtitle && (
                <p className="text-quicklend-200 text-center mb-12">{section.subtitle}</p>
              )}
              <div className="relative">
                {/* Vertical timeline line */}
                <div className="absolute left-5 top-0 bottom-0 w-0.5 bg-gradient-to-b from-amber-500 via-amber-400 to-quicklend-600 hidden md:block"></div>

                <div className="space-y-8">
                  {section.steps.map((step, idx) => (
                    <div key={step.number} className="flex gap-6 items-start group">
                      <div className="relative">
                        <div className="w-10 h-10 rounded-full bg-amber-500 text-quicklend-900 flex items-center justify-center text-lg font-bold flex-shrink-0 shadow-lg shadow-amber-500/30 group-hover:scale-110 transition-transform">
                          {step.number}
                        </div>
                        {idx < section.steps.length - 1 && (
                          <div className="absolute top-12 left-1/2 -translate-x-1/2 w-0.5 h-8 bg-quicklend-700 md:hidden"></div>
                        )}
                      </div>
                      <div className="flex-1 bg-white/5 backdrop-blur-sm rounded-xl p-5 border border-white/10 hover:bg-white/10 transition-colors">
                        <h3 className="font-bold text-lg mb-2 text-amber-400">{step.title}</h3>
                        <p className="text-white/80 leading-relaxed">{step.description}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </section>
      )

    case 'comparison-table':
      return (
        <section className={`py-12 lg:py-16 ${bgClass}`}>
          <div className="container mx-auto px-4">
            <div className="max-w-5xl mx-auto">
              <h2 className="text-2xl md:text-3xl font-bold text-quicklend-900 mb-3 text-center">
                {section.title}
              </h2>
              {section.subtitle && (
                <p className="text-gray-600 text-center mb-10">{section.subtitle}</p>
              )}
              <div className="overflow-hidden rounded-2xl shadow-xl border border-gray-100">
                <div className="overflow-x-auto">
                  <table className="w-full">
                    <thead>
                      <tr>
                        {section.headers.map((header, i) => (
                          <th
                            key={i}
                            className={`px-6 py-5 text-left font-bold text-lg ${
                              i === 0
                                ? 'bg-quicklend-900 text-white'
                                : i === 1
                                  ? 'bg-quicklend-700 text-white'
                                  : 'bg-quicklend-600 text-white'
                            }`}
                          >
                            {header}
                          </th>
                        ))}
                      </tr>
                    </thead>
                    <tbody>
                      {section.rows.map((row, i) => (
                        <tr key={i} className={`${i % 2 === 0 ? 'bg-white' : 'bg-gray-50'} hover:bg-quicklend-50 transition-colors`}>
                          <td className="px-6 py-4 font-semibold text-quicklend-900 border-r border-gray-100">{row.label}</td>
                          {row.values.map((val, j) => (
                            <td key={j} className={`px-6 py-4 ${j < row.values.length - 1 ? 'border-r border-gray-100' : ''}`}>
                              <span className={`${j === 0 ? 'text-quicklend-700' : 'text-quicklend-600'} font-medium`}>{val}</span>
                            </td>
                          ))}
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          </div>
        </section>
      )

    case 'feature-grid':
      return (
        <section className={`py-12 lg:py-16 ${bgClass}`}>
          <div className="container mx-auto px-4">
            <div className="max-w-6xl mx-auto">
              <h2 className="text-2xl md:text-3xl font-bold text-quicklend-900 mb-3 text-center">
                {section.title}
              </h2>
              {section.subtitle && (
                <p className="text-gray-600 text-center mb-10">{section.subtitle}</p>
              )}
              <div className="grid grid-cols-2 md:grid-cols-3 gap-6">
                {section.features.map((feature, i) => (
                  <div key={i} className="bg-white rounded-xl p-6 border border-gray-200 shadow-sm text-center">
                    <p className="text-sm text-gray-500 mb-1">{feature.label}</p>
                    <p className="text-xl font-bold text-quicklend-900">{feature.value}</p>
                    {feature.description && (
                      <p className="text-sm text-gray-600 mt-2">{feature.description}</p>
                    )}
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>
      )

    case 'callout':
      const calloutStyles = {
        tip: { bg: 'bg-gradient-to-br from-amber-50 to-amber-100/50', border: 'border-amber-500', iconBg: 'bg-amber-500', icon: MdLightbulb, iconColor: 'text-white', titleColor: 'text-amber-800' },
        warning: { bg: 'bg-gradient-to-br from-red-50 to-red-100/50', border: 'border-red-500', iconBg: 'bg-red-500', icon: MdWarning, iconColor: 'text-white', titleColor: 'text-red-800' },
        info: { bg: 'bg-gradient-to-br from-blue-50 to-blue-100/50', border: 'border-blue-500', iconBg: 'bg-blue-500', icon: MdInfo, iconColor: 'text-white', titleColor: 'text-blue-800' },
      }
      const style = calloutStyles[section.style]
      const CalloutIcon = style.icon

      return (
        <section className={`py-12 lg:py-16 ${bgClass}`}>
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto">
              <div className={`${style.bg} border-l-4 ${style.border} rounded-2xl p-6 md:p-8 shadow-md`}>
                <div className="flex items-start gap-4">
                  <div className={`w-12 h-12 ${style.iconBg} rounded-xl flex items-center justify-center flex-shrink-0 shadow-lg`}>
                    <CalloutIcon className={`text-2xl ${style.iconColor}`} />
                  </div>
                  <div className="flex-1">
                    <h3 className={`font-bold text-xl mb-3 ${style.titleColor}`}>
                      {section.title}
                    </h3>
                    <div className="text-gray-700 leading-relaxed [&>p]:mb-3 [&>p:last-child]:mb-0">
                      {section.content}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
      )

    case 'infographic':
      return (
        <section className="py-12 lg:py-16 bg-quicklend-50">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto">
              <h2 className="text-2xl md:text-3xl font-bold text-quicklend-900 mb-3 text-center">
                {section.title}
              </h2>
              {section.subtitle && (
                <p className="text-gray-600 text-center mb-10">{section.subtitle}</p>
              )}
              <div className="bg-white rounded-2xl p-8 shadow-md">
                <div className="grid md:grid-cols-2 gap-6">
                  {section.items.map((item, i) => {
                    const IconComponent = getIcon(item.icon)
                    return (
                      <div key={i} className="flex items-start gap-4 p-4 rounded-xl bg-gray-50">
                        <div className="w-12 h-12 rounded-full bg-quicklend-600 text-white flex items-center justify-center flex-shrink-0">
                          <IconComponent className="text-2xl" />
                        </div>
                        <div>
                          <h4 className="font-bold text-quicklend-900 mb-1">{item.title}</h4>
                          <p className="text-gray-600 text-sm">{item.description}</p>
                        </div>
                      </div>
                    )
                  })}
                </div>
              </div>
            </div>
          </div>
        </section>
      )

    case 'image-infographic':
      return (
        <section className="py-14 lg:py-20 bg-gradient-to-b from-quicklend-50 to-white">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto">
              <div className="text-center mb-8">
                <h2 className="text-2xl md:text-3xl font-bold text-quicklend-900 mb-3 relative inline-block">
                  {section.title}
                  <span className="absolute -bottom-2 left-1/2 -translate-x-1/2 w-16 h-1 bg-amber-500 rounded-full"></span>
                </h2>
                {section.subtitle && (
                  <p className="text-gray-600 mt-6">{section.subtitle}</p>
                )}
              </div>
              <div className="relative">
                {/* Decorative corner accents */}
                <div className="absolute -top-3 -left-3 w-16 h-16 border-t-4 border-l-4 border-quicklend-600 rounded-tl-2xl"></div>
                <div className="absolute -bottom-3 -right-3 w-16 h-16 border-b-4 border-r-4 border-amber-500 rounded-br-2xl"></div>

                <div className="bg-white rounded-2xl p-4 md:p-8 shadow-xl border border-gray-100">
                  <Image
                    src={section.image}
                    alt={section.imageAlt}
                    width={800}
                    height={500}
                    className="w-full h-auto rounded-xl"
                  />
                  {section.caption && (
                    <p className="text-center text-sm text-gray-500 mt-4 italic">{section.caption}</p>
                  )}
                </div>
              </div>
            </div>
          </div>
        </section>
      )

    case 'cta-banner':
      return (
        <section className="py-10 lg:py-12">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto bg-gradient-to-r from-quicklend-700 to-quicklend-800 rounded-2xl p-8 md:p-10 text-center text-white">
              <h2 className="text-2xl md:text-3xl font-bold mb-3">
                {section.title}
              </h2>
              {section.subtitle && (
                <p className="text-quicklend-200 mb-6 max-w-xl mx-auto">{section.subtitle}</p>
              )}
              <Link
                href={section.buttonLink}
                className="inline-flex items-center gap-2 bg-amber-500 text-quicklend-900 font-semibold px-8 py-4 rounded-lg hover:bg-amber-400 transition-colors"
              >
                {section.buttonText}
                <MdArrowForward />
              </Link>
            </div>
          </div>
        </section>
      )

    default:
      return null
  }
}
