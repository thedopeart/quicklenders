# Tool Spec: Factor Rate to APR Converter

**Tool Number:** 11
**Route:** `/tools/factor-rate-to-apr-calculator`
**Priority:** High (Phase 2 — quick win)
**Primary Keyword:** "factor rate to APR" (est. 300-500 monthly searches, very low competition)
**Secondary Keywords:** "convert factor rate to APR," "factor rate calculator," "MCA APR calculator," "what is factor rate in APR"

---

## Purpose

Convert merchant cash advance (MCA) factor rates to equivalent APR so users can compare MCAs to traditional loans on an apples-to-apples basis. This is a micro-tool with massive utility — MCAs intentionally use factor rates because they obscure the true cost.

**Target users:**
- Business owners evaluating MCA offers
- Users comparing MCA vs. traditional loan options
- Anyone confused by factor rate terminology
- Leads considering alternative financing

**Why it matters:**
- Very low competition keyword
- Extremely simple to build (could be done in hours)
- High utility — users desperately need this
- Positions QuickLenders as transparent/educational
- Natural lead-in to "see better options" CTA

---

## The Problem This Solves

MCAs quote a "factor rate" (e.g., 1.35) instead of APR. This makes comparison shopping nearly impossible:

- A 1.35 factor rate on a 6-month term ≈ **70% APR**
- A 1.35 factor rate on a 12-month term ≈ **35% APR**
- Users have no idea they're paying this much

This calculator exposes the true cost and helps users make informed decisions.

---

## Inputs

| Field | Type | Required | Default | Validation |
|-------|------|----------|---------|------------|
| Loan/Advance Amount | Currency | Yes | $50,000 | $1,000 - $5,000,000 |
| Factor Rate | Decimal | Yes | 1.30 | 1.01 - 2.00 |
| Repayment Term | Number + Unit | Yes | 12 months | 1-60 months or 1-260 weeks |
| Payment Frequency | Select | No | Daily | Daily, Weekly, Monthly |

### Input UX Notes

**Factor Rate:**
- Allow entry as "1.35" or "35%" (convert automatically)
- Helper text: "Your MCA agreement shows this as a decimal like 1.35"
- Show common range: "Typical MCA factor rates: 1.10 - 1.50"

**Repayment Term:**
- Toggle between months and weeks
- MCAs often quote in weeks or days
- Helper: "How long until the advance is fully repaid?"

**Payment Frequency:**
- Most MCAs use daily ACH withdrawals
- This affects the APR calculation

---

## Outputs

### Primary Output: APR Revelation

```
┌─────────────────────────────────────────────────────────────┐
│                                                             │
│  Your Factor Rate Converted to APR                          │
│                                                             │
│  Factor Rate: 1.35                                          │
│                    ↓                                        │
│  Equivalent APR: 70.0%                                      │
│  ══════════════════════                                     │
│                                                             │
│  ⚠️ This is significantly higher than most business loans   │
│  (typical range: 7% - 30% APR)                              │
│                                                             │
└─────────────────────────────────────────────────────────────┘
```

### Secondary Output: Cost Breakdown

```
┌─────────────────────────────────────────────────────────────┐
│  What This Means in Dollars                                 │
│                                                             │
│  Advance Amount:        $50,000                             │
│  Total Repayment:       $67,500                             │
│  Total Cost of Capital: $17,500                             │
│                                                             │
│  Daily Payment:         $259.62 (for 260 business days)     │
│                                                             │
│  Cost per $1,000:       $350                                │
│  (For every $1,000 you borrow, you pay back $1,350)         │
│                                                             │
└─────────────────────────────────────────────────────────────┘
```

### Tertiary Output: Comparison Context

```
┌─────────────────────────────────────────────────────────────┐
│  How This Compares                                          │
│                                                             │
│  Your MCA (70% APR)     ████████████████████████████████   │
│  Online Term Loan (25%) ████████████                        │
│  Bank Loan (12%)        ██████                              │
│  SBA Loan (8%)          ████                                │
│                                                             │
│  At 12% APR, the same $50,000 loan would cost $3,300        │
│  in interest over 12 months — saving you $14,200.           │
│                                                             │
└─────────────────────────────────────────────────────────────┘
```

---

## Calculations

### Total Repayment Amount

```
Total Repayment = Advance Amount × Factor Rate
```

### Total Cost of Capital

```
Cost of Capital = Total Repayment - Advance Amount
```

### Estimated APR (Simple Method)

```
APR = [(Factor Rate - 1) / Term in Years] × 100

Example:
Factor Rate = 1.35
Term = 12 months = 1 year
APR = (0.35 / 1) × 100 = 35%
```

### Estimated APR (More Accurate — Accounts for Daily Repayment)

Since MCAs typically require daily repayment, the effective APR is higher because you're paying back principal throughout the term (reducing your average balance):

```
Average Outstanding Balance ≈ Advance Amount / 2

Effective APR = (Cost of Capital / Average Balance) / Term in Years × 100

Example:
Cost = $17,500
Average Balance = $50,000 / 2 = $25,000
Term = 1 year
Effective APR = ($17,500 / $25,000) / 1 × 100 = 70%
```

This is the more accurate representation and what we should display.

### Daily/Weekly Payment

```
Daily Payment = Total Repayment / Number of Business Days
Weekly Payment = Total Repayment / Number of Weeks

Business Days ≈ Term in Months × 21.67
```

---

## UI/UX Design

### Layout (Compact — This is a Micro-Tool)

```
┌──────────────────────────────────────────────────────────────┐
│  Factor Rate to APR Converter                                │
│                                                              │
│  MCAs use "factor rates" instead of APR. Convert yours to    │
│  see the true annual cost.                                   │
│                                                              │
├──────────────────────────────────────────────────────────────┤
│                                                              │
│  Advance Amount         Factor Rate        Repayment Term    │
│  [$    50,000    ]      [   1.35   ]       [ 12 ] [months▼] │
│                                                              │
│  Payment Frequency                                           │
│  ● Daily  ○ Weekly  ○ Monthly                               │
│                                                              │
│  [ Convert to APR ]                                         │
│                                                              │
├──────────────────────────────────────────────────────────────┤
│                                                              │
│  ┌────────────────────────────────────────────────────────┐ │
│  │  1.35 Factor Rate = 70% APR                            │ │
│  │  ════════════════════════════                          │ │
│  │                                                        │ │
│  │  Total Repayment: $67,500                              │ │
│  │  Cost of Capital: $17,500                              │ │
│  │  Daily Payment: $259.62                                │ │
│  └────────────────────────────────────────────────────────┘ │
│                                                              │
│  [▼ See how this compares to other loan types]              │
│                                                              │
├──────────────────────────────────────────────────────────────┤
│                                                              │
│  ┌────────────────────────────────────────────────────────┐ │
│  │  70% APR is high. You may have better options.         │ │
│  │                                                        │ │
│  │  [ See Lower-Cost Financing Options ]                  │ │
│  └────────────────────────────────────────────────────────┘ │
│                                                              │
└──────────────────────────────────────────────────────────────┘
```

### Real-Time Updates

- Results update instantly as user types
- No "calculate" button needed (though can include one)
- Debounce inputs 100ms

---

## Content Wrapper (SEO)

### Above the Tool (100-150 words)

```markdown
# Factor Rate to APR Converter

Merchant cash advances use factor rates instead of APR, making it 
hard to compare costs. Enter your MCA terms below to see the 
equivalent annual percentage rate.

**Why this matters:** A factor rate of 1.35 might sound reasonable, 
but depending on your repayment term, it could equal 35% to 100%+ APR. 
Knowing the true cost helps you compare MCAs to other financing options.
```

### Below the Tool (400-500 words)

```markdown
## What Is a Factor Rate?

A factor rate is a decimal that represents the total amount you'll 
repay on a merchant cash advance. Unlike interest rates, factor rates 
are fixed — they don't change based on how quickly you repay.

**Example:** A 1.35 factor rate on a $50,000 advance means you'll 
repay $67,500 total ($50,000 × 1.35), regardless of whether you pay 
it back in 6 months or 12 months.

### Why MCAs Use Factor Rates Instead of APR

Factor rates make the cost seem lower than it actually is. A "1.35" 
sounds much better than "70% APR," even though they're describing 
the same cost.

This isn't necessarily deceptive — factor rates work differently than 
interest — but it does make comparison shopping difficult.

### How Factor Rate Converts to APR

The APR equivalent depends heavily on your repayment term:

| Factor Rate | 6-Month Term | 12-Month Term | 18-Month Term |
|-------------|--------------|---------------|---------------|
| 1.20 | ~40% APR | ~20% APR | ~13% APR |
| 1.30 | ~60% APR | ~30% APR | ~20% APR |
| 1.40 | ~80% APR | ~40% APR | ~27% APR |
| 1.50 | ~100% APR | ~50% APR | ~33% APR |

Note: These are estimates. Actual APR depends on payment frequency 
and how it's calculated.

### When MCAs Make Sense

Despite the high cost, MCAs can be appropriate when:

- You need funding immediately (same-day or next-day)
- You can't qualify for traditional loans
- The funds will generate returns exceeding the cost
- You have a specific short-term opportunity

### When to Look for Alternatives

If your APR equivalent is above 30-40%, consider:

- **[Term loans](/business-loans/term-loans):** Lower rates, fixed payments
- **[Business lines of credit](/business-loans/lines-of-credit):** 
  Only pay for what you use
- **[Invoice factoring](/glossary/invoice-factoring):** If you have 
  outstanding invoices
- **[SBA loans](/tools/sba-eligibility-checker):** Best rates if you qualify

[Compare your options →](/tools/loan-finder-quiz)

## Frequently Asked Questions

[FAQ Section]
```

### FAQ Section (3-4 questions)

1. What's a typical factor rate for merchant cash advances?
2. Is a factor rate the same as an interest rate?
3. Why is my APR so high when my factor rate seems low?
4. Can I negotiate a lower factor rate?

---

## Internal Linking

**Link TO this tool from:**
- Glossary: factor rate, merchant cash advance, APR
- Loan comparison tool
- Blog articles about MCAs, alternative financing
- Any content mentioning factor rates

**Link FROM this tool to:**
- `/tools/loan-finder-quiz` ("See lower-cost options")
- `/tools/loan-comparison` ("Compare this to other offers")
- `/tools/loan-payment-calculator`
- `/glossary/factor-rate`
- `/glossary/merchant-cash-advance`
- `/glossary/apr`
- `/business-loans/term-loans`
- `/business-loans/lines-of-credit`

---

## Lead Capture Strategy

### Dynamic CTA Based on APR Result

**APR > 50%:**
```
Your MCA's effective rate is very high. Most businesses qualify 
for better options.

[ See Lower-Cost Financing ]
```

**APR 30-50%:**
```
This is on the higher end. Depending on your situation, you may 
have other options worth exploring.

[ Check Your Options ]
```

**APR < 30%:**
```
This is competitive for an MCA. Still, it's worth comparing to 
traditional financing.

[ Compare Your Options ]
```

### Email Capture

```
📧 Get this comparison in your inbox

We'll send you a breakdown of your MCA cost vs. 
alternative financing options.

[email] [Send]
```

---

## Analytics Events

| Event | Trigger | Parameters |
|-------|---------|------------|
| `tool_start` | First input | tool: factor-rate-converter |
| `tool_calculate` | Results shown | factor_rate, term, apr_result |
| `tool_compare_view` | Expand comparison | — |
| `cta_click` | Click CTA | apr_tier (high/medium/low) |

---

## Technical Implementation

### Component Structure

```
/app/tools/factor-rate-to-apr-calculator/
├── page.tsx
├── components/
│   ├── Converter.tsx
│   ├── ResultDisplay.tsx
│   ├── ComparisonChart.tsx
│   └── CostBreakdown.tsx
└── lib/
    └── calculations.ts
```

### Key Functions

```typescript
function calculateAPR(
  advanceAmount: number,
  factorRate: number,
  termMonths: number,
  paymentFrequency: 'daily' | 'weekly' | 'monthly'
): {
  apr: number;
  totalRepayment: number;
  costOfCapital: number;
  payment: number;
}
```

---

## Build Checklist

- [ ] Create page route and metadata
- [ ] Build input form (4 fields)
- [ ] Implement APR calculation
- [ ] Build results display
- [ ] Add comparison context section
- [ ] Implement dynamic CTA
- [ ] Write SEO content wrapper
- [ ] Add FAQ section with schema
- [ ] Analytics events
- [ ] Mobile responsive
- [ ] Add to tools hub

**Estimated Build Time:** 4-8 hours
