# Tool Spec: Lender Red Flag Detector

**Tool Number:** 16
**Route:** `/tools/loan-offer-analyzer`
**Priority:** High (Differentiation Play)
**Primary Keyword:** "predatory business loan" (est. 500-1k monthly searches, low competition)
**Secondary Keywords:** "MCA red flags," "bad business loan terms," "is my loan offer good," "business loan scam," "confession of judgment business loan"

---

## Purpose

Help business owners identify predatory terms, hidden fees, and red flags in loan offers they've received. Users either manually input key terms OR upload their offer document for analysis.

**Why this is different:**
- Nobody else does this
- Positions QuickLenders as the honest broker / consumer advocate
- Builds massive trust ("they helped me avoid a bad deal")
- Creates content opportunities around each red flag type
- Highly shareable ("run your offer through this before signing")

**Target users:**
- Business owners who received an MCA or online loan offer
- Anyone comparing multiple loan offers
- Users who feel something is "off" about their offer
- People researching before signing

---

## The Problem This Solves

Predatory business lending is rampant:
- MCAs with 100%+ effective APR disguised as "1.4 factor rate"
- Confession of judgment clauses that waive legal rights
- Daily payment structures that crush cash flow
- Personal guarantees that put homes at risk
- Stacking penalties that trigger if you get another loan
- Prepayment penalties buried in fine print

Most business owners don't know what to look for. This tool educates them while building trust in QuickLenders.

---

## Input Methods

### Method 1: Manual Input (Primary)

Guided questionnaire about the loan offer:

**Section 1: Basic Terms**
| Field | Type | Options/Notes |
|-------|------|---------------|
| Loan/Advance Amount | Currency | |
| How is cost expressed? | Select | APR / Factor Rate / Fee Amount / Not Sure |
| Cost Amount | Number | APR %, factor rate, or $ |
| Repayment Term | Number + Unit | Days, weeks, or months |
| Payment Frequency | Select | Daily / Weekly / Monthly |
| Payment Amount | Currency | Per payment |

**Section 2: Red Flag Checklist**
| Question | Type | Red Flag If... |
|----------|------|----------------|
| Does the agreement mention "confession of judgment"? | Yes/No/Not Sure | Yes |
| Does it require a personal guarantee? | Yes/No/Not Sure | Check scope |
| Are there prepayment penalties? | Yes/No/Not Sure | Yes (check amount) |
| Is there a "stacking" or "future financing" restriction? | Yes/No/Not Sure | Yes |
| Does it mention UCC lien or blanket lien? | Yes/No/Not Sure | Explain implications |
| Are payments withdrawn automatically (ACH)? | Yes/No/Not Sure | Daily = concern |
| Is there a "reconciliation" clause? | Yes/No/Not Sure | Yes (MCA loophole) |
| Does it reference "purchase of future receivables"? | Yes/No/Not Sure | This is an MCA |

**Section 3: Lender Details**
| Field | Type | Notes |
|-------|------|-------|
| Lender Name | Text | Optional — for user reference only |
| How did they contact you? | Select | I applied / They called me / Email / Mail |
| How quickly are they pressuring you to sign? | Select | No pressure / Within days / Within hours |

### Method 2: Document Upload (Future Enhancement)

Allow users to upload their loan agreement PDF for automated scanning.

**Technical approach:**
- OCR the document
- Search for red flag keywords/phrases
- Extract key terms (amount, rate, payment)
- Flag specific clauses

**Privacy considerations:**
- Process client-side if possible
- Don't store documents
- Clear privacy messaging

---

## Red Flag Database

### Critical Red Flags (Immediate Warnings)

| Red Flag | What It Means | Severity |
|----------|--------------|----------|
| **Confession of Judgment** | You waive your right to defend yourself in court. Lender can seize assets without notice. | 🔴 Critical |
| **Factor Rate > 1.4** | Effective APR likely exceeds 50-100%. | 🔴 Critical |
| **Daily Payments** | Creates cash flow strain; accelerates effective APR. | 🔴 Critical |
| **Term < 6 months** | Very short terms = very high effective APR. | 🔴 Critical |
| **High-pressure tactics** | "Sign today or offer expires" = predatory. | 🔴 Critical |
| **No APR disclosure** | Hiding the true cost. Required by law in some states. | 🔴 Critical |

### Serious Concerns (Proceed with Caution)

| Red Flag | What It Means | Severity |
|----------|--------------|----------|
| **Blanket UCC Lien** | Lender has claim on ALL business assets. | 🟠 Serious |
| **Personal Guarantee (unlimited)** | Your personal assets (home, savings) at risk. | 🟠 Serious |
| **Prepayment Penalty > 3%** | Expensive to refinance or pay off early. | 🟠 Serious |
| **Stacking Prohibition** | Can't get other financing without permission. | 🟠 Serious |
| **No Reconciliation (for MCA)** | If sales drop, payments don't adjust. | 🟠 Serious |
| **Origination Fee > 3%** | High upfront cost added to loan. | 🟠 Serious |

### Yellow Flags (Understand Before Signing)

| Yellow Flag | What It Means | Severity |
|-------------|--------------|----------|
| **Personal Guarantee (limited)** | Normal for small business loans, but understand scope. | 🟡 Caution |
| **UCC-1 Filing** | Standard, but understand what's liened. | 🟡 Caution |
| **Variable Rate** | Payments could increase. | 🟡 Caution |
| **Prepayment Penalty (any)** | May limit future flexibility. | 🟡 Caution |
| **Auto-renewal clause** | Loan renews automatically unless you opt out. | 🟡 Caution |

---

## Outputs

### Primary Output: Red Flag Report Card

```
┌─────────────────────────────────────────────────────────────┐
│  Loan Offer Analysis                                        │
│                                                             │
│  Overall Assessment:                                        │
│                                                             │
│  ┌─────────────────────────────────────────────────────┐   │
│  │                                                     │   │
│  │     ⚠️ PROCEED WITH CAUTION                        │   │
│  │                                                     │   │
│  │     We found 2 critical issues and                  │   │
│  │     3 items that need attention.                    │   │
│  │                                                     │   │
│  └─────────────────────────────────────────────────────┘   │
│                                                             │
│  🔴 Critical Issues (2)                                    │
│  🟠 Serious Concerns (1)                                   │
│  🟡 Items to Understand (2)                                │
│  ✅ No Issues Found (4)                                    │
│                                                             │
└─────────────────────────────────────────────────────────────┘
```

### Secondary Output: Detailed Findings

```
┌─────────────────────────────────────────────────────────────┐
│  🔴 CRITICAL: Confession of Judgment Clause                 │
│  ─────────────────────────────────────────────────────────  │
│                                                             │
│  What we found: Your offer contains a confession of         │
│  judgment (also called "cognovit note").                    │
│                                                             │
│  Why this matters: This clause means you waive your         │
│  right to defend yourself in court. If you miss a           │
│  payment, the lender can obtain a judgment against you      │
│  immediately — without notifying you and without you        │
│  having a chance to respond.                                │
│                                                             │
│  What you should do:                                        │
│  • This is banned in many states (CA, NY, NJ, and others)  │
│  • Even if legal in your state, it's a major red flag      │
│  • Strongly consider walking away from this offer          │
│  • If you proceed, consult an attorney first               │
│                                                             │
│  [Learn more about confession of judgment →]               │
│                                                             │
└─────────────────────────────────────────────────────────────┘

┌─────────────────────────────────────────────────────────────┐
│  🔴 CRITICAL: Effective APR Exceeds 75%                     │
│  ─────────────────────────────────────────────────────────  │
│                                                             │
│  What we calculated:                                        │
│  Factor rate 1.35 + 6-month term + daily payments           │
│  = approximately 85% APR                                    │
│                                                             │
│  For comparison:                                            │
│  • SBA loans: 6-10% APR                                    │
│  • Bank term loans: 7-15% APR                              │
│  • Online term loans: 15-35% APR                           │
│  • Your offer: ~85% APR                                    │
│                                                             │
│  You would pay $17,500 in fees on a $50,000 advance.       │
│                                                             │
│  [See what rates you might qualify for →]                  │
│                                                             │
└─────────────────────────────────────────────────────────────┘
```

### Tertiary Output: True Cost Summary

```
┌─────────────────────────────────────────────────────────────┐
│  True Cost of This Offer                                    │
│                                                             │
│  Amount you receive:         $50,000                        │
│  Total you repay:            $67,500                        │
│  Total cost of financing:    $17,500                        │
│                                                             │
│  Effective APR:              ~85%                           │
│  Daily payment:              $259.62                        │
│  Payment term:               6 months (130 business days)   │
│                                                             │
│  ─────────────────────────────────────────────────────────  │
│                                                             │
│  What $50,000 would cost with other options:               │
│                                                             │
│  SBA Loan (8% APR, 10 yr):      $6,080 total interest      │
│  Bank Term Loan (12%, 5 yr):    $8,400 total interest      │
│  Online Term Loan (25%, 3 yr):  $10,500 total interest     │
│  This Offer:                    $17,500 total cost         │
│                                                             │
└─────────────────────────────────────────────────────────────┘
```

### Final Output: Recommendation

```
┌─────────────────────────────────────────────────────────────┐
│  Our Recommendation                                         │
│                                                             │
│  Based on our analysis, we suggest you:                     │
│                                                             │
│  1. DO NOT sign this offer without exploring alternatives   │
│                                                             │
│  2. The confession of judgment clause alone is reason       │
│     enough to walk away                                     │
│                                                             │
│  3. The effective cost (85% APR) is significantly higher   │
│     than what many businesses qualify for                   │
│                                                             │
│  ─────────────────────────────────────────────────────────  │
│                                                             │
│  You may have better options. Many business owners          │
│  accept expensive financing because they don't know         │
│  what else is available.                                    │
│                                                             │
│  ┌─────────────────────────────────────────────────────┐   │
│  │  See what you actually qualify for — it takes       │   │
│  │  2 minutes and won't affect your credit.            │   │
│  │                                                     │   │
│  │  [ Check Your Options ]                             │   │
│  └─────────────────────────────────────────────────────┘   │
│                                                             │
└─────────────────────────────────────────────────────────────┘
```

---

## Content Wrapper (SEO)

### Above the Tool (150 words)

```markdown
# Loan Offer Analyzer: Spot Red Flags Before You Sign

Not sure if your business loan offer is fair? This tool analyzes 
loan terms and flags predatory practices, hidden fees, and 
dangerous clauses.

**What we check for:**
- Confession of judgment clauses (illegal in many states)
- True APR vs. disguised factor rates
- Predatory prepayment penalties
- Dangerous personal guarantee terms
- Cash flow crushing payment schedules

Enter your loan offer details below. We'll tell you what's normal, 
what's concerning, and what you should never sign.

*We don't store your information or share it with lenders.*
```

### Below the Tool (500+ words)

```markdown
## Understanding Predatory Business Lending

Unlike consumer loans, business loans have fewer regulations. This 
creates opportunities for predatory lenders to use confusing terms 
and dangerous contract clauses.

### The Most Dangerous Loan Terms

**Confession of Judgment**

A confession of judgment (or "cognovit note") means you agree in 
advance to let the lender win any lawsuit against you. If you miss 
a payment, they can get a judgment without going to court — and 
potentially seize your bank account or assets without warning.

These clauses are banned in many states (including California, 
New York, and New Jersey) but still appear in loans issued from 
other states.

[Read more: What is Confession of Judgment? →](/glossary/confession-of-judgment)

**Factor Rates vs. APR**

Merchant cash advances use "factor rates" (like 1.35) instead of 
APR to make costs seem lower. A 1.35 factor rate on a 6-month 
advance equals roughly 70-85% APR.

[Convert your factor rate to APR →](/tools/factor-rate-to-apr-calculator)

**Daily ACH Payments**

Daily payment withdrawals from your bank account might seem 
convenient, but they:
- Crush cash flow (you pay before you collect from customers)
- Increase the effective APR
- Make it easy to trigger default fees

### Red Flags When Shopping for Business Loans

Watch out for lenders who:
- Won't disclose APR (only factor rate or total payback)
- Pressure you to sign immediately ("offer expires today")
- Don't ask about your ability to repay
- Found you through cold calls or spam
- Require upfront fees before approval
- Guarantee approval regardless of credit

### What to Do If You Have a Bad Loan

If you've already signed a predatory loan:
- Review for illegal clauses (confession of judgment in banned states)
- Calculate the true APR — you may have grounds for complaint
- Look into refinancing to a better loan
- Consult a business attorney if you find illegal terms
- Report predatory lenders to your state attorney general

[Check refinancing options →](/tools/loan-finder-quiz)

## Frequently Asked Questions

[FAQ Section with schema markup]
```

### FAQ Questions

1. How do I know if my business loan is predatory?
2. What is a confession of judgment and why is it dangerous?
3. What's the difference between factor rate and APR?
4. Are daily payment business loans bad?
5. What should I do if I already signed a bad loan?
6. How do I report a predatory business lender?

---

## Internal Linking

**Link TO this tool from:**
- Factor Rate to APR Calculator
- Loan Comparison Tool
- Glossary terms (MCA, factor rate, confession of judgment, UCC lien)
- Blog articles about loan shopping, avoiding scams
- Homepage (trust signal)

**Link FROM this tool to:**
- `/get-started` (see better options)
- `/tools/factor-rate-to-apr-calculator`
- `/tools/loan-finder-quiz`
- `/tools/loan-comparison`
- `/glossary/confession-of-judgment`
- `/glossary/factor-rate`
- `/glossary/ucc-lien`
- `/glossary/personal-guarantee`

---

## Lead Capture Strategy

### Dynamic CTA Based on Findings

**Critical issues found:**
```
This offer has serious problems. Don't sign it.

Let's see what legitimate financing options you qualify for.

[ Check Your Real Options ]
```

**Some concerns found:**
```
This offer isn't terrible, but you might do better.

See how it compares to other options you may qualify for.

[ Compare Your Options ]
```

**No major issues:**
```
This offer looks reasonable. Want to make sure you're 
getting the best deal?

[ See If You Qualify for Better Rates ]
```

### Email Capture

```
📧 Get your full analysis report

We'll send you a PDF with:
• Complete red flag breakdown
• True cost calculations
• Questions to ask the lender
• Comparison to typical rates

[email] [ Send My Report ]
```

---

## Analytics Events

| Event | Trigger | Parameters |
|-------|---------|------------|
| `tool_start` | Begin entering offer details | tool: red-flag-detector |
| `tool_redflag_found` | Each red flag identified | flag_type, severity |
| `tool_calculate` | Results displayed | critical_count, serious_count, yellow_count |
| `tool_learn_more` | Click to learn about specific flag | flag_type |
| `tool_email_report` | Request PDF | severity_level |
| `cta_click` | Click CTA | recommendation_type |

---

## SEO Analysis

### Keyword Targets

| Keyword | Monthly Volume | Competition | Difficulty |
|---------|---------------|-------------|------------|
| predatory business loan | 500-800 | Very Low | Easy |
| MCA red flags | 200-400 | Very Low | Easy |
| is my business loan legit | 300-500 | Very Low | Easy |
| confession of judgment business loan | 200-400 | Very Low | Easy |
| bad business loan terms | 100-300 | Very Low | Easy |
| merchant cash advance scam | 300-500 | Low | Easy |
| how to spot predatory lender | 200-300 | Very Low | Easy |
| business loan warning signs | 100-200 | Very Low | Easy |

**Total Addressable Volume:** 2,000-4,000 monthly searches
**Realistic Capture Rate:** 50-70% (very low competition)

### Traffic Projections

| Timeframe | Conservative | Moderate | Aggressive |
|-----------|-------------|----------|------------|
| 6 months | 1,000/mo | 2,000/mo | 3,000/mo |
| 12 months | 2,000/mo | 4,000/mo | 6,000/mo |
| 24 months | 3,000/mo | 5,000/mo | 8,000/mo |

### Backlink Potential

**Target: 20-40 referring domains in 12 months**

Likely link sources:
- Consumer advocacy organizations
- Small business advice blogs
- Financial literacy sites
- State attorney general resources (if featured)
- Reddit/forum mentions driving organic links

### Strategic Value Beyond Traffic

1. **Trust Signal:** Positions QuickLenders as borrower advocate, not just another lender
2. **Differentiation:** Zero competitors have this tool
3. **Shareability:** Users warn friends/colleagues about bad deals
4. **Content Flywheel:** Each red flag = blog post + glossary entry (10+ pieces)
5. **Conversion Impact:** Users who find bad deals elsewhere convert to QuickLenders leads

### Content Opportunities

Each red flag becomes a blog post / glossary entry:
- "What Is Confession of Judgment? Why It's Dangerous"
- "Factor Rate vs APR: How MCAs Hide True Costs"
- "Understanding UCC Liens on Business Loans"
- "Personal Guarantee Scope: What's Really at Risk"
- "Daily vs Monthly Payments: The Hidden Cost Difference"
- "Stacking Clauses: How They Trap Business Owners"

---

## Build Checklist

- [ ] Create page route and metadata
- [ ] Build multi-section input form
- [ ] Implement red flag detection logic
- [ ] Build effective APR calculator (integrate existing)
- [ ] Create red flag explanation database
- [ ] Build report card output
- [ ] Create detailed findings cards
- [ ] Build true cost comparison
- [ ] Implement recommendation engine
- [ ] Dynamic CTA based on severity
- [ ] PDF report generation
- [ ] Write SEO content wrapper
- [ ] Create glossary entries for each red flag term
- [ ] Analytics events
- [ ] Mobile responsive
- [ ] Add to tools hub

**Estimated Build Time:** 24-32 hours

---

## Future Enhancements

- Document upload with OCR parsing
- Lender database (flag known bad actors)
- State-specific legal guidance
- "Report this lender" feature
- Community ratings of lenders
