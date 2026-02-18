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

export function faqSchema(faqs: { question: string; answer: string }[]) {
  return {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: faqs.map((faq) => ({
      '@type': 'Question',
      name: faq.question,
      acceptedAnswer: {
        '@type': 'Answer',
        text: faq.answer,
      },
    })),
  }
}

export function softwareApplicationSchema(tool: {
  name: string
  description: string
  url: string
}) {
  return {
    '@context': 'https://schema.org',
    '@type': 'SoftwareApplication',
    name: tool.name,
    description: tool.description,
    url: `https://quicklenders.com${tool.url}`,
    applicationCategory: 'FinanceApplication',
    operatingSystem: 'Web',
    offers: {
      '@type': 'Offer',
      price: '0',
      priceCurrency: 'USD',
    },
    provider: {
      '@type': 'FinancialService',
      name: 'Quick Lenders',
      url: 'https://quicklenders.com',
    },
  }
}

export function loanOrCreditSchema(loan: {
  name: string
  description: string
  url: string
  minAmount: number
  maxAmount: number
  minRate?: number
  maxRate?: number
  termLength?: string
}) {
  return {
    '@context': 'https://schema.org',
    '@type': 'LoanOrCredit',
    name: loan.name,
    description: loan.description,
    url: `https://quicklenders.com${loan.url}`,
    provider: {
      '@type': 'FinancialService',
      name: 'Quick Lenders',
      url: 'https://quicklenders.com',
      telephone: '+1-303-921-8529',
    },
    amount: {
      '@type': 'MonetaryAmount',
      minValue: loan.minAmount,
      maxValue: loan.maxAmount,
      currency: 'USD',
    },
    ...(loan.minRate && loan.maxRate
      ? {
          annualPercentageRate: {
            '@type': 'QuantitativeValue',
            minValue: loan.minRate,
            maxValue: loan.maxRate,
            unitText: 'PERCENT',
          },
        }
      : {}),
    ...(loan.termLength
      ? { loanTerm: loan.termLength }
      : {}),
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
      '@type': 'Person',
      name: 'Quick Lenders Editorial Team',
      jobTitle: 'Business Lending Specialists',
      worksFor: {
        '@type': 'FinancialService',
        name: 'Quick Lenders',
        url: 'https://quicklenders.com',
      },
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
