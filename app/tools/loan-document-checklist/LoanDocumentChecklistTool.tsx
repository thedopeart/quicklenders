'use client'

import { useState, useMemo } from 'react'
import Link from 'next/link'
import {
  ArrowRight,
  FileText,
  CheckCircle,
  Circle,
  ChevronDown,
  Info,
} from 'lucide-react'

// ────────────────────────────────────────────────────────────────────
// Types & Data
// ────────────────────────────────────────────────────────────────────

interface DocItem {
  id: string
  name: string
  description: string
  required: boolean // vs recommended
  loanTypes: string[] // which loan types need this
}

interface DocCategory {
  name: string
  icon: string
  items: DocItem[]
}

const loanTypeOptions = [
  { value: 'term-loan', label: 'Term Loan' },
  { value: 'line-of-credit', label: 'Line of Credit' },
  { value: 'sba-loan', label: 'SBA Loan (7a/504)' },
  { value: 'equipment-financing', label: 'Equipment Financing' },
  { value: 'invoice-factoring', label: 'Invoice Factoring' },
  { value: 'mca', label: 'Merchant Cash Advance' },
  { value: 'not-sure', label: 'Not sure yet' },
]

const allDocs: DocCategory[] = [
  {
    name: 'Financial Statements',
    icon: '📊',
    items: [
      { id: 'tax-returns-biz', name: 'Business Tax Returns (2 years)', description: 'Federal returns for the last 2 complete tax years.', required: true, loanTypes: ['term-loan', 'line-of-credit', 'sba-loan', 'equipment-financing', 'not-sure'] },
      { id: 'tax-returns-personal', name: 'Personal Tax Returns (2 years)', description: 'Individual returns for all owners with 20%+ ownership.', required: true, loanTypes: ['term-loan', 'line-of-credit', 'sba-loan', 'not-sure'] },
      { id: 'pl-statement', name: 'Profit & Loss Statement (YTD)', description: 'Current year-to-date P&L showing revenue and expenses.', required: true, loanTypes: ['term-loan', 'line-of-credit', 'sba-loan', 'equipment-financing', 'not-sure'] },
      { id: 'balance-sheet', name: 'Balance Sheet', description: 'Current assets, liabilities, and equity snapshot.', required: true, loanTypes: ['term-loan', 'sba-loan', 'not-sure'] },
      { id: 'cash-flow-statement', name: 'Cash Flow Statement', description: 'Shows how cash moves through the business. Often required for SBA loans.', required: false, loanTypes: ['sba-loan', 'not-sure'] },
      { id: 'financial-projections', name: 'Financial Projections (if startup)', description: '12-24 month revenue and expense projections for businesses under 2 years.', required: false, loanTypes: ['sba-loan', 'not-sure'] },
    ],
  },
  {
    name: 'Bank Statements',
    icon: '🏦',
    items: [
      { id: 'bank-statements-3mo', name: 'Business Bank Statements (3 months)', description: 'Most recent 3 months of primary business checking account.', required: true, loanTypes: ['term-loan', 'line-of-credit', 'sba-loan', 'equipment-financing', 'invoice-factoring', 'mca', 'not-sure'] },
      { id: 'bank-statements-6mo', name: 'Business Bank Statements (6 months)', description: 'Some lenders require 6 months for a deeper cash flow picture.', required: false, loanTypes: ['term-loan', 'sba-loan', 'mca', 'not-sure'] },
      { id: 'merchant-statements', name: 'Merchant Processing Statements (3 months)', description: 'Credit card processing volume. Required for MCAs and revenue-based products.', required: true, loanTypes: ['mca', 'invoice-factoring'] },
    ],
  },
  {
    name: 'Business Documents',
    icon: '🏢',
    items: [
      { id: 'business-license', name: 'Business License / Registration', description: 'Proof of legal business registration in your state.', required: true, loanTypes: ['term-loan', 'line-of-credit', 'sba-loan', 'equipment-financing', 'not-sure'] },
      { id: 'articles-of-org', name: 'Articles of Organization / Incorporation', description: 'Formation documents filed with your state.', required: true, loanTypes: ['sba-loan', 'term-loan', 'not-sure'] },
      { id: 'operating-agreement', name: 'Operating Agreement / Bylaws', description: 'Governing document showing ownership structure and management.', required: false, loanTypes: ['sba-loan', 'term-loan', 'not-sure'] },
      { id: 'ein-letter', name: 'EIN Confirmation Letter (IRS)', description: 'IRS letter confirming your Employer Identification Number.', required: true, loanTypes: ['term-loan', 'line-of-credit', 'sba-loan', 'not-sure'] },
      { id: 'business-plan', name: 'Business Plan', description: 'Typically required for SBA loans and startups. Includes market analysis and financial projections.', required: false, loanTypes: ['sba-loan', 'not-sure'] },
      { id: 'lease-agreement', name: 'Commercial Lease Agreement', description: 'If you lease business premises. Shows stability and fixed obligations.', required: false, loanTypes: ['sba-loan', 'term-loan', 'not-sure'] },
    ],
  },
  {
    name: 'Personal Documents',
    icon: '👤',
    items: [
      { id: 'government-id', name: 'Government-Issued Photo ID', description: "Driver's license or passport for all owners with 20%+ ownership.", required: true, loanTypes: ['term-loan', 'line-of-credit', 'sba-loan', 'equipment-financing', 'mca', 'not-sure'] },
      { id: 'personal-financial', name: 'Personal Financial Statement', description: 'Summary of personal assets, liabilities, and net worth. SBA Form 413 for SBA loans.', required: true, loanTypes: ['sba-loan', 'term-loan', 'not-sure'] },
      { id: 'resume', name: 'Owner Resume / Background', description: 'Professional experience relevant to running the business. Required for some SBA applications.', required: false, loanTypes: ['sba-loan'] },
    ],
  },
  {
    name: 'Collateral & Equipment',
    icon: '🔧',
    items: [
      { id: 'equipment-quote', name: 'Equipment Quote or Invoice', description: 'Vendor quote showing the equipment you plan to purchase.', required: true, loanTypes: ['equipment-financing'] },
      { id: 'collateral-docs', name: 'Collateral Documentation', description: 'Appraisals, titles, or valuations for assets offered as collateral.', required: false, loanTypes: ['term-loan', 'sba-loan', 'not-sure'] },
      { id: 'ar-aging', name: 'Accounts Receivable Aging Report', description: 'Breakdown of outstanding invoices by age. Required for factoring and asset-based lending.', required: true, loanTypes: ['invoice-factoring'] },
    ],
  },
  {
    name: 'Existing Debt',
    icon: '📋',
    items: [
      { id: 'debt-schedule', name: 'Business Debt Schedule', description: 'List of all existing loans, balances, rates, and monthly payments.', required: true, loanTypes: ['term-loan', 'sba-loan', 'not-sure'] },
      { id: 'loan-statements', name: 'Current Loan Statements', description: 'Most recent statements for any existing business loans.', required: false, loanTypes: ['term-loan', 'sba-loan', 'not-sure'] },
    ],
  },
]

// ────────────────────────────────────────────────────────────────────
// Main Component
// ────────────────────────────────────────────────────────────────────

export default function LoanDocumentChecklistTool() {
  const [selectedLoanType, setSelectedLoanType] = useState('not-sure')
  const [checked, setChecked] = useState<Record<string, boolean>>({})
  const [expandedCategories, setExpandedCategories] = useState<Record<string, boolean>>(
    Object.fromEntries(allDocs.map((c) => [c.name, true]))
  )

  const toggleCheck = (id: string) => {
    setChecked((prev) => ({ ...prev, [id]: !prev[id] }))
  }

  const toggleCategory = (name: string) => {
    setExpandedCategories((prev) => ({ ...prev, [name]: !prev[name] }))
  }

  // Filter documents based on selected loan type
  const filteredDocs = useMemo(() => {
    return allDocs.map((cat) => ({
      ...cat,
      items: cat.items.filter((item) =>
        item.loanTypes.includes(selectedLoanType) || item.loanTypes.includes('not-sure')
      ),
    })).filter((cat) => cat.items.length > 0)
  }, [selectedLoanType])

  // Stats
  const stats = useMemo(() => {
    const allItems = filteredDocs.flatMap((c) => c.items)
    const requiredItems = allItems.filter((i) => i.required)
    const totalItems = allItems.length
    const checkedCount = allItems.filter((i) => checked[i.id]).length
    const requiredChecked = requiredItems.filter((i) => checked[i.id]).length
    const requiredTotal = requiredItems.length
    const pct = totalItems > 0 ? (checkedCount / totalItems) * 100 : 0
    return { totalItems, checkedCount, requiredChecked, requiredTotal, pct }
  }, [filteredDocs, checked])

  return (
    <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
      {/* Intro */}
      <div className="p-6 sm:p-8 lg:p-10 pb-0">
        <p className="text-gray-700 leading-relaxed mb-2">
          Select your loan type to get a customized document checklist. Check off items as you gather them to track your progress.
        </p>
        <p className="text-gray-500 text-sm mb-0">
          Having all documents ready before you apply speeds up the process and improves your chances of approval.
        </p>
      </div>

      {/* Loan Type Selector */}
      <div className="p-6 sm:p-8 lg:p-10 pb-4">
        <label className="block text-sm font-medium text-gray-700 mb-2">What type of financing are you applying for?</label>
        <div className="flex flex-wrap gap-2">
          {loanTypeOptions.map((opt) => (
            <button
              key={opt.value}
              onClick={() => setSelectedLoanType(opt.value)}
              className={`px-4 py-2 rounded-lg text-sm font-medium border transition-colors ${
                selectedLoanType === opt.value
                  ? 'bg-quicklend-600 text-white border-quicklend-600'
                  : 'bg-white text-gray-600 border-gray-200 hover:border-quicklend-300'
              }`}
            >
              {opt.label}
            </button>
          ))}
        </div>
      </div>

      {/* Progress Bar */}
      <div className="px-6 sm:px-8 lg:px-10 pb-6">
        <div className="flex items-center justify-between text-xs text-gray-500 mb-2">
          <span>{stats.checkedCount} of {stats.totalItems} documents ready</span>
          <span>{stats.requiredChecked} of {stats.requiredTotal} required</span>
        </div>
        <div className="w-full bg-gray-100 rounded-full h-3">
          <div
            className={`h-full rounded-full transition-all duration-300 ${
              stats.pct >= 80 ? 'bg-green-500' : stats.pct >= 50 ? 'bg-quicklend-600' : 'bg-amber-500'
            }`}
            style={{ width: `${stats.pct}%` }}
          />
        </div>
        {stats.pct >= 100 && (
          <p className="text-xs text-green-600 font-medium mt-1 flex items-center gap-1">
            <CheckCircle className="h-3.5 w-3.5" /> All documents ready. You are prepared to apply.
          </p>
        )}
      </div>

      {/* Document Categories */}
      <div className="px-6 sm:px-8 lg:px-10 pb-8">
        <div className="space-y-4">
          {filteredDocs.map((cat) => {
            const catChecked = cat.items.filter((i) => checked[i.id]).length
            const isExpanded = expandedCategories[cat.name]
            return (
              <div key={cat.name} className="border border-gray-200 rounded-xl overflow-hidden">
                <button
                  onClick={() => toggleCategory(cat.name)}
                  className="w-full flex items-center justify-between px-4 py-3 bg-gray-50 hover:bg-gray-100 transition-colors"
                >
                  <div className="flex items-center gap-3">
                    <span className="text-lg">{cat.icon}</span>
                    <span className="text-sm font-semibold text-gray-900">{cat.name}</span>
                    <span className="text-xs text-gray-400">
                      {catChecked}/{cat.items.length}
                    </span>
                  </div>
                  <ChevronDown className={`h-4 w-4 text-gray-400 transition-transform ${isExpanded ? 'rotate-180' : ''}`} />
                </button>
                {isExpanded && (
                  <div className="divide-y divide-gray-100">
                    {cat.items.map((item) => (
                      <label
                        key={item.id}
                        className="flex items-start gap-3 px-4 py-3 hover:bg-gray-50 cursor-pointer transition-colors"
                      >
                        <button
                          onClick={(e) => { e.preventDefault(); toggleCheck(item.id) }}
                          className="mt-0.5 shrink-0"
                        >
                          {checked[item.id] ? (
                            <CheckCircle className="h-5 w-5 text-green-500" />
                          ) : (
                            <Circle className="h-5 w-5 text-gray-300" />
                          )}
                        </button>
                        <div className="flex-1">
                          <div className="flex items-center gap-2">
                            <span className={`text-sm font-medium ${checked[item.id] ? 'text-gray-400 line-through' : 'text-gray-900'}`}>
                              {item.name}
                            </span>
                            {item.required ? (
                              <span className="text-xs font-semibold bg-red-100 text-red-600 px-1.5 py-0.5 rounded">Required</span>
                            ) : (
                              <span className="text-xs font-semibold bg-gray-100 text-gray-500 px-1.5 py-0.5 rounded">Recommended</span>
                            )}
                          </div>
                          <p className="text-xs text-gray-400 mt-0.5">{item.description}</p>
                        </div>
                      </label>
                    ))}
                  </div>
                )}
              </div>
            )
          })}
        </div>
      </div>

      {/* Tips */}
      <div className="px-6 sm:px-8 lg:px-10 pb-8">
        <div className="bg-quicklend-900 rounded-xl p-5">
          <h4 className="text-quicklend-200 text-sm font-semibold mb-3 flex items-center gap-2">
            <Info className="h-4 w-4" /> Document Tips
          </h4>
          <ul className="space-y-2 text-sm text-quicklend-300">
            <li className="flex items-start gap-2">
              <span className="text-amber-400 mt-0.5">&#8226;</span>
              <span>Keep digital copies of everything. Most lenders accept PDF uploads.</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-amber-400 mt-0.5">&#8226;</span>
              <span>Bank statements should be official downloads, not screenshots. Most banks let you export PDFs from online banking.</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-amber-400 mt-0.5">&#8226;</span>
              <span>If your tax returns show losses, prepare a short explanation of why and what has changed since.</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-amber-400 mt-0.5">&#8226;</span>
              <span>SBA loans require the most documentation. Budget 2-4 weeks to gather everything.</span>
            </li>
          </ul>
        </div>
      </div>

      {/* CTA */}
      <div className="px-6 sm:px-8 lg:px-10 pb-8">
        <div className="bg-quicklend-50 rounded-xl p-6 text-center">
          <p className="text-gray-700 mb-1 font-medium">
            {stats.pct >= 80
              ? 'Your documents are in order. Start the process and get matched with a lender.'
              : 'Getting organized is the first step. Once your documents are ready, the application process moves fast.'}
          </p>
          <p className="text-gray-500 text-sm mb-4">
            A funding specialist can tell you exactly what each lender needs. No impact to your credit score.
          </p>
          <div className="flex flex-col sm:flex-row gap-3 justify-center">
            <Link
              href={`/get-started?source=document-checklist&loan_type=${selectedLoanType === 'not-sure' ? 'not-sure' : selectedLoanType}`}
              className="inline-flex items-center justify-center bg-quicklend-600 text-white font-semibold px-8 py-3 rounded-lg hover:bg-quicklend-700 transition-colors"
            >
              Get Started <ArrowRight className="ml-2 h-4 w-4" />
            </Link>
            <Link
              href="/tools/funding-readiness-assessment"
              className="inline-flex items-center justify-center border border-quicklend-300 text-quicklend-700 font-semibold px-6 py-3 rounded-lg hover:bg-quicklend-50 transition-colors text-sm"
            >
              Check Funding Readiness
            </Link>
          </div>
        </div>
      </div>
    </div>
  )
}
