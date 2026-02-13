'use client'

import { useState, useMemo } from 'react'
import Link from 'next/link'
import {
  ChevronRight,
  ArrowRight,
  Info,
  ToggleLeft,
  ToggleRight,
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

function formatCurrencyCents(value: number): string {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  }).format(value)
}

function parseCurrencyInput(value: string): number {
  return Number(value.replace(/[^0-9]/g, '')) || 0
}

function formatInputDisplay(value: number): string {
  if (value === 0) return ''
  return value.toLocaleString('en-US')
}

/** Standard amortization monthly payment */
function amortizationPayment(principal: number, annualRate: number, months: number): number {
  if (principal <= 0 || annualRate <= 0 || months <= 0) return 0
  const r = annualRate / 100 / 12
  const n = months
  return principal * (r * Math.pow(1 + r, n)) / (Math.pow(1 + r, n) - 1)
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
}: {
  label: string
  value: number
  onChange: (v: number) => void
  helperText?: string
  max?: number
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

const durationOptions = [
  { value: 1, label: '1 month' },
  { value: 3, label: '3 months' },
  { value: 6, label: '6 months' },
  { value: 9, label: '9 months' },
  { value: 12, label: '12 months' },
  { value: 18, label: '18 months' },
  { value: 24, label: '24 months' },
  { value: 36, label: '36 months' },
]

const drawPresets = [25000, 50000, 100000, 200000, 500000]

export default function LineOfCreditInterestTool() {
  const [creditLimit, setCreditLimit] = useState(200000)
  const [drawAmount, setDrawAmount] = useState(50000)
  const [apr, setApr] = useState(12)
  const [drawDuration, setDrawDuration] = useState(6)
  const [repaymentType, setRepaymentType] = useState<'interest-only' | 'principal-interest'>('interest-only')
  const [drawFeePercent, setDrawFeePercent] = useState(0)

  const results = useMemo(() => {
    if (drawAmount <= 0 || apr <= 0 || drawDuration <= 0) return null
    const effectiveDrawAmount = Math.min(drawAmount, creditLimit)
    if (effectiveDrawAmount <= 0) return null

    const monthlyRate = apr / 100 / 12
    const drawFee = effectiveDrawAmount * (drawFeePercent / 100)
    const availableCredit = creditLimit - effectiveDrawAmount
    const utilization = (effectiveDrawAmount / creditLimit) * 100

    let monthlyPayment: number
    let totalInterest: number
    let totalPaid: number
    let schedule: { month: number; payment: number; interest: number; principal: number; balance: number }[] = []

    if (repaymentType === 'interest-only') {
      const monthlyInterest = effectiveDrawAmount * monthlyRate
      monthlyPayment = monthlyInterest
      totalInterest = monthlyInterest * drawDuration
      totalPaid = totalInterest + effectiveDrawAmount // principal repaid at end

      let balance = effectiveDrawAmount
      for (let m = 1; m <= drawDuration; m++) {
        const interest = balance * monthlyRate
        const princ = m === drawDuration ? balance : 0
        const pmt = interest + princ
        schedule.push({ month: m, payment: pmt, interest, principal: princ, balance: m === drawDuration ? 0 : balance })
      }
    } else {
      monthlyPayment = amortizationPayment(effectiveDrawAmount, apr, drawDuration)
      totalPaid = monthlyPayment * drawDuration
      totalInterest = totalPaid - effectiveDrawAmount

      let balance = effectiveDrawAmount
      for (let m = 1; m <= drawDuration; m++) {
        const interest = balance * monthlyRate
        const princ = monthlyPayment - interest
        balance = Math.max(0, balance - princ)
        schedule.push({ month: m, payment: monthlyPayment, interest, principal: princ, balance })
      }
    }

    const totalCost = totalInterest + drawFee

    // Effective APR: annualized cost including fees
    let effectiveApr = apr
    if (drawFee > 0 && drawDuration > 0) {
      effectiveApr = (totalCost / effectiveDrawAmount) * (12 / drawDuration) * 100
    }

    // Term loan comparison: same amount, same rate, same duration, always P+I
    const termLoanPayment = amortizationPayment(effectiveDrawAmount, apr, drawDuration)
    const termLoanTotalPaid = termLoanPayment * drawDuration
    const termLoanTotalInterest = termLoanTotalPaid - effectiveDrawAmount
    const termLoanTotalCost = termLoanTotalInterest // no draw fee on term loans

    return {
      effectiveDrawAmount,
      drawFee,
      availableCredit,
      utilization,
      monthlyPayment,
      totalInterest,
      totalPaid,
      totalCost,
      effectiveApr,
      schedule,
      termLoan: {
        monthlyPayment: termLoanPayment,
        totalInterest: termLoanTotalInterest,
        totalCost: termLoanTotalCost,
      },
    }
  }, [creditLimit, drawAmount, apr, drawDuration, repaymentType, drawFeePercent])

  return (
    <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
      {/* Intro */}
      <div className="p-6 sm:p-8 lg:p-10 pb-0">
        <p className="text-gray-700 leading-relaxed mb-2">
          Enter your credit line details and draw amount to see the full cost breakdown. Toggle between interest-only and principal-plus-interest to compare repayment options.
        </p>
        <p className="text-gray-500 text-sm mb-0">
          All results update in real time. You only pay interest on what you draw, not the full credit limit.
        </p>
      </div>

      {/* Inputs */}
      <div className="p-6 sm:p-8 lg:p-10">
        <div className="space-y-6">
          {/* Credit Limit & Draw Amount */}
          <div className="grid md:grid-cols-2 gap-6">
            <CurrencyInput
              label="Credit Line Limit"
              value={creditLimit}
              onChange={setCreditLimit}
              helperText="Your total approved credit line amount."
              max={10000000}
            />
            <div>
              <CurrencyInput
                label="Draw Amount"
                value={drawAmount}
                onChange={setDrawAmount}
                helperText="How much you plan to draw from the line."
                max={creditLimit}
              />
              {drawAmount > creditLimit && (
                <p className="text-xs text-amber-600 mt-1">Draw cannot exceed credit limit. Using {formatCurrency(creditLimit)}.</p>
              )}
            </div>
          </div>

          {/* Draw Presets */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Quick Draw Amounts</label>
            <div className="flex flex-wrap gap-2">
              {drawPresets.filter(p => p <= creditLimit).map((preset) => (
                <button
                  key={preset}
                  onClick={() => setDrawAmount(preset)}
                  className={`px-3 py-1.5 rounded-full text-xs font-medium border transition-colors ${
                    drawAmount === preset
                      ? 'bg-quicklend-600 text-white border-quicklend-600'
                      : 'bg-white text-gray-600 border-gray-200 hover:border-quicklend-300'
                  }`}
                >
                  {formatCurrency(preset)}
                </button>
              ))}
            </div>
          </div>

          {/* Rate & Duration */}
          <div className="grid md:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Interest Rate (APR): <span className="text-quicklend-600 font-bold">{apr}%</span>
              </label>
              <input
                type="range"
                min={3}
                max={25}
                step={0.5}
                value={apr}
                onChange={(e) => setApr(Number(e.target.value))}
                className="w-full accent-quicklend-600"
              />
              <div className="flex justify-between text-xs text-gray-400 mt-1">
                <span>3%</span>
                <span>25%</span>
              </div>
              <p className="text-xs text-gray-400 mt-2">
                Banks: 7-12% | Online lenders: 10-25% | SBA: 6-10%
              </p>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Draw Duration</label>
              <select
                value={drawDuration}
                onChange={(e) => setDrawDuration(Number(e.target.value))}
                className="w-full rounded-lg border border-gray-300 px-4 py-3 text-gray-900 focus:border-quicklend-600 focus:ring-2 focus:ring-quicklend-600/20 focus:outline-none transition-colors"
              >
                {durationOptions.map((opt) => (
                  <option key={opt.value} value={opt.value}>{opt.label}</option>
                ))}
              </select>
              <p className="text-xs text-gray-400 mt-2">
                How long you plan to keep the funds drawn
              </p>
            </div>
          </div>

          {/* Repayment Type & Draw Fee */}
          <div className="grid md:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Repayment Type</label>
              <div className="flex gap-2">
                <button
                  onClick={() => setRepaymentType('interest-only')}
                  className={`flex-1 flex items-center justify-center gap-2 px-4 py-3 rounded-lg border text-sm font-medium transition-colors ${
                    repaymentType === 'interest-only'
                      ? 'bg-quicklend-50 border-quicklend-300 text-quicklend-700'
                      : 'bg-white border-gray-200 text-gray-600 hover:border-gray-300'
                  }`}
                >
                  {repaymentType === 'interest-only' ? <ToggleRight className="h-4 w-4" /> : <ToggleLeft className="h-4 w-4" />}
                  Interest Only
                </button>
                <button
                  onClick={() => setRepaymentType('principal-interest')}
                  className={`flex-1 flex items-center justify-center gap-2 px-4 py-3 rounded-lg border text-sm font-medium transition-colors ${
                    repaymentType === 'principal-interest'
                      ? 'bg-quicklend-50 border-quicklend-300 text-quicklend-700'
                      : 'bg-white border-gray-200 text-gray-600 hover:border-gray-300'
                  }`}
                >
                  {repaymentType === 'principal-interest' ? <ToggleRight className="h-4 w-4" /> : <ToggleLeft className="h-4 w-4" />}
                  P + I
                </button>
              </div>
              <p className="text-xs text-gray-400 mt-2">
                {repaymentType === 'interest-only'
                  ? 'Pay only interest monthly. Full principal due at end of draw period.'
                  : 'Each payment includes principal and interest. Balance paid off by end of term.'}
              </p>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Draw Fee: <span className="text-quicklend-600 font-bold">{drawFeePercent}%</span>
              </label>
              <input
                type="range"
                min={0}
                max={3}
                step={0.25}
                value={drawFeePercent}
                onChange={(e) => setDrawFeePercent(Number(e.target.value))}
                className="w-full accent-quicklend-600"
              />
              <div className="flex justify-between text-xs text-gray-400 mt-1">
                <span>0%</span>
                <span>3%</span>
              </div>
              <p className="text-xs text-gray-400 mt-2">
                One-time fee charged on each draw. Not all lenders charge this.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Results */}
      {results && (
        <div className="border-t border-gray-100">
          {/* Utilization Bar */}
          <div className="p-6 sm:p-8 lg:p-10 pb-0">
            <div className="flex items-center justify-between text-sm mb-2">
              <span className="text-gray-600">Credit Utilization</span>
              <span className="font-semibold text-quicklend-900">{results.utilization.toFixed(0)}% used</span>
            </div>
            <div className="h-3 bg-gray-100 rounded-full overflow-hidden">
              <div
                className={`h-full rounded-full transition-all duration-500 ${
                  results.utilization > 80 ? 'bg-amber-500' : 'bg-quicklend-600'
                }`}
                style={{ width: `${Math.min(100, results.utilization)}%` }}
              />
            </div>
            <div className="flex justify-between text-xs text-gray-400 mt-1">
              <span>Drawing {formatCurrency(results.effectiveDrawAmount)}</span>
              <span>{formatCurrency(results.availableCredit)} available</span>
            </div>
          </div>

          {/* Key Metrics */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 p-6 sm:p-8 lg:p-10">
            <div className="bg-quicklend-50 border border-quicklend-200 rounded-xl p-5 text-center">
              <p className="text-sm text-gray-600 mb-1">Monthly Payment</p>
              <p className="text-2xl font-bold text-quicklend-900">{formatCurrencyCents(results.monthlyPayment)}</p>
              <p className="text-xs text-gray-500 mt-1">
                {repaymentType === 'interest-only' ? 'interest only' : 'principal + interest'}
              </p>
            </div>
            <div className="bg-gray-50 rounded-xl p-5 text-center">
              <p className="text-sm text-gray-600 mb-1">Total Interest</p>
              <p className="text-xl font-bold text-quicklend-900">{formatCurrency(results.totalInterest)}</p>
            </div>
            <div className="bg-gray-50 rounded-xl p-5 text-center">
              <p className="text-sm text-gray-600 mb-1">Total Cost</p>
              <p className="text-xl font-bold text-quicklend-900">{formatCurrency(results.totalCost)}</p>
              {results.drawFee > 0 && (
                <p className="text-xs text-gray-500 mt-1">incl. {formatCurrency(results.drawFee)} fee</p>
              )}
            </div>
            <div className="bg-gray-50 rounded-xl p-5 text-center">
              <p className="text-sm text-gray-600 mb-1">Effective APR</p>
              <p className="text-xl font-bold text-quicklend-900">{results.effectiveApr.toFixed(1)}%</p>
              {results.drawFee > 0 && results.effectiveApr > apr && (
                <p className="text-xs text-gray-500 mt-1">vs {apr}% stated</p>
              )}
            </div>
          </div>

          {/* Draw Fee Callout */}
          {results.drawFee > 0 && (
            <div className="px-6 sm:px-8 lg:px-10 pb-6">
              <div className="bg-amber-50 border border-amber-200 rounded-xl p-4">
                <p className="text-sm text-amber-800">
                  <strong>Draw fee:</strong> {formatCurrency(results.drawFee)} ({drawFeePercent}% of {formatCurrency(results.effectiveDrawAmount)}). This is a one-time upfront charge that increases your effective APR from {apr}% to {results.effectiveApr.toFixed(1)}%.
                </p>
              </div>
            </div>
          )}

          {/* Repayment Comparison */}
          <div className="px-6 sm:px-8 lg:px-10 pb-8">
            <h3 className="text-sm font-semibold text-gray-700 mb-4">LOC Draw vs. Term Loan Comparison</h3>
            <div className="bg-gray-50 rounded-xl overflow-hidden">
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b border-gray-200">
                    <th className="text-left px-4 py-3 font-semibold text-gray-700"></th>
                    <th className="text-right px-4 py-3 font-semibold text-gray-700">
                      LOC ({repaymentType === 'interest-only' ? 'Interest Only' : 'P+I'})
                    </th>
                    <th className="text-right px-4 py-3 font-semibold text-gray-700">Term Loan (P+I)</th>
                  </tr>
                </thead>
                <tbody>
                  <tr className="border-b border-gray-100">
                    <td className="px-4 py-3 text-gray-700">Monthly Payment</td>
                    <td className="px-4 py-3 text-right font-medium text-quicklend-900">{formatCurrencyCents(results.monthlyPayment)}</td>
                    <td className="px-4 py-3 text-right text-gray-600">{formatCurrencyCents(results.termLoan.monthlyPayment)}</td>
                  </tr>
                  <tr className="border-b border-gray-100">
                    <td className="px-4 py-3 text-gray-700">Total Interest</td>
                    <td className="px-4 py-3 text-right font-medium text-quicklend-900">{formatCurrency(results.totalInterest)}</td>
                    <td className="px-4 py-3 text-right text-gray-600">{formatCurrency(results.termLoan.totalInterest)}</td>
                  </tr>
                  <tr className="border-b border-gray-100">
                    <td className="px-4 py-3 text-gray-700">Total Cost (interest + fees)</td>
                    <td className="px-4 py-3 text-right font-medium text-quicklend-900">{formatCurrency(results.totalCost)}</td>
                    <td className="px-4 py-3 text-right text-gray-600">{formatCurrency(results.termLoan.totalCost)}</td>
                  </tr>
                  <tr>
                    <td className="px-4 py-3 text-gray-700">Flexibility</td>
                    <td className="px-4 py-3 text-right text-green-600 font-medium">Revolving, re-drawable</td>
                    <td className="px-4 py-3 text-right text-gray-500">One-time lump sum</td>
                  </tr>
                </tbody>
              </table>
            </div>
            <p className="text-xs text-gray-400 mt-2">
              Comparison assumes same rate and duration. LOC advantage: draw only what you need and repay early without penalty on most lines.
            </p>
          </div>

          {/* Payment Schedule */}
          <div className="px-6 sm:px-8 lg:px-10 pb-8">
            <details className="group">
              <summary className="cursor-pointer text-sm font-semibold text-gray-600 hover:text-gray-900 flex items-center gap-2">
                <ChevronRight className="h-4 w-4 group-open:rotate-90 transition-transform" />
                Month-by-Month Payment Schedule
              </summary>
              <div className="mt-4 bg-gray-50 rounded-xl overflow-x-auto">
                <table className="w-full text-sm">
                  <thead>
                    <tr className="border-b border-gray-200">
                      <th className="text-left px-4 py-3 font-semibold text-gray-700">Month</th>
                      <th className="text-right px-4 py-3 font-semibold text-gray-700">Payment</th>
                      <th className="text-right px-4 py-3 font-semibold text-gray-700 hidden sm:table-cell">Interest</th>
                      <th className="text-right px-4 py-3 font-semibold text-gray-700 hidden sm:table-cell">Principal</th>
                      <th className="text-right px-4 py-3 font-semibold text-gray-700">Balance</th>
                    </tr>
                  </thead>
                  <tbody>
                    {results.schedule.map((row) => (
                      <tr key={row.month} className="border-b border-gray-100 last:border-0">
                        <td className="px-4 py-2.5 text-gray-700">{row.month}</td>
                        <td className="px-4 py-2.5 text-right font-medium text-quicklend-900">{formatCurrencyCents(row.payment)}</td>
                        <td className="px-4 py-2.5 text-right text-gray-500 hidden sm:table-cell">{formatCurrencyCents(row.interest)}</td>
                        <td className="px-4 py-2.5 text-right text-gray-500 hidden sm:table-cell">{formatCurrencyCents(row.principal)}</td>
                        <td className="px-4 py-2.5 text-right text-gray-700">{formatCurrency(row.balance)}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </details>
          </div>

          {/* CTA */}
          <div className="px-6 sm:px-8 lg:px-10 pb-8">
            <div className="bg-quicklend-50 rounded-xl p-6 text-center">
              <p className="text-gray-700 mb-1 font-medium">
                See if you qualify for a {formatCurrency(creditLimit)} business line of credit
              </p>
              <p className="text-gray-500 text-sm mb-4">
                No impact to your credit score.
              </p>
              <Link
                href={`/get-started?source=loc-interest-calculator&loan_type=lines-of-credit&amount=${creditLimit}`}
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
