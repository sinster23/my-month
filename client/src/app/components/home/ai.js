"use client";
import { useState } from "react";
import { MessageSquare, Sparkles, ArrowRight, Heart, Bot } from "lucide-react";
import { useRouter } from "next/navigation";

export default function ChatbotSection() {
  const router = useRouter();
  return (
    <section id="chatbot" className="relative py-24 overflow-hidden">
      {/* Background Image with Overlay */}
      <div className="absolute inset-0">
        <div 
          className="w-full h-full bg-gradient-to-br from-zinc-800 via-zinc-900 to-black"
          style={{
            backgroundImage: 'url(/ai_bg.png)',
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
              <Bot className="w-4 h-4 text-red-500" />
              <span className="text-sm font-semibold text-red-500" style={{ fontFamily: 'Poppins, sans-serif' }}>
                AI-Powered Support
              </span>
            </div>

            {/* Main Title */}
            <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white leading-tight" style={{ fontFamily: 'Poppins, sans-serif' }}>
              Your Safe Space for{" "}
              <span className="text-red-500">
                Menstrual Health
              </span>{" "}
              & Faith
            </h2>

            {/* Description */}
            <p className="text-gray-300 text-lg leading-relaxed" style={{ fontFamily: 'Inter, sans-serif' }}>
              Meet your compassionate AI companion <span className="text-red-500">Noor AI</span>—trained to answer questions about periods, reproductive health, and faith perspectives with care and sensitivity. Get instant, judgment-free support anytime you need it.
            </p>

            {/* CTA Button */}
            <div>
              <button
                onClick={() => router.push("/chatbot")}
                className="group relative px-10 py-5 bg-red-500 hover:bg-red-600 text-white font-bold rounded-full text-lg transition-all duration-300 shadow-xl hover:shadow-2xl hover:scale-105 overflow-hidden"
                style={{ fontFamily: 'Poppins, sans-serif' }}
              >
                {/* Button glow effect */}
                <div className="absolute inset-0 bg-white opacity-0 group-hover:opacity-20 transition-opacity duration-300" />
                
                <span className="relative z-10 flex items-center gap-3">
                  <MessageSquare className="w-6 h-6" />
                  Start a Conversation
                  <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform duration-300" />
                </span>

                {/* Animated sparkles */}
                <div className="absolute -top-1 -right-1 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  <Sparkles className="w-5 h-5 text-yellow-300 animate-ping" />
                </div>
              </button>

              <p className="text-gray-400 text-sm mt-4 italic" style={{ fontFamily: 'Merriweather, serif' }}>
                Free, anonymous, and always here for you 💬
              </p>
            </div>
          </div>

          {/* Right Column - Chat Preview with Video */}
          <div className="relative">
            {/* Decorative floating elements */}
            <div className="absolute -top-6 -right-6 w-24 h-24 bg-red-500 rounded-full blur-2xl opacity-30 animate-pulse" />
            <div className="absolute -bottom-6 -left-6 w-32 h-32 bg-red-500 rounded-full blur-2xl opacity-30 animate-pulse" style={{ animationDelay: '1s' }} />

            {/* Chat Preview Card */}
            <div className="relative bg-white rounded-3xl shadow-2xl overflow-hidden transform hover:scale-105 transition-transform duration-300">
              {/* Card Header */}
              <div className="bg-red-500 px-6 py-4">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-white rounded-full flex items-center justify-center">
                    <Bot className="w-6 h-6 text-red-500" />
                  </div>
                  <div>
                    <h3 className="text-white font-bold text-lg" style={{ fontFamily: 'Poppins, sans-serif' }}>
                      Noor AI
                    </h3>
                    <p className="text-red-100 text-sm">Always here to help</p>
                  </div>
                  <div className="ml-auto">
                    <div className="flex items-center gap-1">
                      <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse" />
                      <span className="text-white text-xs">Online</span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Video Preview */}
              <div className="relative aspect-video bg-gradient-to-br from-gray-50 to-gray-100">
                {/* Replace this div with your video element */}
                <video 
                  autoPlay 
                  loop 
                  muted 
                  playsInline
                  className="w-full h-full object-cover"
                >
                  <source src="/home.mp4" type="video/mp4" />
                </video>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom gradient fade */}
      <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-black to-transparent" />

      <style jsx>{`
        @keyframes bounce-slow {
          0%, 100% { transform: translateY(0px); }
          50% { transform: translateY(-10px); }
        }
        
        .animate-bounce-slow {
          animation: bounce-slow 2s ease-in-out infinite;
        }
      `}</style>
    </section>
  );
}