import type { Center, PhotoRequirement } from './types';

const photoRequirements = (centerName: string): PhotoRequirement[] => [
  { key: 'exterior', label: '센터 외관', todo: `TODO: ${centerName} 외관 사진 필요`, image: null },
  { key: 'entrance', label: '건물 입구', todo: `TODO: ${centerName} 건물 입구 사진 필요`, image: null },
  { key: 'access', label: '이동 경로', todo: `TODO: ${centerName} 엘리베이터 또는 계단 사진 필요`, image: null },
  { key: 'interior', label: '센터 내부 전경', todo: `TODO: ${centerName} 내부 전경 사진 필요`, image: null },
  { key: 'beds', label: '지압침대 전시', todo: `TODO: ${centerName} 지압침대 전시 사진 필요`, image: null },
  { key: 'sofas', label: '지압쇼파 전시', todo: `TODO: ${centerName} 지압쇼파 전시 사진 필요`, image: null },
  { key: 'experience', label: '고객 체험', todo: `TODO: ${centerName} 고객 체험 사진 및 사용 동의 필요`, image: null },
  { key: 'consultation', label: '상담 공간', todo: `TODO: ${centerName} 상담 공간 사진 필요`, image: null },
  { key: 'controls', label: '제품 조작', todo: `TODO: ${centerName} 제품 조작 안내 사진 필요`, image: null },
  { key: 'parking', label: '주차 위치', todo: `TODO: ${centerName} 주차 위치 사진 필요`, image: null },
];

export const centers: Center[] = [
  {
    id: 'namgang',
    slug: 'namgang',
    name: '3H지압침대 진주 남강센터',
    shortName: '남강센터',
    address: '경상남도 진주시 동진로 125 201호',
    phone: '010-3552-0707',
    sms: '010-3552-0707',
    openingHours: null,
    closedDays: null,
    parking: null,
    naverPlaceUrl:
      'https://m.place.naver.com/place/2091436964/home?entry=pll&bk_query=3h%EC%A7%80%EC%95%95%EC%B9%A8%EB%8C%80%20%EC%A7%84%EC%A3%BC',
    coordinates: null,
    heroImage: null,
    gallery: photoRequirements('남강센터'),
    experienceProducts: [],
    freeExperience: true,
    isPublished: true,
  },
  {
    id: 'gyeongsang',
    slug: 'gyeongsang',
    name: '3H지압침대 진주경상센터',
    shortName: '진주경상센터',
    address: null,
    phone: null,
    sms: null,
    openingHours: null,
    closedDays: null,
    parking: null,
    naverPlaceUrl:
      'https://m.place.naver.com/place/1201130040/home?entry=pll&bk_query=3h%EC%A7%80%EC%95%95%EC%B9%A8%EB%8C%80%20%EC%A7%84%EC%A3%BC',
    coordinates: null,
    heroImage: null,
    gallery: photoRequirements('진주경상센터'),
    experienceProducts: [],
    freeExperience: true,
    isPublished: true,
  },
];

export const getCenter = (id: Center['id']) => centers.find((center) => center.id === id);
