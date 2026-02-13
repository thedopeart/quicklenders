'use client'

import { useState, useMemo } from 'react'
import Link from 'next/link'
import {
  ChevronRight,
  ArrowRight,
  Info,
  CheckCircle,
  XCircle,
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

function amortizationPayment(principal: number, annualRate: number, months: number): number {
  if (principal <= 0 || annualRate <= 0 || months <= 0) return 0
  const r = annualRate / 100 / 12
  return principal * (r * Math.pow(1 + r, months)) / (Math.pow(1 + r, months) - 1)
}

function totalInterest(principal: number, annualRate: number, months: number): number {
  const pmt = amortizationPayment(principal, annualRate, months)
  return pmt * months - principal
}

// ────────────────────────────────────────────────────────────────────
// Constants
// ────────────────────────────────────────────────────────────────────

const SECTION_179_LIMIT = 1160000

const equipmentCategories = [
  { value: 'construction', label: 'Construction / Heavy', defaultLife: 10, defaultResidual: 15 },
  { value: 'manufacturing', label: 'Manufacturing', defaultLife: 10, defaultResidual: 10 },
  { value: 'vehicles', label: 'Vehicles / Fleet', defaultLife: 5, defaultResidual: 20 },
  { value: 'technology', label: 'Technology / IT', defaultLife: 3, defaultResidual: 5 },
  { value: 'medical', label: 'Medical / Dental', defaultLife: 7, defaultResidual: 10 },
  { value: 'restaurant', label: 'Restaurant / Food', defaultLife: 7, defaultResidual: 10 },
  { value: 'office', label: 'Office Equipment', defaultLife: 7, defaultResidual: 5 },
  { value: 'other', label: 'Other', defaultLife: 5, defaultResidual: 10 },
]

const loanTermOptions = [
  { value: 12, label: '1 year' },
  { value: 24, label: '2 years' },
  { value: 36, label: '3 years' },
  { value: 48, label: '4 years' },
  { value: 60, label: '5 years' },
  { value: 84, label: '7 years' },
]

const leaseTermOptions = [
  { value: 12, label: '1 year' },
  { value: 24, label: '2 years' },
  { value: 36, label: '3 years' },
  { value: 48, label: '4 years' },
  { value: 60, label: '5 years' },
  { value: 84, label: '7 years' },
]

// Estimated monthly lease factor by term (per $1 of equipment cost)
const leaseFactors: Record<number, number> = {
  12: 0.088,
  24: 0.047,
  36: 0.033,
  48: 0.027,
  60: 0.023,
  84: 0.018,
}

const costPresets = [50000, 100000, 150000, 250000, 500000]

// ────────────────────────────────────────────────────────────────────
// Main Component
// ────────────────────────────────────────────────────────────────────

export default function EquipmentFinancingTool() {
  // Equipment details
  const [equipmentCost, setEquipmentCost] = useState(150000)
  const [category, setCategory] = useState('manufacturing')
  const [usefulLife, setUsefulLife] = useState(10)
  const [residualPercent, setResidualPercent] = useState(10)

  // Financing (buy)
  const [downPaymentPercent, setDownPaymentPercent] = useState(10)
  const [loanTermMonths, setLoanTermMonths] = useState(60)
  const [interestRate, setInterestRate] = useState(9)

  // Leasing
  const [leaseTermMonths, setLeaseTermMonths] = useState(36)
  const [customLeasePmt, setCustomLeasePmt] = useState(0)
  const [leaseType, setLeaseType] = useState<'operating' | 'capital'>('operating')

  // Tax
  const [taxRate, setTaxRate] = useState(25)
  const [useSection179, setUseSection179] = useState(true)

  function handleCategoryChange(cat: string) {
    setCategory(cat)
    const found = equipmentCategories.find((c) => c.value === cat)
    if (found) {
      setUsefulLife(found.defaultLife)
      setResidualPercent(found.defaultResidual)
    }
  }

  const results = useMemo(() => {
    if (equipmentCost <= 0) return null

    const residualValue = equipmentCost * (residualPercent / 100)
    const downPayment = equipmentCost * (downPaymentPercent / 100)
    const loanAmount = equipmentCost - downPayment

    // ── FINANCING (BUY) ──
    const monthlyLoanPayment = amortizationPayment(loanAmount, interestRate, loanTermMonths)
    const totalLoanPayments = monthlyLoanPayment * loanTermMonths
    const totalLoanInterest = totalLoanPayments - loanAmount
    const totalCashOutFinancing = downPayment + totalLoanPayments

    // Tax savings (financing)
    let section179Savings = 0
    if (useSection179) {
      const deductible = Math.min(equipmentCost, SECTION_179_LIMIT)
      section179Savings = deductible * (taxRate / 100)
    }
    // Interest deduction
    const interestTaxSavings = totalLoanInterest * (taxRate / 100)
    const totalFinancingTaxSavings = section179Savings + interestTaxSavings

    const netCostFinancing = totalCashOutFinancing - residualValue - totalFinancingTaxSavings

    // ── LEASING ──
    const estimatedLeasePmt = equipmentCost * (leaseFactors[leaseTermMonths] || 0.033)
    const monthlyLeasePmt = customLeasePmt > 0 ? customLeasePmt : estimatedLeasePmt
    const totalLeasePayments = monthlyLeasePmt * leaseTermMonths
    const buyoutCost = leaseType === 'capital' ? 1 : 0 // $1 buyout for capital

    const totalCashOutLeasing = totalLeasePayments + buyoutCost

    // Tax savings (leasing): operating leases are fully deductible
    const leaseTaxSavings = totalLeasePayments * (taxRate / 100)
    // Capital lease: simplified as similar tax treatment to purchase
    const totalLeasingTaxSavings = leaseType === 'operating'
      ? leaseTaxSavings
      : section179Savings + Math.max(0, totalLeasePayments - equipmentCost) * (taxRate / 100) * 0.5 // simplified

    const leaseResidual = leaseType === 'capital' ? residualValue : 0
    const netCostLeasing = totalCashOutLeasing - leaseResidual - totalLeasingTaxSavings

    // ── COMPARISON ──
    const difference = Math.abs(netCostFinancing - netCostLeasing)
    const winner: 'financing' | 'leasing' = netCostFinancing <= netCostLeasing ? 'financing' : 'leasing'

    // Monthly effective cost over useful life
    const usefulLifeMonths = usefulLife * 12
    const monthlyEffectiveFinancing = netCostFinancing / usefulLifeMonths
    const monthlyEffectiveLeasing = netCostLeasing / Math.min(leaseTermMonths, usefulLifeMonths)

    return {
      residualValue,
      downPayment,
      loanAmount,
      financing: {
        monthlyPayment: monthlyLoanPayment,
        totalPayments: totalLoanPayments,
        totalInterest: totalLoanInterest,
        totalCashOut: totalCashOutFinancing,
        taxSavings: totalFinancingTaxSavings,
        section179Savings,
        interestTaxSavings,
        netCost: netCostFinancing,
        monthlyEffective: monthlyEffectiveFinancing,
        ownsEquipment: true,
      },
      leasing: {
        monthlyPayment: monthlyLeasePmt,
        isEstimated: customLeasePmt === 0,
        totalPayments: totalLeasePayments,
        totalCashOut: totalCashOutLeasing,
        taxSavings: totalLeasingTaxSavings,
        netCost: netCostLeasing,
        monthlyEffective: monthlyEffectiveLeasing,
        ownsEquipment: leaseType === 'capital',
        residual: leaseResidual,
      },
      winner,
      difference,
    }
  }, [equipmentCost, residualPercent, downPaymentPercent, loanTermMonths, interestRate, leaseTermMonths, customLeasePmt, leaseType, taxRate, useSection179, usefulLife])

  return (
    <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
      {/* Intro */}
      <div className="p-6 sm:p-8 lg:p-10 pb-0">
        <p className="text-gray-700 leading-relaxed mb-2">
          Compare the true cost of financing (buying) vs. leasing equipment. Enter your equipment details, financing terms, and lease terms to see a full side-by-side comparison including tax benefits.
        </p>
        <p className="text-gray-500 text-sm mb-0">
          If you have a lease quote, enter the actual monthly payment. Otherwise the calculator estimates a typical lease payment.
        </p>
      </div>

      {/* Inputs */}
      <div className="p-6 sm:p-8 lg:p-10">
        <div className="space-y-8">
          {/* Equipment Details */}
          <div>
            <h3 className="text-sm font-semibold text-gray-900 uppercase tracking-wider mb-4">Equipment Details</h3>
            <div className="space-y-4">
              <div className="grid md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Equipment Category</label>
                  <select
                    value={category}
                    onChange={(e) => handleCategoryChange(e.target.value)}
                    className="w-full rounded-lg border border-gray-300 px-4 py-3 text-gray-900 focus:border-quicklend-600 focus:ring-2 focus:ring-quicklend-600/20 focus:outline-none transition-colors"
                  >
                    {equipmentCategories.map((cat) => (
                      <option key={cat.value} value={cat.value}>{cat.label}</option>
                    ))}
                  </select>
                  <p className="text-xs text-gray-400 mt-1">Sets default useful life and residual value</p>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Equipment Cost</label>
                  <div className="relative">
                    <span className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500">$</span>
                    <input
                      type="text"
                      inputMode="numeric"
                      value={formatInputDisplay(equipmentCost)}
                      onChange={(e) => {
                        const num = parseCurrencyInput(e.target.value)
                        if (num >= 0 && num <= 10000000) setEquipmentCost(num)
                      }}
                      className="w-full rounded-lg border border-gray-300 px-4 py-3 pl-8 text-gray-900 focus:border-quicklend-600 focus:ring-2 focus:ring-quicklend-600/20 focus:outline-none transition-colors"
                      placeholder="0"
                    />
                  </div>
                  <div className="flex flex-wrap gap-2 mt-2">
                    {costPresets.map((p) => (
                      <button
                        key={p}
                        onClick={() => setEquipmentCost(p)}
                        className={`px-2.5 py-1 rounded-full text-xs font-medium border transition-colors ${
                          equipmentCost === p
                            ? 'bg-quicklend-600 text-white border-quicklend-600'
                            : 'bg-white text-gray-600 border-gray-200 hover:border-quicklend-300'
                        }`}
                      >
                        {formatCurrency(p)}
                      </button>
                    ))}
                  </div>
                </div>
              </div>
              <div className="grid md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Useful Life: <span className="text-quicklend-600 font-bold">{usefulLife} years</span>
                  </label>
                  <input
                    type="range"
                    min={2}
                    max={15}
                    step={1}
                    value={usefulLife}
                    onChange={(e) => setUsefulLife(Number(e.target.value))}
                    className="w-full accent-quicklend-600"
                  />
                  <div className="flex justify-between text-xs text-gray-400 mt-1">
                    <span>2 yrs</span><span>15 yrs</span>
                  </div>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Residual Value: <span className="text-quicklend-600 font-bold">{residualPercent}%</span>
                    <span className="text-gray-400 font-normal"> ({formatCurrency(equipmentCost * residualPercent / 100)})</span>
                  </label>
                  <input
                    type="range"
                    min={0}
                    max={40}
                    step={1}
                    value={residualPercent}
                    onChange={(e) => setResidualPercent(Number(e.target.value))}
                    className="w-full accent-quicklend-600"
                  />
                  <div className="flex justify-between text-xs text-gray-400 mt-1">
                    <span>0%</span><span>40%</span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Financing & Leasing side by side */}
          <div className="grid md:grid-cols-2 gap-6">
            {/* Financing */}
            <div className="bg-quicklend-50/50 rounded-xl p-5 border border-quicklend-100">
              <h3 className="text-sm font-semibold text-quicklend-900 uppercase tracking-wider mb-4">Financing (Buy)</h3>
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Down Payment: <span className="text-quicklend-600 font-bold">{downPaymentPercent}%</span>
                    <span className="text-gray-400 font-normal"> ({formatCurrency(equipmentCost * downPaymentPercent / 100)})</span>
                  </label>
                  <input
                    type="range"
                    min={0}
                    max={30}
                    step={1}
                    value={downPaymentPercent}
                    onChange={(e) => setDownPaymentPercent(Number(e.target.value))}
                    className="w-full accent-quicklend-600"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Loan Term</label>
                  <select
                    value={loanTermMonths}
                    onChange={(e) => setLoanTermMonths(Number(e.target.value))}
                    className="w-full rounded-lg border border-gray-300 px-3 py-2.5 text-gray-900 text-sm focus:border-quicklend-600 focus:ring-2 focus:ring-quicklend-600/20 focus:outline-none transition-colors"
                  >
                    {loanTermOptions.map((opt) => (
                      <option key={opt.value} value={opt.value}>{opt.label}</option>
                    ))}
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Interest Rate: <span className="text-quicklend-600 font-bold">{interestRate}%</span>
                  </label>
                  <input
                    type="range"
                    min={5}
                    max={20}
                    step={0.5}
                    value={interestRate}
                    onChange={(e) => setInterestRate(Number(e.target.value))}
                    className="w-full accent-quicklend-600"
                  />
                  <p className="text-xs text-gray-400 mt-1">Equipment financing: typically 7-14%</p>
                </div>
              </div>
            </div>

            {/* Leasing */}
            <div className="bg-gray-50 rounded-xl p-5 border border-gray-200">
              <h3 className="text-sm font-semibold text-gray-700 uppercase tracking-wider mb-4">Leasing</h3>
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Lease Term</label>
                  <select
                    value={leaseTermMonths}
                    onChange={(e) => setLeaseTermMonths(Number(e.target.value))}
                    className="w-full rounded-lg border border-gray-300 px-3 py-2.5 text-gray-900 text-sm focus:border-quicklend-600 focus:ring-2 focus:ring-quicklend-600/20 focus:outline-none transition-colors"
                  >
                    {leaseTermOptions.map((opt) => (
                      <option key={opt.value} value={opt.value}>{opt.label}</option>
                    ))}
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Monthly Lease Payment
                    {customLeasePmt === 0 && <span className="text-gray-400 font-normal"> (estimated)</span>}
                  </label>
                  <div className="relative">
                    <span className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500">$</span>
                    <input
                      type="text"
                      inputMode="numeric"
                      value={customLeasePmt > 0 ? formatInputDisplay(customLeasePmt) : ''}
                      onChange={(e) => {
                        const num = parseCurrencyInput(e.target.value)
                        setCustomLeasePmt(num)
                      }}
                      className="w-full rounded-lg border border-gray-300 px-4 py-2.5 pl-8 text-gray-900 text-sm focus:border-quicklend-600 focus:ring-2 focus:ring-quicklend-600/20 focus:outline-none transition-colors"
                      placeholder={formatCurrency(equipmentCost * (leaseFactors[leaseTermMonths] || 0.033)) + ' (est.)'}
                    />
                  </div>
                  <p className="text-xs text-gray-400 mt-1">Enter your actual quote or leave blank for an estimate</p>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Lease Type</label>
                  <div className="flex gap-2">
                    <button
                      onClick={() => setLeaseType('operating')}
                      className={`flex-1 px-3 py-2.5 rounded-lg border text-xs font-medium transition-colors ${
                        leaseType === 'operating'
                          ? 'bg-quicklend-50 border-quicklend-300 text-quicklend-700'
                          : 'bg-white border-gray-200 text-gray-600 hover:border-gray-300'
                      }`}
                    >
                      Operating
                    </button>
                    <button
                      onClick={() => setLeaseType('capital')}
                      className={`flex-1 px-3 py-2.5 rounded-lg border text-xs font-medium transition-colors ${
                        leaseType === 'capital'
                          ? 'bg-quicklend-50 border-quicklend-300 text-quicklend-700'
                          : 'bg-white border-gray-200 text-gray-600 hover:border-gray-300'
                      }`}
                    >
                      Capital ($1 Buyout)
                    </button>
                  </div>
                  <p className="text-xs text-gray-400 mt-1">
                    {leaseType === 'operating'
                      ? 'Return equipment at end. Fully deductible as business expense.'
                      : 'Own equipment at end for $1. Treated like a purchase for tax purposes.'}
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Tax Settings */}
          <div>
            <h3 className="text-sm font-semibold text-gray-900 uppercase tracking-wider mb-4">Tax Considerations</h3>
            <div className="grid md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Tax Bracket: <span className="text-quicklend-600 font-bold">{taxRate}%</span>
                </label>
                <input
                  type="range"
                  min={0}
                  max={37}
                  step={1}
                  value={taxRate}
                  onChange={(e) => setTaxRate(Number(e.target.value))}
                  className="w-full accent-quicklend-600"
                />
                <p className="text-xs text-gray-400 mt-1">
                  If unsure, 25-30% is a common range for small businesses
                </p>
              </div>
              <div className="flex items-center">
                <label className="flex items-center gap-3 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={useSection179}
                    onChange={(e) => setUseSection179(e.target.checked)}
                    className="h-5 w-5 rounded border-gray-300 text-quicklend-600 focus:ring-quicklend-500"
                  />
                  <div>
                    <span className="text-sm font-medium text-gray-700">Section 179 Deduction</span>
                    <p className="text-xs text-gray-400">Deduct full cost in Year 1 (up to {formatCurrency(SECTION_179_LIMIT)})</p>
                  </div>
                </label>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Results */}
      {results && (
        <div className="border-t border-gray-100">
          {/* Recommendation Banner */}
          <div className="p-6 sm:p-8 lg:p-10">
            <div className={`rounded-xl p-6 text-center ${
              results.winner === 'financing' ? 'bg-quicklend-50 border border-quicklend-200' : 'bg-gray-50 border border-gray-200'
            }`}>
              <p className="text-sm text-gray-600 mb-1">Based on your inputs</p>
              <p className="text-2xl font-bold text-quicklend-900">
                {results.winner === 'financing' ? 'Financing (buying)' : 'Leasing'} saves you {formatCurrency(results.difference)}
              </p>
              <p className="text-sm text-gray-600 mt-1">
                over the {results.winner === 'financing' ? 'useful life' : 'lease term'} of the equipment
              </p>
            </div>
          </div>

          {/* Side-by-Side Comparison Table */}
          <div className="px-6 sm:px-8 lg:px-10 pb-8">
            <div className="bg-gray-50 rounded-xl overflow-hidden">
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b border-gray-200">
                    <th className="text-left px-4 py-3 font-semibold text-gray-700"></th>
                    <th className={`text-right px-4 py-3 font-semibold ${results.winner === 'financing' ? 'text-quicklend-700' : 'text-gray-700'}`}>
                      Financing (Buy)
                      {results.winner === 'financing' && <span className="ml-1 text-xs text-quicklend-600">Winner</span>}
                    </th>
                    <th className={`text-right px-4 py-3 font-semibold ${results.winner === 'leasing' ? 'text-quicklend-700' : 'text-gray-700'}`}>
                      Leasing
                      {results.winner === 'leasing' && <span className="ml-1 text-xs text-quicklend-600">Winner</span>}
                    </th>
                  </tr>
                </thead>
                <tbody>
                  <tr className="border-b border-gray-100">
                    <td className="px-4 py-3 text-gray-700">Monthly Payment</td>
                    <td className="px-4 py-3 text-right font-medium text-gray-900">{formatCurrency(results.financing.monthlyPayment)}</td>
                    <td className="px-4 py-3 text-right font-medium text-gray-900">
                      {formatCurrency(results.leasing.monthlyPayment)}
                      {results.leasing.isEstimated && <span className="text-xs text-gray-400 ml-1">est.</span>}
                    </td>
                  </tr>
                  <tr className="border-b border-gray-100">
                    <td className="px-4 py-3 text-gray-700">Down Payment</td>
                    <td className="px-4 py-3 text-right text-gray-900">{formatCurrency(results.downPayment)}</td>
                    <td className="px-4 py-3 text-right text-gray-900">$0</td>
                  </tr>
                  <tr className="border-b border-gray-100">
                    <td className="px-4 py-3 text-gray-700">Total Payments</td>
                    <td className="px-4 py-3 text-right text-gray-900">{formatCurrency(results.financing.totalCashOut)}</td>
                    <td className="px-4 py-3 text-right text-gray-900">{formatCurrency(results.leasing.totalCashOut)}</td>
                  </tr>
                  <tr className="border-b border-gray-100">
                    <td className="px-4 py-3 text-gray-700">Tax Savings</td>
                    <td className="px-4 py-3 text-right text-green-600">-{formatCurrency(results.financing.taxSavings)}</td>
                    <td className="px-4 py-3 text-right text-green-600">-{formatCurrency(results.leasing.taxSavings)}</td>
                  </tr>
                  <tr className="border-b border-gray-100">
                    <td className="px-4 py-3 text-gray-700">Residual Value</td>
                    <td className="px-4 py-3 text-right text-green-600">+{formatCurrency(results.residualValue)}</td>
                    <td className="px-4 py-3 text-right text-gray-900">
                      {results.leasing.ownsEquipment ? `+${formatCurrency(results.leasing.residual)}` : '$0'}
                    </td>
                  </tr>
                  <tr className="border-b border-gray-100 bg-quicklend-50/30">
                    <td className="px-4 py-3 font-semibold text-gray-900">Net Cost</td>
                    <td className={`px-4 py-3 text-right font-bold ${results.winner === 'financing' ? 'text-quicklend-700' : 'text-gray-900'}`}>
                      {formatCurrency(results.financing.netCost)}
                    </td>
                    <td className={`px-4 py-3 text-right font-bold ${results.winner === 'leasing' ? 'text-quicklend-700' : 'text-gray-900'}`}>
                      {formatCurrency(results.leasing.netCost)}
                    </td>
                  </tr>
                  <tr>
                    <td className="px-4 py-3 text-gray-700">Own Equipment?</td>
                    <td className="px-4 py-3 text-right">
                      <span className="inline-flex items-center gap-1 text-green-600 font-medium">
                        <CheckCircle className="h-4 w-4" /> Yes
                      </span>
                    </td>
                    <td className="px-4 py-3 text-right">
                      {results.leasing.ownsEquipment ? (
                        <span className="inline-flex items-center gap-1 text-green-600 font-medium">
                          <CheckCircle className="h-4 w-4" /> Yes ($1)
                        </span>
                      ) : (
                        <span className="inline-flex items-center gap-1 text-gray-400">
                          <XCircle className="h-4 w-4" /> No
                        </span>
                      )}
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>

          {/* Tax Breakdown */}
          {taxRate > 0 && (
            <div className="px-6 sm:px-8 lg:px-10 pb-8">
              <details className="group">
                <summary className="cursor-pointer text-sm font-semibold text-gray-600 hover:text-gray-900 flex items-center gap-2">
                  <ChevronRight className="h-4 w-4 group-open:rotate-90 transition-transform" />
                  Tax Benefit Breakdown
                </summary>
                <div className="mt-4 grid sm:grid-cols-2 gap-4">
                  <div className="bg-quicklend-50/50 border border-quicklend-100 rounded-xl p-5">
                    <p className="text-xs font-semibold text-quicklend-600 uppercase tracking-wider mb-3">Financing Tax Benefits</p>
                    <div className="space-y-2 text-sm">
                      {useSection179 && (
                        <div className="flex justify-between">
                          <span className="text-gray-700">Section 179 (Year 1)</span>
                          <span className="font-medium text-green-600">{formatCurrency(results.financing.section179Savings)}</span>
                        </div>
                      )}
                      <div className="flex justify-between">
                        <span className="text-gray-700">Interest Deductions</span>
                        <span className="font-medium text-green-600">{formatCurrency(results.financing.interestTaxSavings)}</span>
                      </div>
                      <div className="flex justify-between border-t border-quicklend-200 pt-2 mt-2">
                        <span className="font-semibold text-gray-900">Total Tax Savings</span>
                        <span className="font-bold text-green-600">{formatCurrency(results.financing.taxSavings)}</span>
                      </div>
                    </div>
                  </div>
                  <div className="bg-gray-50 border border-gray-200 rounded-xl p-5">
                    <p className="text-xs font-semibold text-gray-500 uppercase tracking-wider mb-3">Leasing Tax Benefits</p>
                    <div className="space-y-2 text-sm">
                      <div className="flex justify-between">
                        <span className="text-gray-700">
                          {leaseType === 'operating' ? 'Deductible Payments' : 'Depreciation + Imputed Interest'}
                        </span>
                        <span className="font-medium text-green-600">{formatCurrency(results.leasing.taxSavings)}</span>
                      </div>
                      <div className="flex justify-between border-t border-gray-200 pt-2 mt-2">
                        <span className="font-semibold text-gray-900">Total Tax Savings</span>
                        <span className="font-bold text-green-600">{formatCurrency(results.leasing.taxSavings)}</span>
                      </div>
                    </div>
                  </div>
                </div>
                {useSection179 && (
                  <p className="text-xs text-gray-400 mt-3">
                    Section 179 front-loads your tax savings. With financing, you save {formatCurrency(results.financing.section179Savings)} in Year 1, which improves your cash position for other investments.
                  </p>
                )}
              </details>
            </div>
          )}

          {/* Decision Factors */}
          <div className="px-6 sm:px-8 lg:px-10 pb-8">
            <details className="group">
              <summary className="cursor-pointer text-sm font-semibold text-gray-600 hover:text-gray-900 flex items-center gap-2">
                <ChevronRight className="h-4 w-4 group-open:rotate-90 transition-transform" />
                Beyond the Numbers: Decision Factors
              </summary>
              <div className="mt-4 grid sm:grid-cols-2 gap-4">
                <div className="bg-quicklend-50/50 border border-quicklend-100 rounded-xl p-5">
                  <p className="font-semibold text-quicklend-900 mb-3">Choose financing if:</p>
                  <ul className="text-sm text-gray-700 space-y-2">
                    <li className="flex items-start gap-2"><CheckCircle className="h-4 w-4 text-green-500 mt-0.5 flex-shrink-0" />You plan to use the equipment for its full useful life</li>
                    <li className="flex items-start gap-2"><CheckCircle className="h-4 w-4 text-green-500 mt-0.5 flex-shrink-0" />You want to build equity in the asset</li>
                    <li className="flex items-start gap-2"><CheckCircle className="h-4 w-4 text-green-500 mt-0.5 flex-shrink-0" />You can benefit from Section 179 this tax year</li>
                    <li className="flex items-start gap-2"><CheckCircle className="h-4 w-4 text-green-500 mt-0.5 flex-shrink-0" />The equipment holds its value over time</li>
                  </ul>
                </div>
                <div className="bg-gray-50 border border-gray-200 rounded-xl p-5">
                  <p className="font-semibold text-gray-900 mb-3">Choose leasing if:</p>
                  <ul className="text-sm text-gray-700 space-y-2">
                    <li className="flex items-start gap-2"><CheckCircle className="h-4 w-4 text-gray-400 mt-0.5 flex-shrink-0" />Technology changes quickly and you want to upgrade</li>
                    <li className="flex items-start gap-2"><CheckCircle className="h-4 w-4 text-gray-400 mt-0.5 flex-shrink-0" />You need to preserve cash (no down payment)</li>
                    <li className="flex items-start gap-2"><CheckCircle className="h-4 w-4 text-gray-400 mt-0.5 flex-shrink-0" />You prefer predictable costs without maintenance risk</li>
                    <li className="flex items-start gap-2"><CheckCircle className="h-4 w-4 text-gray-400 mt-0.5 flex-shrink-0" />Off-balance-sheet treatment matters for your business</li>
                  </ul>
                </div>
              </div>
            </details>
          </div>

          {/* CTA */}
          <div className="px-6 sm:px-8 lg:px-10 pb-8">
            <div className="bg-quicklend-50 rounded-xl p-6 text-center">
              {results.winner === 'financing' ? (
                <>
                  <p className="text-gray-700 mb-1 font-medium">
                    Financing saves you {formatCurrency(results.difference)}. See if you qualify for equipment financing.
                  </p>
                  <p className="text-gray-500 text-sm mb-4">
                    Equipment rates typically start at 7%. No impact to your credit score.
                  </p>
                </>
              ) : (
                <>
                  <p className="text-gray-700 mb-1 font-medium">
                    Leasing looks better for this scenario. Still want to explore financing options?
                  </p>
                  <p className="text-gray-500 text-sm mb-4">
                    Long-term ownership often pays off. Talk to a specialist to compare.
                  </p>
                </>
              )}
              <Link
                href={`/get-started?source=equipment-financing-calculator&loan_type=equipment-financing&amount=${equipmentCost}`}
                className="inline-flex items-center bg-quicklend-600 text-white font-semibold px-8 py-3 rounded-lg hover:bg-quicklend-700 transition-colors"
              >
                {results.winner === 'financing' ? 'Get Equipment Financing Rates' : 'Explore Your Options'} <ArrowRight className="ml-2 h-4 w-4" />
              </Link>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
