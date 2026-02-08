# Tool Spec: Working Capital Calculator

**Tool Number:** 10
**Route:** `/tools/working-capital-calculator`
**Priority:** Medium
**Primary Keyword:** "working capital calculator" (est. 1k+ monthly searches)
**Secondary Keywords:** "how much working capital do I need," "calculate working capital," "working capital needs"

---

## Purpose

Calculate working capital needs based on business financials. Shows current working capital position, identifies gaps, and recommends appropriate loan amounts. Helps users understand how much they should borrow for operational needs.

**Target users:**
- Business owners experiencing cash flow gaps
- Those preparing for seasonal fluctuations
- Users who know they need "working capital" but not how much
- Businesses evaluating line of credit amounts

**Why it matters:**
- Working capital loans are a core product
- Helps users right-size their loan request
- Educational tool that builds trust
- Pre-qualifies by having users think through their finances

---

## Inputs

### Section 1: Current Assets

| Field | Type | Required | Helper Text |
|-------|------|----------|-------------|
| Cash & Bank Balances | Currency | Yes | Money in checking, savings, and money market accounts |
| Accounts Receivable | Currency | Yes | Money owed to you by customers |
| Inventory | Currency | No | Value of goods you have in stock |
| Prepaid Expenses | Currency | No | Expenses paid in advance (rent, insurance, etc.) |

### Section 2: Current Liabilities

| Field | Type | Required | Helper Text |
|-------|------|----------|-------------|
| Accounts Payable | Currency | Yes | Money you owe to suppliers |
| Short-term Debt | Currency | Yes | Loan payments due within 12 months |
| Accrued Expenses | Currency | No | Wages, taxes, utilities owed but not yet paid |
| Other Current Liabilities | Currency | No | Any other obligations due within 12 months |

### Section 3: Business Context (Optional)

| Field | Type | Required | Purpose |
|-------|------|----------|---------|
| Monthly Operating Expenses | Currency | No | Calculate months of runway |
| Monthly Revenue | Currency | No | Calculate working capital ratio context |
| Industry | Select | No | Industry-specific benchmarks |
| Seasonal Business? | Toggle | No | Adjust recommendations |

### Input UX

**Progressive Disclosure:**
- Start with required fields only
- "Add more details for better analysis" expands optional fields
- Tooltips with examples for each field

**Quick Entry Mode:**
For users who just want a rough estimate:
```
[ ] I just want a quick estimate

Enter your rough numbers:
- Total cash on hand: $______
- Money customers owe you: $______
- Bills you need to pay: $______
```

---

## Outputs

### Primary Output: Working Capital Summary

```
┌─────────────────────────────────────────────────────────────┐
│  Your Working Capital Position                              │
│                                                             │
│  Current Assets          Current Liabilities                │
│  ─────────────────       ────────────────────               │
│  Cash         $45,000    Accounts Payable  $38,000         │
│  Receivables  $62,000    Short-term Debt   $15,000         │
│  Inventory    $28,000    Accrued Expenses  $12,000         │
│  Prepaid       $5,000    Other              $5,000         │
│  ─────────────────       ────────────────────               │
│  Total       $140,000    Total             $70,000         │
│                                                             │
├─────────────────────────────────────────────────────────────┤
│                                                             │
│  Net Working Capital: $70,000                               │
│  ═══════════════════════════                                │
│                                                             │
│  Working Capital Ratio: 2.0                                 │
│  (Current Assets ÷ Current Liabilities)                     │
│                                                             │
│  ✓ Healthy Position                                         │
│  A ratio above 1.5 indicates you can comfortably cover      │
│  short-term obligations.                                    │
│                                                             │
└─────────────────────────────────────────────────────────────┘
```

### Working Capital Ratio Interpretation

| Ratio | Status | Interpretation |
|-------|--------|----------------|
| < 1.0 | Critical | Current liabilities exceed assets. Immediate action needed. |
| 1.0 - 1.2 | Tight | Just barely covering obligations. Vulnerable to disruption. |
| 1.2 - 1.5 | Adequate | Meeting obligations with some buffer. |
| 1.5 - 2.0 | Healthy | Comfortable margin for unexpected expenses. |
| > 2.0 | Strong | Very healthy, though capital may be underutilized. |

### Secondary Output: Cash Runway (If Monthly Expenses Provided)

```
┌─────────────────────────────────────────────────────────────┐
│  Cash Runway Analysis                                       │
│                                                             │
│  Monthly Operating Expenses:    $25,000                     │
│  Current Cash Position:         $45,000                     │
│                                                             │
│  Runway: 1.8 months                                         │
│  ════════════════════                                       │
│                                                             │
│  ⚠️ This is below the recommended 3-month minimum.          │
│                                                             │
│  To reach 3 months runway, you'd need:    $75,000 cash     │
│  Current shortfall:                       $30,000          │
│                                                             │
└─────────────────────────────────────────────────────────────┘
```

### Tertiary Output: Recommended Loan Amount

```
┌─────────────────────────────────────────────────────────────┐
│  Working Capital Recommendation                             │
│                                                             │
│  Based on your numbers, we recommend:                       │
│                                                             │
│  Minimum:     $30,000                                       │
│  (Bring cash runway to 3 months)                            │
│                                                             │
│  Comfortable: $50,000                                       │
│  (3-month runway + 20% buffer)                              │
│                                                             │
│  Growth Mode: $75,000                                       │
│  (6-month runway for flexibility)                           │
│                                                             │
├─────────────────────────────────────────────────────────────┤
│  Best Financing Option: Business Line of Credit             │
│                                                             │
│  Why: Draw only what you need, pay interest only on what    │
│  you use. Ideal for fluctuating working capital needs.      │
│                                                             │
│  [ See Line of Credit Options ]                            │
└─────────────────────────────────────────────────────────────┘
```

### Visual: Working Capital Waterfall Chart

```
Assets                                    Liabilities
┌──────────┐                              
│          │ Cash: $45k                   
│██████████│                              
├──────────┤                              ┌──────────┐
│          │ Receivables: $62k            │          │ Payables: $38k
│██████████│                              │██████████│
│██████████│                              ├──────────┤
├──────────┤                              │          │ S-T Debt: $15k
│          │ Inventory: $28k              │██████████│
│██████████│                              ├──────────┤
├──────────┤                              │          │ Accrued: $12k
│          │ Prepaid: $5k                 │██████████│
│██████████│                              ├──────────┤
└──────────┘                              │░░░░░░░░░░│ Other: $5k
$140,000 Total                            └──────────┘
                                          $70,000 Total
              
              Net Working Capital: $70,000
```

---

## Calculations

### Net Working Capital

```
Net Working Capital = Current Assets - Current Liabilities

Where:
Current Assets = Cash + Receivables + Inventory + Prepaid
Current Liabilities = Payables + Short-term Debt + Accrued + Other
```

### Working Capital Ratio

```
Working Capital Ratio = Current Assets / Current Liabilities
```

### Cash Runway

```
Cash Runway (months) = Cash / Monthly Operating Expenses
```

### Recommended Loan Amount

```
Minimum = (Target Runway Months × Monthly Expenses) - Current Cash
        = (3 × $25,000) - $45,000
        = $30,000

Comfortable = Minimum × 1.2 (20% buffer)
            = $30,000 × 1.2
            = $36,000 → round to $40,000 or $50,000

Growth = (6 × Monthly Expenses) - Current Cash
       = (6 × $25,000) - $45,000
       = $105,000
```

### Industry Adjustments

If industry is provided, adjust target ratios:

| Industry | Target WC Ratio | Target Runway |
|----------|-----------------|---------------|
| Retail | 1.5 - 2.0 | 3-4 months |
| Manufacturing | 1.5 - 2.5 | 4-6 months |
| Services | 1.2 - 1.5 | 2-3 months |
| Construction | 1.5 - 2.0 | 4-6 months |
| Restaurants | 1.0 - 1.5 | 2-3 months |
| Seasonal | 2.0+ | 6+ months |

---

## UI/UX Design

### Layout

```
┌──────────────────────────────────────────────────────────────┐
│  Working Capital Calculator                                  │
│                                                              │
│  Find out how much working capital your business needs.      │
│                                                              │
├──────────────────────────────────────────────────────────────┤
│                                                              │
│  ┌─────────────────────────────────────────────────────────┐│
│  │  Current Assets                                         ││
│  │                                                         ││
│  │  Cash & Bank Balances      [$      45,000            ] ││
│  │  Accounts Receivable       [$      62,000            ] ││
│  │  Inventory                 [$      28,000            ] ││
│  │  Prepaid Expenses          [$       5,000            ] ││
│  │                            ─────────────────────────   ││
│  │  Total Current Assets      $140,000                    ││
│  └─────────────────────────────────────────────────────────┘│
│                                                              │
│  ┌─────────────────────────────────────────────────────────┐│
│  │  Current Liabilities                                    ││
│  │                                                         ││
│  │  Accounts Payable          [$      38,000            ] ││
│  │  Short-term Debt           [$      15,000            ] ││
│  │  Accrued Expenses          [$      12,000            ] ││
│  │  Other Liabilities         [$       5,000            ] ││
│  │                            ─────────────────────────   ││
│  │  Total Liabilities         $70,000                     ││
│  └─────────────────────────────────────────────────────────┘│
│                                                              │
│  [▼ Add monthly expenses for runway analysis]               │
│                                                              │
│  [ Calculate Working Capital ]                              │
│                                                              │
├──────────────────────────────────────────────────────────────┤
│                                                              │
│  [RESULTS: Working Capital Summary]                         │
│  [RESULTS: Ratio Interpretation]                            │
│  [RESULTS: Cash Runway - if provided]                       │
│  [RESULTS: Recommended Loan Amount]                         │
│  [RESULTS: Waterfall Chart]                                 │
│                                                              │
├──────────────────────────────────────────────────────────────┤
│                                                              │
│  ┌────────────────────────────────────────────────────────┐ │
│  │  Ready to secure your working capital?                 │ │
│  │                                                        │ │
│  │  Based on your analysis, a line of credit around       │ │
│  │  $50,000 could provide the flexibility you need.       │ │
│  │                                                        │ │
│  │  [ Get Line of Credit Options ]                        │ │
│  └────────────────────────────────────────────────────────┘ │
│                                                              │
└──────────────────────────────────────────────────────────────┘
```

---

## Content Wrapper (SEO)

### Above the Tool (150 words)

```markdown
# Working Capital Calculator

Calculate how much working capital your business needs to operate 
smoothly. Enter your current assets and liabilities to see your 
working capital position and get recommendations.

**What you'll learn:**
- Your net working capital position
- Your working capital ratio (and what it means)
- How many months of runway you have
- How much working capital financing you might need

Healthy working capital keeps your business running between when you 
pay expenses and when customers pay you. Find out where you stand.
```

### Below the Tool (400 words)

```markdown
## Understanding Working Capital

Working capital is the money available for day-to-day operations — the 
difference between what you own (current assets) and what you owe 
(current liabilities) in the short term.

### Why Working Capital Matters

Positive working capital means you can:
- Pay suppliers on time
- Cover payroll without stress
- Handle unexpected expenses
- Take advantage of opportunities

Negative or tight working capital means you're constantly juggling, 
potentially missing payments, and vulnerable to any disruption.

### The Working Capital Cycle

Money flows through your business in a cycle:

1. **Cash** → Pay suppliers for inventory
2. **Inventory** → Sell to customers
3. **Receivables** → Wait for customers to pay
4. **Cash** → Cycle repeats

The longer this cycle takes, the more working capital you need. If 
customers take 60 days to pay but you owe suppliers in 30 days, you 
need cash to bridge that gap.

### Working Capital by Industry

Different industries have different working capital needs:

| Industry | Why |
|----------|-----|
| Retail | High inventory, but quick cash conversion |
| Manufacturing | Long production cycles, inventory heavy |
| Services | Low inventory, but may wait for payment |
| Construction | Project-based, irregular cash flow |
| Restaurants | Daily cash, but tight margins |

### Financing Options for Working Capital

**[Business Line of Credit](/business-loans/lines-of-credit)** — Best 
for ongoing, fluctuating needs. Draw when needed, repay, draw again.

**[Short-term Loans](/business-loans/term-loans)** — Good for one-time 
needs with predictable repayment.

**[Invoice Factoring](/glossary/invoice-factoring)** — Convert 
receivables to cash immediately.

**[Accounts Receivable Financing](/glossary/accounts-receivable-financing)** 
— Borrow against outstanding invoices.

### Signs You Need Working Capital Financing

- Regularly delaying supplier payments
- Struggling to make payroll on time
- Turning down opportunities due to cash constraints
- Seasonal business with predictable slow periods
- Growing fast and cash can't keep up

[Check your working capital options →](/get-started?loan_type=lines-of-credit)
```

---

## Internal Linking

**Link TO this tool from:**
- Glossary: working capital, current assets, current liabilities
- Lines of credit product page
- Blog articles about cash flow management
- Industry pages (especially retail, manufacturing, construction)

**Link FROM this tool to:**
- `/get-started` (primary CTA)
- `/business-loans/lines-of-credit` (recommended product)
- `/glossary/working-capital`
- `/glossary/accounts-receivable`
- `/glossary/accounts-payable`
- `/tools/cash-flow-forecast` (if exists/when built)
- `/tools/dscr-calculator`

---

## Lead Capture

### Dynamic CTA Based on Results

**Healthy Position (Ratio > 1.5):**
```
Your working capital looks healthy. A line of credit can 
provide additional flexibility for growth opportunities.

[ Explore Line of Credit Options ]
```

**Tight Position (Ratio 1.0 - 1.5):**
```
Your working capital could use some reinforcement. 
A $[recommended_amount] line of credit could provide 
the buffer you need.

[ Get Working Capital Options ]
```

**Critical Position (Ratio < 1.0):**
```
Your working capital needs attention. Let's find financing 
to get your cash position healthy.

[ See Your Options Now ]
```

### Email Capture

```
📧 Get your working capital report

We'll email you a PDF with your full analysis, 
industry benchmarks, and recommendations.

[email] [Send Report]
```

---

## Analytics Events

| Event | Trigger | Parameters |
|-------|---------|------------|
| `tool_start` | First input | tool: working-capital-calculator |
| `tool_calculate` | Show results | wc_amount, wc_ratio, ratio_tier |
| `tool_add_expenses` | Expand runway section | — |
| `tool_email_results` | Submit email | ratio_tier |
| `cta_click` | Click CTA | ratio_tier, recommended_amount |

---

## Build Checklist

- [ ] Create page route and metadata
- [ ] Build asset input section
- [ ] Build liability input section
- [ ] Add optional expenses section (expandable)
- [ ] Implement all calculations
- [ ] Build results summary component
- [ ] Create ratio interpretation component
- [ ] Build runway analysis component
- [ ] Create recommendation engine
- [ ] Build waterfall chart visualization
- [ ] Implement dynamic CTAs
- [ ] Add industry selection and benchmarks
- [ ] Email capture feature
- [ ] Write SEO content wrapper
- [ ] Add FAQ section
- [ ] Analytics events
- [ ] Mobile responsiveness
- [ ] Add to tools hub
