import { z } from 'zod';
import {
  ContentProviderError,
  type ContentProvider,
  type Locale,
} from '../../domain';
import {
  DirectusBlogPostDtoSchema,
  DirectusCaseStudyDtoSchema,
  DirectusCompanyProfileDtoSchema,
  DirectusExperienceDtoSchema,
  DirectusProfessionalProfileDtoSchema,
  DirectusServiceDtoSchema,
  DirectusSiteSettingsDtoSchema,
  directusItemsResponseSchema,
  type DirectusSnapshotDto,
} from './dto';
import { mapDirectusSnapshot } from './mapper';

export const DIRECTUS_COLLECTIONS = {
  settings: 'site_settings',
  profiles: 'professional_profiles',
  companies: 'company_profiles',
  experiences: 'experiences',
  caseStudies: 'case_studies',
  services: 'services',
  blogPosts: 'blog_posts',
} as const;

// Keep CMS access intentionally narrow. Explicit field lists make accidental
// schema growth (including private notes or credentials) impossible to leak
// into the build merely because a field was added in Directus.
const DIRECTUS_FIELDS: Record<string, string> = {
  [DIRECTUS_COLLECTIONS.settings]: [
    'id', 'locale', 'site_name', 'locale_name', 'default_title',
    'default_description', 'contact_email', 'github_url', 'cv_path',
    'navigation', 'labels', 'pages', 'skip_to_content_label',
    'open_menu_label', 'close_menu_label', 'language_switch_label',
    'footer_tagline', 'copyright_name',
  ].join(','),
  [DIRECTUS_COLLECTIONS.profiles]: [
    'id', 'locale', 'name', 'role', 'secondary_role', 'headline',
    'introduction', 'biography', 'location_label', 'remote_label',
    'focus_areas', 'principles', 'domains', 'expertise', 'education',
    'languages',
  ].join(','),
  [DIRECTUS_COLLECTIONS.companies]: [
    'id', 'locale', 'display_name', 'legal_name', 'short_name', 'headline',
    'summary', 'operating_model', 'best_for', 'commitments', 'contact_email',
  ].join(','),
  [DIRECTUS_COLLECTIONS.experiences]: [
    'id', 'content_key', 'locale', 'role', 'organization', 'engagement',
    'start_year', 'end_year', 'period_label', 'summary', 'highlights',
    'technologies', 'case_study_keys', 'status', 'sort',
  ].join(','),
  [DIRECTUS_COLLECTIONS.caseStudies]: [
    'id', 'content_key', 'locale', 'slug', 'title', 'client', 'period',
    'category', 'collaboration_mode', 'visibility', 'summary', 'context',
    'challenge', 'responsibilities', 'approach', 'outcomes', 'technologies',
    'external_url', 'external_link_label', 'featured', 'status', 'sort',
  ].join(','),
  [DIRECTUS_COLLECTIONS.services]: [
    'id', 'content_key', 'locale', 'title', 'summary', 'suitable_for',
    'deliverables', 'technologies', 'status', 'sort',
  ].join(','),
  [DIRECTUS_COLLECTIONS.blogPosts]: [
    'id', 'content_key', 'locale', 'slug', 'title', 'excerpt', 'published_at',
    'reading_minutes', 'topics', 'body', 'featured', 'status', 'sort',
  ].join(','),
};

export type ContentFetch = (
  input: string | URL | Request,
  init?: RequestInit,
) => Promise<Response>;

export interface DirectusProviderOptions {
  url: string;
  token?: string;
  fetch?: ContentFetch;
}

export function createDirectusProvider(options: DirectusProviderOptions): ContentProvider {
  const baseUrl = parseBaseUrl(options.url);
  const fetchContent = options.fetch ?? globalThis.fetch.bind(globalThis);

  return {
    name: 'directus',
    async getSnapshot(locale) {
      try {
        const [
          settings,
          profiles,
          companies,
          experiences,
          caseStudies,
          services,
          blogPosts,
        ] = await Promise.all([
          readCollection(
            baseUrl,
            DIRECTUS_COLLECTIONS.settings,
            locale,
            DirectusSiteSettingsDtoSchema,
            options.token,
            fetchContent,
          ),
          readCollection(
            baseUrl,
            DIRECTUS_COLLECTIONS.profiles,
            locale,
            DirectusProfessionalProfileDtoSchema,
            options.token,
            fetchContent,
          ),
          readCollection(
            baseUrl,
            DIRECTUS_COLLECTIONS.companies,
            locale,
            DirectusCompanyProfileDtoSchema,
            options.token,
            fetchContent,
          ),
          readCollection(
            baseUrl,
            DIRECTUS_COLLECTIONS.experiences,
            locale,
            DirectusExperienceDtoSchema,
            options.token,
            fetchContent,
            { sort: 'sort', publishedOnly: true },
          ),
          readCollection(
            baseUrl,
            DIRECTUS_COLLECTIONS.caseStudies,
            locale,
            DirectusCaseStudyDtoSchema,
            options.token,
            fetchContent,
            { sort: 'sort', publishedOnly: true },
          ),
          readCollection(
            baseUrl,
            DIRECTUS_COLLECTIONS.services,
            locale,
            DirectusServiceDtoSchema,
            options.token,
            fetchContent,
            { sort: 'sort', publishedOnly: true },
          ),
          readCollection(
            baseUrl,
            DIRECTUS_COLLECTIONS.blogPosts,
            locale,
            DirectusBlogPostDtoSchema,
            options.token,
            fetchContent,
            { sort: '-published_at', publishedOnly: true },
          ),
        ]);

        const dto: DirectusSnapshotDto = {
          settings,
          profiles,
          companies,
          experiences,
          caseStudies,
          services,
          blogPosts,
        };

        return mapDirectusSnapshot(dto, locale);
      } catch (error) {
        if (error instanceof ContentProviderError) throw error;
        throw new ContentProviderError(
          'directus',
          `Unable to build the ${locale} content snapshot from Directus`,
          { cause: error },
        );
      }
    },
  };
}

async function readCollection<T extends z.ZodType>(
  baseUrl: URL,
  collection: string,
  locale: Locale,
  itemSchema: T,
  token: string | undefined,
  fetchContent: ContentFetch,
  options: { sort?: string; publishedOnly?: boolean } = {},
): Promise<z.infer<T>[]> {
  const requestUrl = new URL(`items/${collection}`, ensureTrailingSlash(baseUrl));
  requestUrl.searchParams.set('filter[locale][_eq]', locale);
  requestUrl.searchParams.set('limit', '-1');
  const fields = DIRECTUS_FIELDS[collection];
  if (!fields) {
    throw new ContentProviderError('directus', `No explicit field list for collection ${collection}`);
  }
  requestUrl.searchParams.set('fields', fields);
  if (options.sort) requestUrl.searchParams.set('sort', options.sort);
  if (options.publishedOnly) {
    requestUrl.searchParams.set('filter[status][_eq]', 'published');
  }

  const headers = new Headers({ Accept: 'application/json' });
  if (token) headers.set('Authorization', `Bearer ${token}`);

  let response: Response;
  try {
    response = await fetchContent(requestUrl, { headers });
  } catch (error) {
    throw new ContentProviderError(
      'directus',
      `Directus request failed for collection ${collection}`,
      { cause: error },
    );
  }

  if (!response.ok) {
    throw new ContentProviderError(
      'directus',
      `Directus returned HTTP ${response.status} for collection ${collection}`,
    );
  }

  let payload: unknown;
  try {
    payload = await response.json();
  } catch (error) {
    throw new ContentProviderError(
      'directus',
      `Directus returned invalid JSON for collection ${collection}`,
      { cause: error },
    );
  }

  const parsed = directusItemsResponseSchema(itemSchema).safeParse(payload);
  if (!parsed.success) {
    throw new ContentProviderError(
      'directus',
      `Directus collection ${collection} does not match its build-time DTO`,
      { cause: parsed.error },
    );
  }

  return parsed.data.data;
}

function parseBaseUrl(value: string): URL {
  try {
    const url = new URL(value);
    if (url.protocol !== 'https:' && url.protocol !== 'http:') throw new Error('Unsupported protocol');
    return url;
  } catch (error) {
    throw new ContentProviderError('directus', 'DIRECTUS_URL must be a valid HTTP(S) URL', {
      cause: error,
    });
  }
}

function ensureTrailingSlash(value: URL): URL {
  const url = new URL(value);
  if (!url.pathname.endsWith('/')) url.pathname += '/';
  return url;
}
