# syntax=docker/dockerfile:1

FROM node:22-alpine AS builder

WORKDIR /app

ENV CI=true \
    NODE_ENV=production \
    ASTRO_TELEMETRY_DISABLED=1

# CapRover makes app variables available as Docker build arguments. Because this
# is a static build, these values are compiled into dist/ and changing them
# requires a new deployment.
ARG PUBLIC_SITE_URL=https://yerkoacuna.dev
ARG PUBLIC_CONTACT_EMAIL=contact@yerkoacuna.dev
ARG PUBLIC_GITHUB_URL=https://github.com/RainBoard01
ARG PUBLIC_LINKEDIN_URL
ARG PUBLIC_CONTACT_FORM_ENDPOINT
ARG CONTENT_SOURCE=local
ARG CONTENT_FALLBACK=fail
ARG DIRECTUS_URL
ARG DIRECTUS_TOKEN
ARG CAPROVER_GIT_COMMIT_SHA=local

COPY package*.json ./
RUN npm ci --include=dev

COPY . .
RUN npm run build

FROM nginx:1.28-alpine AS runtime

COPY nginx.conf /etc/nginx/conf.d/default.conf
RUN rm -rf /usr/share/nginx/html/*
COPY --from=builder /app/dist/ /usr/share/nginx/html/

EXPOSE 80

HEALTHCHECK --interval=30s --timeout=3s --start-period=5s --retries=3 \
  CMD wget -q -T 2 -O /dev/null http://127.0.0.1/healthz || exit 1

CMD ["nginx", "-g", "daemon off;"]
