# Tool Spec: DSCR Calculator

**Tool Number:** 06
**Route:** `/tools/dscr-calculator`
**Priority:** High (low competition keyword, high value for qualified leads)
**Primary Keyword:** "DSCR calculator" (est. 1,000+ monthly searches, low difficulty)
**Secondary Keywords:** "debt service coverage ratio calculator," "calculate DSCR," "DSCR formula"

---

## Purpose

Calculate Debt Service Coverage Ratio (DSCR) — a critical metric lenders use to determine if a business can afford loan payments. This tool helps users understand where they stand before applying and what they need to improve.

**Target users:**
- Business owners preparing to apply for a loan
- Those who've been asked about DSCR by a lender
- Users researching loan requirements
- More sophisticated/serious borrowers (higher intent than payment calculator)

**Why it matters:**
- Low-competition keyword opportunity
- Attracts higher-quality leads (users who know about DSCR are further along)
- Educational value builds trust
- Clear path to "improve your DSCR" content and lead capture

---

## Inputs

### Option A: Simple Mode (Default)

| Field | Type | Required | Default | Validation |
|-------|------|----------|---------|------------|
| Net Operating Income (Annual) | Currency | Yes | — | $1 - $100,000,000 |
| Total Annual Debt Payments | Currency | Yes | — | $1 - $50,000,000 |

### Option B: Detailed Mode (Expandable)

For users who don't know their NOI off the top of their head:

**Calculate NOI:**
| Field | Type | Required |
|-------|------|----------|
| Annual Revenue | Currency | Yes |
| Cost of Goods Sold | Currency | Yes |
| Operating Expenses | Currency | Yes |

NOI = Revenue - COGS - Operating Expenses

**Calculate Total Debt Payments:**
| Field | Type | Required |
|-------|------|----------|
| Existing Loan Payments (Annual) | Currency | No |
| Proposed New Loan Payment (Monthly) | Currency | No |

Total Debt = Existing + (Proposed × 12)

### Input UX Notes

**Mode Toggle:**
```
[Simple] [Detailed]
         ────────
```
Default to Simple. Detailed mode expands additional fields with smooth animation.

**Helper Text:**
- NOI: "Your profit before interest, taxes, depreciation, and amortization. Check your P&L statement."
- Debt Payments: "Include all loan payments: term loans, lines of credit, equipment financing, real estate."

**Proposed Loan Helper:**
- Link to payment calculator: "Not sure? [Calculate your payment first](/tools/loan-payment-calculator)"

---

## Outputs

### Primary Output: DSCR Score

```
┌─────────────────────────────────────────────────────────────┐
│                                                             │
│  Your Debt Service Coverage Ratio                           │
│                                                             │
│              1.45                                           │
│              ━━━━                                           │
│                                                             │
│  ┌─────────────────────────────────────────────────────┐   │
│  │ ░░░░░░░░░░░░░░░░░░░░████████████░░░░░░░░░░░░░░░░░░░ │   │
│  │ 0        0.8    1.0    1.25   1.5    2.0          3 │   │
│  │          ↑       ↑      ↑                           │   │
│  │        Risky  Break  Good                           │   │
│  │               Even                                   │   │
│  └─────────────────────────────────────────────────────┘   │
│                                                             │
│  ✓ Strong Position                                         │
│  Your business generates 45% more income than needed        │
│  to cover debt payments. Most lenders will view this        │
│  favorably.                                                 │
│                                                             │
└─────────────────────────────────────────────────────────────┘
```

### DSCR Interpretation Tiers

| DSCR Range | Status | Color | Message |
|------------|--------|-------|---------|
| < 0.8 | Critical | Red | "Your income doesn't cover debt payments. Lenders will likely decline." |
| 0.8 - 0.99 | Risky | Orange | "You're close to break-even but still short. Limited loan options available." |
| 1.0 - 1.14 | Marginal | Yellow | "You can cover payments, but there's little cushion. Some lenders may approve with conditions." |
| 1.15 - 1.24 | Acceptable | Light Green | "You meet minimum requirements for most lenders, including SBA loans." |
| 1.25 - 1.49 | Good | Green | "Solid position. You'll qualify with most lenders and may get better rates." |
| 1.5 - 1.99 | Strong | Green | "Strong position. Lenders will view your application favorably." |
| 2.0+ | Excellent | Green | "Excellent coverage. You're in a strong negotiating position." |

### Secondary Output: What-If Analysis

```
┌─────────────────────────────────────────────────────────────┐
│  What would change your DSCR?                               │
│                                                             │
│  If you increased NOI by 10%:        DSCR → 1.60           │
│  If you reduced debt by $500/mo:     DSCR → 1.58           │
│  If you added $2,000/mo new debt:    DSCR → 1.12           │
│                                                             │
└─────────────────────────────────────────────────────────────┘
```

### Tertiary Output: Lender Requirements Reference

```
┌─────────────────────────────────────────────────────────────┐
│  What lenders typically require:                            │
│                                                             │
│  SBA Loans              1.15 minimum                        │
│  Bank Term Loans        1.20 - 1.35 minimum                │
│  Online Lenders         1.0 - 1.15 (more flexible)         │
│  Commercial Real Estate 1.25 - 1.35 minimum                │
│                                                             │
│  Your DSCR: 1.45 ✓ Meets all typical requirements          │
│                                                             │
└─────────────────────────────────────────────────────────────┘
```

---

## Calculations

### Basic DSCR Formula

```
DSCR = Net Operating Income / Total Debt Service

Where:
- Net Operating Income (NOI) = Revenue - Operating Expenses
- Total Debt Service = All annual debt payments (principal + interest)
```

### Detailed Mode Calculations

```
NOI = Annual Revenue - COGS - Operating Expenses

Total Annual Debt Service = 
  Existing Annual Payments + (Proposed Monthly Payment × 12)
```

### What-If Scenarios

```
// 10% NOI increase
whatIfNOI = (NOI * 1.10) / totalDebt

// $500/mo debt reduction
whatIfDebtReduction = NOI / (totalDebt - 6000)

// $2,000/mo new debt
whatIfNewDebt = NOI / (totalDebt + 24000)
```

---

## UI/UX Design

### Layout (Desktop)

```
┌──────────────────────────────────────────────────────────────┐
│  DSCR Calculator                                             │
│                                                              │
│  Calculate your Debt Service Coverage Ratio to see if you    │
│  can afford a business loan.                                 │
│                                                              │
├──────────────────────────────────────────────────────────────┤
│                                                              │
│  [Simple] [Detailed]                                         │
│  ─────────                                                   │
│                                                              │
│  ┌────────────────────────────────────────────────────────┐ │
│  │  Net Operating Income (Annual)                         │ │
│  │  [                    $240,000                       ] │ │
│  │  ℹ️ Annual revenue minus operating expenses            │ │
│  │                                                        │ │
│  │  Total Annual Debt Payments                            │ │
│  │  [                    $165,000                       ] │ │
│  │  ℹ️ All loan payments including proposed new debt      │ │
│  │                                                        │ │
│  │  [ Calculate DSCR ]                                    │ │
│  └────────────────────────────────────────────────────────┘ │
│                                                              │
├──────────────────────────────────────────────────────────────┤
│                                                              │
│  ┌────────────────────────────────────────────────────────┐ │
│  │           Your DSCR: 1.45                              │ │
│  │           ════════════════                             │ │
│  │                                                        │ │
│  │  [Visual gauge/scale]                                  │ │
│  │                                                        │ │
│  │  ✓ Strong Position                                     │ │
│  │  Your income exceeds debt payments by 45%...           │ │
│  └────────────────────────────────────────────────────────┘ │
│                                                              │
│  [▼ See What-If Scenarios]                                  │
│  [▼ Lender Requirements]                                    │
│                                                              │
├──────────────────────────────────────────────────────────────┤
│                                                              │
│  ┌────────────────────────────────────────────────────────┐ │
│  │  Ready to see your loan options?                       │ │
│  │                                                        │ │
│  │  [ Get Matched with Lenders ]                          │ │
│  │                                                        │ │
│  │  Your DSCR of 1.45 qualifies you for most loan types.  │ │
│  └────────────────────────────────────────────────────────┘ │
│                                                              │
└──────────────────────────────────────────────────────────────┘
```

### Visual Gauge Design

Use a horizontal bar/gauge that shows:
- Red zone: 0 - 0.99
- Yellow zone: 1.0 - 1.24
- Green zone: 1.25+
- Marker showing user's DSCR position
- Key thresholds labeled (1.0, 1.25)

### Detailed Mode Expansion

When user clicks "Detailed":

```
┌────────────────────────────────────────────────────────────┐
│  Calculate Your NOI                                        │
│                                                            │
│  Annual Revenue           [           $500,000           ] │
│  Cost of Goods Sold       [           $180,000           ] │
│  Operating Expenses       [            $80,000           ] │
│                           ─────────────────────────────    │
│  Net Operating Income     $240,000                         │
│                                                            │
├────────────────────────────────────────────────────────────┤
│  Calculate Your Debt Payments                              │
│                                                            │
│  Existing Annual Payments [           $120,000           ] │
│  Proposed Monthly Payment [             $3,750           ] │
│  (Don't know? Calculate it →)                              │
│                           ─────────────────────────────    │
│  Total Annual Debt        $165,000                         │
│                                                            │
└────────────────────────────────────────────────────────────┘
```

---

## Content Wrapper (SEO)

### Above the Tool (150-200 words)

```markdown
# DSCR Calculator

Calculate your Debt Service Coverage Ratio to see if you can afford a 
business loan. DSCR is one of the most important metrics lenders use to 
evaluate your application.

**What is DSCR?**

DSCR measures how much income you have available to cover debt payments. 
A DSCR of 1.0 means your income exactly covers your debt. Most lenders 
want to see 1.15 to 1.35 or higher.

**Formula:** DSCR = Net Operating Income ÷ Total Debt Payments

Enter your numbers below to see where you stand.
```

### Below the Tool (400-500 words)

```markdown
## Understanding Your DSCR

Your Debt Service Coverage Ratio tells lenders whether your business 
generates enough income to comfortably make loan payments. It's one of 
the first things underwriters check.

### What DSCR Do Lenders Require?

Different loan types have different minimums:

| Loan Type | Typical DSCR Requirement |
|-----------|-------------------------|
| SBA 7(a) Loans | 1.15 minimum |
| Bank Term Loans | 1.20 - 1.35 |
| Commercial Real Estate | 1.25 - 1.35 |
| Online Lenders | 1.0 - 1.15 (more flexible) |
| Equipment Financing | Often no DSCR requirement |

A higher DSCR doesn't just help you qualify — it can also get you better 
rates and terms.

### How to Improve Your DSCR

If your DSCR is below where you need it:

**Increase Net Operating Income:**
- Raise prices or increase sales volume
- Reduce operating expenses
- Improve margins on existing products/services

**Reduce Debt Payments:**
- Pay down existing debt before applying
- Refinance existing loans to lower payments
- Extend loan terms (lower payment, more interest)

**Choose a Smaller Loan:**
- Borrow only what you need
- Phase your financing over time

### DSCR vs. Other Metrics

Lenders look at DSCR alongside other factors:

- **[Credit Score](/glossary/credit-score):** Your personal and business 
  credit history
- **[Time in Business](/glossary/time-in-business):** How long you've 
  been operating
- **[Revenue](/glossary/revenue):** Your total annual income
- **Collateral:** Assets that can secure the loan

A strong DSCR can sometimes offset weaknesses in other areas.

### When DSCR Doesn't Apply

Some financing options don't rely heavily on DSCR:

- **Merchant Cash Advances:** Based on daily credit card sales
- **Invoice Factoring:** Based on your customers' creditworthiness
- **Equipment Financing:** The equipment itself serves as collateral
- **Revenue-Based Financing:** Based on monthly revenue, not NOI

If your DSCR is low, these alternatives might be worth exploring.

## Frequently Asked Questions

[FAQ Section - pull from FAQ-BANK.md]
```

### FAQ Section

1. What DSCR do lenders want to see?
2. What if my DSCR is below 1.0?
3. How is DSCR different from cash flow?
4. Can I get a loan with a low DSCR?

---

## Internal Linking

**Link TO this tool from:**
- Glossary term: DSCR
- Glossary term: Net Operating Income
- Glossary term: Debt Service
- Blog articles about loan requirements, qualification
- Loan product pages (especially term loans, SBA, commercial real estate)
- Application checklist page

**Link FROM this tool to:**
- `/get-started` (primary CTA)
- `/tools/loan-payment-calculator` ("Calculate your proposed payment first")
- `/tools/loan-finder-quiz` ("Not sure which loan fits?")
- `/glossary/dscr` (full definition)
- `/glossary/net-operating-income`
- `/financial-insights/how-to-improve-dscr` (future article)
- `/business-loans/term-loans`
- `/business-loans/lines-of-credit`

---

## Lead Capture Strategy

### CTA Variations by DSCR Result

**DSCR ≥ 1.25 (Strong):**
```
Your DSCR of [X] puts you in a strong position. See what rates 
and terms you qualify for.

[ Get Your Loan Options ]
```

**DSCR 1.0 - 1.24 (Marginal):**
```
Your DSCR of [X] meets minimum requirements for many lenders. 
Let's find the right fit for your situation.

[ See Your Options ]
```

**DSCR < 1.0 (Low):**
```
Your current DSCR is below most lender requirements, but you 
still have options. Alternative financing like invoice factoring 
or merchant cash advances may work.

[ Explore Alternative Financing ]

Or, learn how to [improve your DSCR](/financial-insights/how-to-improve-dscr) 
before applying.
```

### Email Capture

```
┌─────────────────────────────────────────┐
│  📧 Get your DSCR analysis report       │
│                                         │
│  We'll send you:                        │
│  • Your DSCR breakdown                  │
│  • Lender requirement comparison        │
│  • Tips to improve your ratio           │
│                                         │
│  [email@example.com        ] [Send]     │
└─────────────────────────────────────────┘
```

---

## Analytics Events

| Event | Trigger | Parameters |
|-------|---------|------------|
| `tool_start` | First input interaction | tool: dscr-calculator |
| `tool_mode_change` | Toggle Simple/Detailed | mode: simple|detailed |
| `tool_calculate` | Results displayed | dscr_value, dscr_tier |
| `tool_whatif_view` | Expand what-if section | — |
| `tool_requirements_view` | Expand lender requirements | — |
| `tool_email_results` | Submit email | dscr_tier |
| `cta_click` | Click primary CTA | tool: dscr-calculator, dscr_tier |

---

## Technical Implementation

### Component Structure

```
/app/tools/dscr-calculator/
├── page.tsx                    # Main page with SEO content
├── components/
│   ├── Calculator.tsx          # Main calculator (client component)
│   ├── SimpleMode.tsx          # Simple input form
│   ├── DetailedMode.tsx        # Detailed input form with NOI calc
│   ├── ResultsDisplay.tsx      # DSCR result and interpretation
│   ├── DSCRGauge.tsx           # Visual gauge component
│   ├── WhatIfAnalysis.tsx      # What-if scenarios
│   ├── LenderRequirements.tsx  # Requirements reference table
│   └── EmailCapture.tsx        # Email results form
├── lib/
│   ├── calculations.ts         # DSCR math
│   └── interpretations.ts      # Tier logic and messaging
└── types.ts
```

### State

```typescript
interface DSCRInputs {
  mode: 'simple' | 'detailed';
  // Simple mode
  noi: number | null;
  totalDebt: number | null;
  // Detailed mode
  revenue: number | null;
  cogs: number | null;
  operatingExpenses: number | null;
  existingDebt: number | null;
  proposedMonthlyPayment: number | null;
}

interface DSCRResult {
  dscr: number;
  tier: 'critical' | 'risky' | 'marginal' | 'acceptable' | 'good' | 'strong' | 'excellent';
  message: string;
  meetsRequirements: {
    sba: boolean;
    bank: boolean;
    online: boolean;
    cre: boolean;
  };
}
```

---

## Schema Markup

```json
{
  "@context": "https://schema.org",
  "@type": "WebApplication",
  "name": "DSCR Calculator",
  "description": "Calculate your Debt Service Coverage Ratio to see if you qualify for a business loan.",
  "applicationCategory": "FinanceApplication",
  "operatingSystem": "Web",
  "offers": {
    "@type": "Offer",
    "price": "0",
    "priceCurrency": "USD"
  }
}
```

---

## Success Metrics

| Metric | Target | Measurement |
|--------|--------|-------------|
| Monthly organic visits | 500+ | Google Analytics |
| Tool completion rate | 70%+ | tool_calculate / page views |
| Email capture rate | 8-12% | Higher intent users |
| CTA click rate | 15-20% | Higher intent than payment calc |
| Lead quality score | Higher than avg | Track DSCR tier of leads |

---

## Build Checklist

- [ ] Create page route and metadata
- [ ] Build simple mode inputs
- [ ] Build detailed mode with NOI calculator
- [ ] Implement DSCR calculation
- [ ] Create tier interpretation logic
- [ ] Build visual gauge component
- [ ] Add what-if scenario calculations
- [ ] Add lender requirements reference
- [ ] Implement dynamic CTA by tier
- [ ] Add email capture
- [ ] Write SEO content wrapper
- [ ] Add FAQ section with schema
- [ ] Implement analytics events
- [ ] Test mobile responsiveness
- [ ] Add to /tools hub page
- [ ] Create /glossary/dscr term and link
