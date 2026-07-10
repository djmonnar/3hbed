import type { ImageAsset } from './types';

export const heroMedia: Record<'showroom' | 'brand', ImageAsset> = {
  showroom: {
    src: '/images/centers/hero/jinju-showroom-beds.jpg',
    webp: '/images/centers/hero/jinju-showroom-beds.webp',
    avif: '/images/centers/hero/jinju-showroom-beds.avif',
    alt: '진주 3H 체험센터에 전시된 지압침대 세 대',
    width: 1280,
    height: 720,
  },
  brand: {
    src: '/images/centers/namgang/namgang-brand-hero.png',
    webp: '/images/centers/namgang/namgang-brand-hero.webp',
    avif: '/images/centers/namgang/namgang-brand-hero.avif',
    alt: '3H 지압침대 진주 남강센터 브랜드 이미지',
    width: 1280,
    height: 720,
  },
};

export const site = {
  name: '3H지압침대 진주경상·남강센터',
  shortName: '3H 진주센터',
  description:
    '진주에서 3H지압침대와 지압쇼파를 직접 비교하고 무료로 체험할 수 있는 진주경상센터·남강센터 통합 안내 홈페이지입니다.',
  representativePhone: '010-3552-0707',
  representativeSms: '010-3552-0707',
  defaultSmsBody: '3H지압침대 무료체험 상담 문의드립니다.',
  headquartersUrl: 'https://www.3hk.co.kr/',
  officialDealerNotice: '3H지압침대 진주경상센터·남강센터 통합 안내 홈페이지',
  medicalAdReviewNumber: null,
  naverSiteVerification: null,
  googleSiteVerification: null,
  manufacturer: {
    name: '주식회사 쓰리에이치',
    address: '대구광역시 동구 율암로 140-10',
    manufacturingLicenseNumber: '제228호',
  },
  channels: {
    brandFilm: 'https://www.youtube.com/watch?v=E1_MOJj9svo',
    technologyFilm: 'https://www.youtube.com/watch?v=uDev_9Bwb_Y',
  },
} as const;
