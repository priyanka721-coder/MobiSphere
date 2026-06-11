import React, { useState, useEffect } from 'react';
import { Star, ChevronLeft, ChevronRight, Quote } from 'lucide-react';
import { REVIEWS } from '../data';

export default function Testimonials() {
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % REVIEWS.length);
    }, 6000); // Autoplay slide every 6s
    return () => clearInterval(timer);
  }, []);

  const nextSlide = () => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % REVIEWS.length);
  };

  const prevSlide = () => {
    setCurrentIndex((prevIndex) => (prevIndex - 1 + REVIEWS.length) % REVIEWS.length);
  };

  return (
    <section id="testimonials" className="py-20 bg-slate-50 dark:bg-slate-900 overflow-hidden transition-colors duration-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header content */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <span className="text-sm font-bold text-blue-600 dark:text-blue-400 uppercase tracking-widest">
            Verified Customer Reviews
          </span>
          <h2 className="text-3xl sm:text-4xl font-black mt-2 text-slate-900 dark:text-white tracking-tight">
            Loved by Tech Lovers & Locals Alike
          </h2>
          <p className="text-slate-500 dark:text-slate-400 mt-4 leading-relaxed">
            Read real feedback from verified patrons who upgraded their smartphone hardware or restored shattered glass screens at our diagnostic stations.
          </p>
        </div>

        {/* Carousel interface viewport */}
        <div className="relative max-w-4xl mx-auto px-4 md:px-12">
          
          {/* Previous item controller */}
          <button
            onClick={prevSlide}
            className="absolute left-0 top-1/2 -translate-y-1/2 z-10 p-3 bg-white dark:bg-slate-800 hover:bg-slate-100 dark:hover:bg-slate-750 rounded-full text-slate-750 dark:text-slate-200 border border-slate-250/40 dark:border-slate-700 shadow-md transition-all active:scale-90"
            aria-label="Previous testimonial"
          >
            <ChevronLeft className="w-5 h-5" />
          </button>

          {/* Next item controller */}
          <button
            onClick={nextSlide}
            className="absolute right-0 top-1/2 -translate-y-1/2 z-10 p-3 bg-white dark:bg-slate-800 hover:bg-slate-100 dark:hover:bg-slate-750 rounded-full text-slate-750 dark:text-slate-200 border border-slate-250/40 dark:border-slate-700 shadow-md transition-all active:scale-90"
            aria-label="Next testimonial"
          >
            <ChevronRight className="w-5 h-5" />
          </button>

          {/* Testimonial Active Slider view */}
          <div className="overflow-hidden min-h-[340px] flex items-center justify-center">
            <div className="w-full transition-all duration-500 ease-in-out">
              
              {/* Review Card */}
              <div className="bg-white dark:bg-slate-950 rounded-3xl p-8 md:p-12 border border-slate-100 dark:border-slate-850 shadow-xl relative mt-4 overflow-hidden">
                {/* Big decorative backdrop quote mark */}
                <Quote className="absolute right-8 top-8 w-24 h-24 text-slate-100 dark:text-slate-900 stroke-[1.5] -z-0 pointer-events-none" />

                <div className="relative z-10 space-y-6 flex flex-col md:flex-row gap-8 items-center md:items-start text-center md:text-left">
                  
                  {/* Photo Profile */}
                  <div className="shrink-0 relative">
                    <div className="absolute inset-0 bg-gradient-to-tr from-blue-600 to-indigo-505 rounded-full blur-sm scale-105 opacity-60" />
                    <img
                      src={REVIEWS[currentIndex].image}
                      alt={REVIEWS[currentIndex].name}
                      className="relative w-24 h-24 rounded-full object-cover ring-4 ring-white dark:ring-slate-900 shadow-inner"
                      referrerPolicy="no-referrer"
                    />
                  </div>

                  {/* Text Description Block */}
                  <div className="space-y-4">
                    {/* Ratings */}
                    <div className="flex items-center justify-center md:justify-start space-x-1">
                      {Array.from({ length: 5 }).map((_, i) => (
                        <Star
                          key={i}
                          className={`w-5 h-5 ${
                            i < Math.floor(REVIEWS[currentIndex].rating)
                              ? 'text-amber-400 fill-amber-400'
                              : 'text-slate-300 dark:text-slate-700'
                          }`}
                        />
                      ))}
                    </div>

                    <p className="text-slate-650 dark:text-slate-300 text-base md:text-lg italic leading-relaxed">
                      "{REVIEWS[currentIndex].text}"
                    </p>

                    <div>
                      <h4 className="text-lg font-black text-slate-850 dark:text-white">
                        {REVIEWS[currentIndex].name}
                      </h4>
                      <p className="text-xs text-blue-600 dark:text-blue-400 font-bold block mt-0.5 uppercase tracking-wider">
                        {REVIEWS[currentIndex].role}
                      </p>
                    </div>
                  </div>

                </div>
              </div>

            </div>
          </div>

          {/* Dots Indicator bullets */}
          <div className="flex justify-center space-x-2.5 mt-8">
            {REVIEWS.map((_, idx) => (
              <button
                key={idx}
                onClick={() => setCurrentIndex(idx)}
                className={`h-2 rounded-full transition-all duration-300 ${
                  currentIndex === idx ? 'w-8 bg-blue-600' : 'w-2 bg-slate-300 dark:bg-slate-700 hover:bg-slate-400'
                }`}
                aria-label={`Go to testimonial ${idx + 1}`}
              />
            ))}
          </div>

        </div>
      </div>
    </section>
  );
}
