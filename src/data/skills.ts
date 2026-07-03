/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { SkillItem, SkillCategory } from '../types';

export const skillCategories: SkillCategory[] = [
  {
    id: 'automation',
    title: 'AI & Workflow Automation',
    description: 'Developing highly efficient autonomous workflows that orchestrate web services, AI models, and CRM systems together.',
    iconName: 'Zap'
  },
  {
    id: 'mcp',
    title: 'Model Context Protocol (MCP)',
    description: 'Connecting Large Language Models securely with custom local APIs, databases, filesystems, and developer infrastructure.',
    iconName: 'Cpu'
  },
  {
    id: 'frontend',
    title: 'Full-Stack Web Apps',
    description: 'Crafting responsive, high-fidelity user experiences with industry-standard web frameworks and scalable server engines.',
    iconName: 'Layout'
  },
  {
    id: 'programming',
    title: 'Core Programming',
    description: 'Writing robust, type-safe, and highly optimized code for complex software systems, quantitative scripts, and general utilities.',
    iconName: 'Code'
  },
  {
    id: 'devops',
    title: 'Cloud, Databases & DevOps',
    description: 'Architecting secure server architectures, implementing CI/CD pipelines, and establishing performant cloud datastores.',
    iconName: 'Cloud'
  },
  {
    id: 'strategy',
    title: 'Market Strategy & Growth',
    description: 'Leveraging algorithmic insights, forensic forex market reviews, and targeted lead scraping to optimize business growth.',
    iconName: 'TrendingUp'
  }
];

export const skillItems: SkillItem[] = [
  // AI & Automations
  { name: 'n8n', level: 95, category: 'automation', icon: 'workflow-n8n' },
  { name: 'Make (Integromat)', level: 92, category: 'automation', icon: 'workflow-make' },
  { name: 'Zapier', level: 88, category: 'automation', icon: 'workflow-zapier' },
  { name: 'OpenAI API', level: 94, category: 'automation', icon: 'api-openai' },
  { name: 'Google Gemini API', level: 95, category: 'automation', icon: 'api-gemini' },

  // MCP
  { name: 'Model Context Protocol (MCP)', level: 96, category: 'mcp', icon: 'mcp' },
  { name: 'Custom Tool Design', level: 90, category: 'mcp', icon: 'mcp-tool' },

  // Full-Stack
  { name: 'React', level: 90, category: 'frontend', icon: 'react' },
  { name: 'Next.js', level: 91, category: 'frontend', icon: 'nextjs' },
  { name: 'Node.js', level: 88, category: 'frontend', icon: 'nodejs' },
  { name: 'Express.js', level: 87, category: 'frontend', icon: 'express' },
  { name: 'TypeScript', level: 92, category: 'frontend', icon: 'typescript' },
  { name: 'JavaScript', level: 94, category: 'frontend', icon: 'javascript' },
  { name: 'HTML5 & CSS3', level: 95, category: 'frontend', icon: 'html' },

  // Core Programming
  { name: 'Python', level: 89, category: 'programming', icon: 'python' },
  { name: 'C#', level: 82, category: 'programming', icon: 'csharp' },
  { name: 'JavaScript (ES6+)', level: 94, category: 'programming', icon: 'javascript' },

  // DevOps & Cloud
  { name: 'Linux & Bash', level: 90, category: 'devops', icon: 'linux' },
  { name: 'Git & GitHub', level: 92, category: 'devops', icon: 'git' },
  { name: 'AWS (Amazon Web Services)', level: 84, category: 'devops', icon: 'aws' },
  { name: 'Firebase', level: 88, category: 'devops', icon: 'firebase' },
  { name: 'Supabase', level: 86, category: 'devops', icon: 'supabase' },

  // Strategy
  { name: 'Strategic Planning', level: 93, category: 'strategy', icon: 'strategy' },
  { name: 'Forex Market Analysis', level: 88, category: 'strategy', icon: 'forex' },
  { name: 'Lead Hunting & Prospecting', level: 95, category: 'strategy', icon: 'leads' }
];
