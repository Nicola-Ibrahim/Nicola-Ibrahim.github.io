"use client";

import React from 'react';
import { Terminal, Copy, Check, Info, Lightbulb, AlertTriangle, ChevronDown, ChevronUp } from 'lucide-react';
import { extractText } from './mdx-utils';

/**
 * Single master CodeBlock representing all code and prompt fences.
 * High-fidelity "Premium SaaS" aesthetic with a compact footprint.
 */
export const CodeBlock = ({ children, className }: { children: React.ReactNode, className?: string }) => {
  const [isCopied, setIsCopied] = React.useState(false);
  const [isExpanded, setIsExpanded] = React.useState(false);
  const [shouldShowExpand, setShouldShowExpand] = React.useState(false);
  const contentRef = React.useRef<HTMLDivElement>(null);

  const codeText = extractText(children);
  const isPrompt = className?.includes('language-prompt') || className === 'prompt';
  const lang = className?.replace('language-', '') || 'code';

  React.useEffect(() => {
    if (contentRef.current) {
      if (contentRef.current.scrollHeight > 400) {
        setShouldShowExpand(true);
      }
    }
  }, [children]);

  const handleCopy = () => {
    navigator.clipboard.writeText(codeText);
    setIsCopied(true);
    setTimeout(() => setIsCopied(false), 2000);
  };

  return (
    <div 
      className="not-prose my-10 ml-0 lg:ml-10 group relative rounded-xl border border-slate-200 dark:border-white/10 bg-[#f9fafb] dark:bg-[#0d1117] overflow-hidden shadow-sm transition-all duration-300"
      data-is-skill={isPrompt}
    >
      {/* Branded Header */}
      <div className="flex items-center justify-between px-4 py-3 bg-slate-50 dark:bg-white/[0.03] border-b border-slate-200 dark:border-white/10">
        <div className="flex items-center gap-4">
          {/* Tab Element */}
          <div className="flex items-center gap-2 px-3 py-1.5 bg-white dark:bg-[#161B22] border border-slate-200 dark:border-white/10 border-b-0 rounded-t-lg -mb-[13px] z-10 text-[10px] font-black tracking-widest uppercase text-slate-500 dark:text-slate-400 shadow-[0_-1px_0_rgba(0,0,0,0.05)] dark:shadow-none">
            <Terminal className="w-3 h-3 text-teal-600 dark:text-teal-400" />
            {isPrompt ? 'Agent Skill' : lang}
          </div>
        </div>

        <button
          onClick={handleCopy}
          className="flex items-center gap-2 px-3 py-1.5 rounded-md text-[9px] font-black uppercase tracking-widest transition-all bg-white dark:bg-[#161B22] text-slate-600 dark:text-slate-400 hover:bg-slate-50 dark:hover:bg-teal-500/10 dark:hover:text-teal-400 border border-slate-200 dark:border-white/10 active:scale-95 group/copy shadow-sm"
        >
          {isCopied ? <Check className="w-3 h-3 text-teal-600 dark:text-teal-400" /> : <Copy className="w-3 h-3 group-hover/copy:text-teal-600 dark:group-hover/copy:text-teal-400 transition-colors" />}
          {isCopied ? 'Copied' : (isPrompt ? 'Copy Skill' : 'Copy Code')}
        </button>
      </div>

      {/* Seamless Content Area */}
      <div
        ref={contentRef}
        suppressHydrationWarning
        style={{ maxHeight: shouldShowExpand && !isExpanded ? '400px' : 'none' }}
        className={`relative py-6 px-0 bg-transparent font-mono text-[14px] leading-relaxed overflow-x-auto selection:bg-teal-500/30 custom-scrollbar [&_pre]:!bg-transparent [&_pre]:!p-0 [&_pre]:!m-0 [&_code]:!bg-transparent [&_code]:!p-0 ${isPrompt ? "whitespace-pre-wrap text-black dark:text-white [&_*]:!text-inherit px-6" : "whitespace-pre"}`}
      >
        {children}

        {/* Gradient Overlay for collapsed state */}
        {shouldShowExpand && !isExpanded && (
          <div className="absolute bottom-0 left-0 right-0 h-24 bg-gradient-to-t from-[#f9fafb] via-[#f9fafb]/80 to-transparent dark:from-[#0d1117] dark:via-[#0d1117]/80 dark:to-transparent z-20 pointer-events-none" />
        )}
      </div>

      {/* Expand/Collapse Toggle */}
      {shouldShowExpand && (
        <div className={`p-4 flex justify-center bg-slate-50 dark:bg-white/[0.02] border-t border-slate-200 dark:border-white/10 ${!isExpanded ? '-mt-px relative z-30' : ''}`}>
          <button
            onClick={() => setIsExpanded(!isExpanded)}
            className="flex items-center gap-2 px-4 py-2 rounded-full text-[10px] font-black uppercase tracking-widest transition-all bg-white dark:bg-[#161B22] text-slate-600 dark:text-slate-400 hover:bg-slate-50 dark:hover:bg-teal-500/10 dark:hover:text-teal-400 border border-slate-200 dark:border-white/10 shadow-sm active:scale-95"
          >
            {isExpanded ? (
              <><ChevronUp className="w-3 h-3" /> Show Less</>
            ) : (
              <><ChevronDown className="w-3 h-3" /> Show More</>
            )}
          </button>
        </div>
      )}
    </div>
  );
};


/**
 * Callout - MkDocs Admonition style for architectural notes, tips, and warnings.
 */
export const Callout = ({ type, title, children }: { type: 'info' | 'tip' | 'warning', title?: string, children: React.ReactNode }) => {
  const configs = {
    info: {
      icon: Info,
      containerClass: 'border-blue-200 dark:border-blue-900/30 bg-blue-50/50 dark:bg-blue-900/5',
      headerClass: 'bg-blue-100/50 dark:bg-blue-900/20 border-blue-200 dark:border-blue-900/30',
      titleColor: 'text-blue-700 dark:text-blue-400',
      label: 'INFO'
    },
    tip: {
      icon: Lightbulb,
      containerClass: 'border-teal-200 dark:border-teal-900/30 bg-teal-50/50 dark:bg-teal-900/5',
      headerClass: 'bg-teal-100/50 dark:bg-teal-900/20 border-teal-200 dark:border-teal-900/30',
      titleColor: 'text-teal-700 dark:text-teal-400',
      label: 'TIP'
    },
    warning: {
      icon: AlertTriangle,
      containerClass: 'border-amber-200 dark:border-amber-900/30 bg-amber-50/50 dark:bg-amber-900/5',
      headerClass: 'bg-amber-100/50 dark:bg-amber-900/20 border-amber-200 dark:border-amber-900/30',
      titleColor: 'text-amber-700 dark:text-amber-400',
      label: 'WARNING'
    }
  };
  const config = configs[type];
  const Icon = config.icon;
  const displayTitle = title || config.label;

  // Render children minus the markup [!type] wrapper natively
  const cleanChildren = React.Children.map(children, (child) => {
    if (React.isValidElement(child)) {
      const props = child.props as { children?: React.ReactNode };
      const subChildren = React.Children.toArray(props.children);
      const newSubChildren = subChildren.map(c => typeof c === 'string' ? c.replace(/^\s*\[!(info|tip|warning)\]\s*/i, '') : c);
      return React.cloneElement(child, props, ...newSubChildren);
    }
    return child;
  });

  return (
    <div className={`my-10 ml-10 rounded-xl border ${config.containerClass} overflow-hidden shadow-px`}>
      <div className={`flex items-center gap-2.5 px-5 py-3 border-b ${config.headerClass} ${config.titleColor}`}>
        <Icon className="w-4 h-4" />
        <span className="text-[11px] font-black uppercase tracking-[0.2em]">{displayTitle}</span>
      </div>
      <div className="p-6 text-[15px] leading-relaxed text-slate-700 dark:text-slate-300 prose-p:my-0 prosec-a:text-teal-600 dark:prose-a:text-teal-400 prose-a:font-bold">
        {cleanChildren}
      </div>
    </div>
  );
};


