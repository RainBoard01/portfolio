# yerkoacuna.dev — Implementation Plan

## 1. Foundation

- Scaffold a strict Astro TypeScript project.
- Configure sitemap, RSS, tests, environment schema, aliases, and base metadata.
- Add the bilingual route map and shared page shell.

## 2. Content boundary

- Define domain types and runtime schemas.
- Build local English and Spanish snapshots from the résumé.
- Add the provider resolver, memoized loader, Directus adapter boundary, and atomic fallback.
- Document the future Directus collections and publishing workflow.

## 3. Interface

- Implement the global visual system, responsive navigation, language switcher, footer, and reusable editorial components.
- Build the home, About, Experience, Work, case-study details, Services, Blog, article, Contact, and 404 pages in both languages.
- Add accessible interaction states, reduced motion, semantic structure, and optional contact-form behavior.

## 4. Discovery and metadata

- Add canonical and alternate-language metadata, Open Graph data, JSON-LD, sitemap, robots, RSS, and web manifest.
- Add one purpose-built social preview image consistent with the finished brand.

## 5. Operations

- Add multi-stage Docker/Nginx delivery, healthcheck, cache policy, security headers, `captain-definition`, `.dockerignore`, and CapRover documentation.
- Add environment examples and local/Directus configuration documentation.

## 6. Verification and packaging

- Run unit tests, type checks, production build, route/link checks, secret scan, and container smoke test where supported.
- Inspect final source and generated output for placeholders and accidental private data.
- Package the clean project as a ZIP in `outputs/`.
