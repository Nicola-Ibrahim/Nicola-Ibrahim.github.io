import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';
import removeMarkdown from 'remove-markdown';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Constants
const CONTENT_PATH = path.join(process.cwd(), 'app/roadmap/_content');
const OUTPUT_PATH = path.join(process.cwd(), 'public/search-index.json');
const MAX_INDEX_SIZE = 512000; // 500KB

/**
 * Strips MDX character-for-character into clean prose for search ingestion.
 */
function stripMdx(mdx) {
  // 1. Remove Frontmatter
  let content = mdx.replace(/^---[\s\S]*?---/, '');
  
  // 2. Remove Imports & Exports
  content = content
    .replace(/^import\s+.*\s+from\s+['"].*['"];?/gm, '')
    .replace(/^export\s+const\s+.*\s+=\s+.*;?/gm, '')
    .replace(/^export\s+default\s+.*;?/gm, '');

  // 3. Remove JSX tags but keep inner content
  // Pass 1: Remove self-closing tags first
  content = content.replace(/\s*<[A-Z][a-zA-Z0-9]*[^>]*\/>/g, ' ');
  // Pass 2: Remove opening tags
  content = content.replace(/<[A-Z][a-zA-Z0-9]*[^>]*>/g, ' ');
  // Pass 3: Remove closing tags
  content = content.replace(/<\/[A-Z][a-zA-Z0-9]*>/g, ' ');
  
  // 4. Use remove-markdown for the markdown layer
  content = removeMarkdown(content);

  // 5. Final clean up (collapse whitespace and newlines)
  return content.replace(/\s+/g, ' ').replace(/\n/g, ' ').trim();
}

/**
 * Generates a flat search index by crawling the local MDX documentation tree.
 */
function generateSearchIndex() {
  const index = [];
  
  if (!fs.existsSync(CONTENT_PATH)) {
    console.warn('Search Indexer: CONTENT_PATH not found:', CONTENT_PATH);
    return index;
  }

  // Get all track directories
  const tracks = fs.readdirSync(CONTENT_PATH).filter(f => 
    fs.lstatSync(path.join(CONTENT_PATH, f)).isDirectory() && f !== '_components'
  );

  for (const trackId of tracks) {
    const trackDirPath = path.join(CONTENT_PATH, trackId);
    const trackItems = fs.readdirSync(trackDirPath);

    // CASE 0: Track Overview (index.mdx)
    const trackIndexFile = path.join(trackDirPath, 'index.mdx');
    if (fs.existsSync(trackIndexFile)) {
      const raw = fs.readFileSync(trackIndexFile, 'utf8');
      const { data, content } = matter(raw);
      const strippedContent = stripMdx(content);
      index.push({
        slug: `/roadmap/${trackId}`,
        title: `${data.title || trackId} (Overview)`,
        excerpt: data.description || (strippedContent.slice(0, 140) + (strippedContent.length > 140 ? '...' : '')),
        content: strippedContent,
        trackId: trackId
      });
    }

    for (const item of trackItems) {
      if (item === 'index.mdx' || item === '_components') continue;

      const itemPath = path.join(trackDirPath, item);
      const isDir = fs.lstatSync(itemPath).isDirectory();

      if (isDir) {
        // CASE 1: Fragmented Category (Folder with topic files)
        const topicFiles = fs.readdirSync(itemPath).filter(f => f.endsWith('.mdx') && f !== 'index.mdx');
        for (const topicFile of topicFiles) {
          const topicPath = path.join(itemPath, topicFile);
          const topicId = topicFile.replace('.mdx', '');
          const raw = fs.readFileSync(topicPath, 'utf8');
          const { data, content } = matter(raw);
          
          const strippedContent = stripMdx(content);
          index.push({
            slug: `/roadmap/${trackId}/${item}#${topicId}`,
            title: data.title || topicId,
            excerpt: data.shortDesc || data.description || (strippedContent.slice(0, 140) + (strippedContent.length > 140 ? '...' : '')),
            content: strippedContent,
            trackId: trackId
          });
        }
      } else if (item.endsWith('.mdx')) {
        // CASE 2: Unified Category (Single large MDX file)
        const categorySlug = item.replace('.mdx', '');
        const raw = fs.readFileSync(itemPath, 'utf8');
        const { data, content } = matter(raw);
        
        const strippedContent = stripMdx(content);
        index.push({
          slug: `/roadmap/${trackId}/${categorySlug}`,
          title: data.title || categorySlug,
          excerpt: data.shortDesc || data.description || (strippedContent.slice(0, 140) + (strippedContent.length > 140 ? '...' : '')),
          content: strippedContent,
          trackId: trackId
        });
      }
    }
  }

  return index;
}

/**
 * Main execution
 */
try {
  console.log('Generating roadmap search index...');
  const indexData = generateSearchIndex();
  const json = JSON.stringify(indexData, null, 2);
  const size = Buffer.byteLength(json);

  if (size > MAX_INDEX_SIZE) {
    console.warn(`WARNING: Search index size (${(size / 1024).toFixed(2)} KB) exceeds 500 KB limit.`);
  } else {
    console.log(`Index generated successfully (${(size / 1024).toFixed(2)} KB, ${indexData.length} items).`);
  }

  fs.writeFileSync(OUTPUT_PATH, json);
  console.log(`Index saved to ${OUTPUT_PATH}`);
} catch (error) {
  console.error('FAILED to generate search index:', error);
  process.exit(1);
}
