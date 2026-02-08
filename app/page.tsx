import { generatePageMetadata } from '@/lib/metadata'
import HeroSection from "./Sections/HeroSection"

export const metadata = generatePageMetadata({
  title: 'Quick Lenders | Business Loans & Financing Solutions',
  description: 'Fast business financing from $50K to $100M. Term loans, lines of credit, equipment financing, asset-based lending, and more. Same-day funding available.',
  path: '/',
})
import TrustBannerSection from "./Sections/TrustBannerSection"
import ServicesSection from "./Sections/ServicesSection"
import BenefitsSection from "./Sections/BenefitsSection"
import TestimonialsSection from "./Sections/TestimonialsSection"
import ResourcesSection from "./Sections/ResourcesSection"

export default function Home() {
  return (
    <main className="flex flex-grow flex-col w-full">
      <HeroSection />
      <TrustBannerSection />
      <ServicesSection />
      <BenefitsSection />
      <TestimonialsSection />
      <ResourcesSection />
    </main>
  )
}
