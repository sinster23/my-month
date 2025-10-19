"use client";
import { BookOpen, MessageCircle, ArrowRight } from "lucide-react";
export function CTAReflectionSection() {
  return (
    <section className="relative w-full py-24 overflow-hidden bg-black">
      {/* Background decorative elements - same as overview section */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-1/3 left-10 w-96 h-96 bg-red-500/10 rounded-full blur-3xl" />
        <div className="absolute bottom-1/4 right-10 w-96 h-96 bg-red-500/10 rounded-full blur-3xl" />
        <div className="absolute top-1/2 left-1/3 w-80 h-80 bg-red-600/8 rounded-full blur-3xl" />
        <div className="absolute bottom-1/3 right-1/4 w-72 h-72 bg-red-400/12 rounded-full blur-3xl" />
      </div>

      {/* Content */}
      <div className="relative z-10 max-w-6xl mx-auto px-6 md:px-12">
        {/* Section Title */}
        <div className="text-center mb-16">
          <h2 className="font-bold text-3xl md:text-4xl lg:text-5xl text-white mb-4" style={{ fontFamily: 'Poppins, sans-serif' }}>
            Continue Your{" "}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-red-400 via-red-500 to-red-600">
              Journey
            </span>
          </h2>
          <div className="w-20 h-1 mx-auto bg-gradient-to-r from-transparent via-red-500 to-transparent rounded-full" />
        </div>

        {/* CTA Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-5xl mx-auto">
          {/* Explore Stories Card */}
          <div className="group relative overflow-hidden rounded-2xl cursor-pointer transition-all duration-500 hover:scale-105 hover:shadow-2xl hover:shadow-red-500/20">
            <div className="absolute inset-0">
              <div 
                className="w-full h-full bg-gradient-to-br from-zinc-800 via-zinc-900 to-black"
                style={{
                  backgroundImage: 'url(/story2.png)',
                  backgroundSize: 'cover',
                  backgroundPosition: 'center',
                }}
              />
              <div className="absolute inset-0 bg-gradient-to-br from-red-900/90 via-black/90 to-red-950/90 group-hover:from-red-800/90 group-hover:via-black/85 transition-all duration-500" />
            </div>

            <div className="relative z-10 p-8 flex flex-col items-center text-center h-full justify-center min-h-[280px] border-2 border-red-500/30 group-hover:border-red-500/50 rounded-2xl transition-all duration-500">
              <div className="mb-6 transform group-hover:scale-110 transition-transform duration-500">
                <div className="w-20 h-20 rounded-full bg-red-500/20 flex items-center justify-center backdrop-blur-sm border border-red-400/30">
                  <BookOpen className="w-10 h-10 text-red-400" />
                </div>
              </div>
              
              <h3 className="text-2xl font-bold text-white mb-3 group-hover:text-red-400 transition-colors duration-300" style={{ fontFamily: 'Poppins, sans-serif' }}>
                Explore Stories
              </h3>
              
              <p className="text-gray-400 group-hover:text-gray-300 mb-6 leading-relaxed" style={{ fontFamily: 'Inter, sans-serif' }}>
                Hear real stories of faith and womanhood from diverse voices and experiences
              </p>
              
              <div className="flex items-center gap-2 text-red-400 font-semibold group-hover:gap-3 transition-all duration-300">
                <span>Go to Stories</span>
                <ArrowRight className="w-5 h-5 transform group-hover:translate-x-1 transition-transform duration-300" />
              </div>

              {/* Corner accent */}
              <div className="absolute top-0 right-0 w-20 h-20 bg-gradient-to-br from-red-500/20 to-transparent rounded-tr-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
            </div>
          </div>

          {/* Chatbot Card */}
          <div className="group relative overflow-hidden rounded-2xl cursor-pointer transition-all duration-500 hover:scale-105 hover:shadow-2xl hover:shadow-red-500/20">
            <div className="absolute inset-0">
              <div 
                className="w-full h-full bg-gradient-to-br from-zinc-800 via-zinc-900 to-black"
                style={{
                  backgroundImage: 'url(/ai_bg.png)',
                  backgroundSize: 'cover',
                  backgroundPosition: 'center',
                }}
              />
              <div className="absolute inset-0 bg-gradient-to-br from-red-900/90 via-black/90 to-red-950/90 group-hover:from-red-800/90 group-hover:via-black/85 transition-all duration-500" />
            </div>

            <div className="relative z-10 p-8 flex flex-col items-center text-center h-full justify-center min-h-[280px] border-2 border-red-500/30 group-hover:border-red-500/50 rounded-2xl transition-all duration-500">
              <div className="mb-6 transform group-hover:scale-110 transition-transform duration-500">
                <div className="w-20 h-20 rounded-full bg-red-500/20 flex items-center justify-center backdrop-blur-sm border border-red-400/30">
                  <MessageCircle className="w-10 h-10 text-red-400" />
                </div>
              </div>
              
              <h3 className="text-2xl font-bold text-white mb-3 group-hover:text-red-400 transition-colors duration-300" style={{ fontFamily: 'Poppins, sans-serif' }}>
                Talk to Our Chatbot
              </h3>
              
              <p className="text-gray-400 group-hover:text-gray-300 mb-6 leading-relaxed" style={{ fontFamily: 'Inter, sans-serif' }}>
                Ask questions about faith and menstrual health in a safe, understanding space
              </p>
              
              <div className="flex items-center gap-2 text-red-400 font-semibold group-hover:gap-3 transition-all duration-300">
                <span>Go to Chatbot</span>
                <ArrowRight className="w-5 h-5 transform group-hover:translate-x-1 transition-transform duration-300" />
              </div>

              {/* Corner accent */}
              <div className="absolute top-0 right-0 w-20 h-20 bg-gradient-to-br from-red-500/20 to-transparent rounded-tr-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}