export function organizationSchema() {
  return {
    '@context': 'https://schema.org',
    '@type': 'FinancialService',
    name: 'Quick Lenders',
    url: 'https://quicklenders.com',
    logo: 'https://quicklenders.com/assets/images/logos/temp-logo-landscape-light-xs.png',
    telephone: '+1-303-921-8529',
    address: {
      '@type': 'PostalAddress',
      addressRegion: 'CO',
      addressCountry: 'US',
    },
    openingHoursSpecification: {
      '@type': 'OpeningHoursSpecification',
      dayOfWeek: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday'],
      opens: '09:00',
      closes: '17:00',
    },
  }
}

export function financialProductSchema(product: {
  name: string
  description: string
  minAmount: number
  maxAmount: number
  minRate?: number
  maxRate?: number
}) {
  return {
    '@context': 'https://schema.org',
    '@type': 'FinancialProduct',
    name: product.name,
    provider: {
      '@type': 'FinancialService',
      name: 'Quick Lenders',
      url: 'https://quicklenders.com',
    },
    description: product.description,
    amount: {
      '@type': 'MonetaryAmount',
      minValue: product.minAmount,
      maxValue: product.maxAmount,
      currency: 'USD',
    },
    ...(product.minRate && product.maxRate
      ? {
          interestRate: {
            '@type': 'QuantitativeValue',
            minValue: product.minRate,
            maxValue: product.maxRate,
            unitText: 'PERCENT',
          },
        }
      : {}),
  }
}

export function breadcrumbSchema(items: { name: string; url: string }[]) {
  return {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: items.map((item, index) => ({
      '@type': 'ListItem',
      position: index + 1,
      name: item.name,
      item: `https://quicklenders.com${item.url}`,
    })),
  }
}

export function faqSchema(faqs: { question: string; answer: React.ReactNode }[]) {
  return {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: faqs.map((faq) => ({
      '@type': 'Question',
      name: faq.question,
      acceptedAnswer: {
        '@type': 'Answer',
        text: typeof faq.answer === 'string' ? faq.answer : faq.question,
      },
    })),
  }
}

export function articleSchema(article: {
  title: string
  description: string
  datePublished: string
  url: string
}) {
  return {
    '@context': 'https://schema.org',
    '@type': 'Article',
    headline: article.title,
    description: article.description,
    datePublished: article.datePublished,
    dateModified: article.datePublished,
    url: `https://quicklenders.com${article.url}`,
    author: {
      '@type': 'Organization',
      name: 'Quick Lenders',
      url: 'https://quicklenders.com',
    },
    publisher: {
      '@type': 'Organization',
      name: 'Quick Lenders',
      logo: {
        '@type': 'ImageObject',
        url: 'https://quicklenders.com/assets/images/logos/temp-logo-landscape-light-xs.png',
      },
    },
    mainEntityOfPage: {
      '@type': 'WebPage',
      '@id': `https://quicklenders.com${article.url}`,
    },
  }
}
