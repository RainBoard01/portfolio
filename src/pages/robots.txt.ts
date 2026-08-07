import type { APIRoute } from 'astro';

export const GET: APIRoute = ({ site }) => {
  const canonicalSite = site || new URL('https://yerkoacuna.dev');
  const isProduction = canonicalSite.hostname === 'yerkoacuna.dev';
  const rules = isProduction ? 'Allow: /' : 'Disallow: /';

  return new Response(
    `User-agent: *\n${rules}\n\nSitemap: ${new URL('/sitemap-index.xml', canonicalSite).href}\n`,
    { headers: { 'Content-Type': 'text/plain; charset=utf-8' } },
  );
};
