"use client";

import React from 'react';
import { parseInlineStyles } from '../_lib/roadmap-parser';

/**
 * Renders long-form roadmap text with support for lists and basic markdown-like syntax.
 */
export const FormattedText = ({ text }: { text: string }) => {
  const blocks = text.split('\n\n');
  return (
    <div className="text-slate-300 text-base leading-relaxed mb-6 space-y-4 font-sans">
      {blocks.map((block, idx) => {
        if (block.trim().startsWith('- ') || block.trim().startsWith('• ')) {
          const items = block.trim().split('\n').filter(line => line.trim().startsWith('- ') || line.trim().startsWith('• '));
          return (
            <ul key={idx} className="list-disc pl-5 space-y-2 marker:text-indigo-400">
              {items.map((item, itemIdx) => {
                const cleanItem = item.replace(/^[-•]\s*/, '');
                return <li key={itemIdx}>{parseInlineStyles(cleanItem)}</li>;
              })}
            </ul>
          );
        }
        return <p key={idx} className="leading-relaxed">{parseInlineStyles(block)}</p>;
      })}
    </div>
  );
};
