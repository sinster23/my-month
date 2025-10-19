"use client";
import { useState } from "react";
import { Smartphone, Download, Calendar, Heart, Moon, Sparkles, Star, CheckCircle2 } from "lucide-react";

export default function AppPromoSection() {
  return (
    <section id="app" className="relative py-24 overflow-hidden">
      {/* Background Image with Overlay */}
      <div className="absolute inset-0">
        <div 
          className="w-full h-full bg-gradient-to-br from-zinc-800 via-zinc-900 to-black"
          style={{
            backgroundImage: 'url(/app_bg.png)',
            backgroundSize: 'cover',
            backgroundPosition: 'center',
          }}
        />
        {/* Dark red gradient overlay */}
        <div className="absolute inset-0 bg-gradient-to-br from-red-900/80 via-black/85 to-red-950/80" />
      </div>

      {/* Background decorative elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-1/4 left-10 w-72 h-72 bg-red-500/10 rounded-full blur-3xl" />
        <div className="absolute bottom-1/3 right-10 w-80 h-80 bg-red-500/10 rounded-full blur-3xl" />
      </div>

      <div className="absolute top-0 left-0 right-0 h-32 bg-gradient-to-b from-black to-transparent z-10" />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 z-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          
          {/* Left Side - App Mockup */}
          <div className="relative flex justify-center lg:justify-start">
            <div className="relative">
              {/* Glow effect behind phone */}
              <div className="absolute inset-0 bg-red-500/20 rounded-full blur-3xl scale-110 animate-pulse" />
              
              {/* Phone mockup container */}
              <div className="relative z-10 w-[280px] md:w-[320px] h-[560px] md:h-[640px] bg-gradient-to-br from-zinc-900 to-black rounded-[3rem] p-3 shadow-2xl border-4 border-red-500/30">
                {/* Phone screen */}
                <div className="w-full h-full bg-gradient-to-br from-red-950 to-black rounded-[2.5rem] overflow-hidden relative">
                  {/* App interface preview */}
                  <div className="p-6 h-full flex flex-col">
                    {/* Status bar */}
                    <div className="flex justify-between items-center text-white text-xs mb-6">
                      <span>9:41</span>
                      <div className="flex gap-1">
                        <div className="w-4 h-4 bg-white/30 rounded-sm" />
                        <div className="w-4 h-4 bg-white/30 rounded-sm" />
                        <div className="w-4 h-4 bg-white/30 rounded-sm" />
                      </div>
                    </div>

                    {/* App header */}
                    <div className="text-center mb-6">
                      <h3 className="text-white font-bold text-xl mb-1" style={{ fontFamily: 'Poppins, sans-serif' }}>
                        Faith & Flow
                      </h3>
                      <p className="text-red-300 text-xs" style={{ fontFamily: 'Inter, sans-serif' }}>
                        Track with Compassion
                      </p>
                    </div>

                    {/* Calendar preview */}
                    <div className="bg-black/40 rounded-2xl p-4 mb-4 border border-red-500/20">
                      <div className="flex justify-between items-center mb-3">
                        <span className="text-white text-sm font-semibold">October 2025</span>
                        <Calendar className="w-4 h-4 text-red-500" />
                      </div>
                      <div className="grid grid-cols-7 gap-1">
                        {[...Array(28)].map((_, i) => (
                          <div 
                            key={i} 
                            className={`w-6 h-6 flex items-center justify-center text-xs rounded-lg ${
                              i % 7 === 3 || i % 7 === 4 ? 'bg-red-500 text-white font-bold' : 
                              'bg-zinc-800/50 text-gray-400'
                            }`}
                          >
                            {i + 1}
                          </div>
                        ))}
                      </div>
                    </div>

                    {/* Features list */}
                    <div className="space-y-2 flex-grow">
                      <div className="flex items-center gap-2 text-gray-300 text-xs">
                        <Moon className="w-4 h-4 text-red-500" />
                        <span>Track cycle phases</span>
                      </div>
                      <div className="flex items-center gap-2 text-gray-300 text-xs">
                        <Heart className="w-4 h-4 text-red-500" />
                        <span>Monitor mood & wellness</span>
                      </div>
                      <div className="flex items-center gap-2 text-gray-300 text-xs">
                        <Star className="w-4 h-4 text-red-500" />
                        <span>Respectful reminders</span>
                      </div>
                    </div>

                    {/* Bottom action */}
                    <div className="mt-auto">
                      <button className="w-full bg-red-500 text-white py-3 rounded-full font-semibold text-sm">
                        Get Started
                      </button>
                    </div>
                  </div>
                </div>

                {/* Phone notch */}
                <div className="absolute top-3 left-1/2 transform -translate-x-1/2 w-24 h-6 bg-black rounded-full z-20" />
              </div>
            </div>
          </div>

          {/* Right Side - Content */}
          <div className="text-left lg:pl-8">
            {/* Badge */}
            <div className="inline-flex items-center gap-2 mb-6 bg-red-500/20 px-4 py-2 rounded-full border border-red-500/30">
              <Smartphone className="w-5 h-5 text-red-500" />
              <span className="text-red-500 font-semibold text-sm" style={{ fontFamily: 'Poppins, sans-serif' }}>
                Coming Soon
              </span>
            </div>

            {/* Main heading */}
            <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6" style={{ fontFamily: 'Poppins, sans-serif' }}>
              <span className="text-white">Track Your Cycle </span>
              <span className="block mt-2">
                <span className="text-white">with </span>
                <span className="text-red-500">Compassion </span>
              </span>
            </h2>

            {/* Description */}
            <p className="text-gray-300 text-base md:text-lg mb-8 leading-relaxed max-w-xl" style={{ fontFamily: 'Inter, sans-serif' }}>
              My-Month mobile app helps you understand your body and beliefs together — track periods, moods, and rituals respectfully through your cultural and spiritual lens.
            </p>

            {/* Features list */}
            <div className="space-y-3 mb-10">
              <div className="flex items-start gap-3">
                <CheckCircle2 className="w-6 h-6 text-red-500 flex-shrink-0 mt-0.5" />
                <div>
                  <h4 className="text-white font-semibold mb-1" style={{ fontFamily: 'Poppins, sans-serif' }}>
                    Smart Cycle Tracking
                  </h4>
                  <p className="text-gray-400 text-sm" style={{ fontFamily: 'Inter, sans-serif' }}>
                    AI-powered predictions that learn your unique patterns
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <CheckCircle2 className="w-6 h-6 text-red-500 flex-shrink-0 mt-0.5" />
                <div>
                  <h4 className="text-white font-semibold mb-1" style={{ fontFamily: 'Poppins, sans-serif' }}>
                    Cultural Sensitivity
                  </h4>
                  <p className="text-gray-400 text-sm" style={{ fontFamily: 'Inter, sans-serif' }}>
                    Respectful of your faith, traditions, and personal beliefs
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <CheckCircle2 className="w-6 h-6 text-red-500 flex-shrink-0 mt-0.5" />
                <div>
                  <h4 className="text-white font-semibold mb-1" style={{ fontFamily: 'Poppins, sans-serif' }}>
                    Private & Secure
                  </h4>
                  <p className="text-gray-400 text-sm" style={{ fontFamily: 'Inter, sans-serif' }}>
                    Your data is encrypted and never shared without permission
                  </p>
                </div>
              </div>
            </div>

            {/* Download buttons */}
            <div className="flex flex-col sm:flex-row gap-4">
              {/* Google Play Button */}
              <button className="group relative px-8 py-4 bg-red-500 hover:bg-red-600 text-white font-bold rounded-2xl transition-all duration-300 shadow-xl hover:shadow-2xl hover:scale-105 flex items-center justify-center gap-3 overflow-hidden">
                <div className="absolute inset-0 bg-white opacity-0 group-hover:opacity-10 transition-opacity duration-300" />
                
                <Download className="w-6 h-6 relative z-10" />
                <div className="text-left relative z-10">
                  <div className="text-xs text-red-100" style={{ fontFamily: 'Inter, sans-serif' }}>
                    GET IT ON
                  </div>
                  <div className="text-lg font-bold" style={{ fontFamily: 'Poppins, sans-serif' }}>
                    Google Play
                  </div>
                </div>

                <Sparkles className="absolute -top-1 -right-1 w-5 h-5 text-yellow-300 opacity-0 group-hover:opacity-100 animate-ping transition-opacity duration-300" />
              </button>

              {/* App Store Button */}
              <button className="group relative px-8 py-4 bg-zinc-800 hover:bg-zinc-700 text-white font-bold rounded-2xl transition-all duration-300 shadow-xl hover:shadow-2xl hover:scale-105 flex items-center justify-center gap-3 border-2 border-red-500/30 overflow-hidden">
                <div className="absolute inset-0 bg-white opacity-0 group-hover:opacity-5 transition-opacity duration-300" />
                
                <Download className="w-6 h-6 relative z-10" />
                <div className="text-left relative z-10">
                  <div className="text-xs text-gray-400" style={{ fontFamily: 'Inter, sans-serif' }}>
                    DOWNLOAD ON
                  </div>
                  <div className="text-lg font-bold" style={{ fontFamily: 'Poppins, sans-serif' }}>
                    App Store
                  </div>
                </div>

                <span className="absolute top-2 right-2 text-xs bg-red-500 text-white px-2 py-1 rounded-full font-semibold">
                  Soon
                </span>
              </button>
            </div>

            {/* Bottom note */}
            <p className="text-gray-500 text-sm mt-6 italic flex items-center gap-2" style={{ fontFamily: 'Merriweather, serif' }}>
              <Sparkles className="w-4 h-4 text-red-500" />
              Join 100,000+ women tracking with confidence
            </p>
          </div>
        </div>
      </div>

      {/* Bottom gradient fade */}
      <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-black to-transparent z-10" />

      <style jsx>{`
        @keyframes float {
          0%, 100% { transform: translateY(0px) rotate(0deg); }
          50% { transform: translateY(-20px) rotate(5deg); }
        }
        
        @keyframes float-delayed {
          0%, 100% { transform: translateY(0px) rotate(0deg); }
          50% { transform: translateY(-15px) rotate(-5deg); }
        }
        
        .animate-float {
          animation: float 4s ease-in-out infinite;
        }
        
        .animate-float-delayed {
          animation: float-delayed 5s ease-in-out infinite;
          animation-delay: 1s;
        }
      `}</style>
    </section>
  );
}