"use client";
import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { 
  ArrowLeft, Package, Truck, CheckCircle, Clock, MapPin, 
  Phone, Mail, Download, X, IndianRupee, Calendar,
  CreditCard, ShoppingBag
} from "lucide-react";

export default function OrderDetailsPage() {
  const [order, setOrder] = useState(null);
  const [loading, setLoading] = useState(true);
  const [showCancelModal, setShowCancelModal] = useState(false);

  const BACKEND_URL = process.env.NEXT_PUBLIC_BACKEND_URL || "http://localhost:5000";

  useEffect(() => {
    fetchOrderDetails();
  }, []);

  const fetchOrderDetails = async () => {
    try {
      setLoading(true);
      // Get order ID from URL path
      const pathParts = window.location.pathname.split('/');
      const orderId = pathParts[pathParts.length - 1];
      
      const response = await fetch(`${BACKEND_URL}/api/orders/${orderId}`, {
        credentials: 'include'
      });

      if (response.ok) {
        const data = await response.json();
        setOrder(data);
      } else {
        console.error('Failed to fetch order');
      }
    } catch (err) {
      console.error('Error fetching order:', err);
    } finally {
      setLoading(false);
    }
  };

  const getStatusColor = (status) => {
    switch (status?.toLowerCase()) {
      case 'processing':
        return 'text-blue-500 bg-blue-500/10 border-blue-500/30';
      case 'shipped':
        return 'text-purple-500 bg-purple-500/10 border-purple-500/30';
      case 'delivered':
        return 'text-green-500 bg-green-500/10 border-green-500/30';
      case 'cancelled':
        return 'text-red-500 bg-red-500/10 border-red-500/30';
      default:
        return 'text-gray-500 bg-gray-500/10 border-gray-500/30';
    }
  };

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', { 
      year: 'numeric', 
      month: 'long', 
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  const handleGoBack = () => {
    window.history.back();
  };

  const handleCancelOrder = () => {
    setShowCancelModal(true);
  };

  const confirmCancelOrder = () => {
    // TODO: Implement cancel order API call
    console.log('Order cancelled');
    setShowCancelModal(false);
  };

  const handleDownloadInvoice = () => {
    // TODO: Implement invoice download
    console.log('Download invoice');
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-black flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-red-600"></div>
      </div>
    );
  }

  if (!order) {
    return (
      <div className="min-h-screen bg-black flex items-center justify-center">
        <div className="text-center">
          <Package className="w-16 h-16 text-gray-600 mx-auto mb-4" />
          <h2 className="text-2xl font-bold text-white mb-2">Order Not Found</h2>
          <p className="text-gray-400 mb-6">The order you're looking for doesn't exist.</p>
          <button 
            onClick={handleGoBack}
            className="px-6 py-3 bg-red-600 hover:bg-red-700 text-white font-semibold rounded-lg transition-all cursor-pointer"
          >
            Go Back
          </button>
        </div>
      </div>
    );
  }

  // Order tracking steps
  const trackingSteps = [
    { status: 'processing', label: 'Order Placed', icon: ShoppingBag },
    { status: 'processing', label: 'Processing', icon: Package },
    { status: 'shipped', label: 'Shipped', icon: Truck },
    { status: 'delivered', label: 'Delivered', icon: CheckCircle }
  ];

  const getCurrentStepIndex = () => {
    const statusMap = {
      'processing': 1,
      'shipped': 2,
      'delivered': 3,
      'cancelled': -1
    };
    return statusMap[order.orderStatus] || 0;
  };

  const currentStep = getCurrentStepIndex();

  return (
    <div className="min-h-screen bg-black pt-10 pb-12 px-4 sm:px-6 lg:px-8 relative overflow-hidden">
      {/* Background decorative elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-1/4 left-10 w-96 h-96 bg-red-500/10 rounded-full blur-3xl" />
        <div className="absolute bottom-1/3 right-10 w-96 h-96 bg-red-500/10 rounded-full blur-3xl" />
      </div>

      <div className="max-w-7xl mx-auto relative z-10">
        {/* Header */}
        <div className="mb-8">
          <button
            onClick={handleGoBack}
            className="flex items-center gap-2 text-gray-400 hover:text-white transition-colors mb-4 cursor-pointer"
          >
            <ArrowLeft className="w-5 h-5" />
            <span>Back to Orders</span>
          </button>
          
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div>
              <h1 className="text-3xl font-bold text-white mb-2">
                Order #{order._id.slice(-8).toUpperCase()}
              </h1>
              <div className="flex items-center gap-4 text-sm text-gray-400">
                <div className="flex items-center gap-1">
                  <Calendar className="w-4 h-4" />
                  <span>Placed on {formatDate(order.createdAt)}</span>
                </div>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <button
                onClick={handleDownloadInvoice}
                className="flex items-center gap-2 px-4 py-2.5 bg-zinc-800 hover:bg-zinc-700 text-white rounded-lg transition-all cursor-pointer"
              >
                <Download className="w-4 h-4" />
                <span>Invoice</span>
              </button>
              {order.orderStatus !== 'delivered' && order.orderStatus !== 'cancelled' && (
                <button
                  onClick={handleCancelOrder}
                  className="flex items-center gap-2 px-4 py-2.5 bg-red-600/10 hover:bg-red-600/20 text-red-500 border border-red-600/30 rounded-lg transition-all cursor-pointer"
                >
                  <X className="w-4 h-4" />
                  <span>Cancel Order</span>
                </button>
              )}
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Left Column - Order Details */}
          <div className="lg:col-span-2 space-y-6">
            {/* Order Tracking */}
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="bg-gradient-to-br from-zinc-900/50 to-black/50 rounded-xl border border-zinc-800/50 p-6"
            >
              <h2 className="text-xl font-bold text-white mb-6">Order Tracking</h2>
              
              {order.orderStatus === 'cancelled' ? (
                <div className="flex items-center justify-center p-8 bg-red-500/10 border border-red-500/30 rounded-lg">
                  <div className="text-center">
                    <X className="w-12 h-12 text-red-500 mx-auto mb-3" />
                    <p className="text-red-500 font-semibold">Order Cancelled</p>
                  </div>
                </div>
              ) : (
                <div className="relative">
                  <div className="absolute top-6 left-6 right-6 h-0.5 bg-zinc-700">
                    <div 
                      className="h-full bg-red-600 transition-all duration-500"
                      style={{ width: `${(currentStep / (trackingSteps.length - 1)) * 100}%` }}
                    />
                  </div>
                  
                  <div className="relative flex justify-between">
                    {trackingSteps.map((step, index) => {
                      const IconComponent = step.icon;
                      const isCompleted = index <= currentStep;
                      const isCurrent = index === currentStep;
                      
                      return (
                        <div key={index} className="flex flex-col items-center">
                          <div className={`w-12 h-12 rounded-full flex items-center justify-center mb-3 transition-all ${
                            isCompleted 
                              ? 'bg-red-600 border-2 border-red-600' 
                              : 'bg-zinc-800 border-2 border-zinc-700'
                          } ${isCurrent ? 'ring-4 ring-red-600/30' : ''}`}>
                            <IconComponent className={`w-5 h-5 ${isCompleted ? 'text-white' : 'text-gray-500'}`} />
                          </div>
                          <p className={`text-sm font-medium text-center ${
                            isCompleted ? 'text-white' : 'text-gray-500'
                          }`}>
                            {step.label}
                          </p>
                        </div>
                      );
                    })}
                  </div>
                </div>
              )}
            </motion.div>

            {/* Order Items */}
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              className="bg-gradient-to-br from-zinc-900/50 to-black/50 rounded-xl border border-zinc-800/50 p-6"
            >
              <h2 className="text-xl font-bold text-white mb-6">Order Items</h2>
              
              <div className="space-y-4">
                {order.items.map((item, index) => (
                  <div key={index} className="flex items-center gap-4 p-4 bg-zinc-800/30 rounded-lg">
                    <div className="w-20 h-20 rounded-lg bg-zinc-700/50 flex items-center justify-center overflow-hidden flex-shrink-0">
                      {item.productId?.image ? (
                        <img 
                          src={item.productId.image} 
                          alt={item.name}
                          className="w-full h-full object-cover"
                        />
                      ) : (
                        <Package className="w-8 h-8 text-gray-400" />
                      )}
                    </div>
                    <div className="flex-1">
                      <h3 className="text-white font-semibold mb-1">{item.name}</h3>
                      <p className="text-sm text-gray-400">Quantity: {item.quantity}</p>
                    </div>
                    <div className="text-right">
                      <p className="text-white font-semibold flex items-center justify-end">
                        <IndianRupee className="w-4 h-4" />
                        {item.price}
                      </p>
                      <p className="text-sm text-gray-400">
                        ₹{item.price * item.quantity} total
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </motion.div>

            {/* Shipping Address */}
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="bg-gradient-to-br from-zinc-900/50 to-black/50 rounded-xl border border-zinc-800/50 p-6"
            >
              <h2 className="text-xl font-bold text-white mb-6">Shipping Address</h2>
              
              <div className="flex items-start gap-3 p-4 bg-zinc-800/30 rounded-lg">
                <MapPin className="w-5 h-5 text-red-500 mt-1 flex-shrink-0" />
                <div>
                  <p className="text-white font-medium mb-2">Delivery Address</p>
                  <p className="text-gray-400 text-sm leading-relaxed">
                    {order.shippingAddress?.street && `${order.shippingAddress.street},`}<br />
                    {order.shippingAddress?.city && `${order.shippingAddress.city}, `}
                    {order.shippingAddress?.state && `${order.shippingAddress.state} `}
                    {order.shippingAddress?.pincode && `- ${order.shippingAddress.pincode}`}<br />
                    {order.shippingAddress?.country && order.shippingAddress.country}
                  </p>
                </div>
              </div>
            </motion.div>
          </div>

          {/* Right Column - Order Summary */}
          <div className="lg:col-span-1 space-y-6">
            {/* Payment Information */}
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="bg-gradient-to-br from-zinc-900/50 to-black/50 rounded-xl border border-zinc-800/50 p-6"
            >
              <h2 className="text-lg font-bold text-white mb-4">Payment Details</h2>
              
              <div className="space-y-3">
                <div className="flex items-center justify-between text-sm">
                  <span className="text-gray-400">Payment Status</span>
                  <span className={`font-semibold ${
                    order.paymentStatus === 'paid' ? 'text-green-500' : 'text-yellow-500'
                  }`}>
                    {order.paymentStatus === 'paid' ? 'Paid' : 'Pending'}
                  </span>
                </div>
                <div className="flex items-center justify-between text-sm">
                  <span className="text-gray-400">Payment Method</span>
                  <span className="text-white font-medium">Online</span>
                </div>
              </div>
            </motion.div>

            {/* Order Summary */}
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
              className="bg-gradient-to-br from-zinc-900/50 to-black/50 rounded-xl border border-zinc-800/50 p-6"
            >
              <h2 className="text-lg font-bold text-white mb-4">Order Summary</h2>
              
              <div className="space-y-3">
                <div className="flex items-center justify-between text-sm">
                  <span className="text-gray-400">Subtotal</span>
                  <span className="text-white flex items-center">
                    <IndianRupee className="w-3 h-3" />
                    {order.totalAmount}
                  </span>
                </div>
                <div className="flex items-center justify-between text-sm">
                  <span className="text-gray-400">Shipping</span>
                  <span className="text-green-500 font-medium">FREE</span>
                </div>
                <div className="flex items-center justify-between text-sm">
                  <span className="text-gray-400">Tax</span>
                  <span className="text-white flex items-center">
                    <IndianRupee className="w-3 h-3" />
                    0
                  </span>
                </div>
                <div className="pt-3 border-t border-zinc-700/50">
                  <div className="flex items-center justify-between">
                    <span className="text-white font-semibold">Total</span>
                    <span className="text-2xl font-bold text-white flex items-center">
                      <IndianRupee className="w-5 h-5" />
                      {order.totalAmount}
                    </span>
                  </div>
                </div>
              </div>
            </motion.div>

            {/* Need Help */}
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 }}
              className="bg-gradient-to-br from-red-900/20 to-black/50 rounded-xl border border-red-800/30 p-6"
            >
              <h2 className="text-lg font-bold text-white mb-4">Need Help?</h2>
              
              <div className="space-y-3">
                <a href="mailto:support@carehub.com" className="flex items-center gap-3 text-gray-400 hover:text-white transition-colors cursor-pointer">
                  <Mail className="w-4 h-4 text-red-500" />
                  <span className="text-sm">support@carehub.com</span>
                </a>
                <a href="tel:+911234567890" className="flex items-center gap-3 text-gray-400 hover:text-white transition-colors cursor-pointer">
                  <Phone className="w-4 h-4 text-red-500" />
                  <span className="text-sm">+91 123 456 7890</span>
                </a>
              </div>
            </motion.div>
          </div>
        </div>
      </div>

      {/* Cancel Order Modal */}
      {showCancelModal && (
        <div className="fixed inset-0 bg-black/80 backdrop-blur-sm flex items-center justify-center z-50 p-4">
          <motion.div 
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            className="bg-zinc-900 rounded-xl border border-zinc-800 p-6 max-w-md w-full"
          >
            <div className="flex items-center gap-3 mb-4">
              <div className="w-12 h-12 rounded-full bg-red-600/10 flex items-center justify-center">
                <X className="w-6 h-6 text-red-500" />
              </div>
              <div>
                <h3 className="text-xl font-bold text-white">Cancel Order</h3>
                <p className="text-sm text-gray-400">Order #{order._id.slice(-8).toUpperCase()}</p>
              </div>
            </div>
            
            <p className="text-gray-400 mb-6">
              Are you sure you want to cancel this order? This action cannot be undone.
            </p>
            
            <div className="flex gap-3">
              <button
                onClick={() => setShowCancelModal(false)}
                className="flex-1 px-4 py-2.5 bg-zinc-800 hover:bg-zinc-700 text-white font-semibold rounded-lg transition-all cursor-pointer"
              >
                Keep Order
              </button>
              <button
                onClick={confirmCancelOrder}
                className="flex-1 px-4 py-2.5 bg-red-600 hover:bg-red-700 text-white font-semibold rounded-lg transition-all cursor-pointer"
              >
                Yes, Cancel
              </button>
            </div>
          </motion.div>
        </div>
      )}
    </div>
  );
}