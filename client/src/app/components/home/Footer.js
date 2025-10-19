"use client";
import { Heart, Mail, ExternalLink, Github, Twitter, Instagram, Facebook } from "lucide-react";

export default function Footer() {
  const quickLinks = [
    { name: "Home", href: "/" },
    { name: "Learn", href: "/learn" },
    { name: "Stories", href: "/stories" },
    { name: "Forum", href: "/forum" },
    { name: "About Us", href: "/about" }
  ];

  const socialLinks = [
    { icon: Twitter, href: "#", label: "Twitter" },
    { icon: Instagram, href: "#", label: "Instagram" },
    { icon: Facebook, href: "#", label: "Facebook" },
    { icon: Github, href: "#", label: "GitHub" }
  ];

  return (
    <footer className="relative bg-black border-t-2 border-red-500/30 overflow-hidden">
      {/* Subtle background gradient */}
      <div className="absolute inset-0 bg-gradient-to-b from-red-950/10 to-black pointer-events-none" />

      {/* Top decorative line */}
      <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-transparent via-red-500 to-transparent" />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Main Footer Content */}
        <div className="py-12 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">
          
          {/* Logo & Tagline */}
          <div className="lg:col-span-2">
            <div className="mb-6">
              <h3 className="text-3xl font-bold text-white mb-2 flex items-center" style={{ fontFamily: 'Poppins, sans-serif' }}>
                My<span className="text-red-500">Month</span>
              </h3>
              <p className="text-gray-400 text-sm leading-relaxed max-w-md" style={{ fontFamily: 'Inter, sans-serif' }}>
                Bridging spirituality and menstrual health with compassion, dignity, and respect. Empowering women through knowledge and community.
              </p>
            </div>

            {/* Contact Email */}
            <div className="mb-6">
              <h4 className="text-white font-semibold mb-3 text-sm uppercase tracking-wider" style={{ fontFamily: 'Poppins, sans-serif' }}>
                Get in Touch
              </h4>
              <a 
                href="mailto:hello@mymonth.com" 
                className="group inline-flex items-center gap-2 text-gray-300 hover:text-red-500 transition-colors duration-300"
              >
                <Mail className="w-5 h-5 text-red-500" />
                <span className="text-sm" style={{ fontFamily: 'Inter, sans-serif' }}>
                  hello@mymonth.com
                </span>
                <ExternalLink className="w-4 h-4 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
              </a>
            </div>

            {/* Social Links */}
            <div>
              <h4 className="text-white font-semibold mb-3 text-sm uppercase tracking-wider" style={{ fontFamily: 'Poppins, sans-serif' }}>
                Connect With Us
              </h4>
              <div className="flex gap-3">
                {socialLinks.map((social, index) => (
                  <a
                    key={index}
                    href={social.href}
                    aria-label={social.label}
                    className="group w-10 h-10 bg-zinc-900 hover:bg-red-500 border border-red-500/30 hover:border-red-500 rounded-full flex items-center justify-center transition-all duration-300 hover:scale-110"
                  >
                    <social.icon className="w-5 h-5 text-gray-400 group-hover:text-white transition-colors duration-300" />
                  </a>
                ))}
              </div>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-white font-semibold mb-6 text-sm uppercase tracking-wider" style={{ fontFamily: 'Poppins, sans-serif' }}>
              Quick Links
            </h4>
            <ul className="space-y-3">
              {quickLinks.map((link, index) => (
                <li key={index}>
                  <a
                    href={link.href}
                    className="group text-gray-400 hover:text-red-500 transition-colors duration-300 flex items-center gap-2"
                    style={{ fontFamily: 'Inter, sans-serif' }}
                  >
                    <span className="w-0 h-0.5 bg-red-500 group-hover:w-4 transition-all duration-300" />
                    {link.name}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Resources */}
          <div>
            <h4 className="text-white font-semibold mb-6 text-sm uppercase tracking-wider" style={{ fontFamily: 'Poppins, sans-serif' }}>
              Resources
            </h4>
            <ul className="space-y-3">
              <li>
                <a href="/resources" className="group text-gray-400 hover:text-red-500 transition-colors duration-300 flex items-center gap-2" style={{ fontFamily: 'Inter, sans-serif' }}>
                  <span className="w-0 h-0.5 bg-red-500 group-hover:w-4 transition-all duration-300" />
                  Educational Resources
                </a>
              </li>
              <li>
                <a href="/support" className="group text-gray-400 hover:text-red-500 transition-colors duration-300 flex items-center gap-2" style={{ fontFamily: 'Inter, sans-serif' }}>
                  <span className="w-0 h-0.5 bg-red-500 group-hover:w-4 transition-all duration-300" />
                  Support Centers
                </a>
              </li>
              <li>
                <a href="/faq" className="group text-gray-400 hover:text-red-500 transition-colors duration-300 flex items-center gap-2" style={{ fontFamily: 'Inter, sans-serif' }}>
                  <span className="w-0 h-0.5 bg-red-500 group-hover:w-4 transition-all duration-300" />
                  FAQ
                </a>
              </li>
              <li>
                <a href="/privacy" className="group text-gray-400 hover:text-red-500 transition-colors duration-300 flex items-center gap-2" style={{ fontFamily: 'Inter, sans-serif' }}>
                  <span className="w-0 h-0.5 bg-red-500 group-hover:w-4 transition-all duration-300" />
                  Privacy Policy
                </a>
              </li>
            </ul>
          </div>
        </div>

        {/* Divider */}
        <div className="border-t border-red-500/20" />

        {/* Bottom Bar */}
        <div className="py-6 flex flex-col md:flex-row justify-between items-center gap-4">
          {/* Copyright */}
          <p className="text-gray-500 text-sm text-center md:text-left" style={{ fontFamily: 'Inter, sans-serif' }}>
            © 2025 My-Month. All rights reserved.
          </p>

          {/* Credits */}
          <div className="flex items-center gap-2 text-sm">
            <span className="text-gray-500" style={{ fontFamily: 'Inter, sans-serif' }}>
              Built with
            </span>
            <Heart className="w-4 h-4 text-red-500 animate-pulse" />
            <span className="text-gray-500" style={{ fontFamily: 'Inter, sans-serif' }}>
              during
            </span>
            <span className="text-red-500 font-semibold" style={{ fontFamily: 'Poppins, sans-serif' }}>
              Hackathon 2025
            </span>
          </div>
        </div>
      </div>

      {/* Bottom gradient accent */}
      <div className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-transparent via-red-500 to-transparent opacity-50" />

      {/* Corner decorative elements */}
      <div className="absolute bottom-0 left-0 w-32 h-32 bg-red-500/5 rounded-full blur-3xl" />
      <div className="absolute bottom-0 right-0 w-32 h-32 bg-red-500/5 rounded-full blur-3xl" />
    </footer>
  );
}