"use client";

import React from 'react';
import { Terminal, Copy, Check, Info, Lightbulb, AlertTriangle, ChevronDown, ChevronUp } from 'lucide-react';
import { extractText } from './mdx-utils';

/** Code and prompt fences share copy and expand controls. */
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
      className="not-prose group relative my-9 overflow-hidden rounded-xl border border-white/10 bg-[#171e26]"
      data-is-skill={isPrompt}
    >
      <div className="flex items-center justify-between border-b border-white/10 bg-white/[0.025] px-4 py-2.5">
        <div className="flex items-center gap-4">
          <div className="flex items-center gap-2 text-xs font-medium text-[#b8c7ce]">
            <Terminal className="h-3.5 w-3.5 text-[#a9c8c7]" />
            {isPrompt ? 'Agent Skill' : lang}
          </div>
        </div>

        <button
          onClick={handleCopy}
          className="group/copy flex items-center gap-2 rounded-md px-2.5 py-1.5 text-xs font-medium text-[#b8c7ce] transition-colors hover:bg-white/[0.06] hover:text-[#e4ecee] focus-visible:outline-2 focus-visible:outline-[#b5d0cf]"
        >
          {isCopied ? <Check className="h-3.5 w-3.5" /> : <Copy className="h-3.5 w-3.5" />}
          {isCopied ? 'Copied' : (isPrompt ? 'Copy Skill' : 'Copy Code')}
        </button>
      </div>

      {/* Seamless Content Area */}
      <div
        ref={contentRef}
        suppressHydrationWarning
        style={{ maxHeight: shouldShowExpand && !isExpanded ? '400px' : 'none' }}
        className={`custom-scrollbar relative overflow-x-auto bg-transparent px-0 py-5 font-mono text-[13px] leading-[1.65] text-[#c8d2d7] selection:bg-white/20 [&_code]:!bg-transparent [&_code]:!p-0 [&_pre]:!m-0 [&_pre]:!bg-transparent [&_pre]:!p-0 ${isPrompt ? "whitespace-pre-wrap px-5 [&_*]:!text-inherit" : "whitespace-pre"}`}
      >
        {children}

        {/* Gradient Overlay for collapsed state */}
        {shouldShowExpand && !isExpanded && (
          <div className="pointer-events-none absolute inset-x-0 bottom-0 z-20 h-24 bg-gradient-to-t from-[#171e26] via-[#171e26]/80 to-transparent" />
        )}
      </div>

      {/* Expand/Collapse Toggle */}
      {shouldShowExpand && (
        <div className={`flex justify-center border-t border-white/10 bg-white/[0.025] p-3 ${!isExpanded ? '-mt-px relative z-30' : ''}`}>
          <button
            onClick={() => setIsExpanded(!isExpanded)}
            className="flex items-center gap-2 rounded-full px-4 py-2 text-xs font-medium text-[#c2cdd2] transition-colors hover:bg-white/[0.06] hover:text-white focus-visible:outline-2 focus-visible:outline-[#b5d0cf]"
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


/** Inline notes for additional context and cautions. */
export const Callout = ({ type, title, children }: { type: 'info' | 'tip' | 'warning', title?: string, children: React.ReactNode }) => {
  const configs = {
    info: {
      icon: Info,
      containerClass: 'border-[#58718a]/35 bg-[#26323c]',
      headerClass: 'border-[#58718a]/25 bg-[#58718a]/10',
      titleColor: 'text-[#c6d8e6]',
      label: 'INFO'
    },
    tip: {
      icon: Lightbulb,
      containerClass: 'border-[#72918f]/35 bg-[#263331]',
      headerClass: 'border-[#72918f]/25 bg-[#72918f]/10',
      titleColor: 'text-[#c5d8d5]',
      label: 'TIP'
    },
    warning: {
      icon: AlertTriangle,
      containerClass: 'border-[#9a8363]/35 bg-[#332e29]',
      headerClass: 'border-[#9a8363]/25 bg-[#9a8363]/10',
      titleColor: 'text-[#e2d1b8]',
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
    <div className={`my-8 overflow-hidden rounded-xl border ${config.containerClass}`}>
      <div className={`flex items-center gap-2.5 px-5 py-3 border-b ${config.headerClass} ${config.titleColor}`}>
        <Icon className="w-4 h-4" />
        <span className="text-xs font-semibold uppercase tracking-[0.12em]">{displayTitle}</span>
      </div>
      <div className="p-5 text-[15px] leading-[1.75] text-[#c8d2d7] prose-p:my-0 prose-a:font-medium">
        {cleanChildren}
      </div>
    </div>
  );
};


