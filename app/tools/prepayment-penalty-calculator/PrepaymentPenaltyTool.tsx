'use client'

import { useState, useMemo } from 'react'
import Link from 'next/link'
import {
  ArrowRight,
  ChevronRight,
  Info,
  CheckCircle,
  XCircle,
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

function calcMonthlyPayment(principal: number, annualRate: number, months: number): number {
  if (principal <= 0 || months <= 0) return 0
  if (annualRate <= 0) return principal / months
  const r = annualRate / 100 / 12
  return (principal * r * Math.pow(1 + r, months)) / (Math.pow(1 + r, months) - 1)
}

// ────────────────────────────────────────────────────────────────────
// Types
// ────────────────────────────────────────────────────────────────────

type PenaltyType = 'pct-balance' | 'pct-original' | 'sba-declining' | 'min-interest' | 'flat-fee' | 'none'
type Scenario = 'payoff' | 'refinance'

const penaltyTypeOptions: { value: PenaltyType; label: string; description: string }[] = [
  { value: 'pct-balance', label: '% of Remaining Balance', description: 'Most common for bank loans' },
  { value: 'pct-original', label: '% of Original Amount', description: 'Some equipment financing' },
  { value: 'sba-declining', label: 'SBA Declining Scale', description: '5% / 3% / 1% over 3 years' },
  { value: 'min-interest', label: 'Minimum Interest', description: 'Common with online lenders' },
  { value: 'flat-fee', label: 'Flat Fee', description: 'Fixed dollar amount' },
  { value: 'none', label: 'No Penalty', description: 'For comparison' },
]

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

export default function PrepaymentPenaltyTool() {
  // Current Loan
  const [originalAmount, setOriginalAmount] = useState(100000)
  const [currentBalance, setCurrentBalance] = useState(75000)
  const [rate, setRate] = useState(15)
  const [monthlyPayment, setMonthlyPayment] = useState(2599)
  const [remainingMonths, setRemainingMonths] = useState(36)

  // Penalty
  const [penaltyType, setPenaltyType] = useState<PenaltyType>('pct-balance')
  const [penaltyRate, setPenaltyRate] = useState(3)
  const [sbaYear, setSbaYear] = useState(1)
  const [minInterestMonths, setMinInterestMonths] = useState(6)
  const [flatFee, setFlatFee] = useState(2000)

  // Scenario
  const [scenario, setScenario] = useState<Scenario>('payoff')

  // Refinance details
  const [newRate, setNewRate] = useState(9)
  const [newTermMonths, setNewTermMonths] = useState(36)
  const [newLoanFees, setNewLoanFees] = useState(1500)

  // ── Calculations ──────────────────────────────────────────────────

  const results = useMemo(() => {
    if (currentBalance <= 0 || monthlyPayment <= 0 || remainingMonths <= 0) return null

    // Calculate penalty
    let penaltyAmount = 0
    let penaltyDescription = ''

    switch (penaltyType) {
      case 'pct-balance':
        penaltyAmount = currentBalance * (penaltyRate / 100)
        penaltyDescription = `${penaltyRate}% of remaining balance`
        break
      case 'pct-original':
        penaltyAmount = originalAmount * (penaltyRate / 100)
        penaltyDescription = `${penaltyRate}% of original amount`
        break
      case 'sba-declining': {
        const sbaRates: Record<number, number> = { 1: 5, 2: 3, 3: 1 }
        const sbaRate = sbaRates[sbaYear] || 0
        penaltyAmount = currentBalance * (sbaRate / 100)
        penaltyDescription = sbaYear <= 3 ? `${sbaRate}% (year ${sbaYear} of SBA declining scale)` : 'No penalty after year 3'
        break
      }
      case 'min-interest': {
        const monthlyInterest = currentBalance * (rate / 100 / 12)
        penaltyAmount = monthlyInterest * minInterestMonths
        penaltyDescription = `${minInterestMonths} months of minimum interest`
        break
      }
      case 'flat-fee':
        penaltyAmount = flatFee
        penaltyDescription = 'Flat fee'
        break
      case 'none':
        penaltyAmount = 0
        penaltyDescription = 'No penalty'
        break
    }

    penaltyAmount = Math.round(penaltyAmount)

    // Remaining cost if kept
    const totalRemainingPayments = monthlyPayment * remainingMonths
    const remainingInterest = totalRemainingPayments - currentBalance

    if (scenario === 'payoff') {
      // Early payoff analysis
      const totalToPayOff = currentBalance + penaltyAmount
      const interestSaved = remainingInterest
      const netSavings = interestSaved - penaltyAmount

      const verdict = netSavings > 0 ? 'pay-early' : 'keep-loan'
      const verdictLabel = netSavings > 0 ? 'Pay Early' : 'Keep Current Loan'
      const verdictColor = netSavings > 0 ? 'green' : 'red'

      return {
        scenario: 'payoff' as const,
        penaltyAmount,
        penaltyDescription,
        totalRemainingPayments,
        remainingInterest,
        totalToPayOff,
        interestSaved,
        netSavings,
        verdict,
        verdictLabel,
        verdictColor,
      }
    }

    // Refinance analysis
    const newLoanAmount = currentBalance + penaltyAmount + newLoanFees
    const newPayment = calcMonthlyPayment(newLoanAmount, newRate, newTermMonths)
    const totalNewPayments = newPayment * newTermMonths
    const newTotalInterest = totalNewPayments - newLoanAmount
    const totalCostCurrent = totalRemainingPayments
    const totalCostRefinanced = totalNewPayments
    const totalSavings = totalCostCurrent - totalCostRefinanced

    // Break-even
    const upfrontCosts = penaltyAmount + newLoanFees
    const monthlySavings = monthlyPayment - newPayment
    const breakEvenMonths = monthlySavings > 0 ? Math.ceil(upfrontCosts / monthlySavings) : null
    const monthsOfSavingsAfterBreakeven = breakEvenMonths !== null ? Math.max(0, newTermMonths - breakEvenMonths) : 0

    let verdict: string
    let verdictLabel: string
    let verdictColor: string

    if (totalSavings > 0 && breakEvenMonths !== null && breakEvenMonths < remainingMonths) {
      verdict = 'refinance'
      verdictLabel = 'Refinance'
      verdictColor = 'green'
    } else if (totalSavings > 0) {
      verdict = 'maybe-refinance'
      verdictLabel = 'Refinancing Saves a Little'
      verdictColor = 'amber'
    } else {
      verdict = 'keep-loan'
      verdictLabel = 'Keep Current Loan'
      verdictColor = 'red'
    }

    return {
      scenario: 'refinance' as const,
      penaltyAmount,
      penaltyDescription,
      totalRemainingPayments,
      remainingInterest,
      newLoanAmount,
      newPayment,
      totalNewPayments,
      newTotalInterest,
      totalCostCurrent,
      totalCostRefinanced,
      totalSavings,
      upfrontCosts,
      monthlySavings,
      breakEvenMonths,
      monthsOfSavingsAfterBreakeven,
      verdict,
      verdictLabel,
      verdictColor,
    }
  }, [
    originalAmount, currentBalance, rate, monthlyPayment, remainingMonths,
    penaltyType, penaltyRate, sbaYear, minInterestMonths, flatFee,
    scenario, newRate, newTermMonths, newLoanFees,
  ])

  return (
    <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
      {/* Intro */}
      <div className="p-6 sm:p-8 lg:p-10 pb-0">
        <p className="text-gray-700 leading-relaxed mb-2">
          Find out if paying off your loan early or refinancing saves money after accounting for the prepayment penalty. Enter your current loan details and penalty terms to see the numbers.
        </p>
        <p className="text-gray-500 text-sm mb-0">
          Results are estimates. Check your loan agreement for exact penalty terms.
        </p>
      </div>

      {/* Inputs */}
      <div className="p-6 sm:p-8 lg:p-10">
        <div className="space-y-6">
          {/* Current Loan */}
          <div>
            <h3 className="text-sm font-semibold text-gray-700 mb-4">Your Current Loan</h3>
            <div className="grid sm:grid-cols-2 gap-4">
              <CurrencyInput
                label="Original Loan Amount"
                value={originalAmount}
                onChange={setOriginalAmount}
                hint="The total you originally borrowed."
              />
              <CurrencyInput
                label="Current Balance"
                value={currentBalance}
                onChange={setCurrentBalance}
                hint="What you still owe today."
              />
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Interest Rate: <span className="text-quicklend-600 font-bold">{rate}%</span>
                </label>
                <input
                  type="range"
                  min={1}
                  max={50}
                  step={0.5}
                  value={rate}
                  onChange={(e) => setRate(Number(e.target.value))}
                  className="w-full accent-quicklend-600"
                />
                <div className="flex justify-between text-xs text-gray-400 mt-1">
                  <span>1%</span>
                  <span>50%</span>
                </div>
              </div>
              <CurrencyInput
                label="Monthly Payment"
                value={monthlyPayment}
                onChange={setMonthlyPayment}
                max={1000000}
                hint="Your current monthly payment."
              />
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Remaining Term</label>
                <div className="relative">
                  <input
                    type="number"
                    min={1}
                    max={360}
                    value={remainingMonths}
                    onChange={(e) => setRemainingMonths(Math.max(1, Math.min(360, Number(e.target.value))))}
                    className="w-full rounded-lg border border-gray-300 px-4 py-3 text-gray-900 focus:border-quicklend-600 focus:ring-2 focus:ring-quicklend-600/20 focus:outline-none transition-colors"
                  />
                </div>
                <p className="text-xs text-gray-400 mt-1">Months remaining on your loan.</p>
              </div>
            </div>
          </div>

          {/* Penalty Type */}
          <div className="border-t border-gray-100 pt-6">
            <h3 className="text-sm font-semibold text-gray-700 mb-4">Prepayment Penalty</h3>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Penalty Type</label>
              <select
                value={penaltyType}
                onChange={(e) => setPenaltyType(e.target.value as PenaltyType)}
                className="w-full rounded-lg border border-gray-300 px-4 py-3 text-gray-900 focus:border-quicklend-600 focus:ring-2 focus:ring-quicklend-600/20 focus:outline-none transition-colors"
              >
                {penaltyTypeOptions.map((opt) => (
                  <option key={opt.value} value={opt.value}>{opt.label} - {opt.description}</option>
                ))}
              </select>
            </div>

            {/* Penalty-specific inputs */}
            <div className="mt-4">
              {(penaltyType === 'pct-balance' || penaltyType === 'pct-original') && (
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Penalty Rate: <span className="text-quicklend-600 font-bold">{penaltyRate}%</span>
                  </label>
                  <input
                    type="range"
                    min={0.5}
                    max={10}
                    step={0.5}
                    value={penaltyRate}
                    onChange={(e) => setPenaltyRate(Number(e.target.value))}
                    className="w-full accent-quicklend-600"
                  />
                  <div className="flex justify-between text-xs text-gray-400 mt-1">
                    <span>0.5%</span>
                    <span>10%</span>
                  </div>
                </div>
              )}

              {penaltyType === 'sba-declining' && (
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Current Year of Loan</label>
                  <div className="flex gap-2">
                    {[1, 2, 3, 4].map((yr) => (
                      <button
                        key={yr}
                        onClick={() => setSbaYear(yr)}
                        className={`flex-1 py-2 rounded-lg text-sm font-medium border transition-colors ${
                          sbaYear === yr
                            ? 'bg-quicklend-600 text-white border-quicklend-600'
                            : 'bg-white text-gray-600 border-gray-200 hover:border-quicklend-300'
                        }`}
                      >
                        {yr <= 3 ? `Year ${yr}` : 'Year 4+'}
                      </button>
                    ))}
                  </div>
                  <p className="text-xs text-gray-400 mt-2">
                    SBA 7(a) penalty: Year 1 = 5%, Year 2 = 3%, Year 3 = 1%, Year 4+ = no penalty.
                    {sbaYear <= 3 && ` Your penalty: ${[5, 3, 1][sbaYear - 1]}% of balance.`}
                    {sbaYear > 3 && ' No penalty applies after year 3.'}
                  </p>
                </div>
              )}

              {penaltyType === 'min-interest' && (
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Minimum Interest Months</label>
                  <select
                    value={minInterestMonths}
                    onChange={(e) => setMinInterestMonths(Number(e.target.value))}
                    className="w-full rounded-lg border border-gray-300 px-4 py-3 text-gray-900 focus:border-quicklend-600 focus:ring-2 focus:ring-quicklend-600/20 focus:outline-none transition-colors"
                  >
                    {[3, 6, 9, 12, 18, 24].map((m) => (
                      <option key={m} value={m}>{m} months</option>
                    ))}
                  </select>
                  <p className="text-xs text-gray-400 mt-1">You owe this many months of interest regardless of when you pay off.</p>
                </div>
              )}

              {penaltyType === 'flat-fee' && (
                <CurrencyInput
                  label="Penalty Amount"
                  value={flatFee}
                  onChange={setFlatFee}
                  max={1000000}
                  hint="Fixed dollar amount you owe for early payoff."
                />
              )}
            </div>
          </div>

          {/* Scenario */}
          <div className="border-t border-gray-100 pt-6">
            <h3 className="text-sm font-semibold text-gray-700 mb-3">What Do You Want to Do?</h3>
            <div className="flex rounded-lg bg-gray-100 p-1">
              {([
                { value: 'payoff', label: 'Pay Off Early' },
                { value: 'refinance', label: 'Refinance' },
              ] as { value: Scenario; label: string }[]).map((s) => (
                <button
                  key={s.value}
                  onClick={() => setScenario(s.value)}
                  className={`flex-1 py-2.5 px-4 rounded-md text-sm font-semibold transition-colors ${
                    scenario === s.value
                      ? 'bg-quicklend-600 text-white shadow-sm'
                      : 'text-gray-600 hover:text-gray-900'
                  }`}
                >
                  {s.label}
                </button>
              ))}
            </div>

            {/* Refinance fields */}
            {scenario === 'refinance' && (
              <div className="mt-4 bg-gray-50 rounded-xl p-4 space-y-4">
                <p className="text-xs text-gray-500 font-medium uppercase tracking-wider">New Loan Details</p>
                <div className="grid sm:grid-cols-3 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      New Rate: <span className="text-quicklend-600 font-bold">{newRate}%</span>
                    </label>
                    <input
                      type="range"
                      min={3}
                      max={30}
                      step={0.5}
                      value={newRate}
                      onChange={(e) => setNewRate(Number(e.target.value))}
                      className="w-full accent-quicklend-600"
                    />
                    <div className="flex justify-between text-xs text-gray-400 mt-1">
                      <span>3%</span>
                      <span>30%</span>
                    </div>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">New Term</label>
                    <select
                      value={newTermMonths}
                      onChange={(e) => setNewTermMonths(Number(e.target.value))}
                      className="w-full rounded-lg border border-gray-300 px-3 py-2 text-sm text-gray-900 focus:border-quicklend-600 focus:ring-2 focus:ring-quicklend-600/20 focus:outline-none transition-colors"
                    >
                      {[12, 24, 36, 48, 60, 84, 120].map((m) => (
                        <option key={m} value={m}>{m / 12} {m === 12 ? 'year' : 'years'}</option>
                      ))}
                    </select>
                  </div>
                  <CurrencyInput
                    label="New Loan Fees"
                    value={newLoanFees}
                    onChange={setNewLoanFees}
                    max={500000}
                    hint="Origination, closing costs."
                  />
                </div>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Results */}
      {results && (
        <div className="border-t border-gray-100">
          {/* Verdict Banner */}
          <div className="p-6 sm:p-8 lg:p-10 pb-0">
            {(() => {
              const isGreen = results.verdictColor === 'green'
              const isAmber = results.verdictColor === 'amber'
              const Icon = isGreen ? CheckCircle : isAmber ? AlertTriangle : XCircle
              const bg = isGreen ? 'bg-green-50 border-green-200' : isAmber ? 'bg-amber-50 border-amber-200' : 'bg-red-50 border-red-200'
              const textColor = isGreen ? 'text-green-700' : isAmber ? 'text-amber-700' : 'text-red-700'

              return (
                <div className={`${bg} border rounded-xl p-5 flex flex-col sm:flex-row items-center gap-4`}>
                  <div className="flex items-center gap-3 flex-1">
                    <Icon className={`h-8 w-8 ${textColor} shrink-0`} />
                    <div>
                      <p className={`text-lg font-bold ${textColor}`}>Recommendation: {results.verdictLabel}</p>
                      <p className="text-sm text-gray-600">
                        {results.scenario === 'payoff' && results.verdict === 'pay-early' &&
                          `Even after the ${formatCurrency(results.penaltyAmount)} penalty, you save ${formatCurrency(results.netSavings)} by paying off now.`}
                        {results.scenario === 'payoff' && results.verdict === 'keep-loan' &&
                          `The penalty (${formatCurrency(results.penaltyAmount)}) exceeds the interest you would save. Keep your current loan.`}
                        {results.scenario === 'refinance' && results.verdict === 'refinance' &&
                          `Refinancing saves ${formatCurrency(results.totalSavings)} over the loan term, with a ${results.breakEvenMonths}-month break-even.`}
                        {results.scenario === 'refinance' && results.verdict === 'maybe-refinance' &&
                          `Refinancing saves some money, but the break-even point is close to your remaining term. Consider carefully.`}
                        {results.scenario === 'refinance' && results.verdict === 'keep-loan' &&
                          'Refinancing would cost more than keeping your current loan. The upfront costs outweigh the rate savings.'}
                      </p>
                    </div>
                  </div>
                </div>
              )
            })()}
          </div>

          {/* Key Numbers */}
          <div className="p-6 sm:p-8 lg:p-10">
            {results.scenario === 'payoff' ? (
              /* Early Payoff */
              <div>
                <div className="grid sm:grid-cols-3 gap-4 mb-4">
                  <div className="bg-gray-50 border border-gray-200 rounded-xl p-4 text-center">
                    <p className="text-xs font-semibold text-gray-500 uppercase tracking-wider mb-1">Prepayment Penalty</p>
                    <p className="text-xl font-bold text-gray-900">{formatCurrency(results.penaltyAmount)}</p>
                    <p className="text-xs text-gray-400 mt-1">{results.penaltyDescription}</p>
                  </div>
                  <div className="bg-gray-50 border border-gray-200 rounded-xl p-4 text-center">
                    <p className="text-xs font-semibold text-gray-500 uppercase tracking-wider mb-1">Interest Saved</p>
                    <p className="text-xl font-bold text-green-600">{formatCurrency(results.interestSaved)}</p>
                    <p className="text-xs text-gray-400 mt-1">by paying off now</p>
                  </div>
                  <div className={`border rounded-xl p-4 text-center ${results.netSavings >= 0 ? 'bg-green-50 border-green-200' : 'bg-red-50 border-red-200'}`}>
                    <p className="text-xs font-semibold text-gray-500 uppercase tracking-wider mb-1">Net Savings</p>
                    <p className={`text-xl font-bold ${results.netSavings >= 0 ? 'text-green-600' : 'text-red-500'}`}>
                      {formatCurrency(results.netSavings)}
                    </p>
                    <p className="text-xs text-gray-400 mt-1">interest saved minus penalty</p>
                  </div>
                </div>

                {/* Payoff summary */}
                <div className="bg-quicklend-900 rounded-xl p-5">
                  <div className="grid sm:grid-cols-2 gap-4">
                    <div className="text-center">
                      <p className="text-quicklend-200 text-sm">Total to Pay Off Now</p>
                      <p className="text-2xl font-bold text-white">{formatCurrency(results.totalToPayOff)}</p>
                      <p className="text-quicklend-300 text-xs">{formatCurrency(currentBalance)} balance + {formatCurrency(results.penaltyAmount)} penalty</p>
                    </div>
                    <div className="text-center">
                      <p className="text-quicklend-200 text-sm">If You Keep the Loan</p>
                      <p className="text-2xl font-bold text-amber-400">{formatCurrency(results.totalRemainingPayments)}</p>
                      <p className="text-quicklend-300 text-xs">{formatCurrency(monthlyPayment)}/mo x {remainingMonths} months</p>
                    </div>
                  </div>
                </div>
              </div>
            ) : (
              /* Refinance */
              <div>
                {/* Comparison Table */}
                <div className="overflow-x-auto -mx-6 sm:mx-0 mb-4">
                  <table className="w-full text-sm min-w-[400px]">
                    <thead>
                      <tr className="border-b border-gray-200">
                        <th className="text-left px-4 py-3 text-gray-500 font-medium"></th>
                        <th className="text-right px-4 py-3 font-semibold text-gray-500">Current Loan</th>
                        <th className="text-right px-4 py-3 font-semibold text-quicklend-600">Refinanced</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr className="border-b border-gray-100">
                        <td className="px-4 py-3 text-gray-700">Balance / New Amount</td>
                        <td className="px-4 py-3 text-right font-medium text-gray-900">{formatCurrency(currentBalance)}</td>
                        <td className="px-4 py-3 text-right font-medium text-gray-900">{formatCurrency(results.newLoanAmount)}</td>
                      </tr>
                      <tr className="border-b border-gray-100">
                        <td className="px-4 py-3 text-gray-700">Interest Rate</td>
                        <td className="px-4 py-3 text-right font-medium text-gray-900">{rate}%</td>
                        <td className="px-4 py-3 text-right font-medium text-quicklend-600">{newRate}%</td>
                      </tr>
                      <tr className="border-b border-gray-100 bg-gray-50">
                        <td className="px-4 py-3 text-gray-700 font-semibold">Monthly Payment</td>
                        <td className="px-4 py-3 text-right font-bold text-gray-900">{formatCurrency(monthlyPayment)}</td>
                        <td className="px-4 py-3 text-right font-bold text-quicklend-600">{formatCurrency(results.newPayment)}</td>
                      </tr>
                      <tr className="border-b border-gray-100">
                        <td className="px-4 py-3 text-gray-700">Remaining / New Term</td>
                        <td className="px-4 py-3 text-right text-gray-900">{remainingMonths} months</td>
                        <td className="px-4 py-3 text-right text-gray-900">{newTermMonths} months</td>
                      </tr>
                      <tr className="border-b border-gray-100">
                        <td className="px-4 py-3 text-gray-700">Prepayment Penalty</td>
                        <td className="px-4 py-3 text-right text-gray-400">-</td>
                        <td className="px-4 py-3 text-right font-medium text-gray-900">{formatCurrency(results.penaltyAmount)}</td>
                      </tr>
                      <tr className="border-b border-gray-100">
                        <td className="px-4 py-3 text-gray-700">New Loan Fees</td>
                        <td className="px-4 py-3 text-right text-gray-400">-</td>
                        <td className="px-4 py-3 text-right font-medium text-gray-900">{formatCurrency(newLoanFees)}</td>
                      </tr>
                      <tr className="bg-quicklend-50">
                        <td className="px-4 py-3 text-gray-900 font-bold">Total Payments</td>
                        <td className="px-4 py-3 text-right font-bold text-lg text-gray-900">{formatCurrency(results.totalCostCurrent)}</td>
                        <td className="px-4 py-3 text-right font-bold text-lg text-quicklend-600">{formatCurrency(results.totalCostRefinanced)}</td>
                      </tr>
                    </tbody>
                  </table>
                </div>

                {/* Net Savings Bar */}
                <div className={`rounded-xl p-5 text-center ${results.totalSavings > 0 ? 'bg-quicklend-900' : 'bg-gray-800'}`}>
                  <p className="text-quicklend-200 text-sm">
                    {results.totalSavings > 0 ? 'Net Savings from Refinancing' : 'Additional Cost from Refinancing'}
                  </p>
                  <p className={`text-2xl font-bold ${results.totalSavings > 0 ? 'text-amber-400' : 'text-red-400'}`}>
                    {formatCurrency(Math.abs(results.totalSavings))}
                  </p>
                  {results.monthlySavings > 0 && (
                    <p className="text-quicklend-300 text-xs mt-1">
                      {formatCurrency(results.monthlySavings)}/month lower payment
                    </p>
                  )}
                </div>

                {/* Break-Even */}
                {results.breakEvenMonths !== null && results.monthlySavings > 0 && (
                  <div className="mt-4">
                    <details className="group" open>
                      <summary className="cursor-pointer text-sm font-semibold text-gray-600 hover:text-gray-900 flex items-center gap-2">
                        <ChevronRight className="h-4 w-4 group-open:rotate-90 transition-transform" />
                        Break-Even Analysis
                      </summary>
                      <div className="mt-4 bg-gray-50 rounded-xl p-5">
                        <div className="grid sm:grid-cols-3 gap-4 mb-4">
                          <div className="text-center">
                            <p className="text-xs font-semibold text-gray-500 uppercase tracking-wider mb-1">Upfront Costs</p>
                            <p className="text-lg font-bold text-gray-900">{formatCurrency(results.upfrontCosts)}</p>
                            <p className="text-xs text-gray-400">penalty + fees</p>
                          </div>
                          <div className="text-center">
                            <p className="text-xs font-semibold text-gray-500 uppercase tracking-wider mb-1">Monthly Savings</p>
                            <p className="text-lg font-bold text-green-600">{formatCurrency(results.monthlySavings)}</p>
                            <p className="text-xs text-gray-400">per month</p>
                          </div>
                          <div className="text-center">
                            <p className="text-xs font-semibold text-gray-500 uppercase tracking-wider mb-1">Break-Even</p>
                            <p className="text-lg font-bold text-quicklend-600">{results.breakEvenMonths} months</p>
                            <p className="text-xs text-gray-400">
                              {results.monthsOfSavingsAfterBreakeven > 0
                                ? `${results.monthsOfSavingsAfterBreakeven} months of savings after`
                                : 'Beyond new loan term'}
                            </p>
                          </div>
                        </div>

                        {/* Timeline bar */}
                        <div className="space-y-2">
                          <div>
                            <p className="text-xs text-gray-500 mb-1">Current loan (if kept)</p>
                            <div className="h-6 bg-gray-300 rounded-full relative">
                              <span className="absolute right-2 top-1/2 -translate-y-1/2 text-xs font-medium text-gray-700">
                                {remainingMonths} mo
                              </span>
                            </div>
                          </div>
                          <div>
                            <p className="text-xs text-gray-500 mb-1">Refinanced loan</p>
                            <div className="h-6 bg-gray-100 rounded-full relative overflow-hidden">
                              {/* Payback phase */}
                              <div
                                className="absolute left-0 top-0 bottom-0 bg-amber-300 rounded-l-full"
                                style={{ width: `${Math.min((results.breakEvenMonths / newTermMonths) * 100, 100)}%` }}
                              />
                              {/* Savings phase */}
                              {results.breakEvenMonths < newTermMonths && (
                                <div
                                  className="absolute top-0 bottom-0 bg-green-400 rounded-r-full"
                                  style={{
                                    left: `${(results.breakEvenMonths / newTermMonths) * 100}%`,
                                    right: '0',
                                  }}
                                />
                              )}
                              {/* Break-even marker */}
                              <div
                                className="absolute top-0 bottom-0 w-0.5 bg-gray-800"
                                style={{ left: `${Math.min((results.breakEvenMonths / newTermMonths) * 100, 100)}%` }}
                              />
                              <span className="absolute right-2 top-1/2 -translate-y-1/2 text-xs font-medium text-gray-700">
                                {newTermMonths} mo
                              </span>
                            </div>
                          </div>
                          <div className="flex items-center gap-4 text-xs text-gray-500">
                            <div className="flex items-center gap-1.5">
                              <span className="w-3 h-3 rounded-sm bg-amber-300" /> Paying back costs
                            </div>
                            <div className="flex items-center gap-1.5">
                              <span className="w-3 h-3 rounded-sm bg-green-400" /> True savings
                            </div>
                          </div>
                        </div>
                      </div>
                    </details>
                  </div>
                )}
              </div>
            )}
          </div>

          {/* Common Penalty Reference */}
          <div className="px-6 sm:px-8 lg:px-10 pb-8">
            <details className="group">
              <summary className="cursor-pointer text-sm font-semibold text-gray-600 hover:text-gray-900 flex items-center gap-2">
                <ChevronRight className="h-4 w-4 group-open:rotate-90 transition-transform" />
                Common Prepayment Penalty Structures
              </summary>
              <div className="mt-4 bg-gray-50 rounded-xl overflow-hidden">
                <table className="w-full text-sm">
                  <thead>
                    <tr className="border-b border-gray-200">
                      <th className="text-left px-4 py-2.5 text-gray-500 font-medium">Loan Type</th>
                      <th className="text-left px-4 py-2.5 text-gray-500 font-medium">Typical Penalty</th>
                    </tr>
                  </thead>
                  <tbody>
                    {[
                      { type: 'SBA 7(a)', penalty: '5% / 3% / 1% declining over 3 years (refinance only)' },
                      { type: 'Bank Term Loans', penalty: '1% to 5% of remaining balance' },
                      { type: 'Online Lenders', penalty: 'Minimum interest (3-12 months) or remaining interest' },
                      { type: 'Equipment Financing', penalty: 'Varies: 1-3% of balance or flat fee' },
                      { type: 'Lines of Credit', penalty: 'Typically none' },
                      { type: 'Commercial Real Estate', penalty: 'Yield maintenance or defeasance (complex)' },
                    ].map((row) => (
                      <tr key={row.type} className="border-b border-gray-100">
                        <td className="px-4 py-2.5 text-gray-700 font-medium">{row.type}</td>
                        <td className="px-4 py-2.5 text-gray-900">{row.penalty}</td>
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
                {results.verdict === 'refinance' || results.verdict === 'maybe-refinance'
                  ? 'Refinancing could save you money. Many of our lenders offer loans with no prepayment penalty.'
                  : results.verdict === 'pay-early'
                    ? `Paying off early saves you ${formatCurrency(results.scenario === 'payoff' ? results.netSavings : 0)}. Need a lower rate on your next loan?`
                    : 'Keeping your current loan makes the most sense right now. When you are ready for new financing, we can help.'}
              </p>
              <p className="text-gray-500 text-sm mb-4">
                No impact to your credit score.
              </p>
              <div className="flex flex-col sm:flex-row gap-3 justify-center">
                <Link
                  href={`/get-started?source=prepayment-penalty-calculator&loan_type=term-loans&amount=${currentBalance}`}
                  className="inline-flex items-center justify-center bg-quicklend-600 text-white font-semibold px-8 py-3 rounded-lg hover:bg-quicklend-700 transition-colors"
                >
                  {results.verdict === 'refinance' || results.verdict === 'maybe-refinance'
                    ? 'Check Refinancing Options'
                    : 'See Your Options'} <ArrowRight className="ml-2 h-4 w-4" />
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
