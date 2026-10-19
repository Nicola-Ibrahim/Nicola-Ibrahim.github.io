import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';
import removeMarkdown from 'remove-markdown';
// Constants
const CONTENT_PATH = path.join(process.cwd(), 'app/roadmap/_content');
const OUTPUT_PATH = path.join(process.cwd(), 'public/search-index.json');
const MAX_INDEX_SIZE = 512000; // 500KB

/**
 * Strips MDX character-for-character into clean prose for search ingestion.
 */
function stripMdx(mdx) {
  let content = mdx;
  
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

function readMdx(filePath) {
  const { data, content } = matter(fs.readFileSync(filePath, 'utf8'));
  const heading = content.match(/^#\s+(.+)$/m)?.[1]?.trim();
  return {
    title: data.title || heading || path.basename(filePath, '.mdx'),
    description: data.description || '',
    content: stripMdx(content),
    summary: stripMdx(content.replace(/^#{1,6}\s+.+$/gm, '')),
    order: data.order,
    chapters: data.chapters,
  };
}

/**
 * Generates a flat search index by crawling the local MDX documentation tree.
 */
function generateSearchIndex() {
  const index = [];
  
  if (!fs.existsSync(CONTENT_PATH)) {
    throw new Error(`Search content directory not found: ${CONTENT_PATH}`);
  }

  const tracks = fs.readdirSync(CONTENT_PATH).filter(f =>
    fs.lstatSync(path.join(CONTENT_PATH, f)).isDirectory()
  ).sort((a, b) => readMdx(path.join(CONTENT_PATH, a, 'index.mdx')).order -
    readMdx(path.join(CONTENT_PATH, b, 'index.mdx')).order);

  for (const trackId of tracks) {
    const trackDirPath = path.join(CONTENT_PATH, trackId);
    const track = readMdx(path.join(trackDirPath, 'index.mdx'));
    if (!Array.isArray(track.chapters)) throw new Error(`Missing chapter list for ${trackId}`);

    index.push({
      slug: `/roadmap/${trackId}`,
      title: track.title,
      excerpt: track.description,
      content: track.content,
      trackId,
    });

    for (const categorySlug of track.chapters) {
      const chapter = readMdx(path.join(trackDirPath, `${categorySlug}.mdx`));
      index.push({
        slug: `/roadmap/${trackId}/${categorySlug}`,
        title: chapter.title,
        excerpt: chapter.description || chapter.summary.slice(0, 140),
        content: chapter.content,
        trackId,
      });
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
