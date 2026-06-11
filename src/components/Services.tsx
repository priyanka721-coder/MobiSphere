import React, { useState } from 'react';
import * as Icons from 'lucide-react';
import { SERVICES } from '../data';
import { Service } from '../types';

export default function Services() {
  const [selectedService, setSelectedService] = useState<Service | null>(null);

  // Dynamic icon helper to avoid raw string evaluation crashes
  const renderIcon = (iconName: string) => {
    switch (iconName) {
      case 'Smartphone':
      case 'SmartphoneIcon':
        return <Icons.Smartphone className="w-7 h-7" />;
      case 'Wrench':
        return <Icons.Wrench className="w-7 h-7" />;
      case 'Sparkles':
        return <Icons.Sparkles className="w-7 h-7" />;
      case 'Cpu':
        return <Icons.Cpu className="w-7 h-7" />;
      case 'Watch':
        return <Icons.Watch className="w-7 h-7" />;
      case 'Database':
        return <Icons.Database className="w-7 h-7" />;
      case 'Headphones':
        return <Icons.Headphones className="w-7 h-7" />;
      default:
        return <Icons.Settings className="w-7 h-7" />;
    }
  };

  return (
    <section id="services" className="py-20 bg-slate-50 dark:bg-slate-900 transition-colors duration-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Title Block */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <span className="text-sm font-bold text-blue-600 dark:text-blue-400 uppercase tracking-widest">
            Expert Tech Ecosystem
          </span>
          <h2 className="text-3xl sm:text-4xl font-black mt-2 text-slate-900 dark:text-white tracking-tight">
            Comprehensive Services We Offer
          </h2>
          <p className="text-slate-500 dark:text-slate-400 mt-4 leading-relaxed">
            From picking absolute premium flagships to rendering surgical repair works, our crew provides top-tier support. Click any service card to view extra details.
          </p>
        </div>

        {/* Services Grid */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {SERVICES.map((service, index) => (
            <div
              key={service.id}
              id={`service-card-${index}`}
              onClick={() => setSelectedService(service)}
              className="group relative bg-white dark:bg-slate-800 p-8 rounded-3xl border border-slate-100 dark:border-slate-850 hover:-translate-y-2 hover:shadow-2xl hover:border-blue-500/30 transition-all duration-350 cursor-pointer overflow-hidden flex flex-col justify-between"
            >
              {/* Highlight gradient background corner block */}
              <div className="absolute top-0 right-0 w-24 h-24 bg-gradient-to-bl from-blue-600/10 to-indigo-600/5 dark:from-blue-500/10 dark:to-transparent rounded-bl-full transition-all duration-300" />
              
              <div>
                {/* Icon block */}
                <div className="p-4 bg-blue-50 dark:bg-slate-900 text-blue-600 dark:text-blue-400 rounded-2xl w-fit mb-6 group-hover:bg-gradient-to-br group-hover:from-blue-600 group-hover:to-indigo-500 group-hover:text-white group-hover:scale-110 shadow-sm transition-all duration-300">
                  {renderIcon(service.iconName)}
                </div>

                <h3 className="text-xl font-bold text-slate-800 dark:text-white group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors duration-200">
                  {service.title}
                </h3>
                
                <p className="text-slate-500 dark:text-slate-400 text-sm mt-3 leading-relaxed">
                  {service.description.substring(0, 110) + '...'}
                </p>
              </div>

              <div className="mt-6 flex items-center text-xs font-bold text-blue-600 dark:text-blue-400 group-hover:translate-x-1.5 transition-transform duration-300">
                <span>View Full Details</span>
                <Icons.ArrowRight className="w-4 h-4 ml-1.5" />
              </div>
            </div>
          ))}
        </div>

        {/* Diagnostic CTA bar */}
        <div className="mt-16 bg-gradient-to-r from-blue-600 to-indigo-700 dark:from-blue-900 dark:to-indigo-950 p-8 md:p-10 rounded-3xl text-white shadow-xl flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="max-w-2xl text-center md:text-left">
            <h3 className="text-2xl font-bold">Unsure what is wrong with your device?</h3>
            <p className="text-blue-100 text-sm mt-2 leading-relaxed">
              Bring your handset today for a 100% free external inspection and quick diagnostics. Our hardware certified expert engineers solve most issues within 45 minutes of booking!
            </p>
          </div>
          <a
            href="https://wa.me/15550199?text=Hello%20Mobile%20Shop!%20My%20smartphone%20needs%2520repairing."
            target="_blank"
            rel="noopener noreferrer"
            className="shrink-0 bg-white hover:bg-slate-55 hover:scale-105 active:scale-95 text-blue-900 font-bold px-7 py-3.5 rounded-xl shadow-lg transition-all flex items-center space-x-2"
          >
            <Icons.Calendar className="w-5 h-5 text-blue-600" />
            <span>Book Instant Diagnostics</span>
          </a>
        </div>

        {/* Modals: Service Detail Overlay (LightBox/Dialog style) */}
        {selectedService && (
          <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-md animate-in fade-in duration-200">
            <div
              id="service-detail-modal"
              className="bg-white dark:bg-slate-900 rounded-3xl max-w-xl w-full p-6 md:p-8 border border-slate-200 dark:border-slate-800 shadow-2xl relative animate-in zoom-in-95 duration-200"
            >
              {/* Close Button */}
              <button
                onClick={() => setSelectedService(null)}
                className="absolute top-5 right-5 p-2 rounded-xl bg-slate-100 hover:bg-slate-200 dark:bg-slate-800 dark:hover:bg-slate-750 text-slate-500 dark:text-slate-400 transition-colors"
                aria-label="Close modal"
              >
                <Icons.X className="w-5 h-5" />
              </button>

              <div className="flex items-center space-x-4 mb-6">
                <div className="p-4 bg-blue-50 dark:bg-slate-800 rounded-2xl text-blue-600 dark:text-blue-400">
                  {renderIcon(selectedService.iconName)}
                </div>
                <div>
                  <h3 className="text-2xl font-black text-slate-900 dark:text-white">
                    {selectedService.title}
                  </h3>
                  <span className="text-xs bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 font-bold px-2.5 py-1 rounded-full uppercase mt-1 inline-block">
                    Available Today
                  </span>
                </div>
              </div>

              <div className="space-y-4">
                <p className="text-slate-650 dark:text-slate-300 text-base leading-relaxed">
                  {selectedService.description}
                </p>
                {selectedService.longDesc && (
                  <div className="bg-slate-50 dark:bg-slate-950 p-5 rounded-2xl border border-slate-100 dark:border-slate-850">
                    <h4 className="text-sm font-bold text-slate-850 dark:text-white uppercase tracking-wider mb-2">
                      Engineered Execution
                    </h4>
                    <p className="text-sm text-slate-500 dark:text-slate-400 leading-relaxed">
                      {selectedService.longDesc}
                    </p>
                  </div>
                )}
              </div>

              <div className="mt-8 flex flex-col sm:flex-row items-center gap-3">
                <a
                  href={`https://wa.me/15550199?text=Hello%20Mobile%20Shop!%20I%20am%20interested%20in%20your%20service%3A%20${encodeURIComponent(selectedService.title)}.`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full text-center bg-blue-600 hover:bg-blue-500 text-white font-bold py-3.5 rounded-xl transition-all shadow-md flex items-center justify-center space-x-2"
                >
                  <Icons.MessageCircle className="w-5 h-5" />
                  <span>Inquire via WhatsApp</span>
                </a>
                <button
                  onClick={() => setSelectedService(null)}
                  className="w-full bg-slate-100 hover:bg-slate-200 dark:bg-slate-805 dark:hover:bg-slate-800 text-slate-700 dark:text-slate-350 font-bold py-3.5 rounded-xl transition-all border border-slate-200/50 dark:border-slate-700/50"
                >
                  Close Window
                </button>
              </div>
            </div>
          </div>
        )}

      </div>
    </section>
  );
}
