/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

export interface SkillItem {
  name: string;
  level: number; // 1-100 percentage for visual progress
  category: 'frontend' | 'automation' | 'programming' | 'devops' | 'strategy' | 'mcp';
  icon: string;
}

export interface SkillCategory {
  id: string;
  title: string;
  description: string;
  iconName: string;
}

export interface Testimonial {
  id: string;
  name: string;
  role: string;
  company: string;
  location: 'Foreign' | 'Pakistan';
  countryCode: string; // e.g., 'US', 'PK', 'GB'
  content: string;
  rating: number;
  tags: string[];
  avatarSeed: string;
}

export interface AutomationNode {
  id: string;
  label: string;
  type: 'trigger' | 'action' | 'ai' | 'database' | 'router';
  status: 'idle' | 'running' | 'success' | 'error';
  iconName: string;
  description: string;
}

export interface AutomationFlow {
  id: string;
  name: string;
  description: string;
  nodes: AutomationNode[];
  edges: { from: string; to: string }[];
}

export interface ContactSubmission {
  id: string;
  name: string;
  email: string;
  company: string;
  projectType: string;
  budget: string;
  message: string;
  timestamp: string;
  status: 'pending' | 'reviewed';
}
