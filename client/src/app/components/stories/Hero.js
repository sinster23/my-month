"use client";
import { useState, useEffect } from "react";

export default function StoriesHeroSection() {
  const [currentSlide, setCurrentSlide] = useState(0);

  const images = [
    {
      src: "/stories_3.png",
      alt: "Empowered women celebrating",
      gradient: "from-red-950/80 via-black/75 to-red-900/70",
    },
    {
      src: "/stories_2.png",
      alt: "Diverse women in conversation",
      gradient: "from-black/80 via-red-900/70 to-black/80",
    },
    {
      src: "/stories_1.png",
      alt: "Women sharing stories together",
      gradient: "from-red-900/80 via-black/70 to-black/80",
    },
  ];

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % images.length);
    }, 5000);
    return () => clearInterval(timer);
  }, [images.length]);

  return (
    <section className="relative h-screen w-full overflow-hidden bg-black">
      {/* Background Slideshow */}
      <div className="absolute inset-0">
        {images.map((img, i) => (
          <div
            key={i}
            className={`absolute inset-0 transition-opacity duration-1000 ease-in-out ${
              i === currentSlide ? "opacity-100" : "opacity-0"
            }`}
          >
            <div 
              className="w-full h-full"
              style={{
                backgroundImage: `url(${img.src})`,
                backgroundSize: 'cover',
                backgroundPosition: 'center',
                backgroundRepeat: 'no-repeat'
              }}
            />
            {/* Gradient overlay */}
            <div className={`absolute inset-0 bg-gradient-to-br ${img.gradient}`} />
            
            {/* Additional vignette effect for depth */}
            <div className="absolute inset-0 bg-gradient-radial from-transparent via-transparent to-black/60" />
          </div>
        ))}
      </div>

      {/* Centered Content */}
      <div className="absolute inset-0 flex items-center justify-center z-20">
        <div className="max-w-4xl text-center space-y-8 px-8">
          {/* Main heading */}
          <h1 className="font-bold text-5xl md:text-6xl lg:text-7xl text-white tracking-tight leading-tight transition-all duration-700" style={{ fontFamily: 'Poppins, sans-serif' }}>
            Real Voices,<br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-red-400 via-red-500 to-red-600 drop-shadow-lg">
              Shared Experiences
            </span>
          </h1>

          {/* Subtitle */}
          <p className="text-xl md:text-2xl text-gray-100 font-light leading-relaxed transition-all duration-700 max-w-3xl mx-auto" style={{ fontFamily: 'Inter, sans-serif' }}>
            Women from diverse cultures and faiths share their journeys, challenges, and triumphs.
          </p>

          {/* Call-to-action buttons */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center pt-4">
            <button className="px-8 py-4 bg-gradient-to-r from-red-500 to-red-600 text-white font-semibold rounded-full hover:from-red-600 hover:to-red-700 transition-all duration-300 shadow-lg shadow-red-500/30 hover:shadow-xl hover:shadow-red-500/40 hover:scale-105">
              Submit Your Story
            </button>
            <button className="px-8 py-4 bg-black/30 backdrop-blur-sm text-white font-semibold rounded-full hover:bg-black/50 transition-all duration-300 border-2 border-white/40 hover:border-white/60 shadow-lg hover:shadow-xl hover:scale-105">
              Read Stories
            </button>
          </div>
        </div>
      </div>

      {/* Slide indicators */}
      <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 flex gap-3 z-10">
        {images.map((_, i) => (
          <button
            key={i}
            onClick={() => setCurrentSlide(i)}
            className={`h-2.5 rounded-full transition-all duration-300 ${
              i === currentSlide 
                ? "w-10 bg-gradient-to-r from-red-500 to-red-600 shadow-lg shadow-red-500/50" 
                : "w-2.5 bg-white/40 hover:bg-white/60"
            }`}
            aria-label={`Go to slide ${i + 1}`}
          />
        ))}
      </div>

      {/* Navigation arrows */}
      <button
        onClick={() => setCurrentSlide((prev) => (prev - 1 + images.length) % images.length)}
        className="absolute left-6 top-1/2 -translate-y-1/2 z-10 w-12 h-12 flex items-center justify-center bg-black/30 hover:bg-black/50 text-white rounded-full transition-all duration-300 backdrop-blur-sm"
        aria-label="Previous slide"
      >
        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
        </svg>
      </button>

      <button
        onClick={() => setCurrentSlide((prev) => (prev + 1) % images.length)}
        className="absolute right-6 top-1/2 -translate-y-1/2 z-10 w-12 h-12 flex items-center justify-center bg-black/30 hover:bg-black/50 text-white rounded-full transition-all duration-300 backdrop-blur-sm"
        aria-label="Next slide"
      >
        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
        </svg>
      </button>

      {/* Bottom gradient fade */}
      <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-black to-transparent z-10 pointer-events-none" />
    </section>
  );
}