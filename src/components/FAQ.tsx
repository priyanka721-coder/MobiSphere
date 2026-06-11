import React, { useState } from 'react';
import { ChevronDown, ChevronUp, HelpCircle } from 'lucide-react';
import { FAQS } from '../data';

export default function FAQ() {
  const [openId, setOpenId] = useState<string | null>('f1'); // Keep first open by default

  const toggleFAQ = (id: string) => {
    setOpenId(openId === id ? null : id);
  };

  return (
    <section id="faq" className="py-20 bg-white dark:bg-slate-950 transition-colors duration-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header Title */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <span className="text-sm font-bold text-blue-600 dark:text-blue-400 uppercase tracking-widest">
            Got Questions? We Have Answers
          </span>
          <h2 className="text-3xl sm:text-4xl font-black mt-2 text-slate-900 dark:text-white tracking-tight">
            Frequently Asked Queries
          </h2>
          <p className="text-slate-500 dark:text-slate-400 mt-4 leading-relaxed font-light text-sm md:text-base">
            Get instant solutions explaining smartphone trade-ins, certified repair warranty periods, data transfers, and standard payment installment setups.
          </p>
        </div>

        {/* FAQ Accordion Lists */}
        <div className="max-w-3xl mx-auto space-y-4">
          {FAQS.map((faq) => {
            const isOpen = openId === faq.id;
            return (
              <div
                key={faq.id}
                id={`faq-row-${faq.id}`}
                className={`bg-slate-50 dark:bg-slate-900 rounded-2.5xl border transition-all duration-300 overflow-hidden ${
                  isOpen
                    ? 'border-blue-500/30 dark:border-blue-500/25 shadow-lg bg-white dark:bg-slate-850'
                    : 'border-slate-100 dark:border-slate-850 hover:border-slate-200 dark:hover:border-slate-800'
                }`}
              >
                {/* Trigger Row */}
                <button
                  onClick={() => toggleFAQ(faq.id)}
                  className="w-full flex items-center justify-between text-left p-6 md:p-7 select-none"
                  aria-expanded={isOpen}
                >
                  <div className="flex items-start space-x-4 min-w-0 pr-4">
                    <HelpCircle className={`w-5.5 h-5.5 shrink-0 mt-0.5 transition-colors ${isOpen ? 'text-blue-600 dark:text-blue-400' : 'text-slate-400'}`} />
                    <h3 className="text-base md:text-lg font-bold text-slate-850 dark:text-white leading-snug">
                      {faq.question}
                    </h3>
                  </div>
                  <div className={`p-1.5 rounded-lg bg-slate-100 dark:bg-slate-800 text-slate-500 dark:text-slate-400 shrink-0 transform transition-transform duration-300 ${isOpen ? 'rotate-180 bg-blue-50 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400' : ''}`}>
                    <ChevronDown className="w-5 h-5" />
                  </div>
                </button>

                {/* Collapsible Content */}
                <div
                  className={`transition-all duration-350 ease-in-out ${
                    isOpen ? 'max-h-[300px] border-t border-slate-150/50 dark:border-slate-800/80' : 'max-h-0'
                  }`}
                >
                  <div className="p-6 md:p-7">
                    <p className="text-slate-500 dark:text-slate-350 text-sm leading-relaxed">
                      {faq.answer}
                    </p>
                    <div className="mt-4 flex items-center space-x-2">
                      <span className="text-xxs font-black tracking-widest bg-blue-500/10 text-blue-600 dark:text-blue-400 uppercase rounded px-2 py-0.5">
                        {faq.category} Info
                      </span>
                    </div>
                  </div>
                </div>

              </div>
            );
          })}
        </div>

        {/* Contact fallback banner */}
        <div className="text-center mt-12">
          <p className="text-sm text-slate-500 dark:text-slate-400">
            Still got questions? Drop us a query on our live chat or contact form page.{' '}
            <a
              href="https://wa.me/15550199?text=Hello%20Mobile%20Shop!%20I%20have%20an%20unlisted%20query."
              target="_blank"
              rel="noopener noreferrer"
              className="font-bold text-blue-600 dark:text-blue-400 hover:underline"
            >
              Ask on WhatsApp
            </a>
          </p>
        </div>

      </div>
    </section>
  );
}
