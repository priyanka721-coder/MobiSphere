import React, { useState } from 'react';
import { Sparkles, ShoppingBag, PhoneCall, CheckCircle, ShieldCheck, X, ChevronRight, RefreshCw } from 'lucide-react';
import { PRODUCTS } from '../data';
import { Product } from '../types';

interface HeroProps {
  scrollToSection: (id: string) => void;
}

export default function Hero({ scrollToSection }: HeroProps) {
  // Path of the generated hero backplate
  const heroImage = '/src/assets/images/hero_gadget_banner_1781151944455.png';

  // Wizard state machine
  const [showWizard, setShowWizard] = useState(false);
  const [wizardStep, setWizardStep] = useState(1);
  const [focusChoice, setFocusChoice] = useState<string>('');
  const [brandChoice, setBrandChoice] = useState<string>('');
  const [budgetChoice, setBudgetChoice] = useState<string>('');
  const [recommended, setRecommended] = useState<Product | null>(null);

  const startWizard = () => {
    setShowWizard(true);
    setWizardStep(1);
    setFocusChoice('');
    setBrandChoice('');
    setBudgetChoice('');
    setRecommended(null);
  };

  const handleStep1 = (choice: string) => {
    setFocusChoice(choice);
    setWizardStep(2);
  };

  const handleStep2 = (choice: string) => {
    setBrandChoice(choice);
    setWizardStep(3);
  };

  const calculateRecommendation = (budget: string) => {
    setBudgetChoice(budget);
    
    // Filter by brand first
    let candidates = PRODUCTS;
    if (brandChoice !== 'All') {
      candidates = candidates.filter(p => p.brand === brandChoice);
    }

    // Filter by budget
    if (budget === 'budget') {
      candidates = candidates.filter(p => p.price <= 30000);
    } else if (budget === 'midtier') {
      candidates = candidates.filter(p => p.price > 30000 && p.price <= 60000);
    } else {
      candidates = candidates.filter(p => p.price > 60000);
    }

    // If no candidate matches because of strict brand, expand back to allow any brand under this budget
    if (candidates.length === 0) {
      if (budget === 'budget') {
        candidates = PRODUCTS.filter(p => p.price <= 30000);
      } else if (budget === 'midtier') {
        candidates = PRODUCTS.filter(p => p.price > 30000 && p.price <= 60000);
      } else {
        candidates = PRODUCTS.filter(p => p.price > 60000);
      }
    }

    // Sort according to focus relevance
    const keyTerms: Record<string, string[]> = {
      photography: ['camera', 'portrait', 'zeiss', 'leica', 'hasselblad', 'optics', 'lens', 'sensor', 'periscope', 'zoom'],
      gaming: ['gaming', 'processor', 'snapdragon', 'dimensity', 'refresh', 'cooling', 'gpu', 'fps', 'beast'],
      business: ['fold', 'multitasking', 'productivity', 'stylus', 'spen', 'pen', 'pro', 'screen', 'titanium'],
      battery: ['battery', 'charger', 'supervooc', 'hypercharge', 'charging', 'mah', 'long-lasting', 'durable']
    };

    const terms = keyTerms[focusChoice] || [];
    
    // Score matches
    const scored = candidates.map(product => {
      let score = 0;
      const text = (product.name + ' ' + product.description + ' ' + product.specs.join(' ')).toLowerCase();
      
      terms.forEach(term => {
        if (text.includes(term)) {
          score += 3;
        }
      });

      // Boost premium flagships or user rating
      score += (product.rating || 4.5) * 2;
      return { product, score };
    });

    // Sort descending by score
    scored.sort((a, b) => b.score - a.score);

    const winner = scored.length > 0 ? scored[0].product : PRODUCTS[0];
    setRecommended(winner);
    setWizardStep(4);
  };

  return (
    <section id="home" className="relative pt-24 pb-16 lg:pt-32 lg:pb-28 overflow-hidden min-h-[95vh] flex items-center">
      {/* Background Image Ambient Glow layer */}
      <div className="absolute inset-0 z-0">
        <img
          src={heroImage}
          alt="Premium Smart Devices"
          className="w-full h-full object-cover object-center scale-105 filter brightness-[0.7] contrast-[1.05]"
          referrerPolicy="no-referrer"
        />
        {/* Soft, dark gradient masks for readability */}
        <div className="absolute inset-0 bg-gradient-to-r from-slate-950/90 via-slate-900/85 to-indigo-950/70 dark:from-slate-950/95 dark:via-slate-950/90 dark:to-slate-900/75 mix-blend-multiply" />
        <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-transparent to-slate-950/30" />
      </div>

      {/* Decorative ambient blurred particles */}
      <div className="absolute top-1/4 left-1/10 w-96 h-96 bg-blue-500/20 rounded-full filter blur-[100px] animate-pulse pointer-events-none" />
      <div className="absolute bottom-1/4 right-1/10 w-80 h-80 bg-indigo-500/15 rounded-full filter blur-[80px] pointer-events-none" />

      {/* Hero Content */}
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full text-slate-100">
        <div className="grid lg:grid-cols-12 gap-12 items-center">
          
          {/* Text panel */}
          <div className="lg:col-span-7 flex flex-col space-y-6 text-left">
            
            {/* Promo Tag */}
            <div className="inline-flex items-center space-x-2 bg-blue-500/10 border border-blue-500/30 rounded-full px-4 py-1.5 w-fit animate-bounce">
              <Sparkles className="w-4 h-4 text-blue-400" />
              <span className="text-xs font-semibold text-blue-300 tracking-wide uppercase">
                Premium Electro Hub — 100% Guaranteed Genuine
              </span>
            </div>

            {/* Custom Heading */}
            <h1 className="text-4xl sm:text-5xl md:text-6xl font-black tracking-tight leading-none text-white font-sans">
              Latest Smartphones &{' '}
              <span className="bg-gradient-to-r from-blue-400 via-indigo-300 to-cyan-400 bg-clip-text text-transparent">
                Smart Gadgets
              </span>{' '}
              at Best Prices
            </h1>

            {/* Subheading */}
            <p className="text-lg md:text-xl text-slate-300/90 leading-relaxed font-light max-w-2xl">
              MobiSphere provides the world's premium branded mobiles, high-performance smart devices, drop-tested custom accessories, and 24/7 expert maintenance & repair services under one luxury local showroom.
            </p>

            {/* Quick value proposition metrics */}
            <div className="grid grid-cols-2 md:grid-cols-3 gap-4 pt-2">
              <div className="flex items-center space-x-2 text-sm text-slate-300">
                <CheckCircle className="w-5 h-5 text-emerald-400 shrink-0" />
                <span>Authorized Dealer</span>
              </div>
              <div className="flex items-center space-x-2 text-sm text-slate-300">
                <ShieldCheck className="w-5 h-5 text-emerald-400 shrink-0" />
                <span>Instant Warranty Setup</span>
              </div>
              <div className="flex items-center space-x-2 text-sm text-slate-300">
                <Sparkles className="w-5 h-5 text-emerald-400 shrink-0" />
                <span>Quick WhatsApp Support</span>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-4 pt-4">
              <button
                onClick={startWizard}
                className="group relative inline-flex items-center justify-center bg-blue-600 hover:bg-blue-550 text-white font-semibold text-base px-8 py-4 rounded-xl shadow-lg shadow-blue-500/20 active:scale-95 transition-all duration-300 overflow-hidden"
              >
                <Sparkles className="w-5 h-5 mr-2 group-hover:scale-110 transition-transform text-amber-300" />
                Get Started (Device Finder)
                <span className="absolute right-0 top-0 h-full w-10 bg-white/10 skew-x-12 translate-x-12 group-hover:animate-shine" />
              </button>

              <button
                onClick={() => scrollToSection('products')}
                className="group inline-flex items-center justify-center bg-slate-800/80 hover:bg-slate-700/90 border border-slate-700 text-slate-200 hover:text-white font-medium text-base px-8 py-4 rounded-xl backdrop-blur-md active:scale-95 transition-all duration-300"
              >
                <ShoppingBag className="w-5 h-5 mr-2 group-hover:scale-110 transition-transform" />
                Browse Catalog
              </button>
            </div>
          </div>

          {/* Graphic Presentation Card */}
          <div className="lg:col-span-5 relative mt-6 lg:mt-0 flex justify-center">
            <div className="relative w-full max-w-sm rounded-3xl bg-slate-900/50 border border-white/10 p-6 backdrop-blur-xl shadow-2xl transition-all duration-500 hover:border-blue-500/40 group overflow-hidden">
              <div className="absolute -right-10 -top-10 w-40 h-40 bg-indigo-500/20 rounded-full filter blur-xl group-hover:bg-blue-500/30 transition-all duration-500" />
              
              <div className="flex items-center justify-between mb-4">
                <span className="text-xs font-semibold px-2 py-1 rounded bg-blue-500/20 text-blue-300 uppercase">
                  Hot Launch Offer
                </span>
                <span className="text-slate-400 text-xs">Limited Stock</span>
              </div>

              <div id="hero-mini-promo" className="space-y-4">
                <h3 className="text-xl font-bold text-white">Galaxy S24 Ultra Bundle</h3>
                <p className="text-sm text-slate-350">
                  Buy Samsung Flagship S24 Ultra this week and secure free premium Active Noise Canceling Wireless buds worth ₹9,999!
                </p>
                
                <div className="border-t border-white/5 pt-4 flex items-baseline justify-between">
                  <div>
                    <span className="text-xs text-slate-400 block">Promo Price</span>
                    <span className="text-2xl font-black text-rose-400">₹1,29,999</span>
                  </div>
                  <button
                    onClick={() => scrollToSection('products')}
                    className="text-xs font-semibold text-blue-400 hover:text-blue-300 flex items-center space-x-1 group/btn"
                  >
                    <span>Claim Offer</span>
                    <span className="group-hover/btn:translate-x-1 transition-transform">→</span>
                  </button>
                </div>
              </div>
            </div>
          </div>

        </div>
      </div>

      {/* Interactive Device Matching Wizard Dialog modal */}
      {showWizard && (
        <div className="fixed inset-0 z-[120] flex items-center justify-center p-4 bg-slate-950/85 backdrop-blur-md animate-in fade-in duration-200">
          <div className="bg-slate-900 border border-slate-800 rounded-3xl max-w-lg w-full p-6 md:p-8 relative text-white shadow-2xl animate-in zoom-in-95 duration-200">
            {/* Close Button */}
            <button
              onClick={() => setShowWizard(false)}
              className="absolute top-5 right-5 p-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-400 hover:text-white transition-colors"
              aria-label="Close"
            >
              <X className="w-5 h-5" />
            </button>

            {/* Stepper badge indicators */}
            <div className="flex items-center space-x-2 mb-6">
              {[1, 2, 3, 4].map((step) => (
                <div
                  key={step}
                  className={`h-1.5 rounded-full transition-all duration-300 ${
                    wizardStep >= step ? 'w-8 bg-blue-500' : 'w-3 bg-slate-800'
                  }`}
                />
              ))}
              <span className="text-xs font-bold uppercase tracking-widest text-slate-500 ml-2">
                {wizardStep === 4 ? 'Matched' : `Step ${wizardStep} of 3`}
              </span>
            </div>

            {/* Step 1: Lifestyles / Core Needs */}
            {wizardStep === 1 && (
              <div className="space-y-5">
                <div>
                  <h3 className="text-2xl font-bold text-white tracking-tight">What do you mainly use your smartphone for?</h3>
                  <p className="text-slate-400 text-sm mt-1">We'll use this to match hardware priorities like cameras, computing speed, and batteries.</p>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5 pt-2">
                  <button
                    onClick={() => handleStep1('photography')}
                    className="p-4 bg-slate-850 hover:bg-slate-800 border border-slate-800 hover:border-blue-500/55 rounded-2xl text-left transition-all active:scale-95 group"
                  >
                    <span className="text-2xl mb-2 block group-hover:scale-110 transition-transform">📸</span>
                    <strong className="block text-sm font-bold text-white">Portrait & Photography</strong>
                    <span className="text-xs text-slate-400 mt-1 block">Zeiss/Leica fine lenses and professional sensors.</span>
                  </button>
                  <button
                    onClick={() => handleStep1('gaming')}
                    className="p-4 bg-slate-850 hover:bg-slate-800 border border-slate-800 hover:border-blue-500/55 rounded-2xl text-left transition-all active:scale-95 group"
                  >
                    <span className="text-2xl mb-2 block group-hover:scale-110 transition-transform">🎮</span>
                    <strong className="block text-sm font-bold text-white">Extreme Gaming & Power</strong>
                    <span className="text-xs text-slate-400 mt-1 block">Max frame rate computing, cooling loops & high ram.</span>
                  </button>
                  <button
                    onClick={() => handleStep1('business')}
                    className="p-4 bg-slate-850 hover:bg-slate-800 border border-slate-800 hover:border-blue-500/55 rounded-2xl text-left transition-all active:scale-95 group"
                  >
                    <span className="text-2xl mb-2 block group-hover:scale-110 transition-transform">💼</span>
                    <strong className="block text-sm font-bold text-white">Productivity & Foldables</strong>
                    <span className="text-xs text-slate-400 mt-1 block">Multitasking, stylus support, and stunning visual work.</span>
                  </button>
                  <button
                    onClick={() => handleStep1('battery')}
                    className="p-4 bg-slate-850 hover:bg-slate-800 border border-slate-800 hover:border-blue-500/55 rounded-2xl text-left transition-all active:scale-95 group"
                  >
                    <span className="text-2xl mb-2 block group-hover:scale-110 transition-transform">🔋</span>
                    <strong className="block text-sm font-bold text-white">Value & Battery Longevity</strong>
                    <span className="text-xs text-slate-400 mt-1 block">Extra large mAH battery sizes with rapid SuperVOOC speed.</span>
                  </button>
                </div>
              </div>
            )}

            {/* Step 2: Brand Allies */}
            {wizardStep === 2 && (
              <div className="space-y-5">
                <div>
                  <h3 className="text-2xl font-bold text-white tracking-tight">Do you have a preferred mobile manufacturer?</h3>
                  <p className="text-slate-400 text-sm mt-1">Select your ecosystem or opt for all options to compare value stats.</p>
                </div>
                <div className="grid grid-cols-2 gap-3 pt-2">
                  {['All', 'Apple', 'Samsung', 'OnePlus', 'Xiaomi', 'Vivo', 'Oppo', 'Realme'].map((brand) => (
                    <button
                      key={brand}
                      onClick={() => handleStep2(brand)}
                      className="p-3 bg-slate-850 hover:bg-slate-800 border border-slate-800 rounded-xl font-bold text-center text-sm hover:border-blue-500/50 transition-all active:scale-95"
                    >
                      {brand === 'All' ? '🌐 Match All Brands' : brand}
                    </button>
                  ))}
                </div>
                <button
                  onClick={() => setWizardStep(1)}
                  className="text-xs font-semibold text-slate-400 hover:text-white flex items-center pt-2"
                >
                  ← Go Back
                </button>
              </div>
            )}

            {/* Step 3: Budget Focus Range */}
            {wizardStep === 3 && (
              <div className="space-y-5">
                <div>
                  <h3 className="text-2xl font-bold text-white tracking-tight">Select your pricing segment in Rupees (₹)</h3>
                  <p className="text-slate-400 text-sm mt-1">Pick a threshold budget that comfortably fits your smart investments.</p>
                </div>
                <div className="flex flex-col space-y-3 pt-2">
                  <button
                    onClick={() => calculateRecommendation('budget')}
                    className="p-4 bg-slate-850 hover:bg-slate-800 border border-slate-800 rounded-2xl text-left transition-all hover:border-blue-500/50 active:scale-95"
                  >
                    <strong className="block text-base text-emerald-400 font-extrabold">Under ₹30,000</strong>
                    <span className="text-xs text-slate-400 block mt-0.5">Budget-friendly powerhouses and performance champions.</span>
                  </button>
                  <button
                    onClick={() => calculateRecommendation('midtier')}
                    className="p-4 bg-slate-850 hover:bg-slate-800 border border-slate-800 rounded-2xl text-left transition-all hover:border-blue-500/50 active:scale-95"
                  >
                    <strong className="block text-base text-yellow-400 font-extrabold">₹30,000 - ₹60,000</strong>
                    <span className="text-xs text-slate-400 block mt-0.5">Premium tier cameras with flagship high-refresh screens.</span>
                  </button>
                  <button
                    onClick={() => calculateRecommendation('flagship')}
                    className="p-4 bg-slate-850 hover:bg-slate-800 border border-slate-800 rounded-2xl text-left transition-all hover:border-blue-500/50 active:scale-95"
                  >
                    <strong className="block text-base text-blue-400 font-extrabold">Above ₹60,000</strong>
                    <span className="text-xs text-slate-400 block mt-0.5">State-of-the-art titanium flags, foldables and ultimate performance.</span>
                  </button>
                </div>
                <button
                  onClick={() => setWizardStep(2)}
                  className="text-xs font-semibold text-slate-400 hover:text-white flex items-center pt-2"
                >
                  ← Go Back
                </button>
              </div>
            )}

            {/* Step 4: Results Presentation */}
            {wizardStep === 4 && recommended && (
              <div className="space-y-5">
                <div className="text-center">
                  <div className="inline-flex p-3 bg-blue-500/15 text-blue-400 rounded-full mb-3 border border-blue-500/30">
                    <Sparkles className="w-7 h-7" />
                  </div>
                  <h3 className="text-2xl font-black text-white tracking-tight">We found your perfect match!</h3>
                  <p className="text-slate-400 text-xs mt-1">Based on your focus criteria, we recommend the absolute best fit:</p>
                </div>

                {/* Match Card */}
                <div className="p-4 bg-slate-850 rounded-2xl border border-slate-800 flex flex-col md:flex-row items-center gap-4">
                  <img
                    src={recommended.image}
                    alt={recommended.name}
                    className="w-24 h-24 object-cover rounded-xl shrink-0 border border-slate-800 shadow-md animate-pulse"
                  />
                  <div className="min-w-0 flex-1 text-center md:text-left">
                    <span className="text-[10px] font-bold text-blue-400 bg-blue-900/40 px-2 py-1 rounded tracking-widest uppercase">
                      {recommended.brand} Match
                    </span>
                    <h4 className="text-lg font-bold text-white mt-2 truncate leading-tight">{recommended.name}</h4>
                    <p className="text-slate-400 text-xs line-clamp-2 mt-1 leading-relaxed">{recommended.description}</p>
                    
                    <div className="mt-2.5 flex items-baseline justify-center md:justify-start gap-2">
                      <span className="text-lg font-black text-emerald-400">
                        ₹{recommended.price.toLocaleString('en-IN')}
                      </span>
                      {recommended.originalPrice && (
                        <span className="text-xs text-slate-500 line-through">
                          ₹{recommended.originalPrice.toLocaleString('en-IN')}
                        </span>
                      )}
                    </div>
                  </div>
                </div>

                {/* Specific features matched */}
                <div className="bg-slate-900/55 p-3 rounded-xl border border-slate-800 space-y-1.5 text-xs text-slate-350">
                  <div className="flex items-center space-x-1.5">
                    <span className="text-emerald-400">✔</span>
                    <span><strong>High Customer Score:</strong> carries a sturdy {recommended.rating} ★ rating.</span>
                  </div>
                  <div className="flex items-center space-x-1.5">
                    <span className="text-emerald-400">✔</span>
                    <span><strong>Pro Spec Highlight:</strong> {recommended.specs[0]} built-in.</span>
                  </div>
                </div>

                {/* Actions */}
                <div className="grid grid-cols-2 gap-3 pt-3">
                  <button
                    onClick={() => {
                      setShowWizard(false);
                      scrollToSection('products');
                      setTimeout(() => {
                        const targetCard = document.getElementById(`product-card-${recommended.id}`);
                        if (targetCard) {
                          targetCard.scrollIntoView({ behavior: 'smooth', block: 'center' });
                          targetCard.classList.add('ring-4', 'ring-blue-500', 'ring-offset-2', 'ring-offset-slate-900');
                          setTimeout(() => {
                            targetCard.classList.remove('ring-4', 'ring-blue-500', 'ring-offset-2', 'ring-offset-slate-900');
                          }, 2500);
                        }
                      }, 400);
                    }}
                    className="w-full bg-slate-800 hover:bg-slate-700 font-bold py-3 px-4 rounded-xl text-center text-xs transition-transform active:scale-95"
                  >
                    Show in Catalog
                  </button>
                  <button
                    onClick={() => {
                      setShowWizard(false);
                      scrollToSection('products');
                      setTimeout(() => {
                        const triggerBtn = document.querySelector(`#product-card-${recommended.id} button`);
                        if (triggerBtn) {
                          (triggerBtn as HTMLButtonElement).click();
                        }
                      }, 500);
                    }}
                    className="w-full bg-blue-600 hover:bg-blue-550 text-white font-bold py-3 px-4 rounded-xl text-center text-xs shadow-lg shadow-blue-500/20 transition-transform active:scale-95"
                  >
                    Reserve / Buy Now
                  </button>
                </div>

                <button
                  onClick={startWizard}
                  className="w-full text-xxs text-slate-500 hover:text-slate-350 text-center flex items-center justify-center space-x-1"
                >
                  <RefreshCw className="w-3.5 h-3.5 mr-1 animate-spin-slow" />
                  <span>Restart Matchmaker Wizard</span>
                </button>
              </div>
            )}
          </div>
        </div>
      )}
    </section>
  );
}
