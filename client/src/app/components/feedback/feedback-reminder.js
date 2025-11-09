"use client";
import { useState, useEffect } from "react";
import { X, MessageSquare, Sparkles } from "lucide-react";

export default function FeedbackReminder({ onOpenFeedback }) {
  const [isVisible, setIsVisible] = useState(false);
  const [isClosing, setIsClosing] = useState(false);

  useEffect(() => {
    checkAndShowReminder();
  }, []);

  const checkAndShowReminder = () => {
    // Check if user has given feedback
    const hasGivenFeedback = localStorage.getItem('hasGivenFeedback');
    const lastReminderTime = localStorage.getItem('lastFeedbackReminder');
    const reminderDismissCount = parseInt(localStorage.getItem('feedbackReminderDismissCount') || '0');
    
    // Don't show if user has already given feedback
    if (hasGivenFeedback === 'true') {
      return;
    }

    // Don't show if dismissed more than 3 times (stop annoying the user)
    if (reminderDismissCount >= 3) {
      return;
    }

    const now = Date.now();
    
    // Show reminder if:
    // 1. Never shown before, OR
    // 2. Last shown more than 7 days ago (configurable)
    const REMINDER_INTERVAL = 2 * 60 * 60 * 1000; // 2 hrs in milliseconds
    
    if (!lastReminderTime || (now - parseInt(lastReminderTime)) > REMINDER_INTERVAL) {
      // Wait 30 seconds after page load before showing (so it's not annoying)
      setTimeout(() => {
        setIsVisible(true);
        localStorage.setItem('lastFeedbackReminder', now.toString());
      }, 30000); // 30 seconds delay
    }
  };

  const handleDismiss = () => {
    setIsClosing(true);
    const dismissCount = parseInt(localStorage.getItem('feedbackReminderDismissCount') || '0');
    localStorage.setItem('feedbackReminderDismissCount', (dismissCount + 1).toString());
    
    setTimeout(() => {
      setIsVisible(false);
      setIsClosing(false);
    }, 300);
  };

  const handleOpenFeedback = () => {
    setIsClosing(true);
    setTimeout(() => {
      setIsVisible(false);
      setIsClosing(false);
      if (onOpenFeedback) {
        onOpenFeedback();
      }
    }, 300);
  };

  if (!isVisible) {
    return null;
  }

  return (
    <div 
      className={`fixed bottom-6 right-6 z-40 transition-all duration-300 ${
        isClosing ? 'opacity-0 translate-y-4' : 'opacity-100 translate-y-0'
      }`}
    >
      <div className="relative bg-gradient-to-br from-zinc-900 to-black border-2 border-red-500/50 rounded-2xl shadow-2xl p-6 max-w-sm animate-slide-up">
        {/* Glow effect */}
        <div className="absolute inset-0 bg-red-500/10 rounded-2xl blur-xl -z-10" />
        
        {/* Close button */}
        <button
          onClick={handleDismiss}
          className="absolute top-3 right-3 p-1 hover:bg-red-500/20 rounded-full transition-colors"
        >
          <X className="w-4 h-4 text-gray-400 hover:text-red-500" />
        </button>

        {/* Icon */}
        <div className="flex items-start gap-4 mb-4">
          <div className="flex-shrink-0 w-12 h-12 bg-red-500/20 rounded-full flex items-center justify-center">
            <MessageSquare className="w-6 h-6 text-red-500" />
          </div>
          <div>
            <h3 className="text-white font-bold text-lg mb-1 flex items-center gap-2" style={{ fontFamily: 'Poppins, sans-serif' }}>
              Share Your Thoughts
              <Sparkles className="w-4 h-4 text-yellow-400" />
            </h3>
            <p className="text-gray-400 text-sm leading-relaxed" style={{ fontFamily: 'Inter, sans-serif' }}>
              Your feedback helps us improve. Got a minute to share your experience?
            </p>
          </div>
        </div>

        {/* Action buttons */}
        <div className="flex gap-3 mt-4">
          <button
            onClick={handleOpenFeedback}
            className="flex-1 px-4 py-2.5 bg-gradient-to-r from-red-600 to-red-700 text-white font-semibold rounded-lg hover:from-red-700 hover:to-red-800 transition-all duration-300 shadow-lg shadow-red-900/50 text-sm"
            style={{ fontFamily: 'Poppins, sans-serif' }}
          >
            Give Feedback
          </button>
          <button
            onClick={handleDismiss}
            className="px-4 py-2.5 bg-zinc-800 hover:bg-zinc-700 text-gray-300 hover:text-white font-medium rounded-lg transition-all duration-300 text-sm"
            style={{ fontFamily: 'Inter, sans-serif' }}
          >
            Later
          </button>
        </div>
      </div>

      <style jsx>{`
        @keyframes slide-up {
          from {
            transform: translateY(20px);
            opacity: 0;
          }
          to {
            transform: translateY(0);
            opacity: 1;
          }
        }
        
        .animate-slide-up {
          animation: slide-up 0.4s ease-out;
        }
      `}</style>
    </div>
  );
}