export const trackingConfig = {
  ga4Id: import.meta.env.PUBLIC_GA4_ID || '',
  metaPixelId: import.meta.env.PUBLIC_META_PIXEL_ID || '',
  // 네이버 프리미엄로그 공통키(AccountId). 환경변수로 덮어쓸 수 있습니다.
  naverWcsId: import.meta.env.PUBLIC_NAVER_WCS_ID || 's_40bc8b8907c3',
} as const;

export const trackingEvents = [
  'phone_click',
  'sms_click',
  'place_click',
  'center_select',
  'reservation_click',
  'product_view',
  'product_center_click',
  'certificate_view',
  'video_play',
  'faq_open',
  'scroll_25',
  'scroll_50',
  'scroll_75',
  'scroll_90',
] as const;

export type TrackingEvent = (typeof trackingEvents)[number];

/**
 * 네이버 광고 웹 전환 추적(신 스크립트 wcs.trans 버전) 규격
 * https://naver.github.io/conversion-tracking/pages/01_script_guide_wcstrans/
 */
export interface NaverConversionItem {
  id: string;
  name: string;
  category?: string;
  quantity?: number;
  payAmount?: number;
  option?: string;
}

export interface NaverConversion {
  type: string;
  id?: string;
  value?: string;
  currency?: string;
  items?: NaverConversionItem[];
}

/** 상품명 등에 따옴표가 들어가면 스크립트가 깨지므로 제거합니다. */
export const sanitizeConversionText = (value: string) => value.replace(/["']/g, ' ').replace(/\s+/g, ' ').trim();

/**
 * 클릭형 전환 매핑.
 * 이 사이트는 온라인 결제·회원가입·예약폼이 없고 전화/문자 상담이 유일한 신청 경로라
 * 전화·문자 클릭을 신청완료(lead)로, 네이버 길찾기 클릭을 사용자정의1(custom001)로 잡습니다.
 */
export const naverClickConversions: Record<string, { type: string; id: string }> = {
  phone_click: { type: 'lead', id: 'phone_consult' },
  sms_click: { type: 'lead', id: 'sms_consult' },
  place_click: { type: 'custom001', id: 'naver_place_route' },
};

/** 검수/제출용 전환 정의표 (문서화 목적) */
export const naverConversionPlan = [
  { label: '상품상세보기', type: 'view_product', path: '제품 라인업 > 개별 제품 상세페이지 진입' },
  { label: '신청완료', type: 'lead', path: '상단 헤더·본문 CTA·하단 고정바 > 전화상담 / 문자상담 버튼 클릭' },
  { label: '콘텐츠보기', type: 'view_content', path: '무료체험 안내, 진주센터 안내(오시는길), 센터 상세 페이지 진입' },
  { label: '사용자정의1', type: 'custom001', path: '센터 카드·하단 CTA > 네이버 길찾기(네이버플레이스) 버튼 클릭' },
] as const;
