# CLAUDE.md — QuickLenders Project

## Project Overview

QuickLenders (quicklenders.com) is a business lending platform that connects business owners with financing solutions. The site collects lead information through an on-site form, then the team reaches out directly to assess needs and match borrowers with appropriate lenders.

**Business model:** Lead generation → direct outreach → lender matching → referral revenue. We do NOT send users to external application forms. Every conversion happens on our site through `/get-started`.

**Tech stack:** Next.js 14+ (App Router), Tailwind CSS, shadcn/ui, MDX for content, Recharts for charts/calculators, Framer Motion for animations, React Hook Form + Zod for forms, Vercel hosting, Fuse.js for glossary search.

**Primary CTA:** `/get-started` (lead capture form). Every page on the site should guide users toward this form or toward a tool that then guides them to this form.

---

## Voice & Writing (QuickLenders deltas)

Follow the Global Writing Rules at root. Finance-specific additions:

### Voice
- Clear, professional, approachable. Not stuffy, not salesy.
- Helpful and honest. If a loan type isn't a fit, say so. Credibility beats conversion on any single page.
- Speak to business owners as peers. Smart, busy people making financial decisions. Don't talk down to them.
- Say what something does, not what it "helps to" or "allows you to" do.

### Finance-Specific Tone Rules
- Never promise guaranteed approval, lowest rates, or specific outcomes.
- Use ranges and qualifiers: "rates typically range from X-Y%" not "you'll get X% rates."
- Be honest about qualification requirements. Don't sugarcoat what lenders look for.
- Frame loan amounts, terms, and rates as typical/approximate. Actual terms vary.
- Never give specific financial advice. Present information, explain tradeoffs, let the reader decide.
- Disclose the commercial relationship naturally: we connect businesses with lenders and earn referral fees when deals close. Don't hide it, don't over-explain it.

### Formatting (on top of global)
- Use `$` formatting consistently: $50,000 not $50k in body copy (`$50k` is fine in tables, headlines, URL slugs).
- Percentages use the `%` symbol, not the word. "10%" not "ten percent."

### Extra banned words (on top of global)

| Word | Use Instead |
|------|-------------|
| facilitate | help, enable |
| tailored | matched, fitted, specific |

### Extra banned phrases (on top of global)
- "At the end of the day"
- "Designed to meet your needs"
- "Your one-stop shop"
- "We understand that..."
- "Here at Quick Lenders, we..."
- "Our team of experts"
- "Financing made easy" (except in the existing tagline where appropriate)

### Sentence Structure (on top of global)
- Avoid starting consecutive sentences with the same word.
- Skip unnecessary qualifiers ("very," "really," "extremely," "highly").

### Brand Colors

| Color | Hex | Usage |
|-------|-----|-------|
| TBD | TBD | Primary |
| TBD | TBD | Secondary |
| TBD | TBD | Accent/CTA |

*(Update these once brand colors are finalized.)*

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
├── /tools                               Tools hub + 26 live tools (authoritative list in the Tools Hub section below)
│   └── /tools/[slug]                     See "Tools Hub" for the 26 live tool routes
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

## Tools Hub — 26 Live Tools

All 26 tools are live, tested, and quality-scanned (full SEO + copy + calculation audit passed Feb 2026: titles 50-60 chars, descriptions 130-170, zero em dashes, zero banned words, all formulas verified, edge cases handled). The tool spec docs are indexed under "Tool Specifications" above.

| P# | Tool | Route |
|----|------|-------|
| P1 | Loan Payment Calculator | `/tools/loan-payment-calculator` |
| P2 | Factor Rate to APR Converter | `/tools/factor-rate-to-apr-calculator` |
| P3 | Loan Finder Quiz | `/tools/loan-finder-quiz` |
| P4 | DSCR Calculator | `/tools/dscr-calculator` |
| P5 | Loan Affordability Calculator | `/tools/loan-affordability-calculator` |
| P6 | Break-Even Calculator | `/tools/break-even-calculator` |
| P7 | Line of Credit Interest Calculator | `/tools/line-of-credit-interest-calculator` |
| P8 | Invoice Factoring Calculator | `/tools/invoice-factoring-calculator` |
| P9 | Equipment Financing Calculator | `/tools/equipment-financing-calculator` |
| P10 | Business Loan Comparison Tool | `/tools/business-loan-comparison-tool` |
| P11 | Working Capital Calculator | `/tools/working-capital-calculator` |
| P12 | SBA Loan Payment Calculator | `/tools/sba-loan-payment-calculator` |
| P13 | ROI Calculator | `/tools/roi-calculator` |
| P15 | Startup Cost Calculator | `/tools/startup-cost-calculator` |
| P16 | Cash Flow Forecast Tool | `/tools/cash-flow-forecast-tool` |
| P17 | Prepayment Penalty Calculator | `/tools/prepayment-penalty-calculator` |
| P18 | Business Valuation Calculator | `/tools/business-valuation-calculator` |
| P19 | Loan Offer Analyzer | `/tools/loan-offer-analyzer` |
| P20 | Loan Rejection Decoder | `/tools/loan-rejection-decoder` |
| P21 | Total Cost of Capital Calculator | `/tools/total-cost-of-capital-calculator` |
| P22 | Refinance Savings Calculator | `/tools/refinance-savings-calculator` |
| P23 | MCA Payback Calculator | `/tools/mca-payback-calculator` |
| P24 | Funding Readiness Assessment | `/tools/funding-readiness-assessment` |
| P25 | Loan Document Checklist | `/tools/loan-document-checklist` |
| P26 | Business Loan Glossary | `/tools/business-loan-glossary` |
| P27 | Interest Rate Comparison Chart | `/tools/interest-rate-comparison-chart` |

### Tool Infrastructure (key files)

| File | What It Does |
|------|-------------|
| `lib/tools-data.tsx` | `ToolData` interface + all 26 tools' metadata; helpers `getToolBySlug`, `getToolsByCategory`, `getLiveTools` |
| `lib/schema.ts` | `softwareApplicationSchema()` for tool pages |
| `components/ToolPageLayout/index.tsx` | Reusable tool-page layout (hero, tool area, SEO content, how-it-works, what-you-get, FAQ, CTA, related tools) |
| `app/tools/page.tsx` | Hub page: category grid, feature cards, value props, FAQ |
| `app/tools/[slug]/` | Each tool: a page + its `*Tool.tsx` component (React Hook Form + Zod, Recharts where charts apply). Per-tool internals live in the component files. |

### Design Decisions
- Hub uses dark blue (`quicklend-900`) background, white cards, amber/gold accents (matches homepage ServicesSection).
- Live tool cards are fully clickable (whole card is a Link).
- Every tool page has 300-500 words of SEO content with internal links + BreadcrumbList + FAQPage + SoftwareApplication schema.
- Tools nav is a dropdown in desktop + mobile header.
- **Adding a tool:** create the component in `app/tools/[slug]/`, add it to `toolsData` in `lib/tools-data.tsx` with status `live`, add the slug to `app/sitemap.ts`.

### Notion Integration
Notion MCP connected and synced. Tools & Features page ID: `30128f46-9059-8196-b6bb-cb702b8db2fb`.

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
