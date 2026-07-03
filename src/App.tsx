/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import Navbar from './components/Navbar';
import Hero from './components/Hero';
import Services from './components/Services';
import Skills from './components/BentoGrid';
import Reviews from './components/Reviews';
import ContactForm from './components/ContactForm';
import Chatbot from './components/Chatbot';
import { Github, Linkedin, Mail, ShieldAlert, ArrowUp } from 'lucide-react';
import { useState, useEffect } from 'react';

export default function App() {
  const [showScrollTop, setShowScrollTop] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setShowScrollTop(window.scrollY > 400);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleScrollTo = (elementId: string) => {
    const el = document.getElementById(elementId);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  return (
    <div className="min-h-screen bg-white text-neutral-900 flex flex-col justify-between selection:bg-emerald-100 selection:text-emerald-800">
      {/* Header Navigation */}
      <Navbar onScrollTo={handleScrollTo} />

      {/* Main Content Sections */}
      <main className="flex-1">
        {/* Hero Section */}
        <Hero onScrollTo={handleScrollTo} />

        {/* Technical Arsenal / Skills */}
        <Skills />

        {/* Reviews (International & Local Testimonials) */}
        <Reviews />

        {/* Developer Capabilities / Services */}
        <Services />

        {/* Intake / Contact Form */}
        <ContactForm />
      </main>

      {/* Custom Footer */}
      <footer className="bg-neutral-50 border-t border-neutral-200 py-12 relative">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="grid grid-cols-1 md:grid-cols-12 gap-8 items-start">
            
            {/* Column 1: Brand details */}
            <div className="md:col-span-5 flex flex-col items-start text-left">
              <div className="flex items-center space-x-2 mb-4">
                <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-emerald-500 to-indigo-600 flex items-center justify-center font-mono font-bold text-white text-sm">
                  MK
                </div>
                <span className="font-display font-extrabold text-neutral-900 text-lg tracking-tight">
                  MEHAAL KHATTAK
                </span>
              </div>
              <p className="font-sans text-xs text-neutral-600 max-w-sm leading-relaxed mb-6">
                Strategic automations developer specializing in Model Context Protocol, autonomous LLM tools, cloud structures, and quant systems. Helping enterprises automate repetitive cognitive workflows.
              </p>
              
              {/* Social Channels */}
              <div className="flex space-x-4">
                <a
                  href="https://github.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-2 bg-white border border-neutral-200 hover:border-neutral-300 rounded-lg text-neutral-500 hover:text-neutral-900 transition-colors cursor-pointer"
                  title="GitHub Profile"
                >
                  <Github className="w-4.5 h-4.5" />
                </a>
                <a
                  href="https://linkedin.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-2 bg-white border border-neutral-200 hover:border-neutral-300 rounded-lg text-neutral-500 hover:text-neutral-900 transition-colors cursor-pointer"
                  title="LinkedIn Connection"
                >
                  <Linkedin className="w-4.5 h-4.5" />
                </a>
                <a
                  href="mailto:mehaalkhan.2@gmail.com"
                  className="p-2 bg-white border border-neutral-200 hover:border-neutral-300 rounded-lg text-neutral-500 hover:text-neutral-900 transition-colors cursor-pointer"
                  title="Send Direct Email"
                >
                  <Mail className="w-4.5 h-4.5" />
                </a>
              </div>
            </div>

            {/* Column 2: System Indices */}
            <div className="md:col-span-4 flex flex-col items-start text-left">
              <h4 className="font-mono text-[9px] tracking-wider text-neutral-500 uppercase mb-4 font-bold">
                Developer Directory
              </h4>
              <ul className="space-y-2.5 font-sans text-xs text-neutral-600">
                <li>
                  <button onClick={() => handleScrollTo('hero')} className="hover:text-emerald-600 transition-colors focus:outline-none cursor-pointer">
                    Overview Profile
                  </button>
                </li>
                <li>
                  <button onClick={() => handleScrollTo('expertise')} className="hover:text-emerald-600 transition-colors focus:outline-none cursor-pointer">
                    Technical Arsenal
                  </button>
                </li>
                <li>
                  <button onClick={() => handleScrollTo('reviews')} className="hover:text-emerald-600 transition-colors focus:outline-none cursor-pointer">
                    Client Testimonials
                  </button>
                </li>
                <li>
                  <button onClick={() => handleScrollTo('services')} className="hover:text-emerald-600 transition-colors focus:outline-none cursor-pointer">
                    Core Capabilities
                  </button>
                </li>
                <li>
                  <button onClick={() => handleScrollTo('contact')} className="hover:text-emerald-600 transition-colors focus:outline-none cursor-pointer">
                    Brief intake form
                  </button>
                </li>
              </ul>
            </div>

            {/* Column 3: Contact Details */}
            <div className="md:col-span-3 flex flex-col items-start text-left">
              <h4 className="font-mono text-[9px] tracking-wider text-neutral-500 uppercase mb-4 font-bold">
                Operational Status
              </h4>
              <div className="space-y-3 font-sans text-xs text-neutral-600 w-full">
                <div className="flex items-center space-x-2">
                  <span className="relative flex h-2 w-2 shrink-0">
                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                    <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
                  </span>
                  <span className="text-neutral-900 font-bold">Available for Contracts</span>
                </div>
                
                <div className="pt-2 border-t border-neutral-200 text-[11px] text-neutral-500 leading-normal">
                  Email: <a href="mailto:mehaalkhan.2@gmail.com" className="text-neutral-600 hover:text-emerald-600 transition-colors">mehaalkhan.2@gmail.com</a>
                  <br />
                  SLA: Inquiries triage under 24 hours.
                </div>
              </div>
            </div>

          </div>

          {/* Copyright Row */}
          <div className="border-t border-neutral-200 mt-12 pt-6 flex flex-col sm:flex-row items-center justify-between gap-4 font-mono text-[9px] text-neutral-500 text-left">
            <span>
              &copy; {new Date().getFullYear()} Mehaal Khattak. All rights reserved.
            </span>
            <div className="flex items-center space-x-1">
              <ShieldAlert className="w-3.5 h-3.5 text-neutral-400" />
              <span>Engineered with pure React, Tailwind, and Motion.</span>
            </div>
          </div>
        </div>
      </footer>

      {/* Scroll to Top Trigger */}
      {showScrollTop && (
        <button
          onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
          className="fixed bottom-6 right-24 p-3 bg-white/90 border border-neutral-200 text-emerald-600 hover:text-emerald-700 rounded-xl shadow-md backdrop-blur-sm z-50 transition-all duration-300 hover:-translate-y-1 active:translate-y-0 focus:outline-none cursor-pointer"
          id="scroll-to-top-btn"
          title="Scroll to Top"
        >
          <ArrowUp className="w-4 h-4 stroke-[2.5]" />
        </button>
      )}

      {/* Floating Interactive Chatbot Agent */}
      <Chatbot />
    </div>
  );
}

