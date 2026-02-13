'use client'

import { useState } from 'react'
import Link from 'next/link'
import { ChevronRight, Shield, AlertTriangle, AlertOctagon, Info, CheckCircle } from 'lucide-react'

/* ------------------------------------------------------------------ */
/*  Types                                                              */
/* ------------------------------------------------------------------ */

type CostType = 'apr' | 'factor-rate' | 'fee-amount' | 'not-sure'
type TermUnit = 'days' | 'weeks' | 'months'
type PaymentFrequency = 'daily' | 'weekly' | 'monthly'
type YesNoUnsure = 'yes' | 'no' | 'not-sure'
type ContactMethod = 'applied' | 'called' | 'email' | 'mail'
type PressureLevel = 'none' | 'days' | 'hours'

type Severity = 'critical' | 'serious' | 'caution'

interface Finding {
  severity: Severity
  title: string
  found: string
  matters: string
  action: string
}

/* ------------------------------------------------------------------ */
/*  Helpers                                                            */
/* ------------------------------------------------------------------ */

const fmt = (n: number) => `$${Math.round(n).toLocaleString()}`

function calcEffectiveAPR(amount: number, totalRepay: number, termDays: number): number {
  if (amount <= 0 || totalRepay <= amount || termDays <= 0) return 0
  const cost = totalRepay - amount
  const termYears = termDays / 365
  return ((cost / amount) / termYears) * 100
}

function termToDays(term: number, unit: TermUnit): number {
  if (unit === 'days') return term
  if (unit === 'weeks') return term * 7
  return term * 30
}

function paymentsInTerm(termDays: number, freq: PaymentFrequency): number {
  if (freq === 'daily') return Math.round(termDays * (5 / 7)) // business days
  if (freq === 'weekly') return Math.round(termDays / 7)
  return Math.round(termDays / 30)
}

const severityConfig = {
  critical: { bg: 'bg-red-50', border: 'border-red-300', text: 'text-red-800', badge: 'bg-red-600', icon: AlertOctagon, label: 'CRITICAL' },
  serious: { bg: 'bg-amber-50', border: 'border-amber-300', text: 'text-amber-800', badge: 'bg-amber-600', icon: AlertTriangle, label: 'SERIOUS' },
  caution: { bg: 'bg-yellow-50', border: 'border-yellow-300', text: 'text-yellow-800', badge: 'bg-yellow-600', icon: Info, label: 'CAUTION' },
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
/*  Three-way toggle                                                   */
/* ------------------------------------------------------------------ */

function YesNoToggle({ value, onChange, label }: { value: YesNoUnsure; onChange: (v: YesNoUnsure) => void; label: string }) {
  return (
    <div className="space-y-1.5">
      <p className="text-sm font-medium text-gray-700">{label}</p>
      <div className="flex gap-2">
        {([['yes', 'Yes'], ['no', 'No'], ['not-sure', 'Not Sure']] as const).map(([val, lbl]) => (
          <button
            key={val}
            onClick={() => onChange(val)}
            className={`flex-1 py-2 px-2 rounded-lg border text-sm font-medium transition-all ${
              value === val
                ? val === 'yes' ? 'bg-red-50 border-red-300 text-red-700' : val === 'no' ? 'bg-green-50 border-green-300 text-green-700' : 'bg-gray-100 border-gray-300 text-gray-700'
                : 'bg-white border-gray-200 text-gray-500 hover:border-gray-300'
            }`}
          >
            {lbl}
          </button>
        ))}
      </div>
    </div>
  )
}

/* ------------------------------------------------------------------ */
/*  Component                                                          */
/* ------------------------------------------------------------------ */

export default function LoanOfferAnalyzerTool() {
  const [step, setStep] = useState(1)

  // Section 1: Basic Terms
  const [loanAmount, setLoanAmount] = useState(50000)
  const [costType, setCostType] = useState<CostType>('factor-rate')
  const [costAmount, setCostAmount] = useState(1.35)
  const [repaymentTerm, setRepaymentTerm] = useState(6)
  const [termUnit, setTermUnit] = useState<TermUnit>('months')
  const [paymentFrequency, setPaymentFrequency] = useState<PaymentFrequency>('daily')
  const [paymentAmount, setPaymentAmount] = useState(0)

  // Section 2: Red Flag Checklist
  const [confessionOfJudgment, setConfessionOfJudgment] = useState<YesNoUnsure>('not-sure')
  const [personalGuarantee, setPersonalGuarantee] = useState<YesNoUnsure>('not-sure')
  const [prepaymentPenalty, setPrepaymentPenalty] = useState<YesNoUnsure>('not-sure')
  const [stackingRestriction, setStackingRestriction] = useState<YesNoUnsure>('not-sure')
  const [blanketLien, setBlanketLien] = useState<YesNoUnsure>('not-sure')
  const [autoACH, setAutoACH] = useState<YesNoUnsure>('not-sure')
  const [reconciliation, setReconciliation] = useState<YesNoUnsure>('not-sure')
  const [futureReceivables, setFutureReceivables] = useState<YesNoUnsure>('not-sure')

  // Section 3: Lender Details
  const [contactMethod, setContactMethod] = useState<ContactMethod>('applied')
  const [pressureLevel, setPressureLevel] = useState<PressureLevel>('none')

  // Results
  const [showResults, setShowResults] = useState(false)

  /* ---- Calculations ---- */

  const termDays = termToDays(repaymentTerm, termUnit)
  const numPayments = paymentsInTerm(termDays, paymentFrequency)

  // Total repayment
  let totalRepay = 0
  let effectiveAPR = 0
  let totalCost = 0

  if (costType === 'factor-rate') {
    const clampedFactor = Math.max(1.0, costAmount)
    totalRepay = loanAmount * clampedFactor
    totalCost = totalRepay - loanAmount
    effectiveAPR = calcEffectiveAPR(loanAmount, totalRepay, termDays)
  } else if (costType === 'apr') {
    const dailyRate = costAmount / 100 / 365
    totalCost = loanAmount * dailyRate * termDays
    totalRepay = loanAmount + totalCost
    effectiveAPR = costAmount
  } else if (costType === 'fee-amount') {
    totalCost = costAmount
    totalRepay = loanAmount + totalCost
    effectiveAPR = calcEffectiveAPR(loanAmount, totalRepay, termDays)
  } else {
    // not-sure: estimate from payment amount if provided
    if (paymentAmount > 0 && numPayments > 0) {
      totalRepay = paymentAmount * numPayments
      totalCost = totalRepay - loanAmount
      effectiveAPR = calcEffectiveAPR(loanAmount, totalRepay, termDays)
    }
  }

  const calculatedPayment = numPayments > 0 ? totalRepay / numPayments : 0

  /* ---- Red flag analysis ---- */

  function buildFindings(): Finding[] {
    const findings: Finding[] = []

    // Critical flags
    if (confessionOfJudgment === 'yes') {
      findings.push({
        severity: 'critical',
        title: 'Confession of Judgment Clause',
        found: 'Your offer contains a confession of judgment (also called a "cognovit note").',
        matters: 'This clause means you waive your right to defend yourself in court. If you miss a payment, the lender can obtain a judgment against you immediately, without notifying you and without you having a chance to respond. They can seize your bank account and business assets without warning.',
        action: 'This is banned in many states (CA, NY, NJ, and others). Even if legal in your state, it is a major red flag. Strongly consider walking away from this offer. If you proceed, consult an attorney first.',
      })
    }

    if (costType === 'factor-rate' && costAmount > 1.4) {
      findings.push({
        severity: 'critical',
        title: `Factor Rate of ${costAmount} (Estimated ${Math.round(effectiveAPR)}% APR)`,
        found: `A factor rate of ${costAmount} on a ${repaymentTerm}-${termUnit} term works out to approximately ${Math.round(effectiveAPR)}% APR.`,
        matters: 'Factor rates above 1.4 typically translate to effective APRs of 50% to 100% or more. This is significantly higher than most business financing options. SBA loans run 6% to 10%, bank term loans 7% to 15%, and even online lenders typically charge 15% to 35%.',
        action: 'Do not sign without understanding the true APR. Compare this offer to alternatives. Many business owners qualify for significantly lower rates.',
      })
    } else if (effectiveAPR > 50) {
      findings.push({
        severity: 'critical',
        title: `Effective APR of ${Math.round(effectiveAPR)}%`,
        found: `Based on the terms you entered, the effective APR is approximately ${Math.round(effectiveAPR)}%.`,
        matters: 'An APR above 50% is extremely expensive. SBA loans run 6% to 10%, bank term loans 7% to 15%, and most online lenders charge 15% to 35%. You would pay significantly more for this financing.',
        action: 'Explore alternative financing before accepting this rate. Many businesses qualify for much lower rates.',
      })
    }

    if (paymentFrequency === 'daily') {
      findings.push({
        severity: 'critical',
        title: 'Daily Payment Structure',
        found: 'This offer requires daily payments withdrawn from your bank account.',
        matters: 'Daily ACH withdrawals crush cash flow because money leaves your account every business day, often before you collect from customers. This structure is common with merchant cash advances that carry very high effective APRs. It also makes it easy to trigger default fees if your account is short on any given day.',
        action: 'Look for offers with weekly or monthly payments instead. Monthly payments are standard for term loans and lines of credit.',
      })
    }

    if (termDays < 180) {
      findings.push({
        severity: 'critical',
        title: `Very Short Term (${repaymentTerm} ${termUnit})`,
        found: `This offer has a repayment term of ${repaymentTerm} ${termUnit} (approximately ${termDays} days).`,
        matters: 'Very short terms drive up the effective APR dramatically. A seemingly modest cost becomes extremely expensive when annualized over a few months. Short-term financing is sometimes necessary for bridge situations, but most businesses are better served by longer-term products.',
        action: 'Consider term loans with 1 to 5 year terms for lower effective rates, or a line of credit for flexible short-term needs.',
      })
    }

    if (pressureLevel === 'hours') {
      findings.push({
        severity: 'critical',
        title: 'High-Pressure Tactics',
        found: 'The lender is pressuring you to sign within hours.',
        matters: '"Sign today or the offer expires" is a classic predatory tactic. Legitimate lenders give you time to review terms, ask questions, and compare options. The urgency is artificial, designed to prevent you from discovering better alternatives.',
        action: 'Do not sign under pressure. A legitimate offer will still be available tomorrow. Take time to review all terms and compare with at least one other option.',
      })
    }

    if (costType === 'not-sure' && effectiveAPR === 0) {
      findings.push({
        severity: 'critical',
        title: 'No APR Disclosure',
        found: 'You are not sure how the cost is expressed, which may indicate the lender has not clearly disclosed the APR.',
        matters: 'Hiding the true cost of financing is a red flag. Some states now require APR disclosure on business loans and MCAs. If the lender will not give you a clear APR, they may be hiding an extremely high cost.',
        action: 'Ask the lender directly: "What is the APR on this loan?" If they cannot or will not answer, walk away.',
      })
    }

    // Serious flags
    if (blanketLien === 'yes') {
      findings.push({
        severity: 'serious',
        title: 'Blanket UCC Lien',
        found: 'This offer includes a blanket UCC lien (lien on all business assets).',
        matters: 'A blanket lien gives the lender a claim on every asset your business owns: equipment, inventory, accounts receivable, and more. This can prevent you from getting other financing because future lenders will see the existing lien. It also means the lender can seize any business asset if you default.',
        action: 'Ask if the lien can be limited to specific collateral. If you need future financing flexibility, a blanket lien can be a significant obstacle.',
      })
    }

    if (personalGuarantee === 'yes') {
      findings.push({
        severity: 'serious',
        title: 'Personal Guarantee',
        found: 'This offer requires a personal guarantee.',
        matters: 'A personal guarantee means your personal assets (home, savings, vehicles) are at risk if the business cannot repay. Unlimited personal guarantees put everything on the line. Limited guarantees cap your personal exposure. Personal guarantees are common on small business loans, but you should understand the scope.',
        action: 'Ask whether it is limited or unlimited. Try to negotiate a limited guarantee. Understand exactly what personal assets could be at risk. Never sign an unlimited guarantee on a high-cost short-term loan.',
      })
    }

    if (prepaymentPenalty === 'yes') {
      findings.push({
        severity: 'serious',
        title: 'Prepayment Penalty',
        found: 'This offer includes a prepayment penalty.',
        matters: 'A prepayment penalty means you owe extra money if you pay off the loan early or refinance to a better rate. This locks you into the current terms even if your situation improves. Penalties above 3% are particularly expensive.',
        action: 'Find out the exact penalty amount and when it applies. Calculate whether the penalty makes refinancing prohibitively expensive.',
      })
    }

    if (stackingRestriction === 'yes') {
      findings.push({
        severity: 'serious',
        title: 'Stacking / Future Financing Restriction',
        found: 'This offer prohibits you from getting other financing without the lender\'s permission.',
        matters: 'Stacking restrictions prevent you from accessing additional capital when you need it. If business needs change or a better opportunity comes along, you are locked out unless this lender approves.',
        action: 'Understand the exact terms. Some restrictions are limited in scope. If possible, negotiate this clause out of the agreement.',
      })
    }

    if (reconciliation === 'yes') {
      findings.push({
        severity: 'serious',
        title: 'No Reconciliation Clause (MCA)',
        found: 'The agreement mentions reconciliation terms.',
        matters: 'For merchant cash advances, reconciliation means that if your sales drop, the lender should adjust your daily payment proportionally. Without reconciliation, you pay the same amount even when revenue falls, which can drain your cash.',
        action: 'If this is an MCA, confirm that payments adjust when sales are down. Without reconciliation, a slow month could trigger a cash crisis.',
      })
    }

    if (contactMethod === 'called' || contactMethod === 'email' || contactMethod === 'mail') {
      if (contactMethod === 'called') {
        findings.push({
          severity: 'serious',
          title: 'Unsolicited Contact (Cold Call)',
          found: 'The lender contacted you by phone without you applying first.',
          matters: 'Legitimate lenders rarely cold-call business owners. Unsolicited loan offers from unknown lenders are a hallmark of predatory lending. They often target businesses that have recently been denied elsewhere or show signs of financial stress.',
          action: 'Be extra cautious with any offer you did not seek out. Verify the lender is licensed in your state. Compare their terms to offers you request directly.',
        })
      }
    }

    // Caution flags
    if (futureReceivables === 'yes') {
      findings.push({
        severity: 'caution',
        title: 'Purchase of Future Receivables (This Is an MCA)',
        found: 'The agreement references "purchase of future receivables."',
        matters: 'This language means the product is a merchant cash advance, not a loan. MCAs are structured as the purchase of a portion of your future sales. They are not regulated like loans in most states, which means fewer consumer protections. MCAs typically have much higher effective costs than traditional business loans.',
        action: 'Understand that MCA terms are different from loan terms. Compare the total cost and effective APR to traditional loan options before signing.',
      })
    }

    if (personalGuarantee === 'not-sure') {
      findings.push({
        severity: 'caution',
        title: 'Personal Guarantee: Unknown',
        found: 'You are not sure whether this offer includes a personal guarantee.',
        matters: 'Most small business loans require some form of personal guarantee. It is important to know whether yours does and whether it is limited or unlimited.',
        action: 'Ask the lender directly. Read the agreement carefully for language about personal liability, guarantor, or guarantee.',
      })
    }

    if (autoACH === 'yes' && paymentFrequency !== 'daily') {
      findings.push({
        severity: 'caution',
        title: 'Automatic ACH Withdrawals',
        found: 'Payments are automatically withdrawn from your bank account.',
        matters: 'Auto-ACH is standard for many business loans, but make sure you understand the timing and have sufficient funds on withdrawal days. Insufficient funds can trigger default fees and damage your banking relationship.',
        action: 'Set up alerts for withdrawal days. Maintain a cash buffer in your operating account.',
      })
    }

    if (pressureLevel === 'days') {
      findings.push({
        severity: 'caution',
        title: 'Moderate Time Pressure',
        found: 'The lender is asking you to sign within a few days.',
        matters: 'Some urgency is normal, especially if the lender has already underwritten the deal. But you should still have time to review all terms, ask questions, and ideally compare at least one other offer.',
        action: 'Take the full time offered. Ask for an extra day or two if needed. A good lender will accommodate reasonable review time.',
      })
    }

    if (effectiveAPR > 25 && effectiveAPR <= 50) {
      findings.push({
        severity: 'caution',
        title: `Above-Average APR (${Math.round(effectiveAPR)}%)`,
        found: `The effective APR on this offer is approximately ${Math.round(effectiveAPR)}%.`,
        matters: 'While not predatory, this rate is higher than what many business owners qualify for. SBA loans run 6% to 10%, bank term loans 7% to 15%, and competitive online lenders charge 15% to 25%. You may be able to find a better rate.',
        action: 'Compare with at least one other offer before signing. If your credit or business financials have improved since you applied, you may qualify for better terms.',
      })
    }

    return findings
  }

  const findings = buildFindings()
  const criticalCount = findings.filter((f) => f.severity === 'critical').length
  const seriousCount = findings.filter((f) => f.severity === 'serious').length
  const cautionCount = findings.filter((f) => f.severity === 'caution').length

  type OverallRating = 'danger' | 'caution' | 'fair' | 'good'
  let overallRating: OverallRating = 'good'
  if (criticalCount >= 2) overallRating = 'danger'
  else if (criticalCount === 1) overallRating = 'caution'
  else if (seriousCount >= 2) overallRating = 'caution'
  else if (seriousCount === 1 || cautionCount >= 2) overallRating = 'fair'

  const ratingConfig = {
    danger: { bg: 'bg-red-600', text: 'Do Not Sign This Offer', sub: 'We found critical issues that suggest predatory terms. Explore alternatives before committing.' },
    caution: { bg: 'bg-amber-600', text: 'Proceed With Caution', sub: 'There are significant concerns. Review the details below and consider comparing other offers.' },
    fair: { bg: 'bg-yellow-500', text: 'Some Items Need Attention', sub: 'No critical issues, but there are terms you should understand before signing.' },
    good: { bg: 'bg-green-600', text: 'No Major Red Flags Found', sub: 'Based on what you entered, this offer appears reasonable. Still worth comparing to make sure you get the best deal.' },
  }

  const stepLabels = ['Loan Terms', 'Red Flag Check', 'Lender Info']

  function handleAnalyze() {
    setShowResults(true)
  }

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
            <div className="bg-quicklend-600 h-2 rounded-full transition-all duration-300" style={{ width: `${(step / 3) * 100}%` }} />
          </div>
        </div>
      )}

      {/* ====================== STEP 1: LOAN TERMS ====================== */}
      {!showResults && step === 1 && (
        <div className="space-y-5">
          <h3 className="text-lg font-bold text-quicklend-900">Loan / Advance Terms</h3>
          <p className="text-sm text-gray-600">Enter the key terms from the offer you received. We do not store any of this information.</p>

          <CurrencyInput label="Loan or Advance Amount" value={loanAmount} onChange={setLoanAmount} hint="How much you would receive" />

          {/* Cost type */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">How is the cost expressed?</label>
            <div className="grid grid-cols-2 gap-2">
              {([['apr', 'APR (%)'], ['factor-rate', 'Factor Rate'], ['fee-amount', 'Total Fee ($)'], ['not-sure', 'Not Sure']] as const).map(([val, lbl]) => (
                <button
                  key={val}
                  onClick={() => setCostType(val)}
                  className={`py-2.5 px-3 rounded-lg border text-sm font-medium transition-all ${
                    costType === val ? 'bg-quicklend-50 border-quicklend-300 text-quicklend-700' : 'bg-white border-gray-200 text-gray-600 hover:border-gray-300'
                  }`}
                >
                  {lbl}
                </button>
              ))}
            </div>
          </div>

          {/* Cost amount */}
          {costType !== 'not-sure' && (
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                {costType === 'apr' ? 'APR (%)' : costType === 'factor-rate' ? 'Factor Rate' : 'Total Fee Amount ($)'}
              </label>
              {costType === 'fee-amount' ? (
                <CurrencyInput label="" value={costAmount} onChange={setCostAmount} />
              ) : (
                <input
                  type="number"
                  step={costType === 'factor-rate' ? 0.01 : 0.1}
                  min={0}
                  className="w-full px-3 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-quicklend-500 focus:border-quicklend-500 text-sm"
                  value={costAmount}
                  onChange={(e) => setCostAmount(parseFloat(e.target.value) || 0)}
                />
              )}
              {costType === 'factor-rate' && <p className="text-xs text-gray-500 mt-1">Example: 1.35 means you repay $1.35 for every $1 borrowed</p>}
            </div>
          )}

          {/* Term */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Repayment Term</label>
            <div className="flex gap-2">
              <input
                type="number"
                min={1}
                className="flex-1 px-3 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-quicklend-500 focus:border-quicklend-500 text-sm"
                value={repaymentTerm}
                onChange={(e) => setRepaymentTerm(Math.max(1, parseInt(e.target.value) || 1))}
              />
              <select
                className="px-3 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-quicklend-500 focus:border-quicklend-500 text-sm bg-white"
                value={termUnit}
                onChange={(e) => setTermUnit(e.target.value as TermUnit)}
              >
                <option value="days">Days</option>
                <option value="weeks">Weeks</option>
                <option value="months">Months</option>
              </select>
            </div>
          </div>

          {/* Payment frequency */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Payment Frequency</label>
            <div className="flex gap-2">
              {([['daily', 'Daily'], ['weekly', 'Weekly'], ['monthly', 'Monthly']] as const).map(([val, lbl]) => (
                <button
                  key={val}
                  onClick={() => setPaymentFrequency(val)}
                  className={`flex-1 py-2.5 px-3 rounded-lg border text-sm font-medium transition-all ${
                    paymentFrequency === val ? 'bg-quicklend-50 border-quicklend-300 text-quicklend-700' : 'bg-white border-gray-200 text-gray-600 hover:border-gray-300'
                  }`}
                >
                  {lbl}
                </button>
              ))}
            </div>
          </div>

          {/* Payment amount (optional) */}
          <CurrencyInput label="Payment Amount (Optional)" value={paymentAmount} onChange={setPaymentAmount} hint="Per payment, if stated on the offer" />

          <button
            onClick={() => setStep(2)}
            className="w-full py-3 bg-quicklend-700 text-white font-semibold rounded-lg hover:bg-quicklend-800 transition-colors flex items-center justify-center gap-2"
          >
            Next: Red Flag Check <ChevronRight className="w-4 h-4" />
          </button>
        </div>
      )}

      {/* ====================== STEP 2: RED FLAG CHECKLIST ====================== */}
      {!showResults && step === 2 && (
        <div className="space-y-5">
          <h3 className="text-lg font-bold text-quicklend-900">Red Flag Checklist</h3>
          <p className="text-sm text-gray-600">Answer what you can. &quot;Not Sure&quot; is fine if you have not reviewed the full agreement yet.</p>

          <div className="space-y-4">
            <YesNoToggle label='Does the agreement mention "confession of judgment"?' value={confessionOfJudgment} onChange={setConfessionOfJudgment} />
            <YesNoToggle label="Does it require a personal guarantee?" value={personalGuarantee} onChange={setPersonalGuarantee} />
            <YesNoToggle label="Are there prepayment penalties?" value={prepaymentPenalty} onChange={setPrepaymentPenalty} />
            <YesNoToggle label='Is there a "stacking" or future financing restriction?' value={stackingRestriction} onChange={setStackingRestriction} />
            <YesNoToggle label="Does it mention a UCC lien or blanket lien?" value={blanketLien} onChange={setBlanketLien} />
            <YesNoToggle label="Are payments withdrawn automatically (ACH)?" value={autoACH} onChange={setAutoACH} />
            <YesNoToggle label='Is there a "reconciliation" clause?' value={reconciliation} onChange={setReconciliation} />
            <YesNoToggle label='Does it reference "purchase of future receivables"?' value={futureReceivables} onChange={setFutureReceivables} />
          </div>

          <div className="flex gap-3">
            <button onClick={() => setStep(1)} className="flex-1 py-3 border border-gray-300 text-gray-700 font-semibold rounded-lg hover:bg-gray-50 transition-colors">Back</button>
            <button onClick={() => setStep(3)} className="flex-1 py-3 bg-quicklend-700 text-white font-semibold rounded-lg hover:bg-quicklend-800 transition-colors flex items-center justify-center gap-2">
              Next: Lender Info <ChevronRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      )}

      {/* ====================== STEP 3: LENDER DETAILS ====================== */}
      {!showResults && step === 3 && (
        <div className="space-y-5">
          <h3 className="text-lg font-bold text-quicklend-900">About the Lender</h3>
          <p className="text-sm text-gray-600">These details help us assess the overall risk of the offer.</p>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">How did the lender contact you?</label>
            <div className="grid grid-cols-2 gap-2">
              {([['applied', 'I applied'], ['called', 'They called me'], ['email', 'Email / mail'], ['mail', 'Direct mail']] as const).map(([val, lbl]) => (
                <button
                  key={val}
                  onClick={() => setContactMethod(val)}
                  className={`py-2.5 px-3 rounded-lg border text-sm font-medium transition-all ${
                    contactMethod === val ? 'bg-quicklend-50 border-quicklend-300 text-quicklend-700' : 'bg-white border-gray-200 text-gray-600 hover:border-gray-300'
                  }`}
                >
                  {lbl}
                </button>
              ))}
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">How quickly are they pressuring you to sign?</label>
            <div className="flex gap-2">
              {([['none', 'No pressure'], ['days', 'Within days'], ['hours', 'Within hours']] as const).map(([val, lbl]) => (
                <button
                  key={val}
                  onClick={() => setPressureLevel(val)}
                  className={`flex-1 py-2.5 px-3 rounded-lg border text-sm font-medium transition-all ${
                    pressureLevel === val
                      ? val === 'hours' ? 'bg-red-50 border-red-300 text-red-700' : val === 'days' ? 'bg-amber-50 border-amber-300 text-amber-700' : 'bg-green-50 border-green-300 text-green-700'
                      : 'bg-white border-gray-200 text-gray-600 hover:border-gray-300'
                  }`}
                >
                  {lbl}
                </button>
              ))}
            </div>
          </div>

          <div className="flex gap-3">
            <button onClick={() => setStep(2)} className="flex-1 py-3 border border-gray-300 text-gray-700 font-semibold rounded-lg hover:bg-gray-50 transition-colors">Back</button>
            <button onClick={handleAnalyze} className="flex-1 py-3 bg-quicklend-700 text-white font-semibold rounded-lg hover:bg-quicklend-800 transition-colors flex items-center justify-center gap-2">
              <Shield className="w-4 h-4" /> Analyze This Offer
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

          {/* Overall assessment banner */}
          <div className={`${ratingConfig[overallRating].bg} text-white rounded-xl p-6 text-center`}>
            <Shield className="w-10 h-10 mx-auto mb-2 opacity-80" />
            <p className="text-2xl font-bold mb-1">{ratingConfig[overallRating].text}</p>
            <p className="text-sm opacity-90">{ratingConfig[overallRating].sub}</p>
          </div>

          {/* Severity summary */}
          <div className="grid grid-cols-4 gap-2">
            <div className={`rounded-lg p-3 text-center ${criticalCount > 0 ? 'bg-red-50 border border-red-200' : 'bg-gray-50 border border-gray-200'}`}>
              <p className={`text-2xl font-bold ${criticalCount > 0 ? 'text-red-700' : 'text-gray-400'}`}>{criticalCount}</p>
              <p className="text-[10px] sm:text-xs font-medium text-gray-600">Critical</p>
            </div>
            <div className={`rounded-lg p-3 text-center ${seriousCount > 0 ? 'bg-amber-50 border border-amber-200' : 'bg-gray-50 border border-gray-200'}`}>
              <p className={`text-2xl font-bold ${seriousCount > 0 ? 'text-amber-700' : 'text-gray-400'}`}>{seriousCount}</p>
              <p className="text-[10px] sm:text-xs font-medium text-gray-600">Serious</p>
            </div>
            <div className={`rounded-lg p-3 text-center ${cautionCount > 0 ? 'bg-yellow-50 border border-yellow-200' : 'bg-gray-50 border border-gray-200'}`}>
              <p className={`text-2xl font-bold ${cautionCount > 0 ? 'text-yellow-700' : 'text-gray-400'}`}>{cautionCount}</p>
              <p className="text-[10px] sm:text-xs font-medium text-gray-600">Caution</p>
            </div>
            <div className="rounded-lg p-3 text-center bg-green-50 border border-green-200">
              <p className="text-2xl font-bold text-green-700">{8 - findings.length}</p>
              <p className="text-[10px] sm:text-xs font-medium text-gray-600">Clear</p>
            </div>
          </div>

          {/* True cost summary */}
          {totalRepay > 0 && (
            <div className="bg-quicklend-900 text-white rounded-xl p-5 space-y-3">
              <h4 className="text-sm font-bold text-quicklend-200">True Cost of This Offer</h4>
              <div className="grid grid-cols-2 gap-3 text-sm">
                <div><p className="text-quicklend-300 text-xs">You Receive</p><p className="font-bold text-lg">{fmt(loanAmount)}</p></div>
                <div><p className="text-quicklend-300 text-xs">You Repay</p><p className="font-bold text-lg">{fmt(totalRepay)}</p></div>
                <div><p className="text-quicklend-300 text-xs">Total Cost</p><p className="font-bold text-lg text-amber-400">{fmt(totalCost)}</p></div>
                <div><p className="text-quicklend-300 text-xs">Effective APR</p><p className="font-bold text-lg text-amber-400">{effectiveAPR > 0 ? `~${Math.round(effectiveAPR)}%` : 'N/A'}</p></div>
              </div>
              {calculatedPayment > 0 && (
                <p className="text-xs text-quicklend-300 border-t border-quicklend-700 pt-2">
                  {paymentFrequency === 'daily' ? 'Daily' : paymentFrequency === 'weekly' ? 'Weekly' : 'Monthly'} payment: {fmt(calculatedPayment)} for {repaymentTerm} {termUnit} ({numPayments} payments)
                </p>
              )}
            </div>
          )}

          {/* Market comparison */}
          {effectiveAPR > 0 && (
            <div className="bg-white border border-gray-200 rounded-xl overflow-hidden">
              <div className="px-4 py-3 bg-gray-50 border-b">
                <h4 className="text-sm font-bold text-quicklend-900">How This Compares to Market Rates</h4>
              </div>
              <div className="p-4 space-y-2">
                {[
                  { label: 'SBA Loans', range: '6% - 10%', low: 6, high: 10 },
                  { label: 'Bank Term Loans', range: '7% - 15%', low: 7, high: 15 },
                  { label: 'Online Term Loans', range: '15% - 35%', low: 15, high: 35 },
                  { label: 'This Offer', range: `~${Math.round(effectiveAPR)}%`, low: effectiveAPR, high: effectiveAPR },
                ].map(({ label, range, high }) => {
                  const maxAPR = Math.max(effectiveAPR, 100)
                  const widthPct = Math.min(100, (high / maxAPR) * 100)
                  const isThisOffer = label === 'This Offer'
                  return (
                    <div key={label}>
                      <div className="flex justify-between text-xs mb-1">
                        <span className={`font-medium ${isThisOffer ? 'text-quicklend-900 font-bold' : 'text-gray-600'}`}>{label}</span>
                        <span className={isThisOffer ? 'font-bold text-quicklend-900' : 'text-gray-500'}>{range}</span>
                      </div>
                      <div className="w-full bg-gray-100 rounded-full h-3">
                        <div
                          className={`h-3 rounded-full ${isThisOffer ? (effectiveAPR > 35 ? 'bg-red-500' : effectiveAPR > 15 ? 'bg-amber-500' : 'bg-green-500') : 'bg-quicklend-300'}`}
                          style={{ width: `${widthPct}%` }}
                        />
                      </div>
                    </div>
                  )
                })}
              </div>
            </div>
          )}

          {/* Detailed findings */}
          {findings.length > 0 && (
            <div className="space-y-3">
              <h4 className="text-sm font-bold text-quicklend-900">Detailed Findings</h4>
              {findings.map((f, i) => {
                const cfg = severityConfig[f.severity]
                const Icon = cfg.icon
                return (
                  <div key={i} className={`${cfg.bg} ${cfg.border} border rounded-xl p-4 space-y-2`}>
                    <div className="flex items-start gap-2">
                      <span className={`${cfg.badge} text-white text-[10px] font-bold px-2 py-0.5 rounded-full whitespace-nowrap mt-0.5`}>{cfg.label}</span>
                      <h5 className={`text-sm font-bold ${cfg.text}`}>{f.title}</h5>
                    </div>
                    <div className="space-y-2 text-sm ml-0.5">
                      <div>
                        <p className="font-medium text-gray-700">What we found:</p>
                        <p className="text-gray-600">{f.found}</p>
                      </div>
                      <div>
                        <p className="font-medium text-gray-700">Why this matters:</p>
                        <p className="text-gray-600">{f.matters}</p>
                      </div>
                      <div>
                        <p className="font-medium text-gray-700">What you should do:</p>
                        <p className="text-gray-600">{f.action}</p>
                      </div>
                    </div>
                  </div>
                )
              })}
            </div>
          )}

          {/* No issues */}
          {findings.length === 0 && (
            <div className="bg-green-50 border border-green-200 rounded-xl p-5 text-center">
              <CheckCircle className="w-10 h-10 text-green-500 mx-auto mb-2" />
              <p className="font-bold text-green-800">No red flags detected based on your inputs.</p>
              <p className="text-sm text-green-700 mt-1">This does not mean the offer is perfect. Always read the full agreement carefully and ask questions about anything unclear.</p>
            </div>
          )}

          {/* CTA */}
          <div className={`rounded-xl p-5 text-center ${
            overallRating === 'danger' ? 'bg-red-50 border border-red-200' : overallRating === 'caution' ? 'bg-amber-50 border border-amber-200' : 'bg-quicklend-50 border border-quicklend-200'
          }`}>
            <p className="text-sm font-semibold text-quicklend-900 mb-1">
              {overallRating === 'danger' ? 'This offer has serious problems.'
                : overallRating === 'caution' ? 'You might have better options.'
                  : 'Want to make sure you are getting the best deal?'}
            </p>
            <p className="text-sm text-gray-600 mb-4">
              {overallRating === 'danger' ? 'See what legitimate financing options you qualify for. It takes 2 minutes and will not affect your credit.'
                : overallRating === 'caution' ? 'Compare this offer to other options you may qualify for. No credit impact.'
                  : 'See how your offer compares to what other lenders can provide. No credit impact.'}
            </p>
            <Link
              href={`/get-started?source=tool&tool=loan-offer-analyzer&loan_type=not-sure&amount=${loanAmount}`}
              className="inline-block px-6 py-3 bg-quicklend-700 text-white font-semibold rounded-lg hover:bg-quicklend-800 transition-colors"
            >
              {overallRating === 'danger' ? 'Check Your Real Options' : overallRating === 'caution' ? 'Compare Your Options' : 'See If You Qualify for Better Rates'}
            </Link>
          </div>
        </div>
      )}
    </div>
  )
}
