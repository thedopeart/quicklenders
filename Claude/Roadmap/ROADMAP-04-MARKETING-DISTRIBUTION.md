# Roadmap Part 4: Marketing & Distribution

**What this covers:** How to get eyeballs on the content and tools you've built — organic search optimization, social media, video, Google Business Profile, paid ads, backlink strategy, and embeddable widgets. Building great content is half the work. Getting it in front of people is the other half.

**When to start:** SEO and Google Business Profile setup happen right after migration. Social and video content begin once you have tools and articles to promote. Paid ads come last, after you know your conversion metrics from organic.

**Dependencies:** Site live on Vercel, lead form functional, Search Console verified, analytics running. Most marketing activities also require content to exist first (Roadmap 03) and tools to be live (Roadmap 02).

---

## Search Engine Optimization

SEO is your primary growth channel. Every other marketing activity either feeds into or amplifies your organic search presence.

### Technical SEO (Migration Handles Most of This)

The migration plan covers the technical foundation: sitemap, robots.txt, schema markup, meta tags, canonical URLs, Core Web Vitals, and redirect safety net. But SEO isn't a one-time setup — it requires ongoing attention.

**Monthly SEO maintenance:**
- Check Search Console for crawl errors, pages dropped from index, and manual actions — weekly
- Review Core Web Vitals report — monthly (Vercel's Speed Insights helps here too)
- Check for broken links with `npx broken-link-checker https://quicklenders.com --recursive` — monthly
- Review and update meta titles/descriptions for pages that are indexed but not getting clicks (low CTR in Search Console) — monthly
- Check for keyword cannibalization (multiple pages competing for the same keyword) — monthly
- Ensure new pages are getting indexed within 1-2 weeks of publication — ongoing

### On-Page SEO Checklist (Every New Page)

Apply this to every page you publish:

- [ ] Primary keyword in title tag (front-loaded)
- [ ] Primary keyword in H1 (can differ slightly from title tag)
- [ ] Primary keyword in first 100 words of body content
- [ ] 2-3 secondary keywords woven naturally into subheadings and body
- [ ] Meta description includes primary keyword and a compelling reason to click (140-160 chars)
- [ ] URL slug is short, descriptive, keyword-rich (no filler words)
- [ ] At least 2 internal links TO other pages on the site
- [ ] At least 1-2 internal links FROM other existing pages TO this new page (go update older pages to link to the new one)
- [ ] Images have descriptive alt text (not keyword-stuffed, genuinely descriptive)
- [ ] FAQ section with FAQPage schema markup
- [ ] Appropriate additional schema (FinancialProduct, Article, BreadcrumbList, etc.)
- [ ] OG image set
- [ ] Canonical URL set
- [ ] Page renders properly on mobile

### Keyword Tracking

Track rankings for your top 50 target keywords. Use a tool like:
- **Google Search Console** (free, shows actual queries and positions)
- **Ahrefs or Semrush** (paid, ~$100/month, more detailed tracking + competitor analysis)
- **Ubersuggest** (cheaper alternative, ~$30/month)

At minimum, use Search Console. It's free and shows you exactly what queries are driving impressions and clicks, which pages rank for what, and where your CTR is low (opportunity to improve titles/descriptions).

**Initial target keywords to track:**

| Keyword Cluster | Example Keywords |
|---|---|
| Core products | "business term loan," "business line of credit," "equipment financing," "asset based lending" |
| How-to / process | "how to get business loan," "business loan requirements," "business loan application" |
| Calculators/tools | "business loan calculator," "loan payment calculator," "business loan comparison" |
| Industry | "[industry] business loan" for each of your 10 industries |
| Location | "business loans [state]" for priority states |
| Amount | "$100k business loan," "$500k business loan," etc. |
| Comparisons | "term loan vs line of credit," "sba loan vs online lender" |
| Glossary | "[term] definition" for high-value glossary terms |

### Internal Linking Strategy

Internal linking is the most underrated SEO lever. It tells Google what your most important pages are and how they relate to each other.

**Rules:**
- Every new page links to at least 2 other pages on the site
- When you publish a new page, go back to 3-5 existing pages and add a link to the new page where it's contextually relevant
- Your most important pages (loan product pages, lead form) should have the most internal links pointing to them
- Use descriptive anchor text, not "click here" or "learn more." Use "see our term loan options" or "try our break-even analyzer"
- The glossary is a natural internal linking hub — every glossary term can link to relevant product pages, tools, and articles, and every article can link to relevant glossary terms

**Link hierarchy:**
```
Homepage
  → Loan product pages (highest priority)
  → Tools hub → Individual tools
  → Financial Insights hub → Individual articles
  → Industries pages
  → Lead form (linked from everywhere)

Every article/tool/industry page
  → 2-3 loan product pages
  → 1+ tool
  → Lead form
  → 3-5 glossary terms
```

---

## Backlink Building

Backlinks from other sites remain the strongest ranking signal. A site with good content and good backlinks outranks a site with good content and no backlinks, every time.

### Linkable Assets

These are the pages most likely to earn backlinks naturally or through outreach:

| Asset | Link Potential | Target Audiences |
|---|---|---|
| Glossary (120+ terms) | Very high | Finance education sites, business schools, SCORE |
| Loan Finder Quiz | High | Small business blogs, startup resources, chambers of commerce |
| Break-Even Analyzer | High | SCORE chapters, business incubators, SBDCs |
| Payment Calculator | Medium-High | Any small business blog, especially those writing about lending |
| Blog articles (how-to) | Medium | Sites linking to business finance resources |
| Equipment vs. Leasing Calculator | Medium | Industry-specific blogs, equipment dealers |
| State-specific pages | Medium | State business resources, chambers of commerce |
| Downloadable guides (PDFs) | Medium | Resource roundup posts, educational sites |

### Outreach Targets

**Tier 1: High-value, warm outreach**
These organizations exist to help small businesses and actively link to useful resources:
- **SCORE.org** — The nation's largest mentor network for small businesses. They maintain resource pages by topic. Your glossary, tools, and guides are exactly what they link to. Find your local SCORE chapter and reach out: "We built a free [tool] that your clients might find useful."
- **SBA.gov resource pages** — Harder to get but extremely valuable. They link to educational resources.
- **SBDC (Small Business Development Centers)** — Every state has one. They maintain resource lists for their clients.
- **State chambers of commerce** — Most have resource pages for members. Your state-specific lending pages are a natural fit.
- **Local economic development organizations** — Your Colorado pages + local tools = a natural link from Denver/Colorado business organizations.

**Tier 2: Content-based outreach**
- **Small business blogs** — Sites like Fundera, NerdWallet's blog, Score.org/blog, and smaller business finance blogs regularly link to good tools and calculators in their articles. Find articles about business loans that don't link to a calculator/quiz → email the author suggesting your tool.
- **University entrepreneurship programs** — Business schools and entrepreneurship centers maintain resource pages for their students. Your glossary and tools are educational in nature.
- **Industry association websites** — The National Restaurant Association, Associated General Contractors, etc. have resource sections. Your industry pages are relevant to their members.

**Tier 3: Passive link building**
- **HARO (Help a Reporter)** — Sign up as a source. When journalists write about business lending, they need expert quotes. You provide quotes, they link to your site. Takes 5-10 minutes per response.
- **Guest posts** — Write original articles for small business publications and include a link to a relevant tool or resource on your site. Quality over quantity — one post on a reputable site beats 20 posts on spam blogs.
- **Broken link building** — Find resource pages that link to dead URLs related to business lending. Email the site owner: "Hey, the link to [dead URL] on your resource page is broken. We have a similar resource at [your URL] if you'd like to update it."
- **Business directories** — Get listed on relevant business directories: Better Business Bureau, local directories, industry-specific directories. These are lower-value links but they build a natural link profile.

### Embeddable Widgets (Link Building Through Distribution)

This is potentially your most scalable link building strategy. Make your calculators embeddable on other websites, and every embed includes a "Powered by Quick Lenders" link back to your site.

**How to build it:**

Create stripped-down, embeddable versions of your calculators at `/embed/[tool-slug]`:
- No site header, footer, or navigation
- Minimal, clean UI
- "Powered by Quick Lenders" footer with a link to your site
- Responsive — works in any iframe size

Provide two embed options:

**Option 1: iframe (simplest)**
```html
<iframe
  src="https://quicklenders.com/embed/loan-calculator"
  width="100%"
  height="450"
  frameborder="0"
  title="Business Loan Calculator by Quick Lenders"
></iframe>
```

**Option 2: JavaScript snippet (more seamless)**
```html
<script src="https://quicklenders.com/embed/loan-calculator.js"></script>
<div id="quicklenders-calculator"></div>
```

**Create a page at `/embed` or `/tools/embed`** where webmasters can preview each embeddable tool and copy the embed code. Make it dead simple — click to copy.

**Outreach for embeds:**
After the embed pages are live, reach out to small business bloggers and resource sites: "We built a free embeddable business loan calculator. Your readers might find it useful — here's the embed code." Include a preview screenshot. This is a lower-friction ask than a traditional backlink request because you're offering their readers genuine value.

**Why this works:** This is exactly how NerdWallet and Bankrate built massive link profiles. Their calculators are embedded on thousands of sites, and every embed is a contextual, relevant backlink. You won't hit NerdWallet scale, but even 50-100 embeds from small business blogs would be extremely valuable.

### Link Building Cadence

This is ongoing work, not a one-time project:

| Activity | Frequency | Time Required |
|---|---|---|
| HARO responses | 3-5x per week | 15-30 min total |
| Direct outreach to SCORE/SBDC/chambers | 5-10 emails per week | 1-2 hours |
| Guest post pitches | 2-4 per month | 2-3 hours per post |
| Broken link building | 1-2 hours per week | Research + outreach |
| Embed outreach | 5-10 emails per week | 1 hour |
| Monitor new backlinks | Weekly | 15 min (Ahrefs/Search Console) |

Start with HARO and direct outreach to SCORE/SBDC — these are the highest-value, lowest-friction opportunities.

---

## Google Business Profile

Set up and optimize for local lending searches. This is low effort and high value — takes 30 minutes to set up and shows up in "business loans near me" and "business loans Colorado" searches.

### Setup Checklist

- [ ] Create Google Business Profile at business.google.com
- [ ] Business name: "Quick Lenders" (match your branding exactly)
- [ ] Category: "Financial Consultant" or "Loan Agency" (choose the most accurate)
- [ ] Address: Your registered business address in Colorado
- [ ] Phone: (303) 921-8529
- [ ] Website: https://quicklenders.com
- [ ] Hours: Mon-Fri 9AM-5PM MST (match your site)
- [ ] Business description: 750-character summary of what you do. Include keywords naturally: "Quick Lenders connects Colorado businesses with financing solutions including term loans, lines of credit, equipment financing, and more..."
- [ ] Photos: Your office (if applicable), team photos, branded images
- [ ] Verify the listing (Google will mail a postcard or offer phone verification)

### Ongoing

- Collect Google reviews after every positive client interaction. Even 5-10 legitimate reviews set you apart from competitors with zero reviews.
- Post updates monthly: new tool launches, new articles, tips, announcements. Google Business posts keep your listing active.
- Respond to every review (positive and negative) professionally.
- Monitor Q&A section — people sometimes ask questions through GBP.

---

## Social Media

### LinkedIn (Primary Channel)

LinkedIn is the right platform for B2B lending content. Your audience — business owners, CFOs, entrepreneurs — uses LinkedIn professionally. Facebook and Instagram are poor fits for this content.

**Content calendar:**

| Week | Post Type | Example |
|---|---|---|
| 1 | Tool launch / feature | "We just launched a free break-even loan analyzer. Try it: [link]" |
| 1 | Educational carousel | "5 things lenders look at before approving your loan" (carousel with 5 slides) |
| 2 | Article share | Share a Financial Insights article with a brief personal take |
| 2 | Quick tip | "Did you know your DSCR is one of the most important metrics lenders evaluate? Here's what it is and how to calculate it: [link to glossary term]" |
| 3 | Industry spotlight | "Restaurant owners: here are the 3 most common financing options for your industry" → industry page |
| 3 | Engagement question | "What's the biggest challenge you face when looking for business financing?" (generates comments and engagement) |
| 4 | Behind-the-scenes | Share a founder perspective, a lesson learned, or a business insight |
| 4 | Tool / quiz promotion | "Not sure which loan is right? Take our 2-minute quiz: [link]" |

**Posting frequency:** 2-3 times per week. Consistency matters more than volume.

**Profile optimization:** Make sure the QuickLenders company page and your personal LinkedIn profile both link to the site, describe what you do, and look professional.

### Other Social Platforms

**X/Twitter:** Lower priority. Can share the same educational content as LinkedIn. Less engagement for B2B finance content, but some business owners and journalists are active here. HARO alternatives like Connectively also use X-style engagement.

**Facebook:** Not recommended as a primary channel. Consider a Facebook Business Page for completeness, but don't invest significant time here unless your audience skews toward local/small business owners who are active on Facebook.

**TikTok/Instagram Reels:** Surprisingly viable for "business finance explained in 60 seconds" content. Very low priority but worth experimenting with once you have a video workflow. Short explainer videos about loan types, calculators, or financial concepts can perform well in short-form video.

---

## YouTube

Video content has two benefits: it directly attracts viewers on YouTube, and YouTube videos rank in Google search results (often above web pages for how-to queries).

### Video Types

**Tool walkthroughs (3-5 min):**
- "How to Use Our Business Loan Calculator" — screen recording of the tool in action with voiceover explaining what the numbers mean
- "Finding Your Best Loan Type with Our Quiz" — walk through the quiz, explain the result
- "Break-Even Analysis: Is That Loan Worth It?" — use the tool with a real scenario

**Glossary explainers (2-3 min):**
- "What Is a UCC Filing? Explained in 2 Minutes"
- "Debt Service Coverage Ratio (DSCR) — What It Is and Why It Matters"
- "Amortization Explained: How Your Loan Payments Work"

These target the same keywords as your glossary pages but in video format. Some searchers prefer video, and Google increasingly shows video results for educational queries.

**Loan type overviews (5-7 min):**
- "Equipment Financing: Everything You Need to Know"
- "Term Loans vs. Lines of Credit — Which Is Right for Your Business?"
- "SBA Loans Explained: 7(a), 504, and Microloans"

**Behind the scenes / thought leadership:**
- "How We Help Businesses Find the Right Financing"
- "3 Mistakes Business Owners Make When Applying for Loans"
- "What Lenders Actually Look for in a Loan Application"

### Production Notes

You don't need professional video production. A clean webcam setup with good lighting and clear audio is fine. For tool walkthroughs, screen recordings with voiceover work well (use Loom, OBS, or QuickTime).

What matters: clear audio, useful content, and a link in the description to the relevant page on your site. Every video description should include:
- Link to the relevant page (tool, article, product page)
- Link to the lead form
- Phone number
- Brief description with keywords

### YouTube SEO

- Title: Include the primary keyword. "Business Loan Calculator — Free Tool + How to Use It"
- Description: First 150 characters are most important (shown in search results). Include the keyword and a link.
- Tags: Include relevant keywords (YouTube still uses these for discovery)
- Thumbnail: Custom thumbnail for every video. Text overlay on an image works well.
- Chapters: Add timestamps in the description for longer videos. Google uses these for search features.

### Cadence

Start with 1-2 videos per month. As you build a library, the compound effect kicks in — older videos continue driving traffic. Don't wait for perfection. The first few videos will be rough, and that's fine. The content matters more than the production quality.

---

## Google Ads (Later Stage)

Only invest in paid ads after you know your organic conversion metrics. You need to know: what does a lead cost you (organically), what does a lead convert into, and what's the value of a closed deal? Without this data, you're guessing on ad spend.

### When to Start

**Prerequisites:**
- Getting 1,000+ organic monthly visits
- Getting 10+ organic leads per month
- Know your lead-to-qualified rate
- Know your average deal value (or referral fee per closed loan)
- Lead form is converting well (15%+ submission rate)

### Campaign Types (In Order of Priority)

**1. Brand campaigns ($50-100/month):**
- Keywords: "Quick Lenders," "quicklenders," "quick lenders business loan"
- Purpose: Protect your brand from competitors bidding on your name
- These are cheap (brand keywords have low competition) and high-converting

**2. Tool-specific campaigns ($200-500/month):**
- Keywords: "business loan calculator," "loan payment calculator," "business loan quiz"
- Landing pages: Your tool pages
- Purpose: Capture high-intent tool searchers who might not find you organically yet
- These are mid-funnel — people who use the tool may become leads

**3. High-intent campaigns ($500-1000/month):**
- Keywords: "get business loan," "apply for business loan," "business loan near me"
- Landing page: Lead form or homepage
- Purpose: Capture people ready to borrow right now
- These are expensive keywords ($5-20+ per click in financial services) — only worth it if your conversion rate and deal value support the cost

**4. Retargeting ($100-300/month):**
- Audience: People who visited a loan product page or used a tool but didn't fill out the lead form
- Ad: "Still exploring business financing options? Let's talk." → lead form
- These are cheap and high-converting because you're targeting people who already showed interest
- Requires Google Ads remarketing tag installed on the site

### Budget Guidance

Start small. $300-500/month across brand + one other campaign type. Measure for 30 days. If cost-per-lead is sustainable, scale up. If not, adjust targeting and landing pages before spending more.

Financial services keywords are expensive. Your organic SEO strategy (Roadmap 03) is the long-term play. Ads are for accelerating what's already working, not replacing the foundation.

---

## Content Syndication & PR

### HARO / Expert Quotes

Help a Reporter Out (now part of Connectively) connects journalists with sources. Sign up as a source in the "Business & Finance" category. When a journalist posts a query about business lending, small business finance, or entrepreneurship, respond with a helpful quote and your credentials.

**Time commitment:** 15-30 minutes daily to scan queries and write 2-3 responses.
**Expected results:** 1-3 pickups per month, each with a link to your site from a news outlet or business publication. These are extremely high-quality backlinks.
**What to include in responses:** Your name, title, company (Quick Lenders), a useful quote that answers their specific question, and your website URL. Keep responses under 200 words. Journalists want concise, quotable answers.

### Guest Posting

Write original articles for small business publications and include a relevant link back to your site. Quality outlets only — avoid "pay for post" sites or low-quality blogs.

**Target publications:**
- Small Business Trends
- Entrepreneur.com (contributor program)
- Inc.com (contributor program)
- Industry-specific publications (Restaurant Business, Construction Executive, etc.)
- Local business publications (Denver Business Journal, Colorado Biz Magazine)

**Topics that work well for guest posts:**
- "X Things to Know Before Applying for a Business Loan" (link to your checklist)
- "How to Choose Between a Term Loan and a Line of Credit" (link to your comparison tool or article)
- "Understanding Your Business Credit Score" (link to your glossary or guide)

**Cadence:** 1-2 guest posts per month. Each one should take 2-3 hours to write and pitch.

---

## Measurement

### Key Marketing Metrics

| Metric | Tool | Frequency |
|---|---|---|
| Organic sessions | Google Analytics | Weekly |
| Keyword rankings (top 50) | Search Console + Ahrefs | Weekly |
| Pages indexed | Search Console | Weekly |
| Backlinks acquired | Ahrefs or Search Console | Monthly |
| Referring domains | Ahrefs | Monthly |
| YouTube views + subscribers | YouTube Studio | Monthly |
| LinkedIn engagement (impressions, clicks, follows) | LinkedIn Analytics | Monthly |
| Google Business Profile views + actions | GBP dashboard | Monthly |
| Google Ads cost-per-lead | Google Ads | Weekly (when running) |
| Social referral traffic | Google Analytics | Monthly |

### What Success Looks Like (First 6 Months Post-Migration)

| Timeframe | Milestone |
|---|---|
| Month 1 | Search Console verified, sitemap submitted, GBP set up, first 5 articles published |
| Month 2 | First organic leads coming in, LinkedIn posting 2x/week, first HARO pickup |
| Month 3 | 500+ organic monthly visits, 10+ glossary terms indexed, first YouTube video published |
| Month 4 | 1,000+ organic monthly visits, first backlink from outreach, 20+ articles published |
| Month 5 | Starting to rank page 1 for 5-10 target keywords, 50+ glossary terms indexed |
| Month 6 | 2,000+ organic monthly visits, consistent lead flow, evaluating paid ads |

These are conservative estimates. With consistent content production and link building, you could hit these faster. The key is consistency — publishing content, building links, and optimizing every week without stopping.
