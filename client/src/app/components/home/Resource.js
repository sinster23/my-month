"use client";
import { useState } from "react";
import { FileText, Download, ExternalLink, MapPin, Heart, Sparkles, BookOpen, Building2, Globe } from "lucide-react";

export default function ResourcesSection() {
  const [hoveredResource, setHoveredResource] = useState(null);

  const resources = [
    {
      category: "Government Programs",
      icon: Building2,
      items: [
        {
          title: "National Menstrual Hygiene Program",
          description: "Government initiatives and schemes",
          link: "#",
          type: "PDF"
        },
        {
          title: "School Health Guidelines",
          description: "Educational resources for schools",
          link: "#",
          type: "PDF"
        }
      ],
      position: "top-left"
    },
    {
      category: "WHO Guidelines",
      icon: Globe,
      items: [
        {
          title: "Menstrual Hygiene Management",
          description: "WHO standards and practices",
          link: "#",
          type: "PDF"
        },
        {
          title: "Reproductive Health Resources",
          description: "Evidence-based guidelines",
          link: "#",
          type: "Link"
        }
      ],
      position: "top-right"
    },
    {
      category: "NGO Initiatives",
      icon: Heart,
      items: [
        {
          title: "Community Education Programs",
          description: "NGO-led awareness initiatives",
          link: "#",
          type: "PDF"
        },
        {
          title: "Product Distribution",
          description: "Support and accessibility programs",
          link: "#",
          type: "Link"
        }
      ],
      position: "bottom-left"
    },
    {
      category: "Educational Materials",
      icon: BookOpen,
      items: [
        {
          title: "Menstrual Health Awareness",
          description: "Comprehensive guides and toolkits",
          link: "#",
          type: "PDF"
        },
        {
          title: "Research & Studies",
          description: "Latest findings and publications",
          link: "#",
          type: "Link"
        }
      ],
      position: "bottom-right"
    }
  ];

  return (
    <section id="resources" className="relative py-24 bg-black overflow-hidden">
      {/* Top gradient fade */}
      <div className="absolute top-0 left-0 right-0 h-32 bg-gradient-to-b from-black to-transparent z-10" />

      {/* Background decorative elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-1/3 left-10 w-96 h-96 bg-red-500/10 rounded-full blur-3xl" />
        <div className="absolute bottom-1/4 right-10 w-96 h-96 bg-red-500/10 rounded-full blur-3xl" />
      </div>

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-16">
          <div className="inline-flex items-center gap-2 mb-4">
            <BookOpen className="w-6 h-6 text-red-500 animate-pulse" />
            <span className="text-red-500 font-semibold tracking-wider uppercase text-sm" style={{ fontFamily: 'Poppins, sans-serif' }}>
              Knowledge is Power
            </span>
            <BookOpen className="w-6 h-6 text-red-500 animate-pulse" />
          </div>

          <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6" style={{ fontFamily: 'Poppins, sans-serif' }}>
            <span className="text-white">Educational </span>
            <span className="text-red-500">
              Resources
            </span>
          </h2>

          <p className="text-base md:text-lg text-gray-400 max-w-2xl mx-auto leading-relaxed" style={{ fontFamily: 'Inter, sans-serif' }}>
            Access trusted information, guidelines, and support materials to empower yourself with knowledge about menstrual health.
          </p>
        </div>

        {/* Main Content - Grid Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-start mb-12">
          
          {/* Top Left - Government Programs */}
          <div className="lg:col-span-1 space-y-6">
            <div className="bg-gradient-to-br from-zinc-900 to-black border-2 border-red-500/30 rounded-2xl p-6 hover:border-red-500/40 transition-all duration-300 hover:scale-105">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-12 h-12 bg-red-500 rounded-full flex items-center justify-center">
                  <Building2 className="w-6 h-6 text-white" />
                </div>
                <h3 className="text-xl font-bold text-white" style={{ fontFamily: 'Poppins, sans-serif' }}>
                  Government Programs
                </h3>
              </div>

              <div className="space-y-3">
                {resources[0].items.map((item, itemIndex) => (
                  <a
                    key={itemIndex}
                    href={item.link}
                    className="group/item block bg-black/40 hover:bg-black/60 border border-red-500/20 hover:border-red-500/40 rounded-xl p-4 transition-all duration-300"
                  >
                    <div className="flex items-start justify-between gap-4">
                      <div className="flex-1">
                        <h4 className="text-white font-semibold mb-1 group-hover/item:text-red-500 transition-colors text-sm" style={{ fontFamily: 'Poppins, sans-serif' }}>
                          {item.title}
                        </h4>
                        <p className="text-gray-400 text-xs leading-relaxed" style={{ fontFamily: 'Inter, sans-serif' }}>
                          {item.description}
                        </p>
                      </div>
                      
                      <div className="flex flex-col items-center gap-1">
                        <span className="text-xs px-2 py-1 bg-red-500/20 text-red-500 rounded-full font-semibold">
                          {item.type}
                        </span>
                        <Download className="w-4 h-4 text-red-500 group-hover/item:translate-y-1 transition-transform" />
                      </div>
                    </div>
                  </a>
                ))}
              </div>
            </div>
          </div>

          {/* Center - Image */}
          <div className="lg:col-span-1 lg:row-span-2">
            <div className="relative h-full w-full rounded-3xl overflow-hidden border-2 border-red-500/30 shadow-2xl group">
              {/* Decorative floating elements */}
              <div className="absolute -top-6 -left-6 w-32 h-32 bg-red-500 rounded-full blur-2xl opacity-30 animate-pulse z-0" />
              <div className="absolute -bottom-6 -right-6 w-40 h-40 bg-red-500 rounded-full blur-2xl opacity-30 animate-pulse z-0" style={{ animationDelay: '1s' }} />

              <img 
                src="/resource.png"
                alt="Educational Resources"
                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                onError={(e) => {
                  e.target.style.display = 'none';
                  e.target.parentElement.style.background = 'linear-gradient(135deg, #ef4444 0%, #dc2626 50%, #b91c1c 100%)';
                }}
              />
              
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />

              <div className="absolute bottom-6 left-6 right-6">
                <h3 className="text-white text-2xl md:text-3xl font-bold mb-2" style={{ fontFamily: 'Poppins, sans-serif' }}>
                  Empower Yourself
                </h3>
                <p className="text-gray-300 text-sm" style={{ fontFamily: 'Inter, sans-serif' }}>
                  Evidence-based information from trusted organizations
                </p>
              </div>
            </div>

            {/* Local Support CTA below image */}
            <div className="mt-8">
              <div className="bg-red-500 rounded-2xl p-6 relative overflow-hidden group/cta hover:scale-105 transition-transform duration-300">
                <div className="absolute inset-0 bg-white opacity-0 group-hover/cta:opacity-10 transition-opacity duration-300" />
                
                <div className="relative z-10">
                  <div className="flex items-center gap-3 mb-3">
                    <MapPin className="w-8 h-8 text-white" />
                    <h3 className="text-xl font-bold text-white" style={{ fontFamily: 'Poppins, sans-serif' }}>
                      Local Support
                    </h3>
                  </div>
                  
                  <p className="text-red-50 mb-4 leading-relaxed text-sm" style={{ fontFamily: 'Inter, sans-serif' }}>
                    Find menstrual health centers and support groups near you
                  </p>
                  
                  <button 
                    onClick={() => window.location.href = "/support-centers"}
                    className="bg-white text-red-600 font-bold px-5 py-2.5 rounded-full hover:bg-gray-100 transition-all duration-300 flex items-center gap-2 group-hover/cta:scale-105 text-sm"
                    style={{ fontFamily: 'Poppins, sans-serif' }}
                  >
                    Find Centers
                    <ExternalLink className="w-4 h-4 group-hover/cta:translate-x-1 transition-transform" />
                  </button>
                </div>

                <div className="absolute top-3 right-3 opacity-50">
                  <Sparkles className="w-5 h-5 text-yellow-300 animate-pulse" />
                </div>
              </div>
            </div>
          </div>

          {/* Top Right - WHO Guidelines */}
          <div className="lg:col-span-1 space-y-6">
            <div className="bg-gradient-to-br from-zinc-900 to-black border-2 border-red-500/30 rounded-2xl p-6 hover:border-red-500/40 transition-all duration-300 hover:scale-105">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-12 h-12 bg-red-500 rounded-full flex items-center justify-center">
                  <Globe className="w-6 h-6 text-white" />
                </div>
                <h3 className="text-xl font-bold text-white" style={{ fontFamily: 'Poppins, sans-serif' }}>
                  WHO Guidelines
                </h3>
              </div>

              <div className="space-y-3">
                {resources[1].items.map((item, itemIndex) => (
                  <a
                    key={itemIndex}
                    href={item.link}
                    className="group/item block bg-black/40 hover:bg-black/60 border border-red-500/20 hover:border-red-500/40 rounded-xl p-4 transition-all duration-300"
                  >
                    <div className="flex items-start justify-between gap-4">
                      <div className="flex-1">
                        <h4 className="text-white font-semibold mb-1 group-hover/item:text-red-500 transition-colors text-sm" style={{ fontFamily: 'Poppins, sans-serif' }}>
                          {item.title}
                        </h4>
                        <p className="text-gray-400 text-xs leading-relaxed" style={{ fontFamily: 'Inter, sans-serif' }}>
                          {item.description}
                        </p>
                      </div>
                      
                      <div className="flex flex-col items-center gap-1">
                        <span className="text-xs px-2 py-1 bg-red-500/20 text-red-500 rounded-full font-semibold">
                          {item.type}
                        </span>
                        {item.type === "PDF" ? (
                          <Download className="w-4 h-4 text-red-500 group-hover/item:translate-y-1 transition-transform" />
                        ) : (
                          <ExternalLink className="w-4 h-4 text-red-500 group-hover/item:translate-x-1 transition-transform" />
                        )}
                      </div>
                    </div>
                  </a>
                ))}
              </div>
            </div>
          </div>

          {/* Bottom Left - NGO Initiatives */}
          <div className="lg:col-span-1 space-y-6">
            <div className="bg-gradient-to-br from-zinc-900 to-black border-2 border-red-500/30 rounded-2xl p-6 hover:border-red-500/40 transition-all duration-300 hover:scale-105">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-12 h-12 bg-red-500 rounded-full flex items-center justify-center">
                  <Heart className="w-6 h-6 text-white" />
                </div>
                <h3 className="text-xl font-bold text-white" style={{ fontFamily: 'Poppins, sans-serif' }}>
                  NGO Initiatives
                </h3>
              </div>

              <div className="space-y-3">
                {resources[2].items.map((item, itemIndex) => (
                  <a
                    key={itemIndex}
                    href={item.link}
                    className="group/item block bg-black/40 hover:bg-black/60 border border-red-500/20 hover:border-red-500/40 rounded-xl p-4 transition-all duration-300"
                  >
                    <div className="flex items-start justify-between gap-4">
                      <div className="flex-1">
                        <h4 className="text-white font-semibold mb-1 group-hover/item:text-red-500 transition-colors text-sm" style={{ fontFamily: 'Poppins, sans-serif' }}>
                          {item.title}
                        </h4>
                        <p className="text-gray-400 text-xs leading-relaxed" style={{ fontFamily: 'Inter, sans-serif' }}>
                          {item.description}
                        </p>
                      </div>
                      
                      <div className="flex flex-col items-center gap-1">
                        <span className="text-xs px-2 py-1 bg-red-500/20 text-red-500 rounded-full font-semibold">
                          {item.type}
                        </span>
                        {item.type === "PDF" ? (
                          <Download className="w-4 h-4 text-red-500 group-hover/item:translate-y-1 transition-transform" />
                        ) : (
                          <ExternalLink className="w-4 h-4 text-red-500 group-hover/item:translate-x-1 transition-transform" />
                        )}
                      </div>
                    </div>
                  </a>
                ))}
              </div>
            </div>
          </div>

          {/* Bottom Right - Educational Materials */}
          <div className="lg:col-span-1">
            <div className="bg-gradient-to-br from-zinc-900 to-black border-2 border-red-500/30 rounded-2xl p-6 hover:border-red-500/40 transition-all duration-300 hover:scale-105">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-12 h-12 bg-red-500 rounded-full flex items-center justify-center">
                  <BookOpen className="w-6 h-6 text-white" />
                </div>
                <h3 className="text-xl font-bold text-white" style={{ fontFamily: 'Poppins, sans-serif' }}>
                  Educational Materials
                </h3>
              </div>

              <div className="space-y-3">
                {resources[3].items.map((item, itemIndex) => (
                  <a
                    key={itemIndex}
                    href={item.link}
                    className="group/item block bg-black/40 hover:bg-black/60 border border-red-500/20 hover:border-red-500/40 rounded-xl p-4 transition-all duration-300"
                  >
                    <div className="flex items-start justify-between gap-4">
                      <div className="flex-1">
                        <h4 className="text-white font-semibold mb-1 group-hover/item:text-red-500 transition-colors text-sm" style={{ fontFamily: 'Poppins, sans-serif' }}>
                          {item.title}
                        </h4>
                        <p className="text-gray-400 text-xs leading-relaxed" style={{ fontFamily: 'Inter, sans-serif' }}>
                          {item.description}
                        </p>
                      </div>
                      
                      <div className="flex flex-col items-center gap-1">
                        <span className="text-xs px-2 py-1 bg-red-500/20 text-red-500 rounded-full font-semibold">
                          {item.type}
                        </span>
                        {item.type === "PDF" ? (
                          <Download className="w-4 h-4 text-red-500 group-hover/item:translate-y-1 transition-transform" />
                        ) : (
                          <ExternalLink className="w-4 h-4 text-red-500 group-hover/item:translate-x-1 transition-transform" />
                        )}
                      </div>
                    </div>
                  </a>
                ))}
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