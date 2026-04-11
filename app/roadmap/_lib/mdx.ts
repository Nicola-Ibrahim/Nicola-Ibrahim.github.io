import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';
import { generateId } from './mdx-components';

const CONTENT_PATH = path.join(process.cwd(), 'app/roadmap/_content');

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
 * Reads metadata from the frontmatter of an index.mdx file.
 */
function readIndexMeta(filePath: string) {
  if (!fs.existsSync(filePath)) return null;
  const fileContent = fs.readFileSync(filePath, 'utf8');
  const { data } = matter(fileContent);
  return data;
}

export function getTrackMeta(trackId: string): TrackMeta | null {
  const indexPath = path.join(CONTENT_PATH, trackId, 'index.mdx');
  const data = readIndexMeta(indexPath);
  if (!data) return null;
  return {
    id: trackId,
    title: data.title || trackId,
    icon: data.icon || 'layout',
    description: data.description || '',
  };
}

export function getCategoryMeta(trackId: string, categorySlug: string): CategoryMeta | null {
  const filePath = path.join(CONTENT_PATH, trackId, `${categorySlug}.mdx`);
  if (fs.existsSync(filePath)) {
    const data = readIndexMeta(filePath);
    if (!data) return null;
    return {
      id: categorySlug,
      slug: categorySlug,
      title: data.title || categorySlug,
      icon: data.icon || 'code-2',
      iconColor: data.iconColor || 'text-teal-600',
    };
  }
  return null;
}

/**
 * Dynamically extract ## headers from MDX content to build the Table of Contents.
 */
function extractHeadings(content: string): TopicMeta[] {
  // Capture ##, ###, and #### headers
  const headingRegex = /^(#{2,4})\s+(.*)$/gm;
  const topics: TopicMeta[] = [];
  const usedIds = new Map<string, number>();
  let match;

  while ((match = headingRegex.exec(content)) !== null) {
    const hashes = match[1];
    const title = match[2].trim();
    const level = hashes.length;

    let id = generateId(title);
    
    // Deduplicate IDs
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

/**
 * Loads the complete data structure for all roadmaps.
 * Modern dynamic version: scans ## headers to build category contents.
 */
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
    
    // Scan for .mdx files (categories)
    const trackItems = fs.readdirSync(trackDirPath);
    for (const item of trackItems) {
      if (item === 'index.mdx' || !item.endsWith('.mdx')) continue;
      
      const slug = item.replace('.mdx', '');
      const catMeta = getCategoryMeta(trackId, slug);
      if (!catMeta) continue;

      // Dynamically extract topics from headers
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

/**
 * Loads content for a unified chapter.
 */
export async function getUnifiedChapterContent(trackId: string, categorySlug: string): Promise<MDXContent | null> {
  try {
    const filePath = path.join(CONTENT_PATH, trackId, `${categorySlug}.mdx`);
    if (!fs.existsSync(filePath)) return null;

    const fileContent = fs.readFileSync(filePath, 'utf8');
    const { data, content } = matter(fileContent);
    
    return {
      source: content,
      frontmatter: data as MDXContent['frontmatter'],
    };
  } catch (error) {
    console.error(`Error loading unified MDX for ${trackId}/${categorySlug}:`, error);
    return null;
  }
}
