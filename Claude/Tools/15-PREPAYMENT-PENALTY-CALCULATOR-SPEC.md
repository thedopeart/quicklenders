# Tool Spec: Prepayment Penalty Calculator

**Tool Number:** 15
**Route:** `/tools/prepayment-penalty-calculator`
**Priority:** Medium-Low (Phase 5)
**Primary Keyword:** "prepayment penalty calculator" (est. 200-500 monthly searches, very low competition)
**Secondary Keywords:** "early payoff penalty calculator," "loan prepayment calculator," "SBA prepayment penalty," "should I pay off my loan early"

---

## Purpose

Calculate whether paying off a business loan early makes financial sense after accounting for prepayment penalties. Helps users evaluate refinancing opportunities and early payoff scenarios.

**Target users:**
- Business owners considering refinancing to a lower rate
- Owners with extra cash considering early payoff
- Borrowers who didn't realize they have a prepayment penalty
- Users comparing loan offers (one with penalty, one without)

**Why it matters:**
- Very low competition — nobody has a good one
- Attracts users actively evaluating loan decisions
- Natural lead-in to refinancing conversations
- Builds trust by helping users avoid costly mistakes
- Unique angle competitors don't cover

---

## The Problem This Solves

Many business loans have prepayment penalties that aren't obvious:
- SBA 7(a) loans: 3-year declining penalty (5%, 3%, 1%)
- Bank loans: Often 2-3% of remaining balance
- Online lenders: May have "minimum interest" clauses
- Equipment loans: Varies widely

Users don't know if the penalty outweighs the savings from paying early or refinancing.

---

## Inputs

### Section 1: Current Loan Details

| Field | Type | Required | Validation |
|-------|------|----------|------------|
| Original Loan Amount | Currency | Yes | $1,000 - $50,000,000 |
| Current Balance | Currency | Yes | $1 - Original Amount |
| Interest Rate (APR) | Percentage | Yes | 1% - 50% |
| Monthly Payment | Currency | Yes | $1 - $1,000,000 |
| Remaining Term | Months | Yes | 1 - 360 months |
| Loan Type | Select | No | Term, SBA, Equipment, LOC |

### Section 2: Prepayment Penalty Details

| Field | Type | Required | Notes |
|-------|------|----------|-------|
| Penalty Type | Select | Yes | See options below |
| Penalty Amount/Rate | Varies | Yes | Based on type selected |

**Penalty Type Options:**

1. **Percentage of Remaining Balance**
   - Input: Percentage (e.g., 3%)
   - Most common for bank loans

2. **Percentage of Original Amount**
   - Input: Percentage (e.g., 2%)
   - Some equipment financing

3. **Declining Scale (SBA-style)**
   - Years 1: 5%, Year 2: 3%, Year 3: 1%, After: 0%
   - Input: Current year of loan
   - Pre-fills SBA standard but editable

4. **Minimum Interest / Remaining Interest**
   - Input: Months of minimum interest (e.g., 6 months)
   - Common with online lenders

5. **Flat Fee**
   - Input: Dollar amount
   - Less common

6. **No Penalty**
   - For comparison scenarios

### Section 3: Payoff Scenario

| Field | Type | Required | Notes |
|-------|------|----------|-------|
| Scenario Type | Select | Yes | Early payoff or Refinance |
| Payoff Date | Date | No | Default: Today |

**If Refinancing:**
| Field | Type | Notes |
|-------|------|-------|
| New Loan Rate | Percentage | What you'd refinance to |
| New Loan Term | Months | New loan length |
| New Loan Fees | Currency | Origination, closing costs |

---

## Outputs

### Primary Output: Payoff Analysis

**Scenario: Early Payoff (Pay in Full)**

```
┌─────────────────────────────────────────────────────────────┐
│  Early Payoff Analysis                                      │
│                                                             │
│  Current Balance:            $75,000                        │
│  Prepayment Penalty:         $2,250 (3%)                   │
│  Total to Pay Off:           $77,250                        │
│                                                             │
│  ═══════════════════════════════════════════════════════   │
│                                                             │
│  If You Pay Off Now:                                        │
│  ───────────────────────────────────────────────────────   │
│  Total you'll pay:           $77,250                        │
│  Interest saved:             $12,400                        │
│  Net savings:                $10,150                        │
│                                                             │
│  ✓ Even with the penalty, paying off early saves you       │
│    $10,150 compared to making all remaining payments.       │
│                                                             │
└─────────────────────────────────────────────────────────────┘
```

**Scenario: Refinancing**

```
┌─────────────────────────────────────────────────────────────┐
│  Refinance Analysis                                         │
│                                                             │
│  CURRENT LOAN                 NEW LOAN                      │
│  ─────────────                ────────                      │
│  Balance: $75,000             Amount: $77,250*              │
│  Rate: 15%                    Rate: 9%                      │
│  Remaining: 36 mo             Term: 36 mo                   │
│  Payment: $2,599              Payment: $2,457               │
│                                                             │
│  * Includes $2,250 prepayment penalty                      │
│                                                             │
│  ═══════════════════════════════════════════════════════   │
│                                                             │
│  Comparison Over 36 Months:                                 │
│  ───────────────────────────────────────────────────────   │
│                          Current      Refinanced            │
│  Total Payments          $93,564      $88,452               │
│  New Loan Fees           —            $1,500                │
│  Prepayment Penalty      —            $2,250                │
│  Total Cost              $93,564      $92,202               │
│                                                             │
│  Net Savings from Refinancing: $1,362                      │
│                                                             │
│  ✓ Refinancing saves money, but only $1,362 over 3 years.  │
│    Monthly savings: $142/month                              │
│                                                             │
└─────────────────────────────────────────────────────────────┘
```

### Secondary Output: Break-Even Analysis (Refinance)

```
┌─────────────────────────────────────────────────────────────┐
│  Break-Even Analysis                                        │
│                                                             │
│  Upfront Costs to Refinance:                               │
│  Prepayment penalty:         $2,250                         │
│  New loan fees:              $1,500                         │
│  Total upfront cost:         $3,750                         │
│                                                             │
│  Monthly Savings:            $142                           │
│                                                             │
│  Break-Even Point:           27 months                      │
│                                                             │
│  ────────────────────────────────────────────────────────   │
│  Months 1-26:   You're still "paying back" refinance costs │
│  Month 27+:     You start actually saving money            │
│  ────────────────────────────────────────────────────────   │
│                                                             │
│  Since your remaining term is 36 months, you'll have       │
│  9 months of true savings after break-even.                │
│                                                             │
└─────────────────────────────────────────────────────────────┘
```

### Tertiary Output: Timeline Visualization

```
Current Loan (if kept):
├────────────────────────────────────────────────────────────┤
Month 1                                                Month 36
Total paid: $93,564

Refinanced Loan:
├─────────────────────────────[BE]───────────────────────────┤
Month 1                    Month 27                   Month 36
                          Break-even
Total paid: $92,202 (saves $1,362)

[BE] = Break-even point
```

---

## Calculations

### Prepayment Penalty Amount

**Percentage of Remaining Balance:**
```
Penalty = Current Balance × Penalty Rate
```

**Percentage of Original Amount:**
```
Penalty = Original Amount × Penalty Rate
```

**Declining Scale (SBA):**
```
Year 1: Penalty = (Balance × 0.05)
Year 2: Penalty = (Balance × 0.03)
Year 3: Penalty = (Balance × 0.01)
Year 4+: Penalty = $0
```

**Minimum Interest:**
```
Monthly Interest = Balance × (Rate / 12)
Penalty = Monthly Interest × Minimum Months
```

### Early Payoff Savings

```
Remaining Interest = (Monthly Payment × Remaining Months) - Current Balance
Net Savings = Remaining Interest - Prepayment Penalty
```

### Refinance Analysis

```
Total Cost Current = Monthly Payment × Remaining Months

New Loan Amount = Current Balance + Prepayment Penalty + New Loan Fees
New Monthly Payment = [Standard amortization formula]
Total Cost Refinanced = New Monthly Payment × New Term

Savings = Total Cost Current - Total Cost Refinanced
```

### Break-Even Point

```
Upfront Costs = Prepayment Penalty + New Loan Fees
Monthly Savings = Old Payment - New Payment
Break-Even Months = Upfront Costs / Monthly Savings
```

---

## UI/UX Design

### Layout

```
┌──────────────────────────────────────────────────────────────┐
│  Prepayment Penalty Calculator                               │
│                                                              │
│  Should you pay off your loan early or refinance?            │
│  Calculate whether the penalty is worth it.                  │
│                                                              │
├──────────────────────────────────────────────────────────────┤
│                                                              │
│  Your Current Loan                                           │
│  ─────────────────                                           │
│  Original Amount      [$     100,000    ]                    │
│  Current Balance      [$      75,000    ]                    │
│  Interest Rate        [     15%         ]                    │
│  Monthly Payment      [$       2,599    ]                    │
│  Remaining Months     [       36        ]                    │
│                                                              │
│  Prepayment Penalty                                          │
│  ──────────────────                                          │
│  Penalty Type  [% of Remaining Balance      ▼]              │
│  Penalty Rate  [        3%                   ]               │
│                                                              │
│  What Do You Want to Do?                                     │
│  ● Pay off the loan early (have cash available)             │
│  ○ Refinance to a lower rate                                 │
│                                                              │
│  [If refinance selected, show new loan fields]               │
│                                                              │
│  [ Calculate ]                                               │
│                                                              │
├──────────────────────────────────────────────────────────────┤
│                                                              │
│  [RESULTS: Payoff Analysis]                                 │
│  [RESULTS: Break-Even Analysis - if refinancing]            │
│  [RESULTS: Timeline Visualization]                          │
│                                                              │
├──────────────────────────────────────────────────────────────┤
│                                                              │
│  ┌────────────────────────────────────────────────────────┐ │
│  │  Looking for better loan terms?                        │ │
│  │                                                        │ │
│  │  See refinancing options with no prepayment penalty.   │ │
│  │                                                        │ │
│  │  [ Check Refinancing Options ]                        │ │
│  └────────────────────────────────────────────────────────┘ │
│                                                              │
└──────────────────────────────────────────────────────────────┘
```

---

## Content Wrapper (SEO)

### Above the Tool (150 words)

```markdown
# Prepayment Penalty Calculator

Find out if paying off your business loan early or refinancing makes 
financial sense after accounting for prepayment penalties.

Many business loans include penalties for early payoff — sometimes as 
much as 5% of the remaining balance. This calculator helps you:

- Calculate your exact prepayment penalty
- Compare total costs: keeping the loan vs. paying early
- Analyze refinancing scenarios with break-even timeline
- Decide whether the penalty is worth paying

Enter your loan details below to see the numbers.
```

### Below the Tool (400 words)

```markdown
## Understanding Prepayment Penalties

Prepayment penalties compensate lenders for the interest income they 
lose when you pay off early. Not all loans have them, but many do.

### Common Prepayment Penalty Structures

**Percentage of Remaining Balance (Most Common)**
Example: 3% penalty. If you owe $100,000, the penalty is $3,000.

**Declining Percentage (SBA 7(a) Loans)**
- Year 1: 5% if paid off with proceeds from another loan
- Year 2: 3%
- Year 3: 1%
- After Year 3: No penalty

Note: SBA penalties only apply to loans over $50,000 and only when 
you're refinancing (not paying from business cash flow).

**Minimum Interest Guarantee**
You owe a minimum number of months' interest regardless of when you 
pay off. Common with online lenders.

**Yield Maintenance**
Complex formula ensuring lender gets their expected return. Common 
in commercial real estate.

### When to Pay the Penalty

Paying a prepayment penalty can make sense when:

- **The math works:** Interest savings exceed the penalty
- **You're refinancing to much better terms:** At least 2-3% lower rate
- **You have a long time remaining:** More months = more savings
- **Cash flow matters more than total cost:** Lower payment helps operations

### When to Keep the Current Loan

Keep your existing loan when:

- **Break-even is longer than remaining term:** You won't recoup costs
- **You might pay off again soon:** Another penalty situation
- **The penalty is too high:** Some are designed to be prohibitive
- **Rates haven't dropped significantly:** Small savings don't justify hassle

### Finding Loans Without Prepayment Penalties

Some loan types typically don't have prepayment penalties:

- Most business lines of credit
- Some online term loans (check terms carefully)
- Credit cards
- Some SBA Express loans

When comparing loan offers, always ask about prepayment penalties. 
A slightly higher rate with no penalty might be better than a lower 
rate with a 5% penalty.

[Compare loan options →](/tools/loan-finder-quiz)
```

---

## Internal Linking

**Link TO this tool from:**
- Glossary: prepayment penalty, refinancing
- Loan product pages (term loans, SBA)
- Blog articles about refinancing, paying off loans early
- Loan comparison tool

**Link FROM this tool to:**
- `/get-started` (refinancing options)
- `/tools/loan-payment-calculator`
- `/tools/loan-comparison`
- `/glossary/prepayment-penalty`
- `/glossary/refinancing`
- `/business-loans/term-loans`

---

## Lead Capture

### CTA: When Refinancing Makes Sense

```
Refinancing could save you $[calculated_savings].

See what rates you qualify for — many of our lenders 
offer loans with no prepayment penalty.

[ Check Refinancing Options ]

→ /get-started?source=tool&tool=prepayment&type=refinance&balance=[balance]
```

### CTA: When Refinancing Doesn't Make Sense

```
Based on your numbers, keeping your current loan 
may be the better choice right now.

Want to revisit this when rates drop? We'll notify you.

[email] [ Notify Me ]
```

---

## Analytics Events

| Event | Trigger | Parameters |
|-------|---------|------------|
| `tool_start` | First input | tool: prepayment-penalty |
| `tool_scenario_select` | Choose payoff vs refinance | scenario_type |
| `tool_calculate` | View results | penalty_amount, savings, recommendation |
| `tool_breakeven_view` | View break-even analysis | breakeven_months |
| `cta_click` | Click CTA | recommendation (refinance/keep) |

---

## Build Checklist

- [ ] Create page route and metadata
- [ ] Build current loan input section
- [ ] Build penalty type selector with dynamic inputs
- [ ] Build scenario toggle (payoff vs refinance)
- [ ] Build refinance inputs (conditional)
- [ ] Implement all penalty calculations
- [ ] Implement early payoff analysis
- [ ] Implement refinance comparison
- [ ] Build break-even calculator
- [ ] Create timeline visualization
- [ ] Implement recommendation logic
- [ ] Dynamic CTA based on results
- [ ] Write SEO content wrapper
- [ ] Add FAQ section
- [ ] Analytics events
- [ ] Mobile responsive
- [ ] Add to tools hub

**Estimated Build Time:** 12-16 hours
