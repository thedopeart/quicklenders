'use client';

import { CheckCircle, Award, Clock, Check, ArrowRight } from 'lucide-react';
import { useStaggeredScrollAnimation } from '@/hooks/useScrollAnimation';
import Link from 'next/link';

const cards = [
  {
    icon: CheckCircle,
    title: 'Effortless Application',
    description: 'Our streamlined process makes applying for business financing simple and stress-free.',
    bullets: [
      'Simple online application in minutes',
      'Minimal documentation required',
      'Dedicated support throughout the process',
    ],
    accent: 'from-blue-500 to-blue-600',
    lightAccent: 'bg-blue-50',
  },
  {
    icon: Award,
    title: 'Tailored Solutions',
    description: 'We customize financing packages to match your unique business needs and goals.',
    bullets: [
      'Flexible loan amounts and terms',
      'Multiple product options available',
      'Personalized repayment structures',
    ],
    accent: 'from-amber-500 to-amber-600',
    lightAccent: 'bg-amber-50',
  },
  {
    icon: Clock,
    title: 'Quick Decisions',
    description: 'Get fast funding decisions so you can focus on what matters most — your business.',
    bullets: [
      'Decisions within 24 hours',
      'Fast disbursement of funds',
      'No lengthy waiting periods',
    ],
    accent: 'from-green-500 to-green-600',
    lightAccent: 'bg-green-50',
  },
];

const TrustBannerSection = () => {
  const { ref, visibleItems } = useStaggeredScrollAnimation(cards.length);

  return (
    <section className="relative py-24 bg-gradient-to-b from-slate-50 to-slate-100 overflow-hidden">
      {/* Decorative blurred circles */}
      <div className="absolute top-10 left-10 w-72 h-72 bg-quicklend-200/30 rounded-full blur-3xl" />
      <div className="absolute bottom-10 right-10 w-96 h-96 bg-quicklend-100/40 rounded-full blur-3xl" />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-amber-100/20 rounded-full blur-3xl" />

      <div className="relative z-10 container mx-auto px-4">
        {/* Enhanced header */}
        <div className="text-center mb-16">
          <div className="inline-flex items-center gap-2 bg-quicklend-50 border border-quicklend-100 rounded-full px-4 py-2 mb-6">
            <span className="w-2 h-2 rounded-full bg-quicklend-600 animate-pulse"></span>
            <span className="text-quicklend-700 text-sm font-medium">Trusted by 1,000+ Businesses</span>
          </div>
          <h2 className="text-3xl md:text-5xl font-bold text-gray-900 mb-4">
            Why Choose <span className="text-quicklend-600">Quick Lenders</span>
          </h2>
          <p className="text-gray-600 max-w-2xl mx-auto text-lg">
            We combine speed, flexibility, and expertise to deliver the best financing experience for your business.
          </p>
        </div>

        {/* Cards grid */}
        <div ref={ref} className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {cards.map((card, index) => (
            <div
              key={card.title}
              className={`group relative bg-white rounded-3xl p-8 shadow-lg hover:shadow-2xl
                         transition-all duration-500 border border-gray-100
                         hover:border-quicklend-200 hover:-translate-y-2
                         scroll-animate ${visibleItems[index] ? 'visible' : ''}`}
            >
              {/* Top accent line */}
              <div className={`absolute top-0 left-8 right-8 h-1 bg-gradient-to-r ${card.accent} rounded-full
                              transform origin-left scale-x-0 group-hover:scale-x-100 transition-transform duration-500`}></div>

              {/* Icon with animated background */}
              <div className="relative mb-6">
                <div className={`w-16 h-16 rounded-2xl ${card.lightAccent} flex items-center justify-center
                                group-hover:scale-110 transition-transform duration-300`}>
                  <card.icon className={`w-8 h-8 bg-gradient-to-br ${card.accent} bg-clip-text text-transparent`}
                             style={{ stroke: 'url(#gradient)' }} />
                  <card.icon className="w-8 h-8 text-quicklend-600 absolute group-hover:text-quicklend-500 transition-colors" />
                </div>
                {/* Glow effect on hover */}
                <div className={`absolute inset-0 rounded-2xl bg-gradient-to-br ${card.accent} opacity-0
                                group-hover:opacity-20 blur-xl transition-opacity duration-300`}></div>
              </div>

              <h3 className="text-xl font-bold text-gray-900 mb-3 group-hover:text-quicklend-700 transition-colors">
                {card.title}
              </h3>
              <p className="text-gray-600 mb-6 leading-relaxed">{card.description}</p>

              {/* Bullet points with staggered animation */}
              <ul className="space-y-3 mb-6">
                {card.bullets.map((bullet, bulletIndex) => (
                  <li
                    key={bullet}
                    className="flex items-start gap-3 text-gray-700"
                    style={{ transitionDelay: `${bulletIndex * 50}ms` }}
                  >
                    <div className="w-5 h-5 rounded-full bg-gradient-to-br from-amber-400 to-amber-500
                                    flex items-center justify-center flex-shrink-0 mt-0.5 shadow-sm">
                      <Check className="w-3 h-3 text-white" />
                    </div>
                    <span className="text-sm">{bullet}</span>
                  </li>
                ))}
              </ul>

              {/* Learn more link */}
              <Link
                href="/get-started"
                className="inline-flex items-center gap-2 text-quicklend-600 font-medium text-sm
                           group-hover:text-quicklend-700 transition-colors"
              >
                Learn more
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </Link>
            </div>
          ))}
        </div>

        {/* Bottom CTA */}
        <div className="text-center mt-16">
          <Link
            href="/get-started"
            className="inline-flex items-center gap-3 bg-quicklend-600 hover:bg-quicklend-700
                       text-white font-semibold px-8 py-4 rounded-full transition-all duration-300
                       hover:shadow-lg hover:shadow-quicklend-600/25"
          >
            Start Your Application
            <ArrowRight className="w-5 h-5" />
          </Link>
        </div>
      </div>
    </section>
  );
};

export default TrustBannerSection;
