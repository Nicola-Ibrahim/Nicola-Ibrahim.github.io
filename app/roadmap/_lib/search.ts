import Fuse from 'fuse.js';

export interface SearchItem {
  type: 'track' | 'chapter' | 'section';
  url: string;
  title: string;
  chapterTitle?: string;
  trackTitle: string;
  trackId: string;
  content: string;
}

export interface SearchResult extends SearchItem {
  snippet: string;
  approximate: boolean;
}

const STOP_WORDS = new Set(['a', 'an', 'and', 'for', 'how', 'in', 'is', 'of', 'on', 'the', 'to', 'what', 'with']);
const ALIASES: Record<string, string> = {
  auth: 'authentication',
  authenticate: 'authentication',
  authorization: 'authorization',
  secure: 'security',
  securing: 'security',
  secured: 'security',
  servers: 'server',
  containers: 'container',
  databases: 'database',
};

function normalize(value: string): string {
  return value.toLowerCase().replace(/[^a-z0-9]+/g, ' ').trim();
}

function terms(value: string): string[] {
  return normalize(value).split(/\s+/).filter(Boolean)
    .filter(term => !STOP_WORDS.has(term))
    .map(term => ALIASES[term] || term);
}

function fieldTerms(value: string): Set<string> {
  return new Set(terms(value));
}

function hasTerm(field: Set<string>, term: string): boolean {
  if (field.has(term)) return true;
  if (term.length < 4) return false;
  return [...field].some(word => word.startsWith(term) || term.startsWith(word) && word.length >= 4);
}

function lexicalScore(item: SearchItem, query: string, queryTerms: string[]): number {
  const title = fieldTerms(item.title);
  const chapter = fieldTerms(item.chapterTitle || '');
  const track = fieldTerms(item.trackTitle);
  const body = fieldTerms(item.content);

  // A section needs its own matching text; its chapter name alone is too broad.
  if (item.type === 'section' &&
      !queryTerms.some(term => hasTerm(title, term) || hasTerm(body, term))) return 0;

  if (!queryTerms.every(term =>
    hasTerm(title, term) || hasTerm(chapter, term) || hasTerm(track, term) || hasTerm(body, term)
  )) return 0;

  const phrase = normalize(query);
  let score = item.type === 'section' ? 3 : 0;
  if (normalize(item.title) === phrase) score += 120;
  else if (normalize(item.title).includes(phrase)) score += 70;
  if (normalize(item.chapterTitle || '').includes(phrase)) score += 18;
  if (normalize(item.content).includes(phrase)) score += 10;

  for (const term of queryTerms) {
    if (hasTerm(title, term)) score += 22;
    else if (hasTerm(chapter, term)) score += 8;
    else if (hasTerm(track, term)) score += 4;
    else if (hasTerm(body, term)) score += 2;
  }
  return score;
}

function makeSnippet(item: SearchItem, query: string, queryTerms: string[]): string {
  const content = item.content.trim();
  if (!content) return item.chapterTitle || item.trackTitle;

  const lower = content.toLowerCase();
  let position = lower.indexOf(query.toLowerCase());
  if (position < 0) {
    position = queryTerms.map(term => {
      const variants = Object.entries(ALIASES)
        .filter(([, canonical]) => canonical === term)
        .map(([alias]) => alias);
      return [term, ...variants].map(variant => lower.indexOf(variant))
        .filter(index => index >= 0).sort((a, b) => a - b)[0];
    }).filter((index): index is number => index !== undefined).sort((a, b) => a - b)[0] ?? 0;
  }

  const start = Math.max(0, position - 45);
  const end = Math.min(content.length, start + 170);
  const slice = content.slice(start, end).trim();
  return `${start ? '…' : ''}${slice}${end < content.length ? '…' : ''}`;
}

export function createFuzzyIndex(items: SearchItem[]): Fuse<SearchItem> {
  return new Fuse(items, {
    keys: [
      { name: 'title', weight: 4 },
      { name: 'chapterTitle', weight: 2 },
      { name: 'trackTitle', weight: 1 },
      { name: 'content', weight: 0.5 },
    ],
    threshold: 0.35,
    ignoreLocation: true,
    includeScore: true,
    minMatchCharLength: 2,
  });
}

export function searchDocs(items: SearchItem[], fuzzy: Fuse<SearchItem>, query: string): SearchResult[] {
  const queryTerms = [...new Set(terms(query))];
  if (!queryTerms.length) return [];

  const ranked = items.map(item => ({ item, score: lexicalScore(item, query, queryTerms) }))
    .filter(({ score }) => score > 0)
    .sort((a, b) => b.score - a.score);

  const results: SearchResult[] = ranked.slice(0, 8).map(({ item }) => ({
    ...item,
    snippet: makeSnippet(item, query, queryTerms),
    approximate: false,
  }));

  // Fuzzy matching is a rescue path for typos, not filler for relevant results.
  if (results.length === 0) {
    const seen = new Set(results.map(item => item.url));
    for (const match of fuzzy.search(query, { limit: 30 })) {
      if (seen.has(match.item.url)) continue;
      results.push({
        ...match.item,
        snippet: makeSnippet(match.item, query, queryTerms),
        approximate: true,
      });
      seen.add(match.item.url);
      if (seen.size === 8) break;
    }
  }

  return results;
}
