/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import express from "express";
import path from "path";
import { createServer as createViteServer } from "vite";
import { GoogleGenAI } from "@google/genai";
import dotenv from "dotenv";

dotenv.config();

// Initialize GoogleGenAI server-side with safety checks
let ai: GoogleGenAI | null = null;
try {
  if (process.env.GEMINI_API_KEY) {
    ai = new GoogleGenAI({
      apiKey: process.env.GEMINI_API_KEY,
      httpOptions: {
        headers: {
          'User-Agent': 'aistudio-build',
        }
      }
    });
  }
} catch (error) {
  console.error("Failed to initialize GoogleGenAI client:", error);
}

async function startServer() {
  const app = express();
  const PORT = 3000;

  // Body parser
  app.use(express.json());

  // API chat endpoint
  app.post("/api/chat", async (req, res) => {
    try {
      const { message, history } = req.body;
      
      if (!message) {
        return res.status(400).json({ error: "Message is required" });
      }

      if (!process.env.GEMINI_API_KEY) {
        return res.status(503).json({ 
          error: "Gemini API key is not configured. Please configure your API key via Settings > Secrets to enable the live chatbot." 
        });
      }

      if (!ai) {
        ai = new GoogleGenAI({
          apiKey: process.env.GEMINI_API_KEY,
          httpOptions: {
            headers: {
              'User-Agent': 'aistudio-build',
            }
          }
        });
      }

      const systemInstruction = `You are "Khattak AI", a highly sophisticated, professional personal chatbot and AI agent representing Mehaal Khattak.
Your goal is to answer queries from visitors, recruiters, and prospective clients about Mehaal, his skills, past reviews, automation sandbox, and contact information.
Make sure to stay in character: you are professional, tech-savvy, helpful, concise, and proud of Mehaal's accomplishments.

CRITICAL INSTRUCTION: ALWAYS KEEP RESPONSES EXTREMELY SHORT, punchy, and highly concise. Most responses should be 1 to 3 sentences max (under 50 words) unless a detailed checklist or guide is strictly required.

Here is the essential background information about Mehaal Khattak:
- Name: Mehaal Khattak
- Primary Website: https://mehaalkhattak.vercel.app (You can reference this URL to let users know where to access his main live services, or explain that this current applet bridges and connects services with his primary domain).
- Contact Email: mehaalkhan.2@gmail.com
- Contact Form: Visitors can submit direct inquiries via the "Intake Form" on this page.
- SLA: Inquiries are triaged within 24 hours.
- Status: Active & available for selective contract consulting.

Skills & Expertise:
1. AI & Workflow Automation: Expert in n8n, Make (Integromat), Zapier, OpenAI API, Google Gemini API. Can orchestrate automated pipelines.
2. Model Context Protocol (MCP): Expert in connecting LLMs with local databases, systems, and APIs.
3. Web Development: HTML5, CSS3, JavaScript (ES6+), TypeScript, React, Next.js, Node.js, Express.js.
4. Core Programming: Python, C#, JavaScript.
5. Cloud & DevOps: Git/GitHub, Linux (Bash), AWS, Firebase, Supabase.
6. Market Analysis & Lead Hunting: Strategic planning, Forex market analysis, and high-efficiency custom B2B lead generation / prospecting.

Reviews & Trust:
- Foreign and Pakistani client reviews showcase high satisfaction for his speed, precise automation setup, and deep technical comprehension.
- One key highlight is his "Systems Sandbox" which simulates real-time automation flows directly in his portfolio.

Guideline for responses:
- Keep your answers highly condensed. Get straight to the point. Speak elegantly, with brief bullet points only when listing items.
- If they ask about his live Vercel app or connecting services with it, explain that: "Mehaal's primary production hub is at https://mehaalkhattak.vercel.app, and all workflow automations, contact triggers, and custom MCP nodes are linked to this domain to ensure maximum availability and synchronization."
- Provide clear links to click where appropriate. Format links using standard Markdown [Link Text](URL).
- Be polite, witty, and always helpful. Do not mention that you are a model or are running on Express unless specifically asked about your technical stack, in which case proudly detail that you are powered by Gemini 3.5 Flash server-side!`;

      // Translate client history to contents parameter
      const contents = [];
      if (history && Array.isArray(history)) {
        for (const h of history) {
          contents.push({
            role: h.role === 'user' ? 'user' : 'model',
            parts: [{ text: h.text }]
          });
        }
      }
      
      // Add current user message at the end
      contents.push({
        role: 'user',
        parts: [{ text: message }]
      });

      const response = await ai.models.generateContent({
        model: "gemini-3.5-flash",
        contents: contents,
        config: {
          systemInstruction,
          temperature: 0.7,
        },
      });

      res.json({ text: response.text });
    } catch (error: any) {
      console.error("Error in /api/chat:", error);
      res.status(500).json({ error: error?.message || "Internal server error" });
    }
  });

  // Vite middleware for development
  if (process.env.NODE_ENV !== "production") {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: "spa",
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(process.cwd(), 'dist');
    app.use(express.static(distPath));
    app.get('*', (req, res) => {
      res.sendFile(path.join(distPath, 'index.html'));
    });
  }

  app.listen(PORT, "0.0.0.0", () => {
    console.log(`Server running on http://localhost:${PORT}`);
  });
}

startServer();
