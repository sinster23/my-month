"use client";

import { useState } from "react";
import { usePathname } from "next/navigation";
import Navbar from "../home/Navbar";
import Footer from "../home/Footer";
import FeedbackModal from "../feedback/feedback-modal"; // Adjust path as needed
import FeedbackReminder from "../feedback/feedback-reminder"; // Adjust path as needed

export default function LayoutWrapper({ children }) {
  const pathname = usePathname();
  const [isFeedbackOpen, setIsFeedbackOpen] = useState(false);
  
  const hideLayout = pathname.startsWith("/chatbot") || 
    pathname.startsWith("/checkout") || 
    pathname.startsWith("/carehub/products") || 
    pathname.startsWith("/profile") || 
    pathname.startsWith("/orders/") || 
    pathname.startsWith("/carehub/doctors");

  const handleOpenFeedback = () => {
    setIsFeedbackOpen(true);
  };

  return (
    <>
      {!hideLayout && <Navbar onOpenFeedback={handleOpenFeedback} />}
      {children}
      {!hideLayout && <Footer onOpenFeedback={handleOpenFeedback} />}
      
      {/* Feedback Modal - Always available */}
      <FeedbackModal 
        isOpen={isFeedbackOpen} 
        onClose={() => setIsFeedbackOpen(false)} 
      />
      
      {/* Feedback Reminder - Only show on pages with layout */}
      {!hideLayout && <FeedbackReminder onOpenFeedback={handleOpenFeedback} />}
    </>
  );
}