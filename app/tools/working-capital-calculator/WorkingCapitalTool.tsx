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
  TrendingUp,
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
// Currency Input Component
// ────────────────────────────────────────────────────────────────────

function CurrencyInput({
  label,
  value,
  onChange,
  max = 50000000,
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
      <label className="block text-sm font-medium text-gray-700 mb-1">{label}</label>
      <div className="relative">
        <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500 text-sm">$</span>
        <input
          type="text"
          inputMode="numeric"
          value={formatInputDisplay(value)}
          onChange={(e) => {
            const num = parseCurrencyInput(e.target.value)
            if (num >= 0 && num <= max) onChange(num)
          }}
          className="w-full rounded-lg border border-gray-300 px-3 py-2.5 pl-7 text-sm text-gray-900 focus:border-quicklend-600 focus:ring-2 focus:ring-quicklend-600/20 focus:outline-none transition-colors"
          placeholder="0"
        />
      </div>
      {hint && (
        <p className="flex items-start gap-1.5 mt-1 text-xs text-gray-400">
          <Info className="h-3 w-3 mt-0.5 flex-shrink-0" />
          {hint}
        </p>
      )}
    </div>
  )
}

// ────────────────────────────────────────────────────────────────────
// Ratio tiers
// ────────────────────────────────────────────────────────────────────

type RatioTier = 'critical' | 'tight' | 'adequate' | 'healthy' | 'strong'

function getRatioTier(ratio: number): RatioTier {
  if (ratio < 1.0) return 'critical'
  if (ratio < 1.2) return 'tight'
  if (ratio < 1.5) return 'adequate'
  if (ratio <= 2.0) return 'healthy'
  return 'strong'
}

const tierConfig: Record<RatioTier, { label: string; color: string; bg: string; border: string; icon: typeof CheckCircle; description: string }> = {
  critical: {
    label: 'Critical',
    color: 'text-red-600',
    bg: 'bg-red-50',
    border: 'border-red-200',
    icon: XCircle,
    description: 'Current liabilities exceed assets. Immediate action needed to avoid cash shortfalls.',
  },
  tight: {
    label: 'Tight',
    color: 'text-amber-600',
    bg: 'bg-amber-50',
    border: 'border-amber-200',
    icon: AlertTriangle,
    description: 'Just barely covering obligations. Vulnerable to any unexpected expense or late payment.',
  },
  adequate: {
    label: 'Adequate',
    color: 'text-yellow-600',
    bg: 'bg-yellow-50',
    border: 'border-yellow-200',
    icon: AlertTriangle,
    description: 'Meeting obligations with some buffer, but limited room for disruption or growth.',
  },
  healthy: {
    label: 'Healthy',
    color: 'text-green-600',
    bg: 'bg-green-50',
    border: 'border-green-200',
    icon: CheckCircle,
    description: 'Comfortable margin for unexpected expenses and opportunities.',
  },
  strong: {
    label: 'Strong',
    color: 'text-blue-600',
    bg: 'bg-blue-50',
    border: 'border-blue-200',
    icon: TrendingUp,
    description: 'Very healthy position, though excess capital may be sitting idle. Consider investing in growth.',
  },
}

// ────────────────────────────────────────────────────────────────────
// Main Component
// ────────────────────────────────────────────────────────────────────

export default function WorkingCapitalTool() {
  // Assets
  const [cash, setCash] = useState(45000)
  const [receivables, setReceivables] = useState(62000)
  const [inventory, setInventory] = useState(28000)
  const [prepaid, setPrepaid] = useState(5000)

  // Liabilities
  const [payables, setPayables] = useState(38000)
  const [shortTermDebt, setShortTermDebt] = useState(15000)
  const [accrued, setAccrued] = useState(12000)
  const [otherLiabilities, setOtherLiabilities] = useState(5000)

  // Optional context
  const [showContext, setShowContext] = useState(false)
  const [monthlyExpenses, setMonthlyExpenses] = useState(25000)
  const [annualRevenue, setAnnualRevenue] = useState(1500000)
  const [cogs, setCogs] = useState(900000)

  // ── Calculations ──────────────────────────────────────────────────

  const results = useMemo(() => {
    const totalAssets = cash + receivables + inventory + prepaid
    const totalLiabilities = payables + shortTermDebt + accrued + otherLiabilities

    if (totalAssets <= 0 && totalLiabilities <= 0) return null

    const netWorkingCapital = totalAssets - totalLiabilities
    const ratio = totalLiabilities > 0 ? totalAssets / totalLiabilities : totalAssets > 0 ? 99 : 0
    const tier = getRatioTier(ratio)

    // Cash runway (if expenses provided)
    let runway: number | null = null
    let runwayTarget3: number | null = null
    let runwayTarget6: number | null = null
    let shortfall3: number | null = null

    if (showContext && monthlyExpenses > 0) {
      runway = cash / monthlyExpenses
      runwayTarget3 = monthlyExpenses * 3
      runwayTarget6 = monthlyExpenses * 6
      shortfall3 = Math.max(0, runwayTarget3 - cash)
    }

    // Cash conversion cycle (if revenue & COGS provided)
    let dio: number | null = null
    let dso: number | null = null
    let dpo: number | null = null
    let ccc: number | null = null

    if (showContext && annualRevenue > 0 && cogs > 0) {
      dio = inventory > 0 ? (inventory / cogs) * 365 : 0
      dso = receivables > 0 ? (receivables / annualRevenue) * 365 : 0
      dpo = payables > 0 ? (payables / cogs) * 365 : 0
      ccc = dio + dso - dpo
    }

    // Financing recommendation
    let recommendedMin = 0
    let recommendedComfortable = 0
    let recommendedGrowth = 0

    if (showContext && monthlyExpenses > 0) {
      recommendedMin = Math.max(0, monthlyExpenses * 3 - cash)
      recommendedComfortable = Math.max(0, Math.ceil((monthlyExpenses * 3 * 1.2 - cash) / 5000) * 5000)
      recommendedGrowth = Math.max(0, monthlyExpenses * 6 - cash)
    } else if (totalLiabilities > 0) {
      // Fallback: based on ratio gap to 1.5
      const targetAssets = totalLiabilities * 1.5
      recommendedMin = Math.max(0, targetAssets - totalAssets)
      recommendedComfortable = Math.max(0, Math.ceil((totalLiabilities * 1.75 - totalAssets) / 5000) * 5000)
      recommendedGrowth = Math.max(0, totalLiabilities * 2.0 - totalAssets)
    }

    return {
      totalAssets,
      totalLiabilities,
      netWorkingCapital,
      ratio,
      tier,
      runway,
      runwayTarget3,
      runwayTarget6,
      shortfall3,
      dio,
      dso,
      dpo,
      ccc,
      recommendedMin,
      recommendedComfortable,
      recommendedGrowth,
    }
  }, [cash, receivables, inventory, prepaid, payables, shortTermDebt, accrued, otherLiabilities, showContext, monthlyExpenses, annualRevenue, cogs])

  // ── Bar widths for visual ────────────────────────────────────────

  const maxTotal = results ? Math.max(results.totalAssets, results.totalLiabilities, 1) : 1

  return (
    <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
      {/* Intro */}
      <div className="p-6 sm:p-8 lg:p-10 pb-0">
        <p className="text-gray-700 leading-relaxed mb-2">
          Enter your current assets and liabilities to see your working capital position, ratio health, and how much financing you may need.
        </p>
        <p className="text-gray-500 text-sm mb-0">
          All results update in real time. Add monthly expenses for a cash runway analysis.
        </p>
      </div>

      {/* Inputs */}
      <div className="p-6 sm:p-8 lg:p-10">
        <div className="grid md:grid-cols-2 gap-6">
          {/* Assets */}
          <div className="bg-green-50 border border-green-200 rounded-xl p-5">
            <h3 className="text-sm font-semibold text-green-700 mb-4">Current Assets</h3>
            <div className="space-y-3">
              <CurrencyInput label="Cash & Bank Balances" value={cash} onChange={setCash} hint="Checking, savings, money market accounts" />
              <CurrencyInput label="Accounts Receivable" value={receivables} onChange={setReceivables} hint="Money customers owe you" />
              <CurrencyInput label="Inventory" value={inventory} onChange={setInventory} hint="Value of goods in stock" />
              <CurrencyInput label="Prepaid Expenses" value={prepaid} onChange={setPrepaid} hint="Rent, insurance paid in advance" />
            </div>
            <div className="mt-4 pt-3 border-t border-green-200 flex justify-between">
              <span className="text-sm font-semibold text-green-700">Total Assets</span>
              <span className="text-sm font-bold text-green-900">{formatCurrency(cash + receivables + inventory + prepaid)}</span>
            </div>
          </div>

          {/* Liabilities */}
          <div className="bg-red-50 border border-red-200 rounded-xl p-5">
            <h3 className="text-sm font-semibold text-red-700 mb-4">Current Liabilities</h3>
            <div className="space-y-3">
              <CurrencyInput label="Accounts Payable" value={payables} onChange={setPayables} hint="Money owed to suppliers" />
              <CurrencyInput label="Short-term Debt" value={shortTermDebt} onChange={setShortTermDebt} hint="Loan payments due within 12 months" />
              <CurrencyInput label="Accrued Expenses" value={accrued} onChange={setAccrued} hint="Wages, taxes, utilities owed" />
              <CurrencyInput label="Other Current Liabilities" value={otherLiabilities} onChange={setOtherLiabilities} hint="Other obligations due within 12 months" />
            </div>
            <div className="mt-4 pt-3 border-t border-red-200 flex justify-between">
              <span className="text-sm font-semibold text-red-700">Total Liabilities</span>
              <span className="text-sm font-bold text-red-900">{formatCurrency(payables + shortTermDebt + accrued + otherLiabilities)}</span>
            </div>
          </div>
        </div>

        {/* Optional Context */}
        <div className="mt-6">
          <button
            onClick={() => setShowContext(!showContext)}
            className="inline-flex items-center text-sm text-quicklend-600 font-medium hover:text-quicklend-700 transition-colors"
          >
            <ChevronRight className={`h-4 w-4 mr-1 transition-transform ${showContext ? 'rotate-90' : ''}`} />
            {showContext ? 'Hide' : 'Add'} monthly expenses &amp; revenue for deeper analysis
          </button>
          {showContext && (
            <div className="mt-4 bg-gray-50 border border-gray-200 rounded-xl p-5">
              <div className="grid sm:grid-cols-3 gap-4">
                <CurrencyInput label="Monthly Operating Expenses" value={monthlyExpenses} onChange={setMonthlyExpenses} hint="Total monthly overhead" />
                <CurrencyInput label="Annual Revenue" value={annualRevenue} onChange={setAnnualRevenue} max={100000000} hint="Gross annual sales" />
                <CurrencyInput label="Annual Cost of Goods Sold" value={cogs} onChange={setCogs} max={75000000} hint="Direct costs of production" />
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Results */}
      {results && (
        <div className="border-t border-gray-100">
          {/* Main Metrics */}
          <div className="p-6 sm:p-8 lg:p-10">
            <h3 className="text-sm font-semibold text-gray-700 mb-4">Your Working Capital Position</h3>

            {/* Net WC + Ratio cards */}
            <div className="grid sm:grid-cols-2 gap-4 mb-4">
              <div className="bg-quicklend-50 border border-quicklend-200 rounded-xl p-6 text-center">
                <p className="text-xs font-semibold text-quicklend-600 uppercase tracking-wider mb-1">Net Working Capital</p>
                <p className={`text-3xl font-bold ${results.netWorkingCapital >= 0 ? 'text-quicklend-900' : 'text-red-600'}`}>
                  {formatCurrency(results.netWorkingCapital)}
                </p>
                <p className="text-sm text-gray-600 mt-1">Assets minus Liabilities</p>
              </div>
              <div className={`${tierConfig[results.tier].bg} ${tierConfig[results.tier].border} border rounded-xl p-6 text-center`}>
                <p className="text-xs font-semibold text-gray-500 uppercase tracking-wider mb-1">Working Capital Ratio</p>
                <p className={`text-3xl font-bold ${tierConfig[results.tier].color}`}>
                  {results.ratio >= 99 ? '99+' : results.ratio.toFixed(2)}
                </p>
                <p className={`text-sm font-semibold ${tierConfig[results.tier].color} mt-1`}>
                  {tierConfig[results.tier].label}
                </p>
              </div>
            </div>

            {/* Ratio Interpretation */}
            {(() => {
              const config = tierConfig[results.tier]
              const Icon = config.icon
              return (
                <div className={`${config.bg} ${config.border} border rounded-xl p-5 mb-4`}>
                  <div className="flex items-start gap-3">
                    <Icon className={`h-5 w-5 ${config.color} mt-0.5 flex-shrink-0`} />
                    <div>
                      <p className={`font-semibold ${config.color}`}>{config.label} Position</p>
                      <p className="text-sm text-gray-700 mt-1">{config.description}</p>
                    </div>
                  </div>
                </div>
              )
            })()}

            {/* Assets vs Liabilities Visual */}
            <div className="space-y-3">
              <div>
                <div className="flex items-center justify-between mb-1">
                  <span className="text-sm font-medium text-green-700">Total Assets</span>
                  <span className="text-sm font-bold text-green-900">{formatCurrency(results.totalAssets)}</span>
                </div>
                <div className="h-8 bg-gray-100 rounded-lg overflow-hidden">
                  <div
                    className="h-full bg-green-500 rounded-lg transition-all duration-500 flex items-center"
                    style={{ width: `${(results.totalAssets / maxTotal) * 100}%` }}
                  >
                    {results.totalAssets / maxTotal > 0.15 && (
                      <div className="flex items-center gap-2 px-3 text-xs text-white font-medium whitespace-nowrap overflow-hidden">
                        <span>Cash: {formatCurrency(cash)}</span>
                        {receivables > 0 && <span>AR: {formatCurrency(receivables)}</span>}
                        {inventory > 0 && <span>Inv: {formatCurrency(inventory)}</span>}
                      </div>
                    )}
                  </div>
                </div>
              </div>
              <div>
                <div className="flex items-center justify-between mb-1">
                  <span className="text-sm font-medium text-red-700">Total Liabilities</span>
                  <span className="text-sm font-bold text-red-900">{formatCurrency(results.totalLiabilities)}</span>
                </div>
                <div className="h-8 bg-gray-100 rounded-lg overflow-hidden">
                  <div
                    className="h-full bg-red-500 rounded-lg transition-all duration-500 flex items-center"
                    style={{ width: `${(results.totalLiabilities / maxTotal) * 100}%` }}
                  >
                    {results.totalLiabilities / maxTotal > 0.15 && (
                      <div className="flex items-center gap-2 px-3 text-xs text-white font-medium whitespace-nowrap overflow-hidden">
                        <span>AP: {formatCurrency(payables)}</span>
                        {shortTermDebt > 0 && <span>Debt: {formatCurrency(shortTermDebt)}</span>}
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Cash Conversion Cycle */}
          {results.ccc !== null && results.dio !== null && results.dso !== null && results.dpo !== null && (
            <div className="px-6 sm:px-8 lg:px-10 pb-8">
              <details className="group" open>
                <summary className="cursor-pointer text-sm font-semibold text-gray-600 hover:text-gray-900 flex items-center gap-2">
                  <ChevronRight className="h-4 w-4 group-open:rotate-90 transition-transform" />
                  Cash Conversion Cycle
                </summary>
                <div className="mt-4">
                  <div className="bg-quicklend-900 rounded-xl p-5 flex flex-col sm:flex-row items-center justify-between gap-3 mb-4">
                    <div>
                      <p className="text-quicklend-200 text-sm">Cash Conversion Cycle</p>
                      <p className="text-2xl font-bold text-white">{Math.round(results.ccc)} days</p>
                    </div>
                    <p className="text-quicklend-300 text-sm max-w-xs text-center sm:text-right">
                      {results.ccc <= 30
                        ? 'Fast cycle. Your cash turns over quickly.'
                        : results.ccc <= 60
                        ? 'Moderate cycle. Typical for most businesses.'
                        : 'Long cycle. You need more working capital to bridge the gap.'}
                    </p>
                  </div>
                  <div className="grid sm:grid-cols-3 gap-3">
                    <div className="bg-gray-50 rounded-xl p-4 text-center">
                      <p className="text-xs text-gray-500 mb-1">Days Inventory Outstanding</p>
                      <p className="text-xl font-bold text-gray-900">{Math.round(results.dio)}</p>
                      <p className="text-xs text-gray-400 mt-1">How long inventory sits before sale</p>
                    </div>
                    <div className="bg-gray-50 rounded-xl p-4 text-center">
                      <p className="text-xs text-gray-500 mb-1">Days Sales Outstanding</p>
                      <p className="text-xl font-bold text-gray-900">{Math.round(results.dso)}</p>
                      <p className="text-xs text-gray-400 mt-1">How long customers take to pay</p>
                    </div>
                    <div className="bg-gray-50 rounded-xl p-4 text-center">
                      <p className="text-xs text-gray-500 mb-1">Days Payable Outstanding</p>
                      <p className="text-xl font-bold text-gray-900">{Math.round(results.dpo)}</p>
                      <p className="text-xs text-gray-400 mt-1">How long you take to pay suppliers</p>
                    </div>
                  </div>
                  <p className="text-xs text-gray-400 mt-3">CCC = DIO ({Math.round(results.dio)}) + DSO ({Math.round(results.dso)}) - DPO ({Math.round(results.dpo)}) = {Math.round(results.ccc)} days</p>
                </div>
              </details>
            </div>
          )}

          {/* Cash Runway */}
          {results.runway !== null && (
            <div className="px-6 sm:px-8 lg:px-10 pb-8">
              <details className="group" open>
                <summary className="cursor-pointer text-sm font-semibold text-gray-600 hover:text-gray-900 flex items-center gap-2">
                  <ChevronRight className="h-4 w-4 group-open:rotate-90 transition-transform" />
                  Cash Runway Analysis
                </summary>
                <div className="mt-4">
                  <div className="grid sm:grid-cols-3 gap-3 mb-4">
                    <div className={`rounded-xl p-4 text-center ${results.runway < 2 ? 'bg-red-50 border border-red-200' : results.runway < 3 ? 'bg-amber-50 border border-amber-200' : 'bg-green-50 border border-green-200'}`}>
                      <p className="text-xs text-gray-500 mb-1">Current Cash Runway</p>
                      <p className={`text-2xl font-bold ${results.runway < 2 ? 'text-red-600' : results.runway < 3 ? 'text-amber-600' : 'text-green-600'}`}>
                        {results.runway.toFixed(1)} months
                      </p>
                      <p className="text-xs text-gray-400 mt-1">
                        {formatCurrency(cash)} cash / {formatCurrency(monthlyExpenses)}/mo
                      </p>
                    </div>
                    <div className="bg-gray-50 rounded-xl p-4 text-center">
                      <p className="text-xs text-gray-500 mb-1">3-Month Target</p>
                      <p className="text-xl font-bold text-gray-900">{formatCurrency(results.runwayTarget3!)}</p>
                      {results.shortfall3! > 0 && (
                        <p className="text-xs text-red-500 mt-1">Gap: {formatCurrency(results.shortfall3!)}</p>
                      )}
                    </div>
                    <div className="bg-gray-50 rounded-xl p-4 text-center">
                      <p className="text-xs text-gray-500 mb-1">6-Month Target</p>
                      <p className="text-xl font-bold text-gray-900">{formatCurrency(results.runwayTarget6!)}</p>
                      {cash < results.runwayTarget6! && (
                        <p className="text-xs text-red-500 mt-1">Gap: {formatCurrency(results.runwayTarget6! - cash)}</p>
                      )}
                    </div>
                  </div>
                  {results.runway < 3 && (
                    <div className="bg-amber-50 border border-amber-200 rounded-xl p-4">
                      <div className="flex items-start gap-2">
                        <AlertTriangle className="h-4 w-4 text-amber-600 mt-0.5 flex-shrink-0" />
                        <p className="text-sm text-gray-700">
                          Your cash runway is below the recommended 3-month minimum. Consider securing a {formatCurrency(results.shortfall3!)} line of credit to bridge the gap.
                        </p>
                      </div>
                    </div>
                  )}
                </div>
              </details>
            </div>
          )}

          {/* Financing Recommendation */}
          {(results.recommendedMin > 0 || results.recommendedComfortable > 0 || results.recommendedGrowth > 0) && (
            <div className="px-6 sm:px-8 lg:px-10 pb-8">
              <details className="group" open>
                <summary className="cursor-pointer text-sm font-semibold text-gray-600 hover:text-gray-900 flex items-center gap-2">
                  <ChevronRight className="h-4 w-4 group-open:rotate-90 transition-transform" />
                  Recommended Working Capital Financing
                </summary>
                <div className="mt-4">
                  <div className="grid sm:grid-cols-3 gap-3">
                    {results.recommendedMin > 0 && (
                      <div className="bg-gray-50 border border-gray-200 rounded-xl p-5">
                        <p className="text-xs font-semibold text-gray-500 uppercase tracking-wider mb-2">Minimum</p>
                        <p className="text-2xl font-bold text-gray-900">{formatCurrency(results.recommendedMin)}</p>
                        <p className="text-xs text-gray-500 mt-2">
                          {showContext ? 'Bring cash runway to 3 months' : 'Bring ratio to 1.5'}
                        </p>
                      </div>
                    )}
                    {results.recommendedComfortable > 0 && (
                      <div className="bg-quicklend-50 border-2 border-quicklend-300 rounded-xl p-5">
                        <div className="flex items-center gap-2 mb-2">
                          <p className="text-xs font-semibold text-quicklend-600 uppercase tracking-wider">Comfortable</p>
                          <span className="bg-quicklend-600 text-white text-xs px-1.5 py-0.5 rounded font-medium">Recommended</span>
                        </div>
                        <p className="text-2xl font-bold text-quicklend-900">{formatCurrency(results.recommendedComfortable)}</p>
                        <p className="text-xs text-gray-500 mt-2">
                          {showContext ? '3-month runway + 20% buffer' : 'Bring ratio to 1.75 with buffer'}
                        </p>
                      </div>
                    )}
                    {results.recommendedGrowth > 0 && (
                      <div className="bg-gray-50 border border-gray-200 rounded-xl p-5">
                        <p className="text-xs font-semibold text-gray-500 uppercase tracking-wider mb-2">Growth Mode</p>
                        <p className="text-2xl font-bold text-gray-900">{formatCurrency(results.recommendedGrowth)}</p>
                        <p className="text-xs text-gray-500 mt-2">
                          {showContext ? '6-month runway for flexibility' : 'Bring ratio to 2.0'}
                        </p>
                      </div>
                    )}
                  </div>
                  <div className="mt-4 bg-blue-50 border border-blue-200 rounded-xl p-4">
                    <p className="text-sm text-gray-700">
                      <span className="font-semibold">Best fit:</span>{' '}
                      {results.recommendedComfortable > 200000
                        ? <>A <Link href="/business-loans/lines-of-credit" className="text-theme-primary-light font-medium hover:underline">business line of credit</Link> or <Link href="/business-loans/asset-backed-loans" className="text-theme-primary-light font-medium hover:underline">asset-based facility</Link>. For larger working capital needs, asset-based lending can provide higher limits secured by your receivables and inventory.</>
                        : <>A <Link href="/business-loans/lines-of-credit" className="text-theme-primary-light font-medium hover:underline">business line of credit</Link>. Draw what you need, pay interest only on what you use. Ideal for fluctuating working capital needs.</>
                      }
                    </p>
                  </div>
                </div>
              </details>
            </div>
          )}

          {/* Ratio Reference Table */}
          <div className="px-6 sm:px-8 lg:px-10 pb-8">
            <details className="group">
              <summary className="cursor-pointer text-sm font-semibold text-gray-600 hover:text-gray-900 flex items-center gap-2">
                <ChevronRight className="h-4 w-4 group-open:rotate-90 transition-transform" />
                Working Capital Ratio Reference
              </summary>
              <div className="mt-4 bg-gray-50 rounded-xl overflow-hidden">
                <table className="w-full text-sm">
                  <thead>
                    <tr className="border-b border-gray-200">
                      <th className="text-left px-4 py-2 text-gray-500 font-medium">Ratio</th>
                      <th className="text-left px-4 py-2 text-gray-500 font-medium">Status</th>
                      <th className="text-left px-4 py-2 text-gray-500 font-medium">Meaning</th>
                    </tr>
                  </thead>
                  <tbody>
                    {[
                      { min: 0, max: 1.0, range: '< 1.0', status: 'Critical', color: 'text-red-600', desc: 'Liabilities exceed assets. Immediate action needed.' },
                      { min: 1.0, max: 1.2, range: '1.0 - 1.2', status: 'Tight', color: 'text-amber-600', desc: 'Barely covering obligations. Vulnerable to disruption.' },
                      { min: 1.2, max: 1.5, range: '1.2 - 1.5', status: 'Adequate', color: 'text-yellow-600', desc: 'Meeting obligations with some buffer.' },
                      { min: 1.5, max: 2.0, range: '1.5 - 2.0', status: 'Healthy', color: 'text-green-600', desc: 'Comfortable margin for unexpected expenses.' },
                      { min: 2.0, max: 999, range: '> 2.0', status: 'Strong', color: 'text-blue-600', desc: 'Very healthy. Capital may be sitting idle.' },
                    ].map((row) => (
                      <tr key={row.range} className={`border-b border-gray-100 ${results.ratio >= row.min && results.ratio < row.max ? 'bg-quicklend-50' : ''}`}>
                        <td className="px-4 py-2 font-medium text-gray-900">{row.range}</td>
                        <td className={`px-4 py-2 font-semibold ${row.color}`}>{row.status}</td>
                        <td className="px-4 py-2 text-gray-700">{row.desc}</td>
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
              {results.tier === 'critical' || results.tier === 'tight' ? (
                <>
                  <p className="text-gray-700 mb-1 font-medium">
                    Your working capital needs attention. Find financing to strengthen your position.
                  </p>
                  <p className="text-gray-500 text-sm mb-4">
                    No impact to your credit score.
                  </p>
                </>
              ) : results.tier === 'adequate' ? (
                <>
                  <p className="text-gray-700 mb-1 font-medium">
                    Your working capital could use some reinforcement.
                    {results.recommendedComfortable > 0 && ` A ${formatCurrency(results.recommendedComfortable)} line of credit could provide the buffer you need.`}
                  </p>
                  <p className="text-gray-500 text-sm mb-4">
                    No impact to your credit score.
                  </p>
                </>
              ) : (
                <>
                  <p className="text-gray-700 mb-1 font-medium">
                    Your working capital looks healthy. A line of credit can provide extra flexibility for growth.
                  </p>
                  <p className="text-gray-500 text-sm mb-4">
                    No impact to your credit score.
                  </p>
                </>
              )}
              <Link
                href={`/get-started?source=working-capital-calculator&loan_type=lines-of-credit&amount=${results.recommendedComfortable > 0 ? results.recommendedComfortable : results.recommendedMin > 0 ? results.recommendedMin : 50000}`}
                className="inline-flex items-center bg-quicklend-600 text-white font-semibold px-8 py-3 rounded-lg hover:bg-quicklend-700 transition-colors"
              >
                {results.tier === 'critical' || results.tier === 'tight' ? 'See Your Options Now' : 'Get Working Capital Options'} <ArrowRight className="ml-2 h-4 w-4" />
              </Link>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
