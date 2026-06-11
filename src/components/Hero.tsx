import React from 'react';
import { Sparkles, ShoppingBag, PhoneCall, CheckCircle, ShieldCheck } from 'lucide-react';

interface HeroProps {
  scrollToSection: (id: string) => void;
}

export default function Hero({ scrollToSection }: HeroProps) {
  // Path of the generated hero backplate
  const heroImage = '/src/assets/images/hero_gadget_banner_1781151944455.png';

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
              Mobile Shop provides the world\'s premium branded mobiles, high-performance smart devices, drop-tested custom accessories, and 24/7 expert maintenance & repair services under one luxury local showroom.
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
                onClick={() => scrollToSection('products')}
                className="group relative inline-flex items-center justify-center bg-blue-600 hover:bg-blue-500 text-white font-semibold text-base px-8 py-4 rounded-xl shadow-lg shadow-blue-500/20 active:scale-95 transition-all duration-300 overflow-hidden"
              >
                <ShoppingBag className="w-5 h-5 mr-2 group-hover:scale-110 transition-transform" />
                Explore Products
                <span className="absolute right-0 top-0 h-full w-10 bg-white/10 skew-x-12 translate-x-12 group-hover:animate-shine" />
              </button>

              <button
                onClick={() => scrollToSection('contact')}
                className="group inline-flex items-center justify-center bg-slate-800/80 hover:bg-slate-700/90 border border-slate-700 text-slate-200 hover:text-white font-medium text-base px-8 py-4 rounded-xl backdrop-blur-md active:scale-95 transition-all duration-300"
              >
                <PhoneCall className="w-5 h-5 mr-2 group-hover:rotate-12 transition-transform" />
                Contact Us
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
                  Buy Samsung Flagship S24 Ultra this week and secure free premium Active Noise Canceling Wireless buds worth $199!
                </p>
                
                <div className="border-t border-white/5 pt-4 flex items-baseline justify-between">
                  <div>
                    <span className="text-xs text-slate-400 block">Promo Price</span>
                    <span className="text-2xl font-black text-rose-400">$1,249</span>
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
    </section>
  );
}
