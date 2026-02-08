# Loan Type Finder Quiz — Tool Specification

## Overview

A 5-7 question interactive quiz that guides business owners to their best-fit loan product based on their needs, timeline, financial profile, and business stage. Each result maps to a specific QuickLenders loan product with a personalized explanation and direct application CTA. Results are shareable and indexable.

**Route:** `/tools/loan-finder-quiz/`
**Result Routes:** `/tools/loan-finder-quiz/results/[result-slug]/`

---

## Strategic Purpose

### SEO Value
- Targets high-intent queries: "what business loan should I get," "best loan for my business," "which business loan do I qualify for"
- Each result page is independently indexable — targeting "[loan type] for [use case]" queries
- Quizzes earn backlinks naturally (finance blogs, business resource lists, small business forums)
- High engagement signals (time on page, interaction depth) boost overall domain authority

### Conversion Value
- **Highest conversion potential** of all tools — the quiz output IS a loan recommendation
- Every result page has a contextual, personalized CTA: "Based on your answers, a [loan type] is your best fit. Apply now →"
- Captures user intent data (what they need money for, how urgently, their business profile) — even without email capture, this tells you who's visiting
- Optional: "Email me my results" captures leads with full context on what they need

### Engagement Value
- Quizzes are inherently shareable — "I got Equipment Financing! What did you get?" drives social traffic
- Average quiz completion rates are 70-85% (far higher than form fills)
- Creates a memorable, branded interaction that differentiates QuickLenders from competitors with static content

---

## Quiz Flow Design

### Question Sequence

The quiz follows a logical decision tree. Each question narrows the recommendation. The order is intentional — start with the most engaging question (what do you need), end with the most qualifying (credit range).

```
Q1: Purpose (What) 
    ↓
Q2: Urgency (When)
    ↓
Q3: Amount (How Much)
    ↓
Q4: Business Stage (How Established)
    ↓
Q5: Credit Profile (Qualification)
    ↓
[Optional] Q6: Collateral Availability
    ↓
[Optional] Q7: Preference (Flexibility vs. Low Cost)
    ↓
RESULT
```

---

## Question Definitions

### Question 1: Purpose
**"What do you need funding for?"**

| Option | Label | Icon | Maps to |
|--------|-------|------|---------|
| A | Equipment or machinery | 🏗️ | Equipment Financing |
| B | Working capital / cash flow | 💰 | Line of Credit, Term Loan |
| C | Expansion or renovation | 📈 | Term Loan, Asset-Based |
| D | Inventory or supplies | 📦 | Line of Credit, Asset-Based |
| E | Hiring or payroll | 👥 | Line of Credit, Term Loan |
| F | Real estate or property | 🏢 | Asset-Based, Bonds |
| G | Acquisition or merger | 🤝 | Investment Banking, ESOP |
| H | Refinancing existing debt | 🔄 | Term Loan, Line of Credit |
| I | I'm not sure yet | ❓ | General recommendation |

**UX:** Large clickable cards with icons. Single select. Animate transition on click.

---

### Question 2: Urgency
**"How quickly do you need the funds?"**

| Option | Label | Weight |
|--------|-------|--------|
| A | Immediately (within days) | Favors: MCA, Line of Credit |
| B | Within 1-2 weeks | Favors: Term Loan, Equipment |
| C | Within 1-3 months | Favors: SBA, Asset-Based, Bonds |
| D | No rush — planning ahead | Favors: ESOP, Investment Banking, Bonds |

**UX:** Horizontal button group or slider-style selection.

---

### Question 3: Amount
**"How much funding do you need?"**

| Option | Range | Weight |
|--------|-------|--------|
| A | Under $50,000 | Favors: Line of Credit, Term Loan |
| B | $50,000 – $250,000 | Favors: Term Loan, Equipment, Line of Credit |
| C | $250,000 – $1,000,000 | Favors: Asset-Based, Equipment, Term Loan |
| D | $1,000,000 – $10,000,000 | Favors: Asset-Based, ESOP, Bonds |
| E | $10,000,000+ | Favors: Investment Banking, Bonds |

**UX:** Clickable range cards. Could also be a slider with defined stops.

---

### Question 4: Business Stage
**"How long has your business been operating?"**

| Option | Label | Weight |
|--------|-------|--------|
| A | Pre-revenue / startup | Limits options significantly |
| B | Less than 1 year | Favors: Line of Credit (limited) |
| C | 1-3 years | Opens: Term Loan, Equipment, Line of Credit |
| D | 3-10 years | Opens: All options |
| E | 10+ years | Opens: All options, favors: ESOP, Investment Banking |

**UX:** Simple button selection with business lifecycle icons.

---

### Question 5: Credit Profile
**"What's your approximate business or personal credit score?"**

| Option | Range | Weight |
|--------|-------|--------|
| A | Excellent (720+) | Opens all options, best rates |
| B | Good (680-719) | Most options available |
| C | Fair (620-679) | Some limitations |
| D | Building (below 620) | Favors: Asset-Based, MCA |
| E | I'm not sure | Default to moderate |

**UX:** Reassurance text below: "We don't pull your credit. This helps us recommend the right product." Important for trust — many users abandon at credit questions.

---

### Question 6 (Optional): Collateral
**"Do you have assets you could use as collateral?"**
*Only shown if Q3 answer is $250k+ OR Q1 answer is expansion/real estate/acquisition*

| Option | Label | Weight |
|--------|-------|--------|
| A | Yes — real estate | Strong: Asset-Based, Bonds |
| B | Yes — equipment or vehicles | Strong: Equipment Financing |
| C | Yes — accounts receivable / inventory | Strong: Asset-Based |
| D | No / Prefer unsecured | Favors: Term Loan, Line of Credit |

---

### Question 7 (Optional): Preference
**"What matters most to you?"**
*Tiebreaker question — shown when scoring is close between 2+ products*

| Option | Label | Weight |
|--------|-------|--------|
| A | Lowest total cost | Favors: SBA, Term Loan, Equipment |
| B | Speed of funding | Favors: Line of Credit, MCA |
| C | Flexible repayment | Favors: Line of Credit |
| D | Largest possible amount | Favors: Asset-Based, Investment Banking |

---

## Scoring Algorithm

### Approach: Weighted Point System

Each loan product has a base score. Each answer adds or subtracts points from each product's score. The product with the highest score after all questions is the primary recommendation. The second-highest is the alternative.

```typescript
interface QuizScoring {
  products: {
    [productSlug: string]: {
      name: string;
      baseScore: number;
      path: string;        // Link to /business-loans/ page
      applyUrl: string;    // NBC application URL with UTM
    }
  };
  questions: {
    [questionId: string]: {
      options: {
        [optionId: string]: {
          scoreModifiers: {
            [productSlug: string]: number; // positive = boost, negative = penalize
          }
        }
      }
    }
  };
}
```

### Score Modifier Matrix (Simplified)

Each cell is the point modifier applied when that option is selected.

| | Term Loan | Line of Credit | Equipment | Asset-Based | ESOP | Investment Banking | Bonds |
|---|---|---|---|---|---|---|---|
| **Q1: Equipment** | +1 | 0 | +5 | +1 | 0 | 0 | 0 |
| **Q1: Working Capital** | +3 | +5 | 0 | +1 | 0 | 0 | 0 |
| **Q1: Expansion** | +4 | +2 | +1 | +3 | 0 | +1 | +1 |
| **Q1: Inventory** | +1 | +4 | 0 | +3 | 0 | 0 | 0 |
| **Q1: Hiring** | +2 | +4 | 0 | 0 | +1 | 0 | 0 |
| **Q1: Real Estate** | +1 | 0 | 0 | +5 | 0 | +1 | +3 |
| **Q1: Acquisition** | +1 | 0 | 0 | +2 | +4 | +5 | +1 |
| **Q1: Refinancing** | +4 | +3 | 0 | +1 | 0 | 0 | 0 |
| **Q2: Immediately** | +2 | +4 | 0 | -1 | -3 | -3 | -3 |
| **Q2: 1-2 weeks** | +3 | +3 | +3 | +1 | -2 | -2 | -2 |
| **Q2: 1-3 months** | +2 | +1 | +2 | +3 | +2 | +1 | +2 |
| **Q2: No rush** | +1 | +1 | +1 | +2 | +4 | +4 | +4 |
| **Q3: Under $50k** | +3 | +4 | +2 | -2 | -3 | -5 | -3 |
| **Q3: $50k-$250k** | +4 | +3 | +4 | +1 | -2 | -4 | -2 |
| **Q3: $250k-$1M** | +3 | +2 | +3 | +4 | +1 | -2 | +1 |
| **Q3: $1M-$10M** | +1 | +1 | +2 | +4 | +4 | +1 | +3 |
| **Q3: $10M+** | -1 | -1 | 0 | +2 | +3 | +5 | +4 |
| **Q4: Startup** | -2 | -1 | -2 | -3 | -5 | -5 | -5 |
| **Q4: < 1 year** | +1 | +2 | +1 | -1 | -4 | -4 | -3 |
| **Q4: 1-3 years** | +3 | +3 | +3 | +2 | -1 | -2 | +1 |
| **Q4: 3-10 years** | +3 | +3 | +3 | +3 | +3 | +2 | +3 |
| **Q4: 10+ years** | +2 | +2 | +2 | +3 | +5 | +4 | +3 |
| **Q5: Excellent** | +3 | +3 | +3 | +2 | +2 | +2 | +2 |
| **Q5: Good** | +2 | +2 | +2 | +2 | +1 | +1 | +1 |
| **Q5: Fair** | +1 | +1 | +1 | +2 | 0 | -1 | 0 |
| **Q5: Building** | -1 | 0 | -1 | +2 | -2 | -3 | -2 |

*Note: These are starting values. Tune based on actual conversion data over time.*

### Disqualification Rules
Some combinations should override scoring:
- Startup + $10M+ → Show "Investment Banking requires established businesses. Here's what we recommend instead..."
- Building credit + ESOP → ESOP never shown as primary
- Immediately + Bonds → Bonds never shown as primary

### Tie-Breaking
If top 2 products are within 3 points:
- Show Q7 (preference question) as tiebreaker
- If still tied, favor the product with the simpler application process (better conversion)

---

## Result Pages

### Result Slug Convention
Results are keyed by the primary recommendation + a qualifier based on the user's purpose:

```
/tools/loan-finder-quiz/results/term-loan-expansion
/tools/loan-finder-quiz/results/equipment-financing-purchase
/tools/loan-finder-quiz/results/line-of-credit-working-capital
/tools/loan-finder-quiz/results/asset-based-real-estate
/tools/loan-finder-quiz/results/esop-succession
/tools/loan-finder-quiz/results/investment-banking-acquisition
/tools/loan-finder-quiz/results/bonds-infrastructure
```

This creates indexable pages targeting "[loan type] for [purpose]" queries.

### Result Page Structure

```
┌─────────────────────────────────────────────┐
│  Breadcrumb: Home > Tools > Loan Finder     │
│  Quiz > Your Result                         │
├─────────────────────────────────────────────┤
│  H1: Your Best Fit: [Loan Type]             │
│  Subtitle: "Based on your answers, here's   │
│  our recommendation for your business."     │
├─────────────────────────────────────────────┤
│  RESULT SUMMARY CARD (highlighted)          │
│  ┌──────────────────────────────────┐       │
│  │ 🏆 Primary Recommendation        │       │
│  │ [Loan Type Name]                 │       │
│  │                                  │       │
│  │ Amount Range: $X - $Y            │       │
│  │ Typical Terms: X-Y years         │       │
│  │ Interest Range: X-Y%             │       │
│  │ Funding Speed: X days/weeks      │       │
│  │                                  │       │
│  │ [Start Your Application →]       │       │
│  └──────────────────────────────────┘       │
├─────────────────────────────────────────────┤
│  WHY THIS IS YOUR BEST FIT (200-300 words)  │
│  Personalized explanation based on the      │
│  user's specific quiz answers               │
│  "Since you're looking for [purpose] and    │
│   need funds [urgency], a [loan type]       │
│   offers you..."                            │
├─────────────────────────────────────────────┤
│  ALTERNATIVE OPTION                         │
│  ┌──────────────────────────────────┐       │
│  │ 🥈 Also Consider: [Alt Loan]     │       │
│  │ [Brief explanation of why this   │       │
│  │  is also a good fit]             │       │
│  │ [Learn More →]                   │       │
│  └──────────────────────────────────┘       │
├─────────────────────────────────────────────┤
│  YOUR ANSWERS SUMMARY                       │
│  Collapsible section showing what they      │
│  selected for each question                 │
│  [Retake Quiz] button                       │
├─────────────────────────────────────────────┤
│  NEXT STEPS                                 │
│  1. Review our [loan type] details          │
│  2. Prepare your documents (link to         │
│     glossary term: "underwriting")          │
│  3. Start your 5-minute application         │
├─────────────────────────────────────────────┤
│  SHARE YOUR RESULT                          │
│  [Copy Link] [Twitter] [LinkedIn]           │
│  [Email me my results: ___@___ ]            │
├─────────────────────────────────────────────┤
│  FAQ (3-4 questions about the recommended   │
│  loan type — with JSON-LD schema)           │
├─────────────────────────────────────────────┤
│  RELATED TOOLS                              │
│  "Now that you know which loan fits,        │
│   use these tools to plan further:"         │
│  - Break-Even Analyzer                      │
│  - Equipment vs. Leasing Calculator         │
│  - Growth Trajectory Calculator             │
├─────────────────────────────────────────────┤
│  CTA BLOCK                                  │
│  "Ready to move forward?"                   │
│  [Apply Now] [Speak to an Advisor]          │
└─────────────────────────────────────────────┘
```

---

## Quiz UX Specifications

### Visual Design
- **Progress bar** at top showing completion (e.g., "Question 3 of 5")
- **One question per screen** — full-width, centered, minimal distractions
- **Large touch targets** — option cards should be at minimum 60px tall, full-width on mobile
- **Smooth transitions** — slide or fade between questions (200-300ms)
- **Back button** — always available to revise previous answers
- **No submit button per question** — selecting an option auto-advances after a brief delay (400ms) with visual confirmation

### Animations
- Selected option: brief scale pulse (1.02x) + checkmark animation + color change
- Transition: current question slides out left, next slides in from right
- Progress bar: smooth width animation
- Result reveal: slight delay (500ms) then fade-in with the result card

### Mobile Considerations
- Stack option cards vertically on mobile (horizontal grid on desktop for 2-4 options)
- Sticky progress bar at top
- Touch-friendly — no hover states as primary interaction
- Result page must be fully scrollable with clear section breaks

### Accessibility
- All options keyboard-navigable (arrow keys + Enter)
- ARIA labels on all interactive elements
- Screen reader announces question number and total
- Focus management between questions
- Color not the sole indicator of selection (use checkmarks + borders)

---

## SEO Strategy

### Quiz Page (`/tools/loan-finder-quiz/`)
**Title:** "Which Business Loan Is Right for You? Free Quiz | Quick Lenders"
**Meta:** "Answer 5 quick questions to find your ideal business loan. Get a personalized recommendation with rates, terms, and next steps. No credit pull required."
**Target Keywords:**
- what business loan should I get
- business loan quiz
- which loan is right for my business
- best business loan for me
- business loan finder

### Result Pages (`/tools/loan-finder-quiz/results/[slug]`)
**Title Pattern:** "[Loan Type] for [Purpose] — Is It Right for You? | Quick Lenders"
**Meta Pattern:** "Find out why a [loan type] may be the best fit for your [purpose] needs. See rates, terms, requirements, and apply in 5 minutes."
**Target Keywords (per result):**
- `equipment financing for [equipment/machinery/vehicles]`
- `term loan for business expansion`
- `line of credit for working capital`
- `best loan for [purpose]`

### Structured Data
- Quiz page: WebApplication schema (see master strategy)
- Result pages: FAQ schema + BreadcrumbList
- All pages: Organization schema for QuickLenders

---

## Email Capture Strategy

### On Result Page (Optional, Non-Gating)
The quiz result is shown immediately — no email required. Below the result, offer:

**"Email yourself these results"**
- Input: email address only (single field)
- Sends: formatted email with their quiz answers, recommendation, key details, and direct link to apply
- Follow-up sequence (if permission granted):
  - Day 1: Quiz results + "Ready to apply?" CTA
  - Day 3: Educational content about recommended loan type
  - Day 7: "Still exploring? Here's what businesses like yours chose" (social proof)
  - Day 14: Final touch — "Your funding advisor is ready when you are"

### Data Captured (Without Email)
Even without email capture, the quiz records (in analytics):
- All answers selected
- Result shown
- Whether user clicked Apply, Learn More, or bounced
- Device, referral source, time of day

This data informs which loan products are most in-demand and where users drop off.

---

## Technical Implementation

### State Management
```typescript
interface QuizState {
  currentQuestion: number;
  answers: Record<string, string>;    // { q1: 'equipment', q2: 'immediately', ... }
  scores: Record<string, number>;     // Running score per product
  result: QuizResult | null;
  showOptionalQuestions: boolean[];    // Which optional Qs to show based on answers
}

interface QuizResult {
  primary: {
    product: LoanProduct;
    score: number;
    slug: string;                     // For result URL
    explanation: string;              // Personalized text
  };
  alternative: {
    product: LoanProduct;
    score: number;
    explanation: string;
  };
}
```

### Routing
- Quiz lives at `/tools/loan-finder-quiz/` — all questions render in the same page (client-side navigation, no page reloads)
- On completion, `router.push('/tools/loan-finder-quiz/results/[slug]')` with answer data in URL params or sessionStorage
- Result pages are also statically generated for SEO (with generic content), then hydrated with personalized content if quiz data is available

### Result Page Dual Mode
1. **From Quiz** (has answer data): Shows personalized "Based on your answers..." content with specific details
2. **Direct Landing** (no answer data / organic search): Shows generic "[Loan Type] for [Purpose]" content with CTA to take the quiz for a personalized recommendation

This ensures result pages work both as quiz outputs AND as standalone SEO landing pages.

---

## Content Requirements

### Per Result Variation
For each primary recommendation + purpose combination, write:
- 200-300 word personalized explanation
- 3-4 FAQ items specific to that combination
- "Next steps" tailored to the loan type's application process
- Alternative recommendation brief (2-3 sentences)

### Estimated Content Variations
- 7 loan products × ~8 purpose combinations = ~56 result variations
- Many can share content blocks — e.g., all "Term Loan" results share the same base info, just with different "why" explanations
- Start with the top 15-20 most common combinations, expand over time

---

## Success Metrics

| Metric | Target (3 months) | Target (6 months) |
|--------|-------------------|---------------------|
| Quiz starts | 500/mo | 2,000/mo |
| Quiz completions | 375/mo (75%) | 1,500/mo (75%) |
| Result page → Apply click | 15% | 20% |
| Email captures | 50/mo (10%) | 300/mo (15%) |
| Organic traffic to result pages | 200/mo | 1,500/mo |
| Social shares | 20/mo | 100/mo |
| Application starts attributed | 30/mo | 150/mo |
