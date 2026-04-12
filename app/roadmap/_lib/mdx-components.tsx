"use client";

import React from 'react';
import { Terminal, Copy, Check, Info, Lightbulb, AlertTriangle } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { extractText, generateId } from './mdx-utils';




/**
 * AgentPrompt - A high-fidelity "SaaS Dashboard" chassis.
 * Implements a dedicated header with icons, breadcrumbs, and solid action buttons.
 */
export const AgentPrompt = ({ children }: { children: React.ReactNode }) => {
  const [isCopied, setIsCopied] = React.useState(false);
  const codeText = extractText(children);
  
  const handleCopy = () => {
    navigator.clipboard.writeText(codeText);
    setIsCopied(true);
    setTimeout(() => setIsCopied(false), 2000);
  };

  return (
    <div className="not-prose my-12 rounded-[2rem] border border-white/5 bg-[#1A1D24] overflow-hidden shadow-2xl transition-all duration-300 transform group">
      {/* Dynamic Header Section */}
      <div className="flex items-center justify-between px-8 py-5 border-b border-white/5 bg-white/2">
        <div className="flex items-center gap-4">
          <div className="bg-teal-500/10 p-2.5 rounded-xl border border-teal-500/20 text-teal-400">
            <Terminal className="w-4 h-4" />
          </div>
          <div className="flex flex-col">
            <span className="text-[10px] font-black uppercase tracking-[0.2em] text-slate-400 leading-none mb-1">
              Agent Skill Prompt
            </span>
            <div className="flex items-center gap-2">
              <span className="w-1 h-1 rounded-full bg-teal-500/40" />
              <span className="text-[9px] font-bold text-slate-500 uppercase tracking-widest">Interactive Skill</span>
            </div>
          </div>
        </div>
        
        <button 
          onClick={handleCopy}
          className={`group/btn flex items-center gap-2.5 py-2.5 px-5 rounded-xl text-[10px] font-black uppercase tracking-wider transition-all duration-300 ${
            isCopied 
              ? 'bg-teal-500 text-white scale-95 shadow-lg shadow-teal-500/20' 
              : 'bg-teal-600 hover:bg-teal-500 text-white shadow-xl shadow-teal-900/20 hover:-translate-y-0.5'
          }`}
        >
          {isCopied ? <Check className="w-3.5 h-3.5" /> : <Copy className="w-3.5 h-3.5 group-hover/btn:rotate-12 transition-transform" />}
          {isCopied ? 'Copied' : 'Copy Skill'}
        </button>
      </div>

      {/* Code Text Section */}
      <div className="p-10 font-mono text-[14px] leading-relaxed text-[#D1D5DB] whitespace-pre-wrap selection:bg-teal-500/20 selection:text-white">
        {children}
      </div>
    </div>
  );
};

/**
 * CodeBlock - High-fidelity Chassis for deep-tech documentation.
 * Features a structured header metadata layer and integrated syntax palette.
 */
export const CodeBlock = ({ children, className }: { children: any, className?: string }) => {
  const [isCopied, setIsCopied] = React.useState(false);
  const codeText = extractText(children);
  const lang = className?.replace('language-', '') || 'code';
 
  const handleCopy = () => {
    navigator.clipboard.writeText(codeText);
    setIsCopied(true);
    setTimeout(() => setIsCopied(false), 2000);
  };

  return (
    <div className="not-prose my-12 rounded-[2rem] border border-white/5 bg-[#1A1D24] overflow-hidden shadow-2xl transform transition-all duration-300 group">
      {/* Code Header Row */}
      <div className="flex items-center justify-between px-8 py-5 border-b border-white/5 bg-white/2">
        <div className="flex items-center gap-4">
          <div className="bg-slate-500/10 p-2.5 rounded-xl border border-white/5 text-slate-400">
            <Terminal className="w-4 h-4" />
          </div>
          <div className="flex flex-col">
            <span className="text-[10px] font-black uppercase tracking-[0.2em] text-slate-400 leading-none mb-1">
              Source Code
            </span>
            <div className="flex items-center gap-2">
              <span className="w-1 h-1 rounded-full bg-teal-500/40" />
              <span className="text-[9px] font-bold text-slate-500 uppercase tracking-widest">{lang} module</span>
            </div>
          </div>
        </div>
        
        <button 
          onClick={handleCopy}
          className={`group/btn flex items-center gap-2.5 py-2.5 px-5 rounded-xl text-[10px] font-black uppercase tracking-wider transition-all duration-300 ${
            isCopied 
              ? 'bg-teal-500 text-white scale-95 shadow-lg shadow-teal-500/20' 
              : 'bg-teal-600 hover:bg-teal-500 text-white shadow-xl shadow-teal-900/20 hover:-translate-y-0.5'
          }`}
        >
          {isCopied ? <Check className="w-3.5 h-3.5" /> : <Copy className="w-3.5 h-3.5 group-hover/btn:rotate-12 transition-transform" />}
          {isCopied ? 'Copied' : 'Copy Code'}
        </button>
      </div>

      {/* Code Viewer Section */}
      <div className="font-mono text-[14px] leading-relaxed overflow-x-auto custom-scrollbar p-10 selection:bg-teal-500/20 selection:text-white">
        <div className="w-full whitespace-pre">
          {children}
        </div>
      </div>
    </div>
  );
};

/**
 * Callout - Premium UI for architectural notes, tips, and warnings.
 */
export const Callout = ({ type, title, children }: { type: 'info' | 'tip' | 'warning', title?: string, children: React.ReactNode }) => {
  const configs = {
    info: { icon: Info, colorClass: 'text-blue-600 dark:text-blue-400', bgClass: 'bg-blue-500/5 dark:bg-blue-400/5', borderClass: 'border-blue-500/20 dark:border-blue-400/20', accentBorder: 'border-l-blue-500 dark:border-l-blue-400', label: 'Insight' },
    tip: { icon: Lightbulb, colorClass: 'text-amber-600 dark:text-amber-400', bgClass: 'bg-amber-500/5 dark:bg-amber-400/5', borderClass: 'border-amber-500/20 dark:border-amber-400/20', accentBorder: 'border-l-amber-500 dark:border-l-amber-400', label: 'Pro Tip' },
    warning: { icon: AlertTriangle, colorClass: 'text-rose-600 dark:text-rose-400', bgClass: 'bg-rose-500/5 dark:bg-rose-400/5', borderClass: 'border-rose-500/20 dark:border-rose-400/20', accentBorder: 'border-l-rose-500 dark:border-l-rose-400', label: 'Caution' }
  };
  const config = configs[type];
  const Icon = config.icon;

  // Strip the [!type] signature from the first child text nodes
  const cleanChildren = React.Children.map(children, (child) => {
    if (React.isValidElement(child)) {
      const subChildren = React.Children.toArray((child.props as any).children);
      const newSubChildren = subChildren.map(c => {
        if (typeof c === 'string') {
          return c.replace(/^\s*\[!(info|tip|warning)\]\s*/i, '');
        }
        return c;
      });
      return React.cloneElement(child, { ...(child.props as any) }, ...newSubChildren);
    }
    return child;
  });

  return (
    <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className={`my-10 p-7 rounded-[1.5rem] border ${config.borderClass} ${config.accentBorder} border-l-2 ${config.bgClass} backdrop-blur-[2px] relative overflow-hidden group/callout transition-all duration-300 hover:shadow-lg dark:hover:shadow-black/10`}>
      <div className="flex items-start gap-4">
        <div className={`mt-0.5 p-2.5 rounded-xl ${config.bgClass} border ${config.borderClass} ${config.colorClass} shadow-sm`}>
          <Icon className="w-4 h-4" />
        </div>
        <div className="flex-1 min-w-0">
          {(title || config.label) && (
            <div className="flex items-center gap-3 mb-1.5 leading-none">
              <span className={`text-[9px] font-black uppercase tracking-[0.2em] opacity-80 ${config.colorClass}`}>{config.label}</span>
              {title && (
                <>
                  <div className="w-1 h-1 rounded-full bg-slate-300 dark:bg-white/10" />
                  <span className="text-[11px] font-bold text-slate-900 dark:text-slate-100 uppercase tracking-widest">{title}</span>
                </>
              )}
            </div>
          )}
          <div suppressHydrationWarning className="text-sm leading-relaxed text-slate-600 dark:text-slate-400 font-medium prose-p:my-0 prose-strong:text-slate-900 dark:prose-strong:text-white">
            {cleanChildren}
          </div>
        </div>
      </div>
    </motion.div>
  );
};

