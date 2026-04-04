import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';
import { serialize } from 'next-mdx-remote/serialize';

const CONTENT_PATH = path.join(process.cwd(), 'app/roadmap/_content');

export interface MDXContent {
  source: any;
  frontmatter: {
    title: string;
    shortDesc?: string;
    prompt?: string;
    links?: { label: string; url: string }[];
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

export interface ContentLink {
  label: string;
  url: string;
}

export interface TopicMeta {
  id: string;
  title: string;
  shortDesc: string;
  prompt?: string;
  links?: ContentLink[];
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
  const indexPath = path.join(CONTENT_PATH, trackId, categorySlug, 'index.mdx');
  const data = readIndexMeta(indexPath);
  if (!data) return null;
  return {
    id: categorySlug, // Using slug as internal ID for simplicity
    slug: categorySlug,
    title: data.title || categorySlug,
    icon: data.icon || 'code-2',
    iconColor: data.iconColor || 'text-teal-600',
  };
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
    const catDirs = fs.readdirSync(trackDirPath).filter(f => 
      fs.lstatSync(path.join(trackDirPath, f)).isDirectory()
    );

    for (const catSlug of catDirs) {
      const catMeta = getCategoryMeta(trackId, catSlug);
      if (!catMeta) continue;

      const catDirPath = path.join(trackDirPath, catSlug);
      const topics = fs.readdirSync(catDirPath)
        .filter(f => f.endsWith('.mdx') && f !== 'index.mdx') // Exclude index.mdx
        .map(f => {
          const topicId = f.replace('.mdx', '');
          const fileContent = fs.readFileSync(path.join(catDirPath, f), 'utf8');
          const { data } = matter(fileContent);
          return {
            id: topicId,
            title: data.title || topicId,
            shortDesc: data.shortDesc || '',
            prompt: data.prompt,
            links: data.links,
          };
        });

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

export async function getTopicContent(trackId: string, categorySlug: string, topicId: string): Promise<MDXContent | null> {
  try {
    const filePath = path.join(CONTENT_PATH, trackId, categorySlug, `${topicId}.mdx`);
    
    if (!fs.existsSync(filePath)) {
      return null;
    }

    const fileContent = fs.readFileSync(filePath, 'utf8');
    const { data, content } = matter(fileContent);
    
    const mdxSource = await serialize(content, {
      scope: data,
    });

    return {
      source: mdxSource,
      frontmatter: data as MDXContent['frontmatter'],
    };
  } catch (error) {
    console.error(`Error loading MDX for ${trackId}/${categorySlug}/${topicId}:`, error);
    return null;
  }
}

export async function getAllCategoryContent(trackId: string, categorySlug: string, topicIds: string[]): Promise<Record<string, MDXContent>> {
  const contents: Record<string, MDXContent> = {};
  
  for (const id of topicIds) {
    const content = await getTopicContent(trackId, categorySlug, id);
    if (content) {
      contents[id] = content;
    }
  }
  
  return contents;
}
