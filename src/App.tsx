import React, { useState, useEffect } from 'react';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import FeaturedBrands from './components/FeaturedBrands';
import About from './components/About';
import Services from './components/Services';
import Products from './components/Products';
import Portfolio from './components/Portfolio';
import WhyChooseUs from './components/WhyChooseUs';
import Testimonials from './components/Testimonials';
import FAQ from './components/FAQ';
import Contact from './components/Contact';
import Footer from './components/Footer';
import FloatingWidgets from './components/FloatingWidgets';

export default function App() {
  const [darkMode, setDarkMode] = useState<boolean>(() => {
    // Sync with persistent preferences if available
    const saved = localStorage.getItem('theme');
    return saved === 'dark' || (!saved && window.matchMedia('(prefers-color-scheme: dark)').matches);
  });

  const [activeSection, setActiveSection] = useState<string>('home');

  // Sync index.html root body with dark mode state
  useEffect(() => {
    if (darkMode) {
      document.documentElement.classList.add('dark');
      localStorage.setItem('theme', 'dark');
    } else {
      document.documentElement.classList.remove('dark');
      localStorage.setItem('theme', 'light');
    }
  }, [darkMode]);

  // Track scroll positions to update active navbar indicators
  useEffect(() => {
    const sections = ['home', 'about', 'services', 'products', 'portfolio', 'why-us', 'testimonials', 'faq', 'contact'];
    
    const observerOptions = {
      root: null,
      rootMargin: '-30% 0px -40% 0px', // Center-focused highlight
      threshold: 0,
    };

    const observerCallback = (entries: IntersectionObserverEntry[]) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          setActiveSection(entry.target.id);
        }
      });
    };

    const observer = new IntersectionObserver(observerCallback, observerOptions);
    sections.forEach((id) => {
      const el = document.getElementById(id);
      if (el) observer.observe(el);
    });

    return () => {
      sections.forEach((id) => {
        const el = document.getElementById(id);
        if (el) observer.unobserve(el);
      });
    };
  }, []);

  const scrollToSection = (id: string) => {
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
      setActiveSection(id);
    }
  };

  return (
    <div className="min-h-screen bg-white dark:bg-slate-950 text-slate-800 dark:text-slate-100 transition-colors duration-300 font-sans antialiased overflow-x-hidden">
      
      {/* Sticky Top-level Navigation */}
      <Navbar
        darkMode={darkMode}
        setDarkMode={setDarkMode}
        activeSection={activeSection}
        scrollToSection={scrollToSection}
      />

      {/* Main Page Layout Content */}
      <main>
        {/* Hero Section Banner */}
        <Hero scrollToSection={scrollToSection} />

        {/* Featured Brands Grid */}
        <FeaturedBrands />

        {/* About Company Showcase */}
        <About />

        {/* Services & Maintenance Offers */}
        <Services />

        {/* Products Showcase Catalog */}
        <Products />

        {/* Portfolio Showroom Gallery Grid */}
        <Portfolio />

        {/* Value Proposition Credentials */}
        <WhyChooseUs />

        {/* Autoplay Reviews Carousel */}
        <Testimonials />

        {/* Expandable FAQ Collapsibles */}
        <FAQ />

        {/* Dynamic Contact Form & Mock Directions Map */}
        <Contact />
      </main>

      {/* Footer copyright and newsletter hooks */}
      <Footer scrollToSection={scrollToSection} />

      {/* Floating back-to-top and WhatsApp direct pins */}
      <FloatingWidgets />

    </div>
  );
}
