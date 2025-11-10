"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { AlertCircle, X, MapPin, Hospital, Navigation } from "lucide-react";

export default function EmergencyButton() {
  const [isOpen, setIsOpen] = useState(false);
  const router = useRouter();

  const handleEmergencyClick = () => {
    router.push("/carehub/nearby");
    setIsOpen(false);
  };

  return (
    <>
      {/* Emergency Button - Bottom Left */}
      <button
        onClick={() => setIsOpen(true)}
        className="fixed bottom-6 left-6 z-50 group"
        aria-label="Emergency access"
      >
        <div className="relative">
          {/* Pulsing ring animation - slowed down */}
          <div className="absolute inset-0 bg-red-500 rounded-full opacity-75 animate-pulse-slow" style={{ animation: 'ping 2s cubic-bezier(0, 0, 0.2, 1) infinite' }} />
          
          {/* Main button */}
          <div className="relative bg-red-600 hover:bg-red-700 text-white p-4 rounded-full shadow-2xl transition-all duration-300 group-hover:scale-110">
            <AlertCircle className="w-6 h-6" />
          </div>
          
          {/* Tooltip */}
          <div className="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 px-3 py-1 bg-gray-900 text-white text-xs rounded-lg opacity-0 group-hover:opacity-100 transition-opacity duration-200 whitespace-nowrap pointer-events-none">
            Emergency Access
            <div className="absolute top-full left-1/2 -translate-x-1/2 -mt-1 border-4 border-transparent border-t-gray-900" />
          </div>
        </div>
      </button>

      {/* Emergency Modal */}
      {isOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          {/* Backdrop */}
          <div 
            className="absolute inset-0 bg-black/80 backdrop-blur-sm"
            onClick={() => setIsOpen(false)}
          />
          
          {/* Modal Content - Styled like resource cards */}
          <div className="relative bg-gradient-to-br from-zinc-900 to-black border-2 border-red-500/40 rounded-2xl shadow-2xl max-w-md w-full overflow-hidden animate-scale-in">

            {/* Close Button */}
            <button
              onClick={() => setIsOpen(false)}
              className="absolute top-4 right-4 text-gray-400 hover:text-red-500 transition-colors z-10 bg-black/50 rounded-full p-1.5"
            >
              <X className="w-5 h-5" />
            </button>

            {/* Content */}
            <div className="relative p-8 space-y-6 z-10">
              {/* Header */}
              <div>
                <div className="flex items-center gap-3 mb-3">
                  <div className="w-12 h-12 bg-red-500 rounded-full flex items-center justify-center">
                    <AlertCircle className="w-7 h-7 text-white" />
                  </div>
                  <h2 className="text-2xl font-bold text-white" style={{ fontFamily: 'Poppins, sans-serif' }}>
                    Emergency Access
                  </h2>
                </div>
                <p className="text-gray-400 text-sm leading-relaxed" style={{ fontFamily: 'Inter, sans-serif' }}>
                  Need urgent help? You can quickly find and visit nearby clinics, hospitals, pharmacies, and healthcare facilities.
                </p>
              </div>

              {/* Features - Styled like resource items */}
              <div className="space-y-3">
                <div className="cursor-pointer bg-black/40 hover:bg-black/60 border border-red-500/20 hover:border-red-500/40 rounded-xl p-4 transition-all duration-300 group">
                  <div className="flex items-start gap-3">
                    <Hospital className="w-5 h-5 text-red-500 mt-0.5 flex-shrink-0" />
                    <div className="flex-1">
                      <p className="font-semibold text-white text-sm mb-1 transition-colors" style={{ fontFamily: 'Poppins, sans-serif' }}>
                        Hospitals & Clinics
                      </p>
                      <p className="text-gray-400 text-xs leading-relaxed" style={{ fontFamily: 'Inter, sans-serif' }}>
                        Find emergency care near you
                      </p>
                    </div>
                  </div>
                </div>
                
                <div className="cursor-pointer bg-black/40 hover:bg-black/60 border border-red-500/20 hover:border-red-500/40 rounded-xl p-4 transition-all duration-300 group">
                  <div className="flex items-start gap-3">
                    <MapPin className="w-5 h-5 text-red-500 mt-0.5 flex-shrink-0" />
                    <div className="flex-1">
                      <p className="font-semibold text-white text-sm mb-1 transition-colors" style={{ fontFamily: 'Poppins, sans-serif' }}>
                        Pharmacies & Shops
                      </p>
                      <p className="text-gray-400 text-xs leading-relaxed" style={{ fontFamily: 'Inter, sans-serif' }}>
                        Get essential supplies quickly
                      </p>
                    </div>
                  </div>
                </div>
                
                <div className="cursor-pointer bg-black/40 hover:bg-black/60 border border-red-500/20 hover:border-red-500/40 rounded-xl p-4 transition-all duration-300 group">
                  <div className="flex items-start gap-3">
                    <Navigation className="w-5 h-5 text-red-500 mt-0.5 flex-shrink-0" />
                    <div className="flex-1">
                      <p className="font-semibold text-white text-sm mb-1 transition-colors" style={{ fontFamily: 'Poppins, sans-serif' }}>
                        Real-time Navigation
                      </p>
                      <p className="text-gray-400 text-xs leading-relaxed" style={{ fontFamily: 'Inter, sans-serif' }}>
                        Get directions instantly
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              {/* CTA Button */}
              <button
                onClick={handleEmergencyClick}
                className="w-full bg-red-500 hover:bg-red-600 text-white font-bold py-4 rounded-xl transition-all duration-300 shadow-lg hover:shadow-xl hover:scale-105 flex items-center justify-center gap-2 group"
                style={{ fontFamily: 'Poppins, sans-serif' }}
              >
                <MapPin className="w-5 h-5" />
                Find Nearby Care Now
                <Navigation className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </button>

              {/* Emergency Note */}
              <p className="text-center text-xs text-gray-500 italic leading-relaxed" style={{ fontFamily: 'Inter, sans-serif' }}>
                For life-threatening emergencies, please call local emergency services immediately.
              </p>
            </div>
          </div>
        </div>
      )}

      <style jsx>{`
        @keyframes scale-in {
          from {
            opacity: 0;
            transform: scale(0.9);
          }
          to {
            opacity: 1;
            transform: scale(1);
          }
        }
        
        .animate-scale-in {
          animation: scale-in 0.2s ease-out;
        }
        
        /* Slower pulse animation - 3 seconds instead of default 2 seconds */
        .animate-pulse-slow {
          animation: pulse 3s cubic-bezier(0.4, 0, 0.6, 1) infinite;
        }
        
        @keyframes pulse {
          0%, 100% {
            opacity: 1;
          }
          50% {
            opacity: 0.5;
          }
        }
      `}</style>
    </>
  );
}