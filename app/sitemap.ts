import { MetadataRoute } from 'next'

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
  ]

  const blogSlugs = [
    'bootstrapping-finance',
    'cash-loans-direct',
    'direct-lender-loans-online',
    'first-time-business-loans',
    'first-time-personal-loans-with-no-credit-history',
    'how-to-get-vc-financing',
    'pre-seed-funding',
    'how-to-improve-credit-fast',
    'invoice-financing',
    'large-business-loans',
    'long-term-business-loans',
    'no-collateral-business-loan',
    'online-loans-for-poor-credit-score',
    'small-business-equipment-financing',
    'short-term-business-financing',
    'how-to-get-a-startup-business-loan-with-bad-credit',
    'secured-vs-unsecured-loans-which-is-better',
    'venture-capital-funding-from-investors',
    'invoice-factoring-loans',
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
    ...blogSlugs.map((slug) => ({
      url: `${baseUrl}/financial-insights/${slug}`,
      lastModified: new Date(),
      changeFrequency: 'monthly' as const,
      priority: 0.7,
    })),
    { url: `${baseUrl}/privacy-policy`, lastModified: new Date(), changeFrequency: 'yearly', priority: 0.3 },
    { url: `${baseUrl}/california-privacy-policy`, lastModified: new Date(), changeFrequency: 'yearly', priority: 0.3 },
    { url: `${baseUrl}/terms-of-service`, lastModified: new Date(), changeFrequency: 'yearly', priority: 0.3 },
  ]
}
