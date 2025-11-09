"use client";
import { useState, useEffect } from "react";
import { X, MessageSquare, Send, Heart, Sparkles, CheckCircle2, AlertCircle } from "lucide-react";

export default function FeedbackModal({ isOpen = false, onClose }) {
  const [formData, setFormData] = useState({
    name: "",
    message: ""
  });
  const [status, setStatus] = useState({ type: "", message: "" });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const BACKEND_URL = process.env.NEXT_PUBLIC_BACKEND_URL;

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }

    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isOpen]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
    setStatus({ type: "", message: "" });
  };

  const handleSubmit = async () => {
    if (!formData.name || !formData.message) {
      setStatus({ type: "error", message: "Please fill in all fields" });
      return;
    }

    setIsSubmitting(true);
    setStatus({ type: "", message: "" });

   try {
    const response = await fetch(`${BACKEND_URL}/api/feedback`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(formData),
    });

    const data = await response.json();

    if (response.ok) {
      setStatus({ type: "success", message: data.message || "Thank you for your feedback!" });
      setFormData({ name: "", message: "" });
      
      // Mark that user has given feedback
      localStorage.setItem('hasGivenFeedback', 'true');
      
      // Auto close after 2 seconds on success
      setTimeout(() => {
        if (onClose) onClose();
      }, 2000);
    } else {
      setStatus({ type: "error", message: data.message || "Failed to submit feedback" });
    }
  } catch (error) {
    setStatus({ type: "error", message: "Network error. Please try again." });
  } finally {
    setIsSubmitting(false);
  }
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter' && e.ctrlKey) {
      handleSubmit();
    }
  };

  const handleClose = () => {
    if (onClose) {
      setFormData({ name: "", message: "" });
      setStatus({ type: "", message: "" });
      onClose();
    }
  };

  if (!isOpen) {
    return null;
  }

  return (
    <div className="fixed inset-0 bg-black/90 flex items-center justify-center p-4 z-50">
      <div className="relative w-full max-w-4xl bg-zinc-900 rounded-2xl shadow-2xl overflow-hidden border border-red-900/30">
        {/* Close Button */}
        <button
          onClick={handleClose}
          className="absolute top-4 right-4 z-50 p-2 hover:bg-red-600/20 rounded-full transition-colors"
        >
          <X className="w-6 h-6 text-red-500" />
        </button>

        <div className="relative w-full h-full flex flex-col md:flex-row">
          {/* Left Side - Decorative Panel */}
          <div className="md:w-2/5 relative overflow-hidden min-h-[200px] md:min-h-[600px]">
            <div 
              className="absolute inset-0 bg-cover bg-center"
              style={{
                backgroundImage: 'url(/feed7.png)',
              }}
            >
              <div className="absolute inset-0 bg-gradient-to-br from-red-900/90 via-black/85 to-black/90"></div>
            </div>

            <div className="relative w-full h-full flex items-center justify-center p-8 md:p-12">
              <div className="text-center text-white">
                <div className="inline-flex items-center justify-center w-16 h-16 bg-red-500/20 rounded-full mb-6">
                  <MessageSquare className="w-8 h-8 text-red-500" />
                </div>
                <h1 className="text-3xl md:text-4xl font-bold mb-4" style={{ fontFamily: 'Poppins, sans-serif' }}>
                  Share Your Thoughts
                </h1>
                <div className="w-16 h-1 bg-red-500 mx-auto mb-6"></div>
                <p className="text-base md:text-lg text-gray-300 mb-4" style={{ fontFamily: 'Inter, sans-serif' }}>
                  Your feedback helps us create a better experience for everyone.
                </p>
                <div className="flex items-center justify-center gap-2 text-sm text-gray-400 italic" style={{ fontFamily: 'Merriweather, serif' }}>
                  <Heart className="w-4 h-4 text-red-500" />
                  <span>Every message matters</span>
                </div>
              </div>
            </div>
          </div>

          {/* Right Side - Form */}
          <div className="md:w-3/5 overflow-y-auto max-h-[70vh] md:max-h-[600px]" style={{scrollbarWidth: 'none', msOverflowStyle: 'none'}}>
            <style>{`
              .hide-scrollbar::-webkit-scrollbar {
                display: none;
              }
            `}</style>
            <div className="p-8 md:p-12 hide-scrollbar">
              <div className="flex items-center gap-3 mb-6">
                <div className="inline-flex items-center gap-2 bg-red-500/20 px-3 py-1.5 rounded-full border border-red-500/30">
                  <Sparkles className="w-4 h-4 text-red-500" />
                  <span className="text-red-500 font-semibold text-xs" style={{ fontFamily: 'Poppins, sans-serif' }}>
                    We're Listening
                  </span>
                </div>
              </div>

              <h2 className="text-2xl md:text-3xl font-bold text-white mb-2" style={{ fontFamily: 'Poppins, sans-serif' }}>
                Send us your feedback
              </h2>
              <p className="text-gray-400 text-sm mb-8" style={{ fontFamily: 'Inter, sans-serif' }}>
                We read every message with care and compassion
              </p>

              {/* Status Messages */}
              {status.message && (
                <div className={`mb-6 flex items-center gap-3 p-4 rounded-xl ${
                  status.type === "success" 
                    ? "bg-green-500/10 border border-green-500/30" 
                    : "bg-red-500/10 border border-red-500/30"
                }`}>
                  {status.type === "success" ? (
                    <CheckCircle2 className="w-5 h-5 text-green-500 flex-shrink-0" />
                  ) : (
                    <AlertCircle className="w-5 h-5 text-red-500 flex-shrink-0" />
                  )}
                  <p className={`text-sm ${
                    status.type === "success" ? "text-green-400" : "text-red-400"
                  }`} style={{ fontFamily: 'Inter, sans-serif' }}>
                    {status.message}
                  </p>
                </div>
              )}

              <div className="space-y-5">
                {/* Name Input */}
                <div>
                  <label 
                    htmlFor="name" 
                    className="block text-sm font-medium text-gray-400 mb-2"
                    style={{ fontFamily: 'Poppins, sans-serif' }}
                  >
                    YOUR NAME
                  </label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    placeholder="Enter your name"
                    className="w-full px-4 py-3 bg-black/40 border border-zinc-700 rounded-lg focus:ring-2 focus:ring-red-600 focus:border-transparent outline-none text-white placeholder-gray-500"
                    style={{ fontFamily: 'Inter, sans-serif' }}
                  />
                </div>

                {/* Message Input */}
                <div>
                  <label 
                    htmlFor="message" 
                    className="block text-sm font-medium text-gray-400 mb-2"
                    style={{ fontFamily: 'Poppins, sans-serif' }}
                  >
                    YOUR FEEDBACK
                  </label>
                  <textarea
                    id="message"
                    name="message"
                    value={formData.message}
                    onChange={handleChange}
                    onKeyPress={handleKeyPress}
                    placeholder="Share your thoughts, suggestions, or concerns..."
                    rows={6}
                    className="w-full px-4 py-3 bg-black/40 border border-zinc-700 rounded-lg focus:ring-2 focus:ring-red-600 focus:border-transparent outline-none text-white placeholder-gray-500 resize-none"
                    style={{ fontFamily: 'Inter, sans-serif' }}
                  />
                  <p className="text-gray-500 text-xs mt-2" style={{ fontFamily: 'Inter, sans-serif' }}>
                    Press Ctrl + Enter to send
                  </p>
                </div>

                {/* Submit Button */}
                <button
                  onClick={handleSubmit}
                  disabled={isSubmitting}
                  className="w-full py-3 bg-gradient-to-r from-red-600 to-red-700 text-white font-semibold rounded-lg hover:from-red-700 hover:to-red-800 transition-all duration-300 shadow-lg shadow-red-900/50 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-3"
                  style={{ fontFamily: 'Poppins, sans-serif' }}
                >
                  {isSubmitting ? (
                    <>
                      <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
                      <span>SENDING...</span>
                    </>
                  ) : (
                    <>
                      <Send className="w-5 h-5" />
                      <span>SEND FEEDBACK</span>
                    </>
                  )}
                </button>
              </div>

              {/* Info Cards */}
              <div className="mt-8 pt-8 border-t border-zinc-700">
                <div className="grid grid-cols-3 gap-4">
                  <div className="text-center">
                    <div className="inline-flex items-center justify-center w-10 h-10 bg-red-500/10 rounded-full mb-2">
                      <Heart className="w-5 h-5 text-red-500" />
                    </div>
                    <h3 className="text-white font-semibold text-xs mb-1" style={{ fontFamily: 'Poppins, sans-serif' }}>
                      Valued
                    </h3>
                    <p className="text-gray-500 text-xs" style={{ fontFamily: 'Inter, sans-serif' }}>
                      We care
                    </p>
                  </div>

                  <div className="text-center">
                    <div className="inline-flex items-center justify-center w-10 h-10 bg-red-500/10 rounded-full mb-2">
                      <MessageSquare className="w-5 h-5 text-red-500" />
                    </div>
                    <h3 className="text-white font-semibold text-xs mb-1" style={{ fontFamily: 'Poppins, sans-serif' }}>
                      Heard
                    </h3>
                    <p className="text-gray-500 text-xs" style={{ fontFamily: 'Inter, sans-serif' }}>
                      We listen
                    </p>
                  </div>

                  <div className="text-center">
                    <div className="inline-flex items-center justify-center w-10 h-10 bg-red-500/10 rounded-full mb-2">
                      <Sparkles className="w-5 h-5 text-red-500" />
                    </div>
                    <h3 className="text-white font-semibold text-xs mb-1" style={{ fontFamily: 'Poppins, sans-serif' }}>
                      Action
                    </h3>
                    <p className="text-gray-500 text-xs" style={{ fontFamily: 'Inter, sans-serif' }}>
                      We improve
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}