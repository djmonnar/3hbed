/// <reference types="astro/client" />

interface ImportMetaEnv {
  readonly PUBLIC_SITE_URL?: string;
  readonly PUBLIC_GA4_ID?: string;
  readonly PUBLIC_META_PIXEL_ID?: string;
  readonly PUBLIC_NAVER_WCS_ID?: string;
  readonly PUBLIC_NAVER_CONVERSION_ID?: string;
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}

interface Window {
  dataLayer: unknown[];
  gtag?: (...args: unknown[]) => void;
  fbq?: (...args: unknown[]) => void;
  _fbq?: (...args: unknown[]) => void;
  wcs?: {
    inflow?: (domain: string) => void;
    trans?: (payload: Record<string, unknown>) => void;
  };
  wcs_add?: Record<string, string>;
  wcs_do?: () => void;
  threeHTrack?: (eventName: string, detail?: Record<string, unknown>) => void;
  requestIdleCallback?: (callback: () => void, options?: { timeout: number }) => number;
}
