import { access, readdir, readFile, stat } from 'node:fs/promises';
import { constants } from 'node:fs';
import path from 'node:path';
import process, { loadEnvFile } from 'node:process';
import { fileURLToPath } from 'node:url';

const projectRoot = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const outputRoot = path.join(projectRoot, 'dist');

try {
  loadEnvFile(path.join(projectRoot, '.env'));
} catch (error) {
  if (!(error instanceof Error) || !('code' in error) || error.code !== 'ENOENT') throw error;
}

const configuredSite = process.env.PUBLIC_SITE_URL || 'https://yerkoacuna.dev';
const siteUrl = new URL(configuredSite);
const virtualRoutes = new Set(['/healthz']);

async function isReadableFile(filePath) {
  try {
    await access(filePath, constants.R_OK);
    return (await stat(filePath)).isFile();
  } catch {
    return false;
  }
}

async function walk(directory) {
  const entries = await readdir(directory, { withFileTypes: true });
  const files = [];

  for (const entry of entries) {
    const absolutePath = path.join(directory, entry.name);
    if (entry.isDirectory()) files.push(...(await walk(absolutePath)));
    else if (entry.isFile()) files.push(absolutePath);
  }

  return files;
}

function publicPathForHtml(filePath) {
  const relative = path.relative(outputRoot, filePath).split(path.sep).join('/');

  if (relative === 'index.html') return '/';
  if (relative.endsWith('/index.html')) return `/${relative.slice(0, -'/index.html'.length)}`;
  if (relative.endsWith('.html')) return `/${relative.slice(0, -'.html'.length)}`;
  return `/${relative}`;
}

function decodeAttribute(value) {
  return value
    .replaceAll('&amp;', '&')
    .replaceAll('&quot;', '"')
    .replaceAll('&#39;', "'")
    .trim();
}

function extractReferences(html) {
  const references = [];
  const tagPattern = /<[a-z][^>]*>/gi;
  const attributePattern = /\b(?:action|href|poster|src)\s*=\s*(["'])(.*?)\1/gi;
  const srcsetPattern = /\bsrcset\s*=\s*(["'])(.*?)\1/gi;

  for (const tagMatch of html.matchAll(tagPattern)) {
    const tag = tagMatch[0];

    for (const match of tag.matchAll(attributePattern)) {
      references.push(decodeAttribute(match[2]));
    }

    for (const match of tag.matchAll(srcsetPattern)) {
      const srcset = decodeAttribute(match[2]);
      if (srcset.startsWith('data:')) continue;

      for (const candidate of srcset.split(',')) {
        const source = candidate.trim().split(/\s+/, 1)[0];
        if (source) references.push(source);
      }
    }
  }

  return references;
}

function extractAnchors(html) {
  const anchors = new Set();
  const anchorPattern = /\b(?:id|name)\s*=\s*(["'])(.*?)\1/gi;

  for (const match of html.matchAll(anchorPattern)) {
    anchors.add(decodeAttribute(match[2]));
  }

  return anchors;
}

function shouldIgnore(rawReference) {
  return (
    rawReference === '' ||
    rawReference.startsWith('data:') ||
    rawReference.startsWith('javascript:') ||
    rawReference.startsWith('mailto:') ||
    rawReference.startsWith('tel:')
  );
}

function safeDecodePathname(pathname) {
  try {
    return decodeURIComponent(pathname);
  } catch {
    return pathname;
  }
}

function candidateFiles(pathname) {
  const decoded = safeDecodePathname(pathname);
  const relative = decoded.replace(/^\/+/, '');

  if (decoded === '/') return [path.join(outputRoot, 'index.html')];
  if (decoded.endsWith('/')) return [path.join(outputRoot, relative, 'index.html')];

  const exact = path.join(outputRoot, relative);
  if (path.extname(relative)) return [exact];

  return [exact, `${exact}.html`, path.join(exact, 'index.html')];
}

async function resolveOutputFile(pathname) {
  for (const candidate of candidateFiles(pathname)) {
    if (await isReadableFile(candidate)) return candidate;
  }

  return undefined;
}

async function main() {
  try {
    await access(outputRoot, constants.R_OK);
  } catch {
    throw new Error('No existe dist/. Ejecuta `npm run build` antes de comprobar enlaces.');
  }

  const files = await walk(outputRoot);
  const htmlFiles = files.filter((file) => file.endsWith('.html'));

  if (htmlFiles.length === 0) {
    throw new Error('dist/ no contiene archivos HTML.');
  }

  const htmlCache = new Map();
  const errors = [];
  let checkedReferences = 0;

  for (const htmlFile of htmlFiles) {
    const html = await readFile(htmlFile, 'utf8');
    htmlCache.set(htmlFile, html);
    const sourcePath = publicPathForHtml(htmlFile);
    const sourceUrl = new URL(sourcePath, siteUrl);

    for (const rawReference of extractReferences(html)) {
      if (shouldIgnore(rawReference)) continue;

      let targetUrl;
      try {
        targetUrl = new URL(rawReference, sourceUrl);
      } catch {
        errors.push(`${sourcePath}: URL inválida: ${rawReference}`);
        continue;
      }

      if (targetUrl.origin !== siteUrl.origin) continue;

      checkedReferences += 1;
      const pathname = safeDecodePathname(targetUrl.pathname);
      if (virtualRoutes.has(pathname)) continue;

      const targetFile = await resolveOutputFile(pathname);
      if (!targetFile) {
        errors.push(`${sourcePath}: no existe ${pathname} (desde ${rawReference})`);
        continue;
      }

      if (!targetUrl.hash || !targetFile.endsWith('.html')) continue;

      const fragment = safeDecodePathname(targetUrl.hash.slice(1));
      if (!fragment) continue;

      const targetHtml = htmlCache.get(targetFile) || (await readFile(targetFile, 'utf8'));
      htmlCache.set(targetFile, targetHtml);

      if (!extractAnchors(targetHtml).has(fragment)) {
        errors.push(`${sourcePath}: no existe el ancla #${fragment} en ${pathname}`);
      }
    }
  }

  if (errors.length > 0) {
    const uniqueErrors = [...new Set(errors)].sort();
    console.error(`Se encontraron ${uniqueErrors.length} enlace(s) interno(s) roto(s):`);
    for (const error of uniqueErrors) console.error(`- ${error}`);
    process.exitCode = 1;
    return;
  }

  console.log(
    `Enlaces correctos: ${checkedReferences} referencias internas en ${htmlFiles.length} páginas HTML.`,
  );
}

main().catch((error) => {
  console.error(error instanceof Error ? error.message : error);
  process.exitCode = 1;
});
