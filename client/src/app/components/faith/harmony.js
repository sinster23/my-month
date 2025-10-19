"use client";
import { useState } from "react";
import { Moon, Flower2, Sparkles, Leaf } from "lucide-react";

export default function CulturalHarmony() {
  const [hoveredSymbol, setHoveredSymbol] = useState(null);

  const symbols = [
    { icon: Moon, label: "Moon", meaning: "Cycles & Renewal" },
    { icon: Flower2, label: "Lotus", meaning: "Purity & Growth" },
    { icon: Sparkles, label: "Light", meaning: "Divine Grace" },
    { icon: Leaf, label: "Leaf", meaning: "Natural Healing" },
  ];

  return (
    <section className="relative w-full py-32 overflow-hidden bg-black">
      {/* Static Background Image with Gradient Overlays */}
      <div className="absolute inset-0">
        {/* Background Image */}
        <div className="absolute inset-0">
        <div 
          className="w-full h-full bg-gradient-to-br from-zinc-800 via-zinc-900 to-black"
          style={{
            backgroundImage: 'url(/faith21.png)',
            backgroundSize: 'cover',
            backgroundPosition: 'center',
          }}
        />
        {/* Red-dark gradient overlay */}
        <div className="absolute inset-0 bg-gradient-to-br from-red-900/80 via-black/85 to-red-950/80" />
      </div>
        
        {/* Top Fade */}
        <div className="absolute top-0 left-0 right-0 h-32 bg-gradient-to-b from-black to-transparent" />
        
        {/* Bottom Fade */}
        <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-black to-transparent" />
      </div>

      {/* Content Container */}
      <div className="relative z-10 max-w-6xl mx-auto px-6 md:px-12">
        {/* Decorative Mandala/Circle Design */}
        <div className="flex justify-center mb-16">
          <div className="relative w-48 h-48 md:w-64 md:h-64 animate-spin" style={{ animationDuration: '20s' }}>
            {/* Outer circle */}
            <div className="absolute inset-0 rounded-full border-2 border-red-500/30 animate-pulse" style={{ animationDuration: '3s' }} />
            
            {/* Middle circle */}
            <div className="absolute inset-4 rounded-full border-2 border-red-400/40" />
            
            {/* Inner circle with gradient */}
            <div className="absolute inset-8 rounded-full bg-gradient-to-br from-red-500/20 to-transparent backdrop-blur-sm" />
            
            {/* Center symbol - interwoven design */}
            <div className="absolute inset-0 flex items-center justify-center">
              <svg className="w-24 h-24 md:w-32 md:h-32 text-red-400/60" viewBox="0 0 100 100" fill="none" stroke="currentColor">
                <circle cx="50" cy="50" r="20" strokeWidth="2" />
                <path d="M30 50 Q40 30, 50 50 Q60 70, 70 50" strokeWidth="2" strokeLinecap="round" />
                <path d="M50 30 Q30 40, 50 50 Q70 60, 50 70" strokeWidth="2" strokeLinecap="round" />
              </svg>
            </div>
            
            {/* Floating symbols around circle */}
            {symbols.map((symbol, i) => {
              const angle = (i * 360) / symbols.length;
              const radius = 140;
              const x = Math.cos((angle - 90) * Math.PI / 180) * radius;
              const y = Math.sin((angle - 90) * Math.PI / 180) * radius;
              const IconComponent = symbol.icon;
              
              return (
                <div
                  key={i}
                  className="absolute top-1/2 left-1/2 cursor-pointer transition-all duration-300 hover:scale-125"
                  style={{
                    transform: `translate(calc(-50% + ${x}px), calc(-50% + ${y}px))`
                  }}
                  onMouseEnter={() => setHoveredSymbol(i)}
                  onMouseLeave={() => setHoveredSymbol(null)}
                >
                  <div className="relative">
                    <div className="text-red-400 filter drop-shadow-lg">
                      <IconComponent size={32} className="md:w-10 md:h-10" />
                    </div>
                    {hoveredSymbol === i && (
                      <div className="absolute top-12 left-1/2 -translate-x-1/2 whitespace-nowrap bg-red-900/90 text-white text-xs px-3 py-1.5 rounded-full backdrop-blur-sm">
                        {symbol.meaning}
                      </div>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Main Heading */}
        <div className="text-center space-y-6 mb-12">
          <h2 className="font-bold text-4xl md:text-5xl lg:text-6xl text-white tracking-tight leading-tight" style={{ fontFamily: 'Poppins, sans-serif' }}>
            Different Paths,{" "}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-red-400 via-red-500 to-red-600">
              One Message
            </span>
          </h2>
          
          <div className="w-24 h-1 mx-auto bg-gradient-to-r from-transparent via-red-500 to-transparent rounded-full" />
        </div>

        {/* Subtitle */}
        <p className="text-center text-xl md:text-2xl lg:text-3xl text-gray-100 font-light leading-relaxed max-w-4xl mx-auto" style={{ fontFamily: 'Inter, sans-serif' }}>
          Care, respect, and compassion for every woman
        </p>

        {/* Cultural Depth Paragraph */}
        <div className="mt-8 max-w-3xl mx-auto">
          <p className="text-center text-base md:text-lg text-gray-300 leading-relaxed" style={{ fontFamily: 'Inter, sans-serif' }}>
            Across faiths and cultures, menstruation is seen through unique traditions and beliefs — yet all share one truth: the dignity and wellbeing of women matter deeply. This section celebrates that shared compassion, bringing together perspectives of love, respect, and renewal.
          </p>
        </div>

        {/* Bottom decorative element */}
        <div className="mt-12 flex justify-center gap-2">
          {[...Array(5)].map((_, i) => (
            <div
              key={i}
              className="w-2 h-2 rounded-full bg-red-500/40"
              style={{
                animation: `pulse 2s ease-in-out infinite`,
                animationDelay: `${i * 0.2}s`
              }}
            />
          ))}
        </div>
      </div>
    </section>
  );
}