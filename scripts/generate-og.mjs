import sharp from 'sharp';

await Promise.all([
  sharp('public/images/og/3h-jinju-centers.svg')
    .jpeg({ quality: 88, mozjpeg: true })
    .toFile('public/images/og/3h-jinju-centers.jpg'),
  sharp('public/images/centers/namgang/namgang-brand-hero.png')
    .resize(1200, 630, { fit: 'cover', position: 'centre' })
    .jpeg({ quality: 90, mozjpeg: true })
    .toFile('public/images/og/kakao-3h-jinju.jpg'),
]);

console.log('Generated Open Graph images (1200x630)');
