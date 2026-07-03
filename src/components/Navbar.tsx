/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useState, useEffect } from 'react';
import { Menu, X, ArrowUpRight, ShieldCheck } from 'lucide-react';

interface NavbarProps {
  onScrollTo: (elementId: string) => void;
}

export default function Navbar({ onScrollTo }: NavbarProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { name: 'Overview', id: 'hero' },
    { name: 'Expertise & Skills', id: 'expertise' },
    { name: 'Reviews', id: 'reviews' },
    { name: 'Capabilities', id: 'services' },
    { name: 'Connect', id: 'contact' },
  ];

  const handleLinkClick = (id: string) => {
    setIsOpen(false);
    onScrollTo(id);
  };

  return (
    <nav
      id="navbar"
      className={`fixed top-0 left-0 w-full z-50 transition-all duration-300 ${
        scrolled
          ? 'bg-white/80 backdrop-blur-md border-b border-neutral-200/80 py-3 shadow-sm'
          : 'bg-transparent py-5'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between">
          {/* Logo Brand */}
          <button
            onClick={() => handleLinkClick('hero')}
            className="flex items-center space-x-2 group focus:outline-none"
            id="nav-brand-btn"
          >
            <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-emerald-500 via-teal-600 to-indigo-600 flex items-center justify-center font-mono font-bold text-white text-lg tracking-wider group-hover:scale-105 transition-transform duration-300 shadow-md">
              MK
            </div>
            <div className="flex flex-col items-start text-left">
              <span className="font-display font-bold text-neutral-900 text-base tracking-tight leading-none">
                MEHAAL KHATTAK
              </span>
              <span className="font-mono text-[9px] text-emerald-600 tracking-wider leading-none mt-1">
                AUTOMATIONS &amp; CODE
              </span>
            </div>
          </button>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-6">
            <div className="flex space-x-5">
              {navLinks.map((link) => (
                <button
                  key={link.id}
                  onClick={() => handleLinkClick(link.id)}
                  className="font-sans text-xs lg:text-sm text-neutral-600 hover:text-emerald-600 transition-colors duration-200 cursor-pointer focus:outline-none relative py-1 group"
                  id={`nav-link-${link.id}`}
                >
                  {link.name}
                  <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-emerald-500 transition-all duration-300 group-hover:w-full"></span>
                </button>
              ))}
            </div>

            {/* Availability Beacon */}
            <div className="flex items-center space-x-2 bg-neutral-100 border border-neutral-200 rounded-full px-3 py-1.5">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
              </span>
              <span className="font-mono text-[9px] text-neutral-700 font-medium uppercase tracking-wider">
                Contracts Open
              </span>
            </div>

            {/* Direct Vercel Hub Connection */}
            <a
              href="https://mehaalkhattak.vercel.app"
              target="_blank"
              rel="noopener noreferrer"
              className="border border-neutral-200 hover:border-emerald-500 bg-white hover:bg-emerald-50/20 text-neutral-700 hover:text-emerald-700 font-sans font-bold text-xs py-2 px-3.5 rounded-xl flex items-center space-x-1 transition-all duration-300 hover:shadow-sm active:scale-95 focus:outline-none cursor-pointer"
              id="navbar-vercel-btn"
              title="Launch Primary Vercel Hub"
            >
              <span>Vercel Hub</span>
              <ArrowUpRight className="w-3.5 h-3.5 stroke-[2.5]" />
            </a>

            {/* Inquire Button */}
            <button
              onClick={() => handleLinkClick('contact')}
              className="bg-emerald-500 hover:bg-emerald-400 active:bg-emerald-600 text-white font-sans font-semibold text-xs py-2 px-3.5 rounded-xl flex items-center space-x-1 transition-all duration-300 hover:shadow-lg hover:shadow-emerald-500/10 active:scale-95 focus:outline-none cursor-pointer"
              id="navbar-inquire-btn"
            >
              <span>Brief Project</span>
              <ArrowUpRight className="w-3.5 h-3.5 stroke-[2.5]" />
            </button>
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden flex items-center space-x-2">
            {/* Direct Vercel Hub Connection Mobile Icon */}
            <a
              href="https://mehaalkhattak.vercel.app"
              target="_blank"
              rel="noopener noreferrer"
              className="border border-neutral-200 bg-white text-neutral-700 font-sans font-bold text-[10px] py-1.5 px-2.5 rounded-lg flex items-center space-x-1 focus:outline-none"
              id="navbar-vercel-mobile-btn"
            >
              <span>Vercel Hub</span>
              <ArrowUpRight className="w-3 h-3 stroke-[2.5]" />
            </a>

            <div className="flex items-center space-x-1.5 bg-neutral-100 border border-neutral-200 rounded-full px-2.5 py-1">
              <span className="relative flex h-1.5 w-1.5">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-1.5 w-1.5 bg-emerald-500"></span>
              </span>
              <span className="font-mono text-[8px] text-neutral-700 uppercase tracking-widest">
                Active
              </span>
            </div>
            
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="inline-flex items-center justify-center p-2 rounded-md text-neutral-500 hover:text-neutral-900 hover:bg-neutral-100 focus:outline-none transition-colors"
              aria-expanded="false"
              id="mobile-menu-toggle"
            >
              <span className="sr-only">Open main menu</span>
              {isOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      <div
        className={`md:hidden transition-all duration-300 ease-in-out ${
          isOpen ? 'max-h-screen opacity-100 border-b border-neutral-200' : 'max-h-0 opacity-0 overflow-hidden'
        } bg-white`}
      >
        <div className="px-2 pt-2 pb-4 space-y-1 sm:px-3">
          {navLinks.map((link) => (
            <button
              key={link.id}
              onClick={() => handleLinkClick(link.id)}
              className="block w-full text-left px-3 py-3 rounded-md text-base font-sans font-medium text-neutral-700 hover:text-emerald-600 hover:bg-neutral-50 transition-colors focus:outline-none"
              id={`mobile-nav-link-${link.id}`}
            >
              {link.name}
            </button>
          ))}
          <div className="pt-4 pb-2 border-t border-neutral-100 px-3 flex flex-col space-y-3">
            <a
              href="https://mehaalkhattak.vercel.app"
              target="_blank"
              rel="noopener noreferrer"
              className="w-full border border-neutral-200 text-neutral-700 font-sans font-bold py-3 px-4 rounded-lg flex items-center justify-center space-x-2 bg-white"
              id="mobile-navbar-vercel-hub-btn"
            >
              <span>Open Primary Vercel Hub</span>
              <ArrowUpRight className="w-4 h-4 stroke-[2.5]" />
            </a>
            <button
              onClick={() => handleLinkClick('contact')}
              className="w-full bg-emerald-500 hover:bg-emerald-400 text-white font-sans font-semibold py-3 px-4 rounded-lg flex items-center justify-center space-x-2 transition-all duration-200"
              id="mobile-navbar-inquire-btn"
            >
              <span>Consult Mehaal</span>
              <ArrowUpRight className="w-4.5 h-4.5 stroke-[2.5]" />
            </button>
          </div>
        </div>
      </div>
    </nav>
  );
}
