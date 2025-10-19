import CTASection from "../components/carehub/Cta";
import ExpertConsultation from "../components/carehub/Experts";
import CareHubHero from "../components/carehub/Hero";
import ShopSection from "../components/carehub/Products";
import Testimonials from "../components/carehub/Testimonials";

export default function Home() {
  return (
    <main className="min-h-screen">
      <CareHubHero />
      <ShopSection />
      <ExpertConsultation />
      <Testimonials />
      <CTASection />
    </main>
  );
}
