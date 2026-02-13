'use client'

import { useState } from 'react'
import Link from 'next/link'
import { ArrowRight, Info } from 'lucide-react'

// ────────────────────────────────────────────────────────────────────
// Data
// ────────────────────────────────────────────────────────────────────

interface RateData {
  product: string
  slug?: string
  minRate: number
  maxRate: number
  typicalRate: string
  minTerm: string
  maxTerm: string
  minAmount: string
  maxAmount: string
  approvalSpeed: string
  creditMin: string
  notes: string
}

const rateData: RateData[] = [
  {
    product: 'SBA 7(a) Loan',
    slug: undefined,
    minRate: 6,
    maxRate: 13,
    typicalRate: '8 - 11%',
    minTerm: '5 years',
    maxTerm: '25 years',
    minAmount: '$30,000',
    maxAmount: '$5,000,000',
    approvalSpeed: '2 - 8 weeks',
    creditMin: '680+',
    notes: 'Lowest rates for qualified borrowers. Government-guaranteed. More paperwork.',
  },
  {
    product: 'SBA 504 Loan',
    slug: undefined,
    minRate: 5,
    maxRate: 7,
    typicalRate: '5.5 - 6.5%',
    minTerm: '10 years',
    maxTerm: '25 years',
    minAmount: '$125,000',
    maxAmount: '$5,500,000',
    approvalSpeed: '4 - 10 weeks',
    creditMin: '680+',
    notes: 'For real estate and major equipment. Fixed rate through CDC portion.',
  },
  {
    product: 'Bank Term Loan',
    slug: 'term-loans',
    minRate: 7,
    maxRate: 15,
    typicalRate: '8 - 13%',
    minTerm: '1 year',
    maxTerm: '10 years',
    minAmount: '$50,000',
    maxAmount: '$10,000,000',
    approvalSpeed: '1 - 4 weeks',
    creditMin: '680+',
    notes: 'Traditional lending with competitive rates. Requires strong financials.',
  },
  {
    product: 'Online Term Loan',
    slug: 'term-loans',
    minRate: 10,
    maxRate: 30,
    typicalRate: '12 - 25%',
    minTerm: '6 months',
    maxTerm: '5 years',
    minAmount: '$10,000',
    maxAmount: '$500,000',
    approvalSpeed: '1 - 3 days',
    creditMin: '580+',
    notes: 'Fast approval, more flexible requirements. Higher rates than banks.',
  },
  {
    product: 'Business Line of Credit',
    slug: 'lines-of-credit',
    minRate: 8,
    maxRate: 25,
    typicalRate: '10 - 20%',
    minTerm: 'Revolving',
    maxTerm: 'Revolving',
    minAmount: '$10,000',
    maxAmount: '$1,000,000',
    approvalSpeed: '1 - 7 days',
    creditMin: '600+',
    notes: 'Draw funds as needed, pay interest only on what you use.',
  },
  {
    product: 'Equipment Financing',
    slug: 'equipment-financing',
    minRate: 7,
    maxRate: 20,
    typicalRate: '8 - 14%',
    minTerm: '1 year',
    maxTerm: '7 years',
    minAmount: '$10,000',
    maxAmount: '$5,000,000',
    approvalSpeed: '1 - 5 days',
    creditMin: '600+',
    notes: 'Equipment serves as collateral, lowering rates and easing approval.',
  },
  {
    product: 'Invoice Factoring',
    slug: undefined,
    minRate: 15,
    maxRate: 45,
    typicalRate: '1 - 3% per invoice',
    minTerm: 'Per invoice',
    maxTerm: 'Per invoice',
    minAmount: '$10,000',
    maxAmount: '$10,000,000',
    approvalSpeed: '2 - 5 days',
    creditMin: '500+',
    notes: 'Based on customer creditworthiness, not yours. B2B businesses.',
  },
  {
    product: 'Merchant Cash Advance',
    slug: undefined,
    minRate: 30,
    maxRate: 150,
    typicalRate: '1.2 - 1.5 factor',
    minTerm: '3 months',
    maxTerm: '18 months',
    minAmount: '$5,000',
    maxAmount: '$500,000',
    approvalSpeed: '1 - 2 days',
    creditMin: '500+',
    notes: 'Fastest to fund. Daily or weekly revenue holdback. Very expensive.',
  },
  {
    product: 'Asset-Based Lending',
    slug: 'asset-backed-loans',
    minRate: 8,
    maxRate: 18,
    typicalRate: '10 - 15%',
    minTerm: '1 year',
    maxTerm: '3 years',
    minAmount: '$100,000',
    maxAmount: '$50,000,000',
    approvalSpeed: '2 - 4 weeks',
    creditMin: '600+',
    notes: 'Loan amount based on asset value. Good for businesses with strong assets.',
  },
]

type SortKey = 'product' | 'rate' | 'speed' | 'credit'

// ────────────────────────────────────────────────────────────────────
// Main Component
// ────────────────────────────────────────────────────────────────────

export default function InterestRateComparisonTool() {
  const [sortBy, setSortBy] = useState<SortKey>('rate')
  const [highlightProduct, setHighlightProduct] = useState<string | null>(null)

  const sortedData = [...rateData].sort((a, b) => {
    if (sortBy === 'rate') return a.minRate - b.minRate
    if (sortBy === 'product') return a.product.localeCompare(b.product)
    if (sortBy === 'credit') return a.creditMin.localeCompare(b.creditMin)
    // speed: rough ordering
    const speedOrder = (s: string) => {
      if (s.includes('day')) return 1
      if (s.includes('week')) return 2
      return 3
    }
    return speedOrder(a.approvalSpeed) - speedOrder(b.approvalSpeed)
  })

  const maxRate = Math.max(...rateData.map((d) => d.maxRate))

  return (
    <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
      {/* Intro */}
      <div className="p-6 sm:p-8 lg:p-10 pb-0">
        <p className="text-gray-700 leading-relaxed mb-2">
          Compare typical interest rates, terms, and requirements across 9 business financing products. Rates shown are industry averages and vary by lender and borrower profile.
        </p>
        <p className="text-gray-500 text-sm mb-0">
          Hover or tap any row for details. Sort by rate, product name, approval speed, or credit requirement.
        </p>
      </div>

      {/* Sort Controls */}
      <div className="px-6 sm:px-8 lg:px-10 pt-6 pb-4">
        <div className="flex items-center gap-2">
          <span className="text-xs text-gray-500 font-medium">Sort by:</span>
          {([
            { key: 'rate' as SortKey, label: 'Lowest Rate' },
            { key: 'speed' as SortKey, label: 'Fastest Approval' },
            { key: 'credit' as SortKey, label: 'Credit Score' },
            { key: 'product' as SortKey, label: 'A-Z' },
          ]).map((opt) => (
            <button
              key={opt.key}
              onClick={() => setSortBy(opt.key)}
              className={`px-3 py-1.5 rounded-full text-xs font-medium border transition-colors ${
                sortBy === opt.key
                  ? 'bg-quicklend-600 text-white border-quicklend-600'
                  : 'bg-white text-gray-600 border-gray-200 hover:border-quicklend-300'
              }`}
            >
              {opt.label}
            </button>
          ))}
        </div>
      </div>

      {/* Visual Rate Chart */}
      <div className="px-6 sm:px-8 lg:px-10 pb-6">
        <h4 className="text-sm font-semibold text-gray-700 mb-3">Rate Ranges at a Glance</h4>
        <div className="space-y-2">
          {sortedData.map((d) => {
            const leftPct = (d.minRate / maxRate) * 100
            const widthPct = ((d.maxRate - d.minRate) / maxRate) * 100
            const isHighlighted = highlightProduct === d.product
            return (
              <div
                key={d.product}
                className={`flex items-center gap-3 p-2 rounded-lg transition-colors cursor-pointer ${
                  isHighlighted ? 'bg-quicklend-50' : 'hover:bg-gray-50'
                }`}
                onMouseEnter={() => setHighlightProduct(d.product)}
                onMouseLeave={() => setHighlightProduct(null)}
              >
                <span className="text-xs text-gray-700 font-medium w-36 shrink-0 truncate">{d.product}</span>
                <div className="flex-1 relative h-6">
                  <div className="absolute inset-0 bg-gray-100 rounded-full" />
                  <div
                    className={`absolute top-0 bottom-0 rounded-full flex items-center justify-center text-white text-xs font-medium transition-colors ${
                      d.minRate < 15 ? 'bg-green-500' : d.minRate < 25 ? 'bg-quicklend-500' : d.minRate < 40 ? 'bg-amber-500' : 'bg-red-500'
                    }`}
                    style={{
                      left: `${leftPct}%`,
                      width: `${Math.max(widthPct, 3)}%`,
                    }}
                  >
                    {widthPct > 8 ? `${d.minRate}-${d.maxRate}%` : ''}
                  </div>
                </div>
                <span className="text-xs text-gray-500 w-16 text-right shrink-0">{d.minRate}-{d.maxRate}%</span>
              </div>
            )
          })}
        </div>
        <div className="flex justify-between text-xs text-gray-400 mt-2 px-40">
          <span>0%</span>
          <span>{Math.round(maxRate / 2)}%</span>
          <span>{maxRate}%</span>
        </div>
      </div>

      {/* Detailed Comparison Table */}
      <div className="px-6 sm:px-8 lg:px-10 pb-8">
        <div className="overflow-x-auto -mx-6 sm:mx-0">
          <table className="w-full text-sm min-w-[700px]">
            <thead>
              <tr className="border-b border-gray-200">
                <th className="text-left px-4 py-2 text-gray-500 font-medium">Product</th>
                <th className="text-center px-4 py-2 text-gray-500 font-medium">Typical Rate</th>
                <th className="text-center px-4 py-2 text-gray-500 font-medium">Term Range</th>
                <th className="text-center px-4 py-2 text-gray-500 font-medium">Loan Amount</th>
                <th className="text-center px-4 py-2 text-gray-500 font-medium">Approval</th>
                <th className="text-center px-4 py-2 text-gray-500 font-medium">Credit Min</th>
              </tr>
            </thead>
            <tbody>
              {sortedData.map((d) => (
                <tr
                  key={d.product}
                  className={`border-b border-gray-100 transition-colors cursor-pointer ${
                    highlightProduct === d.product ? 'bg-quicklend-50' : 'hover:bg-gray-50'
                  }`}
                  onMouseEnter={() => setHighlightProduct(d.product)}
                  onMouseLeave={() => setHighlightProduct(null)}
                >
                  <td className="px-4 py-3">
                    <div>
                      {d.slug ? (
                        <Link href={`/business-loans/${d.slug}`} className="text-quicklend-600 font-medium hover:underline">
                          {d.product}
                        </Link>
                      ) : (
                        <span className="text-gray-900 font-medium">{d.product}</span>
                      )}
                      <p className="text-xs text-gray-400 mt-0.5">{d.notes}</p>
                    </div>
                  </td>
                  <td className="px-4 py-3 text-center">
                    <span className={`font-semibold ${
                      d.minRate < 15 ? 'text-green-600' : d.minRate < 25 ? 'text-quicklend-600' : d.minRate < 40 ? 'text-amber-600' : 'text-red-600'
                    }`}>
                      {d.typicalRate}
                    </span>
                  </td>
                  <td className="px-4 py-3 text-center text-gray-700">
                    {d.minTerm === d.maxTerm ? d.minTerm : `${d.minTerm} - ${d.maxTerm}`}
                  </td>
                  <td className="px-4 py-3 text-center text-gray-700">
                    {d.minAmount} - {d.maxAmount}
                  </td>
                  <td className="px-4 py-3 text-center text-gray-700">{d.approvalSpeed}</td>
                  <td className="px-4 py-3 text-center">
                    <span className={`text-xs font-semibold px-2 py-0.5 rounded-full ${
                      d.creditMin.startsWith('680') ? 'bg-green-100 text-green-700'
                        : d.creditMin.startsWith('600') ? 'bg-blue-100 text-blue-700'
                          : 'bg-amber-100 text-amber-700'
                    }`}>
                      {d.creditMin}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Disclaimer */}
      <div className="px-6 sm:px-8 lg:px-10 pb-6">
        <div className="flex items-start gap-2 text-xs text-gray-400">
          <Info className="h-3.5 w-3.5 mt-0.5 flex-shrink-0" />
          <p>
            Rates shown are industry averages and vary by lender, borrower qualifications, loan size, and market conditions. Actual rates may be higher or lower. Factor rates for MCAs are shown as APR equivalents for comparison.
          </p>
        </div>
      </div>

      {/* CTA */}
      <div className="px-6 sm:px-8 lg:px-10 pb-8">
        <div className="bg-quicklend-50 rounded-xl p-6 text-center">
          <p className="text-gray-700 mb-1 font-medium">
            Ready to see what rate you qualify for?
          </p>
          <p className="text-gray-500 text-sm mb-4">
            These are averages. Your actual rate depends on your business profile. Get a personalized quote with no impact to your credit score.
          </p>
          <div className="flex flex-col sm:flex-row gap-3 justify-center">
            <Link
              href="/get-started?source=rate-comparison&loan_type=not-sure"
              className="inline-flex items-center justify-center bg-quicklend-600 text-white font-semibold px-8 py-3 rounded-lg hover:bg-quicklend-700 transition-colors"
            >
              Check Your Rate <ArrowRight className="ml-2 h-4 w-4" />
            </Link>
            <Link
              href="/tools/loan-payment-calculator"
              className="inline-flex items-center justify-center border border-quicklend-300 text-quicklend-700 font-semibold px-6 py-3 rounded-lg hover:bg-quicklend-50 transition-colors text-sm"
            >
              Calculate Payments
            </Link>
          </div>
        </div>
      </div>
    </div>
  )
}
