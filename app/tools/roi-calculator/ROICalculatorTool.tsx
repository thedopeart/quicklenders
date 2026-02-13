'use client'

import { useState, useMemo } from 'react'
import Link from 'next/link'
import {
  ArrowRight,
  TrendingUp,
  TrendingDown,
  Clock,
  DollarSign,
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

// ────────────────────────────────────────────────────────────────────
// Verdict Logic
// ────────────────────────────────────────────────────────────────────

type Verdict = 'strong' | 'solid' | 'marginal' | 'negative'

function getVerdict(roi: number): { verdict: Verdict; label: string; color: string; bgColor: string; borderColor: string } {
  if (roi >= 25) return { verdict: 'strong', label: 'Strong Investment', color: 'text-green-700', bgColor: 'bg-green-50', borderColor: 'border-green-200' }
  if (roi >= 10) return { verdict: 'solid', label: 'Solid Returns', color: 'text-blue-700', bgColor: 'bg-blue-50', borderColor: 'border-blue-200' }
  if (roi >= 0) return { verdict: 'marginal', label: 'Marginal Returns', color: 'text-amber-700', bgColor: 'bg-amber-50', borderColor: 'border-amber-200' }
  return { verdict: 'negative', label: 'Consider Alternatives', color: 'text-red-700', bgColor: 'bg-red-50', borderColor: 'border-red-200' }
}

// ────────────────────────────────────────────────────────────────────
// Constants
// ────────────────────────────────────────────────────────────────────

const amountPresets = [50000, 100000, 200000, 500000, 1000000]
const termOptions = [
  { value: 12, label: '1 year' },
  { value: 24, label: '2 years' },
  { value: 36, label: '3 years' },
  { value: 48, label: '4 years' },
  { value: 60, label: '5 years' },
  { value: 84, label: '7 years' },
  { value: 120, label: '10 years' },
]
const rampUpOptions = [
  { value: 0, label: 'None (immediate)' },
  { value: 1, label: '1 month' },
  { value: 2, label: '2 months' },
  { value: 3, label: '3 months' },
  { value: 6, label: '6 months' },
  { value: 9, label: '9 months' },
  { value: 12, label: '12 months' },
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
// Cumulative Profit Chart (pure CSS)
// ────────────────────────────────────────────────────────────────────

function CumulativeChart({
  data,
}: {
  data: { month: number; cumulativeCost: number; cumulativeReturn: number; netProfit: number }[]
}) {
  if (data.length === 0) return null

  const maxVal = Math.max(
    ...data.map((d) => Math.max(d.cumulativeCost, d.cumulativeReturn))
  )
  const minNet = Math.min(...data.map((d) => d.netProfit))
  const maxNet = Math.max(...data.map((d) => d.netProfit))
  const absMax = Math.max(Math.abs(minNet), Math.abs(maxNet), 1)

  // Sample data points for display (max ~12 points)
  const step = Math.max(1, Math.floor(data.length / 12))
  const sampled = data.filter((_, i) => i % step === 0 || i === data.length - 1)

  // Find crossover month
  const crossoverIdx = data.findIndex((d) => d.netProfit >= 0)
  const crossoverMonth = crossoverIdx >= 0 ? data[crossoverIdx].month : null

  return (
    <div>
      <h4 className="text-sm font-semibold text-gray-700 mb-3">Cumulative Profit Over Time</h4>

      {/* Net profit bar chart */}
      <div className="space-y-1">
        {sampled.map((d) => {
          const barWidth = Math.abs(d.netProfit) / absMax * 100
          const isPositive = d.netProfit >= 0
          return (
            <div key={d.month} className="flex items-center gap-2">
              <span className="text-xs text-gray-500 w-10 text-right shrink-0">Mo {d.month}</span>
              <div className="flex-1 flex items-center h-5">
                {/* Center line */}
                <div className="relative w-full h-full">
                  <div className="absolute left-1/2 top-0 bottom-0 w-px bg-gray-300" />
                  {isPositive ? (
                    <div
                      className="absolute left-1/2 top-0.5 bottom-0.5 bg-green-500 rounded-r"
                      style={{ width: `${barWidth / 2}%` }}
                    />
                  ) : (
                    <div
                      className="absolute top-0.5 bottom-0.5 bg-red-400 rounded-l"
                      style={{ width: `${barWidth / 2}%`, right: '50%' }}
                    />
                  )}
                </div>
              </div>
              <span className={`text-xs font-medium w-20 text-right shrink-0 ${isPositive ? 'text-green-600' : 'text-red-500'}`}>
                {formatCurrency(d.netProfit)}
              </span>
            </div>
          )
        })}
      </div>

      {/* Legend */}
      <div className="flex items-center gap-4 mt-3 text-xs text-gray-500">
        <div className="flex items-center gap-1.5">
          <span className="w-3 h-3 rounded-sm bg-green-500" /> Profit
        </div>
        <div className="flex items-center gap-1.5">
          <span className="w-3 h-3 rounded-sm bg-red-400" /> Loss
        </div>
        {crossoverMonth && (
          <div className="flex items-center gap-1.5">
            <span className="w-3 h-3 rounded-full border-2 border-quicklend-600" /> Break-even at month {crossoverMonth}
          </div>
        )}
      </div>
    </div>
  )
}

// ────────────────────────────────────────────────────────────────────
// Main Component
// ────────────────────────────────────────────────────────────────────

export default function ROICalculatorTool() {
  const [loanAmount, setLoanAmount] = useState(200000)
  const [rate, setRate] = useState(10)
  const [termMonths, setTermMonths] = useState(36)
  const [monthlyRevenueIncrease, setMonthlyRevenueIncrease] = useState(10000)
  const [monthlyCostSavings, setMonthlyCostSavings] = useState(2000)
  const [rampUpMonths, setRampUpMonths] = useState(3)

  // ── Calculations ──────────────────────────────────────────────────

  const results = useMemo(() => {
    if (loanAmount <= 0 || termMonths <= 0) return null
    const totalMonthlyReturn = monthlyRevenueIncrease + monthlyCostSavings
    if (totalMonthlyReturn <= 0) return null

    const monthlyPayment = calcMonthlyPayment(loanAmount, rate, termMonths)
    const totalLoanCost = monthlyPayment * termMonths
    const totalInterest = totalLoanCost - loanAmount

    // Productive months (after ramp-up)
    const productiveMonths = Math.max(0, termMonths - rampUpMonths)
    const totalReturn = totalMonthlyReturn * productiveMonths
    const netProfit = totalReturn - totalLoanCost
    const roi = (netProfit / loanAmount) * 100

    // Payback period: months until cumulative return >= cumulative cost
    let paybackMonth: number | null = null
    let cumulativeCost = 0
    let cumulativeReturn = 0

    const chartData: { month: number; cumulativeCost: number; cumulativeReturn: number; netProfit: number }[] = []

    for (let m = 1; m <= termMonths; m++) {
      cumulativeCost += monthlyPayment
      if (m > rampUpMonths) {
        cumulativeReturn += totalMonthlyReturn
      }
      const net = cumulativeReturn - cumulativeCost
      chartData.push({
        month: m,
        cumulativeCost,
        cumulativeReturn,
        netProfit: net,
      })
      if (paybackMonth === null && cumulativeReturn >= cumulativeCost) {
        paybackMonth = m
      }
    }

    // Monthly cash flow impact
    const monthlyCashFlow = totalMonthlyReturn - monthlyPayment
    // Cash flow during ramp-up (no returns yet)
    const rampUpCashFlow = -monthlyPayment

    const verdict = getVerdict(roi)

    return {
      monthlyPayment,
      totalLoanCost,
      totalInterest,
      totalReturn,
      netProfit,
      roi,
      paybackMonth,
      monthlyCashFlow,
      rampUpCashFlow,
      productiveMonths,
      totalMonthlyReturn,
      chartData,
      verdict,
    }
  }, [loanAmount, rate, termMonths, monthlyRevenueIncrease, monthlyCostSavings, rampUpMonths])

  return (
    <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
      {/* Intro */}
      <div className="p-6 sm:p-8 lg:p-10 pb-0">
        <p className="text-gray-700 leading-relaxed mb-2">
          Find out if a business loan will pay for itself. Enter the loan details and expected returns to see your ROI, payback period, and monthly cash flow impact.
        </p>
        <p className="text-gray-500 text-sm mb-0">
          Results are estimates based on your inputs. Actual returns depend on execution, market conditions, and timing.
        </p>
      </div>

      {/* Inputs */}
      <div className="p-6 sm:p-8 lg:p-10">
        <div className="space-y-6">
          {/* Loan Amount */}
          <div>
            <CurrencyInput
              label="Loan Amount (Investment)"
              value={loanAmount}
              onChange={setLoanAmount}
              hint="The total amount you plan to borrow for this investment."
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

          {/* Rate & Term */}
          <div className="grid md:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Interest Rate: <span className="text-quicklend-600 font-bold">{rate}%</span>
              </label>
              <input
                type="range"
                min={3}
                max={30}
                step={0.5}
                value={rate}
                onChange={(e) => setRate(Number(e.target.value))}
                className="w-full accent-quicklend-600"
              />
              <div className="flex justify-between text-xs text-gray-400 mt-1">
                <span>3%</span>
                <span>30%</span>
              </div>
            </div>
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
          </div>

          {/* Revenue & Savings */}
          <div className="border-t border-gray-100 pt-6">
            <h3 className="text-sm font-semibold text-gray-700 mb-1">Expected Returns from This Investment</h3>
            <p className="text-xs text-gray-400 mb-4">How much additional revenue or savings do you expect each month once the investment is fully productive?</p>
            <div className="grid md:grid-cols-2 gap-6">
              <CurrencyInput
                label="Monthly Revenue Increase"
                value={monthlyRevenueIncrease}
                onChange={setMonthlyRevenueIncrease}
                max={5000000}
                hint="New sales or revenue this investment will generate per month."
              />
              <CurrencyInput
                label="Monthly Cost Savings"
                value={monthlyCostSavings}
                onChange={setMonthlyCostSavings}
                max={1000000}
                hint="Operational savings per month (efficiency, reduced labor, etc.)."
              />
            </div>
          </div>

          {/* Ramp-Up */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Ramp-Up Period</label>
            <select
              value={rampUpMonths}
              onChange={(e) => setRampUpMonths(Number(e.target.value))}
              className="w-full rounded-lg border border-gray-300 px-4 py-3 text-gray-900 focus:border-quicklend-600 focus:ring-2 focus:ring-quicklend-600/20 focus:outline-none transition-colors"
            >
              {rampUpOptions.map((opt) => (
                <option key={opt.value} value={opt.value}>{opt.label}</option>
              ))}
            </select>
            <p className="flex items-start gap-1.5 mt-2 text-xs text-gray-400">
              <Info className="h-3.5 w-3.5 mt-0.5 flex-shrink-0" />
              Months before the investment starts generating its full expected returns. Loan payments continue during ramp-up.
            </p>
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
                {results.roi >= 0 ? (
                  <TrendingUp className={`h-8 w-8 ${results.verdict.color}`} />
                ) : (
                  <TrendingDown className={`h-8 w-8 ${results.verdict.color}`} />
                )}
                <div>
                  <p className={`text-lg font-bold ${results.verdict.color}`}>{results.verdict.label}</p>
                  <p className="text-sm text-gray-600">
                    {results.verdict.verdict === 'strong' && 'This investment is projected to significantly outperform the cost of borrowing.'}
                    {results.verdict.verdict === 'solid' && 'The expected returns comfortably exceed the cost of borrowing.'}
                    {results.verdict.verdict === 'marginal' && 'Returns barely cover the cost of borrowing. Consider if the risk is worth it.'}
                    {results.verdict.verdict === 'negative' && 'The investment is projected to cost more than it returns. Reassess the assumptions or timeline.'}
                  </p>
                </div>
              </div>
              <div className="sm:ml-auto text-center sm:text-right shrink-0">
                <p className={`text-3xl font-bold ${results.verdict.color}`}>{results.roi.toFixed(1)}%</p>
                <p className="text-xs text-gray-500">Return on Investment</p>
              </div>
            </div>
          </div>

          {/* Key Metrics */}
          <div className="p-6 sm:p-8 lg:p-10">
            <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
              <div className="bg-gray-50 border border-gray-200 rounded-xl p-4 text-center">
                <DollarSign className="h-5 w-5 text-gray-400 mx-auto mb-1" />
                <p className="text-xs font-semibold text-gray-500 uppercase tracking-wider mb-1">Net Profit</p>
                <p className={`text-xl font-bold ${results.netProfit >= 0 ? 'text-green-600' : 'text-red-500'}`}>
                  {formatCurrency(results.netProfit)}
                </p>
                <p className="text-xs text-gray-400 mt-1">over {termMonths / 12} {termMonths === 12 ? 'year' : 'years'}</p>
              </div>
              <div className="bg-gray-50 border border-gray-200 rounded-xl p-4 text-center">
                <Clock className="h-5 w-5 text-gray-400 mx-auto mb-1" />
                <p className="text-xs font-semibold text-gray-500 uppercase tracking-wider mb-1">Payback Period</p>
                <p className="text-xl font-bold text-gray-900">
                  {results.paybackMonth ? `${results.paybackMonth} months` : 'N/A'}
                </p>
                <p className="text-xs text-gray-400 mt-1">
                  {results.paybackMonth
                    ? results.paybackMonth <= termMonths
                      ? `${termMonths - results.paybackMonth} months of profit after`
                      : 'Beyond loan term'
                    : 'Does not pay back within term'}
                </p>
              </div>
              <div className="bg-gray-50 border border-gray-200 rounded-xl p-4 text-center">
                <TrendingUp className="h-5 w-5 text-gray-400 mx-auto mb-1" />
                <p className="text-xs font-semibold text-gray-500 uppercase tracking-wider mb-1">Monthly Cash Flow</p>
                <p className={`text-xl font-bold ${results.monthlyCashFlow >= 0 ? 'text-green-600' : 'text-red-500'}`}>
                  {formatCurrency(results.monthlyCashFlow)}
                </p>
                <p className="text-xs text-gray-400 mt-1">after ramp-up period</p>
              </div>
              <div className="bg-gray-50 border border-gray-200 rounded-xl p-4 text-center">
                <DollarSign className="h-5 w-5 text-gray-400 mx-auto mb-1" />
                <p className="text-xs font-semibold text-gray-500 uppercase tracking-wider mb-1">Total Loan Cost</p>
                <p className="text-xl font-bold text-gray-900">{formatCurrency(results.totalLoanCost)}</p>
                <p className="text-xs text-gray-400 mt-1">{formatCurrency(results.totalInterest)} in interest</p>
              </div>
            </div>
          </div>

          {/* Cost vs Return Summary */}
          <div className="px-6 sm:px-8 lg:px-10 pb-8">
            <div className="bg-quicklend-900 rounded-xl p-5">
              <div className="grid sm:grid-cols-3 gap-4 text-center">
                <div>
                  <p className="text-quicklend-200 text-sm">Total Loan Cost</p>
                  <p className="text-xl font-bold text-white">{formatCurrency(results.totalLoanCost)}</p>
                  <p className="text-quicklend-300 text-xs">{formatCurrency(results.monthlyPayment)}/mo x {termMonths} months</p>
                </div>
                <div className="flex items-center justify-center">
                  <span className="text-quicklend-400 text-lg font-bold">vs</span>
                </div>
                <div>
                  <p className="text-quicklend-200 text-sm">Total Expected Return</p>
                  <p className="text-xl font-bold text-amber-400">{formatCurrency(results.totalReturn)}</p>
                  <p className="text-quicklend-300 text-xs">{formatCurrency(results.totalMonthlyReturn)}/mo x {results.productiveMonths} months</p>
                </div>
              </div>
              {rampUpMonths > 0 && (
                <p className="text-xs text-quicklend-400 text-center mt-3">
                  During the {rampUpMonths}-month ramp-up, your monthly cash flow impact is {formatCurrency(results.rampUpCashFlow)}/mo (loan payment with no returns yet).
                </p>
              )}
            </div>
          </div>

          {/* Cumulative Profit Chart */}
          <div className="px-6 sm:px-8 lg:px-10 pb-8">
            <CumulativeChart data={results.chartData} />
          </div>

          {/* Monthly Breakdown Table */}
          <div className="px-6 sm:px-8 lg:px-10 pb-8">
            <details className="group">
              <summary className="cursor-pointer text-sm font-semibold text-gray-600 hover:text-gray-900 flex items-center gap-2">
                <span className="group-open:rotate-90 transition-transform">▶</span>
                Monthly Breakdown
              </summary>
              <div className="mt-4 overflow-x-auto -mx-6 sm:mx-0">
                <table className="w-full text-sm min-w-[500px]">
                  <thead>
                    <tr className="border-b border-gray-200">
                      <th className="text-left px-4 py-2 text-gray-500 font-medium">Month</th>
                      <th className="text-right px-4 py-2 text-gray-500 font-medium">Payment</th>
                      <th className="text-right px-4 py-2 text-gray-500 font-medium">Return</th>
                      <th className="text-right px-4 py-2 text-gray-500 font-medium">Net Cash Flow</th>
                      <th className="text-right px-4 py-2 text-gray-500 font-medium">Cumulative Net</th>
                    </tr>
                  </thead>
                  <tbody>
                    {results.chartData
                      .filter((_, i) => {
                        // Show first 6 months, then every 6th month, plus the last
                        if (i < 6) return true
                        if ((i + 1) % 6 === 0) return true
                        if (i === results.chartData.length - 1) return true
                        return false
                      })
                      .map((d) => {
                        const monthReturn = d.month > rampUpMonths ? results.totalMonthlyReturn : 0
                        const netCashFlow = monthReturn - results.monthlyPayment
                        return (
                          <tr key={d.month} className="border-b border-gray-100">
                            <td className="px-4 py-2.5 text-gray-700 font-medium">{d.month}</td>
                            <td className="px-4 py-2.5 text-right text-gray-900">{formatCurrency(results.monthlyPayment)}</td>
                            <td className="px-4 py-2.5 text-right text-gray-900">
                              {d.month <= rampUpMonths ? (
                                <span className="text-gray-400 text-xs">Ramp-up</span>
                              ) : (
                                formatCurrency(results.totalMonthlyReturn)
                              )}
                            </td>
                            <td className={`px-4 py-2.5 text-right font-medium ${netCashFlow >= 0 ? 'text-green-600' : 'text-red-500'}`}>
                              {formatCurrency(netCashFlow)}
                            </td>
                            <td className={`px-4 py-2.5 text-right font-medium ${d.netProfit >= 0 ? 'text-green-600' : 'text-red-500'}`}>
                              {formatCurrency(d.netProfit)}
                            </td>
                          </tr>
                        )
                      })}
                  </tbody>
                </table>
              </div>
            </details>
          </div>

          {/* CTA */}
          <div className="px-6 sm:px-8 lg:px-10 pb-8">
            <div className="bg-quicklend-50 rounded-xl p-6 text-center">
              <p className="text-gray-700 mb-1 font-medium">
                {results.verdict.verdict === 'strong' && `This investment could generate ${formatCurrency(results.netProfit)} in net profit.`}
                {results.verdict.verdict === 'solid' && `A ${results.roi.toFixed(0)}% return means this investment pays for itself and more.`}
                {results.verdict.verdict === 'marginal' && 'The returns are close to the cost of borrowing. Explore lower-rate options to improve the ROI.'}
                {results.verdict.verdict === 'negative' && 'At current assumptions, this investment would not cover borrowing costs. Consider adjusting the timeline or investment amount.'}
              </p>
              <p className="text-gray-500 text-sm mb-4">
                {results.verdict.verdict === 'negative'
                  ? 'A funding specialist can help you find the right structure. No impact to your credit score.'
                  : 'Get matched with the right loan for your investment. No impact to your credit score.'}
              </p>
              <div className="flex flex-col sm:flex-row gap-3 justify-center">
                <Link
                  href={`/get-started?source=roi-calculator&loan_type=term-loans&amount=${loanAmount}`}
                  className="inline-flex items-center justify-center bg-quicklend-600 text-white font-semibold px-8 py-3 rounded-lg hover:bg-quicklend-700 transition-colors"
                >
                  See Your Options <ArrowRight className="ml-2 h-4 w-4" />
                </Link>
                <Link
                  href="/tools/loan-payment-calculator"
                  className="inline-flex items-center justify-center border border-quicklend-300 text-quicklend-700 font-semibold px-6 py-3 rounded-lg hover:bg-quicklend-50 transition-colors text-sm"
                >
                  See Exact Payments
                </Link>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
