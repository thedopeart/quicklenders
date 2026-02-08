# Tool Spec: Business Valuation Calculator

**Tool Number:** 14
**Route:** `/tools/business-valuation-calculator`
**Priority:** Medium (Phase 4)
**Primary Keyword:** "business valuation calculator" (est. 1,000-3,000 monthly searches, medium competition)
**Secondary Keywords:** "how much is my business worth," "small business valuation," "business value calculator," "company valuation calculator"

---

## Purpose

Estimate a business's value using multiple valuation methods: revenue multiples, earnings multiples (SDE/EBITDA), and asset-based approaches. Helps business owners understand their company's worth for selling, buying, or financing purposes.

**Target users:**
- Business owners considering selling
- Buyers evaluating acquisition targets
- Owners seeking acquisition financing
- Business owners curious about their company's value
- ESOP planning (links to your ESOP product)

**Why it matters:**
- High-value leads (business sales involve significant financing)
- Supports acquisition loans, ESOP financing products
- Differentiator — few competitors have good valuation tools
- Long engagement time, detailed inputs
- Natural cross-sell to multiple loan products

---

## Valuation Methods Supported

### 1. Revenue Multiple Method
Simple multiplier applied to annual revenue. Best for:
- Service businesses with predictable revenue
- Quick estimates
- Businesses with inconsistent profitability

### 2. SDE Multiple Method (Seller's Discretionary Earnings)
Most common for small businesses under $5M value. SDE = Net Profit + Owner's Salary + Owner Benefits + Non-recurring Expenses

### 3. EBITDA Multiple Method
Standard for larger businesses. EBITDA = Earnings Before Interest, Taxes, Depreciation, Amortization

### 4. Asset-Based Method
Value based on net assets. Best for:
- Asset-heavy businesses
- Businesses with valuable real estate or equipment
- Liquidation scenarios

---

## Inputs

### Section 1: Business Information

| Field | Type | Required | Notes |
|-------|------|----------|-------|
| Industry | Select | Yes | Determines default multiples |
| Years in Business | Number | Yes | Affects multiple |
| Annual Revenue | Currency | Yes | Last 12 months |
| Revenue Trend | Select | No | Growing/Stable/Declining |

### Industry Options (with typical multiples)

| Industry | Revenue Multiple | SDE Multiple | EBITDA Multiple |
|----------|-----------------|--------------|-----------------|
| Restaurants & Food Service | 0.3-0.5x | 1.5-2.5x | 3-4x |
| Retail | 0.2-0.5x | 1.5-2.5x | 3-5x |
| Professional Services | 0.5-1.0x | 2-3x | 4-6x |
| Healthcare/Medical | 0.5-1.0x | 2-4x | 5-8x |
| Manufacturing | 0.4-0.7x | 2-4x | 4-6x |
| Construction/Contracting | 0.2-0.5x | 1.5-3x | 3-5x |
| Technology/SaaS | 1-5x | 3-6x | 8-15x |
| Transportation/Trucking | 0.3-0.6x | 2-3x | 4-6x |
| Wholesale/Distribution | 0.2-0.4x | 2-3x | 4-5x |
| E-commerce | 0.5-2x | 2-4x | 4-8x |
| Auto Services | 0.3-0.5x | 2-3x | 3-5x |
| Beauty/Personal Care | 0.3-0.5x | 1.5-2.5x | 3-4x |

### Section 2: Profitability (For SDE/EBITDA Methods)

| Field | Type | Required | Notes |
|-------|------|----------|-------|
| Net Profit (from P&L) | Currency | Yes | After all expenses |
| Owner's Salary | Currency | Yes | What you pay yourself |
| Owner's Benefits | Currency | No | Health insurance, car, etc. |
| Interest Expense | Currency | No | For EBITDA |
| Depreciation | Currency | No | For EBITDA |
| Amortization | Currency | No | For EBITDA |
| One-time/Non-recurring Expenses | Currency | No | Lawsuit, unusual costs |
| Personal Expenses Run Through Business | Currency | No | That a buyer wouldn't have |

### Section 3: Assets (For Asset-Based Method)

| Field | Type | Required | Notes |
|-------|------|----------|-------|
| Cash & Equivalents | Currency | No | Bank accounts |
| Accounts Receivable | Currency | No | Money owed to you |
| Inventory | Currency | No | At cost or market value |
| Equipment & Vehicles | Currency | No | Fair market value |
| Real Estate | Currency | No | If owned by business |
| Other Assets | Currency | No | Intellectual property, etc. |
| Total Liabilities | Currency | No | All debts |

### Section 4: Adjustments (Optional)

| Field | Type | Notes |
|-------|------|-------|
| Customer Concentration Risk | Select | % from top customer |
| Owner Dependency | Select | How critical is owner? |
| Growth Rate | Percentage | YoY revenue growth |
| Recurring Revenue % | Percentage | Contracts, subscriptions |

---

## Outputs

### Primary Output: Valuation Range

```
┌─────────────────────────────────────────────────────────────┐
│  Your Estimated Business Value                              │
│                                                             │
│              $425,000 - $650,000                            │
│              ═══════════════════                            │
│                                                             │
│  Based on your inputs and industry benchmarks               │
│                                                             │
│  ┌─────────────────────────────────────────────────────┐   │
│  │  Method              Low         Mid        High    │   │
│  │  ───────────────────────────────────────────────── │   │
│  │  Revenue Multiple    $250,000    $375,000   $500,000│   │
│  │  SDE Multiple        $425,000    $531,000   $637,500│   │
│  │  EBITDA Multiple     $400,000    $500,000   $600,000│   │
│  │  Asset-Based         $320,000    $320,000   $320,000│   │
│  └─────────────────────────────────────────────────────┘   │
│                                                             │
│  Most Relevant Method: SDE Multiple                        │
│  (Recommended for businesses under $5M with active owner)   │
│                                                             │
└─────────────────────────────────────────────────────────────┘
```

### Secondary Output: Calculation Breakdown

**SDE Calculation:**
```
┌─────────────────────────────────────────────────────────────┐
│  Your Seller's Discretionary Earnings (SDE)                 │
│                                                             │
│  Net Profit                    $85,000                      │
│  + Owner's Salary              $120,000                     │
│  + Owner's Benefits            $15,000                      │
│  + Non-recurring Expenses      $5,000                       │
│  + Personal Expenses           $12,000                      │
│  ─────────────────────────────────────────                  │
│  Total SDE                     $237,000                     │
│                                                             │
│  Industry Multiple Range: 1.8x - 2.7x                       │
│  Your Adjusted Multiple: 2.0x - 2.5x                        │
│  (Adjusted for 8 years in business, stable revenue)         │
│                                                             │
│  Valuation: $237,000 × 2.0-2.5 = $474,000 - $592,500       │
│                                                             │
└─────────────────────────────────────────────────────────────┘
```

**EBITDA Calculation:**
```
┌─────────────────────────────────────────────────────────────┐
│  Your EBITDA                                                │
│                                                             │
│  Net Profit                    $85,000                      │
│  + Interest                    $12,000                      │
│  + Taxes                       $25,000                      │
│  + Depreciation                $18,000                      │
│  + Amortization                $5,000                       │
│  ─────────────────────────────────────────                  │
│  EBITDA                        $145,000                     │
│                                                             │
│  Industry Multiple Range: 4x - 6x                           │
│  Valuation: $145,000 × 4-6 = $580,000 - $870,000           │
│                                                             │
└─────────────────────────────────────────────────────────────┘
```

### Tertiary Output: Value Factors Analysis

```
┌─────────────────────────────────────────────────────────────┐
│  Factors Affecting Your Valuation                           │
│                                                             │
│  Positive Factors:                              Impact      │
│  ✓ 8+ years in business                         +10-15%    │
│  ✓ Stable/growing revenue                       +5-10%     │
│  ✓ Low owner dependency                         +10-20%    │
│                                                             │
│  Risk Factors:                                              │
│  ⚠️ 40% revenue from one customer               -10-20%    │
│  ⚠️ No recurring revenue contracts              -5-10%     │
│                                                             │
│  ─────────────────────────────────────────────────────────  │
│                                                             │
│  Ways to Increase Value Before Selling:                     │
│  • Reduce customer concentration                            │
│  • Document processes to reduce owner dependency            │
│  • Secure long-term contracts with key customers            │
│  • Clean up financials and separate personal expenses       │
│                                                             │
└─────────────────────────────────────────────────────────────┘
```

---

## Calculations

### Revenue Multiple Valuation

```
Value = Annual Revenue × Industry Revenue Multiple
```

### SDE Valuation

```
SDE = Net Profit + Owner Salary + Owner Benefits + 
      Non-recurring + Personal Expenses

Value = SDE × Industry SDE Multiple
```

### EBITDA Valuation

```
EBITDA = Net Profit + Interest + Taxes + Depreciation + Amortization

Value = EBITDA × Industry EBITDA Multiple
```

### Asset-Based Valuation

```
Asset Value = Total Assets - Total Liabilities

Where Total Assets = Cash + AR + Inventory + Equipment + 
                     Real Estate + Other Assets
```

### Multiple Adjustments

Base multiple adjusted by:

| Factor | Adjustment |
|--------|------------|
| Years in business < 3 | -0.5x |
| Years in business > 10 | +0.3x |
| Declining revenue | -0.5x |
| Growing revenue > 20% | +0.5x |
| High customer concentration (>40%) | -0.3x |
| High owner dependency | -0.5x |
| Recurring revenue > 50% | +0.5x |

---

## UI/UX Design

### Layout (Stepped Form)

```
┌──────────────────────────────────────────────────────────────┐
│  Business Valuation Calculator                               │
│                                                              │
│  Estimate what your business might be worth.                 │
│                                                              │
├──────────────────────────────────────────────────────────────┤
│                                                              │
│  Step 1 of 4: Business Overview                              │
│  [●───────────────────────────────────────────────]          │
│                                                              │
│  Industry                                                    │
│  [ Professional Services          ▼]                        │
│                                                              │
│  Years in Business                                           │
│  [        8        ]                                        │
│                                                              │
│  Annual Revenue (Last 12 Months)                            │
│  [$       500,000                 ]                          │
│                                                              │
│  Revenue Trend                                               │
│  ○ Growing   ● Stable   ○ Declining                         │
│                                                              │
│                                              [Next Step →]   │
│                                                              │
└──────────────────────────────────────────────────────────────┘
```

### Results Page

Show all valuation methods with visual comparison, highlight most relevant method, expandable calculation details.

---

## Content Wrapper (SEO)

### Above the Tool (150 words)

```markdown
# Business Valuation Calculator

Estimate what your business might be worth using multiple valuation 
methods. This calculator uses industry-specific multiples and adjusts 
for factors like business age, growth, and owner dependency.

**Valuation methods included:**
- Revenue multiple
- SDE (Seller's Discretionary Earnings) multiple
- EBITDA multiple
- Asset-based valuation

Whether you're thinking about selling, buying, or just curious about 
your company's worth, this tool gives you a realistic range to work with.

*Note: This provides estimates only. A formal business valuation from 
a certified appraiser is recommended for major transactions.*
```

### Below the Tool (400 words)

```markdown
## Understanding Business Valuation

Every business valuation starts with a fundamental question: how do 
buyers measure what a business is worth?

### The Most Common Valuation Methods

**SDE Multiple (Most Common for Small Businesses)**

Seller's Discretionary Earnings represents the total financial benefit 
to a working owner. It's net profit plus the owner's salary and perks. 
Buyers use this to understand what they'd earn running the business.

**EBITDA Multiple (For Larger Businesses)**

EBITDA strips out financing decisions, accounting methods, and taxes 
to show operational profitability. More common for businesses over 
$1M in value, especially with professional management.

**Revenue Multiple**

Sometimes used for early-stage or unprofitable businesses, or as a 
quick sanity check. Less accurate than earnings-based methods.

### What Affects Your Multiple?

Two businesses in the same industry with identical profits can have 
very different values based on:

- **Customer concentration:** If one customer is 50% of revenue, 
  that's risky
- **Owner dependency:** Can the business run without you?
- **Growth trajectory:** Growing businesses command premiums
- **Recurring revenue:** Contracts and subscriptions are valuable
- **Industry trends:** Is your industry growing or shrinking?

### Financing a Business Acquisition

If you're buying a business, you'll likely need financing. Common 
options include:

- **[SBA 7(a) loans](/glossary/sba-7a-loan):** Up to $5M, 10-year terms
- **[Seller financing](/glossary/seller-financing):** Seller carries 
  part of the note
- **[Acquisition loans](/business-loans/term-loans):** Conventional 
  term financing
- **[ESOP financing](/business-loans/esop):** For employee ownership 
  transitions

[See what acquisition financing you qualify for →](/get-started)

### When to Get a Professional Valuation

This calculator provides estimates. Get a formal valuation from a 
Certified Business Appraiser (CBA) or Accredited Senior Appraiser (ASA) 
when:

- Selling to outside buyers
- Bringing in investors
- Setting up an ESOP
- Divorce or estate planning
- Legal disputes
```

---

## Internal Linking

**Link TO this tool from:**
- ESOP page
- Term loans page (acquisition financing)
- Blog articles about selling a business, buying a business
- Glossary: EBITDA, SDE, business valuation

**Link FROM this tool to:**
- `/get-started` (acquisition financing)
- `/business-loans/esop`
- `/business-loans/term-loans`
- `/tools/loan-payment-calculator` (estimate acquisition loan payment)
- `/glossary/ebitda`
- `/glossary/sde`

---

## Lead Capture

### Primary CTA (For Buyers)

```
Looking to buy this business?

See what acquisition financing you qualify for.

[ Get Acquisition Loan Options ]

→ /get-started?source=tool&tool=valuation&type=acquisition&amount=[value]
```

### Primary CTA (For Sellers — Future)

```
Thinking about selling?

We can connect you with business brokers and M&A advisors.

[ Talk to an Advisor ]
```

### Email Capture

```
📧 Download your valuation report

Get a PDF with your full valuation analysis, including 
all methods and value factors.

[email] [Download Report]
```

---

## Analytics Events

| Event | Trigger | Parameters |
|-------|---------|------------|
| `tool_start` | First input | tool: business-valuation |
| `tool_step_complete` | Each step done | step_number |
| `tool_calculate` | View results | industry, valuation_range |
| `tool_method_expand` | Expand method details | method_name |
| `tool_download` | Download PDF | — |
| `cta_click` | Click CTA | cta_type (buyer/seller) |

---

## Build Checklist

- [ ] Create page route and metadata
- [ ] Build multi-step form (4 steps)
- [ ] Implement industry selection with default multiples
- [ ] Build SDE calculation
- [ ] Build EBITDA calculation
- [ ] Build asset-based calculation
- [ ] Build revenue multiple calculation
- [ ] Implement multiple adjustment logic
- [ ] Build results comparison display
- [ ] Add calculation breakdown sections
- [ ] Add value factors analysis
- [ ] Implement PDF download
- [ ] Write SEO content wrapper
- [ ] Add FAQ section
- [ ] Analytics events
- [ ] Mobile responsive
- [ ] Add to tools hub

**Estimated Build Time:** 20-30 hours (complex multi-method tool)
