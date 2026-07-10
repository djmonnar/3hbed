import { access, mkdir, writeFile } from 'node:fs/promises';
import path from 'node:path';
import sharp from 'sharp';

const origin = 'https://www.3hk.co.kr';
const checkedAt = new Date().toISOString().slice(0, 10);
const outputRoot = 'public/images/products/official';
const dataFile = 'src/data/official-products.json';
const legacySlugs = new Map([
  [9, 'noblesse-bed'],
  [10, 'noblesse-sofa'],
  [12, 'invest-1530'],
]);

const fetchOptions = {
  headers: {
    'user-agent': '3H-Jinju-Center-Catalog-Sync/1.0',
  },
};

const decodeHtml = (value = '') => value
  .replace(/<br\s*\/?\s*>/gi, ' ')
  .replace(/<[^>]+>/g, ' ')
  .replace(/&nbsp;|&#160;/gi, ' ')
  .replace(/&amp;/gi, '&')
  .replace(/&quot;/gi, '"')
  .replace(/&#39;|&apos;/gi, "'")
  .replace(/&lt;/gi, '<')
  .replace(/&gt;/gi, '>')
  .replace(/&#(\d+);/g, (_, code) => String.fromCodePoint(Number(code)))
  .replace(/\s+/g, ' ')
  .trim();

const absoluteUrl = (value) => new URL(value, origin).toString();

const fetchText = async (url) => {
  const response = await fetch(url, fetchOptions);
  if (!response.ok) throw new Error(`${response.status} ${response.statusText}: ${url}`);
  return response.text();
};

const fetchBuffer = async (url) => {
  const response = await fetch(url, fetchOptions);
  if (!response.ok) throw new Error(`${response.status} ${response.statusText}: ${url}`);
  return Buffer.from(await response.arrayBuffer());
};

const uniqueBy = (items, key) => {
  const seen = new Set();
  return items.filter((item) => {
    const value = item[key];
    if (!value || seen.has(value)) return false;
    seen.add(value);
    return true;
  });
};

const imageTags = (html, pathFragment) => uniqueBy(
  [...html.matchAll(/<img\b[^>]*>/gi)]
    .map(([tag]) => {
      const src = tag.match(/\bsrc=["']([^"']+)["']/i)?.[1];
      if (!src || !src.includes(pathFragment)) return null;
      const title = tag.match(/\btitle=["']([^"']*)["']/i)?.[1];
      const alt = tag.match(/\balt=["']([^"']*)["']/i)?.[1];
      return { sourceUrl: absoluteUrl(src), sourceLabel: decodeHtml(title || alt || '') };
    })
    .filter(Boolean),
  'sourceUrl',
);

const extractCards = (html) => {
  const starts = [...html.matchAll(/<div class="cbox">/g)].map((match) => match.index);
  return starts.map((start, index) => html.slice(start, starts[index + 1] ?? html.length)).map((segment) => {
    const id = Number(segment.match(/product_01_V\.php\?idx=(\d+)/)?.[1]);
    if (!id) return null;
    const name = decodeHtml(segment.match(/<div class="title Prtd5">([\s\S]*?)<\/div>/)?.[1]);
    const thumbnailPath = segment.match(/<img\s+src="([^"]+)"[^>]*class="cent"/i)?.[1];
    const priceText = decodeHtml(segment.match(/<div class="con lp0">([\s\S]*?)<\/div>/)?.[1]);
    const keywords = [...segment.matchAll(/<span class="k_[^"]+">([\s\S]*?)<\/span>/gi)]
      .map((match) => decodeHtml(match[1]))
      .filter(Boolean);
    const rentalAvailable = /<div class="label">\s*렌탈\s*<br\s*\/?\s*>\s*가능\s*<\/div>/i.test(segment);
    return {
      id,
      name,
      thumbnailUrl: thumbnailPath ? absoluteUrl(thumbnailPath) : null,
      priceText: priceText || null,
      priceKrw: priceText ? Number(priceText.replace(/\D/g, '')) || null : null,
      keywords: [...new Set(keywords)],
      rentalAvailable,
    };
  }).filter(Boolean);
};

const makeSlug = (product) => {
  if (legacySlugs.has(product.id)) return legacySlugs.get(product.id);
  const modelSlug = product.officialModel
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-|-$/g, '');
  return modelSlug || `official-product-${product.id}`;
};

const productKind = (name, category) => {
  if (name.includes('지압쇼파')) return '지압쇼파';
  if (name.includes('지압침대')) return '지압침대';
  return category;
};

const processImage = async ({ image, destination, publicPath, alt, avif = false, maxWidth = 1600 }) => {
  const webpFile = `${destination}.webp`;
  const avifFile = `${destination}.avif`;
  try {
    await access(webpFile);
    if (avif) await access(avifFile);
    const outputMetadata = await sharp(webpFile).metadata();
    return {
      src: `${publicPath}.webp`,
      webp: `${publicPath}.webp`,
      ...(avif ? { avif: `${publicPath}.avif` } : {}),
      alt,
      width: outputMetadata.width,
      height: outputMetadata.height,
      sourceUrl: image.sourceUrl,
    };
  } catch {
  }

  const buffer = await fetchBuffer(image.sourceUrl);
  const input = sharp(buffer, { limitInputPixels: false }).rotate();
  const metadata = await input.metadata();
  const width = Math.min(metadata.width ?? maxWidth, maxWidth);
  const pipeline = input.resize({ width, height: 16000, fit: 'inside', withoutEnlargement: true });
  await mkdir(path.dirname(destination), { recursive: true });
  await pipeline.clone().webp({ quality: 82, effort: 5 }).toFile(webpFile);
  if (avif) await pipeline.clone().avif({ quality: 56, effort: 5 }).toFile(avifFile);
  const outputMetadata = await sharp(webpFile).metadata();
  return {
    src: `${publicPath}.webp`,
    webp: `${publicPath}.webp`,
    ...(avif ? { avif: `${publicPath}.avif` } : {}),
    alt,
    width: outputMetadata.width,
    height: outputMetadata.height,
    sourceUrl: image.sourceUrl,
  };
};

const listUrls = [1, 2, 3, 4].map((page) => page === 1
  ? `${origin}/sub/02_product/product_01.php`
  : `${origin}/sub/02_product/product_01.php?page=${page}&listCnt=12&orderBy=sort`);

const listPages = await Promise.all(listUrls.map(fetchText));
const cards = uniqueBy(listPages.flatMap(extractCards), 'id');
if (cards.length !== 45) throw new Error(`Expected 45 official products, found ${cards.length}`);

const products = [];
for (const [productIndex, card] of cards.entries()) {
  const officialProductUrl = `${origin}/sub/02_product/product_01_V.php?idx=${card.id}`;
  const html = await fetchText(officialProductUrl);
  const pageName = decodeHtml(html.match(/<div class="title Prtd5">([\s\S]*?)<\/div>/)?.[1]) || card.name;
  const officialModel = decodeHtml(html.match(/상품코드<\/span>\s*<span class="ss Prtd4 lp0">([\s\S]*?)<\/span>/i)?.[1]);
  const officialCategory = decodeHtml(html.match(/카테고리<\/span>[\s\S]*?<li class="Prtd4">([\s\S]*?)<\/li>/i)?.[1]) || '전체상품';
  const pagePriceText = decodeHtml(html.match(/<span class="price02">([\s\S]*?)<\/span>/)?.[1]) || card.priceText;
  const productImages = imageTags(html, '/upload/product/');
  const detailImages = imageTags(html, '/upload/se2/');
  const coverSource = productImages[0] ?? (card.thumbnailUrl ? { sourceUrl: card.thumbnailUrl, sourceLabel: pageName } : null);
  if (!coverSource) throw new Error(`No official image found for ${card.id} ${pageName}`);

  const slug = makeSlug({ ...card, officialModel });
  const productDirectory = path.join(outputRoot, String(card.id));
  const publicDirectory = `/images/products/official/${card.id}`;
  const cover = await processImage({
    image: coverSource,
    destination: path.join(productDirectory, 'cover'),
    publicPath: `${publicDirectory}/cover`,
    alt: `${pageName} 공식 제품 이미지`,
    avif: true,
    maxWidth: 1200,
  });

  const gallery = [];
  const gallerySources = uniqueBy([...productImages.slice(1), ...detailImages], 'sourceUrl');
  for (const [imageIndex, image] of gallerySources.entries()) {
    try {
      const asset = await processImage({
        image,
        destination: path.join(productDirectory, `detail-${String(imageIndex + 1).padStart(2, '0')}`),
        publicPath: `${publicDirectory}/detail-${String(imageIndex + 1).padStart(2, '0')}`,
        alt: `${pageName} 공식 상세정보 ${imageIndex + 1}`,
      });
      gallery.push(asset);
    } catch (error) {
      console.warn(`Skipped image ${image.sourceUrl}: ${error.message}`);
    }
  }

  const priceText = pagePriceText || null;
  const kind = productKind(pageName, officialCategory);
  const categories = [...new Set([kind, officialCategory, ...card.keywords, ...(card.rentalAvailable ? ['렌탈 가능'] : [])])];
  products.push({
    officialId: card.id,
    name: pageName,
    slug,
    officialModel: officialModel || '공식 페이지 참조',
    productType: kind,
    officialCategory,
    categories,
    summary: `${pageName}은 3H 공식 제품 카탈로그에 등록된 ${officialCategory} 제품입니다.`,
    mainImage: cover,
    gallery,
    officialPriceText: priceText,
    officialPriceKrw: priceText ? Number(priceText.replace(/\D/g, '')) || null : null,
    priceCheckedAt: checkedAt,
    rentalConsultationAvailable: card.rentalAvailable,
    officialProductUrl,
    isPublished: true,
  });
  console.log(`[${productIndex + 1}/${cards.length}] ${pageName}: ${gallery.length + 1} images`);
}

await writeFile(dataFile, `${JSON.stringify({
  source: `${origin}/sub/02_product/product_01.php`,
  checkedAt,
  catalogTotal: products.length,
  products,
}, null, 2)}\n`, 'utf8');

console.log(`Saved ${products.length} products to ${dataFile}`);
