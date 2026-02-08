# Tool Spec: Affordability Calculator

**Tool Number:** 07
**Route:** `/tools/affordability-calculator`
**Priority:** Medium-High
**Primary Keyword:** "how much business loan can I afford" (est. 2k+ monthly searches)
**Secondary Keywords:** "business loan affordability calculator," "how much can I borrow for my business," "maximum business loan amount"

---

## Purpose

Flip the typical calculator question. Instead of "what's the payment on X loan?" this asks "how much can I borrow?" based on what the user can afford to pay. Helps users set realistic expectations before applying.

**Target users:**
- Business owners who know their budget but not loan amounts
- Users early in research wanting to understand their range
- Anyone who's been rejected and wants to recalibrate expectations

**Why it matters:**
- Different angle than payment calculator (captures different searches)
- Sets realistic expectations (reduces frustration)
- Pre-qualifies users by having them think about affordability
- Natural lead-in: "See if you qualify for $X"

---

## Inputs

| Field | Type | Required | Default | Validation |
|-------|------|----------|---------|------------|
| Monthly Payment Budget | Currency | Yes | — | $100 - $500,000 |
| Expected Interest Rate | Percentage | Yes | 15% | 5% - 50% |
| Desired Loan Term | Select | Yes | 3 years | 1 - 10 years |

### Optional Inputs (Expandable Section)

| Field | Type | Purpose |
|-------|------|---------|
| Monthly Revenue | Currency | Calculate payment as % of revenue |
| Current Monthly Debt Payments | Currency | Factor into affordability |

### Input UX Notes

**Monthly Payment Budget:**
- Slider with text input
- Presets: $1,000, $2,500, $5,000, $10,000, $25,000
- Helper text: "What can your business comfortably pay each month?"

**Interest Rate:**
- Dropdown with common ranges
- Helper showing typical rates by loan type
- Default to 15% (middle of online lender range)

**Desired Term:**
- Dropdown: 1, 2, 3, 4, 5, 7, 10 years
- Helper: "Longer terms = larger loan, but more interest"

**Revenue Context (Optional):**
- "Want to see how this fits your cash flow? Add your monthly revenue."
- Shows payment as percentage of revenue
- Warns if payment exceeds 10-15% of revenue

---

## Outputs

### Primary Output: Maximum Loan Amount

```
┌─────────────────────────────────────────────────────────────┐
│                                                             │
│  Based on your budget, you could borrow up to:              │
│                                                             │
│              $87,500                                        │
│              ════════                                       │
│                                                             │
│  With a $3,000/month payment at 15% over 3 years            │
│                                                             │
├─────────────────────────────────────────────────────────────┤
│                                                             │
│  Total you'll repay:        $108,000                        │
│  Total interest:            $20,500                         │
│  Interest as % of loan:     23.4%                           │
│                                                             │
└─────────────────────────────────────────────────────────────┘
```

### Secondary Output: Term Comparison

Show how term length affects borrowing capacity:

```
┌─────────────────────────────────────────────────────────────┐
│  How loan term affects what you can borrow:                 │
│                                                             │
│  Term        Max Loan      Total Interest    Total Cost     │
│  ─────────────────────────────────────────────────────────  │
│  2 years     $62,200       $9,800            $72,000        │
│  3 years     $87,500       $20,500           $108,000   ←   │
│  5 years     $131,400      $48,600           $180,000       │
│                                                             │
│  Longer terms let you borrow more, but cost more overall.   │
└─────────────────────────────────────────────────────────────┘
```

### Tertiary Output: Rate Impact

Show how rate affects borrowing capacity:

```
┌─────────────────────────────────────────────────────────────┐
│  How your rate affects borrowing power:                     │
│                                                             │
│  If you qualify for 10%:    You could borrow $93,600        │
│  At your estimated 15%:     You could borrow $87,500    ←   │
│  If rates are 20%:          You could borrow $81,900        │
│                                                             │
│  Better credit = better rates = more borrowing power        │
└─────────────────────────────────────────────────────────────┘
```

### Revenue Context (If Provided)

```
┌─────────────────────────────────────────────────────────────┐
│  Cash Flow Check                                            │
│                                                             │
│  Your monthly revenue:      $25,000                         │
│  Your payment budget:       $3,000                          │
│  Payment as % of revenue:   12%                             │
│                                                             │
│  ✓ This is within the typical comfortable range (5-15%)     │
│                                                             │
│  Note: Most lenders also consider your other expenses       │
│  and existing debt when determining affordability.          │
└─────────────────────────────────────────────────────────────┘
```

Warning states:
- < 5%: "Very conservative. You may be able to afford more."
- 5-15%: "Within typical comfortable range."
- 15-25%: "Higher than average. Make sure you have cash reserves."
- > 25%: "This may strain your cash flow. Consider a smaller payment."

---

## Calculations

### Maximum Loan Amount (Reverse Amortization)

```
P = M × [(1+r)^n - 1] / [r(1+r)^n]

Where:
P = Principal (maximum loan amount)
M = Monthly payment
r = Monthly interest rate (annual rate / 12)
n = Total number of payments (term in months)
```

### Total Interest

```
Total Interest = (M × n) - P
```

### Payment as % of Revenue

```
Payment Ratio = (Monthly Payment / Monthly Revenue) × 100
```

---

## UI/UX Design

### Layout

```
┌──────────────────────────────────────────────────────────────┐
│  How Much Business Loan Can You Afford?                      │
│                                                              │
│  Enter what you can pay monthly to see your borrowing power. │
│                                                              │
├──────────────────────────────────────────────────────────────┤
│                                                              │
│  What can you afford to pay monthly?                         │
│  [=========●==========] $3,000                               │
│  [$1k] [$2.5k] [$5k] [$10k] [$25k]                          │
│                                                              │
│  Expected interest rate                                      │
│  [     15%      ▼]                                          │
│  ℹ️ Online lenders: 10-35% | Banks: 7-15% | SBA: 6-10%       │
│                                                              │
│  Loan term                                                   │
│  [   3 years    ▼]                                          │
│                                                              │
│  [▼ Add revenue for cash flow check]                        │
│                                                              │
├──────────────────────────────────────────────────────────────┤
│                                                              │
│  ┌────────────────────────────────────────────────────────┐ │
│  │                                                        │ │
│  │  You could borrow up to:                               │ │
│  │                                                        │ │
│  │          $87,500                                       │ │
│  │                                                        │ │
│  │  Total repayment: $108,000 ($20,500 interest)         │ │
│  │                                                        │ │
│  └────────────────────────────────────────────────────────┘ │
│                                                              │
│  [▼ See how term affects your max loan]                     │
│  [▼ See how rate affects your max loan]                     │
│                                                              │
├──────────────────────────────────────────────────────────────┤
│                                                              │
│  ┌────────────────────────────────────────────────────────┐ │
│  │  See if you qualify for up to $87,500                  │ │
│  │                                                        │ │
│  │  [ Check Your Options ]                                │ │
│  │                                                        │ │
│  │  2 minutes. No credit impact.                          │ │
│  └────────────────────────────────────────────────────────┘ │
│                                                              │
└──────────────────────────────────────────────────────────────┘
```

---

## Content Wrapper (SEO)

### Above the Tool (150 words)

```markdown
# How Much Business Loan Can You Afford?

Find out your maximum borrowing power based on what you can comfortably 
pay each month. This calculator works backward from your budget to show 
how much you could borrow.

**What affects how much you can borrow:**
- Your monthly payment budget
- The interest rate you qualify for
- How long you want to repay

Enter your numbers below to see your borrowing capacity at different 
terms and rates.
```

### Below the Tool (350 words)

```markdown
## Understanding Your Borrowing Capacity

The amount you can borrow depends on more than just what a lender will 
approve. It's about what your business can comfortably repay.

### The Payment-to-Revenue Rule

A common guideline: keep loan payments under 10-15% of monthly revenue. 
This leaves room for operating expenses, unexpected costs, and profit.

**Example:** A business with $30,000/month revenue might comfortably 
afford $3,000-$4,500/month in loan payments.

This isn't a hard rule — some businesses can handle more, others less. 
It depends on your margins, seasonality, and other debt.

### How Interest Rate Affects Borrowing Power

Lower rates dramatically increase how much you can borrow at the same 
payment:

| Monthly Payment | At 10% (3yr) | At 20% (3yr) | Difference |
|-----------------|--------------|--------------|------------|
| $2,000 | $62,400 | $54,600 | $7,800 |
| $5,000 | $156,000 | $136,500 | $19,500 |
| $10,000 | $312,000 | $273,000 | $39,000 |

This is why improving your [credit score](/glossary/credit-score) before 
applying can significantly increase your options.

### How Lenders Calculate Affordability

Lenders use their own formulas, typically including:

- **[DSCR](/glossary/dscr):** Your income vs. all debt payments
- **Debt-to-income ratio:** Total debt relative to revenue
- **Cash flow analysis:** Money in vs. money out
- **Industry benchmarks:** What's typical for your business type

This calculator gives you a starting point. Actual approval depends on 
your full financial picture.

### What If You Need More Than You Can Afford?

If your borrowing capacity is less than you need:

1. **Extend the term** — Longer repayment = larger loan (but more interest)
2. **Improve your rate** — Better credit = better rates = more capacity
3. **Phase your financing** — Borrow now, refinance or add later
4. **Consider alternatives** — Lines of credit, equipment financing, or 
   revenue-based options

[See what you qualify for →](/get-started?source=tool&tool=affordability-calculator)
```

---

## Internal Linking

**Link TO this tool from:**
- Payment calculator ("Want to flip this? See how much you can borrow")
- DSCR calculator ("Check your borrowing capacity")
- Blog articles about loan amounts, budgeting for loans
- Loan amount pages
- Glossary: affordability, debt-to-income

**Link FROM this tool to:**
- `/get-started` (primary CTA)
- `/tools/loan-payment-calculator` ("Calculate exact payment for a specific amount")
- `/tools/dscr-calculator` ("Check if your DSCR supports this loan")
- `/glossary/dscr`
- `/glossary/credit-score`
- Loan product pages

---

## Lead Capture

### Primary CTA (Dynamic)

Include calculated amount in CTA:

```
See if you qualify for up to $[calculated_amount]

[ Check Your Options ]

→ /get-started?source=tool&tool=affordability-calculator&amount=[amount]
```

### Email Capture

```
📧 Save your affordability analysis

Get a PDF with your borrowing scenarios at different 
rates and terms.

[email] [Send Report]
```

---

## Analytics Events

| Event | Trigger | Parameters |
|-------|---------|------------|
| `tool_start` | First input | tool: affordability-calculator |
| `tool_calculate` | Results shown | max_amount, payment, rate, term |
| `tool_revenue_added` | Revenue field filled | payment_ratio |
| `tool_term_comparison` | Expand term comparison | — |
| `tool_rate_comparison` | Expand rate comparison | — |
| `cta_click` | Click CTA | calculated_amount |

---

## Technical Implementation

### Component Structure

```
/app/tools/affordability-calculator/
├── page.tsx
├── components/
│   ├── Calculator.tsx
│   ├── InputPanel.tsx
│   ├── ResultDisplay.tsx
│   ├── TermComparison.tsx
│   ├── RateComparison.tsx
│   ├── RevenueCheck.tsx
│   └── EmailCapture.tsx
├── lib/
│   ├── calculations.ts
│   └── comparisons.ts
└── types.ts
```

---

## Build Checklist

- [ ] Create page route and metadata
- [ ] Build input components
- [ ] Implement reverse amortization calculation
- [ ] Build term comparison component
- [ ] Build rate comparison component
- [ ] Add optional revenue check
- [ ] Implement dynamic CTA with calculated amount
- [ ] Write SEO content wrapper
- [ ] Add FAQ section
- [ ] Implement analytics events
- [ ] Test calculations
- [ ] Mobile responsiveness
- [ ] Add to tools hub
