# Roadmap Part 1: Lead Capture & Conversion

**What this covers:** The system that turns website visitors into leads you can call, email, and close. This is the revenue engine — everything else on the site exists to feed people into this.

**When to build:** Immediately after migration. Nothing else matters until you can capture leads.

**Dependencies:** Site must be live on Vercel. You need an email sending service and somewhere to store leads.

---

## 1. Lead Capture Form

**Route:** `/get-started`

This is the single most important page on the site. Every CTA, every tool result, every blog article ultimately points here. The goal is simple: collect enough information to understand what a prospect needs so you can reach out with the right conversation — not a cold call, but an informed one.

### Form Design Philosophy

Keep it short enough that people actually complete it, but long enough that you're not calling them blind. Every field should either help you qualify the lead or personalize your outreach. If a field doesn't do one of those things, cut it.

The form should feel like a consultation intake, not a loan application. You're not asking for bank statements or tax returns — you're asking "what do you need and how can we help?" The language should reflect that. No "Submit Application" buttons. This is "Get Your Options" or "Request a Consultation."

### Form Fields

| Field | Type | Required | Why You Need It |
|---|---|---|---|
| Full name | Text | Yes | So you can address them by name on the call |
| Business name | Text | Yes | You'll research the business before calling |
| Email | Email | Yes | Confirmation email, nurture sequences, follow-up if they don't answer |
| Phone number | Tel | Yes | Primary outreach method — you're calling these people |
| Loan type interest | Dropdown | Yes | Determines which conversation track you start with |
| Estimated amount needed | Dropdown (ranges) | Yes | Qualifies the deal size immediately |
| Time in business | Dropdown | Yes | Major qualification factor — under 2 years limits options significantly |
| How soon do you need funding? | Dropdown | Yes | Tells you who to call first (ASAP = hot lead) |
| Anything else? | Textarea | No | Often the most valuable field — people tell you exactly what they need |

**Loan type dropdown options:** Term Loan, Line of Credit, Equipment Financing, Asset-Based Lending, ESOP, Investment Banking, Bonds, Not Sure

**Amount dropdown options:** Under $50k, $50k–$100k, $100k–$250k, $250k–$500k, $500k–$1M, $1M–$5M, $5M–$10M, $10M+

**Time in business options:** Less than 1 year, 1–2 years, 3–5 years, 5–10 years, 10+ years

**Urgency options:** As soon as possible, Within 1–2 weeks, Within 1–3 months, Just exploring options

### URL Parameter Support

The form should accept URL parameters to pre-fill fields and track attribution. This is critical for knowing which pages are driving leads and for personalizing the experience when someone comes from a specific tool or product page.

```
/get-started?loan_type=equipment-financing&source=loan-page
/get-started?loan_type=not-sure&source=quiz-result&quiz_result=term-loan
/get-started?loan_type=line-of-credit&source=blog&article=working-capital-guide
/get-started?source=homepage-hero
/get-started?source=chatbot
```

When a URL parameter pre-fills a field, the user should still be able to change it. Pre-filling just reduces friction — if they came from the equipment financing page, they probably want equipment financing, so don't make them select it again.

The `source` parameter is for your internal analytics only — it doesn't need to show on the form. Store it as a hidden field so every lead record tells you where it came from.

### After Submission

The thank-you page is not an afterthought. It's a high-intent moment — someone just told you they need financing. Use it:

1. **Confirmation message:** "Thanks, [name]. We'll review your info and reach out within 1 business day." Be specific about the timeline. Vague promises ("we'll be in touch soon") feel like they're going into a void.

2. **Self-scheduling option:** Embed a Cal.com calendar directly on the thank-you page. "Don't want to wait? Book a call right now." Some people are ready NOW — let them skip the phone tag. Cal.com free tier works fine for this. Set available hours to your actual business hours.

3. **Confirmation email:** Instant automated email summarizing what they submitted. This serves two purposes: it confirms their submission went through (reduces anxiety), and it puts your brand in their inbox with your phone number and a "reply to this email if you have questions" prompt.

4. **Internal notification:** Your team needs to know the second a lead comes in. Options:
   - Email notification (simple, always works)
   - Slack webhook (if your team uses Slack — faster response)
   - CRM notification (if you're using HubSpot/Pipedrive)
   - All of the above

5. **What NOT to do:** Don't redirect them to a generic homepage. Don't show a blank "thanks" page with no next steps. Don't make them wonder if it worked.

### Technical Implementation

The form itself is straightforward — React Hook Form + Zod for validation, a Next.js API route (`/api/leads`) to handle submission, and whatever storage backend you choose.

```
User fills form → Client-side validation (Zod) → POST /api/leads →
  → Store in database/Airtable
  → Send confirmation email (Resend/Postmark)
  → Send internal notification (email/Slack webhook)
  → Return success → Redirect to /get-started/thank-you
```

The API route should be server-side so your storage credentials and email API keys aren't exposed to the client. Rate-limit it to prevent spam (5 submissions per IP per hour is reasonable).

Add a honeypot field (hidden text input that only bots fill in) to reduce spam without annoying users with CAPTCHAs. If the honeypot is filled, silently reject the submission.

---

## 2. Lead Management

You need somewhere to store leads, track their status, and know who to call next. Start simple and upgrade when the volume justifies it.

### Phase 1: Airtable (Start Here)

Airtable is the fastest way to get a working lead management system. No code beyond the API integration. Your team can view, sort, filter, and update leads in a familiar spreadsheet-like interface.

**"Leads" table columns:**

| Column | Type | Purpose |
|---|---|---|
| Name | Text | Contact name |
| Business | Text | Business name |
| Email | Email | Contact email |
| Phone | Phone | Contact phone |
| Loan Type | Single select | What they're looking for |
| Amount | Single select | Deal size range |
| Time in Business | Single select | Qualification factor |
| Urgency | Single select | How soon they need funding |
| Notes | Long text | Their "anything else" response |
| Source Page | Text | Where they came from (URL param) |
| Submitted At | Date/time | When the lead came in |
| Status | Single select | New → Contacted → Qualified → In Progress → Closed Won → Closed Lost |
| Assigned To | Collaborator | Who's handling this lead |
| Follow-Up Date | Date | When to follow up next |
| Internal Notes | Long text | Your team's notes from calls/emails |
| Deal Value | Currency | Actual loan amount being discussed |
| Lost Reason | Single select | If lost: went elsewhere, not qualified, no response, timing, etc. |

**Airtable automations to set up:**
- When new record created → Send Slack notification with lead details
- When new record created → Send confirmation email via SendGrid/Postmark integration
- When status changes to "Qualified" → Send Slack message to closer
- When follow-up date = today → Send reminder notification

**Views to create:**
- "New Leads" — filtered to Status = New, sorted by urgency then submitted date
- "My Leads" — filtered to Assigned To = me
- "Follow Up Today" — filtered to Follow-Up Date = today
- "Pipeline" — Kanban board grouped by Status
- "Won This Month" — filtered to Status = Closed Won, submitted this month
- "Reporting" — all leads with summary stats

The Airtable API is simple. Your Next.js API route POSTs to `https://api.airtable.com/v0/{baseId}/{tableName}` with the lead data. Store your Airtable API key and base ID as Vercel environment variables.

### Phase 2: CRM (When You Outgrow Airtable)

When you're getting 50+ leads/month or have multiple people working leads, move to a proper CRM:

**HubSpot (Free CRM Tier):**
- Unlimited contacts on the free plan
- Built-in email tracking, meeting scheduling, deal pipeline
- Forms can submit directly to HubSpot (skip the Airtable middleman)
- Marketing email tools built in (replaces ConvertKit for nurture sequences)
- Reporting dashboards
- Overkill at first, but you never need to migrate again

**Pipedrive:**
- Better for small sales teams — simpler interface, less bloat
- Strong pipeline visualization
- Good mobile app for managing leads on the go
- Starts at ~$15/month per user

**When to switch:** When you find yourself fighting Airtable's limitations — needing email tracking, automated follow-up reminders, better reporting, or multi-user permissions. Don't switch prematurely; Airtable is faster to set up and iterate on.

### Lead Scoring (Add Later)

Once you have enough data to see patterns in which leads convert, add scoring:

**High-priority signals (call within 1 hour):**
- Urgency = "As soon as possible"
- Amount = $250k+
- Time in business = 3+ years
- Came from a loan product page (not a blog article)

**Medium-priority (call within 4 hours):**
- Urgency = "Within 1-2 weeks"
- Amount = $50k-$250k
- Time in business = 1-2 years

**Lower-priority (call within 24 hours):**
- Urgency = "Just exploring"
- Time in business = less than 1 year
- Came from a blog article or glossary

Score = sum of weighted factors. In Airtable, this can be a formula field. In HubSpot, it's built into the lead scoring feature. The point is to call the hottest leads first.

---

## 3. Trust & Credibility Overhaul

Right now the site has trust problems that will kill conversion rates no matter how good the lead form is. People won't fill out a form on a site they don't trust.

### Replace Fake Testimonials

The current testimonials are obviously fake. "Denny Johnson / Glow Garden," "Mark Evans / Sky Bound Drones," "Justice Taylor / Culinary Canvas" — these read like AI-generated placeholder text. Any savvy borrower (and someone borrowing $250k+ is savvy) will notice and bounce.

**Options, in order of preference:**

1. **Real testimonials from real borrowers.** Even 2-3 genuine ones beat 10 fake ones. After you close your first deals through the site, ask the borrower for a quote. Offer to keep it anonymous if needed ("— Restaurant owner, Denver, CO"). Include specific details: loan amount range, how fast they got funded, what they used it for.

2. **Data-driven proof instead of quotes.** Replace the testimonial carousel with hard numbers: "$X million in financing facilitated," "Y+ businesses served," "Average funding time: Z days." If you don't have these numbers yet, use whatever truthful stats you can. Even "Serving Colorado businesses since [year]" is better than fake reviews.

3. **Remove the section entirely.** A blank space is more trustworthy than fake testimonials. Seriously. You can add this section back when you have real content to fill it.

4. **Scenario-based stories.** If you can't get real testimonials yet but want content in this space, frame them explicitly as scenarios: "See how businesses like yours have used financing." Make it clear these are illustrative, not testimonial. This is a temporary measure.

### Fix the About Page

The current about page claims "20 years" of experience without substantiation. It's vague and impersonal.

**What it needs:**
- A real person. Name, photo, LinkedIn link. If you're the person behind QuickLenders, own it. "Founded by [name], a [X]-year veteran of business lending..." People trust people, not brands. Especially in financial services.
- Specific, verifiable claims. "20 years" → "Founded in [year], based in [city], [state]." Add your actual experience and credentials.
- What makes you different. Why would someone work with QuickLenders instead of going directly to a bank or using an online lender? Be specific. Speed? Personal service? Access to multiple lenders? Industry expertise?
- Contact information. Real address (even if it's a registered agent), real phone, real email. Financial services sites without verifiable contact info look like scams.

### Fix Book a Call

The "Book a Call" button currently goes nowhere. This is a high-intent action — someone clicking it is practically a lead already, and you're sending them to a dead link.

**Implementation:**
- Create a Cal.com account (free tier)
- Set up a booking page with your available hours
- Embed it at `/book-a-call` or use Cal.com's embed widget
- Cal.com collects name, email, and optionally phone + notes
- Calendar sync with Google Calendar so you don't double-book
- Confirmation + reminder emails are built into Cal.com

Every "Book a Call" button on the site links to this page. The lead form thank-you page also embeds it.

### Additional Trust Signals to Add

- **Google Business Profile:** Set up and verify. This shows up in local searches and adds legitimacy. Collect reviews here over time.
- **BBB listing:** Even without accreditation, a BBB listing with an A+ rating adds trust. Worth the setup time.
- **SSL badge:** You'll have SSL through Vercel automatically. Adding a visual badge ("🔒 256-bit Encrypted") near the form reinforces security for less technical visitors.
- **"No Credit Impact" badge:** If your initial consultation doesn't pull credit, say so prominently near the form. This removes a major objection.
- **Physical address:** Even if you work remotely, a registered business address in Colorado adds legitimacy. Especially for a financial services company.
- **Professional associations:** If you hold any licenses (NMLS, state lending licenses), display them. If you're a member of any industry associations, show the logos.

---

## 4. On-Page CTA Strategy

Every page needs clear, contextual calls to action that lead to either the form or lighter-touch conversion points.

### CTA Placement Rules

Every page gets at minimum:
- **Above-fold CTA:** Visible without scrolling. This catches the people who already know what they want.
- **Mid-content CTA:** After the user has absorbed some value. For a 2,000-word blog article, this goes around the 800-word mark.
- **Bottom CTA:** After they've read everything. This catches the researchers who read the whole page before deciding.
- **Sticky mobile bar:** Fixed at the bottom of the screen on mobile. "Get Your Options" button + phone number. Always visible.

### CTAs by Page Type

**Loan product pages** (`/business-loans/term-loans`, etc.)
- Primary: "Get Your Options" → `/get-started?loan_type=term-loans&source=loan-page`
- Secondary: "Talk to an Advisor" → `/book-a-call`
- These visitors know what product they're looking at. Make it easy to take the next step.

**Blog articles** (`/financial-insights/[slug]`)
- Mid-content: "Not sure which loan is right? Take our 2-minute quiz →" → `/tools/loan-finder-quiz`
- Bottom: "Ready to explore your options?" → `/get-started?source=blog&article=[slug]`
- Blog readers are earlier in the funnel. Lead with the quiz (lower commitment), follow with the form.

**Tool result pages** (quiz results, calculator outputs)
- Contextual CTA based on output: "Based on your results, a term loan looks like a strong fit. Want to discuss your options?" → `/get-started?loan_type=term-loan&source=quiz-result`
- Secondary: "Email me these results" → captures email for nurture sequence
- Tool users have already invested time. They're warm. The CTA should reference what they just learned.

**Industries pages** (`/industries/[slug]`)
- Primary: "Get Financing for Your [Industry] Business" → `/get-started?source=industry-[slug]`
- Secondary: "See how [industry] businesses use financing" → relevant case study
- Industry-specific language matters. Don't just say "Get a loan." Say "Finance your next piece of equipment" on the construction page.

**Homepage**
- Hero: "See What You Qualify For" → `/get-started?source=homepage-hero`
- Below fold: "Find the Right Loan" → `/tools/loan-finder-quiz`
- Two paths: people who are ready (form) and people who need guidance (quiz).

### CTA Language Guide

The language you use on buttons and CTAs matters more than most people think. You're not an application — you're a consultation. The framing should make people feel like they're getting help, not committing to something.

**Use these:**
- "Get Your Options"
- "Check Your Rate"
- "See What You Qualify For"
- "Talk to an Advisor"
- "Get Started"
- "Request a Consultation"
- "Find the Right Loan"

**Avoid these:**
- "Apply Now" (implies a formal application with credit pulls)
- "Submit" (cold, transactional)
- "Sign Up" (implies ongoing commitment)
- "Buy Now" (not what this is)

---

## 5. Email Nurture Sequences

Not every lead is ready for a phone call, and not every phone call gets answered. Email sequences keep you in front of prospects until they're ready.

### Sequence 1: Post-Lead-Form (they submitted the form but you haven't reached them)

This is your most important sequence. These people raised their hand and said "I need financing." If they don't answer your call, the emails keep the conversation going.

| Day | Subject Line | Content | CTA |
|---|---|---|---|
| 0 | "We received your info, [name]" | Summary of what they submitted. "Expect a call from us within 1 business day. In the meantime, here's what happens next..." | Reply to this email with any questions |
| 1 | "While you're getting ready..." | Application checklist — what documents to gather. Positions you as helpful, not pushy. | Link to /business-loans/application-checklist |
| 3 | "[Loan type] 101: What to expect" | Educational content matched to their loan type interest. Shows expertise. | Link to relevant loan product page |
| 7 | "Still exploring options?" | Acknowledge that timing matters. Offer a no-pressure call. Include a case study or scenario relevant to their industry/need. | Book a Call link |
| 14 | "We're here when you're ready" | Short, warm. Include your direct phone number and email. No pressure. Let them know the door is open. | Phone number + reply to email |

### Sequence 2: Post-Quiz (completed the quiz but didn't fill out the lead form)

These people engaged with your content but weren't ready to give their phone number. Nurture them toward the form.

| Day | Subject Line | Content | CTA |
|---|---|---|---|
| 1 | "Your loan recommendation: [result]" | Deeper explanation of their quiz result. Why this loan type fits. What the terms typically look like. | Link to relevant loan product page |
| 3 | "3 things to prepare before applying" | Application readiness content. Practical, helpful. | Link to application checklist |
| 7 | "How a [industry] business used [loan type]" | Case study or scenario relevant to their result. | Link to case study |
| 14 | "Ready to talk?" | Direct offer to discuss their options. Low-pressure framing: "No commitment, just a conversation about what's available." | Link to lead form + Book a Call |

### Sequence 3: Post-Calculator (gave email to get results)

Calculator users are doing math on a specific deal. They may already know what they want.

| Day | Subject Line | Content | CTA |
|---|---|---|---|
| 1 | "Your calculation results" | Full results from whatever calculator they used. "Here's what these numbers mean..." | Link to relevant tool |
| 5 | "Going deeper on [topic]" | Glossary terms or blog articles related to their calculation. E.g., if they used the break-even analyzer → link to "Understanding Debt Service Coverage Ratio." | Link to relevant content |
| 10 | "Questions about your numbers?" | Offer to walk through their calculation on a call. "Sometimes the numbers raise more questions than they answer." | Book a Call link |

### Sequence 4: Resource Download

They downloaded a PDF guide. Educate them toward a tool or form.

| Day | Subject Line | Content | CTA |
|---|---|---|---|
| 0 | "Your guide is attached" | PDF delivery. Brief thank you. | Attached PDF |
| 3 | "Put that guide to use" | Related tool recommendation. "Now that you've read about [topic], try our [tool] to see how the numbers work for your business." | Link to relevant tool |
| 7 | "Want to talk through your options?" | Offer to discuss. Link to lead form. | Lead form link + Book a Call |

### Email Tech Stack

**Sending service:** Resend (developer-friendly, great API, affordable) or Postmark (known for deliverability). Both integrate easily with Next.js API routes.

**Email design:** React Email lets you build email templates with React components. Keeps your email branding consistent with your site. Write once, use across all sequences.

**Sequence management:** ConvertKit is simplest for managing sequences and subscriber segments. Free up to 10,000 subscribers. If you go HubSpot for CRM, use their built-in email tools instead to keep everything in one place.

**Trigger logic:** Form submission → API route → adds subscriber to ConvertKit with appropriate tag → ConvertKit handles the sequence timing. Or: Form → HubSpot contact → HubSpot workflow handles the sequence.

---

## 6. Loan Buddy Chatbot

You already have a Loan Buddy chatbot concept. Post-migration, make it a real conversion tool, not just a novelty.

### What It Should Do

- **Answer common questions instantly.** "What credit score do I need?" "How fast can I get funded?" "What documents do I need?" Train it on your glossary terms and FAQ content so it handles these without a human.
- **Route people to the right tool.** "Not sure which loan is right for you? Take our 2-minute quiz." "Want to see your monthly payment? Try our calculator." The chatbot becomes a concierge.
- **Collect lead information conversationally.** When someone's ready, Loan Buddy walks them through the lead form fields one at a time in a chat interface. Some people find this less intimidating than a form page. The data goes into the same lead pipeline.
- **Hand off to a human.** If the conversation gets complex or the person asks to talk to someone, capture their info and create a lead for your team to follow up.

### When It Should Appear

- **Loan product pages:** Auto-prompt after 30 seconds. "Hi! I can help you figure out if [loan type] is right for your business. Got questions?"
- **After quiz completion:** "Got your results! Want to talk through what this means for your business?"
- **Application checklist page:** "Gathering your documents? I can tell you exactly what you'll need."
- **Blog articles:** Do NOT auto-pop. Let the reader read. Show the widget but don't interrupt. People reading articles are in learning mode, not buying mode.
- **Homepage:** Available but not pushy. Small icon in bottom-right corner.

### Implementation Notes

For a first version, a decision-tree chatbot (pre-scripted paths) is faster to build and more reliable than an AI chatbot. Map out the 10-15 most common question paths and script responses. You can add AI later.

If you do go AI: use your own API with your glossary + FAQ + loan product content as context. Keep the scope narrow — it should answer questions about business lending, not general conversation. Include guardrails so it doesn't make promises or give financial advice.

---

## Measurement

These are the numbers that tell you if the lead capture system is working:

| Metric | What It Tells You | Target |
|---|---|---|
| Form submissions / month | Raw lead volume | Track growth week over week |
| Submission rate (visits to /get-started ÷ submissions) | Form friction | 15-30% is good for a multi-field form |
| Source page attribution | Which pages drive leads | Invest more in high-converting pages |
| Lead-to-contact rate | How many you actually reach | Should be 60%+ within 48 hours |
| Lead-to-qualified rate | How many are real opportunities | Depends on traffic quality — track trend |
| Time to first contact | How fast you're responding | Under 1 hour for hot leads |
| Email open rates | Nurture sequence engagement | 25-40% for transactional, 15-25% for nurture |
| Cal.com bookings | Self-scheduling adoption | Track as alternative to cold calling |

Review these weekly. The most important leading indicator is form submissions. The most important lagging indicator is leads that turn into real conversations.
