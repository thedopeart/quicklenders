'use client'

import { useState, useMemo } from 'react'
import Link from 'next/link'
import {
  ChevronRight,
  ArrowRight,
  Info,
  CheckCircle,
  AlertTriangle,
  XCircle,
} from 'lucide-react'

// ────────────────────────────────────────────────────────────────────
// Helpers
// ────────────────────────────────────────────────────────────────────

function formatCurrency(value: number): string {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  }).format(value)
}

function parseCurrencyInput(value: string): number {
  return Number(value.replace(/[^0-9]/g, '')) || 0
}

function formatInputDisplay(value: number): string {
  if (value === 0) return ''
  return value.toLocaleString('en-US')
}

/** Reverse amortization: max principal given monthly payment, annual rate, and term in months */
function maxLoanAmount(monthlyPayment: number, annualRate: number, termMonths: number): number {
  if (monthlyPayment <= 0 || annualRate <= 0 || termMonths <= 0) return 0
  const r = annualRate / 100 / 12
  const n = termMonths
  return monthlyPayment * ((Math.pow(1 + r, n) - 1) / (r * Math.pow(1 + r, n)))
}

// ────────────────────────────────────────────────────────────────────
// Subcomponents
// ────────────────────────────────────────────────────────────────────

function CurrencyInput({
  label,
  value,
  onChange,
  helperText,
  max = 100000000,
  prefix = '$',
}: {
  label: string
  value: number
  onChange: (v: number) => void
  helperText?: string
  max?: number
  prefix?: string
}) {
  return (
    <div>
      <label className="block text-sm font-medium text-gray-700 mb-2">{label}</label>
      <div className="relative">
        <span className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500">{prefix}</span>
        <input
          type="text"
          inputMode="numeric"
          value={formatInputDisplay(value)}
          onChange={(e) => {
            const num = parseCurrencyInput(e.target.value)
            if (num >= 0 && num <= max) onChange(num)
          }}
          className="w-full rounded-lg border border-gray-300 px-4 py-3 pl-8 text-gray-900 focus:border-quicklend-600 focus:ring-2 focus:ring-quicklend-600/20 focus:outline-none transition-colors"
          placeholder="0"
        />
      </div>
      {helperText && (
        <p className="flex items-start gap-1.5 mt-2 text-xs text-gray-400">
          <Info className="h-3.5 w-3.5 mt-0.5 flex-shrink-0" />
          {helperText}
        </p>
      )}
    </div>
  )
}

// ────────────────────────────────────────────────────────────────────
// Main Component
// ────────────────────────────────────────────────────────────────────

const termOptions = [
  { value: 12, label: '1 year' },
  { value: 24, label: '2 years' },
  { value: 36, label: '3 years' },
  { value: 48, label: '4 years' },
  { value: 60, label: '5 years' },
  { value: 84, label: '7 years' },
  { value: 120, label: '10 years' },
]

const paymentPresets = [1000, 2500, 5000, 10000, 25000]

export default function LoanAffordabilityTool() {
  const [monthlyPayment, setMonthlyPayment] = useState(3000)
  const [annualRate, setAnnualRate] = useState(12)
  const [termMonths, setTermMonths] = useState(36)
  const [showRevenue, setShowRevenue] = useState(false)
  const [monthlyRevenue, setMonthlyRevenue] = useState(25000)

  const results = useMemo(() => {
    if (monthlyPayment <= 0 || annualRate <= 0 || termMonths <= 0) return null

    const principal = maxLoanAmount(monthlyPayment, annualRate, termMonths)
    const totalRepayment = monthlyPayment * termMonths
    const totalInterest = totalRepayment - principal
    const interestPercent = principal > 0 ? (totalInterest / principal) * 100 : 0

    // Term comparison
    const termComparison = termOptions.map((t) => {
      const p = maxLoanAmount(monthlyPayment, annualRate, t.value)
      const total = monthlyPayment * t.value
      return {
        label: t.label,
        months: t.value,
        maxLoan: p,
        totalInterest: total - p,
        totalCost: total,
        isSelected: t.value === termMonths,
      }
    })

    // Rate comparison
    const lowerRate = Math.max(3, annualRate - 5)
    const rateSteps = [
      lowerRate < annualRate ? lowerRate : Math.max(3, annualRate - 2),
      annualRate,
      Math.min(35, annualRate + 5),
    ]
    const rateComparison = rateSteps.map((rate) => ({
      rate,
      maxLoan: maxLoanAmount(monthlyPayment, rate, termMonths),
      isSelected: rate === annualRate,
    }))

    // Revenue check
    let revenueCheck = null
    if (showRevenue && monthlyRevenue > 0) {
      const ratio = (monthlyPayment / monthlyRevenue) * 100
      let status: 'conservative' | 'comfortable' | 'high' | 'strained'
      let message: string
      if (ratio < 5) {
        status = 'conservative'
        message = 'Very conservative. You may be able to afford a larger payment.'
      } else if (ratio <= 15) {
        status = 'comfortable'
        message = 'Within the typical comfortable range for most businesses.'
      } else if (ratio <= 25) {
        status = 'high'
        message = 'Higher than average. Make sure you have cash reserves for slower months.'
      } else {
        status = 'strained'
        message = 'This may strain your cash flow. Consider a smaller payment or longer term.'
      }
      revenueCheck = { ratio, status, message }
    }

    return {
      principal,
      totalRepayment,
      totalInterest,
      interestPercent,
      termComparison,
      rateComparison,
      revenueCheck,
    }
  }, [monthlyPayment, annualRate, termMonths, showRevenue, monthlyRevenue])

  return (
    <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
      {/* Intro */}
      <div className="p-6 sm:p-8 lg:p-10 pb-0">
        <p className="text-gray-700 leading-relaxed mb-2">
          Enter what your business can comfortably pay each month to see how much you could borrow. Adjust the rate and term to compare scenarios.
        </p>
        <p className="text-gray-500 text-sm mb-0">
          All results update in real time as you move the sliders or type new values.
        </p>
      </div>

      {/* Inputs */}
      <div className="p-6 sm:p-8 lg:p-10">
        <div className="space-y-6">
          {/* Monthly Payment */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Monthly Payment Budget</label>
            <div className="relative">
              <span className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500">$</span>
              <input
                type="text"
                inputMode="numeric"
                value={formatInputDisplay(monthlyPayment)}
                onChange={(e) => {
                  const num = parseCurrencyInput(e.target.value)
                  if (num >= 0 && num <= 500000) setMonthlyPayment(num)
                }}
                className="w-full rounded-lg border border-gray-300 px-4 py-3 pl-8 text-gray-900 focus:border-quicklend-600 focus:ring-2 focus:ring-quicklend-600/20 focus:outline-none transition-colors"
                placeholder="0"
              />
            </div>
            <input
              type="range"
              min={100}
              max={50000}
              step={100}
              value={monthlyPayment}
              onChange={(e) => setMonthlyPayment(Number(e.target.value))}
              className="w-full mt-3 accent-quicklend-600"
            />
            <div className="flex justify-between text-xs text-gray-400 mt-1">
              <span>$100</span>
              <span>$50,000</span>
            </div>
            {/* Presets */}
            <div className="flex flex-wrap gap-2 mt-3">
              {paymentPresets.map((preset) => (
                <button
                  key={preset}
                  onClick={() => setMonthlyPayment(preset)}
                  className={`px-3 py-1.5 rounded-full text-xs font-medium border transition-colors ${
                    monthlyPayment === preset
                      ? 'bg-quicklend-600 text-white border-quicklend-600'
                      : 'bg-white text-gray-600 border-gray-200 hover:border-quicklend-300'
                  }`}
                >
                  {formatCurrency(preset)}
                </button>
              ))}
            </div>
            <p className="flex items-start gap-1.5 mt-2 text-xs text-gray-400">
              <Info className="h-3.5 w-3.5 mt-0.5 flex-shrink-0" />
              What can your business comfortably pay each month toward a loan?
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-6">
            {/* Interest Rate */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Expected Interest Rate: <span className="text-quicklend-600 font-bold">{annualRate}%</span>
              </label>
              <input
                type="range"
                min={3}
                max={35}
                step={0.5}
                value={annualRate}
                onChange={(e) => setAnnualRate(Number(e.target.value))}
                className="w-full accent-quicklend-600"
              />
              <div className="flex justify-between text-xs text-gray-400 mt-1">
                <span>3%</span>
                <span>35%</span>
              </div>
              <p className="text-xs text-gray-400 mt-2">
                Online lenders: 10-35% | Banks: 7-15% | SBA: 6-10%
              </p>
            </div>

            {/* Term */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Loan Term</label>
              <select
                value={termMonths}
                onChange={(e) => setTermMonths(Number(e.target.value))}
                className="w-full rounded-lg border border-gray-300 px-4 py-3 text-gray-900 focus:border-quicklend-600 focus:ring-2 focus:ring-quicklend-600/20 focus:outline-none transition-colors"
              >
                {termOptions.map((opt) => (
                  <option key={opt.value} value={opt.value}>{opt.label}</option>
                ))}
              </select>
              <p className="text-xs text-gray-400 mt-2">
                Longer terms = larger loan amount, but more total interest
              </p>
            </div>
          </div>

          {/* Revenue Toggle */}
          <div>
            <button
              onClick={() => setShowRevenue(!showRevenue)}
              className="inline-flex items-center text-sm text-quicklend-600 font-medium hover:text-quicklend-700 transition-colors"
            >
              <ChevronRight className={`h-4 w-4 mr-1 transition-transform ${showRevenue ? 'rotate-90' : ''}`} />
              {showRevenue ? 'Hide' : 'Add'} revenue for cash flow check
            </button>
            {showRevenue && (
              <div className="mt-4">
                <CurrencyInput
                  label="Monthly Revenue"
                  value={monthlyRevenue}
                  onChange={setMonthlyRevenue}
                  helperText="Your average monthly gross revenue. Used to check if your payment fits your cash flow."
                  max={100000000}
                />
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Results */}
      {results && results.principal > 0 && (
        <div className="border-t border-gray-100">
          {/* Primary Result */}
          <div className="p-6 sm:p-8 lg:p-10 text-center">
            <p className="text-sm text-gray-600 mb-2">Based on your budget, you could borrow up to</p>
            <div className="inline-block bg-quicklend-50 border border-quicklend-200 rounded-2xl px-10 py-6 mb-4">
              <p className="text-5xl font-bold text-quicklend-900">
                {formatCurrency(results.principal)}
              </p>
              <p className="text-sm text-quicklend-700 mt-1">
                with a {formatCurrency(monthlyPayment)}/mo payment at {annualRate}% over {termOptions.find((t) => t.value === termMonths)?.label}
              </p>
            </div>
          </div>

          {/* Key Metrics */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 px-6 sm:px-8 lg:px-10 pb-8">
            <div className="bg-gray-50 rounded-xl p-5 text-center">
              <p className="text-sm text-gray-600 mb-1">Total Repayment</p>
              <p className="text-xl font-bold text-quicklend-900">{formatCurrency(results.totalRepayment)}</p>
            </div>
            <div className="bg-gray-50 rounded-xl p-5 text-center">
              <p className="text-sm text-gray-600 mb-1">Total Interest</p>
              <p className="text-xl font-bold text-quicklend-900">{formatCurrency(results.totalInterest)}</p>
            </div>
            <div className="bg-gray-50 rounded-xl p-5 text-center">
              <p className="text-sm text-gray-600 mb-1">Interest as % of Loan</p>
              <p className="text-xl font-bold text-quicklend-900">{results.interestPercent.toFixed(1)}%</p>
            </div>
          </div>

          {/* Revenue Check */}
          {results.revenueCheck && (
            <div className="px-6 sm:px-8 lg:px-10 pb-8">
              <div className={`rounded-xl p-6 border ${
                results.revenueCheck.status === 'comfortable'
                  ? 'bg-green-50 border-green-200'
                  : results.revenueCheck.status === 'conservative'
                    ? 'bg-blue-50 border-blue-200'
                    : results.revenueCheck.status === 'high'
                      ? 'bg-yellow-50 border-yellow-200'
                      : 'bg-red-50 border-red-200'
              }`}>
                <div className="flex items-start gap-3">
                  {results.revenueCheck.status === 'comfortable' || results.revenueCheck.status === 'conservative' ? (
                    <CheckCircle className="h-5 w-5 text-green-600 mt-0.5 flex-shrink-0" />
                  ) : results.revenueCheck.status === 'high' ? (
                    <AlertTriangle className="h-5 w-5 text-yellow-600 mt-0.5 flex-shrink-0" />
                  ) : (
                    <XCircle className="h-5 w-5 text-red-600 mt-0.5 flex-shrink-0" />
                  )}
                  <div>
                    <p className="font-semibold text-quicklend-900 mb-1">
                      Cash Flow Check: {results.revenueCheck.ratio.toFixed(1)}% of Revenue
                    </p>
                    <p className="text-gray-700 text-sm">{results.revenueCheck.message}</p>
                    <div className="flex items-center gap-4 mt-3 text-xs text-gray-500">
                      <span>Revenue: {formatCurrency(monthlyRevenue)}/mo</span>
                      <span>Payment: {formatCurrency(monthlyPayment)}/mo</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Term Comparison */}
          <div className="px-6 sm:px-8 lg:px-10 pb-8">
            <details className="group">
              <summary className="cursor-pointer text-sm font-semibold text-gray-600 hover:text-gray-900 flex items-center gap-2">
                <ChevronRight className="h-4 w-4 group-open:rotate-90 transition-transform" />
                How Loan Term Affects Your Max Loan
              </summary>
              <div className="mt-4 bg-gray-50 rounded-xl overflow-hidden">
                <table className="w-full text-sm">
                  <thead>
                    <tr className="border-b border-gray-200">
                      <th className="text-left px-4 py-3 font-semibold text-gray-700">Term</th>
                      <th className="text-right px-4 py-3 font-semibold text-gray-700">Max Loan</th>
                      <th className="text-right px-4 py-3 font-semibold text-gray-700 hidden sm:table-cell">Total Interest</th>
                      <th className="text-right px-4 py-3 font-semibold text-gray-700 hidden sm:table-cell">Total Cost</th>
                    </tr>
                  </thead>
                  <tbody>
                    {results.termComparison.map((row) => (
                      <tr
                        key={row.months}
                        className={`border-b border-gray-100 last:border-0 ${row.isSelected ? 'bg-quicklend-50' : ''}`}
                      >
                        <td className="px-4 py-3 text-gray-700">
                          {row.label}
                          {row.isSelected && <span className="ml-2 text-xs text-quicklend-600 font-medium">Selected</span>}
                        </td>
                        <td className="px-4 py-3 text-right font-bold text-quicklend-900">{formatCurrency(row.maxLoan)}</td>
                        <td className="px-4 py-3 text-right text-gray-500 hidden sm:table-cell">{formatCurrency(row.totalInterest)}</td>
                        <td className="px-4 py-3 text-right text-gray-500 hidden sm:table-cell">{formatCurrency(row.totalCost)}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
              <p className="text-xs text-gray-400 mt-2">
                Longer terms let you borrow more, but cost more in total interest.
              </p>
            </details>
          </div>

          {/* Rate Comparison */}
          <div className="px-6 sm:px-8 lg:px-10 pb-8">
            <details className="group">
              <summary className="cursor-pointer text-sm font-semibold text-gray-600 hover:text-gray-900 flex items-center gap-2">
                <ChevronRight className="h-4 w-4 group-open:rotate-90 transition-transform" />
                How Interest Rate Affects Your Borrowing Power
              </summary>
              <div className="mt-4 space-y-3">
                {results.rateComparison.map((row) => (
                  <div
                    key={row.rate}
                    className={`flex items-center justify-between rounded-lg px-4 py-3 ${
                      row.isSelected ? 'bg-quicklend-50 border border-quicklend-200' : 'bg-gray-50'
                    }`}
                  >
                    <div className="text-sm text-gray-700">
                      {row.isSelected ? (
                        <span className="font-medium">At your estimated {row.rate}%</span>
                      ) : row.rate < annualRate ? (
                        <span>If you qualify for {row.rate}%</span>
                      ) : (
                        <span>If rates are {row.rate}%</span>
                      )}
                    </div>
                    <span className={`font-bold ${row.isSelected ? 'text-quicklend-900' : 'text-gray-700'}`}>
                      {formatCurrency(row.maxLoan)}
                    </span>
                  </div>
                ))}
              </div>
              <p className="text-xs text-gray-400 mt-2">
                Better credit typically qualifies you for lower rates, which means more borrowing power.
              </p>
            </details>
          </div>

          {/* CTA */}
          <div className="px-6 sm:px-8 lg:px-10 pb-8">
            <div className="bg-quicklend-50 rounded-xl p-6 text-center">
              <p className="text-gray-700 mb-1 font-medium">
                See if you qualify for up to {formatCurrency(results.principal)}
              </p>
              <p className="text-gray-500 text-sm mb-4">
                No impact to your credit score.
              </p>
              <Link
                href={`/get-started?source=affordability-calculator&amount=${Math.round(results.principal)}`}
                className="inline-flex items-center bg-quicklend-600 text-white font-semibold px-8 py-3 rounded-lg hover:bg-quicklend-700 transition-colors"
              >
                Check Your Options <ArrowRight className="ml-2 h-4 w-4" />
              </Link>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
