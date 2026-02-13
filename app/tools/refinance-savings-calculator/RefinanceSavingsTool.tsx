'use client'

import { useState, useMemo } from 'react'
import Link from 'next/link'
import {
  ArrowRight,
  DollarSign,
  TrendingDown,
  Clock,
  CheckCircle,
  AlertTriangle,
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

function calcMonthlyPayment(principal: number, annualRate: number, months: number): number {
  if (principal <= 0 || months <= 0) return 0
  if (annualRate <= 0) return principal / months
  const r = annualRate / 100 / 12
  return (principal * r * Math.pow(1 + r, months)) / (Math.pow(1 + r, months) - 1)
}

function calcRemainingBalance(principal: number, annualRate: number, totalMonths: number, monthsPaid: number): number {
  if (annualRate <= 0) return principal * (1 - monthsPaid / totalMonths)
  const r = annualRate / 100 / 12
  const balance = principal * Math.pow(1 + r, monthsPaid) -
    (calcMonthlyPayment(principal, annualRate, totalMonths) * (Math.pow(1 + r, monthsPaid) - 1)) / r
  return Math.max(0, balance)
}

// ────────────────────────────────────────────────────────────────────
// Verdict
// ────────────────────────────────────────────────────────────────────

type Verdict = 'strong' | 'moderate' | 'marginal' | 'not-worth-it'

function getVerdict(netSavings: number, breakEvenMonths: number | null, newTermMonths: number): {
  verdict: Verdict
  label: string
  color: string
  bgColor: string
  borderColor: string
} {
  if (netSavings <= 0)
    return { verdict: 'not-worth-it', label: 'Refinancing Costs More', color: 'text-red-700', bgColor: 'bg-red-50', borderColor: 'border-red-200' }
  if (breakEvenMonths !== null && breakEvenMonths <= 6 && netSavings > 5000)
    return { verdict: 'strong', label: 'Strong Savings', color: 'text-green-700', bgColor: 'bg-green-50', borderColor: 'border-green-200' }
  if (breakEvenMonths !== null && breakEvenMonths <= 12)
    return { verdict: 'moderate', label: 'Worth Considering', color: 'text-blue-700', bgColor: 'bg-blue-50', borderColor: 'border-blue-200' }
  return { verdict: 'marginal', label: 'Marginal Savings', color: 'text-amber-700', bgColor: 'bg-amber-50', borderColor: 'border-amber-200' }
}

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

const termOptions = [
  { value: 12, label: '1 year' },
  { value: 24, label: '2 years' },
  { value: 36, label: '3 years' },
  { value: 48, label: '4 years' },
  { value: 60, label: '5 years' },
  { value: 84, label: '7 years' },
  { value: 120, label: '10 years' },
]

export default function RefinanceSavingsTool() {
  // Current loan
  const [currentBalance, setCurrentBalance] = useState(150000)
  const [currentRate, setCurrentRate] = useState(18)
  const [currentRemaining, setCurrentRemaining] = useState(24)
  const [currentPayment, setCurrentPayment] = useState(0)
  const [useAutoPayment, setUseAutoPayment] = useState(true)

  // New loan
  const [newRate, setNewRate] = useState(10)
  const [newTermMonths, setNewTermMonths] = useState(36)
  const [newOriginationPct, setNewOriginationPct] = useState(2)
  const [newClosingCosts, setNewClosingCosts] = useState(0)
  const [prepaymentPenalty, setPrepaymentPenalty] = useState(0)

  // ── Calculations ──────────────────────────────────────────────────

  const results = useMemo(() => {
    if (currentBalance <= 0 || currentRemaining <= 0) return null

    // Current loan costs
    const autoPayment = calcMonthlyPayment(currentBalance, currentRate, currentRemaining)
    const monthlyPaymentCurrent = useAutoPayment ? autoPayment : (currentPayment > 0 ? currentPayment : autoPayment)
    const totalRemainingCurrent = monthlyPaymentCurrent * currentRemaining
    const totalInterestCurrent = totalRemainingCurrent - currentBalance

    // New loan details
    const newOriginationAmount = currentBalance * (newOriginationPct / 100)
    const totalNewFees = newOriginationAmount + newClosingCosts + prepaymentPenalty
    const newLoanAmount = currentBalance // Refinance the remaining balance
    const monthlyPaymentNew = calcMonthlyPayment(newLoanAmount, newRate, newTermMonths)
    const totalRepaymentNew = monthlyPaymentNew * newTermMonths
    const totalInterestNew = totalRepaymentNew - newLoanAmount
    const totalCostNew = totalInterestNew + totalNewFees

    // Savings
    const monthlySavings = monthlyPaymentCurrent - monthlyPaymentNew
    const totalInterestSavings = totalInterestCurrent - totalInterestNew
    const netSavings = totalInterestSavings - totalNewFees

    // Break-even: months of payment savings to recoup fees
    let breakEvenMonths: number | null = null
    if (monthlySavings > 0 && totalNewFees > 0) {
      breakEvenMonths = Math.ceil(totalNewFees / monthlySavings)
    } else if (monthlySavings > 0 && totalNewFees === 0) {
      breakEvenMonths = 0
    }

    // Amortization comparison data (monthly)
    const comparisonData: { month: number; currentBalance: number; newBalance: number }[] = []
    let curBal = currentBalance
    let newBal = newLoanAmount
    const rCurrent = currentRate / 100 / 12
    const rNew = newRate / 100 / 12
    const maxMonths = Math.max(currentRemaining, newTermMonths)

    for (let m = 1; m <= maxMonths; m++) {
      // Current loan balance
      if (m <= currentRemaining && curBal > 0) {
        const interest = curBal * rCurrent
        const principal = monthlyPaymentCurrent - interest
        curBal = Math.max(0, curBal - principal)
      } else {
        curBal = 0
      }

      // New loan balance
      if (m <= newTermMonths && newBal > 0) {
        const interest = newBal * rNew
        const principal = monthlyPaymentNew - interest
        newBal = Math.max(0, newBal - principal)
      } else {
        newBal = 0
      }

      comparisonData.push({ month: m, currentBalance: curBal, newBalance: newBal })
    }

    const verdict = getVerdict(netSavings, breakEvenMonths, newTermMonths)

    return {
      monthlyPaymentCurrent,
      monthlyPaymentNew,
      totalRemainingCurrent,
      totalRepaymentNew,
      totalInterestCurrent,
      totalInterestNew,
      totalNewFees,
      newOriginationAmount,
      totalCostNew,
      monthlySavings,
      totalInterestSavings,
      netSavings,
      breakEvenMonths,
      comparisonData,
      verdict,
    }
  }, [currentBalance, currentRate, currentRemaining, currentPayment, useAutoPayment, newRate, newTermMonths, newOriginationPct, newClosingCosts, prepaymentPenalty])

  return (
    <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
      {/* Intro */}
      <div className="p-6 sm:p-8 lg:p-10 pb-0">
        <p className="text-gray-700 leading-relaxed mb-2">
          Compare your current loan against a new offer to see if refinancing saves you money. Factor in fees and penalties to get the real picture.
        </p>
        <p className="text-gray-500 text-sm mb-0">
          A lower rate does not always mean savings once you account for closing costs and prepayment penalties.
        </p>
      </div>

      {/* Inputs */}
      <div className="p-6 sm:p-8 lg:p-10">
        <div className="space-y-8">
          {/* Current Loan */}
          <div>
            <h3 className="text-base font-bold text-gray-900 mb-1 flex items-center gap-2">
              <div className="w-6 h-6 rounded-full bg-red-100 text-red-600 flex items-center justify-center text-xs font-bold">1</div>
              Your Current Loan
            </h3>
            <p className="text-xs text-gray-400 mb-4 ml-8">Enter the details of the loan you are considering refinancing.</p>

            <div className="space-y-4 ml-8">
              <CurrencyInput
                label="Remaining Balance"
                value={currentBalance}
                onChange={setCurrentBalance}
                hint="The outstanding principal balance on your current loan."
              />

              <div className="grid md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Current Interest Rate: <span className="text-quicklend-600 font-bold">{currentRate}%</span>
                  </label>
                  <input
                    type="range"
                    min={3}
                    max={35}
                    step={0.5}
                    value={currentRate}
                    onChange={(e) => setCurrentRate(Number(e.target.value))}
                    className="w-full accent-quicklend-600"
                  />
                  <div className="flex justify-between text-xs text-gray-400 mt-1">
                    <span>3%</span>
                    <span>35%</span>
                  </div>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Months Remaining: <span className="text-quicklend-600 font-bold">{currentRemaining}</span>
                  </label>
                  <input
                    type="range"
                    min={1}
                    max={120}
                    step={1}
                    value={currentRemaining}
                    onChange={(e) => setCurrentRemaining(Number(e.target.value))}
                    className="w-full accent-quicklend-600"
                  />
                  <div className="flex justify-between text-xs text-gray-400 mt-1">
                    <span>1 mo</span>
                    <span>120 mo</span>
                  </div>
                </div>
              </div>

              <div className="flex items-center gap-3">
                <label className="flex items-center gap-2 text-sm text-gray-600 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={useAutoPayment}
                    onChange={(e) => setUseAutoPayment(e.target.checked)}
                    className="rounded border-gray-300 text-quicklend-600 focus:ring-quicklend-500"
                  />
                  Auto-calculate monthly payment
                </label>
              </div>
              {!useAutoPayment && (
                <CurrencyInput
                  label="Current Monthly Payment"
                  value={currentPayment}
                  onChange={setCurrentPayment}
                  max={500000}
                  hint="Your actual monthly payment if different from the calculated amount."
                />
              )}
            </div>
          </div>

          {/* New Loan */}
          <div className="border-t border-gray-100 pt-6">
            <h3 className="text-base font-bold text-gray-900 mb-1 flex items-center gap-2">
              <div className="w-6 h-6 rounded-full bg-green-100 text-green-600 flex items-center justify-center text-xs font-bold">2</div>
              New Refinance Offer
            </h3>
            <p className="text-xs text-gray-400 mb-4 ml-8">Enter the terms of the loan you are considering switching to.</p>

            <div className="space-y-4 ml-8">
              <div className="grid md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    New Interest Rate: <span className="text-quicklend-600 font-bold">{newRate}%</span>
                  </label>
                  <input
                    type="range"
                    min={3}
                    max={35}
                    step={0.5}
                    value={newRate}
                    onChange={(e) => setNewRate(Number(e.target.value))}
                    className="w-full accent-quicklend-600"
                  />
                  <div className="flex justify-between text-xs text-gray-400 mt-1">
                    <span>3%</span>
                    <span>35%</span>
                  </div>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">New Loan Term</label>
                  <select
                    value={newTermMonths}
                    onChange={(e) => setNewTermMonths(Number(e.target.value))}
                    className="w-full rounded-lg border border-gray-300 px-4 py-3 text-gray-900 focus:border-quicklend-600 focus:ring-2 focus:ring-quicklend-600/20 focus:outline-none transition-colors"
                  >
                    {termOptions.map((opt) => (
                      <option key={opt.value} value={opt.value}>{opt.label}</option>
                    ))}
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Origination Fee: <span className="text-quicklend-600 font-bold">{newOriginationPct}%</span>
                  <span className="text-gray-400 font-normal ml-2">({formatCurrency(currentBalance * newOriginationPct / 100)})</span>
                </label>
                <input
                  type="range"
                  min={0}
                  max={5}
                  step={0.25}
                  value={newOriginationPct}
                  onChange={(e) => setNewOriginationPct(Number(e.target.value))}
                  className="w-full accent-quicklend-600"
                />
                <div className="flex justify-between text-xs text-gray-400 mt-1">
                  <span>0%</span>
                  <span>5%</span>
                </div>
              </div>

              <div className="grid md:grid-cols-2 gap-4">
                <CurrencyInput
                  label="Closing Costs"
                  value={newClosingCosts}
                  onChange={setNewClosingCosts}
                  max={50000}
                  hint="New loan closing and processing fees."
                />
                <CurrencyInput
                  label="Prepayment Penalty"
                  value={prepaymentPenalty}
                  onChange={setPrepaymentPenalty}
                  max={100000}
                  hint="Penalty for paying off your current loan early."
                />
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Results */}
      {results && (
        <div className="border-t border-gray-100">
          {/* Verdict Banner */}
          <div className="p-6 sm:p-8 lg:p-10 pb-0">
            <div className={`${results.verdict.bgColor} border ${results.verdict.borderColor} rounded-xl p-5 flex flex-col sm:flex-row items-center gap-4`}>
              <div className="flex items-center gap-3">
                {results.verdict.verdict === 'strong' ? (
                  <CheckCircle className={`h-8 w-8 ${results.verdict.color}`} />
                ) : results.verdict.verdict === 'not-worth-it' ? (
                  <AlertTriangle className={`h-8 w-8 ${results.verdict.color}`} />
                ) : (
                  <Info className={`h-8 w-8 ${results.verdict.color}`} />
                )}
                <div>
                  <p className={`text-lg font-bold ${results.verdict.color}`}>{results.verdict.label}</p>
                  <p className="text-sm text-gray-600">
                    {results.verdict.verdict === 'strong' && `Refinancing saves you ${formatCurrency(results.netSavings)} after fees. The new rate and terms are significantly better.`}
                    {results.verdict.verdict === 'moderate' && `You could save ${formatCurrency(results.netSavings)} by refinancing, but factor in the time to recoup fees.`}
                    {results.verdict.verdict === 'marginal' && `The savings are small relative to the cost of refinancing. It may not be worth the effort.`}
                    {results.verdict.verdict === 'not-worth-it' && 'Refinancing would cost more than keeping your current loan. The fees outweigh the interest savings.'}
                  </p>
                </div>
              </div>
              <div className="sm:ml-auto text-center sm:text-right shrink-0">
                <p className={`text-3xl font-bold ${results.netSavings >= 0 ? 'text-green-600' : 'text-red-600'}`}>
                  {formatCurrency(Math.abs(results.netSavings))}
                </p>
                <p className="text-xs text-gray-500">{results.netSavings >= 0 ? 'net savings' : 'net cost'}</p>
              </div>
            </div>
          </div>

          {/* Key Metrics */}
          <div className="p-6 sm:p-8 lg:p-10">
            <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
              <div className="bg-gray-50 border border-gray-200 rounded-xl p-4 text-center">
                <DollarSign className="h-5 w-5 text-gray-400 mx-auto mb-1" />
                <p className="text-xs font-semibold text-gray-500 uppercase tracking-wider mb-1">Monthly Savings</p>
                <p className={`text-xl font-bold ${results.monthlySavings >= 0 ? 'text-green-600' : 'text-red-500'}`}>
                  {formatCurrency(results.monthlySavings)}
                </p>
                <p className="text-xs text-gray-400 mt-1">/month</p>
              </div>
              <div className="bg-gray-50 border border-gray-200 rounded-xl p-4 text-center">
                <TrendingDown className="h-5 w-5 text-gray-400 mx-auto mb-1" />
                <p className="text-xs font-semibold text-gray-500 uppercase tracking-wider mb-1">Interest Saved</p>
                <p className={`text-xl font-bold ${results.totalInterestSavings >= 0 ? 'text-green-600' : 'text-red-500'}`}>
                  {formatCurrency(results.totalInterestSavings)}
                </p>
                <p className="text-xs text-gray-400 mt-1">over loan life</p>
              </div>
              <div className="bg-gray-50 border border-gray-200 rounded-xl p-4 text-center">
                <DollarSign className="h-5 w-5 text-gray-400 mx-auto mb-1" />
                <p className="text-xs font-semibold text-gray-500 uppercase tracking-wider mb-1">Refinance Costs</p>
                <p className="text-xl font-bold text-amber-600">{formatCurrency(results.totalNewFees)}</p>
                <p className="text-xs text-gray-400 mt-1">fees + penalties</p>
              </div>
              <div className="bg-gray-50 border border-gray-200 rounded-xl p-4 text-center">
                <Clock className="h-5 w-5 text-gray-400 mx-auto mb-1" />
                <p className="text-xs font-semibold text-gray-500 uppercase tracking-wider mb-1">Break-Even</p>
                <p className="text-xl font-bold text-gray-900">
                  {results.breakEvenMonths !== null
                    ? results.breakEvenMonths === 0
                      ? 'Immediate'
                      : `${results.breakEvenMonths} mo`
                    : 'N/A'}
                </p>
                <p className="text-xs text-gray-400 mt-1">
                  {results.breakEvenMonths !== null && results.breakEvenMonths > 0
                    ? 'to recoup fees'
                    : results.breakEvenMonths === 0
                      ? 'no upfront costs'
                      : 'does not break even'}
                </p>
              </div>
            </div>
          </div>

          {/* Side-by-Side Comparison */}
          <div className="px-6 sm:px-8 lg:px-10 pb-8">
            <div className="bg-quicklend-900 rounded-xl p-5">
              <div className="grid grid-cols-3 gap-4 text-center">
                <div>
                  <p className="text-quicklend-300 text-xs uppercase tracking-wider mb-2">Current Loan</p>
                  <p className="text-white font-bold text-lg">{formatCurrency(results.monthlyPaymentCurrent)}<span className="text-quicklend-300 text-xs font-normal">/mo</span></p>
                  <p className="text-quicklend-400 text-xs mt-1">{currentRate}% for {currentRemaining} months</p>
                  <p className="text-quicklend-400 text-xs">Total remaining: {formatCurrency(results.totalRemainingCurrent)}</p>
                </div>
                <div className="flex items-center justify-center">
                  <div className="text-center">
                    <ArrowRight className="h-6 w-6 text-quicklend-400 mx-auto" />
                    <p className="text-xs text-quicklend-400 mt-1">vs</p>
                  </div>
                </div>
                <div>
                  <p className="text-quicklend-300 text-xs uppercase tracking-wider mb-2">New Loan</p>
                  <p className="text-amber-400 font-bold text-lg">{formatCurrency(results.monthlyPaymentNew)}<span className="text-quicklend-300 text-xs font-normal">/mo</span></p>
                  <p className="text-quicklend-400 text-xs mt-1">{newRate}% for {newTermMonths} months</p>
                  <p className="text-quicklend-400 text-xs">Total cost: {formatCurrency(results.totalRepaymentNew + results.totalNewFees)}</p>
                </div>
              </div>
            </div>
          </div>

          {/* Balance Payoff Chart */}
          <div className="px-6 sm:px-8 lg:px-10 pb-8">
            <h4 className="text-sm font-semibold text-gray-700 mb-3">Balance Payoff Timeline</h4>
            <div className="space-y-1">
              {results.comparisonData
                .filter((_, i) => {
                  const total = results.comparisonData.length
                  if (total <= 12) return true
                  if (i === 0 || i === total - 1) return true
                  const step = Math.max(1, Math.floor(total / 10))
                  return i % step === 0
                })
                .map((d) => {
                  const maxBal = currentBalance
                  const curPct = (d.currentBalance / maxBal) * 100
                  const newPct = (d.newBalance / maxBal) * 100
                  return (
                    <div key={d.month} className="flex items-center gap-2">
                      <span className="text-xs text-gray-500 w-10 text-right shrink-0">Mo {d.month}</span>
                      <div className="flex-1 space-y-0.5">
                        <div className="w-full bg-gray-100 rounded-full h-2.5">
                          <div className="bg-red-400 h-full rounded-full" style={{ width: `${curPct}%` }} />
                        </div>
                        <div className="w-full bg-gray-100 rounded-full h-2.5">
                          <div className="bg-green-500 h-full rounded-full" style={{ width: `${newPct}%` }} />
                        </div>
                      </div>
                    </div>
                  )
                })}
            </div>
            <div className="flex items-center gap-4 mt-3 text-xs text-gray-500">
              <div className="flex items-center gap-1.5">
                <span className="w-3 h-3 rounded-sm bg-red-400" /> Current loan
              </div>
              <div className="flex items-center gap-1.5">
                <span className="w-3 h-3 rounded-sm bg-green-500" /> New loan
              </div>
            </div>
          </div>

          {/* Break-Even Timeline */}
          {results.breakEvenMonths !== null && results.breakEvenMonths > 0 && results.monthlySavings > 0 && (
            <div className="px-6 sm:px-8 lg:px-10 pb-8">
              <h4 className="text-sm font-semibold text-gray-700 mb-3">Break-Even Timeline</h4>
              <div className="bg-gray-50 rounded-xl p-4">
                <div className="flex items-center gap-3 mb-3">
                  <div className="w-full bg-gray-200 rounded-full h-4 overflow-hidden">
                    <div
                      className="bg-quicklend-600 h-full rounded-full transition-all"
                      style={{ width: `${Math.min(100, (results.breakEvenMonths / newTermMonths) * 100)}%` }}
                    />
                  </div>
                </div>
                <div className="flex justify-between text-xs text-gray-500">
                  <span>Month 0</span>
                  <span className="text-quicklend-600 font-semibold">Break-even: Month {results.breakEvenMonths}</span>
                  <span>Month {newTermMonths}</span>
                </div>
                <p className="text-xs text-gray-500 mt-2">
                  Monthly savings of {formatCurrency(results.monthlySavings)} cover the {formatCurrency(results.totalNewFees)} in refinance costs after {results.breakEvenMonths} months.
                  The remaining {newTermMonths - results.breakEvenMonths} months are pure savings.
                </p>
              </div>
            </div>
          )}

          {/* Detailed Comparison Table */}
          <div className="px-6 sm:px-8 lg:px-10 pb-8">
            <details className="group">
              <summary className="cursor-pointer text-sm font-semibold text-gray-600 hover:text-gray-900 flex items-center gap-2">
                <span className="group-open:rotate-90 transition-transform">&#9654;</span>
                Full Comparison Details
              </summary>
              <div className="mt-4 overflow-x-auto -mx-6 sm:mx-0">
                <table className="w-full text-sm">
                  <thead>
                    <tr className="border-b border-gray-200">
                      <th className="text-left px-4 py-2 text-gray-500 font-medium">Detail</th>
                      <th className="text-right px-4 py-2 text-gray-500 font-medium">Current Loan</th>
                      <th className="text-right px-4 py-2 text-gray-500 font-medium">New Loan</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr className="border-b border-gray-100">
                      <td className="px-4 py-2.5 text-gray-700">Interest Rate</td>
                      <td className="px-4 py-2.5 text-right text-gray-900">{currentRate}%</td>
                      <td className="px-4 py-2.5 text-right text-gray-900">{newRate}%</td>
                    </tr>
                    <tr className="border-b border-gray-100">
                      <td className="px-4 py-2.5 text-gray-700">Remaining Term</td>
                      <td className="px-4 py-2.5 text-right text-gray-900">{currentRemaining} months</td>
                      <td className="px-4 py-2.5 text-right text-gray-900">{newTermMonths} months</td>
                    </tr>
                    <tr className="border-b border-gray-100">
                      <td className="px-4 py-2.5 text-gray-700">Monthly Payment</td>
                      <td className="px-4 py-2.5 text-right text-gray-900">{formatCurrency(results.monthlyPaymentCurrent)}</td>
                      <td className="px-4 py-2.5 text-right text-green-600 font-medium">{formatCurrency(results.monthlyPaymentNew)}</td>
                    </tr>
                    <tr className="border-b border-gray-100">
                      <td className="px-4 py-2.5 text-gray-700">Total Interest</td>
                      <td className="px-4 py-2.5 text-right text-gray-900">{formatCurrency(results.totalInterestCurrent)}</td>
                      <td className="px-4 py-2.5 text-right text-gray-900">{formatCurrency(results.totalInterestNew)}</td>
                    </tr>
                    <tr className="border-b border-gray-100">
                      <td className="px-4 py-2.5 text-gray-700">Refinance Fees</td>
                      <td className="px-4 py-2.5 text-right text-gray-400">N/A</td>
                      <td className="px-4 py-2.5 text-right text-amber-600">{formatCurrency(results.totalNewFees)}</td>
                    </tr>
                    <tr className="border-b border-gray-100">
                      <td className="px-4 py-2.5 text-gray-700">Total Remaining Cost</td>
                      <td className="px-4 py-2.5 text-right text-gray-900 font-medium">{formatCurrency(results.totalRemainingCurrent)}</td>
                      <td className="px-4 py-2.5 text-right text-gray-900 font-medium">{formatCurrency(results.totalRepaymentNew + results.totalNewFees)}</td>
                    </tr>
                    <tr className={results.netSavings >= 0 ? 'bg-green-50' : 'bg-red-50'}>
                      <td className="px-4 py-2.5 text-gray-900 font-semibold">Net Savings</td>
                      <td className="px-4 py-2.5" />
                      <td className={`px-4 py-2.5 text-right font-bold ${results.netSavings >= 0 ? 'text-green-600' : 'text-red-600'}`}>
                        {results.netSavings >= 0 ? '' : '-'}{formatCurrency(Math.abs(results.netSavings))}
                      </td>
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
                {results.verdict.verdict === 'strong' && `Refinancing could save you ${formatCurrency(results.monthlySavings)} per month and ${formatCurrency(results.netSavings)} overall.`}
                {results.verdict.verdict === 'moderate' && 'Refinancing looks promising. Compare a few offers to maximize your savings.'}
                {results.verdict.verdict === 'marginal' && 'The savings are small. A better rate or lower fees could tip the balance.'}
                {results.verdict.verdict === 'not-worth-it' && 'Refinancing does not make sense at these terms. A lower rate or longer term could change that.'}
              </p>
              <p className="text-gray-500 text-sm mb-4">
                Get matched with refinance offers from multiple lenders. No impact to your credit score.
              </p>
              <div className="flex flex-col sm:flex-row gap-3 justify-center">
                <Link
                  href={`/get-started?source=refinance-calculator&loan_type=term-loans&amount=${currentBalance}`}
                  className="inline-flex items-center justify-center bg-quicklend-600 text-white font-semibold px-8 py-3 rounded-lg hover:bg-quicklend-700 transition-colors"
                >
                  {results.netSavings >= 0 ? 'Check Refinance Options' : 'See Your Options'} <ArrowRight className="ml-2 h-4 w-4" />
                </Link>
                <Link
                  href="/tools/total-cost-of-capital-calculator"
                  className="inline-flex items-center justify-center border border-quicklend-300 text-quicklend-700 font-semibold px-6 py-3 rounded-lg hover:bg-quicklend-50 transition-colors text-sm"
                >
                  See True Cost of Loan
                </Link>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
