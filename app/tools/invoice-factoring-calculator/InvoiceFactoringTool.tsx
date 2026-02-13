'use client'

import { useState, useMemo } from 'react'
import Link from 'next/link'
import {
  ChevronRight,
  ArrowRight,
  ArrowDown,
  Info,
  CheckCircle,
  AlertTriangle,
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
// Main Component
// ────────────────────────────────────────────────────────────────────

const invoicePresets = [25000, 50000, 100000, 250000]

const daysOptions = [
  { value: 15, label: 'Net 15' },
  { value: 30, label: 'Net 30' },
  { value: 45, label: 'Net 45' },
  { value: 60, label: 'Net 60' },
  { value: 90, label: 'Net 90' },
  { value: 120, label: 'Net 120' },
]

export default function InvoiceFactoringTool() {
  const [invoiceAmount, setInvoiceAmount] = useState(50000)
  const [advanceRate, setAdvanceRate] = useState(85)
  const [feeRate, setFeeRate] = useState(3)
  const [daysToPayment, setDaysToPayment] = useState(30)
  const [showAdditionalFees, setShowAdditionalFees] = useState(false)
  const [additionalFees, setAdditionalFees] = useState(0)
  const [invoicesPerMonth, setInvoicesPerMonth] = useState(5)

  const results = useMemo(() => {
    if (invoiceAmount <= 0 || advanceRate <= 0 || feeRate <= 0 || daysToPayment <= 0) return null

    // Single invoice calculations
    const advanceAmount = invoiceAmount * (advanceRate / 100)
    const reserve = invoiceAmount - advanceAmount
    const factoringFee = invoiceAmount * (feeRate / 100) * (daysToPayment / 30)
    const totalCost = factoringFee + additionalFees
    const reserveRelease = Math.max(0, reserve - totalCost)
    const totalReceived = advanceAmount + reserveRelease
    const costPer1000 = invoiceAmount > 0 ? (totalCost / invoiceAmount) * 1000 : 0

    // Effective APR
    const effectiveApr = advanceAmount > 0
      ? (totalCost / advanceAmount) * (365 / daysToPayment) * 100
      : 0

    // Monthly volume projection
    const monthlyVolume = invoiceAmount * invoicesPerMonth
    const monthlyCost = totalCost * invoicesPerMonth
    const annualCost = monthlyCost * 12
    const monthlyAdvance = advanceAmount * invoicesPerMonth

    // APR tier for CTA messaging
    let aprTier: 'low' | 'moderate' | 'high'
    if (effectiveApr < 20) {
      aprTier = 'low'
    } else if (effectiveApr <= 40) {
      aprTier = 'moderate'
    } else {
      aprTier = 'high'
    }

    // LOC comparison: what would a LOC cost for the same advance, same duration?
    const locRate = 12 // assume 12% APR for a business LOC
    const locInterest = advanceAmount * (locRate / 100) * (daysToPayment / 365)

    return {
      advanceAmount,
      reserve,
      factoringFee,
      totalCost,
      reserveRelease,
      totalReceived,
      costPer1000,
      effectiveApr,
      monthlyVolume,
      monthlyCost,
      annualCost,
      monthlyAdvance,
      aprTier,
      locInterest,
    }
  }, [invoiceAmount, advanceRate, feeRate, daysToPayment, additionalFees, invoicesPerMonth])

  return (
    <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
      {/* Intro */}
      <div className="p-6 sm:p-8 lg:p-10 pb-0">
        <p className="text-gray-700 leading-relaxed mb-2">
          See how much cash you will receive from factoring your invoices and what it will cost. Enter your invoice details below for an instant breakdown.
        </p>
        <p className="text-gray-500 text-sm mb-0">
          All results update in real time. Factoring fees are calculated per 30-day period.
        </p>
      </div>

      {/* Inputs */}
      <div className="p-6 sm:p-8 lg:p-10">
        <div className="space-y-6">
          {/* Invoice Amount */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Total Invoice Amount</label>
            <div className="relative">
              <span className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500">$</span>
              <input
                type="text"
                inputMode="numeric"
                value={formatInputDisplay(invoiceAmount)}
                onChange={(e) => {
                  const num = parseCurrencyInput(e.target.value)
                  if (num >= 0 && num <= 10000000) setInvoiceAmount(num)
                }}
                className="w-full rounded-lg border border-gray-300 px-4 py-3 pl-8 text-gray-900 focus:border-quicklend-600 focus:ring-2 focus:ring-quicklend-600/20 focus:outline-none transition-colors"
                placeholder="0"
              />
            </div>
            <div className="flex flex-wrap gap-2 mt-3">
              {invoicePresets.map((preset) => (
                <button
                  key={preset}
                  onClick={() => setInvoiceAmount(preset)}
                  className={`px-3 py-1.5 rounded-full text-xs font-medium border transition-colors ${
                    invoiceAmount === preset
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
              Total value of invoices you want to factor. Can be one invoice or multiple.
            </p>
          </div>

          {/* Advance Rate & Factoring Fee */}
          <div className="grid md:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Advance Rate: <span className="text-quicklend-600 font-bold">{advanceRate}%</span>
              </label>
              <input
                type="range"
                min={70}
                max={95}
                step={1}
                value={advanceRate}
                onChange={(e) => setAdvanceRate(Number(e.target.value))}
                className="w-full accent-quicklend-600"
              />
              <div className="flex justify-between text-xs text-gray-400 mt-1">
                <span>70%</span>
                <span>95%</span>
              </div>
              <p className="text-xs text-gray-400 mt-2">
                Percentage you receive upfront. Most factors advance 80% to 90%.
              </p>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Factoring Fee: <span className="text-quicklend-600 font-bold">{feeRate}%</span>
                <span className="text-gray-400 font-normal"> per 30 days</span>
              </label>
              <input
                type="range"
                min={0.5}
                max={5}
                step={0.25}
                value={feeRate}
                onChange={(e) => setFeeRate(Number(e.target.value))}
                className="w-full accent-quicklend-600"
              />
              <div className="flex justify-between text-xs text-gray-400 mt-1">
                <span>0.5%</span>
                <span>5%</span>
              </div>
              <p className="text-xs text-gray-400 mt-2">
                Typical range: 1% to 5% of invoice value. Lower for high volume.
              </p>
            </div>
          </div>

          {/* Days to Payment & Invoices per Month */}
          <div className="grid md:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Average Days to Payment</label>
              <select
                value={daysToPayment}
                onChange={(e) => setDaysToPayment(Number(e.target.value))}
                className="w-full rounded-lg border border-gray-300 px-4 py-3 text-gray-900 focus:border-quicklend-600 focus:ring-2 focus:ring-quicklend-600/20 focus:outline-none transition-colors"
              >
                {daysOptions.map((opt) => (
                  <option key={opt.value} value={opt.value}>{opt.label} ({opt.value} days)</option>
                ))}
              </select>
              <p className="text-xs text-gray-400 mt-2">
                How long your customers typically take to pay their invoices.
              </p>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Invoices Factored per Month</label>
              <input
                type="number"
                min={1}
                max={100}
                value={invoicesPerMonth}
                onChange={(e) => {
                  const num = Math.max(1, Math.min(100, Number(e.target.value) || 1))
                  setInvoicesPerMonth(num)
                }}
                className="w-full rounded-lg border border-gray-300 px-4 py-3 text-gray-900 focus:border-quicklend-600 focus:ring-2 focus:ring-quicklend-600/20 focus:outline-none transition-colors"
              />
              <p className="text-xs text-gray-400 mt-2">
                Used to project your monthly and annual factoring costs.
              </p>
            </div>
          </div>

          {/* Additional Fees Toggle */}
          <div>
            <button
              onClick={() => setShowAdditionalFees(!showAdditionalFees)}
              className="inline-flex items-center text-sm text-quicklend-600 font-medium hover:text-quicklend-700 transition-colors"
            >
              <ChevronRight className={`h-4 w-4 mr-1 transition-transform ${showAdditionalFees ? 'rotate-90' : ''}`} />
              {showAdditionalFees ? 'Hide' : 'Add'} additional fees (ACH, processing, minimums)
            </button>
            {showAdditionalFees && (
              <div className="mt-4">
                <label className="block text-sm font-medium text-gray-700 mb-2">Additional Fees per Invoice</label>
                <div className="relative">
                  <span className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500">$</span>
                  <input
                    type="text"
                    inputMode="numeric"
                    value={formatInputDisplay(additionalFees)}
                    onChange={(e) => {
                      const num = parseCurrencyInput(e.target.value)
                      if (num >= 0 && num <= 10000) setAdditionalFees(num)
                    }}
                    className="w-full rounded-lg border border-gray-300 px-4 py-3 pl-8 text-gray-900 focus:border-quicklend-600 focus:ring-2 focus:ring-quicklend-600/20 focus:outline-none transition-colors"
                    placeholder="0"
                  />
                </div>
                <p className="flex items-start gap-1.5 mt-2 text-xs text-gray-400">
                  <Info className="h-3.5 w-3.5 mt-0.5 flex-shrink-0" />
                  ACH/wire fees, invoice processing fees, or monthly minimums. Enter per-invoice amount.
                </p>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Results */}
      {results && (
        <div className="border-t border-gray-100">
          {/* Funding Timeline */}
          <div className="p-6 sm:p-8 lg:p-10">
            <h3 className="text-sm font-semibold text-gray-700 mb-6">Your Factoring Breakdown</h3>
            <div className="grid sm:grid-cols-2 gap-4">
              {/* Day 1 */}
              <div className="bg-quicklend-50 border border-quicklend-200 rounded-xl p-6">
                <p className="text-xs font-semibold text-quicklend-600 uppercase tracking-wider mb-1">Day 1: You Receive</p>
                <p className="text-3xl font-bold text-quicklend-900">{formatCurrency(results.advanceAmount)}</p>
                <p className="text-sm text-gray-600 mt-1">{advanceRate}% advance on {formatCurrency(invoiceAmount)}</p>
              </div>
              {/* When Customer Pays */}
              <div className="bg-gray-50 border border-gray-200 rounded-xl p-6">
                <p className="text-xs font-semibold text-gray-500 uppercase tracking-wider mb-1">When Customer Pays (~{daysToPayment} days)</p>
                <p className="text-3xl font-bold text-quicklend-900">{formatCurrency(results.reserveRelease)}</p>
                <p className="text-sm text-gray-600 mt-1">
                  {formatCurrency(results.reserve)} reserve minus {formatCurrency(results.totalCost)} fees
                </p>
              </div>
            </div>

            {/* Summary Bar */}
            <div className="mt-4 bg-quicklend-900 rounded-xl p-5 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
              <div>
                <p className="text-quicklend-200 text-sm">Total You Receive</p>
                <p className="text-2xl font-bold text-white">{formatCurrency(results.totalReceived)}</p>
              </div>
              <div className="h-px sm:h-10 sm:w-px bg-quicklend-700" />
              <div>
                <p className="text-quicklend-200 text-sm">Total Cost</p>
                <p className="text-2xl font-bold text-white">{formatCurrency(results.totalCost)}</p>
              </div>
              <div className="h-px sm:h-10 sm:w-px bg-quicklend-700" />
              <div>
                <p className="text-quicklend-200 text-sm">Effective APR</p>
                <p className="text-2xl font-bold text-white">{results.effectiveApr.toFixed(1)}%</p>
              </div>
            </div>
          </div>

          {/* Cost Breakdown */}
          <div className="px-6 sm:px-8 lg:px-10 pb-8">
            <details className="group" open>
              <summary className="cursor-pointer text-sm font-semibold text-gray-600 hover:text-gray-900 flex items-center gap-2">
                <ChevronRight className="h-4 w-4 group-open:rotate-90 transition-transform" />
                Cost Breakdown
              </summary>
              <div className="mt-4 bg-gray-50 rounded-xl overflow-hidden">
                <table className="w-full text-sm">
                  <tbody>
                    <tr className="border-b border-gray-100">
                      <td className="px-4 py-3 text-gray-700">Invoice Amount</td>
                      <td className="px-4 py-3 text-right font-medium text-gray-900">{formatCurrency(invoiceAmount)}</td>
                    </tr>
                    <tr className="border-b border-gray-100">
                      <td className="px-4 py-3 text-gray-700">Factoring Fee ({feeRate}% x {(daysToPayment / 30).toFixed(1)} periods)</td>
                      <td className="px-4 py-3 text-right font-medium text-gray-900">{formatCurrency(results.factoringFee)}</td>
                    </tr>
                    {additionalFees > 0 && (
                      <tr className="border-b border-gray-100">
                        <td className="px-4 py-3 text-gray-700">Additional Fees</td>
                        <td className="px-4 py-3 text-right font-medium text-gray-900">{formatCurrency(additionalFees)}</td>
                      </tr>
                    )}
                    <tr className="border-b border-gray-100">
                      <td className="px-4 py-3 text-gray-700 font-semibold">Total Cost</td>
                      <td className="px-4 py-3 text-right font-bold text-quicklend-900">{formatCurrency(results.totalCost)}</td>
                    </tr>
                    <tr className="border-b border-gray-100">
                      <td className="px-4 py-3 text-gray-700">Cost per $1,000 Factored</td>
                      <td className="px-4 py-3 text-right font-medium text-gray-900">${results.costPer1000.toFixed(2)}</td>
                    </tr>
                    <tr>
                      <td className="px-4 py-3 text-gray-700">Equivalent APR</td>
                      <td className="px-4 py-3 text-right font-medium text-gray-900">{results.effectiveApr.toFixed(1)}%</td>
                    </tr>
                  </tbody>
                </table>
              </div>
              <p className="text-xs text-gray-400 mt-2">
                Factoring is not a loan, so APR is not a perfect comparison. It helps put the cost in context against other financing options.
              </p>
            </details>
          </div>

          {/* Monthly Volume Projection */}
          <div className="px-6 sm:px-8 lg:px-10 pb-8">
            <details className="group">
              <summary className="cursor-pointer text-sm font-semibold text-gray-600 hover:text-gray-900 flex items-center gap-2">
                <ChevronRight className="h-4 w-4 group-open:rotate-90 transition-transform" />
                Monthly &amp; Annual Projection ({invoicesPerMonth} invoices/mo)
              </summary>
              <div className="mt-4 grid sm:grid-cols-3 gap-4">
                <div className="bg-gray-50 rounded-xl p-5 text-center">
                  <p className="text-sm text-gray-600 mb-1">Monthly Volume</p>
                  <p className="text-xl font-bold text-quicklend-900">{formatCurrency(results.monthlyVolume)}</p>
                  <p className="text-xs text-gray-400 mt-1">{invoicesPerMonth} invoices x {formatCurrency(invoiceAmount)}</p>
                </div>
                <div className="bg-gray-50 rounded-xl p-5 text-center">
                  <p className="text-sm text-gray-600 mb-1">Monthly Cost</p>
                  <p className="text-xl font-bold text-quicklend-900">{formatCurrency(results.monthlyCost)}</p>
                  <p className="text-xs text-gray-400 mt-1">{invoicesPerMonth} x {formatCurrency(results.totalCost)} per invoice</p>
                </div>
                <div className="bg-gray-50 rounded-xl p-5 text-center">
                  <p className="text-sm text-gray-600 mb-1">Annual Cost</p>
                  <p className="text-xl font-bold text-quicklend-900">{formatCurrency(results.annualCost)}</p>
                  <p className="text-xs text-gray-400 mt-1">12 months of factoring</p>
                </div>
              </div>
            </details>
          </div>

          {/* Worth-It Analysis */}
          <div className="px-6 sm:px-8 lg:px-10 pb-8">
            <details className="group">
              <summary className="cursor-pointer text-sm font-semibold text-gray-600 hover:text-gray-900 flex items-center gap-2">
                <ChevronRight className="h-4 w-4 group-open:rotate-90 transition-transform" />
                Is Factoring Worth It for You?
              </summary>
              <div className="mt-4 space-y-4">
                <div className="bg-green-50 border border-green-200 rounded-xl p-5">
                  <div className="flex items-start gap-3">
                    <CheckCircle className="h-5 w-5 text-green-600 mt-0.5 flex-shrink-0" />
                    <div>
                      <p className="font-semibold text-gray-900 mb-2">Factoring makes sense if:</p>
                      <ul className="text-sm text-gray-700 space-y-1.5">
                        <li>You can use the {formatCurrency(results.advanceAmount)} advance to generate more than {formatCurrency(results.totalCost)} in profit</li>
                        <li>You would otherwise miss payroll or critical vendor payments</li>
                        <li>You have an opportunity that requires immediate cash</li>
                        <li>You cannot qualify for lower-cost financing right now</li>
                      </ul>
                    </div>
                  </div>
                </div>
                <div className="bg-amber-50 border border-amber-200 rounded-xl p-5">
                  <div className="flex items-start gap-3">
                    <AlertTriangle className="h-5 w-5 text-amber-600 mt-0.5 flex-shrink-0" />
                    <div>
                      <p className="font-semibold text-gray-900 mb-2">Consider alternatives if:</p>
                      <ul className="text-sm text-gray-700 space-y-1.5">
                        <li>You can wait for your customers to pay</li>
                        <li>You could qualify for a line of credit (estimated cost: {formatCurrency(results.locInterest)} for same amount and period at 12% APR)</li>
                        <li>The {formatCurrency(results.totalCost)} cost per invoice exceeds the value of getting paid early</li>
                        <li>You are factoring every month and the annual cost ({formatCurrency(results.annualCost)}) is significant</li>
                      </ul>
                    </div>
                  </div>
                </div>
              </div>
            </details>
          </div>

          {/* CTA */}
          <div className="px-6 sm:px-8 lg:px-10 pb-8">
            <div className="bg-quicklend-50 rounded-xl p-6 text-center">
              {results.aprTier === 'high' ? (
                <>
                  <p className="text-gray-700 mb-1 font-medium">
                    Factoring can be expensive. See if you qualify for lower-cost options.
                  </p>
                  <p className="text-gray-500 text-sm mb-4">
                    A business line of credit could save you {formatCurrency(results.totalCost - results.locInterest)} per invoice.
                  </p>
                </>
              ) : results.aprTier === 'moderate' ? (
                <>
                  <p className="text-gray-700 mb-1 font-medium">
                    This is a typical factoring cost. Want to see how other options compare?
                  </p>
                  <p className="text-gray-500 text-sm mb-4">
                    No impact to your credit score.
                  </p>
                </>
              ) : (
                <>
                  <p className="text-gray-700 mb-1 font-medium">
                    Ready to factor your invoices or explore your options?
                  </p>
                  <p className="text-gray-500 text-sm mb-4">
                    No impact to your credit score.
                  </p>
                </>
              )}
              <Link
                href={`/get-started?source=invoice-factoring-calculator&loan_type=asset-backed-loans&amount=${Math.round(results.monthlyAdvance)}`}
                className="inline-flex items-center bg-quicklend-600 text-white font-semibold px-8 py-3 rounded-lg hover:bg-quicklend-700 transition-colors"
              >
                See Your Options <ArrowRight className="ml-2 h-4 w-4" />
              </Link>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
