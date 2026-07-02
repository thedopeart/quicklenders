import { Metadata } from 'next'

// Section tag shown as the chip on the generated OG card, derived from the path.
function ogTagForPath(path: string): string {
  if (path.startsWith('/business-loans/')) return 'Business Loans'
  if (path.startsWith('/tools/')) return 'Free Tool'
  if (path.startsWith('/financial-insights/')) return 'Insights'
  return ''
}

// Branded share image, unique per page (title + section chip), rendered by
// app/api/og/route.tsx. Replaces the old /og/default.png reference, which
// pointed at a file that never existed.
function defaultOgImage(title: string, path: string): string {
  const tag = ogTagForPath(path)
  return `/api/og?v=2&title=${encodeURIComponent(title)}${tag ? `&tag=${encodeURIComponent(tag)}` : ''}`
}

export function generatePageMetadata(page: {
  title: string
  description: string
  path: string
  ogImage?: string
  type?: string
}): Metadata {
  const ogImage = page.ogImage || defaultOgImage(page.title, page.path)
  return {
    title: page.title,
    description: page.description,
    alternates: { canonical: `https://quicklenders.com${page.path}` },
    openGraph: {
      title: page.title,
      description: page.description,
      url: `https://quicklenders.com${page.path}`,
      siteName: 'Quick Lenders',
      type: (page.type as 'website' | 'article') || 'website',
      images: [{ url: ogImage, width: 1200, height: 630 }],
    },
    twitter: {
      card: 'summary_large_image',
      title: page.title,
      description: page.description,
      images: [ogImage],
    },
  }
}
