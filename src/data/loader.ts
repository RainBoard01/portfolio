import { z } from 'zod';
import {
  LocaleSchema,
  SiteSnapshotSchema,
  type ContentProvider,
  type Locale,
  type SiteSnapshot,
} from '../domain';
import { createDirectusProvider, type ContentFetch } from './directus';
import { localProvider } from './local';

const ContentSourceSchema = z.enum(['local', 'directus']);
const ContentFallbackSchema = z.enum(['fail', 'local']);

export type ContentSource = z.infer<typeof ContentSourceSchema>;
export type ContentFallback = z.infer<typeof ContentFallbackSchema>;

export interface ContentEnvironment {
  PUBLIC_CONTACT_EMAIL?: string;
  PUBLIC_GITHUB_URL?: string;
  CONTENT_SOURCE?: string;
  CONTENT_FALLBACK?: string;
  DIRECTUS_URL?: string;
  DIRECTUS_TOKEN?: string;
}

export interface ContentConfig {
  source: ContentSource;
  fallback: ContentFallback;
  directusUrl?: string;
  directusToken?: string;
  publicContactEmail?: string;
  publicGithubUrl?: string;
}

export interface ContentLoader {
  readonly source: ContentSource;
  readonly fallback: ContentFallback;
  load(locale: Locale): Promise<SiteSnapshot>;
  clear(): void;
}

export interface CreateContentLoaderOptions {
  env?: ContentEnvironment;
  fetch?: ContentFetch;
  local?: ContentProvider;
}

export function resolveContentConfig(env: ContentEnvironment = runtimeEnvironment()): ContentConfig {
  const source = ContentSourceSchema.parse(env.CONTENT_SOURCE || 'local');
  const fallback = ContentFallbackSchema.parse(env.CONTENT_FALLBACK || 'fail');
  const directusUrl = cleanOptional(env.DIRECTUS_URL);
  const directusToken = cleanOptional(env.DIRECTUS_TOKEN);
  const publicContactEmail = cleanOptional(env.PUBLIC_CONTACT_EMAIL);
  const publicGithubUrl = cleanOptional(env.PUBLIC_GITHUB_URL);

  if (source === 'directus' && !directusUrl) {
    throw new Error('DIRECTUS_URL is required when CONTENT_SOURCE=directus');
  }

  return {
    source,
    fallback,
    ...(directusUrl ? { directusUrl } : {}),
    ...(directusToken ? { directusToken } : {}),
    ...(publicContactEmail
      ? { publicContactEmail: z.email().parse(publicContactEmail) }
      : {}),
    ...(publicGithubUrl ? { publicGithubUrl: z.url().parse(publicGithubUrl) } : {}),
  };
}

export function createContentLoader(
  options: CreateContentLoaderOptions = {},
): ContentLoader {
  const config = resolveContentConfig(options.env ?? runtimeEnvironment());
  const fallbackProvider = options.local ?? localProvider;
  const primary = createPrimaryProvider(config, options.fetch, fallbackProvider);
  const cache = new Map<Locale, Promise<SiteSnapshot>>();

  return {
    source: config.source,
    fallback: config.fallback,
    load(localeInput) {
      const locale = LocaleSchema.parse(localeInput);
      const cached = cache.get(locale);
      if (cached) return cached;

      const snapshot = loadAtomically(primary, fallbackProvider, config, locale).then(
        (value) => applyPublicOverrides(value, config),
      );
      cache.set(locale, snapshot);
      return snapshot;
    },
    clear() {
      cache.clear();
    },
  };
}

let defaultLoader: ContentLoader | undefined;

export function getContent(locale: Locale): Promise<SiteSnapshot> {
  defaultLoader ??= createContentLoader();
  return defaultLoader.load(locale);
}

export const loadContent = getContent;

export function clearContentCache(): void {
  defaultLoader?.clear();
  defaultLoader = undefined;
}

async function loadAtomically(
  primary: ContentProvider,
  fallbackProvider: ContentProvider,
  config: ContentConfig,
  locale: Locale,
): Promise<SiteSnapshot> {
  try {
    return await primary.getSnapshot(locale);
  } catch (error) {
    if (config.source !== 'directus' || config.fallback !== 'local') throw error;

    // The Directus provider validates a complete SiteSnapshot before returning.
    // On any error we discard it entirely and load the complete local locale.
    return fallbackProvider.getSnapshot(locale);
  }
}

function createPrimaryProvider(
  config: ContentConfig,
  fetchContent: ContentFetch | undefined,
  local: ContentProvider,
): ContentProvider {
  if (config.source === 'local') return local;

  return createDirectusProvider({
    url: config.directusUrl as string,
    ...(config.directusToken ? { token: config.directusToken } : {}),
    ...(fetchContent ? { fetch: fetchContent } : {}),
  });
}

function cleanOptional(value: string | undefined): string | undefined {
  const normalized = value?.trim();
  return normalized || undefined;
}

function applyPublicOverrides(
  snapshot: SiteSnapshot,
  config: ContentConfig,
): SiteSnapshot {
  if (!config.publicContactEmail && !config.publicGithubUrl) return snapshot;

  return SiteSnapshotSchema.parse({
    ...snapshot,
    settings: {
      ...snapshot.settings,
      contactEmail: config.publicContactEmail ?? snapshot.settings.contactEmail,
      githubUrl: config.publicGithubUrl ?? snapshot.settings.githubUrl,
    },
    company: {
      ...snapshot.company,
      contactEmail: config.publicContactEmail ?? snapshot.company.contactEmail,
    },
  });
}

function runtimeEnvironment(): ContentEnvironment {
  // Astro loads .env values into import.meta.env for build-time modules. The
  // process.env fallback keeps the same loader usable in Node tests, CI and
  // Docker builds where values are exported directly.
  const source = import.meta.env.CONTENT_SOURCE ?? process.env.CONTENT_SOURCE;
  const fallback = import.meta.env.CONTENT_FALLBACK ?? process.env.CONTENT_FALLBACK;
  const url = import.meta.env.DIRECTUS_URL ?? process.env.DIRECTUS_URL;
  const token = import.meta.env.DIRECTUS_TOKEN ?? process.env.DIRECTUS_TOKEN;
  const contactEmail = import.meta.env.PUBLIC_CONTACT_EMAIL ?? process.env.PUBLIC_CONTACT_EMAIL;
  const githubUrl = import.meta.env.PUBLIC_GITHUB_URL ?? process.env.PUBLIC_GITHUB_URL;

  return {
    ...(source ? { CONTENT_SOURCE: source } : {}),
    ...(fallback ? { CONTENT_FALLBACK: fallback } : {}),
    ...(url ? { DIRECTUS_URL: url } : {}),
    ...(token ? { DIRECTUS_TOKEN: token } : {}),
    ...(contactEmail ? { PUBLIC_CONTACT_EMAIL: contactEmail } : {}),
    ...(githubUrl ? { PUBLIC_GITHUB_URL: githubUrl } : {}),
  };
}
