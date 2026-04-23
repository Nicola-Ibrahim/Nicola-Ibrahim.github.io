import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';

const CONTENT_DIR = 'app/roadmap/_content';

async function repairFiles() {
  const tracks = fs.readdirSync(CONTENT_DIR).filter(f => 
    fs.lstatSync(path.join(CONTENT_DIR, f)).isDirectory()
  );

  let fixedCount = 0;
  let errorCount = 0;

  for (const track of tracks) {
    const trackPath = path.join(CONTENT_DIR, track);
    const files = fs.readdirSync(trackPath).filter(f => f.endsWith('.mdx'));

    for (const file of files) {
      const filePath = path.join(trackPath, file);
      let content = fs.readFileSync(filePath, 'utf8');

      // 1. Delimiter Repair
      // If file doesn't start with ---, try to find where it should be
      if (!content.startsWith('---\n')) {
        console.log(`[REPAIR] Fixing missing start delimiter in ${filePath}`);
        // If it starts with a key like 'title:', prepend ---
        if (content.match(/^[a-zA-Z]+:/)) {
          content = '---\n' + content;
        }
      }

      // 2. Metadata Purge
      try {
        const parsed = matter(content);
        const data = parsed.data;

        // Remove redundant keys
        const keysToRemove = ['topics', 'isUnified', 'iconColor'];
        let changed = false;
        keysToRemove.forEach(key => {
          if (key in data) {
            delete data[key];
            changed = true;
          }
        });

        if (changed || !content.startsWith('---\n')) {
          const newContent = matter.stringify(parsed.content, data);
          fs.writeFileSync(filePath, newContent);
          console.log(`[FIXED] ${filePath}`);
          fixedCount++;
        }
      } catch (e) {
        console.error(`[ERROR] Failed to parse ${filePath}:`, e.message);
        
        // Manual "Emergency" repair if matter fails
        // This handles cases where delimiters are completely mangled
        if (content.includes('---')) {
            const parts = content.split('---');
            // If we have at least 3 parts (text before first --- might be empty)
            if (parts.length >= 3) {
                 console.log(`[EMERGENCY] Attempting manual split repair for ${filePath}`);
                 const metadataRaw = parts[1];
                 const body = parts.slice(2).join('---');
                 
                 // Try to parse just the metadata
                 try {
                    const data = matter(`---\n${metadataRaw}\n---`).data;
                    delete data.topics;
                    delete data.isUnified;
                    const cleanContent = matter.stringify(body, data);
                    fs.writeFileSync(filePath, cleanContent);
                    fixedCount++;
                 } catch {
                    console.error(`[CRITICAL] Manual repair failed for ${filePath}`);
                    errorCount++;
                 }
            }
        } else {
            errorCount++;
        }
      }
    }
  }

  console.log(`\nRepair complete! Fixed: ${fixedCount}, Errors: ${errorCount}`);
}

repairFiles();
