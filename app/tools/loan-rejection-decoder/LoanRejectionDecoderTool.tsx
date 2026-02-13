'use client'

import { useState } from 'react'
import Link from 'next/link'
import { ChevronRight, CheckCircle, AlertTriangle, XCircle, Clock, TrendingUp } from 'lucide-react'

/* ------------------------------------------------------------------ */
/*  Types & Data                                                       */
/* ------------------------------------------------------------------ */

type LoanType = 'sba' | 'bank' | 'loc' | 'equipment' | 'online' | 'mca' | 'factoring' | 'not-sure' | 'not-applied'

const loanTypeLabels: Record<LoanType, string> = {
  sba: 'SBA Loan (7a, 504, Microloan)',
  bank: 'Bank Term Loan',
  loc: 'Business Line of Credit',
  equipment: 'Equipment Financing',
  online: 'Online Lender / Fintech',
  mca: 'Merchant Cash Advance',
  factoring: 'Invoice Factoring',
  'not-sure': 'I\'m not sure',
  'not-applied': 'Haven\'t applied yet',
}

type RejectionReason =
  | 'credit-score'
  | 'time-in-business'
  | 'revenue'
  | 'cash-flow'
  | 'existing-debt'
  | 'industry'
  | 'documentation'
  | 'bankruptcy'
  | 'no-collateral'
  | 'startup'
  | 'down-payment'
  | 'personal-guarantee'
  | 'no-reason'
  | 'not-sure'

const rejectionReasonLabels: Record<RejectionReason, string> = {
  'credit-score': 'Credit score too low',
  'time-in-business': 'Not enough time in business',
  revenue: 'Revenue too low',
  'cash-flow': 'Cash flow / DSCR insufficient',
  'existing-debt': 'Too much existing debt',
  industry: 'Industry not accepted',
  documentation: 'Incomplete documentation',
  bankruptcy: 'Previous bankruptcy or default',
  'no-collateral': 'No collateral',
  startup: 'Business is too new / startup',
  'down-payment': 'Insufficient down payment (SBA)',
  'personal-guarantee': 'Personal guarantee issues',
  'no-reason': 'They didn\'t give a reason',
  'not-sure': 'I\'m not sure',
}

type CreditRange = 'below-550' | '550-599' | '600-649' | '650-679' | '680-719' | '720-749' | '750+' | 'unknown'
type TimeInBusiness = 'pre-revenue' | 'under-6mo' | '6-12mo' | '1-2yr' | '2-5yr' | '5yr+'
type RevenueRange = 'pre-revenue' | 'under-10k' | '10k-25k' | '25k-50k' | '50k-100k' | '100k-250k' | '250k+'

const creditLabels: Record<CreditRange, string> = {
  'below-550': 'Below 550', '550-599': '550-599', '600-649': '600-649', '650-679': '650-679',
  '680-719': '680-719', '720-749': '720-749', '750+': '750+', unknown: 'I don\'t know',
}

const timeLabels: Record<TimeInBusiness, string> = {
  'pre-revenue': 'Pre-revenue / Startup', 'under-6mo': 'Under 6 months', '6-12mo': '6-12 months',
  '1-2yr': '1-2 years', '2-5yr': '2-5 years', '5yr+': '5+ years',
}

const revenueLabels: Record<RevenueRange, string> = {
  'pre-revenue': 'Pre-revenue', 'under-10k': 'Under $10k/mo', '10k-25k': '$10k-$25k/mo',
  '25k-50k': '$25k-$50k/mo', '50k-100k': '$50k-$100k/mo', '100k-250k': '$100k-$250k/mo', '250k+': '$250k+/mo',
}

/* ------------------------------------------------------------------ */
/*  Rejection reason database                                          */
/* ------------------------------------------------------------------ */

interface RoadmapItem {
  title: string
  severity: 'high' | 'medium' | 'low'
  target: string
  timeframe: string
  actions: { period: string; steps: string[] }[]
  alternatives: string[]
}

function getRoadmap(reason: RejectionReason, credit: CreditRange, time: TimeInBusiness, revenue: RevenueRange, loanType: LoanType): RoadmapItem {
  switch (reason) {
    case 'credit-score':
      return {
        title: 'Credit Score Too Low',
        severity: 'medium',
        target: loanType === 'sba' || loanType === 'bank' ? '680+' : loanType === 'online' ? '600+' : '550+',
        timeframe: '3-6 months',
        actions: [
          { period: 'Week 1-2', steps: ['Pull free credit reports from all 3 bureaus', 'Dispute any errors you find', 'Check credit utilization (aim for under 30%)'] },
          { period: 'Month 1-2', steps: ['Pay down credit card balances', 'Do not apply for new credit', 'Set up autopay for all accounts'] },
          { period: 'Month 3-6', steps: ['Continue on-time payments', 'Keep utilization low', 'Re-check score before reapplying'] },
        ],
        alternatives: ['Online lenders (550-600+ credit)', 'Revenue-based financing', 'Invoice factoring (based on customer credit)', 'Equipment financing (collateral helps)', 'Microloans / CDFIs'],
      }
    case 'time-in-business':
      return {
        title: 'Not Enough Time in Business',
        severity: 'high',
        target: loanType === 'sba' || loanType === 'bank' ? '2+ years' : '6-12 months',
        timeframe: 'Depends on current tenure',
        actions: [
          { period: 'Now', steps: ['Keep detailed financial records', 'Build business credit with vendor accounts', 'Open a business credit card and pay in full monthly'] },
          { period: 'Ongoing', steps: ['Maintain or grow revenue consistently', 'Avoid any negative marks or late payments', 'Save business tax returns for future applications'] },
        ],
        alternatives: ['Online lenders (6-month minimum)', 'Microloans (often more flexible)', 'Revenue-based financing', 'Business credit cards', 'Crowdfunding for specific projects'],
      }
    case 'revenue':
      return {
        title: 'Revenue Too Low',
        severity: 'medium',
        target: loanType === 'sba' ? '$100k+/year' : loanType === 'bank' ? '$250k+/year' : '$50k+/year',
        timeframe: '3-12 months',
        actions: [
          { period: 'Immediate', steps: ['Request a smaller loan amount (lower revenue requirement)', 'Document all revenue sources (including cash, online, side services)', 'Apply during your busiest season for best numbers'] },
          { period: 'Month 1-6', steps: ['Focus on revenue growth strategies', 'Track and document monthly revenue trends', 'Build a 6-month revenue history for stronger application'] },
        ],
        alternatives: ['Smaller loan amount', 'Online lenders with lower minimums', 'Microloans ($500-$50,000)', 'Business credit cards', 'Revenue-based financing (scales with sales)'],
      }
    case 'cash-flow':
      return {
        title: 'Cash Flow / DSCR Insufficient',
        severity: 'medium',
        target: loanType === 'sba' ? 'DSCR 1.25+' : loanType === 'bank' ? 'DSCR 1.20+' : 'DSCR 1.0+',
        timeframe: '3-6 months',
        actions: [
          { period: 'Immediate', steps: ['Use a DSCR calculator to know your exact number', 'Request a smaller loan (lower payment = better ratio)', 'Request a longer term (lower monthly payment)'] },
          { period: 'Month 1-3', steps: ['Cut non-essential operating expenses', 'Increase revenue where possible', 'Pay down existing debt to reduce total payments'] },
        ],
        alternatives: ['Longer loan term (lower payments)', 'Smaller loan amount', 'Revenue-based financing (no fixed payments)', 'Invoice factoring (not traditional debt)', 'Line of credit (only pay on what you draw)'],
      }
    case 'existing-debt':
      return {
        title: 'Too Much Existing Debt',
        severity: 'medium',
        target: 'Reduce total debt obligations',
        timeframe: '3-12 months',
        actions: [
          { period: 'Immediate', steps: ['List all current debts with balances and payments', 'Identify highest-interest debt for priority paydown', 'Do not take on any new debt'] },
          { period: 'Month 1-6', steps: ['Focus payments on highest-interest obligations', 'Consider consolidating multiple debts', 'Wait for existing loans to mature and pay off'] },
        ],
        alternatives: ['Debt consolidation loan', 'Refinance to lower existing payments', 'Smaller new loan request', 'Revenue-based financing'],
      }
    case 'industry':
      return {
        title: 'Industry Not Accepted',
        severity: 'high',
        target: 'Find lenders who serve your industry',
        timeframe: 'Immediate (find the right lender)',
        actions: [
          { period: 'Immediate', steps: ['Search for "[your industry] business financing"', 'Look for industry-specialist lenders', 'Check if alternative financing types have fewer restrictions'] },
          { period: 'Research', steps: ['Online lenders often have fewer industry restrictions', 'Equipment financing is asset-backed and less industry-sensitive', 'Revenue-based financing focuses on cash flow, not industry'] },
        ],
        alternatives: ['Industry-specialist lenders', 'Online lenders (fewer restrictions)', 'Equipment financing (asset-backed)', 'Revenue-based financing', 'Invoice factoring'],
      }
    case 'documentation':
      return {
        title: 'Incomplete Documentation',
        severity: 'low',
        target: 'Complete application package',
        timeframe: '1-4 weeks',
        actions: [
          { period: 'Week 1', steps: ['Ask the lender exactly which documents are missing', 'Gather last 2 years of business and personal tax returns', 'Prepare 3-6 months of bank statements'] },
          { period: 'Week 2-4', steps: ['Create a profit and loss statement if you do not have one', 'Compile a business debt schedule (all current loans)', 'Write a brief business plan or use-of-funds statement'] },
        ],
        alternatives: ['Reapply with complete documents to same lender', 'Online lenders (often require fewer documents)', 'Revenue-based financing (minimal documentation)'],
      }
    case 'bankruptcy':
      return {
        title: 'Previous Bankruptcy or Default',
        severity: 'high',
        target: 'Time-based recovery + credit rebuilding',
        timeframe: '2-7 years depending on recency',
        actions: [
          { period: 'If under 2 years', steps: ['Focus on rebuilding credit with secured cards', 'Build business revenue track record', 'Consider alternative financing while waiting'] },
          { period: 'If 2-5 years', steps: ['Some online lenders and SBA lenders will consider you', 'Document your recovery and improved financials', 'Have explanation ready for the bankruptcy'] },
          { period: 'If 5+ years', steps: ['Most lenders will consider you', 'Make sure credit score has recovered', 'Apply with strong current financials'] },
        ],
        alternatives: ['Online lenders (second-chance financing)', 'Secured business credit cards', 'Revenue-based financing', 'Invoice factoring (based on customer credit)', 'Microloans / CDFIs'],
      }
    case 'no-collateral':
      return {
        title: 'No Collateral Available',
        severity: 'medium',
        target: 'Find unsecured options or use business assets',
        timeframe: 'Immediate',
        actions: [
          { period: 'Immediate', steps: ['Consider if any business assets could serve as collateral', 'Equipment you plan to purchase can be its own collateral', 'Accounts receivable can be collateral via factoring'] },
          { period: 'Alternatives', steps: ['Unsecured online term loans (higher rates but no collateral)', 'Business line of credit (many are unsecured)', 'Revenue-based financing (no collateral required)'] },
        ],
        alternatives: ['Unsecured online term loans', 'Business line of credit', 'Revenue-based financing', 'Invoice factoring', 'Business credit cards'],
      }
    case 'startup':
      return {
        title: 'Business Too New / Startup',
        severity: 'high',
        target: 'Build track record or find startup-friendly options',
        timeframe: '6-24 months',
        actions: [
          { period: 'Now', steps: ['Focus on generating and documenting revenue', 'Open business bank account and use it for all transactions', 'Build business credit with vendor accounts and credit cards'] },
          { period: 'Month 3-6', steps: ['Online lenders may consider you at 6 months', 'Keep detailed financial records for future applications', 'Consider microloans designed for startups'] },
        ],
        alternatives: ['Microloans / CDFI loans (startup-friendly)', 'Business credit cards', 'Personal loans for business use', 'Crowdfunding', 'Friends and family with formal agreement'],
      }
    case 'down-payment':
      return {
        title: 'Insufficient Down Payment (SBA)',
        severity: 'medium',
        target: 'SBA typically requires 10-20% down',
        timeframe: '3-12 months to save',
        actions: [
          { period: 'Immediate', steps: ['Calculate exactly how much down payment is needed', 'Ask if a lower down payment is possible with stronger financials', 'Consider if seller financing could cover part of the down payment'] },
          { period: 'Month 1-6', steps: ['Set up a dedicated savings plan for the down payment', 'Consider liquidating non-essential business assets', 'Explore if equity injection from a partner is possible'] },
        ],
        alternatives: ['Online lenders (often no down payment)', 'Equipment financing (equipment is the collateral)', 'Business line of credit', 'Smaller loan amount requiring less down payment'],
      }
    case 'personal-guarantee':
      return {
        title: 'Personal Guarantee Issues',
        severity: 'medium',
        target: 'Resolve guarantee concerns or find alternatives',
        timeframe: 'Varies',
        actions: [
          { period: 'Immediate', steps: ['Understand what the guarantee requires (limited vs unlimited)', 'Ask if a limited guarantee is acceptable', 'Check if personal credit or assets are the issue'] },
          { period: 'Alternatives', steps: ['Some online lenders do not require personal guarantees', 'Revenue-based financing often has no PG requirement', 'Equipment financing where the equipment is the collateral'] },
        ],
        alternatives: ['Online lenders without PG requirements', 'Revenue-based financing', 'Equipment financing', 'Invoice factoring'],
      }
    default:
      return {
        title: 'Reason Not Specified',
        severity: 'medium',
        target: 'Identify the specific issue',
        timeframe: 'Varies',
        actions: [
          { period: 'Immediate', steps: ['Contact the lender and ask for specific denial reasons', 'Pull your credit report to check for issues', 'Review your business financials for weak spots'] },
          { period: 'Next Steps', steps: ['Use our loan finder quiz to see what fits your profile', 'Check your DSCR to evaluate debt capacity', 'Consider applying with a different lender type'] },
        ],
        alternatives: ['Try a different lender type', 'Online lenders (more flexible)', 'Revenue-based financing', 'Equipment financing'],
      }
  }
}

/* ------------------------------------------------------------------ */
/*  Alternatives matcher                                               */
/* ------------------------------------------------------------------ */

interface Alternative {
  name: string
  creditReq: string
  timeReq: string
  status: 'likely' | 'possible' | 'unlikely'
  note: string
}

function getAlternatives(credit: CreditRange, time: TimeInBusiness, revenue: RevenueRange): Alternative[] {
  const creditNum = credit === 'below-550' ? 525 : credit === '550-599' ? 575 : credit === '600-649' ? 625
    : credit === '650-679' ? 665 : credit === '680-719' ? 700 : credit === '720-749' ? 735
      : credit === '750+' ? 775 : 600

  const timeMonths = time === 'pre-revenue' ? 0 : time === 'under-6mo' ? 3 : time === '6-12mo' ? 9
    : time === '1-2yr' ? 18 : time === '2-5yr' ? 42 : 72

  const revMonthly = revenue === 'pre-revenue' ? 0 : revenue === 'under-10k' ? 7500 : revenue === '10k-25k' ? 17500
    : revenue === '25k-50k' ? 37500 : revenue === '50k-100k' ? 75000 : revenue === '100k-250k' ? 175000 : 300000

  const alts: Alternative[] = []

  // SBA Loan
  const sbaOk = creditNum >= 650 && timeMonths >= 24 && revMonthly >= 8000
  alts.push({
    name: 'SBA Loan',
    creditReq: '650+',
    timeReq: '2+ years',
    status: sbaOk ? 'likely' : (creditNum >= 620 && timeMonths >= 18) ? 'possible' : 'unlikely',
    note: sbaOk ? 'Your profile meets typical SBA requirements.' : creditNum < 650 ? 'Credit score needs improvement.' : timeMonths < 24 ? 'Need more time in business.' : 'Revenue may be below typical SBA minimums.',
  })

  // Bank Term Loan
  const bankOk = creditNum >= 680 && timeMonths >= 24 && revMonthly >= 20000
  alts.push({
    name: 'Bank Term Loan',
    creditReq: '680+',
    timeReq: '2+ years',
    status: bankOk ? 'likely' : (creditNum >= 650 && timeMonths >= 18) ? 'possible' : 'unlikely',
    note: bankOk ? 'Your profile matches bank requirements.' : 'Banks typically want 680+ credit and 2+ years.',
  })

  // Online Term Loan
  const onlineOk = creditNum >= 580 && timeMonths >= 6 && revMonthly >= 5000
  alts.push({
    name: 'Online Term Loan',
    creditReq: '550-600+',
    timeReq: '6+ months',
    status: onlineOk ? 'likely' : (creditNum >= 550 && timeMonths >= 3) ? 'possible' : 'unlikely',
    note: onlineOk ? 'You likely qualify for online term loans.' : 'Online lenders are more flexible than banks.',
  })

  // Business Line of Credit
  const locOk = creditNum >= 600 && timeMonths >= 6 && revMonthly >= 5000
  alts.push({
    name: 'Business Line of Credit',
    creditReq: '600+',
    timeReq: '6+ months',
    status: locOk ? 'likely' : (creditNum >= 550 && timeMonths >= 3) ? 'possible' : 'unlikely',
    note: locOk ? 'You likely qualify. Draw only what you need.' : 'Online LOCs have lower requirements than banks.',
  })

  // Equipment Financing
  const equipOk = creditNum >= 600 && timeMonths >= 6
  alts.push({
    name: 'Equipment Financing',
    creditReq: '600+ (collateral helps)',
    timeReq: '6+ months',
    status: equipOk ? 'likely' : (creditNum >= 550) ? 'possible' : 'unlikely',
    note: equipOk ? 'Equipment serves as collateral, making approval easier.' : 'Collateral offset may help with lower credit.',
  })

  // Invoice Factoring
  const factOk = timeMonths >= 3 && revMonthly >= 5000
  alts.push({
    name: 'Invoice Factoring',
    creditReq: 'Based on customer credit',
    timeReq: '3+ months',
    status: factOk ? 'likely' : revMonthly > 0 ? 'possible' : 'unlikely',
    note: factOk ? 'Approval based on your customers\' credit, not yours.' : 'Need B2B invoices to qualify.',
  })

  // Revenue-Based Financing
  const rbfOk = timeMonths >= 3 && revMonthly >= 5000
  alts.push({
    name: 'Revenue-Based Financing',
    creditReq: 'Minimal',
    timeReq: '3+ months',
    status: rbfOk ? 'likely' : revMonthly > 0 ? 'possible' : 'unlikely',
    note: rbfOk ? 'Flexible payments that scale with your revenue.' : 'Need consistent revenue to qualify.',
  })

  // Microloans
  const microOk = timeMonths >= 0
  alts.push({
    name: 'Microloans / CDFIs',
    creditReq: 'Flexible',
    timeReq: 'Any',
    status: microOk ? 'likely' : 'possible',
    note: 'Mission-driven lenders with flexible requirements. Amounts typically $500-$50,000.',
  })

  return alts
}

/* ------------------------------------------------------------------ */
/*  Component                                                          */
/* ------------------------------------------------------------------ */

export default function LoanRejectionDecoderTool() {
  const [step, setStep] = useState(1)

  // Step 1
  const [loanType, setLoanType] = useState<LoanType>('sba')

  // Step 2
  const [reasons, setReasons] = useState<Set<RejectionReason>>(new Set())

  // Step 3
  const [creditRange, setCreditRange] = useState<CreditRange>('600-649')
  const [timeInBusiness, setTimeInBusiness] = useState<TimeInBusiness>('1-2yr')
  const [monthlyRevenue, setMonthlyRevenue] = useState<RevenueRange>('25k-50k')

  // Results
  const [showResults, setShowResults] = useState(false)
  const [expandedRoadmap, setExpandedRoadmap] = useState<string | null>(null)

  function toggleReason(r: RejectionReason) {
    setReasons((prev) => {
      const next = new Set(prev)
      if (next.has(r)) next.delete(r)
      else next.add(r)
      return next
    })
  }

  const effectiveReasons = reasons.size > 0 ? Array.from(reasons) : (['not-sure'] as RejectionReason[])

  const roadmaps = effectiveReasons
    .filter((r) => r !== 'no-reason' && r !== 'not-sure')
    .map((r) => ({ reason: r, ...getRoadmap(r, creditRange, timeInBusiness, monthlyRevenue, loanType) }))

  const alternatives = getAlternatives(creditRange, timeInBusiness, monthlyRevenue)
  const likelyCount = alternatives.filter((a) => a.status === 'likely').length
  const hasFixableIssues = roadmaps.some((r) => r.severity !== 'high')

  const stepLabels = ['Loan Type', 'Rejection Reason', 'Your Profile']

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
            <div className="bg-quicklend-600 h-2 rounded-full transition-all duration-300" style={{ width: `${(step / 3) * 100}%` }} />
          </div>
        </div>
      )}

      {/* ====================== STEP 1 ====================== */}
      {!showResults && step === 1 && (
        <div className="space-y-5">
          <h3 className="text-lg font-bold text-quicklend-900">What type of financing were you denied for?</h3>
          <div className="grid grid-cols-1 gap-2">
            {(Object.entries(loanTypeLabels) as [LoanType, string][]).map(([val, label]) => (
              <button
                key={val}
                onClick={() => setLoanType(val)}
                className={`text-left px-4 py-3 rounded-lg border text-sm font-medium transition-all ${
                  loanType === val ? 'bg-quicklend-50 border-quicklend-300 text-quicklend-700' : 'bg-white border-gray-200 text-gray-600 hover:border-gray-300'
                }`}
              >
                {label}
              </button>
            ))}
          </div>
          <button onClick={() => setStep(2)} className="w-full py-3 bg-quicklend-700 text-white font-semibold rounded-lg hover:bg-quicklend-800 transition-colors flex items-center justify-center gap-2">
            Next: Rejection Reason <ChevronRight className="w-4 h-4" />
          </button>
        </div>
      )}

      {/* ====================== STEP 2 ====================== */}
      {!showResults && step === 2 && (
        <div className="space-y-5">
          <h3 className="text-lg font-bold text-quicklend-900">What reason(s) did they give?</h3>
          <p className="text-sm text-gray-600">Select all that apply. If you are not sure, that is fine.</p>
          <div className="grid grid-cols-1 gap-2">
            {(Object.entries(rejectionReasonLabels) as [RejectionReason, string][]).map(([val, label]) => (
              <button
                key={val}
                onClick={() => toggleReason(val)}
                className={`text-left px-4 py-3 rounded-lg border text-sm font-medium transition-all flex items-center gap-2 ${
                  reasons.has(val) ? 'bg-quicklend-50 border-quicklend-300 text-quicklend-700' : 'bg-white border-gray-200 text-gray-600 hover:border-gray-300'
                }`}
              >
                <span className={`w-5 h-5 rounded border-2 flex items-center justify-center flex-shrink-0 ${
                  reasons.has(val) ? 'bg-quicklend-600 border-quicklend-600' : 'border-gray-300'
                }`}>
                  {reasons.has(val) && <CheckCircle className="w-3.5 h-3.5 text-white" />}
                </span>
                {label}
              </button>
            ))}
          </div>
          <div className="flex gap-3">
            <button onClick={() => setStep(1)} className="flex-1 py-3 border border-gray-300 text-gray-700 font-semibold rounded-lg hover:bg-gray-50 transition-colors">Back</button>
            <button onClick={() => setStep(3)} className="flex-1 py-3 bg-quicklend-700 text-white font-semibold rounded-lg hover:bg-quicklend-800 transition-colors flex items-center justify-center gap-2">
              Next: Your Profile <ChevronRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      )}

      {/* ====================== STEP 3 ====================== */}
      {!showResults && step === 3 && (
        <div className="space-y-5">
          <h3 className="text-lg font-bold text-quicklend-900">Your Business Profile</h3>
          <p className="text-sm text-gray-600">This helps us personalize your improvement plan and match alternatives.</p>

          {/* Credit score */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Personal Credit Score (Estimate)</label>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
              {(Object.entries(creditLabels) as [CreditRange, string][]).map(([val, label]) => (
                <button
                  key={val}
                  onClick={() => setCreditRange(val)}
                  className={`py-2 px-2 rounded-lg border text-xs sm:text-sm font-medium transition-all ${
                    creditRange === val ? 'bg-quicklend-50 border-quicklend-300 text-quicklend-700' : 'bg-white border-gray-200 text-gray-600 hover:border-gray-300'
                  }`}
                >
                  {label}
                </button>
              ))}
            </div>
          </div>

          {/* Time in business */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Time in Business</label>
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
              {(Object.entries(timeLabels) as [TimeInBusiness, string][]).map(([val, label]) => (
                <button
                  key={val}
                  onClick={() => setTimeInBusiness(val)}
                  className={`py-2 px-2 rounded-lg border text-xs sm:text-sm font-medium transition-all ${
                    timeInBusiness === val ? 'bg-quicklend-50 border-quicklend-300 text-quicklend-700' : 'bg-white border-gray-200 text-gray-600 hover:border-gray-300'
                  }`}
                >
                  {label}
                </button>
              ))}
            </div>
          </div>

          {/* Monthly revenue */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Monthly Revenue (Approximate)</label>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
              {(Object.entries(revenueLabels) as [RevenueRange, string][]).map(([val, label]) => (
                <button
                  key={val}
                  onClick={() => setMonthlyRevenue(val)}
                  className={`py-2 px-2 rounded-lg border text-xs sm:text-sm font-medium transition-all ${
                    monthlyRevenue === val ? 'bg-quicklend-50 border-quicklend-300 text-quicklend-700' : 'bg-white border-gray-200 text-gray-600 hover:border-gray-300'
                  }`}
                >
                  {label}
                </button>
              ))}
            </div>
          </div>

          <div className="flex gap-3">
            <button onClick={() => setStep(2)} className="flex-1 py-3 border border-gray-300 text-gray-700 font-semibold rounded-lg hover:bg-gray-50 transition-colors">Back</button>
            <button onClick={() => setShowResults(true)} className="flex-1 py-3 bg-quicklend-700 text-white font-semibold rounded-lg hover:bg-quicklend-800 transition-colors">
              Decode My Rejection
            </button>
          </div>
        </div>
      )}

      {/* ====================== RESULTS ====================== */}
      {showResults && (
        <div className="space-y-6">
          <button onClick={() => { setShowResults(false); setStep(1) }} className="text-sm text-quicklend-600 hover:text-quicklend-800 font-medium">
            &larr; Edit inputs
          </button>

          {/* Header */}
          <div className="bg-quicklend-900 text-white rounded-xl p-6">
            <h3 className="text-xl font-bold mb-2">Your Rejection Decoded</h3>
            <p className="text-quicklend-300 text-sm mb-3">
              Denied for: {loanTypeLabels[loanType]}
              {effectiveReasons.filter((r) => r !== 'no-reason' && r !== 'not-sure').length > 0 && (
                <> | Reason(s): {effectiveReasons.filter((r) => r !== 'no-reason' && r !== 'not-sure').map((r) => rejectionReasonLabels[r]).join(', ')}</>
              )}
            </p>
            <div className="bg-quicklend-800 rounded-lg p-4">
              <p className="text-quicklend-100 font-semibold flex items-center gap-2">
                <TrendingUp className="w-5 h-5 text-green-400" /> The Good News
              </p>
              <p className="text-quicklend-200 text-sm mt-1">
                {hasFixableIssues
                  ? `Most of these issues can be addressed. With focused effort, you could improve your chances significantly in 3 to 6 months. And you may have ${likelyCount} financing option${likelyCount !== 1 ? 's' : ''} available right now.`
                  : `While some of these issues take time, you still have ${likelyCount} financing option${likelyCount !== 1 ? 's' : ''} that may work with your current profile.`}
              </p>
            </div>
          </div>

          {/* Improvement roadmap */}
          {roadmaps.length > 0 && (
            <div className="space-y-3">
              <h4 className="text-sm font-bold text-quicklend-900 flex items-center gap-2"><Clock className="w-4 h-4" /> Your Improvement Roadmap</h4>
              {roadmaps.map((rm) => {
                const isExpanded = expandedRoadmap === rm.reason
                const severityColor = rm.severity === 'high' ? 'border-red-300 bg-red-50' : rm.severity === 'medium' ? 'border-amber-300 bg-amber-50' : 'border-green-300 bg-green-50'
                const severityLabel = rm.severity === 'high' ? 'Takes Time' : rm.severity === 'medium' ? 'Fixable' : 'Quick Fix'
                const severityBadge = rm.severity === 'high' ? 'bg-red-100 text-red-700' : rm.severity === 'medium' ? 'bg-amber-100 text-amber-700' : 'bg-green-100 text-green-700'
                return (
                  <div key={rm.reason} className={`border rounded-xl overflow-hidden ${isExpanded ? severityColor : 'border-gray-200'}`}>
                    <button
                      onClick={() => setExpandedRoadmap(isExpanded ? null : rm.reason)}
                      className="w-full flex items-center justify-between px-4 py-3 bg-white hover:bg-gray-50 transition-colors"
                    >
                      <div className="flex items-center gap-2 text-left">
                        <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full ${severityBadge}`}>{severityLabel}</span>
                        <span className="text-sm font-semibold text-quicklend-900">{rm.title}</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <span className="text-xs text-gray-500 hidden sm:inline">{rm.timeframe}</span>
                        <ChevronRight className={`w-4 h-4 text-gray-400 transition-transform ${isExpanded ? 'rotate-90' : ''}`} />
                      </div>
                    </button>
                    {isExpanded && (
                      <div className="px-4 py-4 space-y-4 border-t">
                        <div className="flex flex-wrap gap-3 text-sm">
                          <div className="bg-white rounded-lg px-3 py-2 border">
                            <p className="text-xs text-gray-500">Target</p>
                            <p className="font-semibold text-quicklend-900">{rm.target}</p>
                          </div>
                          <div className="bg-white rounded-lg px-3 py-2 border">
                            <p className="text-xs text-gray-500">Timeline</p>
                            <p className="font-semibold text-quicklend-900">{rm.timeframe}</p>
                          </div>
                        </div>
                        <div className="space-y-3">
                          <p className="text-sm font-semibold text-gray-800">Action Plan:</p>
                          {rm.actions.map((a) => (
                            <div key={a.period}>
                              <p className="text-xs font-bold text-gray-600 uppercase tracking-wide mb-1">{a.period}</p>
                              <ul className="space-y-1">
                                {a.steps.map((s, i) => (
                                  <li key={i} className="text-sm text-gray-700 flex gap-2">
                                    <span className="w-4 h-4 rounded border border-gray-300 flex-shrink-0 mt-0.5" />
                                    {s}
                                  </li>
                                ))}
                              </ul>
                            </div>
                          ))}
                        </div>
                        {rm.alternatives.length > 0 && (
                          <div>
                            <p className="text-xs font-bold text-gray-600 uppercase tracking-wide mb-1">Available Now</p>
                            <div className="flex flex-wrap gap-1.5">
                              {rm.alternatives.map((alt) => (
                                <span key={alt} className="text-xs bg-quicklend-50 text-quicklend-700 px-2 py-1 rounded-full border border-quicklend-200">{alt}</span>
                              ))}
                            </div>
                          </div>
                        )}
                      </div>
                    )}
                  </div>
                )
              })}
            </div>
          )}

          {/* Alternatives */}
          <div className="space-y-3">
            <h4 className="text-sm font-bold text-quicklend-900">Financing Options for Your Profile</h4>
            <div className="space-y-2">
              {alternatives.map((alt) => {
                const StatusIcon = alt.status === 'likely' ? CheckCircle : alt.status === 'possible' ? AlertTriangle : XCircle
                const statusColor = alt.status === 'likely' ? 'text-green-600' : alt.status === 'possible' ? 'text-amber-500' : 'text-gray-400'
                const statusBg = alt.status === 'likely' ? 'bg-green-50 border-green-200' : alt.status === 'possible' ? 'bg-amber-50 border-amber-200' : 'bg-gray-50 border-gray-200'
                const statusLabel = alt.status === 'likely' ? 'Likely Qualifies' : alt.status === 'possible' ? 'Possible' : 'Not Yet'
                return (
                  <div key={alt.name} className={`border rounded-lg p-3 ${statusBg}`}>
                    <div className="flex items-start gap-2">
                      <StatusIcon className={`w-5 h-5 mt-0.5 flex-shrink-0 ${statusColor}`} />
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center justify-between gap-2">
                          <p className="text-sm font-semibold text-gray-900">{alt.name}</p>
                          <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full whitespace-nowrap ${
                            alt.status === 'likely' ? 'bg-green-100 text-green-700' : alt.status === 'possible' ? 'bg-amber-100 text-amber-700' : 'bg-gray-200 text-gray-600'
                          }`}>
                            {statusLabel}
                          </span>
                        </div>
                        <div className="flex gap-3 text-xs text-gray-500 mt-0.5">
                          <span>Credit: {alt.creditReq}</span>
                          <span>Time: {alt.timeReq}</span>
                        </div>
                        <p className="text-xs text-gray-600 mt-1">{alt.note}</p>
                      </div>
                    </div>
                  </div>
                )
              })}
            </div>
          </div>

          {/* Timeline visualization */}
          <div className="bg-white border border-gray-200 rounded-xl p-5">
            <h4 className="text-sm font-bold text-quicklend-900 mb-4">Your Path Forward</h4>
            <div className="relative">
              {/* Timeline bar */}
              <div className="flex items-center justify-between mb-2">
                {['Now', '3 mo', '6 mo', '9 mo', '12 mo'].map((label) => (
                  <span key={label} className="text-[10px] sm:text-xs text-gray-500 font-medium">{label}</span>
                ))}
              </div>
              <div className="w-full bg-gray-200 rounded-full h-3 relative">
                <div className="absolute left-0 top-0 h-3 rounded-full bg-gradient-to-r from-quicklend-600 to-green-500" style={{ width: '100%' }} />
                {[0, 25, 50, 75, 100].map((pct) => (
                  <div key={pct} className="absolute top-1/2 -translate-y-1/2 w-3 h-3 rounded-full bg-white border-2 border-quicklend-600" style={{ left: `${pct}%`, marginLeft: pct === 100 ? '-12px' : pct === 0 ? '0' : '-6px' }} />
                ))}
              </div>
              {/* Available now labels */}
              <div className="mt-4 space-y-1.5">
                {[
                  { label: 'Online Lenders / Revenue-Based', start: 0, color: 'bg-green-400' },
                  { label: 'Equipment Financing / Factoring', start: 10, color: 'bg-blue-400' },
                  { label: 'SBA / Bank Loans', start: 50, color: 'bg-quicklend-400' },
                ].map(({ label, start, color }) => (
                  <div key={label} className="flex items-center gap-2">
                    <div className="w-20 sm:w-28 flex-shrink-0">
                      <div className="h-2 rounded-full bg-gray-100 relative overflow-hidden">
                        <div className={`absolute top-0 right-0 h-2 rounded-full ${color}`} style={{ left: `${start}%` }} />
                      </div>
                    </div>
                    <span className="text-[10px] sm:text-xs text-gray-600">{label}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* CTA */}
          <div className="bg-quicklend-50 border border-quicklend-200 rounded-xl p-5 text-center">
            <p className="text-sm font-semibold text-quicklend-900 mb-1">
              {likelyCount >= 3 ? 'You have options available right now.' : 'A rejection is not the end.'}
            </p>
            <p className="text-sm text-gray-600 mb-4">
              {likelyCount >= 3
                ? `Based on your profile, you may qualify for ${likelyCount} types of financing. See which lenders match your situation.`
                : 'Based on your profile, alternative financing options may work. See what you qualify for with no credit impact.'}
            </p>
            <Link
              href={`/get-started?source=tool&tool=rejection-decoder&loan_type=not-sure`}
              className="inline-block px-6 py-3 bg-quicklend-700 text-white font-semibold rounded-lg hover:bg-quicklend-800 transition-colors"
            >
              See What You Qualify For
            </Link>
          </div>
        </div>
      )}
    </div>
  )
}
