"use client";
import { useState, useEffect } from "react";

export default function HeroSection() {
  const [currentSlide, setCurrentSlide] = useState(0);

  const images = [
    { 
      src: "/mary.png", 
      alt: "Symbolic art of Mother Mary",
      gradient: "from-black/80 via-red-900/70 to-black/80"
    },
    { 
      src: "/kamakshi.png", 
      alt: "Symbolic art of Goddess Kamakshi",
      gradient: "from-red-900/80 via-black/70 to-black/80"
    },
    { 
      src: "/fatimah.png",
      alt: "Symbolic art of Fatimah al-Zahra",
      gradient: "from-red-950/80 via-black/75 to-red-900/70"
    },
  ];

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % images.length);
    }, 5000);
    return () => clearInterval(timer);
  }, [images.length]);

  const scrollToSection = (id) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  };

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
            {/* Image placeholder - replace with actual images */}
            <div 
              className="w-full h-full"
              style={{
                backgroundImage: `url(${img.src})`,
                backgroundSize: 'cover',
                backgroundPosition: 'center',
              }}
            />
            {/* Gradient overlay */}
            <div className={`absolute inset-0 bg-gradient-to-br ${img.gradient}`} />
            <div className="absolute inset-0 bg-gradient-radial from-transparent via-transparent to-black/60" />
          </div>
        ))}
      </div>

      {/* Decorative elements */}
      <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none">
        <div className="absolute top-20 right-20 w-64 h-64 bg-red-600/10 rounded-full blur-3xl animate-pulse" />
        <div className="absolute bottom-20 left-20 w-80 h-80 bg-red-800/10 rounded-full blur-3xl animate-pulse delay-700" />
      </div>

      {/* Content */}
      <div className="relative z-10 flex flex-col items-center justify-center h-full px-6 text-center">
        <div className="max-w-5xl mx-auto space-y-8">
          {/* Main heading */}
          <h1 className="font-poppins text-4xl md:text-6xl lg:text-7xl font-bold text-white tracking-tight">
            Faith, Culture &<br />
            <span className="font-poppins text-transparent bg-clip-text bg-gradient-to-r from-red-500 via-red-400 to-red-600 animate-pulse">
              Menstrual Health
            </span>
          </h1>

          {/* Subtitle */}
          <p className="font-poppins text-lg md:text-xl lg:text-2xl text-gray-200 max-w-3xl mx-auto font-light leading-relaxed">
            Understanding menstruation through the lens of compassion, culture, and belief
          </p>

          {/* Decorative divider */}
          <div className="flex items-center justify-center gap-4 py-4">
            <div className="h-px w-16 bg-gradient-to-r from-transparent to-red-500" />
            <div className="w-2 h-2 bg-red-500 rounded-full animate-pulse" />
            <div className="h-px w-16 bg-gradient-to-l from-transparent to-red-500" />
          </div>

          {/* CTA Buttons */}
          <div className="font-poppins flex flex-col sm:flex-row gap-4 justify-center items-center pt-4">
            <button
              onClick={() => scrollToSection('education')}
              className="group relative px-8 py-4 bg-red-600 hover:bg-red-700 text-white font-semibold rounded-full text-lg transition-all duration-300 shadow-lg shadow-red-900/50 hover:shadow-xl hover:shadow-red-900/70 hover:scale-105"
            >
              <span className="relative z-10">Learn More</span>
              <div className="absolute inset-0 bg-gradient-to-r from-red-500 to-red-700 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
            </button>

            <button
              onClick={() => window.location.href = '/discussion'}
              className="group relative px-8 py-4 bg-black border-2 border-red-600 hover:bg-red-600 text-white font-semibold rounded-full text-lg transition-all duration-300 shadow-lg hover:shadow-xl hover:scale-105"
            >
              <span className="relative z-10">Join the Conversation</span>
            </button>
          </div>
        </div>

        {/* Slide indicators */}
        <div className="absolute bottom-12 left-1/2 transform -translate-x-1/2 flex gap-3">
          {images.map((_, i) => (
            <button
              key={i}
              onClick={() => setCurrentSlide(i)}
              className={`h-2 rounded-full transition-all duration-300 ${
                i === currentSlide 
                  ? "w-12 bg-red-600" 
                  : "w-2 bg-gray-400 hover:bg-gray-300"
              }`}
              aria-label={`Go to slide ${i + 1}`}
            />
          ))}
        </div>
         {/* Bottom gradient fade */}
      <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-black to-transparent z-10 pointer-events-none" />
      </div>
    </section>
  );
}