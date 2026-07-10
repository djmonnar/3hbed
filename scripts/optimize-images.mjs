import { readdir } from 'node:fs/promises';
import path from 'node:path';
import sharp from 'sharp';

const roots = [
  'public/images/products',
  'public/images/brand',
  'public/images/video',
];

const sourcePattern = /\.(jpe?g|png)$/i;

for (const root of roots) {
  const entries = await readdir(root, { withFileTypes: true });

  for (const entry of entries) {
    if (!entry.isFile() || !sourcePattern.test(entry.name)) continue;
    if (entry.name.includes('.original.')) continue;

    const source = path.join(root, entry.name);
    const base = source.replace(sourcePattern, '');
    const image = sharp(source).rotate();
    const metadata = await image.metadata();

    await image.clone().webp({ quality: 84, effort: 5 }).toFile(`${base}.webp`);
    await image.clone().avif({ quality: 57, effort: 5 }).toFile(`${base}.avif`);

    console.log(`${source}: ${metadata.width}x${metadata.height}`);
  }
}
