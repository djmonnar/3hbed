import type { Review } from './types';

export const reviews: Review[] = [];

export const publishedReviews = reviews.filter(
  (review) => review.isPublished && review.usageConsent && review.originalUrl,
);

export const visitorProfiles = [
  '부모님 효도선물을 알아보는 고객',
  '기존 침대 교체를 고민하는 고객',
  '지압침대와 지압쇼파를 비교하는 고객',
  '집 안 설치 공간 상담이 필요한 고객',
  '온라인만으로 제품 선택이 어려운 고객',
  '실제 사용할 가족과 함께 체험하려는 고객',
];
