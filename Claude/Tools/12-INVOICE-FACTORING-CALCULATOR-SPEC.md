# Tool Spec: Invoice Factoring Calculator

**Tool Number:** 12
**Route:** `/tools/invoice-factoring-calculator`
**Priority:** High (Phase 2)
**Primary Keyword:** "invoice factoring calculator" (est. 500-800 monthly searches, low competition)
**Secondary Keywords:** "factoring calculator," "accounts receivable factoring calculator," "invoice financing calculator," "factoring fee calculator"

---

## Purpose

Calculate how much cash a business will receive from factoring invoices, including the advance amount, factoring fees, and reserve release. Helps users understand the true cost of factoring before committing.

**Target users:**
- Business owners with outstanding invoices considering factoring
- Users comparing factoring to other financing options
- B2B businesses with cash flow gaps due to slow-paying customers
- Industries heavy in invoice factoring: trucking, staffing, manufacturing, construction

**Why it matters:**
- Directly supports alternative financing content
- Ties to glossary terms (invoice factoring, accounts receivable)
- Attracts businesses actively seeking financing
- Relatively low competition, highly specific intent

---

## How Invoice Factoring Works (Context)

```
1. Business has $100,000 in outstanding invoices
2. Factoring company advances 85% ($85,000) immediately
3. Customer pays the factoring company directly
4. Once paid, factoring company releases the 15% reserve ($15,000)
   minus their fee (e.g., 3% = $3,000)
5. Business receives $97,000 total ($85,000 + $12,000)
```

This calculator walks users through this process with their actual numbers.

---

## Inputs

| Field | Type | Required | Default | Validation |
|-------|------|----------|---------|------------|
| Invoice Amount | Currency | Yes | $50,000 | $1,000 - $10,000,000 |
| Advance Rate | Percentage | Yes | 85% | 70% - 100% |
| Factoring Fee | Percentage | Yes | 3% | 0.5% - 10% |
| Average Days to Payment | Number | No | 30 | 1 - 120 days |
| Additional Fees | Currency | No | $0 | $0 - $10,000 |

### Input UX Notes

**Invoice Amount:**
- "Total value of invoices you want to factor"
- Can be single invoice or multiple
- Preset buttons: $25k, $50k, $100k, $250k

**Advance Rate:**
- "Percentage you receive upfront"
- Helper: "Most factors advance 80-90%"
- Slider from 70% to 100%

**Factoring Fee:**
- "Fee charged by the factoring company"
- Helper: "Typical range: 1-5% of invoice value"
- Note: "Some factors charge flat fees, others charge per 10-day period"

**Average Days to Payment:**
- "How long until your customers typically pay"
- Helper: "Net 30 = 30 days, Net 60 = 60 days"
- This helps calculate annualized cost

**Additional Fees (Optional, Expandable):**
- ACH/wire fees
- Invoice processing fees
- Monthly minimums
- Application fees

---

## Outputs

### Primary Output: Funding Summary

```
┌─────────────────────────────────────────────────────────────┐
│  Your Invoice Factoring Breakdown                           │
│                                                             │
│  Invoice Amount:             $100,000                       │
│                                                             │
│  ┌─────────────────────────────────────────────────────┐   │
│  │  DAY 1: You receive                                 │   │
│  │         $85,000                                     │   │
│  │         (85% advance)                               │   │
│  └─────────────────────────────────────────────────────┘   │
│                                                             │
│  ┌─────────────────────────────────────────────────────┐   │
│  │  WHEN CUSTOMER PAYS: You receive                    │   │
│  │         $12,000                                     │   │
│  │         (15% reserve minus 3% fee)                  │   │
│  └─────────────────────────────────────────────────────┘   │
│                                                             │
│  ═══════════════════════════════════════════════════════   │
│  Total You Receive:          $97,000                       │
│  Total Factoring Cost:       $3,000                        │
│  ═══════════════════════════════════════════════════════   │
│                                                             │
└─────────────────────────────────────────────────────────────┘
```

### Secondary Output: Cost Analysis

```
┌─────────────────────────────────────────────────────────────┐
│  Understanding the Cost                                     │
│                                                             │
│  Factoring Fee:              $3,000 (3% of invoice)        │
│  Additional Fees:            $50                            │
│  Total Cost:                 $3,050                         │
│                                                             │
│  Cost per $1,000 factored:   $30.50                        │
│                                                             │
│  ─────────────────────────────────────────────────────────  │
│                                                             │
│  Annualized Cost (if 30-day terms):                        │
│  Equivalent APR: ~36%                                       │
│                                                             │
│  ⚠️ Note: This isn't a loan, so APR isn't a perfect        │
│  comparison, but it helps contextualize the cost.          │
│                                                             │
└─────────────────────────────────────────────────────────────┘
```

### Tertiary Output: Break-Even Analysis

```
┌─────────────────────────────────────────────────────────────┐
│  Is Factoring Worth It?                                     │
│                                                             │
│  You're paying $3,000 to access $85,000 immediately         │
│  instead of waiting 30 days.                                │
│                                                             │
│  Factoring makes sense if:                                  │
│  ✓ You can use the cash to generate > $3,000 in profit     │
│  ✓ You'd otherwise miss payroll or critical payments       │
│  ✓ You have an opportunity that requires immediate cash     │
│  ✓ You can't qualify for lower-cost financing              │
│                                                             │
│  Consider alternatives if:                                  │
│  • You have time to wait for payment                        │
│  • You can qualify for a line of credit                     │
│  • The cost exceeds the value of immediate cash             │
│                                                             │
└─────────────────────────────────────────────────────────────┘
```

### Visual: Cash Flow Timeline

```
Day 0                    Day 30 (Customer Pays)
  │                            │
  ▼                            ▼
┌──────┐                  ┌──────┐
│$85,000│ ──────────────► │$12,000│
│Advance│    30 days      │Reserve│
└──────┘                  └──────┘
                          - $3,000 fee
                          ─────────
                          $12,000 net

Total Received: $97,000
```

---

## Calculations

### Advance Amount

```
Advance Amount = Invoice Amount × Advance Rate
```

### Reserve Amount

```
Reserve = Invoice Amount × (1 - Advance Rate)
```

### Factoring Fee

```
Factoring Fee = Invoice Amount × Factoring Fee Rate
```

### Reserve Release (What You Get When Customer Pays)

```
Reserve Release = Reserve - Factoring Fee - Additional Fees
```

### Total Received

```
Total Received = Advance Amount + Reserve Release
```

### Total Cost

```
Total Cost = Factoring Fee + Additional Fees
```

### Annualized Cost / Equivalent APR

```
Annualized Rate = (Total Cost / Advance Amount) × (365 / Days to Payment) × 100

Example:
Cost = $3,000
Advance = $85,000
Days = 30
Annualized = ($3,000 / $85,000) × (365 / 30) × 100 = 42.9%
```

---

## UI/UX Design

### Layout

```
┌──────────────────────────────────────────────────────────────┐
│  Invoice Factoring Calculator                                │
│                                                              │
│  See how much cash you'll receive from factoring your        │
│  invoices, and what it will cost.                            │
│                                                              │
├──────────────────────────────────────────────────────────────┤
│                                                              │
│  Total Invoice Amount                                        │
│  [$           100,000                                     ]  │
│  [$25k] [$50k] [$100k] [$250k]                              │
│                                                              │
│  Advance Rate                    Factoring Fee               │
│  [=======●====] 85%              [   3%    ]                │
│  ℹ️ Typical: 80-90%               ℹ️ Typical: 1-5%           │
│                                                              │
│  Average Days to Payment                                     │
│  [        30 days       ]                                   │
│                                                              │
│  [+ Add additional fees]                                    │
│                                                              │
│  [ Calculate ]                                              │
│                                                              │
├──────────────────────────────────────────────────────────────┤
│                                                              │
│  ┌──────────────────┐    ┌──────────────────┐               │
│  │  DAY 1           │    │  WHEN PAID       │               │
│  │  You receive     │    │  You receive     │               │
│  │  $85,000         │ ─► │  $12,000         │               │
│  │  (advance)       │    │  (reserve - fee) │               │
│  └──────────────────┘    └──────────────────┘               │
│                                                              │
│  Total: $97,000  |  Cost: $3,000  |  ~36% APR equivalent    │
│                                                              │
├──────────────────────────────────────────────────────────────┤
│                                                              │
│  [▼ See cost breakdown]                                     │
│  [▼ Is factoring worth it for you?]                         │
│                                                              │
├──────────────────────────────────────────────────────────────┤
│                                                              │
│  ┌────────────────────────────────────────────────────────┐ │
│  │  Compare factoring to other financing options          │ │
│  │                                                        │ │
│  │  [ See All Your Options ]                              │ │
│  └────────────────────────────────────────────────────────┘ │
│                                                              │
└──────────────────────────────────────────────────────────────┘
```

---

## Content Wrapper (SEO)

### Above the Tool (150 words)

```markdown
# Invoice Factoring Calculator

Calculate how much cash you'll receive from factoring your invoices. 
Enter your invoice amount, advance rate, and factoring fee to see 
your funding breakdown.

**What you'll learn:**
- How much you'll receive on Day 1 (the advance)
- How much you'll receive when your customer pays (the reserve)
- Total cost of factoring
- Whether factoring makes sense for your situation

Invoice factoring converts your accounts receivable into immediate 
working capital. This calculator shows you exactly what that costs.
```

### Below the Tool (400-500 words)

```markdown
## How Invoice Factoring Works

Invoice factoring is the sale of your unpaid invoices to a factoring 
company in exchange for immediate cash. Unlike a loan, you're not 
borrowing money — you're selling an asset (your receivables).

### The Factoring Process

1. **Submit invoices:** You send your unpaid invoices to the factor
2. **Receive advance:** The factor sends you 80-90% of the invoice 
   value, usually within 24-48 hours
3. **Customer pays factor:** Your customer pays the factoring company 
   directly (or you forward the payment)
4. **Receive reserve:** Once paid, you receive the remaining balance 
   minus the factoring fee

### Understanding Factoring Rates

Factoring companies typically charge 1-5% of the invoice value. 
Some charge a flat rate; others charge per 10-day period the invoice 
remains unpaid.

**Example fee structures:**
- **Flat fee:** 3% of invoice value, regardless of payment time
- **Tiered fee:** 1% for first 30 days, +0.5% per additional 10 days
- **Daily fee:** 0.05% per day until paid

Always ask how fees are calculated and whether there are additional 
charges for ACH transfers, invoice processing, or monthly minimums.

### Factoring vs. Invoice Financing

These terms are sometimes used interchangeably, but they're different:

| Factor | Invoice Factoring | Invoice Financing |
|--------|------------------|-------------------|
| Structure | Sale of invoices | Loan against invoices |
| Collection | Factor collects from customer | You collect from customer |
| Customer knows? | Usually yes | Usually no |
| Recourse | Often non-recourse | Usually full recourse |

### When Factoring Makes Sense

Invoice factoring works well for:
- **B2B businesses** with creditworthy customers
- **Seasonal businesses** with predictable receivables
- **Growing companies** that need cash faster than customers pay
- **Businesses that can't qualify** for traditional financing

### Industries That Commonly Use Factoring

- Trucking and transportation
- Staffing and temp agencies
- Manufacturing
- Wholesale and distribution
- Construction
- Oil and gas services

### Alternatives to Consider

If factoring costs seem high, explore:
- **[Business line of credit](/business-loans/lines-of-credit)** — 
  More flexible, often lower cost
- **[Term loans](/business-loans/term-loans)** — If you need 
  predictable payments
- **Invoice financing** — Keep customer relationships private
- **[Working capital loans](/glossary/working-capital-loan)** — 
  Don't require invoices as collateral

[Compare your options →](/tools/loan-finder-quiz)
```

---

## Internal Linking

**Link TO this tool from:**
- Glossary: invoice factoring, accounts receivable financing, factor rate
- Working Capital Calculator
- Blog articles about cash flow, B2B financing
- Industry pages (trucking, staffing, construction)

**Link FROM this tool to:**
- `/get-started` (primary CTA)
- `/tools/loan-finder-quiz`
- `/tools/working-capital-calculator`
- `/glossary/invoice-factoring`
- `/glossary/accounts-receivable-financing`
- `/glossary/recourse`
- `/business-loans/lines-of-credit`
- `/business-loans/asset-backed-loans`

---

## Lead Capture Strategy

### Dynamic CTA Based on APR Equivalent

**APR > 40%:**
```
Factoring can be expensive. Let's see if you qualify for 
lower-cost options.

[ Compare Financing Options ]
```

**APR 20-40%:**
```
This is typical for factoring. Want to see how other 
options compare?

[ See Your Options ]
```

### Industry-Specific CTAs

If user indicates industry (future enhancement):
- Trucking: "Trucking-specific factoring options"
- Staffing: "Staffing industry financing"

---

## Analytics Events

| Event | Trigger | Parameters |
|-------|---------|------------|
| `tool_start` | First input | tool: invoice-factoring-calculator |
| `tool_calculate` | Results shown | invoice_amount, advance_rate, fee_rate, apr_equivalent |
| `tool_cost_breakdown` | Expand cost section | — |
| `tool_worthit_view` | Expand "worth it" section | — |
| `cta_click` | Click CTA | apr_tier |

---

## Technical Implementation

### Component Structure

```
/app/tools/invoice-factoring-calculator/
├── page.tsx
├── components/
│   ├── Calculator.tsx
│   ├── FundingSummary.tsx
│   ├── CashFlowTimeline.tsx
│   ├── CostAnalysis.tsx
│   └── WorthItAnalysis.tsx
└── lib/
    └── calculations.ts
```

---

## Build Checklist

- [ ] Create page route and metadata
- [ ] Build input form (5 fields)
- [ ] Implement all calculations
- [ ] Build funding summary display
- [ ] Create cash flow timeline visualization
- [ ] Add cost analysis section
- [ ] Add "is it worth it" analysis
- [ ] Implement dynamic CTA
- [ ] Write SEO content wrapper
- [ ] Add FAQ section with schema
- [ ] Analytics events
- [ ] Mobile responsive
- [ ] Add to tools hub

**Estimated Build Time:** 8-12 hours
