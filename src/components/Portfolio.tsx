import React, { useState, useMemo } from 'react';
import { Eye, Plus, ArrowRight, X, ChevronLeft, ChevronRight, ZoomIn } from 'lucide-react';
import { PORTFOLIO_ITEMS } from '../data';
import { PortfolioItem } from '../types';

export default function Portfolio() {
  const [activeCategory, setActiveCategory] = useState<string>('All');
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null);

  const categories = ['All', 'Showroom', 'Repair', 'Gadget', 'Interaction'];

  // Combine static and custom assets
  const items: PortfolioItem[] = useMemo(() => {
    const defaultItems = [...PORTFOLIO_ITEMS];
    // Push the custom generated certified Repair image right in!
    defaultItems.push({
      id: 'pt_custom_repair',
      title: 'Certified Repair Operations',
      category: 'Repair',
      image: '/src/assets/images/tech_repair_service_1781151964247.png',
      description: 'Our state-of-the-art repair counter showing precise component modifications under ring lighting.'
    });
    return defaultItems;
  }, []);

  const filteredItems = useMemo(() => {
    if (activeCategory === 'All') return items;
    return items.filter(item => item.category === activeCategory);
  }, [activeCategory, items]);

  const openLightbox = (id: string) => {
    const index = items.findIndex(item => item.id === id);
    if (index !== -1) {
      setLightboxIndex(index);
    }
  };

  const nextSlide = () => {
    if (lightboxIndex !== null) {
      setLightboxIndex((lightboxIndex + 1) % items.length);
    }
  };

  const prevSlide = () => {
    if (lightboxIndex !== null) {
      setLightboxIndex((lightboxIndex - 1 + items.length) % items.length);
    }
  };

  return (
    <section id="portfolio" className="py-20 bg-slate-50 dark:bg-slate-900 transition-colors duration-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Title Content */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <span className="text-sm font-bold text-blue-600 dark:text-blue-400 uppercase tracking-widest">
            Aesthetic Store Showcase
          </span>
          <h2 className="text-3xl sm:text-4xl font-black mt-2 text-slate-900 dark:text-white tracking-tight">
            Our Portfolio & Store Gallery
          </h2>
          <p className="text-slate-500 dark:text-slate-400 mt-4 leading-relaxed">
            Take an interactive virtual stroll across our high-fidelity premium showroom counters, tech diagnostics workspaces, and active client interactions.
          </p>
        </div>

        {/* Gallery filtering tags row */}
        <div className="flex flex-wrap items-center justify-center gap-2 mb-10 overflow-x-auto pb-2 scrollbar-none">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setActiveCategory(cat)}
              className={`px-4.5 py-2.5 text-xs font-bold rounded-xl transition-all duration-200 whitespace-nowrap active:scale-95 ${
                activeCategory === cat
                  ? 'bg-blue-650 text-white shadow-md'
                  : 'bg-white dark:bg-slate-805 text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Portfolio grid layout */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredItems.map((item, index) => (
            <div
              key={item.id}
              onClick={() => openLightbox(item.id)}
              className="group relative bg-white dark:bg-slate-800 rounded-3xl overflow-hidden border border-slate-100 dark:border-slate-850 hover:shadow-2xl hover:-translate-y-2.5 transition-all duration-350 cursor-pointer"
            >
              {/* Image with zoom masks */}
              <div className="relative aspect-video overflow-hidden">
                <img
                  src={item.image}
                  alt={item.title}
                  className="w-full h-full object-cover object-center group-hover:scale-110 transition-transform duration-500"
                  referrerPolicy="no-referrer"
                />
                
                {/* Visual Hover filter Mask */}
                <div className="absolute inset-0 bg-slate-950/60 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                  <div className="p-4 bg-white/10 backdrop-blur-md rounded-2xl border border-white/20 transform scale-75 group-hover:scale-100 transition-transform duration-300">
                    <ZoomIn className="w-6 h-6 text-white" />
                  </div>
                </div>

                <span className="absolute top-4 left-4 text-xxs font-black tracking-widest bg-blue-600 text-white rounded px-2.5 py-1 uppercase shadow-md">
                  {item.category}
                </span>
              </div>

              {/* Text Description box */}
              <div className="p-6">
                <h3 className="text-lg font-extrabold text-slate-800 dark:text-white group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
                  {item.title}
                </h3>
                <p className="text-slate-500 dark:text-slate-400 text-xs mt-2 leading-relaxed">
                  {item.description}
                </p>
                
                <div className="mt-4 flex items-center space-x-1 text-blue-600 dark:text-blue-400 text-xxs font-bold uppercase tracking-wider group-hover:translate-x-1 transition-transform">
                  <span>Open Lightbox</span>
                  <Plus className="w-3.5 h-3.5" />
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Global LightBox overlay slider */}
        {lightboxIndex !== null && (
          <div className="fixed inset-0 z-[110] bg-slate-950/95 backdrop-blur-md flex items-center justify-center p-4 animate-in fade-in duration-200">
            {/* Close Button */}
            <button
              onClick={() => setLightboxIndex(null)}
              className="absolute top-5 right-5 p-3 rounded-full bg-slate-80/40 hover:bg-slate-80/60 text-white/80 hover:text-white transition-colors"
              aria-label="Close Lightbox"
            >
              <X className="w-6 h-6" />
            </button>

            {/* Slider container */}
            <div className="relative max-w-4xl w-full flex flex-col items-center">
              
              {/* Previous index clicker */}
              <button
                onClick={prevSlide}
                className="absolute left-0 lg:-left-20 top-1/2 -translate-y-1/2 p-3 bg-white/5 border border-white/10 hover:bg-white/10 rounded-full text-white transition-colors hidden sm:block"
                aria-label="Previous"
              >
                <ChevronLeft className="w-6 h-6" />
              </button>

              {/* Next index clicker */}
              <button
                onClick={nextSlide}
                className="absolute right-0 lg:-right-20 top-1/2 -translate-y-1/2 p-3 bg-white/5 border border-white/10 hover:bg-white/10 rounded-full text-white transition-colors hidden sm:block"
                aria-label="Next"
              >
                <ChevronRight className="w-6 h-6" />
              </button>

              {/* Real Lightbox showcase card */}
              <div className="bg-slate-900 border border-white/10 rounded-3xl overflow-hidden shadow-2xl max-w-3xl w-full">
                <div className="aspect-video w-full relative">
                  <img
                    src={items[lightboxIndex].image}
                    alt={items[lightboxIndex].title}
                    className="w-full h-full object-cover object-center"
                    referrerPolicy="no-referrer"
                  />
                </div>
                
                <div className="p-6 md:p-8 text-white relative">
                  <span className="text-xxs font-black text-blue-400 uppercase tracking-widest block mb-1">
                    {items[lightboxIndex].category}
                  </span>
                  
                  <h3 className="text-xl md:text-2xl font-black">
                    {items[lightboxIndex].title}
                  </h3>
                  
                  <p className="text-slate-350 text-sm mt-3 leading-relaxed">
                    {items[lightboxIndex].description}
                  </p>

                  {/* Slider mobile swipe controls helper text */}
                  <div className="mt-6 flex items-center justify-between border-t border-white/5 pt-4">
                    <span className="text-slate-500 text-xs font-medium">
                      Exhibit {lightboxIndex + 1} of {items.length}
                    </span>
                    <div className="flex gap-2 sm:hidden">
                      <button onClick={prevSlide} className="px-3 py-1.5 bg-white/5 text-white rounded text-xs">Prev</button>
                      <button onClick={nextSlide} className="px-3 py-1.5 bg-white/5 text-white rounded text-xs">Next</button>
                    </div>
                  </div>
                </div>
              </div>

            </div>
          </div>
        )}

      </div>
    </section>
  );
}
