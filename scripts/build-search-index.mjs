import fs from 'node:fs';
import path from 'node:path';
import matter from 'gray-matter';
import removeMarkdown from 'remove-markdown';

const CONTENT_PATH = path.join(process.cwd(), 'app/roadmap/_content');
const OUTPUT_PATH = path.join(process.cwd(), 'public/search-index.json');
const MAX_INDEX_SIZE = 512000;

function stripMdx(source) {
  return removeMarkdown(source
    .replace(/^import\s+.*\s+from\s+['"].*['"];?/gm, '')
    .replace(/^export\s+(?:const|default)\s+.*$/gm, '')
    .replace(/\s*<[A-Z][a-zA-Z0-9]*[^>]*\/>/g, ' ')
    .replace(/<[A-Z][a-zA-Z0-9]*[^>]*>/g, ' ')
    .replace(/<\/[A-Z][a-zA-Z0-9]*>/g, ' '))
    .replace(/\s+/g, ' ')
    .trim();
}

// Keep this in step with generateId() in app/roadmap/_lib/mdx-utils.ts.
function headingId(title) {
  return title.toLowerCase()
    .replace(/^\d+\.\s*/, '')
    .replace(/[^\w\s-]/g, '')
    .replace(/\s+/g, '-')
    .trim();
}

function readMdx(filePath) {
  const { data, content } = matter(fs.readFileSync(filePath, 'utf8'));
  const heading = content.match(/^#\s+(.+)$/m)?.[1]?.trim();
  return {
    title: data.title || heading || path.basename(filePath, '.mdx'),
    description: data.description || '',
    content,
    order: data.order,
    chapters: data.chapters,
  };
}

function chapterSections(source, url, trackId, trackTitle, chapterTitle) {
  const headings = [...source.matchAll(/^(#{2,4})\s+(.+)$/gm)];
  const sections = [];
  const usedIds = new Map();

  for (let index = 0; index < headings.length; index++) {
    const heading = headings[index];
    const title = stripMdx(heading[2]);
    const baseId = headingId(title);
    const count = usedIds.get(baseId) || 0;
    usedIds.set(baseId, count + 1);
    const id = count ? `${baseId}-${count}` : baseId;
    const start = heading.index + heading[0].length;
    const end = headings[index + 1]?.index ?? source.length;
    const content = stripMdx(source.slice(start, end));
    sections.push({
      type: 'section',
      url: `${url}#${id}`,
      title,
      chapterTitle,
      trackTitle,
      trackId,
      content,
    });
  }

  return sections;
}

export function generateSearchIndex() {
  if (!fs.existsSync(CONTENT_PATH)) {
    throw new Error(`Search content directory not found: ${CONTENT_PATH}`);
  }

  const index = [];
  const tracks = fs.readdirSync(CONTENT_PATH)
    .filter(name => fs.lstatSync(path.join(CONTENT_PATH, name)).isDirectory())
    .sort((a, b) => readMdx(path.join(CONTENT_PATH, a, 'index.mdx')).order -
      readMdx(path.join(CONTENT_PATH, b, 'index.mdx')).order);

  for (const trackId of tracks) {
    const trackDir = path.join(CONTENT_PATH, trackId);
    const track = readMdx(path.join(trackDir, 'index.mdx'));
    if (!Array.isArray(track.chapters)) throw new Error(`Missing chapter list for ${trackId}`);

    index.push({
      type: 'track',
      url: `/roadmap/${trackId}`,
      title: track.title,
      trackTitle: track.title,
      trackId,
      content: track.description || stripMdx(track.content),
    });

    for (const chapterSlug of track.chapters) {
      const chapter = readMdx(path.join(trackDir, `${chapterSlug}.mdx`));
      const url = `/roadmap/${trackId}/${chapterSlug}`;
      const firstSection = chapter.content.search(/^#{2,4}\s+.+$/m);
      const introduction = stripMdx(firstSection < 0 ? chapter.content : chapter.content.slice(0, firstSection));

      index.push({
        type: 'chapter',
        url,
        title: chapter.title,
        chapterTitle: chapter.title,
        trackTitle: track.title,
        trackId,
        content: chapter.description || introduction,
      });
      index.push(...chapterSections(chapter.content, url, trackId, track.title, chapter.title));
    }
  }

  return index;
}

export function writeSearchIndex() {
  const index = generateSearchIndex();
  const json = JSON.stringify(index);
  const size = Buffer.byteLength(json);
  if (size > MAX_INDEX_SIZE) {
    console.warn(`Search index is ${(size / 1024).toFixed(1)} KB, over the 500 KB target.`);
  }
  const tempPath = `${OUTPUT_PATH}.tmp`;
  fs.writeFileSync(tempPath, json);
  fs.renameSync(tempPath, OUTPUT_PATH);
  console.log(`Search index: ${index.length} entries, ${(size / 1024).toFixed(1)} KB`);
}

if (process.argv[1] && path.resolve(process.argv[1]) === new URL(import.meta.url).pathname) {
  writeSearchIndex();
}
