'use client';

import { useState } from 'react';
import { Building2, Wrench, DollarSign, Building, CircleDollarSign, FileText, CheckCircle, Diamond, ChevronLeft, ChevronRight } from 'lucide-react';
import Link from 'next/link';

const services = [
  {
    icon: Building2,
    title: 'Business Loans',
    slug: 'term-loans',
    description: 'Strategic funding to fuel growth and expansion for businesses at any stage.',
    amount: '$250K - $100M',
    term: '1 - 3 Years',
    rate: '10 - 25%',
    popular: true,
    benefits: ['Same-day approval', 'Personalized solutions', 'Fixed or variable rates'],
  },
  {
    icon: Wrench,
    title: 'Equipment Financing',
    slug: 'equipment-financing',
    description: 'Acquire essential equipment without large upfront capital investment.',
    amount: '$50K - $50M',
    term: '1 - 7 Years',
    rate: '7 - 14%',
    popular: true,
    benefits: ['100% financing available', 'Potential tax benefits', 'Preserve working capital'],
  },
  {
    icon: DollarSign,
    title: 'Lines of Credit',
    slug: 'lines-of-credit',
    description: 'Flexible revolving credit to manage cash flow, inventory, and day-to-day expenses.',
    amount: '$50K - $10M',
    term: 'Revolving',
    rate: '10 - 25%',
    popular: false,
    benefits: ['Draw funds as needed', 'Pay interest only on what you use', 'Renews annually'],
  },
  {
    icon: Building,
    title: 'Asset Based Lending',
    slug: 'asset-backed-loans',
    description: 'Leverage your existing assets to unlock capital for growth and operational needs.',
    amount: '$50K - $100M',
    term: '1 - 3 Years',
    rate: '10 - 20%',
    popular: true,
    benefits: ['Leverage business assets', 'Higher approval rates', 'Flexible structures'],
  },
  {
    icon: CircleDollarSign,
    title: 'Investment Banking',
    slug: 'investment-banking',
    description: 'Expert financial advisory services for mergers, acquisitions and strategic growth.',
    amount: '$20M and Up',
    term: '1 - 10 Years',
    rate: '8 - 15%',
    popular: false,
    benefits: ['M&A advisory', 'Strategic growth capital', 'Industry expertise'],
  },
  {
    icon: FileText,
    title: 'Bond Financing',
    slug: 'bonds',
    description: 'Access capital markets with competitive bond offerings for substantial funding needs.',
    amount: '$50M and Up',
    term: '1 - 20 Years',
    rate: '1 - 5% issuance fee',
    popular: false,
    benefits: ['Lower interest rates', 'Longer repayment terms', 'Fixed rate options'],
  },
];

const ServicesSection = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const cardsPerView = 3;
  const maxIndex = services.length - cardsPerView;

  const goToPrev = () => {
    setCurrentIndex((prev) => Math.max(0, prev - 1));
  };

  const goToNext = () => {
    setCurrentIndex((prev) => Math.min(maxIndex, prev + 1));
  };

  return (
    <section className="py-16 bg-quicklend-900" id="services">
      <div className="container mx-auto px-4">
        {/* Header */}
        <div className="text-center mb-10">
          <span className="text-amber-500 font-semibold text-sm uppercase tracking-wider">Our Services</span>
          <h2 className="text-3xl md:text-4xl font-bold text-white mt-2">
            Financial Solutions
          </h2>
        </div>

        {/* Slider Container */}
        <div className="max-w-7xl mx-auto overflow-hidden">
          <div
            className="flex transition-transform duration-500 ease-in-out gap-5"
            style={{ transform: `translateX(-${currentIndex * (100 / cardsPerView + 1.5)}%)` }}
          >
            {services.map((service) => (
              <div
                key={service.title}
                className="flex-shrink-0 w-full md:w-[calc(50%-10px)] lg:w-[calc(33.333%-14px)]"
              >
                <div className="relative bg-white rounded-xl overflow-hidden shadow-lg h-full">
                  {service.popular && (
                    <div className="absolute top-4 right-4 z-10">
                      <div className="bg-amber-500 text-white text-xs font-bold px-2.5 py-1 rounded-full flex items-center gap-1">
                        <Diamond className="w-3 h-3" />
                        <span>POPULAR</span>
                      </div>
                    </div>
                  )}

                  <div className="p-6">
                    {/* Icon */}
                    <div className="flex justify-center mb-4">
                      <div className="bg-quicklend-100 rounded-full p-4">
                        <div className="bg-amber-500 p-3 rounded-full">
                          <service.icon className="h-7 w-7 text-white" />
                        </div>
                      </div>
                    </div>

                    {/* Title */}
                    <h3 className="text-xl font-bold text-quicklend-900 text-center mb-1">{service.title}</h3>
                    <div className="w-12 h-0.5 bg-amber-500 mx-auto mb-3"></div>

                    {/* Description */}
                    <p className="text-gray-600 text-sm text-center mb-5">{service.description}</p>

                    {/* Stats */}
                    <div className="bg-quicklend-50 rounded-lg p-4 mb-4">
                      <div className="grid grid-cols-2 gap-3 mb-3">
                        <div>
                          <p className="text-xs text-gray-500">Loan Amount</p>
                          <p className="text-sm font-bold text-amber-600">{service.amount}</p>
                        </div>
                        <div>
                          <p className="text-xs text-gray-500">Term Length</p>
                          <p className="text-sm font-bold text-amber-600">{service.term}</p>
                        </div>
                      </div>
                      <div>
                        <p className="text-xs text-gray-500">Interest Rate</p>
                        <p className="text-sm font-bold text-amber-600">{service.rate}</p>
                      </div>
                    </div>

                    {/* Benefits */}
                    <div className="mb-5">
                      <p className="text-xs font-semibold text-quicklend-900 mb-2 flex items-center">
                        <span className="w-1 h-4 bg-amber-500 rounded-full mr-2"></span>
                        Key Benefits
                      </p>
                      <div className="space-y-1.5">
                        {service.benefits.map((benefit, idx) => (
                          <div key={idx} className="flex items-center">
                            <CheckCircle className="h-4 w-4 text-amber-500 mr-2 flex-shrink-0" />
                            <span className="text-gray-600 text-sm">{benefit}</span>
                          </div>
                        ))}
                      </div>
                    </div>

                    {/* CTA */}
                    <Link
                      href={`/business-loans/${service.slug}`}
                      className="block w-full text-center py-3 bg-amber-500 hover:bg-amber-600 transition-colors text-white font-semibold rounded-lg"
                    >
                      Learn More
                    </Link>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Navigation Arrows */}
        <div className="flex justify-center gap-3 mt-8">
          <button
            onClick={goToPrev}
            disabled={currentIndex === 0}
            className="p-3 rounded-full bg-quicklend-100 text-quicklend-900 hover:bg-quicklend-200 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
            aria-label="Previous"
          >
            <ChevronLeft className="h-5 w-5" />
          </button>
          <button
            onClick={goToNext}
            disabled={currentIndex >= maxIndex}
            className="p-3 rounded-full bg-quicklend-100 text-quicklend-900 hover:bg-quicklend-200 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
            aria-label="Next"
          >
            <ChevronRight className="h-5 w-5" />
          </button>
        </div>
      </div>
    </section>
  );
};

export default ServicesSection;
