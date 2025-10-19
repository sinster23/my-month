"use client";
import { useState } from "react";
import { Heart, Sparkles, MessageSquare, ArrowRight } from "lucide-react";
import { useRouter } from "next/navigation";

export default function ForumSection() {
  const router = useRouter();
  return (
    <section id="forum" className="relative py-24 overflow-hidden">
      {/* Background Image with Overlay */}
      <div className="absolute inset-0">
        <div 
          className="w-full h-full bg-gradient-to-br from-zinc-800 via-zinc-900 to-black"
          style={{
            backgroundImage: 'url(/forum.png)',
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

       <div className="absolute top-0 left-0 right-0 h-32 bg-gradient-to-b from-black to-transparent" />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 z-10">
         {/* Decorative mascots at top */}
        {/* <div className="flex justify-center mb-8">
          <div className="animate-bounce-slow">
            <img src="/edu0.png" alt="Mascot 1" className="w-45 h-45" />
          </div>
        </div> */}

        {/* Main Content */}
        <div className="text-center max-w-4xl mx-auto mb-12">
          {/* Subtitle with red color */}
          <h3 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-12" style={{ fontFamily: 'Poppins, sans-serif' }}>
            <span className="text-gray-300">Little things that </span>
            <span className="text-red-500">
              make big difference days.
            </span>
          </h3>

          {/* Description paragraphs */}
          <p className="text-gray-300 text-base md:text-lg mb-6 leading-relaxed" style={{ fontFamily: 'Inter, sans-serif' }}>
            Whether you're curious about faith perspectives, seeking support, or ready to share your story—this is your safe space to connect.
          </p>

          <p className="text-gray-400 text-base mb-10 leading-relaxed" style={{ fontFamily: 'Inter, sans-serif' }}>
            Click a button, join a conversation, and find your community.
          </p>

          {/* Action Buttons */}
           <div className="text-center">
          <button
            onClick={() => router.push("/stories")}
            className="group relative px-10 py-5 bg-red-500 hover:bg-red-600 text-white font-bold rounded-full text-lg transition-all duration-300 shadow-xl hover:shadow-2xl hover:scale-105 overflow-hidden"
            style={{ fontFamily: 'Poppins, sans-serif' }}
          >
            {/* Button glow effect */}
            <div className="absolute inset-0 bg-white opacity-0 group-hover:opacity-20 transition-opacity duration-300" />
            
            <span className="relative z-10 flex items-center gap-3">
              <MessageSquare className="w-6 h-6" />
              Share Your Story
              <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform duration-300" />
            </span>

            {/* Animated sparkles */}
            <div className="absolute -top-1 -right-1 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
              <Sparkles className="w-5 h-5 text-yellow-300 animate-ping" />
            </div>
            <div className="absolute -bottom-1 -left-1 opacity-0 group-hover:opacity-100 transition-opacity duration-300 animation-delay-150">
              <Sparkles className="w-4 h-4 text-red-200 animate-ping" />
            </div>
          </button>

          <p className="text-gray-500 text-sm mt-4 italic" style={{ fontFamily: 'Merriweather, serif' }}>
            Your story could light the way for someone else ✨
          </p>
        </div>
        </div>
      </div>

      {/* Bottom gradient fade */}
      <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-black to-transparent" />

      <style jsx>{`
        @keyframes float {
          0%, 100% { transform: translateY(0px) rotate(0deg); }
          50% { transform: translateY(-20px) rotate(5deg); }
        }
        
        @keyframes float-delayed {
          0%, 100% { transform: translateY(0px) rotate(0deg); }
          50% { transform: translateY(-15px) rotate(-5deg); }
        }

        @keyframes bounce-slow {
          0%, 100% { transform: translateY(0px); }
          50% { transform: translateY(-10px); }
        }
        
        .animate-float {
          animation: float 4s ease-in-out infinite;
        }
        
        .animate-float-delayed {
          animation: float-delayed 5s ease-in-out infinite;
          animation-delay: 1s;
        }

        .animate-bounce-slow {
          animation: bounce-slow 3s ease-in-out infinite;
        }
      `}</style>
    </section>
  );
}