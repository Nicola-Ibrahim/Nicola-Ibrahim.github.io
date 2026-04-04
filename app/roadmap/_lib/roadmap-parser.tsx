import React from 'react';

/**
 * Parses inline markdown-like styles (**bold**, `code`) into React elements.
 */
export const parseInlineStyles = (text: string) => {
  const parts = text.split(/(\*\*.*?\*\*|`.*?`)/g);
  return parts.map((part, i) => {
    if (part.startsWith('**') && part.endsWith('**')) {
      return <strong key={i} className="font-semibold text-white">{part.slice(2, -2)}</strong>;
    }
    if (part.startsWith('`') && part.endsWith('`')) {
      return <code key={i} className="bg-white/10 text-pink-400 px-1.5 py-0.5 rounded text-sm font-mono border border-white/5">{part.slice(1, -1)}</code>;
    }
    return part;
  });
};
