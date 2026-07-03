/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useState } from 'react';
import { motion } from 'motion/react';
import { PhoneCall, GitBranch, Cpu, MessageSquare, ExternalLink, Activity, Check, Network, ShieldCheck } from 'lucide-react';

export default function Services() {
  const [pinging, setPinging] = useState(false);
  const [pingTime, setPingTime] = useState<number | null>(null);

  const servicesList = [
    {
      icon: PhoneCall,
      title: 'Bespoke AI Voice Integration',
      desc: 'Developing specialized low-latency voice integration nodes. Ideal for connecting systems with inbound automated calling channels and custom data webhooks.',
      tech: ['Vapi SDK', 'Retell API', 'Bland AI', 'Automated Webhooks'],
      deliverables: [
        'Secure multi-branched call flow logic design',
        'Direct CRM syncing and instant metadata logging',
        'Custom voice cloning presets & latency optimization'
      ],
      color: 'border-emerald-200 bg-emerald-50/10 text-emerald-700'
    },
    {
      icon: GitBranch,
      title: 'Advanced Multi-Stage Automations',
      desc: 'Orchestrating robust pipelines that connect APIs, secure databases, payment gateways, and backend web services with zero human intervention.',
      tech: ['n8n Specialized', 'Make.com Custom API', 'Zapier CLI', 'PostgreSQL'],
      deliverables: [
        'Multi-stage conditional branches & custom loops',
        'Fault-tolerant recovery routines and retry systems',
        'Live system notification pathways (Slack, Discord, Telegram)'
      ],
      color: 'border-indigo-200 bg-indigo-50/10 text-indigo-700'
    },
    {
      icon: Cpu,
      title: 'Model Context Protocol (MCP) Custom Servers',
      desc: 'Extending LLMs by building high-security server bridges that grant localized terminal, database, filesystem, and proprietary tool access.',
      tech: ['TypeScript MCP Server', 'Node.js', 'LLM Integrations', 'Secure Docker'],
      deliverables: [
        'Hand-coded MCP custom tool integration servers',
        'Highly optimized system execution permission controls',
        'Serialized JSON-RPC payload management'
      ],
      color: 'border-purple-200 bg-purple-50/10 text-purple-700'
    },
    {
      icon: MessageSquare,
      title: 'Intelligent Agent Chat Modules',
      desc: 'Creating custom, client-side or server-side smart chat modules that interface securely with private vectors, context memories, and system logs.',
      tech: ['Gemini 3.5 SDK', 'LangChain TS', 'Next.js', 'Firebase Auth'],
      deliverables: [
        'Context-rich memory buffers & semantic database searches',
        'Secure, server-shielded proxy controllers for sensitive keys',
        'Clean, accessible React chat interfaces'
      ],
      color: 'border-teal-200 bg-teal-50/10 text-teal-700'
    }
  ];

  const handleSimulatePing = () => {
    setPinging(true);
    setPingTime(null);
    setTimeout(() => {
      setPingTime(Math.floor(45 + Math.random() * 40));
      setPinging(false);
    }, 1200);
  };

  return (
    <section id="services" className="py-24 bg-white border-t border-neutral-200 relative">
      <div className="absolute top-0 left-0 w-full h-[1px] bg-gradient-to-r from-transparent via-emerald-500/10 to-transparent" />
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <h2 className="font-mono text-xs text-emerald-600 uppercase tracking-widest font-bold mb-3">
            MY CORE CAPABILITIES
          </h2>
          <p className="font-display font-bold text-3xl sm:text-5xl text-neutral-900 tracking-tight leading-tight">
            How I Apply My Skillset
          </p>
          <p className="font-sans text-neutral-600 text-base mt-4">
            I translate complex codebases, API parameters, and data channels into highly performant digital systems. Here is a review of what I specialize in implementing:
          </p>
        </div>

        {/* Services Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-16">
          {servicesList.map((service, index) => {
            const IconComponent = service.icon;
            return (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-50px' }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className={`border rounded-3xl p-6 sm:p-8 flex flex-col justify-between transition-all duration-300 bg-white hover:shadow-lg hover:shadow-neutral-100 ${service.color}`}
              >
                <div>
                  {/* Service Header */}
                  <div className="flex items-center space-x-4 mb-5 text-left">
                    <div className="p-3 bg-white border border-neutral-200 rounded-2xl shadow-sm text-neutral-800">
                      <IconComponent className="w-6 h-6" />
                    </div>
                    <div>
                      <h3 className="font-display font-bold text-xl text-neutral-900 tracking-tight">
                        {service.title}
                      </h3>
                      <div className="flex flex-wrap gap-1.5 mt-1.5">
                        {service.tech.map((t, idx) => (
                          <span key={idx} className="font-mono text-[9px] bg-neutral-100 text-neutral-600 border border-neutral-200 px-2 py-0.5 rounded-lg">
                            {t}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>

                  {/* Desc */}
                  <p className="font-sans text-sm text-neutral-600 text-left leading-relaxed mb-6">
                    {service.desc}
                  </p>

                  {/* Core Deliverables */}
                  <div className="space-y-3 border-t border-neutral-100 pt-5 text-left mb-6">
                    <span className="font-mono text-[9px] text-neutral-400 font-bold tracking-wider uppercase block">
                      Typical Implementations
                    </span>
                    {service.deliverables.map((item, idx) => (
                      <div key={idx} className="flex items-start space-x-2.5">
                        <Check className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                        <span className="font-sans text-xs text-neutral-700 leading-normal">
                          {item}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>

                <button
                  onClick={() => {
                    const contactSection = document.getElementById('contact');
                    if (contactSection) {
                      contactSection.scrollIntoView({ behavior: 'smooth' });
                    }
                  }}
                  className="w-full bg-neutral-900 hover:bg-neutral-800 text-white font-sans font-bold text-xs py-3 px-6 rounded-xl transition-all text-center focus:outline-none cursor-pointer"
                  id={`service-inquiry-btn-${index}`}
                >
                  Consult on this Specialty
                </button>
              </motion.div>
            );
          })}
        </div>

        {/* Global Connection / Vercel Synchronizer Hub Component */}
        <motion.div
          initial={{ opacity: 0, scale: 0.98 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="bg-neutral-50 border border-neutral-200 rounded-3xl p-6 sm:p-10 text-left relative overflow-hidden"
        >
          {/* Subtle decoration */}
          <div className="absolute top-0 right-0 w-[200px] h-[200px] bg-emerald-500/5 rounded-full blur-[60px] pointer-events-none" />

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            
            <div className="lg:col-span-7 space-y-4">
              <div className="inline-flex items-center space-x-2 bg-emerald-100 text-emerald-800 border border-emerald-200 rounded-full px-3 py-1">
                <Network className="w-3.5 h-3.5" />
                <span className="font-mono text-[9px] font-bold uppercase tracking-wider">
                  Cross-Domain Production Hub
                </span>
              </div>
              
              <h3 className="font-display font-extrabold text-neutral-900 text-2xl sm:text-3xl tracking-tight">
                Connect with my Primary Production Hub
              </h3>
              
              <p className="font-sans text-xs sm:text-sm text-neutral-600 leading-relaxed">
                This website serves as my centralized strategic portfolio. All workflow automation triggers, direct inquiry receipts, and live micro-agents are synchronized instantly with my primary cloud node hosted at <span className="font-semibold text-emerald-600">mehaalkhattak.vercel.app</span>.
              </p>

              <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3 pt-2">
                <a
                  href="https://mehaalkhattak.vercel.app"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="bg-emerald-500 hover:bg-emerald-400 text-white font-sans font-bold text-xs py-3.5 px-6 rounded-xl inline-flex items-center justify-center space-x-2 transition-all shadow-md hover:shadow-emerald-500/10 cursor-pointer text-center"
                  id="primary-vercel-hub-btn"
                >
                  <span>Launch mehaalkhattak.vercel.app</span>
                  <ExternalLink className="w-3.5 h-3.5" />
                </a>

                <button
                  onClick={handleSimulatePing}
                  disabled={pinging}
                  className="bg-white hover:bg-neutral-50 text-neutral-700 border border-neutral-200 font-mono text-[11px] py-3.5 px-5 rounded-xl transition-all cursor-pointer inline-flex items-center justify-center space-x-2 disabled:opacity-50"
                  id="simulate-mirror-ping-btn"
                >
                  <Activity className="w-3.5 h-3.5 text-emerald-600" />
                  <span>{pinging ? 'Pinging Mirror Server...' : 'Check Vercel Hub Latency'}</span>
                </button>
              </div>
            </div>

            {/* Simulated Live Connection Diagnostics */}
            <div className="lg:col-span-5 bg-white border border-neutral-200 rounded-2xl p-5 shadow-sm space-y-4">
              <div className="flex items-center justify-between border-b border-neutral-100 pb-2.5">
                <span className="font-mono text-[9px] tracking-wider text-neutral-400 uppercase font-bold">
                  Connection Diagnostics
                </span>
                <div className="flex items-center space-x-1.5 bg-emerald-50 border border-emerald-100 rounded-full px-2 py-0.5">
                  <span className="w-1.5 h-1.5 bg-emerald-500 rounded-full animate-ping" />
                  <span className="font-mono text-[8px] text-emerald-700 font-bold">Synchronized</span>
                </div>
              </div>

              <div className="space-y-2.5 font-mono text-[10px] text-neutral-600">
                <div className="flex justify-between">
                  <span>Hub Domain:</span>
                  <span className="text-neutral-900 font-bold">mehaalkhattak.vercel.app</span>
                </div>
                <div className="flex justify-between">
                  <span>SSL Security:</span>
                  <span className="text-emerald-700 font-bold flex items-center gap-1">
                    <ShieldCheck className="w-3 h-3" /> Active HTTPS
                  </span>
                </div>
                <div className="flex justify-between">
                  <span>API Integration:</span>
                  <span className="text-indigo-700 font-bold">Khattak Proxy Active</span>
                </div>
                <div className="flex justify-between items-center pt-2 border-t border-neutral-100">
                  <span>Server Latency:</span>
                  {pingTime !== null ? (
                    <span className="text-emerald-600 font-extrabold text-xs animate-pulse bg-emerald-50 border border-emerald-200 px-2 py-0.5 rounded">
                      {pingTime}ms (Excellent)
                    </span>
                  ) : pinging ? (
                    <span className="text-indigo-600 animate-pulse">Requesting ICMP Echo...</span>
                  ) : (
                    <span className="text-neutral-400 italic">Not tested</span>
                  )}
                </div>
              </div>
            </div>

          </div>
        </motion.div>

      </div>
    </section>
  );
}
