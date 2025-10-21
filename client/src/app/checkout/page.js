"use client";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";

export default function CheckoutPage() {
  const [cartItems, setCartItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [updatingItem, setUpdatingItem] = useState({});
  const [deletingItem, setDeletingItem] = useState({});
  const [clearingCart, setClearingCart] = useState(false);

  const BACKEND_URL = process.env.NEXT_PUBLIC_BACKEND_URL;
  const router = useRouter();

  // Fetch cart on mount
  useEffect(() => {
    fetchCart();
  }, []);

  // Fetch user's cart
  const fetchCart = async () => {
    try {
      setLoading(true);
      const response = await fetch(`${BACKEND_URL}/api/cart`, {
        credentials: 'include',
        headers: {
          'Content-Type': 'application/json'
        }
      });

      if (!response.ok) {
        throw new Error('Failed to fetch cart');
      }

      const data = await response.json();
      setCartItems(data.items || []);
      setError(null);
    } catch (err) {
      console.error('Error fetching cart:', err);
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  // Update quantity by removing and re-adding
  const updateQuantity = async (productId, newQuantity) => {
    if (newQuantity < 1) return;

    setUpdatingItem(prev => ({ ...prev, [productId]: true }));

    try {
      // First remove the item
      await fetch(`${BACKEND_URL}/api/cart/remove`, {
        method: 'DELETE',
        credentials: 'include',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ productId })
      });

      // Then add it back with new quantity
      const response = await fetch(`${BACKEND_URL}/api/cart/add`, {
        method: 'POST',
        credentials: 'include',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          productId,
          quantity: newQuantity
        })
      });

      if (!response.ok) {
        throw new Error('Failed to update quantity');
      }

      const data = await response.json();
      setCartItems(data.items || []);
    } catch (err) {
      console.error('Error updating quantity:', err);
      alert('Failed to update quantity. Please try again.');
      // Refresh cart to get current state
      fetchCart();
    } finally {
      setUpdatingItem(prev => ({ ...prev, [productId]: false }));
    }
  };

  // Remove item from cart
  const removeItem = async (productId) => {
    setDeletingItem(prev => ({ ...prev, [productId]: true }));

    try {
      const response = await fetch(`${BACKEND_URL}/api/cart/remove`, {
        method: 'DELETE',
        credentials: 'include',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ productId })
      });

      if (!response.ok) {
        throw new Error('Failed to remove item');
      }

      const data = await response.json();
      setCartItems(data.items || []);
    } catch (err) {
      console.error('Error removing item:', err);
      alert('Failed to remove item. Please try again.');
    } finally {
      setDeletingItem(prev => ({ ...prev, [productId]: false }));
    }
  };

  // Clear entire cart
  const clearCart = async () => {
    if (!confirm('Are you sure you want to clear your entire cart?')) return;

    setClearingCart(true);

    try {
      const response = await fetch(`${BACKEND_URL}/api/cart/clear`, {
        method: 'DELETE',
        credentials: 'include',
        headers: {
          'Content-Type': 'application/json'
        }
      });

      if (!response.ok) {
        throw new Error('Failed to clear cart');
      }

      setCartItems([]);
    } catch (err) {
      console.error('Error clearing cart:', err);
      alert('Failed to clear cart. Please try again.');
    } finally {
      setClearingCart(false);
    }
  };

  // Calculate totals
  const calculateSubtotal = () => {
    return cartItems.reduce((total, item) => {
      const price = item.product?.price || 0;
      return total + (price * item.quantity);
    }, 0);
  };

  const calculateTax = () => {
    return calculateSubtotal() * 0.18; // 18% GST
  };

  const calculateTotal = () => {
    return calculateSubtotal() + calculateTax();
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-black flex items-center justify-center">
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-red-500 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-white text-lg">Loading your cart...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-black flex items-center justify-center">
        <div className="text-center">
          <p className="text-red-500 text-lg mb-4">Error: {error}</p>
          <button 
            onClick={() => window.location.reload()}
            className="px-6 py-2 bg-red-600 text-white rounded-full hover:bg-red-700 transition-colors"
          >
            Retry
          </button>
        </div>
      </div>
    );
  }

  if (cartItems.length === 0) {
    return (
      <div className="min-h-screen bg-black">
        {/* Empty Cart */}
        <div className="flex items-center justify-center" style={{ minHeight: 'calc(100vh - 100px)' }}>
          <div className="text-center">
            <div className="w-32 h-32 mx-auto mb-6 bg-gray-900 rounded-full flex items-center justify-center">
              <svg className="w-16 h-16 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
              </svg>
            </div>
            <h2 className="text-2xl font-bold text-white mb-2" style={{ fontFamily: 'Poppins, sans-serif' }}>
              Your cart is empty
            </h2>
            <p className="text-gray-400 mb-6" style={{ fontFamily: 'Inter, sans-serif' }}>
              Add some products to get started
            </p>
            <button 
              onClick={() => router.push("/carehub/products")}
              className="px-8 py-3 bg-gradient-to-r from-red-500 to-red-600 text-white font-semibold rounded-full hover:shadow-lg hover:shadow-red-500/50 transform hover:scale-105 transition-all duration-300"
            >
              Continue Shopping
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-black">
      {/* Header */}
      <div className="border-b border-gray-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="flex items-center justify-between">
            <h1 className="text-3xl font-bold text-white" style={{ fontFamily: 'Poppins, sans-serif' }}>
              Shopping Cart
              <span className="text-red-500 text-lg ml-3">({cartItems.length} {cartItems.length === 1 ? 'item' : 'items'})</span>
            </h1>
            <button 
              onClick={() => window.location.href = '/'}
              className="text-gray-400 hover:text-white transition-colors"
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Cart Items */}
          <div className="lg:col-span-2">
            <div className="bg-gradient-to-br from-zinc-900 to-black border-2 border-red-900/30 rounded-2xl p-6">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-xl font-bold text-white" style={{ fontFamily: 'Poppins, sans-serif' }}>
                  Cart Items
                </h2>
                <button
                  onClick={clearCart}
                  disabled={clearingCart}
                  className="text-red-500 hover:text-red-400 text-sm font-semibold transition-colors disabled:opacity-50"
                >
                  {clearingCart ? 'Clearing...' : 'Clear All'}
                </button>
              </div>

              <div className="space-y-4">
                {cartItems.map((item) => (
                  <div
                    key={item.product?._id || item._id}
                    className="bg-black/50 border border-gray-800 rounded-xl p-4 hover:border-red-900/50 transition-colors"
                  >
                    <div className="flex gap-4">
                      {/* Product Image */}
                      <div className="w-24 h-24 flex-shrink-0 bg-gray-800 rounded-lg overflow-hidden">
                        <img
                          src={item.product?.image || 'https://images.unsplash.com/photo-1544787219-7f47ccb76574?w=200&h=200&fit=crop'}
                          alt={item.product?.name || 'Product'}
                          className="w-full h-full object-cover"
                        />
                      </div>

                      {/* Product Info */}
                      <div className="flex-1">
                        <div className="flex justify-between">
                          <div>
                            <h3 className="text-lg font-bold text-white mb-1" style={{ fontFamily: 'Poppins, sans-serif' }}>
                              {item.product?.name || 'Product Name'}
                            </h3>
                            <p className="text-sm text-gray-400 mb-2" style={{ fontFamily: 'Inter, sans-serif' }}>
                              {item.product?.description || 'Product description'}
                            </p>
                            <div className="text-xl font-bold text-red-500">
                              ₹{item.product?.price || 0}
                            </div>
                          </div>

                          {/* Delete Button */}
                          <button
                            onClick={() => removeItem(item.product?._id)}
                            disabled={deletingItem[item.product?._id]}
                            className="text-gray-400 hover:text-red-500 transition-colors h-fit disabled:opacity-50"
                          >
                            {deletingItem[item.product?._id] ? (
                              <div className="w-5 h-5 border-2 border-gray-400 border-t-transparent rounded-full animate-spin"></div>
                            ) : (
                              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                              </svg>
                            )}
                          </button>
                        </div>

                        {/* Quantity Controls */}
                        <div className="flex items-center gap-3 mt-4">
                          <span className="text-sm text-gray-400">Quantity:</span>
                          <div className="flex items-center gap-2 bg-gray-900 rounded-full border border-gray-700">
                            <button
                              onClick={() => updateQuantity(item.product?._id, item.quantity - 1)}
                              disabled={item.quantity <= 1 || updatingItem[item.product?._id]}
                              className="w-8 h-8 flex items-center justify-center text-white hover:text-red-500 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                            >
                              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20 12H4" />
                              </svg>
                            </button>
                            <span className="text-white font-semibold w-8 text-center">
                              {updatingItem[item.product?._id] ? '...' : item.quantity}
                            </span>
                            <button
                              onClick={() => updateQuantity(item.product?._id, item.quantity + 1)}
                              disabled={updatingItem[item.product?._id]}
                              className="w-8 h-8 flex items-center justify-center text-white hover:text-red-500 transition-colors disabled:opacity-50"
                            >
                              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
                              </svg>
                            </button>
                          </div>
                          <span className="text-sm text-gray-400 ml-auto">
                            Subtotal: <span className="text-white font-bold">₹{((item.product?.price || 0) * item.quantity).toFixed(2)}</span>
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Order Summary */}
          <div className="lg:col-span-1">
            <div className="bg-gradient-to-br from-zinc-900 to-black border-2 border-red-900/30 rounded-2xl p-6 relative">
              <h2 className="text-xl font-bold text-white mb-6" style={{ fontFamily: 'Poppins, sans-serif' }}>
                Order Summary
              </h2>

              <div className="space-y-4 mb-6">
                <div className="flex justify-between text-gray-400">
                  <span>Subtotal</span>
                  <span className="text-white font-semibold">₹{calculateSubtotal().toFixed(2)}</span>
                </div>
                <div className="flex justify-between text-gray-400">
                  <span>Tax (18% GST)</span>
                  <span className="text-white font-semibold">₹{calculateTax().toFixed(2)}</span>
                </div>
                <div className="flex justify-between text-gray-400">
                  <span>Shipping</span>
                  <span className="text-green-500 font-semibold">FREE</span>
                </div>
                <div className="border-t border-gray-700 pt-4">
                  <div className="flex justify-between text-lg">
                    <span className="text-white font-bold">Total</span>
                    <span className="text-red-500 font-bold text-2xl">₹{calculateTotal().toFixed(2)}</span>
                  </div>
                </div>
              </div>

              {/* Checkout Button */}
              <button className="w-full py-4 bg-gradient-to-r from-red-500 to-red-600 text-white font-bold rounded-full hover:shadow-lg hover:shadow-red-500/50 transform hover:scale-105 transition-all duration-300 mb-3">
                Proceed to Checkout
              </button>

              {/* Continue Shopping */}
              <button 
                onClick={() => router.push("/carehub")}
                className="w-full py-4 bg-transparent border-2 border-red-600 text-white font-semibold rounded-full hover:bg-red-600 transition-all duration-300"
              >
                Continue Shopping
              </button>

              {/* Features */}
              <div className="mt-6 pt-6 border-t border-gray-800 space-y-3">
                <div className="flex items-center gap-3 text-sm text-gray-400">
                  <svg className="w-5 h-5 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                  <span>Secure Checkout</span>
                </div>
                <div className="flex items-center gap-3 text-sm text-gray-400">
                  <svg className="w-5 h-5 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                  <span>Free Shipping</span>
                </div>
                <div className="flex items-center gap-3 text-sm text-gray-400">
                  <svg className="w-5 h-5 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                  <span>Easy Returns</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}