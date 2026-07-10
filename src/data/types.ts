export type CenterId = 'namgang' | 'gyeongsang';

export type DisplayStatus = 'displayed' | 'availableByReservation' | 'notDisplayed' | 'unknown';

export interface ImageAsset {
  src: string;
  webp?: string;
  avif?: string;
  alt: string;
  width: number;
  height: number;
}

export interface PhotoRequirement {
  key: string;
  label: string;
  todo: string;
  image: ImageAsset | null;
}

export interface Center {
  id: CenterId;
  slug: string;
  name: string;
  shortName: string;
  address: string | null;
  phone: string | null;
  sms: string | null;
  openingHours: string | null;
  closedDays: string | null;
  parking: string | null;
  naverPlaceUrl: string;
  coordinates: { latitude: number; longitude: number } | null;
  heroImage: ImageAsset | null;
  gallery: PhotoRequirement[];
  experienceProducts: string[];
  freeExperience: boolean;
  isPublished: boolean;
}

export interface Product {
  name: string;
  slug: string;
  officialModel: string;
  productType: '지압침대' | '지압쇼파';
  categories: string[];
  summary: string;
  mainImage: ImageAsset;
  gallery: ImageAsset[];
  size: string | null;
  frameMaterial: string | null;
  colors: string[];
  acupressureFeature: string | null;
  heatFeature: string | null;
  officialFeatures: string[];
  officialUsePurpose: string | null;
  usage: string | null;
  cautions: string | null;
  medicalDeviceClass: string | null;
  itemCertificationNumber: string | null;
  certificationScope: string | null;
  pricePublished: boolean;
  rentalConsultationAvailable: boolean | null;
  centerAvailability: Record<CenterId, DisplayStatus>;
  officialProductUrl: string;
  officialVideoUrl: string | null;
  isPublished: boolean;
}

export interface Certification {
  id: string;
  title: string;
  category: '제조업 허가' | '제품 품목 인증' | '의료광고 심의' | '특허' | '국내 인증' | '해외 인증' | '수상' | '연구개발';
  number: string;
  issuer: string | null;
  issuedAt: string | null;
  appliesTo: string;
  applicableModels: string[];
  description: string;
  image: ImageAsset | null;
  imagePublic: boolean;
  personalDataMasked: boolean;
  officialSourceUrl: string | null;
  isPublished: boolean;
}

export interface Review {
  displayName: string;
  centerId: CenterId;
  createdAt: string;
  content: string;
  productModel: string | null;
  source: string;
  originalUrl: string;
  captureImage: ImageAsset | null;
  personalDataMasked: boolean;
  usageConsent: boolean;
  isPublished: boolean;
}

export interface Faq {
  question: string;
  answer: string;
  category: '체험' | '제품' | '구매·설치' | '인증·안전' | '센터';
  isPublished: boolean;
}
