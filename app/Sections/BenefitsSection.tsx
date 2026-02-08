'use client';

import { CheckCircle2, Shield, Clock, DollarSign, Users } from 'lucide-react';
import Link from 'next/link';
import { useScrollAnimation } from '@/hooks/useScrollAnimation';

const trustBadges = [
  { icon: Shield, text: 'Trusted by thousands' },
  { icon: Clock, text: '24-hour average approval time' },
  { icon: DollarSign, text: '$500M+ funded' },
  { icon: Users, text: '1,000+ businesses funded' },
];

const benefits = [
  'Competitive interest rates designed for growing businesses of all sizes.',
  'Flexible repayment terms that adapt to your cash flow and revenue cycles.',
  'Dedicated account managers providing personalized guidance throughout your journey.',
  'No hidden fees or surprise charges — complete transparency from start to finish.',
  'Fast pre-qualification process that won\'t impact your credit score initially.',
  'Access to a network of lending partners for the best possible terms.',
];

const steps = [
  {
    number: 1,
    title: 'Apply Online',
    description: 'Complete our simple application in just a few minutes with basic business information.',
  },
  {
    number: 2,
    title: 'Get Approved',
    description: 'Our team reviews your application and provides a decision within 24 hours.',
  },
  {
    number: 3,
    title: 'Receive Funding',
    description: 'Once approved, funds are deposited directly into your business account.',
  },
];

const BenefitsSection = () => {
  const leftColumn = useScrollAnimation();
  const rightColumn = useScrollAnimation();

  return (
    <section className="py-20 bg-quicklend-50">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-start max-w-7xl mx-auto">
          {/* Left Column */}
          <div ref={leftColumn.ref} className={`scroll-animate-left ${leftColumn.isVisible ? 'visible' : ''}`}>
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-quicklend-900 mb-5 leading-tight">
              The Quick Lenders Advantage
            </h2>
            <p className="text-gray-600 text-base md:text-lg mb-8 leading-relaxed">
              Experience a streamlined lending process backed by industry expertise. We&apos;ve helped thousands of businesses secure the funding they need to grow.
            </p>

            {/* Trust Badge Pills */}
            <div className="flex flex-wrap gap-2.5 mb-10">
              {trustBadges.map((badge) => (
                <div
                  key={badge.text}
                  className="flex items-center gap-2 bg-white border border-gray-100 shadow-sm rounded-full px-4 py-2.5 text-sm text-gray-700 font-medium hover:shadow-md transition-shadow"
                >
                  <badge.icon className="w-4 h-4 text-quicklend-600" />
                  {badge.text}
                </div>
              ))}
            </div>

            {/* Benefits Checklist */}
            <ul className="space-y-4">
              {benefits.map((benefit) => {
                const words = benefit.split(' ');
                const boldPart = words.slice(0, 3).join(' ');
                const rest = words.slice(3).join(' ');
                return (
                  <li key={benefit} className="flex items-start gap-3">
                    <CheckCircle2 className="w-5 h-5 text-quicklend-600 mt-0.5 flex-shrink-0" />
                    <span className="text-gray-700 leading-relaxed">
                      <strong className="text-quicklend-900">{boldPart}</strong> {rest}
                    </span>
                  </li>
                );
              })}
            </ul>
          </div>

          {/* Right Column - Steps Card */}
          <div ref={rightColumn.ref} className={`scroll-animate-right ${rightColumn.isVisible ? 'visible' : ''}`}>
            <div className="bg-white rounded-2xl shadow-lg border border-gray-100 p-8 md:p-10">
              <h3 className="text-2xl font-bold text-quicklend-900 mb-8">Get Funded Fast</h3>

              {/* Steps Timeline */}
              <div className="relative mb-10">
                {steps.map((step, index) => (
                  <div key={step.number} className="relative flex items-start gap-5">
                    {/* Timeline connector */}
                    {index < steps.length - 1 && (
                      <div className="absolute left-5 top-10 w-0.5 h-16 bg-gradient-to-b from-quicklend-600 to-quicklend-200" />
                    )}

                    {/* Number circle */}
                    <div className="w-10 h-10 rounded-full bg-quicklend-600 text-white flex items-center justify-center font-bold text-sm flex-shrink-0 z-10 shadow-md">
                      {step.number}
                    </div>

                    {/* Content */}
                    <div className={index < steps.length - 1 ? 'pb-8' : ''}>
                      <h4 className="text-lg font-bold text-quicklend-900 mb-1">{step.title}</h4>
                      <p className="text-gray-600 text-sm leading-relaxed">{step.description}</p>
                    </div>
                  </div>
                ))}
              </div>

              <Link
                href="/get-started"
                className="block w-full text-center py-4 bg-quicklend-600 text-white font-semibold rounded-xl hover:bg-quicklend-700 transition-colors shadow-md hover:shadow-lg"
              >
                Apply in Minutes
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default BenefitsSection;
