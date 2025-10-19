import { CTAReflectionSection } from "../components/faith/cta";
import CulturalHarmony from "../components/faith/harmony";
import HeroSection from "../components/faith/hero";
import FaithOverview from "../components/faith/overview";


export default function Home() {
  return (
    <main className="min-h-screen">
      <HeroSection />
      <FaithOverview />
      <CulturalHarmony />
      <CTAReflectionSection />
    </main>
  );
}
