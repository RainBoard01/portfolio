import { defineConfig } from 'astro/config';
import sitemap from '@astrojs/sitemap';
import { loadEnv } from 'vite';

const fileEnv = loadEnv(process.env.NODE_ENV || 'production', process.cwd(), '');
const site = process.env.PUBLIC_SITE_URL || fileEnv.PUBLIC_SITE_URL || 'https://yerkoacuna.dev';

export default defineConfig({
  site,
  output: 'static',
  trailingSlash: 'never',
  integrations: [sitemap()],
  build: {
    format: 'directory',
  },
  vite: {
    define: {
      __BUILD_SHA__: JSON.stringify(
        process.env.CAPROVER_GIT_COMMIT_SHA || fileEnv.CAPROVER_GIT_COMMIT_SHA || 'local',
      ),
    },
  },
});
