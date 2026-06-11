import React, { useState, useEffect } from 'react';
import { Mail, Phone, MapPin, Clock, Send, CheckCircle2, MessageCircle, AlertCircle, Share2 } from 'lucide-react';

export default function Contact() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [subject, setSubject] = useState('');
  const [message, setMessage] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitSuccess, setSubmitSuccess] = useState(false);
  
  // Real-time opening status state
  const [isOpenState, setIsOpenState] = useState({ open: true, hoursText: '' });

  useEffect(() => {
    const updateOpeningHours = () => {
      // Evaluate working hours Mon-Sat: 9 AM - 9 PM, Sun: 10 AM - 6 PM
      const now = new Date();
      const currentDay = now.getDay(); // 0 is Sunday, 1-6 Mon-Sat
      const currentHour = now.getHours();

      if (currentDay === 0) {
        // Sunday
        if (currentHour >= 10 && currentHour < 18) {
          setIsOpenState({ open: true, hoursText: 'Open Now — Closes at 6:00 PM' });
        } else {
          setIsOpenState({ open: false, hoursText: 'Closed — Opens Monday at 9:00 AM' });
        }
      } else {
        // Mon-Sat
        if (currentHour >= 9 && currentHour < 21) {
          setIsOpenState({ open: true, hoursText: 'Open Now — Closes at 9:00 PM' });
        } else {
          setIsOpenState({ open: false, hoursText: 'Closed — Opens tomorrow at 9:00 AM' });
        }
      }
    };

    updateOpeningHours();
    const interval = setInterval(updateOpeningHours, 60000); // Check once a min
    return () => clearInterval(interval);
  }, []);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name || !email || !message) return;

    setIsSubmitting(true);
    // Simulate API database posting
    setTimeout(() => {
      setIsSubmitting(false);
      setSubmitSuccess(true);
      // Reset inputs
      setName('');
      setEmail('');
      setSubject('');
      setMessage('');
    }, 1500);
  };

  return (
    <section id="contact" className="py-20 bg-slate-50 dark:bg-slate-900 transition-colors duration-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Title elements */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <span className="text-sm font-bold text-blue-600 dark:text-blue-400 uppercase tracking-widest">
            Immediate Direct Assistance
          </span>
          <h2 className="text-3xl sm:text-4xl font-black mt-2 text-slate-900 dark:text-white tracking-tight">
            Connect With Our Team (MobiSphere)
          </h2>
          <p className="text-slate-500 dark:text-slate-400 mt-4 leading-relaxed font-light">
            Fill out our dynamic feedback form, drop by our physical showroom, dial our support lines, or chat directly via WhatsApp for swift assistance.
          </p>
        </div>

        <div className="grid lg:grid-cols-12 gap-12 items-stretch">
          
          {/* Left panel - Submission form */}
          <div className="lg:col-span-6 bg-white dark:bg-slate-950 p-8 rounded-3xl border border-slate-100 dark:border-slate-850 shadow-xl flex flex-col justify-between">
            <div>
              <h3 className="text-xl font-extrabold text-slate-850 dark:text-white mb-2">Send an Instant Query</h3>
              <p className="text-slate-400 text-xs mb-6">Our standard support representatives reply within 2 working hours max.</p>
              
              {submitSuccess ? (
                <div className="bg-emerald-500/10 border border-emerald-500/30 text-emerald-700 dark:text-emerald-400 p-6 rounded-2xl flex flex-col items-center text-center space-y-3 animate-in zoom-in-95">
                  <CheckCircle2 className="w-10 h-10 text-emerald-500" />
                  <h4 className="text-lg font-bold">Query Dispatched Successfully!</h4>
                  <p className="text-xs text-slate-500 dark:text-slate-400 leading-relaxed max-w-sm">
                    Thank you! Your information has been securely received by our database. We will lock down your reply and send options to your email right away.
                  </p>
                  <button
                    onClick={() => setSubmitSuccess(false)}
                    className="text-xs font-bold text-blue-600 dark:text-blue-400 hover:underline pt-2"
                  >
                    Send another query
                  </button>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-4">
                  <div className="grid sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-bold uppercase text-slate-500 dark:text-slate-400 tracking-wider mb-2">Your Name</label>
                      <input
                        type="text"
                        required
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        placeholder="John Doe"
                        className="w-full bg-slate-50 dark:bg-slate-900 border border-slate-205 dark:border-slate-800 text-slate-800 dark:text-white rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-bold uppercase text-slate-500 dark:text-slate-400 tracking-wider mb-2">Your Email</label>
                      <input
                        type="email"
                        required
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        placeholder="john@example.com"
                        className="w-full bg-slate-50 dark:bg-slate-900 border border-slate-205 dark:border-slate-800 text-slate-800 dark:text-white rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs font-bold uppercase text-slate-500 dark:text-slate-400 tracking-wider mb-2">Subject (Optional)</label>
                    <input
                      type="text"
                      value={subject}
                      onChange={(e) => setSubject(e.target.value)}
                      placeholder="Repair inquiry, wholesale order, etc..."
                      className="w-full bg-slate-50 dark:bg-slate-900 border border-slate-205 dark:border-slate-800 text-slate-800 dark:text-white rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-bold uppercase text-slate-500 dark:text-slate-400 tracking-wider mb-2">My Message</label>
                    <textarea
                      required
                      value={message}
                      onChange={(e) => setMessage(e.target.value)}
                      rows={4}
                      placeholder="Identify device model & share full details here..."
                      className="w-full bg-slate-50 dark:bg-slate-900 border border-slate-205 dark:border-slate-800 text-slate-800 dark:text-white rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all resize-none"
                    />
                  </div>

                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full bg-blue-600 hover:bg-blue-550 disabled:bg-blue-400 text-white font-bold py-3.5 rounded-xl shadow-lg transition-all flex items-center justify-center space-x-2"
                  >
                    {isSubmitting ? (
                      <>
                        <span className="w-5 h-5 rounded-full border-2 border-white border-t-transparent animate-spin inline-block" />
                        <span>Sending Message...</span>
                      </>
                    ) : (
                      <>
                        <Send className="w-4 h-4" />
                        <span>Send Message</span>
                      </>
                    )}
                  </button>
                </form>
              )}
            </div>

            {/* Quick response note */}
            <div className="mt-8 pt-6 border-t border-slate-100 dark:border-slate-900 text-slate-400 text-xxs flex items-center space-x-2">
              <AlertCircle className="w-4 h-4 text-slate-400 shrink-0" />
              <span>By sharing your email, you accept our standard terms and immediate diagnostic booking protocols.</span>
            </div>
          </div>

          {/* Right panel - Contacts & Map Showcase */}
          <div className="lg:col-span-6 flex flex-col space-y-8">
            {/* Quick Contacts details */}
            <div className="grid sm:grid-cols-2 gap-6">
              
              <div className="bg-white dark:bg-slate-950 p-5 rounded-3xl border border-slate-105 dark:border-slate-850 flex items-start space-x-4">
                <div className="p-3 bg-blue-550/10 text-blue-600 rounded-2xl">
                  <Phone className="w-5 h-5" />
                </div>
                <div>
                  <h4 className="text-sm font-bold text-slate-400 uppercase tracking-widest leading-none mb-1">Call Helpline</h4>
                  <span className="text-base font-extrabold text-slate-850 dark:text-white">+1 (555) 0199</span>
                  <span className="block text-xxs text-slate-400 mt-1 dark:text-slate-500">Toll-free, Mon - Sat</span>
                </div>
              </div>

              <div className="bg-white dark:bg-slate-950 p-5 rounded-3xl border border-slate-105 dark:border-slate-850 flex items-start space-x-4">
                <div className="p-3 bg-blue-550/10 text-blue-600 rounded-2xl">
                  <Mail className="w-5 h-5" />
                </div>
                <div>
                  <h4 className="text-sm font-bold text-slate-400 uppercase tracking-widest leading-none mb-1">Email Box</h4>
                  <span className="text-base font-extrabold text-slate-850 dark:text-white truncate block max-w-[180px]">info@mobisphere.tech</span>
                  <span className="block text-xxs text-slate-400 mt-1 dark:text-slate-500">Fast general queries</span>
                </div>
              </div>

              <div className="bg-white dark:bg-slate-950 p-5 rounded-3xl border border-slate-105 dark:border-slate-850 flex items-start space-x-4">
                <div className="p-3 bg-blue-550/10 text-blue-600 rounded-2xl">
                  <MapPin className="w-5 h-5" />
                </div>
                <div>
                  <h4 className="text-sm font-bold text-slate-400 uppercase tracking-widest leading-none mb-1">Our Showroom</h4>
                  <span className="text-sm font-semibold text-slate-850 dark:text-white">108 Tech Boulevard, Ground Level</span>
                  <span className="block text-xxs text-slate-450 dark:text-slate-500 mt-1">Silicon Valley, CA 94025</span>
                </div>
              </div>

              {/* Working hours with LIVE opening hook */}
              <div className="bg-white dark:bg-slate-950 p-5 rounded-3xl border border-slate-105 dark:border-slate-850 flex items-start space-x-4">
                <div className="p-3 bg-blue-550/10 text-blue-600 rounded-2xl">
                  <Clock className="w-5 h-5" />
                </div>
                <div>
                  <h4 className="text-sm font-bold text-slate-400 uppercase tracking-widest leading-none mb-1">Working Hours</h4>
                  <div className="flex items-center space-x-1.5 pt-0.5">
                    <span className={`w-2 h-2 rounded-full inline-block ${isOpenState.open ? 'bg-emerald-500 animate-pulse' : 'bg-red-500'}`} />
                    <span className="text-xs font-bold text-slate-800 dark:text-slate-205">{isOpenState.hoursText}</span>
                  </div>
                  <span className="block text-xxs text-slate-400 mt-1 leading-normal dark:text-slate-500">
                    Mon - Sat: 9 AM - 9 PM <br />
                    Sunday: 10 AM - 6 PM
                  </span>
                </div>
              </div>

            </div>

            {/* Shop location graphical map mockup */}
            <div className="bg-white dark:bg-slate-950 p-6 rounded-3xl border border-slate-105 dark:border-slate-850 shadow-xl flex-grow overflow-hidden flex flex-col justify-between">
              <div>
                <h4 className="text-sm font-extrabold text-slate-800 dark:text-white mb-2">Showroom Location Map</h4>
                <p className="text-slate-400 text-xs mb-4">Direct parking space available. We are situated opposite the Metro Station.</p>
              </div>

              {/* Grid-based custom visual map with streets and pin location */}
              <div className="h-[220px] bg-slate-100 dark:bg-slate-900 rounded-2xl relative overflow-hidden border border-slate-200/55 dark:border-slate-800/60 p-4 select-none">
                
                {/* Visual grid layout pathways */}
                <div className="absolute inset-0 grid grid-cols-6 grid-rows-4 gap-4 opacity-15">
                  {Array.from({ length: 24 }).map((_, i) => (
                    <div key={i} className="border border-slate-450 dark:border-slate-600 rounded" />
                  ))}
                </div>

                {/* Street Lines */}
                <div className="absolute top-1/2 left-0 right-0 h-10 bg-slate-200 dark:bg-slate-800 -translate-y-1/2 border-y border-slate-300/50 dark:border-slate-700/50 transform rotate-1 flex items-center justify-center">
                  <span className="text-[10px] uppercase font-bold tracking-widest text-slate-400 dark:text-slate-500">Tech Boulevard</span>
                </div>
                <div className="absolute left-1/3 top-0 bottom-0 w-8 bg-slate-205 dark:bg-slate-800 border-x border-slate-300/50 dark:border-slate-700/50 transform -rotate-12 flex items-center justify-center">
                  <span className="text-[8px] uppercase font-bold tracking-widest text-slate-400 dark:text-slate-500 transform rotate-90 whitespace-nowrap">Metro Ave</span>
                </div>

                {/* Local Landmarks */}
                <span className="absolute bottom-4 left-6 text-[10px] font-bold text-slate-400 bg-slate-200/50 dark:bg-slate-950/40 px-2 py-0.5 rounded">
                  Central Park
                </span>
                <span className="absolute top-4 right-10 text-[10px] font-bold text-slate-400 bg-slate-200/50 dark:bg-slate-950/40 px-2 py-0.5 rounded">
                  Metro Station
                </span>

                {/* Glowing Location PIN */}
                <div className="absolute top-[42%] left-[45%] transform -translate-x-1/2 -translate-y-1/2 flex flex-col items-center">
                  {/* Ripple pulse effects */}
                  <span className="absolute w-12 h-12 bg-blue-500/25 dark:bg-blue-400/20 rounded-full animate-ping pointer-events-none" />
                  <span className="absolute w-6 h-6 bg-blue-500/35 rounded-full pointer-events-none" />
                  
                  {/* Physical Pin */}
                  <div className="relative p-2 rounded-xl bg-blue-600 text-white shadow-xl flex items-center space-x-1.5 border border-white/20 select-none cursor-default scale-105">
                    <MapPin className="w-4 h-4 animate-bounce" />
                    <span className="text-[10px] font-bold uppercase whitespace-nowrap">MobiSphere</span>
                  </div>
                </div>

              </div>
              
              <div className="mt-4 flex items-center justify-between">
                <span className="text-[10px] font-bold uppercase text-slate-400">GPS Coords: 37.4275° N, 122.1697° W</span>
                <a
                  href="https://maps.google.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-xs font-bold text-blue-600 dark:text-blue-400 hover:underline flex items-center space-x-1.5"
                >
                  <Share2 className="w-3.5 h-3.5" />
                  <span>Get Navigation Directions</span>
                </a>
              </div>
            </div>

          </div>

        </div>
      </div>
    </section>
  );
}
