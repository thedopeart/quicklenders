# Tool Spec: Loan Payment Calculator

**Tool Number:** 05
**Route:** `/tools/loan-payment-calculator`
**Priority:** High (build first after quiz)
**Primary Keyword:** "business loan payment calculator" (est. 5k+ monthly searches)
**Secondary Keywords:** "term loan calculator," "loan amortization calculator," "business loan monthly payment"

---

## Purpose

The simplest, most searched-for calculator in business lending. Users enter loan amount, term, and rate to see monthly payments and total cost. This is a gateway tool — high traffic, low friction, captures users early in their research.

**Target users:**
- Business owners exploring financing options
- Anyone comparing loan offers
- Early-stage researchers who don't know what they qualify for yet

**Why it matters:**
- Highest search volume of any calculator tool
- Low barrier to entry (simple inputs)
- Builds trust before asking for lead information
- Natural progression: calculator → quiz → lead form

---

## Inputs

| Field | Type | Required | Default | Validation |
|-------|------|----------|---------|------------|
| Loan Amount | Currency input | Yes | $100,000 | $5,000 - $10,000,000 |
| Interest Rate (APR) | Percentage | Yes | 12% | 1% - 50% |
| Loan Term | Select or slider | Yes | 3 years | 6 months - 10 years |
| Payment Frequency | Radio/toggle | No | Monthly | Monthly, Weekly, Daily |

### Input UX Notes

**Loan Amount:**
- Use a slider with text input override
- Preset buttons: $50k, $100k, $250k, $500k, $1M
- Format with commas as user types

**Interest Rate:**
- Show typical ranges by loan type as helper text:
  - "SBA loans: 6-10%"
  - "Bank term loans: 7-15%"
  - "Online lenders: 10-35%"
- Allow decimal input (e.g., 12.5%)

**Loan Term:**
- Dropdown or slider
- Options: 6 mo, 1 yr, 2 yr, 3 yr, 4 yr, 5 yr, 7 yr, 10 yr
- Show equivalent months in parentheses

**Payment Frequency:**
- Default to monthly (most common)
- Weekly and daily options for alternative lenders
- Update results instantly when toggled

---

## Outputs

### Primary Output: Payment Summary Card

```
┌─────────────────────────────────────────┐
│  Your Estimated Monthly Payment         │
│                                         │
│         $3,227                          │
│                                         │
│  Total of 36 payments over 3 years      │
├─────────────────────────────────────────┤
│  Principal         $100,000             │
│  Total Interest    $16,172              │
│  Total Cost        $116,172             │
└─────────────────────────────────────────┘
```

### Secondary Output: Amortization Breakdown

Expandable section showing:

**Summary Stats:**
- Total interest paid
- Total cost of loan
- Interest as % of principal

**Amortization Schedule Table:**
| Payment # | Payment | Principal | Interest | Balance |
|-----------|---------|-----------|----------|---------|
| 1 | $3,227 | $2,227 | $1,000 | $97,773 |
| 2 | $3,227 | $2,249 | $978 | $95,524 |
| ... | ... | ... | ... | ... |
| 36 | $3,227 | $3,195 | $32 | $0 |

- Show first 6 months by default
- "Show full schedule" expands to all
- Option to download as CSV

**Amortization Chart:**
- Stacked area chart showing principal vs. interest over time
- X-axis: months
- Y-axis: cumulative amount paid
- Two colors: principal (solid) and interest (lighter)

### Tertiary Output: Quick Comparisons

Show 3 quick scenarios below main results:

```
┌─────────────────────────────────────────────────────────┐
│  See how different terms affect your payment:           │
├─────────────────┬─────────────────┬─────────────────────┤
│  2-Year Term    │  3-Year Term    │  5-Year Term        │
│  $4,707/mo      │  $3,227/mo ←    │  $2,224/mo          │
│  $12,968 int.   │  $16,172 int.   │  $33,440 int.       │
└─────────────────┴─────────────────┴─────────────────────┘
```

Highlight the user's selected term. Show how shorter terms = higher payments but less interest, longer terms = lower payments but more interest.

---

## Calculations

### Monthly Payment (Standard Amortization)

```
M = P × [r(1+r)^n] / [(1+r)^n - 1]

Where:
M = Monthly payment
P = Principal (loan amount)
r = Monthly interest rate (annual rate / 12)
n = Total number of payments (term in months)
```

### Weekly Payment

```
Weekly = Monthly × 12 / 52
```

### Daily Payment

```
Daily = Monthly × 12 / 365
```

### Total Interest

```
Total Interest = (M × n) - P
```

### Amortization Schedule

For each payment period:
```
Interest Payment = Remaining Balance × Monthly Rate
Principal Payment = Monthly Payment - Interest Payment
New Balance = Previous Balance - Principal Payment
```

---

## UI/UX Design

### Layout (Desktop)

```
┌──────────────────────────────────────────────────────────────┐
│  [Nav]                                                       │
├──────────────────────────────────────────────────────────────┤
│                                                              │
│  Business Loan Payment Calculator                            │
│                                                              │
│  Estimate your monthly payments and total loan cost.         │
│                                                              │
├────────────────────────┬─────────────────────────────────────┤
│                        │                                     │
│  INPUTS                │  RESULTS                            │
│                        │                                     │
│  Loan Amount           │  ┌─────────────────────────────┐   │
│  [====●========] $100k │  │  Monthly Payment            │   │
│                        │  │       $3,227                │   │
│  Interest Rate (APR)   │  │                             │   │
│  [    12%     ] ▼      │  │  Total Interest: $16,172    │   │
│  ℹ️ Typical: 7-25%      │  │  Total Cost: $116,172       │   │
│                        │  └─────────────────────────────┘   │
│  Loan Term             │                                     │
│  [  3 years   ] ▼      │  [Compare Different Terms]         │
│                        │                                     │
│  Payment Frequency     │  ┌─────────────────────────────┐   │
│  ○ Monthly ● Weekly    │  │  [Amortization Chart]       │   │
│                        │  │  ████████████████████       │   │
│                        │  │  ░░░░░░░░░░░░░░░░░░░░       │   │
│                        │  └─────────────────────────────┘   │
│                        │                                     │
│                        │  [▼ View Amortization Schedule]    │
│                        │                                     │
├────────────────────────┴─────────────────────────────────────┤
│                                                              │
│  [    Get Your Personalized Rate    ]                       │
│                                                              │
│  This calculator uses estimates. Your actual rate depends    │
│  on credit, revenue, and time in business.                   │
│                                                              │
└──────────────────────────────────────────────────────────────┘
```

### Layout (Mobile)

- Stack inputs above results
- Collapsible amortization schedule
- Sticky CTA button at bottom
- Chart simplified or horizontal scroll

### Interactions

- **Real-time updates:** Results update instantly as inputs change (debounced 150ms)
- **Slider + input sync:** Slider and text input stay in sync
- **Preset buttons:** Quick-select common amounts
- **Expandable sections:** Amortization schedule collapsed by default
- **Chart tooltips:** Hover/tap on chart points for exact values

### Visual Design

- Clean, minimal interface
- Results card uses subtle shadow/border to stand out
- Green/positive color for total savings comparisons
- Use Recharts for amortization visualization
- shadcn/ui components for inputs and cards

---

## Content Wrapper (SEO)

### Above the Tool (150-200 words)

```markdown
# Business Loan Payment Calculator

Estimate your monthly payments before you apply. Enter your loan amount, 
interest rate, and term to see what your payments might look like.

**What this calculator shows:**
- Monthly, weekly, or daily payment amounts
- Total interest over the life of the loan
- Full amortization schedule
- How different terms affect your total cost

Your actual rate depends on your credit score, annual revenue, time in 
business, and the type of loan. Use this calculator to compare scenarios, 
then [check what rates you qualify for](/get-started).
```

### Below the Tool (300-400 words)

```markdown
## Understanding Your Loan Payment

Your monthly payment depends on three factors: how much you borrow, your 
interest rate, and how long you take to repay.

### How Loan Amortization Works

Most business term loans use amortizing payments. Each payment includes 
both principal (the amount you borrowed) and interest. Early payments are 
mostly interest; later payments are mostly principal.

This is why the total interest on a 5-year loan is much higher than a 
2-year loan, even at the same rate. You're paying interest on the balance 
for longer.

### Choosing the Right Term Length

**Shorter terms (1-2 years):**
- Higher monthly payments
- Less total interest
- Faster payoff
- Best when you can afford higher payments and want to minimize cost

**Longer terms (3-5+ years):**
- Lower monthly payments
- More total interest
- Easier cash flow
- Best when you need manageable payments or are financing long-lived assets

### What Rate Should You Expect?

Rates vary widely by loan type and your qualifications:

| Loan Type | Typical APR Range |
|-----------|------------------|
| SBA 7(a) | 6% - 10% |
| Bank term loan | 7% - 15% |
| Online lender | 10% - 35% |
| Equipment financing | 6% - 20% |

The rate you receive depends on your [credit score](/glossary/credit-score), 
[annual revenue](/glossary/annual-revenue), [time in business](/glossary/time-in-business), 
and collateral.

### This Is an Estimate

This calculator gives you a starting point for planning. Your actual loan 
offer will include origination fees, closing costs, and terms specific to 
your situation.

Ready to see what you actually qualify for?

[Get Your Personalized Options →](/get-started?source=tool&tool=loan-payment-calculator)
```

### FAQ Section (3-4 questions)

Pull from FAQ-BANK.md:
1. How accurate is the loan payment calculator?
2. Does the calculator include fees?
3. What interest rate should I expect on a business loan?
4. What's the difference between APR and interest rate?

---

## Internal Linking

**Link TO this tool from:**
- All loan product pages (term loans, lines of credit, equipment financing)
- Blog articles about loan costs, comparing loans, understanding APR
- Glossary terms: amortization, APR, interest rate, principal
- Homepage (tools section)

**Link FROM this tool to:**
- `/get-started` (primary CTA)
- `/tools/loan-finder-quiz` (secondary CTA: "Not sure what rate you'll get?")
- `/tools/affordability-calculator` ("Calculate how much you can borrow")
- `/tools/loan-comparison` ("Compare multiple scenarios")
- `/glossary/amortization`
- `/glossary/apr`
- `/business-loans/term-loans`

---

## Lead Capture Opportunities

### Soft Capture: Email Results

After showing results, offer:
```
┌─────────────────────────────────────────┐
│  📧 Email these results to yourself     │
│                                         │
│  [email@example.com        ] [Send]     │
│                                         │
│  We'll include your amortization        │
│  schedule and comparison scenarios.     │
└─────────────────────────────────────────┘
```

This captures email without requiring full lead form.

### Primary CTA: Get Real Rates

```
┌─────────────────────────────────────────┐
│  This calculator shows estimates.       │
│  See what you actually qualify for.     │
│                                         │
│  [  Get Your Personalized Rate  ]       │
│                                         │
│  Takes 2 minutes. No credit impact.     │
└─────────────────────────────────────────┘
```

Link to: `/get-started?source=tool&tool=loan-payment-calculator&amount=[entered_amount]`

Pass the loan amount as a URL parameter to pre-fill the lead form.

---

## Analytics Events

| Event | Trigger | Parameters |
|-------|---------|------------|
| `tool_start` | First input interaction | tool: loan-payment-calculator |
| `tool_calculate` | Results displayed | amount, rate, term |
| `tool_compare_terms` | Click "Compare Different Terms" | — |
| `tool_view_amortization` | Expand amortization schedule | — |
| `tool_download_csv` | Download amortization CSV | — |
| `tool_email_results` | Submit email for results | — |
| `cta_click` | Click primary CTA | tool: loan-payment-calculator |

---

## Technical Implementation

### Dependencies

```json
{
  "recharts": "^2.x",
  "react-hook-form": "^7.x",
  "zod": "^3.x"
}
```

### Component Structure

```
/app/tools/loan-payment-calculator/
├── page.tsx                    # Main page with SEO content
├── components/
│   ├── Calculator.tsx          # Main calculator (client component)
│   ├── InputPanel.tsx          # Left side inputs
│   ├── ResultsPanel.tsx        # Right side results
│   ├── AmortizationChart.tsx   # Recharts visualization
│   ├── AmortizationTable.tsx   # Expandable schedule table
│   ├── TermComparison.tsx      # Quick comparison cards
│   └── EmailCapture.tsx        # Email results form
├── lib/
│   ├── calculations.ts         # Payment math functions
│   └── amortization.ts         # Schedule generation
└── types.ts                    # TypeScript interfaces
```

### State Management

```typescript
interface CalculatorState {
  loanAmount: number;
  interestRate: number;
  termMonths: number;
  paymentFrequency: 'monthly' | 'weekly' | 'daily';
}

interface CalculatorResults {
  payment: number;
  totalInterest: number;
  totalCost: number;
  schedule: AmortizationRow[];
}
```

### Performance

- All calculations client-side (no API calls)
- Debounce input changes (150ms)
- Lazy load amortization table (only render when expanded)
- Memoize calculation results

---

## Schema Markup

```json
{
  "@context": "https://schema.org",
  "@type": "WebApplication",
  "name": "Business Loan Payment Calculator",
  "description": "Calculate monthly payments, total interest, and amortization schedule for business loans.",
  "applicationCategory": "FinanceApplication",
  "operatingSystem": "Web",
  "offers": {
    "@type": "Offer",
    "price": "0",
    "priceCurrency": "USD"
  },
  "provider": {
    "@type": "Organization",
    "name": "Quick Lenders",
    "url": "https://quicklenders.com"
  }
}
```

Add FAQPage schema for the FAQ section.

---

## Success Metrics

| Metric | Target | Measurement |
|--------|--------|-------------|
| Monthly organic visits | 2,000+ | Google Analytics |
| Tool completion rate | 80%+ | tool_calculate / page views |
| Email capture rate | 5-10% | tool_email_results / tool_calculate |
| CTA click rate | 10-15% | cta_click / tool_calculate |
| Lead form conversion | 20%+ | leads from this source / cta_click |

---

## Build Checklist

- [ ] Create page route and metadata
- [ ] Build input components with validation
- [ ] Implement payment calculations
- [ ] Build amortization schedule generator
- [ ] Create results display components
- [ ] Build amortization chart with Recharts
- [ ] Add term comparison feature
- [ ] Implement email capture
- [ ] Write SEO content wrapper
- [ ] Add FAQ section with schema
- [ ] Implement analytics events
- [ ] Test mobile responsiveness
- [ ] Test calculations against known values
- [ ] Add to /tools hub page
- [ ] Internal link from related pages
