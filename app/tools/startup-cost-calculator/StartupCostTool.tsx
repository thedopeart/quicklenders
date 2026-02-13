'use client'

import { useState, useMemo } from 'react'
import Link from 'next/link'
import {
  ArrowRight,
  ChevronRight,
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

// ────────────────────────────────────────────────────────────────────
// Types & Data
// ────────────────────────────────────────────────────────────────────

interface ExpenseItem {
  label: string
  hint: string
  default: number
}

interface Category {
  id: string
  name: string
  shortName: string
  items: ExpenseItem[]
}

const categories: Category[] = [
  {
    id: 'legal',
    name: 'Legal & Administrative',
    shortName: 'Legal',
    items: [
      { label: 'Business Registration / Incorporation', hint: 'LLC, Corp filing fees', default: 500 },
      { label: 'Legal Fees', hint: 'Attorney for contracts, review', default: 1000 },
      { label: 'Accounting Setup', hint: 'Bookkeeping system, CPA', default: 500 },
      { label: 'Licenses & Permits', hint: 'Business license, industry permits', default: 500 },
      { label: 'Trademark / IP', hint: 'Optional', default: 0 },
    ],
  },
  {
    id: 'location',
    name: 'Location & Facilities',
    shortName: 'Location',
    items: [
      { label: 'Security Deposit', hint: 'Typically 1-3 months rent', default: 0 },
      { label: "First Month's Rent", hint: 'Skip if home-based', default: 0 },
      { label: 'Leasehold Improvements', hint: 'Build-out, renovations', default: 0 },
      { label: 'Furniture & Fixtures', hint: 'Desks, chairs, shelving', default: 2000 },
      { label: 'Signage', hint: 'Exterior and interior signs', default: 500 },
    ],
  },
  {
    id: 'equipment',
    name: 'Equipment & Technology',
    shortName: 'Equipment',
    items: [
      { label: 'Computers & Devices', hint: 'Laptops, tablets, phones', default: 2000 },
      { label: 'Software & Subscriptions', hint: 'First year of tools', default: 500 },
      { label: 'Specialized Equipment', hint: 'Industry-specific', default: 0 },
      { label: 'Point of Sale System', hint: 'If retail or food service', default: 0 },
      { label: 'Phone / Internet Setup', hint: 'Installation, first month', default: 300 },
    ],
  },
  {
    id: 'inventory',
    name: 'Inventory & Supplies',
    shortName: 'Inventory',
    items: [
      { label: 'Initial Inventory', hint: 'Products to sell', default: 0 },
      { label: 'Raw Materials', hint: 'Manufacturing inputs', default: 0 },
      { label: 'Office Supplies', hint: 'Paper, pens, basics', default: 500 },
      { label: 'Packaging Materials', hint: 'If shipping products', default: 0 },
    ],
  },
  {
    id: 'marketing',
    name: 'Marketing & Branding',
    shortName: 'Marketing',
    items: [
      { label: 'Logo & Brand Design', hint: 'Designer or DIY', default: 1000 },
      { label: 'Website Development', hint: 'Design and build', default: 2000 },
      { label: 'Initial Advertising', hint: 'Launch campaign', default: 1000 },
      { label: 'Business Cards & Print', hint: 'Collateral', default: 200 },
      { label: 'Grand Opening / Launch', hint: 'Optional event', default: 0 },
    ],
  },
  {
    id: 'staffing',
    name: 'Staffing (First 3 Months)',
    shortName: 'Staffing',
    items: [
      { label: 'Payroll (3 Months)', hint: 'If hiring employees', default: 0 },
      { label: 'Payroll Taxes & Benefits', hint: 'Typically 15-30% of payroll', default: 0 },
      { label: 'Recruiting Costs', hint: 'Job posts, background checks', default: 0 },
      { label: 'Training', hint: 'Onboarding costs', default: 0 },
    ],
  },
  {
    id: 'insurance',
    name: 'Insurance & Compliance',
    shortName: 'Insurance',
    items: [
      { label: 'General Liability Insurance', hint: 'Annual premium', default: 1000 },
      { label: 'Professional Liability', hint: 'If applicable', default: 0 },
      { label: "Workers' Comp", hint: 'If employees', default: 0 },
      { label: 'Property Insurance', hint: 'If physical location', default: 0 },
      { label: 'Other Required Insurance', hint: 'Industry-specific', default: 0 },
    ],
  },
  {
    id: 'reserve',
    name: 'Working Capital Reserve',
    shortName: 'Reserve',
    items: [
      { label: 'Operating Expenses Buffer', hint: '3-6 months recommended', default: 5000 },
      { label: 'Emergency Fund', hint: 'Unexpected costs', default: 2000 },
      { label: 'Personal Draw', hint: "Owner's living expenses if no salary", default: 0 },
    ],
  },
]

type TemplateKey = 'restaurant' | 'retail' | 'services' | 'ecommerce' | 'contractor' | 'home-based' | 'custom'

interface Template {
  label: string
  values: Record<string, number[]>
}

const templates: Record<TemplateKey, Template> = {
  restaurant: {
    label: 'Restaurant',
    values: {
      legal: [500, 2000, 1000, 2000, 0],
      location: [10000, 5000, 50000, 15000, 3000],
      equipment: [3000, 1500, 75000, 5000, 500],
      inventory: [10000, 5000, 500, 2000],
      marketing: [2000, 3000, 5000, 500, 2000],
      staffing: [30000, 7500, 2000, 3000],
      insurance: [3000, 0, 2000, 2000, 1000],
      reserve: [25000, 5000, 0],
    },
  },
  retail: {
    label: 'Retail Store',
    values: {
      legal: [500, 1000, 500, 1000, 500],
      location: [6000, 3000, 15000, 8000, 2000],
      equipment: [2000, 1000, 0, 3000, 300],
      inventory: [25000, 0, 500, 1000],
      marketing: [1500, 2500, 3000, 500, 1000],
      staffing: [15000, 3750, 500, 500],
      insurance: [1500, 0, 1000, 1000, 0],
      reserve: [15000, 3000, 0],
    },
  },
  services: {
    label: 'Professional Services',
    values: {
      legal: [500, 2000, 1000, 500, 1000],
      location: [3000, 1500, 2000, 5000, 500],
      equipment: [4000, 2000, 0, 0, 300],
      inventory: [0, 0, 500, 0],
      marketing: [2000, 5000, 2000, 300, 0],
      staffing: [0, 0, 0, 0],
      insurance: [1500, 2000, 0, 0, 0],
      reserve: [10000, 3000, 5000],
    },
  },
  ecommerce: {
    label: 'E-Commerce',
    values: {
      legal: [500, 500, 500, 500, 500],
      location: [0, 0, 0, 500, 0],
      equipment: [2000, 1500, 0, 0, 200],
      inventory: [10000, 0, 300, 2000],
      marketing: [1000, 3000, 3000, 0, 0],
      staffing: [0, 0, 0, 0],
      insurance: [1000, 0, 0, 0, 0],
      reserve: [5000, 2000, 0],
    },
  },
  contractor: {
    label: 'Contractor',
    values: {
      legal: [500, 1000, 500, 1500, 0],
      location: [0, 0, 0, 1000, 0],
      equipment: [2000, 500, 25000, 0, 300],
      inventory: [0, 5000, 500, 0],
      marketing: [1000, 2000, 1500, 300, 0],
      staffing: [15000, 3750, 500, 1000],
      insurance: [2000, 1000, 2000, 0, 2000],
      reserve: [15000, 5000, 5000],
    },
  },
  'home-based': {
    label: 'Home-Based',
    values: {
      legal: [300, 500, 300, 200, 0],
      location: [0, 0, 0, 500, 0],
      equipment: [1500, 500, 0, 0, 100],
      inventory: [0, 0, 200, 0],
      marketing: [500, 1500, 500, 100, 0],
      staffing: [0, 0, 0, 0],
      insurance: [500, 0, 0, 0, 0],
      reserve: [3000, 1000, 0],
    },
  },
  custom: {
    label: 'Custom',
    values: {
      legal: [500, 1000, 500, 500, 0],
      location: [0, 0, 0, 2000, 500],
      equipment: [2000, 500, 0, 0, 300],
      inventory: [0, 0, 500, 0],
      marketing: [1000, 2000, 1000, 200, 0],
      staffing: [0, 0, 0, 0],
      insurance: [1000, 0, 0, 0, 0],
      reserve: [5000, 2000, 0],
    },
  },
}

// ────────────────────────────────────────────────────────────────────
// Currency Input
// ────────────────────────────────────────────────────────────────────

function CurrencyInput({
  label,
  value,
  onChange,
  hint,
}: {
  label: string
  value: number
  onChange: (v: number) => void
  hint: string
}) {
  return (
    <div className="flex flex-col sm:flex-row sm:items-center gap-1 sm:gap-3">
      <div className="sm:flex-1 min-w-0">
        <p className="text-sm text-gray-700">{label}</p>
        <p className="text-xs text-gray-400">{hint}</p>
      </div>
      <div className="relative sm:w-40 shrink-0">
        <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500 text-sm">$</span>
        <input
          type="text"
          inputMode="numeric"
          value={formatInputDisplay(value)}
          onChange={(e) => {
            const num = parseCurrencyInput(e.target.value)
            if (num >= 0 && num <= 10000000) onChange(num)
          }}
          className="w-full rounded-lg border border-gray-300 px-3 py-2 pl-7 text-sm text-gray-900 text-right focus:border-quicklend-600 focus:ring-2 focus:ring-quicklend-600/20 focus:outline-none transition-colors"
          placeholder="0"
        />
      </div>
    </div>
  )
}

// ────────────────────────────────────────────────────────────────────
// Bar Chart
// ────────────────────────────────────────────────────────────────────

const categoryColors: Record<string, string> = {
  legal: 'bg-blue-500',
  location: 'bg-purple-500',
  equipment: 'bg-emerald-500',
  inventory: 'bg-amber-500',
  marketing: 'bg-rose-500',
  staffing: 'bg-cyan-500',
  insurance: 'bg-orange-500',
  reserve: 'bg-gray-500',
}

const categoryDotColors: Record<string, string> = {
  legal: 'bg-blue-500',
  location: 'bg-purple-500',
  equipment: 'bg-emerald-500',
  inventory: 'bg-amber-500',
  marketing: 'bg-rose-500',
  staffing: 'bg-cyan-500',
  insurance: 'bg-orange-500',
  reserve: 'bg-gray-500',
}

// ────────────────────────────────────────────────────────────────────
// Main Component
// ────────────────────────────────────────────────────────────────────

export default function StartupCostTool() {
  const [selectedTemplate, setSelectedTemplate] = useState<TemplateKey>('custom')
  const [openCategory, setOpenCategory] = useState<string>('legal')

  // Build initial state from defaults
  const buildInitialValues = (templateKey: TemplateKey) => {
    const tmpl = templates[templateKey]
    const vals: Record<string, number[]> = {}
    categories.forEach((cat) => {
      vals[cat.id] = tmpl.values[cat.id] || cat.items.map((item) => item.default)
    })
    return vals
  }

  const [values, setValues] = useState<Record<string, number[]>>(() => buildInitialValues('custom'))

  // Funding sources
  const [personalSavings, setPersonalSavings] = useState(20000)
  const [friendsFamily, setFriendsFamily] = useState(0)
  const [otherSources, setOtherSources] = useState(0)

  const applyTemplate = (key: TemplateKey) => {
    setSelectedTemplate(key)
    setValues(buildInitialValues(key))
  }

  const updateValue = (categoryId: string, itemIndex: number, newValue: number) => {
    setValues((prev) => {
      const updated = { ...prev }
      updated[categoryId] = [...(prev[categoryId] || [])]
      updated[categoryId][itemIndex] = newValue
      return updated
    })
  }

  // ── Calculations ──────────────────────────────────────────────────

  const results = useMemo(() => {
    const categoryTotals: { id: string; name: string; shortName: string; total: number }[] = []
    let grandTotal = 0

    categories.forEach((cat) => {
      const catValues = values[cat.id] || cat.items.map((i) => i.default)
      const total = catValues.reduce((sum, v) => sum + v, 0)
      categoryTotals.push({ id: cat.id, name: cat.name, shortName: cat.shortName, total })
      grandTotal += total
    })

    const withBuffer = Math.round(grandTotal * 1.2)
    const nonLoanSources = personalSavings + friendsFamily + otherSources
    const financingNeeded = Math.max(0, grandTotal - nonLoanSources)
    const financingWithBuffer = Math.max(0, withBuffer - nonLoanSources)

    // Lean launch: reduce reserve by 50%, reduce marketing by 50%, reduce equipment by 25%
    const leanTotal = categoryTotals.reduce((sum, cat) => {
      if (cat.id === 'reserve') return sum + Math.round(cat.total * 0.5)
      if (cat.id === 'marketing') return sum + Math.round(cat.total * 0.5)
      if (cat.id === 'equipment') return sum + Math.round(cat.total * 0.75)
      return sum + cat.total
    }, 0)

    // Comfortable: add 50% more reserve, 25% more equipment, 25% more marketing
    const comfortableTotal = categoryTotals.reduce((sum, cat) => {
      if (cat.id === 'reserve') return sum + Math.round(cat.total * 1.5)
      if (cat.id === 'marketing') return sum + Math.round(cat.total * 1.25)
      if (cat.id === 'equipment') return sum + Math.round(cat.total * 1.25)
      return sum + cat.total
    }, 0)

    const maxCategoryTotal = Math.max(...categoryTotals.map((c) => c.total), 1)

    return {
      categoryTotals,
      grandTotal,
      withBuffer,
      nonLoanSources,
      financingNeeded,
      financingWithBuffer,
      leanTotal,
      comfortableTotal,
      maxCategoryTotal,
      personalSavingsPct: grandTotal > 0 ? (personalSavings / grandTotal) * 100 : 0,
    }
  }, [values, personalSavings, friendsFamily, otherSources])

  return (
    <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
      {/* Intro */}
      <div className="p-6 sm:p-8 lg:p-10 pb-0">
        <p className="text-gray-700 leading-relaxed mb-2">
          Estimate your startup costs by walking through 8 common expense categories. Choose an industry template for realistic defaults, then adjust each line item to match your plans.
        </p>
        <p className="text-gray-500 text-sm mb-0">
          Costs are estimates based on national averages. Actual costs vary by location, scale, and industry requirements.
        </p>
      </div>

      {/* Industry Templates */}
      <div className="p-6 sm:p-8 lg:p-10 pb-0">
        <label className="block text-sm font-medium text-gray-700 mb-2">Start with an industry template (optional)</label>
        <div className="flex flex-wrap gap-2">
          {(Object.keys(templates) as TemplateKey[]).map((key) => (
            <button
              key={key}
              onClick={() => applyTemplate(key)}
              className={`px-3 py-1.5 rounded-full text-xs font-medium border transition-colors ${
                selectedTemplate === key
                  ? 'bg-quicklend-600 text-white border-quicklend-600'
                  : 'bg-white text-gray-600 border-gray-200 hover:border-quicklend-300'
              }`}
            >
              {templates[key].label}
            </button>
          ))}
        </div>
      </div>

      {/* Category Inputs + Running Total */}
      <div className="p-6 sm:p-8 lg:p-10">
        <div className="flex flex-col lg:flex-row gap-6">
          {/* Category Accordions */}
          <div className="flex-1 space-y-2">
            {categories.map((cat) => {
              const catValues = values[cat.id] || cat.items.map((i) => i.default)
              const catTotal = catValues.reduce((sum, v) => sum + v, 0)
              const isOpen = openCategory === cat.id

              return (
                <div key={cat.id} className="border border-gray-200 rounded-lg overflow-hidden">
                  <button
                    onClick={() => setOpenCategory(isOpen ? '' : cat.id)}
                    className="w-full flex items-center justify-between px-4 py-3 bg-gray-50 hover:bg-gray-100 transition-colors text-left"
                  >
                    <div className="flex items-center gap-2">
                      <span className={`w-2.5 h-2.5 rounded-full ${categoryDotColors[cat.id]}`} />
                      <span className="text-sm font-medium text-gray-900">{cat.name}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <span className="text-sm font-semibold text-gray-700">{formatCurrency(catTotal)}</span>
                      <ChevronRight className={`h-4 w-4 text-gray-400 transition-transform ${isOpen ? 'rotate-90' : ''}`} />
                    </div>
                  </button>
                  {isOpen && (
                    <div className="px-4 py-4 space-y-3 border-t border-gray-100">
                      {cat.items.map((item, idx) => (
                        <CurrencyInput
                          key={idx}
                          label={item.label}
                          hint={item.hint}
                          value={catValues[idx] || 0}
                          onChange={(v) => updateValue(cat.id, idx, v)}
                        />
                      ))}
                      <div className="pt-2 border-t border-gray-100 flex justify-between items-center">
                        <span className="text-xs font-semibold text-gray-500 uppercase tracking-wider">Subtotal</span>
                        <span className="text-sm font-bold text-gray-900">{formatCurrency(catTotal)}</span>
                      </div>
                    </div>
                  )}
                </div>
              )
            })}
          </div>

          {/* Running Total Sidebar */}
          <div className="lg:w-64 shrink-0">
            <div className="lg:sticky lg:top-24 bg-quicklend-50 border border-quicklend-200 rounded-xl p-5">
              <h3 className="text-sm font-semibold text-quicklend-900 mb-3">Running Total</h3>
              <div className="space-y-2">
                {results.categoryTotals.map((cat) => (
                  <div key={cat.id} className="flex items-center justify-between">
                    <div className="flex items-center gap-1.5">
                      <span className={`w-2 h-2 rounded-full ${categoryDotColors[cat.id]}`} />
                      <span className="text-xs text-gray-600">{cat.shortName}</span>
                    </div>
                    <span className="text-xs font-medium text-gray-900">{formatCurrency(cat.total)}</span>
                  </div>
                ))}
              </div>
              <div className="mt-3 pt-3 border-t border-quicklend-200">
                <div className="flex justify-between items-center">
                  <span className="text-sm font-bold text-quicklend-900">Total</span>
                  <span className="text-lg font-bold text-quicklend-600">{formatCurrency(results.grandTotal)}</span>
                </div>
                <p className="text-xs text-quicklend-700 mt-1">
                  With 20% buffer: {formatCurrency(results.withBuffer)}
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Results */}
      {results.grandTotal > 0 && (
        <div className="border-t border-gray-100">
          {/* Total + Category Breakdown */}
          <div className="p-6 sm:p-8 lg:p-10">
            <h3 className="text-sm font-semibold text-gray-700 mb-4">Your Estimated Startup Costs</h3>

            <div className="bg-quicklend-900 rounded-xl p-5 text-center mb-6">
              <p className="text-quicklend-200 text-sm mb-1">Total Estimated Cost</p>
              <p className="text-3xl font-bold text-white">{formatCurrency(results.grandTotal)}</p>
              <p className="text-quicklend-300 text-xs mt-1">
                Recommended with 20% buffer: {formatCurrency(results.withBuffer)}
              </p>
            </div>

            {/* Horizontal bar breakdown */}
            <div className="space-y-2">
              {results.categoryTotals
                .filter((cat) => cat.total > 0)
                .sort((a, b) => b.total - a.total)
                .map((cat) => {
                  const pct = (cat.total / results.grandTotal) * 100
                  const barWidth = (cat.total / results.maxCategoryTotal) * 100
                  return (
                    <div key={cat.id} className="flex items-center gap-3">
                      <span className="text-xs text-gray-600 w-20 sm:w-28 text-right shrink-0 truncate">{cat.shortName}</span>
                      <div className="flex-1 h-5 bg-gray-100 rounded-full overflow-hidden">
                        <div
                          className={`h-full rounded-full ${categoryColors[cat.id]}`}
                          style={{ width: `${barWidth}%` }}
                        />
                      </div>
                      <span className="text-xs font-medium text-gray-900 w-16 text-right shrink-0">{formatCurrency(cat.total)}</span>
                      <span className="text-xs text-gray-400 w-10 text-right shrink-0">{pct.toFixed(0)}%</span>
                    </div>
                  )
                })}
            </div>
          </div>

          {/* Funding Plan */}
          <div className="px-6 sm:px-8 lg:px-10 pb-8">
            <h3 className="text-sm font-semibold text-gray-700 mb-4">Funding Plan</h3>
            <div className="bg-gray-50 rounded-xl p-5 space-y-4">
              <div className="grid sm:grid-cols-3 gap-4">
                <div>
                  <label className="block text-xs font-medium text-gray-600 mb-1">Personal Savings</label>
                  <div className="relative">
                    <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500 text-sm">$</span>
                    <input
                      type="text"
                      inputMode="numeric"
                      value={formatInputDisplay(personalSavings)}
                      onChange={(e) => setPersonalSavings(parseCurrencyInput(e.target.value))}
                      className="w-full rounded-lg border border-gray-300 px-3 py-2 pl-7 text-sm text-gray-900 text-right focus:border-quicklend-600 focus:ring-2 focus:ring-quicklend-600/20 focus:outline-none transition-colors"
                    />
                  </div>
                </div>
                <div>
                  <label className="block text-xs font-medium text-gray-600 mb-1">Friends & Family</label>
                  <div className="relative">
                    <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500 text-sm">$</span>
                    <input
                      type="text"
                      inputMode="numeric"
                      value={formatInputDisplay(friendsFamily)}
                      onChange={(e) => setFriendsFamily(parseCurrencyInput(e.target.value))}
                      className="w-full rounded-lg border border-gray-300 px-3 py-2 pl-7 text-sm text-gray-900 text-right focus:border-quicklend-600 focus:ring-2 focus:ring-quicklend-600/20 focus:outline-none transition-colors"
                    />
                  </div>
                </div>
                <div>
                  <label className="block text-xs font-medium text-gray-600 mb-1">Other Sources</label>
                  <div className="relative">
                    <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500 text-sm">$</span>
                    <input
                      type="text"
                      inputMode="numeric"
                      value={formatInputDisplay(otherSources)}
                      onChange={(e) => setOtherSources(parseCurrencyInput(e.target.value))}
                      className="w-full rounded-lg border border-gray-300 px-3 py-2 pl-7 text-sm text-gray-900 text-right focus:border-quicklend-600 focus:ring-2 focus:ring-quicklend-600/20 focus:outline-none transition-colors"
                    />
                  </div>
                </div>
              </div>

              <div className="border-t border-gray-200 pt-4">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                  <div>
                    <p className="text-sm text-gray-700">Non-loan sources</p>
                    <p className="text-lg font-bold text-gray-900">{formatCurrency(results.nonLoanSources)}</p>
                  </div>
                  <div className="h-px sm:h-10 sm:w-px bg-gray-200" />
                  <div>
                    <p className="text-sm text-gray-700">Financing needed</p>
                    <p className="text-lg font-bold text-quicklend-600">{formatCurrency(results.financingNeeded)}</p>
                  </div>
                  <div className="h-px sm:h-10 sm:w-px bg-gray-200" />
                  <div>
                    <p className="text-sm text-gray-700">With 20% buffer</p>
                    <p className="text-lg font-bold text-amber-600">{formatCurrency(results.financingWithBuffer)}</p>
                  </div>
                </div>
              </div>

              {results.personalSavingsPct > 0 && results.personalSavingsPct < 10 && (
                <p className="flex items-start gap-1.5 text-xs text-amber-600">
                  <Info className="h-3.5 w-3.5 mt-0.5 flex-shrink-0" />
                  Most lenders want to see at least 10% to 20% of startup costs funded by personal savings or equity. Your current contribution is {results.personalSavingsPct.toFixed(0)}%.
                </p>
              )}
            </div>
          </div>

          {/* Scenarios */}
          <div className="px-6 sm:px-8 lg:px-10 pb-8">
            <h3 className="text-sm font-semibold text-gray-700 mb-4">Launch Scenarios</h3>
            <div className="grid sm:grid-cols-3 gap-4">
              <div className="border border-gray-200 rounded-xl p-4">
                <p className="text-xs font-semibold text-gray-500 uppercase tracking-wider mb-1">Lean Launch</p>
                <p className="text-xl font-bold text-gray-900">{formatCurrency(results.leanTotal)}</p>
                <p className="text-xs text-gray-500 mt-2">
                  Reduced reserve, smaller marketing budget, and less equipment spending. Minimum viable budget.
                </p>
              </div>
              <div className="border-2 border-quicklend-600 rounded-xl p-4 bg-quicklend-50">
                <div className="flex items-center gap-2 mb-1">
                  <p className="text-xs font-semibold text-quicklend-600 uppercase tracking-wider">Your Estimate</p>
                  <span className="text-[10px] bg-quicklend-600 text-white px-1.5 py-0.5 rounded-full font-semibold">Current</span>
                </div>
                <p className="text-xl font-bold text-quicklend-900">{formatCurrency(results.grandTotal)}</p>
                <p className="text-xs text-gray-500 mt-2">
                  Based on the numbers you entered across all categories.
                </p>
              </div>
              <div className="border border-gray-200 rounded-xl p-4">
                <p className="text-xs font-semibold text-gray-500 uppercase tracking-wider mb-1">Comfortable Launch</p>
                <p className="text-xl font-bold text-gray-900">{formatCurrency(results.comfortableTotal)}</p>
                <p className="text-xs text-gray-500 mt-2">
                  Larger reserve, better marketing presence, and upgraded equipment. Room for the unexpected.
                </p>
              </div>
            </div>
            <p className="flex items-start gap-1.5 mt-3 text-xs text-gray-400">
              <Info className="h-3.5 w-3.5 mt-0.5 flex-shrink-0" />
              We recommend budgeting 20% above your estimate for unexpected costs: {formatCurrency(results.withBuffer)}.
            </p>
          </div>

          {/* Typical Costs Reference */}
          <div className="px-6 sm:px-8 lg:px-10 pb-8">
            <details className="group">
              <summary className="cursor-pointer text-sm font-semibold text-gray-600 hover:text-gray-900 flex items-center gap-2">
                <ChevronRight className="h-4 w-4 group-open:rotate-90 transition-transform" />
                Average Startup Costs by Business Type
              </summary>
              <div className="mt-4 bg-gray-50 rounded-xl overflow-hidden">
                <table className="w-full text-sm">
                  <thead>
                    <tr className="border-b border-gray-200">
                      <th className="text-left px-4 py-2.5 text-gray-500 font-medium">Business Type</th>
                      <th className="text-right px-4 py-2.5 text-gray-500 font-medium">Typical Range</th>
                    </tr>
                  </thead>
                  <tbody>
                    {[
                      { type: 'Home-Based Business', range: '$2,000 - $10,000' },
                      { type: 'Online / E-Commerce', range: '$5,000 - $25,000' },
                      { type: 'Professional Services', range: '$10,000 - $50,000' },
                      { type: 'Retail Store', range: '$50,000 - $150,000' },
                      { type: 'Restaurant', range: '$100,000 - $500,000' },
                      { type: 'Manufacturing', range: '$100,000 - $1,000,000+' },
                    ].map((row) => (
                      <tr key={row.type} className="border-b border-gray-100">
                        <td className="px-4 py-2.5 text-gray-700">{row.type}</td>
                        <td className="px-4 py-2.5 text-right font-medium text-gray-900">{row.range}</td>
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
                {results.financingNeeded > 0
                  ? `You need approximately ${formatCurrency(results.financingNeeded)} in startup financing.`
                  : 'Your personal sources cover the estimated startup costs.'}
              </p>
              <p className="text-gray-500 text-sm mb-4">
                {results.financingNeeded > 0
                  ? 'SBA loans, term loans, and lines of credit are common options for startup funding. No impact to your credit score.'
                  : 'A line of credit can provide a safety net for unexpected expenses. No impact to your credit score.'}
              </p>
              <div className="flex flex-col sm:flex-row gap-3 justify-center">
                <Link
                  href={`/get-started?source=startup-cost-calculator&loan_type=term-loans&amount=${results.financingNeeded > 0 ? results.financingNeeded : results.grandTotal}`}
                  className="inline-flex items-center justify-center bg-quicklend-600 text-white font-semibold px-8 py-3 rounded-lg hover:bg-quicklend-700 transition-colors"
                >
                  See Your Options <ArrowRight className="ml-2 h-4 w-4" />
                </Link>
                <Link
                  href="/tools/roi-calculator"
                  className="inline-flex items-center justify-center border border-quicklend-300 text-quicklend-700 font-semibold px-6 py-3 rounded-lg hover:bg-quicklend-50 transition-colors text-sm"
                >
                  Check Your ROI
                </Link>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
