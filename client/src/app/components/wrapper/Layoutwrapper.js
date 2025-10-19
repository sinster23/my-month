"use client";

import { usePathname } from "next/navigation";
import Navbar from "../home/Navbar";
import Footer from "../home/Footer";

export default function LayoutWrapper({ children }) {
  const pathname = usePathname();
  const hideLayout = pathname.startsWith("/chatbot");

  return (
    <>
      {!hideLayout && <Navbar />}
      {children}
      {!hideLayout && <Footer />}
    </>
  );
}
