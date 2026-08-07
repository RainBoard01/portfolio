import type { Locale, SiteSnapshot } from './content';

export interface ContentProvider {
  readonly name: 'local' | 'directus';
  getSnapshot(locale: Locale): Promise<SiteSnapshot>;
}

export class ContentProviderError extends Error {
  readonly provider: ContentProvider['name'];
  override readonly cause?: unknown;

  constructor(
    provider: ContentProvider['name'],
    message: string,
    options?: { cause?: unknown },
  ) {
    super(message);
    this.name = 'ContentProviderError';
    this.provider = provider;
    this.cause = options?.cause;
  }
}
