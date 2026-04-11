import Link from 'next/link'
import { generatePageMetadata } from '@/lib/metadata'
import { faqSchema } from '@/lib/schema'
import HeroSection from "./Sections/HeroSection"
import TrustBannerSection from "./Sections/TrustBannerSection"
import ServicesSection from "./Sections/ServicesSection"
import BenefitsSection from "./Sections/BenefitsSection"
import ResourcesSection from "./Sections/ResourcesSection"
import FAQSection from '@/components/FAQSection'

export const metadata = generatePageMetadata({
  title: 'Quick Lenders | Business Loans & Financing Solutions',
  description: 'Business financing from $50K to $100M. Term loans, lines of credit, equipment financing, asset-based lending, and more. Funding as fast as the same business day on select products.',
  path: '/',
})

const homeFaqs = [
  {
    question: 'How does Quick Lenders work?',
    answer: <>Tell us about your business and financing needs through our short online form. We review your information and match you with lending partners suited to your profile. You receive offers to compare with no obligation, and the lender you choose handles funding directly to your bank account. There is no cost to use Quick Lenders. <Link href="/get-started" className="text-quicklend-600 font-medium hover:underline">Get started</Link> in just a few minutes.</>,
    schemaAnswer: 'Tell us about your business and financing needs through our short online form. We review your information and match you with lending partners suited to your profile. You receive offers to compare with no obligation, and the chosen lender handles funding directly. There is no cost to use Quick Lenders.',
  },
  {
    question: 'Is there a cost to use Quick Lenders?',
    answer: <>No, our service is completely free for businesses. Quick Lenders is compensated by lending partners when a loan is funded. You will never be charged a fee for using our platform, and there is no obligation to accept any offer you receive. We earn our revenue by connecting businesses with the right financing, not by charging borrowers.</>,
    schemaAnswer: 'No, our service is completely free for businesses. Quick Lenders is compensated by lending partners when a loan is funded. You will never be charged a fee for using our platform, and there is no obligation to accept any offer you receive.',
  },
  {
    question: 'How do I get a business loan?',
    answer: <>Start by determining how much you need and what you will use it for. Gather basic financial documents like bank statements and tax returns. Then <Link href="/get-started" className="text-quicklend-600 font-medium hover:underline">apply through Quick Lenders</Link>, where our team reviews your information and presents options from multiple lending partners. Most applications take under 10 minutes, and you can receive offers within 1 business day.</>,
    schemaAnswer: 'Start by determining how much you need and what you will use it for. Gather basic financial documents like bank statements and tax returns. Then apply through Quick Lenders, where our team reviews your information and presents options from multiple lending partners. Most applications take under 10 minutes.',
  },
  {
    question: 'How long does it take to get funded?',
    answer: <>Timing varies by loan type. <Link href="/business-loans/term-loans" className="text-quicklend-600 font-medium hover:underline">Term loans</Link> and <Link href="/business-loans/lines-of-credit" className="text-quicklend-600 font-medium hover:underline">lines of credit</Link> can fund as fast as the same business day. <Link href="/business-loans/equipment-financing" className="text-quicklend-600 font-medium hover:underline">Equipment financing</Link> typically takes 1 to 4 weeks. <Link href="/business-loans/asset-backed-loans" className="text-quicklend-600 font-medium hover:underline">Asset-based lending</Link> may take 1 to 4 weeks due to collateral evaluation. Our team works to get you funded as quickly as possible.</>,
    schemaAnswer: 'Timing varies by loan type. Term loans and lines of credit can fund as fast as the same business day. Equipment financing typically takes 1 to 4 weeks. Asset-based lending may take 1 to 4 weeks due to collateral evaluation. Our team works to get you funded as quickly as possible.',
  },
  {
    question: 'What credit score do I need for a business loan?',
    answer: <>Requirements vary by loan type and lender. Most traditional lenders look for a credit score above 650, while some alternative lenders work with scores as low as 500. Higher scores qualify for better rates and terms. If your credit needs improvement, read our guide on <Link href="/financial-insights/how-to-improve-credit-fast" className="text-quicklend-600 font-medium hover:underline">how to improve your credit score</Link> before applying.</>,
    schemaAnswer: 'Requirements vary by loan type and lender. Most traditional lenders look for a credit score above 650, while some alternative lenders work with scores as low as 500. Higher scores qualify for better rates and terms. Improving your credit before applying can save significant money in interest.',
  },
]

export default function Home() {
  const faqData = faqSchema(homeFaqs.map(f => ({ question: f.question, answer: f.schemaAnswer })))

  return (
    <main className="flex flex-grow flex-col w-full">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqData) }}
      />
      <HeroSection />
      <TrustBannerSection />
      <ServicesSection />
      <BenefitsSection />
      <ResourcesSection />
      <FAQSection faqs={homeFaqs} className="bg-gray-50" />
    </main>
  )
}
