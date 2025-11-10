"use client";
import { useState } from "react";
import { MapPin, Navigation, Hospital, Pill, ArrowRight, Heart } from "lucide-react";
import { useRouter } from "next/navigation";

export default function NearbyCareSection() {
  const router = useRouter();
  const handleNavigate = () => {
    // Router navigation would go here
    router.push("/carehub/nearby");
  };

  return (
    <section className="relative py-24 overflow-hidden">
      {/* Background Image with Overlay */}
      <div className="absolute inset-0">
        <div 
          className="w-full h-full bg-gradient-to-br from-zinc-800 via-zinc-900 to-black"
          style={{
            backgroundImage: 'url(/carehub.png)',
            backgroundSize: 'cover',
            backgroundPosition: 'center',
          }}
        />
        {/* Red-dark gradient overlay */}
        <div className="absolute inset-0 bg-gradient-to-br from-red-900/80 via-black/85 to-red-950/80" />
      </div>

      {/* Background decorative elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-1/4 left-10 w-72 h-72 bg-red-500/10 rounded-full blur-3xl" />
        <div className="absolute bottom-1/3 right-10 w-80 h-80 bg-red-500/10 rounded-full blur-3xl" />
      </div>

      {/* Top gradient fade */}
      <div className="absolute top-0 left-0 right-0 h-32 bg-gradient-to-b from-black to-transparent" />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 z-10">
        {/* Two Column Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          
          {/* Left Column - Text Content */}
          <div className="space-y-8">
            {/* Badge */}
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-red-500/20 rounded-full border border-red-500/50">
              <MapPin className="w-4 h-4 text-red-500" />
              <span className="text-sm font-semibold text-red-500" style={{ fontFamily: 'Poppins, sans-serif' }}>
                Location-Based Care
              </span>
            </div>

            {/* Main Title */}
            <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white leading-tight" style={{ fontFamily: 'Poppins, sans-serif' }}>
              Find Care{" "}
              <span className="text-red-500">
                Near You
              </span>{" "}
              🩺
            </h2>

            {/* Description */}
            <p className="text-gray-300 text-lg leading-relaxed" style={{ fontFamily: 'Inter, sans-serif' }}>
              Locate trusted hospitals, clinics, and pharmacies close to you — because support and care are never too far away. Whether you need immediate medical help or just essentials, we'll help you find it easily.
            </p>

            {/* Feature Pills */}
            <div className="flex flex-wrap gap-3">
              <div className="flex items-center gap-2 px-4 py-2 bg-white/10 rounded-full shadow-md border border-red-500/30">
                <Hospital className="w-4 h-4 text-red-500" />
                <span className="text-sm font-medium text-gray-200">Hospitals & Clinics</span>
              </div>
              <div className="flex items-center gap-2 px-4 py-2 bg-white/10 rounded-full shadow-md border border-red-500/30">
                <Pill className="w-4 h-4 text-red-500" />
                <span className="text-sm font-medium text-gray-200">Pharmacies</span>
              </div>
              <div className="flex items-center gap-2 px-4 py-2 bg-white/10 rounded-full shadow-md border border-red-500/30">
                <Navigation className="w-4 h-4 text-red-500" />
                <span className="text-sm font-medium text-gray-200">Real-time Navigation</span>
              </div>
            </div>

            {/* CTA Button */}
            <div>
              <button
                onClick={handleNavigate}
                className="group relative px-10 py-5 bg-red-500 hover:bg-red-600 text-white font-bold rounded-full text-lg transition-all duration-300 shadow-xl hover:shadow-2xl hover:scale-105 overflow-hidden"
                style={{ fontFamily: 'Poppins, sans-serif' }}
              >
                {/* Button glow effect */}
                <div className="absolute inset-0 bg-white opacity-0 group-hover:opacity-20 transition-opacity duration-300" />
                
                <span className="relative z-10 flex items-center gap-3">
                  <MapPin className="w-6 h-6" />
                  Open Care Map
                  <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform duration-300" />
                </span>
              </button>

              <p className="text-gray-400 text-sm mt-4 italic flex items-center gap-2" style={{ fontFamily: 'Merriweather, serif' }}>
                <Heart className="w-4 h-4 text-red-500 fill-red-500" />
                Because care is never far away
              </p>
            </div>
          </div>

          {/* Right Column - Map Preview Card */}
          <div className="relative">
            {/* Decorative floating elements */}
            <div className="absolute -top-6 -right-6 w-24 h-24 bg-rose-400 rounded-full blur-2xl opacity-30 animate-pulse" />
            <div className="absolute -bottom-6 -left-6 w-32 h-32 bg-pink-400 rounded-full blur-2xl opacity-30 animate-pulse" style={{ animationDelay: '1s' }} />

            {/* Map Preview Card */}
            <div className="relative bg-black rounded-3xl shadow-2xl overflow-hidden transform hover:scale-105 transition-transform duration-300">
              {/* Card Header */}
              <div className="bg-red-500 px-6 py-4">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-white rounded-full flex items-center justify-center">
                    <MapPin className="w-6 h-6 text-rose-600" />
                  </div>
                  <div>
                    <h3 className="text-white font-bold text-lg" style={{ fontFamily: 'Poppins, sans-serif' }}>
                      Care Hub Map
                    </h3>
                    <p className="text-rose-100 text-sm">Nearby healthcare facilities</p>
                  </div>
                  <div className="ml-auto">
                    <div className="flex items-center gap-1">
                      <Navigation className="w-4 h-4 text-white" />
                    </div>
                  </div>
                </div>
              </div>

              {/* Image Preview */}
              <div className="relative aspect-video bg-gradient-to-br from-gray-50 to-gray-100">
                <img
                  src="/nearby.png"
                  alt="Find Nearby Care"
                  className="w-full h-full object-cover"
                  onError={(e) => {
                    // Fallback if image doesn't load
                    e.target.style.display = 'none';
                    e.target.parentElement.innerHTML = `
                      <div class="w-full h-full flex items-center justify-center bg-gradient-to-br from-rose-50 to-pink-50">
                        <div class="text-center space-y-4 p-8">
                          <div class="w-20 h-20 bg-rose-100 rounded-full flex items-center justify-center mx-auto">
                            <svg class="w-10 h-10 text-rose-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"/>
                              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"/>
                            </svg>
                          </div>
                          <div>
                            <p class="text-gray-700 font-semibold text-lg">Interactive Map View</p>
                            <p class="text-gray-500 text-sm">Find healthcare facilities near you</p>
                          </div>
                          <div class="flex gap-2 justify-center">
                            <div class="w-3 h-3 bg-rose-400 rounded-full animate-pulse"></div>
                            <div class="w-3 h-3 bg-pink-400 rounded-full animate-pulse" style="animation-delay: 0.2s"></div>
                            <div class="w-3 h-3 bg-red-400 rounded-full animate-pulse" style="animation-delay: 0.4s"></div>
                          </div>
                        </div>
                      </div>
                    `;
                  }}
                />
              </div>

              {/* Quick Stats Footer */}
              <div className="bg-gradient-to-r from-rose-50 to-pink-50 px-6 py-4 border-t border-rose-100">
                <div className="grid grid-cols-3 gap-4 text-center">
                  <div>
                    <p className="text-2xl font-bold text-rose-600" style={{ fontFamily: 'Poppins, sans-serif' }}>50+</p>
                    <p className="text-xs text-gray-600">Hospitals</p>
                  </div>
                  <div>
                    <p className="text-2xl font-bold text-rose-600" style={{ fontFamily: 'Poppins, sans-serif' }}>200+</p>
                    <p className="text-xs text-gray-600">Pharmacies</p>
                  </div>
                  <div>
                    <p className="text-2xl font-bold text-rose-600" style={{ fontFamily: 'Poppins, sans-serif' }}>24/7</p>
                    <p className="text-xs text-gray-600">Availability</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

       {/* Bottom gradient fade */}
      <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-black to-transparent" />
    </section>
  );
}