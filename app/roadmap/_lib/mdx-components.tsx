"use client";

import React from 'react';
import { Terminal, Copy, Check, Info, Lightbulb, AlertTriangle } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { extractText, generateId } from './mdx-utils';




/**
 * AgentPrompt - Exactly matched to the approved user-provided reference.
 * Features a solid teal header box and clean metadata labels.
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
    <div className="not-prose my-10 rounded-[20px] border border-slate-200 dark:border-white/10 bg-white dark:bg-[#16181D] overflow-hidden shadow-sm dark:shadow-xl transition-all duration-300 group">
      {/* Precision Header Layer */}
      <div className="flex items-center justify-between px-6 py-4 border-b border-slate-200 dark:border-white/10">
        <div className="flex items-center gap-4">
          <div className="bg-teal-500 text-white p-2 rounded-[10px]">
            <Terminal className="w-4 h-4" />
          </div>
          <span className="text-[11px] font-bold uppercase tracking-[0.2em] text-slate-500 dark:text-slate-400 truncate">
            Agent Skill Prompt
          </span>
        </div>
        
        <button 
          onClick={handleCopy}
          className={`flex items-center gap-2 px-4 py-2 bg-teal-500 hover:bg-teal-600 text-white rounded-[10px] text-[10px] font-bold uppercase tracking-wider transition-all shrink-0 ${
            isCopied ? 'scale-[0.98] opacity-90' : ''
          }`}
        >
          {isCopied ? <Check className="w-3.5 h-3.5" /> : <Copy className="w-3.5 h-3.5" />}
          {isCopied ? 'Copied' : 'Copy Skill'}
        </button>
      </div>

      {/* Code Text Section */}
      <div className="p-8 font-mono text-[14px] leading-8 text-slate-700 dark:text-[#c7ccd7] whitespace-pre-wrap selection:bg-teal-500/20 selection:dark:text-white">
        {children}
      </div>
    </div>
  );
};

/**
 * CodeBlock - High-fidelity single-shell template.
 * Mirrors the AgentPrompt structure for visual consistency.
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
    <div className="not-prose my-10 rounded-[20px] border border-slate-200 dark:border-white/10 bg-white dark:bg-[#16181D] overflow-hidden shadow-sm dark:shadow-xl transition-all duration-300 group">
      {/* Code Header Row */}
      <div className="flex items-center justify-between px-6 py-4 border-b border-slate-200 dark:border-white/10">
        <div className="flex items-center gap-4">
          <div className="bg-[#475569] dark:bg-slate-700 text-white p-2 rounded-[10px]">
            <Terminal className="w-4 h-4" />
          </div>
          <span className="text-[11px] font-bold uppercase tracking-[0.2em] text-slate-500 dark:text-slate-400 truncate">
            {lang} code
          </span>
        </div>
        
        <button 
          onClick={handleCopy}
          className={`flex items-center gap-2 px-4 py-2 bg-teal-500 hover:bg-teal-600 text-white rounded-[10px] text-[10px] font-bold uppercase tracking-wider transition-all shrink-0 ${
            isCopied ? 'scale-[0.98] opacity-90' : ''
          }`}
        >
          {isCopied ? <Check className="w-3.5 h-3.5" /> : <Copy className="w-3.5 h-3.5" />}
          {isCopied ? 'Copied' : 'Copy Code'}
        </button>
      </div>

      {/* Code Viewer Section */}
      <div className="font-mono text-[14px] leading-8 overflow-x-auto custom-scrollbar p-8 text-slate-700 dark:text-[#c7ccd7] selection:bg-teal-500/20 selection:dark:text-white">
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

