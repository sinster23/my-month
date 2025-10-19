"use client";
import { useState, useEffect } from "react";

export default function HeroSection() {
  const [currentSlide, setCurrentSlide] = useState(0);

  const images = [
    {
      src: "/faith1.png",
      alt: "Hinduism and divine feminine energy",
      gradient: "from-black/60 via-red-950/40 to-transparent",
      title: "Sacred Flow,",
      highlight: "Eternal Strength",
      subtitle:
        "Rooted in ancient reverence, celebrating the divine feminine through every cycle of renewal.",
    },
    {
      src: "/faith2.png",
      alt: "Islamic cultural harmony and compassion",
      gradient: "from-transparent via-black/50 to-red-950/50",
      title: "Purity,",
      highlight: "Rest, Renewal",
      subtitle:
        "Reflecting faith's wisdom — honoring care, dignity, and balance through every rhythm of life.",
    },
    {
      src: "/faith3.png",
      alt: "Christian compassion and womanhood",
      gradient: "from-red-950/50 via-transparent to-black/60",
      title: "Grace in Every",
      highlight: "Cycle",
      subtitle:
        "Embracing compassion, renewal, and womanhood through the light of faith and understanding.",
    },
    {
      src: "/faith4.png",
      alt: "Interfaith unity and shared humanity",
      gradient: "from-black/50 via-red-900/30 to-transparent",
      title: "Many Faiths,",
      highlight: "One Flow",
      subtitle:
        "Bridging traditions and beliefs in harmony — celebrating shared compassion and womanhood.",
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

      {/* Content on the right side */}
      <div className="absolute right-0 top-0 h-full w-full md:w-1/2 flex items-center justify-center md:justify-end px-8 md:px-16 z-20">
        <div className="max-w-xl text-center md:text-right space-y-8">
          {/* Main heading */}
          <h1 className="font-bold text-5xl md:text-6xl lg:text-7xl text-white tracking-tight leading-tight transition-all duration-700" style={{ fontFamily: 'Poppins, sans-serif' }}>
            {images[currentSlide].title}<br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-red-400 via-red-500 to-red-600 drop-shadow-lg">
              {images[currentSlide].highlight}
            </span>
          </h1>

          {/* Subtitle */}
          <p className="text-xl md:text-2xl text-gray-100 font-light leading-relaxed transition-all duration-700" style={{ fontFamily: 'Inter, sans-serif' }}>
            {images[currentSlide].subtitle}
          </p>
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