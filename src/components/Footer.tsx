import React, { useState } from 'react';
import { Smartphone, Mail, Send, Phone, MapPin, Facebook, Youtube, Instagram, MessageSquare, ShieldCheck, Check } from 'lucide-react';

interface FooterProps {
  scrollToSection: (id: string) => void;
}

export default function Footer({ scrollToSection }: FooterProps) {
  const [newsEmail, setNewsEmail] = useState('');
  const [subscribed, setSubscribed] = useState(false);

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newsEmail) return;
    setSubscribed(true);
    setNewsEmail('');
  };

  return (
    <footer className="bg-slate-950 text-slate-300 pt-16 pb-8 border-t border-slate-900 transition-colors duration-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Core grid content */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-12 mb-16">
          
          {/* Column 1 - Brand description */}
          <div className="lg:col-span-4 space-y-6">
            <div
              className="flex items-center space-x-2 cursor-pointer group w-fit"
              onClick={() => scrollToSection('home')}
            >
              <div className="p-2.5 rounded-xl bg-gradient-to-tr from-blue-600 to-indigo-500 text-white shadow-md group-hover:scale-105 transition-transform duration-300">
                <Smartphone className="w-5 h-5" />
              </div>
              <span className="text-xl font-bold bg-gradient-to-r from-blue-400 to-indigo-300 bg-clip-text text-transparent">
                Mobile Shop
              </span>
            </div>
            <p className="text-sm text-slate-400 leading-relaxed font-light">
              Your premium neighborhood smartphone dealer, hardware maintenance workshop, and smart IoT device catalog. Empowering residents with certified original parts since 2016.
            </p>

            {/* Social shares */}
            <div className="flex items-center space-x-3 pt-2">
              <a href="https://facebook.com" target="_blank" rel="noopener noreferrer" className="p-2.5 rounded-xl bg-slate-900 hover:bg-blue-600 text-slate-400 hover:text-white transition-all hover:-translate-y-1" aria-label="Facebook">
                <Facebook className="w-4 h-4" />
              </a>
              <a href="https://instagram.com" target="_blank" rel="noopener noreferrer" className="p-2.5 rounded-xl bg-slate-900 hover:bg-pink-600 text-slate-400 hover:text-white transition-all hover:-translate-y-1" aria-label="Instagram">
                <Instagram className="w-4 h-4" />
              </a>
              <a href="https://youtube.com" target="_blank" rel="noopener noreferrer" className="p-2.5 rounded-xl bg-slate-900 hover:bg-red-650 text-slate-400 hover:text-white transition-all hover:-translate-y-1" aria-label="Youtube">
                <Youtube className="w-4 h-4" />
              </a>
            </div>
          </div>

          {/* Column 2 - Navigation Anchors */}
          <div className="lg:col-span-2 space-y-4">
            <h4 className="text-sm font-bold uppercase tracking-wider text-slate-100 border-b border-white/5 pb-2">Quick Links</h4>
            <ul className="space-y-2.5 text-sm">
              <li><button onClick={() => scrollToSection('home')} className="hover:text-blue-400 hover:underline transition-colors block text-slate-400">Home</button></li>
              <li><button onClick={() => scrollToSection('about')} className="hover:text-blue-400 hover:underline transition-colors block text-slate-400">About Us</button></li>
              <li><button onClick={() => scrollToSection('services')} className="hover:text-blue-400 hover:underline transition-colors block text-slate-400">Services</button></li>
              <li><button onClick={() => scrollToSection('products')} className="hover:text-blue-400 hover:underline transition-colors block text-slate-400">Products Showcase</button></li>
              <li><button onClick={() => scrollToSection('portfolio')} className="hover:text-blue-400 hover:underline transition-colors block text-slate-400">Showroom Gallery</button></li>
            </ul>
          </div>

          {/* Column 3 - Services list */}
          <div className="lg:col-span-3 space-y-4">
            <h4 className="text-sm font-bold uppercase tracking-wider text-slate-100 border-b border-white/5 pb-2">Core Services</h4>
            <ul className="space-y-2.5 text-sm">
              <li><button onClick={() => scrollToSection('services')} className="hover:text-blue-400 hover:underline transition-colors block text-slate-400 text-left">Smartphone & Tablet Sales</button></li>
              <li><button onClick={() => scrollToSection('services')} className="hover:text-blue-400 hover:underline transition-colors block text-slate-400 text-left">Motherboard Repair Solutions</button></li>
              <li><button onClick={() => scrollToSection('services')} className="hover:text-blue-400 hover:underline transition-colors block text-slate-400 text-left">Pristine Accessories Retails</button></li>
              <li><button onClick={() => scrollToSection('services')} className="hover:text-blue-400 hover:underline transition-colors block text-slate-400 text-left">45-min Certified Screen Swaps</button></li>
              <li><button onClick={() => scrollToSection('services')} className="hover:text-blue-400 hover:underline transition-colors block text-slate-400 text-left">WhatsApp Backups & Migrates</button></li>
            </ul>
          </div>

          {/* Column 4 - Newsletter sub */}
          <div className="lg:col-span-3 space-y-4">
            <h4 className="text-sm font-bold uppercase tracking-wider text-slate-100 border-b border-white/5 pb-2">Join Our Newsletter</h4>
            <p className="text-xs text-slate-400 leading-relaxed font-light">
              Subscribe to secure immediate alerts on stock arrivals, weekly electronics discount keys, and tech maintenance guides.
            </p>

            {subscribed ? (
              <div className="bg-emerald-950/40 border border-emerald-900 text-emerald-400 rounded-xl p-4 text-xs font-semibold flex items-center space-x-2 animate-in fade-in duration-200">
                <Check className="w-5 h-5 shrink-0" />
                <span>Subscription Secured! Enjoy 10% coupon code.</span>
              </div>
            ) : (
              <form onSubmit={handleSubscribe} className="space-y-2.5">
                <div id="footer-newsletter-box" className="relative">
                  <input
                    type="email"
                    required
                    value={newsEmail}
                    onChange={(e) => setNewsEmail(e.target.value)}
                    placeholder="name@email.com"
                    className="w-full bg-slate-900 border border-slate-800 text-slate-205 py-3 pl-4 pr-11 text-xs rounded-xl focus:outline-none focus:ring-1 focus:ring-blue-500"
                  />
                  <button
                    type="submit"
                    className="absolute right-1 top-1 bottom-1 px-3 bg-blue-600 hover:bg-blue-550 rounded-lg text-white transition-colors"
                    aria-label="Subscribe"
                  >
                    <Send className="w-4 h-4" />
                  </button>
                </div>
                <div className="flex items-center space-x-1.5 text-[9px] text-slate-500">
                  <ShieldCheck className="w-3.5 h-3.5" />
                  <span>No spam ever. Unsubscribe in 1-click.</span>
                </div>
              </form>
            )}
          </div>

        </div>

        {/* Bottom copyright details */}
        <div className="border-t border-slate-900 pt-8 mt-12 flex flex-col md:flex-row items-center justify-between text-xs text-slate-500 gap-4">
          <p>© 2026 Mobile Shop. All Rights Reserved.</p>
          <div className="flex space-x-6">
            <a href="#terms" className="hover:text-slate-400">Terms of Service</a>
            <a href="#privacy" className="hover:text-slate-400">Privacy Policy</a>
            <a href="#cookies" className="hover:text-slate-400">Cookies Policy</a>
          </div>
        </div>

      </div>
    </footer>
  );
}
