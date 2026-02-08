# QuickLenders Free Tools Ecosystem — Master Strategy

## Overview

This document defines the architecture, SEO strategy, and content framework for QuickLenders' suite of 21 free tools and content assets. Each serves a dual purpose: **capture high-intent organic traffic** through interactive utility and **warm leads toward loan applications** through strategic CTAs.

---

## Complete Tool Inventory

| # | Tool | Spec File | Route | Status |
|---|------|-----------|-------|--------|
| 01 | Business Financing Glossary | `01-GLOSSARY-ENCYCLOPEDIA-SPEC.md` | `/tools/glossary` | Planned |
| 02 | Loan Finder Quiz | `02-LOAN-FINDER-QUIZ-SPEC.md` | `/tools/loan-finder-quiz` | Planned |
| 03 | Break-Even Loan Analyzer | `03-BREAK-EVEN-ANALYZER-SPEC.md` | `/tools/break-even-analyzer` | Planned |
| 04 | Equipment vs. Leasing Calculator | `04-EQUIPMENT-VS-LEASING-SPEC.md` | `/tools/equipment-financing-vs-leasing` | Planned |
| 05 | Loan Payment Calculator | `05-LOAN-PAYMENT-CALCULATOR-SPEC.md` | `/tools/loan-payment-calculator` | Planned |
| 06 | DSCR Calculator | `06-DSCR-CALCULATOR-SPEC.md` | `/tools/dscr-calculator` | Planned |
| 07 | Affordability Calculator | `07-AFFORDABILITY-CALCULATOR-SPEC.md` | `/tools/affordability-calculator` | Planned |
| 08 | Loan Comparison Tool | `08-LOAN-COMPARISON-SPEC.md` | `/tools/loan-comparison` | Planned |
| 09 | SBA Eligibility Checker | `09-SBA-ELIGIBILITY-CHECKER-SPEC.md` | `/tools/sba-eligibility-checker` | Planned |
| 10 | Working Capital Calculator | `10-WORKING-CAPITAL-CALCULATOR-SPEC.md` | `/tools/working-capital-calculator` | Planned |
| 11 | Factor Rate to APR Converter | `11-FACTOR-RATE-TO-APR-SPEC.md` | `/tools/factor-rate-to-apr-calculator` | Planned |
| 12 | Invoice Factoring Calculator | `12-INVOICE-FACTORING-CALCULATOR-SPEC.md` | `/tools/invoice-factoring-calculator` | Planned |
| 13 | Startup Cost Calculator | `13-STARTUP-COST-CALCULATOR-SPEC.md` | `/tools/startup-cost-calculator` | Planned |
| 14 | Business Valuation Calculator | `14-BUSINESS-VALUATION-CALCULATOR-SPEC.md` | `/tools/business-valuation-calculator` | Planned |
| 15 | Prepayment Penalty Calculator | `15-PREPAYMENT-PENALTY-CALCULATOR-SPEC.md` | `/tools/prepayment-penalty-calculator` | Planned |
| 16 | Lender Red Flag Detector | `16-LENDER-RED-FLAG-DETECTOR-SPEC.md` | `/tools/loan-offer-analyzer` | Planned |
| 17 | Loan Rejection Decoder | `17-LOAN-REJECTION-DECODER-SPEC.md` | `/tools/loan-rejection-decoder` | Planned |
| 18 | Small Business Rate Index | `18-SMALL-BUSINESS-RATE-INDEX-SPEC.md` | `/rate-index` | Planned |
| 19 | Franchise Financing Database | `19-FRANCHISE-FINANCING-DATABASE-SPEC.md` | `/franchise-financing` | Planned |
| 20 | State Lending Reports | `20-STATE-LENDING-REPORTS-SPEC.md` | `/business-loans/[state]` | Planned |
| — | Growth Projection Calculator | — | `/tools/growth-trajectory-calculator` | **Built** |
| — | Loan Buddy (Chatbot) | — | `/tools/loan-buddy` | **Built** |

---

## Site Architecture

```
quicklenders.com/
├── tools/                                    ← Tools hub/index page
│   │
│   ├── glossary/                             ← Glossary index (A-Z, 120+ terms)
│   │   └── [term-slug]/                      ← Individual term pages
│   │
│   ├── loan-finder-quiz/                     ← Loan Type Finder Quiz
│   │   └── results/[result-slug]/            ← Shareable result pages
│   │
│   ├── break-even-analyzer/                  ← Break-Even Loan Analyzer
│   ├── equipment-financing-vs-leasing/       ← Equipment Financing vs. Leasing
│   ├── loan-payment-calculator/              ← Loan Payment Calculator
│   ├── dscr-calculator/                      ← DSCR Calculator
│   ├── affordability-calculator/             ← Affordability Calculator
│   ├── loan-comparison/                      ← Loan Comparison Tool
│   ├── sba-eligibility-checker/              ← SBA Eligibility Checker
│   ├── working-capital-calculator/           ← Working Capital Calculator
│   ├── factor-rate-to-apr-calculator/        ← Factor Rate to APR Converter
│   ├── invoice-factoring-calculator/         ← Invoice Factoring Calculator
│   ├── startup-cost-calculator/              ← Startup Cost Calculator
│   ├── business-valuation-calculator/        ← Business Valuation Calculator
│   ├── prepayment-penalty-calculator/        ← Prepayment Penalty Calculator
│   ├── loan-offer-analyzer/                  ← Lender Red Flag Detector
│   ├── loan-rejection-decoder/               ← Loan Rejection Decoder
│   ├── growth-trajectory-calculator/         ← Growth Projection (existing)
│   └── loan-buddy/                           ← Chatbot (existing)
│
├── rate-index/                               ← Small Business Rate Index
│   ├── sba-loans/
│   ├── bank-loans/
│   ├── online-lenders/
│   └── [archived months]/
│
├── franchise-financing/                      ← Franchise Financing Database
│   ├── directory/
│   ├── [franchise-slug]/                     ← Individual franchise pages (500+)
│   ├── sba-approved/
│   ├── under-100k/
│   └── by-industry/
│
├── business-loans/                           ← Loan product pages + State pages
│   ├── term-loans/
│   ├── lines-of-credit/
│   ├── equipment-financing/
│   ├── asset-backed-loans/
│   ├── bonds/
│   ├── esop/
│   ├── investment-banking/
│   └── [state-slug]/                         ← State lending pages (50)
│
└── financial-insights/                       ← Blog/content hub
```

### URL Convention
- All tool URLs use kebab-case
- No trailing slashes (handle via Next.js config)
- Canonical URLs set on every page
- Each tool gets its own `og:image` for social sharing

---

## Tool Categories

### Planning & Discovery Tools
Help users understand their options and make decisions.

| Tool | Primary Use Case |
|------|-----------------|
| Loan Finder Quiz | "What type of loan do I need?" |
| SBA Eligibility Checker | "Do I qualify for SBA loans?" |
| Equipment vs. Leasing | "Should I buy or lease?" |
| Loan Comparison | "Which offer is better?" |

### Calculators
Number-crunching tools for specific financial questions.

| Tool | Primary Use Case |
|------|-----------------|
| Loan Payment Calculator | "What will my payment be?" |
| DSCR Calculator | "Can I afford this loan?" |
| Affordability Calculator | "How much can I borrow?" |
| Break-Even Analyzer | "When will this investment pay off?" |
| Working Capital Calculator | "How much working capital do I need?" |
| Growth Projection Calculator | "What's my revenue trajectory?" |

### Educational Resources
Reference content that builds authority.

| Tool | Primary Use Case |
|------|-----------------|
| Business Financing Glossary | "What does [term] mean?" |
| Loan Buddy Chatbot | "I have questions about financing" |

---

## Content Wrapper Template

Every tool page follows this structure. The tool itself is the centerpiece, but the surrounding content is what gets indexed and ranked.

### Page Structure (Top to Bottom)

```
┌─────────────────────────────────────────────┐
│  Breadcrumb: Home > Tools > [Tool Name]     │
├─────────────────────────────────────────────┤
│  H1: [Tool Name]                            │
│  Subtitle / value proposition (1-2 lines)   │
├─────────────────────────────────────────────┤
│  INTRO SECTION (150-200 words)              │
│  - What this tool does                      │
│  - Who it's for                             │
│  - Why it matters                           │
├─────────────────────────────────────────────┤
│  ┌─────────────────────────────────────┐    │
│  │                                     │    │
│  │     INTERACTIVE TOOL COMPONENT      │    │
│  │     (React client component)        │    │
│  │                                     │    │
│  └─────────────────────────────────────┘    │
├─────────────────────────────────────────────┤
│  PRIMARY CTA BLOCK                          │
│  "Ready to see your options? Get matched    │
│   with lenders in minutes →"                │
├─────────────────────────────────────────────┤
│  HOW TO USE THIS TOOL (200-300 words)       │
│  Step-by-step walkthrough with context      │
├─────────────────────────────────────────────┤
│  EDUCATIONAL CONTENT (300-500 words)        │
│  H2 sections explaining the underlying      │
│  concepts — this is the SEO meat            │
├─────────────────────────────────────────────┤
│  FAQ SECTION (3-5 questions)                │
│  With FAQPage schema markup (JSON-LD)       │
├─────────────────────────────────────────────┤
│  RELATED TOOLS (internal links)             │
│  Card grid linking to 2-3 other tools       │
├─────────────────────────────────────────────┤
│  SECONDARY CTA BLOCK                        │
│  "Talk to a funding advisor → "             │
│  Phone number + Book a Call button          │
├─────────────────────────────────────────────┤
│  RELATED LOAN PRODUCTS (internal links)     │
│  Cards linking to relevant /business-loans/ │
│  pages based on tool context                │
└─────────────────────────────────────────────┘
```

---

## SEO Requirements Per Tool Page

### Meta Tags
```html
<title>[Tool Name] — Free [Type] Calculator | Quick Lenders</title>
<meta name="description" content="[Action verb] with our free [tool name]. [Key benefit]. No signup required." />
<link rel="canonical" href="https://quicklenders.com/tools/[slug]" />
```

### Open Graph
```html
<meta property="og:title" content="[Tool Name] | Quick Lenders" />
<meta property="og:description" content="[Value prop — 1 sentence]" />
<meta property="og:image" content="/og/tools/[slug].png" />
<meta property="og:type" content="website" />
<meta property="og:url" content="https://quicklenders.com/tools/[slug]" />
```

### Structured Data (JSON-LD)

Every tool page must include:

**1. WebApplication Schema** — for the tool itself
```json
{
  "@context": "https://schema.org",
  "@type": "WebApplication",
  "name": "[Tool Name]",
  "url": "https://quicklenders.com/tools/[slug]",
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

**2. FAQPage Schema** — for the FAQ section
```json
{
  "@context": "https://schema.org",
  "@type": "FAQPage",
  "mainEntity": [
    {
      "@type": "Question",
      "name": "How do I calculate...?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "To calculate..."
      }
    }
  ]
}
```

**3. BreadcrumbList Schema**
```json
{
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  "itemListElement": [
    { "@type": "ListItem", "position": 1, "name": "Home", "item": "https://quicklenders.com" },
    { "@type": "ListItem", "position": 2, "name": "Tools", "item": "https://quicklenders.com/tools" },
    { "@type": "ListItem", "position": 3, "name": "[Tool Name]", "item": "https://quicklenders.com/tools/[slug]" }
  ]
}
```

---

## Internal Linking Strategy

### Tool → Loan Product Page Links

Every tool's results or educational content must link to **at least 2** relevant loan product pages.

| Tool | Primary Links | Secondary Links |
|------|--------------|-----------------|
| Glossary | Varies by term | All loan types contextually |
| Loan Finder Quiz | Result-specific loan type | All loan types on results page |
| Break-Even Analyzer | Term Loans, Equipment Financing | Lines of Credit |
| Equipment vs. Leasing | Equipment Financing | Term Loans, Asset-Based |
| Loan Payment Calculator | Term Loans | Lines of Credit, Equipment Financing |
| DSCR Calculator | Term Loans, SBA (via content) | Lines of Credit |
| Affordability Calculator | Term Loans, Lines of Credit | All loan types |
| Loan Comparison | All loan types (contextual) | — |
| SBA Eligibility Checker | Term Loans (SBA content) | Lines of Credit, Equipment |
| Working Capital Calculator | Lines of Credit | Term Loans, Asset-Based |
| Growth Projection | Term Loans | Lines of Credit |

### Tool → Tool Links (Related Tools Section)

Each tool links to 2-3 related tools. This creates a mesh of internal links that keeps users engaged.

| Tool | Related Tools |
|------|---------------|
| Loan Payment Calculator | Affordability Calculator, Loan Comparison, DSCR Calculator |
| DSCR Calculator | Loan Payment Calculator, Affordability Calculator, Working Capital |
| Affordability Calculator | Loan Payment Calculator, DSCR Calculator, Loan Finder Quiz |
| Loan Comparison | Loan Payment Calculator, Affordability Calculator |
| Loan Finder Quiz | DSCR Calculator, SBA Eligibility, Break-Even Analyzer |
| SBA Eligibility Checker | Loan Finder Quiz, DSCR Calculator, Loan Payment Calculator |
| Break-Even Analyzer | Equipment vs. Leasing, Loan Payment Calculator, Growth Projection |
| Equipment vs. Leasing | Break-Even Analyzer, Loan Payment Calculator, Loan Comparison |
| Working Capital Calculator | DSCR Calculator, Affordability Calculator, Lines of Credit page |
| Glossary | Contextual to each term |

### Loan Product Pages → Tools

Each `/business-loans/` page should include:
- Sidebar widget: "Calculate your payment" → Payment Calculator
- Section: "Not sure if this is right for you?" → Loan Finder Quiz
- Contextual links within content to relevant calculators

### Blog → Tools

Every Financial Insights article should link to at least one relevant tool. Map by topic:

| Article Topic | Link To |
|--------------|---------|
| Loan costs, APR, interest | Loan Payment Calculator, DSCR Calculator |
| Loan comparison, evaluation | Loan Comparison, Loan Finder Quiz |
| SBA, government loans | SBA Eligibility Checker |
| Equipment, leasing | Equipment vs. Leasing, Break-Even Analyzer |
| Cash flow, working capital | Working Capital Calculator, DSCR Calculator |
| Qualifying, requirements | Loan Finder Quiz, SBA Eligibility Checker |
| Any term definition | Glossary term link |

---

## CTA Strategy

### Primary CTA (Post-Tool Results)

Appears immediately after tool output. Should feel like a natural next step.

```
┌─────────────────────────────────────────────────────────────┐
│  Ready to see your actual options?                          │
│                                                             │
│  [ Get Matched with Lenders ]                              │
│                                                             │
│  Takes 2 minutes. No impact on your credit.                 │
└─────────────────────────────────────────────────────────────┘
```

- Links to: `/get-started?source=tool&tool=[slug]`
- Pass relevant parameters (calculated amount, loan type recommendation, etc.)
- Style: Full-width banner, brand primary color, prominent button

### Dynamic CTAs (Based on Tool Output)

CTAs should change based on what the tool reveals:

| Tool | Output Condition | CTA Variation |
|------|-----------------|---------------|
| DSCR Calculator | DSCR ≥ 1.25 | "Your DSCR qualifies you for most loans. See your options." |
| DSCR Calculator | DSCR < 1.0 | "Explore alternative financing options." |
| SBA Eligibility | Likely eligible | "Get matched with SBA lenders." |
| SBA Eligibility | Unlikely | "See alternative financing options." |
| Affordability | Shows max amount | "See if you qualify for up to $[amount]." |
| Loan Finder Quiz | Recommends type | "Explore [loan type] options." |
| Working Capital | Ratio < 1.0 | "Your working capital needs attention. See your options." |
| Working Capital | Ratio > 1.5 | "Looking to grow? A line of credit can add flexibility." |

### Secondary CTA (Bottom of Page)

Softer sell for users who aren't ready to apply.

```
┌─────────────────────────────────────────────────────────────┐
│  Have questions? Talk to an advisor.                        │
│                                                             │
│  📞 (303) 921-8529                                         │
│  Mon-Fri 9AM-5PM MST                                        │
│                                                             │
│  [ Book a Call ]                                           │
└─────────────────────────────────────────────────────────────┘
```

### Email Capture (Optional, Non-Gating)

Offer to email results after tool completion. Does NOT gate the tool.

```
┌─────────────────────────────────────────────────────────────┐
│  📧 Email yourself these results                            │
│                                                             │
│  [email@example.com                    ] [Send]             │
│                                                             │
│  We'll include your calculations and next steps.            │
└─────────────────────────────────────────────────────────────┘
```

---

## Tools Hub Page (`/tools/`)

The index page at `/tools/` serves as the directory for all free tools.

### Target Keywords
- free business loan calculator
- business financing tools
- loan comparison calculator
- business loan eligibility checker
- small business financing calculators

### Page Structure

```markdown
# Free Business Financing Tools & Calculators

[100-word intro: what tools we offer, why they're useful, no signup required]

## Find Your Fit

[Grid of 4 tool cards: Quiz, SBA Eligibility, Equipment vs Leasing, Loan Comparison]

## Calculators

[Grid of 6 tool cards: Payment, DSCR, Affordability, Break-Even, Working Capital, Growth Projection]

## Educational Resources

[Grid of 2 cards: Glossary, Chatbot]

## Ready to Get Started?

[CTA block to /get-started]
```

### Tool Card Component

```
┌─────────────────────────────────────┐
│  [Icon]                             │
│                                     │
│  Loan Payment Calculator            │
│                                     │
│  Estimate monthly payments and      │
│  total loan cost.                   │
│                                     │
│  [Try It Free →]                   │
└─────────────────────────────────────┘
```

---

## Build Priority & Sequence

### Phase 1: Foundation (Weeks 1-4)

| Priority | Tool | Effort | Keyword Opportunity | Notes |
|----------|------|--------|---------------------|-------|
| 1.1 | Loan Finder Quiz | Medium | High | Primary lead qualifier |
| 1.2 | Loan Payment Calculator | Low | Very High (5k+ searches) | Simplest build, highest volume |
| 1.3 | Tools Hub Page | Low | Medium | Must exist before promoting tools |

### Phase 2: High-Value Calculators (Weeks 5-8)

| Priority | Tool | Effort | Keyword Opportunity | Notes |
|----------|------|--------|---------------------|-------|
| 2.1 | DSCR Calculator | Low-Medium | High (low competition) | Attracts qualified leads |
| 2.2 | Break-Even Analyzer | Medium | Medium-High | High conversion tool |
| 2.3 | Affordability Calculator | Low | Medium-High | Complements payment calc |
| 2.4 | Factor Rate to APR Converter | Very Low | Low-Med (very low competition) | Quick win, high utility |
| 2.5 | Invoice Factoring Calculator | Low | Medium (low competition) | Supports alternative financing |

### Phase 3: Glossary Foundation (Weeks 9-12)

| Priority | Tool | Effort | Keyword Opportunity | Notes |
|----------|------|--------|---------------------|-------|
| 3.1 | Glossary (Phase 1: 30 terms) | Medium | Very High (long-term) | Builds authority |
| 3.2 | Glossary (Phase 2: +40 terms) | Medium | Very High | Expand coverage |
| 3.3 | Glossary (Phase 3: +50 terms) | Medium | Very High | Complete at 120+ |

### Phase 4: Decision Tools (Weeks 13-16)

| Priority | Tool | Effort | Keyword Opportunity | Notes |
|----------|------|--------|---------------------|-------|
| 4.1 | Equipment vs. Leasing | Medium | Medium | Industry-specific value |
| 4.2 | SBA Eligibility Checker | Medium | High | Pre-qualifies high-value leads |
| 4.3 | Loan Comparison | Medium | Medium | Helps users with offers in hand |
| 4.4 | Startup Cost Calculator | High | High (2-5k searches) | Attracts pre-funding stage businesses |
| 4.5 | Business Valuation Calculator | High | Medium-High | Supports acquisition/ESOP financing |

### Phase 5: Advanced Tools (Weeks 17-20)

| Priority | Tool | Effort | Keyword Opportunity | Notes |
|----------|------|--------|---------------------|-------|
| 5.1 | Working Capital Calculator | Medium | Medium | Supports LOC product |
| 5.2 | Prepayment Penalty Calculator | Medium | Low (very low competition) | Unique angle, refinancing leads |
| 5.3 | Growth Projection | — | Low | Already built |

### Phase 6: Differentiation Assets (Weeks 21-30)

| Priority | Tool/Asset | Effort | SEO Impact | Notes |
|----------|------------|--------|------------|-------|
| 6.1 | Lender Red Flag Detector | High | Medium | Trust builder, highly shareable |
| 6.2 | Loan Rejection Decoder | Medium | High | Meets users at emotional moment |
| 6.3 | Small Business Rate Index | High | Very High | Backlink magnet, press citations |
| 6.4 | State Lending Reports (Phase 1) | High | Very High | 50 local SEO pages |
| 6.5 | Franchise Financing Database | Very High | High | 500+ SEO pages, high-value leads |

### Summary: Recommended Build Order

1. Loan Finder Quiz
2. Loan Payment Calculator
3. Tools Hub Page
4. DSCR Calculator
5. Break-Even Analyzer
6. Affordability Calculator
7. Factor Rate to APR Converter *(quick win)*
8. Invoice Factoring Calculator
9. Glossary (Phase 1: 30 terms)
10. Equipment vs. Leasing
11. SBA Eligibility Checker
12. Loan Comparison
13. Startup Cost Calculator
14. Business Valuation Calculator
15. Glossary (Phase 2: +40 terms)
16. Working Capital Calculator
17. Prepayment Penalty Calculator
18. Glossary (Phase 3: +50 terms)
19. **Lender Red Flag Detector** *(differentiation)*
20. **Loan Rejection Decoder** *(differentiation)*
21. **Small Business Rate Index** *(content asset)*
22. **State Lending Reports** *(50 pages)*
23. **Franchise Financing Database** *(500+ pages)*

---

## Keyword Targets by Tool

| Tool | Primary Keyword | Est. Volume | Difficulty |
|------|----------------|-------------|------------|
| Loan Payment Calculator | business loan payment calculator | 5,000+ | Low-Med |
| DSCR Calculator | DSCR calculator | 1,000+ | Low |
| Affordability Calculator | how much business loan can I afford | 2,000+ | Low |
| Loan Comparison | compare business loans | 800+ | Med |
| SBA Eligibility Checker | SBA loan eligibility | 3,000+ | Med |
| Working Capital Calculator | working capital calculator | 1,000+ | Med |
| Break-Even Analyzer | break even calculator business | 1,500+ | Med |
| Equipment vs. Leasing | equipment financing vs leasing | 500+ | Low |
| Loan Finder Quiz | what business loan do I need | 800+ | Low |
| Factor Rate to APR | factor rate to APR | 300-500 | Very Low |
| Invoice Factoring Calculator | invoice factoring calculator | 500-800 | Low |
| Startup Cost Calculator | startup cost calculator | 2,000-5,000 | Med |
| Business Valuation Calculator | business valuation calculator | 1,000-3,000 | Med |
| Prepayment Penalty Calculator | prepayment penalty calculator | 200-500 | Very Low |
| Lender Red Flag Detector | predatory business loan | 500-1,000 | Low |
| Loan Rejection Decoder | business loan denied | 800-1,500 | Medium |
| Small Business Rate Index | business loan rates | 5,000+ | High |
| Franchise Financing Database | franchise financing | 2,000+ | Medium |
| State Lending Reports (×50) | [state] small business loans | 50,000+ total | Medium |
| Glossary (aggregate) | what is [term] × 120 terms | 10,000+ | Low |

See `KEYWORDS.md` for complete keyword research and mapping.

---

## Performance Requirements

### Core Web Vitals Targets
- LCP (Largest Contentful Paint): < 2.5s
- FID (First Input Delay): < 100ms
- CLS (Cumulative Layout Shift): < 0.1

### Technical Requirements
- All calculations run client-side (no server round-trips)
- Content wrapper is server-rendered (SSR) for SEO
- Interactive components hydrate on client
- Tools must be fully functional on 375px+ screens (mobile-first)
- No signup or email gate required to use any tool
- Optional email capture offered AFTER results, not before

### Accessibility
- All form inputs have labels
- Color contrast meets WCAG AA
- Keyboard navigation works for all interactive elements
- Results are screen-reader accessible

---

## Analytics & Tracking

### Events to Track (All Tools)

| Event | Trigger | Parameters |
|-------|---------|------------|
| `tool_view` | Page load | tool_slug |
| `tool_start` | First input interaction | tool_slug |
| `tool_calculate` | Results displayed | tool_slug, key_outputs |
| `tool_email_capture` | Email submitted | tool_slug |
| `tool_cta_click` | CTA clicked | tool_slug, cta_type, destination |
| `tool_share` | Results shared | tool_slug, share_method |

### Tool-Specific Events

| Tool | Additional Events |
|------|------------------|
| Loan Payment Calculator | `tool_view_amortization`, `tool_download_csv`, `tool_compare_terms` |
| DSCR Calculator | `tool_mode_change` (simple/detailed), `tool_whatif_view` |
| Affordability Calculator | `tool_revenue_added`, `tool_term_comparison`, `tool_rate_comparison` |
| Loan Comparison | `tool_add_loan` (2nd/3rd loan), `tool_view_chart` |
| Loan Finder Quiz | `quiz_question_N` (per question), `quiz_result_type` |
| SBA Eligibility | `sba_disqualified` (with reason), `sba_result_tier` |
| Working Capital | `tool_add_expenses`, ratio_tier tracking |
| Factor Rate to APR | `tool_compare_view` (expand comparison) |
| Invoice Factoring | `tool_cost_breakdown`, `tool_worthit_view` |
| Startup Cost | `tool_template_select`, `tool_category_complete`, `tool_download_pdf` |
| Business Valuation | `tool_method_expand`, `tool_step_complete`, `tool_download_pdf` |
| Prepayment Penalty | `tool_scenario_select` (payoff vs refinance), `tool_breakeven_view` |
| Glossary | `glossary_search`, `glossary_term_view`, `glossary_category_filter` |

### Conversion Attribution

Track the full funnel:
```
tool_view → tool_start → tool_calculate → tool_cta_click → lead_form_start → lead_form_submit
```

Goal: Identify which tools drive the highest quality leads (lead → contact → funded deal).

---

## Technical Stack (Next.js)

### File Structure

```
app/
├── tools/
│   ├── page.tsx                              # Tools hub
│   ├── layout.tsx                            # Shared tools layout
│   │
│   ├── loan-payment-calculator/
│   │   ├── page.tsx                          # SSR content wrapper
│   │   └── components/
│   │       ├── Calculator.tsx                # Client component
│   │       ├── AmortizationChart.tsx
│   │       └── ...
│   │
│   ├── dscr-calculator/
│   │   ├── page.tsx
│   │   └── components/...
│   │
│   ├── affordability-calculator/
│   │   ├── page.tsx
│   │   └── components/...
│   │
│   ├── loan-comparison/
│   │   ├── page.tsx
│   │   └── components/...
│   │
│   ├── sba-eligibility-checker/
│   │   ├── page.tsx
│   │   └── components/...
│   │
│   ├── working-capital-calculator/
│   │   ├── page.tsx
│   │   └── components/...
│   │
│   ├── break-even-analyzer/
│   │   ├── page.tsx
│   │   └── components/...
│   │
│   ├── equipment-financing-vs-leasing/
│   │   ├── page.tsx
│   │   └── components/...
│   │
│   ├── glossary/
│   │   ├── page.tsx                          # Glossary index
│   │   └── [term]/
│   │       └── page.tsx                      # Dynamic term pages
│   │
│   ├── loan-finder-quiz/
│   │   ├── page.tsx                          # Quiz page
│   │   └── results/
│   │       └── [result]/
│   │           └── page.tsx                  # Dynamic result pages
│   │
│   ├── growth-trajectory-calculator/         # Existing
│   │   └── ...
│   │
│   └── loan-buddy/                           # Existing
│       └── ...
│
├── components/
│   └── tools/
│       ├── ToolPageWrapper.tsx               # Shared wrapper component
│       ├── ToolCTA.tsx                       # Reusable CTA blocks
│       ├── RelatedTools.tsx                  # Related tools grid
│       ├── EmailCapture.tsx                  # Email results form
│       └── ToolCard.tsx                      # Card for hub page
│
└── lib/
    └── tools/
        ├── calculations/                      # Shared calculation functions
        │   ├── amortization.ts
        │   ├── dscr.ts
        │   ├── workingCapital.ts
        │   └── ...
        └── schemas/                           # JSON-LD generators
            ├── webApplication.ts
            ├── faqPage.ts
            └── breadcrumb.ts
```

### Shared Components

**ToolPageWrapper** — Consistent structure for all tool pages:
```tsx
<ToolPageWrapper
  title="Loan Payment Calculator"
  description="Estimate your monthly payments..."
  breadcrumb={["Home", "Tools", "Loan Payment Calculator"]}
  relatedTools={["dscr-calculator", "affordability-calculator"]}
  relatedProducts={["term-loans", "lines-of-credit"]}
  faqs={faqData}
>
  <LoanPaymentCalculator />
</ToolPageWrapper>
```

### Static Generation

- Glossary terms: Use `generateStaticParams()` to pre-render all 120+ term pages
- Quiz results: Use `generateStaticParams()` for all result combinations
- Other tools: Standard static pages

---

## Quality Checklist (Per Tool)

Before launching any tool, verify:

### Content
- [ ] H1 includes primary keyword
- [ ] 150-200 word intro above tool
- [ ] 300-500 word educational content below tool
- [ ] 3-5 FAQs with schema markup
- [ ] 2+ internal links to loan products
- [ ] 2-3 related tool links

### SEO
- [ ] Unique meta title (50-60 chars)
- [ ] Unique meta description (140-160 chars)
- [ ] Canonical URL set
- [ ] OG image created
- [ ] WebApplication schema
- [ ] FAQPage schema
- [ ] BreadcrumbList schema

### Functionality
- [ ] All calculations verified against manual check
- [ ] Mobile responsive (test on 375px)
- [ ] Keyboard accessible
- [ ] No console errors
- [ ] Analytics events firing

### CTAs
- [ ] Primary CTA appears after results
- [ ] CTA links to /get-started with correct parameters
- [ ] Dynamic CTA variations implemented (if applicable)
- [ ] Email capture functional

### Performance
- [ ] LCP < 2.5s
- [ ] No layout shift on load
- [ ] Tool functions without JS for basic content

---

## Spec File Reference

All tool specifications are in `/mnt/user-data/outputs/`:

| File | Tool |
|------|------|
| `01-GLOSSARY-ENCYCLOPEDIA-SPEC.md` | Glossary (120+ terms, 3-phase rollout) |
| `02-LOAN-FINDER-QUIZ-SPEC.md` | Quiz (5-7 questions, 56 result variations) |
| `03-BREAK-EVEN-ANALYZER-SPEC.md` | Break-Even (ROI, ramp-up, PDF export) |
| `04-EQUIPMENT-VS-LEASING-SPEC.md` | Equipment vs Leasing (MACRS, Section 179) |
| `05-LOAN-PAYMENT-CALCULATOR-SPEC.md` | Payment Calculator (amortization, charts) |
| `06-DSCR-CALCULATOR-SPEC.md` | DSCR (simple/detailed modes, tiers) |
| `07-AFFORDABILITY-CALCULATOR-SPEC.md` | Affordability (reverse calculation) |
| `08-LOAN-COMPARISON-SPEC.md` | Comparison (2-3 loans side-by-side) |
| `09-SBA-ELIGIBILITY-CHECKER-SPEC.md` | SBA Eligibility (10 questions, scoring) |
| `10-WORKING-CAPITAL-CALCULATOR-SPEC.md` | Working Capital (ratio, runway, recommendations) |
| `11-FACTOR-RATE-TO-APR-SPEC.md` | Factor Rate Converter (MCA APR, cost context) |
| `12-INVOICE-FACTORING-CALCULATOR-SPEC.md` | Invoice Factoring (advance, fees, timeline) |
| `13-STARTUP-COST-CALCULATOR-SPEC.md` | Startup Costs (8 categories, templates, PDF) |
| `14-BUSINESS-VALUATION-CALCULATOR-SPEC.md` | Business Valuation (SDE/EBITDA/revenue methods) |
| `15-PREPAYMENT-PENALTY-CALCULATOR-SPEC.md` | Prepayment Penalty (payoff vs refinance analysis) |
| `16-LENDER-RED-FLAG-DETECTOR-SPEC.md` | Red Flag Detector (predatory term identification) |
| `17-LOAN-REJECTION-DECODER-SPEC.md` | Rejection Decoder (improvement roadmap) |
| `18-SMALL-BUSINESS-RATE-INDEX-SPEC.md` | Rate Index (monthly data, backlink magnet) |
| `19-FRANCHISE-FINANCING-DATABASE-SPEC.md` | Franchise Database (500+ franchise pages) |
| `20-STATE-LENDING-REPORTS-SPEC.md` | State Reports (50 state pages, local SEO) |

---

## Maintenance & Updates

### Monthly Review
- Check analytics for underperforming tools
- Review search rankings for tool keywords
- Update FAQ content based on user questions
- Add new glossary terms based on search demand

### Quarterly Review
- Audit internal links (fix any broken)
- Update rate ranges and benchmarks in tool content
- Review CTA conversion rates by tool
- Consider new tool ideas based on user feedback

### Annual Review
- Full content refresh for all tool pages
- Update all example numbers for current market
- Evaluate adding new tools based on keyword research
- Assess tool build priority for next year
