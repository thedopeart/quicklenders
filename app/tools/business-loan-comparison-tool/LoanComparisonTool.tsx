'use client'

import { useState, useMemo } from 'react'
import Link from 'next/link'
import {
  ChevronRight,
  ArrowRight,
  Info,
  Plus,
  X,
  Trophy,
  DollarSign,
  Clock,
  Star,
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
// Types
// ────────────────────────────────────────────────────────────────────

interface LoanInput {
  id: string
  name: string
  amount: number
  rate: number
  termMonths: number
  originationFeePercent: number
  otherFees: number
  showFees: boolean
}

interface LoanResult {
  id: string
  name: string
  amount: number
  rate: number
  termMonths: number
  monthlyPayment: number
  totalInterest: number
  originationFee: number
  otherFees: number
  totalFees: number
  totalCost: number
  costPer1k: number
  effectiveApr: number
}

// ────────────────────────────────────────────────────────────────────
// Defaults
// ────────────────────────────────────────────────────────────────────

const defaultLoans: LoanInput[] = [
  {
    id: 'A',
    name: 'Loan A',
    amount: 100000,
    rate: 9.5,
    termMonths: 60,
    originationFeePercent: 2,
    otherFees: 0,
    showFees: false,
  },
  {
    id: 'B',
    name: 'Loan B',
    amount: 100000,
    rate: 15,
    termMonths: 36,
    originationFeePercent: 3,
    otherFees: 0,
    showFees: false,
  },
]

const termOptions = [
  { value: 6, label: '6 months' },
  { value: 12, label: '1 year' },
  { value: 24, label: '2 years' },
  { value: 36, label: '3 years' },
  { value: 48, label: '4 years' },
  { value: 60, label: '5 years' },
  { value: 84, label: '7 years' },
  { value: 120, label: '10 years' },
  { value: 180, label: '15 years' },
  { value: 240, label: '20 years' },
]

const cardColors = [
  { bg: 'bg-blue-50', border: 'border-blue-200', accent: 'text-blue-600', barBg: 'bg-blue-500', badgeBg: 'bg-blue-100', headerBg: 'bg-blue-600' },
  { bg: 'bg-emerald-50', border: 'border-emerald-200', accent: 'text-emerald-600', barBg: 'bg-emerald-500', badgeBg: 'bg-emerald-100', headerBg: 'bg-emerald-600' },
  { bg: 'bg-amber-50', border: 'border-amber-200', accent: 'text-amber-600', barBg: 'bg-amber-500', badgeBg: 'bg-amber-100', headerBg: 'bg-amber-600' },
]

// ────────────────────────────────────────────────────────────────────
// Main Component
// ────────────────────────────────────────────────────────────────────

export default function LoanComparisonTool() {
  const [loans, setLoans] = useState<LoanInput[]>(defaultLoans)

  function updateLoan(id: string, updates: Partial<LoanInput>) {
    setLoans((prev) => prev.map((l) => (l.id === id ? { ...l, ...updates } : l)))
  }

  function addLoan() {
    if (loans.length >= 3) return
    const nextId = loans.length === 2 ? 'C' : 'B'
    setLoans([
      ...loans,
      {
        id: nextId,
        name: `Loan ${nextId}`,
        amount: 100000,
        rate: 12,
        termMonths: 48,
        originationFeePercent: 0,
        otherFees: 0,
        showFees: false,
      },
    ])
  }

  function removeLoan(id: string) {
    if (loans.length <= 2) return
    setLoans((prev) => prev.filter((l) => l.id !== id))
  }

  // ── Calculations ──────────────────────────────────────────────────

  const results = useMemo<LoanResult[]>(() => {
    return loans.map((loan) => {
      const P = loan.amount
      const r = loan.rate / 100 / 12
      const n = loan.termMonths

      // Monthly payment (standard amortization)
      let monthlyPayment = 0
      if (r > 0 && n > 0 && P > 0) {
        monthlyPayment = (P * r * Math.pow(1 + r, n)) / (Math.pow(1 + r, n) - 1)
      }

      const totalPaid = monthlyPayment * n
      const totalInterest = totalPaid - P
      const originationFee = P * (loan.originationFeePercent / 100)
      const totalFees = originationFee + loan.otherFees
      const totalCost = totalPaid + totalFees
      const costPer1k = P > 0 ? ((totalInterest + totalFees) / P) * 1000 : 0

      // Effective APR: solve for the rate where Net Proceeds = PV of payments
      // Net proceeds = P - totalFees (upfront fees reduce proceeds)
      const netProceeds = P - totalFees
      let effectiveApr = loan.rate
      if (totalFees > 0 && netProceeds > 0) {
        // Newton's method to find effective rate
        let guess = loan.rate / 100 / 12
        for (let i = 0; i < 50; i++) {
          const pv = guess > 0
            ? (monthlyPayment * (1 - Math.pow(1 + guess, -n))) / guess
            : monthlyPayment * n
          const pvPrime = guess > 0
            ? (monthlyPayment / (guess * guess)) * (
                (1 - Math.pow(1 + guess, -n)) -
                n * guess * Math.pow(1 + guess, -(n + 1))
              ) * -1 + (monthlyPayment * (1 - Math.pow(1 + guess, -n))) / (guess * guess) * -1 +
              (monthlyPayment / guess) * n * Math.pow(1 + guess, -(n + 1))
            : 0
          const diff = pv - netProceeds
          if (Math.abs(diff) < 0.01) break
          // Simplified numerical derivative
          const guessUp = guess + 0.00001
          const pvUp = (monthlyPayment * (1 - Math.pow(1 + guessUp, -n))) / guessUp
          const deriv = (pvUp - pv) / 0.00001
          if (Math.abs(deriv) < 1e-10) break
          guess = guess - diff / deriv
          if (guess <= 0) {
            guess = loan.rate / 100 / 12
            break
          }
        }
        effectiveApr = guess * 12 * 100
      }

      return {
        id: loan.id,
        name: loan.name,
        amount: P,
        rate: loan.rate,
        termMonths: n,
        monthlyPayment,
        totalInterest,
        originationFee,
        otherFees: loan.otherFees,
        totalFees,
        totalCost,
        costPer1k,
        effectiveApr,
      }
    })
  }, [loans])

  const hasValidResults = results.every((r) => r.amount > 0 && r.rate > 0 && r.termMonths > 0)

  // ── Winners ──────────────────────────────────────────────────────

  const winners = useMemo(() => {
    if (!hasValidResults || results.length < 2) return null

    const lowestCost = results.reduce((a, b) => (a.totalCost < b.totalCost ? a : b))
    const lowestPayment = results.reduce((a, b) => (a.monthlyPayment < b.monthlyPayment ? a : b))
    const fastestPayoff = results.reduce((a, b) => (a.termMonths < b.termMonths ? a : b))
    const lowestCostPer1k = results.reduce((a, b) => (a.costPer1k < b.costPer1k ? a : b))

    return { lowestCost, lowestPayment, fastestPayoff, lowestCostPer1k }
  }, [results, hasValidResults])

  // ── Max values for bar chart scaling ────────────────────────────

  const maxTotalCost = Math.max(...results.map((r) => r.totalCost))

  return (
    <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
      {/* Intro */}
      <div className="p-6 sm:p-8 lg:p-10 pb-0">
        <p className="text-gray-700 leading-relaxed mb-2">
          Enter the details of each loan offer to see which one costs less overall. You can compare 2 or 3 options side by side.
        </p>
        <p className="text-gray-500 text-sm mb-0">
          All results update in real time as you adjust inputs.
        </p>
      </div>

      {/* Loan Input Cards */}
      <div className="p-6 sm:p-8 lg:p-10">
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
          {loans.map((loan, index) => {
            const color = cardColors[index]
            return (
              <div key={loan.id} className={`${color.bg} ${color.border} border rounded-xl overflow-hidden`}>
                {/* Card Header */}
                <div className={`${color.headerBg} px-4 py-3 flex items-center justify-between`}>
                  <input
                    type="text"
                    value={loan.name}
                    onChange={(e) => updateLoan(loan.id, { name: e.target.value.slice(0, 20) })}
                    className="bg-transparent text-white font-semibold text-sm placeholder-white/70 border-none outline-none w-full"
                    placeholder={`Loan ${loan.id}`}
                  />
                  {loans.length > 2 && (
                    <button
                      onClick={() => removeLoan(loan.id)}
                      className="text-white/70 hover:text-white ml-2 flex-shrink-0"
                      title="Remove loan"
                    >
                      <X className="h-4 w-4" />
                    </button>
                  )}
                </div>

                {/* Card Body */}
                <div className="p-4 space-y-4">
                  {/* Amount */}
                  <div>
                    <label className="block text-xs font-medium text-gray-600 mb-1">Loan Amount</label>
                    <div className="relative">
                      <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500 text-sm">$</span>
                      <input
                        type="text"
                        inputMode="numeric"
                        value={formatInputDisplay(loan.amount)}
                        onChange={(e) => {
                          const num = parseCurrencyInput(e.target.value)
                          if (num >= 0 && num <= 50000000) updateLoan(loan.id, { amount: num })
                        }}
                        className="w-full rounded-lg border border-gray-200 px-3 py-2.5 pl-7 text-sm text-gray-900 focus:border-quicklend-600 focus:ring-2 focus:ring-quicklend-600/20 focus:outline-none bg-white"
                        placeholder="0"
                      />
                    </div>
                  </div>

                  {/* Rate */}
                  <div>
                    <label className="block text-xs font-medium text-gray-600 mb-1">
                      Interest Rate (APR): <span className={`${color.accent} font-bold`}>{loan.rate}%</span>
                    </label>
                    <input
                      type="range"
                      min={1}
                      max={40}
                      step={0.25}
                      value={loan.rate}
                      onChange={(e) => updateLoan(loan.id, { rate: Number(e.target.value) })}
                      className="w-full accent-quicklend-600"
                    />
                    <div className="flex justify-between text-xs text-gray-400">
                      <span>1%</span>
                      <span>40%</span>
                    </div>
                  </div>

                  {/* Term */}
                  <div>
                    <label className="block text-xs font-medium text-gray-600 mb-1">Loan Term</label>
                    <select
                      value={loan.termMonths}
                      onChange={(e) => updateLoan(loan.id, { termMonths: Number(e.target.value) })}
                      className="w-full rounded-lg border border-gray-200 px-3 py-2.5 text-sm text-gray-900 focus:border-quicklend-600 focus:ring-2 focus:ring-quicklend-600/20 focus:outline-none bg-white"
                    >
                      {termOptions.map((opt) => (
                        <option key={opt.value} value={opt.value}>{opt.label}</option>
                      ))}
                    </select>
                  </div>

                  {/* Fees (collapsible) */}
                  <div>
                    <button
                      onClick={() => updateLoan(loan.id, { showFees: !loan.showFees })}
                      className="inline-flex items-center text-xs text-quicklend-600 font-medium hover:text-quicklend-700 transition-colors"
                    >
                      <ChevronRight className={`h-3.5 w-3.5 mr-1 transition-transform ${loan.showFees ? 'rotate-90' : ''}`} />
                      {loan.showFees ? 'Hide' : 'Add'} fees
                    </button>
                    {loan.showFees && (
                      <div className="mt-3 space-y-3">
                        <div>
                          <label className="block text-xs font-medium text-gray-600 mb-1">
                            Origination Fee: <span className={`${color.accent} font-bold`}>{loan.originationFeePercent}%</span>
                          </label>
                          <input
                            type="range"
                            min={0}
                            max={10}
                            step={0.25}
                            value={loan.originationFeePercent}
                            onChange={(e) => updateLoan(loan.id, { originationFeePercent: Number(e.target.value) })}
                            className="w-full accent-quicklend-600"
                          />
                          <div className="flex justify-between text-xs text-gray-400">
                            <span>0%</span>
                            <span>10%</span>
                          </div>
                          {loan.originationFeePercent > 0 && (
                            <p className="text-xs text-gray-500 mt-1">
                              = {formatCurrency(loan.amount * (loan.originationFeePercent / 100))}
                            </p>
                          )}
                        </div>
                        <div>
                          <label className="block text-xs font-medium text-gray-600 mb-1">Other Fees</label>
                          <div className="relative">
                            <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500 text-sm">$</span>
                            <input
                              type="text"
                              inputMode="numeric"
                              value={formatInputDisplay(loan.otherFees)}
                              onChange={(e) => {
                                const num = parseCurrencyInput(e.target.value)
                                if (num >= 0 && num <= 1000000) updateLoan(loan.id, { otherFees: num })
                              }}
                              className="w-full rounded-lg border border-gray-200 px-3 py-2.5 pl-7 text-sm text-gray-900 focus:border-quicklend-600 focus:ring-2 focus:ring-quicklend-600/20 focus:outline-none bg-white"
                              placeholder="0"
                            />
                          </div>
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            )
          })}

          {/* Add Loan Card */}
          {loans.length < 3 && (
            <button
              onClick={addLoan}
              className="border-2 border-dashed border-gray-300 rounded-xl flex flex-col items-center justify-center min-h-[300px] text-gray-400 hover:border-quicklend-400 hover:text-quicklend-600 transition-colors"
            >
              <Plus className="h-8 w-8 mb-2" />
              <span className="text-sm font-medium">Add Another Loan</span>
            </button>
          )}
        </div>
      </div>

      {/* Results */}
      {hasValidResults && (
        <div className="border-t border-gray-100">
          {/* Winner Summary */}
          {winners && (
            <div className="p-6 sm:p-8 lg:p-10">
              <h3 className="text-sm font-semibold text-gray-700 mb-4">Quick Verdict</h3>
              <div className="grid sm:grid-cols-3 gap-3">
                <div className="bg-quicklend-50 border border-quicklend-200 rounded-xl p-4">
                  <div className="flex items-center gap-2 mb-2">
                    <Trophy className="h-4 w-4 text-quicklend-600" />
                    <p className="text-xs font-semibold text-quicklend-600 uppercase tracking-wider">Lowest Total Cost</p>
                  </div>
                  <p className="text-lg font-bold text-quicklend-900">{winners.lowestCost.name}</p>
                  <p className="text-sm text-gray-600">{formatCurrency(winners.lowestCost.totalCost)}</p>
                </div>
                <div className="bg-gray-50 border border-gray-200 rounded-xl p-4">
                  <div className="flex items-center gap-2 mb-2">
                    <DollarSign className="h-4 w-4 text-gray-500" />
                    <p className="text-xs font-semibold text-gray-500 uppercase tracking-wider">Lowest Payment</p>
                  </div>
                  <p className="text-lg font-bold text-quicklend-900">{winners.lowestPayment.name}</p>
                  <p className="text-sm text-gray-600">{formatCurrency(winners.lowestPayment.monthlyPayment)}/mo</p>
                </div>
                <div className="bg-gray-50 border border-gray-200 rounded-xl p-4">
                  <div className="flex items-center gap-2 mb-2">
                    <Clock className="h-4 w-4 text-gray-500" />
                    <p className="text-xs font-semibold text-gray-500 uppercase tracking-wider">Fastest Payoff</p>
                  </div>
                  <p className="text-lg font-bold text-quicklend-900">{winners.fastestPayoff.name}</p>
                  <p className="text-sm text-gray-600">
                    {winners.fastestPayoff.termMonths >= 12
                      ? `${(winners.fastestPayoff.termMonths / 12).toFixed(winners.fastestPayoff.termMonths % 12 === 0 ? 0 : 1)} years`
                      : `${winners.fastestPayoff.termMonths} months`}
                  </p>
                </div>
              </div>

              {/* Savings callout */}
              {results.length >= 2 && (() => {
                const sorted = [...results].sort((a, b) => a.totalCost - b.totalCost)
                const savings = sorted[1].totalCost - sorted[0].totalCost
                if (savings > 0) {
                  return (
                    <div className="mt-4 bg-quicklend-900 rounded-xl p-5 flex flex-col sm:flex-row items-center justify-between gap-3">
                      <div className="flex items-center gap-3">
                        <Star className="h-5 w-5 text-amber-400 flex-shrink-0" />
                        <div>
                          <p className="text-white font-semibold">
                            {sorted[0].name} saves you {formatCurrency(savings)} over {sorted[1].name}
                          </p>
                          <p className="text-quicklend-300 text-sm">in total cost including fees</p>
                        </div>
                      </div>
                      <p className="text-2xl font-bold text-amber-400">{formatCurrency(savings)}</p>
                    </div>
                  )
                }
                return null
              })()}
            </div>
          )}

          {/* Comparison Table */}
          <div className="px-6 sm:px-8 lg:px-10 pb-8">
            <h3 className="text-sm font-semibold text-gray-700 mb-4">Side-by-Side Comparison</h3>
            <div className="overflow-x-auto -mx-6 sm:mx-0">
              <table className="w-full text-sm min-w-[480px]">
                <thead>
                  <tr className="border-b border-gray-200">
                    <th className="text-left px-4 py-3 text-gray-500 font-medium"></th>
                    {results.map((result, i) => (
                      <th key={result.id} className="text-right px-4 py-3">
                        <span className={`inline-flex items-center gap-1.5 font-semibold ${cardColors[i].accent}`}>
                          <span className={`w-2.5 h-2.5 rounded-full ${cardColors[i].barBg}`} />
                          {result.name}
                        </span>
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  <tr className="border-b border-gray-100">
                    <td className="px-4 py-3 text-gray-700">Loan Amount</td>
                    {results.map((r) => (
                      <td key={r.id} className="px-4 py-3 text-right font-medium text-gray-900">
                        {formatCurrency(r.amount)}
                      </td>
                    ))}
                  </tr>
                  <tr className="border-b border-gray-100">
                    <td className="px-4 py-3 text-gray-700">Interest Rate</td>
                    {results.map((r) => (
                      <td key={r.id} className="px-4 py-3 text-right font-medium text-gray-900">
                        {r.rate}%
                      </td>
                    ))}
                  </tr>
                  <tr className="border-b border-gray-100">
                    <td className="px-4 py-3 text-gray-700">Term</td>
                    {results.map((r) => (
                      <td key={r.id} className="px-4 py-3 text-right font-medium text-gray-900">
                        {r.termMonths >= 12
                          ? `${(r.termMonths / 12).toFixed(r.termMonths % 12 === 0 ? 0 : 1)} yr`
                          : `${r.termMonths} mo`}
                      </td>
                    ))}
                  </tr>
                  <tr className="border-b border-gray-100 bg-gray-50">
                    <td className="px-4 py-3 text-gray-700 font-semibold">Monthly Payment</td>
                    {results.map((r) => {
                      const isLowest = winners && winners.lowestPayment.id === r.id && results.length >= 2
                      return (
                        <td key={r.id} className={`px-4 py-3 text-right font-bold ${isLowest ? 'text-quicklend-600' : 'text-gray-900'}`}>
                          {formatCurrency(r.monthlyPayment)}
                          {isLowest && <span className="ml-1 text-xs font-medium">★</span>}
                        </td>
                      )
                    })}
                  </tr>
                  <tr className="border-b border-gray-100">
                    <td className="px-4 py-3 text-gray-700">Total Interest</td>
                    {results.map((r) => (
                      <td key={r.id} className="px-4 py-3 text-right font-medium text-gray-900">
                        {formatCurrency(r.totalInterest)}
                      </td>
                    ))}
                  </tr>
                  <tr className="border-b border-gray-100">
                    <td className="px-4 py-3 text-gray-700">Total Fees</td>
                    {results.map((r) => (
                      <td key={r.id} className="px-4 py-3 text-right font-medium text-gray-900">
                        {r.totalFees > 0 ? formatCurrency(r.totalFees) : '$0'}
                      </td>
                    ))}
                  </tr>
                  <tr className="border-b border-gray-100 bg-quicklend-50">
                    <td className="px-4 py-3 text-gray-900 font-bold">Total Cost</td>
                    {results.map((r) => {
                      const isLowest = winners && winners.lowestCost.id === r.id && results.length >= 2
                      return (
                        <td key={r.id} className={`px-4 py-3 text-right font-bold text-lg ${isLowest ? 'text-quicklend-600' : 'text-gray-900'}`}>
                          {formatCurrency(r.totalCost)}
                          {isLowest && <span className="ml-1 text-xs font-medium">★</span>}
                        </td>
                      )
                    })}
                  </tr>
                  <tr className="border-b border-gray-100">
                    <td className="px-4 py-3 text-gray-700">
                      <span className="flex items-center gap-1">
                        Cost per $1,000
                        <span className="group relative">
                          <Info className="h-3.5 w-3.5 text-gray-400 cursor-help" />
                          <span className="hidden group-hover:block absolute left-0 bottom-full mb-1 bg-gray-900 text-white text-xs rounded px-2 py-1 w-48 z-10">
                            Total financing cost (interest + fees) per $1,000 of loan amount. Normalizes comparison across different amounts.
                          </span>
                        </span>
                      </span>
                    </td>
                    {results.map((r) => {
                      const isLowest = winners && winners.lowestCostPer1k.id === r.id && results.length >= 2
                      return (
                        <td key={r.id} className={`px-4 py-3 text-right font-medium ${isLowest ? 'text-quicklend-600' : 'text-gray-900'}`}>
                          ${r.costPer1k.toFixed(0)}
                          {isLowest && <span className="ml-1 text-xs font-medium">★</span>}
                        </td>
                      )
                    })}
                  </tr>
                  {results.some((r) => r.totalFees > 0) && (
                    <tr>
                      <td className="px-4 py-3 text-gray-700">Effective APR</td>
                      {results.map((r) => (
                        <td key={r.id} className="px-4 py-3 text-right font-medium text-gray-900">
                          {r.effectiveApr.toFixed(1)}%
                        </td>
                      ))}
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
            <p className="text-xs text-gray-400 mt-2">★ = best in category</p>
          </div>

          {/* Visual Cost Breakdown */}
          <div className="px-6 sm:px-8 lg:px-10 pb-8">
            <details className="group" open>
              <summary className="cursor-pointer text-sm font-semibold text-gray-600 hover:text-gray-900 flex items-center gap-2">
                <ChevronRight className="h-4 w-4 group-open:rotate-90 transition-transform" />
                Cost Breakdown Chart
              </summary>
              <div className="mt-4 space-y-4">
                {results.map((result, i) => {
                  const color = cardColors[i]
                  const principalWidth = maxTotalCost > 0 ? (result.amount / maxTotalCost) * 100 : 0
                  const interestWidth = maxTotalCost > 0 ? (result.totalInterest / maxTotalCost) * 100 : 0
                  const feesWidth = maxTotalCost > 0 ? (result.totalFees / maxTotalCost) * 100 : 0

                  return (
                    <div key={result.id}>
                      <div className="flex items-center justify-between mb-1.5">
                        <span className={`text-sm font-semibold ${color.accent}`}>{result.name}</span>
                        <span className="text-sm font-bold text-gray-900">{formatCurrency(result.totalCost)}</span>
                      </div>
                      <div className="flex h-8 rounded-lg overflow-hidden bg-gray-100">
                        <div
                          className="bg-gray-400 transition-all duration-500"
                          style={{ width: `${principalWidth}%` }}
                          title={`Principal: ${formatCurrency(result.amount)}`}
                        />
                        <div
                          className={`${color.barBg} transition-all duration-500`}
                          style={{ width: `${interestWidth}%` }}
                          title={`Interest: ${formatCurrency(result.totalInterest)}`}
                        />
                        {result.totalFees > 0 && (
                          <div
                            className="bg-red-400 transition-all duration-500"
                            style={{ width: `${feesWidth}%` }}
                            title={`Fees: ${formatCurrency(result.totalFees)}`}
                          />
                        )}
                      </div>
                      <div className="flex items-center gap-4 mt-1 text-xs text-gray-500">
                        <span>Principal: {formatCurrency(result.amount)}</span>
                        <span>Interest: {formatCurrency(result.totalInterest)}</span>
                        {result.totalFees > 0 && <span>Fees: {formatCurrency(result.totalFees)}</span>}
                      </div>
                    </div>
                  )
                })}
                <div className="flex items-center gap-4 mt-2 text-xs text-gray-400 pt-2 border-t border-gray-100">
                  <span className="flex items-center gap-1.5"><span className="w-3 h-3 rounded bg-gray-400" /> Principal</span>
                  <span className="flex items-center gap-1.5"><span className="w-3 h-3 rounded bg-blue-500" /> Interest</span>
                  <span className="flex items-center gap-1.5"><span className="w-3 h-3 rounded bg-red-400" /> Fees</span>
                </div>
              </div>
            </details>
          </div>

          {/* Payment Milestones */}
          <div className="px-6 sm:px-8 lg:px-10 pb-8">
            <details className="group">
              <summary className="cursor-pointer text-sm font-semibold text-gray-600 hover:text-gray-900 flex items-center gap-2">
                <ChevronRight className="h-4 w-4 group-open:rotate-90 transition-transform" />
                Cumulative Payments Over Time
              </summary>
              <div className="mt-4 overflow-x-auto -mx-6 sm:mx-0">
                <table className="w-full text-sm min-w-[400px]">
                  <thead>
                    <tr className="border-b border-gray-200">
                      <th className="text-left px-4 py-2 text-gray-500 font-medium">Month</th>
                      {results.map((r, i) => (
                        <th key={r.id} className={`text-right px-4 py-2 font-semibold ${cardColors[i].accent}`}>
                          {r.name}
                        </th>
                      ))}
                    </tr>
                  </thead>
                  <tbody>
                    {(() => {
                      const maxTerm = Math.max(...results.map((r) => r.termMonths))
                      // Show milestones: 1, 6, 12, 24, 36, 48, 60, 84, 120, etc.
                      const milestones = [1, 6, 12, 24, 36, 48, 60, 84, 120, 180, 240].filter(
                        (m) => m <= maxTerm
                      )
                      // Always include the max term if not already there
                      if (!milestones.includes(maxTerm)) milestones.push(maxTerm)

                      return milestones.map((month) => (
                        <tr key={month} className="border-b border-gray-100">
                          <td className="px-4 py-2 text-gray-700">
                            {month === 1 ? 'Month 1' : month < 12 ? `Month ${month}` : `Year ${month / 12}`}
                          </td>
                          {results.map((r) => {
                            if (month > r.termMonths) {
                              return (
                                <td key={r.id} className="px-4 py-2 text-right text-gray-400 text-xs">
                                  Paid off
                                </td>
                              )
                            }
                            const cumulative = r.monthlyPayment * month
                            return (
                              <td key={r.id} className="px-4 py-2 text-right font-medium text-gray-900">
                                {formatCurrency(cumulative)}
                              </td>
                            )
                          })}
                        </tr>
                      ))
                    })()}
                  </tbody>
                </table>
              </div>
            </details>
          </div>

          {/* Decision Guidance */}
          <div className="px-6 sm:px-8 lg:px-10 pb-8">
            <details className="group">
              <summary className="cursor-pointer text-sm font-semibold text-gray-600 hover:text-gray-900 flex items-center gap-2">
                <ChevronRight className="h-4 w-4 group-open:rotate-90 transition-transform" />
                Which Loan Should You Choose?
              </summary>
              <div className="mt-4 space-y-3">
                {winners && winners.lowestCost.id !== winners.lowestPayment.id && (
                  <div className="bg-blue-50 border border-blue-200 rounded-xl p-5">
                    <p className="font-semibold text-gray-900 mb-2">The &ldquo;best&rdquo; loan depends on your priorities:</p>
                    <ul className="text-sm text-gray-700 space-y-2">
                      <li>
                        <span className="font-medium">Need the lowest monthly payment?</span>{' '}
                        {winners.lowestPayment.name} at {formatCurrency(winners.lowestPayment.monthlyPayment)}/mo. Good if cash flow is tight or you need more working capital each month.
                      </li>
                      <li>
                        <span className="font-medium">Want to minimize total cost?</span>{' '}
                        {winners.lowestCost.name} at {formatCurrency(winners.lowestCost.totalCost)} total. Better if you can handle higher payments and want to save overall.
                      </li>
                      {winners.fastestPayoff.id !== winners.lowestCost.id && winners.fastestPayoff.id !== winners.lowestPayment.id && (
                        <li>
                          <span className="font-medium">Want to be debt-free fastest?</span>{' '}
                          {winners.fastestPayoff.name} pays off in{' '}
                          {winners.fastestPayoff.termMonths >= 12
                            ? `${(winners.fastestPayoff.termMonths / 12).toFixed(winners.fastestPayoff.termMonths % 12 === 0 ? 0 : 1)} years`
                            : `${winners.fastestPayoff.termMonths} months`}.
                        </li>
                      )}
                    </ul>
                  </div>
                )}
                <div className="bg-gray-50 border border-gray-200 rounded-xl p-5">
                  <p className="font-semibold text-gray-900 mb-2">Beyond the numbers, also consider:</p>
                  <ul className="text-sm text-gray-700 space-y-1.5">
                    <li>How fast each lender can fund your loan</li>
                    <li>Whether there are prepayment penalties</li>
                    <li>The lender&apos;s reputation and customer service</li>
                    <li>Collateral requirements and personal guarantee terms</li>
                    <li>Whether the loan terms are flexible if your business needs change</li>
                  </ul>
                </div>
              </div>
            </details>
          </div>

          {/* CTA */}
          <div className="px-6 sm:px-8 lg:px-10 pb-8">
            <div className="bg-quicklend-50 rounded-xl p-6 text-center">
              <p className="text-gray-700 mb-1 font-medium">
                Want more offers to compare?
              </p>
              <p className="text-gray-500 text-sm mb-4">
                Get matched with multiple lenders. No impact to your credit score.
              </p>
              <Link
                href={`/get-started?source=loan-comparison-tool&loan_type=not-sure&amount=${results[0]?.amount || 100000}`}
                className="inline-flex items-center bg-quicklend-600 text-white font-semibold px-8 py-3 rounded-lg hover:bg-quicklend-700 transition-colors"
              >
                Get More Loan Options <ArrowRight className="ml-2 h-4 w-4" />
              </Link>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
