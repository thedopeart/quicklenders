# Tool Spec: SBA Eligibility Checker

**Tool Number:** 09
**Route:** `/tools/sba-eligibility-checker`
**Priority:** Medium
**Primary Keyword:** "SBA loan eligibility" (est. 3k+ monthly searches)
**Secondary Keywords:** "do I qualify for SBA loan," "SBA loan requirements," "SBA eligibility calculator," "SBA loan qualifications"

---

## Purpose

Guided questionnaire (8-10 questions) that helps users understand if they meet SBA loan requirements. Not a guarantee of approval, but a quick way to identify dealbreakers and set expectations.

**Target users:**
- Business owners interested in SBA loans (best rates/terms)
- Users who don't know if they qualify
- Users who want to understand SBA requirements before applying
- Those who've heard "SBA" but don't know what it takes

**Why it matters:**
- High search volume for SBA eligibility queries
- Pre-qualifies leads (SBA-eligible = higher value)
- Educational value builds trust
- Helps users avoid wasted time on loans they won't get

---

## Question Flow

### Question 1: Business Location

```
Is your business located and operating in the United States?

○ Yes
○ No → DISQUALIFIED
```

**If No:** "SBA loans are only available to businesses operating in the U.S. or its territories. [Explore other financing options](/business-loans)"

### Question 2: Business Type

```
What type of business do you have?

○ For-profit business (LLC, Corporation, Sole Proprietorship, Partnership)
○ Non-profit organization → DISQUALIFIED
○ Government entity → DISQUALIFIED
○ Not sure
```

**If Non-profit/Government:** "SBA loans are designed for for-profit businesses. Non-profits may qualify for grants or other programs. [Learn about alternatives](/financial-insights/non-profit-financing)"

### Question 3: Prohibited Industries

```
Is your business in any of these industries?

□ Gambling or gaming
□ Lending or loan packaging
□ Multi-level marketing
□ Speculation or investment
□ Religious organization (for religious activities)
□ Political lobbying
□ Cannabis/marijuana (even if state-legal)
□ Adult entertainment
□ None of the above

[Continue]
```

**If any checked:** "Unfortunately, SBA loans aren't available for [industry]. However, other financing options may be available. [See your options](/business-loans)"

### Question 4: Time in Business

```
How long has your business been operating?

○ Less than 6 months
○ 6 months to 1 year
○ 1 to 2 years
○ 2+ years ✓ Meets requirement
```

**Scoring:**
- < 6 months: -30 points, warning flag
- 6-12 months: -15 points, caution
- 1-2 years: 0 points, acceptable
- 2+ years: +15 points, preferred

### Question 5: Annual Revenue

```
What's your approximate annual revenue?

○ Under $50,000
○ $50,000 - $100,000
○ $100,000 - $250,000
○ $250,000 - $500,000
○ $500,000 - $1,000,000
○ Over $1,000,000
```

**Scoring:**
- < $50k: -20 points, limited options
- $50-100k: -10 points
- $100-250k: 0 points
- $250-500k: +10 points
- $500k-1M: +15 points
- $1M+: +20 points

### Question 6: Personal Credit Score

```
What's your personal credit score? (Estimate is fine)

○ Below 600
○ 600 - 649
○ 650 - 679
○ 680 - 719 ✓ Meets typical SBA minimum
○ 720 - 749
○ 750+
○ I don't know
```

**Scoring:**
- < 600: -30 points, likely disqualified
- 600-649: -20 points, very difficult
- 650-679: -10 points, challenging
- 680-719: +10 points, meets minimum
- 720-749: +15 points, good position
- 750+: +20 points, excellent
- Unknown: 0 points, note in results

### Question 7: Collateral

```
Do you have assets that could be used as collateral?

○ Yes, significant assets (real estate, equipment, inventory)
○ Yes, some assets
○ Limited or no collateral
○ Not sure
```

**Scoring:**
- Significant: +15 points
- Some: +5 points
- Limited/none: -5 points
- Not sure: 0 points

**Note:** SBA loans don't always require collateral, but it helps.

### Question 8: Existing Debt

```
Do you have any existing business loans or significant debt?

○ No existing business debt
○ Some debt, payments current
○ Significant debt, payments current
○ Behind on payments → RED FLAG
```

**Scoring:**
- No debt: +10 points
- Some, current: 0 points
- Significant, current: -10 points
- Behind: -30 points, major red flag

### Question 9: Loan Purpose

```
What will you use the loan for? (Select all that apply)

□ Working capital / operations
□ Equipment purchase
□ Real estate purchase
□ Business acquisition
□ Refinancing existing debt
□ Inventory
□ Expansion / renovation
□ Other: _______
```

**No scoring** — informational for results personalization

### Question 10: How Much Do You Need?

```
How much funding are you looking for?

○ Under $50,000
○ $50,000 - $150,000
○ $150,000 - $350,000
○ $350,000 - $500,000
○ $500,000 - $1,000,000
○ $1,000,000 - $5,000,000
○ Over $5,000,000
```

**Used for:** SBA program matching (microloans, 7(a), 504)

---

## Results Logic

### Scoring System

Total possible points: ~100
- 70+: Likely eligible
- 50-69: Possibly eligible with caveats
- 30-49: Challenging, limited options
- < 30: Unlikely eligible for SBA

### Disqualifying Factors (Automatic No)

- Not US-based
- Non-profit or government
- Prohibited industry
- Currently behind on existing debt payments

### Result Categories

**Result A: Likely Eligible (70+ points)**
```
┌─────────────────────────────────────────────────────────────┐
│  ✓ You Likely Qualify for an SBA Loan                       │
│                                                             │
│  Based on your answers, you appear to meet the basic        │
│  eligibility requirements for SBA loans.                    │
│                                                             │
│  Your profile strengths:                                    │
│  • 2+ years in business                                     │
│  • Credit score above 680                                   │
│  • Strong annual revenue                                    │
│                                                             │
│  Recommended SBA programs:                                  │
│  • SBA 7(a) — Most flexible, up to $5M                     │
│  • SBA 504 — For real estate/equipment                      │
│                                                             │
│  [ Get Matched with SBA Lenders ]                          │
└─────────────────────────────────────────────────────────────┘
```

**Result B: Possibly Eligible (50-69 points)**
```
┌─────────────────────────────────────────────────────────────┐
│  ◐ You May Qualify for an SBA Loan                         │
│                                                             │
│  You meet some requirements, but there are factors that     │
│  could affect approval.                                     │
│                                                             │
│  In your favor:                                             │
│  • For-profit US business                                   │
│  • Eligible industry                                        │
│                                                             │
│  Areas of concern:                                          │
│  • Less than 2 years in business                           │
│  • Credit score below preferred range                       │
│                                                             │
│  Your options:                                              │
│  1. Apply for SBA — some lenders are more flexible         │
│  2. Consider SBA Microloans (easier qualification)          │
│  3. Explore online lenders while building profile           │
│                                                             │
│  [ See All Your Options ]                                  │
└─────────────────────────────────────────────────────────────┘
```

**Result C: Challenging (30-49 points)**
```
┌─────────────────────────────────────────────────────────────┐
│  △ SBA Loan May Be Difficult                               │
│                                                             │
│  Based on your answers, qualifying for an SBA loan will     │
│  be challenging. But you still have options.                │
│                                                             │
│  Factors working against SBA approval:                      │
│  • Time in business under 1 year                           │
│  • Credit score below 650                                  │
│  • Limited collateral                                       │
│                                                             │
│  Alternative options to consider:                           │
│  • Online term loans (more flexible requirements)           │
│  • Business line of credit                                  │
│  • Equipment financing (equipment as collateral)            │
│  • Revenue-based financing                                  │
│                                                             │
│  [ Explore Alternative Financing ]                         │
└─────────────────────────────────────────────────────────────┘
```

**Result D: Unlikely/Disqualified (< 30 or hard disqualifier)**
```
┌─────────────────────────────────────────────────────────────┐
│  ✗ SBA Loans Aren't Available for Your Situation           │
│                                                             │
│  [Specific reason — e.g., industry, non-profit, etc.]      │
│                                                             │
│  However, other financing options exist:                    │
│  • [Relevant alternatives based on their situation]         │
│                                                             │
│  [ See What You Qualify For ]                              │
└─────────────────────────────────────────────────────────────┘
```

---

## SBA Program Matching

Based on loan amount and purpose, recommend specific SBA programs:

| Amount | Purpose | Recommended Program |
|--------|---------|-------------------|
| < $50k | Any | SBA Microloan |
| $50k - $5M | Working capital, equipment, most purposes | SBA 7(a) |
| $125k - $5M | Real estate, major equipment | SBA 504 |
| Any | Export-related | SBA Export Loans |
| Disaster recovery | Disaster recovery | SBA Disaster Loans |

---

## UI/UX Design

### Progress Indicator

```
Question 4 of 10
[████████░░░░░░░░░░░░] 40%
```

### Question Card Layout

```
┌─────────────────────────────────────────────────────────────┐
│                                                             │
│  How long has your business been operating?                 │
│                                                             │
│  ┌─────────────────────────────────────────────────────┐   │
│  │  ○ Less than 6 months                               │   │
│  ├─────────────────────────────────────────────────────┤   │
│  │  ○ 6 months to 1 year                               │   │
│  ├─────────────────────────────────────────────────────┤   │
│  │  ○ 1 to 2 years                                     │   │
│  ├─────────────────────────────────────────────────────┤   │
│  │  ● 2+ years                              ✓ Meets    │   │
│  └─────────────────────────────────────────────────────┘   │
│                                                             │
│  [← Back]                              [Next →]            │
│                                                             │
└─────────────────────────────────────────────────────────────┘
```

### Inline Feedback

When user selects an answer, show immediate feedback:
- ✓ Green checkmark for strong answers
- ⚠️ Yellow warning for concerning answers
- Brief helper text explaining why

---

## Content Wrapper (SEO)

### Above the Tool (150 words)

```markdown
# Do You Qualify for an SBA Loan?

Answer 10 quick questions to see if you meet the basic eligibility 
requirements for SBA loans. This free checker takes about 2 minutes.

**What this tool checks:**
- Business type and location
- Industry eligibility
- Time in business
- Credit and financial factors

SBA loans offer the best rates and longest terms available, but they 
have stricter requirements than other options. Find out if you're 
likely to qualify before you apply.
```

### Below the Tool (400 words)

```markdown
## SBA Loan Eligibility Requirements

The Small Business Administration doesn't lend directly — they guarantee 
loans made by approved lenders. This reduces risk for lenders, allowing 
them to offer better terms to borrowers who might not qualify for 
traditional bank loans.

### Basic SBA Requirements

To qualify for most SBA loans, your business must:

- **Be a for-profit business** operating in the US
- **Meet SBA size standards** (varies by industry, but most small 
  businesses qualify)
- **Have invested equity** — you've put your own money into the business
- **Have exhausted other financing options** (technically required, 
  rarely enforced)
- **Not be in a prohibited industry** (gambling, lending, cannabis, etc.)

### What Lenders Look For

Beyond SBA requirements, lenders evaluate:

| Factor | Typical Minimum | Preferred |
|--------|----------------|-----------|
| Credit Score | 650 | 680+ |
| Time in Business | 2 years | 3+ years |
| Annual Revenue | $100,000 | $250,000+ |
| DSCR | 1.15 | 1.25+ |

These aren't hard rules — some lenders are more flexible than others.

### SBA Loan Programs

**SBA 7(a)** — The most common program. Up to $5 million for almost any 
business purpose. Terms up to 10 years (25 for real estate).

**SBA 504** — For purchasing fixed assets like real estate or major 
equipment. Up to $5 million with 10-20 year terms.

**SBA Microloans** — Up to $50,000 for startups and small businesses. 
Easier to qualify for than 7(a).

### If You Don't Qualify for SBA

SBA loans aren't the only option. If you don't qualify now, consider:

- **Online lenders** — Faster approval, more flexible requirements
- **Equipment financing** — The equipment serves as collateral
- **Business lines of credit** — Draw what you need, when you need it
- **Building your profile** — Improve credit, increase revenue, then reapply

[Take the Loan Finder Quiz](/tools/loan-finder-quiz) to see all your options.
```

---

## Internal Linking

**Link TO this tool from:**
- SBA loan glossary terms
- SBA-related blog articles
- Loan product pages (term loans)
- Comparison articles (SBA vs conventional)

**Link FROM this tool to:**
- `/get-started` (primary CTA for qualified users)
- `/tools/loan-finder-quiz` (alternative for unqualified)
- `/business-loans/term-loans`
- `/glossary/sba-7a-loan`
- `/glossary/sba-504-loan`
- `/glossary/sba-microloan`
- `/tools/dscr-calculator`

---

## Lead Capture

### For Likely Eligible

```
You appear to qualify for SBA loans.

Get matched with SBA-approved lenders who can 
review your full application.

[ Get Matched with SBA Lenders ]

→ /get-started?source=tool&tool=sba-eligibility&result=eligible&program=7a
```

### For Possibly Eligible

```
You may qualify for SBA loans, though some factors 
could affect approval.

See all your options — including SBA and alternatives.

[ See Your Options ]

→ /get-started?source=tool&tool=sba-eligibility&result=possible
```

### For Unlikely/Disqualified

```
SBA loans may not be available for your situation, 
but other financing options exist.

[ Explore Alternative Financing ]

→ /get-started?source=tool&tool=sba-eligibility&result=alternative
```

### Email Results

```
📧 Save your eligibility results

We'll send you a detailed breakdown of your SBA 
eligibility and recommended next steps.

[email] [Send Results]
```

---

## Analytics Events

| Event | Trigger | Parameters |
|-------|---------|------------|
| `tool_start` | First question answered | tool: sba-eligibility |
| `tool_question_complete` | Each question | question_number, answer |
| `tool_disqualified` | Hit disqualifying answer | disqualify_reason |
| `tool_complete` | Reach results | score, result_category |
| `tool_email_results` | Submit email | result_category |
| `cta_click` | Click CTA | result_category, recommended_program |

---

## Build Checklist

- [ ] Create page route and metadata
- [ ] Build question flow component
- [ ] Implement progress indicator
- [ ] Add inline feedback on answers
- [ ] Build scoring logic
- [ ] Create result category components
- [ ] Add SBA program matching logic
- [ ] Build disqualification handling
- [ ] Implement dynamic CTAs by result
- [ ] Add email capture
- [ ] Write SEO content wrapper
- [ ] Add FAQ section
- [ ] Analytics events
- [ ] Mobile responsiveness
- [ ] Add to tools hub
