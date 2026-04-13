import React from 'react';

/**
 * Utility to extract plain text from React children (recursively).
 * Shared between Server and Client for consistent ID generation.
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
 * Shared between Server and Client to ensure hydration matching.
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

