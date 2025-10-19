"use client";
import { motion } from "framer-motion";
import { Stethoscope, Calendar, MessageCircle, Award, Star, ChevronLeft, ChevronRight } from "lucide-react";
import { Autoplay, EffectCoverflow, Navigation, Pagination } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css/effect-coverflow";
import "swiper/css/pagination";
import "swiper/css/navigation";
import "swiper/css";

export default function ExpertConsultation() {
    const experts = [
    {
      id: 1,
      name: "Dr. Ananya Sharma",
      specialty: "Gynecologist & Obstetrician",
      experience: "15+ years",
      image: "https://images.unsplash.com/photo-1559839734-2b71ea197ec2?w=800&h=1000&fit=crop",
      tags: ["PCOS Specialist", "Adolescent Health", "Reproductive Care"],
      rating: 4.9,
      reviews: 342,
      availability: "Available Today"
    },
    {
      id: 2,
      name: "Dr. Meera Patel",
      specialty: "Nutritionist & Wellness Coach",
      experience: "12+ years",
      image: "https://images.unsplash.com/photo-1594824476967-48c8b964273f?w=800&h=1000&fit=crop",
      tags: ["Hormonal Balance", "Diet Planning", "Holistic Nutrition"],
      rating: 4.8,
      reviews: 287,
      availability: "Next Available: Tomorrow"
    },
    {
      id: 3,
      name: "Dr. Priya Malhotra",
      specialty: "Clinical Psychologist",
      experience: "10+ years",
      image: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=800&h=1000&fit=crop",
      tags: ["Mental Health", "Stress Management", "Body Positivity"],
      rating: 4.9,
      reviews: 421,
      availability: "Available Today"
    },
    {
      id: 4,
      name: "Pandit Rajesh Kumar",
      specialty: "Vedic Health Advisor",
      experience: "20+ years",
      image: "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=800&h=1000&fit=crop",
      tags: ["Ayurveda", "Spiritual Wellness", "Traditional Wisdom"],
      rating: 4.7,
      reviews: 198,
      availability: "Available This Week"
    },
    {
      id: 5,
      name: "Dr. Fatima Rizvi",
      specialty: "Endocrinologist",
      experience: "14+ years",
      image: "https://images.unsplash.com/photo-1551836022-d5d88e9218df?w=800&h=1000&fit=crop",
      tags: ["Hormonal Disorders", "PCOS", "Thyroid Specialist"],
      rating: 4.9,
      reviews: 356,
      availability: "Available Today"
    },
    {
      id: 6,
      name: "Sister Mary Thomas",
      specialty: "Faith-Based Counselor",
      experience: "18+ years",
      image: "https://images.unsplash.com/photo-1580489944761-15a19d654956?w=800&h=1000&fit=crop",
      tags: ["Faith Guidance", "Community Support", "Pastoral Care"],
      rating: 4.8,
      reviews: 234,
      availability: "Next Available: Tomorrow"
    },
    {
      id: 7,
      name: "Dr. Kavita Reddy",
      specialty: "Adolescent Health Specialist",
      experience: "11+ years",
      image: "https://images.unsplash.com/photo-1607990281513-2c110a25bd8c?w=800&h=1000&fit=crop",
      tags: ["Teen Health", "Puberty Care", "Education"],
      rating: 4.8,
      reviews: 312,
      availability: "Available Today"
    },
    {
      id: 8,
      name: "Dr. Sanjay Mehta",
      specialty: "General Physician",
      experience: "16+ years",
      image: "https://images.unsplash.com/photo-1612349317150-e413f6a5b16d?w=800&h=1000&fit=crop",
      tags: ["Primary Care", "Women's Health", "Preventive Medicine"],
      rating: 4.7,
      reviews: 289,
      availability: "Available This Week"
    }
  ];

  const css = `
  .ExpertCarousel {
    width: 100%;
    height: 550px;
    padding-bottom: 80px !important;
  }
  
  .ExpertCarousel .swiper-slide {
    background-position: center;
    background-size: cover;
    width: 350px;
  }

  .swiper-pagination-bullet {
    background-color: #ef4444 !important;
    opacity: 0.5;
  }

  .swiper-pagination-bullet-active {
    opacity: 1 !important;
  }

  .swiper-button-next,
  .swiper-button-prev {
    color: #fff !important;
  }
  `;

  return (
    <section className="relative py-20 md:py-24 px-4 sm:px-6 lg:px-8 bg-gradient-to-b from-black via-zinc-950 to-black overflow-hidden">
      <style>{css}</style>

      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-1/4 left-20 w-96 h-96 bg-red-500/5 rounded-full blur-3xl" />
        <div className="absolute bottom-1/3 right-20 w-96 h-96 bg-red-500/5 rounded-full blur-3xl" />
      </div>

      <div className="relative max-w-7xl mx-auto z-10">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-6" style={{ fontFamily: 'Poppins, sans-serif' }}>
            Consult with{" "}
            <span className="text-transparent bg-clip-text bg-red-500">
              Expert Advisors
            </span>
          </h2>
          <p className="text-lg md:text-xl text-gray-300 max-w-3xl mx-auto leading-relaxed" style={{ fontFamily: 'Inter, sans-serif' }}>
            Connect with certified medical professionals and faith-based counselors who understand your journey
          </p>

          <div className="flex items-center justify-center gap-4 mt-10">
            <div className="h-px w-20 bg-gradient-to-r from-transparent to-red-500" />
            <Stethoscope className="w-6 h-6 text-red-500" />
            <div className="h-px w-20 bg-gradient-to-l from-transparent to-red-500" />
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, translateY: 20 }}
          animate={{ opacity: 1, translateY: 0 }}
          transition={{ duration: 0.3, delay: 0.5 }}
          className="relative w-full max-w-6xl mx-auto px-5"
        >
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.3 }}
            className="w-full"
          >
            <Swiper
              spaceBetween={0}
              effect="coverflow"
              grabCursor={true}
              slidesPerView="auto"
              centeredSlides={true}
              loop={true}
              coverflowEffect={{
                rotate: 40,
                stretch: 0,
                depth: 100,
                modifier: 1,
                slideShadows: true,
              }}
              pagination={{ clickable: true }}
              navigation={{
                nextEl: ".swiper-button-next",
                prevEl: ".swiper-button-prev",
              }}
              className="ExpertCarousel"
              modules={[EffectCoverflow, Pagination, Navigation]}
            >
              {experts.map((expert, index) => (
                <SwiperSlide key={index}>
                  <div className="relative h-full w-full overflow-hidden rounded-3xl bg-gradient-to-br from-zinc-900 via-zinc-800 to-black">
                    <div 
                      className="absolute inset-0 bg-cover bg-center"
                      style={{
                        backgroundImage: `linear-gradient(to bottom, rgba(0,0,0,0.2), rgba(0,0,0,0.9)), url(${expert.image})`,
                      }}
                    />

                    <div className="relative h-full flex flex-col justify-end p-6">
                      <div className="mb-4">
                        <span className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full text-xs font-semibold bg-gradient-to-r from-red-500 to-red-600 text-white">
                          <div className="w-2 h-2 bg-white rounded-full animate-pulse" />
                          {expert.availability}
                        </span>
                      </div>

                      <h3 className="text-2xl font-bold text-white mb-1" style={{ fontFamily: 'Poppins, sans-serif' }}>
                        {expert.name}
                      </h3>
                      <p className="text-red-400 font-semibold mb-3 text-sm" style={{ fontFamily: 'Inter, sans-serif' }}>
                        {expert.specialty}
                      </p>

                      <div className="flex items-center gap-4 mb-4">
                        <div className="flex items-center gap-1">
                          <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                          <span className="text-white font-semibold text-sm">{expert.rating}</span>
                          <span className="text-gray-400 text-xs">({expert.reviews})</span>
                        </div>
                        <div className="flex items-center gap-1 text-gray-300 text-sm">
                          <Award className="w-4 h-4" />
                          <span>{expert.experience}</span>
                        </div>
                      </div>

                      <div className="flex flex-wrap gap-2 mb-4">
                        {expert.tags.map((tag, i) => (
                          <span key={i} className="px-3 py-1 bg-white/10 backdrop-blur-sm border border-white/20 rounded-full text-xs text-gray-200">
                            {tag}
                          </span>
                        ))}
                      </div>

                      <div className="flex gap-3">
                        <button className="flex-1 flex items-center justify-center gap-2 px-4 py-3 bg-gradient-to-r from-red-500 to-red-600 rounded-lg transition-all duration-300 transform hover:-translate-y-0.5 hover:shadow-xl hover:shadow-red-500/30">
                          <Calendar className="w-4 h-4 text-white" />
                          <span className="text-white font-semibold text-sm" style={{ fontFamily: 'Poppins, sans-serif' }}>
                            Book
                          </span>
                        </button>
                        <button className="flex items-center justify-center gap-2 px-4 py-3 bg-white/10 hover:bg-white/20 backdrop-blur-sm border border-white/20 rounded-lg transition-all duration-300">
                          <MessageCircle className="w-4 h-4 text-white" />
                          <span className="text-white font-semibold text-sm" style={{ fontFamily: 'Poppins, sans-serif' }}>
                            Chat
                          </span>
                        </button>
                      </div>
                    </div>
                  </div>
                </SwiperSlide>
              ))}

              <div>
                <div className="swiper-button-next after:hidden">
                  <ChevronRight className="h-8 w-8 text-white" />
                </div>
                <div className="swiper-button-prev after:hidden">
                  <ChevronLeft className="h-8 w-8 text-white" />
                </div>
              </div>
            </Swiper>
          </motion.div>
        </motion.div>

        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 1 }}
          className="text-center mt-12"
        >
          <button className="px-8 py-4 bg-gradient-to-r from-red-500 to-red-600 text-white font-bold rounded-lg hover:shadow-xl hover:shadow-red-500/30 transition-all duration-300 transform hover:-translate-y-1" style={{ fontFamily: 'Poppins, sans-serif' }}>
            View All Experts
          </button>
        </motion.div>
      </div>

      <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-black to-transparent pointer-events-none" />
    </section>
  );
}