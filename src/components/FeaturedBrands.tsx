import React from 'react';
import { FEATURED_BRANDS } from '../data';

export default function FeaturedBrands() {
  return (
    <section className="py-12 bg-slate-50 dark:bg-slate-900 border-y border-slate-200/65 dark:border-slate-800/65 transition-colors duration-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <p className="text-center text-xs font-bold uppercase tracking-widest text-slate-400 dark:text-slate-500 mb-8">
          Authorized Partner & Stockist of Leading Mobile Brands
        </p>
        
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-6">
          {FEATURED_BRANDS.map((brand) => (
            <div
              key={brand.name}
              className="flex flex-col items-center justify-center p-6 bg-white dark:bg-slate-800 rounded-2xl shadow-sm hover:shadow-md hover:-translate-y-1 transition-all duration-300 border border-slate-100 dark:border-slate-800 text-center cursor-default group"
            >
              <div className="text-4xl mb-3 transform group-hover:scale-110 transition-transform duration-300">
                {brand.logo}
              </div>
              <h4 className="text-base font-bold text-slate-800 dark:text-white transition-colors">
                {brand.name}
              </h4>
              <p className="text-xxs text-slate-400 dark:text-slate-500 mt-1.5 leading-normal">
                {brand.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
