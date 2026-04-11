"use client";

import React from 'react';
import { Terminal, Copy, Check, Info, Lightbulb, AlertTriangle } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

// Custom Roadmap Widgets
import AsyncDecisionFlowchart from '@/app/roadmap/_content/backend/_components/AsyncDecisionFlowchart';
import ThreadsVsCoroutines from '@/app/roadmap/_content/backend/_components/ThreadsVsCoroutines';
import EventLoopStepper from '@/app/roadmap/_content/backend/_components/EventLoopStepper';
import NotificationStrategies from '@/app/roadmap/_content/backend/_components/NotificationStrategies';

/**
 * Utility to extract plain text from React children (recursively).
 */
export function extractText(children: any): string {
  if (!children) return '';
  if (typeof children === 'string') return children;
  if (typeof children === 'number') return children.toString();
  if (Array.isArray(children)) return children.map(extractText).join('');
  if (React.isValidElement(children)) {
    return extractText((children.props as any).children);
  }
  return '';
}

/**
 * Utility to generate IDs from text for header anchoring.
 */
export function generateId(text: any): string {
  const plainText = typeof text === 'string' ? text : extractText(text);
  return plainText
    .toLowerCase()
    .replace(/^\d+\.\s*/, '') // Remove "1. "
    .replace(/[^\w\s-]/g, '')
    .replace(/\s+/g, '-')
    .trim();
}

/**
 * Utility to strip the [!type] signature from the first child node.
 */
function cleanCalloutChildren(children: React.ReactNode): React.ReactNode {
  return React.Children.map(children, (child) => {
    if (React.isValidElement(child)) {
      const subChildren = React.Children.toArray((child.props as any).children);
      const newSubChildren = subChildren.map(c => {
        if (typeof c === 'string') {
          return c.replace(/^\s*\[!(info|tip|warning)\]\s*/i, '');
        }
        return c;
      });
      return React.cloneElement(child, child.props as any, newSubChildren);
    }
    return child;
  });
}

/**
 * AgentPrompt - The premium terminal UI for prompted agent skills.
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
    <div className="not-prose my-12 bg-slate-900/80 dark:bg-[#0B0C10] rounded-[2rem] overflow-hidden border border-slate-200/50 dark:border-white/5 shadow-[0_25px_50px_-12px_rgba(0,0,0,0.5)] group/prompt backdrop-blur-xl relative [&_pre]:bg-transparent [&_pre]:p-0 [&_pre]:m-0 [&_pre]:border-none">
      <div className="flex items-center justify-between px-8 py-6 bg-slate-100/80 dark:bg-black/40 border-b border-slate-200/50 dark:border-white/5">
        <div className="flex items-center gap-6">
          <span className="block text-xs font-bold text-slate-800 dark:text-slate-100 uppercase tracking-[0.2em] leading-none">
            Agent System Prompt
          </span>
        </div>
        <button
          onClick={handleCopy}
          className={`relative overflow-hidden group/btn flex items-center gap-2.5 px-6 py-3 rounded-2xl text-[11px] font-black uppercase tracking-widest transition-all duration-300 ${isCopied
              ? 'bg-emerald-500 text-white'
              : 'bg-slate-900 dark:bg-white text-white dark:text-slate-900 hover:scale-105 active:scale-95 shadow-xl'
            }`}
        >
          <AnimatePresence mode="wait">
            {isCopied ? (
              <motion.div key="check" initial={{ y: 10, opacity: 0 }} animate={{ y: 0, opacity: 1 }} exit={{ y: -10, opacity: 0 }} className="flex items-center gap-2">
                <Check className="w-4 h-4" /> <span>Copied</span>
              </motion.div>
            ) : (
              <motion.div key="copy" initial={{ y: 10, opacity: 0 }} animate={{ y: 0, opacity: 1 }} exit={{ y: -10, opacity: 0 }} className="flex items-center gap-2">
                <Copy className="w-4 h-4" /> <span>Copy Prompt</span>
              </motion.div>
            )}
          </AnimatePresence>
        </button>
      </div>
      <div className="font-mono text-sm leading-relaxed overflow-x-auto selection:bg-teal-500/30 custom-scrollbar text-slate-300 dark:text-slate-400 whitespace-pre-wrap p-8">
        {children}
      </div>
    </div>
  );
};

/**
 * CodeBlock - Premium UI for multi-line code snippets
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
    <div className="not-prose my-12 bg-[#0d1117] dark:bg-[#0D1117] rounded-[1.5rem] overflow-hidden border border-white/5 shadow-2xl group/code relative [&_pre]:bg-transparent [&_pre]:p-0 [&_pre]:m-0 [&_pre]:border-none">
      <div className="flex items-center justify-between px-6 py-3.5 bg-white/5 border-b border-white/5">
        <span className="text-[10px] font-bold text-slate-400 uppercase tracking-[0.2em]">{lang}</span>
        <button
          onClick={handleCopy}
          className={`flex items-center gap-2 px-3 py-1.5 rounded-lg text-[9px] font-black uppercase tracking-widest transition-all ${isCopied ? 'text-emerald-400' : 'text-slate-400 hover:text-white'}`}
        >
          {isCopied ? <><Check className="w-3 h-3" /> Copied</> : <><Copy className="w-3 h-3" /> Copy</>}
        </button>
      </div>
      <div className="overflow-x-auto font-mono text-sm leading-relaxed custom-scrollbar text-slate-300 p-6">
        {children}
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
            {children}
          </div>
        </div>
      </div>
    </motion.div>
  );
};

/**
 * mdxComponents - The master registry for MDX element styling.
 * This is the single source of truth for standard HTML tags within documentation.
 */
export const mdxComponents = {
  pre: (props: any) => {
    const className = props.children?.props?.className || props['data-language'] || '';
    if (className === 'language-prompt' || props['data-language'] === 'prompt') {
      return React.createElement(AgentPrompt, { children: props.children });
    }
    return React.createElement(CodeBlock, { className, children: props.children });
  },

  blockquote: (props: any) => {
    const text = extractText(props.children).trim();
    const match = text.match(/^\[!(info|tip|warning)\]/i);
    if (match) {
      const type = match[1].toLowerCase() as 'info' | 'tip' | 'warning';
      return React.createElement(Callout, { type, children: cleanCalloutChildren(props.children) });
    }
    return React.createElement('blockquote', {
      className: 'border-l-4 border-slate-200 dark:border-white/10 pl-8 italic text-slate-500 dark:text-slate-500 my-10 text-lg font-light',
      ...props
    });
  },

  h1: (props: any) => React.createElement('h1', { className: 'text-3xl md:text-5xl font-black text-slate-900 dark:text-white mb-10 tracking-tighter leading-tight', ...props }),
  h2: (props: any) => React.createElement('h2', { id: generateId(props.children), className: 'text-xl md:text-2xl font-bold text-slate-900 dark:text-white mt-16 mb-8 tracking-tight border-l-4 border-teal-500 pl-6 scroll-mt-24', ...props }),
  h3: (props: any) => React.createElement('h3', { className: 'text-lg md:text-xl font-bold text-slate-800 dark:text-slate-200 mt-10 mb-6 tracking-wide', ...props }),
  p: (props: any) => React.createElement('p', { className: 'text-base leading-relaxed mb-6 text-slate-600 dark:text-slate-400 max-w-5xl', ...props }),
  ul: (props: any) => React.createElement('ul', { className: 'list-disc pl-8 mb-8 space-y-4 text-slate-600 dark:text-slate-400 text-base', ...props }),
  li: (props: any) => React.createElement('li', { className: 'leading-relaxed hover:text-slate-900 dark:hover:text-white transition-colors', ...props }),
  strong: (props: any) => React.createElement('strong', { className: 'font-bold text-slate-900 dark:text-white', ...props }),
  
  table: (props: any) => React.createElement('div', { className: 'my-10 overflow-x-auto rounded-3xl border border-slate-200 dark:border-white/10 shadow-lg bg-white/50 dark:bg-black/20 backdrop-blur-sm' }, React.createElement('table', { className: 'w-full text-left border-collapse', ...props })),
  thead: (props: any) => React.createElement('thead', { className: 'bg-slate-50 dark:bg-white/5 border-b border-slate-200 dark:border-white/10', ...props }),
  th: (props: any) => React.createElement('th', { className: 'px-8 py-5 text-slate-800 dark:text-slate-300 font-black uppercase tracking-[0.2em] text-[10px]', ...props }),
  td: (props: any) => React.createElement('td', { className: 'px-8 py-5 text-base text-slate-600 dark:text-slate-400 border-b border-slate-100 dark:border-white/5 last:border-0', ...props }),
  tr: (props: any) => React.createElement('tr', { className: 'hover:bg-slate-500/5 transition-colors', ...props }),

  code: (props: any) => React.createElement('code', { className: 'px-1.5 py-0.5 rounded-lg bg-teal-500/10 text-teal-600 dark:text-teal-400 font-mono text-[0.85em] font-bold', ...props }),

  AsyncDecisionFlowchart,
  ThreadsVsCoroutines,
  EventLoopStepper,
  NotificationStrategies,
};
