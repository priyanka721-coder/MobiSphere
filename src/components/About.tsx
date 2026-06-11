import React, { useState, useEffect } from 'react';
import { Smartphone, ShieldCheck, Heart, Zap, Award } from 'lucide-react';
import { COMP_STATS } from '../data';

export default function About() {
  const [counts, setCounts] = useState(COMP_STATS.map(() => 0));

  useEffect(() => {
    const duration = 2000; // Animation duration in ms
    const steps = 50;
    const stepTime = duration / steps;
    
    let currentStep = 0;
    const timer = setInterval(() => {
      currentStep++;
      setCounts(
        COMP_STATS.map((stat, idx) => {
          const target = stat.value;
          const currentVal = Math.floor((target / steps) * currentStep);
          return currentVal >= target ? target : currentVal;
        })
      );

      if (currentStep >= steps) {
        clearInterval(timer);
        setCounts(COMP_STATS.map((stat) => stat.value));
      }
    }, stepTime);

    return () => clearInterval(timer);
  }, []);

  const specializations = [
    { title: 'Flagship Smartphone Sales', desc: 'Secure the newest dual-SIM, eSIM, and titan flagship devices before anyone else.', icon: Smartphone },
    { title: 'Device Repair Services', desc: 'Motherboard restoration, fast water reclamation, and screen repairs with genuine spares.', icon: Zap },
    { title: 'Premium Accessories Shop', desc: 'Anker fast GaN power hubs, certified drop cases, and high-fidelity noise reduction buds.', icon: Award },
    { title: 'Ultimate Customer Support', desc: 'Round-the-clock remote troubleshooting and mail-in diagnostic support.', icon: ShieldCheck },
  ];

  return (
    <section id="about" className="py-20 bg-white dark:bg-slate-950 transition-colors duration-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-12 gap-12 items-center">
          
          {/* Left panel - Visual intro */}
          <div className="lg:col-span-5 flex flex-col space-y-6">
            <span className="text-sm font-bold text-blue-600 dark:text-blue-400 uppercase tracking-widest">
              Established in 2016
            </span>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 dark:text-white tracking-tight">
              Leading the Smartphone & IoT Device Revolution
            </h2>
            <p className="text-base text-slate-600 dark:text-slate-300 leading-relaxed">
              At Mobile Shop, we don\'t just sell devices; we connect lives, power dreams, and secure investments. What started as a dedicated repair workshop has expanded into a state-of-the-art interactive electronic showroom and repair hub.
            </p>
            <p className="text-base text-slate-605 dark:text-slate-300/90 leading-relaxed">
              Every gadget leaving our catalog goes through rigorous multi-point visual, hardware, and battery health inspections. Our passion is to render absolute peace of mind with authentic customer care and honest local pricing.
            </p>

            {/* Core credentials badges */}
            <div className="flex flex-wrap gap-4 pt-2">
              <div className="flex items-center space-x-2 bg-slate-100 dark:bg-slate-800 rounded-xl px-4 py-2 text-xs font-semibold text-slate-700 dark:text-slate-200">
                <ShieldCheck className="w-4 h-4 text-emerald-500" />
                <span>OEM Certified Parts</span>
              </div>
              <div className="flex items-center space-x-2 bg-slate-100 dark:bg-slate-800 rounded-xl px-4 py-2 text-xs font-semibold text-slate-700 dark:text-slate-200">
                <Heart className="w-4 h-4 text-rose-500" />
                <span>100% Client Trust</span>
              </div>
            </div>
          </div>

          {/* Right panel - Services bullet highlight & counters */}
          <div className="lg:col-span-7 flex flex-col space-y-8">
            <div className="grid sm:grid-cols-2 gap-6">
              {specializations.map((spec) => {
                const IconComponent = spec.icon;
                return (
                  <div
                    key={spec.title}
                    id={`spec-card-${spec.title.replace(/\s+/g, '-').toLowerCase()}`}
                    className="p-5 rounded-2xl bg-slate-50 dark:bg-slate-900 border border-slate-100 dark:border-slate-850 hover:shadow-lg transition-shadow duration-300"
                  >
                    <div className="p-3 bg-blue-550/10 dark:bg-blue-400/10 text-blue-600 dark:text-blue-400 rounded-xl w-fit mb-4">
                      <IconComponent className="w-5 h-5" />
                    </div>
                    <h3 className="text-lg font-bold text-slate-800 dark:text-white mb-2">
                      {spec.title}
                    </h3>
                    <p className="text-sm text-slate-500 dark:text-slate-450 leading-relaxed">
                      {spec.desc}
                    </p>
                  </div>
                );
              })}
            </div>

            {/* Statistics Row with animated counter state */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6 bg-gradient-to-br from-blue-700 to-indigo-800 dark:from-blue-900 dark:to-indigo-950 p-6 rounded-3xl text-white shadow-xl">
              {COMP_STATS.map((stat, index) => (
                <div key={stat.label} className="text-center">
                  <span className="text-3xl md:text-4xl font-extrabold block">
                    {counts[index]}
                    {stat.suffix}
                  </span>
                  <span className="text-xs text-blue-200 font-medium tracking-wide block mt-1 uppercase">
                    {stat.label}
                  </span>
                </div>
              ))}
            </div>

          </div>

        </div>
      </div>
    </section>
  );
}
