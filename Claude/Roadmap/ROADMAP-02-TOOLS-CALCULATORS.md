# Roadmap Part 2: Tools & Calculators

**What this covers:** Every interactive tool on the site — the 4 that already have spec docs, plus 7 new ones. These tools serve three purposes: they capture organic search traffic, they provide genuine value that builds trust, and they create natural opportunities to capture leads.

**When to build:** Start immediately after the lead form is live. Tools without a lead form are just free services. Tools with a lead form are a conversion engine.

**Dependencies:** Lead capture form must be functional first (Roadmap 01). Tools hub page should go up with the first tool.

---

## How Tools Fit the Business

Every tool on the site exists to do three things:

1. **Rank in search.** People search for "business loan calculator" and "how much business loan can I afford." These are high-intent queries with meaningful volume. Each tool is a landing page that captures that traffic.

2. **Build trust and authority.** A business owner who uses your calculator, gets helpful results, and sees your content is more likely to fill out your lead form than someone who lands on a generic loan product page. The tool proves you know what you're talking about before you ever ask for their information.

3. **Create a lead capture moment.** Every tool result is an opportunity: "Want these results emailed to you?" or "Based on your numbers, a term loan looks like a fit. Want to talk through your options?" The transition from tool result to lead form should feel like a natural next step, not a sales pitch.

### The Tools Hub

**Route:** `/tools`
**Spec:** `00-TOOLS-ECOSYSTEM-STRATEGY.md`

This page lists all available tools with brief descriptions and links. It goes up when the first tool launches and grows as you add more. It also ranks for "business loan tools" and "business financing calculators" as a collection page.

Each tool card on the hub should show: tool name, one-sentence description, and a visual preview or icon. Group them by use case: "Figure Out What You Need" (quiz, affordability, working capital), "Run the Numbers" (payment, break-even, cash flow, DSCR, equipment vs lease), "Compare Options" (loan comparison), "Check Eligibility" (SBA checker).

---

## Already Spec'd — Build First

These four tools have complete specification documents with detailed requirements, user flows, data models, and technical implementation notes. The specs are in the `/mnt/user-data/outputs/` directory.

### Tool 1: Loan Finder Quiz
**Route:** `/tools/loan-finder-quiz`
**Spec:** `02-LOAN-FINDER-QUIZ-SPEC.md`
**Build priority:** 1st

A 5-7 question guided quiz that recommends a loan product based on the user's answers. This is the single most valuable tool because it serves users who don't know what they need yet — which is most first-time borrowers.

**Why it's first:** It captures the widest funnel. Someone searching "what kind of business loan should I get" is an ideal prospect, and this tool is the perfect answer. The quiz also naturally leads to the lead form: "We recommend a term loan. Want to discuss your options with an advisor?"

**Key conversion point:** After showing results, offer to email the results (captures email) and show a CTA to the lead form pre-filled with the recommended loan type: `/get-started?loan_type=term-loan&source=quiz-result`. The quiz result page should feel like a mini-consultation, not just a label.

**SEO targets:** "what business loan do I need," "business loan quiz," "which business loan is right for me," "loan finder quiz"

**Content wrapper:** The quiz page should have 300-500 words of SEO content above and below the interactive tool: an intro explaining what the quiz does and who it's for, and a section below explaining the loan types briefly with links to the full product pages. This content helps the page rank — interactive tools alone don't give Google much to index.

### Tool 2: Break-Even Loan Analyzer
**Route:** `/tools/break-even-analyzer`
**Spec:** `03-BREAK-EVEN-ANALYZER-SPEC.md`
**Build priority:** 2nd

Calculates how long it takes for a loan-funded investment to pay for itself. Users input the loan details and expected revenue increase, and the tool shows the break-even timeline with a visual chart.

**Why it's second:** This tool targets a specific, high-intent question: "Is this loan worth it?" Someone using this tool is seriously considering borrowing. They're further along in the decision process than a quiz taker.

**Key conversion point:** "Email me this analysis" (captures email + sends a PDF-style summary) and "Your numbers look strong — want to explore your options?" → lead form. If the break-even timeline is short (under 12 months), the CTA can be more assertive: "With a [X]-month break-even, this investment could pay for itself quickly."

**SEO targets:** "business loan break even calculator," "is a business loan worth it calculator," "loan ROI calculator," "break even analysis tool"

### Tool 3: Business Financing Glossary
**Route:** `/glossary` (hub) and `/glossary/[term]` (individual terms)
**Spec:** `01-GLOSSARY-ENCYCLOPEDIA-SPEC.md`
**Build priority:** 3rd

120+ business financing terms, each with its own page. This is less a "tool" and more a content asset, but it functions like one: searchable, filterable, and it generates massive long-tail organic traffic.

**Why it's third:** The glossary is a long-term SEO play. Each term page targets "[term] definition" and "[term] meaning" searches. Individually these are low volume, but 120+ pages covering every financing term adds up to significant traffic. More importantly, every glossary page links to relevant loan products, tools, and blog articles — it's the connective tissue of the whole site.

**Rollout strategy (from the spec):**
- Phase 1: 30 highest-value terms (the ones most directly related to your loan products)
- Phase 2: 40 more terms (broader financing concepts)
- Phase 3: 30 remaining terms (niche/advanced)

Don't try to launch all 120 at once. The first 30 give you 80% of the value. Expand from there.

**Key conversion point:** Each term page has a contextual CTA: "Understanding [term] is important when evaluating [loan type]. See your options →" linking to the relevant product page. The glossary hub page can also promote the quiz: "Not sure where to start? Take our Loan Finder Quiz."

**SEO targets:** "[term] definition," "[term] meaning," "[term] explained," "what is [term] in business lending"

### Tool 4: Equipment Financing vs. Leasing Calculator
**Route:** `/tools/equipment-financing-vs-leasing`
**Spec:** `04-EQUIPMENT-VS-LEASING-SPEC.md`
**Build priority:** 4th

Side-by-side comparison of financing vs. leasing equipment, including MACRS depreciation, Section 179 deductions, and total cost of ownership over time.

**Why it's fourth:** This is the most specialized tool. It targets a specific, well-defined audience: business owners deciding whether to buy or lease equipment. Smaller addressable market than the quiz or glossary, but very high intent and very specific to one of your loan products.

**Key conversion point:** The result page shows a clear recommendation (finance vs. lease) with dollar figures. "Based on your inputs, financing saves you $X over [term]. Want to discuss equipment financing options?" → `/get-started?loan_type=equipment-financing&source=equipment-calculator`

**SEO targets:** "equipment financing vs leasing calculator," "should I finance or lease equipment," "equipment loan vs lease comparison," "section 179 calculator"

---

## New Tools — Build After the Core Four

These tools don't have spec docs yet. Build them in roughly this order based on search volume, implementation complexity, and conversion potential.

### Tool 5: Loan Payment Calculator
**Route:** `/tools/loan-payment-calculator`
**Build priority:** 5th (but could swap with Tool 3 or 4 given how simple it is)

The most basic, most searched-for calculator in business lending. Every competitor has one. If you don't, you're conceding that traffic to them.

**What it does:** User enters loan amount, interest rate, and term length. Tool outputs monthly payment, total interest paid, total cost of loan, and an amortization table showing how each payment splits between principal and interest.

**Inputs:**
| Field | Type | Default | Range |
|---|---|---|---|
| Loan amount | Currency slider + text input | $100,000 | $5,000–$10,000,000 |
| Annual interest rate | Percentage slider + text input | 10% | 1%–30% |
| Loan term | Dropdown or slider | 3 years | 6 months–10 years |
| Payment frequency | Toggle | Monthly | Monthly / Bi-weekly / Weekly |

**Outputs:**
- Monthly (or weekly/bi-weekly) payment amount — large, prominent
- Total interest over the life of the loan
- Total cost (principal + interest)
- Amortization table: expandable/collapsible, showing each payment period with payment amount, principal portion, interest portion, and remaining balance
- Amortization chart: line graph showing principal vs. interest over time (Recharts)

**Why build it:** This tool targets "business loan payment calculator" and "business loan calculator" — two of the highest-volume search terms in this space. The tool itself is simple to build (standard amortization formula), but it's a gateway. Someone who calculates a payment is actively considering borrowing. The result page is a perfect place for: "Like what you see? Get your options →"

**Implementation notes:** The math is a standard amortization formula: `M = P[r(1+r)^n]/[(1+r)^n-1]` where M = payment, P = principal, r = periodic rate, n = number of payments. All computation is client-side. Use Recharts for the amortization chart. The amortization table can be paginated or virtualized if the loan term is long.

**Content wrapper:** Include a section explaining how business loan interest works, the difference between fixed and variable rates, and what factors affect your rate. Link to relevant glossary terms (APR, amortization, fixed rate, variable rate). This content helps the page rank and keeps people on site longer.

**Lead capture moments:**
- "Email me this amortization schedule" → captures email
- "These numbers are estimates. Want to see real rates for your business?" → lead form
- If monthly payment is high relative to amount → "Worried about the payment? A line of credit might offer more flexibility." → quiz or line-of-credit product page

### Tool 6: Loan Comparison Tool
**Route:** `/tools/loan-comparison`
**Build priority:** 6th

Side-by-side comparison of 2-3 loan scenarios. For people who already have offers (or are comparing hypothetical scenarios) and want to see which deal is better.

**What it does:** User enters details for up to 3 loan options. Tool shows monthly payment, total cost, total interest, and effective APR for each, with a visual comparison chart and a "winner" callout.

**Inputs (per loan):**
| Field | Type |
|---|---|
| Loan name / label | Text (e.g., "Bank of America offer") |
| Loan amount | Currency |
| Interest rate | Percentage |
| Term | Duration |
| Origination fee | Currency or percentage |
| Other fees | Currency |

Start with 2 loans shown, "Add a third option" button to expand.

**Outputs:**
- Side-by-side table: monthly payment, total interest, total fees, total cost (interest + fees), effective APR
- Bar chart comparing total cost of each option (Recharts)
- "Winner" callout: "Option A saves you $X,XXX over the life of the loan"
- Breakdown of where the money goes for each option (principal, interest, fees) — stacked bar or donut chart

**Why build it:** Captures "compare business loans" and "business loan comparison calculator." More importantly, people using this tool may already have a competing offer. This is your chance to say: "Found a better deal? Let us see if we can match or beat it." → lead form. You're catching people at the decision stage.

**Content wrapper:** Write about what to look for when comparing loan offers: APR vs. interest rate, the impact of origination fees, prepayment penalties, hidden costs. Link to glossary terms. This is genuinely useful content that also helps the page rank.

### Tool 7: Business Loan Affordability Calculator
**Route:** `/tools/affordability-calculator`
**Build priority:** 7th

Answers the question most borrowers start with: "How much can I afford to borrow?"

**What it does:** User enters their business financials. Tool calculates the maximum loan amount they can comfortably afford at various rate/term combinations, based on debt service coverage ratios.

**Inputs:**
| Field | Type |
|---|---|
| Monthly gross revenue | Currency |
| Monthly operating expenses | Currency |
| Existing monthly debt payments | Currency |
| Desired max payment-to-revenue ratio | Percentage (default 15%, slider 5-30%) |

**Outputs:**
- Net operating income (revenue - expenses)
- Current debt service coverage ratio (DSCR)
- Maximum comfortable monthly payment
- Affordable loan amount table: grid showing max loan amount at different rate/term combinations
- Risk assessment: "At your current financials, you could comfortably support a loan up to $[X]" with color-coded risk levels (conservative / moderate / aggressive)

**Why build it:** Flips the typical calculator on its head. Instead of "what's my payment on $X?" it's "how much should I borrow?" This is the first question most borrowers have, and answering it builds trust. The tool also naturally captures the user's financial profile — which makes for a very informed follow-up call if they become a lead.

**Lead capture:** "We calculated that you can comfortably afford up to $[X]. Want to see what rates you'd qualify for?" → lead form. This tool pre-qualifies in a way — the user has already assessed their own affordability.

### Tool 8: DSCR Calculator
**Route:** `/tools/dscr-calculator`
**Build priority:** 8th

Simple calculator that computes Debt Service Coverage Ratio and explains what it means.

**What it does:** User enters net operating income and total debt payments. Tool calculates DSCR and explains whether it's strong, borderline, or weak, with context about what lenders typically require.

**Inputs:**
| Field | Type |
|---|---|
| Annual net operating income | Currency |
| Annual debt service (existing) | Currency |
| Proposed new annual debt service | Currency (optional — "adding a new loan?") |

**Outputs:**
- Current DSCR (NOI ÷ existing debt service)
- Projected DSCR (NOI ÷ (existing + proposed debt service))
- Interpretation: 1.25+ = strong (most lenders approve), 1.0-1.25 = borderline (some lenders, higher rates), below 1.0 = doesn't cover debt (very difficult to get approved)
- What lenders typically look for by loan type (table)
- Tips to improve DSCR: increase revenue, cut expenses, pay down existing debt, extend loan term

**Why build it:** DSCR is one of the most important metrics lenders use, but most borrowers have never heard of it. This tool educates and qualifies simultaneously. Someone with a 1.4 DSCR who learns they're in great shape is ready to borrow. Someone at 0.9 learns they need to improve first — and you've earned their trust by being honest about it.

**Cross-linking:** Link heavily to the DSCR glossary term. Also link to the affordability calculator (related but different angle) and the break-even analyzer (different decision point in the same journey).

### Tool 9: Cash Flow Forecasting Tool
**Route:** `/tools/cash-flow-forecast`
**Build priority:** 9th

Projects how a loan will impact monthly cash flow over 12 months.

**What it does:** User enters current financials and loan details. Tool generates a month-by-month projection showing cash flow with and without the loan, including the expected revenue impact of the investment.

**Inputs:**
| Field | Type |
|---|---|
| Current monthly revenue | Currency |
| Current monthly expenses | Currency |
| Loan amount | Currency |
| Interest rate | Percentage |
| Loan term | Duration |
| Expected monthly revenue increase from investment | Currency or percentage |
| Months until revenue increase kicks in | Number (ramp-up period) |

**Outputs:**
- 12-month cash flow table: month, revenue, expenses, loan payment, net cash flow — two columns (with loan vs. without loan)
- Line chart: net cash flow over 12 months, both scenarios overlaid (Recharts)
- Break-even month highlighted (when cumulative benefit exceeds cumulative loan cost)
- Monthly cash reserve tracker: starting cash + cumulative net flow
- Risk flag: if any month shows negative cash flow, highlight it with a warning

**Why build it:** This is more sophisticated than the break-even analyzer — it models the full picture including the ramp-up period where you're paying on the loan but haven't yet seen the revenue benefit. This is the realistic scenario most borrowers face, and showing it honestly builds massive trust.

**Content wrapper:** Write about how to think about cash flow when taking on debt, the concept of a "cash flow trough" (the period after borrowing before ROI kicks in), and how to prepare for it. This is genuinely valuable educational content.

### Tool 10: SBA Loan Eligibility Checker
**Route:** `/tools/sba-eligibility-checker`
**Build priority:** 10th

A guided questionnaire that checks whether a business qualifies for SBA loans.

**What it does:** Asks 8-10 yes/no or multiple-choice questions based on SBA eligibility criteria. Returns a result showing which SBA programs (7(a), 504, Microloans) the business might qualify for, or explains why they might not qualify and what alternatives exist.

**Questions to ask:**
1. Is your business for-profit? (required for all SBA)
2. Is your business located in the US? (required)
3. Does the owner have US citizenship or lawful permanent residency? (required)
4. How long has the business been operating? (affects program eligibility)
5. What's your approximate annual revenue? (size standards)
6. What industry is your business in? (size standards vary by NAICS code)
7. Have you been declined by a bank? (SBA requires "credit elsewhere" test for some programs)
8. Does the business have any outstanding federal debt? (disqualifying)
9. Has any owner been convicted of a felony in the past 5 years? (affects eligibility)
10. What will you use the funds for? (determines 7(a) vs. 504 vs. Microloan)

**Results page:**
- For each SBA program: eligible / likely eligible / not eligible, with brief explanation
- If eligible: "Great news — you likely qualify for SBA [program]. These loans typically offer..." then explain rates, terms, and benefits
- If not eligible: "SBA loans may not be available for your situation, but here's what we can help with:" → link to alternative loan products
- In either case: "Want to discuss your options?" → lead form

**Why build it:** "SBA loan eligibility" is a high-volume search. Even though QuickLenders may not directly offer SBA loans, this tool captures that traffic. For eligible businesses, you can connect them with SBA-preferred lenders in your network. For ineligible businesses, you redirect them to your actual products. It's a win either way.

**Important:** Include a disclaimer that this tool provides a preliminary assessment only and is not a guarantee of eligibility. Actual SBA eligibility is determined by the lender and the SBA.

### Tool 11: Working Capital Calculator
**Route:** `/tools/working-capital-calculator`
**Build priority:** 11th

Shows how much working capital a business needs and whether they have enough.

**What it does:** User enters current assets, current liabilities, and monthly operating expenses. Tool calculates working capital, working capital ratio, and recommended reserves based on industry benchmarks. If there's a gap, it recommends a loan amount.

**Inputs:**
| Field | Type |
|---|---|
| Current assets (cash, receivables, inventory) | Currency |
| Current liabilities (payables, short-term debt) | Currency |
| Monthly operating expenses | Currency |
| Industry | Dropdown (for benchmarking) |
| Seasonal variation? | Yes/No + peak/low months if yes |

**Outputs:**
- Current working capital (assets - liabilities)
- Working capital ratio (assets ÷ liabilities) — above 1.5 is healthy, 1.0-1.5 is tight, below 1.0 is a problem
- Recommended reserve: typically 3-6 months of operating expenses (adjusts by industry)
- Gap analysis: "You have $X in working capital. For your industry, we'd recommend $Y. You're $Z short."
- If seasonal: "During your slow months, your working capital could drop to $X, creating a gap of $Y."
- Recommended loan amount: the gap amount, rounded to a clean number
- Recommended loan type: line of credit (for cyclical gaps) or term loan (for structural gaps)

**Why build it:** "Working capital" is one of the top reasons businesses seek financing. This tool diagnoses the problem and prescribes a solution — which happens to be one of your products. The tool also captures financial data that makes your follow-up call much more informed.

---

## Tool Design Principles

Apply these to every tool:

### Content Wrapper
Every tool page needs 300-500 words of written content around the interactive element. Google can't index JavaScript interactivity — it indexes text. Include:
- Intro: what the tool does, who it's for, what you'll learn (above the tool)
- Educational section: deeper explanation of the concepts involved (below the tool)
- FAQ section with schema markup: "How is [metric] calculated?" "What's a good [metric]?" (bottom)
- Internal links: to glossary terms, relevant loan product pages, and related tools

### Mobile-First
Most visitors will be on phones. Every tool must work perfectly on a 375px screen. Sliders are tricky on mobile — always include a text input alternative. Tables should scroll horizontally or stack vertically. Charts need to be legible at small sizes.

### Results Sharing
Every tool result page should offer:
- "Email me these results" (captures email, adds to nurture sequence)
- "Share these results" (generates a shareable URL with inputs encoded in query params)
- "Download PDF" (for the more complex tools — break-even, cash flow, equipment comparison)

### Progressive Disclosure
Don't show all inputs at once. Start with the essential fields, show results, then offer "Refine your calculation" to add more variables. This reduces perceived complexity and gets users to a result faster.

### Speed
All calculations must be client-side. No server round-trips for math. The tools should feel instant — input a number, see the output change immediately. Use React state, not form submissions.

---

## Build Sequence Summary

| Order | Tool | Complexity | Search Volume | Conversion Value | Spec Exists? |
|---|---|---|---|---|---|
| 1 | Loan Finder Quiz | Medium | High | Very high | ✅ Yes |
| 2 | Break-Even Analyzer | Medium | Medium | High | ✅ Yes |
| 3 | Glossary (30 terms) | High (volume) | Very high (combined) | Medium | ✅ Yes |
| 4 | Equipment vs. Leasing | Medium-High | Medium | High | ✅ Yes |
| 5 | Loan Payment Calculator | Low | Very high | Medium | ❌ Needs spec |
| 6 | Loan Comparison Tool | Medium | Medium | High | ❌ Needs spec |
| 7 | Affordability Calculator | Medium | Medium-High | High | ❌ Needs spec |
| 8 | DSCR Calculator | Low | Medium | Medium | ❌ Needs spec |
| 9 | Cash Flow Forecast | High | Medium | High | ❌ Needs spec |
| 10 | SBA Eligibility Checker | Medium | High | Medium | ❌ Needs spec |
| 11 | Working Capital Calculator | Medium | Medium | Medium | ❌ Needs spec |

After the first 4 (which have specs), the loan payment calculator is the best next build — it's the simplest to implement and has the highest raw search volume. From there, work down the list. You don't need to build all 11 before launching other parts of the roadmap. The tools are additive — each one adds traffic and conversion surface area, but the site works fine at any point along the way.
