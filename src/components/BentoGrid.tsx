/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { motion } from 'motion/react';
import { skillCategories, skillItems } from '../data/skills';
import { Zap, Cpu, Layout, Code, Cloud, TrendingUp, Sparkles, CheckCircle2 } from 'lucide-react';

export default function BentoGrid() {
  // Helper to map icon names to Lucide icons
  const getCategoryIcon = (name: string) => {
    switch (name) {
      case 'Zap':
        return <Zap className="w-5 h-5 text-emerald-600" />;
      case 'Cpu':
        return <Cpu className="w-5 h-5 text-indigo-600" />;
      case 'Layout':
        return <Layout className="w-5 h-5 text-teal-600" />;
      case 'Code':
        return <Code className="w-5 h-5 text-purple-600" />;
      case 'Cloud':
        return <Cloud className="w-5 h-5 text-sky-600" />;
      case 'TrendingUp':
        return <TrendingUp className="w-5 h-5 text-amber-600" />;
      default:
        return <Sparkles className="w-5 h-5 text-neutral-500" />;
    }
  };

  // Styles for borders or backgrounds based on category ID
  const getCategoryTheme = (id: string) => {
    switch (id) {
      case 'automation':
        return 'border-emerald-200/80 bg-white hover:bg-emerald-50/10 shadow-sm hover:shadow-md';
      case 'mcp':
        return 'border-indigo-200/80 bg-white hover:bg-indigo-50/10 shadow-sm hover:shadow-md';
      case 'frontend':
        return 'border-teal-200/80 bg-white hover:bg-teal-50/10 shadow-sm hover:shadow-md';
      case 'programming':
        return 'border-purple-200/80 bg-white hover:bg-purple-50/10 shadow-sm hover:shadow-md';
      case 'devops':
        return 'border-sky-200/80 bg-white hover:bg-sky-50/10 shadow-sm hover:shadow-md';
      case 'strategy':
        return 'border-amber-200/80 bg-white hover:bg-amber-50/10 shadow-sm hover:shadow-md';
      default:
        return 'border-neutral-200 bg-white shadow-sm';
    }
  };

  const getBadgeStyle = (id: string) => {
    switch (id) {
      case 'automation': return 'bg-emerald-50 text-emerald-700 border-emerald-100 hover:border-emerald-300';
      case 'mcp': return 'bg-indigo-50 text-indigo-700 border-indigo-100 hover:border-indigo-300';
      case 'frontend': return 'bg-teal-50 text-teal-700 border-teal-100 hover:border-teal-300';
      case 'programming': return 'bg-purple-50 text-purple-700 border-purple-100 hover:border-purple-300';
      case 'devops': return 'bg-sky-50 text-sky-700 border-sky-100 hover:border-sky-300';
      case 'strategy': return 'bg-amber-50 text-amber-700 border-amber-100 hover:border-amber-300';
      default: return 'bg-neutral-50 text-neutral-700 border-neutral-200';
    }
  };

  const getCategoryLabel = (id: string) => {
    switch (id) {
      case 'automation': return 'AUTOMATION & INTEGRATION';
      case 'mcp': return 'MODEL PROTOCOLS';
      case 'frontend': return 'WEB APPS & INTERFACES';
      case 'programming': return 'SYSTEM SCRIPTS';
      case 'devops': return 'CLOUD & DEVOPS';
      case 'strategy': return 'TACTICAL GROWTH';
      default: return 'GENERAL';
    }
  };

  return (
    <section id="expertise" className="py-24 bg-neutral-50 border-t border-neutral-200 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <h2 className="font-mono text-xs text-emerald-600 uppercase tracking-widest font-bold mb-3">
            TECHNICAL ARSENAL
          </h2>
          <p className="font-display font-bold text-3xl sm:text-5xl text-neutral-900 tracking-tight leading-tight">
            The Strategic Intersection of AI, Code, and Business Logic
          </p>
          <p className="font-sans text-neutral-600 text-base mt-4">
            I design complete, integrated ecosystems with <span className="font-semibold text-emerald-600">20+ verified technical skills</span>. This links databases, custom APIs, and AI models into highly autonomous engines that save human labor.
          </p>
        </div>

        {/* Skills Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {skillCategories.map((cat, idx) => {
            const categorySkills = skillItems.filter((item) => item.category === cat.id);

            return (
              <motion.div
                key={cat.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-50px' }}
                transition={{ duration: 0.4, delay: idx * 0.05 }}
                className={`border rounded-2xl p-6 sm:p-8 flex flex-col justify-between transition-all duration-300 ${getCategoryTheme(
                  cat.id
                )}`}
              >
                <div>
                  {/* Header Block */}
                  <div className="flex items-center justify-between mb-4">
                    <span className="font-mono text-[9px] font-bold tracking-widest text-neutral-400">
                      {getCategoryLabel(cat.id)}
                    </span>
                    <div className="p-2 bg-neutral-50 border border-neutral-100 rounded-xl">
                      {getCategoryIcon(cat.id)}
                    </div>
                  </div>

                  {/* Title */}
                  <h3 className="font-display font-bold text-lg text-neutral-900 tracking-tight mb-2 text-left">
                    {cat.title}
                  </h3>

                  {/* Desc */}
                  <p className="font-sans text-xs sm:text-sm text-neutral-600 mb-6 leading-relaxed text-left">
                    {cat.description}
                  </p>
                </div>

                {/* Skills Simple Badges */}
                <div className="border-t border-neutral-100 pt-5 mt-auto">
                  <div className="flex flex-wrap gap-2">
                    {categorySkills.map((skill) => (
                      <span
                        key={skill.name}
                        className={`font-sans text-xs px-3 py-1.5 rounded-xl border transition-colors cursor-default ${getBadgeStyle(
                          cat.id
                        )}`}
                      >
                        {skill.name}
                      </span>
                    ))}
                  </div>
                </div>
              </motion.div>
            );
          })}
        </div>

        {/* Quick Quote Highlight */}
        <div className="mt-16 bg-white border border-neutral-200 rounded-2xl p-6 md:p-8 flex flex-col md:flex-row items-center justify-between gap-6 shadow-sm">
          <div className="flex items-center space-x-4">
            <div className="w-12 h-12 rounded-full bg-emerald-500/10 flex items-center justify-center border border-emerald-500/20 shrink-0">
              <CheckCircle2 className="w-6 h-6 text-emerald-600" />
            </div>
            <div className="text-left">
              <p className="font-display font-semibold text-neutral-900 text-base">
                Architectural Principle: Focus on True Automation
              </p>
              <p className="font-sans text-xs text-neutral-500 mt-0.5">
                Connecting APIs, custom agents (MCP), databases, and UI endpoints triggers compound business leverage.
              </p>
            </div>
          </div>
          <button
            onClick={() => {
              const el = document.getElementById('contact');
              if (el) el.scrollIntoView({ behavior: 'smooth' });
            }}
            className="w-full md:w-auto bg-emerald-500 hover:bg-emerald-400 text-white font-sans font-semibold text-xs py-3 px-6 rounded-xl transition-all duration-200 shrink-0 cursor-pointer text-center"
            id="expertise-bento-sandbox-btn"
          >
            Brief Mehaal on a Project
          </button>
        </div>
      </div>
    </section>
  );
}
