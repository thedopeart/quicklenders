import { notFound } from 'next/navigation'
import { Metadata } from 'next'
import { generatePageMetadata } from '@/lib/metadata'
import { financialProductSchema, loanOrCreditSchema, breadcrumbSchema, faqSchema } from '@/lib/schema'
import { loanProductData, getLoanProduct, getRelatedProducts } from '@/lib/loan-data'
import ProductPageLayout from '@/components/ProductPageLayout'

interface PageProps {
  params: { slug: string }
}

export function generateStaticParams() {
  return Object.keys(loanProductData).map((slug) => ({ slug }))
}

export function generateMetadata({ params }: PageProps): Metadata {
  const product = getLoanProduct(params.slug)
  if (!product) return {}

  return generatePageMetadata({
    title: product.seo.title,
    description: product.seo.description,
    path: `/business-loans/${product.slug}`,
  })
}

export default function LoanProductPage({ params }: PageProps) {
  const product = getLoanProduct(params.slug)
  if (!product) notFound()

  const relatedProducts = getRelatedProducts(params.slug)

  const productSchema = financialProductSchema({
    name: product.seo.title,
    description: product.seo.description,
    minAmount: product.seo.minAmount,
    maxAmount: product.seo.maxAmount,
    minRate: product.seo.minRate,
    maxRate: product.seo.maxRate,
  })

  const breadcrumbs = breadcrumbSchema([
    { name: 'Home', url: '/' },
    { name: 'Business Loans', url: '/business-loans' },
    { name: product.name, url: `/business-loans/${product.slug}` },
  ])

  const loanSchema = loanOrCreditSchema({
    name: product.name,
    description: product.seo.description,
    url: `/business-loans/${product.slug}`,
    minAmount: product.seo.minAmount,
    maxAmount: product.seo.maxAmount,
    minRate: product.seo.minRate,
    maxRate: product.seo.maxRate,
  })

  const faqData = faqSchema(product.faqs.map(f => ({ question: f.question, answer: f.schemaAnswer })))

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(productSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(loanSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbs) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqData) }}
      />
      <ProductPageLayout product={product} relatedProducts={relatedProducts} />
    </>
  )
}
