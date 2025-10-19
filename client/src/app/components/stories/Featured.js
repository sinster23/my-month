"use client";
import { useState } from "react";
import { Heart, Sparkles, Quote, ArrowRight } from "lucide-react";

export default function FeaturedStorySection() {
  return (
    <section className="relative py-24 bg-black overflow-hidden">
      {/* Background decorative elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-1/4 left-20 w-96 h-96 bg-red-500/5 rounded-full blur-3xl" />
        <div className="absolute bottom-1/3 right-20 w-96 h-96 bg-red-500/5 rounded-full blur-3xl" />
      </div>

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 z-10">
        {/* Section Header */}
        <div className="text-center mb-16">
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-red-500/10 rounded-full border border-red-500/20 mb-4">
            <Sparkles className="w-4 h-4 text-red-400" />
            <span className="text-red-400 text-sm font-semibold" style={{ fontFamily: 'Poppins, sans-serif' }}>
              Featured Story
            </span>
          </div>
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-4" style={{ fontFamily: 'Poppins, sans-serif' }}>
            Stories That <span className="text-red-500">Inspire</span>
          </h2>
          <p className="text-gray-400 text-lg max-w-2xl mx-auto" style={{ fontFamily: 'Inter, sans-serif' }}>
            Real journeys of faith, hope, and transformation
          </p>
        </div>

        {/* Featured Story Card */}
        <div className="max-w-6xl mx-auto">
          <div className="relative rounded-3xl overflow-hidden shadow-2xl group">
            {/* Background Image with Overlay */}
            <div className="absolute inset-0">
              <div 
                className="w-full h-full bg-gradient-to-br from-zinc-800 via-zinc-900 to-black"
                style={{
                  backgroundImage: 'url(/featured-feed.png)',
                  backgroundSize: 'cover',
                  backgroundPosition: 'center',
                }}
              />
              {/* Dark gradient overlay */}
              <div className="absolute inset-0 bg-gradient-to-br from-red-900/80 via-black/70 to-black/80" />
            </div>

            {/* Content */}
            <div className="relative z-10 p-8 md:p-12 lg:p-16 min-h-[500px] flex flex-col justify-between">
              {/* Quote Icon */}
              <div className="flex justify-start mb-6">
                <div className="w-16 h-16 bg-red-500/20 rounded-full flex items-center justify-center backdrop-blur-sm border border-red-500/30">
                  <Quote className="w-8 h-8 text-red-400" />
                </div>
              </div>

              {/* Story Quote */}
              <div className="flex-grow flex items-center">
                <div>
                  <blockquote className="text-2xl md:text-3xl lg:text-4xl font-bold text-white leading-relaxed mb-8" style={{ fontFamily: 'Merriweather, serif' }}>
                    "In my darkest hour, I found a light that changed everything. 
                    <span className="text-red-400"> Faith wasn't just hope—it became my strength.</span>"
                  </blockquote>
                  
                  <div className="flex items-center gap-4 mb-8">
                    <div className="w-1 h-12 bg-gradient-to-b from-red-500 to-red-900" />
                    <div>
                      <p className="text-gray-300 text-lg font-semibold" style={{ fontFamily: 'Poppins, sans-serif' }}>
                        Sarah's Journey
                      </p>
                      <p className="text-gray-500 text-sm" style={{ fontFamily: 'Inter, sans-serif' }}>
                        From despair to purpose • 3 years of transformation
                      </p>
                    </div>
                  </div>

                  <p className="text-gray-300 text-base md:text-lg leading-relaxed max-w-3xl mb-8" style={{ fontFamily: 'Inter, sans-serif' }}>
                    After losing everything I thought defined me, I discovered that true purpose comes from within. 
                    Through community support and unwavering faith, I rebuilt not just my life, but my entire perspective 
                    on what it means to truly live.
                  </p>
                </div>
              </div>

              {/* Bottom Section */}
              <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6">
                {/* Stats */}
                <div className="flex items-center gap-6">
                  <div className="flex items-center gap-2">
                    <Heart className="w-5 h-5 text-red-400" />
                    <span className="text-gray-300 font-semibold" style={{ fontFamily: 'Poppins, sans-serif' }}>
                      2.4k hearts
                    </span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Sparkles className="w-5 h-5 text-yellow-400" />
                    <span className="text-gray-300 font-semibold" style={{ fontFamily: 'Poppins, sans-serif' }}>
                      847 inspired
                    </span>
                  </div>
                </div>

                {/* CTA Button */}
                <button
                  onClick={() => window.location.href = "/story/sarahs-journey"}
                  className="group/btn relative px-8 py-4 bg-red-500 hover:bg-red-600 text-white font-bold rounded-full transition-all duration-300 shadow-xl hover:shadow-2xl hover:scale-105 overflow-hidden"
                  style={{ fontFamily: 'Poppins, sans-serif' }}
                >
                  {/* Button glow effect */}
                  <div className="absolute inset-0 bg-white opacity-0 group-hover/btn:opacity-20 transition-opacity duration-300" />
                  
                  <span className="relative z-10 flex items-center gap-2">
                    Read Full Story
                    <ArrowRight className="w-5 h-5 group-hover/btn:translate-x-1 transition-transform duration-300" />
                  </span>

                  {/* Animated sparkle */}
                  <div className="absolute -top-1 -right-1 opacity-0 group-hover/btn:opacity-100 transition-opacity duration-300">
                    <Sparkles className="w-4 h-4 text-yellow-300 animate-ping" />
                  </div>
                </button>
              </div>
            </div>

            {/* Decorative corner elements */}
            <div className="absolute top-0 left-0 w-32 h-32 border-t-2 border-l-2 border-red-500/30 rounded-tl-3xl" />
            <div className="absolute bottom-0 right-0 w-32 h-32 border-b-2 border-r-2 border-red-500/30 rounded-br-3xl" />

            {/* Floating particles effect */}
            <div className="absolute top-1/4 right-1/4 w-2 h-2 bg-red-400 rounded-full opacity-60 animate-float" />
            <div className="absolute top-1/3 left-1/4 w-1.5 h-1.5 bg-red-300 rounded-full opacity-40 animate-float-delayed" />
            <div className="absolute bottom-1/3 right-1/3 w-2 h-2 bg-red-500 rounded-full opacity-50 animate-float" style={{ animationDelay: '2s' }} />
          </div>
        </div>

        {/* Call to Action Below */}
        <div className="text-center mt-12">
          <p className="text-gray-400 text-lg mb-4" style={{ fontFamily: 'Inter, sans-serif' }}>
            Have a story that could inspire others?
          </p>
          <button
            onClick={() => window.location.href = "/share-story"}
            className="text-red-400 hover:text-red-300 font-semibold text-lg transition-colors duration-300 inline-flex items-center gap-2 group"
            style={{ fontFamily: 'Poppins, sans-serif' }}
          >
            Share Your Journey
            <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform duration-300" />
          </button>
        </div>
      </div>

      <style jsx>{`
        @keyframes float {
          0%, 100% { transform: translateY(0px); }
          50% { transform: translateY(-20px); }
        }
        
        @keyframes float-delayed {
          0%, 100% { transform: translateY(0px); }
          50% { transform: translateY(-15px); }
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