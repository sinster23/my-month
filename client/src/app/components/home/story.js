"use client";
import { useState } from "react";
import { Heart, Sparkles, MessageSquare, ArrowRight } from "lucide-react";

export default function StorySection() {
  const [hoveredStory, setHoveredStory] = useState(null);

  const stories = [
    {
      title: "How my temple community supported menstrual awareness",
      preview: "Growing up, I thought periods were shameful. Then our temple started open conversations about natural cycles as sacred...",
      author: "Priya, 24",
      color: "from-emerald-400 to-green-500",
      imageUrl: "/story1.png"
    },
    {
      title: "Breaking silence in my church youth group",
      preview: "When I suggested a period care drive at church, I was nervous. But the response was overwhelming and beautiful...",
      author: "Sarah, 19",
      color: "from-purple-400 to-pink-500",
      imageUrl: "/story2.png"
    },
    {
      title: "Finding strength through Islamic teachings on cleanliness",
      preview: "Learning how Islam honors the body's natural processes helped me embrace my cycle with dignity and confidence...",
      author: "Amina, 22",
      color: "from-blue-400 to-indigo-500",
      imageUrl: "/story3.png"
    }
  ];

  return (
    <section className="relative py-24 bg-black overflow-hidden">
      {/* Background decorative elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-pink-900/10 rounded-full blur-3xl" />
        <div className="absolute bottom-1/3 right-1/4 w-96 h-96 bg-red-900/10 rounded-full blur-3xl" />
      </div>

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-16">
          <div className="inline-flex items-center gap-2 mb-4">
            <Sparkles className="w-6 h-6 text-red-400 animate-pulse" />
            <span className="text-red-400 font-semibold tracking-wider uppercase text-sm" style={{ fontFamily: 'Poppins, sans-serif' }}>
              Real Stories, Real Impact
            </span>
            <Sparkles className="w-6 h-6 text-red-400 animate-pulse" />
          </div>

          <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6" style={{ fontFamily: 'Poppins, sans-serif' }}>
            <span className="text-white">Voices of </span>
            <span className="text-transparent bg-clip-text bg-red-500">
              My-Month
            </span>
          </h2>

          <p className="text-base md:text-lg text-gray-400 max-w-2xl mx-auto mt-4 leading-relaxed" style={{ fontFamily: 'Inter, sans-serif' }}>
            Every month, our community shares stories about faith, flow, and finding strength — from emotional breakthroughs to "Can I do this while menstruating?" moments.
          </p>

          <p className="text-sm md:text-base text-gray-500 max-w-2xl mx-auto mt-3 italic" style={{ fontFamily: 'Merriweather, serif' }}>
            Real answers, gentle wisdom, and a sprinkle of courage to help you feel seen, soothed, and empowered.
          </p>
        </div>

        {/* Story Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12">
          {stories.map((story, index) => (
            <div
              key={index}
              onMouseEnter={() => setHoveredStory(index)}
              onMouseLeave={() => setHoveredStory(null)}
              className="group relative"
            >
              {/* Card */}
              <div
                className={`relative h-full bg-gradient-to-br from-zinc-900 to-black border-2 border-red-900/30 rounded-3xl overflow-hidden transition-all duration-500 ${
                  hoveredStory === index
                    ? "scale-105 border-pink-500/50 shadow-2xl shadow-pink-900/30 -rotate-1"
                    : "hover:border-red-700/40"
                }`}
              >
                {/* Image */}
                <div className="relative h-48 overflow-hidden">
                  <img 
                    src={story.imageUrl}
                    alt={story.title}
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                  />
                  {/* Gradient overlay */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black via-black/50 to-transparent" />
                  
                  {/* Floating decorative elements */}
                  <div className="absolute top-4 right-4 opacity-0 group-hover:opacity-100 transition-opacity duration-500">
                    <Sparkles className="w-6 h-6 text-pink-400 animate-pulse" />
                  </div>
                </div>

                {/* Content */}
                <div className="p-6">
                  {/* Title */}
                  <h3 className="text-xl font-bold text-white mb-3 group-hover:text-pink-400 transition-colors duration-300 leading-snug" style={{ fontFamily: 'Poppins, sans-serif' }}>
                    {story.title}
                  </h3>

                  {/* Preview */}
                  <p className="text-gray-400 group-hover:text-gray-300 transition-colors duration-300 leading-relaxed mb-4 text-sm" style={{ fontFamily: 'Inter, sans-serif' }}>
                    {story.preview}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Bottom decorative elements */}
        <div className="flex items-center justify-center gap-4 mt-16">
          <div className="h-px w-24 bg-gradient-to-r from-transparent via-red-500 to-transparent" />
          <Heart className="w-4 h-4 text-red-500 animate-pulse" />
          <div className="h-px w-24 bg-gradient-to-r from-transparent via-red-500 to-transparent" />
        </div>
      </div>

      {/* Bottom gradient fade */}
      <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-black to-transparent" />
    </section>
  );
}