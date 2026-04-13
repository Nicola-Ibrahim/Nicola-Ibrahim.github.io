import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';
import { generateId } from './mdx-utils';

const CONTENT_PATH = path.join(process.cwd(), 'app/roadmap/_content');

/**
 * Default icon mapping based on slug keywords.
 * Provides "Zero-Config" icons by matching filename patterns to premium Lucide brands.
 */
const DEFAULT_ICON_MAP: Record<string, string> = {
  // Tracks
  ai_agents: 'bot',
  backend: 'server',
  algorithms: 'code-2',
  cloud: 'cloud',
  devops: 'terminal',
  network: 'layers',
  
  // Keywords (Generic matches)
  core: 'terminal',
  framework: 'layers',
  orchestration: 'waypoints',
  memory: 'database',
  scaling: 'activity',
  architecture: 'workflow',
  messaging: 'send',
  data: 'database',
  logic: 'zap',
  foundations: 'anchor',
  security: 'shield-check',
  deployment: 'cloud',
  ux: 'users',
  monitoring: 'activity',
  testing: 'flask-conical',
  linux: 'terminal',
  container: 'box',
  kubernetes: 'layers',
  automation: 'zap',
  performance: 'gauge'
};

function getHeuristicIcon(slug: string): string {
  // 1. Precise match
  if (DEFAULT_ICON_MAP[slug]) return DEFAULT_ICON_MAP[slug];
  
  // 2. Keyword check (e.g., 'async-messaging' contains 'messaging')
  const keywords = Object.keys(DEFAULT_ICON_MAP);
  for (const kw of keywords) {
    if (slug.includes(kw)) return DEFAULT_ICON_MAP[kw];
  }

  return 'code-2'; // Ultimate fallback
}

export interface MDXContent {
  source: string;
  frontmatter: {
    title: string;
    description?: string;
    [key: string]: any;
  };
}

export interface TrackMeta {
  id: string;
  title: string;
  icon: string;
  description: string;
}

export interface CategoryMeta {
  id: string;
  slug: string;
  title: string;
  icon: string;
  iconColor?: string;
}

export interface TopicMeta {
  id: string;
  title: string;
  level: number;
}

export interface CategoryData extends CategoryMeta {
  content: TopicMeta[];
}

export interface RoadmapData extends TrackMeta {
  categories: CategoryData[];
}

/**
 * Intelligent scraper for pure Markdown files.
 * Pulls Title from the first H1 and Description from the first non-header paragraph.
 */
function scrapeMdxContent(filePath: string, slug: string) {
  if (!fs.existsSync(filePath)) return null;
  const fileContent = fs.readFileSync(filePath, 'utf8');
  const { data, content } = matter(fileContent);

  // 1. Scrape Title (# Header)
  let title = data.title;
  if (!title) {
    const h1Match = content.match(/^#\s+(.*)$/m);
    title = h1Match ? h1Match[1].trim() : slug;
  }

  // 2. Scrape Description (First real paragraph)
  let description = data.description || '';
  if (!description) {
    // Find first paragraph that isn't a header, tag, or empty line
    const lines = content.split('\n');
    for (const line of lines) {
      const trimmed = line.trim();
      if (trimmed && !trimmed.startsWith('#') && !trimmed.startsWith('<') && !trimmed.startsWith('import')) {
        description = trimmed.length > 160 ? trimmed.substring(0, 157) + '...' : trimmed;
        break;
      }
    }
  }

  return {
    ...data,
    title,
    description,
    icon: data.icon || getHeuristicIcon(slug),
    iconColor: data.iconColor || null,
  };
}

export function getTrackMeta(trackId: string): TrackMeta | null {
  const indexPath = path.join(CONTENT_PATH, trackId, 'index.mdx');
  const meta = scrapeMdxContent(indexPath, trackId);
  if (!meta) return null;

  return {
    id: trackId,
    title: meta.title,
    icon: meta.icon,
    description: meta.description,
  };
}

export function getCategoryMeta(trackId: string, categorySlug: string): CategoryMeta | null {
  const filePath = path.join(CONTENT_PATH, trackId, `${categorySlug}.mdx`);
  const meta = scrapeMdxContent(filePath, categorySlug);
  if (!meta) return null;

  return {
    id: categorySlug,
    slug: categorySlug,
    title: meta.title,
    icon: meta.icon,
    iconColor: meta.iconColor || 'text-teal-600',
  };
}

function extractHeadings(content: string): TopicMeta[] {
  const headingRegex = /^(#{2,4})\s+(.*)$/gm;
  const topics: TopicMeta[] = [];
  const usedIds = new Map<string, number>();
  let match;

  while ((match = headingRegex.exec(content)) !== null) {
    const hashes = match[1];
    const title = match[2].trim();
    const level = hashes.length;

    let id = generateId(title);
    const count = usedIds.get(id) || 0;
    if (count > 0) {
      usedIds.set(id, count + 1);
      id = `${id}-${count}`;
    } else {
      usedIds.set(id, 1);
    }

    topics.push({ id, title, level });
  }

  return topics;
}

export async function getFullRoadmapsData(): Promise<Record<string, RoadmapData>> {
  const roadmaps: Record<string, RoadmapData> = {};
  if (!fs.existsSync(CONTENT_PATH)) return roadmaps;

  const tracks = fs.readdirSync(CONTENT_PATH).filter(f => 
    fs.lstatSync(path.join(CONTENT_PATH, f)).isDirectory()
  );

  for (const trackId of tracks) {
    const trackMeta = getTrackMeta(trackId);
    if (!trackMeta) continue;

    const categories: CategoryData[] = [];
    const trackDirPath = path.join(CONTENT_PATH, trackId);
    const trackItems = fs.readdirSync(trackDirPath);

    for (const item of trackItems) {
      if (item === 'index.mdx' || !item.endsWith('.mdx')) continue;
      
      const slug = item.replace('.mdx', '');
      const catMeta = getCategoryMeta(trackId, slug);
      if (!catMeta) continue;

      const filePath = path.join(trackDirPath, item);
      const fileContent = fs.readFileSync(filePath, 'utf8');
      const { content } = matter(fileContent);
      const topics = extractHeadings(content);

      categories.push({
        ...catMeta,
        content: topics
      });
    }

    roadmaps[trackId] = {
      ...trackMeta,
      categories
    };
  }

  return roadmaps;
}

export async function getUnifiedChapterContent(trackId: string, categorySlug: string): Promise<MDXContent | null> {
  try {
    const filePath = path.join(CONTENT_PATH, trackId, `${categorySlug}.mdx`);
    if (!fs.existsSync(filePath)) return null;

    const fileContent = fs.readFileSync(filePath, 'utf8');
    const { data, content } = matter(fileContent);
    const scraped = scrapeMdxContent(filePath, categorySlug);
    
    return {
      source: content,
      frontmatter: {
        ...data,
        title: scraped?.title || categorySlug,
        description: scraped?.description || '',
      },
    };
  } catch (error) {
    console.error(`Error loading unified MDX for ${trackId}/${categorySlug}:`, error);
    return null;
  }
}
