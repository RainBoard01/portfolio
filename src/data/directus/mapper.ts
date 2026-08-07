import {
  SiteSnapshotSchema,
  type Locale,
  type SiteSnapshot,
} from '../../domain';
import type { DirectusSnapshotDto } from './dto';

export function mapDirectusSnapshot(
  dto: DirectusSnapshotDto,
  locale: Locale,
): SiteSnapshot {
  const settings = exactlyOne(dto.settings, 'site_settings', locale);
  const profile = exactlyOne(dto.profiles, 'professional_profiles', locale);
  const company = exactlyOne(dto.companies, 'company_profiles', locale);

  const snapshot = {
    locale,
    settings: {
      siteName: settings.site_name,
      localeName: settings.locale_name,
      defaultTitle: settings.default_title,
      defaultDescription: settings.default_description,
      contactEmail: settings.contact_email,
      githubUrl: settings.github_url,
      cvPath: settings.cv_path,
      navigation: settings.navigation,
      skipToContentLabel: settings.skip_to_content_label,
      openMenuLabel: settings.open_menu_label,
      closeMenuLabel: settings.close_menu_label,
      languageSwitchLabel: settings.language_switch_label,
      footerTagline: settings.footer_tagline,
      copyrightName: settings.copyright_name,
    },
    labels: settings.labels,
    pages: settings.pages,
    profile: {
      name: profile.name,
      role: profile.role,
      secondaryRole: profile.secondary_role,
      headline: profile.headline,
      introduction: profile.introduction,
      biography: profile.biography,
      locationLabel: profile.location_label,
      remoteLabel: profile.remote_label,
      focusAreas: profile.focus_areas,
      principles: profile.principles,
      domains: profile.domains,
      expertise: profile.expertise,
      education: profile.education,
      languages: profile.languages,
    },
    company: {
      displayName: company.display_name,
      legalName: company.legal_name,
      shortName: company.short_name,
      headline: company.headline,
      summary: company.summary,
      operatingModel: company.operating_model,
      bestFor: company.best_for,
      commitments: company.commitments,
      contactEmail: company.contact_email,
    },
    experiences: dto.experiences
      .map((item) => {
        assertLocale(item.locale, locale, 'experiences');
        return {
          id: item.content_key,
          role: item.role,
          organization: item.organization,
          engagement: item.engagement,
          startYear: item.start_year,
          endYear: item.end_year,
          periodLabel: item.period_label,
          summary: item.summary,
          highlights: item.highlights,
          technologies: item.technologies,
          caseStudyIds: item.case_study_keys,
          sortOrder: item.sort,
        };
      })
      .sort((left, right) => left.sortOrder - right.sortOrder)
      .map(({ sortOrder: _sortOrder, ...item }) => item),
    caseStudies: dto.caseStudies
      .map((item) => {
        assertLocale(item.locale, locale, 'case_studies');
        return {
          id: item.content_key,
          slug: item.slug,
          title: item.title,
          client: item.client,
          period: item.period,
          category: item.category,
          collaborationMode: item.collaboration_mode,
          visibility: item.visibility,
          summary: item.summary,
          context: item.context,
          challenge: item.challenge,
          responsibilities: item.responsibilities,
          approach: item.approach,
          outcomes: item.outcomes,
          technologies: item.technologies,
          externalUrl: item.external_url,
          externalLinkLabel: item.external_link_label,
          featured: item.featured,
          sortOrder: item.sort,
        };
      })
      .sort((left, right) => left.sortOrder - right.sortOrder),
    services: dto.services
      .map((item) => {
        assertLocale(item.locale, locale, 'services');
        return {
          id: item.content_key,
          title: item.title,
          summary: item.summary,
          suitableFor: item.suitable_for,
          deliverables: item.deliverables,
          technologies: item.technologies,
          sortOrder: item.sort,
        };
      })
      .sort((left, right) => left.sortOrder - right.sortOrder),
    blogPosts: dto.blogPosts
      .map((item) => {
        assertLocale(item.locale, locale, 'blog_posts');
        return {
          id: item.content_key,
          slug: item.slug,
          title: item.title,
          excerpt: item.excerpt,
          publishedAt: item.published_at.slice(0, 10),
          readingMinutes: item.reading_minutes,
          topics: item.topics,
          body: item.body,
          featured: item.featured,
          sortOrder: item.sort ?? 0,
        };
      })
      .sort((left, right) => {
        if (left.publishedAt !== right.publishedAt) {
          return right.publishedAt.localeCompare(left.publishedAt);
        }
        return left.sortOrder - right.sortOrder;
      })
      .map(({ sortOrder: _sortOrder, ...item }) => item),
  };

  // Nothing escapes this boundary until the complete localized graph validates.
  // This is what makes local fallback atomic rather than field-by-field.
  return SiteSnapshotSchema.parse(snapshot);
}

function exactlyOne<T extends { locale: Locale }>(
  values: T[],
  collection: string,
  locale: Locale,
): T {
  if (values.length !== 1) {
    throw new Error(
      `Expected exactly one ${collection} item for ${locale}; received ${values.length}`,
    );
  }
  const value = values[0];
  if (!value) throw new Error(`Missing ${collection} item for ${locale}`);
  assertLocale(value.locale, locale, collection);
  return value;
}

function assertLocale(actual: Locale, expected: Locale, collection: string): void {
  if (actual !== expected) {
    throw new Error(
      `Directus ${collection} returned locale ${actual}; expected ${expected}`,
    );
  }
}
