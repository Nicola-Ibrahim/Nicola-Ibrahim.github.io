import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';

const PROJECTS_PATH = path.join(process.cwd(), 'app/projects');

export interface ProjectMDXContent {
  source: string;
  frontmatter: {
    title: string;
    description: string;
    category?: string;
    tags?: string[];
    date?: string;
    [key: string]: any;
  };
}

/**
 * Fetches MDX content for a specific project.
 */
export async function getProjectContent(slug: string): Promise<ProjectMDXContent | null> {
  try {
    const filePath = path.join(PROJECTS_PATH, '_content', `${slug}.mdx`);
    
    if (!fs.existsSync(filePath)) {
      console.warn(`Project Case Study not found: ${filePath}`);
      return null;
    }

    const fileContent = fs.readFileSync(filePath, 'utf8');
    const { data, content } = matter(fileContent);
    
    return {
      source: content,
      frontmatter: data as ProjectMDXContent['frontmatter'],
    };
  } catch (error) {
    console.error(`Error loading project MDX for ${slug}:`, error);
    return null;
  }
}

/**
 * Get all project slugs for static params.
 */
export function getAllProjectSlugs(): string[] {
  const contentPath = path.join(PROJECTS_PATH, '_content');
  if (!fs.existsSync(contentPath)) return [];
  
  return fs.readdirSync(contentPath)
    .filter((f) => f.endsWith('.mdx'))
    .map((f) => f.replace('.mdx', ''));
}
