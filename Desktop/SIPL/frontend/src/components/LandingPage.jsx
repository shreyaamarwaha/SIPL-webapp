import { Header } from "./Header"
import { Hero } from "./Hero"
import { HowItWorks } from "./HowItWorks"
import { ClinicalGrounding } from "./ClinicalGrounding"
import { CtaSection } from "./CtaSection"
import { Footer } from "./Footer"

export function LandingPage() {
  return (
    <div className="min-h-screen bg-background flex flex-col">
      <Header />
      <Hero />
      <HowItWorks />
      <ClinicalGrounding />
      <CtaSection />
      <Footer />
    </div>
  )
}
