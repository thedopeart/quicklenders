# QuickLenders Content Templates

Copy the relevant template, fill in the bracketed fields, and follow the structure. Every template includes the required SEO elements, internal links, and CTAs.

---

## Blog Article Template

**File location:** `/content/financial-insights/[slug].mdx`
**Word count:** 1,500-2,500 words
**Primary CTA:** Lead form or quiz (depends on intent tier)

### Frontmatter

```yaml
---
title: "[Primary Keyword] — [Benefit or Clarification]"
description: "[140-160 chars with primary keyword and reason to click]"
date: "YYYY-MM-DD"
author: "[Author Name]"
authorRole: "[Title, e.g., Business Financing Specialist]"
category: "[financing-basics | loan-types | industry-guides | credit-building | business-planning]"
primaryKeyword: "[exact keyword from KEYWORDS.md]"
secondaryKeywords: ["keyword 2", "keyword 3"]
relatedProducts: ["term-loans", "lines-of-credit"]
relatedTools: ["loan-payment-calculator", "loan-finder-quiz"]
relatedGlossary: ["term-loan", "apr", "collateral"]
featuredImage: "/images/financial-insights/[slug].jpg"
---
```

### Content Structure

```markdown
# [H1 — Include Primary Keyword Naturally]

[Opening paragraph — 2-3 sentences. State what the reader will learn. Include primary keyword in first 100 words. No fluff, no questions, no "Welcome to."]

[Second paragraph — Why this matters. What's at stake. Establish relevance to their situation.]

## [H2 — Major Section 1]

[Content — 200-400 words. Explain the concept, provide context, use specific examples.]

[Internal link to relevant product page or tool naturally within the content.]

## [H2 — Major Section 2]

[Content — 200-400 words.]

### [H3 — Subsection if needed]

[Content — keep subsections focused.]

## [H2 — Major Section 3]

[Content — 200-400 words.]

[Internal link to glossary term when introducing jargon.]

## [H2 — Practical Application / How-To / Next Steps]

[Content — 200-300 words. Make it actionable. What should they do with this information?]

[Internal link to relevant tool, e.g., "Use our [Loan Payment Calculator](/tools/loan-payment-calculator) to see what your monthly payments might look like."]

## Frequently Asked Questions

### [Question 1 — use actual search queries when possible]

[Answer — 2-4 sentences. Direct and helpful.]

### [Question 2]

[Answer]

### [Question 3]

[Answer]

---

## Ready to Explore Your Options?

[CTA paragraph — 2-3 sentences tailored to article intent. High-intent articles push to lead form. Educational articles push to quiz or tools first.]

[CTA Button: "Get Your Options" → /get-started?source=blog&article=[slug]]

[Secondary CTA: "Not sure which loan fits? [Take the 2-minute quiz](/tools/loan-finder-quiz)" or "Try our [Break-Even Analyzer](/tools/break-even-analyzer) to see if financing makes sense."]
```

### Article Intent Tiers

| Tier | Intent Level | CTA Strategy | Examples |
|------|-------------|--------------|----------|
| 1 | High intent | Direct to lead form | "how to get business loan," "business loan requirements" |
| 2 | Comparison | Tool first, then form | "term loan vs line of credit," "SBA vs conventional" |
| 3 | Industry-specific | Industry CTA language | "restaurant business loans," "trucking financing" |
| 4 | Educational | Soft CTA to quiz/tools | "what is DSCR," "how credit scores work" |

---

## Glossary Term Template

**File location:** `/content/glossary/[term-slug].mdx`
**Word count:** 300-600 words
**Primary CTA:** Contextual based on term relevance

### Frontmatter

```yaml
---
term: "[Term Name]"
slug: "[term-slug]"
definition: "[One-sentence plain-language definition for search snippet]"
category: "[loan-types | financial-metrics | legal-terms | credit-terms | business-terms | loan-process | collateral-types | industry-terms]"
relatedTerms: ["related-term-1", "related-term-2", "related-term-3"]
relatedProducts: ["term-loans"]
relatedTools: ["dscr-calculator"]
difficulty: "[basic | intermediate | advanced]"
---
```

### Content Structure

```markdown
# [Term Name]

**[Term Name]** is [one-sentence definition in plain language]. [Second sentence expanding slightly if needed.]

## How It Works

[2-3 paragraphs explaining the concept in more detail. Use examples. A restaurant owner, a construction company, a retailer — make it concrete.]

[If there's a formula or calculation, show it:]

**Formula:**
```
[Formula here, e.g., DSCR = Net Operating Income / Total Debt Service]
```

[Explain what the numbers mean in plain English.]

## Why It Matters for Business Loans

[1-2 paragraphs explaining why a business owner should care about this term. How does it affect their loan application, their rates, their approval odds?]

[Internal link to relevant product or tool: "See how [term] affects your options with our [Tool Name](/tools/tool-slug)."]

## Example

[Concrete example with numbers. "A landscaping company with $500,000 in annual revenue and $150,000 in debt payments has a DSCR of..."]

## Related Terms

- [Related Term 1](/glossary/related-term-1) — [one-line description]
- [Related Term 2](/glossary/related-term-2) — [one-line description]
- [Related Term 3](/glossary/related-term-3) — [one-line description]

---

[Contextual CTA based on term. For DSCR: "Calculate your DSCR with our [free calculator](/tools/dscr-calculator)." For collateral terms: "Explore [asset-backed loan options](/business-loans/asset-backed-loans)."]
```

---

## Industry Page Template

**File location:** `/content/industries/[industry-slug].mdx`
**Word count:** 1,200-1,800 words
**Primary CTA:** Industry-specific language to lead form

### Frontmatter

```yaml
---
title: "[Industry] Business Loans & Financing"
description: "Financing solutions for [industry] businesses. [Specific benefit]. Get options in minutes."
industry: "[industry-name]"
slug: "[industry-slug]"
primaryKeyword: "[industry] business loans"
secondaryKeywords: ["[industry] financing", "[industry] equipment financing"]
commonLoanTypes: ["equipment-financing", "lines-of-credit", "term-loans"]
typicalLoanRange: "$XX,000 - $X,XXX,000"
featuredImage: "/images/industries/[industry-slug].jpg"
---
```

### Content Structure

```markdown
# [Industry] Business Loans & Financing

[Opening paragraph — What financing challenges does this industry face? What opportunities require capital? Be specific to the industry, not generic.]

[Second paragraph — Quick overview of what financing options work best for this industry and why.]

## Common Financing Needs for [Industry] Businesses

### [Need 1 — e.g., Equipment Purchases]

[2-3 sentences on this specific need. What equipment? What does it cost? Why is financing better than cash?]

### [Need 2 — e.g., Seasonal Cash Flow]

[2-3 sentences.]

### [Need 3 — e.g., Expansion / New Locations]

[2-3 sentences.]

### [Need 4 — e.g., Inventory]

[2-3 sentences.]

## Recommended Loan Types for [Industry]

### [Loan Type 1 — e.g., Equipment Financing]

**Best for:** [specific use case]
**Typical amounts:** $XX,000 - $XXX,000
**Terms:** X-X years

[2-3 sentences on why this loan type works for this industry. Link to product page.]

[Learn more about [Equipment Financing](/business-loans/equipment-financing)]

### [Loan Type 2 — e.g., Business Line of Credit]

**Best for:** [specific use case]
**Typical amounts:** $XX,000 - $XXX,000
**Terms:** Revolving

[2-3 sentences. Link to product page.]

### [Loan Type 3]

[Same structure.]

## What Lenders Look For in [Industry] Businesses

[3-5 bullet points on industry-specific qualification factors. Time in business, revenue thresholds, equipment age, licenses, etc.]

- [Factor 1 with brief explanation]
- [Factor 2]
- [Factor 3]
- [Factor 4]

## [Industry] Financing Scenario

**The situation:** [Concrete example. "Maria owns a 12-table restaurant in Denver..."]

**The need:** [What does she need financing for? How much?]

**The solution:** [What loan type fits? What terms might she expect?]

**The outcome:** [How does the financing help her business?]

## Frequently Asked Questions

### What credit score do I need for a [industry] business loan?

[Answer — be honest about ranges and options for lower scores.]

### How long does it take to get financing for a [industry] business?

[Answer — give realistic timelines.]

### Can I get a [industry] business loan as a startup?

[Answer — honest about startup challenges, point to startup-friendly options.]

### What documents do I need to apply?

[Answer — brief list, link to application checklist.]

---

## Get Financing for Your [Industry] Business

[CTA paragraph with industry-specific language. "Whether you're upgrading your fleet, opening a second location, or managing seasonal cash flow, we can help you find the right financing."]

[CTA Button: "Get Your [Industry] Financing Options" → /get-started?source=industry&industry=[slug]]

[Secondary: "Not sure which loan fits? [Take our 2-minute quiz](/tools/loan-finder-quiz)"]
```

---

## State Page Template

**File location:** `/content/states/[state-slug].mdx`
**Word count:** 800-1,200 words
**Primary CTA:** Lead form with state parameter

### Frontmatter

```yaml
---
title: "Business Loans in [State] — Financing Options for [State] Businesses"
description: "Find business loans in [State]. Compare options, see requirements, and connect with lenders who work with [State] businesses."
state: "[State Name]"
stateAbbr: "[XX]"
slug: "[state-slug]"
primaryKeyword: "business loans [state]"
secondaryKeywords: ["[state] small business loans", "[state] business financing"]
sbaDistrict: "[SBA District Name]"
sbaDistrictUrl: "[URL]"
scoreChapter: "[SCORE Chapter Name]"
scoreChapterUrl: "[URL]"
sbdcUrl: "[State SBDC URL]"
topIndustries: ["industry-1", "industry-2", "industry-3", "industry-4", "industry-5"]
---
```

### Content Structure

```markdown
# Business Loans in [State]

[Opening paragraph — 2-3 sentences. Unique angle on the state's business environment. What industries drive the economy? What's the small business landscape like? This paragraph MUST be unique per state, not templated.]

## Business Loan Options for [State] Businesses

[State] business owners have access to the same core loan types available nationwide, but local factors like industry concentration, cost of living, and regional lenders can affect your options.

### Term Loans

[2-3 sentences. Link to product page.]

### Business Lines of Credit

[2-3 sentences. Link to product page.]

### Equipment Financing

[2-3 sentences. Link to product page.]

### SBA Loans

[2-3 sentences on SBA availability in this state. Mention the SBA district.]

## Top Industries in [State]

[Brief paragraph on the state's economic drivers, then list:]

- **[Industry 1]** — [One sentence on financing needs. Link to industry page if exists.]
- **[Industry 2]** — [One sentence.]
- **[Industry 3]** — [One sentence.]
- **[Industry 4]** — [One sentence.]
- **[Industry 5]** — [One sentence.]

## [State] Small Business Resources

### SBA [District Name] District Office

The [SBA District Name] serves [State] businesses with loan guarantees, counseling, and disaster assistance.

[Link to SBA district]

### SCORE [State/Chapter]

Free mentoring and workshops for [State] entrepreneurs.

[Link to SCORE chapter]

### [State] SBDC

The [State] Small Business Development Center network offers free consulting, training, and market research.

[Link to state SBDC]

## Frequently Asked Questions

### How do I get a business loan in [State]?

[Answer — brief process overview, link to how-it-works.]

### What are the requirements for a business loan in [State]?

[Answer — standard requirements, note any state-specific factors if relevant.]

### Are there [State]-specific business loan programs?

[Answer — mention any state programs if they exist, or note that most financing is national.]

---

## Find Business Financing in [State]

[CTA paragraph — "Whether you're running a [top industry] business in [major city] or a startup in [smaller city], we can help you find the right financing."]

[CTA Button: "Get Your Options in [State]" → /get-started?source=state&state=[state-slug]]
```

---

## Use Case Page Template

**File location:** `/content/use-cases/[use-case-slug].mdx`
**Word count:** 1,000-1,500 words
**Primary CTA:** Use-case-specific language to lead form

### Frontmatter

```yaml
---
title: "Business Loans for [Use Case] — Financing Options"
description: "[Use case] financing for small businesses. See loan options, requirements, and typical terms. Get started in minutes."
useCase: "[use-case-name]"
slug: "[use-case-slug]"
primaryKeyword: "business loan for [use case]"
secondaryKeywords: ["[use case] financing", "[use case] business loan"]
recommendedProducts: ["term-loans", "lines-of-credit"]
typicalAmounts: "$XX,000 - $XXX,000"
---
```

### Content Structure

```markdown
# Business Loans for [Use Case]

[Opening paragraph — What is this use case? Why do businesses need financing for it? What's at stake if they don't have capital?]

## When to Finance [Use Case]

[2-3 scenarios where financing makes sense vs. when it might not. Be honest — financing isn't always the answer.]

**Financing makes sense when:**
- [Scenario 1]
- [Scenario 2]
- [Scenario 3]

**Consider alternatives when:**
- [Scenario where financing might not be ideal]

## Best Loan Types for [Use Case]

### [Loan Type 1]

**Why it works:** [2-3 sentences]
**Typical terms:** [Amount range, term length, rate range]
**Best for:** [Specific sub-scenario]

[Link to product page]

### [Loan Type 2]

[Same structure]

### [Loan Type 3]

[Same structure]

## How Much Can You Borrow for [Use Case]?

[Paragraph on typical loan amounts for this use case. Reference the loan amount pages if relevant.]

| Use Case Scale | Typical Loan Amount | Recommended Product |
|---------------|--------------------|--------------------|
| [Small scale] | $XX,000 - $XX,000 | [Product] |
| [Medium scale] | $XX,000 - $XXX,000 | [Product] |
| [Large scale] | $XXX,000 - $X,XXX,000 | [Product] |

## What Lenders Want to See

[4-5 bullet points on qualification factors specific to this use case.]

- [Factor 1]
- [Factor 2]
- [Factor 3]
- [Factor 4]

## [Use Case] Financing Example

**The business:** [Concrete example]
**The goal:** [What they want to accomplish]
**The financing:** [What they got]
**The result:** [How it helped]

## Frequently Asked Questions

### How fast can I get funding for [use case]?

[Answer]

### Can I get [use case] financing with bad credit?

[Answer — honest about options and limitations]

### What documents do I need?

[Answer — link to application checklist]

---

## Ready to Finance [Use Case]?

[CTA paragraph]

[CTA Button: "Get [Use Case] Financing Options" → /get-started?source=use-case&use_case=[slug]]

[Secondary: Link to relevant tool, e.g., "See if it makes sense with our [Break-Even Analyzer](/tools/break-even-analyzer)"]
```

---

## Loan Amount Page Template

**File location:** `/content/loan-amounts/[amount-slug].mdx`
**Word count:** 800-1,200 words
**Primary CTA:** Amount-specific lead form link

### Frontmatter

```yaml
---
title: "$[Amount] Business Loan — Options, Requirements & Terms"
description: "Get a $[amount] business loan. See qualification requirements, typical terms, and compare options. Apply in minutes."
amount: [number without formatting]
amountFormatted: "$[X]k" or "$[X]M"
slug: "[amount]-business-loan"
primaryKeyword: "$[amount] business loan"
secondaryKeywords: ["[amount] small business loan", "[amount] business financing"]
qualificationTier: "[standard | elevated | premium]"
---
```

### Content Structure

```markdown
# $[Amount] Business Loan

[Opening paragraph — Who typically needs this loan amount? What can it fund? Is this considered small, mid-size, or large in the business lending world?]

## What a $[Amount] Business Loan Can Fund

- **[Use case 1]** — [Brief explanation with example]
- **[Use case 2]** — [Brief explanation]
- **[Use case 3]** — [Brief explanation]
- **[Use case 4]** — [Brief explanation]

## Loan Options for $[Amount]

### [Option 1 — e.g., Term Loan]

**Available amounts:** [Range that includes this amount]
**Typical terms:** [X-X years]
**Estimated monthly payment:** $[X,XXX] - $[X,XXX] at [X-X]% APR

[2-3 sentences on why this option works at this amount level.]

### [Option 2 — e.g., SBA Loan]

[Same structure]

### [Option 3 — e.g., Line of Credit]

[Same structure]

## Qualification Requirements for a $[Amount] Loan

At this loan amount, lenders typically look for:

| Requirement | Minimum | Preferred |
|-------------|---------|-----------|
| Time in Business | [X months/years] | [X+ years] |
| Annual Revenue | $[X] | $[X]+ |
| Credit Score | [XXX] | [XXX]+ |
| Collateral | [Required/Preferred/Optional] | — |

[Paragraph explaining what these requirements mean in practice.]

## Estimated Monthly Payments

| Term | Rate | Monthly Payment | Total Interest |
|------|------|-----------------|----------------|
| [X years] | [X%] | $[X,XXX] | $[XX,XXX] |
| [X years] | [X%] | $[X,XXX] | $[XX,XXX] |
| [X years] | [X%] | $[X,XXX] | $[XX,XXX] |

*Estimates only. Actual rates and terms vary based on qualification.*

[Link: "Calculate your exact payment with our [Loan Payment Calculator](/tools/loan-payment-calculator)"]

## Frequently Asked Questions

### What credit score do I need for a $[amount] business loan?

[Answer]

### How long does it take to get a $[amount] loan?

[Answer]

### Can I get a $[amount] loan as a startup?

[Answer — honest about startup challenges at this amount level]

---

## Get a $[Amount] Business Loan

[CTA paragraph]

[CTA Button: "Check Your $[Amount] Loan Options" → /get-started?source=amount&amount=[amount]]
```

---

## Tool Page Content Wrapper Template

**File location:** Component content within `/app/tools/[tool-slug]/page.tsx`
**Word count:** 300-500 words (around the interactive tool)
**Primary CTA:** Contextual based on tool results

### Structure

```markdown
# [Tool Name]

[1-2 sentence intro above the tool. What does it do? Who is it for?]

[INTERACTIVE TOOL COMPONENT]

## How to Use This [Calculator/Tool]

[3-4 sentences explaining the inputs and what the results mean. Help users interpret the output.]

## Understanding Your Results

### [Result Type 1 — e.g., Monthly Payment]

[2-3 sentences explaining what this number means and what affects it.]

### [Result Type 2 — e.g., Total Interest]

[2-3 sentences.]

### [Result Type 3 — e.g., Break-Even Point]

[2-3 sentences.]

## What's Next?

[Paragraph guiding users based on likely results. "If your DSCR is above 1.25, you're in good shape for most lenders. If it's below 1.0, you may need to explore alternative options."]

[Contextual CTA based on tool type]

## Frequently Asked Questions

### [Question about the tool or underlying concept]

[Answer]

### [Question]

[Answer]

### [Question]

[Answer]

---

## Related Tools

- [Related Tool 1](/tools/tool-1) — [One sentence]
- [Related Tool 2](/tools/tool-2) — [One sentence]

## Related Articles

- [Related Article 1](/financial-insights/article-1)
- [Related Article 2](/financial-insights/article-2)
```

---

## Comparison Page Template

**File location:** `/content/compare/[comparison-slug].mdx`
**Word count:** 1,200-1,800 words
**Primary CTA:** Quiz or lead form depending on comparison type

### Frontmatter

```yaml
---
title: "[Option A] vs [Option B] — Which Is Right for Your Business?"
description: "Compare [Option A] and [Option B]. See the differences in rates, terms, requirements, and best use cases."
slug: "[option-a]-vs-[option-b]"
primaryKeyword: "[option a] vs [option b]"
optionA: "[Option A Name]"
optionB: "[Option B Name]"
optionASlug: "[option-a-slug]"
optionBSlug: "[option-b-slug]"
---
```

### Content Structure

```markdown
# [Option A] vs [Option B]

[Opening paragraph — Frame the decision. When would a business owner face this choice? Why does it matter?]

## Quick Comparison

| Factor | [Option A] | [Option B] |
|--------|-----------|-----------|
| Best for | [Use case] | [Use case] |
| Typical amounts | [Range] | [Range] |
| Terms | [Range] | [Range] |
| Rates | [Range] | [Range] |
| Speed to funding | [Timeframe] | [Timeframe] |
| Credit requirements | [Level] | [Level] |
| Collateral | [Required/Optional] | [Required/Optional] |

## [Option A] Explained

[2-3 paragraphs on Option A. How it works, who it's best for, pros and cons.]

**Pros:**
- [Pro 1]
- [Pro 2]
- [Pro 3]

**Cons:**
- [Con 1]
- [Con 2]

[Link to Option A product page or deeper content]

## [Option B] Explained

[2-3 paragraphs on Option B. Same structure.]

**Pros:**
- [Pro 1]
- [Pro 2]
- [Pro 3]

**Cons:**
- [Con 1]
- [Con 2]

[Link to Option B product page or deeper content]

## When to Choose [Option A]

[3-4 bullet points with specific scenarios]

- [Scenario 1]
- [Scenario 2]
- [Scenario 3]

## When to Choose [Option B]

[3-4 bullet points]

- [Scenario 1]
- [Scenario 2]
- [Scenario 3]

## Can You Use Both?

[Paragraph on whether/how these options can be combined or used sequentially.]

## Frequently Asked Questions

### [Question about the comparison]

[Answer]

### [Question]

[Answer]

### [Question]

[Answer]

---

## Not Sure Which Fits Your Business?

[CTA paragraph pointing to quiz or consultation]

[CTA Button: "Take the Loan Finder Quiz" → /tools/loan-finder-quiz]

[Or: "Talk to an Advisor" → /get-started?source=compare&comparison=[slug]]
```

---

## Case Study / Success Story Template

**File location:** `/content/success-stories/[story-slug].mdx`
**Word count:** 600-1,000 words
**Primary CTA:** Similar situation prompt to lead form

### Frontmatter

```yaml
---
title: "[Business Name/Type]: [Outcome Statement]"
description: "How [business type] secured $[amount] in financing for [purpose]. Read the full story."
slug: "[story-slug]"
businessType: "[Industry]"
loanType: "[Loan Type]"
loanAmount: [number]
loanAmountFormatted: "$XXX,000"
purpose: "[brief purpose]"
isRealStory: [true/false]
# If false, mark as "illustrative example" in content
industry: "[industry-slug]"
---
```

### Content Structure

```markdown
# [Business Name/Type]: [Outcome Statement]

[If isRealStory is false, add this note:]
*This is an illustrative example based on common financing scenarios. Details have been created for educational purposes.*

## The Business

[2-3 sentences describing the business. Industry, size, location, years in operation.]

## The Challenge

[2-3 paragraphs on what they needed financing for and why. What was the business situation? What would happen without financing?]

## The Solution

**Loan type:** [Type]
**Amount:** $[Amount]
**Terms:** [Term length, rate range]
**Time to funding:** [Timeframe]

[1-2 paragraphs on why this loan type fit their situation. What made them a good candidate?]

## The Process

[Brief walkthrough of how it worked. What documents did they need? How long did each step take?]

1. [Step 1]
2. [Step 2]
3. [Step 3]

## The Outcome

[2-3 paragraphs on the results. What did the financing enable? Revenue growth? New equipment? Expansion? Be specific with numbers if available/realistic.]

## Key Takeaways

- [Takeaway 1 — something others can learn from this story]
- [Takeaway 2]
- [Takeaway 3]

---

## Facing a Similar Situation?

[CTA paragraph tailored to the story's industry or use case]

[CTA Button: "Get Your Options" → /get-started?source=case-study&story=[slug]]
```

---

## Resource / Downloadable Guide Template

**File location:** `/content/resources/[resource-slug].mdx`
**Word count:** 400-600 words (landing page for the download)
**Primary CTA:** Email capture to download

### Frontmatter

```yaml
---
title: "[Resource Name] — Free Download"
description: "[What the resource is]. Download the free [PDF/checklist/guide]."
slug: "[resource-slug]"
resourceType: "[checklist | guide | template | worksheet]"
downloadFile: "/downloads/[filename].pdf"
primaryKeyword: "[resource topic] checklist/guide"
---
```

### Content Structure

```markdown
# [Resource Name]

[Opening paragraph — What is this resource? Who is it for? What will they learn/get from it?]

## What's Inside

[Bullet list of what the resource covers]

- [Item 1]
- [Item 2]
- [Item 3]
- [Item 4]
- [Item 5]

## Who This Is For

[1-2 sentences on the target audience. "This checklist is for business owners preparing to apply for their first business loan" or "This guide is for businesses comparing equipment financing vs. leasing."]

[EMAIL CAPTURE FORM COMPONENT]

*We'll send the [PDF/guide/checklist] to your inbox. No spam, just the resource you requested.*

## Preview

[Optional: Show a preview image of the resource or list the first few items]

---

## Related Resources

- [Related Resource 1](/resources/resource-1)
- [Related Resource 2](/resources/resource-2)

## Related Articles

- [Related Article](/financial-insights/article-slug)
```

---

## How It Works Page Template

**File location:** `/app/how-it-works/page.tsx` (or MDX)
**Word count:** 600-800 words

### Structure

```markdown
# How It Works

[Opening paragraph — Brief overview of the process. Set expectations. "Getting business financing doesn't have to be complicated. Here's how we help you find the right loan."]

## Step 1: Tell Us About Your Business

[2-3 sentences. What information do we ask for? Why? How long does it take?]

[Mention: "Fill out our quick form — it takes about 2 minutes."]

## Step 2: We Review Your Options

[2-3 sentences. What happens after they submit? Who reviews it? What are we looking for?]

## Step 3: Get Matched with Lenders

[2-3 sentences. How do we match them? What kind of lenders? How many options?]

## Step 4: Compare Your Offers

[2-3 sentences. What will they receive? How do they compare? No obligation.]

## Step 5: Choose and Fund

[2-3 sentences. What happens when they accept? How fast is funding?]

## What Makes Us Different

[3-4 bullet points on differentiators]

- [Differentiator 1]
- [Differentiator 2]
- [Differentiator 3]

## Frequently Asked Questions

### How long does the process take?

[Answer]

### Is there a cost to use Quick Lenders?

[Answer — explain the business model honestly]

### Will this affect my credit score?

[Answer]

### What if I don't like the offers I receive?

[Answer — no obligation]

---

## Ready to Get Started?

[CTA paragraph]

[CTA Button: "Get Your Options" → /get-started?source=how-it-works]

[Secondary: "Have questions? [Book a call](/book-a-call) with our team."]
```
