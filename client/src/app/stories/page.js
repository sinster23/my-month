import FeaturedStorySection from "../components/stories/Featured";
import StoriesFeed from "../components/stories/Feed";
import StoriesHeroSection from "../components/stories/Hero";
import StorySubmissionSection from "../components/stories/Submission";

export default function Home() {
  return (
    <main className="min-h-screen">
      <StoriesHeroSection />
      <StoriesFeed />
      <FeaturedStorySection />
      <StorySubmissionSection />
    </main>
  );
}
