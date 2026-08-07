/// <reference types="astro/client" />

interface ImportMetaEnv {
  readonly PUBLIC_SITE_URL?: string;
  readonly PUBLIC_CONTACT_EMAIL?: string;
  readonly PUBLIC_CONTACT_FORM_ENDPOINT?: string;
  readonly PUBLIC_GITHUB_URL?: string;
  readonly PUBLIC_LINKEDIN_URL?: string;
  readonly CONTENT_SOURCE?: 'local' | 'directus';
  readonly CONTENT_FALLBACK?: 'fail' | 'local';
  readonly DIRECTUS_URL?: string;
  readonly DIRECTUS_TOKEN?: string;
  readonly CAPROVER_GIT_COMMIT_SHA?: string;
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}

declare const __BUILD_SHA__: string;
