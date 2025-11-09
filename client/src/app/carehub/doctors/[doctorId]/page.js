"use client";
import { motion } from "framer-motion";
import { 
  Calendar, 
  Clock, 
  MapPin, 
  Phone, 
  Mail, 
  Award, 
  Star, 
  ChevronLeft,
  Video,
  Tag,
  User,
  Briefcase,
  GraduationCap,
  Languages,
  DollarSign
} from "lucide-react";
import { useState, useEffect } from "react";
import { useParams } from 'next/navigation';

export default function DoctorBookingPage() {
  const [selectedDate, setSelectedDate] = useState(null);
  const [selectedTime, setSelectedTime] = useState(null);
  const [consultationType, setConsultationType] = useState("video"); // video or in-person
  const [loading, setLoading] = useState(true);
  const [doctor, setDoctor] = useState(null);
  const params = useParams();
  const doctorId = params.doctorId;

    const BACKEND_URL = process.env.NEXT_PUBLIC_BACKEND_URL;

  useEffect(() => {
    const fetchDoctor = async () => {
      try {
        const response = await fetch(`${BACKEND_URL}/api/doctors/${doctorId}`);
        if (!response.ok) throw new Error('Failed to fetch doctor');
        const data = await response.json();
        setDoctor(data);
        setLoading(false);
      } catch (err) {
        console.error('Error fetching doctor:', err);
        setLoading(false);
      }
    };

    fetchDoctor();
  }, [doctorId]);


  const displayDoctor = doctor;

  const handleBooking = () => {
    if (!selectedDate || !selectedTime) {
      alert("Please select a date and time");
      return;
    }
    
    // Handle booking logic here
    console.log("Booking:", {
      doctorId: displayDoctor._id,
      date: selectedDate,
      time: selectedTime,
      type: consultationType
    });
    alert("Booking confirmed! You will receive a confirmation email shortly.");
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-black via-zinc-950 to-black flex items-center justify-center">
        <div className="animate-spin rounded-full h-16 w-16 border-t-2 border-b-2 border-red-500"></div>
      </div>
    );
  }

 return (
    <div className="min-h-screen bg-gradient-to-b from-black via-zinc-950 to-black">
      {/* Background Effects */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-1/4 left-20 w-96 h-96 bg-red-500/5 rounded-full blur-3xl" />
        <div className="absolute bottom-1/3 right-20 w-96 h-96 bg-red-500/5 rounded-full blur-3xl" />
      </div>

      <div className="relative z-10">
        {/* Back Button */}
        <div className="px-4 sm:px-6 lg:px-8 pt-8 max-w-7xl mx-auto">
          <motion.button
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            className="flex items-center gap-2 text-gray-300 hover:text-white transition-colors"
            onClick={() => window.history.back()}
          >
            <ChevronLeft className="w-5 h-5" />
            <span className="font-medium">Back to Experts</span>
          </motion.button>
        </div>

        {/* Main Content */}
        <div className="px-4 sm:px-6 lg:px-8 py-12 max-w-7xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Left Column - Doctor Info */}
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="lg:col-span-1 relative"
            >
              <div className="bg-gradient-to-br from-zinc-900 via-zinc-800 to-black border border-zinc-700/50 rounded-2xl overflow-hidden sticky top-8">
                {/* Doctor Image */}
                <div className="relative h-80 overflow-hidden">
                  <img 
                    src={displayDoctor.image} 
                    alt={displayDoctor.name}
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent" />
                  
                  {/* Rating Badge */}
                  <div className="absolute top-4 right-4 flex items-center gap-1 px-3 py-1.5 bg-black/70 backdrop-blur-sm rounded-full">
                    <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                    <span className="text-white font-semibold text-sm">{displayDoctor.rating}</span>
                    <span className="text-gray-400 text-xs">({displayDoctor.reviews})</span>
                  </div>

                  {/* Availability Badge */}
                  {displayDoctor.availability && (
                    <div className="absolute top-4 left-4">
                      <span className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full text-xs font-semibold bg-gradient-to-r from-red-500 to-red-600 text-white">
                        <div className="w-2 h-2 bg-white rounded-full animate-pulse" />
                        {displayDoctor.availability}
                      </span>
                    </div>
                  )}
                </div>

                {/* Doctor Details */}
                <div className="p-6">
                  <h1 className="text-3xl font-bold text-white mb-2">
                    {displayDoctor.name}
                  </h1>
                  <p className="text-red-400 font-semibold mb-4">
                    {displayDoctor.specialization}
                  </p>

                  {/* Experience */}
                  {displayDoctor.experience && (
                    <div className="flex items-center gap-2 text-gray-300 mb-4">
                      <Award className="w-5 h-5 text-red-500" />
                      <span>{displayDoctor.experience}+ years experience</span>
                    </div>
                  )}

                  {/* Contact Info */}
                  <div className="space-y-3 mb-6 pt-6 border-t border-zinc-700/50">
                    {displayDoctor.phone && (
                      <div className="flex items-center gap-2 text-gray-300">
                        <Phone className="w-4 h-4 text-red-500" />
                        <span className="text-sm">{displayDoctor.phone}</span>
                      </div>
                    )}
                    {displayDoctor.email && (
                      <div className="flex items-center gap-2 text-gray-300">
                        <Mail className="w-4 h-4 text-red-500" />
                        <span className="text-sm">{displayDoctor.email}</span>
                      </div>
                    )}
                  </div>

                  {/* Tags */}
                  {displayDoctor.tags && displayDoctor.tags.length > 0 && (
                    <div className="mb-6">
                      <div className="flex items-center gap-2 text-white font-semibold mb-3">
                        <Tag className="w-5 h-5 text-red-500" />
                        <span>Specialties</span>
                      </div>
                      <div className="flex flex-wrap gap-2">
                        {displayDoctor.tags.map((tag, i) => (
                          <span key={i} className="px-3 py-1 bg-white/10 backdrop-blur-sm border border-white/20 rounded-full text-xs text-gray-200">
                            {tag}
                          </span>
                        ))}
                      </div>
                    </div>
                  )}

                  {/* Consultation Fee */}
                  {displayDoctor.consultationFee > 0 && (
                    <div className="bg-gradient-to-r from-red-500/10 to-red-600/10 border border-red-500/30 rounded-lg p-4">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-2">
                          <DollarSign className="w-5 h-5 text-red-500" />
                          <span className="text-white font-semibold">Consultation Fee</span>
                        </div>
                        <span className="text-2xl font-bold text-red-500">₹{displayDoctor.consultationFee}</span>
                      </div>
                    </div>
                  )}
                </div>
              </div>
            </motion.div>

            {/* Right Column - Booking Details */}
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="lg:col-span-2 space-y-6"
            >
              {/* About */}
              {displayDoctor.description && (
                <div className="bg-gradient-to-br from-zinc-900 via-zinc-800 to-black border border-zinc-700/50 rounded-2xl p-6">
                  <h2 className="text-2xl font-bold text-white mb-4">
                    About Dr. {displayDoctor.name.split(' ')[1]}
                  </h2>
                  <p className="text-gray-300 leading-relaxed">
                    {displayDoctor.description}
                  </p>
                </div>
              )}

              {/* Consultation Type */}
              <div className="bg-gradient-to-br from-zinc-900 via-zinc-800 to-black border border-zinc-700/50 rounded-2xl p-6">
                <h2 className="text-2xl font-bold text-white mb-4">
                  Select Consultation Type
                </h2>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <button
                    onClick={() => setConsultationType("video")}
                    className={`p-4 rounded-xl border-2 transition-all ${
                      consultationType === "video"
                        ? "border-red-500 bg-red-500/10"
                        : "border-zinc-700/50 bg-zinc-800/50 hover:border-zinc-600"
                    }`}
                  >
                    <div className="flex items-center gap-3">
                      <Video className={`w-6 h-6 ${consultationType === "video" ? "text-red-500" : "text-gray-400"}`} />
                      <div className="text-left">
                        <p className="text-white font-semibold">Video Call</p>
                        <p className="text-sm text-gray-400">Online consultation</p>
                      </div>
                    </div>
                  </button>
                  <button
                    onClick={() => setConsultationType("in-person")}
                    className={`p-4 rounded-xl border-2 transition-all ${
                      consultationType === "in-person"
                        ? "border-red-500 bg-red-500/10"
                        : "border-zinc-700/50 bg-zinc-800/50 hover:border-zinc-600"
                    }`}
                  >
                    <div className="flex items-center gap-3">
                      <User className={`w-6 h-6 ${consultationType === "in-person" ? "text-red-500" : "text-gray-400"}`} />
                      <div className="text-left">
                        <p className="text-white font-semibold">In-Person</p>
                        <p className="text-sm text-gray-400">Visit clinic</p>
                      </div>
                    </div>
                  </button>
                </div>
              </div>

              {/* Date Selection */}
              {displayDoctor.availableSlots && displayDoctor.availableSlots.length > 0 && (
                <div className="bg-gradient-to-br from-zinc-900 via-zinc-800 to-black border border-zinc-700/50 rounded-2xl p-6">
                  <div className="flex items-center gap-2 mb-4">
                    <Calendar className="w-6 h-6 text-red-500" />
                    <h2 className="text-2xl font-bold text-white">
                      Select Date
                    </h2>
                  </div>
                  <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                    {displayDoctor.availableSlots.map((slot, i) => {
                      const date = new Date(slot.date);
                      const dayName = date.toLocaleDateString('en-US', { weekday: 'short' });
                      const dateNum = date.getDate();
                      const month = date.toLocaleDateString('en-US', { month: 'short' });
                      
                      return (
                        <button
                          key={i}
                          onClick={() => setSelectedDate(slot.date)}
                          className={`p-4 rounded-xl border-2 transition-all ${
                            selectedDate === slot.date
                              ? "border-red-500 bg-red-500/10"
                              : "border-zinc-700/50 bg-zinc-800/50 hover:border-zinc-600"
                          }`}
                        >
                          <div className="text-center">
                            <p className="text-sm text-gray-400">{dayName}</p>
                            <p className="text-2xl font-bold text-white my-1">{dateNum}</p>
                            <p className="text-sm text-gray-400">{month}</p>
                          </div>
                        </button>
                      );
                    })}
                  </div>
                </div>
              )}

              {/* Time Selection */}
              {selectedDate && (
                <motion.div 
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="bg-gradient-to-br from-zinc-900 via-zinc-800 to-black border border-zinc-700/50 rounded-2xl p-6"
                >
                  <div className="flex items-center gap-2 mb-4">
                    <Clock className="w-6 h-6 text-red-500" />
                    <h2 className="text-2xl font-bold text-white">
                      Select Time
                    </h2>
                  </div>
                  <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                    {displayDoctor.availableSlots
                      .find(slot => slot.date === selectedDate)
                      ?.times.map((time, i) => (
                        <button
                          key={i}
                          onClick={() => setSelectedTime(time)}
                          className={`p-3 rounded-xl border-2 transition-all ${
                            selectedTime === time
                              ? "border-red-500 bg-red-500/10"
                              : "border-zinc-700/50 bg-zinc-800/50 hover:border-zinc-600"
                          }`}
                        >
                          <p className="text-white font-semibold">
                            {time}
                          </p>
                        </button>
                      ))}
                  </div>
                </motion.div>
              )}

              {/* Confirm Booking Button */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4 }}
                className="bg-gradient-to-br from-zinc-900 via-zinc-800 to-black border border-zinc-700/50 rounded-2xl p-6"
              >
                <div className="flex items-center justify-between mb-4">
                  <div>
                    <p className="text-gray-400 text-sm mb-1">Total Amount</p>
                    <p className="text-3xl font-bold text-white">₹{displayDoctor.consultationFee}</p>
                  </div>
                  {selectedDate && selectedTime && (
                    <div className="text-right">
                      <p className="text-gray-400 text-sm mb-1">Selected Slot</p>
                      <p className="text-white font-semibold">{new Date(selectedDate).toLocaleDateString('en-US', { month: 'short', day: 'numeric' })}</p>
                      <p className="text-red-400 font-semibold">{selectedTime}</p>
                    </div>
                  )}
                </div>
                <button
                  onClick={handleBooking}
                  disabled={!selectedDate || !selectedTime}
                  className={`w-full py-4 rounded-xl font-bold text-white transition-all transform ${
                    selectedDate && selectedTime
                      ? "bg-gradient-to-r from-red-500 to-red-600 hover:shadow-xl hover:shadow-red-500/30 hover:-translate-y-1"
                      : "bg-zinc-700 cursor-not-allowed opacity-50"
                  }`}
                >
                  Confirm Booking
                </button>
                <p className="text-center text-gray-400 text-sm mt-3">
                  You will receive a confirmation email after booking
                </p>
              </motion.div>
            </motion.div>
          </div>
        </div>
      </div>
    </div>
  );
}