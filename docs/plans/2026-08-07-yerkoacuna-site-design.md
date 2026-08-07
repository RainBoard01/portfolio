# yerkoacuna.dev — Approved Site Design

**Date:** 2026-08-07  
**Status:** Approved

## Product intent

`yerkoacuna.dev` is Yerko Acuña's professional identity hub. It presents one body of technical experience through two equally important modes of collaboration:

1. Senior Full-Stack Engineer / Technical Lead for product and engineering teams.
2. End-to-end software delivery through Desarrollo de Software Yerko Acuña EIRL.

The site must feel complete at launch, not like a generic portfolio or a collection of placeholders. Its evidence comes from Yerko's résumé: enterprise delivery since 2022, work across multiple operational domains, technical leadership, production systems, and full-stack ownership from discovery through deployment.

## Editorial direction

The core thesis is **one technical practice, two ways to work together**.

The home page will lead with a clear outcome-oriented statement, immediately explain both collaboration paths, and support them with selected case studies, experience, capabilities, and a direct contact action. The downloadable résumé is supporting evidence rather than the site's organizing structure.

Case studies use a consistent narrative:

- Context
- Problem
- Responsibility
- Decisions and approach
- Result
- Technology

Claims are limited to facts present in the résumé and phrased with appropriate context. The site does not publish the personal phone number, salary expectations, citizenship, personal Gmail address, or the placeholder LinkedIn URL. Contact uses `contact@yerkoacuna.dev`; GitHub uses `https://github.com/RainBoard01`.

## Information architecture

English is the default experience at root-level routes. Spanish is available under `/es/`, with a language selector that preserves the equivalent current page.

- `/` and `/es/` — professional hub
- `/about` and `/es/sobre-mi`
- `/experience` and `/es/experiencia`
- `/work` and `/es/trabajo`
- `/work/[slug]` and `/es/trabajo/[slug]`
- `/services` and `/es/servicios`
- `/blog` and `/es/blog`
- `/blog/[slug]` and `/es/blog/[slug]`
- `/contact` and `/es/contacto`
- `/cv.pdf` — direct résumé download
- `/rss.xml`, `/es/rss.xml`, `/robots.txt`, `/sitemap-index.xml`, and a real 404 page

The blog launches with a real editorial note about end-to-end ownership and a useful overview of future subject areas. It does not show fake entries or repeated “coming soon” labels.

## Visual system

The site uses a contemporary technical-editorial direction:

- Warm neutral background and graphite text
- A restrained mineral-green accent
- Precise sans-serif typography with an editorial serif for selected headings
- Strong grids, rules, labels, and structured whitespace
- CSS-native diagrams and motifs instead of decorative illustrations
- Minimal motion, with reduced-motion support

It deliberately avoids terminal aesthetics, neon gradients, proficiency bars, logo clouds, and generic “passionate developer” copy.

## Content model and Directus boundary

Pages and components consume canonical domain models only. They never import local content files directly and never know Directus collection field names.

The canonical site snapshot includes:

- `SiteSettings`
- `ProfessionalProfile`
- `CompanyProfile`
- `ExperienceItem[]`
- `CaseStudy[]`
- `Service[]`
- `BlogPost[]`

A `ContentProvider` supplies the complete localized snapshot. Version one uses a local provider. A Directus provider and DTO mapper sit behind the same interface. Directus content is fetched at build time, validated as one atomic snapshot, and never exposes its token to the browser.

`CONTENT_SOURCE=local|directus` selects the provider. Directus failures stop the build by default; `CONTENT_FALLBACK=local` enables an explicit whole-site fallback. Mixed-source pages are not allowed.

## Delivery and deployment

Astro outputs static HTML. A multi-stage Docker image builds the project and serves only `dist/` through Nginx. The final image includes:

- Real 404 handling rather than SPA fallback
- Long-lived immutable caching for fingerprinted Astro assets
- Revalidatable HTML
- Security headers
- `/healthz` endpoint and container healthcheck

CapRover deployment uses `captain-definition` and internal port 80. Domain attachment and HTTPS are completed in CapRover. Build-time variables are documented because static HTML must be rebuilt when content or public configuration changes.

## Quality bar

The finished project must pass:

- Astro and TypeScript checks
- Unit tests for schemas, provider selection, and fallback behavior
- Production build
- Internal-link and route checks
- Accessibility-oriented markup and keyboard navigation checks
- Container build and health smoke test when Docker is available
- A scan confirming Directus secrets are absent from built output

The downloadable ZIP excludes dependencies, build output, local environment values, Git metadata, and temporary files.
