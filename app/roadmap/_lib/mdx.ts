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
  isUnified?: boolean; // New flag for single-file chapters
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
  // Check for directory structure first: track/category/index.mdx
  const dirIndexPath = path.join(CONTENT_PATH, trackId, categorySlug, 'index.mdx');
  if (fs.existsSync(dirIndexPath)) {
    const data = readIndexMeta(dirIndexPath);
    if (!data) return null;
    return {
      id: categorySlug,
      slug: categorySlug,
      title: data.title || categorySlug,
      icon: data.icon || 'code-2',
      iconColor: data.iconColor || 'text-teal-600',
      isUnified: false
    };
  }

  // Check for unified file structure: track/category.mdx
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
      isUnified: true
    };
  }

  return null;
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
    
    // Find all potential chapters (directories or MDX files)
    const trackItems = fs.readdirSync(trackDirPath);
    
    // Use a Set to track processed slugs to avoid duplicates if both dir and file exist
    const processedSlugs = new Set<string>();

    for (const item of trackItems) {
      if (item === 'index.mdx') continue;
      
      const itemPath = path.join(trackDirPath, item);
      const isDir = fs.lstatSync(itemPath).isDirectory();
      const isMdx = item.endsWith('.mdx');
      
      if (!isDir && !isMdx) continue;

      const slug = isDir ? item : item.replace('.mdx', '');
      if (processedSlugs.has(slug)) continue;
      
      const catMeta = getCategoryMeta(trackId, slug);
      if (!catMeta) continue;

      processedSlugs.add(slug);

      if (catMeta.isUnified) {
        // Load topics from frontmatter topics array
        const fileContent = fs.readFileSync(path.join(trackDirPath, `${slug}.mdx`), 'utf8');
        const { data } = matter(fileContent);
        const topics = (data.topics || []).map((t: any) => ({
          id: t.id || 'unknown',
          title: t.title || t.id || 'Untitled',
          shortDesc: t.shortDesc || '',
          prompt: t.prompt,
          links: t.links,
        }));

        categories.push({
          ...catMeta,
          content: topics
        });
      } else {
        // Load topics from individual files in the directory
        const catDirPath = path.join(trackDirPath, slug);
        const topics = fs.readdirSync(catDirPath)
          .filter(f => f.endsWith('.mdx') && f !== 'index.mdx')
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
    
    if (!fs.existsSync(filePath)) {
      return null;
    }

    const fileContent = fs.readFileSync(filePath, 'utf8');
    const { data, content } = matter(fileContent);
    
    // For RSC, we just return the raw string. serialize is for the client-side MDXRemote.
    return {
      source: content,
      frontmatter: data as MDXContent['frontmatter'],
    };
  } catch (error) {
    console.error(`Error loading unified MDX for ${trackId}/${categorySlug}:`, error);
    return null;
  }
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
