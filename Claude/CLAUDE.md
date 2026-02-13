# CLAUDE.md — QuickLenders Project

## Project Overview

QuickLenders (quicklenders.com) is a business lending platform that connects business owners with financing solutions. The site collects lead information through an on-site form, then the team reaches out directly to assess needs and match borrowers with appropriate lenders.

**Business model:** Lead generation → direct outreach → lender matching → referral revenue. We do NOT send users to external application forms. Every conversion happens on our site through `/get-started`.

**Tech stack:** Next.js 14+ (App Router), Tailwind CSS, shadcn/ui, MDX for content, Recharts for charts/calculators, Framer Motion for animations, React Hook Form + Zod for forms, Vercel hosting, Fuse.js for glossary search.

**Primary CTA:** `/get-started` (lead capture form). Every page on the site should guide users toward this form or toward a tool that then guides them to this form.

---

## Global Style & Tone

All content generated for this project must follow these rules.

### Voice
- Clear, professional, and approachable. Not stuffy, not salesy.
- Helpful and honest. If a loan type isn't a fit, say so. Credibility beats conversion on any single page.
- Write naturally. Output should sound human and pass AI detection.
- Stay grammatically correct without being stiff or robotic.
- Speak to business owners as peers. They're smart, busy people making financial decisions. Don't talk down to them.

### Brevity
- Be concise. Do not pad sentences or add filler words.
- Match detail level to information provided (minimal info = minimal copy).
- Avoid buzzwords and fluff.
- Say what something does, not what it "helps to" or "allows you to" do.

### Finance-Specific Tone Rules
- Never promise guaranteed approval, lowest rates, or specific outcomes.
- Use ranges and qualifiers where appropriate: "rates typically range from X-Y%" not "you'll get X% rates."
- Be honest about qualification requirements. Don't sugarcoat what lenders look for.
- When discussing loan amounts, terms, and rates, always frame them as typical/approximate. Actual terms vary.
- Never give specific financial advice. Present information, explain tradeoffs, and let the reader decide.
- Disclose the commercial relationship naturally: we connect businesses with lenders. We earn referral fees when deals close. Don't hide it, but don't over-explain it either.

### Formatting
- Never use em dashes. Use periods, commas, or colons instead.
- No emojis unless explicitly requested.
- No external links unless explicitly provided.
- Use $ formatting consistently: $50,000 not $50k in body copy (abbreviations like "$50k" are fine in tables, headlines, and URL slugs).
- Percentages: use the % symbol, not the word. "10%" not "ten percent."

### Brand Colors

| Color | Hex | Usage |
|-------|-----|-------|
| TBD | TBD | Primary |
| TBD | TBD | Secondary |
| TBD | TBD | Accent/CTA |

*(Update these once brand colors are finalized.)*

---

## AI Detection Avoidance

All content must sound natural and human. Avoid these common AI writing patterns.

### Banned Words (never use)

| Word | Use Instead |
|------|-------------|
| delve | explore, look at, examine |
| tapestry | mix, combination |
| utilize | use |
| leverage | use, apply |
| multifaceted | complex, varied |
| cutting-edge | modern, advanced |
| revolutionary | new, improved |
| seamless/seamlessly | smooth, easy |
| robust | strong, solid |
| comprehensive | complete, full |
| streamline | simplify |
| facilitate | help, enable |
| foster | encourage, support |
| harness | use, apply |
| elevate | improve, raise |
| empower | enable, help |
| curated | selected, chosen |
| bespoke | custom |
| meticulous | careful, precise |
| testament | proof, sign |
| endeavors | efforts, work |
| realm | area, field |
| myriad | many, various |
| plethora | many, range of |
| pivotal | key, important |
| paramount | important, critical |
| intricate | detailed, complex |
| navigate | work through, figure out, handle |
| landscape | market, space, field |
| tailored | matched, fitted, specific |
| holistic | complete, full, overall |
| synergy | combined effect, together |

### Banned Phrases (never use)

- "In today's [anything]" or "In the world of [anything]"
- "It's important to note" / "It's worth noting"
- "In summary" / "In conclusion" / "In essence"
- "Whether you're a [x], [y], or [z]"
- "Take [x] to the next level"
- "Unlock the potential"
- "Game-changing" / "Game-changer"
- "At the end of the day"
- "When it comes to"
- "Look no further"
- "Not only... but also"
- "Rest assured"
- "Dive into" / "Dive deep"
- "A wide array of"
- "Designed to meet your needs"
- "Your one-stop shop"
- "We understand that..."
- "Here at Quick Lenders, we..."
- "Our team of experts"
- "Financing made easy" (except in the existing tagline where appropriate)

### Sentence Structure Rules
- Vary sentence length. Mix short sentences with longer ones.
- Avoid starting consecutive sentences with the same word.
- Do not use more than one transitional phrase per paragraph (however, moreover, furthermore, additionally).
- Skip unnecessary qualifiers ("very," "really," "extremely," "highly").
- Write directly. "This calculator shows your monthly payment" not "This calculator is designed to help you understand what your monthly payment might look like."

### Opening Sentence Rules
- Never start with "Welcome to" or "Introducing."
- Never start with a question.
- Never start with "Looking for...?"
- Get to the point immediately. State what the page/tool/article does or what the reader will learn.

---

## CTA Language

We are NOT an application. We are a consultation. The language should reflect that.

### Use These
- "Get Your Options"
- "Check Your Rate"
- "See What You Qualify For"
- "Talk to an Advisor"
- "Get Started"
- "Request a Consultation"
- "Find the Right Loan"

### Never Use These
- "Apply Now" (implies a formal application with credit pulls)
- "Submit" (cold, transactional)
- "Sign Up" (implies ongoing commitment)
- "Buy Now" (not what this is)
- "Submit Application"

### CTA Links
All primary CTAs link to `/get-started` with URL parameters for attribution:
```
/get-started?loan_type=[type]&source=[page-type]&page=[slug]
```
Examples:
- `/get-started?loan_type=term-loans&source=loan-page`
- `/get-started?loan_type=not-sure&source=quiz-result&quiz_result=term-loan`
- `/get-started?source=blog&article=how-to-get-business-loan`
- `/get-started?source=homepage-hero`

Secondary CTAs can link to `/book-a-call`, relevant tools, or the quiz.

---

## Business Details

| Detail | Value |
|--------|-------|
| Business Name | Quick Lenders |
| Domain | quicklenders.com |
| Phone | (303) 921-8529 |
| Hours | Mon-Fri 9AM-5PM MST |
| Location | Colorado |
| Primary Conversion | /get-started (lead capture form) |
| Scheduling | Cal.com (Book a Call) |

### Loan Products Offered

| Product | Route | Amount Range | Typical Terms |
|---------|-------|-------------|---------------|
| Term Loans | /business-loans/term-loans | $30,000 - $10M | 1-3 years, 10-25% |
| Lines of Credit | /business-loans/lines-of-credit | $30,000 - $10M | 1-3 years, 10-25% |
| Asset-Based Lending | /business-loans/asset-backed-loans | $250,000 - $100M | 1-3 years, 10-25% |
| Equipment Financing | /business-loans/equipment-financing | $50,000 - $50M | 1-7 years, 7-14% |
| ESOP | /business-loans/esop | $1M - $50M | 3-10 years, 6-9% |
| Investment Banking | /business-loans/investment-banking | $20M+ | 1-10 years, 8-15% |
| Bonds | /business-loans/bonds | $250,000 - $50M | 1-10 years, 4-8% |

When writing about products, use these ranges as guidelines. Always say "typically" or "generally" since actual terms vary by borrower.

---

## Content Standards

### E-E-A-T Compliance

All content must demonstrate:

- **Experience:** Reference real-world scenarios, specific examples, practical advice. "A restaurant owner buying a $40,000 commercial oven would typically..." not generic platitudes.
- **Expertise:** Technical accuracy matters. Explain "why" not just "what." If DSCR matters, explain what it is and why lenders care.
- **Authoritativeness:** Internal links to related content (glossary terms, tools, product pages). Reference official sources (SBA.gov, IRS.gov) when citing regulations or programs.
- **Trustworthiness:** Honest about limitations. Disclose the commercial relationship. Don't oversell. If someone with bad credit will have limited options, say so clearly.

### SEO Requirements (Every Page)

- [ ] Unique meta title (50-60 chars), primary keyword front-loaded
- [ ] Unique meta description (140-160 chars), includes primary keyword + reason to click
- [ ] Primary keyword in H1
- [ ] Primary keyword in first 100 words
- [ ] 2-3 internal links to loan product pages
- [ ] 1+ link to a relevant tool
- [ ] FAQ section with FAQPage schema markup (3-5 questions)
- [ ] Appropriate schema: FinancialProduct (loan pages), Article (blog), BreadcrumbList (all pages), Organization (global)
- [ ] OG image set
- [ ] Canonical URL set
- [ ] Images have descriptive alt text

### Keyword Usage Guidelines

Refer to `KEYWORD-RESEARCH.md` for the full keyword research. Key principles:

**Match keywords to pages:** Every page has a primary keyword and 2-3 secondary keywords. Don't create multiple pages targeting the same keyword (cannibalization).

**Priority order:**
1. Tier 1 keywords (SEO difficulty < 40) — target these first
2. Tier 2 keywords (difficulty 40-60) — target after Tier 1 pages are ranking
3. Tier 3+ keywords — will rank naturally over time as domain authority grows

**High-value keyword clusters:**
- **Product keywords:** term loans, asset-backed loans, equipment financing, ESOP loans, business credit lines
- **Calculator keywords:** online loan calculators, business loan payment calculator, DSCR calculator
- **Startup keywords:** business loan for startup, first-time business loans, equipment financing for startups
- **Use case keywords:** business acquisition loans, inventory financing, debt consolidation financing
- **Industry keywords:** restaurant business loans, construction loans, trucking business loans
- **State keywords:** [state] business loans (start with Colorado, Texas, Florida)

**Do not over-optimize:** Use keywords naturally. If a keyword doesn't fit the sentence, rewrite the sentence or skip the keyword. Google penalizes keyword stuffing. Write for humans first, search engines second.

### Blog Articles

- 1,500-2,500 words
- FAQ section with schema
- 2+ loan product links
- 1+ tool link
- Primary CTA (lead form) + secondary CTA (quiz, tool, or related article)
- Unique meta tags
- Tier 1 articles (high-intent) get more assertive CTAs
- Tier 4 articles (educational) get softer CTAs: quiz, tools, downloads

### Glossary Terms

- 300-600 words per term
- Plain-language definition first, then technical detail
- "Why it matters" section explaining relevance to borrowers
- Related terms linked
- Contextual CTA to relevant loan product
- Individual page with schema for each term

### Tool Pages

- 300-500 words of written content around the interactive element (Google can't index JS interactivity)
- Intro above the tool: what it does, who it's for
- Educational section below: deeper explanation of the concepts
- FAQ section with schema
- Internal links to glossary terms, product pages, and related tools
- "Email me results" option for lead capture
- Contextual CTA to lead form based on tool output

### Industry Pages

- Same template structure, unique content per industry
- Must include industry-specific use cases, not generic copy
- Link to relevant products, tools, and case studies
- Industry-specific CTA language: "Finance your next excavator" not "Get a loan"

### State Pages

- Unique 2-3 sentence overview per state (not auto-generated)
- State-specific data: regulations, SBA district, SCORE chapter, SBDC, top industries
- Template structure is fine, but unique content must differentiate from other states

---

## Project File Reference

### Strategy & Research
| File | Contents |
|------|----------|
| `QUICKLENDERS-MIGRATION-PLAN.md` | Complete migration plan: WordPress removal, Next.js rebuild, SEO setup, deploy to Vercel |
| `KEYWORDS.md` | Keyword research: tiered opportunities (Tier 1-4), keyword-to-page mapping, content gaps, tracking priorities |
| `COMPETITORS.md` | Competitor analysis: Fundera, Lendio, NerdWallet, OnDeck, etc. Positioning, content gaps, differentiation strategy |
| `GLOSSARY-TERMS.md` | Master list of 120+ glossary terms with definitions, categories, and 3-phase rollout tracker |
| `FAQ-BANK.md` | Reusable FAQ library organized by topic. Pull 3-5 per page. Includes suggested page assignments. |
| `CONTENT-TEMPLATES.md` | Copy-paste templates for every page type: blog, glossary, industry, state, use case, loan amount, tools, comparisons, case studies |

**How to use these files:**
- **Starting a new page?** → Open `CONTENT-TEMPLATES.md`, copy the relevant template, fill in the blanks
- **Choosing keywords?** → Check `KEYWORDS.md` for the primary/secondary keywords mapped to that page type
- **Writing FAQs?** → Pull from `FAQ-BANK.md` instead of writing from scratch. Customize answers slightly if needed.
- **Building glossary terms?** → Use `GLOSSARY-TERMS.md` for the term list, definition guidance, and phase priority
- **Positioning against competitors?** → Reference `COMPETITORS.md` for gaps to exploit and messaging angles

### Post-Migration Roadmap
| File | Contents |
|------|----------|
| `ROADMAP-01-LEAD-CAPTURE-CONVERSION.md` | Lead form, CRM, email nurture sequences, trust overhaul, CTA strategy |
| `ROADMAP-02-TOOLS-CALCULATORS.md` | All 11 tools: 4 spec'd + 7 new. Build order, design principles, conversion strategy |
| `ROADMAP-03-CONTENT-SEO.md` | Blog articles, industry pages, state pages, loan amount pages, use cases, case studies, content flywheel |
| `ROADMAP-04-MARKETING-DISTRIBUTION.md` | SEO maintenance, backlinks, Google Business Profile, social, YouTube, Google Ads |
| `ROADMAP-05-OPTIMIZATION-REVENUE.md` | A/B testing, lead scoring, lender partnerships, revenue model, personalization, advisory upsell |

### Tool Specifications
| File | Contents |
|------|----------|
| `00-TOOLS-ECOSYSTEM-STRATEGY.md` | Master strategy: all 21 tools/assets, hub page, content wrapper, SEO, internal linking, build priority, analytics |
| `01-GLOSSARY-ENCYCLOPEDIA-SPEC.md` | 120+ terms, 8 categories, search/filter, 3-phase rollout |
| `02-LOAN-FINDER-QUIZ-SPEC.md` | 5-7 questions, weighted scoring, 56 result variations, email capture |
| `03-BREAK-EVEN-ANALYZER-SPEC.md` | ROI calculator, ramp-up modeling, break-even chart, PDF export |
| `04-EQUIPMENT-VS-LEASING-SPEC.md` | Side-by-side comparison, MACRS depreciation, Section 179, scenario toggles |
| `05-LOAN-PAYMENT-CALCULATOR-SPEC.md` | Monthly payment, amortization schedule/chart, term comparison, CSV export |
| `06-DSCR-CALCULATOR-SPEC.md` | Simple/detailed modes, visual gauge, tier interpretation, what-if scenarios |
| `07-AFFORDABILITY-CALCULATOR-SPEC.md` | Reverse calculation (payment → max loan), term/rate comparison, revenue context |
| `08-LOAN-COMPARISON-SPEC.md` | 2-3 loan side-by-side, total cost breakdown, winner by category, visual charts |
| `09-SBA-ELIGIBILITY-CHECKER-SPEC.md` | 10-question flow, scoring system, program matching (7a/504/Microloan), dynamic CTAs |
| `10-WORKING-CAPITAL-CALCULATOR-SPEC.md` | Assets vs liabilities, WC ratio, cash runway, recommended loan amount, waterfall chart |
| `11-FACTOR-RATE-TO-APR-SPEC.md` | MCA factor rate converter, APR calculation, cost comparison context, quick-win build |
| `12-INVOICE-FACTORING-CALCULATOR-SPEC.md` | Advance/reserve/fee breakdown, timeline visualization, APR equivalent, worth-it analysis |
| `13-STARTUP-COST-CALCULATOR-SPEC.md` | 8 expense categories, industry templates, funding plan, PDF export |
| `14-BUSINESS-VALUATION-CALCULATOR-SPEC.md` | SDE/EBITDA/revenue/asset methods, industry multiples, value factors analysis |
| `15-PREPAYMENT-PENALTY-CALCULATOR-SPEC.md` | Penalty types, early payoff vs refinance analysis, break-even calculation |
| `16-LENDER-RED-FLAG-DETECTOR-SPEC.md` | Predatory term detection, confession of judgment, factor rate exposure, trust builder |
| `17-LOAN-REJECTION-DECODER-SPEC.md` | Rejection reason analysis, improvement roadmap, timeline to requalification, alternatives |
| `18-SMALL-BUSINESS-RATE-INDEX-SPEC.md` | Monthly rate data by loan type, backlink magnet, embeddable widget, press citations |
| `19-FRANCHISE-FINANCING-DATABASE-SPEC.md` | 500+ franchise pages, SBA eligibility, investment breakdown, high-value leads |
| `20-STATE-LENDING-REPORTS-SPEC.md` | 50 state pages, local SEO, state programs, SBA data, lender lists |

---

## Site Architecture

```
EXISTING PAGES (from migration)
├── /                                    Homepage
├── /about-us                            About page
├── /business-loans                      Loan products index
│   ├── /business-loans/term-loans
│   ├── /business-loans/lines-of-credit
│   ├── /business-loans/asset-backed-loans
│   ├── /business-loans/equipment-financing
│   ├── /business-loans/esop
│   ├── /business-loans/investment-banking
│   └── /business-loans/bonds
├── /financial-insights                  Blog index
│   ├── /financial-insights/[slug]       Individual articles (MDX)
├── /contact                             Contact page (new, replaces broken link)
├── /privacy-policy                      Privacy policy (new)
└── /terms-of-service                    Terms of service (new)

NEW PAGES (post-migration)
├── /get-started                         Lead capture form (PRIMARY CONVERSION)
├── /get-started/thank-you               Post-submission + Cal.com embed
├── /book-a-call                         Cal.com scheduling
├── /how-it-works                        Process walkthrough
├── /business-loans/application-checklist Document prep guide
├── /tools                               Tools hub (LIVE)
│   ├── /tools/loan-payment-calculator   (LIVE)
│   ├── /tools/factor-rate-to-apr-calculator (LIVE)
│   ├── /tools/total-cost-of-capital-calculator
│   ├── /tools/break-even-calculator
│   ├── /tools/roi-calculator
│   ├── /tools/equipment-financing-calculator
│   ├── /tools/dscr-calculator
│   ├── /tools/prepayment-savings-calculator
│   ├── /tools/refinance-savings-calculator
│   ├── /tools/cash-flow-forecast-tool
│   ├── /tools/business-loan-comparison-tool
│   ├── /tools/funding-readiness-assessment
│   ├── /tools/loan-type-finder
│   ├── /tools/invoice-factoring-calculator
│   ├── /tools/mca-payback-calculator
│   ├── /tools/sba-loan-payment-calculator
│   ├── /tools/business-valuation-estimator
│   ├── /tools/working-capital-calculator
│   ├── /tools/loan-affordability-calculator
│   ├── /tools/loan-document-checklist
│   ├── /tools/business-loan-glossary
│   └── /tools/interest-rate-comparison-chart
├── /glossary                            Glossary hub
│   └── /glossary/[term]                 Individual terms (120+)
├── /industries/[slug]                   Industry pages (10-15)
├── /business-loans/[state]              State pages (50)
├── /business-loans/[amount]             Loan amount pages (10-15)
├── /business-loans/[use-case]           Use case pages (10-15)
├── /success-stories/[slug]              Case studies
├── /compare/[slug]                      Comparison pages
├── /resources                           Downloadable guides hub
└── /embed/[tool-slug]                   Embeddable widget versions
```

---

## Code Conventions

### Next.js / React
- App Router (not Pages Router)
- Server components by default. Client components only when interactivity is needed.
- `use client` directive only on components that need it (forms, tools, animations)
- TypeScript throughout. No `any` types.
- Use Next.js `<Image>` component for all images. No raw `<img>` tags.
- Use Next.js `<Link>` for all internal links. No raw `<a>` tags for internal navigation.
- All images served locally from `/public/images/`. No external image dependencies.

### Styling
- Tailwind CSS for all styling
- shadcn/ui for form components, buttons, cards, dialogs
- No custom CSS files unless absolutely necessary
- Consistent spacing: use Tailwind's spacing scale, don't use arbitrary values

### Content (MDX)
- All blog articles, glossary terms, and static content pages as MDX files in `/content/`
- Frontmatter for metadata: title, description, date, author, keywords, related products, related tools
- `generateStaticParams` for dynamic routes
- `generateMetadata` for per-page meta tags

### Forms
- React Hook Form for form state management
- Zod for validation schemas
- Server-side API route (`/api/leads`) for form submission
- Honeypot field for spam prevention (no CAPTCHA)
- Rate limiting: 5 submissions per IP per hour

### Analytics Events
Track these events across the site:

| Event | Trigger |
|-------|---------|
| `lead_form_start` | First field focused on lead form |
| `lead_form_submit` | Lead form completed |
| `phone_call` | Click on phone number |
| `book_call_click` | Click Book a Call |
| `tool_start` | First interaction with any tool |
| `tool_complete` | Tool produces output/results |
| `quiz_complete` | Quiz result shown |
| `email_capture` | Any email submitted (tools, downloads, newsletter) |
| `pdf_download` | Any PDF downloaded |
| `blog_scroll_75` | Scroll > 75% on blog article |
| `cta_click` | Any CTA button click (with page + CTA label as params) |

---

## Internal Linking Rules

Every page on the site should link to other pages. This is not optional.

- Every article: 2+ loan product pages, 1+ tool, 3-5 glossary terms
- Every tool page: 2+ related articles, 1+ loan product page, glossary terms for concepts used
- Every loan product page: related tools, relevant articles, related industries
- Every industry page: relevant loan products, relevant tools, relevant articles, case studies
- Every glossary term: related terms, relevant loan product, relevant tool if applicable
- When publishing a new page, update 3-5 existing pages to link TO the new page

Use descriptive anchor text. "See our term loan options" not "click here." "Try the break-even analyzer" not "learn more."

---

## Git Workflow

- `main` branch → auto-deploys to production via Vercel
- `staging` branch → preview URL for testing
- Feature branches for tools, content batches, and major changes
- Content updates (new MDX files) can go directly to `main` via PR
- Code changes (components, API routes, config) go through feature branch → PR → review → merge

---

## Tools Hub — Build Progress (Updated Feb 11, 2026)

### What Was Built

| Item | Route | Status |
|------|-------|--------|
| Tools Hub page | `/tools` | Live |
| Tool data + schema | `lib/tools-data.tsx`, `lib/schema.ts` | Live |
| Header nav (Tools dropdown) | Desktop + mobile | Live |
| Footer (Tools section) | All pages | Live |
| Loan Payment Calculator | `/tools/loan-payment-calculator` | Live |
| Factor Rate to APR Converter | `/tools/factor-rate-to-apr-calculator` | Live |
| Break-Even Calculator | `/tools/break-even-calculator` | Live |
| Loan Finder Quiz | `/tools/loan-finder-quiz` | Live |
| DSCR Calculator | `/tools/dscr-calculator` | Live |
| Loan Affordability Calculator | `/tools/loan-affordability-calculator` | Live |
| Line of Credit Interest Calculator | `/tools/line-of-credit-interest-calculator` | Live |
| Invoice Factoring Calculator | `/tools/invoice-factoring-calculator` | Live |
| Equipment Financing Calculator | `/tools/equipment-financing-calculator` | Live |
| Loan Comparison Tool | `/tools/business-loan-comparison-tool` | Live |
| Working Capital Calculator | `/tools/working-capital-calculator` | Live |
| SBA Loan Payment Calculator | `/tools/sba-loan-payment-calculator` | Live |
| ROI Calculator | `/tools/roi-calculator` | Live |
| Startup Cost Calculator | `/tools/startup-cost-calculator` | Live |
| Prepayment Penalty Calculator | `/tools/prepayment-penalty-calculator` | Live |
| Cash Flow Forecast Tool | `/tools/cash-flow-forecast-tool` | Live |
| Business Valuation Calculator | `/tools/business-valuation-calculator` | Live |
| Loan Offer Analyzer | `/tools/loan-offer-analyzer` | Live |
| Loan Rejection Decoder | `/tools/loan-rejection-decoder` | Live |
| Total Cost of Capital Calculator | `/tools/total-cost-of-capital-calculator` | Live |
| Refinance Savings Calculator | `/tools/refinance-savings-calculator` | Live |
| MCA Payback Calculator | `/tools/mca-payback-calculator` | Live |
| Funding Readiness Assessment | `/tools/funding-readiness-assessment` | Live |
| Loan Document Checklist | `/tools/loan-document-checklist` | Live |
| Business Loan Glossary | `/tools/business-loan-glossary` | Live |
| Interest Rate Comparison Chart | `/tools/interest-rate-comparison-chart` | Live |
| Sitemap | 26 tool routes added | Live |

### Key Files

| File | What It Does |
|------|-------------|
| `lib/tools-data.tsx` | ToolData interface, all 26 tools metadata (26 live, 0 coming-soon), helper functions (`getToolBySlug`, `getToolsByCategory`, `getLiveTools`). All 26 live tools quality-scanned and tested. |
| `lib/schema.ts` | Added `softwareApplicationSchema()` for tool pages |
| `components/ToolPageLayout/index.tsx` | Reusable layout for all tool pages (hero, tool area, SEO content, how-it-works, what-you-get, FAQ, CTA, related tools) |
| `app/tools/page.tsx` | Hub page with category grid, feature cards, value props, FAQ |
| `app/tools/loan-payment-calculator/` | Page + `LoanPaymentCalculatorTool.tsx` (React Hook Form + Zod, sliders, amortization Recharts AreaChart, expandable schedule table) |
| `app/tools/factor-rate-to-apr-calculator/` | Page + `FactorRateCalculatorTool.tsx` (factor rate input, APR display, cost breakdown, context callout) |
| `app/tools/break-even-calculator/` | Page + `BreakEvenCalculatorTool.tsx` (3 slider inputs, break-even units/revenue, contribution margin, Recharts LineChart with loss/profit zones, edge case handling) |
| `app/tools/loan-finder-quiz/` | Page + `LoanFinderQuiz.tsx` (5-question weighted scoring quiz, 7 loan products, progress bar, animated transitions, result card with rates/terms, alternative recommendation, next steps) |
| `app/tools/dscr-calculator/` | Page + `DSCRCalculatorTool.tsx` (simple/detailed modes, NOI calculator, visual gauge with color zones, 7-tier interpretation, lender requirements table, what-if scenarios, max affordable payment, dynamic CTA by tier) |
| `app/tools/loan-affordability-calculator/` | Page + `LoanAffordabilityTool.tsx` (reverse amortization, payment budget slider + presets, rate/term selectors, term comparison table, rate impact analysis, optional revenue cash flow check, dynamic CTA with calculated amount) |
| `app/tools/line-of-credit-interest-calculator/` | Page + `LineOfCreditInterestTool.tsx` (credit limit + draw amount inputs, interest-only vs P+I toggle, draw fee slider, credit utilization bar, LOC vs term loan comparison table, month-by-month schedule, effective APR with fee impact) |
| `app/tools/invoice-factoring-calculator/` | Page + `InvoiceFactoringTool.tsx` (invoice amount + presets, advance rate/fee sliders, days-to-payment dropdown, invoices-per-month, optional additional fees, Day 1/reserve timeline, cost breakdown, monthly/annual projection, worth-it analysis, dynamic CTA by APR tier) |
| `app/tools/equipment-financing-calculator/` | Page + `EquipmentFinancingTool.tsx` (lease vs buy comparison, equipment category selector with default presets, cost/useful life/residual inputs, side-by-side financing vs leasing columns, Section 179 toggle, tax bracket slider, comparison table with net cost, tax breakdown, decision factors, dynamic CTA by winner) |
| `app/tools/business-loan-comparison-tool/` | Page + `LoanComparisonTool.tsx` (2-3 loan cards with add/remove, per-loan name/amount/rate/term/fees, side-by-side comparison table, winner badges for total cost/payment/payoff, savings callout, stacked bar cost breakdown chart, cumulative payment timeline, decision guidance, dynamic CTA) |
| `app/tools/working-capital-calculator/` | Page + `WorkingCapitalTool.tsx` (assets vs liabilities inputs in green/red cards, optional monthly expenses/revenue/COGS, net working capital + ratio with 5-tier health indicator, assets vs liabilities bar visual, cash conversion cycle DIO/DSO/DPO, cash runway analysis with 3-month/6-month targets, 3-tier financing recommendation min/comfortable/growth, ratio reference table, dynamic CTA by tier) |
| `app/tools/sba-loan-payment-calculator/` | Page + `SBALoanTool.tsx` (7(a)/504 program toggle, loan amount with presets, rate slider, term dropdown with program-specific options, down payment slider, loan purpose selector, SBA guarantee fee calculations with tiered rates, 504 three-party structure bank 50%/CDC 40%/borrower 10%, monthly payment/total interest/down payment cards, total cost bar with conventional savings, fee breakdown table, SBA vs conventional comparison table, qualification requirements overview, dynamic CTA) |
| `app/tools/roi-calculator/` | Page + `ROICalculatorTool.tsx` (loan amount with presets, rate slider, term dropdown, monthly revenue increase + cost savings inputs, ramp-up period selector, ROI percentage with 4-tier verdict banner, net profit/payback period/monthly cash flow/total cost cards, cost vs return summary bar, cumulative profit chart with break-even crossover, collapsible monthly breakdown table, dynamic CTA by verdict) |
| `app/tools/startup-cost-calculator/` | Page + `StartupCostTool.tsx` (6 industry templates with pre-filled defaults, 8 expense category accordions with line-item inputs, running total sidebar, category breakdown horizontal bar chart sorted by size, funding plan with personal savings/friends/family/other inputs and financing needed calculation, 3-tier launch scenarios lean/current/comfortable, 20% buffer recommendation, average costs by business type reference table, dynamic CTA by financing needed) |
| `app/tools/prepayment-penalty-calculator/` | Page + `PrepaymentPenaltyTool.tsx` (current loan inputs, 5 penalty type selector with dynamic inputs per type including SBA declining scale, payoff vs refinance toggle, refinance inputs for new rate/term/fees, penalty amount + interest saved + net savings cards, total payoff vs keep comparison bar, refinance comparison table, break-even analysis with timeline bar visualization, common penalty structures reference table, dynamic CTA by verdict) |
| `app/tools/cash-flow-forecast-tool/` | Page + `CashFlowForecastTool.tsx` (starting cash balance, monthly revenue with growth rate slider -5% to 10%, COGS + operating expenses, existing loan payments, new proposed loan toggle, seasonal revenue adjustments with 12 individual month percentage inputs, cash shortfall alert banner, ending cash/avg monthly/lowest balance/net change metric cards, new loan impact callout, monthly cash flow bar chart green surplus/red deficit, running cash balance bar chart, collapsible monthly breakdown table, dynamic CTA by cash position) |
| `app/tools/business-valuation-calculator/` | Page + `BusinessValuationTool.tsx` (4-step form with progress bar, 12 industry selector with specific multiples, revenue/SDE/EBITDA/asset-based valuation methods, profitability inputs for SDE and EBITDA calculations, asset and liability inputs, adjustment factors for customer concentration/owner dependency/recurring revenue/business age/revenue trend, valuation comparison table with recommended method badge, visual comparison bars, expandable calculation breakdowns for each method, positive and risk factor analysis with impact percentages, value increase tips, industry multiples reference table, dynamic CTA by valuation size) |
| `app/tools/loan-offer-analyzer/` | Page + `LoanOfferAnalyzerTool.tsx` (3-step form: loan terms with cost type selector APR/factor-rate/fee/not-sure and payment frequency, 8-question yes/no/not-sure red flag checklist for confession of judgment/personal guarantee/prepayment penalty/stacking/blanket lien/ACH/reconciliation/future receivables, lender details with contact method and pressure level, severity-based analysis engine with critical/serious/caution tiers, color-coded report card banner, severity count cards, true cost summary with amount/repay/cost/APR, market rate comparison bars vs SBA/bank/online, detailed findings cards with what-found/why-matters/what-to-do, dynamic CTA by risk level) |
| `app/tools/loan-rejection-decoder/` | Page + `LoanRejectionDecoderTool.tsx` (3-step form: 9 loan type selector, 14 rejection reason multi-select with checkboxes, profile inputs for credit score/time in business/monthly revenue, rejection reason database with 12 detailed roadmap entries each containing severity/target/timeframe/action-plan/alternatives, alternatives matcher scoring 8 financing types against user profile as likely/possible/unlikely with credit and time requirements, expandable roadmap cards with week-by-week action plans and checkbox tasks, financing options list with color-coded match status, timeline visualization showing when each financing type becomes available, dynamic CTA by available options count) |
| `app/tools/total-cost-of-capital-calculator/` | Page + `TotalCostOfCapitalTool.tsx` (loan amount with presets, APR/factor rate toggle, rate slider, term/frequency selectors, origination fee slider with amount display, expandable detailed fees section for closing/doc/other fees, Newton's method effective APR solver, 4-tier cost verdict banner low/moderate/high/very-high, metric cards for total repayment/total fees/total cost/cost per dollar, stated vs effective rate comparison bars, payment and net proceeds dark summary, proportional cost breakdown stacked bar with legend, collapsible full cost breakdown table, dynamic CTA by cost tier) |
| `app/tools/refinance-savings-calculator/` | Page + `RefinanceSavingsTool.tsx` (2-section form: current loan balance/rate/remaining months with auto-calculate payment toggle, new loan rate/term/origination fee/closing costs/prepayment penalty, 4-tier verdict banner strong/moderate/marginal/not-worth-it, metric cards for monthly savings/interest saved/refinance costs/break-even months, side-by-side dark summary current vs new with rates and totals, dual-bar balance payoff chart red=current green=new, break-even timeline progress bar, collapsible full comparison table, dynamic CTA by verdict) |
| `app/tools/mca-payback-calculator/` | Page + `MCAPaybackTool.tsx` (advance amount with presets, factor rate slider with total repayment display, holdback percentage slider, daily/weekly payment toggle, daily revenue input, 4-tier cost verdict reasonable/moderate/expensive/very-expensive, metric cards for payment amount/total repayment/payback period/cost per dollar, revenue holdback split bar showing kept vs withheld, monthly revenue impact grid, payback progress weekly bar chart, MCA vs 12% term loan comparison dark summary, collapsible full cost breakdown table, dynamic CTA by cost tier) |
| `app/tools/funding-readiness-assessment/` | Page + `FundingReadinessTool.tsx` (8-question assessment covering credit/time-in-business/revenue/profitability/existing-debt/collateral/documentation/loan-purpose, weighted scoring with max points from question options, 4-category breakdown Credit&History/Revenue&Profitability/Debt&Collateral/Documentation&Purpose, overall readiness score with 4-tier verdict strong/good/fair/needs-work, 7 loan type recommendations SBA/bank-term/online-term/LOC/equipment/factoring/MCA rated likely/possible/unlikely, improvement tips per category, retake flow, dynamic CTA) |
| `app/tools/loan-document-checklist/` | Page + `LoanDocumentChecklistTool.tsx` (7 loan type selector term-loan/LOC/SBA/equipment/factoring/MCA/not-sure, 6 document categories Financial-Statements/Bank-Statements/Business-Docs/Personal-Docs/Collateral/Existing-Debt, ~20 document items with required/recommended flags, checkbox tracking per item, overall progress bar, category accordion sections, document descriptions, preparation tips section, dynamic CTA) |
| `app/tools/business-loan-glossary/` | Page + `BusinessLoanGlossaryTool.tsx` (40+ terms with name/definition/category/related-terms, keyword search filtering on name+definition+category, 7 category filter buttons All/Loan-Types/Financial-Metrics/Costs-Fees/Application-Process/Collateral-Security/Repayment, alphabetical grouping by first letter with letter headers, expandable term cards, clickable related terms that set search query, CTA section) |
| `app/tools/interest-rate-comparison-chart/` | Page + `InterestRateComparisonTool.tsx` (9 products SBA-7a/SBA-504/Bank-Term/Online-Term/LOC/Equipment/Factoring/MCA/Asset-Based, visual rate range bar chart with color coding green/blue/amber/red by rate tier, sortable by rate/speed/credit/A-Z, detailed comparison table with product/rate/term/amount/approval/credit columns, hover highlighting synced between chart and table, product links to loan pages, credit score color badges, disclaimer, CTA) |

### Design Decisions
- Hub page uses dark blue (`quicklend-900`) background with white cards, amber/gold accents, matching homepage ServicesSection
- Live tool cards are fully clickable (entire card is a Link)
- Each tool page has 300-500 words of SEO content with internal links
- BreadcrumbList + FAQPage + SoftwareApplication schema on every tool page
- Tools nav is a dropdown in both desktop and mobile header
- Adding new tools: create component in `app/tools/[slug]/`, add to `toolsData` in `lib/tools-data.tsx`, update status to `live`, add slug to `app/sitemap.ts`

### Completed Tools (26 live on site)

All 26 tools are live, tested, and quality-scanned. Listed by priority:

| P# | Tool | Route | Status |
|----|------|-------|--------|
| P1 | Loan Payment Calculator | `/tools/loan-payment-calculator` | Live |
| P2 | Factor Rate to APR Converter | `/tools/factor-rate-to-apr-calculator` | Live |
| P3 | Loan Finder Quiz | `/tools/loan-finder-quiz` | Live |
| P4 | DSCR Calculator | `/tools/dscr-calculator` | Live |
| P5 | Loan Affordability Calculator | `/tools/loan-affordability-calculator` | Live |
| P6 | Break-Even Calculator | `/tools/break-even-calculator` | Live |
| P7 | Line of Credit Interest Calculator | `/tools/line-of-credit-interest-calculator` | Live |
| P8 | Invoice Factoring Calculator | `/tools/invoice-factoring-calculator` | Live |
| P9 | Equipment Financing Calculator | `/tools/equipment-financing-calculator` | Live |
| P10 | Business Loan Comparison Tool | `/tools/business-loan-comparison-tool` | Live |
| P11 | Working Capital Calculator | `/tools/working-capital-calculator` | Live |
| P12 | SBA Loan Payment Calculator | `/tools/sba-loan-payment-calculator` | Live |
| P13 | ROI Calculator | `/tools/roi-calculator` | Live |
| P15 | Startup Cost Calculator | `/tools/startup-cost-calculator` | Live |
| P16 | Cash Flow Forecast Tool | `/tools/cash-flow-forecast-tool` | Live |
| P17 | Prepayment Penalty Calculator | `/tools/prepayment-penalty-calculator` | Live |
| P18 | Business Valuation Calculator | `/tools/business-valuation-calculator` | Live |
| P19 | Loan Offer Analyzer | `/tools/loan-offer-analyzer` | Live |
| P20 | Loan Rejection Decoder | `/tools/loan-rejection-decoder` | Live |
| P21 | Total Cost of Capital Calculator | `/tools/total-cost-of-capital-calculator` | Live |
| P22 | Refinance Savings Calculator | `/tools/refinance-savings-calculator` | Live |
| P23 | MCA Payback Calculator | `/tools/mca-payback-calculator` | Live |
| P24 | Funding Readiness Assessment | `/tools/funding-readiness-assessment` | Live |
| P25 | Loan Document Checklist | `/tools/loan-document-checklist` | Live |
| P26 | Business Loan Glossary | `/tools/business-loan-glossary` | Live |
| P27 | Interest Rate Comparison Chart | `/tools/interest-rate-comparison-chart` | Live |

### Quality Scan Completed (Feb 2026)

All 26 tools passed a full quality audit:
- **SEO scan**: All titles 50-60 chars, descriptions 130-170 chars, 6 features each
- **Copy scan**: Zero em dashes, zero banned AI words, all CTA language compliant
- **Calculation testing**: All formulas verified correct, edge cases handled, no NaN/Infinity risks
- **Bug fixes applied**: Equipment Financing (negative tax savings), Business Valuation (negative format), Working Capital (table highlight), Loan Affordability (rate comparison), Cash Flow Forecast (month display), Loan Offer Analyzer (factor rate clamp)

### All Tools Complete

All 26 tools are live. No remaining to-do items.

### Notion Integration

Notion MCP is connected and synced. Tools & Features page ID: `30128f46-9059-8196-b6bb-cb702b8db2fb`

---

## Quick Reference: What NOT to Do

- Don't link to external application forms. All conversions happen on-site.
- Don't use "Apply Now" language. We're a consultation, not an application.
- Don't promise specific rates, guaranteed approval, or definitive outcomes.
- Don't publish content without internal links, meta tags, and schema markup.
- Don't use banned words or phrases (see AI Detection Avoidance section).
- Don't reference NBC, National Business Capital, or any specific affiliate by name in site content.
- Don't use fake testimonials. Real quotes, data-driven proof, or nothing.
- Don't load images from external domains. Everything local in `/public/images/`.
- Don't skip the content wrapper on tool pages. Google needs text to index.
- Don't publish state/industry pages with identical copy. Unique content per page.
