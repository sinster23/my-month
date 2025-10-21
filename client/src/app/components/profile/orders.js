import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ShoppingBag, Package, Truck, CheckCircle, Clock, ChevronRight, IndianRupee } from "lucide-react";
import { useRouter } from "next/navigation";

export default function OrderTab() {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const BACKEND_URL = process.env.NEXT_PUBLIC_BACKEND_URL || "http://localhost:5000";

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

  useEffect(() => {
    fetchOrders();
  }, []);

  const fetchOrders = async () => {
    try {
      setLoading(true);
      const response = await fetch(`${BACKEND_URL}/api/orders/my-orders`, {
        credentials: 'include'
      });

      if (response.ok) {
        const data = await response.json();
        setOrders(data);
      } else {
        setError("Failed to fetch orders");
      }
    } catch (err) {
      console.error('Error fetching orders:', err);
      setError("An error occurred while fetching orders");
    } finally {
      setLoading(false);
    }
  };

  const getStatusColor = (status) => {
    switch (status.toLowerCase()) {
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

  const getStatusIcon = (status) => {
    switch (status.toLowerCase()) {
      case 'processing':
        return <Package className="w-4 h-4" />;
      case 'shipped':
        return <Truck className="w-4 h-4" />;
      case 'delivered':
        return <CheckCircle className="w-4 h-4" />;
      default:
        return <Clock className="w-4 h-4" />;
    }
  };

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', { 
      year: 'numeric', 
      month: 'short', 
      day: 'numeric' 
    });
  };

  const router = useRouter();

  const handleViewDetails = (orderId) => {
    // Navigate to order details page
    router.push(`/orders/${orderId}`);
  };

  if (loading) {
    return (
      <motion.div
        key="orders-loading"
        variants={contentVariants}
        initial="initial"
        animate="animate"
        exit="exit"
        className="flex flex-col items-center justify-center h-full py-16"
      >
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-red-600 mb-4"></div>
        <p className="text-gray-400">Loading your orders...</p>
      </motion.div>
    );
  }

  if (error) {
    return (
      <motion.div
        key="orders-error"
        variants={contentVariants}
        initial="initial"
        animate="animate"
        exit="exit"
        className="flex flex-col items-center justify-center h-full py-16"
      >
        <div className="w-20 h-20 rounded-full bg-red-600/10 flex items-center justify-center mb-6">
          <ShoppingBag className="w-10 h-10 text-red-500" />
        </div>
        <h3 className="text-2xl font-bold text-white mb-3">Error</h3>
        <p className="text-gray-400 text-center max-w-md">{error}</p>
      </motion.div>
    );
  }

  if (orders.length === 0) {
    return (
      <motion.div
        key="orders-empty"
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
        <h3 className="text-2xl font-bold text-white mb-3">No Orders Yet</h3>
        <p className="text-gray-400 text-center max-w-md">
          You haven't placed any orders yet. Start shopping to see your orders here!
        </p>
      </motion.div>
    );
  }

  return (
    <motion.div
      key="orders"
      variants={contentVariants}
      initial="initial"
      animate="animate"
      exit="exit"
      className="space-y-6"
    >
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-2xl font-bold text-white">My Orders</h2>
        <div className="text-sm text-gray-400">
          {orders.length} {orders.length === 1 ? 'Order' : 'Orders'}
        </div>
      </div>

      <div className="space-y-4">
        <AnimatePresence mode="popLayout">
          {orders.map((order, index) => (
            <motion.div
              key={order._id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ delay: index * 0.1 }}
              className="bg-zinc-800/30 border border-zinc-700/50 rounded-xl p-5 hover:bg-zinc-800/50 transition-all duration-300 group"
            >
              {/* Order Header */}
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 rounded-lg bg-red-600/10 flex items-center justify-center">
                    <Package className="w-6 h-6 text-red-500" />
                  </div>
                  <div>
                    <p className="text-white font-semibold">Order #{order._id.slice(-8).toUpperCase()}</p>
                    <p className="text-sm text-gray-400">{formatDate(order.createdAt)}</p>
                  </div>
                </div>
                <div className={`flex items-center gap-2 px-3 py-1.5 rounded-full border text-sm font-medium ${getStatusColor(order.orderStatus)}`}>
                  {getStatusIcon(order.orderStatus)}
                  <span className="capitalize">{order.orderStatus}</span>
                </div>
              </div>

              {/* Order Summary */}
              <div className="flex items-center justify-between py-4 border-y border-zinc-700/50">
                <div>
                  <p className="text-sm text-gray-400 mb-1">
                    {order.items.length} {order.items.length === 1 ? 'Item' : 'Items'}
                  </p>
                  <div className="flex items-center gap-2">
                    <span className="text-xs text-gray-500">Payment:</span>
                    <span className={`text-xs font-medium ${order.paymentStatus === 'paid' ? 'text-green-500' : 'text-yellow-500'}`}>
                      {order.paymentStatus === 'paid' ? 'Paid' : 'Pending'}
                    </span>
                  </div>
                </div>
                <div className="text-right">
                  <p className="text-sm text-gray-400 mb-1">Total Amount</p>
                  <p className="text-xl font-bold text-white flex items-center justify-end">
                    <IndianRupee className="w-5 h-5" />
                    {order.totalAmount}
                  </p>
                </div>
              </div>

              {/* View Details Button */}
              <button
                onClick={() => handleViewDetails(order._id)}
                className="w-fit mt-4 flex items-center justify-between px-4 py-3 bg-zinc-800/50 hover:bg-red-600/10 border border-zinc-700/50 hover:border-red-600/30 rounded-lg transition-all cursor-pointer group"
              >
                <span className="text-white font-medium group-hover:text-red-500 transition-colors">
                  View Order Details
                </span>
                <ChevronRight className="w-5 h-5 text-gray-400 group-hover:text-red-500 group-hover:translate-x-1 transition-all" />
              </button>
            </motion.div>
          ))}
        </AnimatePresence>
      </div>
    </motion.div>
  );
}