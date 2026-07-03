/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useState } from 'react';
import { motion } from 'motion/react';
import { Star, Quote, Globe, MapPin } from 'lucide-react';
import { testimonials } from '../data/testimonials';

export default function Reviews() {
  const [filter, setFilter] = useState<'All' | 'Foreign' | 'Pakistan'>('All');

  // Filtered Reviews list
  const filteredTestimonials = testimonials.filter((item) => {
    if (filter === 'All') return true;
    return item.location === filter;
  });

  const getCountryEmoji = (code: string) => {
    switch (code) {
      case 'US': return '🇺🇸';
      case 'GB': return '🇬🇧';
      case 'SE': return '🇸🇪';
      case 'PK': return '🇵🇰';
      default: return '🌐';
    }
  };

  const getCountryName = (code: string) => {
    switch (code) {
      case 'US': return 'United States';
      case 'GB': return 'United Kingdom';
      case 'SE': return 'Sweden';
      case 'PK': return 'Pakistan';
      default: return 'Global';
    }
  };

  // Avatar gradient based on initials
  const getAvatarGradient = (seed: string) => {
    const hash = seed.charCodeAt(0) + seed.charCodeAt(seed.length - 1);
    if (hash % 3 === 0) {
      return 'from-emerald-400 to-teal-500 text-neutral-950';
    } else if (hash % 3 === 1) {
      return 'from-indigo-500 to-indigo-700 text-white';
    } else {
      return 'from-amber-400 to-orange-500 text-neutral-950';
    }
  };

  return (
    <section id="reviews" className="py-24 bg-white border-t border-neutral-200 relative">
      <div className="absolute top-0 left-0 w-full h-[1px] bg-gradient-to-r from-transparent via-indigo-500/10 to-transparent" />
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <h2 className="font-mono text-xs text-amber-600 uppercase tracking-widest font-bold mb-3">
            VERIFIED FEEDBACK
          </h2>
          <p className="font-display font-bold text-3xl sm:text-5xl text-neutral-900 tracking-tight leading-tight">
            What Clients Say About Mehaal
          </p>
          <p className="font-sans text-neutral-600 text-sm sm:text-base mt-4">
            Read transparent reviews from international enterprise executives and local technology firms that hired Mehaal for strategic workflow development.
          </p>
        </div>

        {/* Filter Navigation Tabs */}
        <div className="flex justify-center mb-12">
          <div className="bg-neutral-100 border border-neutral-200 p-1.5 rounded-2xl flex space-x-1.5 shadow-sm">
            {[
              { id: 'All', label: 'All Reviews', icon: null },
              { id: 'Foreign', label: 'International', icon: <Globe className="w-3.5 h-3.5" /> },
              { id: 'Pakistan', label: 'Pakistani Clients', icon: <MapPin className="w-3.5 h-3.5" /> }
            ].map((tab) => (
              <button
                key={tab.id}
                onClick={() => setFilter(tab.id as 'All' | 'Foreign' | 'Pakistan')}
                className={`px-4 py-2.5 rounded-xl text-xs font-mono tracking-wider uppercase border transition-all duration-300 focus:outline-none cursor-pointer flex items-center space-x-1.5 ${
                  filter === tab.id
                    ? 'bg-white text-neutral-900 border-neutral-200 font-bold shadow-sm'
                    : 'text-neutral-500 border-transparent hover:text-neutral-900'
                }`}
                id={`review-tab-${tab.id}`}
              >
                {tab.icon}
                <span>{tab.label}</span>
              </button>
            ))}
          </div>
        </div>

        {/* Testimonials Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredTestimonials.map((testimonial, index) => {
            const initials = testimonial.name
              .split(' ')
              .map((n) => n[0])
              .join('')
              .toUpperCase();

            return (
              <motion.div
                key={testimonial.id}
                layout
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.4, delay: index * 0.05 }}
                className="bg-white border border-neutral-200 hover:border-neutral-300 rounded-2xl p-6 sm:p-8 flex flex-col justify-between relative group hover:bg-neutral-50/30 transition-all duration-300 shadow-sm hover:shadow-md"
              >
                {/* Decorative Quote */}
                <Quote className="absolute right-6 top-6 w-10 h-10 text-neutral-100 pointer-events-none group-hover:scale-105 transition-transform" />

                <div>
                  {/* Rating Stars */}
                  <div className="flex items-center space-x-1 mb-5 text-left">
                    {[...Array(testimonial.rating)].map((_, i) => (
                      <Star key={i} className="w-4.5 h-4.5 text-amber-500 fill-current" />
                    ))}
                  </div>

                  {/* Review Content */}
                  <p className="font-sans text-xs sm:text-sm text-neutral-700 leading-relaxed italic mb-6 text-left">
                    &ldquo;{testimonial.content}&rdquo;
                  </p>
                </div>

                {/* Client Profile Block */}
                <div className="border-t border-neutral-100 pt-6 mt-6 flex items-center justify-between">
                  <div className="flex items-center space-x-3.5">
                    {/* Placeholder Initial Avatar */}
                    <div className={`w-10 h-10 rounded-xl bg-gradient-to-br flex items-center justify-center font-mono font-bold text-xs shrink-0 select-none shadow-sm ${getAvatarGradient(
                      testimonial.avatarSeed
                    )}`}>
                      {initials}
                    </div>

                    <div className="flex flex-col text-left">
                      <span className="font-display font-bold text-neutral-900 text-sm leading-none">
                        {testimonial.name}
                      </span>
                      <span className="font-sans text-[10px] text-neutral-500 mt-1">
                        {testimonial.role} at <span className="text-neutral-800 font-bold">{testimonial.company}</span>
                      </span>
                    </div>
                  </div>

                  {/* Location Tag */}
                  <div className="flex flex-col items-end text-right">
                    <span className="text-sm select-none" title={getCountryName(testimonial.countryCode)}>
                      {getCountryEmoji(testimonial.countryCode)}
                    </span>
                    <span className="font-mono text-[8px] text-neutral-400 uppercase tracking-widest mt-0.5 font-bold">
                      {testimonial.location}
                    </span>
                  </div>
                </div>

                {/* Subtag pills for project details */}
                <div className="mt-4 flex flex-wrap gap-1.5">
                  {testimonial.tags.map((tag) => (
                    <span
                      key={tag}
                      className="bg-neutral-50 border border-neutral-200 text-neutral-600 font-mono text-[8px] px-2.5 py-1 rounded-lg"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </motion.div>
            );
          })}
        </div>

        {/* Global Reach Callout */}
        <div className="mt-16 text-center">
          <div className="inline-flex flex-col sm:flex-row sm:items-center space-y-2 sm:space-y-0 sm:space-x-4 bg-neutral-100/60 border border-neutral-200 px-6 py-4 rounded-full max-w-2xl mx-auto">
            <span className="font-mono text-[10px] text-emerald-700 tracking-wider uppercase font-bold">
              Cross-Border Integrity:
            </span>
            <p className="font-sans text-xs text-neutral-600">
              Mehaal maintains full active compliance for clients operating out of Islamabad, Sweden, the UK, and North America.
            </p>
          </div>
        </div>

      </div>
    </section>
  );
}
