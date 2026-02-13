'use client'

import { useState, useMemo } from 'react'
import Link from 'next/link'
import {
  ArrowRight,
  ArrowLeft,
  CheckCircle,
  AlertTriangle,
  XCircle,
  Info,
  Shield,
  TrendingUp,
} from 'lucide-react'

// ────────────────────────────────────────────────────────────────────
// Types
// ────────────────────────────────────────────────────────────────────

interface Question {
  id: string
  label: string
  hint?: string
  options: { value: string; label: string; points: number }[]
}

interface CategoryResult {
  category: string
  score: number
  maxScore: number
  status: 'strong' | 'adequate' | 'needs-work'
  feedback: string
}

// ────────────────────────────────────────────────────────────────────
// Questions
// ────────────────────────────────────────────────────────────────────

const questions: Question[] = [
  {
    id: 'credit',
    label: 'What is your personal credit score?',
    hint: 'Most lenders pull your personal credit even for business loans.',
    options: [
      { value: '720+', label: '720 or higher', points: 20 },
      { value: '680-719', label: '680 - 719', points: 15 },
      { value: '640-679', label: '640 - 679', points: 10 },
      { value: '580-639', label: '580 - 639', points: 5 },
      { value: 'below-580', label: 'Below 580', points: 2 },
      { value: 'unsure', label: 'Not sure', points: 5 },
    ],
  },
  {
    id: 'time-in-business',
    label: 'How long has your business been operating?',
    hint: 'From the date of formation or first revenue, whichever is earlier.',
    options: [
      { value: '5+', label: '5+ years', points: 20 },
      { value: '3-5', label: '3 - 5 years', points: 16 },
      { value: '2-3', label: '2 - 3 years', points: 12 },
      { value: '1-2', label: '1 - 2 years', points: 8 },
      { value: '6mo-1yr', label: '6 months - 1 year', points: 4 },
      { value: 'under-6mo', label: 'Under 6 months / Pre-revenue', points: 1 },
    ],
  },
  {
    id: 'revenue',
    label: 'What is your average monthly revenue?',
    hint: 'Total gross revenue before expenses. Estimate if it varies seasonally.',
    options: [
      { value: '500k+', label: '$500,000+', points: 20 },
      { value: '100k-500k', label: '$100,000 - $500,000', points: 17 },
      { value: '50k-100k', label: '$50,000 - $100,000', points: 14 },
      { value: '25k-50k', label: '$25,000 - $50,000', points: 10 },
      { value: '10k-25k', label: '$10,000 - $25,000', points: 6 },
      { value: 'under-10k', label: 'Under $10,000', points: 2 },
    ],
  },
  {
    id: 'profitability',
    label: 'Is your business currently profitable?',
    hint: 'Revenue exceeds all operating expenses on a consistent basis.',
    options: [
      { value: 'profitable-growing', label: 'Yes, and growing', points: 15 },
      { value: 'profitable-stable', label: 'Yes, stable', points: 12 },
      { value: 'break-even', label: 'Around break-even', points: 7 },
      { value: 'not-yet', label: 'Not yet', points: 3 },
    ],
  },
  {
    id: 'existing-debt',
    label: 'Do you have existing business debt?',
    hint: 'Loans, lines of credit, MCAs, or other outstanding balances.',
    options: [
      { value: 'none', label: 'No existing debt', points: 10 },
      { value: 'low', label: 'Yes, manageable payments', points: 8 },
      { value: 'moderate', label: 'Yes, significant payments', points: 4 },
      { value: 'heavy', label: 'Yes, struggling to keep up', points: 1 },
    ],
  },
  {
    id: 'collateral',
    label: 'Do you have collateral to offer?',
    hint: 'Equipment, real estate, inventory, accounts receivable, or other business assets.',
    options: [
      { value: 'substantial', label: 'Yes, substantial assets', points: 10 },
      { value: 'some', label: 'Some assets available', points: 7 },
      { value: 'limited', label: 'Limited assets', points: 4 },
      { value: 'none', label: 'No collateral', points: 2 },
    ],
  },
  {
    id: 'documentation',
    label: 'Are your financial documents current and organized?',
    hint: 'Tax returns, bank statements, P&L, balance sheet.',
    options: [
      { value: 'complete', label: 'Yes, all up to date', points: 10 },
      { value: 'mostly', label: 'Mostly, missing a few items', points: 7 },
      { value: 'partial', label: 'Some documents available', points: 4 },
      { value: 'not-ready', label: 'Not organized yet', points: 1 },
    ],
  },
  {
    id: 'loan-purpose',
    label: 'What do you plan to use the funding for?',
    hint: 'Lenders prefer specific, revenue-generating uses.',
    options: [
      { value: 'equipment', label: 'Equipment or inventory', points: 10 },
      { value: 'expansion', label: 'Business expansion', points: 9 },
      { value: 'working-capital', label: 'Working capital', points: 7 },
      { value: 'refinance', label: 'Refinance existing debt', points: 6 },
      { value: 'startup', label: 'Startup costs', points: 3 },
      { value: 'not-sure', label: 'Not sure yet', points: 2 },
    ],
  },
]

const MAX_SCORE = questions.reduce((sum, q) => sum + Math.max(...q.options.map((o) => o.points)), 0)

// ────────────────────────────────────────────────────────────────────
// Scoring
// ────────────────────────────────────────────────────────────────────

function getOverallVerdict(pct: number): {
  label: string
  color: string
  bgColor: string
  borderColor: string
  icon: 'check' | 'info' | 'alert' | 'x'
  message: string
} {
  if (pct >= 80)
    return { label: 'Strong Candidate', color: 'text-green-700', bgColor: 'bg-green-50', borderColor: 'border-green-200', icon: 'check', message: 'Your business is well-positioned for financing. You should qualify for competitive rates and terms from a range of lenders.' }
  if (pct >= 60)
    return { label: 'Good Position', color: 'text-blue-700', bgColor: 'bg-blue-50', borderColor: 'border-blue-200', icon: 'info', message: 'You meet most lender requirements. A few improvements could help you access better rates and more options.' }
  if (pct >= 40)
    return { label: 'Some Gaps to Address', color: 'text-amber-700', bgColor: 'bg-amber-50', borderColor: 'border-amber-200', icon: 'alert', message: 'You may qualify for some financing options, but there are areas to strengthen. Online lenders and alternative products are more likely than traditional bank loans.' }
  return { label: 'Needs Preparation', color: 'text-red-700', bgColor: 'bg-red-50', borderColor: 'border-red-200', icon: 'x', message: 'Your profile has significant gaps that most lenders will flag. Focus on building credit, revenue history, and documentation before applying.' }
}

function getCategoryResults(answers: Record<string, string>): CategoryResult[] {
  const categories: { name: string; ids: string[]; maxPossible: number }[] = [
    { name: 'Credit & History', ids: ['credit', 'time-in-business'], maxPossible: 40 },
    { name: 'Revenue & Profitability', ids: ['revenue', 'profitability'], maxPossible: 35 },
    { name: 'Debt & Collateral', ids: ['existing-debt', 'collateral'], maxPossible: 20 },
    { name: 'Documentation & Purpose', ids: ['documentation', 'loan-purpose'], maxPossible: 20 },
  ]

  return categories.map((cat) => {
    const score = cat.ids.reduce((sum, id) => {
      const q = questions.find((qq) => qq.id === id)
      const selected = q?.options.find((o) => o.value === answers[id])
      return sum + (selected?.points || 0)
    }, 0)
    const pct = (score / cat.maxPossible) * 100
    const status: 'strong' | 'adequate' | 'needs-work' = pct >= 70 ? 'strong' : pct >= 40 ? 'adequate' : 'needs-work'

    let feedback = ''
    if (cat.name === 'Credit & History') {
      if (status === 'strong') feedback = 'Strong credit and business history. You should qualify for traditional lending options.'
      else if (status === 'adequate') feedback = 'Credit or time in business could be stronger. Online lenders may offer better approval odds than banks.'
      else feedback = 'Building credit history and time in business will open more doors. Consider secured credit cards or microloans to establish a track record.'
    } else if (cat.name === 'Revenue & Profitability') {
      if (status === 'strong') feedback = 'Solid revenue and profitability. Lenders will see your ability to repay.'
      else if (status === 'adequate') feedback = 'Revenue is in a workable range but profitability could be stronger. Focus on demonstrating consistent cash flow.'
      else feedback = 'Revenue is below most lender minimums. Focus on growing top-line sales before applying for significant financing.'
    } else if (cat.name === 'Debt & Collateral') {
      if (status === 'strong') feedback = 'Low existing debt and available collateral put you in a strong position for secured loans with better rates.'
      else if (status === 'adequate') feedback = 'Existing debt is manageable. Consider paying down balances to improve your debt-to-income ratio.'
      else feedback = 'High debt levels or lack of collateral will limit options. Prioritize paying down existing obligations.'
    } else {
      if (status === 'strong') feedback = 'Documents are ready and your funding purpose is clear. You are prepared to move quickly on applications.'
      else if (status === 'adequate') feedback = 'Gather remaining documents before applying. Having everything ready speeds up approval.'
      else feedback = 'Get your financial documents organized. Most lenders need at least 3 months of bank statements and 2 years of tax returns.'
    }

    return { category: cat.name, score, maxScore: cat.maxPossible, status, feedback }
  })
}

function getLoanRecommendations(answers: Record<string, string>, score: number): { type: string; match: 'likely' | 'possible' | 'unlikely'; reason: string }[] {
  const creditVal = answers['credit'] || ''
  const timeVal = answers['time-in-business'] || ''
  const revenueVal = answers['revenue'] || ''
  const pct = (score / MAX_SCORE) * 100

  const goodCredit = ['720+', '680-719'].includes(creditVal)
  const established = ['5+', '3-5', '2-3'].includes(timeVal)
  const goodRevenue = ['500k+', '100k-500k', '50k-100k'].includes(revenueVal)

  return [
    {
      type: 'SBA Loan (7a/504)',
      match: goodCredit && established && goodRevenue ? 'likely' : established && goodRevenue ? 'possible' : 'unlikely',
      reason: goodCredit && established ? 'Lowest rates available (6-13%). Requires strong credit and 2+ years in business.' : 'Requires 680+ credit, 2+ years in business, and consistent revenue.',
    },
    {
      type: 'Bank Term Loan',
      match: goodCredit && established && goodRevenue ? 'likely' : goodCredit && established ? 'possible' : 'unlikely',
      reason: 'Traditional bank loans offer 7-15% rates for qualified borrowers with strong financials.',
    },
    {
      type: 'Online Term Loan',
      match: pct >= 50 ? 'likely' : pct >= 30 ? 'possible' : 'unlikely',
      reason: 'Online lenders have faster approval and lower requirements. Rates typically 10-30%.',
    },
    {
      type: 'Business Line of Credit',
      match: established && goodRevenue ? 'likely' : pct >= 40 ? 'possible' : 'unlikely',
      reason: 'Flexible revolving credit for working capital. Easier to qualify than term loans.',
    },
    {
      type: 'Equipment Financing',
      match: answers['loan-purpose'] === 'equipment' ? 'likely' : pct >= 40 ? 'possible' : 'unlikely',
      reason: 'Equipment serves as collateral, making approval easier. Rates 7-20%.',
    },
    {
      type: 'Invoice Factoring',
      match: goodRevenue ? 'likely' : pct >= 30 ? 'possible' : 'unlikely',
      reason: 'Based on your customer invoices, not your credit. Good for B2B businesses with outstanding receivables.',
    },
    {
      type: 'Merchant Cash Advance',
      match: pct >= 20 ? 'likely' : 'possible',
      reason: 'Easiest to qualify for, but most expensive. Factor rates of 1.1 to 1.5. Use as a last resort.',
    },
  ]
}

// ────────────────────────────────────────────────────────────────────
// Main Component
// ────────────────────────────────────────────────────────────────────

export default function FundingReadinessTool() {
  const [step, setStep] = useState(0)
  const [answers, setAnswers] = useState<Record<string, string>>({})
  const [showResults, setShowResults] = useState(false)

  const currentQuestion = questions[step]
  const progress = ((step + 1) / questions.length) * 100
  const allAnswered = questions.every((q) => answers[q.id])

  const results = useMemo(() => {
    if (!allAnswered) return null

    const totalScore = questions.reduce((sum, q) => {
      const selected = q.options.find((o) => o.value === answers[q.id])
      return sum + (selected?.points || 0)
    }, 0)
    const pct = (totalScore / MAX_SCORE) * 100
    const verdict = getOverallVerdict(pct)
    const categories = getCategoryResults(answers)
    const recommendations = getLoanRecommendations(answers, totalScore)

    return { totalScore, pct, verdict, categories, recommendations }
  }, [answers, allAnswered])

  const handleSelect = (value: string) => {
    setAnswers((prev) => ({ ...prev, [currentQuestion.id]: value }))
    if (step < questions.length - 1) {
      setTimeout(() => setStep(step + 1), 200)
    } else {
      setTimeout(() => setShowResults(true), 200)
    }
  }

  const handleBack = () => {
    if (showResults) {
      setShowResults(false)
    } else if (step > 0) {
      setStep(step - 1)
    }
  }

  const handleRestart = () => {
    setAnswers({})
    setStep(0)
    setShowResults(false)
  }

  // ── Results View ────────────────────────────────────────────────

  if (showResults && results) {
    const VerdictIcon = results.verdict.icon === 'check' ? CheckCircle
      : results.verdict.icon === 'info' ? Info
        : results.verdict.icon === 'alert' ? AlertTriangle
          : XCircle

    return (
      <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
        {/* Verdict Banner */}
        <div className="p-6 sm:p-8 lg:p-10 pb-0">
          <div className={`${results.verdict.bgColor} border ${results.verdict.borderColor} rounded-xl p-5 flex flex-col sm:flex-row items-center gap-4`}>
            <div className="flex items-center gap-3">
              <VerdictIcon className={`h-8 w-8 ${results.verdict.color}`} />
              <div>
                <p className={`text-lg font-bold ${results.verdict.color}`}>{results.verdict.label}</p>
                <p className="text-sm text-gray-600">{results.verdict.message}</p>
              </div>
            </div>
            <div className="sm:ml-auto text-center sm:text-right shrink-0">
              <p className={`text-3xl font-bold ${results.verdict.color}`}>{Math.round(results.pct)}</p>
              <p className="text-xs text-gray-500">out of 100</p>
            </div>
          </div>
        </div>

        {/* Score Bar */}
        <div className="px-6 sm:px-8 lg:px-10 pt-6">
          <div className="w-full bg-gray-100 rounded-full h-4 overflow-hidden">
            <div
              className={`h-full rounded-full transition-all duration-500 ${
                results.pct >= 80 ? 'bg-green-500' : results.pct >= 60 ? 'bg-blue-500' : results.pct >= 40 ? 'bg-amber-500' : 'bg-red-500'
              }`}
              style={{ width: `${results.pct}%` }}
            />
          </div>
          <div className="flex justify-between text-xs text-gray-400 mt-1">
            <span>Needs Work</span>
            <span>Some Gaps</span>
            <span>Good</span>
            <span>Strong</span>
          </div>
        </div>

        {/* Category Breakdown */}
        <div className="p-6 sm:p-8 lg:p-10">
          <h4 className="text-sm font-semibold text-gray-700 mb-4">Breakdown by Category</h4>
          <div className="space-y-4">
            {results.categories.map((cat) => {
              const pct = (cat.score / cat.maxScore) * 100
              return (
                <div key={cat.category} className="bg-gray-50 rounded-xl p-4">
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-sm font-medium text-gray-900">{cat.category}</span>
                    <span className={`text-xs font-semibold px-2 py-0.5 rounded-full ${
                      cat.status === 'strong' ? 'bg-green-100 text-green-700'
                        : cat.status === 'adequate' ? 'bg-amber-100 text-amber-700'
                          : 'bg-red-100 text-red-700'
                    }`}>
                      {cat.status === 'strong' ? 'Strong' : cat.status === 'adequate' ? 'Adequate' : 'Needs Work'}
                    </span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2 mb-2">
                    <div
                      className={`h-full rounded-full ${
                        cat.status === 'strong' ? 'bg-green-500' : cat.status === 'adequate' ? 'bg-amber-500' : 'bg-red-400'
                      }`}
                      style={{ width: `${pct}%` }}
                    />
                  </div>
                  <p className="text-xs text-gray-500">{cat.feedback}</p>
                </div>
              )
            })}
          </div>
        </div>

        {/* Loan Recommendations */}
        <div className="px-6 sm:px-8 lg:px-10 pb-8">
          <h4 className="text-sm font-semibold text-gray-700 mb-4">Financing Options for Your Profile</h4>
          <div className="space-y-2">
            {results.recommendations.map((rec) => (
              <div key={rec.type} className="flex items-start gap-3 p-3 rounded-lg border border-gray-100">
                <div className={`w-2 h-2 mt-1.5 rounded-full shrink-0 ${
                  rec.match === 'likely' ? 'bg-green-500' : rec.match === 'possible' ? 'bg-amber-500' : 'bg-gray-300'
                }`} />
                <div className="flex-1">
                  <div className="flex items-center gap-2">
                    <span className="text-sm font-medium text-gray-900">{rec.type}</span>
                    <span className={`text-xs font-medium ${
                      rec.match === 'likely' ? 'text-green-600' : rec.match === 'possible' ? 'text-amber-600' : 'text-gray-400'
                    }`}>
                      {rec.match === 'likely' ? 'Likely match' : rec.match === 'possible' ? 'Possible' : 'Unlikely'}
                    </span>
                  </div>
                  <p className="text-xs text-gray-500 mt-0.5">{rec.reason}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Improvement Tips */}
        {results.pct < 80 && (
          <div className="px-6 sm:px-8 lg:px-10 pb-8">
            <div className="bg-quicklend-900 rounded-xl p-5">
              <h4 className="text-quicklend-200 text-sm font-semibold mb-3 flex items-center gap-2">
                <TrendingUp className="h-4 w-4" /> Quick Wins to Improve Your Score
              </h4>
              <ul className="space-y-2 text-sm text-quicklend-300">
                {results.categories.filter((c) => c.status !== 'strong').map((cat) => (
                  <li key={cat.category} className="flex items-start gap-2">
                    <span className="text-amber-400 mt-0.5">&#8226;</span>
                    <span>
                      <span className="text-white font-medium">{cat.category}:</span>{' '}
                      {cat.category === 'Credit & History' && 'Pay all bills on time, reduce credit utilization below 30%, and dispute any errors on your credit report.'}
                      {cat.category === 'Revenue & Profitability' && 'Focus on increasing recurring revenue and reducing unnecessary expenses to show consistent profitability.'}
                      {cat.category === 'Debt & Collateral' && 'Pay down existing balances, especially high-interest debt. Inventory and equipment can serve as collateral.'}
                      {cat.category === 'Documentation & Purpose' && 'Organize 3 months of bank statements, 2 years of tax returns, and a current P&L. Define a clear funding purpose.'}
                    </span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        )}

        {/* CTA */}
        <div className="px-6 sm:px-8 lg:px-10 pb-8">
          <div className="bg-quicklend-50 rounded-xl p-6 text-center">
            <p className="text-gray-700 mb-1 font-medium">
              {results.pct >= 60
                ? 'Your business looks ready for financing. See what you qualify for.'
                : 'A funding specialist can help you find the right path forward, even with gaps in your profile.'}
            </p>
            <p className="text-gray-500 text-sm mb-4">
              No impact to your credit score. No commitment required.
            </p>
            <div className="flex flex-col sm:flex-row gap-3 justify-center">
              <Link
                href="/get-started?source=funding-readiness&loan_type=not-sure"
                className="inline-flex items-center justify-center bg-quicklend-600 text-white font-semibold px-8 py-3 rounded-lg hover:bg-quicklend-700 transition-colors"
              >
                See Your Options <ArrowRight className="ml-2 h-4 w-4" />
              </Link>
              <button
                onClick={handleRestart}
                className="inline-flex items-center justify-center border border-quicklend-300 text-quicklend-700 font-semibold px-6 py-3 rounded-lg hover:bg-quicklend-50 transition-colors text-sm"
              >
                Retake Assessment
              </button>
            </div>
          </div>
        </div>
      </div>
    )
  }

  // ── Question View ───────────────────────────────────────────────

  return (
    <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
      {/* Intro */}
      <div className="p-6 sm:p-8 lg:p-10 pb-0">
        <p className="text-gray-700 leading-relaxed mb-2">
          Answer 8 quick questions about your business to see how ready you are for financing approval. Get a readiness score, category breakdown, and matched loan recommendations.
        </p>
        <p className="text-gray-500 text-sm mb-0">
          No personal information required. Your answers are not stored or shared.
        </p>
      </div>

      {/* Progress */}
      <div className="px-6 sm:px-8 lg:px-10 pt-6">
        <div className="flex items-center justify-between text-xs text-gray-500 mb-2">
          <span>Question {step + 1} of {questions.length}</span>
          <span>{Math.round(progress)}% complete</span>
        </div>
        <div className="w-full bg-gray-100 rounded-full h-2">
          <div
            className="bg-quicklend-600 h-full rounded-full transition-all duration-300"
            style={{ width: `${progress}%` }}
          />
        </div>
      </div>

      {/* Question */}
      <div className="p-6 sm:p-8 lg:p-10">
        <div className="flex items-start gap-3 mb-6">
          <div className="w-8 h-8 rounded-full bg-quicklend-100 text-quicklend-600 flex items-center justify-center text-sm font-bold shrink-0">
            {step + 1}
          </div>
          <div>
            <h3 className="text-lg font-bold text-gray-900">{currentQuestion.label}</h3>
            {currentQuestion.hint && (
              <p className="text-sm text-gray-400 mt-1">{currentQuestion.hint}</p>
            )}
          </div>
        </div>

        <div className="space-y-2 ml-11">
          {currentQuestion.options.map((option) => {
            const isSelected = answers[currentQuestion.id] === option.value
            return (
              <button
                key={option.value}
                onClick={() => handleSelect(option.value)}
                className={`w-full text-left px-4 py-3 rounded-lg border transition-colors ${
                  isSelected
                    ? 'bg-quicklend-50 border-quicklend-600 text-quicklend-900'
                    : 'bg-white border-gray-200 text-gray-700 hover:border-quicklend-300 hover:bg-gray-50'
                }`}
              >
                <span className="text-sm font-medium">{option.label}</span>
              </button>
            )
          })}
        </div>

        {/* Navigation */}
        <div className="flex items-center justify-between mt-8 ml-11">
          <button
            onClick={handleBack}
            disabled={step === 0}
            className={`flex items-center gap-1 text-sm font-medium ${
              step === 0 ? 'text-gray-300 cursor-not-allowed' : 'text-gray-500 hover:text-gray-700'
            }`}
          >
            <ArrowLeft className="h-4 w-4" /> Back
          </button>

          {step === questions.length - 1 && answers[currentQuestion.id] && (
            <button
              onClick={() => setShowResults(true)}
              className="flex items-center gap-1 bg-quicklend-600 text-white font-semibold px-6 py-2.5 rounded-lg hover:bg-quicklend-700 transition-colors text-sm"
            >
              See Results <ArrowRight className="h-4 w-4" />
            </button>
          )}
        </div>
      </div>
    </div>
  )
}
