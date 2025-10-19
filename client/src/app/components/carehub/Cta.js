"use client";
import { ShoppingBag, Stethoscope, ArrowRight } from "lucide-react";

export default function CTASection() {
  return (
    <section className="relative w-full py-24 overflow-hidden bg-black">
      {/* Background decorative elements */}
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
            Ready to Take Control of Your{" "}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-red-400 via-red-500 to-red-600">
              Cycle & Well-being?
            </span>
          </h2>
          <div className="w-20 h-1 mx-auto bg-gradient-to-r from-transparent via-red-500 to-transparent rounded-full" />
          <p className="text-lg md:text-xl text-gray-300 mt-6 max-w-3xl mx-auto leading-relaxed" style={{ fontFamily: 'Inter, sans-serif' }}>
            Whether you need products, expert guidance, or both—we're here to support your journey
          </p>
        </div>

        {/* CTA Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-5xl mx-auto">
          {/* Start Shopping Card */}
          <div className="group relative overflow-hidden rounded-2xl cursor-pointer transition-all duration-500 hover:scale-105 hover:shadow-2xl hover:shadow-red-500/20">
            <div className="absolute inset-0">
              <div 
                className="w-full h-full bg-gradient-to-br from-zinc-800 via-zinc-900 to-black"
                style={{
                  backgroundImage: 'url(/carehub1.png)',
                  backgroundSize: 'cover',
                  backgroundPosition: 'center',
                }}
              />
              <div className="absolute inset-0 bg-gradient-to-br from-red-900/90 via-black/90 to-red-950/90 group-hover:from-red-800/90 group-hover:via-black/85 transition-all duration-500" />
            </div>

            <div className="relative z-10 p-8 flex flex-col items-center text-center h-full justify-center min-h-[280px] border-2 border-red-500/30 group-hover:border-red-500/50 rounded-2xl transition-all duration-500">
              <div className="mb-6 transform group-hover:scale-110 transition-transform duration-500">
                <div className="w-20 h-20 rounded-full bg-red-500/20 flex items-center justify-center backdrop-blur-sm border border-red-400/30">
                  <ShoppingBag className="w-10 h-10 text-red-400" />
                </div>
              </div>
              
              <h3 className="text-2xl font-bold text-white mb-3 group-hover:text-red-400 transition-colors duration-300" style={{ fontFamily: 'Poppins, sans-serif' }}>
                Start Shopping
              </h3>
              
              <p className="text-gray-400 group-hover:text-gray-300 mb-6 leading-relaxed" style={{ fontFamily: 'Inter, sans-serif' }}>
                Discover quality menstrual products that respect your body and your values
              </p>
              
              <div className="flex items-center gap-2 text-red-400 font-semibold group-hover:gap-3 transition-all duration-300">
                <span>Browse Products</span>
                <ArrowRight className="w-5 h-5 transform group-hover:translate-x-1 transition-transform duration-300" />
              </div>

              {/* Corner accent */}
              <div className="absolute top-0 right-0 w-20 h-20 bg-gradient-to-br from-red-500/20 to-transparent rounded-tr-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
            </div>
          </div>

          {/* Consult Now Card */}
          <div className="group relative overflow-hidden rounded-2xl cursor-pointer transition-all duration-500 hover:scale-105 hover:shadow-2xl hover:shadow-red-500/20">
            <div className="absolute inset-0">
              <div 
                className="w-full h-full bg-gradient-to-br from-zinc-800 via-zinc-900 to-black"
                style={{
                  backgroundImage: 'url(/carehub2.png)',
                  backgroundSize: 'cover',
                  backgroundPosition: 'center',
                }}
              />
              <div className="absolute inset-0 bg-gradient-to-br from-red-900/90 via-black/90 to-red-950/90 group-hover:from-red-800/90 group-hover:via-black/85 transition-all duration-500" />
            </div>

            <div className="relative z-10 p-8 flex flex-col items-center text-center h-full justify-center min-h-[280px] border-2 border-red-500/30 group-hover:border-red-500/50 rounded-2xl transition-all duration-500">
              <div className="mb-6 transform group-hover:scale-110 transition-transform duration-500">
                <div className="w-20 h-20 rounded-full bg-red-500/20 flex items-center justify-center backdrop-blur-sm border border-red-400/30">
                  <Stethoscope className="w-10 h-10 text-red-400" />
                </div>
              </div>
              
              <h3 className="text-2xl font-bold text-white mb-3 group-hover:text-red-400 transition-colors duration-300" style={{ fontFamily: 'Poppins, sans-serif' }}>
                Consult Now
              </h3>
              
              <p className="text-gray-400 group-hover:text-gray-300 mb-6 leading-relaxed" style={{ fontFamily: 'Inter, sans-serif' }}>
                Connect with certified experts who understand your health and faith journey
              </p>
              
              <div className="flex items-center gap-2 text-red-400 font-semibold group-hover:gap-3 transition-all duration-300">
                <span>Book Consultation</span>
                <ArrowRight className="w-5 h-5 transform group-hover:translate-x-1 transition-transform duration-300" />
              </div>

              {/* Corner accent */}
              <div className="absolute top-0 right-0 w-20 h-20 bg-gradient-to-br from-red-500/20 to-transparent rounded-tr-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
            </div>
          </div>
        </div>

        {/* Bottom Message */}
        <div className="text-center mt-16">
          <p className="text-gray-400 text-base md:text-lg" style={{ fontFamily: 'Inter, sans-serif' }}>
            Your journey to empowered menstrual health starts here
          </p>
          <div className="mt-6 flex justify-center gap-2">
            {[...Array(5)].map((_, i) => (
              <div
                key={i}
                className="w-2 h-2 rounded-full bg-red-500/40"
                style={{
                  animation: `pulse 2s ease-in-out infinite`,
                  animationDelay: `${i * 0.2}s`
                }}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}