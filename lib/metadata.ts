import { Metadata } from 'next'

export function generatePageMetadata(page: {
  title: string
  description: string
  path: string
  ogImage?: string
  type?: string
}): Metadata {
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
      images: [{ url: page.ogImage || '/og/default.png', width: 1200, height: 630 }],
    },
    twitter: {
      card: 'summary_large_image',
      title: page.title,
      description: page.description,
      images: [page.ogImage || '/og/default.png'],
    },
  }
}
