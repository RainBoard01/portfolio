import { z } from 'zod';
import {
  EditorialBlockSchema,
  EducationItemSchema,
  ExpertiseGroupSchema,
  LanguageItemSchema,
  LocaleSchema,
  NavigationSchema,
  PagesSchema,
  UiLabelsSchema,
} from '../../domain';

const directusId = z.union([z.string(), z.number()]).optional();
const text = z.string().trim().min(1);
const textArray = z.array(text);
const email = z.string().trim().pipe(z.email());
const url = z.string().trim().pipe(z.url());

// Localized text arrays and nested editorial content are JSON fields in Directus.
// Stable `content_key` values join translations without leaking Directus row ids
// into the UI-facing domain model.
export const DirectusSiteSettingsDtoSchema = z.object({
  id: directusId,
  locale: LocaleSchema,
  site_name: text,
  locale_name: text,
  default_title: text,
  default_description: text,
  contact_email: email,
  github_url: url,
  cv_path: z.string().trim().startsWith('/'),
  navigation: NavigationSchema,
  labels: UiLabelsSchema,
  pages: PagesSchema,
  skip_to_content_label: text,
  open_menu_label: text,
  close_menu_label: text,
  language_switch_label: text,
  footer_tagline: text,
  copyright_name: text,
});
export type DirectusSiteSettingsDto = z.infer<typeof DirectusSiteSettingsDtoSchema>;

export const DirectusProfessionalProfileDtoSchema = z.object({
  id: directusId,
  locale: LocaleSchema,
  name: text,
  role: text,
  secondary_role: text,
  headline: text,
  introduction: text,
  biography: textArray,
  location_label: text,
  remote_label: text,
  focus_areas: textArray,
  principles: textArray,
  domains: textArray,
  expertise: z.array(ExpertiseGroupSchema),
  education: z.array(EducationItemSchema),
  languages: z.array(LanguageItemSchema),
});
export type DirectusProfessionalProfileDto = z.infer<
  typeof DirectusProfessionalProfileDtoSchema
>;

export const DirectusCompanyProfileDtoSchema = z.object({
  id: directusId,
  locale: LocaleSchema,
  display_name: text,
  legal_name: text,
  short_name: text,
  headline: text,
  summary: textArray,
  operating_model: text,
  best_for: textArray,
  commitments: textArray,
  contact_email: email,
});
export type DirectusCompanyProfileDto = z.infer<typeof DirectusCompanyProfileDtoSchema>;

export const DirectusExperienceDtoSchema = z.object({
  id: directusId,
  content_key: text,
  locale: LocaleSchema,
  role: text,
  organization: text,
  engagement: z.enum(['employment', 'company']),
  start_year: z.number().int(),
  end_year: z.number().int().nullable(),
  period_label: text,
  summary: text,
  highlights: textArray,
  technologies: textArray,
  case_study_keys: textArray,
  status: z.literal('published').optional(),
  sort: z.number().int(),
});
export type DirectusExperienceDto = z.infer<typeof DirectusExperienceDtoSchema>;

export const DirectusCaseStudyDtoSchema = z.object({
  id: directusId,
  content_key: text,
  locale: LocaleSchema,
  slug: text,
  title: text,
  client: text,
  period: text,
  category: text,
  collaboration_mode: z.enum(['employment', 'company', 'academic']),
  visibility: z.enum(['public', 'private', 'academic']),
  summary: text,
  context: text,
  challenge: text,
  responsibilities: textArray,
  approach: textArray,
  outcomes: textArray,
  technologies: textArray,
  external_url: url.nullable(),
  external_link_label: text.nullable(),
  featured: z.boolean(),
  status: z.literal('published').optional(),
  sort: z.number().int(),
});
export type DirectusCaseStudyDto = z.infer<typeof DirectusCaseStudyDtoSchema>;

export const DirectusServiceDtoSchema = z.object({
  id: directusId,
  content_key: text,
  locale: LocaleSchema,
  title: text,
  summary: text,
  suitable_for: textArray,
  deliverables: textArray,
  technologies: textArray,
  status: z.literal('published').optional(),
  sort: z.number().int(),
});
export type DirectusServiceDto = z.infer<typeof DirectusServiceDtoSchema>;

export const DirectusBlogPostDtoSchema = z.object({
  id: directusId,
  content_key: text,
  locale: LocaleSchema,
  slug: text,
  title: text,
  excerpt: text,
  published_at: z.string().regex(/^\d{4}-\d{2}-\d{2}(?:T.*)?$/),
  reading_minutes: z.number().int().positive(),
  topics: textArray,
  body: z.array(EditorialBlockSchema),
  featured: z.boolean(),
  status: z.literal('published').optional(),
  sort: z.number().int().optional(),
});
export type DirectusBlogPostDto = z.infer<typeof DirectusBlogPostDtoSchema>;

export interface DirectusSnapshotDto {
  settings: DirectusSiteSettingsDto[];
  profiles: DirectusProfessionalProfileDto[];
  companies: DirectusCompanyProfileDto[];
  experiences: DirectusExperienceDto[];
  caseStudies: DirectusCaseStudyDto[];
  services: DirectusServiceDto[];
  blogPosts: DirectusBlogPostDto[];
}

export function directusItemsResponseSchema<T extends z.ZodType>(item: T) {
  return z.object({ data: z.array(item) });
}
