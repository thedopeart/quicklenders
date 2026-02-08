import HeroSection from "./Sections/HeroSection"
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
