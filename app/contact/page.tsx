import { generatePageMetadata } from '@/lib/metadata'
import { breadcrumbSchema, faqSchema } from '@/lib/schema'
import Link from 'next/link'
import ContactForm from './ContactForm'
import { MdPhone, MdAccessTime, MdLocationOn, MdEmail, MdQuestionAnswer } from 'react-icons/md'
import { Accordion, AccordionItem, AccordionTrigger, AccordionContent } from '@/components/UI/Accordion'

export const metadata = generatePageMetadata({
  title: 'Contact Quick Lenders | Talk to a Lending Specialist',
  description:
    'Reach Quick Lenders at (303) 921-8529 or send a message. Our business lending specialists are available Mon-Fri, 9AM-5PM MST to discuss your financing needs.',
  path: '/contact',
})

const faqs = [
  {
    question: 'How quickly can I get approved for a business loan?',
    answer: 'Most applications receive a decision within 24 hours. For straightforward term loans and lines of credit, same-day approval is often possible. More complex financing like asset-based lending may take 1-2 weeks due to collateral evaluation.',
  },
  {
    question: 'What documents do I need to apply?',
    answer: 'Typically, you\'ll need 3-6 months of business bank statements, recent tax returns, and basic business information (EIN, time in business, revenue). Some loan types may require additional documentation like accounts receivable aging reports or equipment quotes.',
  },
  {
    question: 'Will applying affect my credit score?',
    answer: 'No. Our initial pre-qualification only requires a soft credit check, which doesn\'t impact your score. A hard credit inquiry only occurs if you decide to proceed with a formal application after reviewing your options.',
  },
  {
    question: 'What credit score do I need to qualify?',
    answer: 'We work with businesses across the credit spectrum. While a higher score (680+) typically qualifies for better rates, we have options for businesses with lower scores. Factors like revenue, time in business, and collateral also influence approval.',
  },
  {
    question: 'How much can I borrow?',
    answer: 'Our loan amounts range from $50,000 to $100 million depending on the product. Term loans and lines of credit typically go up to $10M, while asset-based lending can extend to $100M for qualified businesses.',
  },
  {
    question: 'Do you offer loans to startups?',
    answer: 'Yes, though requirements differ. Startups typically need to show at least 6 months in business with consistent revenue. We also offer resources on alternative funding like pre-seed financing and venture capital for early-stage companies.',
  },
]

export default function ContactPage() {
  const breadcrumbs = breadcrumbSchema([
    { name: 'Home', url: '/' },
    { name: 'Contact', url: '/contact' },
  ])

  const faqStructuredData = faqSchema(faqs)

  return (
    <main className="flex flex-grow flex-col w-full">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbs) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqStructuredData) }}
      />

      {/* Hero */}
      <section className="bg-gradient-to-r from-theme-gradient-1-from to-theme-gradient-1-to text-white pt-24 md:pt-28 pb-20 lg:pb-28">
        <div className="container">
          <nav aria-label="Breadcrumb" className="mb-4 text-sm text-white/60">
            <ol className="flex items-center gap-2">
              <li><Link href="/" className="hover:text-white/80">Home</Link></li>
              <li>/</li>
              <li className="text-white">Contact</li>
            </ol>
          </nav>
          <div className="max-w-3xl">
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold leading-tight mb-6">
              Talk to a Lending Specialist
            </h1>
            <p className="text-lg text-white/80 leading-relaxed mb-6">
              Have questions about business financing? Ready to explore your options? Our team of lending specialists is here to help you find the right solution for your business needs.
            </p>
            <div className="flex flex-wrap gap-6 text-sm">
              <div className="flex items-center gap-2">
                <MdPhone className="text-white/80" />
                <span>Response within 1 business day</span>
              </div>
              <div className="flex items-center gap-2">
                <MdQuestionAnswer className="text-white/80" />
                <span>No-obligation consultations</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Contact Info + Form */}
      <section className="py-16 lg:py-20">
        <div className="container">
          <div className="max-w-5xl mx-auto grid gap-12 lg:grid-cols-2">
            {/* Info */}
            <div>
              <h2 className="text-2xl font-bold text-theme-primary-dark mb-8">Contact Information</h2>

              <div className="space-y-6">
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 rounded-full bg-theme-primary-light/10 flex items-center justify-center flex-shrink-0">
                    <MdPhone className="text-xl text-theme-primary-light" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-theme-primary-dark mb-1">Phone</h3>
                    <a href="tel:3039218529" className="text-gray-600 hover:text-theme-primary-light transition-colors">
                      (303) 921-8529
                    </a>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 rounded-full bg-theme-primary-light/10 flex items-center justify-center flex-shrink-0">
                    <MdEmail className="text-xl text-theme-primary-light" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-theme-primary-dark mb-1">Email</h3>
                    <a href="mailto:info@quicklenders.com" className="text-gray-600 hover:text-theme-primary-light transition-colors">
                      info@quicklenders.com
                    </a>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 rounded-full bg-theme-primary-light/10 flex items-center justify-center flex-shrink-0">
                    <MdAccessTime className="text-xl text-theme-primary-light" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-theme-primary-dark mb-1">Business Hours</h3>
                    <p className="text-gray-600">Monday – Friday<br />9:00 AM – 5:00 PM MST</p>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 rounded-full bg-theme-primary-light/10 flex items-center justify-center flex-shrink-0">
                    <MdLocationOn className="text-xl text-theme-primary-light" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-theme-primary-dark mb-1">Location</h3>
                    <p className="text-gray-600">Colorado, United States</p>
                  </div>
                </div>
              </div>

              {/* CTA card */}
              <div className="mt-10 bg-gradient-to-r from-theme-gradient-1-from to-theme-gradient-1-to rounded-xl p-8 text-white">
                <h3 className="font-bold text-lg mb-2">Prefer to talk?</h3>
                <p className="text-white/70 mb-4">
                  Book a call with one of our financing specialists and get personalized guidance.
                </p>
                <a
                  href="tel:3039218529"
                  className="inline-block rounded-full bg-white text-theme-primary font-semibold px-6 py-2.5 hover:bg-white/90 transition-colors text-sm"
                >
                  Call Now
                </a>
              </div>
            </div>

            {/* Form */}
            <div className="bg-white border border-gray-100 rounded-xl p-8 shadow-sm">
              <h2 className="text-2xl font-bold text-theme-primary-dark mb-6">Send Us a Message</h2>
              <ContactForm />
            </div>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-16 lg:py-20 bg-gray-50">
        <div className="container">
          <div className="max-w-3xl mx-auto">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold text-theme-primary-dark mb-6">Frequently Asked Questions</h2>
              <p className="text-gray-600 leading-relaxed">
                Get quick answers to common questions about our business financing process.
              </p>
            </div>

            <Accordion type="single" collapsible className="space-y-4">
              {faqs.map((faq, index) => (
                <AccordionItem key={index} value={`faq-${index}`} className="bg-white rounded-xl border border-gray-100 px-6">
                  <AccordionTrigger className="text-left font-semibold text-theme-primary-dark hover:no-underline">
                    {faq.question}
                  </AccordionTrigger>
                  <AccordionContent>
                    <p className="text-gray-600">{faq.answer}</p>
                  </AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>

            <div className="mt-10 text-center">
              <p className="text-gray-600 mb-4">Still have questions?</p>
              <div className="flex flex-wrap justify-center gap-4">
                <a
                  href="tel:3039218529"
                  className="inline-flex items-center gap-2 bg-theme-primary-light text-white font-semibold px-6 py-3 rounded-full hover:bg-theme-primary transition-colors"
                >
                  <MdPhone />
                  Call Us Now
                </a>
                <Link
                  href="/financial-insights"
                  className="inline-flex items-center gap-2 border-2 border-theme-primary-light text-theme-primary-light font-semibold px-6 py-3 rounded-full hover:bg-theme-primary-light/10 transition-colors"
                >
                  Browse Resources
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Quick Links Section */}
      <section className="py-16 lg:py-20">
        <div className="container">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-2xl font-bold text-theme-primary-dark mb-8 text-center">Explore Our Solutions</h2>

            <div className="grid md:grid-cols-3 gap-6">
              <Link href="/business-loans" className="group bg-white rounded-xl p-6 border border-gray-100 shadow-sm hover:shadow-md transition-all text-center">
                <h3 className="font-bold text-theme-primary-dark mb-2 group-hover:text-theme-primary-light transition-colors">Business Loans</h3>
                <p className="text-gray-600 text-sm mb-3">Explore all our financing products from $50K to $100M.</p>
                <span className="text-theme-primary-light text-sm font-medium">View Products →</span>
              </Link>

              <Link href="/get-started" className="group bg-white rounded-xl p-6 border border-gray-100 shadow-sm hover:shadow-md transition-all text-center">
                <h3 className="font-bold text-theme-primary-dark mb-2 group-hover:text-theme-primary-light transition-colors">Get Pre-Qualified</h3>
                <p className="text-gray-600 text-sm mb-3">Check your eligibility in minutes with no credit impact.</p>
                <span className="text-theme-primary-light text-sm font-medium">Start Application →</span>
              </Link>

              <Link href="/about-us" className="group bg-white rounded-xl p-6 border border-gray-100 shadow-sm hover:shadow-md transition-all text-center">
                <h3 className="font-bold text-theme-primary-dark mb-2 group-hover:text-theme-primary-light transition-colors">About Quick Lenders</h3>
                <p className="text-gray-600 text-sm mb-3">20+ years of experience funding business growth.</p>
                <span className="text-theme-primary-light text-sm font-medium">Learn More →</span>
              </Link>
            </div>
          </div>
        </div>
      </section>
    </main>
  )
}
