import fs from 'node:fs';
import path from 'node:path';
import { spawn } from 'node:child_process';
import { writeSearchIndex } from './build-search-index.mjs';

const contentPath = path.join(process.cwd(), 'app/roadmap/_content');
const nextBin = path.join(process.cwd(), 'node_modules/next/dist/bin/next');
const next = spawn(process.execPath, [nextBin, 'dev', ...process.argv.slice(2)], { stdio: 'inherit' });
let refreshTimer;

const watcher = fs.watch(contentPath, { recursive: true }, (_event, filename) => {
  if (!filename?.endsWith('.mdx')) return;
  clearTimeout(refreshTimer);
  refreshTimer = setTimeout(() => {
    try {
      writeSearchIndex();
    } catch (error) {
      console.error('Could not update roadmap search index:', error);
    }
  }, 200);
});

function stop(signal) {
  watcher.close();
  clearTimeout(refreshTimer);
  next.kill(signal);
}

process.on('SIGINT', () => stop('SIGINT'));
process.on('SIGTERM', () => stop('SIGTERM'));
next.on('exit', code => {
  watcher.close();
  process.exit(code ?? 0);
});
