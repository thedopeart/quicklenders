import Link from 'next/link'
import { generatePageMetadata } from '@/lib/metadata'
import { breadcrumbSchema } from '@/lib/schema'
import { MdBolt, MdTune, MdVisibility, MdSupportAgent, MdTrendingUp, MdHandshake, MdVerified, MdGroups } from 'react-icons/md'

export const metadata = generatePageMetadata({
  title: 'About Quick Lenders | Trusted Business Lending Since 2003',
  description:
    'Over 20 years connecting businesses with capital. From term loans to equipment financing, Quick Lenders has funded $500M+ for 1,000+ businesses nationwide.',
  path: '/about-us',
})

const values = [
  { icon: MdBolt, title: 'Speed of Funding', text: 'We prioritize quick approvals and fast funding so you can seize opportunities without delay. Most businesses receive decisions within 24 hours.' },
  { icon: MdTune, title: 'Flexibility', text: 'Every business is unique. We tailor loan solutions to match your specific needs, from $50K term loans to $100M asset-based lending.' },
  { icon: MdVisibility, title: 'Transparency', text: 'Clear communication, straightforward terms, and no hidden fees. You always know exactly what you\'re paying and when.' },
  { icon: MdSupportAgent, title: 'Dedicated Support', text: 'Your personal account manager guides you through every step, from initial application through funding and beyond.' },
]

const stats = [
  { value: '$500M+', label: 'Total Funded', description: 'Capital deployed to growing businesses' },
  { value: '1,000+', label: 'Businesses Served', description: 'Companies trust Quick Lenders' },
  { value: '24hrs', label: 'Average Approval', description: 'Fast decisions when you need them' },
  { value: '20+', label: 'Years Experience', description: 'Decades of lending expertise' },
]

const steps = [
  { title: 'Check Your Eligibility', text: 'Complete a quick 5-minute application to see what financing options are available. No hard credit pull required for pre-qualification.' },
  { title: 'Personal Account Manager', text: 'A dedicated lending specialist reviews your profile, discusses your goals, and presents tailored loan offers that fit your business.' },
  { title: 'Get Approved & Funded', text: 'Choose your preferred terms and receive capital as fast as the same business day. We handle the paperwork so you can focus on growth.' },
]

const industries = [
  'Manufacturing', 'Healthcare', 'Construction', 'Retail', 'Technology',
  'Transportation', 'Hospitality', 'Professional Services', 'Wholesale', 'Agriculture'
]

export default function AboutPage() {
  const breadcrumbs = breadcrumbSchema([
    { name: 'Home', url: '/' },
    { name: 'About Us', url: '/about-us' },
  ])

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
              <li className="text-white">About Us</li>
            </ol>
          </nav>
          <div className="max-w-3xl">
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold leading-tight mb-6">
              Your Trusted Partner in Business Financing
            </h1>
            <p className="text-lg text-white/80 leading-relaxed mb-6">
              Since 2003, Quick Lenders has been at the forefront of business financing, connecting growing companies with the capital they need to thrive. We understand that access to funding can make the difference between a business that survives and one that scales.
            </p>
            <p className="text-lg text-white/80 leading-relaxed">
              Our mission is simple: provide fast, transparent, and flexible financing solutions tailored to each business&apos;s unique needs. From <Link href="/business-loans/term-loans" className="underline hover:text-white">term loans</Link> to <Link href="/business-loans/equipment-financing" className="underline hover:text-white">equipment financing</Link>, we offer a comprehensive suite of products designed to fuel your growth.
            </p>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-12 bg-white border-b">
        <div className="container">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {stats.map((stat) => (
              <div key={stat.label} className="text-center">
                <p className="text-4xl md:text-5xl font-bold text-theme-primary-light mb-2">{stat.value}</p>
                <p className="font-semibold text-theme-primary-dark">{stat.label}</p>
                <p className="text-sm text-gray-500">{stat.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Our Commitment */}
      <section className="py-16 lg:py-20">
        <div className="container">
          <div className="max-w-3xl mx-auto text-center mb-16">
            <h2 className="text-3xl font-bold text-theme-primary-dark mb-6">Our Commitment</h2>
            <p className="text-gray-600 text-lg leading-relaxed">
              We are committed to excellence and reliability. Our mission is to simplify business financing by providing fast, transparent, and flexible lending solutions tailored to your unique needs.
            </p>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {values.map((value) => (
              <div key={value.title} className="bg-white border border-gray-100 rounded-xl p-8 shadow-sm hover:shadow-md transition-shadow text-center">
                <div className="w-16 h-16 rounded-full bg-theme-primary-light/10 flex items-center justify-center mx-auto mb-5">
                  <value.icon className="text-3xl text-theme-primary-light" />
                </div>
                <h3 className="font-bold text-theme-primary-dark text-lg mb-3">{value.title}</h3>
                <p className="text-gray-600 text-sm leading-relaxed">{value.text}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* What We Offer */}
      <section className="py-16 lg:py-20 bg-gray-50">
        <div className="container">
          <div className="max-w-3xl mx-auto text-center mb-12">
            <h2 className="text-3xl font-bold text-theme-primary-dark mb-6">Comprehensive Financing Solutions</h2>
            <p className="text-gray-600 leading-relaxed">
              We offer a full spectrum of business financing products, each designed to address specific capital needs. Whether you&apos;re looking to expand operations, purchase equipment, or manage cash flow, we have a solution.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
            <Link href="/business-loans/term-loans" className="group bg-white rounded-xl p-6 shadow-sm hover:shadow-md transition-all border border-gray-100">
              <h3 className="font-bold text-theme-primary-dark mb-2 group-hover:text-theme-primary-light transition-colors">Term Loans</h3>
              <p className="text-sm text-gray-600 mb-3">$50K - $10M with same-day funding available. Perfect for major business investments and expansion.</p>
              <span className="text-theme-primary-light text-sm font-medium">Learn more →</span>
            </Link>

            <Link href="/business-loans/line-of-credit" className="group bg-white rounded-xl p-6 shadow-sm hover:shadow-md transition-all border border-gray-100">
              <h3 className="font-bold text-theme-primary-dark mb-2 group-hover:text-theme-primary-light transition-colors">Lines of Credit</h3>
              <p className="text-sm text-gray-600 mb-3">Revolving credit up to $10M. Draw funds as needed and only pay interest on what you use.</p>
              <span className="text-theme-primary-light text-sm font-medium">Learn more →</span>
            </Link>

            <Link href="/business-loans/asset-based-lending" className="group bg-white rounded-xl p-6 shadow-sm hover:shadow-md transition-all border border-gray-100">
              <h3 className="font-bold text-theme-primary-dark mb-2 group-hover:text-theme-primary-light transition-colors">Asset-Based Lending</h3>
              <p className="text-sm text-gray-600 mb-3">$50K - $100M secured by your business assets. Ideal for companies with strong collateral.</p>
              <span className="text-theme-primary-light text-sm font-medium">Learn more →</span>
            </Link>

            <Link href="/business-loans/equipment-financing" className="group bg-white rounded-xl p-6 shadow-sm hover:shadow-md transition-all border border-gray-100">
              <h3 className="font-bold text-theme-primary-dark mb-2 group-hover:text-theme-primary-light transition-colors">Equipment Financing</h3>
              <p className="text-sm text-gray-600 mb-3">Finance machinery, vehicles, and technology with terms up to 7 years. Preserve working capital.</p>
              <span className="text-theme-primary-light text-sm font-medium">Learn more →</span>
            </Link>

            <Link href="/business-loans/esop-financing" className="group bg-white rounded-xl p-6 shadow-sm hover:shadow-md transition-all border border-gray-100">
              <h3 className="font-bold text-theme-primary-dark mb-2 group-hover:text-theme-primary-light transition-colors">ESOP Financing</h3>
              <p className="text-sm text-gray-600 mb-3">Specialized financing for employee stock ownership plans. Terms up to 10 years.</p>
              <span className="text-theme-primary-light text-sm font-medium">Learn more →</span>
            </Link>

            <Link href="/business-loans" className="group bg-white rounded-xl p-6 shadow-sm hover:shadow-md transition-all border border-gray-100">
              <h3 className="font-bold text-theme-primary-dark mb-2 group-hover:text-theme-primary-light transition-colors">View All Products</h3>
              <p className="text-sm text-gray-600 mb-3">Explore our complete suite of financing solutions including bonds and investment banking.</p>
              <span className="text-theme-primary-light text-sm font-medium">Browse all →</span>
            </Link>
          </div>
        </div>
      </section>

      {/* Industries We Serve */}
      <section className="py-16 lg:py-20">
        <div className="container">
          <div className="max-w-3xl mx-auto text-center mb-12">
            <h2 className="text-3xl font-bold text-theme-primary-dark mb-6">Industries We Serve</h2>
            <p className="text-gray-600 leading-relaxed">
              Quick Lenders works with businesses across diverse sectors. Our lending specialists understand the unique challenges and capital needs of different industries.
            </p>
          </div>

          <div className="flex flex-wrap justify-center gap-3 mb-12">
            {industries.map((industry) => (
              <span key={industry} className="bg-theme-primary-light/10 text-theme-primary-dark px-4 py-2 rounded-full text-sm font-medium">
                {industry}
              </span>
            ))}
          </div>

          <div className="bg-gradient-to-r from-theme-gradient-1-from to-theme-gradient-1-to rounded-2xl p-8 md:p-12 text-white">
            <div className="grid md:grid-cols-2 gap-8 items-center">
              <div>
                <h3 className="text-2xl font-bold mb-4">Don&apos;t See Your Industry?</h3>
                <p className="text-white/80 mb-6">
                  We work with businesses of all types. If you don&apos;t see your industry listed, reach out to discuss your financing needs. Our team has experience with virtually every business sector.
                </p>
                <Link href="/contact" className="inline-block bg-white text-theme-primary font-semibold px-6 py-3 rounded-full hover:bg-white/90 transition-colors">
                  Contact Us
                </Link>
              </div>
              <div className="text-center">
                <p className="text-6xl font-bold mb-2">50+</p>
                <p className="text-white/70 text-lg">Industries Served</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 3-Step Process */}
      <section className="py-16 lg:py-20">
        <div className="container">
          <h2 className="text-3xl font-bold text-theme-primary-dark mb-12 text-center">How It Works</h2>
          <div className="grid md:grid-cols-3 gap-8 max-w-4xl mx-auto">
            {steps.map((step, index) => (
              <div key={step.title} className="text-center">
                <div className="w-14 h-14 rounded-full bg-theme-primary-light text-white flex items-center justify-center text-2xl font-bold mx-auto mb-4">
                  {index + 1}
                </div>
                <h3 className="font-bold text-theme-primary-dark text-lg mb-2">{step.title}</h3>
                <p className="text-gray-600 leading-relaxed">{step.text}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Why Businesses Choose Us */}
      <section className="py-16 lg:py-20 bg-gray-50">
        <div className="container">
          <div className="max-w-3xl mx-auto text-center mb-12">
            <h2 className="text-3xl font-bold text-theme-primary-dark mb-6">What Sets Us Apart</h2>
            <p className="text-gray-600 leading-relaxed">
              In a crowded lending market, Quick Lenders stands out through our commitment to service, speed, and transparency. Here&apos;s why thousands of businesses trust us.
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-8 mb-12">
            <div className="bg-white rounded-xl p-8 border border-gray-100">
              <MdHandshake className="text-4xl text-theme-primary-light mb-4" />
              <h3 className="text-xl font-bold text-theme-primary-dark mb-3">Relationship-Based Lending</h3>
              <p className="text-gray-600">
                We don&apos;t just process applications—we build relationships. Your dedicated account manager takes time to understand your business, goals, and challenges to find the best financing fit.
              </p>
            </div>

            <div className="bg-white rounded-xl p-8 border border-gray-100">
              <MdTrendingUp className="text-4xl text-theme-primary-light mb-4" />
              <h3 className="text-xl font-bold text-theme-primary-dark mb-3">Growth-Focused Solutions</h3>
              <p className="text-gray-600">
                Our products are designed to fuel expansion, not just cover gaps. From <Link href="/business-loans/equipment-financing" className="text-theme-primary-light hover:underline">equipment financing</Link> to <Link href="/business-loans/line-of-credit" className="text-theme-primary-light hover:underline">lines of credit</Link>, we help businesses scale strategically.
              </p>
            </div>

            <div className="bg-white rounded-xl p-8 border border-gray-100">
              <MdVerified className="text-4xl text-theme-primary-light mb-4" />
              <h3 className="text-xl font-bold text-theme-primary-dark mb-3">Proven Track Record</h3>
              <p className="text-gray-600">
                With over $500 million funded and 1,000+ businesses served, we have the experience and expertise to handle financing needs of any size. Our 20+ year history speaks for itself.
              </p>
            </div>

            <div className="bg-white rounded-xl p-8 border border-gray-100">
              <MdGroups className="text-4xl text-theme-primary-light mb-4" />
              <h3 className="text-xl font-bold text-theme-primary-dark mb-3">Expert Team</h3>
              <p className="text-gray-600">
                Our lending specialists bring decades of combined experience across industries. Whether you&apos;re in manufacturing, healthcare, or tech, we understand your sector&apos;s unique needs.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-16 lg:py-20">
        <div className="container">
          <div className="bg-gradient-to-r from-theme-gradient-1-from to-theme-gradient-1-to rounded-2xl p-10 lg:p-16 text-center text-white">
            <h2 className="text-3xl lg:text-4xl font-bold mb-4">
              Ready to Grow Your Business?
            </h2>
            <p className="text-white/70 mb-8 text-lg max-w-xl mx-auto">
              Join over 1,000 businesses that have trusted Quick Lenders to fuel their growth. Apply in minutes with no impact to your credit score.
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              <Link
                href="/get-started"
                className="inline-block rounded-full bg-white text-theme-primary font-semibold px-10 py-4 hover:bg-white/90 transition-colors"
              >
                Apply Now
              </Link>
              <Link
                href="/financial-insights"
                className="inline-block rounded-full border-2 border-white text-white font-semibold px-10 py-4 hover:bg-white/10 transition-colors"
              >
                Browse Resources
              </Link>
            </div>
          </div>
        </div>
      </section>
    </main>
  )
}
