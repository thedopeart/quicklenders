'use client';

import { Star, Quote } from 'lucide-react';
import { useStaggeredScrollAnimation } from '@/hooks/useScrollAnimation';

const testimonials = [
  {
    name: 'Sarah Johnson',
    business: 'Johnson Retail Group',
    text: 'Quick Lenders made it possible for us to open our **second location** ahead of schedule. The application process was seamless and the funding was incredibly fast.',
  },
  {
    name: 'Michael Rodriguez',
    business: 'Rodriguez Construction',
    text: 'The **equipment financing** program was exactly what we needed. We upgraded our entire fleet without straining our cash flow. Highly recommend their services.',
  },
  {
    name: 'Jennifer Lee',
    business: "Lee's Bakery",
    text: 'A **working capital loan** from Quick Lenders helped us survive the slow season and come back stronger than ever. Their team truly cares about small businesses.',
  },
];

function renderText(text: string) {
  const parts = text.split(/\*\*(.*?)\*\*/g);
  return parts.map((part, i) =>
    i % 2 === 1 ? <strong key={i}>{part}</strong> : <span key={i}>{part}</span>
  );
}

const TestimonialsSection = () => {
  const { ref, visibleItems } = useStaggeredScrollAnimation(testimonials.length);

  return (
    <section className="py-24 bg-white">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            What Our Clients Say
          </h2>
          <p className="text-gray-600 max-w-2xl mx-auto text-lg">
            Hear from business owners who have partnered with Quick Lenders to achieve their goals.
          </p>
        </div>

        <div ref={ref} className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {testimonials.map((t, index) => (
            <div
              key={t.name}
              className={`bg-white border border-gray-200 rounded-2xl p-8 shadow-sm hover:shadow-md transition-shadow scroll-animate ${visibleItems[index] ? 'visible' : ''}`}
            >
              {/* Stars */}
              <div className="flex gap-1 mb-4">
                {Array.from({ length: 5 }).map((_, i) => (
                  <Star key={i} className="w-5 h-5 fill-yellow-400 text-yellow-400" />
                ))}
              </div>

              {/* Quote icon */}
              <Quote className="w-8 h-8 text-quicklend-200 mb-3" />

              {/* Text */}
              <p className="text-gray-700 leading-relaxed mb-6">
                {renderText(t.text)}
              </p>

              {/* Divider */}
              <div className="border-t border-gray-100 pt-5 flex items-center gap-4">
                {/* Avatar placeholder */}
                <div className="w-12 h-12 rounded-full bg-gray-200 flex-shrink-0" />
                <div>
                  <p className="font-semibold text-gray-900">{t.name}</p>
                  <p className="text-sm text-gray-500">{t.business}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default TestimonialsSection;
