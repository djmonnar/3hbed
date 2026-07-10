import { readdir } from 'node:fs/promises';
import path from 'node:path';
import sharp from 'sharp';

const roots = [
  'public/images/products',
  'public/images/brand',
  'public/images/video',
  'public/images/centers',
];

const sourcePattern = /\.(jpe?g|png)$/i;

const sourceFiles = async (root) => {
  const entries = await readdir(root, { withFileTypes: true });
  const files = await Promise.all(entries.map(async (entry) => {
    const source = path.join(root, entry.name);
    if (entry.isDirectory()) return sourceFiles(source);
    if (!entry.isFile() || !sourcePattern.test(entry.name) || entry.name.includes('.original.')) return [];
    return [source];
  }));

  return files.flat();
};

for (const root of roots) {
  for (const source of await sourceFiles(root)) {
    const base = source.replace(sourcePattern, '');
    const image = sharp(source).rotate();
    const metadata = await image.metadata();

    await image.clone().webp({ quality: 84, effort: 5 }).toFile(`${base}.webp`);
    await image.clone().avif({ quality: 57, effort: 5 }).toFile(`${base}.avif`);

    console.log(`${source}: ${metadata.width}x${metadata.height}`);
  }
}
