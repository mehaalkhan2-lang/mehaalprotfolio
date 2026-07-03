/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { motion } from 'motion/react';
import { ArrowDown, Cpu, Zap, Code, ShieldCheck, ArrowUpRight } from 'lucide-react';

interface HeroProps {
  onScrollTo: (elementId: string) => void;
}

export default function Hero({ onScrollTo }: HeroProps) {
  return (
    <section
      id="hero"
      className="relative min-h-screen pt-32 pb-20 flex flex-col justify-center bg-white overflow-hidden"
    >
      {/* Dynamic Background Grid and Ambient Light */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#e5e7eb_1px,transparent_1px),linear-gradient(to_bottom,#e5e7eb_1px,transparent_1px)] bg-[size:4rem_4rem] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_40%,#000_70%,transparent_100%)] opacity-[0.4] z-0 pointer-events-none" />
      
      {/* Decorative Radial Aurora */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-emerald-500/5 rounded-full blur-[120px] pointer-events-none z-0" />
      <div className="absolute bottom-1/10 right-1/4 w-[350px] h-[350px] bg-indigo-500/5 rounded-full blur-[90px] pointer-events-none z-0" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 w-full">
        <div className="text-center">
          {/* Tagline / Badge */}
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="inline-flex items-center space-x-2 bg-neutral-50 border border-neutral-200 rounded-full px-4 py-1.5 mb-8"
          >
            <ShieldCheck className="w-4 h-4 text-emerald-600" />
            <span className="font-mono text-[11px] text-neutral-700 tracking-wider uppercase font-semibold">
              Strategic Systems &amp; Automation Architect
            </span>
          </motion.div>

          {/* Main Hero Typography */}
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.1 }}
            className="text-4xl sm:text-6xl lg:text-7xl font-display font-extrabold text-neutral-900 tracking-tight leading-[1.1] max-w-5xl mx-auto"
          >
            I build systems that{' '}
            <span className="bg-gradient-to-r from-emerald-600 via-teal-600 to-indigo-600 bg-clip-text text-transparent">
              think, automate &amp; scale
            </span>{' '}
            autonomously.
          </motion.h1>

          {/* Supporting Copy */}
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.3 }}
            className="mt-6 text-lg sm:text-xl text-neutral-600 font-sans max-w-3xl mx-auto leading-relaxed"
          >
            Hi, I&apos;m <span className="text-neutral-900 font-semibold">Mehaal Khattak</span>. Equipped with{' '}
            <span className="text-emerald-600 font-bold">20+ core production-grade technical skills</span>, I bridge elite full-stack engineering with agentic AI architectures and advanced n8n/Make workflows. I design high-impact digital solutions that eliminate manual labor, maximize leads, and save companies hundreds of operational hours.
          </motion.p>

          {/* Quick Skill Bubbles */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="mt-8 flex flex-wrap justify-center gap-2.5 max-w-2xl mx-auto"
          >
            {[
              { text: 'n8n & Make Specialist', icon: Zap, color: 'text-emerald-700 border-emerald-200 bg-emerald-50/50' },
              { text: 'Model Context Protocol (MCP)', icon: Cpu, color: 'text-indigo-700 border-indigo-200 bg-indigo-50/50' },
              { text: 'React & Next.js Full-Stack', icon: Code, color: 'text-teal-700 border-teal-200 bg-teal-50/50' },
              { text: '20+ Core Skills Enabled', icon: ShieldCheck, color: 'text-purple-700 border-purple-200 bg-purple-50/50' },
            ].map((skill, index) => {
              const IconComp = skill.icon;
              return (
                <span
                  key={index}
                  className={`inline-flex items-center space-x-1.5 border px-3.5 py-1.5 rounded-xl font-mono text-[11px] font-medium tracking-wide ${skill.color}`}
                >
                  <IconComp className="w-3.5 h-3.5" />
                  <span>{skill.text}</span>
                </span>
              );
            })}
          </motion.div>

          {/* CTA Group */}
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.5 }}
            className="mt-10 flex flex-col sm:flex-row items-center justify-center gap-4"
          >
            <button
              onClick={() => onScrollTo('expertise')}
              className="w-full sm:w-auto bg-emerald-500 hover:bg-emerald-400 text-white font-sans font-bold py-3.5 px-8 rounded-xl shadow-lg hover:shadow-emerald-500/10 transition-all duration-300 hover:-translate-y-0.5 active:translate-y-0 focus:outline-none cursor-pointer"
              id="hero-cta-expertise"
            >
              Explore 20+ Skills
            </button>
            <a
              href="https://mehaalkhattak.vercel.app"
              target="_blank"
              rel="noopener noreferrer"
              className="w-full sm:w-auto bg-white hover:bg-neutral-50 text-neutral-800 border border-neutral-200 font-sans font-bold py-3.5 px-8 rounded-xl shadow-sm transition-all duration-300 hover:-translate-y-0.5 active:translate-y-0 focus:outline-none cursor-pointer flex items-center justify-center space-x-2"
              id="hero-cta-vercel-hub"
            >
              <span>Vercel Primary Hub</span>
              <ArrowUpRight className="w-4 h-4 stroke-[2.5] text-emerald-600" />
            </a>
            <button
              onClick={() => onScrollTo('contact')}
              className="w-full sm:w-auto bg-neutral-900 hover:bg-neutral-850 text-white border border-neutral-800 font-sans font-semibold py-3.5 px-8 rounded-xl transition-all duration-300 hover:-translate-y-0.5 active:translate-y-0 focus:outline-none cursor-pointer flex items-center justify-center space-x-2"
              id="hero-cta-contact"
            >
              <span>Consult Mehaal</span>
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse"></span>
            </button>
          </motion.div>
        </div>

        {/* Dynamic Metric Counter Widget */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.6 }}
          className="mt-20 border border-neutral-200 bg-white rounded-2xl p-6 sm:p-8 max-w-4xl mx-auto shadow-sm"
        >
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 text-center divide-y md:divide-y-0 md:divide-x divide-neutral-100">
            {[
              { label: 'Processes Automated', val: '95%', sub: 'No-code & custom scripts integration' },
              { label: 'Verified Core Skills', val: '20+', sub: 'Comprehensive digital toolkit' },
              { label: 'Weekly Hours Saved', val: '80hr+', sub: 'Substantial boost in business efficiency' },
              { label: 'Client Retention Rate', val: '100%', sub: 'Highly praised international results' },
            ].map((stat, idx) => (
              <div key={idx} className={`pt-4 md:pt-0 ${idx === 0 ? 'pt-0' : ''} md:px-4`}>
                <div className="font-display font-extrabold text-3xl sm:text-4xl text-neutral-900 tracking-tight">
                  {stat.val}
                </div>
                <div className="font-sans text-xs text-neutral-800 font-bold mt-1">
                  {stat.label}
                </div>
                <div className="font-sans text-[10px] text-neutral-500 mt-1 max-w-[160px] mx-auto leading-relaxed">
                  {stat.sub}
                </div>
              </div>
            ))}
          </div>
        </motion.div>

        {/* Scroll indicator */}
        <div className="absolute bottom-4 left-1/2 -translate-x-1/2 hidden md:flex flex-col items-center opacity-40 hover:opacity-100 transition-opacity duration-300">
          <button
            onClick={() => onScrollTo('expertise')}
            className="flex flex-col items-center space-y-2 focus:outline-none cursor-pointer"
            id="hero-scroll-indicator"
          >
            <span className="font-mono text-[9px] tracking-widest text-neutral-500 uppercase font-semibold">
              Explore expertise
            </span>
            <ArrowDown className="w-4 h-4 text-emerald-600 animate-bounce" />
          </button>
        </div>
      </div>
    </section>
  );
}
