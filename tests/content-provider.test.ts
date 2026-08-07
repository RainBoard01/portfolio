import { describe, expect, it, vi } from 'vitest';
import { SiteSnapshotSchema, type SiteSnapshot } from '../src/domain';
import {
  DIRECTUS_COLLECTIONS,
  createContentLoader,
  createDirectusProvider,
  localProvider,
  type ContentFetch,
} from '../src/data';
import {
  BLOG_POST_SLUGS,
  CASE_STUDY_SLUGS,
  blogPostPath,
  caseStudyPath,
  localeFromPath,
  localizedAlternatePath,
  routePath,
} from '../src/i18n';

describe('content providers', () => {
  it('loads complete, schema-valid local snapshots in both languages', async () => {
    const [english, spanish] = await Promise.all([
      localProvider.getSnapshot('en'),
      localProvider.getSnapshot('es'),
    ]);

    expect(SiteSnapshotSchema.safeParse(english).success).toBe(true);
    expect(SiteSnapshotSchema.safeParse(spanish).success).toBe(true);
    expect(english.caseStudies).toHaveLength(6);
    expect(spanish.caseStudies).toHaveLength(6);
    expect(english.experiences).toHaveLength(2);
    expect(spanish.services).toHaveLength(4);
    expect(english.blogPosts[0]?.body.length).toBeGreaterThan(10);
    expect(spanish.blogPosts[0]?.body.length).toBeGreaterThan(10);
  });

  it('keeps stable ids aligned while localizing every public slug', async () => {
    const [english, spanish] = await Promise.all([
      localProvider.getSnapshot('en'),
      localProvider.getSnapshot('es'),
    ]);

    expect(english.caseStudies.map(({ id }) => id).sort()).toEqual(
      spanish.caseStudies.map(({ id }) => id).sort(),
    );
    expect(english.services.map(({ id }) => id).sort()).toEqual(
      spanish.services.map(({ id }) => id).sort(),
    );
    expect(english.caseStudies.find(({ id }) => id === 'farmavet')?.slug).toBe(
      CASE_STUDY_SLUGS.farmavet.en,
    );
    expect(spanish.caseStudies.find(({ id }) => id === 'farmavet')?.slug).toBe(
      CASE_STUDY_SLUGS.farmavet.es,
    );
    expect(english.blogPosts[0]?.slug).toBe(BLOG_POST_SLUGS['end-to-end-ownership'].en);
    expect(spanish.blogPosts[0]?.slug).toBe(BLOG_POST_SLUGS['end-to-end-ownership'].es);
  });

  it('maps static and dynamic routes between locales', () => {
    expect(routePath('about', 'en')).toBe('/about');
    expect(routePath('about', 'es')).toBe('/es/sobre-mi');
    expect(caseStudyPath('imar-hyops', 'en')).toBe(
      '/work/hyops-marine-research-platform',
    );
    expect(blogPostPath('end-to-end-ownership', 'es')).toBe(
      '/es/blog/ownership-end-to-end-mas-alla-de-entregar-codigo',
    );
    expect(localeFromPath('/es/trabajo?ref=home')).toBe('es');
    expect(localeFromPath('/work')).toBe('en');
    expect(
      localizedAlternatePath('/work/dipromar-operations-and-traceability', 'es'),
    ).toBe('/es/trabajo/dipromar-operaciones-y-trazabilidad');
  });

  it('maps explicit Directus DTOs into the canonical snapshot at build time', async () => {
    const local = await localProvider.getSnapshot('en');
    const payloads = toDirectusPayloads(local);
    const fetchMock = createCollectionFetch(payloads);
    const provider = createDirectusProvider({
      url: 'https://content.example.test',
      token: 'build-only-token',
      fetch: fetchMock,
    });

    const snapshot = await provider.getSnapshot('en');

    expect(snapshot.profile.name).toBe('Yerko Acuña');
    expect(snapshot.caseStudies).toHaveLength(6);
    expect(snapshot.caseStudies[0]?.id).toBe('dipromar');
    expect(snapshot.blogPosts[0]?.id).toBe('end-to-end-ownership');
    expect(fetchMock).toHaveBeenCalledTimes(7);

    const firstInit = fetchMock.mock.calls[0]?.[1];
    expect(new Headers(firstInit?.headers).get('Authorization')).toBe(
      'Bearer build-only-token',
    );

    const requestedUrls = fetchMock.mock.calls.map(([input]) =>
      new URL(input instanceof Request ? input.url : input.toString()),
    );
    expect(requestedUrls.every((url) => url.searchParams.get('fields') !== '*')).toBe(true);
    for (const collection of [
      DIRECTUS_COLLECTIONS.experiences,
      DIRECTUS_COLLECTIONS.caseStudies,
      DIRECTUS_COLLECTIONS.services,
      DIRECTUS_COLLECTIONS.blogPosts,
    ]) {
      const request = requestedUrls.find((url) => url.pathname.endsWith(`/items/${collection}`));
      expect(request?.searchParams.get('filter[status][_eq]')).toBe('published');
    }
  });

  it('memoizes one complete Directus snapshot per locale', async () => {
    const local = await localProvider.getSnapshot('es');
    const fetchMock = createCollectionFetch(toDirectusPayloads(local));
    const loader = createContentLoader({
      env: {
        CONTENT_SOURCE: 'directus',
        CONTENT_FALLBACK: 'fail',
        DIRECTUS_URL: 'https://content.example.test',
      },
      fetch: fetchMock,
    });

    const first = loader.load('es');
    const second = loader.load('es');

    expect(first).toBe(second);
    await expect(first).resolves.toMatchObject({ locale: 'es' });
    expect(fetchMock).toHaveBeenCalledTimes(7);
  });

  it('applies validated public contact overrides to the complete snapshot', async () => {
    const loader = createContentLoader({
      env: {
        CONTENT_SOURCE: 'local',
        PUBLIC_CONTACT_EMAIL: 'hello@example.dev',
        PUBLIC_GITHUB_URL: 'https://github.com/example-profile',
      },
    });

    const snapshot = await loader.load('en');

    expect(snapshot.settings.contactEmail).toBe('hello@example.dev');
    expect(snapshot.company.contactEmail).toBe('hello@example.dev');
    expect(snapshot.settings.githubUrl).toBe('https://github.com/example-profile');
  });

  it('uses an atomic local fallback when any Directus collection is invalid', async () => {
    const local = await localProvider.getSnapshot('en');
    const payloads = toDirectusPayloads(local);
    payloads[DIRECTUS_COLLECTIONS.caseStudies] = [
      { locale: 'en', content_key: 'remote-only-partial-row' },
    ];
    const fetchMock = createCollectionFetch(payloads);
    const loader = createContentLoader({
      env: {
        CONTENT_SOURCE: 'directus',
        CONTENT_FALLBACK: 'local',
        DIRECTUS_URL: 'https://content.example.test',
      },
      fetch: fetchMock,
    });

    const snapshot = await loader.load('en');

    expect(snapshot).toBe(local);
    expect(snapshot.caseStudies).toHaveLength(6);
    expect(snapshot.caseStudies.some(({ id }) => id === 'remote-only-partial-row')).toBe(false);
  });

  it('fails the build path when Directus is invalid and fallback is disabled', async () => {
    const local = await localProvider.getSnapshot('en');
    const payloads = toDirectusPayloads(local);
    payloads[DIRECTUS_COLLECTIONS.services] = [];
    const loader = createContentLoader({
      env: {
        CONTENT_SOURCE: 'directus',
        CONTENT_FALLBACK: 'fail',
        DIRECTUS_URL: 'https://content.example.test',
      },
      fetch: createCollectionFetch(payloads),
    });

    await expect(loader.load('en')).rejects.toThrow(
      'Unable to build the en content snapshot from Directus',
    );
  });

  it('does not publish sensitive résumé fields or placeholder profile links', async () => {
    const snapshots = await Promise.all([
      localProvider.getSnapshot('en'),
      localProvider.getSnapshot('es'),
    ]);
    const serialized = JSON.stringify(snapshots);

    expect(serialized).not.toContain('+56 9');
    expect(serialized).not.toContain('yerkoacuna.h@gmail.com');
    expect(serialized).not.toContain('linkedin-profile');
    expect(serialized).not.toContain('Salary Expectation');
    expect(serialized).not.toContain('$95,000');
    expect(serialized).not.toContain('Chilean citizen');
  });
});

function createCollectionFetch(payloads: Record<string, unknown[]>) {
  return vi.fn<ContentFetch>(async (input: string | URL | Request) => {
    const url = new URL(input instanceof Request ? input.url : input.toString());
    const collection = url.pathname.split('/items/')[1];
    const data = collection ? payloads[collection] : undefined;
    if (!data) return Response.json({ errors: [{ message: 'Not found' }] }, { status: 404 });
    return Response.json({ data });
  });
}

function toDirectusPayloads(snapshot: SiteSnapshot): Record<string, unknown[]> {
  return {
    [DIRECTUS_COLLECTIONS.settings]: [
      {
        locale: snapshot.locale,
        site_name: snapshot.settings.siteName,
        locale_name: snapshot.settings.localeName,
        default_title: snapshot.settings.defaultTitle,
        default_description: snapshot.settings.defaultDescription,
        contact_email: snapshot.settings.contactEmail,
        github_url: snapshot.settings.githubUrl,
        cv_path: snapshot.settings.cvPath,
        navigation: snapshot.settings.navigation,
        labels: snapshot.labels,
        pages: snapshot.pages,
        skip_to_content_label: snapshot.settings.skipToContentLabel,
        open_menu_label: snapshot.settings.openMenuLabel,
        close_menu_label: snapshot.settings.closeMenuLabel,
        language_switch_label: snapshot.settings.languageSwitchLabel,
        footer_tagline: snapshot.settings.footerTagline,
        copyright_name: snapshot.settings.copyrightName,
      },
    ],
    [DIRECTUS_COLLECTIONS.profiles]: [
      {
        locale: snapshot.locale,
        name: snapshot.profile.name,
        role: snapshot.profile.role,
        secondary_role: snapshot.profile.secondaryRole,
        headline: snapshot.profile.headline,
        introduction: snapshot.profile.introduction,
        biography: snapshot.profile.biography,
        location_label: snapshot.profile.locationLabel,
        remote_label: snapshot.profile.remoteLabel,
        focus_areas: snapshot.profile.focusAreas,
        principles: snapshot.profile.principles,
        domains: snapshot.profile.domains,
        expertise: snapshot.profile.expertise,
        education: snapshot.profile.education,
        languages: snapshot.profile.languages,
      },
    ],
    [DIRECTUS_COLLECTIONS.companies]: [
      {
        locale: snapshot.locale,
        display_name: snapshot.company.displayName,
        legal_name: snapshot.company.legalName,
        short_name: snapshot.company.shortName,
        headline: snapshot.company.headline,
        summary: snapshot.company.summary,
        operating_model: snapshot.company.operatingModel,
        best_for: snapshot.company.bestFor,
        commitments: snapshot.company.commitments,
        contact_email: snapshot.company.contactEmail,
      },
    ],
    [DIRECTUS_COLLECTIONS.experiences]: snapshot.experiences.map((item, sort) => ({
      content_key: item.id,
      locale: snapshot.locale,
      role: item.role,
      organization: item.organization,
      engagement: item.engagement,
      start_year: item.startYear,
      end_year: item.endYear,
      period_label: item.periodLabel,
      summary: item.summary,
      highlights: item.highlights,
      technologies: item.technologies,
      case_study_keys: item.caseStudyIds,
      sort,
    })),
    [DIRECTUS_COLLECTIONS.caseStudies]: snapshot.caseStudies.map((item) => ({
      content_key: item.id,
      locale: snapshot.locale,
      slug: item.slug,
      title: item.title,
      client: item.client,
      period: item.period,
      category: item.category,
      collaboration_mode: item.collaborationMode,
      visibility: item.visibility,
      summary: item.summary,
      context: item.context,
      challenge: item.challenge,
      responsibilities: item.responsibilities,
      approach: item.approach,
      outcomes: item.outcomes,
      technologies: item.technologies,
      external_url: item.externalUrl,
      external_link_label: item.externalLinkLabel,
      featured: item.featured,
      sort: item.sortOrder,
    })),
    [DIRECTUS_COLLECTIONS.services]: snapshot.services.map((item) => ({
      content_key: item.id,
      locale: snapshot.locale,
      title: item.title,
      summary: item.summary,
      suitable_for: item.suitableFor,
      deliverables: item.deliverables,
      technologies: item.technologies,
      sort: item.sortOrder,
    })),
    [DIRECTUS_COLLECTIONS.blogPosts]: snapshot.blogPosts.map((item, sort) => ({
      content_key: item.id,
      locale: snapshot.locale,
      slug: item.slug,
      title: item.title,
      excerpt: item.excerpt,
      published_at: item.publishedAt,
      reading_minutes: item.readingMinutes,
      topics: item.topics,
      body: item.body,
      featured: item.featured,
      status: 'published',
      sort,
    })),
  };
}
