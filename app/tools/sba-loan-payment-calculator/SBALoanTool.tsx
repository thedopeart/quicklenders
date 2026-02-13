'use client'

import { useState, useMemo } from 'react'
import Link from 'next/link'
import {
  ChevronRight,
  ArrowRight,
  Info,
  CheckCircle,
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

// ────────────────────────────────────────────────────────────────────
// SBA Fee Logic
// ────────────────────────────────────────────────────────────────────

function getSBAGuaranteePercent(loanAmount: number): number {
  return loanAmount <= 150000 ? 0.85 : 0.75
}

function getSBAGuaranteeFeeRate(loanAmount: number): number {
  if (loanAmount <= 150000) return 0.02
  if (loanAmount <= 700000) return 0.03
  if (loanAmount <= 1000000) return 0.035
  return 0.0375
}

const SBA_ANNUAL_SERVICING_FEE = 0.0055

// ────────────────────────────────────────────────────────────────────
// Constants
// ────────────────────────────────────────────────────────────────────

type SBAProgram = '7a' | '504'

const programInfo = {
  '7a': {
    label: 'SBA 7(a)',
    maxLoan: 5000000,
    minLoan: 25000,
    description: 'Most flexible SBA program. Use for working capital, equipment, real estate, acquisition, or refinancing.',
    terms: [
      { value: 84, label: '7 years' },
      { value: 120, label: '10 years' },
      { value: 300, label: '25 years (real estate)' },
    ],
  },
  '504': {
    label: 'SBA 504',
    maxLoan: 5500000,
    minLoan: 125000,
    description: 'For purchasing fixed assets: commercial real estate or major equipment. Lower rates on the CDC portion.',
    terms: [
      { value: 120, label: '10 years' },
      { value: 240, label: '20 years' },
      { value: 300, label: '25 years' },
    ],
  },
}

const purposeOptions = [
  { value: 'working-capital', label: 'Working Capital' },
  { value: 'equipment', label: 'Equipment Purchase' },
  { value: 'real-estate', label: 'Real Estate Purchase' },
  { value: 'acquisition', label: 'Business Acquisition' },
  { value: 'refinance', label: 'Refinancing Existing Debt' },
]

const amountPresets = [100000, 250000, 500000, 1000000, 2500000]

// ────────────────────────────────────────────────────────────────────
// Main Component
// ────────────────────────────────────────────────────────────────────

export default function SBALoanTool() {
  const [program, setProgram] = useState<SBAProgram>('7a')
  const [loanAmount, setLoanAmount] = useState(500000)
  const [rate, setRate] = useState(8.5)
  const [termMonths, setTermMonths] = useState(120)
  const [downPaymentPct, setDownPaymentPct] = useState(10)
  const [purpose, setPurpose] = useState('working-capital')

  const info = programInfo[program]

  // ── Calculations ──────────────────────────────────────────────────

  const results = useMemo(() => {
    if (loanAmount <= 0 || rate <= 0 || termMonths <= 0) return null

    const downPayment = loanAmount * (downPaymentPct / 100)
    const financedAmount = loanAmount - downPayment

    // SBA 7(a) calculations
    if (program === '7a') {
      const guaranteePercent = getSBAGuaranteePercent(financedAmount)
      const guaranteedPortion = financedAmount * guaranteePercent
      const guaranteeFeeRate = getSBAGuaranteeFeeRate(financedAmount)
      const upfrontGuaranteeFee = guaranteedPortion * guaranteeFeeRate

      // Monthly payment on the financed amount (guarantee fee typically rolled in)
      const totalFinanced = financedAmount + upfrontGuaranteeFee
      const monthlyPayment = calcMonthlyPayment(totalFinanced, rate, termMonths)
      const totalPaid = monthlyPayment * termMonths
      const totalInterest = totalPaid - totalFinanced

      // Estimated annual servicing fee (averaged over life)
      const avgBalance = totalFinanced / 2 // rough average
      const totalServicingFee = avgBalance * guaranteePercent * SBA_ANNUAL_SERVICING_FEE * (termMonths / 12)

      const totalCost = totalPaid + totalServicingFee + downPayment

      // Conventional comparison (higher rate, no SBA fees, similar term)
      const convRate = Math.min(rate + 5, 25)
      const convPayment = calcMonthlyPayment(financedAmount, convRate, termMonths)
      const convTotalPaid = convPayment * termMonths
      const convTotalInterest = convTotalPaid - financedAmount
      const convTotalCost = convTotalPaid + downPayment

      const savings = convTotalCost - totalCost

      return {
        program: '7a' as const,
        downPayment,
        financedAmount,
        guaranteePercent,
        guaranteedPortion,
        guaranteeFeeRate,
        upfrontGuaranteeFee,
        totalFinanced,
        monthlyPayment,
        totalInterest,
        totalServicingFee,
        totalPaid,
        totalCost,
        netProceeds: financedAmount - upfrontGuaranteeFee,
        convRate,
        convPayment,
        convTotalInterest,
        convTotalPaid,
        convTotalCost,
        savings,
      }
    }

    // SBA 504 calculations
    // Structure: Borrower 10-20% down, Bank 50%, CDC (SBA) 40%
    const bankPortion = loanAmount * 0.50
    const cdcPortion = loanAmount * 0.40

    // CDC portion typically has a lower fixed rate
    const cdcRate = Math.max(rate - 1.5, 4.5)
    const bankRate = rate

    const bankPayment = calcMonthlyPayment(bankPortion, bankRate, termMonths)
    const cdcPayment = calcMonthlyPayment(cdcPortion, cdcRate, termMonths)
    const monthlyPayment = bankPayment + cdcPayment

    // 504 CDC processing fee (approx 2.15% of CDC portion)
    const cdcProcessingFee = cdcPortion * 0.0215
    const totalPaid = monthlyPayment * termMonths
    const bankTotalPaid = bankPayment * termMonths
    const cdcTotalPaid = cdcPayment * termMonths
    const bankInterest = bankTotalPaid - bankPortion
    const cdcInterest = cdcTotalPaid - cdcPortion
    const totalInterest = bankInterest + cdcInterest
    const totalCost = totalPaid + cdcProcessingFee + downPayment

    // Conventional comparison
    const convRate = Math.min(rate + 5, 25)
    const convFinanced = loanAmount - downPayment
    const convPayment = calcMonthlyPayment(convFinanced, convRate, termMonths)
    const convTotalPaid = convPayment * termMonths
    const convTotalInterest = convTotalPaid - convFinanced
    const convTotalCost = convTotalPaid + downPayment

    const savings = convTotalCost - totalCost

    return {
      program: '504' as const,
      downPayment,
      financedAmount: loanAmount - downPayment,
      bankPortion,
      cdcPortion,
      bankRate,
      cdcRate,
      bankPayment,
      cdcPayment,
      monthlyPayment,
      cdcProcessingFee,
      bankInterest,
      cdcInterest,
      totalInterest,
      totalPaid,
      totalCost,
      convRate,
      convPayment,
      convTotalInterest,
      convTotalPaid,
      convTotalCost,
      savings,
    }
  }, [program, loanAmount, rate, termMonths, downPaymentPct])

  return (
    <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
      {/* Intro */}
      <div className="p-6 sm:p-8 lg:p-10 pb-0">
        <p className="text-gray-700 leading-relaxed mb-2">
          Estimate your monthly payment, SBA guarantee fees, and total cost for 7(a) or 504 loans. See how SBA financing compares to conventional business loans.
        </p>
        <p className="text-gray-500 text-sm mb-0">
          Fee schedules reflect current SBA guidelines. Actual rates and terms vary by lender.
        </p>
      </div>

      {/* Program Toggle */}
      <div className="p-6 sm:p-8 lg:p-10 pb-0">
        <div className="flex rounded-lg bg-gray-100 p-1">
          {(['7a', '504'] as SBAProgram[]).map((p) => (
            <button
              key={p}
              onClick={() => {
                setProgram(p)
                setTermMonths(p === '7a' ? 120 : 240)
                if (p === '504' && loanAmount < 125000) setLoanAmount(125000)
              }}
              className={`flex-1 py-2.5 px-4 rounded-md text-sm font-semibold transition-colors ${
                program === p
                  ? 'bg-quicklend-600 text-white shadow-sm'
                  : 'text-gray-600 hover:text-gray-900'
              }`}
            >
              {programInfo[p].label}
            </button>
          ))}
        </div>
        <p className="text-xs text-gray-500 mt-2">{info.description}</p>
      </div>

      {/* Inputs */}
      <div className="p-6 sm:p-8 lg:p-10">
        <div className="space-y-6">
          {/* Loan Amount */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Total Project Cost</label>
            <div className="relative">
              <span className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500">$</span>
              <input
                type="text"
                inputMode="numeric"
                value={formatInputDisplay(loanAmount)}
                onChange={(e) => {
                  const num = parseCurrencyInput(e.target.value)
                  if (num >= 0 && num <= info.maxLoan) setLoanAmount(num)
                }}
                className="w-full rounded-lg border border-gray-300 px-4 py-3 pl-8 text-gray-900 focus:border-quicklend-600 focus:ring-2 focus:ring-quicklend-600/20 focus:outline-none transition-colors"
                placeholder="0"
              />
            </div>
            <div className="flex flex-wrap gap-2 mt-3">
              {amountPresets.filter((p) => p <= info.maxLoan).map((preset) => (
                <button
                  key={preset}
                  onClick={() => setLoanAmount(preset)}
                  className={`px-3 py-1.5 rounded-full text-xs font-medium border transition-colors ${
                    loanAmount === preset
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
              {program === '7a'
                ? `SBA 7(a) loans range from ${formatCurrency(info.minLoan)} to ${formatCurrency(info.maxLoan)}.`
                : `SBA 504 loans range from ${formatCurrency(info.minLoan)} to ${formatCurrency(info.maxLoan)}.`}
            </p>
          </div>

          {/* Rate & Term */}
          <div className="grid md:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Interest Rate: <span className="text-quicklend-600 font-bold">{rate}%</span>
              </label>
              <input
                type="range"
                min={4}
                max={13}
                step={0.25}
                value={rate}
                onChange={(e) => setRate(Number(e.target.value))}
                className="w-full accent-quicklend-600"
              />
              <div className="flex justify-between text-xs text-gray-400 mt-1">
                <span>4%</span>
                <span>13%</span>
              </div>
              <p className="text-xs text-gray-400 mt-2">
                SBA 7(a) rates are typically Prime + 2.25% to 2.75%.
                {program === '504' && ' The CDC portion usually has a lower fixed rate.'}
              </p>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Loan Term</label>
              <select
                value={termMonths}
                onChange={(e) => setTermMonths(Number(e.target.value))}
                className="w-full rounded-lg border border-gray-300 px-4 py-3 text-gray-900 focus:border-quicklend-600 focus:ring-2 focus:ring-quicklend-600/20 focus:outline-none transition-colors"
              >
                {info.terms.map((opt) => (
                  <option key={opt.value} value={opt.value}>{opt.label}</option>
                ))}
              </select>
            </div>
          </div>

          {/* Down Payment & Purpose */}
          <div className="grid md:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Down Payment: <span className="text-quicklend-600 font-bold">{downPaymentPct}%</span>
                {loanAmount > 0 && (
                  <span className="text-gray-400 font-normal"> ({formatCurrency(loanAmount * (downPaymentPct / 100))})</span>
                )}
              </label>
              <input
                type="range"
                min={10}
                max={30}
                step={5}
                value={downPaymentPct}
                onChange={(e) => setDownPaymentPct(Number(e.target.value))}
                className="w-full accent-quicklend-600"
              />
              <div className="flex justify-between text-xs text-gray-400 mt-1">
                <span>10%</span>
                <span>30%</span>
              </div>
              <p className="text-xs text-gray-400 mt-2">
                SBA loans typically require 10% to 20% down.
              </p>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Loan Purpose</label>
              <select
                value={purpose}
                onChange={(e) => setPurpose(e.target.value)}
                className="w-full rounded-lg border border-gray-300 px-4 py-3 text-gray-900 focus:border-quicklend-600 focus:ring-2 focus:ring-quicklend-600/20 focus:outline-none transition-colors"
              >
                {purposeOptions.map((opt) => (
                  <option key={opt.value} value={opt.value}>{opt.label}</option>
                ))}
              </select>
            </div>
          </div>
        </div>
      </div>

      {/* Results */}
      {results && (
        <div className="border-t border-gray-100">
          {/* Key Metrics */}
          <div className="p-6 sm:p-8 lg:p-10">
            <h3 className="text-sm font-semibold text-gray-700 mb-4">Your {info.label} Loan Estimate</h3>

            <div className="grid sm:grid-cols-3 gap-4 mb-4">
              <div className="bg-quicklend-50 border border-quicklend-200 rounded-xl p-5 text-center">
                <p className="text-xs font-semibold text-quicklend-600 uppercase tracking-wider mb-1">Monthly Payment</p>
                <p className="text-3xl font-bold text-quicklend-900">{formatCurrency(results.monthlyPayment)}</p>
                {results.program === '504' && (
                  <p className="text-xs text-gray-500 mt-1">
                    Bank: {formatCurrency(results.bankPayment)} + CDC: {formatCurrency(results.cdcPayment)}
                  </p>
                )}
              </div>
              <div className="bg-gray-50 border border-gray-200 rounded-xl p-5 text-center">
                <p className="text-xs font-semibold text-gray-500 uppercase tracking-wider mb-1">Total Interest</p>
                <p className="text-2xl font-bold text-gray-900">{formatCurrency(results.totalInterest)}</p>
                <p className="text-xs text-gray-500 mt-1">over {termMonths / 12} years</p>
              </div>
              <div className="bg-gray-50 border border-gray-200 rounded-xl p-5 text-center">
                <p className="text-xs font-semibold text-gray-500 uppercase tracking-wider mb-1">Down Payment</p>
                <p className="text-2xl font-bold text-gray-900">{formatCurrency(results.downPayment)}</p>
                <p className="text-xs text-gray-500 mt-1">{downPaymentPct}% of {formatCurrency(loanAmount)}</p>
              </div>
            </div>

            {/* Total Cost Bar */}
            <div className="bg-quicklend-900 rounded-xl p-5 flex flex-col sm:flex-row items-center justify-between gap-3">
              <div>
                <p className="text-quicklend-200 text-sm">Total Cost (payments + fees + down payment)</p>
                <p className="text-2xl font-bold text-white">{formatCurrency(results.totalCost)}</p>
              </div>
              {results.savings > 0 && (
                <>
                  <div className="h-px sm:h-10 sm:w-px bg-quicklend-700" />
                  <div className="text-center sm:text-right">
                    <p className="text-quicklend-200 text-sm">You save vs. conventional</p>
                    <p className="text-2xl font-bold text-amber-400">{formatCurrency(results.savings)}</p>
                  </div>
                </>
              )}
            </div>
          </div>

          {/* Fee Breakdown */}
          <div className="px-6 sm:px-8 lg:px-10 pb-8">
            <details className="group" open>
              <summary className="cursor-pointer text-sm font-semibold text-gray-600 hover:text-gray-900 flex items-center gap-2">
                <ChevronRight className="h-4 w-4 group-open:rotate-90 transition-transform" />
                {program === '7a' ? 'SBA 7(a) Fee Breakdown' : 'SBA 504 Structure & Fees'}
              </summary>
              <div className="mt-4 bg-gray-50 rounded-xl overflow-hidden">
                <table className="w-full text-sm">
                  <tbody>
                    {results.program === '7a' ? (
                      <>
                        <tr className="border-b border-gray-100">
                          <td className="px-4 py-3 text-gray-700">Loan Amount (after down payment)</td>
                          <td className="px-4 py-3 text-right font-medium text-gray-900">{formatCurrency(results.financedAmount)}</td>
                        </tr>
                        <tr className="border-b border-gray-100">
                          <td className="px-4 py-3 text-gray-700">
                            SBA Guarantee ({(results.guaranteePercent * 100).toFixed(0)}% of loan)
                          </td>
                          <td className="px-4 py-3 text-right font-medium text-gray-900">{formatCurrency(results.guaranteedPortion)}</td>
                        </tr>
                        <tr className="border-b border-gray-100">
                          <td className="px-4 py-3 text-gray-700">
                            Upfront Guarantee Fee ({(results.guaranteeFeeRate * 100).toFixed(1)}% of guaranteed portion)
                          </td>
                          <td className="px-4 py-3 text-right font-medium text-gray-900">{formatCurrency(results.upfrontGuaranteeFee)}</td>
                        </tr>
                        <tr className="border-b border-gray-100">
                          <td className="px-4 py-3 text-gray-700">
                            Annual Servicing Fee (0.55% of guaranteed balance, est. total)
                          </td>
                          <td className="px-4 py-3 text-right font-medium text-gray-900">{formatCurrency(results.totalServicingFee)}</td>
                        </tr>
                        <tr className="border-b border-gray-100">
                          <td className="px-4 py-3 text-gray-700">Total Financed (loan + upfront fee)</td>
                          <td className="px-4 py-3 text-right font-medium text-gray-900">{formatCurrency(results.totalFinanced)}</td>
                        </tr>
                        <tr>
                          <td className="px-4 py-3 text-gray-700">Net Loan Proceeds</td>
                          <td className="px-4 py-3 text-right font-bold text-quicklend-900">{formatCurrency(results.netProceeds)}</td>
                        </tr>
                      </>
                    ) : (
                      <>
                        <tr className="border-b border-gray-100">
                          <td className="px-4 py-3 text-gray-700">Your Down Payment ({downPaymentPct}%)</td>
                          <td className="px-4 py-3 text-right font-medium text-gray-900">{formatCurrency(results.downPayment)}</td>
                        </tr>
                        <tr className="border-b border-gray-100">
                          <td className="px-4 py-3 text-gray-700">Bank Portion (50% at {results.bankRate}%)</td>
                          <td className="px-4 py-3 text-right font-medium text-gray-900">{formatCurrency(results.bankPortion)}</td>
                        </tr>
                        <tr className="border-b border-gray-100">
                          <td className="px-4 py-3 text-gray-700">CDC/SBA Portion (40% at {results.cdcRate}%)</td>
                          <td className="px-4 py-3 text-right font-medium text-gray-900">{formatCurrency(results.cdcPortion)}</td>
                        </tr>
                        <tr className="border-b border-gray-100">
                          <td className="px-4 py-3 text-gray-700">Bank Interest ({termMonths / 12} years)</td>
                          <td className="px-4 py-3 text-right font-medium text-gray-900">{formatCurrency(results.bankInterest)}</td>
                        </tr>
                        <tr className="border-b border-gray-100">
                          <td className="px-4 py-3 text-gray-700">CDC Interest ({termMonths / 12} years)</td>
                          <td className="px-4 py-3 text-right font-medium text-gray-900">{formatCurrency(results.cdcInterest)}</td>
                        </tr>
                        <tr>
                          <td className="px-4 py-3 text-gray-700">CDC Processing Fee (approx. 2.15%)</td>
                          <td className="px-4 py-3 text-right font-medium text-gray-900">{formatCurrency(results.cdcProcessingFee)}</td>
                        </tr>
                      </>
                    )}
                  </tbody>
                </table>
              </div>
            </details>
          </div>

          {/* SBA vs Conventional Comparison */}
          <div className="px-6 sm:px-8 lg:px-10 pb-8">
            <details className="group" open>
              <summary className="cursor-pointer text-sm font-semibold text-gray-600 hover:text-gray-900 flex items-center gap-2">
                <ChevronRight className="h-4 w-4 group-open:rotate-90 transition-transform" />
                SBA vs. Conventional Loan Comparison
              </summary>
              <div className="mt-4 overflow-x-auto -mx-6 sm:mx-0">
                <table className="w-full text-sm min-w-[400px]">
                  <thead>
                    <tr className="border-b border-gray-200">
                      <th className="text-left px-4 py-3 text-gray-500 font-medium"></th>
                      <th className="text-right px-4 py-3 font-semibold text-quicklend-600">
                        <span className="flex items-center justify-end gap-1.5">
                          <span className="w-2.5 h-2.5 rounded-full bg-quicklend-600" />
                          {info.label} Loan
                        </span>
                      </th>
                      <th className="text-right px-4 py-3 font-semibold text-gray-500">
                        <span className="flex items-center justify-end gap-1.5">
                          <span className="w-2.5 h-2.5 rounded-full bg-gray-400" />
                          Conventional
                        </span>
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr className="border-b border-gray-100">
                      <td className="px-4 py-3 text-gray-700">Interest Rate</td>
                      <td className="px-4 py-3 text-right font-medium text-quicklend-600">{rate}%</td>
                      <td className="px-4 py-3 text-right font-medium text-gray-900">{results.convRate}%</td>
                    </tr>
                    <tr className="border-b border-gray-100 bg-gray-50">
                      <td className="px-4 py-3 text-gray-700 font-semibold">Monthly Payment</td>
                      <td className="px-4 py-3 text-right font-bold text-quicklend-600">{formatCurrency(results.monthlyPayment)}</td>
                      <td className="px-4 py-3 text-right font-bold text-gray-900">{formatCurrency(results.convPayment)}</td>
                    </tr>
                    <tr className="border-b border-gray-100">
                      <td className="px-4 py-3 text-gray-700">Total Interest</td>
                      <td className="px-4 py-3 text-right font-medium text-gray-900">{formatCurrency(results.totalInterest)}</td>
                      <td className="px-4 py-3 text-right font-medium text-gray-900">{formatCurrency(results.convTotalInterest)}</td>
                    </tr>
                    <tr className="border-b border-gray-100 bg-quicklend-50">
                      <td className="px-4 py-3 text-gray-900 font-bold">Total Cost</td>
                      <td className="px-4 py-3 text-right font-bold text-lg text-quicklend-600">{formatCurrency(results.totalCost)}</td>
                      <td className="px-4 py-3 text-right font-bold text-lg text-gray-900">{formatCurrency(results.convTotalCost)}</td>
                    </tr>
                    <tr className="border-b border-gray-100">
                      <td className="px-4 py-3 text-gray-700">Monthly Savings</td>
                      <td className="px-4 py-3 text-right font-medium text-green-600" colSpan={2}>
                        {results.convPayment - results.monthlyPayment > 0
                          ? `${formatCurrency(results.convPayment - results.monthlyPayment)}/mo with SBA`
                          : 'Similar payments'}
                      </td>
                    </tr>
                    <tr>
                      <td className="px-4 py-3 text-gray-700">Funding Speed</td>
                      <td className="px-4 py-3 text-right text-gray-500 text-xs">30-90 days</td>
                      <td className="px-4 py-3 text-right text-gray-500 text-xs">1-7 days (online)</td>
                    </tr>
                  </tbody>
                </table>
              </div>
              <p className="text-xs text-gray-400 mt-2">
                Conventional rate estimated at {results.convRate}% for comparison purposes. Actual rates vary by lender and borrower profile.
              </p>
            </details>
          </div>

          {/* Qualification Overview */}
          <div className="px-6 sm:px-8 lg:px-10 pb-8">
            <details className="group">
              <summary className="cursor-pointer text-sm font-semibold text-gray-600 hover:text-gray-900 flex items-center gap-2">
                <ChevronRight className="h-4 w-4 group-open:rotate-90 transition-transform" />
                SBA Loan Requirements Overview
              </summary>
              <div className="mt-4 bg-gray-50 rounded-xl overflow-hidden">
                <table className="w-full text-sm">
                  <thead>
                    <tr className="border-b border-gray-200">
                      <th className="text-left px-4 py-2 text-gray-500 font-medium">Factor</th>
                      <th className="text-left px-4 py-2 text-gray-500 font-medium">Typical Minimum</th>
                      <th className="text-left px-4 py-2 text-gray-500 font-medium">Preferred</th>
                    </tr>
                  </thead>
                  <tbody>
                    {[
                      { factor: 'Credit Score', min: '650', preferred: '680+' },
                      { factor: 'Time in Business', min: '2 years', preferred: '3+ years' },
                      { factor: 'Annual Revenue', min: '$100,000', preferred: '$250,000+' },
                      { factor: 'DSCR', min: '1.15', preferred: '1.25+' },
                      { factor: 'Down Payment', min: '10%', preferred: '20%+' },
                      { factor: 'Collateral', min: 'Helps, not required', preferred: 'Real estate or equipment' },
                    ].map((row) => (
                      <tr key={row.factor} className="border-b border-gray-100">
                        <td className="px-4 py-2.5 text-gray-700 font-medium">{row.factor}</td>
                        <td className="px-4 py-2.5 text-gray-900">{row.min}</td>
                        <td className="px-4 py-2.5 text-green-600 font-medium">{row.preferred}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
              <div className="mt-3 flex flex-wrap gap-2">
                <div className="flex items-center gap-1.5 text-xs text-gray-500">
                  <CheckCircle className="h-3.5 w-3.5 text-green-500" />
                  For-profit US business
                </div>
                <div className="flex items-center gap-1.5 text-xs text-gray-500">
                  <CheckCircle className="h-3.5 w-3.5 text-green-500" />
                  Not in a prohibited industry
                </div>
                <div className="flex items-center gap-1.5 text-xs text-gray-500">
                  <CheckCircle className="h-3.5 w-3.5 text-green-500" />
                  Owner has invested equity
                </div>
              </div>
            </details>
          </div>

          {/* CTA */}
          <div className="px-6 sm:px-8 lg:px-10 pb-8">
            <div className="bg-quicklend-50 rounded-xl p-6 text-center">
              <p className="text-gray-700 mb-1 font-medium">
                {results.savings > 50000
                  ? `An SBA loan could save you ${formatCurrency(results.savings)} over a conventional loan.`
                  : 'SBA loans offer the lowest rates for qualified borrowers.'}
              </p>
              <p className="text-gray-500 text-sm mb-4">
                Need funds faster? We also offer conventional term loans that fund in days. No impact to your credit score.
              </p>
              <div className="flex flex-col sm:flex-row gap-3 justify-center">
                <Link
                  href={`/get-started?source=sba-loan-calculator&loan_type=term-loans&amount=${results.financedAmount}`}
                  className="inline-flex items-center justify-center bg-quicklend-600 text-white font-semibold px-8 py-3 rounded-lg hover:bg-quicklend-700 transition-colors"
                >
                  See Your Options <ArrowRight className="ml-2 h-4 w-4" />
                </Link>
                <Link
                  href="/tools/dscr-calculator"
                  className="inline-flex items-center justify-center border border-quicklend-300 text-quicklend-700 font-semibold px-6 py-3 rounded-lg hover:bg-quicklend-50 transition-colors text-sm"
                >
                  Check Your DSCR First
                </Link>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
