import sharp from 'sharp';

await sharp('public/images/og/3h-jinju-centers.svg')
  .jpeg({ quality: 88, mozjpeg: true })
  .toFile('public/images/og/3h-jinju-centers.jpg');

console.log('Generated public/images/og/3h-jinju-centers.jpg (1200x630)');
