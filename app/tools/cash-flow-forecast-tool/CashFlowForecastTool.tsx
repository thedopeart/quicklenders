'use client'

import { useState, useMemo } from 'react'
import Link from 'next/link'
import {
  ArrowRight,
  ChevronRight,
  Info,
  AlertTriangle,
  TrendingUp,
  TrendingDown,
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

const monthLabels = ['Mo 1', 'Mo 2', 'Mo 3', 'Mo 4', 'Mo 5', 'Mo 6', 'Mo 7', 'Mo 8', 'Mo 9', 'Mo 10', 'Mo 11', 'Mo 12']

// ────────────────────────────────────────────────────────────────────
// Currency Input
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
      {hint && <p className="text-xs text-gray-400 mt-1">{hint}</p>}
    </div>
  )
}

// ────────────────────────────────────────────────────────────────────
// Main Component
// ────────────────────────────────────────────────────────────────────

export default function CashFlowForecastTool() {
  const [startingCash, setStartingCash] = useState(50000)
  const [monthlyRevenue, setMonthlyRevenue] = useState(80000)
  const [growthRate, setGrowthRate] = useState(2)
  const [cogs, setCogs] = useState(30000)
  const [operatingExpenses, setOperatingExpenses] = useState(35000)
  const [existingLoanPayments, setExistingLoanPayments] = useState(3000)

  // New loan toggle
  const [includeNewLoan, setIncludeNewLoan] = useState(false)
  const [newLoanPayment, setNewLoanPayment] = useState(2500)

  // Seasonal adjustments
  const [showSeasonal, setShowSeasonal] = useState(false)
  const [seasonalPcts, setSeasonalPcts] = useState<number[]>(Array(12).fill(100))

  const updateSeasonal = (idx: number, val: number) => {
    setSeasonalPcts((prev) => {
      const next = [...prev]
      next[idx] = Math.max(0, Math.min(200, val))
      return next
    })
  }

  // ── Calculations ──────────────────────────────────────────────────

  const results = useMemo(() => {
    if (monthlyRevenue <= 0) return null

    const totalMonthlyExpenses = cogs + operatingExpenses
    const totalLoanPayments = existingLoanPayments + (includeNewLoan ? newLoanPayment : 0)

    const months: {
      month: number
      label: string
      revenue: number
      expenses: number
      loanPayments: number
      netCashFlow: number
      runningBalance: number
    }[] = []

    let runningBalance = startingCash
    let lowestBalance = startingCash
    let lowestMonth = 1
    let negativeMonths = 0
    let totalRevenue = 0
    let totalExpenses = 0

    for (let i = 0; i < 12; i++) {
      // Revenue with growth and seasonal adjustment
      const growthMultiplier = Math.pow(1 + growthRate / 100, i)
      const seasonalMultiplier = showSeasonal ? seasonalPcts[i] / 100 : 1
      const revenue = Math.round(monthlyRevenue * growthMultiplier * seasonalMultiplier)

      const expenses = totalMonthlyExpenses
      const netCashFlow = revenue - expenses - totalLoanPayments
      runningBalance += netCashFlow

      if (runningBalance < lowestBalance) {
        lowestBalance = runningBalance
        lowestMonth = i + 1
      }
      if (runningBalance < 0) negativeMonths++

      totalRevenue += revenue
      totalExpenses += expenses

      months.push({
        month: i + 1,
        label: monthLabels[i],
        revenue,
        expenses,
        loanPayments: totalLoanPayments,
        netCashFlow,
        runningBalance,
      })
    }

    const endingBalance = runningBalance
    const totalNetCashFlow = endingBalance - startingCash
    const avgMonthlyCashFlow = Math.round(totalNetCashFlow / 12)
    const totalLoanCost = totalLoanPayments * 12

    // Funding gap: amount needed to keep balance >= 0
    const fundingGap = lowestBalance < 0 ? Math.abs(lowestBalance) : 0

    // Chart data
    const maxVal = Math.max(...months.map((m) => Math.abs(m.netCashFlow)), 1)
    const maxBalance = Math.max(...months.map((m) => m.runningBalance), startingCash)
    const minBalance = Math.min(...months.map((m) => m.runningBalance), startingCash)
    const balanceRange = Math.max(maxBalance - minBalance, 1)

    // Without new loan comparison
    let endingBalanceWithout = startingCash
    if (includeNewLoan) {
      for (let i = 0; i < 12; i++) {
        const growthMultiplier = Math.pow(1 + growthRate / 100, i)
        const seasonalMultiplier = showSeasonal ? seasonalPcts[i] / 100 : 1
        const revenue = Math.round(monthlyRevenue * growthMultiplier * seasonalMultiplier)
        endingBalanceWithout += revenue - totalMonthlyExpenses - existingLoanPayments
      }
    }

    return {
      months,
      startingCash,
      endingBalance,
      totalNetCashFlow,
      avgMonthlyCashFlow,
      lowestBalance,
      lowestMonth,
      negativeMonths,
      totalRevenue,
      totalExpenses,
      totalLoanCost,
      fundingGap,
      maxVal,
      maxBalance,
      minBalance,
      balanceRange,
      endingBalanceWithout,
      totalLoanPayments,
    }
  }, [startingCash, monthlyRevenue, growthRate, cogs, operatingExpenses, existingLoanPayments, includeNewLoan, newLoanPayment, showSeasonal, seasonalPcts])

  return (
    <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
      {/* Intro */}
      <div className="p-6 sm:p-8 lg:p-10 pb-0">
        <p className="text-gray-700 leading-relaxed mb-2">
          Project your business cash flow over the next 12 months. Enter your revenue, expenses, and loan payments to see if your cash position stays healthy, and test the impact of taking on new financing.
        </p>
        <p className="text-gray-500 text-sm mb-0">
          Results are projections based on your inputs. Actual cash flow depends on timing, collection speed, and unexpected costs.
        </p>
      </div>

      {/* Inputs */}
      <div className="p-6 sm:p-8 lg:p-10">
        <div className="space-y-6">
          {/* Starting Cash */}
          <CurrencyInput
            label="Starting Cash Balance"
            value={startingCash}
            onChange={setStartingCash}
            hint="Cash on hand today (bank accounts, liquid reserves)."
          />

          {/* Revenue */}
          <div className="border-t border-gray-100 pt-6">
            <h3 className="text-sm font-semibold text-gray-700 mb-4">Revenue</h3>
            <div className="grid sm:grid-cols-2 gap-4">
              <CurrencyInput
                label="Monthly Revenue"
                value={monthlyRevenue}
                onChange={setMonthlyRevenue}
                hint="Average monthly revenue (current run rate)."
              />
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Monthly Growth: <span className="text-quicklend-600 font-bold">{growthRate}%</span>
                </label>
                <input
                  type="range"
                  min={-5}
                  max={10}
                  step={0.5}
                  value={growthRate}
                  onChange={(e) => setGrowthRate(Number(e.target.value))}
                  className="w-full accent-quicklend-600"
                />
                <div className="flex justify-between text-xs text-gray-400 mt-1">
                  <span>-5%</span>
                  <span>0%</span>
                  <span>10%</span>
                </div>
                <p className="text-xs text-gray-400 mt-1">Expected month-over-month revenue change. Use 0% if unsure.</p>
              </div>
            </div>
          </div>

          {/* Expenses */}
          <div className="border-t border-gray-100 pt-6">
            <h3 className="text-sm font-semibold text-gray-700 mb-4">Monthly Expenses</h3>
            <div className="grid sm:grid-cols-2 gap-4">
              <CurrencyInput
                label="Cost of Goods Sold (COGS)"
                value={cogs}
                onChange={setCogs}
                hint="Direct costs: materials, labor, manufacturing."
              />
              <CurrencyInput
                label="Operating Expenses"
                value={operatingExpenses}
                onChange={setOperatingExpenses}
                hint="Rent, utilities, payroll, insurance, marketing, etc."
              />
            </div>
          </div>

          {/* Loan Payments */}
          <div className="border-t border-gray-100 pt-6">
            <h3 className="text-sm font-semibold text-gray-700 mb-4">Loan Payments</h3>
            <div className="grid sm:grid-cols-2 gap-4">
              <CurrencyInput
                label="Existing Monthly Loan Payments"
                value={existingLoanPayments}
                onChange={setExistingLoanPayments}
                hint="Total of all current loan/debt payments per month."
              />
              <div>
                <div className="flex items-center justify-between mb-1">
                  <label className="text-sm font-medium text-gray-700">New Proposed Loan</label>
                  <button
                    onClick={() => setIncludeNewLoan(!includeNewLoan)}
                    className={`relative inline-flex h-5 w-9 items-center rounded-full transition-colors ${
                      includeNewLoan ? 'bg-quicklend-600' : 'bg-gray-300'
                    }`}
                  >
                    <span
                      className={`inline-block h-3.5 w-3.5 transform rounded-full bg-white transition-transform ${
                        includeNewLoan ? 'translate-x-4.5' : 'translate-x-0.5'
                      }`}
                    />
                  </button>
                </div>
                {includeNewLoan && (
                  <div className="mt-2">
                    <div className="relative">
                      <span className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500">$</span>
                      <input
                        type="text"
                        inputMode="numeric"
                        value={formatInputDisplay(newLoanPayment)}
                        onChange={(e) => {
                          const num = parseCurrencyInput(e.target.value)
                          if (num >= 0 && num <= 1000000) setNewLoanPayment(num)
                        }}
                        className="w-full rounded-lg border border-gray-300 px-4 py-3 pl-8 text-gray-900 focus:border-quicklend-600 focus:ring-2 focus:ring-quicklend-600/20 focus:outline-none transition-colors"
                        placeholder="0"
                      />
                    </div>
                    <p className="text-xs text-gray-400 mt-1">Monthly payment on the loan you are considering.</p>
                  </div>
                )}
                {!includeNewLoan && (
                  <p className="text-xs text-gray-400 mt-2">Toggle on to see how a new loan payment would affect your cash flow.</p>
                )}
              </div>
            </div>
          </div>

          {/* Seasonal Adjustments */}
          <div className="border-t border-gray-100 pt-6">
            <div className="flex items-center justify-between mb-3">
              <h3 className="text-sm font-semibold text-gray-700">Seasonal Revenue Adjustments</h3>
              <button
                onClick={() => setShowSeasonal(!showSeasonal)}
                className={`relative inline-flex h-5 w-9 items-center rounded-full transition-colors ${
                  showSeasonal ? 'bg-quicklend-600' : 'bg-gray-300'
                }`}
              >
                <span
                  className={`inline-block h-3.5 w-3.5 transform rounded-full bg-white transition-transform ${
                    showSeasonal ? 'translate-x-4.5' : 'translate-x-0.5'
                  }`}
                />
              </button>
            </div>
            {showSeasonal ? (
              <div>
                <p className="text-xs text-gray-400 mb-3">Adjust each month as a percentage of your base revenue. 100% = normal, 80% = 20% slower, 120% = 20% busier.</p>
                <div className="grid grid-cols-4 sm:grid-cols-6 lg:grid-cols-12 gap-2">
                  {monthLabels.map((label, i) => (
                    <div key={i} className="text-center">
                      <p className="text-xs text-gray-500 mb-1">{label}</p>
                      <input
                        type="number"
                        min={0}
                        max={200}
                        value={seasonalPcts[i]}
                        onChange={(e) => updateSeasonal(i, Number(e.target.value))}
                        className={`w-full rounded border px-1 py-1.5 text-xs text-center focus:border-quicklend-600 focus:ring-1 focus:ring-quicklend-600/20 focus:outline-none ${
                          seasonalPcts[i] < 100 ? 'border-amber-300 bg-amber-50' : seasonalPcts[i] > 100 ? 'border-green-300 bg-green-50' : 'border-gray-300'
                        }`}
                      />
                      <p className="text-[10px] text-gray-400 mt-0.5">%</p>
                    </div>
                  ))}
                </div>
              </div>
            ) : (
              <p className="text-xs text-gray-400">Toggle on to adjust revenue by month for seasonal businesses.</p>
            )}
          </div>
        </div>
      </div>

      {/* Results */}
      {results && (
        <div className="border-t border-gray-100">
          {/* Alert if funding gap */}
          {results.fundingGap > 0 && (
            <div className="p-6 sm:p-8 lg:p-10 pb-0">
              <div className="bg-red-50 border border-red-200 rounded-xl p-4 flex items-start gap-3">
                <AlertTriangle className="h-5 w-5 text-red-500 shrink-0 mt-0.5" />
                <div>
                  <p className="text-sm font-bold text-red-700">Cash Shortfall Detected</p>
                  <p className="text-sm text-red-600">
                    Your cash balance drops below zero in month {results.lowestMonth} (lowest: {formatCurrency(results.lowestBalance)}).
                    You need at least {formatCurrency(results.fundingGap)} in additional funding or reserves to avoid running out of cash.
                  </p>
                </div>
              </div>
            </div>
          )}

          {/* Key Metrics */}
          <div className="p-6 sm:p-8 lg:p-10">
            <h3 className="text-sm font-semibold text-gray-700 mb-4">12-Month Forecast Summary</h3>
            <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
              <div className="bg-gray-50 border border-gray-200 rounded-xl p-4 text-center">
                <p className="text-xs font-semibold text-gray-500 uppercase tracking-wider mb-1">Ending Cash</p>
                <p className={`text-xl font-bold ${results.endingBalance >= 0 ? 'text-gray-900' : 'text-red-500'}`}>
                  {formatCurrency(results.endingBalance)}
                </p>
                <p className="text-xs text-gray-400 mt-1">after 12 months</p>
              </div>
              <div className="bg-gray-50 border border-gray-200 rounded-xl p-4 text-center">
                <p className="text-xs font-semibold text-gray-500 uppercase tracking-wider mb-1">Avg Monthly Cash Flow</p>
                <p className={`text-xl font-bold ${results.avgMonthlyCashFlow >= 0 ? 'text-green-600' : 'text-red-500'}`}>
                  {formatCurrency(results.avgMonthlyCashFlow)}
                </p>
                <p className="text-xs text-gray-400 mt-1">surplus per month</p>
              </div>
              <div className={`border rounded-xl p-4 text-center ${results.lowestBalance < 0 ? 'bg-red-50 border-red-200' : 'bg-gray-50 border-gray-200'}`}>
                <p className="text-xs font-semibold text-gray-500 uppercase tracking-wider mb-1">Lowest Balance</p>
                <p className={`text-xl font-bold ${results.lowestBalance >= 0 ? 'text-gray-900' : 'text-red-500'}`}>
                  {formatCurrency(results.lowestBalance)}
                </p>
                <p className="text-xs text-gray-400 mt-1">month {results.lowestMonth}</p>
              </div>
              <div className="bg-gray-50 border border-gray-200 rounded-xl p-4 text-center">
                <p className="text-xs font-semibold text-gray-500 uppercase tracking-wider mb-1">Net 12-Month Change</p>
                <p className={`text-xl font-bold ${results.totalNetCashFlow >= 0 ? 'text-green-600' : 'text-red-500'}`}>
                  {results.totalNetCashFlow >= 0 ? '+' : ''}{formatCurrency(results.totalNetCashFlow)}
                </p>
                <p className="text-xs text-gray-400 mt-1">from starting balance</p>
              </div>
            </div>

            {/* New loan impact callout */}
            {includeNewLoan && (
              <div className="mt-4 bg-quicklend-50 border border-quicklend-200 rounded-xl p-4 flex items-start gap-3">
                <Info className="h-5 w-5 text-quicklend-600 shrink-0 mt-0.5" />
                <div>
                  <p className="text-sm font-medium text-quicklend-900">New Loan Impact</p>
                  <p className="text-sm text-gray-600">
                    The {formatCurrency(newLoanPayment)}/mo new loan payment reduces your ending cash by {formatCurrency(newLoanPayment * 12)} over 12 months.
                    {results.endingBalanceWithout !== results.endingBalance && (
                      <> Without it, your ending balance would be {formatCurrency(results.endingBalanceWithout)}.</>
                    )}
                  </p>
                </div>
              </div>
            )}
          </div>

          {/* Cash Flow Chart */}
          <div className="px-6 sm:px-8 lg:px-10 pb-8">
            <h4 className="text-sm font-semibold text-gray-700 mb-3">Monthly Cash Flow</h4>
            <div className="space-y-1">
              {results.months.map((m) => {
                const barWidth = Math.abs(m.netCashFlow) / results.maxVal * 100
                const isPositive = m.netCashFlow >= 0
                return (
                  <div key={m.month} className="flex items-center gap-2">
                    <span className="text-xs text-gray-500 w-10 text-right shrink-0">{m.label}</span>
                    <div className="flex-1 flex items-center h-5">
                      <div className="relative w-full h-full">
                        <div className="absolute left-1/2 top-0 bottom-0 w-px bg-gray-300" />
                        {isPositive ? (
                          <div
                            className="absolute left-1/2 top-0.5 bottom-0.5 bg-green-500 rounded-r"
                            style={{ width: `${Math.min(barWidth / 2, 50)}%` }}
                          />
                        ) : (
                          <div
                            className="absolute top-0.5 bottom-0.5 bg-red-400 rounded-l"
                            style={{ width: `${Math.min(barWidth / 2, 50)}%`, right: '50%' }}
                          />
                        )}
                      </div>
                    </div>
                    <span className={`text-xs font-medium w-20 text-right shrink-0 ${isPositive ? 'text-green-600' : 'text-red-500'}`}>
                      {formatCurrency(m.netCashFlow)}
                    </span>
                  </div>
                )
              })}
            </div>
            <div className="flex items-center gap-4 mt-2 text-xs text-gray-500">
              <div className="flex items-center gap-1.5">
                <span className="w-3 h-3 rounded-sm bg-green-500" /> Surplus
              </div>
              <div className="flex items-center gap-1.5">
                <span className="w-3 h-3 rounded-sm bg-red-400" /> Deficit
              </div>
            </div>
          </div>

          {/* Running Balance Chart */}
          <div className="px-6 sm:px-8 lg:px-10 pb-8">
            <h4 className="text-sm font-semibold text-gray-700 mb-3">Running Cash Balance</h4>
            <div className="relative h-32 bg-gray-50 rounded-lg border border-gray-200 overflow-hidden">
              {/* Zero line if range crosses zero */}
              {results.minBalance < 0 && (
                <div
                  className="absolute left-0 right-0 border-t border-dashed border-red-300"
                  style={{ top: `${((results.maxBalance - 0) / results.balanceRange) * 100}%` }}
                >
                  <span className="absolute right-1 -top-3 text-[10px] text-red-400">$0</span>
                </div>
              )}
              {/* Balance points */}
              <div className="absolute inset-0 flex items-end">
                {results.months.map((m, i) => {
                  const heightPct = ((m.runningBalance - results.minBalance) / results.balanceRange) * 100
                  const isNeg = m.runningBalance < 0
                  return (
                    <div key={m.month} className="flex-1 flex flex-col items-center justify-end h-full px-0.5">
                      <div
                        className={`w-full rounded-t ${isNeg ? 'bg-red-400' : 'bg-quicklend-500'}`}
                        style={{ height: `${Math.max(heightPct, 2)}%` }}
                      />
                    </div>
                  )
                })}
              </div>
            </div>
            <div className="flex justify-between text-[10px] text-gray-400 mt-1 px-1">
              {monthLabels.map((l) => (
                <span key={l}>{l}</span>
              ))}
            </div>
            <div className="flex justify-between text-xs text-gray-500 mt-2">
              <span>Start: {formatCurrency(results.startingCash)}</span>
              <span>End: {formatCurrency(results.endingBalance)}</span>
            </div>
          </div>

          {/* Monthly Table */}
          <div className="px-6 sm:px-8 lg:px-10 pb-8">
            <details className="group" open>
              <summary className="cursor-pointer text-sm font-semibold text-gray-600 hover:text-gray-900 flex items-center gap-2">
                <ChevronRight className="h-4 w-4 group-open:rotate-90 transition-transform" />
                Monthly Breakdown
              </summary>
              <div className="mt-4 overflow-x-auto -mx-6 sm:mx-0">
                <table className="w-full text-sm min-w-[600px]">
                  <thead>
                    <tr className="border-b border-gray-200">
                      <th className="text-left px-3 py-2 text-gray-500 font-medium">Month</th>
                      <th className="text-right px-3 py-2 text-gray-500 font-medium">Revenue</th>
                      <th className="text-right px-3 py-2 text-gray-500 font-medium">Expenses</th>
                      <th className="text-right px-3 py-2 text-gray-500 font-medium">Loan Pmts</th>
                      <th className="text-right px-3 py-2 text-gray-500 font-medium">Net Flow</th>
                      <th className="text-right px-3 py-2 text-gray-500 font-medium">Balance</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr className="border-b border-gray-100 bg-gray-50">
                      <td className="px-3 py-2 text-gray-500 italic">Start</td>
                      <td className="px-3 py-2 text-right text-gray-400">-</td>
                      <td className="px-3 py-2 text-right text-gray-400">-</td>
                      <td className="px-3 py-2 text-right text-gray-400">-</td>
                      <td className="px-3 py-2 text-right text-gray-400">-</td>
                      <td className="px-3 py-2 text-right font-medium text-gray-900">{formatCurrency(startingCash)}</td>
                    </tr>
                    {results.months.map((m) => (
                      <tr key={m.month} className={`border-b border-gray-100 ${m.runningBalance < 0 ? 'bg-red-50' : ''}`}>
                        <td className="px-3 py-2 text-gray-700 font-medium">{m.label}</td>
                        <td className="px-3 py-2 text-right text-gray-900">{formatCurrency(m.revenue)}</td>
                        <td className="px-3 py-2 text-right text-gray-900">{formatCurrency(m.expenses)}</td>
                        <td className="px-3 py-2 text-right text-gray-900">{formatCurrency(m.loanPayments)}</td>
                        <td className={`px-3 py-2 text-right font-medium ${m.netCashFlow >= 0 ? 'text-green-600' : 'text-red-500'}`}>
                          {formatCurrency(m.netCashFlow)}
                        </td>
                        <td className={`px-3 py-2 text-right font-medium ${m.runningBalance >= 0 ? 'text-gray-900' : 'text-red-500'}`}>
                          {formatCurrency(m.runningBalance)}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                  <tfoot>
                    <tr className="bg-gray-50">
                      <td className="px-3 py-2 font-bold text-gray-900">Total</td>
                      <td className="px-3 py-2 text-right font-bold text-gray-900">{formatCurrency(results.totalRevenue)}</td>
                      <td className="px-3 py-2 text-right font-bold text-gray-900">{formatCurrency(results.totalExpenses)}</td>
                      <td className="px-3 py-2 text-right font-bold text-gray-900">{formatCurrency(results.totalLoanCost)}</td>
                      <td className={`px-3 py-2 text-right font-bold ${results.totalNetCashFlow >= 0 ? 'text-green-600' : 'text-red-500'}`}>
                        {formatCurrency(results.totalNetCashFlow)}
                      </td>
                      <td className="px-3 py-2 text-right font-bold text-gray-900">{formatCurrency(results.endingBalance)}</td>
                    </tr>
                  </tfoot>
                </table>
              </div>
            </details>
          </div>

          {/* CTA */}
          <div className="px-6 sm:px-8 lg:px-10 pb-8">
            <div className="bg-quicklend-50 rounded-xl p-6 text-center">
              <p className="text-gray-700 mb-1 font-medium">
                {results.fundingGap > 0
                  ? `Your forecast shows a ${formatCurrency(results.fundingGap)} funding gap. A line of credit can bridge seasonal shortfalls.`
                  : results.avgMonthlyCashFlow > 0
                    ? 'Your cash flow looks healthy. You may have room for growth financing.'
                    : 'Your cash flow is tight. Talk to a specialist about options that work within your budget.'}
              </p>
              <p className="text-gray-500 text-sm mb-4">
                No impact to your credit score.
              </p>
              <div className="flex flex-col sm:flex-row gap-3 justify-center">
                <Link
                  href={`/get-started?source=cash-flow-forecast&loan_type=${results.fundingGap > 0 ? 'lines-of-credit' : 'term-loans'}&amount=${results.fundingGap > 0 ? results.fundingGap : ''}`}
                  className="inline-flex items-center justify-center bg-quicklend-600 text-white font-semibold px-8 py-3 rounded-lg hover:bg-quicklend-700 transition-colors"
                >
                  See Your Options <ArrowRight className="ml-2 h-4 w-4" />
                </Link>
                <Link
                  href="/tools/dscr-calculator"
                  className="inline-flex items-center justify-center border border-quicklend-300 text-quicklend-700 font-semibold px-6 py-3 rounded-lg hover:bg-quicklend-50 transition-colors text-sm"
                >
                  Check Your DSCR
                </Link>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
