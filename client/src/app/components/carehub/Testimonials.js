"use client";
import { Star, Heart } from "lucide-react";
import { useEffect, useRef } from "react";

export default function Testimonials() {
  const containerRef = useRef(null);
  const contentRef = useRef(null);
  const animationRef = useRef(null);
  const isPausedRef = useRef(false);

  const testimonials = [
    {
      name: "Aisha Rahman",
      age: "24 years",
      location: "Mumbai, India",
      content: "This platform gave me the confidence to talk about my health without shame. The faith-based counseling helped me understand that my cycle is natural and beautiful. Forever grateful!",
      rating: 5,
      avatar: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=150&h=150&fit=crop&crop=face",
      product: "Faith Counseling Session"
    },
    {
      name: "Priya Sharma",
      age: "19 years",
      location: "Delhi, India",
      content: "Dr. Ananya was so understanding and helped me manage my PCOS naturally. The nutritional guidance combined with medical advice made all the difference in my life.",
      rating: 5,
      avatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=150&h=150&fit=crop&crop=face",
      product: "Gynecologist Consultation"
    },
    {
      name: "Fatima Khan",
      age: "22 years",
      location: "Bangalore, India",
      content: "The community stories inspired me so much. Reading about other women's journeys helped me embrace my own. This platform is truly changing lives and breaking taboos.",
      rating: 5,
      avatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&h=150&fit=crop&crop=face",
      product: "Community Support"
    },
    {
      name: "Sarah Thomas",
      age: "26 years",
      location: "Chennai, India",
      content: "The health guides are so comprehensive and easy to understand. Finally found answers to questions I was too embarrassed to ask. Thank you for creating this safe space!",
      rating: 5,
      avatar: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=150&h=150&fit=crop&crop=face",
      product: "Health Resources"
    },
    {
      name: "Meera Patel",
      age: "21 years",
      location: "Ahmedabad, India",
      content: "The period tracking tools combined with expert advice helped me understand my body better. The psychologist sessions helped me overcome anxiety around my cycle.",
      rating: 5,
      avatar: "https://images.unsplash.com/photo-1517841905240-472988babdf9?w=150&h=150&fit=crop&crop=face",
      product: "Psychology Consultation"
    },
    {
      name: "Zainab Ali",
      age: "23 years",
      location: "Hyderabad, India",
      content: "Found the perfect balance between my faith and health needs. The Islamic counselor helped me understand that self-care during menstruation is part of our religion. Beautiful experience!",
      rating: 5,
      avatar: "https://images.unsplash.com/photo-1488426862026-3ee34a7d66df?w=150&h=150&fit=crop&crop=face",
      product: "Faith-Based Counseling"
    },
    {
      name: "Anjali Verma",
      age: "20 years",
      location: "Pune, India",
      content: "The nutritionist helped me create a diet plan that reduced my cramps significantly. Feeling healthier and more energetic than ever. Highly recommend their services!",
      rating: 5,
      avatar: "https://images.unsplash.com/photo-1531746020798-e6953c6e8e04?w=150&h=150&fit=crop&crop=face",
      product: "Nutrition Consultation"
    },
    {
      name: "Simran Kaur",
      age: "25 years",
      location: "Chandigarh, India",
      content: "As a Sikh woman, I appreciated how the platform respects all faiths while providing medical facts. The endocrinologist diagnosed my thyroid issue that was affecting my cycle.",
      rating: 5,
      avatar: "https://images.unsplash.com/photo-1529626455594-4ff0802cfb7e?w=150&h=150&fit=crop&crop=face",
      product: "Endocrinology Consultation"
    }
  ];

  // Triple the testimonials for seamless loop
  const loopItems = [...testimonials, ...testimonials, ...testimonials];

  useEffect(() => {
    const content = contentRef.current;
    if (!content) return;

    let scrollPosition = 0;
    const scrollSpeed = 0.5; // pixels per frame

    const animate = () => {
      if (!isPausedRef.current && content) {
        scrollPosition += scrollSpeed;
        
        // Reset position when we've scrolled through one set of testimonials
        const singleSetWidth = content.scrollWidth / 3;
        if (scrollPosition >= singleSetWidth) {
          scrollPosition = 0;
        }
        
        content.style.transform = `translateX(-${scrollPosition}px)`;
      }
      
      animationRef.current = requestAnimationFrame(animate);
    };

    animationRef.current = requestAnimationFrame(animate);

    return () => {
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current);
      }
    };
  }, []);

  const handleMouseEnter = () => {
    isPausedRef.current = true;
  };

  const handleMouseLeave = () => {
    isPausedRef.current = false;
  };

  return (
    <section className="relative w-full py-24 md:py-32 overflow-hidden bg-black">
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-1/3 left-10 w-96 h-96 bg-red-500/10 rounded-full blur-3xl" />
        <div className="absolute bottom-1/4 right-10 w-96 h-96 bg-red-500/10 rounded-full blur-3xl" />
      </div>
      {/* Content Container */}
      <div className="relative mx-auto px-6 md:px-12">
        {/* Header Section */}
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-6" style={{ fontFamily: 'Poppins, sans-serif' }}>
            Voices of{" "}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-red-400 via-red-500 to-red-600">
              Empowerment
            </span>
          </h2>
          
          <div className="w-24 h-1 mx-auto bg-gradient-to-r from-transparent via-red-500 to-transparent rounded-full" />

          <p className="text-xl md:text-2xl text-gray-100 font-light leading-relaxed max-w-3xl mx-auto mt-8" style={{ fontFamily: 'Inter, sans-serif' }}>
            Real stories from women who found support, guidance, and confidence
          </p>
        </div>

        {/* Scrolling Testimonials */}
        <div className="relative -mx-6 md:-mx-12">
          <div 
            ref={containerRef} 
            className="w-full overflow-hidden"
            onMouseEnter={handleMouseEnter}
            onMouseLeave={handleMouseLeave}
          >
            <div ref={contentRef} className="flex gap-6 will-change-transform pl-6">
              {loopItems.map((t, i) => (
                <div key={i} className="flex-shrink-0 w-96 bg-white/5 backdrop-blur-sm border border-white/10 rounded-2xl p-8 hover:shadow-2xl hover:shadow-red-500/20 transition-all duration-300 hover:scale-105 hover:border-red-500/50 group cursor-pointer my-4">
                  <div className="flex items-start mb-6">
                    <div className="relative flex-shrink-0">
                      <img 
                        loading="lazy" 
                        src={t.avatar} 
                        alt={t.name} 
                        className="w-16 h-16 rounded-full object-cover border-4 border-red-500/30 group-hover:border-red-500 transition-colors duration-300" 
                      />
                      <div className="absolute -bottom-1 -right-1 w-6 h-6 bg-red-500 rounded-full border-2 border-black flex items-center justify-center">
                        <Heart className="w-3 h-3 text-white fill-white" />
                      </div>
                    </div>
                    <div className="ml-4 flex-1">
                      <div className="text-white font-bold text-lg" style={{ fontFamily: 'Poppins, sans-serif' }}>{t.name}</div>
                      <div className="text-red-400 text-sm font-medium" style={{ fontFamily: 'Inter, sans-serif' }}>{t.age} • {t.location}</div>
                      <div className="text-gray-400 text-xs mt-1" style={{ fontFamily: 'Inter, sans-serif' }}>{t.product}</div>
                    </div>
                  </div>

                  <div className="flex mb-4">
                    {[...Array(t.rating)].map((_, k) => (
                      <Star key={k} className="w-5 h-5 text-yellow-400 fill-yellow-400" />
                    ))}
                  </div>

                  <p className="text-gray-300 leading-relaxed text-sm" style={{ fontFamily: 'Inter, sans-serif' }}>
                    "{t.content}"
                  </p>

                  <div className="mt-6 flex justify-end">
                    <div className="w-12 h-1 bg-gradient-to-r from-red-400 to-red-600 rounded-full"></div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}