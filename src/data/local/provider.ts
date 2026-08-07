import type { ContentProvider, Locale, SiteSnapshot } from '../../domain';
import { englishSnapshot } from './en';
import { spanishSnapshot } from './es';

const snapshots = {
  en: orderSnapshot(englishSnapshot),
  es: orderSnapshot(spanishSnapshot),
} satisfies Record<Locale, SiteSnapshot>;

export function createLocalProvider(): ContentProvider {
  return {
    name: 'local',
    async getSnapshot(locale) {
      return snapshots[locale];
    },
  };
}

export const localProvider = createLocalProvider();

function orderSnapshot(snapshot: SiteSnapshot): SiteSnapshot {
  return {
    ...snapshot,
    caseStudies: [...snapshot.caseStudies].sort(
      (left, right) => left.sortOrder - right.sortOrder,
    ),
    services: [...snapshot.services].sort(
      (left, right) => left.sortOrder - right.sortOrder,
    ),
    blogPosts: [...snapshot.blogPosts].sort((left, right) =>
      right.publishedAt.localeCompare(left.publishedAt),
    ),
  };
}
