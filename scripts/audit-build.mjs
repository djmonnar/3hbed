import { access, readFile, readdir } from 'node:fs/promises';
import path from 'node:path';

const dist = path.resolve('dist');
const base = '/3hbed/';
const failures = [];

const walk = async (directory) => {
  const entries = await readdir(directory, { withFileTypes: true });
  const files = [];
  for (const entry of entries) {
    const fullPath = path.join(directory, entry.name);
    if (entry.isDirectory()) files.push(...(await walk(fullPath)));
    else files.push(fullPath);
  }
  return files;
};

const exists = async (filePath) => {
  try {
    await access(filePath);
    return true;
  } catch {
    return false;
  }
};

const resolveBuiltPath = (urlPath) => {
  const clean = decodeURIComponent(urlPath.split(/[?#]/)[0]);
  if (!clean.startsWith(base)) return null;
  const relative = clean.slice(base.length);
  if (!relative) return path.join(dist, 'index.html');
  if (relative.endsWith('/')) return path.join(dist, relative, 'index.html');
  if (path.extname(relative)) return path.join(dist, relative);
  return path.join(dist, relative, 'index.html');
};

const files = await walk(dist);
const htmlFiles = files.filter((file) => file.endsWith('.html'));
const astroPages = htmlFiles.filter((file) => !file.endsWith('ad.html') && !file.endsWith('404.html'));

for (const file of astroPages) {
  const html = await readFile(file, 'utf8');
  const relative = path.relative(dist, file);
  const requiredPatterns = [
    ['title', /<title>[^<]+<\/title>/],
    ['meta description', /<meta name="description" content="[^"]+"/],
    ['canonical', /<link rel="canonical" href="https:\/\/djmonnar\.github\.io\/3hbed\//],
    ['Open Graph', /<meta property="og:title"/],
    ['Twitter Card', /<meta name="twitter:card"/],
    ['JSON-LD', /<script type="application\/ld\+json">/],
  ];

  for (const [label, pattern] of requiredPatterns) {
    if (!pattern.test(html)) failures.push(`${relative}: missing ${label}`);
  }

  if (/<(?:img|source)[^>]+(?:src|srcset)="https:\/\//i.test(html)) {
    failures.push(`${relative}: externally hotlinked image found`);
  }

  const urlAttributes = html.matchAll(/(?:href|src|srcset)="([^"]+)"/g);
  for (const match of urlAttributes) {
    const values = match[1].split(',').map((value) => value.trim().split(/\s+/)[0]);
    for (const value of values) {
      if (!value.startsWith(base)) continue;
      const target = resolveBuiltPath(value);
      if (target && !(await exists(target))) failures.push(`${relative}: broken local reference ${value}`);
    }
  }
}

const expected = [
  'index.html',
  'ad/index.html',
  'ad.html',
  'products/index.html',
  'products/noblesse-bed/index.html',
  'technology/index.html',
  'certifications/index.html',
  'centers/index.html',
  'centers/namgang/index.html',
  'centers/gyeongsang/index.html',
  'experience/index.html',
  'reviews/index.html',
  'faq/index.html',
  'sitemap-index.xml',
  'robots.txt',
  'manifest.webmanifest',
  '404.html',
];

for (const relative of expected) {
  if (!(await exists(path.join(dist, relative)))) failures.push(`missing expected build output: ${relative}`);
}

for (const name of ['noblesse-bed', 'noblesse-sofa', 'invest-1530']) {
  for (const extension of ['jpg', 'webp', 'avif']) {
    const relative = `images/products/${name}.${extension}`;
    if (!(await exists(path.join(dist, relative)))) failures.push(`missing optimized product image: ${relative}`);
  }
}

if (failures.length) {
  console.error(`Build audit failed with ${failures.length} issue(s):`);
  failures.forEach((failure) => console.error(`- ${failure}`));
  process.exit(1);
}

console.log(`Build audit passed: ${astroPages.length} rendered HTML pages, ${files.length} output files, no broken local asset or route references.`);
