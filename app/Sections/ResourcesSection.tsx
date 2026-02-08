'use client';

import { useState } from 'react';
import Link from 'next/link';
import {
  Landmark,
  BarChart3,
  LifeBuoy,
  Rocket,
  Cpu,
  BookOpen,
  ArrowRight,
  Phone,
} from 'lucide-react';
import { useStaggeredScrollAnimation, useScrollAnimation } from '@/hooks/useScrollAnimation';

const resources = [
  {
    icon: Landmark,
    title: 'First-Time Business Loans',
    description: 'Everything you need to know about securing financing for your small business.',
    gradient: 'from-blue-500 to-blue-600',
    href: '/financial-insights/first-time-business-loans',
  },
  {
    icon: BarChart3,
    title: 'Credit Improvement',
    description: 'Tips and strategies for improving your credit score to qualify for better rates.',
    gradient: 'from-green-500 to-green-600',
    href: '/financial-insights/how-to-improve-credit-fast',
  },
  {
    icon: LifeBuoy,
    title: 'Short-Term Financing',
    description: 'How to access quick funding when your business needs capital fast.',
    gradient: 'from-purple-500 to-purple-600',
    href: '/financial-insights/short-term-business-financing',
  },
  {
    icon: Rocket,
    title: 'Startup Financing',
    description: 'Explore funding options including pre-seed, VC, and startup loans.',
    gradient: 'from-orange-500 to-orange-600',
    href: '/financial-insights/pre-seed-funding',
  },
  {
    icon: Cpu,
    title: 'Equipment Financing',
    description: 'Learn how to finance machinery, vehicles, and technology for your business.',
    gradient: 'from-red-500 to-red-600',
    href: '/financial-insights/small-business-equipment-financing',
  },
  {
    icon: BookOpen,
    title: 'Secured vs Unsecured',
    description: 'Compare loan types to find the best financing option for your needs.',
    gradient: 'from-teal-500 to-teal-600',
    href: '/financial-insights/secured-vs-unsecured-loans-which-is-better',
  },
];

const ResourcesSection = () => {
  const [form, setForm] = useState({ firstName: '', lastName: '', email: '', phone: '' });
  const { ref: resourcesRef, visibleItems } = useStaggeredScrollAnimation(resources.length);
  const ctaAnimation = useScrollAnimation();

  return (
    <section className="bg-quicklend-900">
      {/* Resources Grid */}
      <div className="py-20">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <span className="text-xs font-bold tracking-widest text-amber-500 uppercase mb-3 block">
              Educational Resources
            </span>
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
              Financial Insights & Guides
            </h2>
            <p className="text-quicklend-200 max-w-2xl mx-auto">
              Expert knowledge to help you make informed financing decisions for your business.
            </p>
          </div>

          <div ref={resourcesRef} className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-7xl mx-auto mb-10">
            {resources.map((resource, index) => (
              <Link
                key={resource.title}
                href={resource.href}
                className={`bg-white/10 backdrop-blur-sm rounded-xl p-6 hover:bg-white/15 transition-all border border-white/10 flex flex-col scroll-animate group ${visibleItems[index] ? 'visible' : ''}`}
              >
                <div className={`w-12 h-12 rounded-xl bg-gradient-to-br ${resource.gradient} flex items-center justify-center mb-4 group-hover:scale-110 transition-transform shadow-lg`}>
                  <resource.icon className="w-6 h-6 text-white" />
                </div>
                <h3 className="text-lg font-bold text-white mb-2 group-hover:text-amber-400 transition-colors">{resource.title}</h3>
                <p className="text-quicklend-200 text-sm mb-5 flex-1">{resource.description}</p>
                <div className="text-amber-500 font-semibold text-sm flex items-center gap-1 group-hover:gap-2 transition-all">
                  Read Article <ArrowRight className="w-4 h-4" />
                </div>
              </Link>
            ))}
          </div>

          <div className="text-center">
            <Link
              href="/financial-insights"
              className="inline-block px-8 py-3.5 bg-amber-500 text-quicklend-900 font-semibold rounded-lg hover:bg-amber-400 transition-colors"
            >
              Explore All Financial Resources
            </Link>
          </div>
        </div>
      </div>

      {/* CTA Banner */}
      <div className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <div ref={ctaAnimation.ref} className={`bg-gradient-to-r from-quicklend-800 to-quicklend-900 rounded-2xl overflow-hidden scroll-animate shadow-2xl max-w-7xl mx-auto ${ctaAnimation.isVisible ? 'visible' : ''}`}>
            <div className="grid grid-cols-1 lg:grid-cols-2">
              {/* Left Side */}
              <div className="p-8 md:p-12 flex flex-col justify-center">
                <span className="inline-block self-start bg-amber-500 text-quicklend-900 text-xs font-bold uppercase tracking-widest rounded-full px-4 py-1.5 mb-5">
                  Limited Time Offer
                </span>
                <h3 className="text-2xl md:text-3xl font-bold text-white mb-4">
                  Ready to Grow Your Business?
                </h3>
                <p className="text-quicklend-200 mb-6">
                  Get pre-qualified in minutes with no impact to your credit score. Our team is ready to help you find the perfect financing solution.
                </p>
                <Link
                  href="/contact"
                  className="inline-flex items-center gap-2 self-start border-2 border-white/30 text-white font-semibold rounded-lg px-5 py-2.5 hover:bg-white/10 transition-colors"
                >
                  <Phone className="w-4 h-4" />
                  Speak to an Advisor
                </Link>
              </div>

              {/* Right Side - Form */}
              <div className="bg-white p-8 md:p-12">
                <h4 className="text-xl font-bold text-quicklend-900 mb-5">Start Your Application</h4>
                <div className="space-y-3">
                  <div className="grid grid-cols-2 gap-3">
                    <input
                      type="text"
                      placeholder="First Name"
                      value={form.firstName}
                      onChange={(e) => setForm({ ...form, firstName: e.target.value })}
                      className="w-full px-4 py-3 border border-gray-200 rounded-lg outline-none focus:border-quicklend-600 focus:ring-2 focus:ring-quicklend-100 transition-all text-sm"
                    />
                    <input
                      type="text"
                      placeholder="Last Name"
                      value={form.lastName}
                      onChange={(e) => setForm({ ...form, lastName: e.target.value })}
                      className="w-full px-4 py-3 border border-gray-200 rounded-lg outline-none focus:border-quicklend-600 focus:ring-2 focus:ring-quicklend-100 transition-all text-sm"
                    />
                  </div>
                  <input
                    type="email"
                    placeholder="Email Address"
                    value={form.email}
                    onChange={(e) => setForm({ ...form, email: e.target.value })}
                    className="w-full px-4 py-3 border border-gray-200 rounded-lg outline-none focus:border-quicklend-600 focus:ring-2 focus:ring-quicklend-100 transition-all text-sm"
                  />
                  <input
                    type="tel"
                    placeholder="Phone Number"
                    value={form.phone}
                    onChange={(e) => setForm({ ...form, phone: e.target.value })}
                    className="w-full px-4 py-3 border border-gray-200 rounded-lg outline-none focus:border-quicklend-600 focus:ring-2 focus:ring-quicklend-100 transition-all text-sm"
                  />
                  <button className="w-full py-3 bg-quicklend-600 text-white font-semibold rounded-lg hover:bg-quicklend-700 transition-colors mt-2">
                    Continue Application
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ResourcesSection;
