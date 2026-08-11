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

ENV PUBLIC_SITE_URL=$PUBLIC_SITE_URL \
    PUBLIC_CONTACT_EMAIL=$PUBLIC_CONTACT_EMAIL \
    PUBLIC_GITHUB_URL=$PUBLIC_GITHUB_URL \
    PUBLIC_LINKEDIN_URL=$PUBLIC_LINKEDIN_URL \
    PUBLIC_CONTACT_FORM_ENDPOINT=$PUBLIC_CONTACT_FORM_ENDPOINT \
    CONTENT_SOURCE=$CONTENT_SOURCE \
    CONTENT_FALLBACK=$CONTENT_FALLBACK \
    DIRECTUS_URL=$DIRECTUS_URL \
    DIRECTUS_TOKEN=$DIRECTUS_TOKEN \
    CAPROVER_GIT_COMMIT_SHA=$CAPROVER_GIT_COMMIT_SHA

COPY package*.json ./
RUN npm ci --include=dev

COPY . .
RUN npm run build

# Runtime: Static Web Server (https://static-web-server.net/)
FROM joseluisq/static-web-server:2-alpine AS runtime

COPY --from=builder --chown=sws:sws /app/dist/ /home/sws/public/
COPY --chown=sws:sws sws.toml /home/sws/sws.toml

ENV SERVER_CONFIG_FILE=/home/sws/sws.toml \
    SERVER_ROOT=/home/sws/public

EXPOSE 80

HEALTHCHECK --interval=30s --timeout=3s --start-period=5s --retries=3 \
  CMD wget -q -T 2 -O /dev/null http://127.0.0.1/health || exit 1
