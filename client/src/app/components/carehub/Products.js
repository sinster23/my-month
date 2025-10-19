"use client";
import { useState, useRef } from "react";

export default function ShopSection() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const scrollContainerRef = useRef(null);

  const products = [
    {
      id: 1,
      name: "Herbal Pain Relief Tea",
      description: "Natural blend of chamomile & ginger for cramp relief",
      price: "₹299",
      discount: "SAVE ₹50",
      rating: 4.8,
      reviews: 234,
      image: "https://images.unsplash.com/photo-1544787219-7f47ccb76574?w=600&h=400&fit=crop",
      tag: "Bestseller"
    },
    {
      id: 2,
      name: "Eco-Friendly Pads",
      description: "100% organic cotton, biodegradable & gentle",
      price: "₹399",
      discount: "SAVE ₹100",
      rating: 4.9,
      reviews: 567,
      image: "https://images.unsplash.com/photo-1594824476967-48c8b964273f?w=600&h=400&fit=crop",
      tag: "Bestseller"
    },
    {
      id: 3,
      name: "Menstrual Cup",
      description: "Medical-grade silicone, reusable & eco-conscious",
      price: "₹599",
      discount: "SAVE ₹150",
      rating: 4.7,
      reviews: 423,
      image: "https://images.unsplash.com/photo-1556228720-195a672e8a03?w=600&h=400&fit=crop",
      tag: "Eco Choice"
    },
    {
      id: 4,
      name: "Faith-Aligned Hygiene Kit",
      description: "Curated essentials respecting cultural practices",
      price: "₹799",
      discount: "SAVE ₹200",
      rating: 4.9,
      reviews: 189,
      image: "https://images.unsplash.com/photo-1608571423902-eed4a5ad8108?w=600&h=400&fit=crop",
      tag: "Premium"
    },
    {
      id: 5,
      name: "Comfort Care Bundle",
      description: "Complete period care with heating pad & essentials",
      price: "₹1,299",
      discount: "SAVE ₹300",
      rating: 4.8,
      reviews: 312,
      image: "https://images.unsplash.com/photo-1512069772995-ec65ed45afd6?w=600&h=400&fit=crop",
      tag: "Bundle"
    },
    {
      id: 6,
      name: "Travel Hygiene Pouch",
      description: "Discreet carry bag with all-day protection",
      price: "₹499",
      discount: "SAVE ₹100",
      rating: 4.6,
      reviews: 278,
      image: "https://images.unsplash.com/photo-1590736969955-71cc94901144?w=600&h=400&fit=crop",
      tag: "New"
    }
  ];

  const itemsPerView = 4;
  const maxIndex = Math.max(0, products.length - itemsPerView);

  const scroll = (direction) => {
    if (scrollContainerRef.current) {
      const cardWidth = scrollContainerRef.current.offsetWidth / itemsPerView;
      const scrollAmount = direction === 'left' ? -cardWidth : cardWidth;
      
      scrollContainerRef.current.scrollBy({
        left: scrollAmount,
        behavior: 'smooth'
      });
      
      const newIndex = direction === 'left' 
        ? Math.max(0, currentIndex - 1)
        : Math.min(maxIndex, currentIndex + 1);
      
      setCurrentIndex(newIndex);
    }
  };

  return (
    <section id="shop" className="relative py-24 bg-black overflow-hidden">
      {/* Background decorative elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-1/4 right-10 w-72 h-72 bg-red-900/10 rounded-full blur-3xl" />
        <div className="absolute bottom-1/3 left-10 w-80 h-80 bg-pink-900/10 rounded-full blur-3xl" />
      </div>

      <div className="relative mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header with Navigation */}
        <div className="flex items-end justify-between mb-20">
          <div>
            <div className="inline-block mb-4">
              <span className="text-red-500 text-sm font-semibold tracking-widest uppercase" style={{ fontFamily: 'Poppins, sans-serif' }}>
                Shop By Bestsellers
              </span>
            </div>
            
            <h2 className="text-4xl md:text-5xl font-bold text-white mb-4" style={{ fontFamily: 'Poppins, sans-serif' }}>
              Trusted. Tested.{" "}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-red-400 to-red-600">
                Just Loved
              </span>
            </h2>
            
            <p className="text-lg text-gray-300 max-w-2xl" style={{ fontFamily: 'Inter, sans-serif' }}>
              Our Most Sought After Self Care Staples
            </p>
          </div>

          {/* Navigation Arrows */}
          <div className="hidden md:flex gap-3">
            <button
              onClick={() => scroll('left')}
              disabled={currentIndex === 0}
              className={`w-12 h-12 flex items-center justify-center rounded-full border-2 transition-all duration-300 ${
                currentIndex === 0
                  ? 'border-gray-700 text-gray-700 cursor-not-allowed'
                  : 'border-red-600 text-red-500 hover:bg-red-600 hover:text-white'
              }`}
              aria-label="Previous products"
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
              </svg>
            </button>
            
            <button
              onClick={() => scroll('right')}
              disabled={currentIndex >= maxIndex}
              className={`w-12 h-12 flex items-center justify-center rounded-full border-2 transition-all duration-300 ${
                currentIndex >= maxIndex
                  ? 'border-gray-700 text-gray-700 cursor-not-allowed'
                  : 'border-red-600 text-red-500 hover:bg-red-600 hover:text-white'
              }`}
              aria-label="Next products"
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </button>
          </div>
        </div>

        {/* Products Carousel */}
        <div className="relative mb-12 overflow-hidden">
          <div 
            ref={scrollContainerRef}
            className="flex gap-2 overflow-x-hidden scroll-smooth"
          >
            {products.map((product, index) => (
              <div
                key={product.id}
                className="group relative flex-shrink-0 bg-gradient-to-br from-zinc-900 to-black border-2 border-red-900/30 rounded-2xl overflow-hidden hover:border-red-500/50 hover:shadow-2xl hover:shadow-red-900/30 transition-all duration-500"
                style={{
                  width: 'calc(25% - 6px)',
                  minWidth: '280px'
                }}
              >
              {/* Discount Badge */}
              {product.discount && (
                <div className="absolute top-4 left-4 z-20 bg-red-600 text-white text-xs font-bold px-3 py-1 rounded-full">
                  {product.discount}
                </div>
              )}

              {/* Tag Badge */}
              <div className="absolute top-4 right-4 z-20 bg-black/60 backdrop-blur-sm text-white text-xs font-semibold px-3 py-1 rounded-full border border-red-500/30">
                {product.tag}
              </div>

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
                        className={`w-4 h-4 ${i < Math.floor(product.rating) ? 'text-yellow-400' : 'text-gray-600'}`}
                        fill="currentColor"
                        viewBox="0 0 20 20"
                      >
                        <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                      </svg>
                    ))}
                  </div>
                  <span className="text-xs text-gray-400">{product.reviews} Reviews</span>
                </div>

                {/* Product Name */}
                <h3 className="text-lg font-bold text-white mb-2 group-hover:text-red-400 transition-colors" style={{ fontFamily: 'Poppins, sans-serif' }}>
                  {product.name}
                </h3>

                {/* Description */}
                <p className="text-sm text-gray-400 mb-4 line-clamp-2" style={{ fontFamily: 'Inter, sans-serif' }}>
                  {product.description}
                </p>

                {/* Price */}
                <div className="text-2xl font-bold text-white mb-4" style={{ fontFamily: 'Poppins, sans-serif' }}>
                  {product.price}
                </div>

                {/* Action Buttons */}
                <div className="flex gap-2">
                  <button className="flex-1 py-3 px-4 bg-gradient-to-r from-red-500 to-red-600 text-white text-sm font-semibold rounded-full hover:shadow-lg hover:shadow-red-500/50 transform hover:scale-105 transition-all duration-300">
                    Add To Cart
                  </button>
                  <button className="w-12 h-12 flex items-center justify-center border-2 border-red-600/50 text-red-500 rounded-full hover:bg-red-600 hover:text-white hover:border-red-600 transition-all duration-300">
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                    </svg>
                  </button>
                </div>
              </div>

              {/* Hover glow effect */}
              <div className="absolute inset-0 bg-gradient-to-br from-red-500/0 to-red-600/0 group-hover:from-red-500/10 group-hover:to-red-600/10 transition-all duration-500 pointer-events-none" />
            </div>
          ))}
          </div>
        </div>

        {/* View All Products Button */}
        <div className="flex justify-center">
          <button className="group relative px-12 py-4 bg-transparent border-2 border-red-600 text-white text-lg font-semibold rounded-full hover:bg-red-600 hover:shadow-xl hover:shadow-red-500/50 transform hover:scale-105 transition-all duration-300 overflow-hidden">
            <span className="relative z-10">View All Products</span>
            <div className="absolute inset-0 bg-gradient-to-r from-red-500 to-red-600 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
          </button>
        </div>
      </div>

      {/* Bottom gradient fade */}
      <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-black to-transparent pointer-events-none" />
    </section>
  );
}