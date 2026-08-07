import type { Locale } from '@/domain';

export const LOCALES = ['en', 'es'] as const satisfies readonly Locale[];
export const DEFAULT_LOCALE: Locale = 'en';

export const LOCALE_META = {
  en: { code: 'en', languageTag: 'en-US', label: 'English', pathPrefix: '' },
  es: { code: 'es', languageTag: 'es-CL', label: 'Español', pathPrefix: '/es' },
} as const satisfies Record<Locale, {
  code: Locale;
  languageTag: string;
  label: string;
  pathPrefix: string;
}>;

export const ROUTES = {
  home: { en: '/', es: '/es' },
  about: { en: '/about', es: '/es/sobre-mi' },
  experience: { en: '/experience', es: '/es/experiencia' },
  work: { en: '/work', es: '/es/trabajo' },
  services: { en: '/services', es: '/es/servicios' },
  blog: { en: '/blog', es: '/es/blog' },
  contact: { en: '/contact', es: '/es/contacto' },
  rss: { en: '/rss.xml', es: '/es/rss.xml' },
} as const satisfies Record<string, Record<Locale, string>>;

export type RouteKey = keyof typeof ROUTES;

export const CASE_STUDY_SLUGS = {
  farmavet: {
    en: 'farmavet-laboratory-management',
    es: 'farmavet-gestion-de-laboratorio',
  },
  'imar-hyops': {
    en: 'hyops-marine-research-platform',
    es: 'hyops-plataforma-de-investigacion-marina',
  },
  recluta: {
    en: 'recluta-legal-recruitment-platform',
    es: 'recluta-plataforma-de-reclutamiento-legal',
  },
  'sped-v2': {
    en: 'sped-v2-system-modernization',
    es: 'sped-v2-modernizacion-de-sistema',
  },
  dipromar: {
    en: 'dipromar-operations-and-traceability',
    es: 'dipromar-operaciones-y-trazabilidad',
  },
  smpia: {
    en: 'smpia-predictive-maintenance',
    es: 'smpia-mantenimiento-predictivo',
  },
} as const satisfies Record<string, Record<Locale, string>>;

export type CaseStudyId = keyof typeof CASE_STUDY_SLUGS;

export const BLOG_POST_SLUGS = {
  'end-to-end-ownership': {
    en: 'end-to-end-ownership-beyond-shipping-code',
    es: 'ownership-end-to-end-mas-alla-de-entregar-codigo',
  },
} as const satisfies Record<string, Record<Locale, string>>;

export type BlogPostId = keyof typeof BLOG_POST_SLUGS;

export function routePath(route: RouteKey, locale: Locale): string {
  return ROUTES[route][locale];
}

export function caseStudyPath(id: CaseStudyId, locale: Locale): string {
  const base = routePath('work', locale);
  return `${base}/${CASE_STUDY_SLUGS[id][locale]}`;
}

export function blogPostPath(id: BlogPostId, locale: Locale): string {
  const base = routePath('blog', locale);
  return `${base}/${BLOG_POST_SLUGS[id][locale]}`;
}

export function localeFromPath(pathname: string): Locale {
  const normalized = normalizePathname(pathname);
  return normalized === '/es' || normalized.startsWith('/es/') ? 'es' : DEFAULT_LOCALE;
}

export function alternateLocale(locale: Locale): Locale {
  return locale === 'en' ? 'es' : 'en';
}

export function localizedAlternatePath(pathname: string, targetLocale: Locale): string {
  const normalized = normalizePathname(pathname);

  for (const route of Object.values(ROUTES)) {
    if (Object.values(route).includes(normalized as never)) {
      return route[targetLocale];
    }
  }

  for (const [id, slugs] of Object.entries(CASE_STUDY_SLUGS)) {
    if (Object.values(slugs).some((value) => normalized.endsWith(`/${value}`))) {
      return caseStudyPath(id as CaseStudyId, targetLocale);
    }
  }

  for (const [id, slugs] of Object.entries(BLOG_POST_SLUGS)) {
    if (Object.values(slugs).some((value) => normalized.endsWith(`/${value}`))) {
      return blogPostPath(id as BlogPostId, targetLocale);
    }
  }

  return routePath('home', targetLocale);
}

function normalizePathname(value: string): string {
  const pathname = value.startsWith('http') ? new URL(value).pathname : value.split(/[?#]/, 1)[0] || '/';
  if (pathname === '/') return pathname;
  return pathname.replace(/\/+$/, '') || '/';
}
