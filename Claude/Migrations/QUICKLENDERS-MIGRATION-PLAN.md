# QuickLenders.com — Full Migration & Improvement Plan

## What You're Doing

You have an existing Next.js project on GitHub that currently pulls from a headless WordPress backend at `cms.quicklenders.com`. You're going to:

1. Clone the existing repo locally
2. Audit and remove all WordPress dependencies
3. Replace dynamic WP content fetches with local static content
4. Download all images from WordPress into the repo
5. Swap in your pre-built homepage
6. Deploy on Vercel
7. Point your domain
8. Kill WordPress

---

## Current State Assessment

### Existing Architecture
The site currently runs a **Next.js frontend** with a **headless WordPress CMS** backend. Images are still served from `cms.quicklenders.com/wp-content/uploads/`. The `/_next/` paths in the source confirm the Next.js SSR/SSG setup is already in place.

### Current URL Map (Confirmed via Search Index)

```
CORE PAGES
├── /                                           ← Homepage (pre-built — swap in)
├── /about-us                                   ← About page
├── /business-loans                             ← Loan products index
│   ├── /business-loans/asset-backed-loans
│   ├── /business-loans/bonds
│   ├── /business-loans/lines-of-credit
│   ├── /business-loans/equipment-financing
│   ├── /business-loans/esop
│   ├── /business-loans/investment-banking
│   └── /business-loans/term-loans
├── /financial-insights                         ← Blog/content hub index
│   ├── /financial-insights/cash-loans-direct
│   ├── /financial-insights/direct-lender-loans-online
│   ├── /financial-insights/first-time-business-loans
│   ├── /financial-insights/invoice-factoring-loans
│   └── /financial-insights/short-term-business-financing
└── /#contact (or similar)                      ← Contact (anchor on homepage)

EXTERNAL LINKS
└── tel:3039218529                                                    ← Phone CTA
```

### Known Issues
- WordPress CMS still serving images (dependency to eliminate)
- Testimonials appear generic/templated (Denny Johnson / Glow Garden, etc.)
- No dedicated contact page (just an anchor)
- No sitemap.xml discovered in search
- No tools section yet
- Financial Insights has only ~5 articles
- "Book a Call" button appears non-functional (links to `#`)
- No structured data / schema markup detected
- No visible analytics or conversion tracking
- About page claims "20 years" but domain/content history doesn't strongly support this

---

## Tech Stack (Local Build, No WordPress)

Building locally with GitHub for version control. Zero WordPress dependency — no headless CMS, no `cms.quicklenders.com`, no database.

```
Framework:       Next.js 14+ (App Router)
Styling:         Tailwind CSS
Components:      shadcn/ui (consistent, accessible)
Charts:          Recharts (for calculator tools)
Animations:      Framer Motion (page transitions, tool interactions)
Content:         MDX files for blog + glossary (version-controlled in the repo)
Forms:           React Hook Form + Zod validation
Email:           Resend or Postmark (transactional — form submissions, tool results)
Analytics:       GA4 + GTM + Microsoft Clarity
Hosting:         Vercel (deploy from GitHub)
Search:          Fuse.js (lightweight client-side for glossary search)
Scheduling:      Cal.com embed (Book a Call)
Chatbot:         Existing Loan Buddy implementation
```

---

## Phase 1: Scaffold, Extract, Build

### 1.1 Clone the Existing Repo

```bash
git clone https://github.com/YOUR_USERNAME/quicklenders.git
cd quicklenders
npm install
```

Run it locally first to understand what you're working with:

```bash
npm run dev
```

### 1.2 Audit What's There

Before changing anything, figure out what the current codebase does:

- [ ] What framework version? Check `package.json` for Next.js version, React version
- [ ] Is it App Router (`app/`) or Pages Router (`pages/`)? Or both?
- [ ] Where does content come from? Look for API calls to `cms.quicklenders.com` — these are the WordPress fetches you need to replace
- [ ] Where are images referenced? Search the codebase for `cms.quicklenders.com/wp-content/uploads`
- [ ] Are there environment variables? Check `.env`, `.env.local`, `.env.example` for WordPress API URLs, keys, etc.
- [ ] What's the current routing structure? Map existing files to the live URLs

```bash
# Quick way to find all WordPress dependencies
grep -r "cms.quicklenders" --include="*.ts" --include="*.tsx" --include="*.js" --include="*.jsx" .
grep -r "wp-json" --include="*.ts" --include="*.tsx" --include="*.js" --include="*.jsx" .
grep -r "wordpress" --include="*.ts" --include="*.tsx" --include="*.js" --include="*.jsx" -i .

# Find environment variables
cat .env* 2>/dev/null
grep -r "process.env" --include="*.ts" --include="*.tsx" --include="*.js" --include="*.jsx" .
```

### 1.3 Install Any Missing Dependencies

Based on what the project needs going forward, add anything not already present:

```bash
# Check what's already installed
cat package.json

# Add what's missing for the rebuild
npm install @next/mdx @mdx-js/loader @mdx-js/react gray-matter next-mdx-remote  # MDX support
npm install framer-motion recharts react-hook-form @hookform/resolvers zod fuse.js  # Tools/UI
npm install -D @types/mdx
```

### 1.4 Target Repository Structure

Reformat the existing project toward this structure. You probably already have some of these directories — keep what works, move what doesn't fit, add what's missing.

```
quicklenders/
├── app/                          ← Next.js App Router pages
│   ├── page.tsx                  ← Homepage (swap in your pre-built version)
│   ├── about-us/
│   ├── contact/
│   ├── business-loans/
│   │   ├── page.tsx
│   │   ├── asset-backed-loans/
│   │   ├── bonds/
│   │   ├── lines-of-credit/
│   │   ├── equipment-financing/
│   │   ├── esop/
│   │   ├── investment-banking/
│   │   └── term-loans/
│   ├── financial-insights/
│   │   ├── page.tsx
│   │   └── [slug]/
│   │       └── page.tsx
│   ├── tools/
│   │   ├── page.tsx
│   │   ├── glossary/
│   │   │   ├── page.tsx
│   │   │   └── [slug]/
│   │   ├── loan-finder-quiz/
│   │   │   ├── page.tsx
│   │   │   └── results/[slug]/
│   │   ├── break-even-analyzer/
│   │   └── equipment-vs-leasing/
│   ├── industries/
│   │   ├── page.tsx
│   │   └── [slug]/
│   ├── privacy-policy/
│   ├── terms-of-service/
│   └── how-it-works/
├── components/
│   ├── layout/                   ← Header, Footer, Nav, Breadcrumbs
│   ├── ui/                       ← shadcn/ui components
│   ├── tools/                    ← Calculator/quiz components
│   ├── cta/                      ← CTA blocks (primary, secondary, contextual)
│   └── seo/                      ← Schema markup, meta tag helpers
├── content/                      ← MDX content files
│   ├── financial-insights/       ← Blog articles as .mdx
│   ├── glossary/                 ← Glossary terms as .mdx or .json
│   ├── industries/               ← Industry pages as .mdx
│   └── loan-products/            ← Loan product content as .mdx
├── lib/
│   ├── metadata.ts               ← Centralized SEO metadata generator
│   ├── schema.ts                 ← JSON-LD schema builders
│   ├── glossary/                 ← Glossary search/filter utils
│   └── quiz/                     ← Quiz scoring engine
├── public/
│   ├── images/                   ← All images (migrated from WordPress)
│   ├── og/                       ← Open Graph images per page
│   └── fonts/                    ← Self-hosted fonts
├── styles/
├── .github/                      ← GitHub Actions (CI/CD, linting)
├── next.config.js
├── tailwind.config.js
├── tsconfig.json
└── package.json
```

Create any directories that don't already exist:

```bash
# Core pages
mkdir -p app/about-us
mkdir -p app/contact
mkdir -p app/business-loans/{asset-backed-loans,bonds,lines-of-credit,equipment-financing,esop,investment-banking,term-loans}
mkdir -p app/financial-insights
mkdir -p app/privacy-policy
mkdir -p app/terms-of-service
mkdir -p app/how-it-works

# Tools (for later)
mkdir -p app/tools/glossary
mkdir -p app/tools/loan-finder-quiz/results
mkdir -p app/tools/break-even-analyzer
mkdir -p app/tools/equipment-vs-leasing

# Industries (for later)
mkdir -p app/industries

# Components, content, lib
mkdir -p components/{layout,ui,tools,cta,seo}
mkdir -p content/{financial-insights,glossary,loan-products,industries}
mkdir -p lib/{glossary,quiz}
mkdir -p public/{images,og,fonts}
```

### 1.5 Replace WordPress Content Fetches

The key job here is finding every place the code fetches from WordPress and replacing it with local static content. There are two patterns to look for:

**Pattern 1: API fetches in server components or `getStaticProps`**
```typescript
// FIND things like this:
const res = await fetch('https://cms.quicklenders.com/wp-json/wp/v2/pages/...');
const data = await res.json();

// REPLACE with local content:
import { getPageContent } from '@/lib/content';
const data = getPageContent('term-loans');
```

**Pattern 2: Image URLs pointing to WordPress**
```typescript
// FIND:
src="https://cms.quicklenders.com/wp-content/uploads/2024/05/some-image.jpg"

// REPLACE:
src="/images/some-image.jpg"  // or use <Image> component
```

If the content is already hardcoded in the components (not fetched from WP), you may just need to clean up image references and remove any WP-related utility files.

### 1.6 Extract Content (if not already in the codebase)

If the current code fetches content from WordPress at build time, you need to capture that content before cutting the WordPress connection. Two approaches:

**Option A: WordPress REST API (if exposed)**

```bash
curl https://cms.quicklenders.com/wp-json/wp/v2/pages?per_page=100
curl https://cms.quicklenders.com/wp-json/wp/v2/posts?per_page=100
```

If those return JSON, script the extraction:

```javascript
// scripts/extract-content.js
// Run with: node scripts/extract-content.js

const fs = require('fs');
const path = require('path');

const BASE = 'https://cms.quicklenders.com/wp-json/wp/v2';

async function extractAll() {
  const pagesRes = await fetch(`${BASE}/pages?per_page=100`);
  const pages = await pagesRes.json();

  const postsRes = await fetch(`${BASE}/posts?per_page=100`);
  const posts = await postsRes.json();

  const outDir = path.join(__dirname, '..', 'content-export');
  fs.mkdirSync(outDir, { recursive: true });

  for (const page of pages) {
    const filename = `page-${page.slug}.json`;
    fs.writeFileSync(
      path.join(outDir, filename),
      JSON.stringify({
        title: page.title.rendered,
        slug: page.slug,
        content: page.content.rendered,
        excerpt: page.excerpt.rendered,
        meta_title: page.yoast_head_json?.title || page.title.rendered,
        meta_description: page.yoast_head_json?.description || '',
      }, null, 2)
    );
    console.log(`Exported: ${filename}`);
  }

  for (const post of posts) {
    const filename = `post-${post.slug}.json`;
    fs.writeFileSync(
      path.join(outDir, filename),
      JSON.stringify({
        title: post.title.rendered,
        slug: post.slug,
        content: post.content.rendered,
        excerpt: post.excerpt.rendered,
        date: post.date,
        meta_title: post.yoast_head_json?.title || post.title.rendered,
        meta_description: post.yoast_head_json?.description || '',
      }, null, 2)
    );
    console.log(`Exported: ${filename}`);
  }
}

extractAll();
```

**Option B: Manual Copy (if the API is locked down)**

Go page by page — view source or dev tools, copy text content, save as MDX:

```
PAGES TO EXTRACT:
☐ /about-us
☐ /business-loans (index)
☐ /business-loans/asset-backed-loans
☐ /business-loans/bonds
☐ /business-loans/lines-of-credit
☐ /business-loans/equipment-financing
☐ /business-loans/esop
☐ /business-loans/investment-banking
☐ /business-loans/term-loans
☐ /financial-insights (index)
☐ /financial-insights/cash-loans-direct
☐ /financial-insights/direct-lender-loans-online
☐ /financial-insights/first-time-business-loans
☐ /financial-insights/invoice-factoring-loans
☐ /financial-insights/short-term-business-financing

NOTE: Homepage is pre-built — no extraction needed.
```

Save each as an MDX file:

```mdx
---
title: "Asset-Backed Loans from Quick Lenders"
description: "Use your assets as collateral with Quick Lenders' asset backed loans. Fast funding, and reliable service."
slug: "asset-backed-loans"
---

[Paste the page content here, converted to markdown]
```

### 1.7 Download All Images from WordPress

```bash
mkdir -p public/images

# Option 1: wget spider to find all image URLs
wget --spider --recursive --no-parent --accept=jpg,jpeg,png,gif,webp,svg \
  https://quicklenders.com/ 2>&1 | grep "cms.quicklenders.com" > image-urls.txt

# Option 2: Direct server access
scp -r user@server:/var/www/html/wp-content/uploads/ ./wordpress-images/

# Option 3: Download individually
curl -o public/images/hero-home-bg.png "https://cms.quicklenders.com/wp-content/uploads/2024/05/hero-image.png"
```

Move all images into `public/images/` with clean names. Next.js `<Image>` handles optimization at serve time.

### 1.8 URL Preservation Checklist

Every URL must resolve to the exact same path in the new build. No trailing slash changes, no case changes, no restructuring.

| Current URL | New Route File | Status |
|---|---|---|
| `/` | `app/page.tsx` (pre-built homepage) | ☐ |
| `/about-us` | `app/about-us/page.tsx` | ☐ |
| `/business-loans` | `app/business-loans/page.tsx` | ☐ |
| `/business-loans/asset-backed-loans` | `app/business-loans/asset-backed-loans/page.tsx` | ☐ |
| `/business-loans/bonds` | `app/business-loans/bonds/page.tsx` | ☐ |
| `/business-loans/lines-of-credit` | `app/business-loans/lines-of-credit/page.tsx` | ☐ |
| `/business-loans/equipment-financing` | `app/business-loans/equipment-financing/page.tsx` | ☐ |
| `/business-loans/esop` | `app/business-loans/esop/page.tsx` | ☐ |
| `/business-loans/investment-banking` | `app/business-loans/investment-banking/page.tsx` | ☐ |
| `/business-loans/term-loans` | `app/business-loans/term-loans/page.tsx` | ☐ |
| `/financial-insights` | `app/financial-insights/page.tsx` | ☐ |
| `/financial-insights/cash-loans-direct` | `app/financial-insights/[slug]/page.tsx` | ☐ |
| `/financial-insights/direct-lender-loans-online` | `app/financial-insights/[slug]/page.tsx` | ☐ |
| `/financial-insights/first-time-business-loans` | `app/financial-insights/[slug]/page.tsx` | ☐ |
| `/financial-insights/invoice-factoring-loans` | `app/financial-insights/[slug]/page.tsx` | ☐ |
| `/financial-insights/short-term-business-financing` | `app/financial-insights/[slug]/page.tsx` | ☐ |

### 1.9 Redirect Safety Net

```typescript
// next.config.js
async redirects() {
  return [
    { source: '/wp-content/:path*', destination: '/', permanent: true },
    { source: '/wp-admin/:path*', destination: '/', permanent: true },
    { source: '/wp-login.php', destination: '/', permanent: true },
  ]
}
```

---

## Phase 2: Build the Pages

### 2.1 Root Layout

```typescript
// app/layout.tsx

import { Inter } from 'next/font/google';
import './globals.css';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';

const inter = Inter({ subsets: ['latin'] });

export const metadata = {
  metadataBase: new URL('https://quicklenders.com'),
  title: {
    default: 'Quick Lenders | Rapid Business Loans & Financing Made Easy',
    template: '%s | Quick Lenders',
  },
  description: 'Fast, reliable business funding. Explore term loans, lines of credit, equipment financing, and more.',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <Header />
        <main>{children}</main>
        <Footer />
      </body>
    </html>
  );
}
```

### 2.2 Homepage

Your homepage is pre-built. Drop it into `app/page.tsx`. Make sure it:
- Uses Next.js `<Image>` for any images (not raw `<img>`)
- Uses Next.js `<Link>` for internal navigation (not `<a>`)
- Has the correct metadata export
- References local images from `public/images/` (not `cms.quicklenders.com`)

### 2.3 Loan Product Page Template

Use this as the template for all 7 loan product pages:

```typescript
// app/business-loans/term-loans/page.tsx

import { Metadata } from 'next';
import Image from 'next/image';
import Link from 'next/link';

export const metadata: Metadata = {
  title: 'Business Term Loans — Flexible Financing | Quick Lenders',
  description: 'Term loans from $30,000 to $10 million with 1-3 year terms. Fast approval, same-day funding available. Apply in 5 minutes.',
  alternates: {
    canonical: 'https://quicklenders.com/business-loans/term-loans',
  },
  openGraph: {
    title: 'Business Term Loans | Quick Lenders',
    description: 'Term loans from $30,000 to $10 million with 1-3 year terms.',
    url: 'https://quicklenders.com/business-loans/term-loans',
    siteName: 'Quick Lenders',
    type: 'website',
  },
};

export default function TermLoansPage() {
  return (
    <>
      {/* JSON-LD Schema */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            '@context': 'https://schema.org',
            '@type': 'FinancialProduct',
            name: 'Business Term Loan',
            provider: {
              '@type': 'FinancialService',
              name: 'Quick Lenders',
              url: 'https://quicklenders.com',
            },
            description: 'Flexible business term loans from $30,000 to $10 million.',
            amount: {
              '@type': 'MonetaryAmount',
              minValue: 30000,
              maxValue: 10000000,
              currency: 'USD',
            },
          }),
        }}
      />

      {/* Breadcrumb */}
      <nav aria-label="Breadcrumb">
        <ol>
          <li><Link href="/">Home</Link></li>
          <li><Link href="/business-loans">Business Loans</Link></li>
          <li>Term Loans</li>
        </ol>
      </nav>

      <h1>Business Term Loans</h1>

      {/* Paste existing page content here */}

      {/* CTA — links to on-site lead capture form */}
      <Link href="/get-started?loan_type=term-loans&source=loan-page">
        Get Your Options
      </Link>
    </>
  );
}
```

### 2.4 Financial Insights (MDX Blog)

Dynamic routes powered by MDX files:

```typescript
// app/financial-insights/[slug]/page.tsx

import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';
import { MDXRemote } from 'next-mdx-remote/rsc';
import { Metadata } from 'next';

const contentDir = path.join(process.cwd(), 'content/financial-insights');

export function generateStaticParams() {
  const files = fs.readdirSync(contentDir);
  return files
    .filter((f) => f.endsWith('.mdx'))
    .map((f) => ({ slug: f.replace('.mdx', '') }));
}

export function generateMetadata({ params }: { params: { slug: string } }): Metadata {
  const file = fs.readFileSync(path.join(contentDir, `${params.slug}.mdx`), 'utf8');
  const { data } = matter(file);
  return {
    title: data.title,
    description: data.description,
    alternates: {
      canonical: `https://quicklenders.com/financial-insights/${params.slug}`,
    },
  };
}

export default function ArticlePage({ params }: { params: { slug: string } }) {
  const file = fs.readFileSync(path.join(contentDir, `${params.slug}.mdx`), 'utf8');
  const { content, data } = matter(file);

  return (
    <article>
      <h1>{data.title}</h1>
      <MDXRemote source={content} />
    </article>
  );
}
```

Content files live at `content/financial-insights/[slug].mdx`:

```mdx
---
title: "First Time Business Loans: Entrepreneurs Guide"
description: "Find fast and easy to understand steps to improve your chances to secure your first business loan."
date: "2024-07-08"
---

[Article content in markdown]
```

Adding a new article = adding a new `.mdx` file and pushing to GitHub.

---

## Phase 3: Technical SEO Foundation

Build this INTO the pages as you go — not as a separate pass afterward.

### 3.1 Sitemap & Robots

**`/public/robots.txt`**
```
User-agent: *
Allow: /

Sitemap: https://quicklenders.com/sitemap.xml

Disallow: /wp-admin/
Disallow: /wp-content/
Disallow: /wp-includes/
```

**Dynamic Sitemap** (`app/sitemap.ts`)
```typescript
export default function sitemap() {
  const baseUrl = 'https://quicklenders.com';

  const staticPages = [
    { url: baseUrl, lastModified: new Date(), changeFrequency: 'monthly', priority: 1.0 },
    { url: `${baseUrl}/about-us`, lastModified: new Date(), changeFrequency: 'monthly', priority: 0.6 },
    { url: `${baseUrl}/contact`, lastModified: new Date(), changeFrequency: 'monthly', priority: 0.6 },
    { url: `${baseUrl}/business-loans`, lastModified: new Date(), changeFrequency: 'monthly', priority: 0.9 },
    // ... all loan product pages at priority 0.8
    // ... all financial-insights pages at priority 0.7
    // ... all tool pages at priority 0.7-0.8 (when built)
    // ... all glossary pages at priority 0.6 (when built)
  ];

  return staticPages;
}
```

### 3.2 Schema Markup (JSON-LD)

Add structured data to EVERY page. This is a massive gap right now.

**Global (layout) — Organization schema:**
```json
{
  "@context": "https://schema.org",
  "@type": "FinancialService",
  "name": "Quick Lenders",
  "url": "https://quicklenders.com",
  "logo": "https://quicklenders.com/images/quicklenders-logo.png",
  "telephone": "+1-303-921-8529",
  "address": {
    "@type": "PostalAddress",
    "addressRegion": "CO",
    "addressCountry": "US"
  },
  "sameAs": [],
  "openingHoursSpecification": {
    "@type": "OpeningHoursSpecification",
    "dayOfWeek": ["Monday","Tuesday","Wednesday","Thursday","Friday"],
    "opens": "09:00",
    "closes": "17:00"
  }
}
```

**Loan product pages — FinancialProduct schema:**
```json
{
  "@context": "https://schema.org",
  "@type": "FinancialProduct",
  "name": "Business Term Loan",
  "provider": { "@type": "FinancialService", "name": "Quick Lenders" },
  "description": "...",
  "amount": { "@type": "MonetaryAmount", "minValue": 30000, "maxValue": 10000000, "currency": "USD" },
  "interestRate": { "@type": "QuantitativeValue", "minValue": 10, "maxValue": 25, "unitText": "PERCENT" }
}
```

**Blog/article pages — Article schema:**
```json
{
  "@context": "https://schema.org",
  "@type": "Article",
  "headline": "...",
  "datePublished": "...",
  "dateModified": "...",
  "author": { "@type": "Organization", "name": "Quick Lenders" },
  "publisher": { "@type": "Organization", "name": "Quick Lenders" }
}
```

**FAQ sections — FAQPage schema** (on any page with FAQs)

**BreadcrumbList** — on every page except homepage

### 3.3 Meta Tags System

Create a centralized metadata utility:

```typescript
// lib/metadata.ts
export function generatePageMetadata(page: {
  title: string;
  description: string;
  path: string;
  ogImage?: string;
  type?: string;
}) {
  return {
    title: page.title,
    description: page.description,
    alternates: { canonical: `https://quicklenders.com${page.path}` },
    openGraph: {
      title: page.title,
      description: page.description,
      url: `https://quicklenders.com${page.path}`,
      siteName: 'Quick Lenders',
      type: page.type || 'website',
      images: [{ url: page.ogImage || '/og/default.png', width: 1200, height: 630 }],
    },
    twitter: {
      card: 'summary_large_image' as const,
      title: page.title,
      description: page.description,
      images: [page.ogImage || '/og/default.png'],
    },
  };
}
```

### 3.4 Core Web Vitals

- [ ] All images use Next.js `<Image>` with proper `width`, `height`, and `priority` for above-fold
- [ ] Fonts loaded via `next/font` (not external CDN)
- [ ] No layout shift on any page (CLS < 0.1)
- [ ] JavaScript bundle analyzed — remove unused deps
- [ ] Lazy load below-fold images and components

### 3.5 Technical Hygiene

- [ ] Custom 404 page with helpful navigation
- [ ] Consistent trailing slash handling (pick one, enforce in `next.config.js`)
- [ ] `rel="noopener noreferrer"` on all external links
- [ ] All images have alt text, proper heading hierarchy (one H1 per page), ARIA labels on interactive elements
- [ ] Mobile viewport properly set
- [ ] Favicon and web manifest

---

## Phase 4: Missing Pages & Structural Gaps

Pages the site should have had from the start.

### 4.1 Dedicated Contact Page (`/contact`)

Currently the "Contact" nav link goes to `/#` which is broken. Build a real page:

- Business hours
- Phone number (click-to-call)
- Contact form (name, email, phone, loan type interest, message)
- Physical address or at least state/region
- "Book a Call" scheduling widget (Cal.com embed)
- FAQ: "How quickly will someone get back to me?" etc.

### 4.2 Privacy Policy & Terms of Service

**Routes:** `/privacy-policy`, `/terms-of-service`

Mandatory for legal compliance (especially handling lead form data), Google Ads eligibility, and trust signals.

### 4.3 Loan Application Checklist

**Route:** `/business-loans/application-checklist`

Lists exactly what documents a borrower should have ready. Reduces friction, sets expectations before your team reaches out. Ranks for "what do I need to apply for a business loan."

- Recent business bank statements (3-6 months)
- Business tax returns (2 years)
- Personal tax returns
- Profit & loss statement
- Business plan (for startups)
- Government-issued ID
- Proof of business ownership

### 4.4 Industries We Serve (`/industries/[slug]`)

Programmatic SEO play. Each page targets "[industry] business loan" keywords:

- Construction & Contractors
- Restaurants & Food Service
- Healthcare & Medical Practices
- Transportation & Trucking
- Retail & E-commerce
- Manufacturing
- Professional Services
- Real Estate
- Auto & Repair
- Franchises

Each page: 400-600 words on common financing needs in that industry, which QuickLenders products fit, and a CTA.

### 4.5 How It Works Page (`/how-it-works`)

The homepage has a brief 3-step section. A full dedicated page would set expectations on timeline, address concerns ("Will this affect my credit score?"), and rank for "how to get a business loan" queries.

---

## Phase 5: Trust & Credibility Overhaul

### 5.1 Testimonials Problem

The current testimonials feel fabricated — "Denny Johnson — Glow Garden," "Mark Evans — Sky Bound Drones," "Justice Taylor — Culinary Canvas." Real prospects will notice.

**Fix options:**
- Replace with real testimonials from actual borrowers (even if you only have 2-3)
- Remove the section entirely until you have real ones
- Replace with data-driven trust signals: "$X million funded," "Y+ businesses served," "Z-day average funding"
- Add logos of lending partners or funding sources (with permission)

### 5.2 About Page Credibility

- [ ] Add a real founder/team section with headshot(s) and brief bio
- [ ] Specific stats: number of businesses funded, total capital deployed
- [ ] Remove or substantiate the "20 years" claim
- [ ] Add LinkedIn profile links for team members
- [ ] Consider a short founder's story

### 5.3 Social Proof

- [ ] Google Business Profile — set up and link to site
- [ ] BBB listing (even a basic one adds trust for lending)
- [ ] Trust badges: "SSL Secured," "No Credit Impact to Apply," etc.
- [ ] Partner logos (lending partners)

### 5.4 Book a Call — Make It Work

The "Book a Call" button currently goes nowhere. Embed Cal.com with your actual availability. This is a high-intent CTA — every dead click is a lost lead.

---

## Phase 6: Content Strategy & Expansion

### 6.1 Current Content Audit

| Article | Quality | SEO Potential |
|---------|---------|---------------|
| cash-loans-direct | Medium | Low — generic |
| direct-lender-loans-online | Low | Low — thin |
| first-time-business-loans | Medium | High |
| invoice-factoring-loans | Medium | Medium |
| short-term-business-financing | Medium | High |

### 6.2 Content Roadmap — Priority Articles

**Tier 1: High-intent, tied to products** (publish first)
1. "How to Get a Business Loan in 2026: Step-by-Step Guide"
2. "Business Loan Requirements: What Lenders Look For"
3. "Best Business Loans for Bad Credit"
4. "How Fast Can You Get a Business Loan?"
5. "SBA Loan vs. Term Loan: Which Is Right for You?"
6. "How to Write a Business Plan for a Loan Application"

**Tier 2: Comparison and decision content** (mid-funnel)
7. "Term Loan vs. Line of Credit: Complete Comparison"
8. "Equipment Loan vs. Equipment Lease: Pros and Cons"
9. "Merchant Cash Advance vs. Business Loan"
10. "Business Loan vs. Business Credit Card"
11. "Fixed vs. Variable Interest Rates for Business Loans"

**Tier 3: Industry-specific** (long-tail SEO)
12. "Business Loans for Restaurants: What You Need to Know"
13. "Construction Equipment Financing Guide"
14. "How to Finance a Medical Practice"
15. "Trucking Company Financing Options"

**Tier 4: Educational/evergreen** (topical authority)
16. "Business Credit Score: How to Build and Improve Yours"
17. "Understanding UCC Filings: What Borrowers Need to Know"
18. "What Is a Personal Guarantee on a Business Loan?"
19. "How to Calculate Your Debt Service Coverage Ratio"
20. "Business Loan Interest Rates: What to Expect in 2026"

### 6.3 Content Quality Standards

Each article should:
- Be 1,500-2,500 words
- Include an FAQ section with schema markup (3-5 questions)
- Link to at least 2 relevant loan product pages
- Link to at least 1 tool (once built)
- Include a primary CTA (apply) and secondary CTA (quiz/calculator)
- Unique meta title (<60 chars) and description (<155 chars)
- Proper heading hierarchy (one H1, structured H2s and H3s)
- At least one original visual (chart, comparison table, infographic)

---

## Phase 7: Conversion Rate Optimization

### 7.1 Lead Capture Form (`/get-started`)

This is now the primary conversion point. Every CTA on the site leads here. The form collects enough info to gauge the prospect's needs so your team can reach out with the right conversation.

**Route:** `/get-started`

**Form fields:**
- Full name
- Business name
- Email
- Phone number
- Loan type interest (dropdown: Term Loan, Line of Credit, Equipment Financing, Asset-Based, ESOP, Investment Banking, Bonds, Not Sure)
- Estimated amount needed (dropdown: ranges)
- Time in business (dropdown: <1 year, 1-2, 3-5, 5-10, 10+)
- How soon do you need funding? (dropdown: ASAP, 1-2 weeks, 1-3 months, Just exploring)
- Anything else we should know? (optional textarea)

**After submission:**
- Thank you page with clear next-step expectation ("We'll reach out within 1 business day")
- Confirmation email to the prospect with a summary of what they submitted
- Internal notification to your team (email, Slack, or CRM alert)
- Lead stored in database (Supabase, Airtable, or CRM)

**URL parameter support:** The form should accept URL params to pre-fill fields:
- `/get-started?loan_type=equipment-financing&source=loan-page` — pre-selects equipment financing
- `/get-started?loan_type=not-sure&source=quiz-result&quiz_result=term-loan` — captures quiz context
- Track source param for attribution (which page sent the lead)

### 7.2 Lead Management

You need somewhere to store and manage leads:

**Lightweight (start here):**
- Airtable base with a "Leads" table — form submissions write via API
- Each row: name, email, phone, loan type, amount, timestamp, source page, status (New → Contacted → Qualified → Closed)
- Airtable automations: send Slack notification on new lead, send confirmation email

**Upgrade later:**
- HubSpot (free CRM tier) or Pipedrive for pipeline management
- Supabase or PlanetScale if you want a real database
- Integrate with Calendly/Cal.com so leads can self-schedule a call from the thank-you page

### 7.3 Additional Lead Capture Points

Not every visitor is ready to fill out the full form. Capture lighter-touch leads too:

- "Email me my results" on calculator tools (just email + results)
- "Download our free Business Loan Guide" (email for PDF)
- Newsletter signup on blog articles (email only)
- "Book a Call" via Cal.com (name, email, phone, time slot)
- Exit intent popup (one per session): "Not ready to apply? Download our loan readiness checklist"
- Loan Buddy chatbot can collect name + email + need during conversation

### 7.4 On-Page CTA Strategy

Every page should have:
- **Above-fold CTA** — visible without scrolling
- **Mid-content CTA** — after the user has absorbed value
- **Bottom CTA** — catches anyone who read the whole page
- **Sticky mobile CTA** — fixed bottom bar with "Get Your Options" or "Call Us"

CTAs vary by page type:
- Loan product pages → "Get Your Options" (primary) + "Speak with Advisor" (secondary)
- Blog articles → "Find your best loan → Take our quiz" + "Get Started"
- Tools → Contextual based on output + "Get Your Options"
- Homepage → "See What You Qualify For" + "Find the Right Loan" (quiz)

CTA language should never say "Apply Now" — you're not an application, you're a consultation. Use:
- "Get Your Options"
- "Check Your Rate"
- "See What You Qualify For"
- "Talk to an Advisor"
- "Get Started"
- "Request a Consultation"

---

## Phase 8: Deploy to Vercel & Point Domain

### 8.1 Connect to Vercel

1. Go to [vercel.com](https://vercel.com) — sign in with GitHub
2. Click "Add New Project"
3. Import your `quicklenders` repository
4. Vercel auto-detects Next.js — accept defaults
5. Click "Deploy"

Vercel gives you: HTTPS/SSL, CDN, preview deployments for every PR, automatic builds on every push.

### 8.2 Point Your Domain

**In Vercel:** Settings → Domains → Add `quicklenders.com`

**At your registrar, one of:**

Option A — Vercel DNS (recommended):
```
Nameservers:
ns1.vercel-dns.com
ns2.vercel-dns.com
```

Option B — Keep current DNS, add records:
```
Type: A     | Name: @   | Value: 76.76.21.21
Type: CNAME | Name: www | Value: cname.vercel-dns.com
```

**Do NOT point the domain until you've verified on the Vercel preview URL:**
- [ ] Every page from the URL map renders correctly
- [ ] All images load from local files (nothing from `cms.quicklenders.com`)
- [ ] Lead capture form submits and stores data correctly
- [ ] Confirmation emails send on form submission
- [ ] Phone number is click-to-call
- [ ] Site looks right on mobile
- [ ] Meta titles and descriptions set on every page

DNS propagation takes 15 minutes to 48 hours. During this window some visitors see the old site, some see the new. That's normal.

### 8.3 Kill WordPress

After the new site has been live and stable for at least 48 hours:

1. Back up everything from WordPress one final time (store locally just in case)
2. Remove the `cms.quicklenders.com` DNS record
3. Cancel WordPress hosting
4. Confirm no images or content still reference `cms.quicklenders.com`

---

## Phase 9: Analytics & Measurement

### 9.1 Analytics Setup

- [ ] Google Analytics 4 — fresh property
- [ ] Google Search Console — verify, submit sitemap
- [ ] Google Tag Manager — centralize all event tracking
- [ ] Microsoft Clarity (free) — heatmaps and session recordings

### 9.2 Event Tracking

| Event | Trigger |
|---|---|
| `lead_form_submit` | Lead capture form completed |
| `lead_form_start` | First field focused on lead form |
| `phone_call` | Click on phone number |
| `book_call_click` | Click Book a Call |
| `tool_start` | First interaction with any tool |
| `tool_complete` | Tool produces output/results |
| `quiz_complete` | Quiz result shown |
| `email_capture` | Any email submitted (tools, downloads, newsletter) |
| `pdf_download` | Any PDF downloaded |
| `blog_scroll_75` | Scroll > 75% on blog article |

### 9.3 Conversion Funnels

```
Primary:    Landing Page → Loan Product Page → Lead Form → Your Team Follows Up
Tool:       Landing Page → Tool/Quiz → Result → Lead Form → Your Team Follows Up
Content:    Blog Article → Loan Product Page → Lead Form → Your Team Follows Up
Glossary:   Glossary Term → Related Loan Product → Lead Form → Your Team Follows Up
```

### 9.4 Monthly Metrics

- Organic sessions (total + by page cluster)
- Keyword rankings for target terms (top 50)
- Pages indexed (Search Console)
- Core Web Vitals scores
- CTR from SERPs (Search Console)
- **Lead form submissions (total + by source page)**
- **Lead-to-contact rate (how many you actually reach)**
- **Lead-to-qualified rate**
- Backlinks acquired

---

## Phase 10: Post-Migration Verification

### Google Search Console

1. Verify the property (TXT record or HTML file method)
2. Submit sitemap: `https://quicklenders.com/sitemap.xml`
3. Use "URL Inspection" to check each critical page is indexable
4. Monitor "Pages" report for 2+ weeks for indexing drops

### Broken Link Check

```bash
npx broken-link-checker https://quicklenders.com --recursive --ordered
```

### Monitor Rankings

For 2-4 weeks after migration:
- Search Console → Performance tab (clicks, impressions, position)
- Search "Quick Lenders" — confirm you still appear
- Search key pages: "quick lenders term loans," "quick lenders equipment financing"
- Any significant ranking drop = something is wrong (missing page, broken redirect, etc.)

---

## Phase 11: Backlink & Authority Building

### Linkable Assets

| Asset | Link Potential | Outreach Strategy |
|---|---|---|
| Glossary terms | High | Finance education sites, college business programs |
| Loan Finder Quiz | High | Small business blogs, entrepreneur communities |
| Break-Even Analyzer | Medium-High | Business planning sites, SCORE mentors |
| Equipment Calculator | Medium | Industry-specific blogs (construction, trucking) |
| Blog articles | Medium | Guest posting with links back |

### Outreach Targets

- SCORE.org and local SCORE chapters
- SBA resource pages
- Small business blogs (Fit Small Business, NerdWallet community)
- Industry associations (state contractor boards, restaurant associations)
- Local Colorado business resources
- Finance/lending industry publications
- University entrepreneurship programs

### Content Syndication

- Repurpose blog articles into LinkedIn posts
- Short video summaries of tools for YouTube/TikTok
- Expert quotes via HARO/Connectively
- Guest posts on complementary finance blogs

---

## Git Workflow

- `main` branch → auto-deploys to production via Vercel
- `staging` branch → deploys to preview/staging URL
- Feature branches for each tool build, content batch, etc.
- Content updates (new articles, glossary terms) = PRs adding MDX files
- GitHub Actions: lint, type-check, build on every PR

---

## Order of Operations

```
SETUP
  1. Clone existing repo, npm install, run locally
  2. Audit codebase — find all WordPress fetches, image refs, env vars
  3. Connect repo to Vercel (if not already)

REFORMAT
  4. Replace all WordPress API fetches with local static content
  5. Download all images, replace cms.quicklenders.com refs with /images/ paths
  6. Restructure directories toward target layout (if needed)
  7. Swap in pre-built homepage
  8. Rebuild/clean all 7 loan product pages
  9. Rebuild/clean about-us page
  10. Set up MDX for financial-insights + migrate 5 articles
  11. Build contact page (new)
  12. Build privacy policy + terms of service (new)
  13. Add sitemap.xml, robots.txt, schema markup
  14. Add/fix meta tags on every page
  15. Remove any leftover WordPress utility files, API helpers, env vars

LAUNCH
  16. Test everything on Vercel preview URL
  17. Point domain to Vercel
  18. Verify in Search Console
  19. Monitor for 2 weeks
  20. Cancel WordPress hosting

POST-LAUNCH (ongoing)
  21. Fix trust signals (testimonials, about page, Book a Call)
  22. Build new pages (how-it-works, application-checklist, industries)
  23. Publish new Financial Insights articles
  24. Build tools (quiz, calculators, glossary)
  25. Start outreach and link building
```

Setup takes ~30 minutes. The audit and WordPress removal is the critical first pass — once you've identified every WordPress dependency, the rest is systematic replacement.
