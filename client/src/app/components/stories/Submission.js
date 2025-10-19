"use client";
import { useState } from "react";
import { Send, Sparkles, Heart, PenTool, CheckCircle } from "lucide-react";

export default function StorySubmissionSection() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    title: "",
    story: "",
    anonymous: false
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    // Simulate submission
    setTimeout(() => {
      setIsSubmitting(false);
      setIsSubmitted(true);
      
      // Reset after 3 seconds
      setTimeout(() => {
        setIsSubmitted(false);
        setFormData({
          name: "",
          email: "",
          title: "",
          story: "",
          anonymous: false
        });
      }, 3000);
    }, 1500);
  };

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
  };

  return (
    <section id="submit-story" className="relative py-24 overflow-hidden">
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

      {/* Top gradient fade */}
      <div className="absolute top-0 left-0 right-0 h-32 bg-gradient-to-b from-black to-transparent" />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 z-10">
        {/* Two Column Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          
          {/* Left Column - Submission Form */}
          <div className="relative">
            {/* Decorative floating elements */}
            <div className="absolute -top-6 -left-6 w-24 h-24 bg-red-500 rounded-full blur-2xl opacity-30 animate-pulse" />
            <div className="absolute -bottom-6 -right-6 w-32 h-32 bg-red-500 rounded-full blur-2xl opacity-30 animate-pulse" style={{ animationDelay: '1s' }} />

            {/* Form Card */}
            <div className="relative bg-black rounded-3xl shadow-2xl overflow-hidden border border-red-500/30">
              {/* Card Header */}
              <div className="bg-gradient-to-r from-red-500 to-red-600 px-6 py-5">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-white rounded-full flex items-center justify-center">
                    <PenTool className="w-6 h-6 text-red-500" />
                  </div>
                  <div>
                    <h3 className="text-white font-bold text-lg" style={{ fontFamily: 'Poppins, sans-serif' }}>
                      Share Your Story
                    </h3>
                    <p className="text-red-100 text-sm">Make a difference today</p>
                  </div>
                </div>
              </div>

              {/* Form Content */}
              <div className="p-8">
                {isSubmitted ? (
                  <div className="text-center py-12">
                    <div className="w-20 h-20 mx-auto bg-green-500/20 rounded-full flex items-center justify-center mb-4 animate-bounce-slow border border-green-500/30">
                      <CheckCircle className="w-10 h-10 text-green-500" />
                    </div>
                    <h4 className="text-2xl font-bold text-white mb-2" style={{ fontFamily: 'Poppins, sans-serif' }}>
                      Thank You!
                    </h4>
                    <p className="text-gray-400" style={{ fontFamily: 'Inter, sans-serif' }}>
                      Your story has been submitted successfully.
                    </p>
                  </div>
                ) : (
                  <div className="space-y-5">
                    {/* Name Field */}
                    <div>
                      <label htmlFor="name" className="block text-sm font-semibold text-gray-300 mb-2" style={{ fontFamily: 'Poppins, sans-serif' }}>
                        Your Name
                      </label>
                      <input
                        type="text"
                        id="name"
                        name="name"
                        value={formData.name}
                        onChange={handleChange}
                        disabled={formData.anonymous}
                        className="w-full px-4 py-3 bg-zinc-900 border border-zinc-700 text-white rounded-xl focus:ring-2 focus:ring-red-500 focus:border-transparent transition-all duration-200 disabled:bg-zinc-800 disabled:cursor-not-allowed placeholder-gray-500"
                        placeholder="Enter your name"
                        style={{ fontFamily: 'Inter, sans-serif' }}
                      />
                    </div>

                    {/* Anonymous Checkbox */}
                    <div className="flex items-center gap-3 bg-red-900/20 p-4 rounded-xl border border-red-500/30">
                      <input
                        type="checkbox"
                        id="anonymous"
                        name="anonymous"
                        checked={formData.anonymous}
                        onChange={handleChange}
                        className="w-5 h-5 text-red-500 bg-zinc-900 border-zinc-700 rounded focus:ring-red-500"
                      />
                      <label htmlFor="anonymous" className="text-sm text-gray-300 cursor-pointer" style={{ fontFamily: 'Inter, sans-serif' }}>
                        Post anonymously (your name will be hidden)
                      </label>
                    </div>

                    {/* Story Title */}
                    <div>
                      <label htmlFor="title" className="block text-sm font-semibold text-gray-300 mb-2" style={{ fontFamily: 'Poppins, sans-serif' }}>
                        Story Title
                      </label>
                      <input
                        type="text"
                        id="title"
                        name="title"
                        value={formData.title}
                        onChange={handleChange}
                        className="w-full px-4 py-3 bg-zinc-900 border border-zinc-700 text-white rounded-xl focus:ring-2 focus:ring-red-500 focus:border-transparent transition-all duration-200 placeholder-gray-500"
                        placeholder="Give your story a meaningful title"
                        style={{ fontFamily: 'Inter, sans-serif' }}
                      />
                    </div>

                    {/* Story Content */}
                    <div>
                      <label htmlFor="story" className="block text-sm font-semibold text-gray-300 mb-2" style={{ fontFamily: 'Poppins, sans-serif' }}>
                        Your Story
                      </label>
                      <textarea
                        id="story"
                        name="story"
                        value={formData.story}
                        onChange={handleChange}
                        rows={6}
                        className="w-full px-4 py-3 bg-zinc-900 border border-zinc-700 text-white rounded-xl focus:ring-2 focus:ring-red-500 focus:border-transparent transition-all duration-200 resize-none placeholder-gray-500"
                        placeholder="Share your experience, journey, or message of hope..."
                        style={{ fontFamily: 'Inter, sans-serif' }}
                      />
                    </div>

                    {/* Submit Button */}
                    <button
                      onClick={handleSubmit}
                      disabled={isSubmitting}
                      className="group relative w-full px-8 py-4 bg-red-500 hover:bg-red-600 disabled:bg-gray-400 text-white font-bold rounded-xl text-lg transition-all duration-300 shadow-lg hover:shadow-xl hover:scale-105 overflow-hidden disabled:cursor-not-allowed disabled:hover:scale-100"
                      style={{ fontFamily: 'Poppins, sans-serif' }}
                    >
                      {/* Button glow effect */}
                      <div className="absolute inset-0 bg-white opacity-0 group-hover:opacity-20 transition-opacity duration-300" />
                      
                      <span className="relative z-10 flex items-center justify-center gap-3">
                        {isSubmitting ? (
                          <>
                            <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
                            Submitting...
                          </>
                        ) : (
                          <>
                            <Send className="w-5 h-5" />
                            Submit Your Story
                          </>
                        )}
                      </span>

                      {/* Animated sparkles */}
                      {!isSubmitting && (
                        <div className="absolute -top-1 -right-1 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                          <Sparkles className="w-5 h-5 text-yellow-300 animate-ping" />
                        </div>
                      )}
                    </button>
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* Right Column - Text Content */}
          <div className="space-y-8">
            {/* Main Title */}
            <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white leading-tight" style={{ fontFamily: 'Poppins, sans-serif' }}>
              Your Voice{" "}
              <span className="text-red-500">
                Matters
              </span>
            </h2>

            {/* Description */}
            <div className="space-y-6">
              <p className="text-gray-300 text-lg leading-relaxed" style={{ fontFamily: 'Inter, sans-serif' }}>
                <span className="text-red-400 font-semibold">Every story is a light in someone's darkness.</span> Your experience—whether it's about navigating menstrual health, finding strength in faith, or overcoming challenges—can inspire and empower others.
              </p>

              <p className="text-gray-300 text-lg leading-relaxed" style={{ fontFamily: 'Inter, sans-serif' }}>
                Share your journey in a safe, supportive space where your voice is valued and your story can make a real difference.
              </p>
            </div>

            {/* Feature List */}
            <div className="space-y-4">
              <div className="flex items-start gap-4 bg-white/5 backdrop-blur-sm p-4 rounded-xl border border-white/10">
                <div className="w-8 h-8 bg-red-500 rounded-lg flex items-center justify-center flex-shrink-0 mt-1">
                  <CheckCircle className="w-5 h-5 text-white" />
                </div>
                <div>
                  <h4 className="text-white font-semibold mb-1" style={{ fontFamily: 'Poppins, sans-serif' }}>
                    Safe & Confidential
                  </h4>
                  <p className="text-gray-400 text-sm" style={{ fontFamily: 'Inter, sans-serif' }}>
                    Share anonymously if you prefer. Your privacy is our priority.
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-4 bg-white/5 backdrop-blur-sm p-4 rounded-xl border border-white/10">
                <div className="w-8 h-8 bg-red-500 rounded-lg flex items-center justify-center flex-shrink-0 mt-1">
                  <Heart className="w-5 h-5 text-white" />
                </div>
                <div>
                  <h4 className="text-white font-semibold mb-1" style={{ fontFamily: 'Poppins, sans-serif' }}>
                    Inspire Others
                  </h4>
                  <p className="text-gray-400 text-sm" style={{ fontFamily: 'Inter, sans-serif' }}>
                    Your story could be the encouragement someone desperately needs.
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-4 bg-white/5 backdrop-blur-sm p-4 rounded-xl border border-white/10">
                <div className="w-8 h-8 bg-red-500 rounded-lg flex items-center justify-center flex-shrink-0 mt-1">
                  <Sparkles className="w-5 h-5 text-white" />
                </div>
                <div>
                  <h4 className="text-white font-semibold mb-1" style={{ fontFamily: 'Poppins, sans-serif' }}>
                    Build Community
                  </h4>
                  <p className="text-gray-400 text-sm" style={{ fontFamily: 'Inter, sans-serif' }}>
                    Connect with others who share similar experiences and journeys.
                  </p>
                </div>
              </div>
            </div>

            {/* Stats */}
            <div className="grid grid-cols-3 gap-6 pt-6">
              <div className="text-center">
                <div className="text-3xl font-bold text-red-500 mb-1" style={{ fontFamily: 'Poppins, sans-serif' }}>
                  500+
                </div>
                <div className="text-gray-400 text-sm" style={{ fontFamily: 'Inter, sans-serif' }}>
                  Stories Shared
                </div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-red-500 mb-1" style={{ fontFamily: 'Poppins, sans-serif' }}>
                  10K+
                </div>
                <div className="text-gray-400 text-sm" style={{ fontFamily: 'Inter, sans-serif' }}>
                  Lives Touched
                </div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-red-500 mb-1" style={{ fontFamily: 'Poppins, sans-serif' }}>
                  100%
                </div>
                <div className="text-gray-400 text-sm" style={{ fontFamily: 'Inter, sans-serif' }}>
                  Judgment-Free
                </div>
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