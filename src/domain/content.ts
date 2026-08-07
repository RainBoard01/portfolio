import { z } from 'zod';

const nonEmptyString = z.string().trim().min(1);
const email = z.string().trim().pipe(z.email());
const url = z.string().trim().pipe(z.url());
const slug = z
  .string()
  .trim()
  .min(1)
  .regex(/^[a-z0-9]+(?:-[a-z0-9]+)*$/, 'Expected a lowercase URL slug');
const stableId = z
  .string()
  .trim()
  .min(1)
  .regex(/^[a-z0-9]+(?:-[a-z0-9]+)*$/, 'Expected a stable kebab-case id');

export const LocaleSchema = z.enum(['en', 'es']);
export type Locale = z.infer<typeof LocaleSchema>;

export const NavigationSchema = z.object({
  home: nonEmptyString,
  about: nonEmptyString,
  experience: nonEmptyString,
  work: nonEmptyString,
  services: nonEmptyString,
  blog: nonEmptyString,
  contact: nonEmptyString,
});
export type Navigation = z.infer<typeof NavigationSchema>;

export const SiteSettingsSchema = z.object({
  siteName: nonEmptyString,
  localeName: nonEmptyString,
  defaultTitle: nonEmptyString,
  defaultDescription: nonEmptyString,
  contactEmail: email,
  githubUrl: url,
  cvPath: z.string().trim().startsWith('/'),
  navigation: NavigationSchema,
  skipToContentLabel: nonEmptyString,
  openMenuLabel: nonEmptyString,
  closeMenuLabel: nonEmptyString,
  languageSwitchLabel: nonEmptyString,
  footerTagline: nonEmptyString,
  copyrightName: nonEmptyString,
});
export type SiteSettings = z.infer<typeof SiteSettingsSchema>;

export const UiLabelsSchema = z.object({
  viewWork: nonEmptyString,
  viewAllWork: nonEmptyString,
  readCaseStudy: nonEmptyString,
  visitLiveProject: nonEmptyString,
  downloadCv: nonEmptyString,
  sendEmail: nonEmptyString,
  viewGithub: nonEmptyString,
  discussProject: nonEmptyString,
  current: nonEmptyString,
  privateProject: nonEmptyString,
  publicProject: nonEmptyString,
  academicProject: nonEmptyString,
  context: nonEmptyString,
  challenge: nonEmptyString,
  responsibility: nonEmptyString,
  approach: nonEmptyString,
  outcome: nonEmptyString,
  technologies: nonEmptyString,
  relatedWork: nonEmptyString,
  publishedOn: nonEmptyString,
  minuteRead: nonEmptyString,
  topics: nonEmptyString,
  backToWork: nonEmptyString,
  backToBlog: nonEmptyString,
  contactEmailLabel: nonEmptyString,
  noPostsMessage: nonEmptyString,
});
export type UiLabels = z.infer<typeof UiLabelsSchema>;

export const PageIntroSchema = z.object({
  eyebrow: nonEmptyString,
  title: nonEmptyString,
  description: nonEmptyString,
});
export type PageIntro = z.infer<typeof PageIntroSchema>;

export const PagesSchema = z.object({
  home: PageIntroSchema,
  about: PageIntroSchema,
  experience: PageIntroSchema,
  work: PageIntroSchema,
  services: PageIntroSchema,
  blog: PageIntroSchema,
  contact: PageIntroSchema,
});
export type Pages = z.infer<typeof PagesSchema>;

export const ExpertiseGroupSchema = z.object({
  id: stableId,
  title: nonEmptyString,
  items: z.array(nonEmptyString).min(1),
});
export type ExpertiseGroup = z.infer<typeof ExpertiseGroupSchema>;

export const EducationItemSchema = z.object({
  id: stableId,
  institution: nonEmptyString,
  qualification: nonEmptyString,
  period: nonEmptyString,
  description: nonEmptyString,
  technologies: z.array(nonEmptyString).default([]),
});
export type EducationItem = z.infer<typeof EducationItemSchema>;

export const LanguageItemSchema = z.object({
  language: nonEmptyString,
  level: nonEmptyString,
});
export type LanguageItem = z.infer<typeof LanguageItemSchema>;

export const ProfessionalProfileSchema = z.object({
  name: nonEmptyString,
  role: nonEmptyString,
  secondaryRole: nonEmptyString,
  headline: nonEmptyString,
  introduction: nonEmptyString,
  biography: z.array(nonEmptyString).min(2),
  locationLabel: nonEmptyString,
  remoteLabel: nonEmptyString,
  focusAreas: z.array(nonEmptyString).min(1),
  principles: z.array(nonEmptyString).min(1),
  domains: z.array(nonEmptyString).min(1),
  expertise: z.array(ExpertiseGroupSchema).min(1),
  education: z.array(EducationItemSchema).min(1),
  languages: z.array(LanguageItemSchema).min(1),
});
export type ProfessionalProfile = z.infer<typeof ProfessionalProfileSchema>;

export const CompanyProfileSchema = z.object({
  displayName: nonEmptyString,
  legalName: nonEmptyString,
  shortName: nonEmptyString,
  headline: nonEmptyString,
  summary: z.array(nonEmptyString).min(1),
  operatingModel: nonEmptyString,
  bestFor: z.array(nonEmptyString).min(1),
  commitments: z.array(nonEmptyString).min(1),
  contactEmail: email,
});
export type CompanyProfile = z.infer<typeof CompanyProfileSchema>;

export const ExperienceItemSchema = z.object({
  id: stableId,
  role: nonEmptyString,
  organization: nonEmptyString,
  engagement: z.enum(['employment', 'company']),
  startYear: z.number().int().min(2000),
  endYear: z.number().int().min(2000).nullable(),
  periodLabel: nonEmptyString,
  summary: nonEmptyString,
  highlights: z.array(nonEmptyString).min(1),
  technologies: z.array(nonEmptyString).min(1),
  caseStudyIds: z.array(stableId),
});
export type ExperienceItem = z.infer<typeof ExperienceItemSchema>;

export const CaseStudySchema = z.object({
  id: stableId,
  slug,
  title: nonEmptyString,
  client: nonEmptyString,
  period: nonEmptyString,
  category: nonEmptyString,
  collaborationMode: z.enum(['employment', 'company', 'academic']),
  visibility: z.enum(['public', 'private', 'academic']),
  summary: nonEmptyString,
  context: nonEmptyString,
  challenge: nonEmptyString,
  responsibilities: z.array(nonEmptyString).min(1),
  approach: z.array(nonEmptyString).min(1),
  outcomes: z.array(nonEmptyString).min(1),
  technologies: z.array(nonEmptyString).min(1),
  externalUrl: url.nullable(),
  externalLinkLabel: nonEmptyString.nullable(),
  featured: z.boolean(),
  sortOrder: z.number().int().nonnegative(),
});
export type CaseStudy = z.infer<typeof CaseStudySchema>;

export const ServiceSchema = z.object({
  id: stableId,
  title: nonEmptyString,
  summary: nonEmptyString,
  suitableFor: z.array(nonEmptyString).min(1),
  deliverables: z.array(nonEmptyString).min(1),
  technologies: z.array(nonEmptyString).default([]),
  sortOrder: z.number().int().nonnegative(),
});
export type Service = z.infer<typeof ServiceSchema>;

export const EditorialBlockSchema = z.discriminatedUnion('type', [
  z.object({
    type: z.literal('paragraph'),
    text: nonEmptyString,
  }),
  z.object({
    type: z.literal('heading'),
    level: z.union([z.literal(2), z.literal(3)]),
    text: nonEmptyString,
  }),
  z.object({
    type: z.literal('list'),
    style: z.enum(['ordered', 'unordered']),
    items: z.array(nonEmptyString).min(1),
  }),
  z.object({
    type: z.literal('quote'),
    text: nonEmptyString,
    attribution: nonEmptyString.nullable(),
  }),
]);
export type EditorialBlock = z.infer<typeof EditorialBlockSchema>;

export const BlogPostSchema = z.object({
  id: stableId,
  slug,
  title: nonEmptyString,
  excerpt: nonEmptyString,
  publishedAt: z.iso.date(),
  readingMinutes: z.number().int().positive(),
  topics: z.array(nonEmptyString).min(1),
  body: z.array(EditorialBlockSchema).min(3),
  featured: z.boolean(),
});
export type BlogPost = z.infer<typeof BlogPostSchema>;

export const SiteSnapshotSchema = z
  .object({
    locale: LocaleSchema,
    settings: SiteSettingsSchema,
    labels: UiLabelsSchema,
    pages: PagesSchema,
    profile: ProfessionalProfileSchema,
    company: CompanyProfileSchema,
    experiences: z.array(ExperienceItemSchema).min(1),
    caseStudies: z.array(CaseStudySchema).min(1),
    services: z.array(ServiceSchema).min(1),
    blogPosts: z.array(BlogPostSchema).min(1),
  })
  .superRefine((snapshot, context) => {
    const assertUnique = (values: string[], path: (string | number)[]) => {
      if (new Set(values).size !== values.length) {
        context.addIssue({
          code: 'custom',
          message: 'Values must be unique',
          path,
        });
      }
    };

    assertUnique(
      snapshot.experiences.map((item) => item.id),
      ['experiences'],
    );
    assertUnique(
      snapshot.caseStudies.map((item) => item.id),
      ['caseStudies'],
    );
    assertUnique(
      snapshot.caseStudies.map((item) => item.slug),
      ['caseStudies'],
    );
    assertUnique(
      snapshot.services.map((item) => item.id),
      ['services'],
    );
    assertUnique(
      snapshot.blogPosts.map((item) => item.id),
      ['blogPosts'],
    );
    assertUnique(
      snapshot.blogPosts.map((item) => item.slug),
      ['blogPosts'],
    );

    const caseStudyIds = new Set(snapshot.caseStudies.map((item) => item.id));
    snapshot.experiences.forEach((experience, experienceIndex) => {
      experience.caseStudyIds.forEach((caseStudyId, caseStudyIndex) => {
        if (!caseStudyIds.has(caseStudyId)) {
          context.addIssue({
            code: 'custom',
            message: `Unknown case study id: ${caseStudyId}`,
            path: ['experiences', experienceIndex, 'caseStudyIds', caseStudyIndex],
          });
        }
      });
    });
  });

export type SiteSnapshot = z.infer<typeof SiteSnapshotSchema>;
export type SiteSnapshotInput = z.input<typeof SiteSnapshotSchema>;
