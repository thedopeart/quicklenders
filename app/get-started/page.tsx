import { Suspense } from 'react'
import Link from 'next/link'
import { generatePageMetadata } from '@/lib/metadata'
import { breadcrumbSchema, faqSchema } from '@/lib/schema'
import GetStartedForm from './GetStartedForm'
import FAQSection from '@/components/FAQSection'
import { MdShield, MdSpeed, MdSupportAgent, MdCheckCircle } from 'react-icons/md'

export const metadata = generatePageMetadata({
  title: 'Get Pre-Qualified for Business Financing | Quick Lenders',
  description:
    'Apply for business financing in minutes. Pre-qualify with no hard credit pull. A Quick Lenders specialist reviews your details and responds within 1 business day.',
  path: '/get-started',
})

const benefits = [
  { icon: MdShield, text: 'No hard credit pull for pre-qualification' },
  { icon: MdSpeed, text: 'Decisions in as little as 24 hours' },
  { icon: MdSupportAgent, text: 'Personal account manager assigned' },
  { icon: MdCheckCircle, text: 'No obligation to proceed' },
]

const getStartedFaqs = [
  {
    question: 'What happens after I submit the form?',
    answer: <>After submitting your information, a dedicated lending specialist reviews your details and reaches out within 1 business day with personalized financing options. You will receive offers to compare, and there is no obligation to proceed with any of them. The entire process is confidential and designed to match you with the best options for your situation.</>,
    schemaAnswer: 'After submitting your information, a dedicated lending specialist reviews your details and reaches out within 1 business day with personalized financing options. You will receive offers to compare with no obligation to proceed. The process is confidential and designed to match you with the best options.',
  },
  {
    question: 'Will this affect my credit score?',
    answer: <>No. Our initial pre-qualification only requires a soft credit check, which does not impact your credit score. A hard credit inquiry only occurs if you decide to proceed with a formal loan application after reviewing your options. You can explore what you qualify for without any risk to your credit. Learn more about how credit works in our <Link href="/financial-insights/how-to-improve-credit-fast" className="text-quicklend-600 font-medium hover:underline">credit improvement guide</Link>.</>,
    schemaAnswer: 'No. Our initial pre-qualification only requires a soft credit check, which does not impact your credit score. A hard credit inquiry only occurs if you decide to proceed with a formal loan application after reviewing your options.',
  },
  {
    question: 'How long does approval take?',
    answer: <>Timeline depends on the loan type. <Link href="/business-loans/term-loans" className="text-quicklend-600 font-medium hover:underline">Term loans</Link> and <Link href="/business-loans/lines-of-credit" className="text-quicklend-600 font-medium hover:underline">lines of credit</Link> can be approved within 24 hours with same-day funding possible. <Link href="/business-loans/equipment-financing" className="text-quicklend-600 font-medium hover:underline">Equipment financing</Link> and <Link href="/business-loans/asset-backed-loans" className="text-quicklend-600 font-medium hover:underline">asset-based lending</Link> typically take 1 to 4 weeks due to additional verification. Having your documents ready speeds up the process.</>,
    schemaAnswer: 'Timeline depends on the loan type. Term loans and lines of credit can be approved within 24 hours with same-day funding possible. Equipment financing and asset-based lending typically take 1 to 4 weeks due to additional verification. Having your documents ready speeds up the process.',
  },
  {
    question: 'What documents do I need to apply?',
    answer: <>You will typically need 3 to 6 months of business bank statements, recent tax returns, and basic business information including your EIN, time in business, and annual revenue. Some loan types may require additional documentation like accounts receivable reports or equipment quotes. Our lending specialists will let you know exactly what is needed based on the options you qualify for.</>,
    schemaAnswer: 'You will typically need 3 to 6 months of business bank statements, recent tax returns, and basic business information including your EIN, time in business, and annual revenue. Some loan types may require additional documentation. Our specialists will advise on exactly what is needed.',
  },
  {
    question: 'What if I am approved for less than I need?',
    answer: <>You can accept the lower amount, apply with additional lenders for supplementary financing, or improve your qualifications and reapply later. Sometimes accepting a smaller loan and building a strong repayment history helps you qualify for more in the future. Our specialists can also help you explore combining multiple <Link href="/business-loans" className="text-quicklend-600 font-medium hover:underline">financing products</Link> to meet your total capital needs.</>,
    schemaAnswer: 'You can accept the lower amount, apply with additional lenders, or improve your qualifications and reapply later. Accepting a smaller loan and building a strong repayment history can help you qualify for more in the future. Our specialists can help you explore combining multiple financing products.',
  },
]

export default function GetStartedPage() {
  const breadcrumbs = breadcrumbSchema([
    { name: 'Home', url: '/' },
    { name: 'Get Started', url: '/get-started' },
  ])

  const faqData = faqSchema(getStartedFaqs.map(f => ({ question: f.question, answer: f.schemaAnswer })))

  return (
    <main className="flex flex-grow flex-col w-full">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbs) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqData) }}
      />

      {/* Hero Section */}
      <section className="bg-gradient-to-r from-theme-gradient-1-from to-theme-gradient-1-to text-white pt-24 md:pt-28 pb-16">
        <div className="container">
          <nav aria-label="Breadcrumb" className="mb-4 text-sm text-white/60">
            <ol className="flex items-center gap-2">
              <li><Link href="/" className="hover:text-white/80">Home</Link></li>
              <li>/</li>
              <li className="text-white">Get Started</li>
            </ol>
          </nav>
          <div className="max-w-2xl">
            <h1 className="text-4xl md:text-5xl font-bold leading-tight mb-6">
              Get Pre-Qualified in Minutes
            </h1>
            <p className="text-lg text-white/80 leading-relaxed mb-8">
              Tell us about your business and funding needs. A dedicated specialist will review your information and reach out within 1 business day with personalized financing options.
            </p>

            {/* Benefits */}
            <div className="grid grid-cols-2 gap-4">
              {benefits.map((benefit) => (
                <div key={benefit.text} className="flex items-center gap-2 text-white/90">
                  <benefit.icon className="text-xl flex-shrink-0" />
                  <span className="text-sm">{benefit.text}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Form Section */}
      <section className="py-16 bg-gray-50">
        <div className="container">
          <div className="grid lg:grid-cols-3 gap-12">
            {/* Form */}
            <div className="lg:col-span-2">
              <Suspense
                fallback={
                  <div className="rounded-2xl bg-white p-8 sm:p-10 shadow-sm border border-gray-100 animate-pulse space-y-6">
                    {[...Array(6)].map((_, i) => (
                      <div key={i} className="space-y-2">
                        <div className="h-4 bg-gray-200 rounded w-1/4" />
                        <div className="h-12 bg-gray-200 rounded" />
                      </div>
                    ))}
                  </div>
                }
              >
                <GetStartedForm />
              </Suspense>
            </div>

            {/* Sidebar */}
            <div className="space-y-6">
              {/* What to Expect */}
              <div className="bg-white rounded-xl p-6 border border-gray-100 shadow-sm">
                <h3 className="font-bold text-theme-primary-dark mb-4">What to Expect</h3>
                <ol className="space-y-4">
                  <li className="flex items-start gap-3">
                    <span className="w-6 h-6 rounded-full bg-theme-primary-light text-white text-xs flex items-center justify-center flex-shrink-0 mt-0.5">1</span>
                    <div>
                      <p className="font-medium text-gray-900">Submit Your Information</p>
                      <p className="text-sm text-gray-600">Takes about 5 minutes</p>
                    </div>
                  </li>
                  <li className="flex items-start gap-3">
                    <span className="w-6 h-6 rounded-full bg-theme-primary-light text-white text-xs flex items-center justify-center flex-shrink-0 mt-0.5">2</span>
                    <div>
                      <p className="font-medium text-gray-900">Specialist Reviews</p>
                      <p className="text-sm text-gray-600">We analyze your needs</p>
                    </div>
                  </li>
                  <li className="flex items-start gap-3">
                    <span className="w-6 h-6 rounded-full bg-theme-primary-light text-white text-xs flex items-center justify-center flex-shrink-0 mt-0.5">3</span>
                    <div>
                      <p className="font-medium text-gray-900">Receive Your Options</p>
                      <p className="text-sm text-gray-600">Within 24 hours</p>
                    </div>
                  </li>
                </ol>
              </div>

              {/* Need Help */}
              <div className="bg-gradient-to-br from-theme-gradient-1-from to-theme-gradient-1-to rounded-xl p-6 text-white">
                <h3 className="font-bold mb-2">Prefer to Talk?</h3>
                <p className="text-white/80 text-sm mb-4">
                  Speak directly with a lending specialist who can answer your questions.
                </p>
                <a
                  href="tel:3039218529"
                  className="inline-block bg-white text-theme-primary font-semibold px-4 py-2 rounded-lg text-sm hover:bg-white/90 transition-colors"
                >
                  Call (303) 921-8529
                </a>
              </div>

              {/* Resources */}
              <div className="bg-white rounded-xl p-6 border border-gray-100 shadow-sm">
                <h3 className="font-bold text-theme-primary-dark mb-4">Helpful Resources</h3>
                <ul className="space-y-2">
                  <li>
                    <Link href="/business-loans" className="text-sm text-theme-primary-light hover:underline">
                      → Compare loan products
                    </Link>
                  </li>
                  <li>
                    <Link href="/financial-insights/first-time-business-loans" className="text-sm text-theme-primary-light hover:underline">
                      → First-time borrower guide
                    </Link>
                  </li>
                  <li>
                    <Link href="/financial-insights/how-to-improve-credit-fast" className="text-sm text-theme-primary-light hover:underline">
                      → Improve your credit score
                    </Link>
                  </li>
                  <li>
                    <Link href="/contact" className="text-sm text-theme-primary-light hover:underline">
                      → Contact our team
                    </Link>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </section>

      <FAQSection faqs={getStartedFaqs} />
    </main>
  )
}
