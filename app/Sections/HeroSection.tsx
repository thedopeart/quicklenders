'use client';

import { useState } from 'react';
import Link from 'next/link';
import { Search, Shield, Clock, DollarSign, Users } from 'lucide-react';

const trustStats = [
  { icon: DollarSign, value: '$500M+', label: 'Total Funded' },
  { icon: Clock, value: '24hr', label: 'Avg. Approval' },
  { icon: Users, value: '1,000+', label: 'Businesses Helped' },
];

const HeroSection = () => {
  const [searchQuery, setSearchQuery] = useState('');

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    console.log('Searching for:', searchQuery);
  };

  return (
    <div className="relative bg-quicklend-600 text-white overflow-hidden">
      {/* Enhanced gradient overlay */}
      <div className="absolute inset-0 bg-gradient-to-br from-quicklend-950/95 via-quicklend-900/90 to-quicklend-800/85 z-10"></div>

      {/* Floating animated orbs */}
      <div className="absolute top-20 left-10 w-32 h-32 bg-amber-500/20 rounded-full blur-2xl animate-float z-0"></div>
      <div className="absolute bottom-40 right-20 w-48 h-48 bg-quicklend-400/15 rounded-full blur-3xl animate-float-delayed z-0"></div>
      <div className="absolute top-1/2 left-1/4 w-24 h-24 bg-white/5 rounded-full blur-xl animate-float z-0"></div>
      <div className="absolute top-32 right-1/3 w-20 h-20 bg-amber-400/10 rounded-full blur-2xl animate-float-delayed z-0"></div>

      <div className="relative z-20 container mx-auto px-4 pt-28 md:pt-36 pb-16 md:pb-24 flex flex-col items-center justify-center">
        <div className="max-w-4xl mx-auto text-center">
          {/* Gradient heading */}
          <h1 className="text-5xl md:text-7xl font-bold text-center mb-4 leading-tight animate-fade-in">
            <span className="bg-clip-text text-transparent bg-gradient-to-r from-white via-white to-amber-200">
              Quick Lenders
            </span>
          </h1>

          {/* Animated underline accent */}
          <div className="mx-auto w-24 h-1 bg-gradient-to-r from-transparent via-amber-500 to-transparent mb-6 animate-pulse"></div>

          <p className="text-2xl md:text-3xl text-center mb-4 max-w-3xl mx-auto leading-relaxed animate-on-load animate-slide-up animate-delay-200">
            Business Financing up to $20M with Fast Decisions
          </p>
          <p className="text-xl md:text-2xl text-center mb-8 max-w-3xl mx-auto leading-relaxed text-gray-200 animate-on-load animate-slide-up animate-delay-300">
            Tailored financial solutions to help your business grow and thrive
          </p>

          {/* Premium CTA buttons */}
          <div className="flex flex-col sm:flex-row justify-center gap-4 mb-8 animate-on-load animate-slide-up animate-delay-400">
            {/* Primary CTA with glow and shine */}
            <Link
              href="/get-started"
              className="relative overflow-hidden bg-gradient-to-r from-amber-500 to-amber-400
                         hover:from-amber-400 hover:to-amber-300
                         transform hover:scale-105 hover:shadow-[0_0_30px_rgba(251,191,36,0.4)]
                         transition-all duration-300 text-lg py-4 px-10 rounded-full font-semibold
                         text-quicklend-950 group"
            >
              <span className="relative z-10">Apply in Minutes</span>
              <div className="absolute inset-0 bg-white/20 translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-500 skew-x-12"></div>
            </Link>

            {/* Secondary CTA with glass effect */}
            <Link
              href="/get-started"
              className="border-2 border-white/30 text-white bg-white/5 backdrop-blur-sm
                         hover:bg-white/15 hover:border-white/50
                         transform hover:scale-105 transition-all duration-300
                         text-lg py-4 px-10 rounded-full font-medium"
            >
              Check My Eligibility
            </Link>
          </div>

          {/* Glass morphism search bar */}
          <form onSubmit={handleSearch} className="relative max-w-3xl mx-auto mb-10 animate-on-load animate-slide-up animate-delay-500">
            <div className="relative flex items-center bg-white/10 backdrop-blur-md rounded-full border border-white/20 p-2 shadow-2xl">
              <input
                type="text"
                placeholder="What type of funding are you looking for?"
                className="pl-12 pr-4 py-4 bg-white rounded-full w-full text-lg text-gray-800
                           border-2 border-transparent focus:border-amber-400
                           focus:ring-4 focus:ring-amber-400/20 outline-none transition-all"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
              <Search className="absolute left-6 text-gray-400 h-6 w-6" />
              <button
                type="submit"
                className="absolute right-4 bg-quicklend-600 hover:bg-quicklend-500
                           rounded-full h-12 px-8 text-white font-medium
                           shadow-lg hover:shadow-xl transition-all"
              >
                Search
              </button>
            </div>
          </form>
        </div>

        {/* Enhanced trust badges with glass cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 max-w-4xl mx-auto animate-on-load animate-slide-up animate-delay-600">
          {trustStats.map((stat) => (
            <div
              key={stat.label}
              className="bg-white/10 backdrop-blur-md border border-white/20
                         rounded-2xl px-6 py-4 flex items-center gap-4
                         hover:bg-white/20 transition-all duration-300 group"
            >
              <div className="w-12 h-12 rounded-full bg-gradient-to-br from-amber-400 to-amber-500
                              flex items-center justify-center group-hover:scale-110 transition-transform shadow-lg">
                <stat.icon className="w-6 h-6 text-quicklend-950" />
              </div>
              <div>
                <p className="text-2xl font-bold text-white">{stat.value}</p>
                <p className="text-sm text-white/70">{stat.label}</p>
              </div>
            </div>
          ))}
        </div>

        {/* Security badge */}
        <div className="mt-8 flex items-center gap-2 text-white/60 text-sm animate-on-load animate-slide-up animate-delay-600">
          <Shield className="w-4 h-4" />
          <span>256-bit SSL Encrypted | No Credit Impact to Check Eligibility</span>
        </div>
      </div>
    </div>
  );
};

export default HeroSection;
