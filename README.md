# yerkoacuna.dev

Sitio profesional bilingüe de Yerko Acuña, construido con Astro y preparado para desplegarse como archivos estáticos en CapRover. Presenta dos formas de colaboración dentro de una misma práctica técnica:

- Senior Full-Stack Engineer / Technical Lead.
- Desarrollo de Software Yerko Acuña EIRL.

La primera versión obtiene todo el contenido desde archivos locales. La interfaz consume un contrato de datos independiente del origen, por lo que más adelante se puede activar Directus sin rehacer las páginas ni los componentes.

## Qué incluye

- Home/hub, About, Experience, Work/Case Studies, Services, Blog y Contact.
- Rutas en inglés y español.
- Casos de estudio y artículos con rutas estáticas.
- CV descargable, enlaces profesionales y contacto por correo.
- Metadatos canónicos, Open Graph, datos estructurados, sitemap, robots y RSS.
- Proveedor local y límite preparado para Directus.
- Imagen Docker multi-stage: Astro compila y Nginx sirve solamente `dist/`.
- Configuración de CapRover, endpoint `/healthz`, caché y headers de seguridad.
- Comprobación automática de tipos, pruebas, build y enlaces internos.

## Requisitos

- Node.js 22.12 o superior.
- npm 10 o superior.
- Docker, opcional, para reproducir el contenedor de producción.
- Una instancia de CapRover, sólo para el despliegue.

## Inicio rápido

```bash
cp .env.example .env
npm ci
npm run dev
```

El servidor local escucha en `http://localhost:4321`. Astro también lo expone en la red local porque el script de desarrollo utiliza `--host 0.0.0.0`.

Antes de publicar cambios:

```bash
npm run verify
```

## Scripts

| Comando | Propósito |
| --- | --- |
| `npm run dev` | Inicia Astro en modo desarrollo. |
| `npm run build` | Genera el sitio estático en `dist/`. |
| `npm run preview` | Sirve el build con el preview de Astro. |
| `npm run check` | Valida Astro y TypeScript. |
| `npm test` | Ejecuta la suite con Vitest una vez. |
| `npm run test:watch` | Ejecuta Vitest en modo interactivo. |
| `npm run check:links` | Comprueba rutas, recursos y anclas internas de `dist/`. |
| `npm run verify` | Ejecuta tipos, pruebas, build y comprobación de enlaces. |

`check:links` presupone que `dist/` ya existe. `verify` respeta ese orden.

## Variables de entorno

Astro genera HTML estático. Salvo durante `npm run dev`, estas variables se leen al compilar y quedan reflejadas en el resultado; cambiar una variable en CapRover exige crear un nuevo deployment.

| Variable | Requerida | Predeterminada | Uso |
| --- | --- | --- | --- |
| `PUBLIC_SITE_URL` | No | `https://yerkoacuna.dev` | URL canónica para sitemap, RSS, alternates y metadatos sociales. |
| `PUBLIC_CONTACT_EMAIL` | No | `contact@yerkoacuna.dev` | Dirección pública usada por los enlaces de contacto. |
| `PUBLIC_GITHUB_URL` | No | `https://github.com/RainBoard01` | Perfil de GitHub público. |
| `PUBLIC_LINKEDIN_URL` | No | Vacía | Reservada para un perfil verificado; déjala vacía hasta que exista una URL pública definitiva. |
| `PUBLIC_CONTACT_FORM_ENDPOINT` | No | Vacía | Endpoint HTTPS de un formulario externo. Sin valor, el sitio conserva el correo como vía funcional y no publica un formulario roto. |
| `CONTENT_SOURCE` | No | `local` | `local` o `directus`. Selecciona el proveedor de contenido en build-time. |
| `CONTENT_FALLBACK` | No | `fail` | `fail` o `local`. Controla el comportamiento si Directus no puede entregar un snapshot válido. |
| `DIRECTUS_URL` | Con Directus | Vacía | URL base del proyecto Directus, accesible desde el builder. |
| `DIRECTUS_TOKEN` | No | Vacía | Token de lectura de mínimo privilegio si el rol público no puede leer el contenido publicado. Nunca use el prefijo `PUBLIC_`. |
| `CAPROVER_GIT_COMMIT_SHA` | No | `local` | Revisión que CapRover entrega automáticamente durante el build. |

No guardes `.env` en Git. `.env.example` contiene únicamente valores públicos o de ejemplo.

## Organización del proyecto

```text
.
├── public/                 # CV, iconos, imágenes sociales y otros assets públicos
├── scripts/                # Comprobaciones ejecutables sin servidor
├── src/
│   ├── components/         # UI reutilizable, sin conocimiento de Directus
│   ├── data/               # Resolver de proveedor, datos locales y adaptador Directus
│   ├── domain/             # Contratos canónicos y validación runtime con Zod
│   ├── i18n/               # Mapa de locales, rutas y slugs equivalentes
│   ├── layouts/            # Shell, SEO y estructura compartida
│   ├── pages/              # Rutas Astro en inglés y español
│   └── styles/             # Sistema visual global
├── docs/directus-schema.md # Modelo sugerido y procedimiento de migración
├── Dockerfile
├── nginx.conf
└── captain-definition
```

El contrato estable vive en `src/domain/content.ts`. La regla central es que páginas y componentes consumen esos tipos canónicos y no DTOs ni nombres de colecciones del CMS.

## Editar contenido local

1. Edita `src/data/local/en.ts` y `src/data/local/es.ts`; `src/data/local/provider.ts` los valida antes de entregarlos a una página.
2. Conserva los mismos identificadores y slugs entre idiomas cuando representen la misma entidad.
3. Mantén las fechas en formato ISO (`YYYY-MM-DD`) y los elementos repetibles en su orden editorial.
4. No inventes métricas, clientes ni resultados. Si un nombre está protegido por confidencialidad, usa la descripción sectorial prevista por el modelo.
5. Añade imágenes a `public/` o al lugar de assets usado por el proveedor local y entrega siempre texto alternativo significativo.
6. Ejecuta `npm run verify`.

Para agregar un caso de estudio o un artículo, crea el registro en ambos idiomas, conserva el mismo `id` estable y define un slug localizado único. Las rutas dinámicas se generan durante el build; no es necesario crear una página Astro por entrada. El estado `published` se aplica al usar Directus, no a los snapshots locales versionados.

El CV público vive en `public/cv.pdf`. Reemplazar ese archivo conserva la URL estable y los enlaces de descarga.

## Comportamiento de la capa de contenido

`CONTENT_SOURCE=local` carga el snapshot versionado con el repositorio. `CONTENT_SOURCE=directus` consulta Directus durante `astro build`, convierte sus DTOs al mismo modelo canónico y valida el snapshot antes de generar rutas.

El fallback es deliberadamente atómico:

- `CONTENT_FALLBACK=fail`: cualquier error de red, permisos o esquema detiene el build. Es el modo recomendado para producción porque evita publicar contenido viejo sin advertencia.
- `CONTENT_FALLBACK=local`: si falla Directus se usa el snapshot local completo. Nunca se mezclan páginas locales con otras remotas en un mismo build.

El navegador no consulta Directus y el contenedor final no contiene Node.js, el SDK ni el token. Publicar contenido en el CMS requerirá disparar un nuevo deployment. El modelo, los permisos y una futura automatización se detallan en [docs/directus-schema.md](docs/directus-schema.md).

## Contacto

El correo público siempre funciona mediante un enlace `mailto:`. El formulario se habilita sólo cuando `PUBLIC_CONTACT_FORM_ENDPOINT` tiene una URL válida. Ese endpoint puede pertenecer a un servicio de formularios o a una aplicación separada dentro de CapRover.

Un endpoint de formulario es público por definición; no pongas claves privadas en una variable `PUBLIC_*`. Protege el receptor con validación del lado servidor, límite de frecuencia, honeypot o CAPTCHA y una política clara de retención.

## Build y contenedor local

Generar la imagen con los valores predeterminados:

```bash
docker build -t yerkoacuna-dev .
docker run --rm -p 8080:80 yerkoacuna-dev
```

Abrir `http://localhost:8080` y comprobar salud:

```bash
curl --fail http://localhost:8080/healthz
```

Para cambiar configuración pública durante el build:

```bash
docker build \
  --build-arg PUBLIC_SITE_URL=https://staging.yerkoacuna.dev \
  --build-arg PUBLIC_CONTACT_EMAIL=contact@yerkoacuna.dev \
  --build-arg CONTENT_SOURCE=local \
  -t yerkoacuna-dev:staging .
```

La imagen tiene dos etapas:

1. Node 22 instala desde el lockfile y ejecuta `astro build`.
2. Nginx recibe únicamente `dist/` y la configuración del servidor.

Nginx sirve los assets fingerprinted de `/_astro/` con caché inmutable de un año, usa una política corta para archivos públicos no versionados, revalida HTML, comprime respuestas textuales y devuelve la página `404.html` con estado HTTP 404. `/healthz` no toca archivos ni servicios externos.

## Despliegue en CapRover

### 1. Crear la aplicación

En CapRover, crea una app, por ejemplo `yerkoacuna-dev`. Deja el puerto HTTP interno en `80`; el Dockerfile ya lo expone y no necesita un volumen persistente.

### 2. Configurar variables

En **App Configs → Environmental Variables**, agrega sólo las variables que quieras sobrescribir. El Dockerfile declara los mismos nombres como argumentos de build para que CapRover los haga disponibles mientras Astro compila.

Para la primera versión basta con:

```text
PUBLIC_SITE_URL=https://yerkoacuna.dev
CONTENT_SOURCE=local
CONTENT_FALLBACK=fail
```

Si cambias cualquiera de ellas, guarda la configuración y vuelve a desplegar. Reiniciar el contenedor existente no regenera el HTML.

### 3. Desplegar

Hay dos caminos:

**A. GitHub Actions (recomendado, mismo patrón que `webapp-dipromar`)**

1. En el repo configura estos secrets:
   - `CAPROVER_SERVER` — URL del CapRover (ej. `https://captain.example.com`)
   - `APP_NAME` — nombre de la app en CapRover
   - `APP_TOKEN` — token de deploy de la app
2. Opcional: variables de repositorio `PUBLIC_*` / `CONTENT_*` para sobrescribir defaults de build.
3. Un push a `master` (o `workflow_dispatch` / release) ejecuta `.github/workflows/main.yml`:
   - `npm run verify`
   - empaqueta `dist/`, `nginx.conf`, `captain-definition` y `Dockerfile.runtime`
   - despliega con `caprover/deploy-from-github`

**B. Build en CapRover desde el Dockerfile multi-stage**

`captain-definition` apunta a `./Dockerfile` (Node construye y Nginx sirve). Puedes conectar el repo desde la pestaña **Deployment**, o:

```bash
npx caprover login
npx caprover deploy
```

CapRover despliega el commit actual; confirma que todo archivo nuevo requerido esté agregado al repositorio antes de usar la CLI.

### 4. Dominio y TLS

En **HTTP Settings**:

1. Conecta `yerkoacuna.dev`.
2. Activa HTTPS.
3. Activa **Force HTTPS**.
4. Si `www.yerkoacuna.dev` también apunta a la app, elige una URL canónica y redirige la otra desde la configuración frontal de CapRover.

HSTS pertenece al proxy TLS de CapRover, no al Nginx HTTP interno. Actívalo allí sólo después de confirmar que el dominio y sus subdominios funcionan permanentemente por HTTPS.

### 5. Verificar

Comprueba al menos:

```bash
curl --fail https://yerkoacuna.dev/healthz
curl --fail https://yerkoacuna.dev/sitemap-index.xml
curl --fail https://yerkoacuna.dev/rss.xml
curl --fail --output /dev/null https://yerkoacuna.dev/cv.pdf
curl --fail --output /dev/null https://yerkoacuna.dev/ruta-que-no-existe
```

El último comando debe fallar con 404; eso confirma que una URL inexistente no se transforma silenciosamente en la home.

## Activar Directus más adelante

1. Crea las colecciones y políticas descritas en `docs/directus-schema.md`.
2. Importa el contenido local y publica las traducciones completas.
3. Verifica el adaptador contra una instancia de staging.
4. Configura `DIRECTUS_URL` y, si hace falta, `DIRECTUS_TOKEN` en CapRover.
5. Usa primero `CONTENT_SOURCE=directus` y `CONTENT_FALLBACK=local` en staging.
6. Cuando la validación sea estable, cambia producción a `CONTENT_FALLBACK=fail`.
7. Configura un Directus Flow o CI que dispare un deployment al publicar contenido.

La opción más segura es permitir al rol público leer exclusivamente los campos publicados requeridos por el sitio. Si necesitas contenido no público durante el build, usa un token estático de sólo lectura y mínimo alcance. Los build arguments no son un almacén de secretos equivalente a BuildKit Secrets; evita tokens administrativos y rótalos periódicamente.

## Diagnóstico rápido

### Cambié una variable y el sitio no cambió

El sitio es estático. Crea un nuevo deployment; un simple restart reutiliza el mismo `dist/`.

### Directus detiene el build

Revisa que `DIRECTUS_URL` sea accesible desde el host de CapRover, que el rol o token pueda leer assets y colecciones publicadas y que todas las traducciones requeridas estén completas. No relajes la validación para ocultar un schema drift.

### Una ruta válida devuelve 404

Ejecuta `npm run build && npm run check:links`. Comprueba que la entrada esté publicada y que su slug forme parte de `getStaticPaths()`.

### El formulario no aparece

Es el comportamiento esperado sin `PUBLIC_CONTACT_FORM_ENDPOINT`. El enlace de correo sigue siendo el canal principal.

### El healthcheck falla

Confirma que la app use el puerto interno 80 y que CapRover no haya reemplazado el comando del contenedor. Dentro de la imagen, `/healthz` debe responder `ok` sin depender de Directus.

## Seguridad y mantenimiento

- No publiques `.env`, tokens de Directus ni información privada del CV.
- Mantén Node, Astro, Nginx y dependencias actualizados y vuelve a ejecutar `npm run verify`.
- Revisa la Content Security Policy si agregas analytics, embeds o un nuevo proveedor de formularios; no la desactives globalmente.
- Los headers TLS, redirecciones de dominio y certificados los administra CapRover.
- Prueba una restauración o rollback antes de automatizar publicaciones desde Directus.
