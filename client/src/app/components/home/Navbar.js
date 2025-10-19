"use client";
import { useState, useEffect } from "react";
import { LogOut, User } from "lucide-react";
import AuthModal from '../auth/authModal';

export default function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [user, setUser] = useState(null);
  const [showDropdown, setShowDropdown] = useState(false);

  const BACKEND_URL = process.env.NEXT_PUBLIC_BACKEND_URL;

  const navLinks = [
    { name: "Home", href: "/" },
    { name: "Faith", href: "/faith" },
    { name: "Stories", href: "/stories" },
    { name: "Chatbot", href: "/chatbot" },
    { name: "Community", href: "/forum" },
  ];

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Check if user is logged in on component mount
  useEffect(() => {
    checkAuthStatus();
  }, []);

  const checkAuthStatus = async () => {
    try {
      const response = await fetch(`${BACKEND_URL}/api/auth/me`, {
        credentials: 'include'
      });
      if (response.ok) {
        const data = await response.json();
        setUser(data);
      }
    } catch (error) {
      console.error('Auth check failed:', error);
    }
  };

  const handleLogout = async () => {
    try {
      const response = await fetch(`${BACKEND_URL}/api/auth/logout`, {
        method: 'POST',
        credentials: 'include'
      });
      if (response.ok) {
        setUser(null);
        setShowDropdown(false);
        window.location.href = '/';
      }
    } catch (error) {
      console.error('Logout failed:', error);
    }
  };

  const handleNavClick = (href) => {
    if (href.startsWith("#")) {
      const element = document.getElementById(href.substring(1));
      if (element) {
        element.scrollIntoView({ behavior: "smooth" });
      }
    } else {
      window.location.href = href;
    }
    setIsMobileMenuOpen(false);
  };

  const handleModalClose = () => {
    setShowModal(false);
    checkAuthStatus(); // Refresh auth status after modal closes
  };

  const getInitials = (name) => {
    if (!name) return 'U';
    return name.charAt(0).toUpperCase();
  };

  return (
    <>
      <nav
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
          isScrolled
            ? "bg-black/95 backdrop-blur-md shadow-lg shadow-red-900/20"
            : "bg-gradient-to-b from-black/80 to-transparent"
        }`}
      >
        <div className="mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-20">
            {/* Logo */}
            <div className="flex-shrink-0">
              <button
                onClick={() => handleNavClick("/")}
                className="text-2xl font-bold text-white hover:text-red-500 transition-colors duration-300"
              >
                <span className="text-red-600">My</span>Month
              </button>
            </div>

            {/* Desktop Navigation */}
            <div className="hidden md:flex items-center space-x-8">
              {navLinks.map((link) => (
                <button
                  key={link.name}
                  onClick={() => handleNavClick(link.href)}
                  className="group relative text-gray-200 hover:text-white font-medium text-base transition-colors duration-300"
                >
                  {link.name}
                  <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-gradient-to-r from-red-600 to-red-400 group-hover:w-full transition-all duration-300" />
                </button>
              ))}
            </div>

            {/* User Section - Desktop */}
            <div className="hidden md:block">
              {user ? (
                <div className="relative">
                  <button
                    onClick={() => setShowDropdown(!showDropdown)}
                    className="flex items-center space-x-3 group"
                  >
                    <div className="w-10 h-10 rounded-full bg-gradient-to-br from-red-600 to-red-700 flex items-center justify-center text-white font-bold text-lg shadow-lg shadow-red-900/30 group-hover:shadow-xl group-hover:shadow-red-900/50 transition-all duration-300 group-hover:scale-105">
                      {getInitials(user.name)}
                    </div>
                    <span className="text-gray-200 font-medium group-hover:text-white transition-colors">
                      {user.name?.split(' ')[0] || 'User'}
                    </span>
                  </button>

                  {/* Dropdown Menu */}
                  {showDropdown && (
                    <>
                      <div 
                        className="fixed inset-0 z-10" 
                        onClick={() => setShowDropdown(false)}
                      />
                      <div className="absolute right-0 mt-3 w-56 bg-zinc-900 rounded-lg shadow-xl shadow-black/50 border border-red-900/30 overflow-hidden z-20">
                        <div className="px-4 py-3 border-b border-red-900/30">
                          <p className="text-sm text-gray-400">Signed in as</p>
                          <p className="text-white font-medium truncate">{user.email}</p>
                        </div>
                        <div className="py-2">
                          <button
                            onClick={() => {
                              setShowDropdown(false);
                              handleNavClick('/profile');
                            }}
                            className="w-full px-4 py-2 text-left text-gray-200 hover:bg-red-900/20 hover:text-white transition-colors flex items-center space-x-2"
                          >
                            <User className="w-4 h-4" />
                            <span>Profile</span>
                          </button>
                          <button
                            onClick={handleLogout}
                            className="w-full px-4 py-2 text-left text-gray-200 hover:bg-red-900/20 hover:text-white transition-colors flex items-center space-x-2"
                          >
                            <LogOut className="w-4 h-4" />
                            <span>Logout</span>
                          </button>
                        </div>
                      </div>
                    </>
                  )}
                </div>
              ) : (
                <button
                  onClick={() => setShowModal(true)}
                  className="group relative px-6 py-2.5 bg-gradient-to-r from-red-600 to-red-700 hover:from-red-700 hover:to-red-800 text-white font-semibold rounded-full transition-all duration-300 shadow-lg shadow-red-900/30 hover:shadow-xl hover:shadow-red-900/50 hover:scale-105"
                >
                  <span className="relative z-10">Register</span>
                  <div className="absolute inset-0 bg-white/20 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                </button>
              )}
            </div>

            {/* Mobile Menu Button */}
            <div className="md:hidden">
              <button
                onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                className="text-gray-200 hover:text-white focus:outline-none"
                aria-label="Toggle menu"
              >
                <svg
                  className="h-6 w-6"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  {isMobileMenuOpen ? (
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M6 18L18 6M6 6l12 12"
                    />
                  ) : (
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M4 6h16M4 12h16M4 18h16"
                    />
                  )}
                </svg>
              </button>
            </div>
          </div>
        </div>

        {/* Mobile Menu */}
        <div
          className={`md:hidden transition-all duration-300 ease-in-out overflow-hidden ${
            isMobileMenuOpen ? "max-h-[500px] opacity-100" : "max-h-0 opacity-0"
          }`}
        >
          <div className="px-4 pt-2 pb-6 space-y-3 bg-black/95 backdrop-blur-md border-t border-red-900/30">
            {navLinks.map((link) => (
              <button
                key={link.name}
                onClick={() => handleNavClick(link.href)}
                className="block w-full text-left px-4 py-3 text-gray-200 hover:text-white hover:bg-red-900/20 rounded-lg font-medium transition-all duration-200"
              >
                {link.name}
              </button>
            ))}
            
            {user ? (
              <>
                <div className="px-4 py-3 bg-zinc-800/50 rounded-lg border border-red-900/30">
                  <div className="flex items-center space-x-3 mb-3">
                    <div className="w-10 h-10 rounded-full bg-gradient-to-br from-red-600 to-red-700 flex items-center justify-center text-white font-bold text-lg">
                      {getInitials(user.name)}
                    </div>
                    <div>
                      <p className="text-white font-medium">{user.name}</p>
                      <p className="text-gray-400 text-sm truncate">{user.email}</p>
                    </div>
                  </div>
                  <div className="space-y-2">
                    <button
                      onClick={() => {
                        handleNavClick('/profile');
                        setIsMobileMenuOpen(false);
                      }}
                      className="w-full px-3 py-2 text-left text-gray-200 hover:bg-red-900/20 hover:text-white rounded transition-colors flex items-center space-x-2"
                    >
                      <User className="w-4 h-4" />
                      <span>Profile</span>
                    </button>
                    <button
                      onClick={() => {
                        handleLogout();
                        setIsMobileMenuOpen(false);
                      }}
                      className="w-full px-3 py-2 text-left text-gray-200 hover:bg-red-900/20 hover:text-white rounded transition-colors flex items-center space-x-2"
                    >
                      <LogOut className="w-4 h-4" />
                      <span>Logout</span>
                    </button>
                  </div>
                </div>
              </>
            ) : (
              <button
                onClick={() => {
                  setShowModal(true);
                  setIsMobileMenuOpen(false);
                }}
                className="block w-full px-4 py-3 bg-gradient-to-r from-red-600 to-red-700 hover:from-red-700 hover:to-red-800 text-white font-semibold rounded-lg transition-all duration-300 shadow-lg shadow-red-900/30 text-center"
              >
                Register
              </button>
            )}
          </div>
        </div>

        {/* Decorative bottom border */}
        <div className="h-px bg-gradient-to-r from-transparent via-red-600/50 to-transparent" />
      </nav>

      {/* Auth Modal - render outside nav to avoid z-index issues */}
      {showModal && (
        <AuthModal 
          isOpen={showModal}
          onClose={handleModalClose} 
        />
      )}
    </>
  );
}