"use client";
import { useState } from "react";
import { Heart, HandHeart, MessageCircle, BookOpen } from "lucide-react";

export default function MissionSection() {
  const [hoveredCard, setHoveredCard] = useState(null);

  const values = [
    {
      icon: Heart,
      title: "Empathy",
      description: "Understanding and compassion guide every conversation",
      color: "from-emerald-600 to-green-700"
    },
    {
      icon: HandHeart,
      title: "Faith Sensitivity",
      description: "Respecting diverse beliefs and cultural practices",
      color: "from-red-600 to-rose-700"
    },
    {
      icon: MessageCircle,
      title: "Open Dialogue",
      description: "Creating safe spaces for honest conversations",
      color: "from-purple-600 to-pink-700"
    },
    {
      icon: BookOpen,
      title: "Education",
      description: "Evidence-based knowledge accessible to everyone",
      color: "from-blue-600 to-indigo-700"
    }
  ];

  return (
    <section id="mission" className="relative py-24 bg-black overflow-hidden">
      {/* Background decorative elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-1/4 -left-20 w-96 h-96 bg-red-900/10 rounded-full blur-3xl" />
        <div className="absolute bottom-1/4 -right-20 w-96 h-96 bg-red-800/10 rounded-full blur-3xl" />
      </div>

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-6" style={{ fontFamily: 'Poppins, sans-serif' }}>
            Why{" "}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-red-500 to-red-600">
              My-Month
            </span>
            ?
          </h2>
          
          <div className="max-w-3xl mx-auto">
            <p className="text-lg md:text-xl text-gray-300 leading-relaxed mb-4" style={{ fontFamily: 'Inter, sans-serif' }}>
              Menstrual health is often shaped by faith and culture. MM aims to create a safe space where everyone can learn, share stories, and understand how beliefs influence menstrual awareness.
            </p>
            <p className="text-lg md:text-xl text-gray-300 leading-relaxed italic" style={{ fontFamily: 'Merriweather, serif' }}>
              We bridge the gap between tradition and knowledge, fostering conversations that honor both cultural wisdom and modern understanding.
            </p>
          </div>

          {/* Decorative divider */}
          <div className="flex items-center justify-center gap-4 mt-10">
            <div className="h-px w-20 bg-gradient-to-r from-transparent to-red-500" />
            <div className="w-2 h-2 bg-red-500 rounded-full animate-pulse" />
            <div className="h-px w-20 bg-gradient-to-l from-transparent to-red-500" />
          </div>
        </div>

        {/* Values Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-8">
          {values.map((value, index) => (
            <div
              key={index}
              onMouseEnter={() => setHoveredCard(index)}
              onMouseLeave={() => setHoveredCard(null)}
              className="group relative"
            >
              {/* Card */}
              <div
                className={`relative h-full bg-gradient-to-br from-zinc-900 to-black border-2 border-red-900/30 rounded-2xl p-8 transition-all duration-500 ${
                  hoveredCard === index
                    ? "scale-105 border-red-500/50 shadow-2xl shadow-red-900/30"
                    : "hover:border-red-700/40"
                }`}
              >
                {/* Glow effect on hover */}
                <div
                  className={`absolute inset-0 bg-gradient-to-br ${value.color} opacity-0 group-hover:opacity-10 rounded-2xl transition-opacity duration-500`}
                />

                {/* Content */}
                <div className="relative z-10 flex flex-col items-center text-center space-y-4">
                  {/* Icon */}
                  <div
                    className={`transform transition-all duration-500 ${
                      hoveredCard === index ? "scale-110 rotate-12" : ""
                    }`}
                  >
                    <value.icon 
                      className="w-16 h-16 text-red-500 group-hover:text-red-400 transition-colors duration-300" 
                      strokeWidth={1.5}
                    />
                  </div>

                  {/* Title */}
                  <h3 className="text-2xl font-bold text-white group-hover:text-red-400 transition-colors duration-300" style={{ fontFamily: 'Poppins, sans-serif' }}>
                    {value.title}
                  </h3>

                  {/* Description */}
                  <p className="text-gray-400 group-hover:text-gray-300 transition-colors duration-300 leading-relaxed" style={{ fontFamily: 'Inter, sans-serif' }}>
                    {value.description}
                  </p>

                  {/* Decorative line */}
                  <div className="w-0 h-1 bg-gradient-to-r from-red-500 to-red-600 group-hover:w-full transition-all duration-500 rounded-full" />
                </div>

                {/* Corner accent */}
                <div className="absolute top-0 right-0 w-20 h-20 bg-gradient-to-br from-red-500/20 to-transparent rounded-tr-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
              </div>
            </div>
          ))}
        </div>

        {/* Bottom CTA */}
        <div className="text-center mt-16">
          <button
            onClick={() => window.location.href = "/about"}
            className="group relative px-8 py-4 bg-transparent border-2 border-red-600 hover:bg-red-600 text-white font-semibold rounded-full text-lg transition-all duration-300 shadow-lg hover:shadow-xl hover:scale-105"
            style={{ fontFamily: 'Poppins, sans-serif' }}
          >
            <span className="relative z-10">Learn More About Our Mission</span>
          </button>
        </div>
      </div>

      {/* Bottom gradient fade */}
      <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-black to-transparent" />
    </section>
  );
}