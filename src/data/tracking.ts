export const trackingConfig = {
  ga4Id: import.meta.env.PUBLIC_GA4_ID || '',
  metaPixelId: import.meta.env.PUBLIC_META_PIXEL_ID || '',
  naverWcsId: import.meta.env.PUBLIC_NAVER_WCS_ID || '',
  naverConversionId: import.meta.env.PUBLIC_NAVER_CONVERSION_ID || '',
  naverInflowDomain: 'djmonnar.github.io',
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
