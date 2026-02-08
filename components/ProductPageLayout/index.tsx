import Link from 'next/link'
import Image from 'next/image'
import { LoanProductData } from '@/lib/loan-data'
import { loanProducts } from '@/lib/config'
import {
    Accordion,
    AccordionContent,
    AccordionItem,
    AccordionTrigger,
} from '@/components/UI/Accordion'
import { MdCheckCircle, MdInfo, MdRocket, MdMoneyOff, MdPerson, MdTune } from 'react-icons/md'

interface ProductPageLayoutProps {
    product: LoanProductData
    relatedProducts: LoanProductData[]
}

const ProductPageLayout = ({ product, relatedProducts }: ProductPageLayoutProps) => {
    return (
        <main className="flex flex-grow flex-col w-full">
            {/* Hero Section */}
            <section className="bg-gradient-to-r from-theme-gradient-1-from to-theme-gradient-1-to text-white pt-24 md:pt-28 pb-20 lg:pb-28">
                <div className="container">
                    <nav aria-label="Breadcrumb" className="mb-4 text-sm text-white/60">
                        <ol className="flex items-center gap-2">
                            <li><Link href="/" className="hover:text-white/80">Home</Link></li>
                            <li>/</li>
                            <li><Link href="/business-loans" className="hover:text-white/80">Business Loans</Link></li>
                            <li>/</li>
                            <li className="text-white">{product.name}</li>
                        </ol>
                    </nav>
                    <div className="grid lg:grid-cols-2 gap-12 items-center">
                        <div>
                            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold leading-tight mb-6">
                                {product.headline}{' '}
                                <span className="text-quicklend-200">{product.highlightText}</span>
                            </h1>
                            <p className="text-lg text-white/80 leading-relaxed mb-8 max-w-2xl">
                                {product.description}
                            </p>
                            <div className="flex flex-wrap items-center gap-4">
                                <Link
                                    href={`/get-started?loan_type=${product.slug}&source=loan-page`}
                                    className="inline-block rounded-full bg-white text-theme-primary font-semibold px-8 py-3 hover:bg-white/90 transition-colors"
                                >
                                    {product.ctaPrimary}
                                </Link>
                                <Link
                                    href="/contact"
                                    className="inline-block rounded-full border border-white/40 text-white font-semibold px-8 py-3 hover:bg-white/10 transition-colors"
                                >
                                    {product.ctaSecondary}
                                </Link>
                            </div>
                        </div>
                        {product.image && (
                            <div className="hidden lg:block">
                                <Image
                                    src={product.image}
                                    alt={product.name}
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

            {/* Key Features Grid */}
            <section className="py-16 lg:py-20">
                <div className="container">
                    <div className="grid grid-cols-2 md:grid-cols-3 gap-6">
                        {product.features.map((feature) => (
                            <div
                                key={feature.label}
                                className="bg-white border border-gray-100 rounded-xl p-6 shadow-sm hover:shadow-md transition-shadow"
                            >
                                <p className="text-sm text-gray-500 mb-1">{feature.label}</p>
                                <p className="text-lg font-bold text-theme-primary-dark">{feature.value}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Why Choose Quick Lenders */}
            <section className="py-16 lg:py-20 bg-quicklend-50">
                <div className="container">
                    <h2 className="text-3xl font-bold text-theme-primary-dark mb-4 text-center">
                        Why Choose Quick Lenders
                    </h2>
                    <p className="text-gray-600 text-center mb-12 max-w-2xl mx-auto">
                        We make business financing simple, transparent, and fast.
                    </p>
                    <div className="grid grid-cols-2 gap-6 max-w-3xl mx-auto">
                        {[
                            { icon: MdRocket, title: 'Same-Day Funding', text: 'Get approved and funded in as little as 24 hours so you never miss an opportunity.' },
                            { icon: MdMoneyOff, title: 'No Prepayment Penalties', text: 'Pay off your loan early without any extra fees or hidden charges.' },
                            { icon: MdPerson, title: 'Dedicated Account Manager', text: 'Work one-on-one with a funding specialist who understands your business.' },
                            { icon: MdTune, title: 'Flexible Terms', text: 'Choose repayment schedules that align with your cash flow and business cycle.' },
                        ].map((item) => (
                            <div
                                key={item.title}
                                className="bg-white border border-gray-100 rounded-xl p-6 shadow-sm hover:shadow-md transition-shadow"
                            >
                                <item.icon className="text-3xl text-quicklend-600 mb-3" />
                                <h3 className="font-bold text-theme-primary-dark text-lg mb-2">{item.title}</h3>
                                <p className="text-gray-600 leading-relaxed text-sm">{item.text}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Pros Section */}
            <section className="py-16 lg:py-20 bg-gray-50">
                <div className="container">
                    <h2 className="text-3xl font-bold text-theme-primary-dark mb-10">
                        Pros of <span className="text-theme-primary-light">{product.name}</span>
                    </h2>
                    <div className="grid md:grid-cols-2 gap-8">
                        {product.pros.map((pro) => (
                            <div key={pro.title} className="flex gap-4">
                                <div className="flex-shrink-0 mt-1">
                                    <MdCheckCircle className="text-2xl text-quicklend-200" />
                                </div>
                                <div>
                                    <h3 className="font-bold text-theme-primary-dark text-lg mb-2">{pro.title}</h3>
                                    <p className="text-gray-600 leading-relaxed">{pro.text}</p>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Who Qualifies? */}
            <section className="py-16 lg:py-20 bg-quicklend-50">
                <div className="container">
                    <h2 className="text-3xl font-bold text-theme-primary-dark mb-4 text-center">
                        Who Qualifies for <span className="text-theme-primary-light">{product.name}</span>?
                    </h2>
                    <p className="text-gray-600 text-center mb-10 max-w-2xl mx-auto">
                        Meeting these basic requirements puts you on the path to approval.
                    </p>
                    <div className="max-w-2xl mx-auto space-y-4">
                        {[
                            '6+ months in business',
                            '$100K+ annual revenue',
                            'Active business bank account',
                            'No open bankruptcies',
                        ].map((req) => (
                            <div key={req} className="flex items-center gap-4 bg-white rounded-xl px-6 py-4 border border-gray-100 shadow-sm">
                                <MdCheckCircle className="text-2xl text-quicklend-600 flex-shrink-0" />
                                <p className="font-medium text-theme-primary-dark">{req}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Considerations Section */}
            <section className="py-16 lg:py-20">
                <div className="container">
                    <h2 className="text-3xl font-bold text-theme-primary-dark mb-10">
                        <span className="text-theme-primary-light">{product.name}</span> Considerations
                    </h2>
                    <div className="space-y-6">
                        {product.considerations.map((item) => (
                            <div key={item.title} className="flex gap-4 bg-blue-50 rounded-xl p-6">
                                <div className="flex-shrink-0 mt-1">
                                    <MdInfo className="text-2xl text-theme-primary-light" />
                                </div>
                                <div>
                                    <h3 className="font-bold text-theme-primary-dark text-lg mb-2">{item.title}</h3>
                                    <p className="text-gray-600 leading-relaxed">
                                        {item.text}{' '}
                                        {item.linkText && item.linkHref && (
                                            <Link href={item.linkHref} className="text-theme-primary-light font-medium hover:underline">
                                                {item.linkText}
                                            </Link>
                                        )}
                                    </p>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* 3-Step Process */}
            <section className="py-16 lg:py-20 bg-gradient-to-r from-theme-gradient-1-from to-theme-gradient-1-to text-white">
                <div className="container">
                    <h2 className="text-3xl font-bold mb-12 text-center">How to Apply for <span className="text-quicklend-200">{product.name}</span></h2>
                    <div className="grid md:grid-cols-3 gap-8 max-w-4xl mx-auto">
                        {product.steps.map((step, index) => (
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

            {/* Uses Section */}
            <section className="py-16 lg:py-20">
                <div className="container">
                    <h2 className="text-3xl font-bold text-theme-primary-dark mb-10">Common Uses for <span className="text-theme-primary-light">{product.name}</span></h2>
                    <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                        {product.uses.map((use) => (
                            <div
                                key={use}
                                className="bg-white border border-gray-100 rounded-xl px-6 py-4 text-center font-medium text-theme-primary-dark shadow-sm"
                            >
                                {use}
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* What Our Clients Say */}
            <section className="py-16 lg:py-20 bg-gray-50">
                <div className="container">
                    <h2 className="text-3xl font-bold text-theme-primary-dark mb-12 text-center">
                        What Our Clients Say
                    </h2>
                    <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
                        {[
                            {
                                quote: 'Quick Lenders made the entire process seamless. We were funded within 48 hours and used the capital to open our second location. The team was responsive and transparent every step of the way.',
                                name: 'Maria S.',
                                role: 'Owner, Bright Path Catering',
                            },
                            {
                                quote: 'As a seasonal business, cash flow can be unpredictable. Quick Lenders offered terms that actually worked with our revenue cycle. I would recommend them to any small business owner.',
                                name: 'James T.',
                                role: 'Founder, Lakewood Landscaping',
                            },
                        ].map((testimonial) => (
                            <div
                                key={testimonial.name}
                                className="bg-white border border-gray-100 rounded-xl p-8 shadow-sm"
                            >
                                <p className="text-gray-600 leading-relaxed mb-6 italic">
                                    &ldquo;{testimonial.quote}&rdquo;
                                </p>
                                <div>
                                    <p className="font-bold text-theme-primary-dark">{testimonial.name}</p>
                                    <p className="text-sm text-gray-500">{testimonial.role}</p>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* FAQ Section */}
            <section className="py-16 lg:py-20 bg-gray-50">
                <div className="container">
                    <h2 className="text-3xl font-bold text-theme-primary-dark mb-10"><span className="text-theme-primary-light">{product.name}</span> — Frequently Asked Questions</h2>
                    <div className="max-w-3xl mx-auto">
                        <Accordion type="single" collapsible>
                            {product.faqs.map((faq, index) => (
                                <AccordionItem key={`faq-${index}`} value={`faq-${index}`}>
                                    <AccordionTrigger className="text-theme-primary-dark text-lg font-medium text-left">
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

            {/* CTA Banner */}
            <section className="py-16 lg:py-20">
                <div className="container">
                    <div className="bg-gradient-to-r from-theme-gradient-1-from to-theme-gradient-1-to rounded-2xl p-10 lg:p-16 text-center text-white">
                        <h2 className="text-3xl lg:text-4xl font-bold mb-4">
                            Ready to get started?
                        </h2>
                        <p className="text-white/70 mb-8 text-lg max-w-xl mx-auto">
                            Apply now and take the next step toward growing your business.
                        </p>
                        <Link
                            href={`/get-started?loan_type=${product.slug}&source=loan-page`}
                            className="inline-block rounded-full bg-white text-theme-primary font-semibold px-10 py-4 hover:bg-white/90 transition-colors"
                        >
                            {product.ctaPrimary}
                        </Link>
                    </div>
                </div>
            </section>

            {/* Related Loan Options */}
            <section className="py-16 lg:py-20 bg-gray-50">
                <div className="container">
                    <h2 className="text-3xl font-bold text-theme-primary-dark mb-10">Explore Other Loan Options</h2>
                    <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
                        {relatedProducts.map((related) => (
                            <Link
                                key={related.slug}
                                href={`/business-loans/${related.slug}`}
                                className="bg-white rounded-xl p-6 border border-gray-100 shadow-sm hover:shadow-lg transition-all group"
                            >
                                <h3 className="font-bold text-theme-primary-dark text-xl mb-2 group-hover:text-theme-primary-light transition-colors">
                                    {related.name}
                                </h3>
                                <p className="text-sm text-gray-500 mb-3">{related.features[0]?.value}</p>
                                <span className="text-theme-primary-light text-sm font-medium">
                                    Learn More →
                                </span>
                            </Link>
                        ))}
                    </div>
                </div>
            </section>
        </main>
    )
}

export default ProductPageLayout
