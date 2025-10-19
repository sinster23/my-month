"use client";
import { useState, useEffect } from "react";

export default function CareHubHero() {
  const [currentSlide, setCurrentSlide] = useState(0);

  const images = [
    {
      src: "/carehub1.png",
      alt: "Menstrual care and wellness",
      gradient: "from-black/60 via-red-950/40 to-transparent",
    },
    {
      src: "/carehub2.png",
      alt: "Professional healthcare support",
      gradient: "from-transparent via-black/50 to-red-950/50",
    },
    {
      src: "/carehub3.png",
      alt: "Quality menstrual products",
      gradient: "from-red-950/50 via-transparent to-black/60",
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

      {/* Content on the left side */}
      <div className="absolute left-0 top-0 h-full w-full md:w-1/2 flex items-center justify-center md:justify-start px-8 md:px-16 z-20">
        <div className="max-w-xl text-center md:text-left space-y-8 md:ml-10 lg:ml-20">
          {/* Emoji and heading */}
          <h1 className="font-bold text-5xl md:text-6xl lg:text-7xl text-white tracking-tight leading-tight" style={{ fontFamily: 'Poppins, sans-serif' }}>
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-red-400 via-red-500 to-red-600 drop-shadow-lg">
              CareHub
            </span>
          </h1>

          {/* Subtitle */}
          <p className="text-xl md:text-2xl text-gray-100 font-light leading-relaxed" style={{ fontFamily: 'Inter, sans-serif' }}>
            Shop trusted menstrual care essentials and connect with certified health professionals — all in one place.
          </p>

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center md:justify-start pt-4">
            <button className="px-8 py-4 bg-gradient-to-r from-red-500 to-red-600 text-white font-semibold rounded-full hover:shadow-xl hover:shadow-red-500/50 transform hover:scale-105 transition-all duration-300">
              Shop Products
            </button>
            <button className="px-8 py-4 bg-white/10 backdrop-blur-sm text-white font-semibold rounded-full border-2 border-white/30 hover:bg-white/20 hover:border-white/50 transform hover:scale-105 transition-all duration-300">
              Talk to a Doctor
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