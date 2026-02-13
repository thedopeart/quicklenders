'use client'

import { useState, useMemo } from 'react'
import Link from 'next/link'
import {
  ChevronRight,
  AlertTriangle,
  CheckCircle,
  XCircle,
  TrendingUp,
  TrendingDown,
  ArrowRight,
  Info,
} from 'lucide-react'

// ────────────────────────────────────────────────────────────────────
// Types & Constants
// ────────────────────────────────────────────────────────────────────

type Mode = 'simple' | 'detailed'

interface DSCRTier {
  label: string
  color: string
  bgColor: string
  borderColor: string
  message: string
}

const tiers: Record<string, DSCRTier> = {
  critical: {
    label: 'Critical',
    color: 'text-red-700',
    bgColor: 'bg-red-50',
    borderColor: 'border-red-200',
    message: 'Your income does not cover your debt payments. Most lenders will decline at this level.',
  },
  risky: {
    label: 'Risky',
    color: 'text-orange-700',
    bgColor: 'bg-orange-50',
    borderColor: 'border-orange-200',
    message: 'You are close to break-even but still short. A limited number of lenders may work with you if other factors are strong.',
  },
  marginal: {
    label: 'Marginal',
    color: 'text-yellow-700',
    bgColor: 'bg-yellow-50',
    borderColor: 'border-yellow-200',
    message: 'You can cover payments, but there is little cushion. Some lenders may approve with additional conditions or collateral.',
  },
  acceptable: {
    label: 'Acceptable',
    color: 'text-emerald-700',
    bgColor: 'bg-emerald-50',
    borderColor: 'border-emerald-200',
    message: 'You meet minimum requirements for most lenders, including SBA loans. You should have solid options available.',
  },
  good: {
    label: 'Good',
    color: 'text-green-700',
    bgColor: 'bg-green-50',
    borderColor: 'border-green-200',
    message: 'Solid position. You will qualify with most lenders and may receive more competitive rates and terms.',
  },
  strong: {
    label: 'Strong',
    color: 'text-green-700',
    bgColor: 'bg-green-50',
    borderColor: 'border-green-200',
    message: 'Strong coverage. Lenders will view your application favorably, and you are in a good negotiating position.',
  },
  excellent: {
    label: 'Excellent',
    color: 'text-green-700',
    bgColor: 'bg-green-50',
    borderColor: 'border-green-200',
    message: 'Excellent coverage. You are in a strong negotiating position for the best rates and terms available.',
  },
}

const lenderRequirements = [
  { name: 'SBA 7(a) Loans', min: 1.15 },
  { name: 'Bank Term Loans', min: 1.25 },
  { name: 'Commercial Real Estate', min: 1.25 },
  { name: 'Online Lenders', min: 1.0 },
  { name: 'Equipment Financing', min: 0 },
]

function getTier(dscr: number): DSCRTier & { key: string } {
  if (dscr < 0.8) return { ...tiers.critical, key: 'critical' }
  if (dscr < 1.0) return { ...tiers.risky, key: 'risky' }
  if (dscr < 1.15) return { ...tiers.marginal, key: 'marginal' }
  if (dscr < 1.25) return { ...tiers.acceptable, key: 'acceptable' }
  if (dscr < 1.5) return { ...tiers.good, key: 'good' }
  if (dscr < 2.0) return { ...tiers.strong, key: 'strong' }
  return { ...tiers.excellent, key: 'excellent' }
}

// ────────────────────────────────────────────────────────────────────
// Formatting helpers
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
// Gauge Component
// ────────────────────────────────────────────────────────────────────

function DSCRGauge({ dscr }: { dscr: number }) {
  // Map DSCR to position on gauge (0-100%)
  // 0 → 0%, 1.0 → 33%, 1.25 → 50%, 2.0 → 75%, 3.0 → 100%
  const clampedDscr = Math.min(Math.max(dscr, 0), 3)
  let position: number
  if (clampedDscr <= 1.0) {
    position = (clampedDscr / 1.0) * 33
  } else if (clampedDscr <= 1.25) {
    position = 33 + ((clampedDscr - 1.0) / 0.25) * 17
  } else if (clampedDscr <= 2.0) {
    position = 50 + ((clampedDscr - 1.25) / 0.75) * 25
  } else {
    position = 75 + ((clampedDscr - 2.0) / 1.0) * 25
  }

  return (
    <div className="w-full">
      {/* Gauge bar */}
      <div className="relative h-4 rounded-full overflow-hidden bg-gray-100">
        {/* Color zones */}
        <div className="absolute inset-0 flex">
          <div className="h-full bg-red-400" style={{ width: '33%' }} />
          <div className="h-full bg-yellow-400" style={{ width: '17%' }} />
          <div className="h-full bg-green-400" style={{ width: '50%' }} />
        </div>
        {/* Marker */}
        <div
          className="absolute top-1/2 -translate-y-1/2 -translate-x-1/2 w-5 h-5 rounded-full bg-white border-3 border-quicklend-900 shadow-md transition-all duration-700 ease-out"
          style={{ left: `${position}%`, borderWidth: '3px' }}
        />
      </div>
      {/* Labels */}
      <div className="relative flex justify-between mt-2 text-xs text-gray-400">
        <span>0</span>
        <span className="absolute" style={{ left: '33%', transform: 'translateX(-50%)' }}>1.0</span>
        <span className="absolute" style={{ left: '50%', transform: 'translateX(-50%)' }}>1.25</span>
        <span className="absolute" style={{ left: '75%', transform: 'translateX(-50%)' }}>2.0</span>
        <span>3.0</span>
      </div>
      <div className="relative flex mt-1 text-xs font-medium">
        <span className="text-red-600" style={{ width: '33%', textAlign: 'center' }}>Below</span>
        <span className="text-yellow-600" style={{ width: '17%', textAlign: 'center' }}>Tight</span>
        <span className="text-green-600" style={{ width: '50%', textAlign: 'center' }}>Healthy</span>
      </div>
    </div>
  )
}

// ────────────────────────────────────────────────────────────────────
// Currency Input Component
// ────────────────────────────────────────────────────────────────────

function CurrencyInput({
  label,
  value,
  onChange,
  helperText,
  min = 0,
  max = 100000000,
}: {
  label: string
  value: number
  onChange: (v: number) => void
  helperText?: string
  min?: number
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
            if (num >= min && num <= max) onChange(num)
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

export default function DSCRCalculatorTool() {
  const [mode, setMode] = useState<Mode>('simple')

  // Simple mode
  const [noi, setNoi] = useState(200000)
  const [totalDebt, setTotalDebt] = useState(150000)

  // Detailed mode
  const [revenue, setRevenue] = useState(500000)
  const [cogs, setCogs] = useState(180000)
  const [opex, setOpex] = useState(120000)
  const [existingDebt, setExistingDebt] = useState(100000)
  const [proposedMonthly, setProposedMonthly] = useState(4167)

  // Computed values
  const detailedNoi = revenue - cogs - opex
  const detailedTotalDebt = existingDebt + proposedMonthly * 12

  const effectiveNoi = mode === 'simple' ? noi : detailedNoi
  const effectiveTotalDebt = mode === 'simple' ? totalDebt : detailedTotalDebt

  const results = useMemo(() => {
    if (effectiveNoi <= 0 || effectiveTotalDebt <= 0) return null

    const dscr = effectiveNoi / effectiveTotalDebt
    const tier = getTier(dscr)

    // Current DSCR (without proposed new loan, only in detailed mode)
    let currentDscr: number | null = null
    if (mode === 'detailed' && existingDebt > 0) {
      currentDscr = detailedNoi / existingDebt
    }

    // Max affordable new annual payment at 1.25 target
    const maxTotalDebtAt125 = effectiveNoi / 1.25
    const existingAnnual = mode === 'detailed' ? existingDebt : 0
    const maxNewAnnualPayment = Math.max(0, maxTotalDebtAt125 - existingAnnual)
    const maxNewMonthlyPayment = maxNewAnnualPayment / 12

    // What-if scenarios
    const whatIfNoiUp10 = (effectiveNoi * 1.1) / effectiveTotalDebt
    const whatIfDebtDown10 = effectiveTotalDebt * 0.9 > 0
      ? effectiveNoi / (effectiveTotalDebt * 0.9)
      : 0
    const whatIfNewDebt2k = effectiveNoi / (effectiveTotalDebt + 24000)

    return {
      dscr,
      tier,
      currentDscr,
      maxNewMonthlyPayment,
      maxNewAnnualPayment,
      cushionPercent: Math.round((dscr - 1) * 100),
      whatIf: {
        noiUp10: whatIfNoiUp10,
        debtDown10: whatIfDebtDown10,
        newDebt2k: whatIfNewDebt2k,
      },
    }
  }, [effectiveNoi, effectiveTotalDebt, mode, existingDebt, detailedNoi])

  const labelClasses = 'block text-sm font-medium text-gray-700 mb-2'

  return (
    <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
      {/* Intro */}
      <div className="p-6 sm:p-8 lg:p-10 pb-0">
        <p className="text-gray-700 leading-relaxed mb-2">
          DSCR measures whether your business earns enough to cover loan payments. Enter your numbers below to see your ratio, how lenders interpret it, and the maximum payment you can afford.
        </p>
        <p className="text-gray-500 text-sm mb-0">
          Results update in real time as you type. Use Detailed mode if you need to calculate your Net Operating Income.
        </p>
      </div>

      {/* Mode Toggle */}
      <div className="px-6 sm:px-8 lg:px-10 pt-6">
        <div className="inline-flex rounded-lg border border-gray-200 p-1">
          <button
            onClick={() => setMode('simple')}
            className={`px-4 py-2 rounded-md text-sm font-medium transition-colors ${
              mode === 'simple'
                ? 'bg-quicklend-600 text-white'
                : 'text-gray-600 hover:text-gray-900'
            }`}
          >
            Simple
          </button>
          <button
            onClick={() => setMode('detailed')}
            className={`px-4 py-2 rounded-md text-sm font-medium transition-colors ${
              mode === 'detailed'
                ? 'bg-quicklend-600 text-white'
                : 'text-gray-600 hover:text-gray-900'
            }`}
          >
            Detailed
          </button>
        </div>
      </div>

      {/* Inputs */}
      <div className="p-6 sm:p-8 lg:p-10">
        {mode === 'simple' ? (
          <div className="grid md:grid-cols-2 gap-6">
            <CurrencyInput
              label="Net Operating Income (Annual)"
              value={noi}
              onChange={setNoi}
              helperText="Annual revenue minus operating expenses, before loan payments. Check your P&L statement."
              max={100000000}
            />
            <CurrencyInput
              label="Total Annual Debt Payments"
              value={totalDebt}
              onChange={setTotalDebt}
              helperText="All annual loan payments: term loans, credit lines, equipment, real estate. Include any proposed new debt."
              max={50000000}
            />
          </div>
        ) : (
          <div className="space-y-8">
            {/* NOI Section */}
            <div>
              <h3 className="text-sm font-semibold text-quicklend-900 uppercase tracking-wider mb-4">Calculate Your NOI</h3>
              <div className="grid md:grid-cols-3 gap-6">
                <CurrencyInput
                  label="Annual Revenue"
                  value={revenue}
                  onChange={setRevenue}
                  max={100000000}
                />
                <CurrencyInput
                  label="Cost of Goods Sold"
                  value={cogs}
                  onChange={setCogs}
                  max={100000000}
                />
                <CurrencyInput
                  label="Operating Expenses"
                  value={opex}
                  onChange={setOpex}
                  max={100000000}
                />
              </div>
              <div className="mt-4 bg-gray-50 rounded-lg px-4 py-3 flex items-center justify-between">
                <span className="text-sm text-gray-600">Net Operating Income</span>
                <span className={`text-lg font-bold ${detailedNoi >= 0 ? 'text-quicklend-900' : 'text-red-600'}`}>
                  {formatCurrency(detailedNoi)}
                </span>
              </div>
            </div>

            {/* Debt Section */}
            <div>
              <h3 className="text-sm font-semibold text-quicklend-900 uppercase tracking-wider mb-4">Calculate Your Debt Payments</h3>
              <div className="grid md:grid-cols-2 gap-6">
                <CurrencyInput
                  label="Existing Annual Debt Payments"
                  value={existingDebt}
                  onChange={setExistingDebt}
                  helperText="Current annual total for all existing loans."
                  max={50000000}
                />
                <CurrencyInput
                  label="Proposed New Monthly Payment"
                  value={proposedMonthly}
                  onChange={setProposedMonthly}
                  helperText="Monthly payment on the loan you are considering."
                  max={5000000}
                />
              </div>
              <div className="mt-4 bg-gray-50 rounded-lg px-4 py-3 flex items-center justify-between">
                <span className="text-sm text-gray-600">Total Annual Debt Service</span>
                <span className="text-lg font-bold text-quicklend-900">
                  {formatCurrency(detailedTotalDebt)}
                </span>
              </div>
              <p className="mt-2 text-xs text-gray-400">
                Not sure about the monthly payment?{' '}
                <Link href="/tools/loan-payment-calculator" className="text-quicklend-600 font-medium hover:underline">
                  Calculate it first
                </Link>
              </p>
            </div>
          </div>
        )}
      </div>

      {/* Results */}
      {results && (
        <div className="border-t border-gray-100">
          {/* DSCR Score */}
          <div className="p-6 sm:p-8 lg:p-10 text-center">
            <p className="text-sm text-gray-600 mb-2">Your Debt Service Coverage Ratio</p>
            <div className="inline-block mb-6">
              <p className={`text-6xl font-bold ${results.tier.color}`}>
                {results.dscr.toFixed(2)}
              </p>
              <p className={`text-sm font-semibold mt-1 ${results.tier.color}`}>
                {results.tier.label}
              </p>
            </div>

            {/* Gauge */}
            <div className="max-w-lg mx-auto mb-8">
              <DSCRGauge dscr={results.dscr} />
            </div>

            {/* Current vs Projected (detailed mode) */}
            {mode === 'detailed' && results.currentDscr !== null && (
              <div className="grid grid-cols-2 gap-4 max-w-md mx-auto mb-6">
                <div className="bg-gray-50 rounded-xl p-4 text-center">
                  <p className="text-xs text-gray-500 mb-1">Current DSCR</p>
                  <p className="text-2xl font-bold text-quicklend-900">{results.currentDscr.toFixed(2)}</p>
                  <p className="text-xs text-gray-400">without new loan</p>
                </div>
                <div className="bg-gray-50 rounded-xl p-4 text-center">
                  <p className="text-xs text-gray-500 mb-1">Projected DSCR</p>
                  <p className={`text-2xl font-bold ${results.tier.color}`}>{results.dscr.toFixed(2)}</p>
                  <p className="text-xs text-gray-400">with new loan</p>
                </div>
              </div>
            )}

            {/* Interpretation Card */}
            <div className={`${results.tier.bgColor} ${results.tier.borderColor} border rounded-xl p-6 max-w-2xl mx-auto text-left`}>
              <div className="flex items-start gap-3">
                <div className="mt-0.5 flex-shrink-0">
                  {results.dscr >= 1.15 ? (
                    <CheckCircle className="h-5 w-5 text-green-600" />
                  ) : results.dscr >= 1.0 ? (
                    <AlertTriangle className="h-5 w-5 text-yellow-600" />
                  ) : (
                    <XCircle className="h-5 w-5 text-red-600" />
                  )}
                </div>
                <div>
                  <p className={`font-semibold mb-1 ${results.tier.color}`}>{results.tier.label} Position</p>
                  <p className="text-gray-700 text-sm leading-relaxed">{results.tier.message}</p>
                  {results.dscr >= 1.0 && (
                    <p className="text-gray-500 text-sm mt-2">
                      Your business generates {results.cushionPercent}% more income than needed to cover debt payments.
                    </p>
                  )}
                </div>
              </div>
            </div>
          </div>

          {/* Key Metrics */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 px-6 sm:px-8 lg:px-10 pb-8">
            <div className="bg-gray-50 rounded-xl p-5 text-center">
              <p className="text-sm text-gray-600 mb-1">Annual NOI</p>
              <p className="text-xl font-bold text-quicklend-900">{formatCurrency(effectiveNoi)}</p>
            </div>
            <div className="bg-gray-50 rounded-xl p-5 text-center">
              <p className="text-sm text-gray-600 mb-1">Annual Debt Service</p>
              <p className="text-xl font-bold text-quicklend-900">{formatCurrency(effectiveTotalDebt)}</p>
            </div>
            <div className="bg-gray-50 rounded-xl p-5 text-center">
              <p className="text-sm text-gray-600 mb-1">Max Affordable Payment</p>
              <p className="text-xl font-bold text-quicklend-900">
                {formatCurrency(results.maxNewMonthlyPayment)}<span className="text-sm font-normal text-gray-500">/mo</span>
              </p>
              <p className="text-xs text-gray-400 mt-1">at 1.25x target DSCR</p>
            </div>
          </div>

          {/* Lender Requirements */}
          <div className="px-6 sm:px-8 lg:px-10 pb-8">
            <details className="group">
              <summary className="cursor-pointer text-sm font-semibold text-gray-600 hover:text-gray-900 flex items-center gap-2">
                <ChevronRight className="h-4 w-4 group-open:rotate-90 transition-transform" />
                Lender Requirements Comparison
              </summary>
              <div className="mt-4 bg-gray-50 rounded-xl overflow-hidden">
                <table className="w-full text-sm">
                  <thead>
                    <tr className="border-b border-gray-200">
                      <th className="text-left px-4 py-3 font-semibold text-gray-700">Lender Type</th>
                      <th className="text-center px-4 py-3 font-semibold text-gray-700">Min DSCR</th>
                      <th className="text-center px-4 py-3 font-semibold text-gray-700">You</th>
                    </tr>
                  </thead>
                  <tbody>
                    {lenderRequirements.map((lender) => {
                      const meets = lender.min === 0 || results.dscr >= lender.min
                      return (
                        <tr key={lender.name} className="border-b border-gray-100 last:border-0">
                          <td className="px-4 py-3 text-gray-700">{lender.name}</td>
                          <td className="px-4 py-3 text-center text-gray-500">
                            {lender.min === 0 ? 'Varies' : lender.min.toFixed(2)}
                          </td>
                          <td className="px-4 py-3 text-center">
                            {meets ? (
                              <span className="inline-flex items-center gap-1 text-green-600 font-medium">
                                <CheckCircle className="h-4 w-4" /> Meets
                              </span>
                            ) : (
                              <span className="inline-flex items-center gap-1 text-red-500 font-medium">
                                <XCircle className="h-4 w-4" /> Below
                              </span>
                            )}
                          </td>
                        </tr>
                      )
                    })}
                  </tbody>
                </table>
              </div>
            </details>
          </div>

          {/* What-If Scenarios */}
          <div className="px-6 sm:px-8 lg:px-10 pb-8">
            <details className="group">
              <summary className="cursor-pointer text-sm font-semibold text-gray-600 hover:text-gray-900 flex items-center gap-2">
                <ChevronRight className="h-4 w-4 group-open:rotate-90 transition-transform" />
                What-If Scenarios
              </summary>
              <div className="mt-4 space-y-3">
                <div className="flex items-center justify-between bg-gray-50 rounded-lg px-4 py-3">
                  <div className="flex items-center gap-2 text-sm text-gray-700">
                    <TrendingUp className="h-4 w-4 text-green-500" />
                    If you increased NOI by 10%
                  </div>
                  <span className="font-bold text-quicklend-900">DSCR {results.whatIf.noiUp10.toFixed(2)}</span>
                </div>
                <div className="flex items-center justify-between bg-gray-50 rounded-lg px-4 py-3">
                  <div className="flex items-center gap-2 text-sm text-gray-700">
                    <TrendingDown className="h-4 w-4 text-blue-500" />
                    If you reduced debt payments by 10%
                  </div>
                  <span className="font-bold text-quicklend-900">DSCR {results.whatIf.debtDown10.toFixed(2)}</span>
                </div>
                <div className="flex items-center justify-between bg-gray-50 rounded-lg px-4 py-3">
                  <div className="flex items-center gap-2 text-sm text-gray-700">
                    <AlertTriangle className="h-4 w-4 text-orange-500" />
                    If you added $2,000/mo in new debt
                  </div>
                  <span className="font-bold text-quicklend-900">DSCR {results.whatIf.newDebt2k.toFixed(2)}</span>
                </div>
              </div>
            </details>
          </div>

          {/* Dynamic CTA */}
          <div className="px-6 sm:px-8 lg:px-10 pb-8">
            <div className="bg-quicklend-50 rounded-xl p-6 text-center">
              {results.dscr >= 1.25 ? (
                <>
                  <p className="text-gray-700 mb-1 font-medium">
                    Your DSCR of {results.dscr.toFixed(2)} puts you in a strong position.
                  </p>
                  <p className="text-gray-500 text-sm mb-4">See what rates and terms you qualify for.</p>
                  <Link
                    href={`/get-started?source=dscr-calculator&dscr=${results.dscr.toFixed(2)}`}
                    className="inline-flex items-center bg-quicklend-600 text-white font-semibold px-8 py-3 rounded-lg hover:bg-quicklend-700 transition-colors"
                  >
                    Get Your Options <ArrowRight className="ml-2 h-4 w-4" />
                  </Link>
                </>
              ) : results.dscr >= 1.0 ? (
                <>
                  <p className="text-gray-700 mb-1 font-medium">
                    Your DSCR of {results.dscr.toFixed(2)} meets requirements for many lenders.
                  </p>
                  <p className="text-gray-500 text-sm mb-4">A funding specialist can help match you with the right options.</p>
                  <Link
                    href={`/get-started?source=dscr-calculator&dscr=${results.dscr.toFixed(2)}`}
                    className="inline-flex items-center bg-quicklend-600 text-white font-semibold px-8 py-3 rounded-lg hover:bg-quicklend-700 transition-colors"
                  >
                    See Your Options <ArrowRight className="ml-2 h-4 w-4" />
                  </Link>
                </>
              ) : (
                <>
                  <p className="text-gray-700 mb-1 font-medium">
                    Your current DSCR is below most lender requirements.
                  </p>
                  <p className="text-gray-500 text-sm mb-4">
                    Alternative financing like asset-based lending or invoice factoring may work for your situation.
                  </p>
                  <Link
                    href="/get-started?source=dscr-calculator&loan_type=asset-backed-loans"
                    className="inline-flex items-center bg-quicklend-600 text-white font-semibold px-8 py-3 rounded-lg hover:bg-quicklend-700 transition-colors"
                  >
                    Explore Options <ArrowRight className="ml-2 h-4 w-4" />
                  </Link>
                </>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
