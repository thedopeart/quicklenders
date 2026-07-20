import { MetadataRoute } from 'next'
import { getAllArticles } from '@/lib/content'

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = 'https://quicklenders.com'

  const loanSlugs = [
    'term-loans',
    'lines-of-credit',
    'asset-backed-loans',
    'equipment-financing',
    'esop',
    'investment-banking',
    'bonds',
  ]

  const toolSlugs = [
    'loan-payment-calculator',
    'factor-rate-to-apr-calculator',
    'break-even-calculator',
    'loan-finder-quiz',
    'dscr-calculator',
    'loan-affordability-calculator',
    'line-of-credit-interest-calculator',
    'invoice-factoring-calculator',
    'equipment-financing-calculator',
    'business-loan-comparison-tool',
    'working-capital-calculator',
    'sba-loan-payment-calculator',
    'roi-calculator',
    'startup-cost-calculator',
    'prepayment-penalty-calculator',
    'cash-flow-forecast-tool',
    'business-valuation-calculator',
    'loan-offer-analyzer',
    'loan-rejection-decoder',
    'total-cost-of-capital-calculator',
    'refinance-savings-calculator',
    'mca-payback-calculator',
    'funding-readiness-assessment',
    'loan-document-checklist',
    'business-loan-glossary',
    'interest-rate-comparison-chart',
  ]


  return [
    { url: baseUrl, lastModified: new Date(), changeFrequency: 'monthly', priority: 1.0 },
    { url: `${baseUrl}/about-us`, lastModified: new Date(), changeFrequency: 'monthly', priority: 0.6 },
    { url: `${baseUrl}/contact`, lastModified: new Date(), changeFrequency: 'monthly', priority: 0.6 },
    { url: `${baseUrl}/get-started`, lastModified: new Date(), changeFrequency: 'monthly', priority: 0.9 },
    { url: `${baseUrl}/business-loans`, lastModified: new Date(), changeFrequency: 'monthly', priority: 0.9 },
    ...loanSlugs.map((slug) => ({
      url: `${baseUrl}/business-loans/${slug}`,
      lastModified: new Date(),
      changeFrequency: 'monthly' as const,
      priority: 0.8,
    })),
    { url: `${baseUrl}/tools`, lastModified: new Date(), changeFrequency: 'weekly', priority: 0.8 },
    ...toolSlugs.map((slug) => ({
      url: `${baseUrl}/tools/${slug}`,
      lastModified: new Date(),
      changeFrequency: 'monthly' as const,
      priority: 0.8,
    })),
    { url: `${baseUrl}/financial-insights`, lastModified: new Date(), changeFrequency: 'weekly', priority: 0.7 },
    // Blog posts come straight from content/financial-insights so the
    // sitemap can't drift when a new .mdx lands. Dates are the post's own
    // (clamped to now: Google distrusts future lastmod values).
    ...getAllArticles().map((article) => ({
      url: `${baseUrl}/financial-insights/${article.slug}`,
      lastModified: new Date(Math.min(new Date(article.date).getTime(), Date.now())),
      changeFrequency: 'monthly' as const,
      priority: 0.7,
    })),
    { url: `${baseUrl}/privacy-policy`, lastModified: new Date(), changeFrequency: 'yearly', priority: 0.3 },
    { url: `${baseUrl}/california-privacy-policy`, lastModified: new Date(), changeFrequency: 'yearly', priority: 0.3 },
    { url: `${baseUrl}/terms-of-service`, lastModified: new Date(), changeFrequency: 'yearly', priority: 0.3 },
    { url: `${baseUrl}/editorial-policy`, lastModified: new Date(), changeFrequency: 'yearly', priority: 0.3 },
    { url: `${baseUrl}/advertiser-disclosure`, lastModified: new Date(), changeFrequency: 'yearly', priority: 0.3 },
  ]
}
