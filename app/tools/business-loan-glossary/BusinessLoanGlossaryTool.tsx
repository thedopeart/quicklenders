'use client'

import { useState, useMemo } from 'react'
import Link from 'next/link'
import { ArrowRight, Search, BookOpen, ChevronDown } from 'lucide-react'

// ────────────────────────────────────────────────────────────────────
// Glossary Data
// ────────────────────────────────────────────────────────────────────

interface GlossaryTerm {
  term: string
  definition: string
  category: string
  relatedTerms?: string[]
}

const categories = [
  'All',
  'Loan Types',
  'Financial Metrics',
  'Costs & Fees',
  'Application & Process',
  'Collateral & Security',
  'Repayment',
]

const glossaryTerms: GlossaryTerm[] = [
  // Loan Types
  { term: 'Term Loan', definition: 'A lump-sum loan repaid in fixed installments over a set period, typically 1 to 10 years. Interest can be fixed or variable. Common for equipment purchases, expansion, and working capital.', category: 'Loan Types', relatedTerms: ['Amortization', 'Fixed Rate', 'Variable Rate'] },
  { term: 'Line of Credit', definition: 'A revolving credit facility that lets you borrow up to a set limit, repay, and borrow again. You only pay interest on the amount drawn. Similar to a credit card but with higher limits and lower rates.', category: 'Loan Types', relatedTerms: ['Draw', 'Credit Limit', 'Revolving Credit'] },
  { term: 'SBA Loan', definition: 'A loan partially guaranteed by the Small Business Administration. Programs include 7(a) for general business purposes, 504 for real estate and equipment, and microloans up to $50,000. Lower rates but more paperwork.', category: 'Loan Types', relatedTerms: ['SBA 7(a)', 'SBA 504', 'Guarantee Fee'] },
  { term: 'Merchant Cash Advance (MCA)', definition: 'An advance on future receivables, repaid through a daily or weekly percentage of revenue (holdback). Uses a factor rate instead of APR. Fast to obtain but expensive.', category: 'Loan Types', relatedTerms: ['Factor Rate', 'Holdback', 'Daily Remittance'] },
  { term: 'Equipment Financing', definition: 'A loan or lease specifically for purchasing business equipment. The equipment itself serves as collateral, which often means easier approval and lower rates than unsecured loans.', category: 'Loan Types', relatedTerms: ['Collateral', 'Capital Lease', 'Section 179'] },
  { term: 'Invoice Factoring', definition: 'Selling your unpaid invoices to a factoring company at a discount. You receive 80-90% upfront, and the factor collects from your customers. Not a loan, so your credit matters less than your customers\' credit.', category: 'Loan Types', relatedTerms: ['Advance Rate', 'Factor Fee', 'Accounts Receivable'] },
  { term: 'Bridge Loan', definition: 'Short-term financing that covers a gap until permanent financing is secured. Common in real estate and acquisitions. Higher rates due to the short duration and urgency.', category: 'Loan Types' },
  { term: 'Asset-Based Lending', definition: 'A loan secured by business assets such as accounts receivable, inventory, or equipment. The loan amount is based on the value of the collateral, not just creditworthiness.', category: 'Loan Types', relatedTerms: ['Collateral', 'Borrowing Base'] },

  // Financial Metrics
  { term: 'DSCR (Debt Service Coverage Ratio)', definition: 'Net operating income divided by total debt payments. A DSCR of 1.25 means you earn $1.25 for every $1 of debt payments. Most lenders require at least 1.15 to 1.25.', category: 'Financial Metrics', relatedTerms: ['Net Operating Income', 'Debt Service'] },
  { term: 'Net Operating Income (NOI)', definition: 'Revenue minus operating expenses, before taxes and debt payments. Shows how much cash the business generates to cover loan payments.', category: 'Financial Metrics', relatedTerms: ['DSCR', 'Cash Flow'] },
  { term: 'Cash Flow', definition: 'The net amount of cash moving into and out of a business. Positive cash flow means more money coming in than going out. Lenders use cash flow to determine repayment ability.', category: 'Financial Metrics', relatedTerms: ['DSCR', 'Net Operating Income'] },
  { term: 'Debt-to-Income Ratio (DTI)', definition: 'Total monthly debt payments divided by gross monthly income. A lower DTI signals less financial strain. Most lenders prefer DTI below 40-50%.', category: 'Financial Metrics' },
  { term: 'Working Capital', definition: 'Current assets minus current liabilities. Measures your ability to cover short-term obligations. Positive working capital means you can pay bills as they come due.', category: 'Financial Metrics', relatedTerms: ['Current Assets', 'Current Liabilities'] },
  { term: 'Break-Even Point', definition: 'The sales volume or revenue at which total costs equal total revenue: zero profit, zero loss. Every unit or dollar above break-even generates profit.', category: 'Financial Metrics' },
  { term: 'EBITDA', definition: 'Earnings Before Interest, Taxes, Depreciation, and Amortization. A common measure of operating profitability used by lenders to evaluate borrowing capacity.', category: 'Financial Metrics', relatedTerms: ['SDE', 'Net Operating Income'] },
  { term: 'SDE (Seller\'s Discretionary Earnings)', definition: 'Net income plus owner salary, benefits, depreciation, and one-time expenses. Used to value small businesses where the owner is actively involved in operations.', category: 'Financial Metrics', relatedTerms: ['EBITDA', 'Business Valuation'] },

  // Costs & Fees
  { term: 'APR (Annual Percentage Rate)', definition: 'The yearly cost of borrowing expressed as a percentage, including interest and certain fees. Required by law on consumer loans. Not always disclosed on business loans, but the best way to compare costs.', category: 'Costs & Fees', relatedTerms: ['Interest Rate', 'Effective APR'] },
  { term: 'Factor Rate', definition: 'A multiplier used by MCA providers instead of APR. A factor rate of 1.30 on a $100,000 advance means you repay $130,000. Unlike interest, the total cost is fixed regardless of payback speed.', category: 'Costs & Fees', relatedTerms: ['Merchant Cash Advance', 'APR'] },
  { term: 'Origination Fee', definition: 'An upfront fee charged by the lender for processing the loan, typically 1-5% of the loan amount. Deducted from the disbursement, reducing the amount you actually receive.', category: 'Costs & Fees', relatedTerms: ['Effective APR', 'Net Proceeds'] },
  { term: 'Prepayment Penalty', definition: 'A fee charged if you pay off a loan before the scheduled end date. Designed to compensate the lender for lost interest. Not all loans have them, so check before signing.', category: 'Costs & Fees', relatedTerms: ['Early Payoff', 'Refinancing'] },
  { term: 'Guarantee Fee', definition: 'A fee charged by the SBA for guaranteeing a portion of your loan. Ranges from 0% to 3.75% depending on loan size and maturity. Paid upfront or rolled into the loan.', category: 'Costs & Fees', relatedTerms: ['SBA Loan'] },
  { term: 'Effective APR', definition: 'The true annual cost of borrowing after all fees are included. Higher than the stated rate when origination fees, closing costs, and other charges reduce your net proceeds.', category: 'Costs & Fees', relatedTerms: ['APR', 'Origination Fee'] },
  { term: 'Draw Fee', definition: 'A fee charged each time you access funds from a line of credit. Typically 1-2% of the draw amount. Adds to the total cost beyond the interest rate.', category: 'Costs & Fees', relatedTerms: ['Line of Credit'] },

  // Application & Process
  { term: 'Underwriting', definition: 'The process lenders use to evaluate your creditworthiness and determine loan terms. Involves reviewing financials, credit history, collateral, and business performance.', category: 'Application & Process' },
  { term: 'Personal Guarantee', definition: 'A commitment by the business owner to repay the loan personally if the business cannot. Most small business loans require one. Puts personal assets at risk.', category: 'Application & Process', relatedTerms: ['Collateral', 'UCC Lien'] },
  { term: 'UCC Filing (UCC-1)', definition: 'A public notice filed by a lender claiming a security interest in your business assets. Gives them priority in case of default. Stays on record until the loan is repaid.', category: 'Application & Process', relatedTerms: ['Blanket Lien', 'Collateral'] },
  { term: 'Blanket Lien', definition: 'A lien that covers all current and future business assets. Gives the lender claim to everything you own. Common but limits your ability to get additional financing.', category: 'Application & Process', relatedTerms: ['UCC Filing', 'Collateral'] },
  { term: 'Debt Schedule', definition: 'A list of all outstanding debts including lender name, balance, interest rate, monthly payment, and remaining term. Required by most lenders during the application process.', category: 'Application & Process' },
  { term: 'Soft Pull vs Hard Pull', definition: 'A soft pull checks your credit without affecting your score. A hard pull is a formal credit inquiry that may lower your score by a few points. Pre-qualification usually uses a soft pull.', category: 'Application & Process' },

  // Collateral & Security
  { term: 'Collateral', definition: 'Assets pledged to secure a loan. If you default, the lender can seize the collateral. Common forms include equipment, real estate, inventory, and accounts receivable.', category: 'Collateral & Security', relatedTerms: ['Secured Loan', 'UCC Filing'] },
  { term: 'Secured Loan', definition: 'A loan backed by collateral. If you default, the lender can claim the pledged assets. Secured loans typically have lower rates than unsecured loans because they carry less risk for the lender.', category: 'Collateral & Security', relatedTerms: ['Collateral', 'Unsecured Loan'] },
  { term: 'Unsecured Loan', definition: 'A loan not backed by specific collateral. Approval is based on credit, revenue, and business strength. Higher rates than secured loans because the lender takes more risk.', category: 'Collateral & Security', relatedTerms: ['Secured Loan'] },
  { term: 'Borrowing Base', definition: 'The maximum amount a lender will lend against your eligible collateral, usually a percentage of accounts receivable (70-90%) and inventory (50-70%).', category: 'Collateral & Security', relatedTerms: ['Asset-Based Lending', 'Collateral'] },
  { term: 'Section 179', definition: 'An IRS tax provision that allows businesses to deduct the full purchase price of qualifying equipment in the year it is purchased, instead of depreciating over time.', category: 'Collateral & Security', relatedTerms: ['Equipment Financing', 'Depreciation'] },

  // Repayment
  { term: 'Amortization', definition: 'The process of spreading loan payments over time. Each payment covers interest and principal. Early payments are mostly interest; later payments are mostly principal.', category: 'Repayment', relatedTerms: ['Principal', 'Interest'] },
  { term: 'Principal', definition: 'The original amount borrowed, excluding interest and fees. As you make payments, the principal balance decreases. Interest is calculated on the remaining principal.', category: 'Repayment', relatedTerms: ['Amortization', 'Interest'] },
  { term: 'Fixed Rate', definition: 'An interest rate that stays the same for the entire loan term. Provides predictable payments. Most common for term loans and equipment financing.', category: 'Repayment', relatedTerms: ['Variable Rate'] },
  { term: 'Variable Rate', definition: 'An interest rate that changes based on a benchmark (usually Prime Rate or SOFR). Your payment can go up or down. Common for lines of credit and some SBA loans.', category: 'Repayment', relatedTerms: ['Fixed Rate', 'Prime Rate'] },
  { term: 'Holdback', definition: 'The percentage of daily revenue automatically deducted as repayment for an MCA. Typically 10-20%. Higher holdback means faster payback but more cash flow pressure.', category: 'Repayment', relatedTerms: ['Merchant Cash Advance', 'Daily Remittance'] },
  { term: 'Balloon Payment', definition: 'A large final payment due at the end of a loan term. The regular payments cover mostly interest, with the bulk of principal due at maturity. Common in commercial real estate.', category: 'Repayment' },
  { term: 'Refinancing', definition: 'Replacing an existing loan with a new one, typically at a lower rate or better terms. Makes sense when savings exceed the cost of fees and penalties on the old loan.', category: 'Repayment', relatedTerms: ['Prepayment Penalty', 'Break-Even Point'] },
]

// ────────────────────────────────────────────────────────────────────
// Simple search (no external deps)
// ────────────────────────────────────────────────────────────────────

function searchTerms(query: string, terms: GlossaryTerm[]): GlossaryTerm[] {
  if (!query.trim()) return terms
  const lower = query.toLowerCase()
  return terms.filter(
    (t) =>
      t.term.toLowerCase().includes(lower) ||
      t.definition.toLowerCase().includes(lower) ||
      t.category.toLowerCase().includes(lower)
  )
}

// ────────────────────────────────────────────────────────────────────
// Main Component
// ────────────────────────────────────────────────────────────────────

export default function BusinessLoanGlossaryTool() {
  const [searchQuery, setSearchQuery] = useState('')
  const [selectedCategory, setSelectedCategory] = useState('All')
  const [expandedTerm, setExpandedTerm] = useState<string | null>(null)

  const filteredTerms = useMemo(() => {
    let terms = glossaryTerms
    if (selectedCategory !== 'All') {
      terms = terms.filter((t) => t.category === selectedCategory)
    }
    return searchTerms(searchQuery, terms)
  }, [searchQuery, selectedCategory])

  // Group by first letter for alphabetical navigation
  const grouped = useMemo(() => {
    const map: Record<string, GlossaryTerm[]> = {}
    filteredTerms.forEach((t) => {
      const letter = t.term[0].toUpperCase()
      if (!map[letter]) map[letter] = []
      map[letter].push(t)
    })
    return Object.entries(map).sort(([a], [b]) => a.localeCompare(b))
  }, [filteredTerms])

  return (
    <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
      {/* Intro */}
      <div className="p-6 sm:p-8 lg:p-10 pb-0">
        <p className="text-gray-700 leading-relaxed mb-2">
          Look up any business financing term. Search by keyword or browse by category to find plain-language definitions.
        </p>
        <p className="text-gray-500 text-sm mb-0">
          {glossaryTerms.length} terms covering loan types, financial metrics, fees, and the application process.
        </p>
      </div>

      {/* Search */}
      <div className="p-6 sm:p-8 lg:p-10 pb-4">
        <div className="relative">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search terms (e.g., DSCR, factor rate, collateral...)"
            className="w-full rounded-lg border border-gray-300 px-4 py-3 pl-12 text-gray-900 focus:border-quicklend-600 focus:ring-2 focus:ring-quicklend-600/20 focus:outline-none transition-colors"
          />
        </div>
      </div>

      {/* Category Filter */}
      <div className="px-6 sm:px-8 lg:px-10 pb-6">
        <div className="flex flex-wrap gap-2">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              className={`px-3 py-1.5 rounded-full text-xs font-medium border transition-colors ${
                selectedCategory === cat
                  ? 'bg-quicklend-600 text-white border-quicklend-600'
                  : 'bg-white text-gray-600 border-gray-200 hover:border-quicklend-300'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>
        <p className="text-xs text-gray-400 mt-2">{filteredTerms.length} terms shown</p>
      </div>

      {/* Terms */}
      <div className="px-6 sm:px-8 lg:px-10 pb-8">
        {grouped.length === 0 ? (
          <div className="text-center py-12">
            <BookOpen className="h-10 w-10 text-gray-300 mx-auto mb-3" />
            <p className="text-gray-500 text-sm">No terms match your search. Try a different keyword.</p>
          </div>
        ) : (
          <div className="space-y-6">
            {grouped.map(([letter, terms]) => (
              <div key={letter}>
                <div className="sticky top-0 bg-white z-10 border-b border-gray-200 pb-1 mb-2">
                  <span className="text-lg font-bold text-quicklend-600">{letter}</span>
                </div>
                <div className="space-y-1">
                  {terms.map((t) => {
                    const isExpanded = expandedTerm === t.term
                    return (
                      <div key={t.term} className="border border-gray-100 rounded-lg overflow-hidden">
                        <button
                          onClick={() => setExpandedTerm(isExpanded ? null : t.term)}
                          className="w-full flex items-center justify-between px-4 py-3 hover:bg-gray-50 transition-colors text-left"
                        >
                          <div className="flex items-center gap-3">
                            <span className="text-sm font-semibold text-gray-900">{t.term}</span>
                            <span className="text-xs text-gray-400 bg-gray-100 px-2 py-0.5 rounded">{t.category}</span>
                          </div>
                          <ChevronDown className={`h-4 w-4 text-gray-400 transition-transform shrink-0 ${isExpanded ? 'rotate-180' : ''}`} />
                        </button>
                        {isExpanded && (
                          <div className="px-4 pb-4 border-t border-gray-100">
                            <p className="text-sm text-gray-600 leading-relaxed mt-3">{t.definition}</p>
                            {t.relatedTerms && t.relatedTerms.length > 0 && (
                              <div className="mt-3 flex flex-wrap gap-1.5">
                                <span className="text-xs text-gray-400">Related:</span>
                                {t.relatedTerms.map((rt) => (
                                  <button
                                    key={rt}
                                    onClick={() => {
                                      setSearchQuery(rt)
                                      setSelectedCategory('All')
                                    }}
                                    className="text-xs text-quicklend-600 hover:text-quicklend-700 underline"
                                  >
                                    {rt}
                                  </button>
                                ))}
                              </div>
                            )}
                          </div>
                        )}
                      </div>
                    )
                  })}
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* CTA */}
      <div className="px-6 sm:px-8 lg:px-10 pb-8">
        <div className="bg-quicklend-50 rounded-xl p-6 text-center">
          <p className="text-gray-700 mb-1 font-medium">
            Know the terms. Now find the right loan.
          </p>
          <p className="text-gray-500 text-sm mb-4">
            A funding specialist can explain how these concepts apply to your specific situation. No impact to your credit score.
          </p>
          <div className="flex flex-col sm:flex-row gap-3 justify-center">
            <Link
              href="/get-started?source=glossary&loan_type=not-sure"
              className="inline-flex items-center justify-center bg-quicklend-600 text-white font-semibold px-8 py-3 rounded-lg hover:bg-quicklend-700 transition-colors"
            >
              Get Your Options <ArrowRight className="ml-2 h-4 w-4" />
            </Link>
            <Link
              href="/tools/loan-finder-quiz"
              className="inline-flex items-center justify-center border border-quicklend-300 text-quicklend-700 font-semibold px-6 py-3 rounded-lg hover:bg-quicklend-50 transition-colors text-sm"
            >
              Find the Right Loan Type
            </Link>
          </div>
        </div>
      </div>
    </div>
  )
}
