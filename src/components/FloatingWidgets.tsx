import React, { useState, useEffect } from 'react';
import { MessageCircle, ChevronUp, AlertTriangle } from 'lucide-react';

export default function FloatingWidgets() {
  const [showScrollBtn, setShowScrollBtn] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setShowScrollBtn(window.scrollY > 400);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div id="floating-interaction-rails" className="fixed bottom-6 right-6 z-[90] flex flex-col space-y-3 items-end">
      
      {/* WhatsApp Quick Chat Button */}
      <a
        href="https://wa.me/15550199?text=Hello%20Mobile%2520Shop!%20I%20have%20a%20question%20about%20your%20products."
        target="_blank"
        rel="noopener noreferrer"
        id="whatsapp-chat-float"
        className="group flex items-center bg-emerald-500 hover:bg-emerald-450 text-white rounded-full p-4 shadow-2xl transition-all duration-300 hover:scale-110 active:scale-95 border border-emerald-400/20"
        aria-label="Chat on WhatsApp"
      >
        <span className="max-w-0 overflow-hidden group-hover:max-w-[120px] transition-all duration-300 ease-out whitespace-nowrap text-xs font-bold leading-none pr-0 group-hover:pr-2.5">
          WhatsApp Chat
        </span>
        <MessageCircle className="w-6 h-6 shrink-0 fill-white text-emerald-500" />
      </a>

      {/* Back to Top Button */}
      {showScrollBtn && (
        <button
          onClick={scrollToTop}
          id="back-to-top-btn"
          className="p-3.5 bg-white dark:bg-slate-900 hover:bg-slate-50 dark:hover:bg-slate-800 text-slate-700 dark:text-slate-200 rounded-full shadow-xl border border-slate-200/50 dark:border-slate-800 transition-all duration-300 hover:scale-105 active:scale-95 animate-in fade-in slide-in-from-bottom-3"
          aria-label="Scroll to top"
        >
          <ChevronUp className="w-5 h-5" />
        </button>
      )}

    </div>
  );
}
