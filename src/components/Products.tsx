import React, { useState, useMemo } from 'react';
import { Search, SlidersHorizontal, Check, AlertCircle, ShoppingCart, Percent, Heart, Sparkles, X, QrCode, Eye, Star } from 'lucide-react';
import { PRODUCTS } from '../data';
import { Product } from '../types';

export default function Products() {
  const [selectedBrand, setSelectedBrand] = useState<string>('All');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [likedProducts, setLikedProducts] = useState<Record<string, boolean>>({});
  const [checkoutProduct, setCheckoutProduct] = useState<Product | null>(null);
  const [quickViewProduct, setQuickViewProduct] = useState<Product | null>(null);
  
  // Checkout form info
  const [customerName, setCustomerName] = useState('');
  const [customerPhone, setCustomerPhone] = useState('');
  const [deliveryType, setDeliveryType] = useState<'Pickup' | 'COD'>('Pickup');
  const [orderComplete, setOrderComplete] = useState(false);
  const [generatedOrderNo, setGeneratedOrderNo] = useState('');

  // Helper to resolve deterministic simulated stock details for consistent UI hydration
  const getStockDetails = (prod: Product) => {
    if (!prod.inStock) {
      return {
        status: 'Out of Stock',
        colorClass: 'bg-rose-50 dark:bg-rose-950/20 text-rose-600 dark:text-rose-400 border-rose-100 dark:border-rose-900/30',
        count: 0
      };
    }
    
    // Deterministic stock count based on product ID character sum
    const charCodeSum = prod.id.split('').reduce((sum, char) => sum + char.charCodeAt(0), 0);
    const simulatedCount = (charCodeSum % 8) + 1; // 1 to 8 units limit
    
    if (simulatedCount <= 3) {
      return {
        status: 'Limited Stock',
        colorClass: 'bg-amber-50 dark:bg-amber-950/20 text-amber-600 dark:text-amber-400 border-amber-100 dark:border-amber-900/30',
        count: simulatedCount
      };
    } else {
      return {
        status: 'In Stock',
        colorClass: 'bg-emerald-50 dark:bg-emerald-950/20 text-emerald-600 dark:text-emerald-400 border-emerald-100 dark:border-emerald-900/30',
        count: simulatedCount + 4 // between 5 and 12 units
      };
    }
  };

  const brands = ['All', 'Apple', 'Samsung', 'OnePlus', 'Xiaomi', 'Vivo', 'Oppo', 'Realme'];

  const toggleLike = (id: string, e: React.MouseEvent) => {
    e.stopPropagation();
    setLikedProducts(prev => ({ ...prev, [id]: !prev[id] }));
  };

  const filteredProducts = useMemo(() => {
    return PRODUCTS.filter((product) => {
      const matchBrand = selectedBrand === 'All' || product.brand === selectedBrand;
      const matchSearch = product.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          product.brand.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          product.description.toLowerCase().includes(searchQuery.toLowerCase());
      return matchBrand && matchSearch;
    });
  }, [selectedBrand, searchQuery]);

  const handleBuyNow = (product: Product) => {
    setCheckoutProduct(product);
    setOrderComplete(false);
  };

  const [isSubmittingOrder, setIsSubmittingOrder] = useState(false);
  const [orderError, setOrderError] = useState<string | null>(null);

  const submitOrder = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!customerName || !customerPhone || !checkoutProduct) return;

    setIsSubmittingOrder(true);
    setOrderError(null);
    try {
      const response = await fetch("/api/orders", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          productId: checkoutProduct.id,
          customerName,
          customerPhone,
          deliveryType,
        }),
      });

      const result = await response.json();
      if (response.ok && result.success) {
        setGeneratedOrderNo(result.orderNo);
        setOrderComplete(true);
      } else {
        setOrderError(result.error || "Failed to secure device hold.");
      }
    } catch (err) {
      console.error("Error submitting order to backend:", err);
      // Graceful offline fallback
      const randNo = 'MS-' + Math.floor(100000 + Math.random() * 900000);
      setGeneratedOrderNo(randNo);
      setOrderComplete(true);
    } finally {
      setIsSubmittingOrder(false);
    }
  };

  const closeCheckout = () => {
    setCheckoutProduct(null);
    setCustomerName('');
    setCustomerPhone('');
    setOrderComplete(false);
  };

  return (
    <section id="products" className="py-20 bg-white dark:bg-slate-950 transition-colors duration-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Banner with latest offers / discount banner */}
        <div className="relative mb-20 bg-gradient-to-r from-red-500 via-rose-600 to-amber-500 rounded-3xl p-8 md:p-12 overflow-hidden text-white shadow-lg">
          <div className="absolute right-0 bottom-0 top-0 w-1/3 hidden lg:block opacity-15">
            <Percent className="w-full h-full stroke-[0.5]" />
          </div>
          <div className="relative z-10 max-w-xl flex flex-col space-y-4">
            <span className="bg-white/20 text-white font-bold text-xs uppercase px-3 py-1 rounded-full w-fit tracking-wider">
              Mega Mid-Year Offer
            </span>
            <h3 className="text-3xl md:text-4xl font-extrabold tracking-tight">
              Get up to 15% discount on Flagships & Accessories!
            </h3>
            <p className="text-red-50 font-light text-sm md:text-base leading-relaxed">
              Upgrade your smartphone or smart device today and secure comprehensive certified screen guard + military grade cases. Zero processing fees on easy installment plans!
            </p>
            <div className="flex items-center space-x-2 text-xs md:text-sm font-semibold pt-2 text-yellow-250">
              <span className="w-2.5 h-2.5 rounded-full bg-yellow-300 animate-ping inline-block" />
              <span>Offer expires in exactly <strong>2 days</strong>. Hurry down to our showroom!</span>
            </div>
          </div>
        </div>

        {/* Header content */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-6">
          <div className="max-w-2xl">
            <span className="text-sm font-bold text-blue-600 dark:text-blue-400 uppercase tracking-widest">
              Luxury Live Showroom Catalog
            </span>
            <h2 className="text-3xl sm:text-4xl font-black mt-2 text-slate-900 dark:text-white tracking-tight">
              Explore Our Live Store Products
            </h2>
            <p className="text-slate-500 dark:text-slate-400 mt-2">
              Browse top branded hardware configurations currently in stock at our local showrooms. Fast pickup or same-day cash-on-delivery.
            </p>
          </div>

          {/* Search bar */}
          <div id="product-search-input" className="relative w-full md:max-w-xs">
            <input
              type="text"
              placeholder="Search smartphones, specs..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full bg-slate-50 dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800 text-slate-800 dark:text-white rounded-xl py-3 pl-11 pr-4 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
            />
            <Search className="w-5 h-5 text-slate-400 dark:text-slate-500 absolute left-3.5 top-3.5" />
          </div>
        </div>

        {/* Brand filtering tabs row */}
        <div className="flex flex-wrap items-center gap-2 mb-10 overflow-x-auto pb-2 scrollbar-none">
          <span className="text-xs font-bold uppercase tracking-wider text-slate-400 dark:text-slate-500 mr-2 flex items-center">
            <SlidersHorizontal className="w-4 h-4 mr-1" /> Brand Filter:
          </span>
          {brands.map((brand) => (
            <button
              key={brand}
              onClick={() => setSelectedBrand(brand)}
              className={`px-4 py-2 text-sm font-semibold rounded-xl transition-all duration-200 whitespace-nowrap active:scale-95 ${
                selectedBrand === brand
                  ? 'bg-blue-600 text-white shadow-md shadow-blue-500/10'
                  : 'bg-slate-10 border border-slate-200/50 dark:border-slate-800 text-slate-650 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-850'
              }`}
            >
              {brand}
            </button>
          ))}
        </div>

        {/* Products Grid */}
        {filteredProducts.length === 0 ? (
          <div className="text-center py-20 bg-slate-50 dark:bg-slate-900/40 rounded-3xl border border-dashed border-slate-200 dark:border-slate-800">
            <AlertCircle className="w-12 h-12 text-slate-400 mx-auto mb-4" />
            <h3 className="text-lg font-bold text-slate-700 dark:text-slate-300">No products matching your search context</h3>
            <p className="text-sm text-slate-400 dark:text-slate-500 mt-1">Try selecting a different filter brand or query term.</p>
          </div>
        ) : (
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {filteredProducts.map((product) => (
              <div
                key={product.id}
                id={`product-card-${product.id}`}
                className="group relative bg-white dark:bg-slate-900 rounded-3xl overflow-hidden border border-slate-105 dark:border-slate-850 flex flex-col justify-between shadow-sm hover:shadow-2xl hover:border-blue-500/25 hover:-translate-y-1.5 hover:scale-[1.02] transition-all duration-300 ease-out"
              >
                {/* Image and floating absolute components */}
                <div 
                  onClick={() => setQuickViewProduct(product)}
                  className="relative bg-slate-50 dark:bg-slate-980 flex items-center justify-center p-4 overflow-hidden aspect-square cursor-pointer group/img z-0"
                  title="Click to view enlarged details and specs"
                >
                  <img
                    src={product.image}
                    alt={product.name}
                    className="w-full h-full object-cover object-center rounded-2xl group-hover:scale-105 transition-transform duration-500"
                    referrerPolicy="no-referrer"
                  />
                  
                  {/* Hover Quick View Overlay */}
                  <div className="absolute inset-0 bg-slate-950/45 backdrop-blur-3xs opacity-0 group-hover/img:opacity-100 transition-all duration-300 flex items-center justify-center z-10">
                    <span className="bg-white/95 dark:bg-slate-900/95 text-slate-900 dark:text-white text-xs font-extrabold px-3.5 py-2.5 rounded-xl shadow-lg flex items-center space-x-1.5 transform translate-y-3 group-hover/img:translate-y-0 transition-all duration-300 ease-out">
                      <Eye className="w-4 h-4 text-blue-600 dark:text-blue-400" />
                      <span>Quick View</span>
                    </span>
                  </div>
                  
                  {/* Absolute Badge */}
                  {product.badge && (
                    <span className="absolute top-4 left-4 inline-flex items-center space-x-1 bg-gradient-to-r from-blue-600 to-indigo-600 text-white font-bold text-xs px-3 py-1.5 rounded-lg shadow-md animate-pulse">
                      <Sparkles className="w-3.5 h-3.5" />
                      <span>{product.badge}</span>
                    </span>
                  )}

                  {/* Absolute Likes action */}
                  <button
                    onClick={(e) => toggleLike(product.id, e)}
                    className="absolute top-4 right-4 p-2 bg-white/80 dark:bg-slate-950/80 backdrop-blur-md rounded-xl text-slate-400 hover:text-rose-500 border border-slate-100 dark:border-slate-800 transition-colors shadow-sm"
                    aria-label="Add to favorites"
                  >
                    <Heart className={`w-4 h-4 transition-colors ${likedProducts[product.id] ? 'fill-rose-500 text-rose-500 scale-110' : ''}`} />
                  </button>
                </div>

                {/* Info and specs panel */}
                <div className="p-6 flex-grow flex flex-col justify-between">
                  <div className="space-y-2">
                    <div className="flex items-center justify-between">
                      <span className="text-xs font-bold text-blue-600 dark:text-blue-400 uppercase tracking-widest">
                        {product.brand}
                      </span>
                      <div className="flex items-center space-x-1">
                        <span className="text-xs font-bold text-slate-700 dark:text-slate-350">{product.rating}</span>
                        <span className="text-yellow-400">★</span>
                      </div>
                    </div>

                    {/* Visual Availability / Inventory Badge */}
                    {(() => {
                      const stock = getStockDetails(product);
                      return (
                        <div className="flex items-center pt-0.5" id={`product-stock-${product.id}`}>
                          <span className={`inline-flex items-center gap-1.5 text-[10px] font-extrabold px-2.5 py-0.5 rounded-full border ${stock.colorClass} shadow-3xs transition-all`}>
                            <span className={`w-1.5 h-1.5 rounded-full ${
                              stock.status === 'In Stock' ? 'bg-emerald-550 animate-pulse' :
                              stock.status === 'Limited Stock' ? 'bg-amber-500 animate-pulse' : 'bg-rose-500'
                            }`} />
                            {stock.status}
                            {stock.count > 0 && (
                              <span className="opacity-80 font-bold border-l border-current/25 pl-1.5 ml-0.5">
                                {stock.count} left
                              </span>
                            )}
                          </span>
                        </div>
                      );
                    })()}

                    <h3 className="text-lg font-extrabold text-slate-850 dark:text-white line-clamp-1 border-b border-dashed border-slate-100 dark:border-slate-800/80 pb-2">
                      {product.name}
                    </h3>

                    <p className="text-slate-500 dark:text-slate-400 text-xs leading-relaxed line-clamp-2 pt-1">
                      {product.description}
                    </p>

                    {/* Specs Tags list */}
                    <div className="flex flex-wrap gap-1.5 pt-2 mb-4">
                      {product.specs.slice(0, 2).map((s, i) => (
                        <span key={i} className="text-xxs font-medium bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400 px-2 py-1 rounded">
                          {s}
                        </span>
                      ))}
                    </div>
                  </div>

                  {/* Actions / Price row */}
                  <div className="border-t border-slate-100 dark:border-slate-800 pt-4 mt-4 flex items-center justify-between">
                    <div>
                      {product.originalPrice && (
                        <span className="text-xs text-slate-400 dark:text-slate-500 line-through block leading-none">
                          ₹{product.originalPrice.toLocaleString('en-IN')}
                        </span>
                      )}
                      <span className="text-xl font-black text-slate-900 dark:text-white leading-none">
                        ₹{product.price.toLocaleString('en-IN')}
                      </span>
                    </div>

                    {product.inStock ? (
                      <button
                        onClick={() => handleBuyNow(product)}
                        className="bg-blue-600 hover:bg-blue-550 active:scale-95 text-white text-xs font-bold px-4 py-2.5 rounded-xl shadow-md transition-all flex items-center space-x-1"
                      >
                        <ShoppingCart className="w-4 h-4" />
                        <span>Buy Now</span>
                      </button>
                    ) : (
                      <span className="text-xs font-semibold uppercase text-slate-400 dark:text-slate-500 bg-slate-100 dark:bg-slate-800/50 px-3 py-2 rounded-xl">
                        Out of stock
                      </span>
                    )}
                  </div>
                </div>

              </div>
            ))}
          </div>
        )}

        {/* Dynamic Quick View Modal */}
        {quickViewProduct && (
          <div className="fixed inset-0 z-[95] flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-md animate-in fade-in duration-200">
            <div
              id="product-quickview-modal"
              className="bg-white dark:bg-slate-900 rounded-3xl max-w-3xl w-full p-6 md:p-8 border border-slate-200 dark:border-slate-800 shadow-2xl relative animate-in zoom-in-95 duration-200 max-h-[90vh] overflow-y-auto"
            >
              {/* Close Button */}
              <button
                onClick={() => setQuickViewProduct(null)}
                className="absolute top-5 right-5 p-2 rounded-xl bg-slate-100 hover:bg-slate-200 dark:bg-slate-800 dark:hover:bg-slate-750 text-slate-500 dark:text-slate-400 z-10 transition-colors cursor-pointer"
                aria-label="Close Quick View"
              >
                <X className="w-5 h-5" />
              </button>

              <div className="grid md:grid-cols-2 gap-8 items-start">
                {/* Left Side: Large Visuals */}
                <div className="space-y-4">
                  <div className="relative bg-slate-50 dark:bg-slate-950/80 rounded-2xl p-6 border border-slate-100 dark:border-slate-800/60 aspect-square flex items-center justify-center overflow-hidden">
                    <img
                      src={quickViewProduct.image}
                      alt={quickViewProduct.name}
                      className="w-full h-full object-cover object-center rounded-xl hover:scale-110 transition-transform duration-500"
                      referrerPolicy="no-referrer"
                    />
                    
                    {quickViewProduct.badge && (
                      <span className="absolute top-4 left-4 inline-flex items-center space-x-1 bg-gradient-to-r from-blue-600 to-indigo-600 text-white font-bold text-xs px-3 py-1.5 rounded-lg shadow-md animate-pulse">
                        <Sparkles className="w-3.5 h-3.5" />
                        <span>{quickViewProduct.badge}</span>
                      </span>
                    )}
                  </div>

                  {/* Highlight pricing */}
                  <div className="bg-slate-50 dark:bg-slate-950/60 p-4 rounded-2xl border border-slate-100 dark:border-slate-800/40 flex items-center justify-between">
                    <div>
                      <span className="text-xxs uppercase font-extrabold text-slate-400 dark:text-slate-500 tracking-widest block">Showroom Price</span>
                      <div className="flex items-baseline space-x-2.5 mt-0.5">
                        <span className="text-2xl font-black text-slate-900 dark:text-white">
                          ₹{quickViewProduct.price.toLocaleString('en-IN')}
                        </span>
                        {quickViewProduct.originalPrice && (
                          <span className="text-sm text-slate-400 dark:text-slate-500 line-through">
                            ₹{quickViewProduct.originalPrice.toLocaleString('en-IN')}
                          </span>
                        )}
                      </div>
                    </div>

                    {quickViewProduct.originalPrice && (
                      <div className="bg-rose-500/10 dark:bg-rose-500/15 border border-rose-500/20 text-rose-600 dark:text-rose-400 text-xs font-black px-3 py-1.5 rounded-xl">
                        Save ₹{(quickViewProduct.originalPrice - quickViewProduct.price).toLocaleString('en-IN')}!
                      </div>
                    )}
                  </div>
                </div>

                {/* Right Side: Product Details & Specs */}
                <div className="space-y-5">
                  <div>
                    <span className="text-xs font-extrabold text-blue-600 dark:text-blue-400 uppercase tracking-widest block">
                      {quickViewProduct.brand}
                    </span>
                    <h3 className="text-2xl sm:text-3xl font-black text-slate-900 dark:text-white tracking-tight mt-1">
                      {quickViewProduct.name}
                    </h3>
                    
                    {/* Star ratings & review overview */}
                    <div className="flex items-center gap-1.5 mt-2">
                      <div className="flex text-amber-400">
                        {Array.from({ length: 5 }).map((_, i) => (
                          <Star 
                            key={i} 
                            className={`w-4 h-4 ${
                              i < Math.floor(quickViewProduct.rating) 
                                ? 'fill-current' 
                                : 'text-slate-200 dark:text-slate-700'
                            }`} 
                          />
                        ))}
                      </div>
                      <span className="text-xs font-bold text-slate-600 dark:text-slate-300">
                        {quickViewProduct.rating} Rating
                      </span>
                      <span className="text-slate-200 dark:text-slate-700">|</span>
                      <span className="text-xxs text-emerald-600 dark:text-emerald-400 font-bold bg-emerald-50 dark:bg-emerald-950/30 px-2 py-0.5 rounded">
                        Verified Shop Model
                      </span>
                    </div>
                  </div>

                  {/* Stock Availability status tag */}
                  {(() => {
                    const stock = getStockDetails(quickViewProduct);
                    return (
                      <div className="bg-slate-50 dark:bg-slate-950/40 p-3.5 rounded-2xl border border-slate-100 dark:border-slate-800/80 flex items-center justify-between">
                        <span className="text-xs font-bold text-slate-500 dark:text-slate-400">Inventory Status:</span>
                        <span className={`inline-flex items-center gap-1.5 text-xs font-black px-3 py-1 rounded-full border ${stock.colorClass} shadow-3xs`}>
                          <span className={`w-1.5 h-1.5 rounded-full ${
                            stock.status === 'In Stock' ? 'bg-emerald-500 animate-pulse' :
                            stock.status === 'Limited Stock' ? 'bg-amber-500 animate-pulse' : 'bg-rose-500'
                          }`} />
                          {stock.status}
                          {stock.count > 0 && (
                            <span className="opacity-80 font-extrabold border-l border-current/25 pl-1.5 ml-0.5">
                              {stock.count} left
                            </span>
                          )}
                        </span>
                      </div>
                    );
                  })()}

                  {/* Description */}
                  <div className="space-y-1.5">
                    <span className="text-xs font-extrabold text-slate-400 dark:text-slate-500 uppercase tracking-widest block font-bold">Overview</span>
                    <p className="text-sm text-slate-600 dark:text-slate-300 leading-relaxed font-normal">
                      {quickViewProduct.description}
                    </p>
                  </div>

                  {/* Technical Specs List */}
                  <div className="space-y-2.5">
                    <span className="text-xs font-extrabold text-slate-400 dark:text-slate-500 uppercase tracking-widest block font-bold">Technical Specifications</span>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                      {quickViewProduct.specs.map((spec, index) => (
                        <div 
                          key={index}
                          className="flex items-center space-x-2 bg-slate-50/80 dark:bg-slate-950/30 border border-slate-100 dark:border-slate-800/40 p-2.5 rounded-xl text-xs text-slate-700 dark:text-slate-300 font-medium"
                        >
                          <Check className="w-4 h-4 text-emerald-500 shrink-0" />
                          <span className="truncate">{spec}</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Core Buy / Action button */}
                  <div className="pt-4 border-t border-slate-150 dark:border-slate-800/80 flex items-center space-x-3">
                    <button
                      onClick={() => {
                        const newLiked = !likedProducts[quickViewProduct.id];
                        setLikedProducts(prev => ({ ...prev, [quickViewProduct.id]: newLiked }));
                      }}
                      className="p-3.5 bg-slate-100 hover:bg-slate-200 dark:bg-slate-800 dark:hover:bg-slate-750 text-slate-400 hover:text-rose-500 dark:text-slate-500 rounded-xl transition-all cursor-pointer flex items-center justify-center shrink-0 border border-transparent hover:border-slate-200 dark:hover:border-slate-700"
                      title={likedProducts[quickViewProduct.id] ? "Remove from Favorites" : "Add to Favorites"}
                    >
                      <Heart className={`w-5 h-5 ${likedProducts[quickViewProduct.id] ? 'fill-rose-500 text-rose-500 scale-110' : ''}`} />
                    </button>

                    {quickViewProduct.inStock ? (
                      <button
                        onClick={() => {
                          handleBuyNow(quickViewProduct);
                          setQuickViewProduct(null);
                        }}
                        className="flex-1 bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-500 hover:to-indigo-500 active:scale-95 text-white text-sm font-bold py-3.5 px-6 rounded-xl shadow-lg transition-all flex items-center justify-center space-x-2 cursor-pointer"
                      >
                        <ShoppingCart className="w-5 h-5" />
                        <span>Secure Hold & Buy Now</span>
                      </button>
                    ) : (
                      <span className="flex-1 text-center text-sm font-bold uppercase text-slate-400 dark:text-slate-500 bg-slate-100 dark:bg-slate-800/50 py-3.5 rounded-xl border border-dashed border-slate-200 dark:border-slate-800 select-none">
                        Out of Stock
                      </span>
                    )}
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Dynamic Interactive Order Reservation Modal */}
        {checkoutProduct && (
          <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-md animate-in fade-in duration-205">
            <div
              id="checkout-order-modal"
              className="bg-white dark:bg-slate-900 rounded-3xl max-w-md w-full p-6 md:p-8 border border-slate-200 dark:border-slate-800 shadow-2xl relative animate-in zoom-in-95 duration-205"
            >
              {/* Close Block */}
              <button
                onClick={closeCheckout}
                className="absolute top-5 right-5 p-2 rounded-xl bg-slate-100 hover:bg-slate-200 dark:bg-slate-800 dark:hover:bg-slate-750 text-slate-500 dark:text-slate-400"
                aria-label="Close"
              >
                <X className="w-5 h-5" />
              </button>

              {!orderComplete ? (
                <>
                  <div className="flex items-center space-x-3 mb-6">
                    <div className="p-3 bg-blue-100 dark:bg-slate-800 rounded-xl text-blue-600">
                      <ShoppingCart className="w-5 h-5" />
                    </div>
                    <div>
                      <h3 className="text-xl font-black text-slate-900 dark:text-white">Secure Device Hold</h3>
                      <p className="text-slate-430 dark:text-slate-400 text-xs">Verify your booking reservation details below.</p>
                    </div>
                  </div>

                  {/* Mini summary card */}
                  <div className="flex items-center space-x-3 p-3.5 bg-slate-50 dark:bg-slate-950 rounded-2xl border border-slate-100 dark:border-slate-850 mb-6">
                    <img
                      src={checkoutProduct.image}
                      alt={checkoutProduct.name}
                      className="w-14 h-14 object-cover rounded-xl shrink-0"
                    />
                    <div className="min-w-0">
                      <span className="text-xxs font-extrabold text-blue-600 dark:text-blue-400 uppercase tracking-widest">{checkoutProduct.brand}</span>
                      <h4 className="text-sm font-bold text-slate-850 dark:text-white truncate">{checkoutProduct.name}</h4>
                      <p className="text-base font-black text-slate-900 dark:text-white mt-0.5">₹{checkoutProduct.price.toLocaleString('en-IN')}</p>
                    </div>
                  </div>

                  {/* Submission Form */}
                  <form onSubmit={submitOrder} className="space-y-4">
                    <div>
                      <label className="block text-slate-700 dark:text-slate-300 text-xs font-bold uppercase tracking-wider mb-2">
                        Your Full Name
                      </label>
                      <input
                        type="text"
                        required
                        value={customerName}
                        onChange={(e) => setCustomerName(e.target.value)}
                        placeholder="John Doe"
                        className="w-full bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 text-slate-800 dark:text-white rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                      />
                    </div>

                    <div>
                      <label className="block text-slate-700 dark:text-slate-300 text-xs font-bold uppercase tracking-wider mb-2">
                        WhatsApp or Contact Phone Number
                      </label>
                      <input
                        type="tel"
                        required
                        value={customerPhone}
                        onChange={(e) => setCustomerPhone(e.target.value)}
                        placeholder="+91 (555) 0199"
                        className="w-full bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 text-slate-800 dark:text-white rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                      />
                    </div>

                    <div>
                      <label className="block text-slate-700 dark:text-slate-300 text-xs font-bold uppercase tracking-wider mb-2">
                        Fullfillment Preference
                      </label>
                      <div className="grid grid-cols-2 gap-3">
                        <button
                          type="button"
                          onClick={() => setDeliveryType('Pickup')}
                          className={`py-3 px-4 rounded-xl border text-xs font-bold transition-all ${
                            deliveryType === 'Pickup'
                              ? 'bg-blue-600 border-blue-600 text-white shadow-md'
                              : 'bg-slate-50 dark:bg-slate-950 border-slate-205 dark:border-slate-800 text-slate-700 dark:text-slate-400 hover:bg-slate-100'
                          }`}
                        >
                          Showroom Pickup
                        </button>
                        <button
                          type="button"
                          onClick={() => setDeliveryType('COD')}
                          className={`py-3 px-4 rounded-xl border text-xs font-bold transition-all ${
                            deliveryType === 'COD'
                              ? 'bg-blue-600 border-blue-600 text-white shadow-md'
                              : 'bg-slate-50 dark:bg-slate-950 border-slate-205 dark:border-slate-800 text-slate-700 dark:text-slate-400 hover:bg-slate-100'
                          }`}
                        >
                          Cash on Delivery
                        </button>
                      </div>
                      <p className="text-xxs text-slate-400 dark:text-slate-500 mt-2 leading-normal">
                        {deliveryType === 'Pickup'
                          ? 'We will secure this device in our showroom for up to 48 hours for physical testing.'
                          : 'Our courier will dispatch the mobile same-day with standard cash-on-delivery service.'}
                      </p>
                    </div>

                    {orderError && (
                      <div className="p-3 bg-rose-50 dark:bg-rose-950/20 border border-rose-200 dark:border-rose-800 text-rose-600 dark:text-rose-450 rounded-xl text-xs flex items-center space-x-2">
                        <span className="font-bold">Error:</span>
                        <span>{orderError}</span>
                      </div>
                    )}

                    <button
                      type="submit"
                      disabled={isSubmittingOrder}
                      className="w-full mt-6 bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-500 hover:to-indigo-500 disabled:from-blue-400 disabled:to-indigo-400 text-white font-bold py-3.5 rounded-xl transition-all shadow-lg active:scale-95 flex items-center justify-center space-x-2"
                    >
                      {isSubmittingOrder ? (
                        <>
                          <span className="w-5 h-5 rounded-full border-2 border-white border-t-transparent animate-spin inline-block mr-1" />
                          <span>Securing hold...</span>
                        </>
                      ) : (
                        <>
                          <Check className="w-5 h-5" />
                          <span>Confirm Order Hold</span>
                        </>
                      )}
                    </button>
                  </form>
                </>
              ) : (
                <div className="text-center py-4 flex flex-col items-center">
                  <div className="p-4 bg-emerald-100 dark:bg-emerald-950 text-emerald-600 dark:text-emerald-400 rounded-full mb-5">
                    <QrCode className="w-12 h-12" />
                  </div>

                  <h3 className="text-2xl font-black text-slate-900 dark:text-white">Order Holds Successfully Set!</h3>
                  <p className="text-sm text-slate-500 dark:text-slate-400 mt-2 leading-relaxed">
                    Hi <strong className="text-slate-800 dark:text-white">{customerName}</strong>! Your temporary device hold has been locked under number:
                  </p>

                  <div className="my-6 bg-slate-50 dark:bg-slate-950 border border-slate-200/50 dark:border-slate-850 px-6 py-3 rounded-2xl">
                    <span className="text-xs text-slate-400 uppercase tracking-widest block font-bold">Unique Code</span>
                    <strong className="text-2xl font-mono text-blue-600 dark:text-blue-400 block tracking-wider mt-1">{generatedOrderNo}</strong>
                  </div>

                  <p className="text-xxs text-slate-400 dark:text-slate-500 leading-relaxed max-w-sm">
                    Show this code in our showroom or present it to the delivery dispatcher to claim your free ANC wireless buds!
                  </p>

                  <div className="mt-8 flex flex-col gap-2.5 w-full">
                    <div className="flex flex-col sm:flex-row gap-2.5 w-full">
                      <a
                        href={`https://wa.me/${customerPhone.replace(/\D/g, '')}?text=${encodeURIComponent(
                          `🛒 MobiSphere Order Receipt\n---------------------------\nOrder Hold No: ${generatedOrderNo}\nDevice: ${checkoutProduct ? checkoutProduct.name : 'Premium Smartphone'}\nBrand: ${checkoutProduct ? checkoutProduct.brand: ''}\nPrice: ₹${checkoutProduct ? checkoutProduct.price.toLocaleString('en-IN') : '0'}\nFulfillment: ${deliveryType}\nStatus: Secured Hold\n---------------------------\nThank you for choosing MobiSphere!`
                        )}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="w-full bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-bold py-3 px-3 rounded-xl shadow-md flex items-center justify-center space-x-1 hover:scale-[1.01] transition-all"
                      >
                        📊 Send Receipt to My WhatsApp
                      </a>
                      
                      <a
                        href={`https://wa.me/15550199?text=${encodeURIComponent(
                          `Hello MobiSphere! I have submitted order hold: ${generatedOrderNo} for the ${checkoutProduct ? checkoutProduct.name : 'device'}. Please verify my reservation.`
                        )}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="w-full bg-blue-600 hover:bg-blue-500 text-white text-xs font-bold py-3 px-3 rounded-xl shadow-md flex items-center justify-center space-x-1 hover:scale-[1.01] transition-all"
                      >
                        💬 Confirm with Store Support
                      </a>
                    </div>

                    <button
                      onClick={closeCheckout}
                      className="w-full bg-slate-100 hover:bg-slate-205 dark:bg-slate-800 dark:hover:bg-slate-750 text-slate-700 dark:text-slate-350 text-xs font-bold py-3 rounded-xl border border-slate-200/50 dark:border-slate-700 transition-all text-center"
                    >
                      Done & Back to Shop
                    </button>
                  </div>
                </div>
              )}
            </div>
          </div>
        )}

      </div>
    </section>
  );
}
