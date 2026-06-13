import React, { useState } from 'react';
import { ShoppingBag, ShieldCheck, Heart, Sparkles, Check, X, Shield, Star, Award, Pocket } from 'lucide-react';

interface PouchItem {
  id: string;
  name: string;
  category: 'Girls' | 'Boys';
  price: number;
  originalPrice: number;
  rating: number;
  badge?: string;
  description: string;
  colors: string[];
  specs: string[];
  // Elegant design representation style (gradient classes)
  gradientStyle: string;
}

export default function Pouches() {
  const [selectedCategory, setSelectedCategory] = useState<'All' | 'Girls' | 'Boys'>('All');
  const [likedPouches, setLikedPouches] = useState<Record<string, boolean>>({});
  const [purchasedPouch, setPurchasedPouch] = useState<PouchItem | null>(null);
  const [selectedColor, setSelectedColor] = useState<string>('');
  const [buyerName, setBuyerName] = useState('');
  const [buyerPhone, setBuyerPhone] = useState('');
  const [checkoutSuccess, setCheckoutSuccess] = useState(false);
  const [orderNo, setOrderNo] = useState('');

  const pouchesData: PouchItem[] = [
    // Girls Cases
    {
      id: 'pouch-g1',
      name: 'Iridescent Sakura Liquid Glitter Shield',
      category: 'Girls',
      price: 699,
      originalPrice: 1199,
      rating: 4.8,
      badge: 'Best Seller',
      description: 'Chic crystal flow with premium floating cherry sakura glitter, featuring air-cushion corner drop-protection and raised camera bezels.',
      colors: ['Blush Pink', 'Rose Gold', 'Lavender'],
      specs: ['Dual-layer fluid dynamic TPU', 'Camera frame lift: 1.5mm', 'Drop test: 2.2 meters', 'Ultra flexible shock absorption'],
      gradientStyle: 'from-pink-100 via-rose-200 to-amber-100 dark:from-pink-950 dark:via-rose-900 dark:to-orange-950'
    },
    {
      id: 'pouch-g2',
      name: 'Celestial Pastel Marble Shockproof Armor',
      category: 'Girls',
      price: 799,
      originalPrice: 1499,
      rating: 4.9,
      badge: 'Top Choice',
      description: 'Stunning premium abstract marble style blended with elegant gold foil veins, built onto high-grade polycarbonate with anti-yellow coating.',
      colors: ['Cosmic Lilac', 'Ocean Teal Gold', 'Mint Sage'],
      specs: ['Glossy premium scratch resist', 'Supports MagSafe holding', 'Stain-repellent surface technology', 'Foil inlay preservation'],
      gradientStyle: 'from-violet-100 via-purple-250 to-blue-100 dark:from-violet-950 dark:via-purple-900 dark:to-blue-950'
    },
    {
      id: 'pouch-g3',
      name: 'Luxury Saffiano Calfskin Leather Pocket Cover',
      category: 'Girls',
      price: 1299,
      originalPrice: 1999,
      rating: 4.7,
      description: 'Hand-detailed Saffiano vegan leather cover with a integrated card-holder pouch and an elegant detachable pastel wrist ribbon strap.',
      colors: ['Chic Beige', 'Emerald Green', 'Classic Crimson'],
      specs: ['Dual card-slots integrated', 'RFID blocking defense lines', 'Detachable ribbon hand strap', 'Satin metal button guards'],
      gradientStyle: 'from-stone-100 via-teal-100 to-amber-50 dark:from-stone-900 dark:via-teal-950 dark:to-amber-950/60'
    },

    // Boys Cases
    {
      id: 'pouch-b1',
      name: 'Apex Kevlar & Matte Carbon Fiber Armor',
      category: 'Boys',
      price: 899,
      originalPrice: 1599,
      rating: 4.9,
      badge: 'Highly Rugged',
      description: 'Genuine ultra-dense Kevlar weave layout blended with matte vulcanized bumper strips. Completely military-grade protection for active environments.',
      colors: ['Stealth Carbon Black', 'Titanium Grey', 'Tactical Olive'],
      specs: ['Real Carbon-Aramid weave', 'Honeycomb impact-ring back', 'Matte grip texturing pads', 'Drop certified: 3.5 meters'],
      gradientStyle: 'from-slate-800 via-slate-900 to-zinc-950 dark:from-zinc-900 dark:via-slate-950 dark:to-black'
    },
    {
      id: 'pouch-b2',
      name: 'Nomad Heavy Duty Magnetic Ring Kickstand Case',
      category: 'Boys',
      price: 749,
      originalPrice: 1299,
      rating: 4.8,
      badge: 'Most Handy',
      description: 'Tough dual-component shell featuring a beautifully flush-folding zinc-alloy ring kickstand, supporting 360° rotational landscape holds.',
      colors: ['Cobalt Blue', 'Military Green', 'Carbon Obsidian'],
      specs: ['Rotational alloy backring', 'Magnetic car-mount matching', 'Double layer poly-TPU', 'Precision click volume buttons'],
      gradientStyle: 'from-cyan-900 via-blue-950 to-indigo-950'
    },
    {
      id: 'pouch-b3',
      name: 'Liquid Silicone Slim Minimalist Frost Shield',
      category: 'Boys',
      price: 599,
      originalPrice: 999,
      rating: 4.6,
      description: 'Buttery-smooth premium pure liquid silicone skin with a soft internal microfibre liner and responsive mechanical volume buttons.',
      colors: ['Navy Dusk', 'Graphite Grey', 'Alpine Green'],
      specs: ['Inner velvety microfiber layer', 'Anti-fingerprint nano coating', 'Slender 1.1mm build profile', 'Supports wireless induction charging'],
      gradientStyle: 'from-blue-100 via-slate-200 to-indigo-100 dark:from-blue-950 dark:via-slate-900 dark:to-indigo-950'
    }
  ];

  const filteredPouches = selectionCheck();

  function selectionCheck() {
    if (selectedCategory === 'All') return pouchesData;
    return pouchesData.filter(p => p.category === selectedCategory);
  }

  const toggleLike = (id: string) => {
    setLikedPouches(prev => ({ ...prev, [id]: !prev[id] }));
  };

  const handleOpenBuyNow = (pouch: PouchItem) => {
    setPurchasedPouch(pouch);
    setSelectedColor(pouch.colors[0]);
    setBuyerName('');
    setBuyerPhone('');
    setCheckoutSuccess(false);
  };

  const submitHold = (e: React.FormEvent) => {
    e.preventDefault();
    if (!buyerName.trim() || !buyerPhone.trim()) return;

    // Generate simulated order identifier
    const randNo = 'PC-' + Math.floor(100000 + Math.random() * 900000);
    setOrderNo(randNo);
    setCheckoutSuccess(true);
  };

  return (
    <section id="mobile-pouches" className="py-24 bg-gradient-to-b from-white to-slate-50 dark:from-slate-900 dark:to-slate-950 border-t border-slate-100 dark:border-slate-800/60 scroll-mt-20">
      <div className="max-w-7xl mx-auto px-4 md:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-12">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 bg-rose-50 dark:bg-rose-950/40 border border-rose-100 dark:border-rose-900 rounded-full text-xs font-bold uppercase tracking-wider text-rose-600 dark:text-rose-400 mb-4 animate-pulse">
            <ShoppingBag className="w-3.5 h-3.5" />
            <span>MobiSphere Custom Accessories</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-black text-slate-900 dark:text-white tracking-tight leading-none">
            Premium Custom Pouches & Covers
          </h2>
          <p className="mt-4 text-slate-500 dark:text-slate-400 text-sm sm:text-base font-medium">
            Explore our custom collection of high-protection modern phone pouches. Styled specifically with curated designs for girls and boys.
          </p>
        </div>

        {/* Category Selection Controls */}
        <div className="flex items-center justify-center space-x-2.5 mb-12">
          {['All', 'Girls', 'Boys'].map((category) => (
            <button
              key={category}
              onClick={() => setSelectedCategory(category as any)}
              className={`px-5 py-2.5 rounded-2xl text-xs sm:text-sm font-extrabold cursor-pointer transition-all shadow-3xs active:scale-95 ${
                selectedCategory === category
                  ? 'bg-rose-500 text-white shadow-md'
                  : 'bg-white dark:bg-slate-900 hover:bg-slate-100 dark:hover:bg-slate-850 text-slate-700 dark:text-slate-300 border border-slate-200 dark:border-slate-800'
              }`}
            >
              {category === 'All' ? 'All Pouches' : category === 'Girls' ? '🌸 Girls Edition' : '⚡ Boys Shield'}
            </button>
          ))}
        </div>

        {/* Pouches Grid */}
        <div id="pouches-grid" className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredPouches.map((pouch) => (
            <div
              key={pouch.id}
              className="group bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-805 rounded-3xl overflow-hidden flex flex-col justify-between shadow-sm hover:shadow-2xl hover:scale-[1.01] transition-all duration-300"
            >
              
              {/* Product Design Placeholder Block */}
              <div className={`relative p-8 h-48 bg-gradient-to-tr ${pouch.gradientStyle} flex flex-col justify-between items-start overflow-hidden`}>
                
                {/* Visual Glassmorphic overlay card placeholder */}
                <div className="absolute inset-0 bg-white/5 dark:bg-black/5 flex items-center justify-center select-none pointer-events-none">
                  <div className="w-24 h-40 bg-white/15 dark:bg-white/10 backdrop-blur-md rounded-2xl border border-white/30 p-2.5 flex flex-col justify-between items-center shadow-lg">
                    <div className="w-3.5 h-3.5 bg-slate-800/80 rounded-full border border-white/20 self-center" />
                    <div className="text-[9px] text-white/80 font-black tracking-widest text-center uppercase leading-none">
                      MobiPencil Check
                    </div>
                    <div className="w-6 h-1 bg-white/30 rounded-full" />
                  </div>
                </div>

                {/* Left side tags */}
                {pouch.badge && (
                  <span className="bg-rose-500 text-white text-[10px] font-black px-2.5 py-1 rounded-lg shadow-sm">
                    {pouch.badge}
                  </span>
                )}
                {!pouch.badge && <div />}

                {/* Bottom indicators */}
                <div className="self-stretch flex justify-between items-end mt-auto z-10">
                  <span className="text-[10px] font-bold tracking-wider uppercase bg-white/90 dark:bg-slate-900/90 text-slate-800 dark:text-slate-200 px-2 py-0.5 rounded-md backdrop-blur-3xs">
                    {pouch.category === 'Girls' ? '🌸 Girls Collection' : '⚡ Boys Protective'}
                  </span>
                  
                  <button
                    onClick={() => toggleLike(pouch.id)}
                    className="p-2 bg-white dark:bg-slate-800 rounded-xl shadow-md text-slate-400 hover:text-rose-500 transition-colors"
                  >
                    <Heart className={`w-4 h-4 ${likedPouches[pouch.id] ? 'fill-rose-500 text-rose-500' : ''}`} />
                  </button>
                </div>
              </div>

              {/* Card Meta Content */}
              <div className="p-6 space-y-4 flex-1 flex flex-col justify-between">
                <div>
                  <div className="flex items-center space-x-1.5 text-xs text-amber-500 font-bold mb-1.5">
                    <Star className="w-4 h-4 fill-current shrink-0" />
                    <span>{pouch.rating}</span>
                    <span className="text-slate-300">|</span>
                    <span className="text-[10px] text-slate-400 font-bold tracking-wide">Premium Fit</span>
                  </div>

                  <h3 className="text-base font-black text-slate-90s dark:text-white line-clamp-1">
                    {pouch.name}
                  </h3>
                  
                  <p className="text-xs text-slate-500 dark:text-slate-400 mt-2 font-normal line-clamp-2 leading-relaxed">
                    {pouch.description}
                  </p>

                  <div className="flex flex-wrap gap-1 mt-3">
                    {pouch.colors.map((color, cIdx) => (
                      <span key={cIdx} className="text-[10px] font-bold px-2 py-0.5 bg-slate-50 dark:bg-slate-800 text-slate-600 dark:text-slate-300 border border-slate-200/50 dark:border-slate-700/50 rounded-md">
                        {color}
                      </span>
                    ))}
                  </div>
                </div>

                <div className="border-t border-slate-100 dark:border-slate-800/80 pt-4 mt-2">
                  <div className="flex items-center justify-between mb-4">
                    <div>
                      <span className="text-[9px] uppercase font-bold text-slate-400 tracking-wider block">Special Sale Offer</span>
                      <div className="flex items-baseline space-x-2">
                        <span className="text-xl font-extrabold text-slate-900 dark:text-white">₹{pouch.price}</span>
                        <span className="text-xs text-slate-400 line-through">₹{pouch.originalPrice}</span>
                      </div>
                    </div>
                    
                    <span className="text-[10px] bg-rose-500/10 dark:bg-rose-500/20 text-rose-600 dark:text-rose-400 font-black px-2 py-0.5 rounded-md">
                      SAVE {Math.round(((pouch.originalPrice - pouch.price) / pouch.originalPrice) * 100)}%
                    </span>
                  </div>

                  <button
                    onClick={() => handleOpenBuyNow(pouch)}
                    className="w-full bg-slate-900 hover:bg-rose-600 dark:bg-slate-800 dark:hover:bg-rose-600 text-white font-extrabold py-3 rounded-2xl text-xs flex items-center justify-center space-x-2 transition-all active:scale-95 cursor-pointer"
                  >
                    <ShoppingBag className="w-4 h-4" />
                    <span>Instant Reserve / Buy</span>
                  </button>
                </div>

              </div>

            </div>
          ))}
        </div>

        {/* Safe-hold features bar */}
        <div className="mt-16 bg-slate-50 dark:bg-slate-900 border border-slate-200/60 dark:border-slate-800 rounded-3xl p-6 grid grid-cols-1 sm:grid-cols-3 gap-6">
          <div className="flex gap-3.5 items-start">
            <div className="p-2.5 bg-rose-50 dark:bg-rose-950/20 rounded-xl text-rose-500 shrink-0">
              <ShieldCheck className="w-5 h-5" />
            </div>
            <div>
              <h5 className="font-bold text-slate-900 dark:text-white text-sm">Perfect Edge Protection</h5>
              <p className="text-xs text-slate-500 mt-1">Made with shock absorbing materials tested rigorously for reliable corner protection & bumps.</p>
            </div>
          </div>
          <div className="flex gap-3.5 items-start">
            <div className="p-2.5 bg-indigo-50 dark:bg-indigo-950/20 rounded-xl text-indigo-505 shrink-0">
              <Award className="w-5 h-5" />
            </div>
            <div>
              <h5 className="font-bold text-slate-900 dark:text-white text-sm">Strict Zero-Yellow Standard</h5>
              <p className="text-xs text-slate-500 mt-1">Features high-resistance clear coating to prevent aging and maintain transparent beauty.</p>
            </div>
          </div>
          <div className="flex gap-3.5 items-start">
            <div className="p-2.5 bg-emerald-50 dark:bg-emerald-950/20 rounded-xl text-emerald-500 shrink-0">
              <Pocket className="w-5 h-5" />
            </div>
            <div>
              <h5 className="font-bold text-slate-900 dark:text-white text-sm">Snug Custom Fit</h5>
              <p className="text-xs text-slate-500 mt-1">Tailored millimeter-precision layouts that match perfectly on real Apple, Samsung & Vivo models.</p>
            </div>
          </div>
        </div>

      </div>

      {/* Instant Checkout / Hold Pouch Reservation Modal */}
      {purchasedPouch && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-md animate-in fade-in duration-200">
          <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-3xl max-w-xl w-full p-6 md:p-8 relative shadow-2xl overflow-y-auto max-h-[90vh] animate-in zoom-in-95">
            
            <button
              onClick={() => setPurchasedPouch(null)}
              className="absolute top-5 right-5 p-2 rounded-xl bg-slate-100 hover:bg-slate-200 dark:bg-slate-800 dark:hover:bg-slate-755 text-slate-505 dark:text-slate-400 cursor-pointer"
            >
              <X className="w-5 h-5" />
            </button>

            {!checkoutSuccess ? (
              <form onSubmit={submitHold} className="space-y-5">
                <div>
                  <span className="text-[10px] font-black uppercase text-rose-500 tracking-widest block">Immediate Shop Hold</span>
                  <h3 className="text-xl font-black text-slate-900 dark:text-white mt-1">
                    Book {purchasedPouch.name}
                  </h3>
                  <p className="text-xs text-slate-400 mt-1">Hold is valid for 48 hours for immediate in-store collection or immediate dispatch verification.</p>
                </div>

                <div className="p-4 bg-slate-50 dark:bg-slate-950/60 rounded-2xl border border-slate-200/50 dark:border-slate-800 flex items-center justify-between">
                  <div>
                    <span className="text-[9px] uppercase font-bold text-slate-400 tracking-wider">Pouch Edition Price</span>
                    <div className="text-xl font-extrabold text-slate-900 dark:text-white mt-0.5">₹{purchasedPouch.price}</div>
                  </div>
                  <span className="text-xs font-bold text-indigo-600 bg-indigo-50 dark:bg-indigo-950/40 px-3 py-1 rounded-md border border-indigo-100 dark:border-indigo-900">
                    {purchasedPouch.category === 'Girls' ? '🌸 Girls Soft Glam' : '⚡ Boys Rugged'}
                  </span>
                </div>

                {/* Color Selector */}
                <div className="space-y-2">
                  <label className="text-xs font-bold text-slate-500 dark:text-slate-400">Choose Available Colour Shade</label>
                  <div className="flex gap-2">
                    {purchasedPouch.colors.map((color) => (
                      <button
                        type="button"
                        key={color}
                        onClick={() => setSelectedColor(color)}
                        className={`text-xs font-bold px-3.5 py-2 rounded-xl cursor-pointer transition-all border ${
                          selectedColor === color
                            ? 'bg-rose-500 text-white border-rose-500 shadow-sm'
                            : 'bg-slate-50 dark:bg-slate-800 text-slate-705 dark:text-slate-310 border-slate-200 dark:border-slate-700 hover:bg-slate-100'
                        }`}
                      >
                        {color}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Buyer Credentials */}
                <div className="space-y-4">
                  <div className="space-y-1.5">
                    <label className="text-xs font-bold text-slate-500 dark:text-slate-400">Full Name</label>
                    <input
                      type="text"
                      required
                      value={buyerName}
                      onChange={(e) => setBuyerName(e.target.value)}
                      placeholder="Enter your name"
                      className="w-full bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 p-3 rounded-xl text-xs sm:text-sm text-slate-900 dark:text-white"
                    />
                  </div>

                  <div className="space-y-1.5">
                    <label className="text-xs font-bold text-slate-500 dark:text-slate-405">Telephone Contact (For reservation confirm)</label>
                    <input
                      type="tel"
                      required
                      value={buyerPhone}
                      onChange={(e) => setBuyerPhone(e.target.value)}
                      placeholder="e.g. +91 98765 43210"
                      className="w-full bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 p-3 rounded-xl text-xs sm:text-sm text-slate-900 dark:text-white"
                    />
                  </div>
                </div>

                <div className="pt-4 border-t border-slate-100 dark:border-slate-800/80">
                  <button
                    type="submit"
                    className="w-full bg-gradient-to-r from-rose-500 to-pink-615 hover:from-rose-600 hover:to-pink-700 text-white font-extrabold py-3.5 rounded-2xl text-xs flex items-center justify-center space-x-2 cursor-pointer shadow-lg"
                  >
                    <Check className="w-5 h-5" />
                    <span>Proceed With hold Book</span>
                  </button>
                </div>
              </form>
            ) : (
              <div className="text-center py-6 space-y-5">
                <div className="w-16 h-16 bg-emerald-50 dark:bg-emerald-950/40 border border-emerald-100 dark:border-emerald-900 rounded-full flex items-center justify-center mx-auto text-emerald-500 animate-bounce">
                  <Check className="w-8 h-8" />
                </div>
                
                <div className="space-y-2">
                  <h4 className="text-2xl font-black text-slate-900 dark:text-white">Pouch Hold Verified!</h4>
                  <p className="text-xs text-slate-510 dark:text-slate-400 max-w-sm mx-auto">
                    Hi <strong className="text-slate-800 dark:text-white">{buyerName}</strong>, your reservation for the <strong>{purchasedPouch.name} ({selectedColor})</strong> is successfully registered under reference item id:
                  </p>
                  <div className="inline-block mt-3 bg-indigo-50 dark:bg-indigo-950/40 border border-indigo-100 dark:border-indigo-900 rounded-xl px-4 py-2 font-mono text-sm font-black text-indigo-600 dark:text-indigo-400">
                    {orderNo}
                  </div>
                </div>

                <div className="p-4 bg-slate-50 dark:bg-slate-950/40 border border-slate-100 dark:border-slate-800/80 rounded-2xl text-xs text-slate-500 dark:text-slate-400 text-left space-y-1 list-none max-w-md mx-auto">
                  <div className="font-bold text-slate-700 dark:text-slate-300 mb-1">✓ Hold Summary Details:</div>
                  <li>• Custom case selection optimized for {purchasedPouch.category}</li>
                  <li>• Pick up at MobiSphere showroom within 48 hours</li>
                  <li>• Pay in cash or cards upon physical inspect</li>
                </div>

                <button
                  onClick={() => setPurchasedPouch(null)}
                  className="px-6 py-2.5 bg-slate-900 hover:bg-slate-800 text-white font-bold text-xs rounded-xl cursor-pointer transition-colors"
                >
                  Return to Store
                </button>
              </div>
            )}

          </div>
        </div>
      )}

    </section>
  );
}
