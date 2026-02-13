'use client'

import { useState, useMemo } from 'react'
import Link from 'next/link'
import {
  ArrowRight,
  DollarSign,
  Percent,
  AlertTriangle,
  CheckCircle,
  Info,
  ChevronDown,
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

/**
 * Newton's method to find the effective APR.
 * Solves for the periodic rate r such that:
 *   PV of annuity(payment, r, n) = netProceeds
 * Then converts to annual rate.
 */
function solveEffectiveAPR(
  netProceeds: number,
  payment: number,
  numPayments: number,
  periodsPerYear: number
): number {
  if (netProceeds <= 0 || payment <= 0 || numPayments <= 0) return 0

  let r = 0.15 / periodsPerYear

  for (let iter = 0; iter < 200; iter++) {
    if (r <= 0) r = 0.0001

    const factor = Math.pow(1 + r, -numPayments)
    const pv = payment * (1 - factor) / r
    const f = pv - netProceeds

    const df = payment * (numPayments * Math.pow(1 + r, -numPayments - 1) * r - (1 - factor)) / (r * r)

    if (Math.abs(df) < 1e-12) break

    const newR = r - f / df
    if (Math.abs(newR - r) < 1e-10) {
      r = newR
      break
    }
    r = Math.max(0.00001, newR)
  }

  return r * periodsPerYear * 100
}

// ────────────────────────────────────────────────────────────────────
// Cost Tier
// ────────────────────────────────────────────────────────────────────

type CostTier = 'low' | 'moderate' | 'high' | 'very-high'

function getCostTier(effectiveAPR: number): {
  tier: CostTier
  label: string
  color: string
  bgColor: string
  borderColor: string
  message: string
} {
  if (effectiveAPR < 15)
    return {
      tier: 'low',
      label: 'Low Cost Financing',
      color: 'text-green-700',
      bgColor: 'bg-green-50',
      borderColor: 'border-green-200',
      message: 'This financing option has a competitive all-in cost. Fees add minimal overhead to the stated rate.',
    }
  if (effectiveAPR < 25)
    return {
      tier: 'moderate',
      label: 'Moderate Cost',
      color: 'text-blue-700',
      bgColor: 'bg-blue-50',
      borderColor: 'border-blue-200',
      message: 'The total cost is in a typical range for business financing. Compare with other offers to confirm you are getting a fair deal.',
    }
  if (effectiveAPR < 35)
    return {
      tier: 'high',
      label: 'Above Average Cost',
      color: 'text-amber-700',
      bgColor: 'bg-amber-50',
      borderColor: 'border-amber-200',
      message: 'The all-in cost is higher than average. Fees are adding meaningful overhead. Shop around or negotiate fee reductions.',
    }
  return {
    tier: 'very-high',
    label: 'High Cost Financing',
    color: 'text-red-700',
    bgColor: 'bg-red-50',
    borderColor: 'border-red-200',
    message: 'The total cost is significant. Fees and/or the rate push the effective APR well above typical business loan rates.',
  }
}

// ────────────────────────────────────────────────────────────────────
// Constants
// ────────────────────────────────────────────────────────────────────

const amountPresets = [50000, 100000, 250000, 500000, 1000000]
const termOptions = [
  { value: 6, label: '6 months' },
  { value: 12, label: '1 year' },
  { value: 18, label: '18 months' },
  { value: 24, label: '2 years' },
  { value: 36, label: '3 years' },
  { value: 48, label: '4 years' },
  { value: 60, label: '5 years' },
  { value: 84, label: '7 years' },
  { value: 120, label: '10 years' },
]

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

export default function TotalCostOfCapitalTool() {
  const [loanAmount, setLoanAmount] = useState(200000)
  const [costType, setCostType] = useState<'apr' | 'factor'>('apr')
  const [annualRate, setAnnualRate] = useState(12)
  const [factorRate, setFactorRate] = useState(1.25)
  const [termMonths, setTermMonths] = useState(36)
  const [paymentFreq, setPaymentFreq] = useState<'monthly' | 'weekly' | 'daily'>('monthly')

  // Fees
  const [originationPct, setOriginationPct] = useState(2)
  const [closingCosts, setClosingCosts] = useState(0)
  const [docFee, setDocFee] = useState(0)
  const [otherFees, setOtherFees] = useState(0)
  const [showFeeDetails, setShowFeeDetails] = useState(false)

  // ── Calculations ──────────────────────────────────────────────────

  const results = useMemo(() => {
    if (loanAmount <= 0 || termMonths <= 0) return null

    // Calculate fees
    const originationAmount = loanAmount * (originationPct / 100)
    const totalFees = originationAmount + closingCosts + docFee + otherFees
    const netProceeds = loanAmount - totalFees

    if (netProceeds <= 0) return null

    let payment: number
    let totalRepayment: number
    let totalInterest: number
    let periodsPerYear: number
    let numPayments: number

    if (costType === 'apr') {
      const monthlyPayment = calcMonthlyPayment(loanAmount, annualRate, termMonths)

      if (paymentFreq === 'monthly') {
        payment = monthlyPayment
        numPayments = termMonths
        periodsPerYear = 12
      } else if (paymentFreq === 'weekly') {
        payment = (monthlyPayment * 12) / 52
        numPayments = Math.round((termMonths * 52) / 12)
        periodsPerYear = 52
      } else {
        payment = (monthlyPayment * 12) / 260
        numPayments = Math.round((termMonths * 260) / 12)
        periodsPerYear = 260
      }

      totalRepayment = payment * numPayments
      totalInterest = totalRepayment - loanAmount
    } else {
      // Factor rate
      const clampedFactor = Math.max(1.0, factorRate)
      totalRepayment = loanAmount * clampedFactor
      totalInterest = totalRepayment - loanAmount

      if (paymentFreq === 'monthly') {
        numPayments = termMonths
        periodsPerYear = 12
      } else if (paymentFreq === 'weekly') {
        numPayments = Math.round((termMonths * 52) / 12)
        periodsPerYear = 52
      } else {
        numPayments = Math.round((termMonths * 260) / 12)
        periodsPerYear = 260
      }
      payment = totalRepayment / numPayments
    }

    const totalCostOfCapital = totalInterest + totalFees
    const costPerDollar = totalCostOfCapital / loanAmount

    // Effective APR (accounts for fees reducing net proceeds)
    const effectiveAPR = solveEffectiveAPR(netProceeds, payment, numPayments, periodsPerYear)

    // Stated APR for comparison
    let statedAPR: number
    if (costType === 'apr') {
      statedAPR = annualRate
    } else {
      // For factor rate, calculate what the APR would be without fees
      statedAPR = solveEffectiveAPR(loanAmount, payment, numPayments, periodsPerYear)
    }

    const feeImpactAPR = effectiveAPR - statedAPR
    const costTier = getCostTier(effectiveAPR)

    // Fee breakdown for chart
    const feeBreakdown = [
      { label: 'Interest', amount: totalInterest, color: 'bg-quicklend-600' },
      ...(originationAmount > 0 ? [{ label: 'Origination Fee', amount: originationAmount, color: 'bg-amber-500' }] : []),
      ...(closingCosts > 0 ? [{ label: 'Closing Costs', amount: closingCosts, color: 'bg-orange-400' }] : []),
      ...(docFee > 0 ? [{ label: 'Documentation Fee', amount: docFee, color: 'bg-rose-400' }] : []),
      ...(otherFees > 0 ? [{ label: 'Other Fees', amount: otherFees, color: 'bg-red-400' }] : []),
    ]

    return {
      payment,
      numPayments,
      totalRepayment,
      totalInterest,
      totalFees,
      originationAmount,
      netProceeds,
      totalCostOfCapital,
      costPerDollar,
      effectiveAPR,
      statedAPR,
      feeImpactAPR,
      costTier,
      feeBreakdown,
    }
  }, [loanAmount, costType, annualRate, factorRate, termMonths, paymentFreq, originationPct, closingCosts, docFee, otherFees])

  const freqLabel = paymentFreq === 'monthly' ? 'Monthly' : paymentFreq === 'weekly' ? 'Weekly' : 'Daily'

  return (
    <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
      {/* Intro */}
      <div className="p-6 sm:p-8 lg:p-10 pb-0">
        <p className="text-gray-700 leading-relaxed mb-2">
          See the true all-in cost of any business financing option. Enter your loan details and fees to get the effective APR, total cost, and cost per dollar borrowed.
        </p>
        <p className="text-gray-500 text-sm mb-0">
          Many lenders quote a rate but add fees that significantly increase the actual cost. This calculator shows you the full picture.
        </p>
      </div>

      {/* Inputs */}
      <div className="p-6 sm:p-8 lg:p-10">
        <div className="space-y-6">
          {/* Loan Amount */}
          <div>
            <CurrencyInput
              label="Loan Amount"
              value={loanAmount}
              onChange={setLoanAmount}
              hint="The total amount you plan to borrow."
            />
            <div className="flex flex-wrap gap-2 mt-3">
              {amountPresets.map((preset) => (
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
          </div>

          {/* Cost Type Toggle */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">How is the cost quoted?</label>
            <div className="grid grid-cols-2 gap-2">
              {(['apr', 'factor'] as const).map((type) => (
                <button
                  key={type}
                  onClick={() => setCostType(type)}
                  className={`px-4 py-3 rounded-lg text-sm font-medium border transition-colors ${
                    costType === type
                      ? 'bg-quicklend-600 text-white border-quicklend-600'
                      : 'bg-white text-gray-600 border-gray-200 hover:border-quicklend-300'
                  }`}
                >
                  {type === 'apr' ? 'Annual Rate (APR)' : 'Factor Rate'}
                </button>
              ))}
            </div>
          </div>

          {/* Rate Input */}
          {costType === 'apr' ? (
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Annual Interest Rate: <span className="text-quicklend-600 font-bold">{annualRate}%</span>
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
            </div>
          ) : (
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Factor Rate: <span className="text-quicklend-600 font-bold">{factorRate.toFixed(2)}</span>
              </label>
              <input
                type="range"
                min={1.05}
                max={1.60}
                step={0.01}
                value={factorRate}
                onChange={(e) => setFactorRate(Number(e.target.value))}
                className="w-full accent-quicklend-600"
              />
              <div className="flex justify-between text-xs text-gray-400 mt-1">
                <span>1.05</span>
                <span>1.60</span>
              </div>
              <p className="flex items-start gap-1.5 mt-2 text-xs text-gray-400">
                <Info className="h-3.5 w-3.5 mt-0.5 flex-shrink-0" />
                Factor rates are common with MCAs and short-term loans. A rate of 1.25 means you repay $1.25 for every $1 borrowed.
              </p>
            </div>
          )}

          {/* Term & Frequency */}
          <div className="grid md:grid-cols-2 gap-6">
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
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Payment Frequency</label>
              <select
                value={paymentFreq}
                onChange={(e) => setPaymentFreq(e.target.value as 'monthly' | 'weekly' | 'daily')}
                className="w-full rounded-lg border border-gray-300 px-4 py-3 text-gray-900 focus:border-quicklend-600 focus:ring-2 focus:ring-quicklend-600/20 focus:outline-none transition-colors"
              >
                <option value="monthly">Monthly</option>
                <option value="weekly">Weekly</option>
                <option value="daily">Daily (business days)</option>
              </select>
            </div>
          </div>

          {/* Fees Section */}
          <div className="border-t border-gray-100 pt-6">
            <div className="flex items-center justify-between mb-4">
              <div>
                <h3 className="text-sm font-semibold text-gray-700">Fees & Charges</h3>
                <p className="text-xs text-gray-400">Include all upfront costs charged by the lender.</p>
              </div>
              <button
                onClick={() => setShowFeeDetails(!showFeeDetails)}
                className="text-xs text-quicklend-600 font-medium flex items-center gap-1 hover:text-quicklend-700"
              >
                {showFeeDetails ? 'Simple' : 'Detailed'}
                <ChevronDown className={`h-3.5 w-3.5 transition-transform ${showFeeDetails ? 'rotate-180' : ''}`} />
              </button>
            </div>

            {/* Origination Fee */}
            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Origination Fee: <span className="text-quicklend-600 font-bold">{originationPct}%</span>
                <span className="text-gray-400 font-normal ml-2">({formatCurrency(loanAmount * originationPct / 100)})</span>
              </label>
              <input
                type="range"
                min={0}
                max={5}
                step={0.25}
                value={originationPct}
                onChange={(e) => setOriginationPct(Number(e.target.value))}
                className="w-full accent-quicklend-600"
              />
              <div className="flex justify-between text-xs text-gray-400 mt-1">
                <span>0%</span>
                <span>5%</span>
              </div>
            </div>

            {showFeeDetails && (
              <div className="grid md:grid-cols-3 gap-4">
                <CurrencyInput
                  label="Closing Costs"
                  value={closingCosts}
                  onChange={setClosingCosts}
                  max={100000}
                  hint="Title, appraisal, legal fees."
                />
                <CurrencyInput
                  label="Documentation Fee"
                  value={docFee}
                  onChange={setDocFee}
                  max={50000}
                  hint="Packaging or processing charges."
                />
                <CurrencyInput
                  label="Other Fees"
                  value={otherFees}
                  onChange={setOtherFees}
                  max={100000}
                  hint="UCC filing, wire fees, etc."
                />
              </div>
            )}
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
                {results.costTier.tier === 'low' ? (
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
                <p className={`text-3xl font-bold ${results.costTier.color}`}>{results.effectiveAPR.toFixed(1)}%</p>
                <p className="text-xs text-gray-500">Effective APR</p>
              </div>
            </div>
          </div>

          {/* Key Metrics */}
          <div className="p-6 sm:p-8 lg:p-10">
            <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
              <div className="bg-gray-50 border border-gray-200 rounded-xl p-4 text-center">
                <DollarSign className="h-5 w-5 text-gray-400 mx-auto mb-1" />
                <p className="text-xs font-semibold text-gray-500 uppercase tracking-wider mb-1">Total Repayment</p>
                <p className="text-xl font-bold text-gray-900">{formatCurrency(results.totalRepayment)}</p>
                <p className="text-xs text-gray-400 mt-1">principal + interest</p>
              </div>
              <div className="bg-gray-50 border border-gray-200 rounded-xl p-4 text-center">
                <DollarSign className="h-5 w-5 text-gray-400 mx-auto mb-1" />
                <p className="text-xs font-semibold text-gray-500 uppercase tracking-wider mb-1">Total Fees</p>
                <p className="text-xl font-bold text-amber-600">{formatCurrency(results.totalFees)}</p>
                <p className="text-xs text-gray-400 mt-1">all upfront charges</p>
              </div>
              <div className="bg-gray-50 border border-gray-200 rounded-xl p-4 text-center">
                <DollarSign className="h-5 w-5 text-gray-400 mx-auto mb-1" />
                <p className="text-xs font-semibold text-gray-500 uppercase tracking-wider mb-1">Total Cost of Capital</p>
                <p className="text-xl font-bold text-red-600">{formatCurrency(results.totalCostOfCapital)}</p>
                <p className="text-xs text-gray-400 mt-1">interest + fees</p>
              </div>
              <div className="bg-gray-50 border border-gray-200 rounded-xl p-4 text-center">
                <Percent className="h-5 w-5 text-gray-400 mx-auto mb-1" />
                <p className="text-xs font-semibold text-gray-500 uppercase tracking-wider mb-1">Cost Per Dollar</p>
                <p className="text-xl font-bold text-gray-900">${results.costPerDollar.toFixed(2)}</p>
                <p className="text-xs text-gray-400 mt-1">for every $1 borrowed</p>
              </div>
            </div>
          </div>

          {/* Rate Comparison */}
          <div className="px-6 sm:px-8 lg:px-10 pb-6">
            <h4 className="text-sm font-semibold text-gray-700 mb-3">
              {costType === 'apr' ? 'Stated Rate vs Effective APR' : 'Effective APR (Factor Rate Equivalent)'}
            </h4>
            <div className="space-y-3">
              {costType === 'apr' && (
                <div>
                  <div className="flex justify-between text-xs text-gray-500 mb-1">
                    <span>Stated Rate</span>
                    <span>{results.statedAPR.toFixed(1)}%</span>
                  </div>
                  <div className="w-full bg-gray-100 rounded-full h-6 overflow-hidden">
                    <div
                      className="bg-quicklend-400 h-full rounded-full flex items-center justify-end pr-2 text-white text-xs font-medium"
                      style={{ width: `${Math.min(100, (results.statedAPR / 50) * 100)}%`, minWidth: '40px' }}
                    >
                      {results.statedAPR.toFixed(1)}%
                    </div>
                  </div>
                </div>
              )}
              <div>
                <div className="flex justify-between text-xs text-gray-500 mb-1">
                  <span>Effective APR (all-in cost)</span>
                  <span>{results.effectiveAPR.toFixed(1)}%</span>
                </div>
                <div className="w-full bg-gray-100 rounded-full h-6 overflow-hidden">
                  <div
                    className={`h-full rounded-full flex items-center justify-end pr-2 text-white text-xs font-medium ${
                      results.costTier.tier === 'low'
                        ? 'bg-green-500'
                        : results.costTier.tier === 'moderate'
                          ? 'bg-blue-500'
                          : results.costTier.tier === 'high'
                            ? 'bg-amber-500'
                            : 'bg-red-500'
                    }`}
                    style={{ width: `${Math.min(100, (results.effectiveAPR / 50) * 100)}%`, minWidth: '40px' }}
                  >
                    {results.effectiveAPR.toFixed(1)}%
                  </div>
                </div>
              </div>
            </div>
            {results.feeImpactAPR > 0.1 && (
              <p className="text-xs text-gray-500 mt-3 flex items-start gap-1.5">
                <Info className="h-3.5 w-3.5 mt-0.5 flex-shrink-0" />
                Fees add {results.feeImpactAPR.toFixed(1)} percentage points to the effective rate. You receive {formatCurrency(results.netProceeds)} but pay interest on {formatCurrency(loanAmount)}.
              </p>
            )}
          </div>

          {/* Payment & Summary */}
          <div className="px-6 sm:px-8 lg:px-10 pb-8">
            <div className="bg-quicklend-900 rounded-xl p-5">
              <div className="grid sm:grid-cols-3 gap-4 text-center">
                <div>
                  <p className="text-quicklend-200 text-sm">{freqLabel} Payment</p>
                  <p className="text-xl font-bold text-white">{formatCurrency(results.payment)}</p>
                  <p className="text-quicklend-300 text-xs">{results.numPayments} payments total</p>
                </div>
                <div>
                  <p className="text-quicklend-200 text-sm">Net Proceeds</p>
                  <p className="text-xl font-bold text-amber-400">{formatCurrency(results.netProceeds)}</p>
                  <p className="text-quicklend-300 text-xs">what you actually receive</p>
                </div>
                <div>
                  <p className="text-quicklend-200 text-sm">You Pay Back</p>
                  <p className="text-xl font-bold text-white">{formatCurrency(results.totalRepayment)}</p>
                  <p className="text-quicklend-300 text-xs">+ {formatCurrency(results.totalFees)} in upfront fees</p>
                </div>
              </div>
            </div>
          </div>

          {/* Cost Breakdown Chart */}
          {results.feeBreakdown.length > 1 && (
            <div className="px-6 sm:px-8 lg:px-10 pb-8">
              <h4 className="text-sm font-semibold text-gray-700 mb-3">Cost Breakdown</h4>
              <div className="w-full h-8 rounded-lg overflow-hidden flex">
                {results.feeBreakdown.map((item) => {
                  const pct = (item.amount / results.totalCostOfCapital) * 100
                  if (pct < 0.5) return null
                  return (
                    <div
                      key={item.label}
                      className={`${item.color} h-full flex items-center justify-center text-white text-xs font-medium`}
                      style={{ width: `${pct}%`, minWidth: pct > 5 ? '40px' : '0' }}
                      title={`${item.label}: ${formatCurrency(item.amount)}`}
                    >
                      {pct > 10 ? `${Math.round(pct)}%` : ''}
                    </div>
                  )
                })}
              </div>
              <div className="flex flex-wrap gap-3 mt-3">
                {results.feeBreakdown.map((item) => (
                  <div key={item.label} className="flex items-center gap-1.5 text-xs text-gray-600">
                    <span className={`w-3 h-3 rounded-sm ${item.color}`} />
                    {item.label}: {formatCurrency(item.amount)}
                  </div>
                ))}
              </div>
            </div>
          )}

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
                      <td className="px-4 py-2.5 text-gray-700">Loan Amount</td>
                      <td className="px-4 py-2.5 text-right text-gray-900 font-medium">{formatCurrency(loanAmount)}</td>
                    </tr>
                    {results.originationAmount > 0 && (
                      <tr className="border-b border-gray-100">
                        <td className="px-4 py-2.5 text-gray-700">Origination Fee ({originationPct}%)</td>
                        <td className="px-4 py-2.5 text-right text-amber-600">-{formatCurrency(results.originationAmount)}</td>
                      </tr>
                    )}
                    {closingCosts > 0 && (
                      <tr className="border-b border-gray-100">
                        <td className="px-4 py-2.5 text-gray-700">Closing Costs</td>
                        <td className="px-4 py-2.5 text-right text-amber-600">-{formatCurrency(closingCosts)}</td>
                      </tr>
                    )}
                    {docFee > 0 && (
                      <tr className="border-b border-gray-100">
                        <td className="px-4 py-2.5 text-gray-700">Documentation Fee</td>
                        <td className="px-4 py-2.5 text-right text-amber-600">-{formatCurrency(docFee)}</td>
                      </tr>
                    )}
                    {otherFees > 0 && (
                      <tr className="border-b border-gray-100">
                        <td className="px-4 py-2.5 text-gray-700">Other Fees</td>
                        <td className="px-4 py-2.5 text-right text-amber-600">-{formatCurrency(otherFees)}</td>
                      </tr>
                    )}
                    <tr className="border-b border-gray-200 bg-gray-50">
                      <td className="px-4 py-2.5 text-gray-900 font-semibold">Net Proceeds (what you receive)</td>
                      <td className="px-4 py-2.5 text-right text-gray-900 font-bold">{formatCurrency(results.netProceeds)}</td>
                    </tr>
                    <tr className="border-b border-gray-100">
                      <td className="px-4 py-2.5 text-gray-700">Total Interest Paid</td>
                      <td className="px-4 py-2.5 text-right text-gray-900">{formatCurrency(results.totalInterest)}</td>
                    </tr>
                    <tr className="border-b border-gray-100">
                      <td className="px-4 py-2.5 text-gray-700">Total Fees Paid</td>
                      <td className="px-4 py-2.5 text-right text-amber-600">{formatCurrency(results.totalFees)}</td>
                    </tr>
                    <tr className="bg-red-50">
                      <td className="px-4 py-2.5 text-gray-900 font-semibold">Total Cost of Capital</td>
                      <td className="px-4 py-2.5 text-right text-red-600 font-bold">{formatCurrency(results.totalCostOfCapital)}</td>
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
                {results.costTier.tier === 'low' && `At ${results.effectiveAPR.toFixed(1)}% effective APR, this is a competitive financing option.`}
                {results.costTier.tier === 'moderate' && `Your all-in cost is ${formatCurrency(results.totalCostOfCapital)}. There may be lower-cost options available.`}
                {results.costTier.tier === 'high' && `Fees are adding ${formatCurrency(results.totalFees)} to your borrowing cost. You may be able to find better terms.`}
                {results.costTier.tier === 'very-high' && `At $${results.costPerDollar.toFixed(2)} per dollar borrowed, this is an expensive option. Lower-cost alternatives may be available.`}
              </p>
              <p className="text-gray-500 text-sm mb-4">
                Compare offers from multiple lenders to find the lowest all-in cost. No impact to your credit score.
              </p>
              <div className="flex flex-col sm:flex-row gap-3 justify-center">
                <Link
                  href={`/get-started?source=total-cost-calculator&loan_type=term-loans&amount=${loanAmount}`}
                  className="inline-flex items-center justify-center bg-quicklend-600 text-white font-semibold px-8 py-3 rounded-lg hover:bg-quicklend-700 transition-colors"
                >
                  Compare Your Options <ArrowRight className="ml-2 h-4 w-4" />
                </Link>
                <Link
                  href="/tools/business-loan-comparison-tool"
                  className="inline-flex items-center justify-center border border-quicklend-300 text-quicklend-700 font-semibold px-6 py-3 rounded-lg hover:bg-quicklend-50 transition-colors text-sm"
                >
                  Compare Loan Offers
                </Link>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
