"use client";
import { useState } from "react";

export default function LearnSection() {
  const [hoveredCard, setHoveredCard] = useState(null);

  const educationCards = [
    {
      title: "Understanding Menstrual Health",
      subtitle: "What Even Is a Period?",
      description: "Break down the menstrual cycle in a way that actually makes sense",
      color: "from-pink-600 to-rose-700",
      bgColor: "bg-pink-50",
      imageUrl: "/edu1.png"
    },
    {
      title: "Menstruation in Different Faiths",
      subtitle: "Faith Meets Flow",
      description: "How beliefs, traditions, and culture shape menstrual practices",
      color: "from-purple-600 to-pink-700",
      bgColor: "bg-purple-50",
      imageUrl: "/edu2.png"
    },
    {
      title: "Myths & Facts",
      subtitle: "Truth or Tale?",
      description: "Debunking common misconceptions with evidence-based knowledge",
      color: "from-amber-600 to-orange-700",
      bgColor: "bg-amber-50",
      imageUrl: "/edu3.png"
    },
    {
      title: "Health Tips & Hygiene Practices",
      subtitle: "Stay Fresh, Feel Confident",
      description: "Pads, tampons, cups & confidence—the real hygiene guide",
      color: "from-teal-600 to-cyan-700",
      bgColor: "bg-teal-50",
      imageUrl: "/edu4.png"
    }
  ];

  return (
    <section id="learn" className="relative py-24 bg-black overflow-hidden">
      {/* Background decorative elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-1/4 left-10 w-72 h-72 bg-red-900/10 rounded-full blur-3xl" />
        <div className="absolute bottom-1/3 right-10 w-80 h-80 bg-pink-900/10 rounded-full blur-3xl" />
      </div>

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-16">
          <div className="inline-block mb-4">
            <span className="text-red-500 text-sm font-semibold tracking-widest uppercase" style={{ fontFamily: 'Poppins, sans-serif' }}>
              Cycle School
            </span>
          </div>
          
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-6" style={{ fontFamily: 'Poppins, sans-serif' }}>
            Learn it. Own it.{" "}
            <span className="text-transparent bg-clip-text bg-red-500">
              Glow through it.
            </span>
          </h2>
          
          <p className="text-lg md:text-xl text-gray-300 max-w-3xl mx-auto leading-relaxed" style={{ fontFamily: 'Inter, sans-serif' }}>
            Knowledge is power. Explore menstrual health through the lens of faith, culture, and science.
          </p>

          {/* Decorative divider */}
          <div className="flex items-center justify-center gap-4 mt-10">
            <div className="h-px w-20 bg-gradient-to-r from-transparent to-red-500" />
            <div className="w-2 h-2 bg-red-500 rounded-full animate-pulse" />
            <div className="h-px w-20 bg-gradient-to-l from-transparent to-red-500" />
          </div>
        </div>

        {/* Education Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {educationCards.map((card, index) => (
            <div
              key={index}
              onMouseEnter={() => setHoveredCard(index)}
              onMouseLeave={() => setHoveredCard(null)}
              className="group relative"
            >
              {/* Card Container */}
              <div
                className={`relative h-full bg-gradient-to-br from-zinc-900 to-black border-2 border-red-900/30 rounded-3xl overflow-hidden transition-all duration-500 ${
                  hoveredCard === index
                    ? "scale-105 border-red-500/50 shadow-2xl shadow-red-900/30"
                    : "hover:border-red-700/40"
                }`}
              >
                {/* Glow effect on hover */}
                <div
                  className={`absolute inset-0 bg-gradient-to-br ${card.color} opacity-0 group-hover:opacity-10 transition-opacity duration-500`}
                />

                {/* Card Content */}
                <div className="relative z-10 p-6 flex flex-col items-center text-center h-full">
                  {/* Image Circle */}
                  <div
                    className={`w-32 h-32 rounded-3xl overflow-hidden mb-6 transform transition-all duration-500 shadow-lg ${
                      hoveredCard === index ? "scale-110 rotate-6" : ""
                    }`}
                  >
                    <img 
                      src={card.imageUrl} 
                      alt={card.subtitle}
                      className="w-full h-full object-cover"
                    />
                  </div>

                  {/* Title */}
                  <h3 className="text-xl font-bold text-white mb-2 group-hover:text-red-400 transition-colors duration-300" style={{ fontFamily: 'Poppins, sans-serif' }}>
                    {card.subtitle}
                  </h3>

                  {/* Description */}
                  <p className="text-sm text-gray-400 group-hover:text-gray-300 transition-colors duration-300 mb-6 flex-grow" style={{ fontFamily: 'Inter, sans-serif' }}>
                    {card.description}
                  </p>

                  {/* Explore Button */}
                  <button
                    className={`w-full py-3 px-6 bg-transparent border-2 border-red-600/50 hover:bg-red-600 hover:border-red-600 text-white text-sm font-semibold rounded-full transition-all duration-300 group-hover:shadow-lg ${
                      hoveredCard === index ? "scale-105" : ""
                    }`}
                    style={{ fontFamily: 'Poppins, sans-serif' }}
                  >
                    Explore Tips
                  </button>
                </div>

                {/* Corner accent */}
                <div className="absolute top-0 right-0 w-24 h-24 bg-gradient-to-br from-red-500/20 to-transparent rounded-tr-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Bottom gradient fade */}
      <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-black to-transparent" />
    </section>
  );
}