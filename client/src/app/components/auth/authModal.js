import React, { useState } from 'react';
import { X } from 'lucide-react';

export default function AuthModal({ isOpen = true, onClose }) {
  const [isSignIn, setIsSignIn] = useState(true);
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    password: '',
    confirmPassword: ''
  });
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const BACKEND_URL = process.env.NEXT_PUBLIC_BACKEND_URL;

  React.useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }

    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isOpen]);

  const toggleMode = () => {
    setIsSignIn(!isSignIn);
    setError('');
    setFormData({
      firstName: '',
      lastName: '',
      email: '',
      password: '',
      confirmPassword: ''
    });
  };

  const handleInputChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
    setError('');
  };

  const handleLogin = async () => {
    setError('');
    setLoading(true);

    try {
      const response = await fetch(`${BACKEND_URL}/api/auth/login`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          email: formData.email,
          password: formData.password
        }),
        credentials: 'include'
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || 'Login failed');
      }

      console.log('Logged in:', data.user);
      
      // Check if user needs to complete health profile
      try {
        const statusResponse = await fetch(`${BACKEND_URL}/api/profile/health/status`, {
          credentials: 'include'
        });
        
        if (statusResponse.ok) {
          const statusData = await statusResponse.json();
          if (!statusData.isComplete) {
            // User needs onboarding
            if (onClose) {
              onClose({ showOnboarding: true });
            }
            return;
          }
        }
      } catch (err) {
        console.error('Failed to check health profile status:', err);
      }

      // Normal login - no onboarding needed
      if (onClose) {
        onClose({ showOnboarding: false });
      }
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const handleRegister = async () => {
    setError('');

    if (!formData.firstName || !formData.lastName || !formData.email || !formData.password) {
      setError('All fields are required');
      return;
    }

    if (formData.password !== formData.confirmPassword) {
      setError('Passwords do not match');
      return;
    }

    if (formData.password.length < 6) {
      setError('Password must be at least 6 characters');
      return;
    }

    setLoading(true);

    try {
      const response = await fetch(`${BACKEND_URL}/api/auth/register`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          name: `${formData.firstName} ${formData.lastName}`,
          email: formData.email,
          password: formData.password
        })
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || 'Registration failed');
      }

      // Auto-login after successful registration
      const loginResponse = await fetch(`${BACKEND_URL}/api/auth/login`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          email: formData.email,
          password: formData.password
        }),
        credentials: 'include'
      });

      if (loginResponse.ok) {
        // Trigger onboarding for new user
        if (onClose) {
          onClose({ showOnboarding: true });
        }
      } else {
        // If auto-login fails, just close and ask user to login
        setError('Registration successful! Please sign in.');
        setFormData({
          firstName: '',
          lastName: '',
          email: formData.email,
          password: '',
          confirmPassword: ''
        });
        setIsSignIn(true);
      }
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const handleClose = () => {
    if (onClose) {
      onClose({ showOnboarding: false });
    }
  };

  if (!isOpen) {
    return null;
  }

  return (
    <>
      <div className="fixed inset-0 bg-black/90 flex items-center justify-center p-4 z-50">
        <div className="relative w-full max-w-4xl h-[600px] bg-zinc-900 rounded-2xl shadow-2xl overflow-hidden border border-red-900/30">
          <button
            onClick={handleClose}
            className="absolute top-4 right-4 z-50 p-2 hover:bg-red-600/20 rounded-full transition-colors"
          >
            <X className="w-6 h-6 text-red-500" />
          </button>

          <div className="relative w-full h-full flex">
            <div className={`absolute left-0 w-1/2 h-full overflow-y-auto transition-opacity duration-500 ${isSignIn ? 'opacity-100 z-10' : 'opacity-0 z-0'}`} style={{scrollbarWidth: 'none', msOverflowStyle: 'none'}}>
              <style>{`
                .hide-scrollbar::-webkit-scrollbar {
                  display: none;
                }
              `}</style>
              <div className="p-12 hide-scrollbar">
                <h2 className="text-3xl font-bold text-white mb-8">Sign in</h2>

                {error && isSignIn && (
                  <div className="mb-4 p-3 bg-red-900/30 border border-red-500 rounded-lg text-red-400 text-sm">
                    {error}
                  </div>
                )}

                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-400 mb-2">EMAIL ADDRESS</label>
                    <input
                      type="email"
                      name="email"
                      value={formData.email}
                      onChange={handleInputChange}
                      className="w-full px-4 py-3 bg-black/40 border border-zinc-700 rounded-lg focus:ring-2 focus:ring-red-600 focus:border-transparent outline-none text-white placeholder-gray-500"
                      placeholder="your@email.com"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-400 mb-2">PASSWORD</label>
                    <input
                      type="password"
                      name="password"
                      value={formData.password}
                      onChange={handleInputChange}
                      onKeyPress={(e) => e.key === 'Enter' && handleLogin()}
                      className="w-full px-4 py-3 bg-black/40 border border-zinc-700 rounded-lg focus:ring-2 focus:ring-red-600 focus:border-transparent outline-none text-white placeholder-gray-500"
                      placeholder="••••••••"
                    />
                  </div>
                </div>

                <button 
                  onClick={handleLogin}
                  disabled={loading}
                  className="w-full mt-6 py-3 bg-gradient-to-r from-red-600 to-red-700 text-white font-semibold rounded-lg hover:from-red-700 hover:to-red-800 transition-all duration-300 shadow-lg shadow-red-900/50 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {loading ? 'SIGNING IN...' : 'SIGN IN'}
                </button>

                <p className="text-center text-sm text-gray-400 mt-6">
                  Forgot your password? <a href="#" className="text-red-500 hover:text-red-400 hover:underline">Reset here</a>
                </p>
              </div>
            </div>

            <div className={`absolute right-0 w-1/2 h-full overflow-y-auto transition-opacity duration-500 ${!isSignIn ? 'opacity-100 z-10' : 'opacity-0 z-0'}`} style={{scrollbarWidth: 'none', msOverflowStyle: 'none'}}>
              <div className="p-12 hide-scrollbar">
                <h2 className="text-3xl font-bold text-white mb-8">Register now</h2>

                {error && !isSignIn && (
                  <div className="mb-4 p-3 bg-red-900/30 border border-red-500 rounded-lg text-red-400 text-sm">
                    {error}
                  </div>
                )}

                <div className="space-y-4">
                  <div className="flex gap-4">
                    <div className="flex-1">
                      <label className="block text-sm font-medium text-gray-400 mb-2">FIRST NAME</label>
                      <input
                        type="text"
                        name="firstName"
                        value={formData.firstName}
                        onChange={handleInputChange}
                        className="w-full px-4 py-3 bg-black/40 border border-zinc-700 rounded-lg focus:ring-2 focus:ring-red-600 focus:border-transparent outline-none text-white placeholder-gray-500"
                        placeholder="John"
                      />
                    </div>
                    <div className="flex-1">
                      <label className="block text-sm font-medium text-gray-400 mb-2">LAST NAME</label>
                      <input
                        type="text"
                        name="lastName"
                        value={formData.lastName}
                        onChange={handleInputChange}
                        className="w-full px-4 py-3 bg-black/40 border border-zinc-700 rounded-lg focus:ring-2 focus:ring-red-600 focus:border-transparent outline-none text-white placeholder-gray-500"
                        placeholder="Doe"
                      />
                    </div>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-400 mb-2">EMAIL ADDRESS</label>
                    <input
                      type="email"
                      name="email"
                      value={formData.email}
                      onChange={handleInputChange}
                      className="w-full px-4 py-3 bg-black/40 border border-zinc-700 rounded-lg focus:ring-2 focus:ring-red-600 focus:border-transparent outline-none text-white placeholder-gray-500"
                      placeholder="your@email.com"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-400 mb-2">PASSWORD</label>
                    <input
                      type="password"
                      name="password"
                      value={formData.password}
                      onChange={handleInputChange}
                      className="w-full px-4 py-3 bg-black/40 border border-zinc-700 rounded-lg focus:ring-2 focus:ring-red-600 focus:border-transparent outline-none text-white placeholder-gray-500"
                      placeholder="••••••••"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-400 mb-2">CONFIRM PASSWORD</label>
                    <input
                      type="password"
                      name="confirmPassword"
                      value={formData.confirmPassword}
                      onChange={handleInputChange}
                      onKeyPress={(e) => e.key === 'Enter' && handleRegister()}
                      className="w-full px-4 py-3 bg-black/40 border border-zinc-700 rounded-lg focus:ring-2 focus:ring-red-600 focus:border-transparent outline-none text-white placeholder-gray-500"
                      placeholder="••••••••"
                    />
                  </div>
                </div>

                <button 
                  onClick={handleRegister}
                  disabled={loading}
                  className="w-full mt-6 py-3 bg-gradient-to-r from-red-600 to-red-700 text-white font-semibold rounded-lg hover:from-red-700 hover:to-red-800 transition-all duration-300 shadow-lg shadow-red-900/50 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {loading ? 'REGISTERING...' : 'REGISTER'}
                </button>
              </div>
            </div>

            <div
              className="absolute top-0 w-1/2 h-full transition-all duration-700 ease-in-out overflow-hidden"
              style={{
                left: isSignIn ? '50%' : '0%',
                boxShadow: isSignIn ? '-10px 0 30px rgba(0,0,0,0.5)' : '10px 0 30px rgba(0,0,0,0.5)'
              }}
            >
              <div 
                className="absolute inset-0 bg-cover bg-center"
                style={{
                  backgroundImage: 'url(/feed8.png)',
                }}
              >
                <div className="absolute inset-0 bg-gradient-to-br from-red-900/90 via-black/85 to-black/90"></div>
              </div>

              <div className="relative w-full h-full flex items-center justify-center p-12">
                <div className="text-center text-white">
                  {isSignIn ? (
                    <>
                      <h1 className="text-4xl font-bold mb-4">Good morning!</h1>
                      <h2 className="text-4xl font-bold mb-8">Welcome back.</h2>
                      <div className="w-16 h-1 bg-red-500 mx-auto mb-8"></div>
                      <p className="text-lg mb-6 text-gray-300">Don't have an account?</p>
                      <button
                        onClick={toggleMode}
                        className="px-8 py-3 border-2 border-red-500 text-white font-semibold rounded-lg hover:bg-red-600 hover:border-red-600 transition-all duration-300"
                      >
                        REGISTER NOW
                      </button>
                    </>
                  ) : (
                    <>
                      <h1 className="text-4xl font-bold mb-4">Create an account.</h1>
                      <h2 className="text-4xl font-bold mb-8">Start your journey!</h2>
                      <div className="w-16 h-1 bg-red-500 mx-auto mb-8"></div>
                      <p className="text-lg mb-6 text-gray-300">Already have an account?</p>
                      <button
                        onClick={toggleMode}
                        className="px-8 py-3 border-2 border-red-500 text-white font-semibold rounded-lg hover:bg-red-600 hover:border-red-600 transition-all duration-300"
                      >
                        SIGN IN
                      </button>
                    </>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}