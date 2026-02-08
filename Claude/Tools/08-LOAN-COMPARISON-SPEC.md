# Tool Spec: Loan Comparison Tool

**Tool Number:** 08
**Route:** `/tools/loan-comparison`
**Priority:** Medium
**Primary Keyword:** "compare business loans" (est. 800+ monthly searches)
**Secondary Keywords:** "business loan comparison," "compare loan offers," "loan comparison calculator"

---

## Purpose

Side-by-side comparison of 2-3 loan scenarios. Users enter different loan offers (or hypotheticals) and see which one costs less, which has lower payments, and which fits their situation best.

**Target users:**
- Users who have received multiple loan offers
- Users comparing loan types (term loan vs line of credit)
- Users evaluating different term/rate combinations
- Anyone trying to understand the tradeoffs between options

**Why it matters:**
- Captures users in decision phase (high intent)
- Builds trust by helping them evaluate, not just pushing our form
- Natural conversion: "Want more options to compare? Get matched."
- Differentiates from competitors who don't offer comparison tools

---

## Inputs

### Loan Scenario Card (Repeatable 2-3x)

| Field | Type | Required | Validation |
|-------|------|----------|------------|
| Loan Name/Label | Text | No | 20 char max, default "Loan A/B/C" |
| Loan Amount | Currency | Yes | $1,000 - $50,000,000 |
| Interest Rate (APR) | Percentage | Yes | 1% - 60% |
| Loan Term | Months or Years | Yes | 1 month - 30 years |
| Origination Fee | Currency or % | No | Default 0 |
| Other Fees | Currency | No | Default 0 |
| Payment Frequency | Select | No | Monthly (default), Weekly, Daily |

### Input UX

**Scenario Cards:**
- Start with 2 cards visible
- "Add Another Loan" button (max 3)
- Each card collapsible/expandable
- "Remove" button on cards 2 and 3
- Allow naming loans ("Bank Offer," "Online Lender," etc.)

**Fee Inputs:**
- Collapsed by default under "Add fees (optional)"
- Origination fee: toggle between $ and %
- Fees add to total cost comparison

**Quick Compare Mode:**
For users without specific offers, provide a simpler mode:
- Compare by loan type (Term Loan vs Line of Credit vs Equipment)
- Auto-populate typical rates/terms
- Educational focus

---

## Outputs

### Primary Output: Comparison Table

```
┌─────────────────────────────────────────────────────────────────────────┐
│  Loan Comparison Results                                                │
├───────────────────┬───────────────────┬───────────────────┬────────────┤
│                   │  Bank Offer       │  Online Lender    │  SBA 7(a)  │
├───────────────────┼───────────────────┼───────────────────┼────────────┤
│  Loan Amount      │  $100,000         │  $100,000         │  $100,000  │
│  Interest Rate    │  9.5%             │  18%              │  7.5%      │
│  Term             │  5 years          │  2 years          │  10 years  │
│  Monthly Payment  │  $2,100           │  $4,992           │  $1,187    │
├───────────────────┼───────────────────┼───────────────────┼────────────┤
│  Total Interest   │  $26,000          │  $19,808          │  $42,440   │
│  Total Fees       │  $2,000           │  $3,000           │  $2,750    │
│  TOTAL COST       │  $128,000         │  $122,808    ★    │  $145,190  │
├───────────────────┼───────────────────┼───────────────────┼────────────┤
│  Cost per $1k     │  $280             │  $228        ★    │  $452      │
│  borrowed                                                              │
└───────────────────┴───────────────────┴───────────────────┴────────────┘
                                        ★ = Lowest in category
```

### Secondary Output: Winner Summary

```
┌─────────────────────────────────────────────────────────────────────────┐
│  Quick Verdict                                                          │
│                                                                         │
│  💰 Lowest Total Cost:      Online Lender ($122,808)                   │
│  📉 Lowest Monthly Payment: SBA 7(a) ($1,187)                          │
│  ⏱️  Fastest Payoff:         Online Lender (2 years)                   │
│                                                                         │
│  ─────────────────────────────────────────────────────────────────────  │
│                                                                         │
│  The "best" loan depends on your priorities:                            │
│                                                                         │
│  • Need lowest payments? → SBA 7(a)                                    │
│  • Want to minimize total cost? → Online Lender                        │
│  • Need quick payoff + reasonable payments? → Bank Offer               │
│                                                                         │
└─────────────────────────────────────────────────────────────────────────┘
```

### Tertiary Output: Visual Comparison

**Bar Chart: Total Cost Breakdown**
```
Bank Offer     ████████████████████████████░░░░░░░░ $128,000
               [Principal: $100k] [Interest: $26k] [Fees: $2k]

Online Lender  ███████████████████████████░░░░░░░░░ $122,808
               [Principal: $100k] [Interest: $19.8k] [Fees: $3k]

SBA 7(a)       █████████████████████████████████████████████ $145,190
               [Principal: $100k] [Interest: $42.4k] [Fees: $2.75k]
```

**Line Chart: Cumulative Cost Over Time**
- X-axis: Months
- Y-axis: Total paid to date
- One line per loan
- Shows crossover points where one loan becomes "cheaper"

### Payment Schedule Comparison

Expandable section showing side-by-side amortization:

| Month | Bank Offer | Online Lender | SBA 7(a) |
|-------|-----------|---------------|----------|
| 1 | $2,100 | $4,992 | $1,187 |
| 12 | $25,200 | $59,904 | $14,244 |
| 24 | $50,400 | $119,808 ✓ | $28,488 |
| 36 | $75,600 | — | $42,732 |
| ... | ... | — | ... |

---

## Calculations

### Monthly Payment
Standard amortization formula for each loan.

### Total Interest
```
Total Interest = (Monthly Payment × Term in Months) - Principal
```

### Total Cost
```
Total Cost = Principal + Total Interest + Origination Fee + Other Fees
```

### Cost per $1,000 Borrowed
```
Cost per $1k = (Total Cost - Principal) / (Principal / 1000)
```
This normalizes comparison across different loan amounts.

### Effective APR (Including Fees)
```
Adjust principal for fees, recalculate effective rate
```

---

## UI/UX Design

### Layout

```
┌──────────────────────────────────────────────────────────────────────┐
│  Compare Business Loans                                              │
│                                                                      │
│  Enter your loan offers to see which one costs less.                 │
│                                                                      │
├──────────────────────────────────────────────────────────────────────┤
│                                                                      │
│  ┌─────────────────────┐  ┌─────────────────────┐  ┌──────────────┐ │
│  │  Loan A             │  │  Loan B             │  │  + Add Loan  │ │
│  │  [Bank Offer    ]   │  │  [Online Lender ]   │  │              │ │
│  │                     │  │                     │  │              │ │
│  │  Amount             │  │  Amount             │  │              │ │
│  │  [$100,000     ]    │  │  [$100,000     ]    │  │              │ │
│  │                     │  │                     │  │              │ │
│  │  Rate (APR)         │  │  Rate (APR)         │  │              │ │
│  │  [9.5%         ]    │  │  [18%          ]    │  │              │ │
│  │                     │  │                     │  │              │ │
│  │  Term               │  │  Term               │  │              │ │
│  │  [5 years      ]    │  │  [2 years      ]    │  │              │ │
│  │                     │  │                     │  │              │ │
│  │  [+ Add fees]       │  │  [+ Add fees]       │  │              │ │
│  │                     │  │                     │  │              │ │
│  └─────────────────────┘  └─────────────────────┘  └──────────────┘ │
│                                                                      │
│  [       Compare Loans       ]                                       │
│                                                                      │
├──────────────────────────────────────────────────────────────────────┤
│                                                                      │
│  [RESULTS TABLE]                                                     │
│                                                                      │
│  [WINNER SUMMARY]                                                    │
│                                                                      │
│  [▼ View cost breakdown chart]                                      │
│  [▼ View payment timeline]                                          │
│                                                                      │
├──────────────────────────────────────────────────────────────────────┤
│                                                                      │
│  ┌────────────────────────────────────────────────────────────────┐ │
│  │  Want more options to compare?                                 │ │
│  │                                                                │ │
│  │  Get matched with lenders and receive multiple offers          │ │
│  │  tailored to your business.                                    │ │
│  │                                                                │ │
│  │  [ Get More Loan Options ]                                     │ │
│  └────────────────────────────────────────────────────────────────┘ │
│                                                                      │
└──────────────────────────────────────────────────────────────────────┘
```

### Mobile Layout

- Stack loan cards vertically
- Swipeable comparison table
- Sticky "Compare" button

---

## Content Wrapper (SEO)

### Above the Tool (150 words)

```markdown
# Compare Business Loans

Evaluate multiple loan offers side by side. Enter the details of each 
loan to see which one has the lowest total cost, lowest monthly payment, 
or best fits your cash flow.

**What this comparison shows:**
- Monthly payment for each loan
- Total interest over the life of the loan
- Total cost including fees
- Which loan "wins" by different criteria

Have offers in hand? Enter them below. Just exploring? Try our 
[Loan Finder Quiz](/tools/loan-finder-quiz) first.
```

### Below the Tool (400 words)

```markdown
## How to Compare Business Loan Offers

Not all loans are created equal. A lower interest rate doesn't always 
mean a cheaper loan. Here's what to look at:

### Total Cost vs. Monthly Payment

The loan with the lowest monthly payment often costs more overall. 
That's because longer terms mean more months of interest.

**Example:**
- Loan A: $2,000/month for 3 years = $72,000 total
- Loan B: $1,200/month for 5 years = $72,000 total

Same total cost, very different cash flow impact.

### Don't Forget Fees

Origination fees, closing costs, and other charges add to your total 
cost. A 3% origination fee on a $100,000 loan is $3,000 before you 
even start paying interest.

Always ask for the **APR** (Annual Percentage Rate), which includes 
fees in the calculation. A loan with a lower interest rate but higher 
fees may actually cost more.

### The Term Tradeoff

| Shorter Terms | Longer Terms |
|--------------|--------------|
| Higher monthly payments | Lower monthly payments |
| Less total interest | More total interest |
| Faster payoff | Slower payoff |
| Better for cash-rich businesses | Better for cash-flow-sensitive businesses |

There's no universally "better" option — it depends on your situation.

### When Lower Cost Isn't Best

Sometimes the cheapest loan isn't the right choice:

- **Cash flow matters:** A slightly more expensive loan with lower 
  payments might be worth it if it keeps your business running smoothly.
  
- **Speed matters:** An online lender charging more might be worth it 
  if you need funds in days instead of weeks.
  
- **Flexibility matters:** A line of credit might cost more in interest 
  but gives you flexibility a term loan doesn't.

### Questions to Ask About Each Offer

1. What's the APR (not just interest rate)?
2. Are there prepayment penalties?
3. What fees are included?
4. How fast can you fund?
5. What happens if I miss a payment?

[Get multiple offers to compare →](/get-started)
```

---

## Internal Linking

**Link TO this tool from:**
- Payment calculator ("Compare multiple scenarios")
- Affordability calculator ("Compare loans at your budget")
- Blog articles about evaluating loan offers
- Comparison articles (term loan vs line of credit)

**Link FROM this tool to:**
- `/get-started` ("Get more offers to compare")
- `/tools/loan-finder-quiz` ("Not sure what to compare?")
- `/tools/loan-payment-calculator` ("Calculate a single loan")
- `/glossary/apr`
- `/glossary/origination-fee`

---

## Lead Capture

### Primary CTA

```
Want more options to compare?

Get matched with multiple lenders and receive offers 
tailored to your business profile.

[ Get More Loan Options ]
```

### Email Results

```
📧 Save this comparison

We'll email you a PDF with your full comparison, 
including charts and payment schedules.

[email] [Send Comparison]
```

---

## Analytics Events

| Event | Trigger | Parameters |
|-------|---------|------------|
| `tool_start` | First loan entered | tool: loan-comparison |
| `tool_add_loan` | Add 3rd loan | loan_count |
| `tool_compare` | Click compare | loan_count, amounts |
| `tool_view_chart` | Expand chart | chart_type |
| `tool_email_results` | Submit email | — |
| `cta_click` | Click CTA | — |

---

## Build Checklist

- [ ] Create page route and metadata
- [ ] Build repeatable loan input card component
- [ ] Add/remove loan functionality (2-3 loans)
- [ ] Implement all calculations
- [ ] Build comparison results table
- [ ] Build winner summary component
- [ ] Create cost breakdown chart
- [ ] Create payment timeline chart
- [ ] Add fee inputs (optional expansion)
- [ ] Implement email comparison feature
- [ ] Write SEO content wrapper
- [ ] Add FAQ section
- [ ] Mobile responsiveness (swipeable table)
- [ ] Analytics events
- [ ] Add to tools hub
