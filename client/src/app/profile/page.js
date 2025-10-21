
"use client";
import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Mail, Edit2, MessageSquare, ShoppingBag, Calendar, Lock, Bell, LogOut, Camera, User, FileText, Download, Trash2, CreditCard } from "lucide-react";

export default function ProfilePage() {
  const [user, setUser] = useState(null);
  const [activeSection, setActiveSection] = useState("profile");
  const [isEditingPersonal, setIsEditingPersonal] = useState(false);
  const [isEditingAddress, setIsEditingAddress] = useState(false);
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState({ type: '', text: '' });

  // Form states
  const [personalForm, setPersonalForm] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    bio: ''
  });

  const [addressForm, setAddressForm] = useState({
    street: '',
    city: '',
    state: '',
    pinCode: '',
    country: ''
  });

  const BACKEND_URL = process.env.NEXT_PUBLIC_BACKEND_URL || "http://localhost:5000";

  useEffect(() => {
    checkAuthStatus();
  }, []);

  useEffect(() => {
    if (user) {
      // Populate personal form
      const nameParts = user.name?.split(' ') || [];
      setPersonalForm({
        firstName: nameParts[0] || '',
        lastName: nameParts.slice(1).join(' ') || '',
        email: user.email || '',
        phone: user.phone || '',
        bio: user.bio || ''
      });

      // Populate address form
      setAddressForm({
        street: user.address?.street || '',
        city: user.address?.city || '',
        state: user.address?.state || '',
        pinCode: user.address?.pinCode || '',
        country: user.address?.country || ''
      });
    }
  }, [user]);

  const checkAuthStatus = async () => {
    try {
      const response = await fetch(`${BACKEND_URL}/api/auth/me`, {
        credentials: 'include'
      });
      if (response.ok) {
        const data = await response.json();
        setUser(data);
      } else {
        window.location.href = '/';
      }
    } catch (error) {
      console.error('Auth check failed:', error);
      window.location.href = '/';
    }
  };

  const handleLogout = async () => {
    try {
      const response = await fetch(`${BACKEND_URL}/api/auth/logout`, {
        method: 'POST',
        credentials: 'include'
      });
      if (response.ok) {
        window.location.href = '/';
      }
    } catch (error) {
      console.error('Logout failed:', error);
    }
  };

  const showMessage = (type, text) => {
    setMessage({ type, text });
    setTimeout(() => setMessage({ type: '', text: '' }), 5000);
  };

  const handlePersonalInfoSubmit = async () => {
    setLoading(true);
    try {
      const fullName = `${personalForm.firstName} ${personalForm.lastName}`.trim();
      
      const response = await fetch(`${BACKEND_URL}/api/profile/personal`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        credentials: 'include',
        body: JSON.stringify({
          name: fullName,
          phone: personalForm.phone,
          bio: personalForm.bio
        })
      });

      const data = await response.json();

      if (response.ok) {
        setUser(data.user);
        setIsEditingPersonal(false);
        showMessage('success', 'Personal information updated successfully!');
      } else {
        showMessage('error', data.message || 'Failed to update personal information');
      }
    } catch (error) {
      console.error('Update failed:', error);
      showMessage('error', 'An error occurred while updating');
    } finally {
      setLoading(false);
    }
  };

  const handleAddressSubmit = async () => {
    setLoading(true);
    try {
      const response = await fetch(`${BACKEND_URL}/api/profile/address`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        credentials: 'include',
        body: JSON.stringify(addressForm)
      });

      const data = await response.json();

      if (response.ok) {
        setUser(data.user);
        setIsEditingAddress(false);
        showMessage('success', 'Address updated successfully!');
      } else {
        showMessage('error', data.message || 'Failed to update address');
      }
    } catch (error) {
      console.error('Update failed:', error);
      showMessage('error', 'An error occurred while updating');
    } finally {
      setLoading(false);
    }
  };

  const getInitials = (name) => {
    if (!name) return 'U';
    return name.charAt(0).toUpperCase();
  };

  const menuItems = [
    { id: "profile", label: "My Profile", icon: User },
    { id: "security", label: "Security", icon: Lock },
    { id: "discussions", label: "Discussions", icon: MessageSquare },
    { id: "orders", label: "Orders", icon: ShoppingBag },
    { id: "consultations", label: "Consultations", icon: Calendar },
    { id: "notifications", label: "Notifications", icon: Bell },
    { id: "billing", label: "Billing", icon: CreditCard },
    { id: "export", label: "Data Export", icon: Download },
    { id: "delete", label: "Delete Account", icon: Trash2, danger: true }
  ];

  // Animation variants
  const contentVariants = {
    initial: { 
      opacity: 0, 
      x: 20,
      filter: "blur(4px)"
    },
    animate: { 
      opacity: 1, 
      x: 0,
      filter: "blur(0px)",
      transition: {
        duration: 0.4,
        ease: [0.22, 1, 0.36, 1]
      }
    },
    exit: { 
      opacity: 0, 
      x: -20,
      filter: "blur(4px)",
      transition: {
        duration: 0.3,
        ease: [0.22, 1, 0.36, 1]
      }
    }
  };

  const renderContent = () => {
    switch (activeSection) {
      case "profile":
        return (
          <motion.div 
            key="profile"
            variants={contentVariants}
            initial="initial"
            animate="animate"
            exit="exit"
            className="space-y-8"
          >
            {/* Success/Error Message */}
            <AnimatePresence>
              {message.text && (
                <motion.div 
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  className={`p-4 rounded-lg ${
                    message.type === 'success' 
                      ? 'bg-green-500/10 border border-green-500/30 text-green-500' 
                      : 'bg-red-500/10 border border-red-500/30 text-red-500'
                  }`}
                >
                  {message.text}
                </motion.div>
              )}
            </AnimatePresence>

            {/* Profile Header */}
            <div>
              <h2 className="text-2xl font-bold text-white mb-6">My Profile</h2>
              
              {/* Profile Picture and Basic Info */}
              <div className="flex items-start gap-6 mb-8 pb-8 border-b border-zinc-700/50">
                <div className="relative group">
                  <div className="w-24 h-24 rounded-full bg-gradient-to-br from-red-600 to-red-700 flex items-center justify-center text-white font-bold text-3xl shadow-lg">
                    {getInitials(user?.name)}
                  </div>
                  <button className="absolute bottom-0 right-0 w-8 h-8 bg-red-600 hover:bg-red-700 rounded-full flex items-center justify-center shadow-lg transition-all cursor-pointer">
                    <Camera className="w-4 h-4 text-white" />
                  </button>
                </div>
                <div className="flex-1">
                  <div className="flex items-center justify-between">
                    <div className="mt-5">
                      <h3 className="text-xl font-semibold text-white">{user?.name || "User"}</h3>
                      <p className="text-red-500 text-sm">{user?.email}</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Personal Information */}
            <motion.div layout>
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-lg font-semibold text-white">Personal Information</h3>
                <button 
                  onClick={() => setIsEditingPersonal(!isEditingPersonal)}
                  className="flex items-center gap-2 px-4 py-2 text-sm text-gray-300 hover:text-white transition-colors cursor-pointer"
                >
                  <span>{isEditingPersonal ? 'Cancel' : 'Edit'}</span>
                  <Edit2 className="w-4 h-4" />
                </button>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="text-sm text-gray-400 mb-2 block">First Name</label>
                  {isEditingPersonal ? (
                    <input
                      type="text"
                      value={personalForm.firstName}
                      onChange={(e) => setPersonalForm({...personalForm, firstName: e.target.value})}
                      className="w-full bg-zinc-800/50 border border-zinc-700 rounded-lg px-4 py-2.5 text-white focus:outline-none focus:border-red-600"
                    />
                  ) : (
                    <p className="text-white">{personalForm.firstName || "-"}</p>
                  )}
                </div>
                
                <div>
                  <label className="text-sm text-gray-400 mb-2 block">Last Name</label>
                  {isEditingPersonal ? (
                    <input
                      type="text"
                      value={personalForm.lastName}
                      onChange={(e) => setPersonalForm({...personalForm, lastName: e.target.value})}
                      className="w-full bg-zinc-800/50 border border-zinc-700 rounded-lg px-4 py-2.5 text-white focus:outline-none focus:border-red-600"
                    />
                  ) : (
                    <p className="text-white">{personalForm.lastName || "-"}</p>
                  )}
                </div>
                
                <div>
                  <label className="text-sm text-gray-400 mb-2 block">Email address</label>
                  <p className="text-white">{personalForm.email || "-"}</p>
                  {isEditingPersonal && (
                    <p className="text-xs text-gray-500 mt-1">Email cannot be changed</p>
                  )}
                </div>
                
                <div>
                  <label className="text-sm text-gray-400 mb-2 block">Phone</label>
                  {isEditingPersonal ? (
                    <input
                      type="tel"
                      value={personalForm.phone}
                      onChange={(e) => setPersonalForm({...personalForm, phone: e.target.value})}
                      placeholder="+91 XXX XXX XXXX"
                      className="w-full bg-zinc-800/50 border border-zinc-700 rounded-lg px-4 py-2.5 text-white focus:outline-none focus:border-red-600"
                    />
                  ) : (
                    <p className="text-white">{personalForm.phone || "Not provided"}</p>
                  )}
                </div>
                
                <div className="md:col-span-2">
                  <label className="text-sm text-gray-400 mb-2 block">Bio</label>
                  {isEditingPersonal ? (
                    <textarea
                      value={personalForm.bio}
                      onChange={(e) => setPersonalForm({...personalForm, bio: e.target.value})}
                      className="w-full bg-zinc-800/50 border border-zinc-700 rounded-lg px-4 py-2.5 text-white focus:outline-none focus:border-red-600 resize-none"
                      rows="3"
                      placeholder="Tell us about yourself"
                    />
                  ) : (
                    <p className="text-white">{personalForm.bio || "No bio provided"}</p>
                  )}
                </div>
              </div>

              <AnimatePresence>
                {isEditingPersonal && (
                  <motion.div 
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: "auto" }}
                    exit={{ opacity: 0, height: 0 }}
                    className="flex gap-3 mt-6"
                  >
                    <button 
                      onClick={handlePersonalInfoSubmit}
                      disabled={loading}
                      className="px-6 py-2.5 bg-gradient-to-r from-red-600 to-red-700 hover:from-red-700 hover:to-red-800 text-white font-semibold rounded-lg transition-all cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                      {loading ? 'Saving...' : 'Save Changes'}
                    </button>
                    <button 
                      onClick={() => {
                        setIsEditingPersonal(false);
                        const nameParts = user.name?.split(' ') || [];
                        setPersonalForm({
                          firstName: nameParts[0] || '',
                          lastName: nameParts.slice(1).join(' ') || '',
                          email: user.email || '',
                          phone: user.phone || '',
                          bio: user.bio || ''
                        });
                      }}
                      disabled={loading}
                      className="px-6 py-2.5 bg-zinc-800 hover:bg-zinc-700 text-white font-semibold rounded-lg transition-all cursor-pointer disabled:opacity-50"
                    >
                      Cancel
                    </button>
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>

            {/* Address */}
            <motion.div layout>
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-lg font-semibold text-white">Address</h3>
                <button 
                  onClick={() => setIsEditingAddress(!isEditingAddress)}
                  className="flex items-center gap-2 px-4 py-2 text-sm text-gray-300 hover:text-white transition-colors cursor-pointer"
                >
                  <span>{isEditingAddress ? 'Cancel' : 'Edit'}</span>
                  <Edit2 className="w-4 h-4" />
                </button>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="text-sm text-gray-400 mb-2 block">Street Address</label>
                  {isEditingAddress ? (
                    <input
                      type="text"
                      value={addressForm.street}
                      onChange={(e) => setAddressForm({...addressForm, street: e.target.value})}
                      placeholder="Enter street address"
                      className="w-full bg-zinc-800/50 border border-zinc-700 rounded-lg px-4 py-2.5 text-white focus:outline-none focus:border-red-600"
                    />
                  ) : (
                    <p className="text-white">{addressForm.street || "Not provided"}</p>
                  )}
                </div>
                
                <div>
                  <label className="text-sm text-gray-400 mb-2 block">City</label>
                  {isEditingAddress ? (
                    <input
                      type="text"
                      value={addressForm.city}
                      onChange={(e) => setAddressForm({...addressForm, city: e.target.value})}
                      placeholder="Enter city"
                      className="w-full bg-zinc-800/50 border border-zinc-700 rounded-lg px-4 py-2.5 text-white focus:outline-none focus:border-red-600"
                    />
                  ) : (
                    <p className="text-white">{addressForm.city || "Not provided"}</p>
                  )}
                </div>
                
                <div>
                  <label className="text-sm text-gray-400 mb-2 block">State</label>
                  {isEditingAddress ? (
                    <input
                      type="text"
                      value={addressForm.state}
                      onChange={(e) => setAddressForm({...addressForm, state: e.target.value})}
                      placeholder="Enter state"
                      className="w-full bg-zinc-800/50 border border-zinc-700 rounded-lg px-4 py-2.5 text-white focus:outline-none focus:border-red-600"
                    />
                  ) : (
                    <p className="text-white">{addressForm.state || "Not provided"}</p>
                  )}
                </div>
                
                <div>
                  <label className="text-sm text-gray-400 mb-2 block">PIN Code</label>
                  {isEditingAddress ? (
                    <input
                      type="text"
                      value={addressForm.pinCode}
                      onChange={(e) => setAddressForm({...addressForm, pinCode: e.target.value})}
                      placeholder="Enter PIN code"
                      className="w-full bg-zinc-800/50 border border-zinc-700 rounded-lg px-4 py-2.5 text-white focus:outline-none focus:border-red-600"
                    />
                  ) : (
                    <p className="text-white">{addressForm.pinCode || "Not provided"}</p>
                  )}
                </div>
                
                <div className="md:col-span-2">
                  <label className="text-sm text-gray-400 mb-2 block">Country</label>
                  {isEditingAddress ? (
                    <input
                      type="text"
                      value={addressForm.country}
                      onChange={(e) => setAddressForm({...addressForm, country: e.target.value})}
                      placeholder="Enter country"
                      className="w-full bg-zinc-800/50 border border-zinc-700 rounded-lg px-4 py-2.5 text-white focus:outline-none focus:border-red-600"
                    />
                  ) : (
                    <p className="text-white">{addressForm.country || "Not provided"}</p>
                  )}
                </div>
              </div>

              <AnimatePresence>
                {isEditingAddress && (
                  <motion.div 
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: "auto" }}
                    exit={{ opacity: 0, height: 0 }}
                    className="flex gap-3 mt-6"
                  >
                    <button 
                      onClick={handleAddressSubmit}
                      disabled={loading}
                      className="px-6 py-2.5 bg-gradient-to-r from-red-600 to-red-700 hover:from-red-700 hover:to-red-800 text-white font-semibold rounded-lg transition-all cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                      {loading ? 'Saving...' : 'Save Changes'}
                    </button>
                    <button 
                      onClick={() => {
                        setIsEditingAddress(false);
                        setAddressForm({
                          street: user.address?.street || '',
                          city: user.address?.city || '',
                          state: user.address?.state || '',
                          pinCode: user.address?.pinCode || '',
                          country: user.address?.country || ''
                        });
                      }}
                      disabled={loading}
                      className="px-6 py-2.5 bg-zinc-800 hover:bg-zinc-700 text-white font-semibold rounded-lg transition-all cursor-pointer disabled:opacity-50"
                    >
                      Cancel
                    </button>
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          </motion.div>
        );

      case "security":
        return (
          <motion.div
            key="security"
            variants={contentVariants}
            initial="initial"
            animate="animate"
            exit="exit"
          >
            <h2 className="text-2xl font-bold text-white mb-6">Security</h2>
            <div className="space-y-4">
              <button className="w-full flex items-center justify-between p-5 bg-zinc-800/50 hover:bg-zinc-800 border border-zinc-700/50 rounded-xl transition-all duration-300 group cursor-pointer">
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 rounded-full bg-red-600/10 flex items-center justify-center">
                    <Lock className="w-6 h-6 text-red-500" />
                  </div>
                  <div className="text-left">
                    <p className="text-white font-semibold">Change Password</p>
                    <p className="text-gray-400 text-sm">Update your security credentials</p>
                  </div>
                </div>
              </button>
            </div>
          </motion.div>
        );

      case "discussions":
        return (
          <motion.div 
            key="discussions"
            variants={contentVariants}
            initial="initial"
            animate="animate"
            exit="exit"
            className="flex flex-col items-center justify-center h-full py-16"
          >
            <motion.div 
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ delay: 0.2 }}
              className="w-20 h-20 rounded-full bg-red-600/10 flex items-center justify-center mb-6"
            >
              <MessageSquare className="w-10 h-10 text-red-500" />
            </motion.div>
            <h3 className="text-2xl font-bold text-white mb-3">Coming Soon</h3>
            <p className="text-gray-400 text-center max-w-md">
              Share your journey and engage in meaningful discussions about menstrual health.
            </p>
          </motion.div>
        );

      case "orders":
        return (
          <motion.div 
            key="orders"
            variants={contentVariants}
            initial="initial"
            animate="animate"
            exit="exit"
            className="flex flex-col items-center justify-center h-full py-16"
          >
            <motion.div 
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ delay: 0.2 }}
              className="w-20 h-20 rounded-full bg-red-600/10 flex items-center justify-center mb-6"
            >
              <ShoppingBag className="w-10 h-10 text-red-500" />
            </motion.div>
            <h3 className="text-2xl font-bold text-white mb-3">Coming Soon</h3>
            <p className="text-gray-400 text-center max-w-md">
              Track your orders and manage your CareHub purchases.
            </p>
          </motion.div>
        );

      case "consultations":
        return (
          <motion.div 
            key="consultations"
            variants={contentVariants}
            initial="initial"
            animate="animate"
            exit="exit"
            className="flex flex-col items-center justify-center h-full py-16"
          >
            <motion.div 
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ delay: 0.2 }}
              className="w-20 h-20 rounded-full bg-red-600/10 flex items-center justify-center mb-6"
            >
              <Calendar className="w-10 h-10 text-red-500" />
            </motion.div>
            <h3 className="text-2xl font-bold text-white mb-3">Coming Soon</h3>
            <p className="text-gray-400 text-center max-w-md">
              Book consultations with healthcare experts.
            </p>
          </motion.div>
        );

      case "notifications":
        return (
          <motion.div
            key="notifications"
            variants={contentVariants}
            initial="initial"
            animate="animate"
            exit="exit"
          >
            <h2 className="text-2xl font-bold text-white mb-6">Notifications</h2>
            <div className="space-y-4">
              <button className="w-full flex items-center justify-between p-5 bg-zinc-800/50 hover:bg-zinc-800 border border-zinc-700/50 rounded-xl transition-all cursor-pointer">
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 rounded-full bg-red-600/10 flex items-center justify-center">
                    <Bell className="w-6 h-6 text-red-500" />
                  </div>
                  <div className="text-left">
                    <p className="text-white font-semibold">Notification Preferences</p>
                    <p className="text-gray-400 text-sm">Customize your alerts and reminders</p>
                  </div>
                </div>
              </button>
            </div>
          </motion.div>
        );

      case "billing":
        return (
          <motion.div 
            key="billing"
            variants={contentVariants}
            initial="initial"
            animate="animate"
            exit="exit"
            className="flex flex-col items-center justify-center h-full py-16"
          >
            <h3 className="text-2xl font-bold text-white mb-3">Billing</h3>
            <p className="text-gray-400 text-center max-w-md">
              Manage your payment methods and billing information.
            </p>
          </motion.div>
        );

      case "export":
        return (
          <motion.div 
            key="export"
            variants={contentVariants}
            initial="initial"
            animate="animate"
            exit="exit"
            className="flex flex-col items-center justify-center h-full py-16"
          >
            <h3 className="text-2xl font-bold text-white mb-3">Data Export</h3>
            <p className="text-gray-400 text-center max-w-md">
              Download your personal data and activity history.
            </p>
          </motion.div>
        );

      case "delete":
        return (
          <motion.div 
            key="delete"
            variants={contentVariants}
            initial="initial"
            animate="animate"
            exit="exit"
            className="flex flex-col items-center justify-center h-full py-16"
          >
            <h3 className="text-2xl font-bold text-red-500 mb-3">Delete Account</h3>
            <p className="text-gray-400 text-center max-w-md mb-6">
              Permanently delete your account and all associated data. This action cannot be undone.
            </p>
            <button className="px-6 py-3 bg-red-600 hover:bg-red-700 text-white font-semibold rounded-lg transition-all cursor-pointer">
              Delete My Account
            </button>
          </motion.div>
        );

      default:
        return null;
    }
  };

  if (!user) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-black via-zinc-900 to-black flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-red-600"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-black pt-15 pb-12 px-4 sm:px-6 lg:px-8 relative overflow-hidden">
      {/* Background decorative elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-1/4 left-10 w-96 h-96 bg-red-500/10 rounded-full blur-3xl" />
        <div className="absolute bottom-1/3 right-10 w-96 h-96 bg-red-500/10 rounded-full blur-3xl" />
        <div className="absolute top-2/3 left-1/4 w-80 h-80 bg-red-500/5 rounded-full blur-3xl" />
      </div>
      <div className="mx-auto relative z-10">
        <h1 className="text-3xl font-bold text-white mb-8">Account Settings</h1>
        
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
          {/* Left Sidebar */}
          <div className="lg:col-span-1">
            <div className="bg-gradient-to-br from-zinc-900/50 to-black/50 rounded-xl border border-zinc-800/50 p-2 space-y-1">
              {menuItems.map((item) => {
                const IconComponent = item.icon;
                return (
                  <button
                    key={item.id}
                    onClick={() => setActiveSection(item.id)}
                    className={`w-full text-left px-4 py-3 rounded-lg transition-all cursor-pointer flex items-center gap-3 ${
                      activeSection === item.id
                        ? "bg-red-600/20 text-white border border-red-600/30"
                        : item.danger
                        ? "text-red-400 hover:bg-red-900/10"
                        : "text-gray-400 hover:bg-zinc-800/50 hover:text-white"
                    }`}
                  >
                    <IconComponent className="w-5 h-5" />
                    <span>{item.label}</span>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Right Content */}
          <div className="lg:col-span-3">
            <div className="bg-gradient-to-br from-zinc-900/50 to-black/50 rounded-xl border border-zinc-800/50 p-6 sm:p-8 min-h-[600px]">
              {renderContent()}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}