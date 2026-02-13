'use client'

import { useState } from 'react'
import Link from 'next/link'
import { ChevronRight, CheckCircle, AlertTriangle, TrendingUp, TrendingDown, Minus } from 'lucide-react'

/* ------------------------------------------------------------------ */
/*  Types & Data                                                       */
/* ------------------------------------------------------------------ */

type IndustryKey =
  | 'restaurant'
  | 'retail'
  | 'professional-services'
  | 'healthcare'
  | 'manufacturing'
  | 'construction'
  | 'technology'
  | 'transportation'
  | 'wholesale'
  | 'ecommerce'
  | 'auto-services'
  | 'beauty'

type RevenueTrend = 'growing' | 'stable' | 'declining'
type CustomerConcentration = 'low' | 'moderate' | 'high'
type OwnerDependency = 'low' | 'moderate' | 'high'

interface IndustryData {
  label: string
  revenueMultiple: [number, number]
  sdeMultiple: [number, number]
  ebitdaMultiple: [number, number]
}

const industries: Record<IndustryKey, IndustryData> = {
  restaurant: { label: 'Restaurants & Food Service', revenueMultiple: [0.3, 0.5], sdeMultiple: [1.5, 2.5], ebitdaMultiple: [3, 4] },
  retail: { label: 'Retail', revenueMultiple: [0.2, 0.5], sdeMultiple: [1.5, 2.5], ebitdaMultiple: [3, 5] },
  'professional-services': { label: 'Professional Services', revenueMultiple: [0.5, 1.0], sdeMultiple: [2, 3], ebitdaMultiple: [4, 6] },
  healthcare: { label: 'Healthcare / Medical', revenueMultiple: [0.5, 1.0], sdeMultiple: [2, 4], ebitdaMultiple: [5, 8] },
  manufacturing: { label: 'Manufacturing', revenueMultiple: [0.4, 0.7], sdeMultiple: [2, 4], ebitdaMultiple: [4, 6] },
  construction: { label: 'Construction / Contracting', revenueMultiple: [0.2, 0.5], sdeMultiple: [1.5, 3], ebitdaMultiple: [3, 5] },
  technology: { label: 'Technology / SaaS', revenueMultiple: [1, 5], sdeMultiple: [3, 6], ebitdaMultiple: [8, 15] },
  transportation: { label: 'Transportation / Trucking', revenueMultiple: [0.3, 0.6], sdeMultiple: [2, 3], ebitdaMultiple: [4, 6] },
  wholesale: { label: 'Wholesale / Distribution', revenueMultiple: [0.2, 0.4], sdeMultiple: [2, 3], ebitdaMultiple: [4, 5] },
  ecommerce: { label: 'E-commerce', revenueMultiple: [0.5, 2], sdeMultiple: [2, 4], ebitdaMultiple: [4, 8] },
  'auto-services': { label: 'Auto Services', revenueMultiple: [0.3, 0.5], sdeMultiple: [2, 3], ebitdaMultiple: [3, 5] },
  beauty: { label: 'Beauty / Personal Care', revenueMultiple: [0.3, 0.5], sdeMultiple: [1.5, 2.5], ebitdaMultiple: [3, 4] },
}

const industryKeys = Object.keys(industries) as IndustryKey[]

/* ------------------------------------------------------------------ */
/*  Helpers                                                            */
/* ------------------------------------------------------------------ */

const fmt = (n: number) => {
  if (n < 0) return `-$${Math.round(Math.abs(n)).toLocaleString()}`
  if (n >= 1_000_000) return `$${(n / 1_000_000).toFixed(n % 1_000_000 === 0 ? 0 : 1)}M`
  return `$${Math.round(n).toLocaleString()}`
}

const pct = (n: number) => `${n.toFixed(1)}%`

function adjustMultiple(base: [number, number], yearsInBusiness: number, trend: RevenueTrend, concentration: CustomerConcentration, ownerDep: OwnerDependency, recurringPct: number): [number, number] {
  let adj = 0
  if (yearsInBusiness < 3) adj -= 0.5
  if (yearsInBusiness > 10) adj += 0.3
  if (trend === 'declining') adj -= 0.5
  if (trend === 'growing') adj += 0.5
  if (concentration === 'high') adj -= 0.3
  if (ownerDep === 'high') adj -= 0.5
  if (recurringPct > 50) adj += 0.5
  return [Math.max(0.1, base[0] + adj), Math.max(0.2, base[1] + adj)]
}

/* ------------------------------------------------------------------ */
/*  CurrencyInput                                                      */
/* ------------------------------------------------------------------ */

function CurrencyInput({ label, value, onChange, hint }: { label: string; value: number; onChange: (v: number) => void; hint?: string }) {
  return (
    <div>
      <label className="block text-sm font-medium text-gray-700 mb-1">{label}</label>
      <div className="relative">
        <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 text-sm">$</span>
        <input
          type="text"
          inputMode="numeric"
          className="w-full pl-7 pr-3 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-quicklend-500 focus:border-quicklend-500 text-sm"
          value={value === 0 ? '' : value.toLocaleString()}
          onChange={(e) => {
            const raw = e.target.value.replace(/[^0-9]/g, '')
            onChange(raw ? parseInt(raw, 10) : 0)
          }}
          placeholder="0"
        />
      </div>
      {hint && <p className="text-xs text-gray-500 mt-1">{hint}</p>}
    </div>
  )
}

/* ------------------------------------------------------------------ */
/*  Component                                                          */
/* ------------------------------------------------------------------ */

export default function BusinessValuationTool() {
  // Step state
  const [step, setStep] = useState(1)

  // Step 1: Business info
  const [industry, setIndustry] = useState<IndustryKey>('professional-services')
  const [yearsInBusiness, setYearsInBusiness] = useState(5)
  const [annualRevenue, setAnnualRevenue] = useState(500000)
  const [revenueTrend, setRevenueTrend] = useState<RevenueTrend>('stable')

  // Step 2: Profitability
  const [netProfit, setNetProfit] = useState(85000)
  const [ownerSalary, setOwnerSalary] = useState(120000)
  const [ownerBenefits, setOwnerBenefits] = useState(15000)
  const [interestExpense, setInterestExpense] = useState(0)
  const [depreciation, setDepreciation] = useState(0)
  const [amortization, setAmortization] = useState(0)
  const [nonRecurring, setNonRecurring] = useState(0)
  const [personalExpenses, setPersonalExpenses] = useState(0)

  // Step 3: Assets
  const [cashEquivalents, setCashEquivalents] = useState(0)
  const [accountsReceivable, setAccountsReceivable] = useState(0)
  const [inventory, setInventory] = useState(0)
  const [equipmentVehicles, setEquipmentVehicles] = useState(0)
  const [realEstate, setRealEstate] = useState(0)
  const [otherAssets, setOtherAssets] = useState(0)
  const [totalLiabilities, setTotalLiabilities] = useState(0)

  // Step 4: Adjustments
  const [customerConcentration, setCustomerConcentration] = useState<CustomerConcentration>('low')
  const [ownerDependency, setOwnerDependency] = useState<OwnerDependency>('moderate')
  const [recurringRevenuePct, setRecurringRevenuePct] = useState(10)

  // Results
  const [showResults, setShowResults] = useState(false)
  const [expandedMethod, setExpandedMethod] = useState<string | null>(null)

  /* ---- Calculations ---- */

  const ind = industries[industry]

  // SDE
  const sde = netProfit + ownerSalary + ownerBenefits + nonRecurring + personalExpenses

  // EBITDA
  const ebitda = netProfit + interestExpense + depreciation + amortization

  // Asset-based
  const totalAssets = cashEquivalents + accountsReceivable + inventory + equipmentVehicles + realEstate + otherAssets
  const assetValue = totalAssets - totalLiabilities

  // Adjusted multiples
  const adjRevenue = adjustMultiple(ind.revenueMultiple, yearsInBusiness, revenueTrend, customerConcentration, ownerDependency, recurringRevenuePct)
  const adjSDE = adjustMultiple(ind.sdeMultiple, yearsInBusiness, revenueTrend, customerConcentration, ownerDependency, recurringRevenuePct)
  const adjEBITDA = adjustMultiple(ind.ebitdaMultiple, yearsInBusiness, revenueTrend, customerConcentration, ownerDependency, recurringRevenuePct)

  // Valuations
  const revenueVal: [number, number] = [annualRevenue * adjRevenue[0], annualRevenue * adjRevenue[1]]
  const sdeVal: [number, number] = [sde * adjSDE[0], sde * adjSDE[1]]
  const ebitdaVal: [number, number] = [ebitda * adjEBITDA[0], ebitda * adjEBITDA[1]]
  const assetVal: [number, number] = [assetValue, assetValue]

  // Most relevant method
  const recommendedMethod = annualRevenue < 2_000_000 ? 'sde' : 'ebitda'

  // Overall range (from SDE or EBITDA based on recommendation)
  const primaryRange = recommendedMethod === 'sde' ? sdeVal : ebitdaVal
  const midpoint = (primaryRange[0] + primaryRange[1]) / 2

  // Value factors
  const positiveFactors: { label: string; impact: string }[] = []
  const riskFactors: { label: string; impact: string }[] = []

  if (yearsInBusiness >= 10) positiveFactors.push({ label: '10+ years in business', impact: '+5% to 15%' })
  else if (yearsInBusiness >= 5) positiveFactors.push({ label: '5+ years in business', impact: '+5% to 10%' })
  if (revenueTrend === 'growing') positiveFactors.push({ label: 'Growing revenue', impact: '+10% to 20%' })
  if (ownerDependency === 'low') positiveFactors.push({ label: 'Low owner dependency', impact: '+10% to 20%' })
  if (recurringRevenuePct > 50) positiveFactors.push({ label: `${recurringRevenuePct}% recurring revenue`, impact: '+10% to 20%' })
  if (customerConcentration === 'low') positiveFactors.push({ label: 'Diversified customer base', impact: '+5% to 10%' })

  if (yearsInBusiness < 3) riskFactors.push({ label: 'Less than 3 years in business', impact: '-10% to 20%' })
  if (revenueTrend === 'declining') riskFactors.push({ label: 'Declining revenue', impact: '-10% to 20%' })
  if (ownerDependency === 'high') riskFactors.push({ label: 'High owner dependency', impact: '-10% to 20%' })
  if (customerConcentration === 'high') riskFactors.push({ label: 'High customer concentration', impact: '-10% to 15%' })
  if (recurringRevenuePct < 10) riskFactors.push({ label: 'Little recurring revenue', impact: '-5% to 10%' })

  function handleCalculate() {
    setShowResults(true)
    setExpandedMethod(null)
  }

  /* ---- Step nav ---- */
  const stepLabels = ['Business Info', 'Profitability', 'Assets', 'Adjustments']

  /* ---- Render ---- */
  return (
    <div className="space-y-6">
      {/* Progress bar */}
      {!showResults && (
        <div className="space-y-3">
          <div className="flex justify-between text-xs font-medium text-gray-500">
            {stepLabels.map((label, i) => (
              <button
                key={label}
                onClick={() => setStep(i + 1)}
                className={`transition-colors ${step === i + 1 ? 'text-quicklend-700 font-semibold' : step > i + 1 ? 'text-green-600' : 'text-gray-400'}`}
              >
                {step > i + 1 ? <span className="inline-flex items-center gap-0.5"><CheckCircle className="w-3.5 h-3.5" /> {label}</span> : `${i + 1}. ${label}`}
              </button>
            ))}
          </div>
          <div className="w-full bg-gray-200 rounded-full h-2">
            <div
              className="bg-quicklend-600 h-2 rounded-full transition-all duration-300"
              style={{ width: `${(step / 4) * 100}%` }}
            />
          </div>
        </div>
      )}

      {/* ====================== STEP 1 ====================== */}
      {!showResults && step === 1 && (
        <div className="space-y-5">
          <h3 className="text-lg font-bold text-quicklend-900">Business Information</h3>

          {/* Industry */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Industry</label>
            <select
              className="w-full px-3 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-quicklend-500 focus:border-quicklend-500 text-sm bg-white"
              value={industry}
              onChange={(e) => setIndustry(e.target.value as IndustryKey)}
            >
              {industryKeys.map((k) => (
                <option key={k} value={k}>{industries[k].label}</option>
              ))}
            </select>
          </div>

          {/* Years in business */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Years in Business</label>
            <input
              type="number"
              min={0}
              max={100}
              className="w-full px-3 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-quicklend-500 focus:border-quicklend-500 text-sm"
              value={yearsInBusiness}
              onChange={(e) => setYearsInBusiness(Math.max(0, parseInt(e.target.value) || 0))}
            />
          </div>

          {/* Annual revenue */}
          <CurrencyInput label="Annual Revenue (Last 12 Months)" value={annualRevenue} onChange={setAnnualRevenue} />

          {/* Revenue trend */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Revenue Trend</label>
            <div className="flex gap-2">
              {([['growing', 'Growing', TrendingUp], ['stable', 'Stable', Minus], ['declining', 'Declining', TrendingDown]] as const).map(([val, label, Icon]) => (
                <button
                  key={val}
                  onClick={() => setRevenueTrend(val)}
                  className={`flex-1 flex items-center justify-center gap-1.5 py-2.5 px-3 rounded-lg border text-sm font-medium transition-all ${
                    revenueTrend === val
                      ? val === 'growing' ? 'bg-green-50 border-green-300 text-green-700' : val === 'declining' ? 'bg-red-50 border-red-300 text-red-700' : 'bg-quicklend-50 border-quicklend-300 text-quicklend-700'
                      : 'bg-white border-gray-200 text-gray-600 hover:border-gray-300'
                  }`}
                >
                  <Icon className="w-4 h-4" /> {label}
                </button>
              ))}
            </div>
          </div>

          <button
            onClick={() => setStep(2)}
            className="w-full py-3 bg-quicklend-700 text-white font-semibold rounded-lg hover:bg-quicklend-800 transition-colors flex items-center justify-center gap-2"
          >
            Next: Profitability <ChevronRight className="w-4 h-4" />
          </button>
        </div>
      )}

      {/* ====================== STEP 2 ====================== */}
      {!showResults && step === 2 && (
        <div className="space-y-5">
          <h3 className="text-lg font-bold text-quicklend-900">Profitability</h3>
          <p className="text-sm text-gray-600">These numbers power the SDE and EBITDA calculations. Enter what you know; leave the rest at zero.</p>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <CurrencyInput label="Net Profit (Annual)" value={netProfit} onChange={setNetProfit} hint="After all expenses, from your P&L" />
            <CurrencyInput label="Owner's Salary" value={ownerSalary} onChange={setOwnerSalary} hint="What you pay yourself annually" />
            <CurrencyInput label="Owner's Benefits" value={ownerBenefits} onChange={setOwnerBenefits} hint="Health insurance, vehicle, etc." />
            <CurrencyInput label="Interest Expense" value={interestExpense} onChange={setInterestExpense} hint="Annual loan interest payments" />
            <CurrencyInput label="Depreciation" value={depreciation} onChange={setDepreciation} hint="From your tax return or P&L" />
            <CurrencyInput label="Amortization" value={amortization} onChange={setAmortization} hint="Intangible asset amortization" />
            <CurrencyInput label="Non-recurring Expenses" value={nonRecurring} onChange={setNonRecurring} hint="One-time costs (lawsuit, move, etc.)" />
            <CurrencyInput label="Personal Expenses Through Business" value={personalExpenses} onChange={setPersonalExpenses} hint="That a buyer would not have" />
          </div>

          {/* SDE / EBITDA preview */}
          <div className="grid grid-cols-2 gap-3">
            <div className="bg-quicklend-50 border border-quicklend-200 rounded-lg p-3 text-center">
              <p className="text-xs text-quicklend-600 font-medium">Your SDE</p>
              <p className="text-lg font-bold text-quicklend-900">{fmt(sde)}</p>
            </div>
            <div className="bg-quicklend-50 border border-quicklend-200 rounded-lg p-3 text-center">
              <p className="text-xs text-quicklend-600 font-medium">Your EBITDA</p>
              <p className="text-lg font-bold text-quicklend-900">{fmt(ebitda)}</p>
            </div>
          </div>

          <div className="flex gap-3">
            <button onClick={() => setStep(1)} className="flex-1 py-3 border border-gray-300 text-gray-700 font-semibold rounded-lg hover:bg-gray-50 transition-colors">
              Back
            </button>
            <button onClick={() => setStep(3)} className="flex-1 py-3 bg-quicklend-700 text-white font-semibold rounded-lg hover:bg-quicklend-800 transition-colors flex items-center justify-center gap-2">
              Next: Assets <ChevronRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      )}

      {/* ====================== STEP 3 ====================== */}
      {!showResults && step === 3 && (
        <div className="space-y-5">
          <h3 className="text-lg font-bold text-quicklend-900">Assets & Liabilities</h3>
          <p className="text-sm text-gray-600">For the asset-based valuation method. Enter fair market values. Skip any that do not apply.</p>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <CurrencyInput label="Cash & Equivalents" value={cashEquivalents} onChange={setCashEquivalents} hint="Bank accounts, money market" />
            <CurrencyInput label="Accounts Receivable" value={accountsReceivable} onChange={setAccountsReceivable} hint="Money owed to you" />
            <CurrencyInput label="Inventory" value={inventory} onChange={setInventory} hint="At cost or market value" />
            <CurrencyInput label="Equipment & Vehicles" value={equipmentVehicles} onChange={setEquipmentVehicles} hint="Fair market value" />
            <CurrencyInput label="Real Estate" value={realEstate} onChange={setRealEstate} hint="If owned by the business" />
            <CurrencyInput label="Other Assets" value={otherAssets} onChange={setOtherAssets} hint="IP, goodwill, other" />
          </div>

          <div className="border-t pt-4">
            <CurrencyInput label="Total Liabilities" value={totalLiabilities} onChange={setTotalLiabilities} hint="All debts and obligations" />
          </div>

          {/* Net assets preview */}
          <div className={`rounded-lg p-3 text-center border ${assetValue >= 0 ? 'bg-green-50 border-green-200' : 'bg-red-50 border-red-200'}`}>
            <p className="text-xs font-medium text-gray-600">Net Asset Value</p>
            <p className={`text-lg font-bold ${assetValue >= 0 ? 'text-green-700' : 'text-red-700'}`}>{fmt(assetValue)}</p>
          </div>

          <div className="flex gap-3">
            <button onClick={() => setStep(2)} className="flex-1 py-3 border border-gray-300 text-gray-700 font-semibold rounded-lg hover:bg-gray-50 transition-colors">
              Back
            </button>
            <button onClick={() => setStep(4)} className="flex-1 py-3 bg-quicklend-700 text-white font-semibold rounded-lg hover:bg-quicklend-800 transition-colors flex items-center justify-center gap-2">
              Next: Adjustments <ChevronRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      )}

      {/* ====================== STEP 4 ====================== */}
      {!showResults && step === 4 && (
        <div className="space-y-5">
          <h3 className="text-lg font-bold text-quicklend-900">Value Adjustments</h3>
          <p className="text-sm text-gray-600">These factors adjust your valuation multiples up or down from industry benchmarks.</p>

          {/* Customer concentration */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Customer Concentration</label>
            <p className="text-xs text-gray-500 mb-2">How much of your revenue comes from your single largest customer?</p>
            <div className="flex gap-2">
              {([['low', 'Low (under 20%)'], ['moderate', 'Moderate (20-40%)'], ['high', 'High (over 40%)']] as const).map(([val, label]) => (
                <button
                  key={val}
                  onClick={() => setCustomerConcentration(val)}
                  className={`flex-1 py-2.5 px-2 rounded-lg border text-xs sm:text-sm font-medium transition-all ${
                    customerConcentration === val
                      ? val === 'low' ? 'bg-green-50 border-green-300 text-green-700' : val === 'high' ? 'bg-red-50 border-red-300 text-red-700' : 'bg-amber-50 border-amber-300 text-amber-700'
                      : 'bg-white border-gray-200 text-gray-600 hover:border-gray-300'
                  }`}
                >
                  {label}
                </button>
              ))}
            </div>
          </div>

          {/* Owner dependency */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Owner Dependency</label>
            <p className="text-xs text-gray-500 mb-2">Could the business operate without you for 3+ months?</p>
            <div className="flex gap-2">
              {([['low', 'Low (has managers)'], ['moderate', 'Moderate (involved)'], ['high', 'High (critical)']] as const).map(([val, label]) => (
                <button
                  key={val}
                  onClick={() => setOwnerDependency(val)}
                  className={`flex-1 py-2.5 px-2 rounded-lg border text-xs sm:text-sm font-medium transition-all ${
                    ownerDependency === val
                      ? val === 'low' ? 'bg-green-50 border-green-300 text-green-700' : val === 'high' ? 'bg-red-50 border-red-300 text-red-700' : 'bg-amber-50 border-amber-300 text-amber-700'
                      : 'bg-white border-gray-200 text-gray-600 hover:border-gray-300'
                  }`}
                >
                  {label}
                </button>
              ))}
            </div>
          </div>

          {/* Recurring revenue */}
          <div>
            <div className="flex justify-between items-center mb-1">
              <label className="text-sm font-medium text-gray-700">Recurring Revenue</label>
              <span className="text-sm font-semibold text-quicklend-700">{recurringRevenuePct}%</span>
            </div>
            <p className="text-xs text-gray-500 mb-2">Percentage from contracts, subscriptions, or retainers</p>
            <input
              type="range"
              min={0}
              max={100}
              step={5}
              value={recurringRevenuePct}
              onChange={(e) => setRecurringRevenuePct(parseInt(e.target.value))}
              className="w-full accent-quicklend-600"
            />
            <div className="flex justify-between text-xs text-gray-400 mt-1">
              <span>0%</span>
              <span>50%</span>
              <span>100%</span>
            </div>
          </div>

          <div className="flex gap-3">
            <button onClick={() => setStep(3)} className="flex-1 py-3 border border-gray-300 text-gray-700 font-semibold rounded-lg hover:bg-gray-50 transition-colors">
              Back
            </button>
            <button onClick={handleCalculate} className="flex-1 py-3 bg-quicklend-700 text-white font-semibold rounded-lg hover:bg-quicklend-800 transition-colors">
              Calculate Valuation
            </button>
          </div>
        </div>
      )}

      {/* ====================== RESULTS ====================== */}
      {showResults && (
        <div className="space-y-6">
          {/* Back to edit */}
          <button
            onClick={() => { setShowResults(false); setStep(1) }}
            className="text-sm text-quicklend-600 hover:text-quicklend-800 font-medium"
          >
            &larr; Edit inputs
          </button>

          {/* Primary valuation range */}
          <div className="bg-quicklend-900 text-white rounded-xl p-6 text-center">
            <p className="text-sm text-quicklend-200 mb-1">Estimated Business Value</p>
            <p className="text-3xl sm:text-4xl font-bold mb-2">
              {fmt(primaryRange[0])} &ndash; {fmt(primaryRange[1])}
            </p>
            <p className="text-sm text-quicklend-300">
              Based on {recommendedMethod === 'sde' ? 'SDE' : 'EBITDA'} multiple for {ind.label}
            </p>
          </div>

          {/* Method comparison table */}
          <div className="bg-white border border-gray-200 rounded-xl overflow-hidden">
            <div className="px-4 py-3 bg-gray-50 border-b">
              <h4 className="text-sm font-bold text-quicklend-900">Valuation by Method</h4>
            </div>
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b bg-gray-50/50">
                    <th className="text-left px-4 py-2 font-medium text-gray-600">Method</th>
                    <th className="text-right px-4 py-2 font-medium text-gray-600">Low</th>
                    <th className="text-right px-4 py-2 font-medium text-gray-600">Mid</th>
                    <th className="text-right px-4 py-2 font-medium text-gray-600">High</th>
                  </tr>
                </thead>
                <tbody>
                  {[
                    { key: 'revenue', label: 'Revenue Multiple', val: revenueVal, recommended: false },
                    { key: 'sde', label: 'SDE Multiple', val: sdeVal, recommended: recommendedMethod === 'sde' },
                    { key: 'ebitda', label: 'EBITDA Multiple', val: ebitdaVal, recommended: recommendedMethod === 'ebitda' },
                    { key: 'asset', label: 'Asset-Based', val: assetVal, recommended: false },
                  ].map(({ key, label, val, recommended }) => (
                    <tr key={key} className={`border-b last:border-0 ${recommended ? 'bg-quicklend-50' : ''}`}>
                      <td className="px-4 py-3 font-medium text-gray-900 flex items-center gap-2">
                        {label}
                        {recommended && <span className="text-[10px] bg-quicklend-700 text-white px-1.5 py-0.5 rounded-full font-semibold">RECOMMENDED</span>}
                      </td>
                      <td className="text-right px-4 py-3 text-gray-700">{fmt(val[0])}</td>
                      <td className="text-right px-4 py-3 font-semibold text-quicklend-900">{fmt((val[0] + val[1]) / 2)}</td>
                      <td className="text-right px-4 py-3 text-gray-700">{fmt(val[1])}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          {/* Visual comparison bar */}
          <div className="space-y-3">
            <h4 className="text-sm font-bold text-quicklend-900">Visual Comparison</h4>
            {[
              { label: 'Revenue Multiple', val: revenueVal, color: 'bg-blue-500' },
              { label: 'SDE Multiple', val: sdeVal, color: 'bg-quicklend-600' },
              { label: 'EBITDA Multiple', val: ebitdaVal, color: 'bg-amber-500' },
              { label: 'Asset-Based', val: assetVal, color: 'bg-gray-500' },
            ].map(({ label, val, color }) => {
              const maxVal = Math.max(revenueVal[1], sdeVal[1], ebitdaVal[1], Math.max(0, assetVal[1]), 1)
              const lowPct = Math.max(0, (val[0] / maxVal) * 100)
              const highPct = Math.max(0, (val[1] / maxVal) * 100)
              return (
                <div key={label}>
                  <div className="flex justify-between text-xs text-gray-600 mb-1">
                    <span>{label}</span>
                    <span>{fmt(val[0])} &ndash; {fmt(val[1])}</span>
                  </div>
                  <div className="w-full bg-gray-100 rounded-full h-4 relative overflow-hidden">
                    <div
                      className={`absolute top-0 h-4 rounded-full ${color} opacity-60`}
                      style={{ left: `${lowPct * 0.5}%`, width: `${Math.max(1, highPct - lowPct * 0.5)}%` }}
                    />
                  </div>
                </div>
              )
            })}
          </div>

          {/* Expandable calculation breakdowns */}
          <div className="space-y-3">
            <h4 className="text-sm font-bold text-quicklend-900">Calculation Breakdowns</h4>

            {/* SDE breakdown */}
            <div className="border border-gray-200 rounded-lg overflow-hidden">
              <button
                onClick={() => setExpandedMethod(expandedMethod === 'sde' ? null : 'sde')}
                className="w-full flex items-center justify-between px-4 py-3 bg-gray-50 hover:bg-gray-100 transition-colors"
              >
                <span className="text-sm font-semibold text-quicklend-900">SDE Calculation</span>
                <ChevronRight className={`w-4 h-4 text-gray-400 transition-transform ${expandedMethod === 'sde' ? 'rotate-90' : ''}`} />
              </button>
              {expandedMethod === 'sde' && (
                <div className="px-4 py-3 space-y-2 text-sm">
                  <div className="flex justify-between"><span className="text-gray-600">Net Profit</span><span className="font-medium">{fmt(netProfit)}</span></div>
                  <div className="flex justify-between"><span className="text-gray-600">+ Owner&apos;s Salary</span><span className="font-medium">{fmt(ownerSalary)}</span></div>
                  <div className="flex justify-between"><span className="text-gray-600">+ Owner&apos;s Benefits</span><span className="font-medium">{fmt(ownerBenefits)}</span></div>
                  {nonRecurring > 0 && <div className="flex justify-between"><span className="text-gray-600">+ Non-recurring Expenses</span><span className="font-medium">{fmt(nonRecurring)}</span></div>}
                  {personalExpenses > 0 && <div className="flex justify-between"><span className="text-gray-600">+ Personal Expenses</span><span className="font-medium">{fmt(personalExpenses)}</span></div>}
                  <div className="border-t pt-2 flex justify-between font-bold"><span>Total SDE</span><span className="text-quicklend-700">{fmt(sde)}</span></div>
                  <div className="mt-2 pt-2 border-t space-y-1">
                    <div className="flex justify-between text-gray-600"><span>Industry Multiple Range</span><span>{ind.sdeMultiple[0].toFixed(1)}x &ndash; {ind.sdeMultiple[1].toFixed(1)}x</span></div>
                    <div className="flex justify-between text-gray-600"><span>Your Adjusted Multiple</span><span className="font-medium text-quicklend-700">{adjSDE[0].toFixed(1)}x &ndash; {adjSDE[1].toFixed(1)}x</span></div>
                    <div className="flex justify-between font-bold text-quicklend-900 pt-1"><span>SDE Valuation</span><span>{fmt(sdeVal[0])} &ndash; {fmt(sdeVal[1])}</span></div>
                  </div>
                </div>
              )}
            </div>

            {/* EBITDA breakdown */}
            <div className="border border-gray-200 rounded-lg overflow-hidden">
              <button
                onClick={() => setExpandedMethod(expandedMethod === 'ebitda' ? null : 'ebitda')}
                className="w-full flex items-center justify-between px-4 py-3 bg-gray-50 hover:bg-gray-100 transition-colors"
              >
                <span className="text-sm font-semibold text-quicklend-900">EBITDA Calculation</span>
                <ChevronRight className={`w-4 h-4 text-gray-400 transition-transform ${expandedMethod === 'ebitda' ? 'rotate-90' : ''}`} />
              </button>
              {expandedMethod === 'ebitda' && (
                <div className="px-4 py-3 space-y-2 text-sm">
                  <div className="flex justify-between"><span className="text-gray-600">Net Profit</span><span className="font-medium">{fmt(netProfit)}</span></div>
                  {interestExpense > 0 && <div className="flex justify-between"><span className="text-gray-600">+ Interest Expense</span><span className="font-medium">{fmt(interestExpense)}</span></div>}
                  {depreciation > 0 && <div className="flex justify-between"><span className="text-gray-600">+ Depreciation</span><span className="font-medium">{fmt(depreciation)}</span></div>}
                  {amortization > 0 && <div className="flex justify-between"><span className="text-gray-600">+ Amortization</span><span className="font-medium">{fmt(amortization)}</span></div>}
                  <div className="border-t pt-2 flex justify-between font-bold"><span>Total EBITDA</span><span className="text-quicklend-700">{fmt(ebitda)}</span></div>
                  <div className="mt-2 pt-2 border-t space-y-1">
                    <div className="flex justify-between text-gray-600"><span>Industry Multiple Range</span><span>{ind.ebitdaMultiple[0].toFixed(1)}x &ndash; {ind.ebitdaMultiple[1].toFixed(1)}x</span></div>
                    <div className="flex justify-between text-gray-600"><span>Your Adjusted Multiple</span><span className="font-medium text-quicklend-700">{adjEBITDA[0].toFixed(1)}x &ndash; {adjEBITDA[1].toFixed(1)}x</span></div>
                    <div className="flex justify-between font-bold text-quicklend-900 pt-1"><span>EBITDA Valuation</span><span>{fmt(ebitdaVal[0])} &ndash; {fmt(ebitdaVal[1])}</span></div>
                  </div>
                </div>
              )}
            </div>

            {/* Revenue multiple breakdown */}
            <div className="border border-gray-200 rounded-lg overflow-hidden">
              <button
                onClick={() => setExpandedMethod(expandedMethod === 'revenue' ? null : 'revenue')}
                className="w-full flex items-center justify-between px-4 py-3 bg-gray-50 hover:bg-gray-100 transition-colors"
              >
                <span className="text-sm font-semibold text-quicklend-900">Revenue Multiple</span>
                <ChevronRight className={`w-4 h-4 text-gray-400 transition-transform ${expandedMethod === 'revenue' ? 'rotate-90' : ''}`} />
              </button>
              {expandedMethod === 'revenue' && (
                <div className="px-4 py-3 space-y-2 text-sm">
                  <div className="flex justify-between"><span className="text-gray-600">Annual Revenue</span><span className="font-medium">{fmt(annualRevenue)}</span></div>
                  <div className="flex justify-between text-gray-600"><span>Industry Multiple Range</span><span>{ind.revenueMultiple[0].toFixed(1)}x &ndash; {ind.revenueMultiple[1].toFixed(1)}x</span></div>
                  <div className="flex justify-between text-gray-600"><span>Your Adjusted Multiple</span><span className="font-medium text-quicklend-700">{adjRevenue[0].toFixed(1)}x &ndash; {adjRevenue[1].toFixed(1)}x</span></div>
                  <div className="border-t pt-2 flex justify-between font-bold text-quicklend-900"><span>Revenue Valuation</span><span>{fmt(revenueVal[0])} &ndash; {fmt(revenueVal[1])}</span></div>
                </div>
              )}
            </div>

            {/* Asset-based breakdown */}
            <div className="border border-gray-200 rounded-lg overflow-hidden">
              <button
                onClick={() => setExpandedMethod(expandedMethod === 'asset' ? null : 'asset')}
                className="w-full flex items-center justify-between px-4 py-3 bg-gray-50 hover:bg-gray-100 transition-colors"
              >
                <span className="text-sm font-semibold text-quicklend-900">Asset-Based Valuation</span>
                <ChevronRight className={`w-4 h-4 text-gray-400 transition-transform ${expandedMethod === 'asset' ? 'rotate-90' : ''}`} />
              </button>
              {expandedMethod === 'asset' && (
                <div className="px-4 py-3 space-y-2 text-sm">
                  {cashEquivalents > 0 && <div className="flex justify-between"><span className="text-gray-600">Cash & Equivalents</span><span className="font-medium">{fmt(cashEquivalents)}</span></div>}
                  {accountsReceivable > 0 && <div className="flex justify-between"><span className="text-gray-600">Accounts Receivable</span><span className="font-medium">{fmt(accountsReceivable)}</span></div>}
                  {inventory > 0 && <div className="flex justify-between"><span className="text-gray-600">Inventory</span><span className="font-medium">{fmt(inventory)}</span></div>}
                  {equipmentVehicles > 0 && <div className="flex justify-between"><span className="text-gray-600">Equipment & Vehicles</span><span className="font-medium">{fmt(equipmentVehicles)}</span></div>}
                  {realEstate > 0 && <div className="flex justify-between"><span className="text-gray-600">Real Estate</span><span className="font-medium">{fmt(realEstate)}</span></div>}
                  {otherAssets > 0 && <div className="flex justify-between"><span className="text-gray-600">Other Assets</span><span className="font-medium">{fmt(otherAssets)}</span></div>}
                  <div className="border-t pt-2 flex justify-between font-bold"><span>Total Assets</span><span>{fmt(totalAssets)}</span></div>
                  <div className="flex justify-between text-red-600"><span>- Total Liabilities</span><span>{fmt(totalLiabilities)}</span></div>
                  <div className="border-t pt-2 flex justify-between font-bold text-quicklend-900"><span>Net Asset Value</span><span>{fmt(assetValue)}</span></div>
                  {totalAssets === 0 && <p className="text-xs text-gray-500 italic">No assets entered. Go back to Step 3 to add your business assets.</p>}
                </div>
              )}
            </div>
          </div>

          {/* Value factors */}
          {(positiveFactors.length > 0 || riskFactors.length > 0) && (
            <div className="bg-white border border-gray-200 rounded-xl p-5 space-y-4">
              <h4 className="text-sm font-bold text-quicklend-900">Factors Affecting Your Valuation</h4>

              {positiveFactors.length > 0 && (
                <div className="space-y-2">
                  <p className="text-xs font-semibold text-green-700 uppercase tracking-wide">Positive Factors</p>
                  {positiveFactors.map((f) => (
                    <div key={f.label} className="flex items-center justify-between text-sm">
                      <span className="flex items-center gap-2 text-gray-700"><CheckCircle className="w-4 h-4 text-green-500" /> {f.label}</span>
                      <span className="text-green-700 font-medium">{f.impact}</span>
                    </div>
                  ))}
                </div>
              )}

              {riskFactors.length > 0 && (
                <div className="space-y-2">
                  <p className="text-xs font-semibold text-amber-700 uppercase tracking-wide">Risk Factors</p>
                  {riskFactors.map((f) => (
                    <div key={f.label} className="flex items-center justify-between text-sm">
                      <span className="flex items-center gap-2 text-gray-700"><AlertTriangle className="w-4 h-4 text-amber-500" /> {f.label}</span>
                      <span className="text-red-600 font-medium">{f.impact}</span>
                    </div>
                  ))}
                </div>
              )}
            </div>
          )}

          {/* Tips to increase value */}
          <div className="bg-amber-50 border border-amber-200 rounded-xl p-5">
            <h4 className="text-sm font-bold text-amber-900 mb-3">Ways to Increase Value Before Selling</h4>
            <ul className="space-y-2 text-sm text-amber-800">
              <li className="flex gap-2"><span className="text-amber-500 font-bold mt-0.5">1.</span> Reduce customer concentration. No single customer should be more than 15% to 20% of revenue.</li>
              <li className="flex gap-2"><span className="text-amber-500 font-bold mt-0.5">2.</span> Document processes and train managers so the business can run without you.</li>
              <li className="flex gap-2"><span className="text-amber-500 font-bold mt-0.5">3.</span> Secure long-term contracts or subscription revenue for predictable cash flow.</li>
              <li className="flex gap-2"><span className="text-amber-500 font-bold mt-0.5">4.</span> Clean up financials: separate personal expenses, resolve outstanding debts.</li>
              <li className="flex gap-2"><span className="text-amber-500 font-bold mt-0.5">5.</span> Invest in growth. A business growing 20%+ per year commands a premium multiple.</li>
            </ul>
          </div>

          {/* Industry multiples reference */}
          <div className="border border-gray-200 rounded-xl overflow-hidden">
            <button
              onClick={() => setExpandedMethod(expandedMethod === 'reference' ? null : 'reference')}
              className="w-full flex items-center justify-between px-4 py-3 bg-gray-50 hover:bg-gray-100 transition-colors"
            >
              <span className="text-sm font-bold text-quicklend-900">Industry Multiples Reference</span>
              <ChevronRight className={`w-4 h-4 text-gray-400 transition-transform ${expandedMethod === 'reference' ? 'rotate-90' : ''}`} />
            </button>
            {expandedMethod === 'reference' && (
              <div className="overflow-x-auto">
                <table className="w-full text-xs sm:text-sm">
                  <thead>
                    <tr className="border-b bg-gray-50/50">
                      <th className="text-left px-3 py-2 font-medium text-gray-600">Industry</th>
                      <th className="text-right px-3 py-2 font-medium text-gray-600">Revenue</th>
                      <th className="text-right px-3 py-2 font-medium text-gray-600">SDE</th>
                      <th className="text-right px-3 py-2 font-medium text-gray-600">EBITDA</th>
                    </tr>
                  </thead>
                  <tbody>
                    {industryKeys.map((k) => {
                      const d = industries[k]
                      return (
                        <tr key={k} className={`border-b last:border-0 ${k === industry ? 'bg-quicklend-50 font-medium' : ''}`}>
                          <td className="px-3 py-2 text-gray-900">{d.label} {k === industry && <span className="text-[10px] text-quicklend-600">(yours)</span>}</td>
                          <td className="text-right px-3 py-2 text-gray-700">{d.revenueMultiple[0]}x&ndash;{d.revenueMultiple[1]}x</td>
                          <td className="text-right px-3 py-2 text-gray-700">{d.sdeMultiple[0]}x&ndash;{d.sdeMultiple[1]}x</td>
                          <td className="text-right px-3 py-2 text-gray-700">{d.ebitdaMultiple[0]}x&ndash;{d.ebitdaMultiple[1]}x</td>
                        </tr>
                      )
                    })}
                  </tbody>
                </table>
              </div>
            )}
          </div>

          {/* CTA */}
          <div className="bg-quicklend-50 border border-quicklend-200 rounded-xl p-5 text-center">
            <p className="text-sm font-semibold text-quicklend-900 mb-1">
              {midpoint > 500_000
                ? 'Planning an acquisition or exit?'
                : 'Need financing for growth or acquisition?'}
            </p>
            <p className="text-sm text-gray-600 mb-4">
              {midpoint > 500_000
                ? 'Get matched with lenders who specialize in business acquisition and ESOP financing.'
                : 'Talk to a funding specialist about term loans, SBA financing, or ESOP options.'}
            </p>
            <Link
              href={`/get-started?source=tool&tool=valuation&loan_type=${midpoint > 1_000_000 ? 'esop' : 'term-loans'}&amount=${Math.round(midpoint)}`}
              className="inline-block px-6 py-3 bg-quicklend-700 text-white font-semibold rounded-lg hover:bg-quicklend-800 transition-colors"
            >
              See Your Financing Options
            </Link>
          </div>
        </div>
      )}
    </div>
  )
}
