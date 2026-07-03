/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Send, CheckCircle2, Shield, Coins, Server, Clock, Sparkles, Mail } from 'lucide-react';
import { ContactSubmission } from '../types';

export default function ContactForm() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [company, setCompany] = useState('');
  const [projectType, setProjectType] = useState('ai_automation');
  const [budget, setBudget] = useState('1500_5000');
  const [message, setMessage] = useState('');
  
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [submissionId, setSubmissionId] = useState('');
  const [localSubmissions, setLocalSubmissions] = useState<ContactSubmission[]>([]);

  // Load existing inquiries from local storage on mount
  useEffect(() => {
    try {
      const stored = localStorage.getItem('mehaal_inquiries');
      if (stored) {
        setLocalSubmissions(JSON.parse(stored));
      }
    } catch (e) {
      console.error('Failed to load inquiries', e);
    }
  }, []);

  // Determine Response Priority and Response Time based on form parameters
  const calculatePriority = () => {
    let score = 0;
    
    // Budget score
    if (budget === '5000_plus') score += 50;
    else if (budget === '1500_5000') score += 30;
    else score += 10;

    // Service priority score
    if (projectType === 'mcp' || projectType === 'ai_automation') score += 30;
    else if (projectType === 'forex') score += 20;
    else score += 15;

    if (score >= 70) {
      return {
        tier: 'Strategic Hot-Line',
        time: 'Within 2 Hours',
        color: 'text-emerald-700 bg-emerald-50 border-emerald-200',
        barColor: 'bg-emerald-500'
      };
    } else if (score >= 45) {
      return {
        tier: 'Priority Business Route',
        time: 'Within 12 Hours',
        color: 'text-indigo-700 bg-indigo-50 border-indigo-200',
        barColor: 'bg-indigo-500'
      };
    } else {
      return {
        tier: 'Standard Developer Queue',
        time: 'Within 24 Hours',
        color: 'text-neutral-700 bg-neutral-100 border-neutral-200',
        barColor: 'bg-neutral-400'
      };
    }
  };

  const priorityMeta = calculatePriority();

  const getServiceLabel = (type: string) => {
    switch (type) {
      case 'ai_automation': return 'AI & Workflow Automation (n8n, Make)';
      case 'mcp': return 'Model Context Protocol (MCP) Server';
      case 'fullstack': return 'Full-Stack Web App (Next.js, Node)';
      case 'forex': return 'Forex Trading Systems (Python, C#)';
      case 'lead_hunting': return 'Lead Hunting & Web Scrapers';
      default: return 'General Business Strategy';
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!name || !email || !message) return;

    setIsSubmitting(true);
    
    // Simulate API connection
    await new Promise((resolve) => setTimeout(resolve, 1600));

    const id = `MEHAAL-API-LEAD-${Math.floor(1000 + Math.random() * 9000)}`;
    const newSubmission: ContactSubmission = {
      id,
      name,
      email,
      company: company || 'N/A',
      projectType,
      budget,
      message,
      timestamp: new Date().toLocaleString(),
      status: 'pending'
    };

    // Save submission locally
    try {
      const updated = [newSubmission, ...localSubmissions];
      localStorage.setItem('mehaal_inquiries', JSON.stringify(updated));
      setLocalSubmissions(updated);
    } catch (err) {
      console.error('Failed to save to local storage', err);
    }

    setSubmissionId(id);
    setIsSubmitting(false);
    setIsSuccess(true);
  };

  const handleResetForm = () => {
    setName('');
    setEmail('');
    setCompany('');
    setMessage('');
    setIsSuccess(false);
  };

  const handleDeleteSubmission = (id: string) => {
    const updated = localSubmissions.filter((sub) => sub.id !== id);
    localStorage.setItem('mehaal_inquiries', JSON.stringify(updated));
    setLocalSubmissions(updated);
  };

  return (
    <section id="contact" className="py-24 bg-white border-t border-neutral-200 relative">
      <div className="absolute top-0 left-0 w-full h-[1px] bg-gradient-to-r from-transparent via-amber-500/10 to-transparent" />
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <h2 className="font-mono text-xs text-indigo-600 uppercase tracking-widest font-bold mb-3">
            PROJECT INTAKE
          </h2>
          <p className="font-display font-bold text-3xl sm:text-5xl text-neutral-900 tracking-tight leading-tight">
            Initiate a Strategic Brief
          </p>
          <p className="font-sans text-neutral-600 text-sm sm:text-base mt-4">
            Brief Mehaal about your system constraints, budget brackets, and target operational outcomes.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
          
          {/* Informational Guidelines Panel */}
          <div className="lg:col-span-5 flex flex-col justify-between space-y-6">
            <div>
              <h3 className="font-display font-extrabold text-neutral-900 text-xl sm:text-2xl tracking-tight mb-4">
                What Happens Next?
              </h3>
              <p className="font-sans text-neutral-600 text-xs sm:text-sm leading-relaxed mb-6 text-left">
                Your parameters pass through Mehaal&apos;s triage metrics to estimate project complexity, establish developer availability, and queue immediate response actions.
              </p>

              <div className="space-y-4">
                {[
                  { icon: Shield, title: 'Secure & Confidential', desc: 'All business operational constraints shared are fully protected by non-disclosure conditions.' },
                  { icon: Coins, title: 'Transparent Cost Estimates', desc: 'No hidden setup or consulting hours. All tasks are mapped with clear milestones.' },
                  { icon: Server, title: 'Modular Architecture First', desc: 'No vendor lock-in. Workflows are built on n8n/Make and custom repos you control.' }
                ].map((item, idx) => {
                  const IconComp = item.icon;
                  return (
                    <div key={idx} className="flex items-start space-x-3 bg-neutral-50 border border-neutral-200 p-4 rounded-xl text-left">
                      <IconComp className="w-5 h-5 text-emerald-600 mt-0.5 shrink-0" />
                      <div>
                        <h4 className="font-sans font-bold text-neutral-900 text-sm">
                          {item.title}
                        </h4>
                        <p className="font-sans text-xs text-neutral-500 mt-1">
                          {item.desc}
                        </p>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Local Storage Submissions Dashboard */}
            {localSubmissions.length > 0 && (
              <div className="border border-neutral-200 bg-neutral-50/50 rounded-2xl p-4 mt-6">
                <div className="flex items-center justify-between border-b border-neutral-100 pb-2.5 mb-3">
                  <span className="font-mono text-[9px] tracking-wider text-neutral-500 uppercase font-bold">
                    Local Inquiry History ({localSubmissions.length})
                  </span>
                  <span className="font-mono text-[8px] text-emerald-700 bg-emerald-50 px-1.5 py-0.5 rounded border border-emerald-200 font-bold">
                    Persisted
                  </span>
                </div>
                
                <div className="space-y-2 max-h-44 overflow-y-auto">
                  {localSubmissions.map((sub) => (
                    <div key={sub.id} className="bg-white border border-neutral-200 p-2.5 rounded-lg flex items-center justify-between gap-4 shadow-sm">
                      <div className="flex flex-col text-left">
                        <span className="font-sans font-bold text-xs text-neutral-900">
                          {sub.name}
                        </span>
                        <span className="font-mono text-[8px] text-neutral-500">
                          {sub.id} // {getServiceLabel(sub.projectType).split(' (')[0]}
                        </span>
                      </div>
                      <button
                        onClick={() => handleDeleteSubmission(sub.id)}
                        className="text-neutral-500 hover:text-rose-600 font-mono text-[9px] px-2 py-1 rounded-md border border-neutral-200 hover:border-rose-200 bg-neutral-50 hover:bg-rose-50 focus:outline-none cursor-pointer transition-colors"
                        id={`del-sub-${sub.id}`}
                      >
                        Delete
                      </button>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* Contact Form Submission Area */}
          <div className="lg:col-span-7 bg-white border border-neutral-200 rounded-3xl p-6 sm:p-8 relative shadow-sm">
            
            <AnimatePresence mode="wait">
              {!isSuccess ? (
                <motion.form
                  key="form"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  onSubmit={handleSubmit}
                  className="space-y-5"
                >
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    {/* Name */}
                    <div className="flex flex-col text-left">
                      <label htmlFor="name-input" className="font-mono text-[9px] font-bold text-neutral-500 tracking-wider uppercase mb-1.5">
                        Your Name *
                      </label>
                      <input
                        id="name-input"
                        type="text"
                        required
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        placeholder="John Doe"
                        className="bg-neutral-50 border border-neutral-200 rounded-xl px-4 py-3 text-sm text-neutral-950 placeholder-neutral-400 focus:outline-none focus:border-emerald-500 focus:bg-white transition-all"
                      />
                    </div>

                    {/* Email */}
                    <div className="flex flex-col text-left">
                      <label htmlFor="email-input" className="font-mono text-[9px] font-bold text-neutral-500 tracking-wider uppercase mb-1.5">
                        Business Email *
                      </label>
                      <input
                        id="email-input"
                        type="email"
                        required
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        placeholder="john@company.com"
                        className="bg-neutral-50 border border-neutral-200 rounded-xl px-4 py-3 text-sm text-neutral-950 placeholder-neutral-400 focus:outline-none focus:border-emerald-500 focus:bg-white transition-all"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    {/* Company */}
                    <div className="flex flex-col text-left">
                      <label htmlFor="company-input" className="font-mono text-[9px] font-bold text-neutral-500 tracking-wider uppercase mb-1.5">
                        Company Name
                      </label>
                      <input
                        id="company-input"
                        type="text"
                        value={company}
                        onChange={(e) => setCompany(e.target.value)}
                        placeholder="Acme Corp"
                        className="bg-neutral-50 border border-neutral-200 rounded-xl px-4 py-3 text-sm text-neutral-950 placeholder-neutral-400 focus:outline-none focus:border-emerald-500 focus:bg-white transition-all"
                      />
                    </div>

                    {/* Service Category */}
                    <div className="flex flex-col text-left">
                      <label htmlFor="service-select" className="font-mono text-[9px] font-bold text-neutral-500 tracking-wider uppercase mb-1.5">
                        Primary System Requirement
                      </label>
                      <select
                        id="service-select"
                        value={projectType}
                        onChange={(e) => setProjectType(e.target.value)}
                        className="bg-neutral-50 border border-neutral-200 rounded-xl px-4 py-3 text-sm text-neutral-950 focus:outline-none focus:border-emerald-500 focus:bg-white transition-all"
                      >
                        <option value="ai_automation">AI &amp; Workflows (n8n, Make)</option>
                        <option value="mcp">Model Context Protocol (MCP)</option>
                        <option value="fullstack">Full-Stack Application</option>
                        <option value="forex">Forex Automation Systems</option>
                        <option value="lead_hunting">Strategic Lead Hunting</option>
                        <option value="strategy">Operational Strategy</option>
                      </select>
                    </div>
                  </div>

                  {/* Budget Selector */}
                  <div className="flex flex-col text-left">
                    <label className="font-mono text-[9px] font-bold text-neutral-500 tracking-wider uppercase mb-2">
                      Target Project Scale / Budget (USD)
                    </label>
                    <div className="grid grid-cols-3 gap-2">
                      {[
                        { id: '100_1500', label: 'Pilot Project', range: '< $1,500' },
                        { id: '1500_5000', label: 'Growth App', range: '$1.5k - $5k' },
                        { id: '5000_plus', label: 'Enterprise', range: '$5k+' }
                      ].map((tier) => (
                        <button
                          key={tier.id}
                          type="button"
                          onClick={() => setBudget(tier.id)}
                          className={`p-3 border rounded-xl flex flex-col items-center justify-center transition-all cursor-pointer focus:outline-none ${
                            budget === tier.id
                              ? 'border-emerald-500 bg-emerald-50 text-emerald-700 font-bold shadow-sm'
                              : 'border-neutral-200 bg-neutral-50 text-neutral-600 hover:border-neutral-400 hover:text-neutral-900'
                          }`}
                          id={`budget-btn-${tier.id}`}
                        >
                          <span className="font-sans font-bold text-xs">{tier.label}</span>
                          <span className="font-mono text-[9px] text-neutral-400 mt-1">{tier.range}</span>
                        </button>
                      ))}
                    </div>
                  </div>

                  {/* Message */}
                  <div className="flex flex-col text-left">
                    <label htmlFor="message-textarea" className="font-mono text-[9px] font-bold text-neutral-500 tracking-wider uppercase mb-1.5">
                      Operational Objective / Project Scope *
                    </label>
                    <textarea
                      id="message-textarea"
                      required
                      rows={4}
                      value={message}
                      onChange={(e) => setMessage(e.target.value)}
                      placeholder="Briefly detail what pipeline, automation, or full-stack software you need Mehaal to engineer."
                      className="bg-neutral-50 border border-neutral-200 rounded-xl px-4 py-3 text-sm text-neutral-950 placeholder-neutral-400 focus:outline-none focus:border-emerald-500 focus:bg-white transition-all resize-none font-sans"
                    />
                  </div>

                  {/* Dynamic AI Priority Metric Display */}
                  <div className="border border-neutral-200 bg-neutral-50 p-4 rounded-xl flex flex-col sm:flex-row items-center justify-between gap-4">
                    <div className="flex items-center space-x-3 text-left w-full sm:w-auto">
                      <div className="p-2 bg-white border border-neutral-200 rounded-lg shadow-sm">
                        <Clock className="w-4.5 h-4.5 text-indigo-600" />
                      </div>
                      <div>
                        <span className="font-mono text-[8px] tracking-wider text-neutral-500 uppercase block">
                          ESTIMATED RESPONSE ROUTING
                        </span>
                        <div className="flex items-center space-x-2 mt-0.5">
                          <span className="font-sans font-bold text-neutral-900 text-xs">
                            {priorityMeta.tier}
                          </span>
                          <span className={`font-mono text-[8px] px-1.5 py-0.5 rounded border uppercase font-bold ${priorityMeta.color}`}>
                            {priorityMeta.time}
                          </span>
                        </div>
                      </div>
                    </div>

                    <div className="w-full sm:w-36 h-2 bg-neutral-200 rounded-full overflow-hidden shrink-0">
                      <div className={`h-full rounded-full transition-all duration-500 ${priorityMeta.barColor} w-full`} />
                    </div>
                  </div>

                  {/* Submission Button */}
                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full bg-emerald-500 hover:bg-emerald-400 active:bg-emerald-600 text-white font-sans font-bold py-3.5 px-6 rounded-xl flex items-center justify-center space-x-2 transition-all shadow-lg hover:shadow-emerald-500/10 focus:outline-none cursor-pointer"
                    id="contact-form-submit-btn"
                  >
                    {isSubmitting ? (
                      <>
                        <div className="w-4 h-4 rounded-full border-2 border-white border-t-transparent animate-spin" />
                        <span>Logging Inquiry on API...</span>
                      </>
                    ) : (
                      <>
                        <Send className="w-4 h-4 fill-current" />
                        <span>Deploy Inquiry</span>
                      </>
                    )}
                  </button>
                </motion.form>
              ) : (
                <motion.div
                  key="success"
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0 }}
                  className="py-12 text-center"
                >
                  <div className="w-16 h-16 rounded-full bg-emerald-50 border border-emerald-200 flex items-center justify-center mx-auto mb-6">
                    <CheckCircle2 className="w-8 h-8 text-emerald-600 animate-pulse" />
                  </div>

                  <h3 className="font-display font-extrabold text-neutral-900 text-2xl tracking-tight mb-2">
                    Inquiry Securely Logged
                  </h3>
                  <p className="font-sans text-neutral-600 text-xs sm:text-sm max-w-md mx-auto leading-relaxed mb-6">
                    Mehaal&apos;s automation engine has ingested your parameters. A receipt index has been created for your records.
                  </p>

                  {/* Mock Receipt */}
                  <div className="bg-neutral-50 border border-neutral-200 rounded-2xl p-4 max-w-md mx-auto text-left font-mono text-[11px] text-neutral-600 space-y-2 mb-8 shadow-sm">
                    <div className="flex items-center justify-between border-b border-neutral-200 pb-2">
                      <span className="font-bold text-neutral-800 uppercase">LEAD_INDEX_RECEIPT</span>
                      <span className="text-emerald-700 font-bold">{submissionId}</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Sender:</span>
                      <span className="text-neutral-900 font-bold">{name}</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Service:</span>
                      <span className="text-neutral-900 font-bold truncate max-w-[200px]">{getServiceLabel(projectType).split(' (')[0]}</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Estimated Queue:</span>
                      <span className="text-indigo-700 font-bold">{priorityMeta.tier}</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Response SLA:</span>
                      <span className="text-neutral-900 font-bold">{priorityMeta.time}</span>
                    </div>
                  </div>

                  {/* Forward Action Buttons */}
                  <div className="flex flex-col sm:flex-row items-center justify-center gap-3">
                    <a
                      href={`mailto:mehaalkhan.2@gmail.com?subject=${encodeURIComponent(`Strategic Brief from ${name} [${submissionId}]`)}&body=${encodeURIComponent(
                        `Hi Mehaal,\n\nI have submitted a strategic brief through your systems portal. Here are the details of my system inquiry:\n\n` +
                        `- Name: ${name}\n` +
                        `- Email: ${email}\n` +
                        `- Company: ${company || 'N/A'}\n` +
                        `- System Requirement: ${getServiceLabel(projectType)}\n` +
                        `- Estimated Budget: ${budget === '5000_plus' ? '$5,000+' : budget === '1500_5000' ? '$1,500 - $5,000' : 'Under $1,500'}\n\n` +
                        `Project Scope / Objective:\n` +
                        `"${message}"\n\n` +
                        `Looking forward to hearing from you.\n\n` +
                        `Best regards,\n` +
                        `${name}`
                      )}`}
                      className="bg-emerald-500 hover:bg-emerald-400 text-white font-sans font-bold text-xs py-3 px-6 rounded-xl transition-all shadow-md inline-flex items-center space-x-2 cursor-pointer"
                      id="contact-forward-email-btn"
                    >
                      <Mail className="w-4 h-4" />
                      <span>Send Direct Email Copy</span>
                    </a>
                    <button
                      onClick={handleResetForm}
                      className="bg-neutral-100 hover:bg-neutral-200 text-neutral-700 border border-neutral-200 font-sans font-semibold text-xs py-3 px-6 rounded-xl transition-all focus:outline-none cursor-pointer"
                      id="contact-reset-view-btn"
                    >
                      Submit Another Brief
                    </button>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>

        </div>
      </div>
    </section>
  );
}
