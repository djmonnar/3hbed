import catalog from './official-products.json';
import type { ImageAsset, Product } from './types';

const missingModelLabels = new Set(['-', '공식 페이지 참조']);

export const products: Product[] = catalog.products.map((item) => ({
  officialId: item.officialId,
  name: item.name,
  slug: item.slug,
  officialModel: missingModelLabels.has(item.officialModel) ? null : item.officialModel,
  productType: item.productType,
  officialCategory: item.officialCategory,
  categories: item.categories,
  summary: item.summary,
  mainImage: item.mainImage as ImageAsset,
  gallery: item.gallery as ImageAsset[],
  size: null,
  frameMaterial: null,
  colors: [],
  acupressureFeature: null,
  heatFeature: null,
  officialFeatures: [],
  officialUsePurpose: null,
  usage: null,
  cautions: null,
  medicalDeviceClass: null,
  itemCertificationNumber: null,
  certificationScope: null,
  officialPriceText: item.officialPriceText,
  officialPriceKrw: item.officialPriceKrw,
  priceCheckedAt: item.priceCheckedAt,
  pricePublished: item.officialPriceKrw !== null,
  rentalConsultationAvailable: item.rentalConsultationAvailable,
  centerAvailability: { namgang: 'unknown', gyeongsang: 'unknown' },
  officialProductUrl: item.officialProductUrl,
  officialVideoUrl: null,
  isPublished: item.isPublished,
}));

export const publishedProducts = products.filter((product) => product.isPublished);

const featuredIds = new Set([9, 10, 12, 35, 39, 60]);
export const featuredProducts = publishedProducts.filter((product) => featuredIds.has(product.officialId));

export const productCatalog = {
  source: catalog.source,
  checkedAt: catalog.checkedAt,
  total: catalog.catalogTotal,
} as const;

export const getProduct = (slug: string) => publishedProducts.find((product) => product.slug === slug);
