"use client";
import { motion } from "framer-motion";
import { Stethoscope, MessageCircle, Award, Star, ChevronLeft, ChevronRight } from "lucide-react";
import { Autoplay, EffectCoverflow, Navigation, Pagination } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css/effect-coverflow";
import "swiper/css/pagination";
import "swiper/css/navigation";
import "swiper/css";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";

export default function ExpertConsultation() {
  const [experts, setExperts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const BACKEND_URL = process.env.NEXT_PUBLIC_BACKEND_URL;
  const router = useRouter();

  useEffect(() => {
    const fetchDoctors = async () => {
      try {
        const response = await fetch(`${BACKEND_URL}/api/doctors`); // Adjust the API endpoint as needed
        if (!response.ok) throw new Error('Failed to fetch doctors');
        const doctors = await response.json();
        
        // Transform the doctor data to match the experts format
        const transformedExperts = doctors.map(doctor => ({
          id: doctor._id,
          name: doctor.name,
          specialty: doctor.specialization,
          experience: `${doctor.experience}+ years`,
          image: doctor.image || "https://images.unsplash.com/photo-1559839734-2b71ea197ec2?w=800&h=1000&fit=crop",
          tags: doctor.description ? [doctor.description.substring(0, 30)] : ["Healthcare Professional"],
          rating: doctor.rating || 4.8,
          reviews: doctor.reviews || 250,
          availability: doctor.availableSlots && doctor.availableSlots.length > 0 ? "Available Today" : "Contact for Availability",
          consultationFee: doctor.consultationFee
        }));
        
        setExperts(transformedExperts);
        setLoading(false);
      } catch (err) {
        console.error('Error fetching doctors:', err);
        setError(err.message);
        setLoading(false);
      }
    };

    fetchDoctors();
  }, []);

  // Fallback expert for demo if no data
  const fallbackExpert = {
    id: 1,
    name: "Dr. Ananya Sharma",
    specialty: "Gynecologist & Obstetrician",
    experience: "15+ years",
    image: "https://images.unsplash.com/photo-1559839734-2b71ea197ec2?w=800&h=1000&fit=crop",
    tags: ["PCOS Specialist", "Adolescent Health", "Reproductive Care"],
    rating: 4.9,
    reviews: 342,
    availability: "Available Today"
  };

  const displayExperts = experts.length > 0 ? experts : [fallbackExpert];

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
          {loading ? (
            <div className="flex justify-center items-center h-96">
              <div className="animate-spin rounded-full h-16 w-16 border-t-2 border-b-2 border-red-500"></div>
            </div>
          ) : error ? (
            <div className="text-center text-red-400 p-8 bg-red-500/10 rounded-lg">
              <p className="text-lg">Error loading experts: {error}</p>
              <p className="text-sm text-gray-400 mt-2">Please try again later</p>
            </div>
          ) : (
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
              loop={displayExperts.length > 1}
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
              {displayExperts.map((expert, index) => (
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
                        <button onClick={()=>router.push(`/carehub/doctors/${expert.id}`)} className="flex-1 flex items-center justify-center gap-2 px-4 py-3 bg-gradient-to-r from-red-500 to-red-600 rounded-lg transition-all duration-300 transform hover:-translate-y-0.5 hover:shadow-xl hover:shadow-red-500/30">
                          <span className="text-white font-semibold text-sm" style={{ fontFamily: 'Poppins, sans-serif' }}>
                            View Details
                          </span>
                          <ChevronRight className="w-4 h-4 text-white" />
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
          )}
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