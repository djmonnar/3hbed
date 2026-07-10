const normalizePath = (path: string) => path.replace(/^\/+/, '');

export const withBase = (path = '/') => {
  const base = import.meta.env.BASE_URL.endsWith('/')
    ? import.meta.env.BASE_URL
    : `${import.meta.env.BASE_URL}/`;
  const normalized = normalizePath(path);
  return normalized ? `${base}${normalized}` : base;
};

export const absoluteUrl = (path = '/') => {
  const origin = import.meta.env.PUBLIC_SITE_URL || 'https://djmonnar.github.io';
  return new URL(withBase(path), origin).toString();
};

export const phoneHref = (phone: string) => `tel:${phone.replace(/[^0-9+]/g, '')}`;

export const smsHref = (phone: string, body: string) =>
  `sms:${phone.replace(/[^0-9+]/g, '')}?body=${encodeURIComponent(body)}`;
