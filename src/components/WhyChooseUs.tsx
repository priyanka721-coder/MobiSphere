import React from 'react';
import { ShieldCheck, Tags, Award, Zap, Heart, Users, Star } from 'lucide-react';

export default function WhyChooseUs() {
  const reasons = [
    {
      title: 'Genuine Products Only',
      desc: 'All devices are brand new with pristine factory sealing and certified global manufacturer backing. Zero refurbs, zero worry.',
      icon: ShieldCheck,
      color: 'from-emerald-500 to-teal-600',
    },
    {
      title: 'Guaranteed Best Prices',
      desc: 'We match or beat any local physical retailer on smartphone flagships and IoT gadget models. Transparent rates with zero hidden steps.',
      icon: Tags,
      color: 'from-amber-400 to-orange-500',
    },
    {
      title: 'Certified Expert Engineers',
      desc: 'Our component-level maintenance repairs are executed exclusively by apple-certified and hardware-trained expert clinicians.',
      icon: Award,
      color: 'from-blue-500 to-indigo-600',
    },
    {
      title: '45-Min Fast Repairs',
      desc: 'Screen swaps, custom battery updates, and charging ports replacements done while you wait over a free espresso lounge drink.',
      icon: Zap,
      color: 'from-purple-500 to-pink-600',
    },
    {
      title: '180-Day Secure Warranty',
      desc: 'Sleep soundly knowing every repair, micro component, and product casing carries our premium post-repair warranty support structures.',
      icon: Heart,
      color: 'from-rose-500 to-red-600',
    },
    {
      title: 'Loved by Thousands',
      desc: 'A proud 4.9-star rating on Google and Trustpilot with over 5,000+ local customers trusting our smartphone knowledge base.',
      icon: Users,
      color: 'from-cyan-500 to-sky-600',
    },
  ];

  return (
    <section id="why-us" className="py-20 bg-white dark:bg-slate-950 transition-colors duration-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header content */}
        <div className="grid lg:grid-cols-12 gap-8 items-center mb-16">
          <div className="lg:col-span-6">
            <span className="text-sm font-bold text-blue-600 dark:text-blue-400 uppercase tracking-widest">
              Unmatched Value Proposition
            </span>
            <h2 className="text-3xl sm:text-4xl font-black mt-2 text-slate-900 dark:text-white tracking-tight leading-none">
              Why Smartphone Collectors Choose MobiSphere
            </h2>
          </div>
          <div className="lg:col-span-6">
            <p className="text-slate-500 dark:text-slate-400 leading-relaxed text-sm lg:text-base">
              For over a decade we have prioritized top-tier technical proficiency, pristine original equipment manufacturer (OEM) replacement parts, and upfront local pricing tags. Experience gadget shopping done right.
            </p>
          </div>
        </div>

        {/* Features grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {reasons.map((reason, index) => {
            const IconComponent = reason.icon;
            return (
              <div
                key={reason.title}
                id={`why-card-${index}`}
                className="group relative p-8 bg-slate-50 dark:bg-slate-900 rounded-3xl border border-slate-100 dark:border-slate-850 hover:bg-white dark:hover:bg-slate-850 hover:shadow-2xl hover:border-blue-500/10 hover:-translate-y-1.5 transition-all duration-300"
              >
                {/* Dynamic corner abstract dot */}
                <span className="absolute top-6 right-6 text-slate-150 dark:text-slate-800 text-3xl font-black leading-none select-none">
                  0{index + 1}
                </span>

                {/* Left high impact color pillar */}
                <div className={`p-3.5 rounded-2xl bg-gradient-to-br ${reason.color} text-white w-fit mb-6 shadow-md shadow-blue-550/10 group-hover:scale-110 transition-transform`}>
                  <IconComponent className="w-5.5 h-5.5" />
                </div>

                <h3 className="text-xl font-bold text-slate-850 dark:text-white mb-3">
                  {reason.title}
                </h3>

                <p className="text-slate-500 dark:text-slate-400 text-sm leading-relaxed">
                  {reason.desc}
                </p>
              </div>
            );
          })}
        </div>

        {/* trust endorsement segment */}
        <div className="mt-16 bg-slate-50 dark:bg-slate-900 p-8 rounded-3xl border border-slate-100 dark:border-slate-800/80 text-center max-w-4xl mx-auto flex flex-col sm:flex-row items-center justify-center gap-6">
          <div className="flex -space-x-3 overflow-hidden shrink-0">
            <img className="inline-block h-11 w-11 rounded-full ring-4 ring-white dark:ring-slate-900" src="https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=80&q=80" alt="patron" />
            <img className="inline-block h-11 w-11 rounded-full ring-4 ring-white dark:ring-slate-900" src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=80&q=80" alt="patron" />
            <img className="inline-block h-11 w-11 rounded-full ring-4 ring-white dark:ring-slate-900" src="https://images.unsplash.com/photo-1438761681033-6461ffad8d80?auto=format&fit=crop&w=80&q=80" alt="patron" />
            <img className="inline-block h-11 w-11 rounded-full ring-4 ring-white dark:ring-slate-900" src="https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=80&q=80" alt="patron" />
          </div>
          <p className="text-slate-600 dark:text-slate-300 text-sm font-semibold max-w-xl text-left">
            "The repair warranty was honored immediately when my charging dock failed. That speaks volumes about physical local store integrity."
            <span className="block text-xs text-blue-600 dark:text-blue-400 font-medium tracking-wide uppercase mt-1.5">— Joined by 5,000+ happy verified residents</span>
          </p>
        </div>

      </div>
    </section>
  );
}
