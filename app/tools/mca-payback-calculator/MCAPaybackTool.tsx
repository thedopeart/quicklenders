'use client'

import { useState, useMemo } from 'react'
import Link from 'next/link'
import {
  ArrowRight,
  DollarSign,
  Clock,
  Percent,
  AlertTriangle,
  CheckCircle,
  Info,
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

// ────────────────────────────────────────────────────────────────────
// Cost Tier
// ────────────────────────────────────────────────────────────────────

type CostTier = 'reasonable' | 'moderate' | 'expensive' | 'very-expensive'

function getCostTier(estimatedAPR: number): {
  tier: CostTier
  label: string
  color: string
  bgColor: string
  borderColor: string
  message: string
} {
  if (estimatedAPR < 30)
    return {
      tier: 'reasonable',
      label: 'Below-Average MCA Cost',
      color: 'text-green-700',
      bgColor: 'bg-green-50',
      borderColor: 'border-green-200',
      message: 'This MCA has a relatively low cost compared to the market. Still, compare it against a term loan to see if you can do better.',
    }
  if (estimatedAPR < 60)
    return {
      tier: 'moderate',
      label: 'Typical MCA Cost',
      color: 'text-blue-700',
      bgColor: 'bg-blue-50',
      borderColor: 'border-blue-200',
      message: 'This cost is in the typical range for merchant cash advances. Make sure your revenue can comfortably support the daily payments.',
    }
  if (estimatedAPR < 100)
    return {
      tier: 'expensive',
      label: 'High Cost MCA',
      color: 'text-amber-700',
      bgColor: 'bg-amber-50',
      borderColor: 'border-amber-200',
      message: 'This is an expensive advance. The effective APR is significantly higher than most business loans. Consider alternatives.',
    }
  return {
    tier: 'very-expensive',
    label: 'Very High Cost MCA',
    color: 'text-red-700',
    bgColor: 'bg-red-50',
    borderColor: 'border-red-200',
    message: 'This advance is extremely expensive. Explore term loans, lines of credit, or SBA loans before committing.',
  }
}

// ────────────────────────────────────────────────────────────────────
// Constants
// ────────────────────────────────────────────────────────────────────

const advancePresets = [25000, 50000, 100000, 200000, 500000]

// ────────────────────────────────────────────────────────────────────
// Currency Input
// ────────────────────────────────────────────────────────────────────

function CurrencyInput({
  label,
  value,
  onChange,
  max = 10000000,
  hint,
}: {
  label: string
  value: number
  onChange: (v: number) => void
  max?: number
  hint?: string
}) {
  return (
    <div>
      <label className="block text-sm font-medium text-gray-700 mb-2">{label}</label>
      <div className="relative">
        <span className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500">$</span>
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
      {hint && <p className="text-xs text-gray-400 mt-1.5">{hint}</p>}
    </div>
  )
}

// ────────────────────────────────────────────────────────────────────
// Main Component
// ────────────────────────────────────────────────────────────────────

export default function MCAPaybackTool() {
  const [advanceAmount, setAdvanceAmount] = useState(100000)
  const [factorRate, setFactorRate] = useState(1.30)
  const [holdbackPct, setHoldbackPct] = useState(15)
  const [paymentFreq, setPaymentFreq] = useState<'daily' | 'weekly'>('daily')
  const [dailyRevenue, setDailyRevenue] = useState(5000)

  // ── Calculations ──────────────────────────────────────────────────

  const results = useMemo(() => {
    if (advanceAmount <= 0 || dailyRevenue <= 0) return null
    const clampedFactor = Math.max(1.0, factorRate)

    const totalRepayment = advanceAmount * clampedFactor
    const totalCost = totalRepayment - advanceAmount
    const costPerDollar = totalCost / advanceAmount

    // Daily holdback
    const dailyHoldback = dailyRevenue * (holdbackPct / 100)

    // Payment amounts by frequency
    let paymentAmount: number
    let paymentsPerWeek: number
    if (paymentFreq === 'daily') {
      paymentAmount = dailyHoldback
      paymentsPerWeek = 5 // business days
    } else {
      paymentAmount = dailyHoldback * 5 // weekly = 5 business days
      paymentsPerWeek = 1
    }

    if (paymentAmount <= 0) return null

    // Number of payments and payback timeline
    const totalPayments = Math.ceil(totalRepayment / paymentAmount)
    const businessDaysToPayoff = paymentFreq === 'daily' ? totalPayments : totalPayments * 5
    const weeksToPayoff = Math.ceil(businessDaysToPayoff / 5)
    const monthsToPayoff = weeksToPayoff / 4.33

    // Estimated APR (simple approximation for MCA)
    // APR = (Total Cost / Advance Amount) / (payoff period in years) * 100
    const yearsToPayoff = monthsToPayoff / 12
    const estimatedAPR = yearsToPayoff > 0 ? (totalCost / advanceAmount / yearsToPayoff) * 100 : 0

    // Revenue impact
    const dailyRevenueAfterHoldback = dailyRevenue - dailyHoldback
    const monthlyRevenue = dailyRevenue * 21.67 // avg business days per month
    const monthlyHoldback = dailyHoldback * 21.67
    const monthlyRevenueAfter = monthlyRevenue - monthlyHoldback
    const holdbackRatio = monthlyHoldback / monthlyRevenue

    // Comparison: equivalent term loan (what a term loan would cost for same amount)
    const termLoanRate = 12 // typical business term loan rate
    const termLoanMonths = Math.round(monthsToPayoff)
    const termLoanPayment = termLoanMonths > 0
      ? (advanceAmount * (termLoanRate / 100 / 12) * Math.pow(1 + termLoanRate / 100 / 12, termLoanMonths)) /
        (Math.pow(1 + termLoanRate / 100 / 12, termLoanMonths) - 1)
      : 0
    const termLoanTotal = termLoanPayment * termLoanMonths
    const termLoanCost = termLoanTotal - advanceAmount
    const potentialSavings = totalCost - termLoanCost

    // Payback progress data (weekly snapshots)
    const progressData: { week: number; paid: number; remaining: number }[] = []
    const weeklyPayment = dailyHoldback * 5
    let paid = 0
    for (let w = 1; w <= weeksToPayoff; w++) {
      paid = Math.min(totalRepayment, paid + weeklyPayment)
      progressData.push({ week: w, paid, remaining: totalRepayment - paid })
    }

    const costTier = getCostTier(estimatedAPR)

    return {
      totalRepayment,
      totalCost,
      costPerDollar,
      dailyHoldback,
      paymentAmount,
      totalPayments,
      weeksToPayoff,
      monthsToPayoff,
      estimatedAPR,
      dailyRevenueAfterHoldback,
      monthlyRevenue,
      monthlyHoldback,
      monthlyRevenueAfter,
      holdbackRatio,
      termLoanPayment,
      termLoanTotal,
      termLoanCost,
      potentialSavings,
      progressData,
      costTier,
    }
  }, [advanceAmount, factorRate, holdbackPct, paymentFreq, dailyRevenue])

  return (
    <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
      {/* Intro */}
      <div className="p-6 sm:p-8 lg:p-10 pb-0">
        <p className="text-gray-700 leading-relaxed mb-2">
          Calculate your daily or weekly MCA payments, payback timeline, and true cost. See how the holdback percentage affects your cash flow.
        </p>
        <p className="text-gray-500 text-sm mb-0">
          Merchant cash advances use a factor rate and holdback on daily revenue instead of a traditional interest rate and fixed payments.
        </p>
      </div>

      {/* Inputs */}
      <div className="p-6 sm:p-8 lg:p-10">
        <div className="space-y-6">
          {/* Advance Amount */}
          <div>
            <CurrencyInput
              label="Advance Amount"
              value={advanceAmount}
              onChange={setAdvanceAmount}
              hint="The total cash advance you receive upfront."
            />
            <div className="flex flex-wrap gap-2 mt-3">
              {advancePresets.map((preset) => (
                <button
                  key={preset}
                  onClick={() => setAdvanceAmount(preset)}
                  className={`px-3 py-1.5 rounded-full text-xs font-medium border transition-colors ${
                    advanceAmount === preset
                      ? 'bg-quicklend-600 text-white border-quicklend-600'
                      : 'bg-white text-gray-600 border-gray-200 hover:border-quicklend-300'
                  }`}
                >
                  {formatCurrency(preset)}
                </button>
              ))}
            </div>
          </div>

          {/* Factor Rate */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Factor Rate: <span className="text-quicklend-600 font-bold">{factorRate.toFixed(2)}</span>
              <span className="text-gray-400 font-normal ml-2">(repay {formatCurrency(advanceAmount * Math.max(1, factorRate))})</span>
            </label>
            <input
              type="range"
              min={1.10}
              max={1.60}
              step={0.01}
              value={factorRate}
              onChange={(e) => setFactorRate(Number(e.target.value))}
              className="w-full accent-quicklend-600"
            />
            <div className="flex justify-between text-xs text-gray-400 mt-1">
              <span>1.10</span>
              <span>1.60</span>
            </div>
          </div>

          {/* Holdback & Frequency */}
          <div className="grid md:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Holdback Percentage: <span className="text-quicklend-600 font-bold">{holdbackPct}%</span>
              </label>
              <input
                type="range"
                min={5}
                max={30}
                step={1}
                value={holdbackPct}
                onChange={(e) => setHoldbackPct(Number(e.target.value))}
                className="w-full accent-quicklend-600"
              />
              <div className="flex justify-between text-xs text-gray-400 mt-1">
                <span>5%</span>
                <span>30%</span>
              </div>
              <p className="flex items-start gap-1.5 mt-2 text-xs text-gray-400">
                <Info className="h-3.5 w-3.5 mt-0.5 flex-shrink-0" />
                The percentage of daily revenue withheld as repayment. Typically 10% to 20%.
              </p>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Payment Frequency</label>
              <div className="grid grid-cols-2 gap-2">
                {(['daily', 'weekly'] as const).map((freq) => (
                  <button
                    key={freq}
                    onClick={() => setPaymentFreq(freq)}
                    className={`px-4 py-3 rounded-lg text-sm font-medium border transition-colors ${
                      paymentFreq === freq
                        ? 'bg-quicklend-600 text-white border-quicklend-600'
                        : 'bg-white text-gray-600 border-gray-200 hover:border-quicklend-300'
                    }`}
                  >
                    {freq === 'daily' ? 'Daily (ACH)' : 'Weekly'}
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* Daily Revenue */}
          <div className="border-t border-gray-100 pt-6">
            <CurrencyInput
              label="Average Daily Revenue"
              value={dailyRevenue}
              onChange={setDailyRevenue}
              max={500000}
              hint="Your average daily credit card or total sales. Used to calculate holdback payments."
            />
          </div>
        </div>
      </div>

      {/* Results */}
      {results && (
        <div className="border-t border-gray-100">
          {/* Cost Tier Banner */}
          <div className="p-6 sm:p-8 lg:p-10 pb-0">
            <div className={`${results.costTier.bgColor} border ${results.costTier.borderColor} rounded-xl p-5 flex flex-col sm:flex-row items-center gap-4`}>
              <div className="flex items-center gap-3">
                {results.costTier.tier === 'reasonable' ? (
                  <CheckCircle className={`h-8 w-8 ${results.costTier.color}`} />
                ) : results.costTier.tier === 'moderate' ? (
                  <Info className={`h-8 w-8 ${results.costTier.color}`} />
                ) : (
                  <AlertTriangle className={`h-8 w-8 ${results.costTier.color}`} />
                )}
                <div>
                  <p className={`text-lg font-bold ${results.costTier.color}`}>{results.costTier.label}</p>
                  <p className="text-sm text-gray-600">{results.costTier.message}</p>
                </div>
              </div>
              <div className="sm:ml-auto text-center sm:text-right shrink-0">
                <p className={`text-3xl font-bold ${results.costTier.color}`}>~{Math.round(results.estimatedAPR)}%</p>
                <p className="text-xs text-gray-500">Estimated APR</p>
              </div>
            </div>
          </div>

          {/* Key Metrics */}
          <div className="p-6 sm:p-8 lg:p-10">
            <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
              <div className="bg-gray-50 border border-gray-200 rounded-xl p-4 text-center">
                <DollarSign className="h-5 w-5 text-gray-400 mx-auto mb-1" />
                <p className="text-xs font-semibold text-gray-500 uppercase tracking-wider mb-1">
                  {paymentFreq === 'daily' ? 'Daily' : 'Weekly'} Payment
                </p>
                <p className="text-xl font-bold text-gray-900">{formatCurrency(results.paymentAmount)}</p>
                <p className="text-xs text-gray-400 mt-1">{holdbackPct}% holdback</p>
              </div>
              <div className="bg-gray-50 border border-gray-200 rounded-xl p-4 text-center">
                <DollarSign className="h-5 w-5 text-gray-400 mx-auto mb-1" />
                <p className="text-xs font-semibold text-gray-500 uppercase tracking-wider mb-1">Total Repayment</p>
                <p className="text-xl font-bold text-gray-900">{formatCurrency(results.totalRepayment)}</p>
                <p className="text-xs text-gray-400 mt-1">{formatCurrency(results.totalCost)} in costs</p>
              </div>
              <div className="bg-gray-50 border border-gray-200 rounded-xl p-4 text-center">
                <Clock className="h-5 w-5 text-gray-400 mx-auto mb-1" />
                <p className="text-xs font-semibold text-gray-500 uppercase tracking-wider mb-1">Payback Period</p>
                <p className="text-xl font-bold text-gray-900">
                  {results.monthsToPayoff < 1
                    ? `${results.weeksToPayoff} weeks`
                    : `${results.monthsToPayoff.toFixed(1)} mo`}
                </p>
                <p className="text-xs text-gray-400 mt-1">{results.totalPayments} payments</p>
              </div>
              <div className="bg-gray-50 border border-gray-200 rounded-xl p-4 text-center">
                <Percent className="h-5 w-5 text-gray-400 mx-auto mb-1" />
                <p className="text-xs font-semibold text-gray-500 uppercase tracking-wider mb-1">Cost Per Dollar</p>
                <p className="text-xl font-bold text-gray-900">${results.costPerDollar.toFixed(2)}</p>
                <p className="text-xs text-gray-400 mt-1">for every $1 advanced</p>
              </div>
            </div>
          </div>

          {/* Revenue Impact */}
          <div className="px-6 sm:px-8 lg:px-10 pb-6">
            <h4 className="text-sm font-semibold text-gray-700 mb-3">Cash Flow Impact</h4>
            <div className="bg-gray-50 rounded-xl p-4">
              <div className="space-y-3">
                <div>
                  <div className="flex justify-between text-xs text-gray-500 mb-1">
                    <span>Daily Revenue</span>
                    <span>{formatCurrency(dailyRevenue)}</span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-5 overflow-hidden flex">
                    <div
                      className="bg-green-500 h-full flex items-center justify-center text-white text-xs font-medium"
                      style={{ width: `${100 - holdbackPct}%` }}
                    >
                      {100 - holdbackPct}% kept
                    </div>
                    <div
                      className="bg-red-400 h-full flex items-center justify-center text-white text-xs font-medium"
                      style={{ width: `${holdbackPct}%` }}
                    >
                      {holdbackPct}%
                    </div>
                  </div>
                </div>
                <div className="grid grid-cols-3 gap-3 text-center text-sm">
                  <div>
                    <p className="text-gray-500 text-xs">Monthly Revenue</p>
                    <p className="font-bold text-gray-900">{formatCurrency(results.monthlyRevenue)}</p>
                  </div>
                  <div>
                    <p className="text-gray-500 text-xs">Monthly Holdback</p>
                    <p className="font-bold text-red-500">-{formatCurrency(results.monthlyHoldback)}</p>
                  </div>
                  <div>
                    <p className="text-gray-500 text-xs">You Keep</p>
                    <p className="font-bold text-green-600">{formatCurrency(results.monthlyRevenueAfter)}</p>
                  </div>
                </div>
              </div>
              {results.holdbackRatio > 0.20 && (
                <p className="text-xs text-amber-600 mt-3 flex items-start gap-1.5">
                  <AlertTriangle className="h-3.5 w-3.5 mt-0.5 flex-shrink-0" />
                  The holdback takes {Math.round(results.holdbackRatio * 100)}% of monthly revenue. This could strain cash flow for covering operating expenses.
                </p>
              )}
            </div>
          </div>

          {/* Payback Progress */}
          <div className="px-6 sm:px-8 lg:px-10 pb-8">
            <h4 className="text-sm font-semibold text-gray-700 mb-3">Payback Progress</h4>
            <div className="space-y-1">
              {results.progressData
                .filter((_, i) => {
                  const total = results.progressData.length
                  if (total <= 12) return true
                  if (i === 0 || i === total - 1) return true
                  const step = Math.max(1, Math.floor(total / 10))
                  return i % step === 0
                })
                .map((d) => {
                  const paidPct = (d.paid / results.totalRepayment) * 100
                  return (
                    <div key={d.week} className="flex items-center gap-2">
                      <span className="text-xs text-gray-500 w-12 text-right shrink-0">Wk {d.week}</span>
                      <div className="flex-1 bg-gray-100 rounded-full h-5 overflow-hidden">
                        <div
                          className="bg-quicklend-600 h-full rounded-full flex items-center justify-end pr-2 text-white text-xs font-medium"
                          style={{ width: `${paidPct}%`, minWidth: paidPct > 5 ? '40px' : '0' }}
                        >
                          {paidPct > 15 ? `${Math.round(paidPct)}%` : ''}
                        </div>
                      </div>
                      <span className="text-xs text-gray-500 w-20 text-right shrink-0">
                        {formatCurrency(d.remaining)} left
                      </span>
                    </div>
                  )
                })}
            </div>
          </div>

          {/* Term Loan Comparison */}
          <div className="px-6 sm:px-8 lg:px-10 pb-8">
            <div className="bg-quicklend-900 rounded-xl p-5">
              <h4 className="text-quicklend-200 text-sm font-semibold mb-4 text-center">MCA vs Term Loan Comparison</h4>
              <div className="grid grid-cols-3 gap-4 text-center">
                <div>
                  <p className="text-quicklend-300 text-xs uppercase tracking-wider mb-2">This MCA</p>
                  <p className="text-white font-bold text-lg">{formatCurrency(results.totalRepayment)}</p>
                  <p className="text-quicklend-300 text-xs mt-1">total repayment</p>
                  <p className="text-quicklend-300 text-xs">{formatCurrency(results.totalCost)} in costs</p>
                </div>
                <div className="flex items-center justify-center">
                  <div className="text-center">
                    <ArrowRight className="h-6 w-6 text-quicklend-300 mx-auto" />
                    <p className="text-xs text-quicklend-300 mt-1">vs</p>
                  </div>
                </div>
                <div>
                  <p className="text-quicklend-300 text-xs uppercase tracking-wider mb-2">Term Loan at 12%</p>
                  <p className="text-amber-400 font-bold text-lg">{formatCurrency(results.termLoanTotal)}</p>
                  <p className="text-quicklend-300 text-xs mt-1">total repayment</p>
                  <p className="text-quicklend-300 text-xs">{formatCurrency(results.termLoanCost)} in interest</p>
                </div>
              </div>
              {results.potentialSavings > 0 && (
                <p className="text-xs text-amber-400 text-center mt-3">
                  A term loan at 12% for the same period would save you approximately {formatCurrency(results.potentialSavings)}.
                </p>
              )}
            </div>
          </div>

          {/* Detailed Breakdown Table */}
          <div className="px-6 sm:px-8 lg:px-10 pb-8">
            <details className="group">
              <summary className="cursor-pointer text-sm font-semibold text-gray-600 hover:text-gray-900 flex items-center gap-2">
                <span className="group-open:rotate-90 transition-transform">&#9654;</span>
                Full Cost Breakdown
              </summary>
              <div className="mt-4 overflow-x-auto -mx-6 sm:mx-0">
                <table className="w-full text-sm">
                  <thead>
                    <tr className="border-b border-gray-200">
                      <th className="text-left px-4 py-2 text-gray-500 font-medium">Item</th>
                      <th className="text-right px-4 py-2 text-gray-500 font-medium">Amount</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr className="border-b border-gray-100">
                      <td className="px-4 py-2.5 text-gray-700">Advance Amount</td>
                      <td className="px-4 py-2.5 text-right text-gray-900 font-medium">{formatCurrency(advanceAmount)}</td>
                    </tr>
                    <tr className="border-b border-gray-100">
                      <td className="px-4 py-2.5 text-gray-700">Factor Rate</td>
                      <td className="px-4 py-2.5 text-right text-gray-900">{factorRate.toFixed(2)}</td>
                    </tr>
                    <tr className="border-b border-gray-100">
                      <td className="px-4 py-2.5 text-gray-700">Total Repayment</td>
                      <td className="px-4 py-2.5 text-right text-gray-900 font-medium">{formatCurrency(results.totalRepayment)}</td>
                    </tr>
                    <tr className="border-b border-gray-100 bg-red-50">
                      <td className="px-4 py-2.5 text-gray-900 font-semibold">Total Cost (fee)</td>
                      <td className="px-4 py-2.5 text-right text-red-600 font-bold">{formatCurrency(results.totalCost)}</td>
                    </tr>
                    <tr className="border-b border-gray-100">
                      <td className="px-4 py-2.5 text-gray-700">{paymentFreq === 'daily' ? 'Daily' : 'Weekly'} Payment</td>
                      <td className="px-4 py-2.5 text-right text-gray-900">{formatCurrency(results.paymentAmount)}</td>
                    </tr>
                    <tr className="border-b border-gray-100">
                      <td className="px-4 py-2.5 text-gray-700">Number of Payments</td>
                      <td className="px-4 py-2.5 text-right text-gray-900">{results.totalPayments}</td>
                    </tr>
                    <tr className="border-b border-gray-100">
                      <td className="px-4 py-2.5 text-gray-700">Estimated Payback Period</td>
                      <td className="px-4 py-2.5 text-right text-gray-900">{results.monthsToPayoff.toFixed(1)} months</td>
                    </tr>
                    <tr className="border-b border-gray-100">
                      <td className="px-4 py-2.5 text-gray-700">Estimated APR Equivalent</td>
                      <td className="px-4 py-2.5 text-right text-gray-900">~{Math.round(results.estimatedAPR)}%</td>
                    </tr>
                    <tr className="border-b border-gray-100">
                      <td className="px-4 py-2.5 text-gray-700">Cost Per Dollar Borrowed</td>
                      <td className="px-4 py-2.5 text-right text-gray-900">${results.costPerDollar.toFixed(2)}</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </details>
          </div>

          {/* CTA */}
          <div className="px-6 sm:px-8 lg:px-10 pb-8">
            <div className="bg-quicklend-50 rounded-xl p-6 text-center">
              <p className="text-gray-700 mb-1 font-medium">
                {results.costTier.tier === 'reasonable' && `This MCA costs ${formatCurrency(results.totalCost)} on a ${formatCurrency(advanceAmount)} advance. Compare against term loans for the best rate.`}
                {results.costTier.tier === 'moderate' && `At ${formatCurrency(results.paymentAmount)} per ${paymentFreq === 'daily' ? 'day' : 'week'}, make sure this fits your cash flow.`}
                {results.costTier.tier === 'expensive' && `This advance costs $${results.costPerDollar.toFixed(2)} per dollar. A term loan could save you ${formatCurrency(results.potentialSavings)}.`}
                {results.costTier.tier === 'very-expensive' && `At an estimated ${Math.round(results.estimatedAPR)}% APR, explore alternatives before committing.`}
              </p>
              <p className="text-gray-500 text-sm mb-4">
                See if you qualify for lower-cost business financing. No impact to your credit score.
              </p>
              <div className="flex flex-col sm:flex-row gap-3 justify-center">
                <Link
                  href={`/get-started?source=mca-calculator&loan_type=term-loans&amount=${advanceAmount}`}
                  className="inline-flex items-center justify-center bg-quicklend-600 text-white font-semibold px-8 py-3 rounded-lg hover:bg-quicklend-700 transition-colors"
                >
                  Compare Lower-Cost Options <ArrowRight className="ml-2 h-4 w-4" />
                </Link>
                <Link
                  href="/tools/factor-rate-to-apr-calculator"
                  className="inline-flex items-center justify-center border border-quicklend-300 text-quicklend-700 font-semibold px-6 py-3 rounded-lg hover:bg-quicklend-50 transition-colors text-sm"
                >
                  Convert Factor Rate to APR
                </Link>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
