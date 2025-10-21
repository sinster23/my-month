"use client";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";

export default function ProductsPage() {
  const [products, setProducts] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [addingToCart, setAddingToCart] = useState({});
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [sortBy, setSortBy] = useState("featured");
  const [searchQuery, setSearchQuery] = useState("");
  const [priceRange, setPriceRange] = useState([0, 10000]);
  const [showLoginModal, setShowLoginModal] = useState(false);
  const [cartItems, setCartItems] = useState([]);
  const [showCartPopup, setShowCartPopup] = useState(false);

  const BACKEND_URL = process.env.NEXT_PUBLIC_BACKEND_URL;
  const router = useRouter();

  // Fetch all products
  useEffect(() => {
    const fetchProducts = async () => {
      try {
        setLoading(true);
        const response = await fetch(`${BACKEND_URL}/api/products`, {
          credentials: "include",
        });

        if (!response.ok) {
          throw new Error("Failed to fetch products");
        }

        const data = await response.json();

        const formattedProducts = data.map((product) => ({
          id: product._id,
          name: product.name,
          description: product.description || "Premium quality product",
          price: product.price,
          discount: product.discount || null,
          rating: product.rating || 4.5,
          reviews: product.reviews || 0,
          image:
            product.image ||
            "https://images.unsplash.com/photo-1544787219-7f47ccb76574?w=600&h=400&fit=crop",
          category: product.category || "Uncategorized",
          stock: product.stock || 0,
        }));

        setProducts(formattedProducts);
        setFilteredProducts(formattedProducts);
        setError(null);
      } catch (err) {
        console.error("Error fetching products:", err);
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, [BACKEND_URL]);

  // Fetch cart on mount
  useEffect(() => {
    fetchCart();
  }, []);

  // Fetch user's cart
  const fetchCart = async () => {
    try {
      const response = await fetch(`${BACKEND_URL}/api/cart`, {
        credentials: 'include',
        headers: {
          'Content-Type': 'application/json'
        }
      });

      if (response.ok) {
        const data = await response.json();
        setCartItems(data.items || []);
        
        if (data.items && data.items.length > 0) {
          setShowCartPopup(true);
        }
      }
    } catch (err) {
      console.error('Error fetching cart:', err);
    }
  };

  // Get unique categories
  const categories = ["All", ...new Set(products.map((p) => p.category))];

  // Filter and sort products
  useEffect(() => {
    let result = [...products];

    // Filter by category
    if (selectedCategory !== "All") {
      result = result.filter((p) => p.category === selectedCategory);
    }

    // Filter by search query
    if (searchQuery) {
      result = result.filter(
        (p) =>
          p.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
          p.description.toLowerCase().includes(searchQuery.toLowerCase())
      );
    }

    // Filter by price range
    result = result.filter(
      (p) => p.price >= priceRange[0] && p.price <= priceRange[1]
    );

    // Sort products
    switch (sortBy) {
      case "price-low":
        result.sort((a, b) => a.price - b.price);
        break;
      case "price-high":
        result.sort((a, b) => b.price - a.price);
        break;
      case "rating":
        result.sort((a, b) => b.rating - a.rating);
        break;
      case "name":
        result.sort((a, b) => a.name.localeCompare(b.name));
        break;
      default:
        break;
    }

    setFilteredProducts(result);
  }, [products, selectedCategory, sortBy, searchQuery, priceRange]);

  // Add to cart
  const handleAddToCart = async (product) => {
    setAddingToCart((prev) => ({ ...prev, [product.id]: true }));

    try {
      const response = await fetch(`${BACKEND_URL}/api/cart/add`, {
        method: "POST",
        credentials: "include",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          productId: product.id,
          quantity: 1,
        }),
      });

      if (!response.ok) {
        const errorData = await response.json();

        if (response.status === 401 || errorData.requiresAuth) {
          setShowLoginModal(true);
          setAddingToCart((prev) => ({ ...prev, [product.id]: false }));
          return;
        }

        throw new Error(errorData.message || "Failed to add to cart");
      }

      const data = await response.json();
      setCartItems(data.items || []);
      setShowCartPopup(true);
    } catch (err) {
      console.error("Error adding to cart:", err);
      alert("Failed to add item to cart. Please try again.");
    } finally {
      setAddingToCart((prev) => ({ ...prev, [product.id]: false }));
    }
  };

  // Calculate total items in cart
  const getTotalItems = () => {
    return cartItems.reduce((total, item) => total + item.quantity, 0);
  };

  // Get cart products for display
  const getCartProducts = () => {
    return cartItems.slice(0, 3);
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-black flex items-center justify-center">
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-red-500 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-white text-lg">Loading products...</p>
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

  return (
    <div className="min-h-screen bg-black">
      {/* Header */}
      <div className="border-b border-gray-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="flex items-center justify-between">
            <div>
              <h1
                className="text-3xl font-bold text-white mb-2"
                style={{ fontFamily: "Poppins, sans-serif" }}
              >
                All Products
              </h1>
              <p
                className="text-gray-400"
                style={{ fontFamily: "Inter, sans-serif" }}
              >
                Showing {filteredProducts.length} of {products.length} products
              </p>
            </div>
            <button
              onClick={() => router.push("/carehub")}
              className="px-6 py-2 bg-red-600 text-white rounded-full hover:bg-red-700 transition-colors"
            >
              Back to CareHub
            </button>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex gap-6">
          {/* Left Sidebar - Amazon Style */}
          <div className="w-64 flex-shrink-0">
            <div className="space-y-6">
              {/* Search Box */}
              <div className="bg-zinc-900 border border-gray-800 rounded-lg p-4">
                <h3 className="text-sm font-bold text-white mb-3">Search</h3>
                <div className="relative">
                  <input
                    type="text"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    placeholder="Search products..."
                    className="w-full px-3 py-2 pr-8 bg-black border border-gray-700 rounded text-white text-sm focus:outline-none focus:border-red-500 transition-colors"
                  />
                  <svg
                    className="w-4 h-4 text-gray-400 absolute right-2 top-1/2 transform -translate-y-1/2"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                    />
                  </svg>
                </div>
              </div>

              {/* Category Filter */}
              <div className="bg-zinc-900 border border-gray-800 rounded-lg p-4">
                <h3 className="text-sm font-bold text-white mb-3">Category</h3>
                <div className="space-y-2">
                  {categories.map((category) => (
                    <label
                      key={category}
                      className="flex items-center cursor-pointer group"
                    >
                      <input
                        type="radio"
                        name="category"
                        checked={selectedCategory === category}
                        onChange={() => setSelectedCategory(category)}
                        className="w-4 h-4 text-red-600 bg-black border-gray-600 focus:ring-red-500 focus:ring-2"
                      />
                      <span className="ml-2 text-sm text-gray-300 group-hover:text-red-400 transition-colors">
                        {category}
                      </span>
                    </label>
                  ))}
                </div>
              </div>

              {/* Price Range Filter */}
              <div className="bg-zinc-900 border border-gray-800 rounded-lg p-4">
                <h3 className="text-sm font-bold text-white mb-3">
                  Price Range
                </h3>
                <div className="space-y-3">
                  <div className="flex items-center justify-between text-sm text-gray-300">
                    <span>₹{priceRange[0]}</span>
                    <span>₹{priceRange[1]}</span>
                  </div>
                  <input
                    type="range"
                    min="0"
                    max="10000"
                    step="100"
                    value={priceRange[1]}
                    onChange={(e) =>
                      setPriceRange([priceRange[0], parseInt(e.target.value)])
                    }
                    className="w-full h-2 bg-gray-700 rounded-lg appearance-none cursor-pointer accent-red-600"
                  />
                  <div className="flex gap-2">
                    <input
                      type="number"
                      value={priceRange[0]}
                      onChange={(e) =>
                        setPriceRange([parseInt(e.target.value) || 0, priceRange[1]])
                      }
                      placeholder="Min"
                      className="w-full px-2 py-1 bg-black border border-gray-700 rounded text-white text-xs focus:outline-none focus:border-red-500"
                    />
                    <input
                      type="number"
                      value={priceRange[1]}
                      onChange={(e) =>
                        setPriceRange([priceRange[0], parseInt(e.target.value) || 10000])
                      }
                      placeholder="Max"
                      className="w-full px-2 py-1 bg-black border border-gray-700 rounded text-white text-xs focus:outline-none focus:border-red-500"
                    />
                  </div>
                </div>
              </div>

              {/* Clear Filters */}
              <button
                onClick={() => {
                  setSelectedCategory("All");
                  setSortBy("featured");
                  setSearchQuery("");
                  setPriceRange([0, 10000]);
                }}
                className="w-full py-2 text-sm text-red-500 hover:text-red-400 transition-colors underline"
              >
                Clear all filters
              </button>
            </div>
          </div>

          {/* Right Content Area */}
          <div className="flex-1">
            {/* Sort Bar */}
            <div className="bg-zinc-900 border border-gray-800 rounded-lg p-4 mb-6 flex items-center justify-between">
              <span className="text-sm text-gray-400">
                {filteredProducts.length} results
              </span>
              <div className="flex items-center gap-2">
                <label className="text-sm text-gray-400">Sort by:</label>
                <select
                  value={sortBy}
                  onChange={(e) => setSortBy(e.target.value)}
                  className="px-3 py-1.5 bg-black border border-gray-700 rounded text-white text-sm focus:outline-none focus:border-red-500 transition-colors"
                >
                  <option value="featured">Featured</option>
                  <option value="price-low">Price: Low to High</option>
                  <option value="price-high">Price: High to Low</option>
                  <option value="rating">Customer Rating</option>
                  <option value="name">Name: A to Z</option>
                </select>
              </div>
            </div>

            {/* Products Grid */}
            {filteredProducts.length === 0 ? (
              <div className="flex items-center justify-center h-96">
                <div className="text-center">
                  <div className="w-32 h-32 mx-auto mb-6 bg-gray-900 rounded-full flex items-center justify-center">
                    <svg
                      className="w-16 h-16 text-gray-600"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M20 13V6a2 2 0 00-2-2H6a2 2 0 00-2 2v7m16 0v5a2 2 0 01-2 2H6a2 2 0 01-2-2v-5m16 0h-2.586a1 1 0 00-.707.293l-2.414 2.414a1 1 0 01-.707.293h-3.172a1 1 0 01-.707-.293l-2.414-2.414A1 1 0 006.586 13H4"
                      />
                    </svg>
                  </div>
                  <h3
                    className="text-2xl font-bold text-white mb-2"
                    style={{ fontFamily: "Poppins, sans-serif" }}
                  >
                    No products found
                  </h3>
                  <p
                    className="text-gray-400 mb-6"
                    style={{ fontFamily: "Inter, sans-serif" }}
                  >
                    Try adjusting your filters
                  </p>
                </div>
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {filteredProducts.map((product) => (
                  <div
                    key={product.id}
                    className="group relative bg-gradient-to-br from-zinc-900 to-black border-2 border-red-900/30 rounded-2xl overflow-hidden hover:border-red-500/50 hover:shadow-2xl hover:shadow-red-900/30 transition-all duration-500"
                  >
                    {/* Discount Badge */}
                    {product.discount && (
                      <div className="absolute top-4 left-4 z-20 bg-red-600 text-white text-xs font-bold px-3 py-1 rounded-full">
                        {product.discount}
                      </div>
                    )}

                    {/* Category Badge */}
                    <div className="absolute top-4 right-4 z-20 bg-black/60 backdrop-blur-sm text-white text-xs font-semibold px-3 py-1 rounded-full border border-red-500/30">
                      {product.category}
                    </div>

                    {/* Stock indicator */}
                    {product.stock <= 0 && (
                      <div className="absolute top-16 right-4 z-20 bg-gray-800 text-white text-xs font-semibold px-3 py-1 rounded-full border border-gray-600">
                        Out of Stock
                      </div>
                    )}

                    {/* Product Image */}
                    <div className="relative h-64 overflow-hidden bg-zinc-800">
                      <img
                        src={product.image}
                        alt={product.name}
                        className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                    </div>

                    {/* Product Info */}
                    <div className="p-6">
                      {/* Rating */}
                      <div className="flex items-center gap-2 mb-3">
                        <div className="flex items-center">
                          {[...Array(5)].map((_, i) => (
                            <svg
                              key={i}
                              className={`w-4 h-4 ${
                                i < Math.floor(product.rating)
                                  ? "text-yellow-400"
                                  : "text-gray-600"
                              }`}
                              fill="currentColor"
                              viewBox="0 0 20 20"
                            >
                              <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                            </svg>
                          ))}
                        </div>
                        <span className="text-xs text-gray-400">
                          {product.reviews} Reviews
                        </span>
                      </div>

                      {/* Product Name */}
                      <h3
                        className="text-lg font-bold text-white mb-2 group-hover:text-red-400 transition-colors"
                        style={{ fontFamily: "Poppins, sans-serif" }}
                      >
                        {product.name}
                      </h3>

                      {/* Description */}
                      <p
                        className="text-sm text-gray-400 mb-4 line-clamp-2"
                        style={{ fontFamily: "Inter, sans-serif" }}
                      >
                        {product.description}
                      </p>

                      {/* Price */}
                      <div
                        className="text-2xl font-bold text-white mb-4"
                        style={{ fontFamily: "Poppins, sans-serif" }}
                      >
                        ₹{product.price}
                      </div>

                      {/* Action Buttons */}
                      <div className="flex gap-2">
                        <button
                          onClick={() => handleAddToCart(product)}
                          disabled={
                            product.stock <= 0 || addingToCart[product.id]
                          }
                          className={`flex-1 py-3 px-4 text-sm font-semibold rounded-full transition-all duration-300 ${
                            product.stock <= 0 || addingToCart[product.id]
                              ? "bg-gray-700 text-gray-400 cursor-not-allowed"
                              : "bg-gradient-to-r from-red-500 to-red-600 text-white hover:shadow-lg hover:shadow-red-500/50 transform hover:scale-105"
                          }`}
                        >
                          {addingToCart[product.id] ? (
                            <span className="flex items-center justify-center gap-2">
                              <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                              Adding...
                            </span>
                          ) : product.stock <= 0 ? (
                            "Out of Stock"
                          ) : (
                            "Add To Cart"
                          )}
                        </button>
                        <button className="w-12 h-12 flex items-center justify-center border-2 border-red-600/50 text-red-500 rounded-full hover:bg-red-600 hover:text-white hover:border-red-600 transition-all duration-300">
                          <svg
                            className="w-5 h-5"
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth={2}
                              d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"
                            />
                          </svg>
                        </button>
                      </div>
                    </div>

                    {/* Hover glow effect */}
                    <div className="absolute inset-0 bg-gradient-to-br from-red-500/0 to-red-600/0 group-hover:from-red-500/10 group-hover:to-red-600/10 transition-all duration-500 pointer-events-none" />
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Cart Popup - Swiggy/Zomato Style */}
      {showCartPopup && cartItems.length > 0 && (
        <div className="fixed bottom-6 left-1/2 transform -translate-x-1/2 z-50 animate-slide-up">
          <div className="bg-gradient-to-r from-red-600 to-red-700 rounded-full shadow-2xl shadow-red-900/50 px-6 py-4 flex items-center gap-4 min-w-[320px] border-2 border-red-400/30">
            {/* Product Images */}
            <div className="flex -space-x-3">
              {getCartProducts().map((item, idx) => (
                <div
                  key={idx}
                  className="w-12 h-12 rounded-full border-3 border-white overflow-hidden bg-white shadow-lg"
                >
                  <img
                    src={
                      item.product?.image ||
                      "https://images.unsplash.com/photo-1544787219-7f47ccb76574?w=100&h=100&fit=crop"
                    }
                    alt="Product"
                    className="w-full h-full object-cover"
                  />
                </div>
              ))}
            </div>

            {/* Cart Info */}
            <div className="flex-1">
              <p className="text-white font-bold text-sm">
                {getTotalItems()} {getTotalItems() === 1 ? "item" : "items"} in cart
              </p>
              <p className="text-red-100 text-xs">
                Added to cart successfully!
              </p>
            </div>

            {/* View Cart Button */}
            <button
              onClick={() => router.push("/checkout")}
              className="bg-white text-red-600 px-6 py-2 rounded-full font-bold text-sm hover:bg-red-50 transition-all duration-300 flex items-center gap-2 shadow-lg"
            >
              View Cart
              <svg
                className="w-4 h-4"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M9 5l7 7-7 7"
                />
              </svg>
            </button>
          </div>
        </div>
      )}

      {/* Login Modal */}
      {showLoginModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 backdrop-blur-sm">
          <div className="relative bg-gradient-to-br from-zinc-900 to-black border-2 border-red-500/30 rounded-2xl p-8 max-w-md w-full mx-4 shadow-2xl shadow-red-900/50 animate-scale-in">
            {/* Close button */}
            <button
              onClick={() => setShowLoginModal(false)}
              className="absolute top-4 right-4 text-gray-400 hover:text-white transition-colors"
            >
              <svg
                className="w-6 h-6"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M6 18L18 6M6 6l12 12"
                />
              </svg>
            </button>

            {/* Icon */}
            <div className="flex justify-center mb-6">
              <div className="w-16 h-16 bg-red-600/20 rounded-full flex items-center justify-center">
                <svg
                  className="w-8 h-8 text-red-500"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z"
                  />
                </svg>
              </div>
            </div>

            {/* Content */}
            <h3
              className="text-2xl font-bold text-white text-center mb-3"
              style={{ fontFamily: "Poppins, sans-serif" }}
            >
              Login Required
            </h3>
            <p
              className="text-gray-300 text-center mb-8"
              style={{ fontFamily: "Inter, sans-serif" }}
            >
              Please login to add items to your cart and enjoy a seamless
              shopping experience.
            </p>

            {/* Buttons */}
            <div className="flex flex-col gap-3">
              <button
                onClick={() => setShowLoginModal(false)}
                className="w-full py-3 px-6 bg-gradient-to-r from-red-500 to-red-600 text-white font-semibold rounded-full hover:shadow-lg hover:shadow-red-500/50 transform hover:scale-105 transition-all duration-300"
              >
                Continue Browsing
              </button>
            </div>
          </div>
        </div>
      )}

      <style jsx>{`
        @keyframes slideUp {
          from {
            transform: translate(-50%, 100%);
            opacity: 0;
          }
          to {
            transform: translate(-50%, 0);
            opacity: 1;
          }
        }
        
        @keyframes scaleIn {
          from {
            transform: scale(0.9);
            opacity: 0;
          }
          to {
            transform: scale(1);
            opacity: 1;
          }
        }

        .animate-slide-up {
          animation: slideUp 0.3s ease-out;
        }

        .animate-scale-in {
          animation: scaleIn 0.3s ease-out;
        }

        input[type="range"]::-webkit-slider-thumb {
          appearance: none;
          width: 16px;
          height: 16px;
          border-radius: 50%;
          background: #dc2626;
          cursor: pointer;
        }

        input[type="range"]::-moz-range-thumb {
          width: 16px;
          height: 16px;
          border-radius: 50%;
          background: #dc2626;
          cursor: pointer;
          border: none;
        }
      `}</style>
    </div>
  );
}