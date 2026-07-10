import type { APIRoute } from 'astro';

export const GET: APIRoute = ({ site }) => {
  const origin = site ?? new URL('https://djmonnar.github.io');
  const body = [
    'User-agent: *',
    'Allow: /3hbed/',
    '',
    `Sitemap: ${new URL('/3hbed/sitemap-index.xml', origin).toString()}`,
    '',
  ].join('\n');

  return new Response(body, { headers: { 'Content-Type': 'text/plain; charset=utf-8' } });
};
