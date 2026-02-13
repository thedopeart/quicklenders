'use client'

import { useState, useMemo, useCallback } from 'react'
import Link from 'next/link'
import {
  Wrench,
  DollarSign,
  TrendingUp,
  Package,
  Users,
  Building2,
  GitMerge,
  RefreshCw,
  HelpCircle,
  Zap,
  Clock,
  CalendarDays,
  CalendarRange,
  ChevronLeft,
  ChevronRight,
  CheckCircle,
  RotateCcw,
  ArrowRight,
  Star,
  Award,
  ShieldCheck,
} from 'lucide-react'

// ────────────────────────────────────────────────────────────────────
// Types
// ────────────────────────────────────────────────────────────────────

interface QuizOption {
  id: string
  label: string
  icon: React.ComponentType<{ className?: string }>
}

interface QuizQuestion {
  id: string
  question: string
  subtitle?: string
  options: QuizOption[]
}

interface LoanProduct {
  slug: string
  name: string
  path: string
  amountRange: string
  termRange: string
  rateRange: string
  fundingSpeed: string
  description: string
}

interface QuizResult {
  primary: LoanProduct
  primaryScore: number
  alternative: LoanProduct
  alternativeScore: number
  explanation: string
  alternativeExplanation: string
}

// ────────────────────────────────────────────────────────────────────
// Loan Products
// ────────────────────────────────────────────────────────────────────

const loanProducts: Record<string, LoanProduct> = {
  'term-loans': {
    slug: 'term-loans',
    name: 'Term Loan',
    path: '/business-loans/term-loans',
    amountRange: '$30,000 - $10,000,000',
    termRange: '1 - 3 years',
    rateRange: '10 - 25%',
    fundingSpeed: '1 - 5 business days',
    description: 'A lump sum with fixed monthly payments over a set term. Ideal for one-time investments like expansion, equipment, or debt consolidation.',
  },
  'lines-of-credit': {
    slug: 'lines-of-credit',
    name: 'Line of Credit',
    path: '/business-loans/lines-of-credit',
    amountRange: '$30,000 - $10,000,000',
    termRange: '1 - 3 years',
    rateRange: '10 - 25%',
    fundingSpeed: '1 - 3 business days',
    description: 'Revolving credit you draw from as needed. Pay interest only on what you use. Best for managing cash flow, payroll, or recurring expenses.',
  },
  'equipment-financing': {
    slug: 'equipment-financing',
    name: 'Equipment Financing',
    path: '/business-loans/equipment-financing',
    amountRange: '$50,000 - $50,000,000',
    termRange: '1 - 7 years',
    rateRange: '7 - 14%',
    fundingSpeed: '3 - 10 business days',
    description: 'Finance the purchase of equipment, vehicles, or machinery with the asset itself as collateral. Typically offers longer terms and lower rates.',
  },
  'asset-backed-loans': {
    slug: 'asset-backed-loans',
    name: 'Asset-Based Lending',
    path: '/business-loans/asset-backed-loans',
    amountRange: '$250,000 - $100,000,000',
    termRange: '1 - 3 years',
    rateRange: '10 - 25%',
    fundingSpeed: '2 - 4 weeks',
    description: 'Borrow against your business assets: accounts receivable, inventory, equipment, or real estate. Larger amounts for established businesses.',
  },
  esop: {
    slug: 'esop',
    name: 'ESOP Financing',
    path: '/business-loans/esop',
    amountRange: '$1,000,000 - $50,000,000',
    termRange: '3 - 10 years',
    rateRange: '6 - 9%',
    fundingSpeed: '60 - 120 days',
    description: 'Finance an Employee Stock Ownership Plan to transition ownership, provide employee benefits, and gain significant tax advantages.',
  },
  'investment-banking': {
    slug: 'investment-banking',
    name: 'Investment Banking',
    path: '/business-loans/investment-banking',
    amountRange: '$20,000,000+',
    termRange: '1 - 10 years',
    rateRange: '8 - 15%',
    fundingSpeed: '60 - 180 days',
    description: 'Advisory and capital-raising services for major transactions: acquisitions, mergers, recapitalizations, and large-scale growth financing.',
  },
  bonds: {
    slug: 'bonds',
    name: 'Bonds',
    path: '/business-loans/bonds',
    amountRange: '$250,000 - $50,000,000',
    termRange: '1 - 10 years',
    rateRange: '4 - 8%',
    fundingSpeed: '30 - 90 days',
    description: 'Surety, performance, and construction bonds for contractors, real estate projects, and government contracts. Competitive rates for qualified businesses.',
  },
}

// ────────────────────────────────────────────────────────────────────
// Questions
// ────────────────────────────────────────────────────────────────────

const questions: QuizQuestion[] = [
  {
    id: 'purpose',
    question: 'What do you need funding for?',
    subtitle: 'Pick the option that best describes your primary goal.',
    options: [
      { id: 'equipment', label: 'Equipment or machinery', icon: Wrench },
      { id: 'working-capital', label: 'Working capital or cash flow', icon: DollarSign },
      { id: 'expansion', label: 'Expansion or renovation', icon: TrendingUp },
      { id: 'inventory', label: 'Inventory or supplies', icon: Package },
      { id: 'hiring', label: 'Hiring or payroll', icon: Users },
      { id: 'real-estate', label: 'Real estate or property', icon: Building2 },
      { id: 'acquisition', label: 'Acquisition or merger', icon: GitMerge },
      { id: 'refinancing', label: 'Refinancing existing debt', icon: RefreshCw },
      { id: 'not-sure', label: "I'm not sure yet", icon: HelpCircle },
    ],
  },
  {
    id: 'urgency',
    question: 'How quickly do you need the funds?',
    options: [
      { id: 'immediately', label: 'Within days', icon: Zap },
      { id: '1-2-weeks', label: '1 - 2 weeks', icon: Clock },
      { id: '1-3-months', label: '1 - 3 months', icon: CalendarDays },
      { id: 'no-rush', label: 'No rush, planning ahead', icon: CalendarRange },
    ],
  },
  {
    id: 'amount',
    question: 'How much funding do you need?',
    options: [
      { id: 'under-50k', label: 'Under $50,000', icon: DollarSign },
      { id: '50k-250k', label: '$50,000 - $250,000', icon: DollarSign },
      { id: '250k-1m', label: '$250,000 - $1,000,000', icon: DollarSign },
      { id: '1m-10m', label: '$1,000,000 - $10,000,000', icon: DollarSign },
      { id: '10m-plus', label: '$10,000,000+', icon: DollarSign },
    ],
  },
  {
    id: 'stage',
    question: 'How long has your business been operating?',
    options: [
      { id: 'startup', label: 'Pre-revenue or startup', icon: Star },
      { id: 'under-1', label: 'Less than 1 year', icon: Clock },
      { id: '1-3', label: '1 - 3 years', icon: CalendarDays },
      { id: '3-10', label: '3 - 10 years', icon: CalendarRange },
      { id: '10-plus', label: '10+ years', icon: Award },
    ],
  },
  {
    id: 'credit',
    question: "What's your approximate credit score?",
    subtitle: 'We never pull your credit. This helps us recommend the right product.',
    options: [
      { id: 'excellent', label: 'Excellent (720+)', icon: ShieldCheck },
      { id: 'good', label: 'Good (680 - 719)', icon: CheckCircle },
      { id: 'fair', label: 'Fair (620 - 679)', icon: Star },
      { id: 'building', label: 'Building (under 620)', icon: TrendingUp },
      { id: 'not-sure', label: "I'm not sure", icon: HelpCircle },
    ],
  },
]

// ────────────────────────────────────────────────────────────────────
// Scoring Matrix
// ────────────────────────────────────────────────────────────────────

type ProductKey = 'term-loans' | 'lines-of-credit' | 'equipment-financing' | 'asset-backed-loans' | 'esop' | 'investment-banking' | 'bonds'

const scoreMatrix: Record<string, Record<string, Record<ProductKey, number>>> = {
  purpose: {
    equipment:        { 'term-loans': 1, 'lines-of-credit': 0, 'equipment-financing': 5, 'asset-backed-loans': 1, esop: 0, 'investment-banking': 0, bonds: 0 },
    'working-capital':{ 'term-loans': 3, 'lines-of-credit': 5, 'equipment-financing': 0, 'asset-backed-loans': 1, esop: 0, 'investment-banking': 0, bonds: 0 },
    expansion:        { 'term-loans': 4, 'lines-of-credit': 2, 'equipment-financing': 1, 'asset-backed-loans': 3, esop: 0, 'investment-banking': 1, bonds: 1 },
    inventory:        { 'term-loans': 1, 'lines-of-credit': 4, 'equipment-financing': 0, 'asset-backed-loans': 3, esop: 0, 'investment-banking': 0, bonds: 0 },
    hiring:           { 'term-loans': 2, 'lines-of-credit': 4, 'equipment-financing': 0, 'asset-backed-loans': 0, esop: 1, 'investment-banking': 0, bonds: 0 },
    'real-estate':    { 'term-loans': 1, 'lines-of-credit': 0, 'equipment-financing': 0, 'asset-backed-loans': 5, esop: 0, 'investment-banking': 1, bonds: 3 },
    acquisition:      { 'term-loans': 1, 'lines-of-credit': 0, 'equipment-financing': 0, 'asset-backed-loans': 2, esop: 4, 'investment-banking': 5, bonds: 1 },
    refinancing:      { 'term-loans': 4, 'lines-of-credit': 3, 'equipment-financing': 0, 'asset-backed-loans': 1, esop: 0, 'investment-banking': 0, bonds: 0 },
    'not-sure':       { 'term-loans': 2, 'lines-of-credit': 2, 'equipment-financing': 1, 'asset-backed-loans': 1, esop: 0, 'investment-banking': 0, bonds: 0 },
  },
  urgency: {
    immediately:      { 'term-loans': 2, 'lines-of-credit': 4, 'equipment-financing': 0, 'asset-backed-loans': -1, esop: -3, 'investment-banking': -3, bonds: -3 },
    '1-2-weeks':      { 'term-loans': 3, 'lines-of-credit': 3, 'equipment-financing': 3, 'asset-backed-loans': 1, esop: -2, 'investment-banking': -2, bonds: -2 },
    '1-3-months':     { 'term-loans': 2, 'lines-of-credit': 1, 'equipment-financing': 2, 'asset-backed-loans': 3, esop: 2, 'investment-banking': 1, bonds: 2 },
    'no-rush':        { 'term-loans': 1, 'lines-of-credit': 1, 'equipment-financing': 1, 'asset-backed-loans': 2, esop: 4, 'investment-banking': 4, bonds: 4 },
  },
  amount: {
    'under-50k':      { 'term-loans': 3, 'lines-of-credit': 4, 'equipment-financing': 2, 'asset-backed-loans': -2, esop: -3, 'investment-banking': -5, bonds: -3 },
    '50k-250k':       { 'term-loans': 4, 'lines-of-credit': 3, 'equipment-financing': 4, 'asset-backed-loans': 1, esop: -2, 'investment-banking': -4, bonds: -2 },
    '250k-1m':        { 'term-loans': 3, 'lines-of-credit': 2, 'equipment-financing': 3, 'asset-backed-loans': 4, esop: 1, 'investment-banking': -2, bonds: 1 },
    '1m-10m':         { 'term-loans': 1, 'lines-of-credit': 1, 'equipment-financing': 2, 'asset-backed-loans': 4, esop: 4, 'investment-banking': 1, bonds: 3 },
    '10m-plus':       { 'term-loans': -1, 'lines-of-credit': -1, 'equipment-financing': 0, 'asset-backed-loans': 2, esop: 3, 'investment-banking': 5, bonds: 4 },
  },
  stage: {
    startup:          { 'term-loans': -2, 'lines-of-credit': -1, 'equipment-financing': -2, 'asset-backed-loans': -3, esop: -5, 'investment-banking': -5, bonds: -5 },
    'under-1':        { 'term-loans': 1, 'lines-of-credit': 2, 'equipment-financing': 1, 'asset-backed-loans': -1, esop: -4, 'investment-banking': -4, bonds: -3 },
    '1-3':            { 'term-loans': 3, 'lines-of-credit': 3, 'equipment-financing': 3, 'asset-backed-loans': 2, esop: -1, 'investment-banking': -2, bonds: 1 },
    '3-10':           { 'term-loans': 3, 'lines-of-credit': 3, 'equipment-financing': 3, 'asset-backed-loans': 3, esop: 3, 'investment-banking': 2, bonds: 3 },
    '10-plus':        { 'term-loans': 2, 'lines-of-credit': 2, 'equipment-financing': 2, 'asset-backed-loans': 3, esop: 5, 'investment-banking': 4, bonds: 3 },
  },
  credit: {
    excellent:        { 'term-loans': 3, 'lines-of-credit': 3, 'equipment-financing': 3, 'asset-backed-loans': 2, esop: 2, 'investment-banking': 2, bonds: 2 },
    good:             { 'term-loans': 2, 'lines-of-credit': 2, 'equipment-financing': 2, 'asset-backed-loans': 2, esop: 1, 'investment-banking': 1, bonds: 1 },
    fair:             { 'term-loans': 1, 'lines-of-credit': 1, 'equipment-financing': 1, 'asset-backed-loans': 2, esop: 0, 'investment-banking': -1, bonds: 0 },
    building:         { 'term-loans': -1, 'lines-of-credit': 0, 'equipment-financing': -1, 'asset-backed-loans': 2, esop: -2, 'investment-banking': -3, bonds: -2 },
    'not-sure':       { 'term-loans': 1, 'lines-of-credit': 1, 'equipment-financing': 1, 'asset-backed-loans': 1, esop: 0, 'investment-banking': 0, bonds: 0 },
  },
}

// ────────────────────────────────────────────────────────────────────
// Explanation generators
// ────────────────────────────────────────────────────────────────────

const purposeLabels: Record<string, string> = {
  equipment: 'equipment or machinery',
  'working-capital': 'working capital and cash flow',
  expansion: 'business expansion',
  inventory: 'inventory or supplies',
  hiring: 'hiring and payroll',
  'real-estate': 'real estate or property',
  acquisition: 'an acquisition or merger',
  refinancing: 'refinancing existing debt',
  'not-sure': 'general business needs',
}

function generateExplanation(product: LoanProduct, answers: Record<string, string>): string {
  const purpose = purposeLabels[answers.purpose] || 'your business needs'
  const name = product.name

  const explanations: Record<string, string> = {
    'term-loans': `A term loan gives you a lump sum upfront with predictable monthly payments over a fixed schedule. For ${purpose}, this structure lets you plan your budget around a known payment amount while investing the capital where it matters most. Term loans typically offer competitive rates for borrowers with established businesses and solid credit profiles.`,
    'lines-of-credit': `A business line of credit gives you flexible, on-demand access to capital. You draw funds as needed and only pay interest on what you use. For ${purpose}, this flexibility is valuable because you can scale your draws up or down based on real-time needs rather than committing to a single lump sum. Once you repay, the credit becomes available again.`,
    'equipment-financing': `Equipment financing lets you acquire the machinery or equipment you need with the asset itself serving as collateral. This typically means lower rates and longer terms compared to unsecured options. For ${purpose}, the equipment you purchase secures the loan, so lenders can offer more favorable terms since their risk is backed by a tangible asset.`,
    'asset-backed-loans': `Asset-based lending unlocks capital by borrowing against assets your business already owns, such as real estate, accounts receivable, inventory, or equipment. For ${purpose}, this approach can provide access to larger funding amounts than unsecured options since lenders evaluate the value of your collateral alongside your business performance.`,
    esop: `ESOP financing funds the creation or expansion of an Employee Stock Ownership Plan, which transfers ownership to employees over time. For businesses looking at succession planning or ownership transition, ESOPs provide significant tax advantages while rewarding the team that built the company. The longer timeline and lower rates reflect the structured nature of these transactions.`,
    'investment-banking': `Investment banking services provide advisory support and capital-raising for major transactions. For ${purpose} at this scale, you need a partner who can structure the deal, identify the right capital sources, and manage the process from term sheet to close. This is relationship-driven financing where the advisory component is as important as the capital.`,
    bonds: `Bonds provide surety, performance, or construction bonding for qualified businesses. For ${purpose}, bonds offer some of the lowest rates available in business financing. They work well for businesses with real estate holdings, government contracts, or projects that require performance guarantees.`,
  }

  return explanations[product.slug] || `A ${name} is a strong fit for ${purpose} based on your business profile.`
}

function generateAltExplanation(product: LoanProduct): string {
  return `${product.name} could also work for your situation. ${product.description}`
}

// ────────────────────────────────────────────────────────────────────
// Score calculator
// ────────────────────────────────────────────────────────────────────

function calculateScores(answers: Record<string, string>): Record<ProductKey, number> {
  const scores: Record<ProductKey, number> = {
    'term-loans': 0,
    'lines-of-credit': 0,
    'equipment-financing': 0,
    'asset-backed-loans': 0,
    esop: 0,
    'investment-banking': 0,
    bonds: 0,
  }

  for (const [questionId, answerId] of Object.entries(answers)) {
    const questionMatrix = scoreMatrix[questionId]
    if (!questionMatrix) continue
    const modifiers = questionMatrix[answerId]
    if (!modifiers) continue
    for (const [product, modifier] of Object.entries(modifiers)) {
      scores[product as ProductKey] += modifier
    }
  }

  return scores
}

function getResult(answers: Record<string, string>): QuizResult {
  const scores = calculateScores(answers)

  const sorted = Object.entries(scores).sort((a, b) => b[1] - a[1])
  const primaryKey = sorted[0][0] as ProductKey
  const altKey = sorted[1][0] as ProductKey

  const primary = loanProducts[primaryKey]
  const alternative = loanProducts[altKey]

  return {
    primary,
    primaryScore: sorted[0][1],
    alternative,
    alternativeScore: sorted[1][1],
    explanation: generateExplanation(primary, answers),
    alternativeExplanation: generateAltExplanation(alternative),
  }
}

// ────────────────────────────────────────────────────────────────────
// Component
// ────────────────────────────────────────────────────────────────────

export default function LoanFinderQuiz() {
  const [currentQuestion, setCurrentQuestion] = useState(0)
  const [answers, setAnswers] = useState<Record<string, string>>({})
  const [selectedOption, setSelectedOption] = useState<string | null>(null)
  const [showResult, setShowResult] = useState(false)

  const totalQuestions = questions.length
  const progress = showResult ? 100 : ((currentQuestion) / totalQuestions) * 100

  const result = useMemo(() => {
    if (!showResult) return null
    return getResult(answers)
  }, [showResult, answers])

  const handleSelect = useCallback((optionId: string) => {
    const q = questions[currentQuestion]
    setSelectedOption(optionId)

    setTimeout(() => {
      const newAnswers = { ...answers, [q.id]: optionId }
      setAnswers(newAnswers)
      setSelectedOption(null)

      if (currentQuestion < totalQuestions - 1) {
        setCurrentQuestion((prev) => prev + 1)
      } else {
        setShowResult(true)
      }
    }, 400)
  }, [currentQuestion, answers, totalQuestions])

  const handleBack = useCallback(() => {
    if (showResult) {
      setShowResult(false)
      return
    }
    if (currentQuestion > 0) {
      setCurrentQuestion((prev) => prev - 1)
    }
  }, [currentQuestion, showResult])

  const handleRetake = useCallback(() => {
    setCurrentQuestion(0)
    setAnswers({})
    setSelectedOption(null)
    setShowResult(false)
  }, [])

  // ── Result Screen ──────────────────────────────────────────────
  if (showResult && result) {
    return (
      <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
        {/* Progress bar - complete */}
        <div className="h-2 bg-gray-100">
          <div className="h-full bg-quicklend-600 transition-all duration-500 ease-out" style={{ width: '100%' }} />
        </div>

        {/* Result Header */}
        <div className="p-6 sm:p-8 lg:p-10 text-center border-b border-gray-100">
          <p className="text-sm font-semibold text-quicklend-600 uppercase tracking-wider mb-2">Your Recommendation</p>
          <h2 className="text-3xl sm:text-4xl font-bold text-quicklend-900 mb-3">{result.primary.name}</h2>
          <p className="text-gray-600 max-w-xl mx-auto">Based on your answers, here is our recommendation for your business.</p>
        </div>

        {/* Primary Recommendation Card */}
        <div className="p-6 sm:p-8 lg:p-10">
          <div className="bg-quicklend-50 border border-quicklend-200 rounded-2xl p-6 sm:p-8">
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mb-6">
              <div className="text-center">
                <p className="text-xs text-gray-500 uppercase tracking-wider mb-1">Amount Range</p>
                <p className="text-sm font-bold text-quicklend-900">{result.primary.amountRange}</p>
              </div>
              <div className="text-center">
                <p className="text-xs text-gray-500 uppercase tracking-wider mb-1">Typical Terms</p>
                <p className="text-sm font-bold text-quicklend-900">{result.primary.termRange}</p>
              </div>
              <div className="text-center">
                <p className="text-xs text-gray-500 uppercase tracking-wider mb-1">Rate Range</p>
                <p className="text-sm font-bold text-quicklend-900">{result.primary.rateRange}</p>
              </div>
              <div className="text-center">
                <p className="text-xs text-gray-500 uppercase tracking-wider mb-1">Funding Speed</p>
                <p className="text-sm font-bold text-quicklend-900">{result.primary.fundingSpeed}</p>
              </div>
            </div>

            <div className="flex flex-col sm:flex-row gap-3 justify-center">
              <Link
                href={`/get-started?loan_type=${result.primary.slug}&source=quiz-result`}
                className="inline-flex items-center justify-center bg-quicklend-600 text-white font-semibold px-8 py-3 rounded-lg hover:bg-quicklend-700 transition-colors"
              >
                Get Your Options <ArrowRight className="ml-2 h-4 w-4" />
              </Link>
              <Link
                href={result.primary.path}
                className="inline-flex items-center justify-center bg-white text-quicklend-700 font-semibold px-8 py-3 rounded-lg border border-quicklend-200 hover:bg-quicklend-50 transition-colors"
              >
                Learn More
              </Link>
            </div>
          </div>
        </div>

        {/* Why This Fits */}
        <div className="px-6 sm:px-8 lg:px-10 pb-8">
          <h3 className="text-xl font-bold text-quicklend-900 mb-3">Why This Is Your Best Fit</h3>
          <p className="text-gray-700 leading-relaxed">{result.explanation}</p>
        </div>

        {/* Alternative */}
        <div className="px-6 sm:px-8 lg:px-10 pb-8">
          <div className="bg-gray-50 border border-gray-200 rounded-xl p-6">
            <div className="flex items-start gap-3 mb-3">
              <Award className="h-5 w-5 text-gray-500 mt-0.5 flex-shrink-0" />
              <div>
                <h4 className="font-bold text-quicklend-900">Also Consider: {result.alternative.name}</h4>
                <p className="text-gray-600 text-sm leading-relaxed mt-1">{result.alternativeExplanation}</p>
                <Link
                  href={result.alternative.path}
                  className="inline-flex items-center text-quicklend-600 font-semibold text-sm mt-2 hover:text-quicklend-700"
                >
                  Learn about {result.alternative.name} <ArrowRight className="ml-1 h-3 w-3" />
                </Link>
              </div>
            </div>
          </div>
        </div>

        {/* Your Answers Summary */}
        <div className="px-6 sm:px-8 lg:px-10 pb-8">
          <details className="group">
            <summary className="cursor-pointer text-sm font-semibold text-gray-500 hover:text-gray-700 flex items-center gap-2">
              <ChevronRight className="h-4 w-4 group-open:rotate-90 transition-transform" />
              View Your Answers
            </summary>
            <div className="mt-3 space-y-2">
              {questions.map((q) => {
                const answerId = answers[q.id]
                const option = q.options.find((o) => o.id === answerId)
                return (
                  <div key={q.id} className="flex items-center gap-3 text-sm">
                    <CheckCircle className="h-4 w-4 text-quicklend-600 flex-shrink-0" />
                    <span className="text-gray-500">{q.question}</span>
                    <span className="font-medium text-quicklend-900">{option?.label || '-'}</span>
                  </div>
                )
              })}
            </div>
          </details>
        </div>

        {/* Next Steps */}
        <div className="px-6 sm:px-8 lg:px-10 pb-8">
          <h3 className="text-lg font-bold text-quicklend-900 mb-4">Next Steps</h3>
          <div className="grid sm:grid-cols-3 gap-4">
            <Link href={result.primary.path} className="group bg-white border border-gray-200 rounded-xl p-4 hover:border-quicklend-300 hover:shadow-sm transition-all">
              <div className="w-8 h-8 rounded-lg bg-quicklend-50 flex items-center justify-center text-quicklend-600 font-bold text-sm mb-2">1</div>
              <p className="font-semibold text-quicklend-900 text-sm group-hover:text-quicklend-700">Review {result.primary.name} details</p>
              <p className="text-gray-500 text-xs mt-1">Rates, terms, and requirements</p>
            </Link>
            <Link href="/tools/loan-payment-calculator" className="group bg-white border border-gray-200 rounded-xl p-4 hover:border-quicklend-300 hover:shadow-sm transition-all">
              <div className="w-8 h-8 rounded-lg bg-quicklend-50 flex items-center justify-center text-quicklend-600 font-bold text-sm mb-2">2</div>
              <p className="font-semibold text-quicklend-900 text-sm group-hover:text-quicklend-700">Estimate your payments</p>
              <p className="text-gray-500 text-xs mt-1">Use our loan payment calculator</p>
            </Link>
            <Link href={`/get-started?loan_type=${result.primary.slug}&source=quiz-result`} className="group bg-white border border-gray-200 rounded-xl p-4 hover:border-quicklend-300 hover:shadow-sm transition-all">
              <div className="w-8 h-8 rounded-lg bg-quicklend-50 flex items-center justify-center text-quicklend-600 font-bold text-sm mb-2">3</div>
              <p className="font-semibold text-quicklend-900 text-sm group-hover:text-quicklend-700">Get your options</p>
              <p className="text-gray-500 text-xs mt-1">No impact to your credit score</p>
            </Link>
          </div>
        </div>

        {/* Retake */}
        <div className="px-6 sm:px-8 lg:px-10 pb-10 text-center">
          <button
            onClick={handleRetake}
            className="inline-flex items-center text-gray-500 hover:text-quicklend-700 font-medium text-sm transition-colors"
          >
            <RotateCcw className="mr-2 h-4 w-4" />
            Retake Quiz
          </button>
        </div>
      </div>
    )
  }

  // ── Quiz Screen ────────────────────────────────────────────────
  const q = questions[currentQuestion]

  return (
    <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
      {/* Progress bar */}
      <div className="h-2 bg-gray-100">
        <div
          className="h-full bg-quicklend-600 transition-all duration-500 ease-out"
          style={{ width: `${progress}%` }}
        />
      </div>

      {/* Question header */}
      <div className="p-6 sm:p-8 lg:p-10 pb-0">
        <div className="flex items-center justify-between mb-6">
          <p className="text-sm font-medium text-gray-500">
            Question {currentQuestion + 1} of {totalQuestions}
          </p>
          {currentQuestion > 0 && (
            <button
              onClick={handleBack}
              className="inline-flex items-center text-sm text-gray-500 hover:text-quicklend-700 font-medium transition-colors"
            >
              <ChevronLeft className="mr-1 h-4 w-4" />
              Back
            </button>
          )}
        </div>

        <h2 className="text-2xl sm:text-3xl font-bold text-quicklend-900 mb-2">{q.question}</h2>
        {q.subtitle && (
          <p className="text-gray-500 mb-0">{q.subtitle}</p>
        )}
      </div>

      {/* Options */}
      <div className="p-6 sm:p-8 lg:p-10">
        <div className={`grid gap-3 ${q.options.length <= 4 ? 'sm:grid-cols-2' : 'sm:grid-cols-2 lg:grid-cols-3'}`}>
          {q.options.map((option) => {
            const Icon = option.icon
            const isSelected = selectedOption === option.id
            const prevAnswer = answers[q.id]
            const wasPreviouslySelected = prevAnswer === option.id && !selectedOption

            return (
              <button
                key={option.id}
                onClick={() => handleSelect(option.id)}
                disabled={selectedOption !== null}
                className={`
                  flex items-center gap-3 p-4 rounded-xl border-2 text-left transition-all duration-200
                  ${isSelected
                    ? 'border-quicklend-600 bg-quicklend-50 scale-[1.02]'
                    : wasPreviouslySelected
                      ? 'border-quicklend-200 bg-quicklend-50/50'
                      : 'border-gray-200 bg-white hover:border-quicklend-300 hover:bg-gray-50'
                  }
                  ${selectedOption !== null && !isSelected ? 'opacity-60' : ''}
                  disabled:cursor-default
                `}
              >
                <div className={`w-10 h-10 rounded-lg flex items-center justify-center flex-shrink-0 transition-colors ${
                  isSelected ? 'bg-quicklend-600 text-white' : 'bg-gray-100 text-gray-500'
                }`}>
                  {isSelected ? <CheckCircle className="h-5 w-5" /> : <Icon className="h-5 w-5" />}
                </div>
                <span className={`font-medium text-sm ${isSelected ? 'text-quicklend-900' : 'text-gray-700'}`}>
                  {option.label}
                </span>
              </button>
            )
          })}
        </div>
      </div>
    </div>
  )
}
