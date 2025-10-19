import Link from "next/link";
import HeroSection from "./components/home/Hero";
import MissionSection from "./components/home/Mission";
import EducationalSection from "./components/home/Education";
import ForumSection from "./components/home/Forum";
import StorySection from "./components/home/story";
import ChatbotSection from "./components/home/ai";
import ResourcesSection from "./components/home/Resource";
import AppPromoSection from "./components/home/App";

export default function Home() {
  return (
    <main className="min-h-screen">
      <HeroSection />
      <MissionSection />
      <ChatbotSection />
      <EducationalSection />
      <ForumSection />
      <StorySection />
      <ResourcesSection />
      <AppPromoSection />
    </main>
  );
}
