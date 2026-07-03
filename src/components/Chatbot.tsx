/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { MessageSquare, X, Send, Sparkles, Bot, AlertCircle, RefreshCw } from 'lucide-react';

interface ChatMessage {
  id: string;
  role: 'user' | 'model';
  text: string;
  timestamp: Date;
}

// Simple custom markdown renderer to handle bold text, lists, and links safely
const renderFormattedText = (text: string) => {
  const lines = text.split('\n');
  return lines.map((line, idx) => {
    let content: React.ReactNode = line;

    // Check for bullet list
    const isBullet = line.trim().startsWith('- ') || line.trim().startsWith('* ');
    if (isBullet) {
      // Remove bullet character
      const rawText = line.trim().substring(2);
      content = <span className="pl-1">{parseInlineStyles(rawText)}</span>;
    } else {
      content = parseInlineStyles(line);
    }

    if (isBullet) {
      return (
        <li key={idx} className="list-disc list-inside ml-2 my-1 text-neutral-700">
          {content}
        </li>
      );
    }

    return (
      <p key={idx} className="my-1.5 min-h-[1px] leading-relaxed">
        {content}
      </p>
    );
  });
};

// Helper to parse inline bold and markdown links: [text](url)
const parseInlineStyles = (text: string): React.ReactNode[] => {
  const parts: React.ReactNode[] = [];
  let currentKey = 0;
  
  // Regex for bold (**text**) and links ([text](url))
  // We'll process them sequentially
  let i = 0;
  const length = text.length;
  
  while (i < length) {
    // Look for link pattern [text](url)
    if (text[i] === '[' && text.indexOf(']', i) !== -1) {
      const closeBracket = text.indexOf(']', i);
      const openParen = text.indexOf('(', closeBracket);
      const closeParen = text.indexOf(')', openParen);
      
      if (openParen === closeBracket + 1 && closeParen !== -1) {
        // We found a link!
        const linkText = text.substring(i + 1, closeBracket);
        const linkUrl = text.substring(openParen + 1, closeParen);
        
        parts.push(
          <a 
            key={`link-${currentKey++}`}
            href={linkUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="text-emerald-600 hover:text-emerald-700 underline font-semibold transition-colors cursor-pointer"
          >
            {linkText}
          </a>
        );
        i = closeParen + 1;
        continue;
      }
    }
    
    // Look for bold pattern **text**
    if (text.substring(i, i + 2) === '**' && text.indexOf('**', i + 2) !== -1) {
      const closeBold = text.indexOf('**', i + 2);
      const boldText = text.substring(i + 2, closeBold);
      parts.push(
        <strong key={`bold-${currentKey++}`} className="font-bold text-neutral-900">
          {boldText}
        </strong>
      );
      i = closeBold + 2;
      continue;
    }
    
    // Fallback to characters
    const nextSpecialIndex = findNextSpecialChar(text, i);
    if (nextSpecialIndex === -1) {
      parts.push(text.substring(i));
      break;
    } else {
      parts.push(text.substring(i, nextSpecialIndex));
      i = nextSpecialIndex;
    }
  }
  
  return parts;
};

const findNextSpecialChar = (text: string, startIndex: number): number => {
  const bIndex = text.indexOf('**', startIndex);
  const lIndex = text.indexOf('[', startIndex);
  
  if (bIndex === -1 && lIndex === -1) return -1;
  if (bIndex === -1) return lIndex;
  if (lIndex === -1) return bIndex;
  return Math.min(bIndex, lIndex);
};

export default function Chatbot() {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      id: 'welcome',
      role: 'model',
      text: "Hi! I'm **Khattak AI**, Mehaal's proxy agent. Ask me about his AI automations, reviews, or main site [mehaalkhattak.vercel.app](https://mehaalkhattak.vercel.app). \n\nWhat are you looking to automate?",
      timestamp: new Date()
    }
  ]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);

  const messagesEndRef = useRef<HTMLDivElement>(null);
  const chatInputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (isOpen) {
      setTimeout(() => {
        messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
        chatInputRef.current?.focus();
      }, 100);
    }
  }, [isOpen, messages, isLoading]);

  const handleSend = async (textToSend: string) => {
    const trimmed = textToSend.trim();
    if (!trimmed) return;

    // Add user message
    const userMsgId = `user-${Date.now()}`;
    const newMsg: ChatMessage = {
      id: userMsgId,
      role: 'user',
      text: trimmed,
      timestamp: new Date()
    };

    const updatedMessages = [...messages, newMsg];
    setMessages(updatedMessages);
    setInput('');
    setIsLoading(true);
    setErrorMsg(null);

    // Prepare message history for backend context
    const history = updatedMessages
      .slice(1, -1) // skip welcome message and current user message
      .map(m => ({
        role: m.role,
        text: m.text
      }));

    try {
      const response = await fetch('/api/chat', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          message: trimmed,
          history: history
        })
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || 'Server responded with an error');
      }

      setMessages(prev => [
        ...prev,
        {
          id: `bot-${Date.now()}`,
          role: 'model',
          text: data.text || "I processed your request, but didn't generate any text. Let me know if I can assist with something else!",
          timestamp: new Date()
        }
      ]);
    } catch (err: any) {
      console.error('Chat error:', err);
      setErrorMsg(err.message || 'Failed to connect with Khattak AI server.');
    } finally {
      setIsLoading(false);
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      handleSend(input);
    }
  };

  const starterChips = [
    { label: "Show AI workflows", query: "What kind of workflow automations can you build?" },
    { label: "Verify Vercel integration", query: "How do your services connect with https://mehaalkhattak.vercel.app?" },
    { label: "Check client reviews", query: "Can you summarize your client reviews and feedback?" },
    { label: "Book a consultation", query: "How can I hire Mehaal or book a consultation?" }
  ];

  return (
    <div id="portfolio-chatbot" className="fixed bottom-6 right-6 z-50 font-sans">
      <AnimatePresence>
        {/* Chat Window Panel */}
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, scale: 0.9, y: 30 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9, y: 30 }}
            transition={{ type: 'spring', damping: 25, stiffness: 220 }}
            className="absolute bottom-18 right-0 w-[92vw] sm:w-[420px] h-[550px] bg-white border border-neutral-200 rounded-2xl shadow-2xl overflow-hidden flex flex-col justify-between"
          >
            {/* Header */}
            <div className="p-4 bg-neutral-50 border-b border-neutral-200 flex items-center justify-between">
              <div className="flex items-center space-x-3">
                <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-emerald-500 to-indigo-600 flex items-center justify-center text-white relative">
                  <Bot className="w-5 h-5 text-white animate-pulse" />
                  <span className="absolute bottom-0 right-0 w-2.5 h-2.5 bg-emerald-500 rounded-full border-2 border-white"></span>
                </div>
                <div className="text-left">
                  <h3 className="font-mono text-sm font-bold text-neutral-900 tracking-tight flex items-center gap-1.5">
                    Khattak AI
                    <Sparkles className="w-3.5 h-3.5 text-emerald-600" />
                  </h3>
                  <p className="text-[10px] text-emerald-600 font-mono font-bold">Autonomous Assistant • Online</p>
                </div>
              </div>
              <button
                onClick={() => setIsOpen(false)}
                className="p-1.5 hover:bg-neutral-100 rounded-lg text-neutral-400 hover:text-neutral-900 transition-colors cursor-pointer"
                title="Minimize Assistant"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            {/* Message Streams */}
            <div className="flex-1 overflow-y-auto p-4 space-y-4 scrollbar-thin scrollbar-thumb-neutral-300">
              {messages.map((msg) => (
                <div
                  key={msg.id}
                  className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}
                >
                  <div
                    className={`max-w-[85%] rounded-2xl p-3.5 text-xs text-left ${
                      msg.role === 'user'
                        ? 'bg-emerald-500 text-white rounded-tr-none shadow-sm'
                        : 'bg-neutral-100 border border-neutral-200 text-neutral-800 rounded-tl-none'
                    }`}
                  >
                    {msg.role === 'model' ? (
                      <div className="space-y-1 font-sans">
                        {renderFormattedText(msg.text)}
                      </div>
                    ) : (
                      <p className="leading-relaxed whitespace-pre-wrap">{msg.text}</p>
                    )}
                    <span className={`block text-[8px] mt-1 font-mono text-right ${msg.role === 'user' ? 'text-emerald-100' : 'text-neutral-500'}`}>
                      {msg.timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                    </span>
                  </div>
                </div>
              ))}

              {/* Loader Typing Indicator */}
              {isLoading && (
                <div className="flex justify-start">
                  <div className="bg-neutral-100 border border-neutral-200 rounded-2xl rounded-tl-none p-4 max-w-[85%] text-left">
                    <div className="flex items-center space-x-1.5">
                      <span className="w-2 h-2 bg-emerald-500 rounded-full animate-bounce" style={{ animationDelay: '0ms' }} />
                      <span className="w-2 h-2 bg-emerald-500 rounded-full animate-bounce" style={{ animationDelay: '150ms' }} />
                      <span className="w-2 h-2 bg-emerald-500 rounded-full animate-bounce" style={{ animationDelay: '300ms' }} />
                    </div>
                  </div>
                </div>
              )}

              {/* Error Layout */}
              {errorMsg && (
                <div className="p-3 bg-red-50 border border-red-200 rounded-xl flex items-start gap-3 text-left">
                  <AlertCircle className="w-5 h-5 text-red-600 shrink-0 mt-0.5" />
                  <div className="space-y-2">
                    <p className="text-[11px] text-red-700 leading-normal">{errorMsg}</p>
                    <button
                      onClick={() => handleSend(messages[messages.length - 1].text)}
                      className="text-[10px] text-red-600 font-mono hover:text-red-700 flex items-center gap-1 cursor-pointer font-bold"
                    >
                      <RefreshCw className="w-3 h-3" /> Retry Message
                    </button>
                  </div>
                </div>
              )}

              <div ref={messagesEndRef} />
            </div>

            {/* Chips & Query suggestions */}
            {messages.length === 1 && !isLoading && (
              <div className="px-4 pb-2 text-left bg-neutral-50/50 pt-2 border-t border-neutral-100">
                <span className="text-[10px] text-neutral-400 font-mono mb-2 block uppercase font-bold">Suggested Inquiries:</span>
                <div className="flex flex-wrap gap-1.5">
                  {starterChips.map((chip, idx) => (
                    <button
                      key={idx}
                      onClick={() => handleSend(chip.query)}
                      className="text-[10px] bg-white border border-neutral-200 hover:border-emerald-500 hover:bg-emerald-50 text-neutral-600 hover:text-emerald-700 font-semibold px-2.5 py-1.5 rounded-lg transition-all duration-200 cursor-pointer text-left"
                    >
                      {chip.label}
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* Footer Input Area */}
            <div className="p-3 bg-neutral-50 border-t border-neutral-200 flex items-center gap-2">
              <input
                ref={chatInputRef}
                type="text"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyDown={handleKeyPress}
                placeholder="Message Khattak AI..."
                disabled={isLoading}
                className="flex-1 bg-white border border-neutral-200 focus:border-emerald-500 rounded-xl px-3 py-2 text-xs text-neutral-900 placeholder-neutral-400 focus:outline-none transition-all disabled:opacity-50"
              />
              <button
                onClick={() => handleSend(input)}
                disabled={!input.trim() || isLoading}
                className="p-2.5 bg-emerald-500 hover:bg-emerald-600 disabled:bg-neutral-200 text-white disabled:text-neutral-400 rounded-xl transition-all active:scale-95 disabled:scale-100 cursor-pointer"
                title="Send Message"
              >
                <Send className="w-3.5 h-3.5" />
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Floating Toggle Button */}
      <motion.button
        onClick={() => setIsOpen(!isOpen)}
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        className="w-14 h-14 rounded-full bg-gradient-to-tr from-emerald-500 to-indigo-600 flex items-center justify-center text-white shadow-lg cursor-pointer hover:shadow-emerald-500/20 shadow-emerald-500/10 focus:outline-none"
        title="Chat with Khattak AI"
      >
        <AnimatePresence mode="wait">
          {isOpen ? (
            <motion.div
              key="close"
              initial={{ rotate: -90, opacity: 0 }}
              animate={{ rotate: 0, opacity: 1 }}
              exit={{ rotate: 90, opacity: 0 }}
              transition={{ duration: 0.15 }}
            >
              <X className="w-6 h-6 stroke-[2.5]" />
            </motion.div>
          ) : (
            <motion.div
              key="chat"
              initial={{ rotate: 90, opacity: 0 }}
              animate={{ rotate: 0, opacity: 1 }}
              exit={{ rotate: -90, opacity: 0 }}
              transition={{ duration: 0.15 }}
              className="relative"
            >
              <MessageSquare className="w-6 h-6 stroke-[2.5]" />
              <span className="absolute -top-1.5 -right-1.5 flex h-3.5 w-3.5">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-indigo-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-3.5 w-3.5 bg-indigo-500 text-[8px] font-bold items-center justify-center text-white">1</span>
              </span>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.button>
    </div>
  );
}
