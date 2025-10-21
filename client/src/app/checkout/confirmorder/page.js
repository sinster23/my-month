"use client";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";

export default function ConfirmOrderPage() {
  const [user, setUser] = useState(null);
  const [cartItems, setCartItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [editingAddress, setEditingAddress] = useState(false);
  const [paymentMethod, setPaymentMethod] = useState("cod");
  const [placingOrder, setPlacingOrder] = useState(false);
  const [orderSuccess, setOrderSuccess] = useState(null);
  
  const [addressForm, setAddressForm] = useState({
    street: "",
    city: "",
    state: "",
    pinCode: "",
    country: "India"
  });

  const BACKEND_URL = process.env.NEXT_PUBLIC_BACKEND_URL;
  const router = useRouter();

  useEffect(() => {
    fetchUserAndCart();
  }, []);

  const fetchUserAndCart = async () => {
    try {
      setLoading(true);
      
      // Fetch user profile
      const userResponse = await fetch(`${BACKEND_URL}/api/auth/me`, {
        credentials: 'include',
        headers: { 'Content-Type': 'application/json' }
      });
      
      if (userResponse.ok) {
        const userData = await userResponse.json();
        setUser(userData);
        
        // Initialize address form with existing data
        if (userData.address) {
          setAddressForm({
            street: userData.address.street || "",
            city: userData.address.city || "",
            state: userData.address.state || "",
            pinCode: userData.address.pinCode || "",
            country: userData.address.country || "India"
          });
        } else {
          setEditingAddress(true); // Auto-show form if no address
        }
      }

      // Fetch cart
      const cartResponse = await fetch(`${BACKEND_URL}/api/cart`, {
        credentials: 'include',
        headers: { 'Content-Type': 'application/json' }
      });

      if (cartResponse.ok) {
        const cartData = await cartResponse.json();
        setCartItems(cartData.items || []);
      }
    } catch (err) {
      console.error('Error fetching data:', err);
      alert('Failed to load order details');
    } finally {
      setLoading(false);
    }
  };

  const handleAddressChange = (e) => {
    setAddressForm({
      ...addressForm,
      [e.target.name]: e.target.value
    });
  };

  const saveAddress = async () => {
    try {
      const response = await fetch(`${BACKEND_URL}/api/profile/address`, {
        method: 'PUT',
        credentials: 'include',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(addressForm)
      });

      if (!response.ok) {
        throw new Error('Failed to save address');
      }

      const data = await response.json();
      setUser(data.user);
      setEditingAddress(false);
      alert('Address saved successfully!');
    } catch (err) {
      console.error('Error saving address:', err);
      alert('Failed to save address. Please try again.');
    }
  };

  const calculateSubtotal = () => {
    return cartItems.reduce((total, item) => {
      return total + (item.product?.price || 0) * item.quantity;
    }, 0);
  };

  const calculateTax = () => {
    return calculateSubtotal() * 0.18;
  };

  const calculateTotal = () => {
    return calculateSubtotal() + calculateTax();
  };

  const placeOrder = async () => {
    // Validation
    if (!user?.address?.street || !user?.address?.city) {
      alert('Please add your delivery address before placing the order.');
      setEditingAddress(true);
      return;
    }

    if (cartItems.length === 0) {
      alert('Your cart is empty!');
      return;
    }

    setPlacingOrder(true);

    try {
      const orderData = {
        items: cartItems.map(item => ({
          productId: item.product._id,
          name: item.product.name,
          quantity: item.quantity,
          price: item.product.price
        })),
        shippingAddress: {
          street: user.address.street,
          city: user.address.city,
          state: user.address.state,
          pincode: user.address.pinCode,
          country: user.address.country
        },
        totalAmount: calculateTotal()
      };

      const response = await fetch(`${BACKEND_URL}/api/orders`, {
        method: 'POST',
        credentials: 'include',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(orderData)
      });

      if (!response.ok) {
        throw new Error('Failed to place order');
      }

      const data = await response.json();
      
      // Clear cart after successful order
      await fetch(`${BACKEND_URL}/api/cart/clear`, {
        method: 'DELETE',
        credentials: 'include'
      });

      // Show success modal
      setOrderSuccess(data.order);
    } catch (err) {
      console.error('Error placing order:', err);
      alert('Failed to place order. Please try again.');
    } finally {
      setPlacingOrder(false);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-black flex items-center justify-center">
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-red-500 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-white text-lg">Loading order details...</p>
        </div>
      </div>
    );
  }

  const hasAddress = user?.address?.street && user?.address?.city;

  return (
    <div className="min-h-screen bg-black">
      {/* Success Modal */}
      {orderSuccess && (
        <div className="fixed inset-0 bg-black/80 backdrop-blur-sm flex items-center justify-center z-50 p-4">
          <div className="bg-gradient-to-br from-zinc-900 to-black border-2 border-red-500/50 rounded-2xl p-8 max-w-md w-full shadow-2xl shadow-red-500/20 animate-scale-in">
            <div className="text-center">
              {/* Success Icon */}
                <img src={"/confirmed.gif"} alt="Success" 
                className="w-20 h-20 flex items-center justify-center mx-auto mb-6 " />

              {/* Success Message */}
              <h2 className="text-2xl font-bold text-white mb-3" style={{ fontFamily: 'Poppins, sans-serif' }}>
                Order Placed Successfully! 🎉
              </h2>
              <p className="text-gray-400 mb-2" style={{ fontFamily: 'Inter, sans-serif' }}>
                Your order has been confirmed and is being processed.
              </p>
              
              {/* Order ID */}
              <div className="bg-black/50 border border-gray-800 rounded-lg p-4 mb-6">
                <p className="text-gray-400 text-sm mb-1">Order ID</p>
                <p className="text-white font-mono font-bold text-lg">#{orderSuccess._id.slice(-8).toUpperCase()}</p>
              </div>

              {/* Action Buttons */}
              <button
                onClick={() => router.push('/carehub/products')}
                className="w-full py-3 bg-gradient-to-r from-red-500 to-red-600 text-white font-bold rounded-full hover:shadow-lg hover:shadow-red-500/50 transform hover:scale-105 transition-all duration-300 mb-3"
              >
                Continue Shopping
              </button>
              <button
                onClick={() => router.push('/profile')}
                className="w-full py-3 bg-transparent border-2 border-red-600 text-white font-semibold rounded-full hover:bg-red-600 transition-all duration-300"
              >
                View Orders
              </button>

              {/* Info */}
              <p className="text-gray-500 text-xs mt-4">
                You will receive order updates via email
              </p>
            </div>
          </div>
        </div>
      )}

      {/* Header */}
      <div className="border-b border-gray-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <h1 className="text-3xl font-bold text-white" style={{ fontFamily: 'Poppins, sans-serif' }}>
            Confirm Your Order
          </h1>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Left Column - Address & Products */}
          <div className="lg:col-span-2 space-y-6">
            
            {/* Delivery Address Section */}
            <div className="bg-gradient-to-br from-zinc-900 to-black border-2 border-red-900/30 rounded-2xl p-6">
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-xl font-bold text-white flex items-center gap-2" style={{ fontFamily: 'Poppins, sans-serif' }}>
                  <svg className="w-6 h-6 text-red-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                  </svg>
                  Delivery Address
                </h2>
                {hasAddress && !editingAddress && (
                  <button
                    onClick={() => setEditingAddress(true)}
                    className="text-red-500 hover:text-red-400 text-sm font-semibold transition-colors"
                  >
                    Edit
                  </button>
                )}
              </div>

              {!hasAddress && !editingAddress ? (
                <div className="text-center py-8">
                  <p className="text-gray-400 mb-4">No delivery address found</p>
                  <button
                    onClick={() => setEditingAddress(true)}
                    className="px-6 py-2 bg-red-600 text-white rounded-full hover:bg-red-700 transition-colors"
                  >
                    Add Address
                  </button>
                </div>
              ) : editingAddress ? (
                <div className="space-y-4">
                  <input
                    type="text"
                    name="street"
                    placeholder="Street Address"
                    value={addressForm.street}
                    onChange={handleAddressChange}
                    className="w-full px-4 py-3 bg-black border border-gray-700 rounded-lg text-white focus:border-red-500 focus:outline-none"
                  />
                  <div className="grid grid-cols-2 gap-4">
                    <input
                      type="text"
                      name="city"
                      placeholder="City"
                      value={addressForm.city}
                      onChange={handleAddressChange}
                      className="px-4 py-3 bg-black border border-gray-700 rounded-lg text-white focus:border-red-500 focus:outline-none"
                    />
                    <input
                      type="text"
                      name="state"
                      placeholder="State"
                      value={addressForm.state}
                      onChange={handleAddressChange}
                      className="px-4 py-3 bg-black border border-gray-700 rounded-lg text-white focus:border-red-500 focus:outline-none"
                    />
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <input
                      type="text"
                      name="pinCode"
                      placeholder="PIN Code"
                      value={addressForm.pinCode}
                      onChange={handleAddressChange}
                      className="px-4 py-3 bg-black border border-gray-700 rounded-lg text-white focus:border-red-500 focus:outline-none"
                    />
                    <input
                      type="text"
                      name="country"
                      placeholder="Country"
                      value={addressForm.country}
                      onChange={handleAddressChange}
                      className="px-4 py-3 bg-black border border-gray-700 rounded-lg text-white focus:border-red-500 focus:outline-none"
                    />
                  </div>
                  <div className="flex gap-3">
                    <button
                      onClick={saveAddress}
                      className="flex-1 py-3 bg-red-600 text-white font-semibold rounded-lg hover:bg-red-700 transition-colors"
                    >
                      Save Address
                    </button>
                    {hasAddress && (
                      <button
                        onClick={() => setEditingAddress(false)}
                        className="px-6 py-3 bg-gray-800 text-white rounded-lg hover:bg-gray-700 transition-colors"
                      >
                        Cancel
                      </button>
                    )}
                  </div>
                </div>
              ) : (
                <div className="bg-black/50 border border-gray-800 rounded-lg p-4">
                  <p className="text-white font-semibold mb-1">{user?.name}</p>
                  <p className="text-gray-300">{user?.address?.street}</p>
                  <p className="text-gray-300">
                    {user?.address?.city}, {user?.address?.state} - {user?.address?.pinCode}
                  </p>
                  <p className="text-gray-300">{user?.address?.country}</p>
                  {user?.phone && (
                    <p className="text-gray-400 mt-2">Phone: {user.phone}</p>
                  )}
                </div>
              )}
            </div>

            {/* Order Items */}
            <div className="bg-gradient-to-br from-zinc-900 to-black border-2 border-red-900/30 rounded-2xl p-6">
              <h2 className="text-xl font-bold text-white mb-4 flex items-center gap-2" style={{ fontFamily: 'Poppins, sans-serif' }}>
                <svg className="w-6 h-6 text-red-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
                </svg>
                Order Items ({cartItems.length})
              </h2>
              
              <div className="space-y-3">
                {cartItems.map((item) => (
                  <div key={item.product?._id} className="flex gap-4 bg-black/50 border border-gray-800 rounded-lg p-3">
                    <img
                      src={item.product?.image || 'https://images.unsplash.com/photo-1544787219-7f47ccb76574?w=100&h=100&fit=crop'}
                      alt={item.product?.name}
                      className="w-16 h-16 rounded-lg object-cover"
                    />
                    <div className="flex-1">
                      <h3 className="text-white font-semibold">{item.product?.name}</h3>
                      <p className="text-gray-400 text-sm">Qty: {item.quantity}</p>
                    </div>
                    <div className="text-right">
                      <p className="text-white font-bold">₹{item.product?.price}</p>
                      <p className="text-gray-400 text-sm">₹{(item.product?.price * item.quantity).toFixed(2)}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Payment Method */}
            <div className="bg-gradient-to-br from-zinc-900 to-black border-2 border-red-900/30 rounded-2xl p-6">
              <h2 className="text-xl font-bold text-white mb-4 flex items-center gap-2" style={{ fontFamily: 'Poppins, sans-serif' }}>
                <svg className="w-6 h-6 text-red-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 10h18M7 15h1m4 0h1m-7 4h12a3 3 0 003-3V8a3 3 0 00-3-3H6a3 3 0 00-3 3v8a3 3 0 003 3z" />
                </svg>
                Payment Method
              </h2>

              <div className="space-y-3">
                <label className="flex items-center gap-3 bg-black/50 border-2 border-gray-800 rounded-lg p-4 cursor-pointer hover:border-red-600 transition-colors">
                  <input
                    type="radio"
                    name="payment"
                    value="cod"
                    checked={paymentMethod === "cod"}
                    onChange={(e) => setPaymentMethod(e.target.value)}
                    className="w-5 h-5 text-red-600"
                  />
                  <div className="flex-1">
                    <p className="text-white font-semibold">Cash on Delivery</p>
                    <p className="text-gray-400 text-sm">Pay when you receive your order</p>
                  </div>
                </label>

                <label className="flex items-center gap-3 bg-black/50 border-2 border-gray-800 rounded-lg p-4 cursor-not-allowed opacity-50">
                  <input
                    type="radio"
                    name="payment"
                    value="online"
                    disabled
                    className="w-5 h-5 text-red-600"
                  />
                  <div className="flex-1">
                    <p className="text-white font-semibold">Online Payment</p>
                    <p className="text-gray-400 text-sm">Coming Soon - UPI, Cards, Net Banking</p>
                  </div>
                </label>
              </div>
            </div>
          </div>

          {/* Right Column - Order Summary */}
          <div className="lg:col-span-1">
            <div className="bg-gradient-to-br from-zinc-900 to-black border-2 border-red-900/30 rounded-2xl p-6 sticky top-4">
              <h2 className="text-xl font-bold text-white mb-6" style={{ fontFamily: 'Poppins, sans-serif' }}>
                Order Summary
              </h2>

              <div className="space-y-4 mb-6">
                <div className="flex justify-between text-gray-400">
                  <span>Subtotal ({cartItems.length} items)</span>
                  <span className="text-white font-semibold">₹{calculateSubtotal().toFixed(2)}</span>
                </div>
                <div className="flex justify-between text-gray-400">
                  <span>Tax (GST 18%)</span>
                  <span className="text-white font-semibold">₹{calculateTax().toFixed(2)}</span>
                </div>
                <div className="flex justify-between text-gray-400">
                  <span>Delivery Charges</span>
                  <span className="text-green-500 font-semibold">FREE</span>
                </div>
                <div className="border-t border-gray-700 pt-4">
                  <div className="flex justify-between">
                    <span className="text-white font-bold text-lg">Total Amount</span>
                    <span className="text-red-500 font-bold text-2xl">₹{calculateTotal().toFixed(2)}</span>
                  </div>
                </div>
              </div>

              <button
                onClick={placeOrder}
                disabled={placingOrder || !hasAddress}
                className="w-full py-4 bg-gradient-to-r from-red-500 to-red-600 text-white font-bold rounded-full hover:shadow-lg hover:shadow-red-500/50 transform hover:scale-105 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none mb-3"
              >
                {placingOrder ? (
                  <span className="flex items-center justify-center gap-2">
                    <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                    Placing Order...
                  </span>
                ) : (
                  'Confirm & Place Order'
                )}
              </button>

              <button
                onClick={() => router.push("/carehub/checkout")}
                className="w-full py-3 bg-transparent border-2 border-gray-700 text-white rounded-full hover:border-red-600 transition-all duration-300"
              >
                Back to Cart
              </button>

              {!hasAddress && (
                <p className="text-yellow-500 text-sm text-center mt-4">
                  ⚠️ Please add delivery address to proceed
                </p>
              )}

              <div className="mt-6 pt-6 border-t border-gray-800 space-y-3">
                <div className="flex items-center gap-3 text-sm text-gray-400">
                  <svg className="w-5 h-5 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                  <span>100% Secure Payment</span>
                </div>
                <div className="flex items-center gap-3 text-sm text-gray-400">
                  <svg className="w-5 h-5 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                  <span>Easy Returns & Refunds</span>
                </div>
                <div className="flex items-center gap-3 text-sm text-gray-400">
                  <svg className="w-5 h-5 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                  <span>24/7 Customer Support</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}