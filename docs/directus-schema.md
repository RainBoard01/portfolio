# Modelo de Directus para yerkoacuna.dev

Esta guía describe el esquema que consume el adaptador de `src/data/directus/`. Directus es una fuente de contenido en build-time: Astro descarga, normaliza y valida un snapshot completo; el navegador y el contenedor Nginx nunca consultan el CMS.

## Decisión de modelado

La primera integración usa **una fila plana por idioma** en lugar de relaciones `*_translations`. Cada fila tiene `locale = en | es`; los registros repetibles comparten un `content_key` estable.

Ventajas:

- Consultas REST sencillas y paralelas.
- DTOs muy cercanos al contrato Zod.
- Importación inicial directa desde los snapshots locales.
- Un error en cualquier colección invalida el snapshot antes de generar HTML.

Tradeoff: algunos valores técnicos se repiten entre idiomas. Si en el futuro se normalizan traducciones y relaciones, sólo debe cambiar el proveedor/mapeador; páginas y componentes continúan consumiendo `SiteSnapshot`.

## Convenciones

- Usa exactamente los nombres de colección y campo indicados aquí.
- `locale` es un string requerido con choices `en` y `es`.
- `content_key` es un string kebab-case estable y compartido por las dos filas que representan la misma entidad.
- Añade un índice único compuesto `(content_key, locale)` a las colecciones repetibles.
- Los slugs son localizados: cada idioma puede tener uno distinto. Añade un índice único compuesto `(slug, locale)`.
- Los arrays y objetos anidados se guardan como JSON.
- `sort` es un integer ascendente. Evita depender del orden físico de las filas.
- Los campos vacíos que el DTO declara como nullable deben ser `null`, no `""`.
- Las fechas se almacenan en ISO 8601. El mapper publica `published_at` como `YYYY-MM-DD`.

Directus puede usar su `id` numérico o UUID habitual; el sitio no lo expone. La identidad de dominio siempre proviene de `content_key`.

## Colecciones exactas

### `site_settings`

Debe existir exactamente una fila por locale. El proveedor incluye todos estos campos en `settings` y valida que haya una sola coincidencia.

| Campo | Tipo Directus | Reglas |
| --- | --- | --- |
| `id` | integer/UUID | PK administrada por Directus. |
| `locale` | string | `en` o `es`; unique. |
| `site_name` | string | Nombre corto del sitio. |
| `locale_name` | string | Nombre visible del idioma. |
| `default_title` | string | Title SEO base. |
| `default_description` | text | Descripción SEO base. |
| `contact_email` | string | Email válido y público. |
| `github_url` | string | URL absoluta. |
| `cv_path` | string | `/cv.pdf`; conservar la URL estable. |
| `navigation` | JSON | Objeto `Navigation`. |
| `labels` | JSON | Objeto `UiLabels`. |
| `pages` | JSON | Objeto `Pages`. |
| `skip_to_content_label` | string | Etiqueta accesible. |
| `open_menu_label` | string | Etiqueta accesible. |
| `close_menu_label` | string | Etiqueta accesible. |
| `language_switch_label` | string | Etiqueta accesible. |
| `footer_tagline` | string | Copy del footer. |
| `copyright_name` | string | Nombre usado en copyright. |

Forma de `navigation`:

```json
{
  "home": "Home",
  "about": "About",
  "experience": "Experience",
  "work": "Work",
  "services": "Services",
  "blog": "Blog",
  "contact": "Contact"
}
```

`labels` debe contener todas las claves de `UiLabelsSchema`; `pages` debe contener `home`, `about`, `experience`, `work`, `services`, `blog` y `contact`, cada uno con `{ "eyebrow", "title", "description" }`. Copia la forma inicial desde el proveedor local y valida el JSON antes de publicar.

### `professional_profiles`

Una fila por locale.

| Campo | Tipo | Reglas |
| --- | --- | --- |
| `id` | integer/UUID | PK. |
| `locale` | string | `en` o `es`; unique. |
| `name` | string | `Yerko Acuña`. |
| `role` | string | Título profesional principal. |
| `secondary_role` | string | Título complementario. |
| `headline` | text | Propuesta principal. |
| `introduction` | text | Introducción breve. |
| `biography` | JSON | Array de al menos dos strings. |
| `location_label` | string | Ubicación pública. |
| `remote_label` | string | Modalidad de trabajo. |
| `focus_areas` | JSON | Array no vacío de strings. |
| `principles` | JSON | Array no vacío de strings. |
| `domains` | JSON | Array no vacío de strings. |
| `expertise` | JSON | Array de `ExpertiseGroup`. |
| `education` | JSON | Array de `EducationItem`. |
| `languages` | JSON | Array de `{ language, level }`. |

Formas anidadas:

```json
{
  "expertise": [
    { "id": "backend-systems", "title": "Backend systems", "items": ["Node.js"] }
  ],
  "education": [
    {
      "id": "degree-key",
      "institution": "Institution",
      "qualification": "Qualification",
      "period": "2018–2022",
      "description": "Description",
      "technologies": []
    }
  ],
  "languages": [{ "language": "Spanish", "level": "Native" }]
}
```

### `company_profiles`

Una fila por locale.

| Campo | Tipo | Reglas |
| --- | --- | --- |
| `id` | integer/UUID | PK. |
| `locale` | string | `en` o `es`; unique. |
| `display_name` | string | Nombre público. |
| `legal_name` | string | `Desarrollo de Software Yerko Acuña EIRL`. |
| `short_name` | string | Etiqueta compacta. |
| `headline` | text | Posicionamiento. |
| `summary` | JSON | Array no vacío de strings. |
| `operating_model` | text | Forma de trabajo. |
| `best_for` | JSON | Array no vacío de strings. |
| `commitments` | JSON | Array no vacío de strings. |
| `contact_email` | string | Email válido. |

### `experiences`

Una fila por experiencia y locale.

| Campo | Tipo | Reglas |
| --- | --- | --- |
| `id` | integer/UUID | PK. |
| `content_key` | string | ID estable kebab-case. |
| `locale` | string | `en` o `es`. |
| `role` | string | Rol localizado. |
| `organization` | string | Nombre público/localizado. |
| `engagement` | string | `employment` o `company`. |
| `start_year` | integer | Año >= 2000. |
| `end_year` | integer nullable | `null` significa actual. |
| `period_label` | string | Período ya localizado. |
| `summary` | text | Resumen. |
| `highlights` | JSON | Array no vacío de strings. |
| `technologies` | JSON | Array no vacío de strings. |
| `case_study_keys` | JSON | Array de `content_key` válidos. |
| `status` | string | `draft`, `published`, `archived`. |
| `sort` | integer | Orden ascendente. |

El contrato valida que cada `case_study_keys` exista en el snapshot del mismo locale.

### `case_studies`

Una fila por caso e idioma.

| Campo | Tipo | Reglas |
| --- | --- | --- |
| `id` | integer/UUID | PK. |
| `content_key` | string | ID estable kebab-case. |
| `locale` | string | `en` o `es`. |
| `slug` | string | Slug localizado, lowercase kebab-case. |
| `title` | string | Título. |
| `client` | string | Cliente o descripción sectorial publicable. |
| `period` | string | Período localizado. |
| `category` | string | Categoría localizada. |
| `collaboration_mode` | string | `employment`, `company` o `academic`. |
| `visibility` | string | `public`, `private` o `academic`. |
| `summary` | text | Resumen de tarjeta. |
| `context` | text | Contexto. |
| `challenge` | text | Desafío. |
| `responsibilities` | JSON | Array no vacío de strings. |
| `approach` | JSON | Array no vacío de strings. |
| `outcomes` | JSON | Array no vacío de strings. |
| `technologies` | JSON | Array no vacío de strings. |
| `external_url` | string nullable | URL absoluta verificable. |
| `external_link_label` | string nullable | Debe ser `null` si no hay URL. |
| `featured` | boolean | Destacar en home/work. |
| `status` | string | `draft`, `published`, `archived`. |
| `sort` | integer | Entero >= 0. |

No agregues métricas, nombres de clientes o impacto financiero que no estén respaldados por una fuente aprobada. `visibility=private` debe usar sólo descripciones autorizadas.

### `services`

Una fila por servicio e idioma. La versión actual no tiene detalle de servicio, por lo que no necesita slug.

| Campo | Tipo | Reglas |
| --- | --- | --- |
| `id` | integer/UUID | PK. |
| `content_key` | string | ID estable kebab-case. |
| `locale` | string | `en` o `es`. |
| `title` | string | Título. |
| `summary` | text | Descripción. |
| `suitable_for` | JSON | Array no vacío de strings. |
| `deliverables` | JSON | Array no vacío de strings. |
| `technologies` | JSON | Array; puede estar vacío. |
| `status` | string | `draft`, `published`, `archived`. |
| `sort` | integer | Entero >= 0. |

### `blog_posts`

Una fila por artículo e idioma.

| Campo | Tipo | Reglas |
| --- | --- | --- |
| `id` | integer/UUID | PK. |
| `content_key` | string | ID estable kebab-case. |
| `locale` | string | `en` o `es`. |
| `slug` | string | Slug localizado, lowercase kebab-case. |
| `title` | string | Título. |
| `excerpt` | text | Extracto para listados/SEO. |
| `published_at` | date/datetime | ISO 8601; requerido al publicar. |
| `reading_minutes` | integer | Positivo. |
| `topics` | JSON | Array no vacío de strings. |
| `body` | JSON | Array de bloques editoriales. |
| `featured` | boolean | Predeterminado `false`. |
| `status` | string | `draft`, `published`, `archived`. |
| `sort` | integer nullable | Desempate editorial opcional. |

`body` es un discriminated union, no HTML WYSIWYG:

```json
[
  { "type": "paragraph", "text": "..." },
  { "type": "heading", "level": 2, "text": "..." },
  { "type": "list", "style": "unordered", "items": ["..."] },
  { "type": "quote", "text": "...", "attribution": null }
]
```

Sólo `status=published` se consulta. Una mejora futura puede filtrar además `published_at <= now`; mientras no exista ese filtro, no marques como published un artículo programado.

## Estado editorial

El adaptador aplica `filter[status][_eq]=published` a `experiences`, `case_studies`, `services` y `blog_posts`. Sus DTOs sólo aceptan el literal `published` cuando Directus devuelve el campo. Un borrador nunca debe entrar al snapshot ni generar una ruta.

`site_settings`, `professional_profiles` y `company_profiles` no tienen workflow de status en la versión actual: debe existir exactamente una fila válida por locale. Usa permisos restringidos y versionado/revisiones de Directus para controlar sus cambios.

## Permisos

### Rol público de lectura

Es la opción preferida cuando todo lo consultado ya es contenido público. Concede `read` sólo a las siete colecciones anteriores y a los campos enumerados. En experiencias, casos, servicios y posts, restringe además a `status=published`.

No concedas creación, edición, eliminación ni acceso a colecciones del sistema. El sitio hace solicitudes servidor-a-servidor durante el build, por lo que no necesita habilitar CORS para el dominio público.

### Token de build

Si no quieres lectura pública, crea un rol `Site Build Reader`, un usuario técnico sin acceso al panel y un token estático de mínimo privilegio. Guárdalo como `DIRECTUS_TOKEN`, nunca como una variable `PUBLIC_*`.

CapRover lo entrega al builder mediante `ARG`; no pasa a la etapa Nginx. Aun así, los build arguments no sustituyen a BuildKit Secrets: evita tokens administrativos, rota la credencial y limita sus permisos estrictamente.

## Comportamiento de las consultas

Para cada locale el proveedor solicita en paralelo:

```text
/items/site_settings?filter[locale][_eq]=en
/items/professional_profiles?filter[locale][_eq]=en
/items/company_profiles?filter[locale][_eq]=en
/items/experiences?filter[locale][_eq]=en&filter[status][_eq]=published&sort=sort
/items/case_studies?filter[locale][_eq]=en&filter[status][_eq]=published&sort=sort
/items/services?filter[locale][_eq]=en&filter[status][_eq]=published&sort=sort
/items/blog_posts?filter[locale][_eq]=en&filter[status][_eq]=published&sort=-published_at
```

Todas usan `limit=-1` y una lista explícita de fields sincronizada con cada DTO. Esto evita que una nota privada o un campo nuevo se incorpore al build sólo por haber sido añadido en Directus. Los permisos de campo siguen siendo la primera barrera y deben permitir únicamente esa lista.

Una respuesta debe tener forma `{ "data": [...] }`. Fallan el build:

- HTTP no exitoso o JSON inválido.
- Campo ausente/tipo incorrecto.
- Cero o más de una fila singleton para el locale.
- IDs o slugs duplicados.
- Referencia de experiencia a un caso inexistente.
- Cualquier snapshot que no pase `SiteSnapshotSchema`.

Con `CONTENT_FALLBACK=local`, se descarta el snapshot Directus completo y se carga el locale local completo. Nunca se mezclan campos de ambos orígenes.

## Importación inicial

1. Crea las siete colecciones con los campos exactos.
2. Configura choices, nullability, índices únicos y permisos.
3. Importa primero `site_settings`, `professional_profiles` y `company_profiles` para `en` y `es`.
4. Importa casos de estudio y luego experiencias, porque éstas referencian sus keys.
5. Importa servicios y blog posts.
6. Compara los snapshots normalizados Directus/local mediante las pruebas de contrato.
7. Ejecuta staging con `CONTENT_SOURCE=directus` y `CONTENT_FALLBACK=local`.
8. Revisa rutas, alternates, RSS, sitemap, CV y 404.
9. Cambia staging a `CONTENT_FALLBACK=fail` y prueba red caída, 401/403 y schema incompleto.
10. Activa Directus en producción sólo cuando el build termine sin fallback.

## Publicación y rebuild

Directus no actualiza un contenedor ya desplegado. Crea un Flow que, después de publicar, invoque un webhook protegido de CI o CapRover para construir una imagen nueva. Mantén debounce si un cambio editorial actualiza varias filas seguidas.

No escribas archivos dentro del contenedor Nginx: la imagen es inmutable y cada release debe poder revertirse desde CapRover.

## Checklist editorial

- Existe exactamente una fila global por locale.
- Cada `content_key` repetible tiene filas completas en inglés y español.
- Slugs e IDs pasan el formato kebab-case y no se duplican.
- Los JSON coinciden con sus schemas y no contienen strings vacíos.
- Las relaciones usan `content_key`, no el ID interno de Directus.
- URLs externas usan HTTPS y las parejas URL/label respetan nullability.
- Clientes, resultados y cifras están autorizados.
- Los artículos publicados tienen fecha válida y bloques suficientes.
- El build de staging termina sin fallback.
- `npm run check:links` no reporta rutas ni anclas rotas.
