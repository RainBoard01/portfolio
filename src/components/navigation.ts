import type { Locale } from '@/domain';
import { localizedAlternatePath, routePath } from '@/i18n/routes';

export type SiteLanguage = Locale;

export interface NavigationItem {
  label: string;
  href: string;
}

const navigation: Record<SiteLanguage, NavigationItem[]> = {
  en: [
    { label: 'About', href: routePath('about', 'en') },
    { label: 'Experience', href: routePath('experience', 'en') },
    { label: 'Work', href: routePath('work', 'en') },
    { label: 'Services', href: routePath('services', 'en') },
    { label: 'Blog', href: routePath('blog', 'en') },
    { label: 'Contact', href: routePath('contact', 'en') },
  ],
  es: [
    { label: 'Sobre mí', href: routePath('about', 'es') },
    { label: 'Experiencia', href: routePath('experience', 'es') },
    { label: 'Trabajo', href: routePath('work', 'es') },
    { label: 'Servicios', href: routePath('services', 'es') },
    { label: 'Blog', href: routePath('blog', 'es') },
    { label: 'Contacto', href: routePath('contact', 'es') },
  ],
};

function normalizePath(pathname: string): string {
  const withoutQuery = pathname.split(/[?#]/, 1)[0] || '/';
  if (withoutQuery === '/') return '/';
  return withoutQuery.replace(/\/+$/, '');
}

export function navigationFor(language: SiteLanguage): NavigationItem[] {
  return navigation[language];
}

export function isNavigationItemActive(currentPath: string, href: string): boolean {
  const current = normalizePath(currentPath);
  const target = normalizePath(href);

  if (target === '/' || target === '/es') return current === target;
  return current === target || current.startsWith(`${target}/`);
}

export function alternatePathFor(currentPath: string, language: SiteLanguage): string {
  return localizedAlternatePath(currentPath, language === 'en' ? 'es' : 'en');
}
